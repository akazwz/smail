export async function fetchMails() {
  try {
    const resp = await fetch("/api/mails");
    return await resp.json();
  } catch (e) {
    return [];
  }
}
