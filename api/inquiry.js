// Vercel serverless function: POST /api/inquiry
// Validates the inquiry form and emails the lead to INQUIRY_TO_EMAIL through Resend.
// The Resend API key stays on the server; the browser only ever sees { ok } and field errors.

const EVENT_TYPES = { wedding: 'Wedding', party: 'Private party', other: 'Other' };
const PACKAGES = { essential: 'Essential', signature: 'Signature', luxury: 'Luxury', unsure: 'Not sure yet', custom: 'Custom quote' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function str(v, max) {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

function validate(body) {
  const d = {
    name: str(body.name, 200),
    email: str(body.email, 254),
    phone: str(body.phone, 40),
    date: str(body.date, 10),
    noDate: body.noDate === true,
    eventType: str(body.eventType, 20) || 'wedding',
    venue: str(body.venue, 200),
    guests: str(String(body.guests == null ? '' : body.guests), 6),
    package: str(body.package, 20),
    message: str(body.message, 2000),
    company: str(body.company, 200),
  };
  const errors = {};
  if (!d.name) errors.name = "Tell us who we're celebrating.";
  if (!EMAIL_RE.test(d.email)) errors.email = 'Enter a valid email so we can reply.';
  if (!d.noDate && !(DATE_RE.test(d.date) && !isNaN(Date.parse(d.date)))) errors.date = 'Pick a date, or tick "no date yet".';
  if (!EVENT_TYPES[d.eventType]) errors.eventType = 'Choose an event type.';
  if (d.package && !PACKAGES[d.package]) errors.package = 'Choose a package.';
  if (d.guests && !/^\d{1,5}$/.test(d.guests)) errors.guests = 'Enter a number of guests.';
  return { data: d, errors };
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function prettyDate(iso) {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

function buildEmail(d) {
  const when = d.noDate ? 'Date TBD' : prettyDate(d.date);
  const rows = [
    ['Name', d.name],
    ['Email', d.email],
    ['Phone', d.phone],
    ['Event type', EVENT_TYPES[d.eventType]],
    ['Event date', when],
    ['Venue or city', d.venue],
    ['Estimated guests', d.guests],
    ['Package', PACKAGES[d.package] || ''],
    ['Anything else?', d.message],
  ];
  const subject = `New inquiry: ${EVENT_TYPES[d.eventType]} · ${d.noDate ? 'date TBD' : d.date} · ${d.name}`.replace(/[\r\n]+/g, ' ');
  const text = rows.map(([k, v]) => `${k}: ${v || '-'}`).join('\n') + '\n\nReply to this email to answer them directly.';
  const html =
    '<div style="font-family:Helvetica,Arial,sans-serif;max-width:560px;color:#1a1309">' +
    '<h2 style="margin:0 0 4px;font-size:20px">New inquiry</h2>' +
    `<p style="margin:0 0 20px;color:#7a6a55">${esc(EVENT_TYPES[d.eventType])} · ${esc(when)}</p>` +
    '<table style="border-collapse:collapse;width:100%;font-size:14px">' +
    rows.map(([k, v]) =>
      `<tr><td style="padding:8px 12px 8px 0;border-top:1px solid #eadfcf;color:#7a6a55;white-space:nowrap;vertical-align:top">${esc(k)}</td>` +
      `<td style="padding:8px 0;border-top:1px solid #eadfcf;white-space:pre-wrap">${esc(v || '-')}</td></tr>`
    ).join('') +
    '</table><p style="margin:20px 0 0;font-size:13px;color:#7a6a55">Reply to this email to answer them directly.</p></div>';
  return { subject, text, html };
}

async function sendEmail(payload) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = null; }
  }
  if (!body || typeof body !== 'object') return res.status(400).json({ ok: false, errors: {} });

  const { data, errors } = validate(body);
  if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors });

  // Spam trap: bots fill in the hidden "company" field. Pretend it worked and send nothing.
  if (data.company) return res.status(200).json({ ok: true });

  const { RESEND_API_KEY, INQUIRY_TO_EMAIL, INQUIRY_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !INQUIRY_TO_EMAIL || !INQUIRY_FROM_EMAIL) {
    console.error('Inquiry not sent: RESEND_API_KEY, INQUIRY_TO_EMAIL and INQUIRY_FROM_EMAIL must all be set.');
    return res.status(500).json({ ok: false });
  }

  try {
    const { subject, text, html } = buildEmail(data);
    await sendEmail({ from: INQUIRY_FROM_EMAIL, to: [INQUIRY_TO_EMAIL], reply_to: data.email, subject, text, html });

    if (process.env.SEND_CONFIRMATION_EMAIL === 'true') {
      const first = data.name.split(/\s|&/)[0];
      await sendEmail({
        from: INQUIRY_FROM_EMAIL,
        to: [data.email],
        reply_to: INQUIRY_TO_EMAIL,
        subject: 'We got your inquiry · XELATION',
        text: `Thank you, ${first}. We've got your inquiry and will be in touch shortly.\n\nXELATION`,
        html: `<div style="font-family:Helvetica,Arial,sans-serif;color:#1a1309"><p>Thank you, ${esc(first)}.</p><p>We've got your inquiry and will be in touch shortly.</p><p>XELATION</p></div>`,
      }).catch((err) => console.error('Confirmation email failed:', err.message));
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Inquiry email failed:', err.message);
    return res.status(502).json({ ok: false });
  }
};

module.exports.validate = validate;
module.exports.buildEmail = buildEmail;
