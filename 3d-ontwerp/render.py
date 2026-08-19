"""Eenvoudige software-renderer om de STL's als plaatje te bekijken."""

from __future__ import annotations

import os
import sys

import numpy as np
from PIL import Image

import testglashouder as T

OUT = os.path.join(T.HERE, "renders")

BG = np.array([246, 245, 242], dtype=float)


def mesh_arrays(m):
    mesh = m.to_mesh()
    return np.asarray(mesh.vert_properties[:, :3], dtype=float), np.asarray(mesh.tri_verts)


def look_at(verts, azim, elev, roll=0.0):
    a, e = np.radians(azim), np.radians(elev)
    fwd = np.array([np.cos(e) * np.cos(a), np.cos(e) * np.sin(a), np.sin(e)])
    up0 = np.array([0.0, 0.0, 1.0])
    right = np.cross(fwd, up0)
    right /= np.linalg.norm(right)
    up = np.cross(right, fwd)
    if roll:
        r = np.radians(roll)
        right, up = right * np.cos(r) + up * np.sin(r), up * np.cos(r) - right * np.sin(r)
    return np.stack([right, up, fwd])


def render(m, path, azim=45.0, elev=25.0, roll=0.0, size=(1500, 1100), colour=(214, 58, 48)):
    verts, tris = mesh_arrays(m)
    basis = look_at(verts, azim, elev, roll)
    cam = verts @ basis.T                       # x=rechts, y=omhoog, z=diepte

    w, h = size
    lo, hi = cam[:, :2].min(0), cam[:, :2].max(0)
    span = (hi - lo).max()
    scale = min(w, h) * 0.86 / span
    centre = (lo + hi) / 2
    px = (cam[:, 0] - centre[0]) * scale + w / 2
    py = h / 2 - (cam[:, 1] - centre[1]) * scale
    depth = cam[:, 2]

    tri = np.stack([np.stack([px[tris[:, i]], py[tris[:, i]], depth[tris[:, i]]], 1)
                    for i in range(3)], 1)                       # (n, 3, 3)

    world = verts[tris]
    n = np.cross(world[:, 1] - world[:, 0], world[:, 2] - world[:, 0])
    n /= np.maximum(np.linalg.norm(n, axis=1, keepdims=True), 1e-12)
    facing = n @ basis[2]
    n = np.where(facing[:, None] > 0, -n, n)                     # normalen naar de camera
    light = -basis[2] + 0.42 * basis[0] + 0.55 * basis[1]
    light /= np.linalg.norm(light)
    lam = np.clip(n @ light, 0.0, 1.0)
    shade = 0.24 + 0.76 * lam ** 0.85
    base = np.array(colour, dtype=float)
    tri_col = np.clip(base[None, :] * shade[:, None] + 45.0 * (lam ** 12)[:, None], 0, 255)

    img = np.repeat(np.repeat(BG[None, None, :], h, 0), w, 1)
    zbuf = np.full((h, w), np.inf)

    order = np.argsort(-tri[:, :, 2].min(1))
    for idx in order:
        p = tri[idx]
        x0 = max(int(np.floor(p[:, 0].min())), 0)
        x1 = min(int(np.ceil(p[:, 0].max())) + 1, w)
        y0 = max(int(np.floor(p[:, 1].min())), 0)
        y1 = min(int(np.ceil(p[:, 1].max())) + 1, h)
        if x1 <= x0 or y1 <= y0:
            continue
        xs = np.arange(x0, x1) + 0.5
        ys = np.arange(y0, y1) + 0.5
        gx, gy = np.meshgrid(xs, ys)
        (ax, ay, az), (bx, by, bz), (cx, cy, cz) = p
        det = (by - cy) * (ax - cx) + (cx - bx) * (ay - cy)
        if abs(det) < 1e-9:
            continue
        l1 = ((by - cy) * (gx - cx) + (cx - bx) * (gy - cy)) / det
        l2 = ((cy - ay) * (gx - cx) + (ax - cx) * (gy - cy)) / det
        l3 = 1.0 - l1 - l2
        inside = (l1 >= -1e-6) & (l2 >= -1e-6) & (l3 >= -1e-6)
        if not inside.any():
            continue
        z = l1 * az + l2 * bz + l3 * cz
        sub = zbuf[y0:y1, x0:x1]
        hit = inside & (z < sub)
        if not hit.any():
            continue
        sub[hit] = z[hit]
        img[y0:y1, x0:x1][hit] = tri_col[idx]

    os.makedirs(OUT, exist_ok=True)
    Image.fromarray(img.astype(np.uint8)).save(path)
    print("geschreven:", os.path.relpath(path, T.HERE))


def main() -> None:
    holder = T.build_holder()
    clip = T.build_clip()
    glass = T.slab(T.rrect(T.GLASS_W, T.GLASS_H, 1.0, cy=T.GLASS_H / 2 + 0.4),
                   T.BACK_LIP + 0.3, T.BACK_LIP + 0.3 + T.GLASS_T)

    render(holder + clip, os.path.join(OUT, "01-achterkant-vlak.png"), azim=248, elev=62)
    render(holder + clip, os.path.join(OUT, "02-voorkant-met-steel.png"), azim=70, elev=-55)
    render(holder + clip + glass, os.path.join(OUT, "03-met-glas.png"), azim=255, elev=72)

    foot = T.foot_to_world(T.build_foot())
    render(foot, os.path.join(OUT, "04-voet.png"), azim=140, elev=-24, size=(1700, 820))

    # Detail van de veerlip met kliknok.
    tab = foot ^ T.box(-40, 40, T.SHOULDER_Y - T.PLUG_LEN - 3, T.SHOULDER_Y - 38, -10, 60)
    render(tab, os.path.join(OUT, "06-veerlip.png"), azim=25, elev=18, size=(1500, 850))

    # De koppeling: tong van de bovenkant en de holte in de voet.
    win = T.box(-30, 30, T.JOINT_Y - T.COLLAR_LEN - 2, T.JOINT_Y + 26, -30, 30)
    joint = (T.build_top() + foot) ^ win
    render(joint.trim_by_plane([0.0, 0.0, -1.0], -T.AXIS_Z),
           os.path.join(OUT, "05-koppeling.png"), azim=200, elev=-18, size=(1500, 900))


if __name__ == "__main__":
    sys.exit(main())
