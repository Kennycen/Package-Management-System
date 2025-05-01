import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const emailService = {
  sendPackageNotification: async (recipientEmail, packageDetails) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: "Your Package Has Arrived!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Package Arrival Notification</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f5f5f5;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              .header {
                background-color: #000;
                color: white;
                padding: 20px;
                text-align: center;
                border-radius: 8px 8px 0 0;
                margin-bottom: 20px;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
              }
              .content {
                padding: 20px;
              }
              .package-details {
                background-color: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                padding: 20px;
                margin: 20px 0;
              }
              .detail-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 12px;
                padding-bottom: 12px;
                border-bottom: 1px solid #e2e8f0;
              }
              .detail-row:last-child {
                border-bottom: none;
                margin-bottom: 0;
                padding-bottom: 0;
              }
              .detail-label {
                color: #64748b;
                font-weight: 500;
              }
              .detail-value {
                color: #1e293b;
                font-weight: 600;
              }
              .footer {
                text-align: center;
                padding: 20px;
                color: #64748b;
                font-size: 14px;
                margin-top: 20px;
                border-top: 1px solid #e2e8f0;
              }
              .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #000000;
                color: #ffffff !important;
                text-decoration: none !important;
                border-radius: 6px;
                font-weight: 500;
                margin: 20px 0;
                transition: all 0.3s, ease-in-out;
              }
              .button:hover {
                background-color: #1a1a1a;
              }
              .highlight {
                color: #2563eb;
                font-weight: 600;
                font-size: 1.1rem;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Package Arrival Notification</h1>
              </div>
              
              <div class="content">
                <p>Dear <span class="highlight">${
                  packageDetails.recipient
                }</span>,</p>
                
                <p>We're pleased to inform you that your package has arrived at our facility. Here are the details:</p>
                
                <div class="package-details">
                  <div class="detail-row">
                    <span class="detail-label">Tracking Number:&nbsp;</span>
                    <span class="detail-value">${
                      packageDetails.trackingNumber
                    }</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Carrier:&nbsp;</span>
                    <span class="detail-value">${packageDetails.carrier}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Apartment:&nbsp;</span>
                    <span class="detail-value">${
                      packageDetails.apartment
                    }</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Size:&nbsp;</span>
                    <span class="detail-value">${packageDetails.size}</span>
                  </div>
                  ${
                    packageDetails.description
                      ? `
                    <div class="detail-row">
                      <span class="detail-label">Description:&nbsp;</span>
                      <span class="detail-value">${packageDetails.description}</span>
                    </div>
                  `
                      : ""
                  }
                </div>

                <p>Please pick up your package at your earliest convenience. If you have any questions, feel free to contact us.</p>
                
                <div style="text-align: center;">
                  <a href="mailto:${
                    process.env.EMAIL_USER
                  }" class="button">Contact Support</a>
                </div>
              </div>

              <div class="footer">
                <p>This is an automated message. Please do not reply to this email.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
};
export default emailService; 