# End-to-End Test Walkthrough

Use this checklist after adding your Supabase credentials to `.env` and running `full-setup.sql`.

## Before you start

- [ ] `.env` has `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- [ ] Ran `supabase/full-setup.sql` in SQL Editor
- [ ] TOTP MFA enabled in Supabase Auth
- [ ] Email confirm **disabled** for local dev (optional but easier)
- [ ] `npm run dev` running at http://localhost:5173

## Test 1 — Admin setup (~5 min)

1. Register at http://localhost:5173/login with **your admin email**
2. In Supabase SQL Editor:
   ```sql
   update public.profiles
   set role = 'admin', approval_status = 'approved'
   where email = 'YOUR_ADMIN_EMAIL';
   ```
3. Go to http://localhost:5173/admin/login
4. Sign in and complete **MFA setup** (scan QR with Google Authenticator / Authy)
5. Open http://localhost:5173/admin/students — should load without errors

## Test 2 — Student registration + admin email (~3 min)

1. Open an **incognito window** (or different browser)
2. Register a test student at http://localhost:5173/login
3. Student should land on **Pending Approval** page
4. **You should receive an email** (if Edge Functions deployed) OR see `[Email mock]` in browser console (F12)

## Test 3 — Approve account (~2 min)

1. As admin → `/admin/students` → **Approve** the test student
2. Student receives approval email (or console mock)
3. Student refreshes → can browse courses and request enrollment

## Test 4 — Enrollment request + payment email (~3 min)

1. As student → open any course → **Request Enrollment**
2. **You receive** enrollment request email with course name and price
3. **Student receives** payment instructions email
4. Admin dashboard shows pending enrollment request

## Test 5 — Confirm payment + access (~3 min)

1. As admin → `/admin/students` → **Confirm Enrollment (Paid)**
2. Student receives enrolled email with expiry date
3. Student → **Dashboard** → course appears with expiry date
4. Student → **Continue Learning** → video/quiz pages load

## Test 6 — Single IP session (~2 min)

1. Student logged in on Browser A
2. Sign in same account on Browser B (or incognito)
3. Browser A should show session conflict / redirect to login within ~60 seconds

## Test 7 — Expired access (optional, SQL shortcut)

Simulate expiry without waiting a year:

```sql
update public.course_enrollments
set expires_at = now() - interval '1 day'
where user_id = (select id from public.profiles where email = 'TEST_STUDENT_EMAIL');
```

Student should be blocked from learning pages and see **Access Expired** on course detail.

## Email not working?

1. Run `.\scripts\deploy-email-functions.ps1`
2. Set Resend API key + `ADMIN_EMAIL` secret
3. Update `contactInfo.adminEmail` in `src/data/siteContent.js` to match
4. Check Supabase Dashboard → Edge Functions → Logs

## Quick commands

```powershell
# Interactive setup (creates .env, guides SQL + email deploy)
.\scripts\setup-supabase.ps1

# Dev server
npm run dev

# Production build check
npm run build
```
