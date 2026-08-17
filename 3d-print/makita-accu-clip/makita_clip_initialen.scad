// ============================================================
//  Makita 18V LXT accu-clip (vergrendelknop) met eigen initialen
//  Basis: "makita battery button" van Илья, Printables model
//  1741157, licentie CC0 / Public Domain.
//
//  Gebruik: pas 'initialen' aan, kies raised of engraved,
//  render (F6) en exporteer als STL.
// ============================================================

initialen   = "FS";     // jouw initialen of korte tekst
letter_size = 7;        // hoogte van de letters in mm (max ~8)
// mode: "compleet"  = knop met verhoogde letters (1 kleur)
//       "gegraveerd"= knop met verdiepte letters
//       "romp"      = alleen de knop zonder letters   } samen laden in
//       "letters"   = alleen de losse letters         } Bambu Studio
//                     voor een print in 2 kleuren (AMS)
mode        = "compleet";
hoogte      = 0.8;      // mm verhoging (of graveerdiepte)
font        = "DejaVu Sans:style=Bold";
letterafstand = 1.1;    // onderlinge letterafstand (1 = normaal)

basis = "button_cc0.stl";   // origineel clip-model (niet wijzigen)

// --- vlak-geometrie van het drukvlak (gemeten uit het model) ---
N = [-0.687, 0.7267, 0];    // normaal van het drukvlak (naar buiten)
U = [ 0.7267, 0.687, 0];    // "omhoog" langs het vlak
R = [0, 0, 1];              // leesrichting (breedte)
tekst_R = 17.75;            // centrum van het verdiepte paneel
tekst_U = -12.5;
basis_N = 26.0;             // startdiepte van het tekstprisma

P = tekst_R*R + tekst_U*U + basis_N*N;
M = [[R[0],U[0],N[0],P[0]],
     [R[1],U[1],N[1],P[1]],
     [R[2],U[2],N[2],P[2]],
     [0,0,0,1]];

module tekstprisma() {
    multmatrix(M)
        linear_extrude(height = 14)
            text(initialen, size = letter_size, font = font,
                 halign = "center", valign = "center",
                 spacing = letterafstand, $fn = 32);
}

// letters die de kromming van het drukvlak volgen, 'hoogte' mm verhoogd
module letters() {
    difference() {
        intersection() {
            translate(hoogte * N) import(basis);
            tekstprisma();
        }
        import(basis);
    }
}

if (mode == "compleet") {
    union() { import(basis); letters(); }
} else if (mode == "gegraveerd") {
    difference() {
        import(basis);
        difference() {
            tekstprisma();
            translate(-hoogte * N) import(basis);
        }
    }
} else if (mode == "romp") {
    import(basis);
} else if (mode == "letters") {
    letters();
}
