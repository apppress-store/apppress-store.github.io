# App Press Store

Free Windows apps, ready in one press: focused tools with a soft, pressed-button design.

**Website:** https://apppress-store.github.io

## Apps

| App | What it does | Download |
|---|---|---|
| **Dual Wallpaper** v1.0 | A different wallpaper on every monitor, the same image on all, or one image spanned across. Follows Windows light/dark mode. | [`downloads/DualWallpaperSoft.exe`](downloads/DualWallpaperSoft.exe) (64 KB) |
| **PavePress** v1.1 | IRC:37-2018 flexible pavement design with built-in IITPAVE-style analysis, code checks and PDF/Excel submission reports. An engineering design aid: a qualified engineer must verify and sign off the design. | [`downloads/PavePress.exe`](downloads/PavePress.exe) (331 KB) |
| **DeflectPress** v1.6 | FWD analysis software: falling weight deflectometer back calculation, homogeneous sections, remaining life and IRC:115-2014 overlay design. Page: [`/deflectpress/`](deflectpress/index.html). An engineering design aid. | [`downloads/DeflectPress-FWD-Analysis.exe`](downloads/DeflectPress-FWD-Analysis.exe) (667 KB) |
| **Traffic Analysis** v1.0 | Traffic survey analysis to IRC: TVC with ADT/AADT, TMC with junction flow diagrams, OD survey, axle load VDF, speed and delay, and design traffic in msa (exports to PavePress). Page: [`/traffic-analysis/`](traffic-analysis/index.html). An engineering aid. | [`downloads/Traffic-Analysis.exe`](downloads/Traffic-Analysis.exe) (707 KB) |
| **Score the Alignments** v1.0 | Alignment option study to IRC:SP:19-2020 Appendix-8: scoring matrix, weighted scores, ranking and weight sensitivity, with optional land acquisition (RFCTLARR), R&R, cost and geometric checks. Page: [`/score-the-alignments/`](score-the-alignments/index.html). An engineering aid. | [`downloads/Score-the-Alignments.exe`](downloads/Score-the-Alignments.exe) (314 KB) |
| **Land Acquisition Calculator** v1.0 | Land acquisition compensation under the RFCTLARR Act 2013 (Sec 26 market value, First Schedule factor, solatium, 12 %, R&R) and NH Act 1956 3A / 3D schedules, imported from any Excel layout. Page: [`/land-acquisition-calculator/`](land-acquisition-calculator/index.html). An estimate for checking. | [`downloads/Land-Acquisition-Calculator.exe`](downloads/Land-Acquisition-Calculator.exe) (355 KB) |
| **JMC Sheet Maker** v1.0 | JMC sketch DWGs for land acquisition to true-scale A3 (or A2 / A1 / A0) sheets and one bookmarked PDF per village, with or without AutoCAD. Needs ODA File Converter (free) and the Nudi fonts. Page: [`/jmc-sheet-maker/`](jmc-sheet-maker/index.html). | [`downloads/JMC-Sheet-Maker.exe`](downloads/JMC-Sheet-Maker.exe) (51.5 MB) |

The apps work on Windows 10 and 11, with no installer and no extra runtimes. The first time you run one, Windows SmartScreen may show
"Windows protected your PC". Click **More info → Run anyway**.

SHA-256:
- `DualWallpaperSoft.exe`: `052EF9118CF12EC91DCE9071B8E9ECBF26F999B18371FDF8688AAA798C92F775`
- `PavePress.exe`: `4491E6A9A691D3EA84FA5C8D32046E7E1D5F675AAFD55D56AA3687EED42F34CC`
- `DeflectPress-FWD-Analysis.exe`: `B6F7FBB56EB475D549F2F816558FA3543C70515EE7F95810CA3B656EEEF292A3`
- `Traffic-Analysis.exe`: `83288AA7AE7F8970083180169E23D4DDF85C194689D5E10C8E330573AEC8DD29`
- `JMC-Sheet-Maker.exe`: `CFD9D56EA0224EFE6DD79C0A83CCC64160BF0E6D94434FCF9CBDCEBCF3C036AB`

PavePress ships without the IRC:37-2018 catalogue plates, which are IRC copyright. PavePress is not affiliated with IRC.

## Site

Plain HTML, CSS and JavaScript (`index.html`, `styles.css`, `app.js`), with no build step. It's served by GitHub Pages from the `main` branch.
