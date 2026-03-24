

# KAI'S DIVO COLLECTION — Revised Plan

## Key Changes from Feedback
- **No e-commerce** — site is for booking meetings/calls only
- **No gold** — palette shifts to black, white, and silver/cool gray accents
- **Multi-page** with React Router

## Color Palette
- Background: Pure black (#000) and off-white (#fafafa)
- Accents: Silver/cool gray (hsl ~220, low saturation)
- Text: White on dark, near-black on light
- Glass effects: white/10%, white/5% borders, backdrop-blur

## Typography
- Google Fonts: Playfair Display (headings), Inter (body)

## Pages (4 routes)

### 1. Home (`/`)
- Full-screen hero with uploaded editorial image, glassmorphic overlay, brand name, tagline "Redefining Elegance • Kampala"
- Featured looks section — 3-4 uploaded images in a grid with glass hover overlays
- Brief brand statement
- CTA: "Book a Consultation"

### 2. About (`/about`)
- Abbas Kaijuka bio (researched): started 2014, ex-GIZ, styled Jose Chameleon, Sheebah, etc. East African Designer of the Year, Abryanz Awards 2016, Best Menswear 2020
- Portrait photo (red blazer upload)
- Philosophy section in glassmorphic cards

### 3. Collections (`/collections`)
- Gallery grid of all 6 uploaded images
- Glassmorphic hover cards with collection/look names
- No pricing, no shop — purely editorial showcase

### 4. Contact (`/contact`)
- Glassmorphic form: Name, Email, Phone, Message, preferred meeting type (In-Person / Video Call / Phone Call)
- "Book a Meeting" submit button
- Location: Kampala, Uganda
- Instagram: @kais_divo_collection

## Shared Components
- **Navbar**: Fixed, `backdrop-blur-xl bg-black/30`, links to all 4 pages, mobile hamburger with glass overlay
- **Footer**: Minimal — brand name, location, social link, copyright

## Technical Details
- New files: `src/pages/About.tsx`, `src/pages/Collections.tsx`, `src/pages/Contact.tsx`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`
- Update `src/App.tsx` with 4 routes
- Update `index.html` to load Playfair Display + Inter from Google Fonts
- Update `src/index.css` with black/white/silver theme variables
- All 6 uploaded images referenced directly via their upload paths

