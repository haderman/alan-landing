import { customAlphabet } from 'nanoid';

export const nanoid = customAlphabet('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');

const isProd = import.meta.env.PROD;
const isDev = import.meta.env.DEV;

const ENDPONT = new URL('/api/logs', document.location.href);

function generateUniqueId() {
  return `usr_${nanoid(22)}`;
}

function getUserId() {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = generateUniqueId();
    localStorage.setItem('userId', userId);
  }
  return userId;
}

/**
 * Logs user interaction events to a remote server in development mode and prints the data to the console.
 *
 * @param {Object} data The event data to log. The structure depends on the event type:
 * - For click events: `{ type: 'click', href: string }`
 * - For hover events: `{ type: 'hover', element: string }`
 * - For scroll events: `{ type: 'scroll', position: number }`
 * - For page view events: `{ type: 'pageview', href: string }`
 * - For session end events: `{ type: 'sessionend' }`
 */
export function logger(data) {
  const userId = getUserId();
  const enrichedData = [{
    _time: new Date().toISOString(),
    attributes: {
      userId,
    },
    data,
    site: document.location.href,
  }];

  if (isProd) {
    fetch(ENDPONT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enrichedData),
    }).then((response) => {
      console.log('logger: ', response);
    }).catch((error) => {
      console.error('logger: ', error);
    });
  }

  if (isDev) {
    console.log('logger: ', enrichedData);
  }
}
