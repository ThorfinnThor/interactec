# InterAcTec

## Cloudflare Workers

The existing Next.js application remains available through the standard `npm run dev`
and `npm run build` commands. The Cloudflare migration uses vinext alongside it:

```bash
npm run dev:vinext
npm run build:vinext
npm run start:vinext
```

Before deploying:

1. Create the `interactec-reports` R2 bucket.
2. Upload the two report PDFs using these object keys:
   - `reports/InterAcTec_Report1_IBD.pdf`
   - `reports/InterAcTec_Report2_Arthritis.pdf`
3. The production canonical URL defaults to `https://interactec.bio`. Set
   `NEXT_PUBLIC_SITE_URL` only when intentionally building for another target domain.
4. Run `npm run build:vinext` and verify the `/thanks` and `/api/download/*` flows.

Deploy only after the preview environment has passed the migration smoke tests.
