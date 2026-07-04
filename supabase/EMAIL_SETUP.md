# Email Notifications Setup

ComputerGeek Academy sends emails via **Supabase Edge Functions** + **Resend**.

## Emails sent automatically

| Event | Recipient | Content |
|-------|-----------|---------|
| Student registers | **You (admin)** | Name, email — approve in admin dashboard |
| Student requests enrollment | **You (admin)** | Student, course, price |
| Student requests enrollment | **Student** | Offline payment instructions |
| You approve account | **Student** | Account approved, sign-in link |
| You confirm enrollment (after payment) | **Student** | Access granted + expiry date |

## Setup steps

### 1. Create a Resend account
- Go to [resend.com](https://resend.com) and verify your domain (or use test mode)

### 2. Deploy Edge Functions
```bash
npm install -g supabase
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase secrets set RESEND_API_KEY=re_xxxxx
supabase secrets set ADMIN_EMAIL=your-admin@email.com
supabase secrets set FROM_EMAIL="ComputerGeek Academy <noreply@yourdomain.com>"
supabase functions deploy notify-admin
supabase functions deploy send-student-email
```

### 3. Update payment details
Edit `src/data/siteContent.js` → `paymentDetails` with your real bank info.
These are included in enrollment request emails to students.

### 4. Run database migration
Run `supabase/migrations/003_security_enrollments_email.sql` in SQL Editor.

## Without email setup (development)
Emails are logged to the browser console as `[Email mock]` until Edge Functions are deployed.

## Security features included

- **Manual account approval** — students cannot access courses until you approve
- **Manual enrollment** — course content visible only after you confirm offline payment
- **1-year access** — enrollment expires 12 months after you grant access
- **One IP at a time** — signing in from a new location ends the other session
- **Admin MFA** — required for admin dashboard access
