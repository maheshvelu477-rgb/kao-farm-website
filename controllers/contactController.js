const Contact = require("../models/Contact");
const transporter = require("../config/mailer");

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, inquiryCategory, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    // Save to DB
    const newContact = await Contact.create({
      name,
      email,
      phone,
      subject,
      inquiryCategory,
      message,
    });

    // Send Email (Corporate styled)
    await transporter.sendMail({
      from: `"KAO Farm Support" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Admin receives
      subject: `📩 New Contact: ${subject || "General Inquiry"}`,
      html: `
  <div style="margin:0; padding:0; background-color:#f5f7fb; font-family: 'Segoe UI', Roboto, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          <table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.05);">

            <!-- Header -->
            <tr>
              <td style="background:#1f2937; color:#ffffff; padding:20px 30px;">
                <h2 style="margin:0; font-size:18px; font-weight:600;">KAO Farm</h2>
                <p style="margin:4px 0 0; font-size:13px; opacity:0.8;">New Contact Submission</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px;">
                
                <p style="margin:0 0 20px; color:#374151; font-size:14px;">
                  A new message has been submitted via the contact form.
                </p>

                <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px; color:#374151;">
                  <tr>
                    <td style="padding:8px 0;"><strong>Name</strong></td>
                    <td style="padding:8px 0;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;"><strong>Email</strong></td>
                    <td style="padding:8px 0;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;"><strong>Phone</strong></td>
                    <td style="padding:8px 0;">${phone || "—"}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;"><strong>Category</strong></td>
                    <td style="padding:8px 0;">${inquiryCategory || "—"}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;"><strong>Subject</strong></td>
                    <td style="padding:8px 0;">${subject || "—"}</td>
                  </tr>
                </table>

                <!-- Message Box -->
                <div style="margin-top:25px;">
                  <p style="font-size:13px; color:#6b7280; margin-bottom:8px;">Message</p>
                  <div style="background:#f9fafb; border:1px solid #e5e7eb; padding:15px; border-radius:6px; line-height:1.6; color:#374151;">
                    ${message}
                  </div>
                </div>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td style="padding:18px 30px; background:#f9fafb; font-size:12px; color:#9ca3af; text-align:center;">
                    New inquiry received via website contact form
                </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </div>
`,
    });

    // Auto-reply to user (optional but corporate feel)
    await transporter.sendMail({
      from: `"KAO Farm" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your message 🌱",
     html: `
  <div style="margin:0; padding:0; background-color:#f5f7fb; font-family: 'Segoe UI', Roboto, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.05);">

            <!-- Header -->
            <tr>
              <td style="background:#1f2937; color:#ffffff; padding:20px 30px;">
                <h2 style="margin:0; font-size:18px;">KAO Farm</h2>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px;">
                <p style="font-size:15px; color:#111827; margin-bottom:10px;">
                  Hi ${name},
                </p>

                <p style="font-size:14px; color:#374151; line-height:1.6;">
                  Thank you for contacting us. We’ve received your message and our team will review it shortly.
                </p>

                <p style="font-size:14px; color:#374151; line-height:1.6;">
                  You can expect a response within 24–48 hours.
                </p>

                <!-- Divider -->
                <hr style="margin:25px 0; border:none; border-top:1px solid #e5e7eb;" />

                <p style="font-size:13px; color:#6b7280;">
                  If your request is urgent, feel free to reply to this email.
                </p>

                <p style="margin-top:25px; font-size:14px; color:#111827;">
                  Regards,<br/>
                  <strong>KAO Farm Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:20px; text-align:center; font-size:12px; color:#9ca3af; background:#f9fafb;">
                © ${new Date().getFullYear()} KAO Farm. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </div>
`,
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: newContact,
    });

  } catch (error) {
    console.error("Contact Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};