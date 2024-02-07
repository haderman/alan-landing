import type { APIRoute } from 'astro';

import { supabase } from '../../lib/supabase';
import { sendWelcomeMessage } from '../../lib/brevo';

export const POST:APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const url = new URL(request.url)

  try {
    await subscribeEmail(email);
  } catch (error) {
    console.error('error subscribing email: ', error);
  }

  try {
    await sendWelcomeMessage(email, composeUnsubscribeUrl(email, url.href));
    console.log('sended!')
  } catch (error) {
    console.error('error sending welcome message: ', error);
  }

  return redirect('/thank-you');
}

// Function to subscribe an email
async function subscribeEmail(email) {
  const { data, error } = await supabase
    .from('email_subscriptions')
    .insert([
      { email: email },
    ]);
  if (error) throw error;
  return data;
}

function composeUnsubscribeUrl(email: string, requestUrl: string): string {
  const encondedEmail = encodeURIComponent(email);
  const pathWithParams = `/unsubscribe?email=${encondedEmail}`;
  const url = new URL(
    pathWithParams,
    import.meta.env.PROD ? import.meta.env.SITE : requestUrl
  );
  return url.href;
}

// Function to unsubscribe an email
async function unsubscribeEmail(email) {
  const { data, error } = await supabase
    .from('email_subscriptions')
    .delete()
    .match({ email: email });
  if (error) throw error;
  return data;
}
