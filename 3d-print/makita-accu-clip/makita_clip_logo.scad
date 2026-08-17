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

module logoprisma() {
    multmatrix(M)
        linear_extrude(height = 14)
            resize([logo_breedte, 0], auto = true)
                import("logo.svg", center = true);
}

// logo dat de kromming van het drukvlak volgt, 'hoogte' mm verhoogd
module logodeel() {
    difference() {
        intersection() {
            translate(hoogte * N) import(basis);
            logoprisma();
        }
        import(basis);
    }
}

if (mode == "compleet") {
    union() { import(basis); logodeel(); }
} else if (mode == "romp") {
    import(basis);
} else if (mode == "logo") {
    logodeel();
}
