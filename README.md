# Mô Finance

Real-estate portfolio finance app for acquisition, renovation, financing, rental operations and property exits.

## V2

V2 models the business as a **portfolio of property projects** instead of separate spreadsheet tabs.

### Included
- Portfolio dashboard
- Active vs sold properties
- Property detail modal
- Cost-basis breakdown by property
- Outstanding contractor/supplier payables
- Debt dashboard: bank vs private loans
- Interest-paid tracking
- Capital-source view: Equity vs Debt
- Transaction entry
- Sale history and realized ROI
- **What if I sell today?** calculator
- Local browser persistence with `localStorage`

### Workbook-derived model
The V2 seed uses selected management-level figures from the source workbook (property cost basis, payables and sold-property results). Personal legal identifiers are not included.

### Important current limitation
Loans in the workbook are portfolio-level. They are **not yet reliably allocated to each property**, so per-property equity and sell-today cash after debt become fully accurate only after each loan is linked to its collateral/property.

## Run
Open `index.html`, or enable GitHub Pages:
**Settings → Pages → Deploy from a branch → main → / (root)**.

## Next architecture step
For multi-user use and sensitive finance data, move from localStorage to an authenticated backend (Postgres/Supabase or equivalent), with:
- users and permissions
- properties
- transactions
- loans and loan allocations
- rental operations
- sales
- attachments / invoices
- audit trail

> Before adding confidential financial or legal records, make the repository private and use an authenticated database rather than committing those records into source code.
