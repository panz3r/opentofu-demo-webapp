import { createJSONResponse, parseCookies, parseRequestBody } from "./_utils";

// Endpoint to retrieve votes
export async function onRequestGet(context) {
  const database = context.env.DB;

  // TODO: retrieve votes from DB
  const { results } = await database.prepare("SELECT * FROM votes").all();
  console.debug(">>> results:", results);

  const votes = results.map((dbRecord) => dbRecord.vote);
  console.debug(">>> votes:", votes);

  // compute percentages
  const votesCount = votes.length;
  const votesA = votes.filter((vote) => vote === "a").length;
  const votesB = votes.filter((vote) => vote === "b").length;

  const percentageA = votesCount > 0 ? Math.round((votesA / votesCount) * 100) : 0;
  const percentageB = votesCount > 0 ? Math.round((votesB / votesCount) * 100) : 0;

  return createJSONResponse(200, { votesCount, percentageA, percentageB });
}

// Endpoint to register votes
export async function onRequestPost(context) {
  try {
    const request = context.request;
    const database = context.env.DB;

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

    // write "vote" to DB
    await database
      .prepare(
        "INSERT INTO votes VALUES (?1, ?2, ?3) ON CONFLICT(voter_id) DO UPDATE SET vote=excluded.vote, voted_on=excluded.voted_on"
      )
      .bind(voterId, vote, Date.now())
      .run();

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
