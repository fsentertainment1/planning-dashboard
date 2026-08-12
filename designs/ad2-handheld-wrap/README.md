# AD2 Handheld — 360° wrap voor de xTool O1 Omni + OR1 rotary

Full-wrap UV-printontwerp voor de Shure Axient Digital AD2 handheld, in de stijl
van een gekalibreerd meetinstrument: haarlijnen, een 0–360° gradenschaal (knipoog
naar de rotary), een doorlopende golfvorm en het FS AUDIO-woordmerk in de lengte­as.
De achtergrond is **transparant** — het zwarte geanodiseerde aluminium van de AD2
blijft kaal; je print alleen de graphics (wit + amber).

## Bestanden

| Bestand | Wat |
|---|---|
| `ad2-wrap-print.png` | Print-klaar bestand, 600 dpi, transparante achtergrond. Breedte = omtrek, hoogte = lengte langs de as. |
| `ad2-wrap-mockup.png` | Preview van het ontwerp om de mic gewikkeld. |
| `generate_wrap.py` | Parametrische generator — pas diameter/lengte/kanaalnummer aan en genereer opnieuw. |
| `DESIGN-PHILOSOPHY.md` | De ontwerpfilosofie achter de stijl. |

## ⚠️ Eerst meten, dan printen

Shure publiceert alleen de totaalmaat (256 × 51 mm; de 51 mm is de kop). De
**handgreepdiameter staat nergens officieel** — en de AD2-body loopt licht taps.
Het standaardbestand gaat uit van **Ø 37,0 mm** (omtrek 116,24 mm). Meet de echte
diameter met een schuifmaat **op de plek waar je print**, en genereer opnieuw:

```bash
pip install pillow
python3 generate_wrap.py --diameter 36.4 --length 100 --channel 01
```

Klopt de breedte niet met de werkelijke omtrek, dan sluit de naad niet (gat of
overlap). Bij een tapse zone: meet in het midden van de printzone en houd de
naad aan de "achterkant" (bij de 180°-markering zit het CH-kader, de naad zelf
is bewust leeg gehouden).

Handige parameters:

- `--diameter` / `--length` — geometrie in mm
- `--channel 02` — kanaalnummer in het amberkleurige kader (`--channel ''` laat het weg)
- `--brand`, `--subline`, `--url` — teksten
- `--dpi 600` — resolutie (600 is ruim voldoende voor UV)

Print je meerdere zenders, genereer dan per mic een bestand met eigen kanaalnummer:

```bash
for ch in 01 02 03 04; do
  python3 generate_wrap.py --channel $ch --out ad2-wrap-ch$ch.png --mockup ''
done
```

## Let op bij de AD2 zelf

- **Print op de losse handgreep/batterijhuls**, niet over het display, de
  aan/uit-knop of de laadcontacten. Schroef de huls los en span alleen de huls
  in de OR1 — dan draait er geen elektronica mee en blijft alles bereikbaar.
- De huls is licht taps; de OR1 kan dat aan, maar lijn het object zo uit dat de
  printkop-afstand over de hele zone binnen tolerantie blijft (auto-meting in xCS).
- Ontvet het aluminium eerst (IPA) en overweeg UV-primer voor geanodiseerd
  aluminium — kaal metaal hecht matig zonder primer.

## Workflow in xTool Creative Space (xCS)

1. Kies **O1 Omni → rotary (OR1)** als bewerkingsmodus.
2. Importeer `ad2-wrap-print.png`. Het bestand bevat 600 dpi-metadata; controleer
   dat xCS het op **116,24 × 100 mm** zet (of jouw gegenereerde maat) en schaal
   het **niet**.
3. Voer de gemeten diameter in bij de rotary-instellingen — dezelfde waarde als
   waarmee je het bestand genereerde.
4. Leg de wrap-as goed: de **breedte** van het bestand moet om de omtrek heen
   draaien. Draai het ontwerp 90° in xCS als de preview het andersom laat zien.
5. Printmodus: **wit + kleur** (white ink underbase aan — zonder witte onderlaag
   is de print op zwart aluminium onzichtbaar). Eventueel gloss/varnish als
   slijtlaag erover; een handheld krijgt veel handcontact.
6. Doe eerst een proefrondje op een stuk zwarte buis/PVC van ± dezelfde diameter
   om naadaansluiting en maatvoering te checken.

## Ontwerpspecificaties (standaard, Ø 37 / L 100)

- Canvas: 116,24 × 100 mm = 2746 × 2362 px @ 600 dpi, RGBA
- Naadloos: gradenschaal (deelbaar op 360°), golfvorm (gehele periodes),
  ringen — alles sluit exact aan op de linker/rechterrand
- Marges: ±4–5 mm boven/onder vrijgehouden voor de rotary-randzone
- Kleuren: wit `#FFFFFF` + amber `#E8A43D`, fijnste lijn 0,12 mm
