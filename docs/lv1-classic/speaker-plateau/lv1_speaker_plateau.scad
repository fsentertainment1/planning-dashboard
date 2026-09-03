// =====================================================================
//  Waves LV1 Classic - speakerplateau op de bovenrand van de schermklep
// =====================================================================
//  Twee zadels klemmen over de bovenrand van de klep, links en rechts
//  naast de middelste bevestiging. Daarop ligt een plateau.
//
//  Alle maten in mm. Maatvoering van de klep is afgeleid uit de
//  officiele Waves case-design tekening v1.0 (2024-SEP-19), schaal 1:7.
//  Zie ../DIMENSIONS.md. Controleer lid_t met een schuifmaat voor je
//  het definitieve exemplaar print.
//
//  Rendermodus: zet PART hieronder.
// =====================================================================

PART = "all";   // "saddle" | "platform" | "pad" | "all"

// ---------- gemeten kepgeometrie (bovenrand schermklep) ---------------
lid_t          = 36.0;   // totale dikte van de klep
lid_angle      = 60;     // hoek van de klep t.o.v. horizontaal
lid_top_flat_a = 10.8;   // begin vlakke topvlak, gemeten vanaf achtervlak
lid_top_flat_b = 30.2;   // einde vlakke topvlak
lid_cham_rear  = 9.75;   // diepte 45-graden afschuining aan achterzijde
lid_bevel_front= 12.25;  // diepte van de afronding naar het voorvlak

// ---------- zadel ----------------------------------------------------
clr        = 1.2;   // ruimte rondom: 0.4 speling + 0.8 voor vilt
wall       = 6;     // wanddikte van de poten
roof_t     = 8;     // materiaal boven de kepholte
sad_w      = 60;    // breedte van een zadel (langs de bovenrand)
grip_rear  = 55;    // hoe ver de achterpoot langs de klep omlaag grijpt
grip_front = 14;    // voorlip - kort, zodat het scherm vrij blijft
fillet     = 3;     // afronding buitenkant

// klemschroef in de achterpoot: M5 met smeltinzetstuk (heat-set insert)
scr_d      = 5.4;   // doorvoergat M5 door de rest van de wand
scr_z      = -36;   // hoogte t.o.v. topvlak van de klep
ins_d      = 6.4;   // boring voor M5 heat-set insert
ins_h      = 9.5;   // diepte van die boring
boss_d     = 22;    // verdikking rond de schroef aan de buitenzijde
boss_l     = 13;

// montagevlak bovenop het zadel (horizontaal als de klep op lid_angle staat)
pad_x0     = -45;   // voorkant montagevlak t.o.v. bovenrand klep
pad_x1     =  25;   // achterkant
pad_t      = 9;     // dikte
pad_top    = 30;    // hoogte bovenkant t.o.v. midden topvlak klep
m4_free    = 4.5;
m4_head    = 8.6;   // verzonken kop
m4_ins_d   = 5.7;   // boring voor M4 heat-set insert
m4_ins_h   = 8;

// ---------- plateau --------------------------------------------------
saddle_pitch = 179.4;  // hart-op-hart afstand tussen de twee zadels
plat_y       = 230;    // breedte (langs de console)
plat_x       = 130;    // diepte
plat_t       = 5;      // bodemdikte
plat_lip     = 9;      // opstaande rand
plat_x_front = -70;    // voorrand plateau t.o.v. bovenrand klep
                       // negatief = naar voren, over het scherm heen
strap_w      = 25;     // sleuf voor spanband
strap_h      = 4;

$fn = 48;

// =====================================================================
//  hulpstukken
// =====================================================================

// Doorsnede van de klepbovenrand in het "klepframe":
//   x = 0 op het achtervlak, +x naar het scherm toe
//   z = 0 op het topvlak, -z langs de klep omlaag
module lid_section_2d(deep = 90) {
    offset(r = clr)
        polygon([
            [0,               -deep],
            [0,               -lid_cham_rear],
            [lid_top_flat_a,   0],
            [lid_top_flat_b,   0],
            [lid_t - 0.1,     -lid_bevel_front],
            [lid_t,           -lid_bevel_front - 0.6],
            [lid_t,           -deep],
        ]);
}

module lid_cavity(w) {
    translate([0, w + 0.5, 0])
        rotate([90, 0, 0])
            linear_extrude(height = w + 1)
                lid_section_2d();
}

// Zadelromp in klepframe, voor de holte eruit gaat.
module saddle_blank(w) {
    hull_r = fillet;
    // achterpoot
    translate([-wall - clr, 0, 0])
        rounded_box([wall + clr + lid_t / 2, w, grip_rear + roof_t],
                    [0, 0, -grip_rear], hull_r);
    // voorlip
    translate([lid_t / 2, 0, 0])
        rounded_box([lid_t / 2 + wall + clr, w, grip_front + roof_t],
                    [0, 0, -grip_front], hull_r);
}

module rounded_box(size, origin, r) {
    translate([origin[0], origin[1], origin[2]])
        minkowski() {
            cube([size[0] - 2 * r, size[1] - 2 * r, size[2] - 2 * r]);
            translate([r, r, r]) sphere(r = r);
        }
}

// =====================================================================
//  zadel
// =====================================================================

// Draaiing van het klepframe naar de wereld:
//   klep-z (uit het topvlak omhoog)  -> schuin omhoog naar achteren
//   klep-x (achtervlak -> schermzijde) -> schuin omhoog naar voren
lid_rot = 270 - lid_angle;
module lid_frame() { rotate([0, lid_rot, 0]) rotate([180, 0, 0]) children(); }

module saddle() {
    difference() {
        union() {
            // klemdeel
            lid_frame()
                translate([-lid_t / 2, -sad_w / 2, 0])
                    saddle_blank(sad_w);
            // verdikking voor de klemschroef
            lid_frame()
                translate([-lid_t / 2, 0, 0])
                    saddle_screw_boss();
            // kolom + montagevlak (horizontaal in de wereld)
            hull() {
                translate([pad_x0, -sad_w / 2, pad_top - pad_t])
                    cube([pad_x1 - pad_x0, sad_w, pad_t]);
                lid_frame()
                    translate([-lid_t / 2 - wall, -sad_w / 2, roof_t - 4])
                        cube([lid_t + 2 * wall, sad_w, 4]);
            }
        }

        // kepholte
        lid_frame()
            translate([-lid_t / 2, -sad_w / 2, 0])
                lid_cavity(sad_w);

        // klemschroef + moerpocket in de achterpoot
        lid_frame()
            translate([-lid_t / 2, 0, 0])
                saddle_screw();

        // boringen voor M4 smeltinzetstukken, van boven af
        for (x = [pad_x0 + 15, pad_x1 - 15])
            translate([x, 0, pad_top - m4_ins_h])
                cylinder(d = m4_ins_d, h = m4_ins_h + 1);
    }
}

// Verdikking aan de buitenkant van de achterpoot, zodat er een M5
// smeltinzetstuk in past.
module saddle_screw_boss() {
    translate([-wall - clr, 0, scr_z]) rotate([0, -90, 0])
        cylinder(d = boss_d, h = boss_l);
}

module saddle_screw() {
    // schroefas loopt dwars door de achterpoot, haaks op het achtervlak
    translate([0, 0, scr_z]) rotate([0, -90, 0]) {
        // doorvoer tot in de kepholte
        translate([0, 0, -2]) cylinder(d = scr_d, h = wall + clr + boss_l + 4);
        // boring voor het inzetstuk, van buiten af
        translate([0, 0, wall + clr + boss_l - ins_h])
            cylinder(d = ins_d, h = ins_h + 1);
    }
}

// =====================================================================
//  plateau
// =====================================================================

module platform() {
    difference() {
        union() {
            // bodem
            translate([plat_x_front, -plat_y / 2, 0])
                cube([plat_x, plat_y, plat_t]);
            // opstaande rand
            difference() {
                translate([plat_x_front, -plat_y / 2, 0])
                    cube([plat_x, plat_y, plat_t + plat_lip]);
                translate([plat_x_front + 6, -plat_y / 2 + 6, plat_t])
                    cube([plat_x - 12, plat_y - 12, plat_lip + 1]);
            }
        }
        // bevestiging naar de zadels
        for (y = [-saddle_pitch / 2, saddle_pitch / 2])
            for (x = [pad_x0 + 15, pad_x1 - 15])
                translate([x, y, -1]) {
                    cylinder(d = m4_free, h = plat_t + 2);
                    translate([0, 0, 1]) cylinder(d1 = m4_head, d2 = m4_free,
                                                  h = (m4_head - m4_free) / 2);
                }
        // sleuven voor een spanband over de speaker
        for (y = [-plat_y / 2 + 30, plat_y / 2 - 30 - strap_w])
            translate([plat_x_front + plat_x / 2 - strap_h / 2, y, -1])
                cube([strap_h, strap_w, plat_t + 2]);
    }
}

// =====================================================================
//  drukplaatje (TPU)
// =====================================================================

module pressure_pad() {
    difference() {
        union() {
            cylinder(d = 18, h = 3);
            translate([0, 0, 3]) cylinder(d1 = 18, d2 = 14, h = 1.5);
        }
        translate([0, 0, 2.6]) sphere(d = 5.6);
    }
}

// =====================================================================
//  output
// =====================================================================

// Vervangende klep om de pasvorm visueel te controleren (niet printen).
module mock_lid(len = 300, w = 537) {
    lid_frame()
        translate([-lid_t / 2, w / 2, 0])
            rotate([90, 0, 0])
                linear_extrude(height = w)
                    polygon([
                        [0,               -len],
                        [0,               -lid_cham_rear],
                        [lid_top_flat_a,   0],
                        [lid_top_flat_b,   0],
                        [lid_t - 0.1,     -lid_bevel_front],
                        [lid_t,           -lid_bevel_front - 0.6],
                        [lid_t,           -len],
                    ]);
}

module assembly() {
    for (y = [-saddle_pitch / 2, saddle_pitch / 2])
        translate([0, y, 0]) saddle();
    translate([0, 0, pad_top]) platform();
}

if (PART == "saddle")        saddle();
else if (PART == "platform") platform();
else if (PART == "pad")      pressure_pad();
else if (PART == "demo")     { assembly(); % mock_lid(); }
else if (PART == "none")     ;   // niets - voor losse testbestanden
else                         assembly();
