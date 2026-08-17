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
vul_tot     = 33.1;     // paneel opvullen tot dit niveau (rand ligt op 34.1)
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

module tekst2d() {
    text(initialen, size = letter_size, font = font,
         halign = "center", valign = "center",
         spacing = letterafstand, $fn = 32);
}

// vlakke vulling van het holle paneel, tot 'vul_tot' (1 mm onder de rand)
module paneelvulling() {
    multmatrix(M)
        linear_extrude(height = vul_tot - basis_N)
            offset(r = 3.5)
                square([23.5 - 7, 13.5 - 7], center = true);
}

// letters als vlakke plak van 'hoogte' mm boven op de vulling
module letters() {
    multmatrix(M)
        rotate([0, 0, 180])   // 180: knop zit ondersteboven in het basismodel
        translate([0, 0, vul_tot - basis_N - 0.2])
        linear_extrude(height = hoogte + 0.2)
            tekst2d();
}

if (mode == "compleet") {
    union() { import(basis); paneelvulling(); letters(); }
} else if (mode == "gegraveerd") {
    difference() {
        union() { import(basis); paneelvulling(); }
        multmatrix(M)
            rotate([0, 0, 180])
            translate([0, 0, vul_tot - basis_N - hoogte])
            linear_extrude(height = hoogte + 2)
                tekst2d();
    }
} else if (mode == "romp") {
    union() { import(basis); paneelvulling(); }
} else if (mode == "letters") {
    letters();
}
