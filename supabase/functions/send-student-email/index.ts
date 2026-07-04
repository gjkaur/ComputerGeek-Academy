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

function paymentHtml(details, courseTitle, coursePrice) {
  return `
    <h3>Payment Instructions — ${courseTitle}</h3>
    <p><strong>Amount:</strong> ${coursePrice}</p>
    <ul>
      <li><strong>Bank:</strong> ${details.bankName}</li>
      <li><strong>Account Name:</strong> ${details.accountName}</li>
      <li><strong>Account Number:</strong> ${details.accountNumber}</li>
      <li><strong>Routing / SWIFT:</strong> ${details.routingOrSwift}</li>
      <li><strong>Reference:</strong> ${details.paymentReference}</li>
    </ul>
    <p>${details.instructions}</p>
  `;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    let subject = '';
    let html = '';

    if (body.type === 'payment_instructions') {
      subject = `Payment details — ${body.courseTitle} | ComputerGeek Academy`;
      html = `
        <p>Hello ${body.studentName},</p>
        <p>Thank you for requesting enrollment in <strong>${body.courseTitle}</strong>.</p>
        ${paymentHtml(body.paymentDetails, body.courseTitle, body.coursePrice)}
        <p>After payment, email confirmation to <a href="mailto:${body.contactEmail}">${body.contactEmail}</a> or call ${body.contactPhone}.</p>
        <p>Your course access will be activated manually after payment verification (human approval required).</p>
        <p><em>ComputerGeek Academy</em></p>
      `;
    } else if (body.type === 'account_approved') {
      subject = 'Your ComputerGeek Academy account has been approved';
      html = `
        <p>Hello ${body.studentName},</p>
        <p>Your account has been approved. You can now sign in and request course enrollment.</p>
        <p><a href="${body.loginUrl}">Sign in to ComputerGeek Academy</a></p>
        <p><em>ComputerGeek Academy</em></p>
      `;
    } else if (body.type === 'course_enrolled') {
      subject = `Course access granted — ${body.courseTitle}`;
      html = `
        <p>Hello ${body.studentName},</p>
        <p>Payment confirmed. You now have access to <strong>${body.courseTitle}</strong>.</p>
        <ul>
          <li><strong>Access expires:</strong> ${new Date(body.expiresAt).toLocaleDateString()}</li>
          <li><strong>One device/IP at a time</strong> — account sharing is not permitted</li>
        </ul>
        <p><a href="${body.dashboardUrl}">Go to your dashboard</a></p>
        <p><em>ComputerGeek Academy</em></p>
      `;
    } else {
      throw new Error('Unknown email type');
    }

    await sendEmail({ to: body.studentEmail, subject, html });

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
