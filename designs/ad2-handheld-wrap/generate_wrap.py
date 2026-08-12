#!/usr/bin/env python3
"""
AD2 handheld wrap generator — full-360° UV-print artwork
for the xTool O1 Omni + OR1 rotary attachment.

The canvas is an unrolled cylinder:
  X-axis  = around the microphone (width == circumference, seamless)
  Y-axis  = along the microphone axis (top of canvas = capsule side)

The artwork is white + one amber accent on a TRANSPARENT background:
on the black anodized AD2 body you print graphics only (white-ink
underbase + colour), never a background fill.

Usage:
  python3 generate_wrap.py --diameter 37.0 --length 100 --channel 01
Re-measure the actual handle diameter with calipers and regenerate —
width must equal the true circumference or the seam will not close.
"""

import argparse
import math
import os

from PIL import Image, ImageDraw, ImageFont

FONT_DIR = os.environ.get(
    "WRAP_FONT_DIR", "/root/.claude/skills/synced/canvas-design/canvas-fonts"
)

WHITE = (255, 255, 255, 255)
WHITE_SOFT = (255, 255, 255, 200)
AMBER = (232, 164, 61, 255)
AMBER_SOFT = (232, 164, 61, 215)


class Wrap:
    def __init__(self, diameter_mm, length_mm, dpi, ss=2):
        self.circ_mm = math.pi * diameter_mm
        self.len_mm = length_mm
        self.dpi = dpi
        self.ss = ss  # supersampling factor
        self.W = round(self.circ_mm / 25.4 * dpi) * ss
        self.H = round(self.len_mm / 25.4 * dpi) * ss
        self.img = Image.new("RGBA", (self.W, self.H), (0, 0, 0, 0))
        self.draw = ImageDraw.Draw(self.img)

    def mm(self, v):
        """mm -> supersampled px"""
        return v / 25.4 * self.dpi * self.ss

    def x_at(self, frac):
        """position around the circumference, 0..1 -> px"""
        return frac * self.W

    def font(self, name, size_mm):
        return ImageFont.truetype(
            os.path.join(FONT_DIR, name), int(round(self.mm(size_mm)))
        )

    # ---- primitives -------------------------------------------------

    def ring(self, y_mm, weight_mm, color=WHITE):
        """hairline circling the full circumference (seamless)"""
        y = self.mm(y_mm)
        w = max(1, round(self.mm(weight_mm)))
        self.draw.rectangle([0, y - w / 2, self.W, y + w / 2], fill=color)

    def degree_scale(self, y_top_mm, color=WHITE):
        """0-360° graduation ring: minors 3°, mediums 15°, majors 30°,
        mono labels under the majors. Perfectly seam-continuous."""
        y0 = self.mm(y_top_mm)
        f = self.font("DMMono-Regular.ttf", 1.55)
        for deg in range(0, 360, 3):
            x = self.W * deg / 360.0
            if deg % 30 == 0:
                ln, w = self.mm(2.6), self.mm(0.22)
            elif deg % 15 == 0:
                ln, w = self.mm(1.8), self.mm(0.15)
            else:
                ln, w = self.mm(1.1), self.mm(0.12)
            self.draw.rectangle([x - w / 2, y0, x + w / 2, y0 + ln], fill=color)
            if deg % 30 == 0:
                label = f"{deg:03d}"
                bb = self.draw.textbbox((0, 0), label, font=f)
                tw = bb[2] - bb[0]
                ty = y0 + self.mm(3.3)
                if deg == 0:
                    # seam label: draw both halves so it tiles
                    self.draw.text((x - tw / 2, ty), label, font=f, fill=WHITE_SOFT)
                    self.draw.text(
                        (self.W + x - tw / 2, ty), label, font=f, fill=WHITE_SOFT
                    )
                else:
                    self.draw.text((x - tw / 2, ty), label, font=f, fill=WHITE_SOFT)

    def text_around(self, text, y_mm, frac, size_mm, font_name="DMMono-Regular.ttf",
                    tracking_mm=0.55, color=WHITE_SOFT):
        """micro-label running in the circling direction, centered at frac"""
        f = self.font(font_name, size_mm)
        widths = []
        for ch in text:
            bb = self.draw.textbbox((0, 0), ch, font=f)
            widths.append(bb[2] - bb[0])
        tr = self.mm(tracking_mm)
        total = sum(widths) + tr * (len(text) - 1)
        x = self.x_at(frac) - total / 2
        asc, _ = f.getmetrics()
        y = self.mm(y_mm) - asc / 2
        for ch, w in zip(text, widths):
            self.draw.text((x, y), ch, font=f, fill=color)
            x += w + tr

    def wordmark_axial(self, text, frac, y_top_mm, y_bot_mm, size_mm,
                       font_name="Jura-Light.ttf", color=WHITE):
        """large wordmark reading along the mic axis (capsule -> bottom),
        letter-spaced to exactly fill y_top..y_bot"""
        f = self.font(font_name, size_mm)
        # render horizontally on its own layer, then rotate 90° CW
        pad = int(self.mm(2))
        bb = ImageDraw.Draw(Image.new("RGBA", (8, 8))).textbbox((0, 0), text, font=f)
        span = self.mm(y_bot_mm - y_top_mm)
        n = len(text)
        widths = []
        tmp = ImageDraw.Draw(Image.new("RGBA", (8, 8)))
        for ch in text:
            b = tmp.textbbox((0, 0), ch, font=f)
            widths.append(b[2] - b[0])
        gap = (span - sum(w for w, c in zip(widths, text) if c != " ")
               - sum(self.mm(size_mm) * 0.55 for c in text if c == " ")) / (n - 1)
        layer_w = int(span) + 2 * pad
        layer_h = int(self.mm(size_mm) * 1.6) + 2 * pad
        layer = Image.new("RGBA", (layer_w, layer_h), (0, 0, 0, 0))
        ld = ImageDraw.Draw(layer)
        x = pad
        for ch, w in zip(text, widths):
            if ch == " ":
                x += self.mm(size_mm) * 0.55 + gap
                continue
            b = ld.textbbox((0, 0), ch, font=f)
            ld.text((x - b[0], pad - b[1] + (layer_h - 2 * pad - (b[3] - b[1])) / 2),
                    ch, font=f, fill=color)
            x += w + gap
        layer = layer.transpose(Image.ROTATE_270)
        px = int(self.x_at(frac) - layer.width / 2)
        py = int(self.mm(y_top_mm)) - pad
        self.img.alpha_composite(layer, (px, py))

    def waveform(self, y_center_mm, amp_mm, weight_mm, color, harmonics,
                 phase=0.0):
        """closed-loop waveform: only integer numbers of periods, so the
        curve returns to its starting phase at the seam"""
        yc = self.mm(y_center_mm)
        amp = self.mm(amp_mm)
        w = max(1, round(self.mm(weight_mm)))
        pts = []
        n = 2400
        for i in range(n + 1):
            t = i / n
            v = sum(a * math.sin(2 * math.pi * (k * t + phase)) for k, a in harmonics)
            pts.append((t * self.W, yc + amp * v))
        self.draw.line(pts, fill=color, width=w, joint="curve")

    def logo_axial(self, path, frac, y_top_mm, y_bot_mm):
        """logo image reading along the mic axis (capsule -> bottom),
        scaled to fill y_top..y_bot along the axis"""
        logo = Image.open(path).convert("RGBA")
        span = int(self.mm(y_bot_mm - y_top_mm))
        across = int(span * logo.height / logo.width)
        logo = logo.resize((span, across), Image.LANCZOS)
        logo = logo.transpose(Image.ROTATE_270)
        px = int(self.x_at(frac) - logo.width / 2)
        py = int(self.mm(y_top_mm))
        self.img.alpha_composite(logo, (px, py))

    def logo_around(self, path, frac, y_center_mm, width_mm):
        """small logo in the circling direction (upright when the mic
        stands vertical), centered at frac"""
        logo = Image.open(path).convert("RGBA")
        w_px = int(self.mm(width_mm))
        h_px = int(w_px * logo.height / logo.width)
        logo = logo.resize((w_px, h_px), Image.LANCZOS)
        px = int(self.x_at(frac) - w_px / 2)
        py = int(self.mm(y_center_mm) - h_px / 2)
        self.img.alpha_composite(logo, (px, py))

    def keepout_window(self, frac, y_center_mm, w_mm, h_mm, frame=True):
        """erase a display/control window and (optionally) draw a fine
        keyline frame 1 mm outside it, so the opening looks intentional"""
        cx, cy = self.x_at(frac), self.mm(y_center_mm)
        hw, hh = self.mm(w_mm) / 2, self.mm(h_mm) / 2
        self.draw.rounded_rectangle(
            [cx - hw, cy - hh, cx + hw, cy + hh],
            radius=self.mm(1.2), fill=(0, 0, 0, 0),
        )
        if frame:
            g = self.mm(1.0)
            self.draw.rounded_rectangle(
                [cx - hw - g, cy - hh - g, cx + hw + g, cy + hh + g],
                radius=self.mm(1.8), outline=WHITE_SOFT,
                width=max(1, round(self.mm(0.15))),
            )

    def channel_tag(self, channel, frac, y_center_mm):
        """keyline rounded box with the channel number, amber"""
        f = self.font("GeistMono-Bold.ttf", 5.2)
        fl = self.font("DMMono-Regular.ttf", 1.7)
        txt = channel
        bb = self.draw.textbbox((0, 0), txt, font=f)
        tw, th = bb[2] - bb[0], bb[3] - bb[1]
        pad_x, pad_y = self.mm(2.6), self.mm(2.0)
        cx, cy = self.x_at(frac), self.mm(y_center_mm)
        box = [cx - tw / 2 - pad_x, cy - th / 2 - pad_y,
               cx + tw / 2 + pad_x, cy + th / 2 + pad_y]
        self.draw.rounded_rectangle(
            box, radius=self.mm(1.1), outline=AMBER, width=max(1, round(self.mm(0.22)))
        )
        self.draw.text((cx - tw / 2 - bb[0], cy - th / 2 - bb[1]), txt,
                       font=f, fill=AMBER)
        lbb = self.draw.textbbox((0, 0), "CH", font=fl)
        self.draw.text((cx - (lbb[2] - lbb[0]) / 2, box[1] - self.mm(3.2)),
                       "CH", font=fl, fill=AMBER_SOFT)

    def save(self, path):
        out = self.img.resize((self.W // self.ss, self.H // self.ss),
                              Image.LANCZOS)
        out.save(path, dpi=(self.dpi, self.dpi))
        return out


def build(args):
    w = Wrap(args.diameter, args.length, args.dpi)
    L = args.length

    # --- top group: double ring + degree graduation -------------------
    w.ring(5.0, 0.25, WHITE)
    w.ring(5.9, 0.12, AMBER)
    w.degree_scale(8.2)

    # --- identity micro-label -----------------------------------------
    w.text_around(args.subline, 18.0, 0.50, 1.75)

    # --- branding -------------------------------------------------------
    if args.logo:
        # small horizontal logo low on the sleeve, twice, 180° apart,
        # just above the waveform
        w.logo_around(args.logo, 0.25, L - 27.0, 17.0)
        w.logo_around(args.logo, 0.75, L - 27.0, 17.0)
    else:
        w.wordmark_axial(args.brand, 0.25, 25.0, L - 23.0, 8.6)
        w.wordmark_axial(args.brand, 0.75, 25.0, L - 23.0, 8.6)

    # --- channel tag at 180° -------------------------------------------
    if args.channel:
        w.channel_tag(args.channel, 0.50, (25.0 + L - 23.0) / 2)

    # --- waveform ring, closed loop ------------------------------------
    yw = L - 15.5
    harmonics = [(3, 0.78), (6, 0.17), (12, 0.05)]
    w.waveform(yw, 2.4, 0.32, WHITE, harmonics)
    w.waveform(yw, 2.4, 0.14, AMBER_SOFT, harmonics, phase=0.04)

    # --- bottom group ---------------------------------------------------
    w.ring(L - 9.4, 0.12, AMBER)
    w.ring(L - 8.5, 0.25, WHITE)
    w.text_around(args.url, L - 5.6, 0.50, 1.75)

    # --- optional display/control keep-out window (erased last) ---------
    # The AD2 itself needs none: its display and controls sit UNDER the
    # screw-off handle sleeve. Use this for transmitters with an exposed
    # display (e.g. ULXD2), or to clear any other exterior feature.
    if args.window:
        frac, ycen, ww, wh = (float(v) for v in args.window.split(","))
        w.keepout_window(frac, ycen, ww, wh)

    return w


def mockup(flat, args, out_path):
    """simple cylindrical preview: front half of the wrap shaded and
    foreshortened, drawn over a dark ground"""
    dpi = 150
    scale = dpi / args.dpi
    art = flat.resize((int(flat.width * scale * 4), int(flat.height * scale * 4)),
                      Image.LANCZOS)  # oversample source for column sampling
    circ_px = art.width
    h = art.height
    r_screen = int(circ_px / (2 * math.pi))
    view_w = 2 * r_screen
    view = Image.new("RGBA", (view_w, h), (0, 0, 0, 0))
    body = (28, 28, 30, 255)
    vd = ImageDraw.Draw(view)
    vd.rectangle([0, 0, view_w, h], fill=body)
    # sample columns: screen x -> theta on front half
    src = art.load()
    dst = view.load()
    start_frac = 0.25 - 0.25  # center the 0.25C wordmark on the front
    for sx in range(view_w):
        c = (sx + 0.5 - r_screen) / r_screen
        c = max(-1, min(1, c))
        theta = math.asin(c)                      # -pi/2..pi/2 front half
        frac = (start_frac + 0.25 + theta / (2 * math.pi)) % 1.0
        ax = int(frac * circ_px) % circ_px
        shade = 0.35 + 0.65 * math.cos(theta) ** 0.8
        for sy in range(h):
            p = src[ax, sy]
            if p[3] > 8:
                a = p[3] / 255
                base = dst[sx, sy]
                dst[sx, sy] = tuple(
                    int(base[i] * (1 - a) + p[i] * shade * a) for i in range(3)
                ) + (255,)
            else:
                edge = 1 - 0.55 * (1 - math.cos(theta)) ** 1.2
                g = int(30 * edge) + int(14 * math.cos(theta))
                dst[sx, sy] = (g, g, g + 2, 255)

    # assemble scene
    m = int(view_w * 0.9)
    scene_w = view_w + 2 * m
    cap_h = int(view_w * 1.15)
    tail_h = int(view_w * 0.35)
    scene_h = h + cap_h + tail_h + 2 * m
    scene = Image.new("RGB", (scene_w, scene_h), (12, 12, 13))
    sd = ImageDraw.Draw(scene)
    cx = scene_w // 2
    top = m + cap_h
    # capsule: dome + fine grille lines
    dome = [cx - r_screen * 1.35, m, cx + r_screen * 1.35, m + cap_h * 1.6]
    sd.pieslice(dome, 180, 360, fill=(52, 52, 55))
    for i in range(10):
        yy = m + int(cap_h * 0.08) + i * int(cap_h * 0.075)
        half = math.sqrt(max(0, 1 - ((yy - (m + cap_h * 0.8)) / (cap_h * 0.8)) ** 2))
        hw = int(r_screen * 1.30 * half) if yy < m + cap_h * 0.8 else int(r_screen * 1.3)
        sd.line([cx - hw, yy, cx + hw, yy], fill=(24, 24, 26), width=2)
    sd.rectangle([cx - r_screen * 1.02, m + cap_h * 0.78, cx + r_screen * 1.02, top],
                 fill=(40, 40, 43))
    scene.paste(view.convert("RGB"), (cx - r_screen, top))
    # bottom taper
    sd.polygon([(cx - r_screen, top + h), (cx + r_screen, top + h),
                (cx + int(r_screen * 0.86), top + h + tail_h),
                (cx - int(r_screen * 0.86), top + h + tail_h)], fill=(26, 26, 28))
    sd.ellipse([cx - int(r_screen * 0.86), top + h + tail_h - 6,
                cx + int(r_screen * 0.86), top + h + tail_h + 10], fill=(18, 18, 20))
    scene.save(out_path, dpi=(dpi, dpi))


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--diameter", type=float, default=37.0,
                    help="handle diameter in mm (measure with calipers!)")
    ap.add_argument("--length", type=float, default=100.0,
                    help="printable sleeve length in mm along the axis")
    ap.add_argument("--dpi", type=int, default=600)
    ap.add_argument("--channel", default="01",
                    help="channel number for the tag ('' to omit)")
    ap.add_argument("--brand", default="FS AUDIO")
    ap.add_argument("--logo", default="",
                    help="path to a transparent PNG logo; replaces the text "
                         "wordmark on both sides")
    ap.add_argument("--window", default="",
                    help="display keep-out 'frac,y_center_mm,w_mm,h_mm' "
                         "(e.g. '0.5,50,30,14'); not needed for the AD2 — "
                         "its display sits under the handle sleeve")
    ap.add_argument("--subline",
                    default="FS AUDIO & TECHNOLOGY  ·  AXIENT DIGITAL AD2  ·  470–616 MHz")
    ap.add_argument("--url", default="fsaudio.nl")
    ap.add_argument("--out", default="ad2-wrap-print.png")
    ap.add_argument("--mockup", default="ad2-wrap-mockup.png",
                    help="preview path ('' to skip)")
    args = ap.parse_args()

    w = build(args)
    flat = w.save(args.out)
    print(f"print file : {args.out}  {flat.width}x{flat.height}px @ {args.dpi}dpi "
          f"= {w.circ_mm:.2f} x {w.len_mm:.1f} mm  (Ø {args.diameter} mm)")
    if args.mockup:
        mockup(flat, args, args.mockup)
        print(f"mockup     : {args.mockup}")


if __name__ == "__main__":
    main()
