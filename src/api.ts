export async function fetchUsers() {
  const res = await fetch("/users.json");
  if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);
  return (await res.json()) as unknown;
}
