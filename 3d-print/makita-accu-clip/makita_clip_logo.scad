// ============================================================
//  Makita 18V LXT accu-clip met RH Beveiligingstechniek-logo
//  Basis: "makita battery button" (Printables 1741157, CC0)
//  Logo: logo.svg (getraceerd uit aangeleverd beeldmerk)
//
//  mode: "compleet" = clip met verhoogd logo (1 kleur)
//        "romp"     = alleen de clip     } samen laden in Bambu
//        "logo"     = alleen het logo    } Studio voor 2 kleuren
// ============================================================

mode         = "compleet";
logo_breedte = 23;      // mm, past in het verdiepte paneel (max ~24)
hoogte       = 0.8;     // mm verhoging
vul_tot      = 33.1;    // paneel opvullen tot dit niveau (rand ligt op 34.1,
                        // origineel holle paneel ligt op ~27-31)

basis = "button_cc0.stl";

// --- vlak-geometrie van het drukvlak (gemeten uit het model) ---
N = [-0.687, 0.7267, 0];    // normaal van het drukvlak (naar buiten)
U = [ 0.7267, 0.687, 0];    // "omhoog" langs het vlak
R = [0, 0, 1];              // leesrichting (breedte)
logo_R = 17.75;             // centrum van het verdiepte paneel
logo_U = -12.5;
basis_N = 26.0;             // startdiepte van het prisma

P = logo_R*R + logo_U*U + basis_N*N;
M = [[R[0],U[0],N[0],P[0]],
     [R[1],U[1],N[1],P[1]],
     [R[2],U[2],N[2],P[2]],
     [0,0,0,1]];

// vlakke vulling van het holle paneel, tot 'vul_tot' (1 mm onder de rand)
module paneelvulling() {
    multmatrix(M)
        linear_extrude(height = vul_tot - basis_N)
            offset(r = 3.5)
                square([23.5 - 7, 13.5 - 7], center = true);
}

// logo als vlakke plak van 'hoogte' mm boven op de vulling
module logodeel() {
    multmatrix(M)
        rotate([0, 0, 180])   // 180: knop zit ondersteboven in het basismodel
        translate([0, 0, vul_tot - basis_N - 0.2])
        linear_extrude(height = hoogte + 0.2)
            resize([logo_breedte, 0], auto = true)
                import("logo.svg", center = true);
}

if (mode == "compleet") {
    union() { import(basis); paneelvulling(); logodeel(); }
} else if (mode == "romp") {
    union() { import(basis); paneelvulling(); }
} else if (mode == "logo") {
    logodeel();
}
