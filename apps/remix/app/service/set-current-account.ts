export async function fetchSetCurrentAccount(email: string) {
  try {
    const resp = await fetch("/api/set-current-account", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await resp.json();
  } catch (e) {
    return [];
  }
}
