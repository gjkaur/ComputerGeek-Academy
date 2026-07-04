# Supabase Auth Setup

Follow these steps to enable secure authentication for ComputerGeek Academy.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free project
2. Wait for the database to finish provisioning

## 2. Run the database schema

1. Open **SQL Editor** in your Supabase dashboard
2. Copy and run the contents of **`supabase/full-setup.sql`** (all tables in one file)
3. If you already ran an older `schema.sql`, run migrations `002` and `003` instead

## 3. Enable MFA (required for admin)

1. Go to **Authentication → Providers**
2. Scroll to **Multi-Factor Authentication**
3. Enable **TOTP (Authenticator App)**
4. For local testing, disable **Confirm email** under Authentication → Email

## 4. Configure environment variables

**Option A — interactive script (Windows):**
```powershell
.\scripts\setup-supabase.ps1
```

**Option B — manual:**
1. Copy `.env.example` to `.env`
2. From **Project Settings → API**, copy:
   - Project URL → `VITE_SUPABASE_URL`
   - anon public key → `VITE_SUPABASE_ANON_KEY`
3. Restart the dev server after saving `.env`

## 5. Create your admin account

1. Run `npm run dev` and sign up at `/login` with your admin email
2. In **SQL Editor**, promote the account:
   ```sql
   update public.profiles
   set role = 'admin', approval_status = 'approved'
   where email = 'your-admin@email.com';
   ```
3. Sign in at `/admin/login` — set up MFA on first login

## 6. Deploy email notifications

See **[EMAIL_SETUP.md](EMAIL_SETUP.md)** or run:
```powershell
.\scripts\deploy-email-functions.ps1
```

Emails sent:
- **You:** new registration, enrollment request
- **Student:** payment instructions, account approved, course enrolled

Update `paymentDetails` and `contactInfo.adminEmail` in `src/data/siteContent.js`.

## 7. Student approval workflow

New student accounts are created with `approval_status = 'pending'`. Students cannot access courses until you approve them:

1. Go to `/admin/students`
2. Review **Pending Account Approvals**
3. Click **Approve** or **Reject**

## 8. Offline payments & enrollment

This site does **not** accept online payments. The workflow is:

1. Student registers → waits for account approval
2. Approved student clicks **Request Enrollment** on a course
3. Student pays offline (bank transfer, invoice, etc.)
4. Admin goes to `/admin/students` → **Confirm Enrollment (Paid)** or uses **Manual Enrollment**

## 9. Security notes

- Never commit `.env` to git (already in `.gitignore`)
- Admin access requires **password + TOTP MFA**
- Student accounts default to `role = 'student'` via database trigger
- Roles are stored in Supabase, not in the browser
- Only promote trusted emails to admin in the database

## Routes

| Route | Purpose |
|-------|---------|
| `/login` | Student sign in / sign up |
| `/admin/login` | Admin sign in + MFA (not linked publicly) |

## Troubleshooting

**"Supabase Setup Required"** — env vars missing or dev server not restarted

**"Access denied" on admin login** — user role is still `student`; run the SQL update above

**MFA code invalid** — ensure phone time is synced; codes expire quickly

**Email confirmation required** — disable email confirm in Auth settings for dev, or confirm via email link
