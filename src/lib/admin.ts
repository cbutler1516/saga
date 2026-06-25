/** Dev-only admin access. Replace with proper auth before production use. */
export function isAdminEnabled(): boolean {
  return process.env.NODE_ENV === "development";
}

export function adminNotFoundResponse() {
  return new Response(JSON.stringify({ error: "Not found." }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
}
