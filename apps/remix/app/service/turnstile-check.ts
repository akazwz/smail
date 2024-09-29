export async function turnstileCheck(request: Request): Promise<boolean> {
  const response = (await request.formData()).get("cf-turnstile-response");
  if (!response) {
    return false;
  }
  const verifyEndpoint = process.env
    .CLOUDFLARE_TURNSTILE_VERIFY_Endpoint as string;

  const secret = process.env.TURNSTILE_SECRET;
  const resp = await fetch(verifyEndpoint, {
    method: "POST",
    body: JSON.stringify({
      secret,
      response,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await resp.json();
  if (!data.success) {
    return false;
  }
  return true;
}
