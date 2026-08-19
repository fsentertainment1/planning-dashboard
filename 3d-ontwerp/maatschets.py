"""Maatschets (SVG) van de doorsnede door de kraag, de plug en de veerlip.

De snede ligt in het vlak door de hartlijn van de stok en de veerlip, zodat het
randje, de schouder en de kliknok alle drie zichtbaar zijn. De stok is er als
stippellijn overheen getekend.
"""

from __future__ import annotations

import os

import testglashouder as T

W, H = 1420.0, 940.0
CX = 585.0                     # hartlijn van de stok op het doek
SCALE = 4.1                    # px per mm
TOP_Y = T.SHOULDER_Y + 26.0    # bovenrand van de tekening (in model-mm)
TOP_PX = 150.0

LEFT_TEXT = 415.0
RIGHT_TEXT = 800.0


def px(x: float, y: float) -> tuple[float, float]:
    """Model (mm) -> doek (px). De stok wijst naar beneden."""
    return (CX + x * SCALE, TOP_PX + (TOP_Y - y) * SCALE)


def path_of(cs) -> str:
    out = []
    for poly in cs.to_polygons():
        pts = ["%.2f,%.2f" % px(p[0], p[1]) for p in poly]
        out.append("M " + " L ".join(pts) + " Z")
    return " ".join(out)


def seg(x1, y1, x2, y2, cls="thin") -> str:
    a, b = px(x1, y1), px(x2, y2)
    return (f'<line class="{cls}" x1="{a[0]:.1f}" y1="{a[1]:.1f}"'
            f' x2="{b[0]:.1f}" y2="{b[1]:.1f}"/>')


def leader(text: str, mx: float, my: float, ty: float, side: str) -> str:
    """Bijschrift met aanwijslijn naar een punt op het model."""
    a = px(mx, my)
    tx = LEFT_TEXT if side == "left" else RIGHT_TEXT
    knee = tx + (18.0 if side == "left" else -18.0)
    anchor = "end" if side == "left" else "start"
    return (f'<polyline class="lead" points="{a[0]:.1f},{a[1]:.1f} '
            f'{knee:.1f},{ty:.1f} {tx:.1f},{ty:.1f}"/>'
            f'<circle class="dot" cx="{a[0]:.1f}" cy="{a[1]:.1f}" r="2.4"/>'
            f'<text class="note" x="{tx:.1f}" y="{ty:.1f}" text-anchor="{anchor}"'
            f' dominant-baseline="middle">{text}</text>')


def dim_v(x: float, ya: float, yb: float, text: str, side: float) -> str:
    a, b = px(x, ya), px(x, yb)
    tx = a[0] + 10 * side
    anchor = "start" if side > 0 else "end"
    return (f'<line class="dim" x1="{a[0]:.1f}" y1="{a[1]:.1f}" x2="{b[0]:.1f}"'
            f' y2="{b[1]:.1f}" marker-start="url(#a)" marker-end="url(#a)"/>'
            f'<text class="lbl" x="{tx:.1f}" y="{(a[1]+b[1])/2:.1f}"'
            f' text-anchor="{anchor}" dominant-baseline="middle">{text}</text>')


def dim_h(y: float, xa: float, xb: float, text: str, dy: float) -> str:
    a, b = px(xa, y), px(xb, y)
    return (f'<line class="dim" x1="{a[0]:.1f}" y1="{a[1]:.1f}" x2="{b[0]:.1f}"'
            f' y2="{b[1]:.1f}" marker-start="url(#a)" marker-end="url(#a)"/>'
            f'<text class="lbl" x="{(a[0]+b[0])/2:.1f}" y="{a[1]+dy:.1f}"'
            f' text-anchor="middle">{text}</text>')


def main() -> None:
    section = T.build_holder().slice(T.AXIS_Z)

    top = T.SHOULDER_Y                       # schouder = kop van de stok
    tip = top - T.PLUG_LEN                   # punt van de plug
    bot = tip - 10.0
    ro, ri = T.POLE_OD / 2, T.POLE_ID / 2
    hole = top - T.SNAP_CENTER               # hart van het klikgat

    p = [f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H:.0f}"
  width="{W:.0f}" height="{H:.0f}" font-family="Inter, Helvetica, Arial, sans-serif">
<defs><marker id="a" markerWidth="9" markerHeight="9" refX="4.5" refY="4.5" orient="auto">
<path d="M1,4.5 L8,1.8 L8,7.2 Z" fill="#8a8a8a"/></marker></defs>
<style>
  .part {{ fill:#d9382f; fill-opacity:.14; stroke:#c02a22; stroke-width:1.7; }}
  .pole {{ fill:none; stroke:#2c3340; stroke-width:1.5; stroke-dasharray:8 4; }}
  .ctr  {{ stroke:#a3a3a3; stroke-width:.9; stroke-dasharray:14 4 3 4; }}
  .thin {{ stroke:#9aa0a8; stroke-width:.8; }}
  .dim  {{ stroke:#8a8a8a; stroke-width:1; }}
  .lead {{ fill:none; stroke:#b6bcc4; stroke-width:1; }}
  .dot  {{ fill:#c02a22; }}
  .lbl  {{ font-size:14px; fill:#2c3340; }}
  .note {{ font-size:14px; fill:#4a535e; }}
  .ttl  {{ font-size:22px; fill:#14181e; font-weight:600; }}
  .sub  {{ font-size:14px; fill:#6b7480; }}
  .key  {{ font-size:13.5px; fill:#4a535e; }}
  .keyb {{ font-size:13.5px; fill:#14181e; font-weight:600; }}
</style>
<rect width="100%" height="100%" fill="#fbfaf8"/>
<text class="ttl" x="40" y="52">Testglashouder &#183; doorsnede kraag en plug</text>
<text class="sub" x="40" y="78">Snede door de hartlijn van de stok en de veerlip.
 Stippellijn = de stok. Alle maten in mm.</text>''']

    # --- de stok ---
    for s in (-1.0, 1.0):
        p.append(seg(s * ro, top, s * ro, bot, "pole"))
        p.append(seg(s * ri, top, s * ri, bot, "pole"))
        p.append(seg(s * ri, hole - T.HOLE_D / 2, s * ro, hole - T.HOLE_D / 2, "pole"))
        p.append(seg(s * ri, hole + T.HOLE_D / 2, s * ro, hole + T.HOLE_D / 2, "pole"))
    p.append(seg(-ro, top, ro, top, "pole"))

    # --- het onderdeel ---
    p.append(f'<path class="part" d="{path_of(section)}"/>')
    p.append(seg(0, TOP_Y - 2, 0, bot - 2, "ctr"))
    p.append(seg(-T.SKIRT_OD / 2 - 8, top, T.SKIRT_OD / 2 + 8, top))

    # --- maten ---
    p.append(dim_v(T.SKIRT_OD / 2 + 30, top, hole,
                   f"{T.SNAP_CENTER:.2f}", side=1))
    p.append(dim_v(-T.SKIRT_OD / 2 - 14, top, top - T.SKIRT_DEPTH,
                   f"{T.SKIRT_DEPTH:.0f}", side=-1))
    p.append(dim_v(T.SKIRT_OD / 2 + 8, top, tip, f"{T.PLUG_LEN:.1f}", side=1))
    p.append(dim_h(T.SHOULDER_Y + 15, -T.SKIRT_OD / 2, T.SKIRT_OD / 2,
                   f"&#216;{T.SKIRT_OD:.1f}", dy=-9))
    p.append(dim_h(bot + 2, -ri, ri, f"&#216;{T.POLE_ID} (stok binnen)", dy=20))

    # --- bijschriften ---
    p.append(leader("randje valt 12 mm over de stok",
                    -T.SKIRT_OD / 2, top - T.SKIRT_DEPTH / 2, 250.0, "left"))
    p.append(leader("schouder &#8211; hier stopt de stok",
                    -T.RIB_R_OUT - 1.2, top, 196.0, "left"))
    p.append(leader("centreerribben bepalen de passing",
                    -T.PLUG_R, top - 34.0, 430.0, "left"))
    p.append(leader("afbreekkiel onder de plug &#8211; na het printen afknippen",
                    -1.0, tip + 14.0, 610.0, "left"))
    p.append(leader("veerlip met kliknok, klikt in het gat &#216;12,7",
                    T.RIB_R_OUT, hole, 470.0, "right"))
    p.append(leader("nok steekt 0,8 mm uit: indrukken om los te maken", T.RIB_R_OUT + 3.3, hole - 6.0,
                    530.0, "right"))
    p.append(leader("plugpunt afgeschuind, loopt vanzelf in",
                    0.0, tip, 636.0, "right"))

    # --- legenda ---
    rows = [
        ("stok buiten / binnen", f"&#216;{T.POLE_OD} / &#216;{T.POLE_ID}"),
        ("boring randje", f"&#216;{T.SKIRT_ID:.1f} (+{T.FIT_SKIRT} speling)"),
        ("plug over ribben", f"&#216;{2*T.RIB_R_OUT:.2f} (&#8722;{T.FIT_RIB} speling)"),
        ("plugkern", f"&#216;{2*T.PLUG_R:.1f}"),
        ("klikgat stok", f"&#216;{T.HOLE_D} op {T.SNAP_CENTER:.2f} vanaf de kop"),
        ("testglas", f"{T.GLASS_W:.0f} &#215; {T.GLASS_H:.0f} &#215; {T.GLASS_T:.0f}"),
    ]
    y = 762.0
    p.append(f'<text class="keyb" x="800" y="{y:.0f}">Kernmaten</text>')
    for i, (k, v) in enumerate(rows):
        yy = y + 26 + i * 22
        p.append(f'<text class="key" x="800" y="{yy:.0f}">{k}</text>')
        p.append(f'<text class="keyb" x="1065" y="{yy:.0f}">{v}</text>')
    p.append("</svg>")

    out = os.path.join(T.HERE, "renders", "maatschets.svg")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "w", encoding="utf-8") as fh:
        fh.write("\n".join(p))
    print("geschreven:", os.path.relpath(out, T.HERE))


if __name__ == "__main__":
    main()
