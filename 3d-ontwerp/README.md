# Testglashouder voor fire-beam testglas op een Solo teststok

Houder voor een rood testglas van 150 × 150 × 3 mm. Een kort randje valt **over**
de stok, de lange plug gaat **in** de stok en een geprinte veerlip klikt in het
gat Ø12,7 van de stok.

Het geheel bestaat uit **twee geprinte delen**, zodat elk deel in zijn eigen
beste stand op het bed kan liggen:

- de **bovenkant** (lijst met hals en tong) print plat op zijn rug;
- de **voet** (kraag, randje en plug) print rechtop met de plug omhoog, zodat de
  plug echt rond wordt in plaats van vervormd.

De tong van de bovenkant klikt in de holte van de voet en wordt vastgelijmd.

![doorsnede](renders/maatschets.png)

## Wat zit er in

| Bestand | Wat het is |
|---|---|
| `stl/voet.stl` | **Print dit eerst.** Kraag, randje en plug. Meteen ook je pasmal: hiermee test je de passing op de stok voordat je de grote print start. |
| `stl/bovenkant.stl` | De lijst met de tong. |
| `stl/glasklem.stl` | Latje dat na het glas in de sleuf schuift en het glas op zijn plek houdt. |
| `testglashouder.py` | Het model. Alle maten staan bovenin en zijn aanpasbaar. |
| `maatschets.py`, `render.py`, `build_viewer.py` | Maken de tekening, de plaatjes en de 3D-viewer opnieuw. |

Opnieuw genereren na een wijziging:

```bash
python3 testglashouder.py && python3 maatschets.py && python3 render.py && python3 build_viewer.py
```

## Maten waar het ontwerp op gebouwd is

Dit zijn jouw metingen. Ze staan bovenin `testglashouder.py`.

| | |
|---|---|
| Stok buiten / binnen | Ø32,8 / Ø28,8 mm |
| Klikgat in de stok | Ø12,7 mm |
| Kop van de stok → gat | 63,9 mm |
| Testglas | 150 × 150 × 3 mm |

**Let op deze aanname.** Ik heb de 63,9 mm gelezen als de afstand tot de
*dichtstbijzijnde rand* van het gat, want zo staat de schuifmaat op je foto.
Het hart van het gat komt dan op 63,9 + 12,7/2 = **70,25 mm**, en daar zit de
kliknok. Was de 63,9 mm tot het *hart* van het gat gemeten, zet dan bovenin het
script `HOLE_MEASURED_TO = "center"` en genereer opnieuw. Door de voet eerst te
printen kost het je anderhalf uur in plaats van een hele dag om daarachter te
komen.

## De passing van de plug

De plug klemt licht: over de centreerribben meet hij Ø28,95 in een buis van
Ø28,80, dus **0,15 mm klemming op de diameter**. De ribben zijn afgerond en van
PETG, die vervormen dat laatste stukje netjes weg.

De ribben zitten niet over de volle lengte maar in **twee korte banden** van
20 mm, vlak achter de schouder en vlak voor de punt. Dat centreert net zo goed
als een rib over de hele lengte, maar je hoeft maar 40 mm te laten schuren in
plaats van 72 — anders wordt zo'n plug van 86 mm veel te stroef om erin te
duwen.

Gaat hij toch te zwaar: schuur de zes ribben licht af, dat zijn kleine richels
en je bent er in een minuut vanaf. Zit hij te los: zet `FIT_RIB` nog 0,1 lager
en print de voet opnieuw.

## Printen

### De voet — rechtop, plug omhoog

Zet hem neer op het platte koppelvlak (de kant met de holte). In deze stand
loopt de plug als een gewone staande cilinder omhoog: perfect rond, geen enkele
overhang op de buitenkant, en de ringvormige gleuf van het randje wijst omhoog
en heeft dus ook geen support nodig.

Er zitten maar twee overhangen in, allebei ingesloten en aan alle kanten
vastgemaakt: het plafond van de koppelholte (11,6 mm overbrugging) en het
plafond van de veerholte binnenin de plug (13,7 mm). Dat zijn nette bruggen,
daar hoeft geen support in.

De **kliknok** is een gave bol. Aan de kant die naar het bed wijst loopt hij op
tot 62 graden overhang, over een plekje van ongeveer 7 mm². Ook dat zonder
support printen: die flank wordt een tikje ruw en dat haal je er met twee halen
van een vijltje af. Support is daar juist een slecht idee, want hij zit vlak
naast de zaagsnede van 1,6 mm rond de veerlip — support die daarin kruipt lijmt
de lip vast en dan veert er niets meer. Wil je die flank toch strak uit de
printer, zet dan `BOSS_CHAMFER = True` (zie onderaan).

### De bovenkant — plat op zijn rug

Met de vlakke achterkant van de lijst op het bed. Zo loopt de belasting van de
steel evenwijdig aan de lagen, wat veruit het sterkst is. De voorlip boven de
glassleuf is onder 45 graden afgeschuind, dus ook hier geen support.

Ik heb dit laag voor laag nagerekend: over 57 lagen zweeft er in totaal 43 mm²,
verdeeld over zes lagen, en het breedste plekje is 2,3 mm. Dat is niets.

### Instellingen (Bambu Studio, H2S, 0.4 nozzle)

| Instelling | Waarde | Waarom |
|---|---|---|
| Materiaal | **PETG HF** | Taaier dan PLA en blijft veren. PLA scheurt op den duur bij de veerlip en bij de veerarmen van de tong, en zakt door in een warme bus. |
| Laaghoogte | 0,20 mm | Neem 0,12 mm voor de voet als je de ronding van de kliknok zo strak mogelijk wilt. |
| Wanden | **4** | De veerlip is 2,2 mm dik, de veerarmen 2,4 mm; met 4 wanden zijn ze massief. |
| Boven / onder | 4 / 4 | |
| Infill | 15–20 % gyroid | De plug en de kraag zijn dikke stukken; meer heeft geen zin. |
| **Support** | **uit** | Bij beide delen niet nodig. |
| Brim | uit bij de bovenkant, **aan bij de voet** | De voet is 113 mm hoog op een voetje van Ø40; een brim houdt hem netjes staan. |
| Elephant foot | 0,15 mm (standaard) | Belangrijk voor het koppelvlak van de voet, dat moet vlak blijven. |

Bovenkant: 171 × 232 mm, past ruim op de 350 × 320 mm van de H2S. Voet: Ø40 ×
113 mm. Reken samen op ruwweg 90–120 g PETG; Bambu Studio geeft je het echte
getal.

### Na het printen

1. Loop met een mesje één keer langs de zaagsnede rond de veerlip in de plug,
   zodat hij echt vrij beweegt. Druk hem een paar keer in — hij moet soepel
   terugveren. Doe hetzelfde bij de twee veerarmen van de tong.
2. Ontbraam de mond van het randje en de punt van de plug.
3. Vijl de onderflank van de kliknok glad als daar een braampje zit.

## In elkaar zetten

1. **Pas eerst zonder lijm.** Duw de voet op de stok tot de kop tegen de
   schouder komt; de kliknok moet hoorbaar in het gat klikken en er 0,8 mm
   buiten uitsteken. Klopt dat niet, pas dan de maten aan voordat je verder
   gaat. Losmaken doe je door de nok in te drukken.
2. **Klik de bovenkant in de voet.** De tong gaat 20 mm de holte in; de twee
   bolletjes op de veerarmen klikken in de kuiltjes. Controleer of de lijst
   haaks staat.
3. **Lijmen.** Trek hem er nog één keer af, breng lijm aan op de zijkanten van
   de tong en druk hem terug tot hij klikt. Voor PETG werkt **2-componenten
   epoxy** het beste; secondelijm kan ook maar is brosser. Er zit 0,2 mm
   speling rondom, precies bedoeld als lijmspleet. Laat uitharden met de lijst
   plat op tafel.
4. Schuif het testglas van bovenaf tussen de twee oren in de sleuf, tot het op
   de onderbalk rust.
5. Schuif de glasklem er daarachteraan in, tot de nokjes in de kuiltjes klikken.
   Aan het duimgreepje trek je hem er weer uit als het glas vervangen moet.

## Als de passing niet klopt

Alles staat bovenin `testglashouder.py`; wijzig het getal en draai het script
opnieuw.

| Wat je merkt | Wat je aanpast |
|---|---|
| Plug gaat te stroef in de buis | `FIT_RIB` hoger (bijv. 0,0 of 0,15) |
| Plug wiebelt in de buis | `FIT_RIB` lager (bijv. −0,3) |
| Randje klemt op de stok | `FIT_SKIRT` groter |
| Kliknok valt naast het gat | `HOLE_MEASURED_TO` omzetten, of `HOLE_FROM_TIP` corrigeren |
| Kliknok veert te zwaar | `TAB_T` kleiner (bijv. 1,9) of `TAB_LEN` groter |
| Veerlip zit vast aan de plug | Mesje door de zaagsnede halen; zie hierboven |
| Tong past te strak of te los | `TONGUE_FIT` |
| Tong klikt niet vast | `BARB_PROUD` groter (bijv. 1,0) |
| Glas zit te klem of rammelt | `GLASS_FIT_XY` en `GLASS_FIT_T` |
| Ander glasformaat | `GLASS_W`, `GLASS_H`, `GLASS_T` |
| Onderflank kliknok te ruw | `BOSS_CHAMFER = True`, hoek via `BOSS_MAX_OVERHANG` |

## Eigen opdruk

Op de onderbalk zit een verzonken vlakje van 100 × 16 mm, 0,6 mm diep. Daar kun
je in Bambu Studio met de tekst- of SVG-tool je eigen naam of logo in zetten. Ik
heb er bewust niets van een ander merk op gezet.
