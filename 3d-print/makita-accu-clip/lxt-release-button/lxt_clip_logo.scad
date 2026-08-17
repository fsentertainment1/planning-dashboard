// ============================================================
//  Makita LXT accu-clip (release button v2, STEP van MakerWorld
//  model 3026022, aangeleverd door Frank) met RH-logo of initialen
//  mode: "compleet" | "romp" | "logo"
// ============================================================

mode         = "compleet";
gebruik_logo = true;      // false = initialen-tekst
initialen    = "FS";
logo_breedte = 22;        // vloer kommetje is 25.8 x 10.9 mm
letter_size  = 7;
hoogte       = 0.8;       // mm verhoging (rand kommetje ligt 2.7 mm boven vloer)

basis = "lxt_button.stl";

R = [0.027620, 0.880631, -0.472997];   // leesrichting
U = [0.994850, -0.070379, -0.072939];   // omhoog (richting rode indicator)
N = [-0.097522, -0.468547, -0.878040];   // normaal kommetje-vloer, naar buiten
C = [-1.798736, -2.773598, -21.777934];   // centrum kommetje-vloer

P = C - 0.2*N;  // 0.2 mm ingebed voor hechting
M = [[R[0],U[0],N[0],P[0]],
     [R[1],U[1],N[1],P[1]],
     [R[2],U[2],N[2],P[2]],
     [0,0,0,1]];

module vorm2d() {
    if (gebruik_logo)
        resize([logo_breedte, 0], auto = true) import("logo.svg", center = true);
    else
        text(initialen, size = letter_size, font = "DejaVu Sans:style=Bold",
             halign = "center", valign = "center", spacing = 1.1, $fn = 32);
}

module logodeel() {
    multmatrix(M) linear_extrude(height = hoogte + 0.2) vorm2d();
}

if (mode == "compleet")      union() { import(basis); logodeel(); }
else if (mode == "romp")     import(basis);
else if (mode == "logo")     logodeel();
