# DropSlide — uitschuifbare monitorbeugel voor de LV1 Classic

3D-printbare slide-mount die een **ASUS ZenScreen MB166C (15,6")** achter het
scherm van de **Waves eMotion LV1 Classic** hangt, aan de drie bestaande
inbusbouten bovenaan het achterpaneel.

- **Uittrekken** → de monitor klikt vast in de bovenstand en steekt ~214 mm
  boven de rand van de LV1 uit (13 mm blijft achter de rand, ongeveer de bezel).
- **Opruimen** → naar beneden duwen tot de tweede klik; de monitor verdwijnt
  volledig achter het schermpaneel (bovenkant 10 mm onder de rand).

![previews](previews.png)

## Onderdelen (map `stl/`)

| Bestand | Aantal | Print­oriëntatie |
|---|---|---|
| `01_montageplaat.stl` | 1 | plat op de rug (moffen omhoog) |
| `02_rail_links.stl` / `03_rail_rechts.stl` | 1+1 | liggend op de **buitenwand**, diagonaal op het bed (306 mm) |
| `04_slede.stl` | 1 | plat op de rug (lip omhoog) |
| `05_voet_links.stl` / `06_voet_rechts.stl` | 1+1 | plug omhoog |
| `preview_*.stl` | — | niet printen, alleen ter controle |

**Printinstellingen:** PETG (stijver en taaier dan PLA in een warme flightcase),
0,2 mm laag, 4 wanden, 40 % infill. Bladveren in de rails printen mee — geen
support nodig in de aangegeven oriëntaties. Rails passen diagonaal op een
256 × 256 bed (Bambu X1C/P1S).

## Bill of materials

- 3× inbusbout in de originele console-draad, **8 mm langer** dan origineel
  (originele bout eruit, lengte + draad meten: vermoedelijk M4)
- 4× M3×25 + M3-moer (railpennen in de moffen van de plaat)
- 2× M3×12 zelftappend/plaatschroef (voetjes onderin de rails)
- 1× 1/4"-20 × 1/2" (12,7 mm) inbusbout — in het statiefdraad van de monitor
- Dun schuimtape/vilt op het sledevlak en de onderlip (krasbescherming) en op
  de afstandshouders van de voetjes
- Beetje siliconen-/PTFE-vet in de railkanalen

## Montage

1. Bout de monitor met de 1/4"-bout (kop verzonken in de zeskantzak achterin
   de toren) op de slede; onderrand van de monitor rust in de lip.
2. Steek de railpennen in de moffen van de montageplaat, borg met 2× M3×25
   per rail (moeren vallen in de zeskantzakken aan de binnenzijde).
3. Schuif de slede van onderaf in beide railkanalen.
4. Schroef de voetjes in de kanaalonderkant (M3 zelftappend, dwars).
5. Haal de drie originele inbusbouten uit het achterpaneel, hang de plaat op
   met de langere bouten. De sleufgaten geven ±6 mm speling per bout.
6. USB-C-kabel van de monitor met een lus langs een rail naar beneden
   tie-wrappen, zodat hij de slag van 224 mm meemaakt.

## Werking detents

Elke rail heeft twee geprinte bladveren met een asymmetrische tand:

- **Bovenste detent** (uitgeschoven): borgvlak van 28° draagt het gewicht van
  de monitor (houdt ± 4 kg trekkracht), oprijvlak van 50° zodat omhoog
  trekken soepel gaat. Naar beneden duwen met een ferme duw ontgrendelt.
- **Onderste detent** (opgeborgen): gespiegeld, zodat de slede tijdens
  transport in de flightcase niet omhoog kan stuiteren. De slede rust
  daarnaast op de voetjes.

Te stroef of te los? Pas in `lv1_slide_mount.py` de parameters `tooth`
(uitsteek), `leaf_t` (veerdikte) of de hoeken `hold_ang`/`ride_ang` aan en
genereer opnieuw.

## Vóór het printen even nameten

Het model is parametrisch; deze vijf maten staan nu op een aanname
(gemarkeerd met `[METEN!]` in `lv1_slide_mount.py`):

1. **`bolt_dx`** — hart-op-hart afstand tussen de naastgelegen consolebouten
   (nu 105 mm; sleufgaten vangen ±6 mm op).
2. **`bolt_hole_dia`** — draadmaat van die bouten: M4 → 4,6, M5 → 5,6.
3. **`top_edge_offset`** — afstand van de boutenrij tot de bovenrand van het
   schermpaneel (nu 25 mm).
4. **`tripod_from_bottom`** — hoogte van het 1/4"-draadgat vanaf de onderrand
   van de monitor (nu 113,5 mm = precies het midden).
5. **Vrije vlakke hoogte** op het achterpaneel onder de boutenrij: er is
   **292 mm** nodig. Ook checken: de flightcase moet ~30 mm ruimte achter het
   paneel hebben (zoveel bouwt het geheel + monitor naar achteren uit).

Daarna:

```bash
pip install manifold3d trimesh numpy
python3 lv1_slide_mount.py
```

## Let op

- De rails staan 6 mm van het paneel en zijn maar 14 mm breed; de monitor
  hangt er 18 mm vóór — de ventilatiesleuven blijven zo vrijwel volledig
  vrij. Blokkeer ze niet met kabels.
- Dit hangt aan het chassis van de console; er wordt níet in de console
  geboord en er draait geen software op de LV1 zelf. De NDI-feed gaat naar
  de monitor via een externe bron (bijv. Mac mini of NDI-decoder, USB-C).
