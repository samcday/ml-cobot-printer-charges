import {api} from './cobot_api';

export default async function members() {
  const list = await api('/memberships?attributes=id,name,email');
  const members = new Map;

  for (const member of list) {
    members.set(member.email, member);
  }

  return members;
}
