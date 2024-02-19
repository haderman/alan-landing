import type { APIRoute } from 'astro';

import { supabase } from '../../lib/supabase';
import { sendWelcomeMessage } from '../../lib/brevo';

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();

  if (!email || !validateEmail(email)) {
    return new Response(JSON.stringify({ error: "Invalid email format" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const { data: existingSubscription } = await supabase
    .from('email_subscriptions')
    .select('email')
    .eq('email', email)
    .single();

  if (existingSubscription) {
    return redirect('/thank-you');
  }

  try {
    subscribeEmail(email);
    await sendWelcomeMessage(email, composeUnsubscribeUrl(email));
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error processing subscription" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return redirect('/thank-you');
}

function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

async function subscribeEmail(email: string) {
  const { data, error } = await supabase
    .from('email_subscriptions')
    .insert([
      { email: email },
    ]);

  if (error) {
    throw error;
  }

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
