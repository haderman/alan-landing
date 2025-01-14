const URL = "https://api.brevo.com/v3/smtp/email";
const API_KEY = import.meta.env.BREVO_API_KEY;

export function sendWelcomeMessage(email, unsubscribeUrl) {
  const data = {
    sender: {
      name: "Alan AI Chat updates",
      email: "hello@alanai.app",
    },
    to: [{ email }],
    subject:
      "Welcome Aboard! You're on the List for the Exclusive Release of Alan AI Chat v2 🚀",
    htmlContent: emailTemplate(unsubscribeUrl),
  };
  return fetch(URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      accept: "application/json",
      "api-key": API_KEY,
    },
    body: JSON.stringify(data),
  });
}

function emailTemplate(unsubscribeUrl) {
  console.log("--> unsubscribeUrl: ", unsubscribeUrl);

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to [Extension Name]!</title>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Open Sans', sans-serif; margin: 0; padding: 0; background-color: #f0f4f8; color: #333; }
    .container { max-width: 500px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 30px; text-align: center; }
    .content { padding: 30px; line-height: 1.6; font-size: 16px; }
    .footer { background-color: #333; color: #ffffff; text-align: center; padding: 20px; font-size: 14px; }
    a { color: #667eea; text-decoration: none; font-weight: 600; }
    ul { padding-left: 20px; }
    li { margin-bottom: 10px; }
    .button { display: inline-block; background: #667eea; color: #ffffff; padding: 10px 20px; border-radius: 25px; text-decoration: none; font-weight: 600; margin-top: 20px; }
    .unsubscribe { font-size: 12px; color: #999; margin-top: 20px; }
  </style>
  </head>
  <body>
  <div class="container">
    <div class="header">
      <h1 style="font-family: 'Poppins', sans-serif; font-weight: 600;">Welcome Aboard!</h1>
    </div>
    <div class="content">
      <p>Hi there,</p>
      <p>We're thrilled to welcome you to [Extension Name]. I'm [Your Name], the mind behind this adventure, and I'm here to ensure your journey is nothing short of amazing.</p>
      <p>Here's a glimpse of what awaits:</p>
      <ul>
        <li><strong>Feature 1:</strong> Effortlessly efficient.</li>
        <li><strong>Feature 2:</strong> Tailored for you.</li>
        <li><strong>Feature 3:</strong> Support that truly cares.</li>
      </ul>
      <p>Curious or have ideas? Hit reply. Together, we'll create wonders.</p>
      <p>With excitement,</p>
      <p>[Your Name]</p>
      <a href="#" class="button">Explore Now</a>
      <p class="unsubscribe">
        <a href="${unsubscribeUrl}">Unsubscribe</a>
        if you wish to stop receiving our emails.</p>
    </div>
    <div class="footer">
      <p>Stay connected <a href="#">on Social Media</a></p>
      <p>&copy; [Year] [Your Name/Company]. All rights reserved.</p>
    </div>
  </div>
  </body>
</html>
`;
}
