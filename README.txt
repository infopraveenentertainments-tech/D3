PRAVEEN KITKAT — FIXED DYNAMIC WEBSITE

This package fixes the plain-HTML problem: your GitHub repository was missing style.css and app.js in the deployed root.

UPLOAD THESE FILES TO THE ROOT OF YOUR EXISTING GITHUB REPOSITORY:
- index.html
- style.css
- app.js
- admin.html
- admin.css
- admin.js
- SUPABASE_SETUP.sql (run this in Supabase SQL Editor; it does not need to be publicly served)

KEEP ALL YOUR EXISTING JPG/MP4 FILES in the repository root.

SETUP:
1. Supabase > SQL Editor > run SUPABASE_SETUP.sql once.
2. Supabase > Authentication > Users > create your admin email/password.
3. GitHub > Add file > Upload files > upload the website files above. Do NOT put them inside another folder.
4. Commit changes.
5. Cloudflare Workers & Pages > praveen-kitkat-magic > Deployments. Deploy the newest GitHub commit.
6. Open your workers.dev URL. The dark/gold website should now load.
7. Admin page: https://YOUR-SITE.workers.dev/admin.html

IMPORTANT:
The website is dynamic. Booking enquiries are inserted into Supabase. The public gallery is loaded from the Supabase gallery table. The admin page uses Supabase Auth and lets you view/delete enquiries and add/delete gallery items.

The public booking buttons also open WhatsApp so booking does not depend on JavaScript form handling.
