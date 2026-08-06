#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
DropSlide — schuifbevestiging voor een ASUS MB166C (15,6") achter het scherm
van een Waves eMotion LV1 Classic.

Werking:
  * Montageplaat op de 3 bestaande inbusbouten bovenaan het achterpaneel.
  * Twee verticale C-rails omlaag langs het geventileerde paneel.
  * Slede (met toren) draagt de monitor: 1/4"-20 bout in het statiefdraad-
    inzetstuk + onderlip die het gewicht draagt.
  * Geprinte bladveer-detents klikken de slede vast in de bovenstand
    (in gebruik) en onderstand (opgeborgen, monitor achter het scherm).

Assenstelsel: X = breedte console, Y = afstand vanaf achterpaneel (weg van
console), Z = verticaal. Z=0 is het hart van de boutenrij. In de losse
onderdeel-STL's ligt Y=0 op het achtervlak van de rail; de montageplaat
ligt met zijn achtervlak (consolezijde) op Y=0.

Alle maten in mm. Draai dit script opnieuw na het aanpassen van PARAMS:
    python3 lv1_slide_mount.py
STL-bestanden verschijnen in ./stl/
"""

import math
import os

import numpy as np
import trimesh
from manifold3d import CrossSection, Manifold

# =====================================================================
# PARAMETERS — controleer de waarden gemarkeerd met [METEN!]
# =====================================================================
P = dict(
    # ---- Console (Waves LV1 Classic) --------------------------------
    bolt_dx=105.0,          # [METEN!] hart-op-hart afstand naastgelegen bouten
    bolt_hole_dia=4.6,      # [METEN!] M4 -> 4.6, M5 -> 5.6
    bolt_head_dia=10.0,     # verzonken kamer voor boutkop (+ evt. ring)
    bolt_slot_len=12.0,     # sleufgatlengte: vangt meetfouten in bolt_dx op
    top_edge_offset=25.0,   # [METEN!] boutenrij tot bovenrand schermpaneel
    # ---- Monitor (ASUS MB166C) --------------------------------------
    mon_w=360.0, mon_h=227.0, mon_t=11.0,
    tripod_from_bottom=113.5,  # [METEN!] 1/4" draad vanaf onderrand monitor
    # ---- Gedrag -----------------------------------------------------
    stowed_clearance=10.0,  # opgeborgen: monitor-top zoveel ONDER de bovenrand
    lip_offset=60.0,        # monitor-onderrand boven slede-onderrand
    overshoot=35.0,         # slede mag zoveel boven de rail uitsteken (uitgeschoven)
    # ---- Slede ------------------------------------------------------
    base_h=90.0, base_t=6.0, carriage_w=176.0,
    tower_w=60.0, tower_t=9.0,
    notch_z=40.0,           # detent-groef boven slede-onderrand
    # ---- Rails ------------------------------------------------------
    slot_depth=8.0,         # hoe diep de sledeplaat in de C-rail valt
    clear=0.3,              # speling per zijde (PETG; strakker = 0.2)
    wall_fb=4.0,            # voor-/achterwand rail
    wall_side=5.0,          # buitenwand rail (draagt de bladveer)
    tenon_h=15.0,           # pen bovenaan rail die in de plaatmof valt
    channel_top_z=7.0,      # bovenkant bruikbaar kanaal t.o.v. boutenrij
    # ---- Detents ----------------------------------------------------
    leaf_len=30.0, leaf_t=4.0, leaf_w=10.0,
    tooth=1.5,              # hoe ver de tand uitsteekt
    tooth_w=8.0,            # tandbreedte in Y
    hold_ang=28.0,          # borgvlak (graden t.o.v. schuifrichting: klein = sterk)
    ride_ang=50.0,          # oprijvlak (groot = soepel passeren)
    # ---- Montageplaat ----------------------------------------------
    plate_h=60.0, plate_t=6.0, socket_wall=4.0,
    # ---- Overig -----------------------------------------------------
    foot_standoff=6.0,      # afstandshouder onderaan rail naar het paneel
    seg=64,                 # cirkelsegmenten
)

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "stl")


# =====================================================================
# Hulpfuncties
# =====================================================================
def box(x0, x1, y0, y1, z0, z1):
    """Blok tussen twee hoekpunten."""
    return Manifold.cube([x1 - x0, y1 - y0, z1 - z0]).translate([x0, y0, z0])


def xsection(pts):
    """CrossSection met gegarandeerd CCW-winding."""
    area = 0.0
    for (x0, y0), (x1, y1) in zip(pts, pts[1:] + pts[:1]):
        area += x0 * y1 - x1 * y0
    if area < 0:
        pts = pts[::-1]
    return CrossSection([list(map(list, pts))])


def prism_xz(pts, y0, y1):
    """Prisma met profiel in het XZ-vlak, geëxtrudeerd van y0 tot y1.

    De profielpunten zijn (x, z). CrossSection extrudeert in +Z; door om +X
    te draaien met +90 graden wordt (x, y, z) -> (x, -z, y): het profiel
    behoudt zijn (x, z)-coördinaten en de extrusie wijst in -Y.
    """
    m = xsection(pts).extrude(y1 - y0)
    return m.rotate([90, 0, 0]).translate([0, y1, 0])


def cyl_y(x, z, y0, y1, dia, seg=None):
    """Cilinder met as in Y-richting."""
    c = Manifold.cylinder(y1 - y0, dia / 2, dia / 2, seg or P["seg"])
    return c.rotate([90, 0, 0]).translate([x, y1, z])


def cyl_x(z, y, x0, x1, dia, seg=None):
    """Cilinder met as in X-richting."""
    c = Manifold.cylinder(x1 - x0, dia / 2, dia / 2, seg or P["seg"])
    return c.rotate([0, 90, 0]).translate([x0, y, z])


def hex_prism_y(x, z, y0, y1, af):
    """Zeskantige holte (as in Y), af = sleutelwijdte."""
    r = af / math.sqrt(3.0)
    pts = [(r * math.cos(a), r * math.sin(a))
           for a in [math.radians(60 * i + 30) for i in range(6)]]
    m = xsection(pts).extrude(y1 - y0)
    return m.rotate([90, 0, 0]).translate([x, y1, z])


def hex_nut_x(z, y, x0, x1, af=5.7):
    """M3-moerzak, as in X."""
    r = af / math.sqrt(3.0)
    pts = [(r * math.cos(a), r * math.sin(a))
           for a in [math.radians(60 * i) for i in range(6)]]
    m = xsection(pts).extrude(x1 - x0)
    return m.rotate([0, 90, 0]).translate([x0, y, z])


def slot_y(x, z, y0, y1, dia, length):
    """Sleufgat (lang in X), as in Y."""
    a = cyl_y(x - (length - dia) / 2, z, y0, y1, dia)
    b = cyl_y(x + (length - dia) / 2, z, y0, y1, dia)
    c = box(x - (length - dia) / 2, x + (length - dia) / 2,
            y0, y1, z - dia / 2, z + dia / 2)
    return a + b + c


def save(m, name):
    mesh = m.to_mesh()
    tm = trimesh.Trimesh(vertices=np.asarray(mesh.vert_properties)[:, :3],
                         faces=np.asarray(mesh.tri_verts))
    ok = tm.is_watertight
    vol = tm.volume / 1000 if ok else float("nan")
    tm.export(os.path.join(OUT, name))
    print(f"  {name:28s} watertight={ok}  volume={vol:8.1f} cm3  bbox="
          + "x".join(f"{d:.0f}" for d in tm.extents))
    assert ok, f"{name} is niet watertight!"
    return tm


# =====================================================================
# Afgeleide maten
# =====================================================================
def derived():
    d = {}
    d["edge_z"] = P["top_edge_offset"]
    # Slede in uitgeschoven stand
    d["dep_base_top"] = P["channel_top_z"] + P["overshoot"]
    d["dep_base_bot"] = d["dep_base_top"] - P["base_h"]
    d["dep_mon_bot"] = d["dep_base_bot"] + P["lip_offset"]
    d["dep_mon_top"] = d["dep_mon_bot"] + P["mon_h"]
    d["visible"] = d["dep_mon_top"] - d["edge_z"]
    # Slag zodat de monitor opgeborgen onder de rand valt
    d["travel"] = d["dep_mon_top"] - (d["edge_z"] - P["stowed_clearance"])
    d["stow_base_bot"] = d["dep_base_bot"] - d["travel"]
    # Rail (onderin ruimte voor de voetplug van 10 mm + 2 mm speling)
    d["rail_bot_z"] = d["stow_base_bot"] - 12.0
    d["rail_len"] = P["channel_top_z"] - d["rail_bot_z"]
    # Detentposities (tand-Z = notch van de slede in de betreffende stand)
    d["tooth_dep_z"] = d["dep_base_bot"] + P["notch_z"]
    d["tooth_stow_z"] = d["stow_base_bot"] + P["notch_z"]
    # Dwarsdoorsnede rail (rechterrail; linker wordt gespiegeld)
    d["mouth_x"] = P["carriage_w"] / 2 - P["slot_depth"]      # opening kanaal
    d["cav_x0"] = d["mouth_x"] - 0.4                          # inloop
    d["cav_x1"] = P["carriage_w"] / 2 + P["clear"]
    d["rail_x0"] = d["cav_x0"]
    d["rail_x1"] = d["cav_x1"] + P["wall_side"]
    d["cav_y0"] = P["wall_fb"]
    d["cav_y1"] = P["wall_fb"] + P["base_t"] + 2 * P["clear"]
    d["rail_depth"] = d["cav_y1"] + P["wall_fb"]
    # Toren / monitorbout
    d["hole_z_local"] = P["lip_offset"] + P["tripod_from_bottom"]
    d["tower_top_local"] = d["hole_z_local"] + 12.0
    return d


# =====================================================================
# Onderdelen
# =====================================================================
def make_tooth(z_apex, up_is_hold, d):
    """Tand op de bladveer, wijst naar binnen (-X) vanuit de buitenwand."""
    apex_x = d["cav_x1"] - P["tooth"]
    base_x = d["cav_x1"] + P["leaf_t"] - 1.0   # goed verankerd in de veer
    hold = math.tan(math.radians(P["hold_ang"])) * P["tooth"]
    ride = math.tan(math.radians(P["ride_ang"])) * P["tooth"]
    up, dn = (hold, ride) if up_is_hold else (ride, hold)
    pts = [(base_x, z_apex + up + 0.8), (apex_x, z_apex + up),
           (apex_x, z_apex - dn), (base_x, z_apex - dn - 0.8)]
    ymid = (d["cav_y0"] + d["cav_y1"]) / 2
    return prism_xz(pts, ymid - P["tooth_w"] / 2, ymid + P["tooth_w"] / 2)


def make_leaf_cut(z_apex, root_below, d):
    """Uitsnede die de bladveer in de buitenwand vrijmaakt."""
    ymid = (d["cav_y0"] + d["cav_y1"]) / 2
    yw0, yw1 = ymid - P["leaf_w"] / 2, ymid + P["leaf_w"] / 2
    if root_below:
        z_tip = z_apex + 3.0
        z_root = z_tip - P["leaf_len"]
        tip_gap = (z_tip, z_tip + 2.5)
    else:
        z_tip = z_apex - 3.0
        z_root = z_tip + P["leaf_len"]
        tip_gap = (z_tip - 2.5, z_tip)
    zlo, zhi = min(z_root, z_tip), max(z_root, z_tip)
    wall_x0, x1 = d["cav_x1"], d["rail_x1"]
    cut = (box(wall_x0 - 1, x1 + 1, yw0 - 2, yw0, zlo, zhi) +          # zijsleuf
           box(wall_x0 - 1, x1 + 1, yw1, yw1 + 2, zlo, zhi) +          # zijsleuf
           box(wall_x0 - 1, x1 + 1, yw0 - 2, yw1 + 2, *tip_gap) +      # tipsleuf
           box(wall_x0 + P["leaf_t"], x1 + 1, yw0, yw1, zlo, zhi))     # reliëf
    return cut


def make_rail(d):
    """Rechterrail (positieve X). Printen liggend op de buitenwand."""
    x0, x1 = d["rail_x0"], d["rail_x1"]
    zb, zt = d["rail_bot_z"], P["channel_top_z"]
    body = box(x0, x1, 0, d["rail_depth"], zb, zt)
    cav = box(d["cav_x0"] - 1, d["cav_x1"], d["cav_y0"], d["cav_y1"], zb - 1, zt + 1)
    rail = body - cav

    # Pen (tenon) bovenop: massieve doorsnede die in de plaatmof valt
    rail += box(x0, x1, 0, d["rail_depth"], zt, zt + P["tenon_h"])
    for dz in (4.0, 11.0):
        rail -= cyl_x(zt + dz, d["rail_depth"] / 2, x0 - 20, x1 + 20, 3.4)

    # Bladveer-detents in de buitenwand
    for z_apex, up_is_hold, root_below in (
        (d["tooth_dep_z"], True, True),     # bovenste detent: draagt gewicht
        (d["tooth_stow_z"], False, False),  # onderste detent: borgt bij transport
    ):
        rail = rail - make_leaf_cut(z_apex, root_below, d)
        rail += make_tooth(z_apex, up_is_hold, d)

    # Voetplug: dwars M3 (zelftappend) door beide wanden
    rail -= cyl_x(zb + 5, d["rail_depth"] / 2, x0 - 20, x1 + 20, 2.8)
    return rail


def make_foot(d):
    """Voet: plug in kanaalonderkant + eindstop + afstandshouder naar paneel."""
    x0, x1 = d["cav_x0"] + 0.3, d["cav_x1"] - 0.3
    y0, y1 = d["cav_y0"] + 0.3, d["cav_y1"] - 0.3
    zb = d["rail_bot_z"]
    plug = box(x0, x1, y0, y1, zb, zb + 10)
    plug -= cyl_x(zb + 5, (y0 + y1) / 2, x0 - 10, x1 + 10, 2.6)
    blok = box(d["rail_x0"], d["rail_x1"], -P["foot_standoff"], d["rail_depth"],
               zb - 8, zb)
    return plug + blok


def make_plate(d):
    """Montageplaat met sleufgaten en twee moffen voor de railpennen."""
    w = max(2 * (d["rail_x1"] + P["socket_wall"]) + 24,
            2 * P["bolt_dx"] + P["bolt_slot_len"] + 30)
    t = P["plate_t"]
    z0, z1 = -P["plate_h"] / 2, P["plate_h"] / 2
    plate = box(-w / 2, w / 2, 0, t, z0, z1)

    # Sleufgaten + verzonken kamers voor de 3 consolebouten
    for bx in (-P["bolt_dx"], 0.0, P["bolt_dx"]):
        plate -= slot_y(bx, 0.0, -1, t + 1, P["bolt_hole_dia"], P["bolt_slot_len"])
        plate -= slot_y(bx, 0.0, t - 3.2, t + 1, P["bolt_head_dia"],
                        P["bolt_slot_len"] + (P["bolt_head_dia"] - P["bolt_hole_dia"]))

    zt = P["channel_top_z"]
    sock_z0, sock_z1 = zt - 3.0, zt + P["tenon_h"] + 3.0
    for sgn in (1, -1):
        xa = min(sgn * d["rail_x0"], sgn * d["rail_x1"])
        xb = max(sgn * d["rail_x0"], sgn * d["rail_x1"])
        outer = box(xa - P["socket_wall"], xb + P["socket_wall"],
                    t, t + d["rail_depth"] + P["socket_wall"], sock_z0, sock_z1)
        cavity = box(xa - 0.35, xb + 0.35, t - 1, t + d["rail_depth"] + 0.35,
                     sock_z0 - 1, zt + P["tenon_h"] + 0.35)
        plate += outer - cavity
        # steun tussen mof en plaat over de resterende plaathoogte
        plate += box(xa - P["socket_wall"], xb + P["socket_wall"], 0, t,
                     sock_z0 - 12.0, sock_z0)
        # dwarsgaten M3 + moerzak aan de binnenzijde van de mof
        for dz in (4.0, 11.0):
            zc, yc = zt + dz, t + d["rail_depth"] / 2
            plate -= cyl_x(zc, yc, xa - P["socket_wall"] - 1,
                           xb + P["socket_wall"] + 1, 3.4)
            if sgn > 0:
                plate -= hex_nut_x(zc, yc, xa - P["socket_wall"] - 0.01,
                                   xa - P["socket_wall"] + 2.7)
            else:
                plate -= hex_nut_x(zc, yc, xb + P["socket_wall"] - 2.7,
                                   xb + P["socket_wall"] + 0.01)
    return plate


def make_carriage(d):
    """Slede: basisplaat in de rails + toren met 1/4"-boutgat + onderlip."""
    bw, bh, bt = P["carriage_w"], P["base_h"], P["base_t"]
    y0 = d["cav_y0"] + P["clear"]
    y1 = y0 + bt
    base = box(-bw / 2, bw / 2, y0, y1, 0, bh)

    # Bovenste deel versmallen: boven het kanaal (uitgeschoven stand) moet de
    # slede tussen de moffen van de montageplaat door kunnen. Overgang op 45
    # graden voor een nette krachtdoorleiding.
    narrow_w = 140.0
    z_narrow = bh - P["overshoot"] - 4.0
    for sgn in (1, -1):
        base -= box(min(sgn * narrow_w / 2, sgn * (bw / 2 + 1)),
                    max(sgn * narrow_w / 2, sgn * (bw / 2 + 1)),
                    y0 - 1, y1 + 1, z_narrow, bh + 1)

    # V-groeven in de zijkanten (detent-notch)
    nz, depth = P["notch_z"], P["tooth"] + 0.3
    for sgn in (1, -1):
        ex = sgn * bw / 2
        pts = [(ex + sgn * 0.5, nz + depth + 0.5), (ex - sgn * depth, nz),
               (ex + sgn * 0.5, nz - depth - 0.5)]
        base -= prism_xz(pts, y0 - 1, y1 + 1)

    # Toren (bult naar de consolezijde voor de verzonken boutkop)
    tw, tt = P["tower_w"], P["tower_t"]
    tower = box(-tw / 2, tw / 2, y1 - tt, y1, bh - 10, d["tower_top_local"])
    hz = d["hole_z_local"]
    tower -= cyl_y(0, hz, y1 - tt - 1, y1 + 1, 6.9)
    tower -= hex_prism_y(0, hz, y1 - tt - 0.01, y1 - tt + 4.2, 11.8)
    base += tower

    # Onderlip: schap waar de monitor-onderrand op rust
    lz, lw = P["lip_offset"], 140.0
    shelf_y1 = y1 + 2.0 + P["mon_t"] + 1.5   # pad 2 mm + monitor + speling
    base += box(-lw / 2, lw / 2, y1, shelf_y1 + 4.0, lz - 8.0, lz)
    base += box(-lw / 2, lw / 2, shelf_y1, shelf_y1 + 4.0, lz, lz + 12.0)

    # Gewichtsbesparing: twee vensters in de basisplaat
    for sx in (-1, 1):
        base -= box(sx * 48 - 20, sx * 48 + 20, y0 - 1, y1 + 1, 8, nz - 10)
    return base


def monitor_dummy(d, mon_bot_z):
    y_back = d["cav_y0"] + P["clear"] + P["base_t"] + 2.0
    return box(-P["mon_w"] / 2, P["mon_w"] / 2, y_back, y_back + P["mon_t"],
               mon_bot_z, mon_bot_z + P["mon_h"])


# =====================================================================
# Genereren
# =====================================================================
def main():
    os.makedirs(OUT, exist_ok=True)
    d = derived()

    print("== Afgeleide maten ==")
    print(f"  slag (travel)            : {d['travel']:.1f} mm")
    print(f"  raillengte (incl. pen)   : {d['rail_len'] + P['tenon_h']:.1f} mm")
    print(f"  zichtbaar scherm (uit)   : {d['visible']:.0f} van {P['mon_h']:.0f} mm")
    print(f"  monitor-top opgeborgen   : {P['stowed_clearance']:.0f} mm onder de bovenrand")
    print(f"  paneel nodig onder bouten: {-d['rail_bot_z'] + 8:.0f} mm vlak")
    print(f"  uitbouw naar achteren    : ~{P['plate_t'] + d['cav_y0'] + P['base_t'] + 2 + P['mon_t']:.0f} mm")
    print("== Onderdelen ==")

    rail_r = make_rail(d)
    save(rail_r, "03_rail_rechts.stl")
    save(rail_r.mirror([1, 0, 0]), "02_rail_links.stl")

    foot = make_foot(d)
    save(foot, "06_voet_rechts.stl")
    save(foot.mirror([1, 0, 0]), "05_voet_links.stl")

    plate = make_plate(d)
    save(plate, "01_montageplaat.stl")

    carriage = make_carriage(d)
    save(carriage, "04_slede.stl")

    # Previews van de samenstelling (ter controle, niet printen)
    rails = rail_r + rail_r.mirror([1, 0, 0])
    feet = foot + foot.mirror([1, 0, 0])
    yoff = P["plate_t"]
    for name, base_bot in (("preview_uitgeschoven.stl", d["dep_base_bot"]),
                           ("preview_opgeborgen.stl", d["stow_base_bot"])):
        asm = plate \
            + (rails + feet).translate([0, yoff, 0]) \
            + (carriage + monitor_dummy(d, P["lip_offset"])).translate(
                [0, yoff, base_bot])
        save(asm, name)

    print("Klaar. STL's in:", OUT)


if __name__ == "__main__":
    main()
