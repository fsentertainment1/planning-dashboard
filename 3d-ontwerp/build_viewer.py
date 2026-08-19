"""Bouwt viewer.html: de modellen als interactieve 3D-viewer in de browser."""

from __future__ import annotations

import base64
import json
import os

import numpy as np
from manifold3d import Manifold

import testglashouder as T

OUT = os.path.join(T.HERE, "viewer.html")
TEMPLATE = os.path.join(T.HERE, "viewer_template.html")


def pack(m: Manifold) -> dict:
    """Mesh -> gequantiseerde posities (uint16) plus uint16-indices."""
    mesh = m.to_mesh()
    v = np.asarray(mesh.vert_properties[:, :3], dtype=np.float64)
    idx = np.asarray(mesh.tri_verts, dtype=np.uint32)
    if idx.max() > 65535:
        raise ValueError("te veel hoekpunten voor uint16-indices")
    mn = v.min(0)
    sc = np.where(v.max(0) - mn > 1e-9, (v.max(0) - mn) / 65535.0, 1.0)
    q = np.clip(np.round((v - mn) / sc), 0, 65535).astype("<u2")
    return {
        "p": base64.b64encode(q.tobytes()).decode(),
        "i": base64.b64encode(idx.astype("<u2").tobytes()).decode(),
        "mn": [round(x, 4) for x in mn],
        "sc": [float(x) for x in sc],
    }


def build_pole() -> Manifold:
    """De teststok als doorzichtige referentie, inclusief het klikgat."""
    length = T.SNAP_CENTER + 24.0
    tube = (Manifold.cylinder(length, T.POLE_OD / 2, T.POLE_OD / 2)
            - Manifold.cylinder(length + 4.0, T.POLE_ID / 2, T.POLE_ID / 2)
            .translate([0.0, 0.0, -2.0]))
    pole = T.foot_to_world(tube.translate([0.0, 0.0, T.COLLAR_LEN]))
    hole = (Manifold.cylinder(60.0, T.HOLE_D / 2, T.HOLE_D / 2)
            .rotate([0.0, 90.0, 0.0])
            .translate([-30.0, T.SHOULDER_Y - T.SNAP_CENTER, T.AXIS_Z]))
    return pole - hole


def main() -> None:
    glass = T.slab(T.rrect(T.GLASS_W, T.GLASS_H, 1.0, cy=T.GLASS_H / 2 + 0.4),
                   T.BACK_LIP + 0.3, T.BACK_LIP + 0.3 + T.GLASS_T)

    meshes = {
        "boven": T.build_top(),
        "voet": T.foot_to_world(T.build_foot()),
        "klem": T.build_clip(),
        "glas": glass,
        "stok": build_pole(),
    }

    win_h = T.GLASS_H - T.WINDOW_BOT
    data = {
        "clipZ": round(T.AXIS_Z, 3),
        "meshes": {k: pack(v) for k, v in meshes.items()},
        "colours": {
            "light": {"part": [.84, .22, .17], "part2": [.62, .16, .13],
                      "glass": [.74, .13, .12],
                      "pole": [.36, .43, .52], "cap": [.54, .15, .12]},
            "dark": {"part": [.90, .30, .24], "part2": [.68, .21, .17],
                     "glass": [.80, .18, .16],
                     "pole": [.50, .57, .65], "cap": [.60, .20, .16]},
        },
        "optLabel": {"glas": "Testglas", "stok": "Teststok", "snee": "Doorsnede"},
        "optSwatch": {"glas": "glass", "stok": "pole"},
        "scenes": [
            {"key": "samen", "label": "Compleet", "layers": [
                {"m": "boven", "c": "part"},
                {"m": "voet", "c": "part2"},
                {"m": "glas", "c": "glass", "a": .55, "opt": "glas"},
                {"m": "stok", "c": "pole", "a": .38, "opt": "stok"}]},
            {"key": "boven", "label": "Bovenkant", "layers": [
                {"m": "boven", "c": "part"},
                {"m": "glas", "c": "glass", "a": .55, "opt": "glas"}]},
            {"key": "voet", "label": "Voet", "layers": [
                {"m": "voet", "c": "part2"},
                {"m": "stok", "c": "pole", "a": .38, "opt": "stok"}]},
            {"key": "klem", "label": "Glasklem", "layers": [
                {"m": "klem", "c": "part"}]},
        ],
        "specs": {
            "samen": [
                ["Twee delen", "gelijmd", "bovenkant + voet"],
                ["Totale lengte", f"{T.FRAME_TOP - (T.SHOULDER_Y - T.PLUG_LEN):.0f}", "mm"],
                ["Vrij zicht", f"{2*T.WINDOW_X:.0f} × {win_h:.0f}", "mm raamopening"],
                ["Glassleuf", f"{T.SLOT_T:.1f}", "mm voor glas van 3"],
            ],
            "voet": [
                ["Randje over de stok", f"{T.SKIRT_DEPTH:.0f}", f"mm, boring Ø{T.SKIRT_ID:.1f}"],
                ["Plug in de stok", f"{T.PLUG_LEN:.1f}", f"mm, Ø{2*T.RIB_R_OUT:.2f} over ribben"],
                ["Kliknok", f"hart {T.SNAP_CENTER:.2f}", f"mm vanaf de kop, gat Ø{T.HOLE_D}"],
                ["Print", "rechtop, plug omhoog", "geen support"],
            ],
            "boven": [
                ["Print", "plat op de rug", "geen support"],
                ["Buitenmaat", "171 × 232 × 12", "mm"],
                ["Tong", f"{T.TONGUE_W:.0f} × {T.FRAME_T:.1f} × {T.TONGUE_LEN:.0f}", "mm, klikt vast"],
                ["Vrij zicht", f"{2*T.WINDOW_X:.0f} × {win_h:.0f}", "mm raamopening"],
            ],
            "klem": [
                ["Lengte", f"{T.SLOT_W - 0.4:.0f}", "mm"],
                ["Dikte", f"{T.CLIP_T:.1f}", "mm, valt in de glassleuf"],
                ["Vastzetten", "2 nokjes", "klikken in de kuiltjes"],
                ["Losmaken", "duimgreep", "trek hem omhoog"],
            ],
        },
    }

    with open(TEMPLATE, encoding="utf-8") as fh:
        html = fh.read()
    html = html.replace("/*__DATA__*/", json.dumps(data, separators=(",", ":")))
    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write(html)
    print(f"geschreven: viewer.html  {os.path.getsize(OUT)/1024:.0f} kB")
    for k, v in meshes.items():
        print(f"  {k:8s} {v.num_tri():6d} driehoeken")


if __name__ == "__main__":
    main()
