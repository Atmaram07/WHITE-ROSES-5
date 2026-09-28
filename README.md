# White Roses@5

A responsive, mobile-first landing page built with semantic HTML, CSS and vanilla JavaScript. The supplied 10-page White Rose brochure is the primary source for project imagery, floor areas, amenity lists, construction specifications and location connectivity. Brochure spreads have been converted into optimized WebP panels for web use.

## Run locally

Open `index.html` in a browser, or serve this directory with a static web server. For example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Project information represented

- Project campaign name: White Roses@5 (from the supplied campaign creative and previous project brief)
- Brochure location wording: Brahmanjharilo, adjacent to Nakhara, Cuttack
- Configuration: 4.5 BHK triplex villas (from supplied campaign creative and previous project brief)
- Individual lift access for each unit (brochure plans show a lift; campaign creative states individual lift for each unit)
- South-facing area statement: Ground 987 sq ft, First 996 sq ft, Second 942 sq ft, Terrace 202 sq ft, Total 3,127 sq ft
- North-facing area statement: Ground 977 sq ft, First 982 sq ft, Second 930 sq ft, Terrace 205 sq ft, Total 3,095 sq ft
- Amenities and finishes are transcribed from the supplied brochure; refer to the page copy for the full list
- Project architect credited in the brochure: Rhythm Architects
- Introductory price ₹1.45 Cr* for first 10 units is carried over from the earlier supplied campaign artwork, not the brochure; confirm current price, terms and availability before publishing
- The exact project approval disclaimer from the earlier supplied campaign creative is retained

## Brochure assets

Images in `assets/brochure/` are cropped panels taken from the supplied brochure pages and converted to WebP. They are architectural renders, plan artwork, amenity imagery and brochure graphics—not photos of completed construction. Captions/alt text describe them accordingly.

Used panels:
- `page-01-right.webp` — nature-themed brochure cover
- `page-02-left.webp` — entrance/gateway architectural render
- `page-03-left.webp` — aerial community render
- `page-04-left.webp` / `page-05-left.webp` — south- and north-facing typical floor plans and area statements
- `page-04-right.webp` / `page-05-right.webp` — triplex villa exterior renders
- `page-08-left.webp` — brochure amenity collage
- `page-08-right.webp` — clubhouse/community building render
- `page-10-left.webp` — brochure location map and landmark notes

## Lead form configuration — required before launch

WhatsApp handoff is configured to the number supplied by the user: +91 97768 72555. No CRM endpoint or separately verified voice-call number has been supplied. A privacy notice draft is included at `privacy-notice-draft.html` and is explicitly not legally approved. The form is enabled for WhatsApp handoff/testing: it prepares a message, but information is sent to the project team only if the visitor continues to WhatsApp and presses Send. Review and approve the draft and confirm actual data practices before public launch.

Edit the `CONFIG` object at the top of `script.js`:

```js
const CONFIG = {
  phone: "",                    // No separate voice-call number supplied
  whatsapp: "919776872555",    // User-provided WhatsApp number, digits only
  leadEndpoint: "",            // No CRM endpoint supplied
  privacyNoticeUrl: "privacy-notice-draft.html", // Draft only, not approved
  privacyNoticeStatus: "draft"
};
```

The current form uses WhatsApp handoff to +91 97768 72555. The visitor reviews the prepared message and must press Send in WhatsApp; this is not a server-side lead submission and no CRM storage is configured. `privacy-notice-draft.html` is a working draft only, not legally approved. The form is enabled for review/testing with a visible warning. Before public launch, the responsible entity must review and approve the notice, fill its placeholders, confirm actual data handling and replace the draft status with an approved public notice URL. A future CRM endpoint must validate and securely process submissions, return 2xx only after acceptance, support CORS as needed, and apply appropriate spam prevention, retention and access controls. Never put API keys or secrets in browser JavaScript.

## Before publishing

1. Confirm the final project brand and legal entity wording. The brochure prominently uses “Brahmanjharilo” and “Nakhara”; the earlier campaign creative used “Kurunti”. This page follows the brochure's locality wording. Confirm the exact address/locality to use in advertisements and legal material.
2. Confirm the ₹1.45 Cr* introductory offer and first-10-unit condition, including current availability and all terms.
3. Confirm brochure-listed floor areas and obtain current approved/available drawings. Page copy explicitly labels the reproduced areas as brochure statements.
4. Confirm amenities, specifications, project stage and approval status against current developer documentation. The page preserves the disclaimer: “DISCLAIMER: THE PROJECT IS APPROVED FOR SUB-DIVISION OF LAYOUT ONLY; SEPARATE APPROVAL WILL BE OBTAINED FROM RELEVANT AUTHORITIES FOR BUILDINGS AND AMENITIES.”
5. WhatsApp handoff is set to the user-provided +91 97768 72555. Confirm it is the correct live business destination. Review and approve `privacy-notice-draft.html`, complete every owner placeholder, and publish an approved privacy notice before public launch. No CRM endpoint or separate voice-call number is configured.
6. Confirm the brochure's map pin, nearby landmark names and travel estimates; route times may vary by traffic and starting point.
7. Add the final public canonical URL and absolute Open Graph image URL after the production domain is known.
8. Configure analytics/advertising tags using approved IDs and required consent. Existing `dataLayer` events distinguish enquiry CTA clicks, form starts, WhatsApp handoffs and endpoint-accepted leads; no analytics IDs are embedded.
9. Test keyboard navigation, responsive layouts, screen-reader labels, all links, image loading, form success/failure, WhatsApp handoff, performance and actual analytics on staging and real devices.

## Important

This is a front-end landing page, not a lead-management backend. All project visuals are brochure artwork. Project facts, offer, amenities, approvals, availability and exact location should be verified with the developer before launch. WhatsApp handoff is configured for +91 97768 72555. The form prepares a message and the visitor must press Send in WhatsApp. The included privacy notice is a draft and is not legally approved; complete review and approval before public launch.
