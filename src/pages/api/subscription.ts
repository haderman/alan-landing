import type { APIRoute } from 'astro';

import { supabase } from '../../lib/supabase';
import { sendWelcomeMessage } from '../../lib/brevo';

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();

  // Validate email format
  if (!email || !validateEmail(email)) {
    return new Response(JSON.stringify({ error: "Invalid email format" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  // Check if email is already subscribed
  const { data: existingSubscription } = await supabase
    .from('email_subscriptions')
    .select('email')
    .eq('email', email)
    .single();

  if (existingSubscription) {
    return new Response(JSON.stringify({ error: "Email already subscribed" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  try {
    const subscriptionResult = await subscribeEmail(email);
    if (!subscriptionResult) {
      throw new Error('Subscription failed');
    }

    await sendWelcomeMessage(email, composeUnsubscribeUrl(email));
    console.log('Welcome message sent!');
  } catch (error) {
    console.error('Error processing subscription: ', error);
    return new Response(JSON.stringify({ error: "Error processing subscription" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return redirect('/thank-you');
}

// Function to validate email format
function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Function to subscribe an email
async function subscribeEmail(email: string) {
  const { data, error } = await supabase
    .from('email_subscriptions')
    .insert([
      { email: email },
    ]);
  if (error) throw error;
  return data;
}

function composeUnsubscribeUrl(email: string): string {
  const encodedEmail = encodeURIComponent(email);
  const pathWithParams = `/unsubscribe?email=${encodedEmail}`;
  // Assuming SITE environment variable is set to the site's base URL
  const baseUrl = import.meta.env.SITE || 'http://localhost:3000';
  const url = new URL(pathWithParams, baseUrl);
  return url.href;
}
