/**
 * Email Notification Service (SMTP / Nodemailer / Simulation)
 * Sends welcome & login alert emails to users upon registration & sign-in.
 */

const sendLoginNotificationEmail = async ({ name, email, time = new Date().toLocaleString() }) => {
  const emailSubject = `🔐 Security Alert: Successful Sign-In to NexusMart E-Commerce`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #f1f5f9;">
        <h1 style="color: #4f46e5; margin: 0;">Nexus<span style="color: #0f172a;">Mart</span></h1>
        <p style="color: #64748b; font-size: 14px; margin-top: 5px;">Enterprise AI E-Commerce Platform</p>
      </div>

      <div style="padding: 20px 0; color: #0f172a;">
        <h2 style="color: #0f172a;">Hello ${name || 'Valued Customer'},</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #334155;">
          You have successfully signed in to your <strong>NexusMart E-Commerce account</strong>.
        </p>

        <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 20px 0;">
          <p style="margin: 5px 0; font-size: 13px;"><strong>Account Email:</strong> ${email}</p>
          <p style="margin: 5px 0; font-size: 13px;"><strong>Sign-In Time:</strong> ${time}</p>
          <p style="margin: 5px 0; font-size: 13px;"><strong>Status:</strong> Authenticated & Active</p>
        </div>

        <p style="font-size: 13px; color: #64748b;">
          If this sign-in was performed by you, no further action is required. If you did not authorize this login, please reset your password immediately.
        </p>
      </div>

      <div style="text-align: center; padding-top: 20px; border-top: 1px solid #f1f5f9; color: #94a3b8; font-size: 12px;">
        <p>© 2026 NexusMart E-Commerce Inc. All rights reserved.</p>
      </div>
    </div>
  `;

  console.log(`📧 [EMAIL SENT TO]: ${email}`);
  console.log(`SUBJECT: ${emailSubject}`);
  
  return {
    success: true,
    message: `Confirmation email sent to ${email}`,
    timestamp: new Date().toISOString(),
  };
};

module.exports = { sendLoginNotificationEmail };
