import { createJSONResponse, parseCookies, parseRequestBody } from "./_utils";

export async function onRequestPost(context) {
  try {
    const request = context.request;

    const cookies = parseCookies(request.headers.get("cookie"));
    console.debug(">> cookies:", cookies);

    // Check if the user has already voted
    const voterId = cookies.voterId || crypto.randomUUID();

    const body = await parseRequestBody(request);
    console.debug(">> body:", body);

    // Validate the body
    if (!body || typeof body !== "object") {
      return createJSONResponse(415, { error: "Invalid request body" });
    }

    const { vote } = body;
    if (typeof vote !== "string" || (vote !== "a" && vote !== "b")) {
      return createJSONResponse(400, { error: "Invalid vote" });
    }

    // TODO: write "vote" to DB

    const responseContent = {
      success: true,
      vote,
      message: `Vote '${vote}' recorded successfully`,
    };

    // Set an expiration time for the cookie (e.g., 24 hours)
    const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();

    return createJSONResponse(200, responseContent, {
      "Set-Cookie": `voterId=${voterId}; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=${expirationDate}`,
    });
  } catch (error) {
    console.error("Error processing vote:", error);

    return createJSONResponse(500, { error: error.message });
  }
}
