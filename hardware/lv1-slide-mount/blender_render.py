#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fotorealistische impressie van de DropSlide-beugel op de LV1 Classic,
gerenderd met Blender (bpy, headless, Cycles).

    pip install bpy trimesh numpy
    python3 blender_render.py [samples]

Schrijft render_foh.png, render_achter.png, render_opgeborgen.png en het
samengestelde impressie_blender.png in deze map.
"""

import math
import os
import sys

import numpy as np
import trimesh

import bpy
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__))
DEG = math.pi / 180
TILT = 15 * DEG
SAMPLES = int(sys.argv[1]) if len(sys.argv) > 1 and sys.argv[1].isdigit() else 96

# ---------------------------------------------------------------- geometrie
def boxtris(x0, x1, y0, y1, z0, z1):
    b = trimesh.creation.box(extents=[x1 - x0, y1 - y0, z1 - z0])
    b.apply_translation([(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2])
    return b.triangles


def prism_x(profile_yz, x0, x1):
    pts = np.asarray(profile_yz, dtype=float)
    n = len(pts)
    tris = []

    def P(x, i):
        return [x, pts[i][0], pts[i][1]]

    for i in range(1, n - 1):
        tris.append([P(x0, 0), P(x0, i), P(x0, i + 1)])
        tris.append([P(x1, 0), P(x1, i + 1), P(x1, i)])
    for i in range(n):
        j = (i + 1) % n
        tris.append([P(x0, i), P(x1, i), P(x1, j)])
        tris.append([P(x0, i), P(x1, j), P(x0, j)])
    return np.array(tris)


def rx(a):
    c, s = math.cos(a), math.sin(a)
    return np.array([[1, 0, 0], [0, c, -s], [0, s, c]])


R = rx(-TILT)
SLAB_O = np.array([0, 430, 110.0])
BOLT_Z = 275.0


def slab2world(t):
    return np.asarray(t, dtype=float) @ R.T + SLAB_O


def asm2world(t):
    t = np.array(t, dtype=float).copy()
    t[:, :, 2] += BOLT_Z
    return slab2world(t)


def load_stl(name):
    return trimesh.load(os.path.join(HERE, "stl", name)).triangles


# ---------------------------------------------------------------- materialen
def material(name, color, rough=0.5, metallic=0.0, emission=None, e_str=0.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Roughness"].default_value = rough
    bsdf.inputs["Metallic"].default_value = metallic
    if emission is not None:
        bsdf.inputs["Emission Color"].default_value = (*emission, 1.0)
        bsdf.inputs["Emission Strength"].default_value = e_str
    return mat


def add_mesh(name, tris, mat):
    tris = np.asarray(tris, dtype=float)
    verts = tris.reshape(-1, 3)
    faces = np.arange(len(verts)).reshape(-1, 3)
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata(verts.tolist(), [], faces.tolist())
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    obj.data.materials.append(mat)
    bpy.context.collection.objects.link(obj)
    return obj


# ---------------------------------------------------------------- scène
def build_scene(base_bot):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.render.engine = "CYCLES"
    sc.cycles.samples = SAMPLES
    sc.cycles.use_denoising = True
    sc.render.resolution_x = 1152
    sc.render.resolution_y = 920
    sc.render.film_transparent = False

    world = bpy.data.worlds.new("w")
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs["Color"].default_value = (0.85, 0.86, 0.88, 1)
    world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.6
    sc.world = world

    m_chassis = material("chassis", (0.015, 0.015, 0.017), rough=0.55)
    m_face = material("face", (0.03, 0.03, 0.034), rough=0.45)
    m_screen = material("lv1screen", (0.01, 0.02, 0.05), rough=0.25,
                        emission=(0.12, 0.35, 0.9), e_str=5.0)
    m_mon = material("monbody", (0.02, 0.02, 0.022), rough=0.5)
    m_mons = material("monscreen", (0.01, 0.03, 0.05), rough=0.2,
                      emission=(0.15, 0.5, 0.85), e_str=6.0)
    m_orange = material("petg", (0.75, 0.25, 0.03), rough=0.4)
    m_floor = material("floor", (0.62, 0.62, 0.64), rough=0.85)

    # Vloer
    add_mesh("vloer", boxtris(-3000, 3000, -3000, 3000, -20, 0), m_floor)

    # Console
    add_mesh("bak", boxtris(-280, 280, 0, 561, 0, 95), m_chassis)
    add_mesh("wig", prism_x([(0, 20), (561, 20), (561, 150), (0, 95)], -280, 280), m_face)
    add_mesh("faders", boxtris(-260, 260, 40, 340, 150, 156), m_face)
    add_mesh("slab", slab2world(boxtris(-280.5, 280.5, -55, 0, 0, 300)), m_chassis)
    add_mesh("lv1scr", slab2world(boxtris(-240, 240, -59, -55.5, 30, 285)), m_screen)

    # Beugel
    add_mesh("plaat", asm2world(load_stl("01_montageplaat.stl")), m_orange)
    yoff = 6.0
    for n in ("02_rail_links.stl", "03_rail_rechts.stl",
              "05_voet_links.stl", "06_voet_rechts.stl"):
        t = np.array(load_stl(n))
        t[:, :, 1] += yoff
        add_mesh(n, asm2world(t), m_orange)
    for n in ("04_slede.stl", "07_arm.stl"):
        t = np.array(load_stl(n))
        t[:, :, 1] += yoff
        t[:, :, 2] += base_bot
        add_mesh(n, asm2world(t), m_orange)

    # Monitor (railcoords y 16.8..27.8 -> wereld +6)
    my0, my1 = 22.8, 33.8
    mb = 73.0 + base_bot
    add_mesh("monitor", asm2world(boxtris(-180, 180, my0, my1, mb, mb + 227)), m_mon)
    add_mesh("monscr", asm2world(boxtris(-172, 172, my0 - 1.5, my0 + 0.5, mb + 8, mb + 219)), m_mons)

    # Licht: zon + groot softbox-vlak
    sun = bpy.data.lights.new("zon", type="SUN")
    sun.energy = 3.5
    sun.angle = 12 * DEG
    so = bpy.data.objects.new("zon", sun)
    so.rotation_euler = (55 * DEG, 0, 35 * DEG)
    bpy.context.collection.objects.link(so)

    area = bpy.data.lights.new("softbox", type="AREA")
    area.energy = 5.0e6
    area.size = 1500
    ao = bpy.data.objects.new("softbox", area)
    ao.location = (-600, -500, 1100)
    ao.rotation_euler = (35 * DEG, -20 * DEG, -25 * DEG)
    bpy.context.collection.objects.link(ao)

    return sc


def set_camera(sc, azim_deg, elev_deg, dist, target=(0, 300, 250), lens=50):
    cam = bpy.data.cameras.new("cam")
    cam.lens = lens
    cam.clip_start = 10.0
    cam.clip_end = 100000.0
    co = bpy.data.objects.new("cam", cam)
    a, e = azim_deg * DEG, elev_deg * DEG
    tgt = Vector(target)
    pos = tgt + dist * Vector((math.cos(e) * math.cos(a),
                               math.cos(e) * math.sin(a),
                               math.sin(e)))
    co.location = pos
    co.rotation_euler = (tgt - pos).to_track_quat("-Z", "Y").to_euler()
    bpy.context.collection.objects.link(co)
    sc.camera = co


VIEWS = [
    ("render_foh.png", -65.0, -68, 14, 1750, "UITGESCHOVEN — vanaf FOH-positie"),
    ("render_achter.png", -65.0, 55, 16, 1650, "UITGESCHOVEN — achterkant"),
    ("render_opgeborgen.png", -285.0, 55, 16, 1650, "OPGEBORGEN — achter het scherm"),
]

for fname, base_bot, azim, elev, dist, _ in VIEWS:
    sc = build_scene(base_bot)
    set_camera(sc, azim, elev, dist)
    sc.render.filepath = os.path.join(HERE, fname)
    bpy.ops.render.render(write_still=True)
    print("rendered", fname, flush=True)

# ---------------------------------------------------------------- samenstellen
import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.image as mpimg

fig, axes = plt.subplots(1, 3, figsize=(17, 5.4))
for ax, (fname, *_rest, title) in zip(axes, VIEWS):
    ax.imshow(mpimg.imread(os.path.join(HERE, fname)))
    ax.set_axis_off()
    ax.set_title(title, fontsize=11)
fig.suptitle("ASUS MB166C op DropSlide-beugel — Waves LV1 Classic (Blender/Cycles)",
             fontsize=13)
plt.tight_layout()
plt.savefig(os.path.join(HERE, "impressie_blender.png"), dpi=120, bbox_inches="tight")
print("klaar: impressie_blender.png")
