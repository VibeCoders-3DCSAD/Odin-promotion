---
name: Budgie
description: Security Print. A finance app engraved like something that holds value.
colors:
  security-paper: "#ebe7de"
  paper-deep: "#e1dcd0"
  paper-highlight: "#f5f2eb"
  intaglio-green: "#013220"
  intaglio-green-soft: "#0c4a30"
  body-ink: "#17261d"
  body-ink-muted: "#36453b"
  hairline: "rgba(1, 50, 32, 0.2)"
  hairline-strong: "rgba(1, 50, 32, 0.42)"
  logo-leaf: "#2f9e44"
  logo-sun: "#e8b400"
  ember: "#e8650f"
  ember-ink: "#9a3d08"
  note-paper: "#efebe3"
  note-mint: "#b9dcc4"
typography:
  display:
    fontFamily: "Bodoni Moda, Didot, Georgia, serif"
    fontSize: "clamp(3.25rem, min(6.6vw, 10svh), 6rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  figure:
    fontFamily: "Bodoni Moda, Didot, Georgia, serif"
    fontSize: "clamp(4rem, 11vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.03em"
    fontFeature: "lnum"
  headline-entry:
    fontFamily: "Bodoni Moda, Didot, Georgia, serif"
    fontSize: "clamp(2.5rem, 4.6vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Bodoni Moda, Didot, Georgia, serif"
    fontSize: "clamp(2.25rem, 4.2vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Manrope, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.3
  lede:
    fontFamily: "Manrope, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.0625rem, 1.35vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Manrope, system-ui, -apple-system, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Red Hat Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.14em"
    fontFeature: "tnum"
  microprint:
    fontFamily: "Red Hat Mono, ui-monospace, monospace"
    fontSize: "9px"
    fontWeight: 400
    lineHeight: "32px"
    letterSpacing: "0.1em"
rounded:
  focus: "4px"
  plate-inner: "15px"
  plate: "22px"
  plate-tall-inner: "23px"
  plate-tall: "30px"
  pill: "999px"
spacing:
  gutter: "clamp(1.25rem, 4.5vw, 4rem)"
  section: "clamp(5rem, 11vw, 9.5rem)"
  nav-height: "72px"
  container: "1240px"
  container-wide: "1440px"
components:
  button-primary:
    backgroundColor: "{colors.intaglio-green}"
    textColor: "{colors.paper-highlight}"
    rounded: "{rounded.pill}"
    padding: "0 1.75rem"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.intaglio-green-soft}"
    textColor: "{colors.paper-highlight}"
  button-primary-large:
    backgroundColor: "{colors.intaglio-green}"
    textColor: "{colors.paper-highlight}"
    rounded: "{rounded.pill}"
    padding: "0 2.25rem"
    height: "60px"
  button-unavailable:
    backgroundColor: "transparent"
    textColor: "{colors.intaglio-green}"
    rounded: "{rounded.pill}"
    padding: "0 2.25rem"
    height: "60px"
  link-text:
    textColor: "{colors.intaglio-green}"
  nav-bar:
    backgroundColor: "{colors.security-paper}"
    textColor: "{colors.body-ink}"
    height: "{spacing.nav-height}"
  plate:
    backgroundColor: "{colors.paper-highlight}"
    rounded: "{rounded.plate}"
    padding: "8px"
  readout:
    textColor: "{colors.body-ink-muted}"
    typography: "{typography.label}"
  green-note:
    backgroundColor: "{colors.intaglio-green}"
    textColor: "{colors.note-paper}"
---

# Design System: Budgie

## Overview

**Creative North Star: "Security Print"**

Budgie is engraved like something that holds value. The page is a sheet of warm grey security paper carrying a faint wave-line underprint, and everything of consequence is printed on it in one deep green intaglio ink: the Bodoni display lines, the hairline rules, the guilloche rosette that draws the year's spending forecast. The logo's green, yellow and orange never fill a surface; they appear only as engraved hairlines threaded through the green line work, the way a banknote hides its colour in its lines.

Density is calm and ledger-like. Sections alternate between plain paper and the deeper paper tone, separated by microprint seams built from the sample forecast figures. Screens are set as engraved plates in a double frame. One section inverts to a green note, framed top and bottom by guilloche bands, and that is where the evidence lives. Motion is a single grammar: the engraving stroke-draw, done once on load.

The world rejects fintech gloss: no colour gradients on surfaces, no glass, no stat band of oversized numbers on tinted cards. Value is carried by line, not by fill.

**Key Characteristics:**
- Warm grey security paper with a wave-line underprint on every paper surface.
- One ink: deep intaglio green for display type, rules, line work and the primary button.
- Logo colours as hairlines only; ember orange reserved for costly months and the live reading.
- Bodoni Moda display over Manrope body, with Red Hat Mono for serials, readouts and microprint.
- Guilloche rosette, guilloche seal and guilloche bands as the signature line work.
- Hairline rules, double-framed plates and microprint seams instead of cards and shadows.

## Colors

One green ink on warm paper, with the logo colours held back to hairlines and orange held back to the months that cost more.

### Primary
- **Intaglio Green** (`intaglio-green`): display type, h2 and h3, rule work, rosette and seal rings, the pill button, the green-note section and the footer. It is the page's only ink.
- **Soft Intaglio Green** (`intaglio-green-soft`): button hover and the scrollbar thumb. A pressed-ink variant, never a second colour.

### Secondary
- **Ember** (`ember`): the costly-month hairlines. December's lobe in the rosette, the hatched bars of the hot months in the ledger, the top rule over a readout, the inset tick on a pressed month. Line work only; at 2.7:1 on paper it never sets text.
- **Ember Ink** (`ember-ink`): the text form of ember. The italic *December* in headlines, the month name in a readout, the active rosette label, the rosette serial, and the focus outline. It clears 4.5:1 on every paper: security paper (5.6:1) and paper deep (5.0:1).

### Tertiary
- **Logo Leaf** (`logo-leaf`): every fourth rosette ring (offset one), every third seal ring, two strands of the guilloche band, and the underprint on the green note. Hairline only.
- **Logo Sun** (`logo-sun`): every fourth rosette ring (offset three) and one strand of the guilloche band. Hairline only; at 1.6:1 on paper it can never carry text or a boundary on its own.

### Neutral
- **Security Paper** (`security-paper`): the page ground, the nav, and the hero. Always laid with the underprint.
- **Paper Deep** (`paper-deep`): alternating section ground (the year, made for here, access), also with underprint.
- **Paper Highlight** (`paper-highlight`): the face of a plate and the watermark window centre; text colour on the green button and in selection.
- **Body Ink** (`body-ink`): running text (12.8:1 on paper).
- **Body Ink Muted** (`body-ink-muted`): ledes, secondary paragraphs, labels and readouts (8.2:1 on paper).
- **Hairline / Hairline Strong** (`hairline`, `hairline-strong`): green ink at 20% and 42% for rules. Strong rules open a list or ledger; light rules divide within it.
- **Note Paper / Note Mint** (`note-paper`, `note-mint`): text on the green note and in the footer, primary and secondary. Rules there are note paper at 18% to 35% alpha.

### Named Rules
**The One Ink Rule.** Everything printed is intaglio green. A new element that needs emphasis gets weight, size or a rule in green ink, not a new hue.

**The Hairline Colour Rule.** Leaf, sun and ember appear as 1px to 1.35px strokes, hatching or rules. They never fill a surface, a button, a badge or a block of text.

**The Costly Month Rule.** Ember marks a month that costs more, the month currently being read, and keyboard focus. Nothing else on the page is orange.

## Typography

**Display Font:** Bodoni Moda (with Didot, Georgia, serif), optical size axis 6 to 96, regular and italic
**Body Font:** Manrope (with system-ui, -apple-system, sans-serif)
**Label/Mono Font:** Red Hat Mono (with ui-monospace, monospace)

**Character:** A high-contrast Didone set like banknote lettering, carried by a plain, sturdy grotesque that never competes, with a mono that reads as serial numbers and fine print rather than code.

### Hierarchy
- **Display** (400, `clamp(3.25rem, min(6.6vw, 10svh), 6rem)`, 0.98): the hero line only. Italic used for the costly month, in ember ink.
- **Figure** (400, `clamp(4rem, 11vw, 6rem)`, 0.9, lining numerals): the single lead survey figure on the green note.
- **Headline Entry** (400, `clamp(2.5rem, 4.6vw, 4.25rem)`, 1): one-word ledger entry names (Budget, Savings, Debt).
- **Headline** (400, `clamp(2.25rem, 4.2vw, 3.75rem)`, 1.04, balanced wrap): section titles.
- **Title** (Manrope 700, 1.125rem to 1.1875rem, 1.3): list item heads and entry leads.
- **Lede** (400, `clamp(1.0625rem, 1.35vw, 1.25rem)`, 1.6, max 34rem): the hero subline.
- **Body** (400, 1.0625rem, 1.65, 30rem to 40rem measures): running text.
- **Label** (Red Hat Mono 500 to 600, 0.72rem to 0.85rem, 0.1em to 0.16em, uppercase, tabular): month names, readouts, the hero meta line, the serial, notes. Fine print uses the mono face at 0.8125rem in sentence case.
- **Microprint** (Red Hat Mono, 9px, 0.1em, 60% opacity): the decorative seam text only, always `aria-hidden`.

### Named Rules
**The Didone Weight Rule.** Bodoni sets at 400 only, with tight negative tracking. Emphasis comes from italic, never from bolding the display face.

**The Serial Rule.** Figures that behave like data (month values, percentages in the figures table, serials) set in Red Hat Mono with tabular numerals. The one lead figure is the exception and sets in Bodoni lining numerals.

**The Microprint Rule.** 9px type is ornament. It repeats real or sample figures and is hidden from assistive tech; anything a reader needs sets at 0.72rem or larger.

## Layout

Content sits in a 1240px container inside a fluid gutter (`spacing.gutter`); the nav and hero widen to 1440px. Sections breathe on a single fluid rhythm (`spacing.section`) and alternate security paper and paper deep. Section heads are a two-column split (about 1.1fr / 0.9fr, bottom aligned): Bodoni headline left, muted body right.

The hero is an asymmetric grid, roughly 0.82fr copy to 1.18fr dial, sized to the viewport (`clamp(600px, 100svh - nav - 34px, 1000px)`) so the microprint seam lands on the fold. The copy and the forecast readout stack in the left column; the rosette occupies the full height of the right.

Lists read as ledgers: the year is a 12-column graticule (6 columns under 640px), plan entries are a 3 : 4 : 5 grid of name, text and plate, the fine print is a 5-up row of rule-topped items (3-up under 1080px, 1-up under 640px).

Breakpoints are 1080px (tighten nav, two-column entries), 900px (menu toggle, single-column hero and heads, nav height 64px) and 640px.

## Elevation & Depth

Depth is printed, not lifted. Surfaces are flat paper; separation comes from hairline rules, the paper-deep tone and the double engraved frame. The only drop shadows are soft green-tinted falloffs under plates and under the primary button on hover, plus the dropdown menu on mobile. No shadow is ever an offset hard edge.

### Shadow Vocabulary
- **Engraved double frame** (`inset 0 0 0 1px hairline-strong, 0 0 0 6px security-paper, 0 0 0 7px hairline`): a 1px inner rule, a 6px paper gap and a 1px outer rule. Used on plates and the watermark window.
- **Plate falloff** (`0 28px 50px -24px rgba(1, 50, 32, 0.28)`): appended to the double frame on plates only.
- **Button rest** (`inset 0 0 0 1px rgba(255,255,255,0.06), 0 1px 0 rgba(1,50,32,0.2)`): a printed edge.
- **Button hover** (`inset 0 0 0 1px rgba(255,255,255,0.08), 0 10px 24px -10px rgba(1,50,32,0.55)`): with a 1px rise.
- **Ledger double line** (`0 3px 0 -2px hairline`): a second, finer rule under each plan entry. A rule, not a shadow.

### Named Rules
**The Printed Depth Rule.** New containers get rules and the double frame, not raised cards. A drop shadow belongs only to a plate, the primary button's hover, or an overlay.

## Shapes

Two shape families. Line work and rules are square and hairline thin (1px, non-scaling strokes). Things a person holds or taps are round: pill buttons and the menu toggle (999px), plates with generous radii (22px outer and 15px inner for crops; 30px and 23px for tall phone plates), and the oval watermark window (aspect 0.88, fully rounded) that holds the pixel budgie. Guilloche geometry is generated, never drawn by hand: sinusoidal rings modulated by the forecast data.

## Components

### Buttons
Ink pressed into paper: solid, quiet, confident.
- **Shape:** full pill (`rounded.pill`), 52px tall, 60px for the large variant, 46px in the nav.
- **Primary:** intaglio green ground with paper-highlight text, Manrope 700 at 1rem.
- **Hover / Focus:** soft green ground, a 1px lift and the hover falloff over 240ms on the ease-out curve; returns flat on press. Focus is a 2px ember-ink outline at 3px offset.
- **Unavailable:** for an action that exists but is not open yet, the pill goes transparent with a 1px green inset outline, a not-allowed cursor, and a mono note beneath saying when to check back.
- **Text link:** green, 600 weight, underlined in hairline-strong that darkens to full ink on hover.

### Cards / Containers
There are no cards. Grouping is done with rule-topped lists, ledgers and plates.
- **Plates:** screenshots sit on paper highlight with 8px padding inside the engraved double frame and plate falloff. Paired plates offset the second one down by `clamp(3rem, 8vw, 6rem)`.
- **Term lists:** 2-column rows divided by light hairlines under a strong top rule.

### Navigation
- Sticky security-paper bar with underprint and a single hairline under it; 72px tall (64px under 900px).
- Mark plus Manrope 700 wordmark left; links in Manrope 500 at 0.95rem with a 1px ink underline that draws in from the left on hover (300ms); the primary pill right.
- Under 900px a 44px pill toggle with two bars that cross into an X opens a full-width paper panel of rule-divided links; Escape closes it and returns focus.

### Forecast Rosette (signature)
Twenty guilloche rings in green ink (every fourth leaf, every fourth sun) swelling into twelve lobes sized by the sample forecast, with December at twelve o'clock. Twelve faint inner rings (30% ink) surround the oval watermark window holding the pixel budgie. Month labels in mono sit outside, scaled so they never fall under 11px on screen. The selected month's lobe is redrawn in ember hairlines and its label turns ember ink. Each month is a focusable wedge, washed 8% ember on keyboard focus (arrow keys step through the year) that updates a readout: mono month, value and a plain-language reason over an ember top rule, plus a sample-forecast note. On load the rings engrave themselves in with a 45ms stagger over 1.9s; reduced motion shows them drawn.

### Year Ledger
The same twelve figures as hatched bars on a quarter-line graticule, outlined in ink (costly months in ember), each a toggle button. Hover or press widens the bar from 58% to 72% and brings it to full opacity; the pressed month name gets an ember tick and ember-ink text. A readout row mirrors the rosette's.

### Green Note
The evidence panel: intaglio green ground with a leaf underprint, framed above and below by a 28px guilloche band of five strands (leaf, note paper, sun). Text in note paper and note mint, a single Bodoni lead figure, then a mono figures table with right-aligned tabular numbers over note-paper hairlines.

### Microprint Seam
A 34px band between sections bounded by two hairlines, repeating the sample forecast as 9px mono text at 60% opacity (45% on the footer's green). Decorative and hidden from assistive tech.

### Seal
The closing guilloche seal: fourteen rings in green ink with every third in leaf, around the pixel budgie, above the final call to action.

## Do's and Don'ts

### Do:
- **Do** lay every paper surface with the wave underprint, on security paper or paper deep.
- **Do** print display type, rules and line work in intaglio green and nothing else.
- **Do** keep leaf, sun and ember as 1px to 1.35px hairlines, hatching or rules.
- **Do** reserve ember for costly months, the month being read and the focus outline.
- **Do** set screenshots as plates in the engraved double frame (1px rule, 6px paper, 1px rule).
- **Do** generate guilloche from data with non-scaling 1px strokes, and draw it in once with the engraving stroke on the `cubic-bezier(0.16, 1, 0.3, 1)` ease-out.
- **Do** label any sample figure as a sample beside the figure.
- **Do** keep small ember-ink text on security paper or paper highlight, where it clears 4.5:1.

### Don't:
- **Don't** fill a surface, button or badge with leaf, sun or ember. The one wash is an 8% ember tint on a focused rosette wedge.
- **Don't** set text in ember or sun, or in logo leaf on paper; they fail contrast as text colours.
- **Don't** bold Bodoni or set it above weight 400.
- **Don't** put information in microprint; 9px is ornament only.
- **Don't** build raised cards, glass panels or colour gradients; depth is printed. Gradients exist only as line patterns (graticule, hatching, nav underline) and the paper-to-paper vignette in the watermark window.
- **Don't** use hard offset shadows; the only offset line is the ledger's double rule.
