# Accelerate Revenue Partners website

Static multi-page website built from the supplied website copy and design principles.

## Files

- `index.html` Home
- `revenue-management-services/` Managed revenue management
- `revenue-management-audit/` Revenue diagnostic
- `pricelabs-management/` PriceLabs management
- `case-studies/` Results
- `about/` About
- `insights/` Insights hub
- `contact/` Contact form
- `thank-you/` Form success page
- `404.html` Not found page
- `assets/css/styles.css` Global responsive styles
- `assets/js/main.js` Mobile navigation and form validation

## Run locally

Serve the folder with any static HTTP server. For example, from this directory: `python -m http.server 8000`.

## Multi-page structure

This is a true multi-page static website. Each major destination has its own HTML document:

- `/index.html` — Home
- `/revenue-management-services/index.html` — Revenue Management
- `/revenue-management-audit/index.html` — Revenue Audit
- `/pricelabs-management/index.html` — PriceLabs Management
- `/case-studies/index.html` — Results
- `/insights/index.html` — Insights
- `/about/index.html` — About
- `/contact/index.html` — Contact
- `/thank-you/index.html` — Thank-you state
- `/404.html` — 404 page

Internal navigation points to the explicit `index.html` files, so page-to-page navigation works when the site is opened locally as well as when deployed to a static host.

The supplied SVG favicon is stored at `/assets/favicon.svg` and linked from every HTML page.

## Site architecture

This is a multi-page static website, not a single-page landing page. Main documents are:

- `/index.html`
- `/revenue-management-services/index.html`
- `/revenue-management-audit/index.html`
- `/pricelabs-management/index.html`
- `/case-studies/index.html`
- `/about/index.html`
- `/insights/index.html`
- `/contact/index.html`
- `/thank-you/index.html`
- `/404.html`

## Typography

- Manrope, weights 600 and 700: hero headings, section headings, card headings, metrics, CTA text, brand text, and important callouts.
- IBM Plex Sans, weights 400, 500 and 600: body copy, navigation, labels, forms, tables, and operational data.
- Fonts are loaded from Google Fonts with local system fallbacks.

## Favicon

The supplied `favicon.svg` is stored at `/assets/favicon.svg` and is referenced by every page.
