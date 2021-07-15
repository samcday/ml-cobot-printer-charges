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

export async function members(): Promise<Map<string, any>> {
  const list = await api('/memberships?attributes=id,name,email');
  const members = new Map;

  for (const member of list) {
    members.set(member.email, member);
  }

  return members;
}

export async function serviceCharges(): Promise<Map<string, any>> {
  const list = await api('/service_charges');
  const charges = new Map;

  for (const item of list) {
    charges.set(item.name, item);
  }

  return charges;
}
