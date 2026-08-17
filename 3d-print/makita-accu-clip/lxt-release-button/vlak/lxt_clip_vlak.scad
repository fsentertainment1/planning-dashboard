// ============================================================
//  Makita LXT accu-clip (release button v2) met VLAK ingelegd merk
//  Het merk ligt gelijk met de bodem van het duimkommetje: geen
//  reliëf, dus makkelijker printen en niets dat kan afslijten.
//
//  merk: "rh" | "fslogo" | "fstekst"
//  mode: "romp"  = clip met uitsparing   } samen in Bambu Studio
//        "merk"  = het ingelegde merk    } = tweekleurige print
//        "gegraveerd" = clip met merk als verdieping (1 kleur)
// ============================================================
include <fs_logo.scad>

merk   = "rh";
mode   = "romp";
diepte = 0.6;      // mm; wand onder het kommetje is 1,22 mm

rh_breedte  = 22;   // kommetje-vloer is 25,8 x 10,9 mm
fs_hoogte   = 10;
letter_size = 7;
initialen   = "FS";

basis = "lxt_button.stl";

R = [0.027620, 0.880631, -0.472997];
U = [0.994850, -0.070379, -0.072939];
N = [-0.097522, -0.468547, -0.878040];
C = [-1.798736, -2.773598, -21.777934];

// z = 0 ligt precies op de bodem van het kommetje
M = [[R[0],U[0],N[0],C[0]],
     [R[1],U[1],N[1],C[1]],
     [R[2],U[2],N[2],C[2]],
     [0,0,0,1]];

module vorm2d() {
    if (merk == "rh")
        resize([rh_breedte, 0], auto = true) import("logo.svg", center = true);
    else if (merk == "fslogo")
        resize([0, fs_hoogte], auto = true) translate([-800, -990]) fs_logo_2d();
    else
        text(initialen, size = letter_size, font = "DejaVu Sans:style=Bold",
             halign = "center", valign = "center", spacing = 1.1, $fn = 32);
}

// prisma dat vanaf de bodem naar binnen steekt
module prisma(extra = 0) {
    multmatrix(M)
        translate([0, 0, -diepte])
            linear_extrude(height = diepte + extra)
                vorm2d();
}

if (mode == "romp") {
    difference() { import(basis); prisma(0.01); }
} else if (mode == "merk") {
    intersection() { import(basis); prisma(); }
} else if (mode == "gegraveerd") {
    difference() { import(basis); prisma(0.01); }
}
