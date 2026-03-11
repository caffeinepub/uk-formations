# Specification

## Summary
**Goal:** Add VAT Registration and PAYE Registration as new services under the Services menu, with catalog entries, dedicated detail pages, updated navigation, and overview page cards.

**Planned changes:**
- Add `VAT Registration` and `PAYE Registration` entries to the services catalog (`servicesCatalog.ts`) under a compliance/tax category, each with title, description, price, and feature list
- Create `VATRegistrationServicePage.tsx` at route `/services/vat-registration` following existing service page layout
- Create `PAYERegistrationServicePage.tsx` at route `/services/paye-registration` following existing service page layout
- Register both new routes in `App.tsx`
- Add `VAT Registration` and `PAYE Registration` links to the Services dropdown in `SiteLayout.tsx`
- Add cards for both new services on the `ServicesPage.tsx` overview page

**User-visible outcome:** Users can browse and view VAT Registration and PAYE Registration services via the Services menu, the services overview page, and dedicated detail pages with benefits, features, pricing, and a call-to-action.
