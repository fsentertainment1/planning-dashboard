include <lv1_speaker_plateau.scad>

// stand-in speaker (110 x 90 x 150) op het plateau
module mock_speaker() {
    color("Orange", 0.9)
        translate([-30, -55, pad_top + plat_t])
            cube([90, 110, 150]);
}

module full() {
    assembly();
    % mock_lid();
    mock_speaker();
    bossface = wall + clr + boss_l;   // buitenvlak van de verdikking
    for (y = [-saddle_pitch/2, saddle_pitch/2])
        translate([0, y, 0]) lid_frame()
            translate([-lid_t/2, 0, scr_z]) rotate([0, -90, 0]) {
                // TPU drukplaatje in zijn uitsparing
                translate([0, 0, 0.2]) color("DimGray") pressure_pad();
                // klemschroef, aangedraaid tot tegen het plaatje
                translate([0, 0, bossface + 4 + knob_h])
                    rotate([180, 0, 0]) color("SteelBlue") clamp_screw();
            }
}

module parts_layout() {
    platform();
    translate([150, -70, 59.8]) rotate([0, 180, 0]) saddle();
    translate([150,  30, 59.8]) rotate([0, 180, 0]) saddle();
    translate([255, -70, 0]) clamp_screw();
    translate([255, -20, 0]) clamp_screw();
    translate([255,  25, 0]) pressure_pad();
    translate([255,  55, 0]) pressure_pad();
}

if (SHOW == "full") full();
else parts_layout();
