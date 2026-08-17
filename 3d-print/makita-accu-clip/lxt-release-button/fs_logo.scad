// FS-beeldmerk, opgebouwd uit rechthoeken (alle lijnen horizontaal/verticaal)
// Coordinaten in beeld-pixels van het aangeleverde logo (1600 x 1980),
// y omgeklapt zodat +y omhoog is.

module fs_logo_2d() {
    B = 1600;  // breedte
    H = 1980;  // hoogte
    // beeld-y -> scad-y
    function fy(y) = H - y;

    union() {
        // buitenkader
        difference() {
            square([B, H]);
            translate([130, fy(1840)]) square([1350, 1700]);
        }
        // bovenste arm (F-kap, loopt naar rechterrand)
        translate([530, fy(550)])  square([950, 125]);
        // middenbalk naar rechterrand
        translate([455, fy(910)])  square([1025, 130]);
        // verticale stam, van middenbalk tot onderkader
        translate([455, fy(1840)]) square([105, 1060]);
        // balk rechtsonder-midden
        translate([820, fy(1250)]) square([660, 130]);
        // onderste balk
        translate([560, fy(1600)]) square([580, 120]);
    }
}

// fs_logo_2d();
