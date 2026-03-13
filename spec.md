# UK Formations - Checkout & Payment Gating

## Current State
The site has a 4-step `StartFormationPage` (Name Check → Package → Features Review → Company Formed) that ends by redirecting to `FormationWizardPage` (the detail forms). There is no payment step and no gating — anyone can access the detail forms.

## Requested Changes (Diff)

### Add
- **Step 3: Checkout** — A new checkout step inserted between Package Selection (Step 2) and the formation detail forms. Shows order summary (company name, package, price breakdown, VAT) and a Stripe payment section.
- **Payment gate on FormationWizardPage** — The detail forms are only accessible after a successful payment. A `paymentSessionToken` is stored in `sessionStorage` after checkout completes. If the token is missing, the page redirects back to `/start-formation`.
- **A new `/checkout` route** OR integrate checkout as Step 3 within `StartFormationPage` so the progress bar header stays consistent.
- **Step labels updated**: Step 1 = Choose Name, Step 2 = Choose Package, Step 3 = Checkout, Step 4 = Enter Details.
- **Order summary panel** in checkout: shows chosen name, selected package, package price, VAT (20%), total.
- **"Secure payment" trust badges** in checkout (SSL, trusted payment icons).
- **Guard component** on `FormationWizardPage`: checks `sessionStorage` for payment token; if absent, shows locked screen with link back to start-formation.

### Modify
- `StartFormationPage`: Replace Step 3 (Features Review) and Step 4 (Company Formed) with a single Checkout step (Step 3). Move the features display into the checkout order summary sidebar. After successful payment, redirect to `/formation-wizard`.
- `STEPS` array in `StartFormationPage`: 3 steps total shown in wizard, then redirect — OR keep 4 steps with Step 4 = "Enter Details" (grayed until payment done).
- Package cards in Step 2: Add a feature list toggle/expandable so users can see what's included before selecting.
- `FormationWizardPage`: Add payment guard at top — if no valid session token, show a locked/paywall screen.

### Remove
- Old Step 3 (Features Review) as a separate full step — its content moves into the checkout sidebar.
- Old Step 4 (Company Formed summary screen) — replaced by redirect after payment.

## Implementation Plan
1. Update `STEPS` in `StartFormationPage` to 3 steps: Name Check, Choose Package, Checkout.
2. Build `CheckoutStep` component (Step 3 content inside the existing card layout):
   - Left column: Order summary (name, package, features list, price/VAT/total table).
   - Right column: Stripe payment form using the Stripe component.
   - On payment success: save `{ token, packageId, companyName, timestamp }` to `sessionStorage` key `paymentSession`, then navigate to `/formation-wizard`.
3. Expand package cards in Step 2 to show feature highlights (collapsible list).
4. Add `PaymentGuard` to `FormationWizardPage`: reads `sessionStorage.paymentSession`, if missing shows a locked state card with CTA back to `/start-formation`.
5. Update progress bar labels across both pages to reflect the new step names.
6. Add trust elements to checkout: lock icon, "256-bit SSL Encrypted", "Secure Checkout" header.
