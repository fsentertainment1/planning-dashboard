"""
Testglashouder voor fire-beam testglas op een Solo teststok.

Het glas (150 x 150 x 3 mm) schuift van bovenaf in een lijst. Het geheel bestaat
uit twee geprinte delen: de BOVENKANT (lijst met tong) print plat, de VOET
(kraag, randje en plug) print rechtop zodat de plug echt rond wordt. De tong
klikt in de voet en wordt vastgelijmd.

Een kort randje van de voet valt OVER de stok, de lange plug gaat IN de stok en
klikt met een geprinte veerlip in het gat van de stok.

Alles in millimeters. Wereld-assenstelsel:
    X  = breedte van de lijst (links/rechts), 0 = midden
    Y  = lengterichting / hartlijn van de stok, 0 = onderkant glas
    Z  = dikte, 0 = achterkant lijst = printbed

Uitvoer: STL's in ./stl
"""

from __future__ import annotations

import math
import os
import struct

from manifold3d import CrossSection, JoinType, Manifold, OpType, set_circular_segments

set_circular_segments(96)

HERE = os.path.dirname(os.path.abspath(__file__))
STL_DIR = os.path.join(HERE, "stl")

# --------------------------------------------------------------------------
# 1. GEMETEN MATEN  --  dit zijn de enige getallen die je hoeft aan te passen
# --------------------------------------------------------------------------

POLE_OD = 32.8          # buitendiameter stok (randje valt hier overheen)
POLE_ID = 28.8          # binnendiameter stok (plug gaat hier in)
POLE_WALL = (POLE_OD - POLE_ID) / 2

HOLE_D = 12.7           # diameter van het klikgat in de stok
HOLE_FROM_TIP = 63.9    # gemeten afstand kop stok -> gat
HOLE_MEASURED_TO = "edge"   # "edge" = tot de dichtstbijzijnde rand, "center" = tot het hart

GLASS_W = 150.2         # breedte testglas
GLASS_H = 150.2         # hoogte testglas
GLASS_T = 3.0           # dikte testglas

# Hart van het klikgat, gerekend vanaf de kop van de stok (= vanaf de schouder).
SNAP_CENTER = HOLE_FROM_TIP + (HOLE_D / 2 if HOLE_MEASURED_TO == "edge" else 0.0)

# --------------------------------------------------------------------------
# 2. PASSINGEN EN PRINTINSTELLINGEN
# --------------------------------------------------------------------------

FIT_PLUG = 1.0          # speling op diameter van de plugkern (ribben doen het werk)
FIT_RIB = -0.15         # negatief = de ribben klemmen licht in de buis
FIT_SKIRT = 0.8         # speling op diameter van het randje over de stok
GLASS_FIT_XY = 1.0      # totale speling op breedte/hoogte van de glassleuf
GLASS_FIT_T = 0.6       # extra speling op de dikte van de glassleuf

# --------------------------------------------------------------------------
# 3. AFGELEIDE MATEN
# --------------------------------------------------------------------------

# --- lijst ---
REBATE = 5.0            # hoeveel de lip over het glas heen valt
RAIL = 10.0             # massief materiaal buiten de glasrand
BACK_LIP = 3.0          # dikte achterlip (ligt op het bed)
SLOT_T = GLASS_T + GLASS_FIT_T
FRONT_LIP = 5.0         # dikte voorlip, afgeschuind onder 45 graden
FRAME_T = BACK_LIP + SLOT_T + FRONT_LIP

SLOT_W = GLASS_W + GLASS_FIT_XY         # sleufbreedte
SLOT_X = SLOT_W / 2                     # buitenrand sleuf
WINDOW_X = SLOT_X - REBATE              # binnenrand lip = raamopening
FRAME_X = SLOT_X + RAIL                 # buitenrand lijst

EAR_H = 22.0                            # oren steken boven het glas uit
FRAME_TOP = GLASS_H + EAR_H
BOTTOM_RAIL = 40.0                      # brede onderbalk waar de steel aan zit
FRAME_BOT = -BOTTOM_RAIL
WINDOW_BOT = 5.0                        # lip onder het glas
CORNER_R = 8.0

# --- glasklem ---
CLIP_Y0 = GLASS_H + 1.0
CLIP_Y1 = FRAME_TOP - 6.0
CLIP_T = SLOT_T - 0.3
CLIP_BUMP = 0.7                         # nokje dat in de kuiltjes klikt
CLIP_BUMP_Y = (CLIP_Y0 + CLIP_Y1) / 2

# --- kraag, randje en plug ---
SKIRT_ID = POLE_OD + FIT_SKIRT          # randje valt over de stok
SKIRT_WALL = 3.2
SKIRT_OD = SKIRT_ID + 2 * SKIRT_WALL
SKIRT_DEPTH = 12.0                      # hoe ver het randje over de stok valt

PLUG_R = (POLE_ID - FIT_PLUG) / 2       # kern van de plug
RIB_R_OUT = (POLE_ID - FIT_RIB) / 2     # buitenmaat over de centreerribben
RIB_ANGLES = (0.0, 45.0, 135.0, 180.0, 225.0, 315.0)  # vrij van de veerlip op 90
RIB_ROUND = 2.0
# Twee korte banden in plaats van ribben over de volle lengte: dat centreert
# net zo goed maar scheelt tweederde van de wrijving bij het inschuiven.
RIB_BANDS = ((6.0, 26.0), (-32.0, -12.0))   # negatief = gerekend vanaf de punt
PLUG_LEN = SNAP_CENTER + 16.0     # ruimte zodat de veerholte binnen het rechte deel blijft
PLUG_TIP_CHAMFER = 3.0

# --- veerlip met kliknok ---
TAB_LEN = 30.0
TAB_W = 11.0
TAB_T = 2.2
TAB_GAP = 1.6                           # zaagsnede rondom de lip
TAB_ANGLE = 90.0                        # lip op de zijkant: staande wand, print schoon
TAB_Z0 = SNAP_CENTER - 20.25            # wortel van de lip
TAB_Z1 = TAB_Z0 + TAB_LEN               # vrij uiteinde
BOSS_SPHERE_R = 5.5
BOSS_PROUD = 3.3                        # hoogte nok boven de plugkern
BOSS_CHAMFER = False                    # True = onderkant nok afvlakken tegen doorzakken
BOSS_MAX_OVERHANG = 45.0                # steilste overhang die de nok mag krijgen

# --- koppeling tussen bovenkant en voet ---
# De voet wordt apart en rechtop geprint, zodat de plug echt rond wordt. De
# bovenkant heeft een tong die in de holte van de voet klikt en gelijmd wordt.
TONGUE_W = 24.0                         # breedte van de tong
TONGUE_LEN = 20.0                       # hoe diep de tong in de voet steekt
TONGUE_LEAD = 1.5                       # afschuining onder 45 gr aan de punt
TONGUE_FIT = 0.20                       # speling per zijde, ruimte voor lijm
ARM_T = 2.4                             # dikte van een veerarm
ARM_SLOT = 1.6                          # zaagsnede die de armen vrij maakt
ARM_LEN = 16.0                          # lengte van de veerarmen
BARB_R = 3.0                            # bolletje op de arm
BARB_PROUD = 0.8                        # hoeveel het uitsteekt
BARB_POS = 14.0                         # afstand koppelvlak -> hart bolletje
BARB_DIMPLE = BARB_PROUD + 0.2          # diepte van het kuiltje in de voet

SOCKET_DEPTH = TONGUE_LEN + 1.0
COLLAR_LEN = SOCKET_DEPTH + 6.0         # koppelvlak tot schouder

# --- steel en printhouding ---
AXIS_Z = FRAME_T / 2                    # hartlijn stok ligt in het vlak van de lijst
JOINT_Y = FRAME_BOT                     # koppelvlak: onderkant lijst = bovenkant voet
SHOULDER_Y = JOINT_Y - COLLAR_LEN       # vlak waar de kop van de stok tegenaan komt

# --- naamplaatje ---
PLATE_W, PLATE_H, PLATE_DEPTH = 100.0, 16.0, 0.6
PLATE_Y = -22.0


# --------------------------------------------------------------------------
# 4. HULPFUNCTIES
# --------------------------------------------------------------------------

def rrect(w: float, h: float, r: float, cx: float = 0.0, cy: float = 0.0) -> CrossSection:
    """Rechthoek met afgeronde hoeken, gecentreerd op (cx, cy)."""
    r = min(r, w / 2 - 1e-6, h / 2 - 1e-6)
    cs = CrossSection.square([w - 2 * r, h - 2 * r], True).offset(r, JoinType.Round, 2.0, 0)
    return cs.translate([cx, cy])


def slab(cs: CrossSection, z0: float, z1: float) -> Manifold:
    """Extrudeer een profiel tussen twee Z-hoogtes."""
    return Manifold.extrude(cs, z1 - z0).translate([0.0, 0.0, z0])


def box(x0, x1, y0, y1, z0, z1) -> Manifold:
    return Manifold.cube([x1 - x0, y1 - y0, z1 - z0]).translate([x0, y0, z0])


def capsule(x, y, z0, z1, r) -> Manifold:
    """Afgeronde staaf langs Z, voor de centreerribben."""
    a = Manifold.sphere(r).translate([x, y, z0])
    b = Manifold.sphere(r).translate([x, y, z1])
    return Manifold.batch_hull([a, b])


def to_stl(m: Manifold, path: str) -> None:
    mesh = m.to_mesh()
    verts = mesh.vert_properties[:, :3]
    tris = mesh.tri_verts
    with open(path, "wb") as fh:
        fh.write(b"\0" * 80)
        fh.write(struct.pack("<I", len(tris)))
        for t in tris:
            a, b, c = verts[t[0]], verts[t[1]], verts[t[2]]
            ux, uy, uz = b[0] - a[0], b[1] - a[1], b[2] - a[2]
            vx, vy, vz = c[0] - a[0], c[1] - a[1], c[2] - a[2]
            nx, ny, nz = uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx
            ln = math.sqrt(nx * nx + ny * ny + nz * nz) or 1.0
            fh.write(struct.pack("<3f", nx / ln, ny / ln, nz / ln))
            for p in (a, b, c):
                fh.write(struct.pack("<3f", float(p[0]), float(p[1]), float(p[2])))
            fh.write(b"\0\0")


# --------------------------------------------------------------------------
# 5. DE LIJST
# --------------------------------------------------------------------------

def build_frame() -> Manifold:
    outline = rrect(2 * FRAME_X, FRAME_TOP - FRAME_BOT, CORNER_R,
                    cy=(FRAME_TOP + FRAME_BOT) / 2)
    body = slab(outline, 0.0, FRAME_T)

    # Raamopening: open aan de bovenkant zodat het glas erin kan schuiven.
    win_h = FRAME_TOP + 20.0 - WINDOW_BOT
    window_cs = rrect(2 * WINDOW_X, win_h, 3.0, cy=WINDOW_BOT + win_h / 2)
    body -= slab(window_cs, -1.0, FRAME_T + 1.0)

    # Glassleuf: loopt door tot boven de oren, zodat de klem er ook in past.
    slot_h = FRAME_TOP + 20.0
    slot_cs = rrect(SLOT_W, slot_h, 2.0, cy=slot_h / 2)
    body -= slab(slot_cs, BACK_LIP, BACK_LIP + SLOT_T)

    # 45-graden afschuining onder de voorlip: printbaar zonder support.
    steps = 25
    step_h = FRONT_LIP / steps
    chamfer = []
    for i in range(steps):
        t = i * step_h
        z0 = BACK_LIP + SLOT_T + t
        chamfer.append(slab(window_cs.offset(REBATE - t, JoinType.Round, 2.0, 0),
                            z0, z0 + step_h + 0.01))
    body -= Manifold.batch_boolean(chamfer, OpType.Add)

    # Kuiltjes waar de glasklem in vastklikt.
    for sx in (-1.0, 1.0):
        body -= Manifold.sphere(1.6).translate(
            [sx * SLOT_X, CLIP_BUMP_Y, BACK_LIP + SLOT_T / 2])

    # Verzonken vlakje voor je eigen tekst of logo.
    body -= slab(rrect(PLATE_W, PLATE_H, 2.0, cy=PLATE_Y),
                 FRAME_T - PLATE_DEPTH, FRAME_T + 1.0)
    return body


# --------------------------------------------------------------------------
# 6. DE VOET  (lokaal: plug langs +Z vanaf het koppelvlak, veerlip aan +Y)
# --------------------------------------------------------------------------

def build_foot(with_tab: bool = True) -> Manifold:
    """Kraag, randje en plug. Z=0 is het koppelvlak en ligt op het printbed;
    de plug wijst omhoog. In deze stand is er geen enkele overhang."""
    z0 = COLLAR_LEN                     # hoogte van de schouder
    collar = Manifold.cylinder(z0 + SKIRT_DEPTH, SKIRT_OD / 2, SKIRT_OD / 2)

    plug_len = PLUG_LEN
    straight = plug_len - PLUG_TIP_CHAMFER
    plug = Manifold.cylinder(straight, PLUG_R, PLUG_R).translate([0.0, 0.0, z0])
    plug += Manifold.cylinder(PLUG_TIP_CHAMFER, PLUG_R, PLUG_R - PLUG_TIP_CHAMFER) \
        .translate([0.0, 0.0, z0 + straight])

    body = collar + plug

    # Centreerribben: bepalen de werkelijke passing in de buis.
    rib_d = RIB_R_OUT - RIB_ROUND
    for ang in RIB_ANGLES:
        a = math.radians(ang)
        for lo, hi in RIB_BANDS:
            za = z0 + (lo if lo >= 0 else plug_len + lo)
            zb = z0 + (hi if hi >= 0 else plug_len + hi)
            body += capsule(rib_d * math.sin(a), rib_d * math.cos(a),
                            za, zb, RIB_ROUND)

    # Randje dat over de stok valt: alleen de ringvormige gleuf waar de
    # wand van de stok in schuift, zodat de plug blijft staan.
    bore = Manifold.cylinder(SKIRT_DEPTH + 2.0, RIB_R_OUT, RIB_R_OUT) \
        .translate([0.0, 0.0, z0 - 1.0])
    body -= (Manifold.cylinder(SKIRT_DEPTH + 1.0, SKIRT_ID / 2, SKIRT_ID / 2)
             .translate([0.0, 0.0, z0]) - bore)
    body -= (Manifold.cylinder(2.0, SKIRT_ID / 2 + 1.2, SKIRT_ID / 2)
             .translate([0.0, 0.0, z0 + SKIRT_DEPTH - 2.0]) - bore)

    # Buitenrand van het randje licht gebroken.
    body -= (Manifold.cylinder(1.2, SKIRT_OD / 2 + 2.0, SKIRT_OD / 2 + 2.0)
             - Manifold.cylinder(1.2, SKIRT_OD / 2 - 1.2, SKIRT_OD / 2)) \
        .translate([0.0, 0.0, z0 + SKIRT_DEPTH - 1.2])

    if with_tab:
        body = add_tab(body, z0 + SNAP_CENTER, z0 + TAB_Z0, z0 + TAB_Z1,
                       angle=TAB_ANGLE)
    return body - build_socket()


def add_tab(body: Manifold, boss_z: float, z0: float, z1: float,
            angle: float = 0.0) -> Manifold:
    """Snijdt een veerlip met kliknok uit de plug, op hoek `angle` rond de as."""
    half = TAB_W / 2
    outer = half + TAB_GAP
    reach = PLUG_R + 6.0

    cut = box(-outer, outer, 0.0, reach, z0, z1 + TAB_GAP)
    cut -= box(-half, half, 0.0, reach, z0 - 1.0, z1)
    # Ruimte onder de lip zodat hij kan veren.
    pocket = box(-outer, outer, 0.0, reach, z0 - 4.0, z1 + TAB_GAP) ^ \
        Manifold.cylinder(z1 + TAB_GAP - (z0 - 4.0), PLUG_R - TAB_T, PLUG_R - TAB_T) \
        .translate([0.0, 0.0, z0 - 4.0])

    d = PLUG_R + BOSS_PROUD - BOSS_SPHERE_R
    boss = Manifold.sphere(BOSS_SPHERE_R).translate([0.0, d, boss_z])
    boss = boss.trim_by_plane([0.0, 1.0, 0.0], PLUG_R - TAB_T)

    # De onderkant van de nok wijst bij het printen recht naar beneden en zou
    # daar doorzakken. Snijd hem af onder 45 graden, vanaf de lijn waar de bol
    # uit de plug tevoorschijn komt: dan is er nergens een overhang steiler dan
    # 45 graden en is er nog steeds geen support nodig. De insteekhelling en de
    # klemhelling liggen langs de as van de plug en blijven dus ongemoeid.
    if BOSS_CHAMFER:
        y_e = (PLUG_R ** 2 - BOSS_SPHERE_R ** 2 + d ** 2) / (2 * d)
        p_e = math.sqrt(max(PLUG_R ** 2 - y_e ** 2, 0.0))
        a = math.radians(angle)
        down = (math.sin(a), -math.cos(a))   # richting naar het printbed
        th = math.radians(BOSS_MAX_OVERHANG)
        nx = down[0] * math.sin(th)                  # normaal van het snijvlak:
        ny = down[1] * math.sin(th) + math.cos(th)   # th graden onder horizontaal
        ln = math.hypot(nx, ny) or 1.0
        nx, ny = nx / ln, ny / ln
        k = (p_e * down[0]) * nx + (y_e + p_e * down[1]) * ny
        boss = boss.trim_by_plane([-nx, -ny, 0.0], -k)

    tool = (cut + pocket).rotate([0.0, 0.0, -angle])
    boss = boss.rotate([0.0, 0.0, -angle])
    return (body - tool) + boss


def foot_to_world(m: Manifold) -> Manifold:
    """Zet de voet vanuit de printstand op zijn plek onder de lijst."""
    return m.rotate([90.0, 0.0, 0.0]).translate([0.0, JOINT_Y, AXIS_Z])


# --------------------------------------------------------------------------
# 7. STEEL EN SAMENSTELLING
# --------------------------------------------------------------------------

def build_socket() -> Manifold:
    """Holte in de voet waar de tong van de bovenkant in valt."""
    hw = TONGUE_W / 2 + TONGUE_FIT
    ht = FRAME_T / 2 + TONGUE_FIT
    sock = box(-hw, hw, -ht, ht, -1.0, SOCKET_DEPTH)
    # Kuiltjes waar de bolletjes van de veerarmen in klikken.
    for sx in (-1.0, 1.0):
        sock += Manifold.sphere(BARB_R + 0.4).translate(
            [sx * (hw + BARB_R + 0.4 - BARB_DIMPLE), 0.0, BARB_POS])
    return sock


# --------------------------------------------------------------------------
# 7. DE BOVENKANT: LIJST, HALS EN TONG
# --------------------------------------------------------------------------

def build_tongue() -> Manifold:
    """Tong met twee veerarmen. Lokaal: lengte langs +Z vanaf het koppelvlak."""
    hw, ht = TONGUE_W / 2, FRAME_T / 2
    cs = rrect(TONGUE_W, FRAME_T, 3.0)
    body = slab(cs, 0.0, TONGUE_LEN - TONGUE_LEAD)
    body += Manifold.extrude(
        cs, TONGUE_LEAD, 0, 0.0,
        (1 - 2 * TONGUE_LEAD / TONGUE_W, 1 - 2 * TONGUE_LEAD / FRAME_T)) \
        .translate([0.0, 0.0, TONGUE_LEN - TONGUE_LEAD])

    # Zaagsneden die de twee veerarmen vrij maken.
    inner = hw - ARM_T
    for sx in (-1.0, 1.0):
        lo, hi = sorted((sx * (inner - ARM_SLOT), sx * inner))
        body -= box(lo, hi, -ht - 1.0, ht + 1.0,
                    TONGUE_LEN - ARM_LEN, TONGUE_LEN + 2.0)

    # Bolletjes die in de kuiltjes van de voet klikken.
    for sx in (-1.0, 1.0):
        bump = Manifold.sphere(BARB_R).translate(
            [sx * (hw + BARB_PROUD - BARB_R), 0.0, BARB_POS])
        body += bump.trim_by_plane([sx, 0.0, 0.0], hw - 1.2)
    return body


def tongue_to_world(m: Manifold) -> Manifold:
    return m.rotate([90.0, 0.0, 0.0]).translate([0.0, JOINT_Y, AXIS_Z])


def build_neck() -> Manifold:
    """Overgang van de brede onderbalk naar het koppelvlak van de voet."""
    wide = box(-52.0, 52.0, -30.0, -26.0, 0.0, FRAME_T)
    face = box(-18.5, 18.5, JOINT_Y, JOINT_Y + 3.0, 0.0, FRAME_T)
    return Manifold.batch_hull([wide, face]).trim_by_plane([0.0, 1.0, 0.0], JOINT_Y)


def build_top() -> Manifold:
    """Deel 1: de lijst met hals en tong. Print plat op de achterkant."""
    return build_frame() + build_neck() + tongue_to_world(build_tongue())


def build_holder() -> Manifold:
    """Beide delen in elkaar, voor tekeningen en de 3D-viewer."""
    return build_top() + foot_to_world(build_foot())


def build_clip() -> Manifold:
    """Klemlat die na het glas in dezelfde sleuf schuift en vastklikt."""
    h = CLIP_Y1 - CLIP_Y0
    bar = slab(rrect(SLOT_W - 0.4, h, 2.0, cy=CLIP_Y0 + h / 2), 0.0, CLIP_T)
    for sx in (-1.0, 1.0):
        bar += Manifold.sphere(1.3).translate(
            [sx * (SLOT_X - 0.8), CLIP_BUMP_Y, CLIP_T / 2])
    bar = bar.trim_by_plane([0.0, 0.0, 1.0], 0.0)
    bar = bar.trim_by_plane([0.0, 0.0, -1.0], -CLIP_T)
    # Duimgreep om de klem er weer uit te trekken.
    bar += slab(rrect(26.0, 7.0, 2.0, cy=CLIP_Y1 - 4.0), 0.0, CLIP_T + 3.0)
    return bar


# --------------------------------------------------------------------------
# 8. EXPORT
# --------------------------------------------------------------------------

def main() -> None:
    os.makedirs(STL_DIR, exist_ok=True)
    items = {
        "bovenkant": build_top(),
        "voet": build_foot(),
        "glasklem": build_clip(),
    }
    for name, m in items.items():
        bb = m.bounding_box()
        size = [round(bb[i + 3] - bb[i], 1) for i in range(3)]
        to_stl(m, os.path.join(STL_DIR, f"{name}.stl"))
        print(f"{name:16s} {size[0]:7.1f} x {size[1]:7.1f} x {size[2]:7.1f} mm"
              f"   {m.volume() / 1000:8.1f} cm3   {m.num_tri():7d} tri  genus={m.genus()}")
    print(f"\nklikgat hart op {SNAP_CENTER:.2f} mm vanaf de schouder")
    print(f"tong {TONGUE_W} x {FRAME_T} x {TONGUE_LEN} mm in een holte van "
          f"{TONGUE_W + 2*TONGUE_FIT} x {FRAME_T + 2*TONGUE_FIT} mm")


if __name__ == "__main__":
    main()
