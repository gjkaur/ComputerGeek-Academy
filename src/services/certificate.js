/**
 * Build a printable HTML certificate (opens in a new window for Save as PDF).
 */
export function openCertificateWindow({ studentName, courseTitle, issuedAt, labSummary }) {
  const dateLabel = new Date(issuedAt || Date.now()).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Certificate — ${escapeHtml(courseTitle)}</title>
  <style>
    @page { size: landscape; margin: 0; }
    body {
      margin: 0;
      font-family: Georgia, "Times New Roman", serif;
      background: #0a2240;
      color: #001f3f;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cert {
      width: 1000px;
      max-width: 95vw;
      background: linear-gradient(180deg, #ffffff 0%, #f4f8fc 100%);
      border: 12px solid #007bff;
      box-shadow: 0 20px 60px rgba(0,0,0,.35);
      padding: 48px 56px;
      text-align: center;
      position: relative;
    }
    .eyebrow {
      letter-spacing: .28em;
      text-transform: uppercase;
      color: #007bff;
      font-size: 12px;
      font-family: system-ui, sans-serif;
      font-weight: 700;
    }
    h1 {
      font-size: 42px;
      margin: 16px 0 8px;
    }
    .name {
      font-size: 36px;
      color: #007bff;
      margin: 24px 0 8px;
      border-bottom: 2px solid #c5d4e6;
      display: inline-block;
      padding: 0 24px 8px;
    }
    .course {
      font-size: 22px;
      margin: 16px 0;
      font-weight: 700;
    }
    .meta {
      margin-top: 28px;
      font-family: system-ui, sans-serif;
      font-size: 13px;
      color: #4a7299;
    }
    .labs {
      margin-top: 20px;
      font-family: system-ui, sans-serif;
      font-size: 12px;
      color: #163a5f;
    }
    .sign {
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      font-family: system-ui, sans-serif;
      font-size: 13px;
    }
    .sign div { width: 40%; border-top: 1px solid #9eb8d4; padding-top: 8px; }
  </style>
</head>
<body>
  <div class="cert">
    <div class="eyebrow">ComputerGeek Academy</div>
    <h1>Certificate of Completion</h1>
    <p>This certifies that</p>
    <div class="name">${escapeHtml(studentName)}</div>
    <p>has successfully completed</p>
    <div class="course">${escapeHtml(courseTitle)}</div>
    <p>including all graded labs with passing solutions.</p>
    <div class="labs">${escapeHtml(labSummary || 'All required labs passed')}</div>
    <div class="meta">Issued ${escapeHtml(dateLabel)}</div>
    <div class="sign">
      <div>Dr. Gurinderjeet Kaur<br/>Instructor</div>
      <div>ComputerGeek Academy<br/>Official Certificate</div>
    </div>
  </div>
  <script>window.onload = () => setTimeout(() => window.print(), 400);</script>
</body>
</html>`;

  const win = window.open('', '_blank', 'noopener,noreferrer,width=1100,height=800');
  if (!win) return false;
  win.document.write(html);
  win.document.close();
  return true;
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
