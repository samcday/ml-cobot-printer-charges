const subdomain = window.cobot?.subdomain || import.meta.env.VITE_COBOT_SUBDOMAIN;
const apiToken = window.cobot?.access_token || import.meta.env.VITE_COBOT_TOKEN;
const baseUrl = `https://${subdomain}.cobot.me/api`;

export async function api(uri: string): Promise<any> {
  // Need rate limiting.

  const response = await fetch(baseUrl + uri, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });

  // Check status codes.

  return await response.json();
}
