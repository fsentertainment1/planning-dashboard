// ============================================================
//  Makita LXT accu-clip (release button v2) met FS-beeldmerk
//  mode: "compleet" | "romp" | "logo"
// ============================================================
include <fs_logo.scad>

mode        = "compleet";
logo_hoogte = 10.0;    // mm; kommetje is 10.9 mm hoog -> 0.45 mm marge
hoogte      = 0.8;      // mm verhoging

basis = "lxt_button.stl";

R = [0.027620, 0.880631, -0.472997];
U = [0.994850, -0.070379, -0.072939];
N = [-0.097522, -0.468547, -0.878040];
C = [-1.798736, -2.773598, -21.777934];

P = C - 0.2*N;
M = [[R[0],U[0],N[0],P[0]],
     [R[1],U[1],N[1],P[1]],
     [R[2],U[2],N[2],P[2]],
     [0,0,0,1]];

module logodeel() {
    multmatrix(M)
        linear_extrude(height = hoogte + 0.2)
            resize([0, logo_hoogte], auto = true)
                translate([-800, -990])   // logo centreren (1600 x 1980)
                    fs_logo_2d();
}

if (mode == "compleet")   union() { import(basis); logodeel(); }
else if (mode == "romp")  import(basis);
else if (mode == "logo")  logodeel();
