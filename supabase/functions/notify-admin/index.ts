import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function sendEmail({ to, subject, html }) {
  const resendKey = Deno.env.get('RESEND_API_KEY');
  const fromEmail = Deno.env.get('FROM_EMAIL') || 'ComputerGeek Academy <onboarding@resend.dev>';

  if (!resendKey) {
    console.log('[Email mock]', { to, subject });
    return { mock: true };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: fromEmail, to: [to], subject, html }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error: ${err}`);
  }

  return res.json();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const adminEmail = body.adminEmail || Deno.env.get('ADMIN_EMAIL');
    if (!adminEmail) throw new Error('ADMIN_EMAIL not configured');

    let subject = '';
    let html = '';

    if (body.type === 'student_registered') {
      subject = `[CGA] New student registration — ${body.studentName}`;
      html = `
        <h2>New Student Registration</h2>
        <p>A new student has registered and is awaiting your approval.</p>
        <ul>
          <li><strong>Name:</strong> ${body.studentName}</li>
          <li><strong>Email:</strong> ${body.studentEmail}</li>
        </ul>
        <p>Sign in to the admin dashboard to approve or reject this account.</p>
        <p><em>ComputerGeek Academy</em></p>
      `;
    } else if (body.type === 'enrollment_requested') {
      subject = `[CGA] Enrollment request — ${body.courseTitle}`;
      html = `
        <h2>Course Enrollment Request</h2>
        <p>A student has requested enrollment in a course.</p>
        <ul>
          <li><strong>Student:</strong> ${body.studentName} (${body.studentEmail})</li>
          <li><strong>Course:</strong> ${body.courseTitle}</li>
          <li><strong>Price:</strong> ${body.coursePrice}</li>
        </ul>
        <p>After receiving offline payment, confirm enrollment in the admin dashboard.</p>
        <p><em>ComputerGeek Academy</em></p>
      `;
    } else {
      throw new Error('Unknown notification type');
    }

    await sendEmail({ to: adminEmail, subject, html });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
