# Showcase mockup images

Place 5 mockup images here — one per industry. The DeviceShowcase carousel on
the homepage and `/examples` will pick them up automatically.

## Expected filenames

| File | Bransje | Komponent-id |
|------|---------|--------------|
| `electrician.png` | Elektriker | `electrician` |
| `plumber.png` | Rørlegger | `plumber` |
| `salon.png` | Frisør | `salon` |
| `doctor.png` | Legekontor / klinikk | `doctor` |
| `petshop.png` | Dyrebutikk | `petshop` |

`.webp` works too — just update `src` in `components/showcase/DeviceShowcase.jsx`
if you change the extension.

## Image spec

- **Innhold:** MacBook + iPhone allerede komponert i ett bilde, som
  referansebildene som ble brukt for å beskrive prosjektet
- **Aspektforhold:** Anbefalt ~16:9 (wide). Container bruker `object-contain`
  så det er greit hvis aspect varierer litt mellom bildene — de blir uansett
  vist sentrert uten beskjæring
- **Bredde:** Minimum ~1600px på den lengste siden for skarp visning på Retina
- **Bakgrunn:** Lys eller transparent (matcher `beige-50` på siden). PNG med
  transparens ser best ut. Hvis bildet har egen bakgrunn, bruk lys grå/cream
- **Filstørrelse:** Hold under ~400KB per bilde via WebP eller komprimert
  PNG. `next/image` optimaliserer videre på serveren

Hvis et bilde mangler i denne mappen blir det bare et tomt rom i carouselen
fram til du legger det til — siden krasjer ikke.
