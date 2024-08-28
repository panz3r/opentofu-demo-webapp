/**
 * Parses a cookie string and returns an object with key-value pairs.
 *
 * @param {string} requestCookiesString - The cookie string from the request headers.
 * @returns {Object} An object containing parsed cookies as key-value pairs.
 */
export function parseCookies(requestCookiesString) {
  if (!requestCookiesString) return {};

  return requestCookiesString.split(`;`).reduce((cookies, cookieString) => {
    let [name, ...rest] = cookieString.split(`=`);

    name = name?.trim();
    if (!name) {
      return cookies;
    }

    const value = rest.join(`=`).trim();
    if (!value) {
      return cookies;
    }

    return {
      ...cookies,
      [name]: decodeURIComponent(value),
    };
  }, {});
}

/**
 * Parses an incoming Request body
 * @param {Request} request the incoming request to read from
 */
export async function parseRequestBody(request) {
  const contentType = request.headers.get("content-type");

  switch (true) {
    case contentType.includes("application/json"):
      return request.json();

    case contentType.includes("application/text"):
    case contentType.includes("text/html"):
      return request.text();

    case contentType.includes("form"):
      const formData = await request.formData();

      return Array.from(formData.entries()).reduce((body, [key, value]) => {
        return {
          ...body,
          [key]: value,
        };
      }, {});

    default:
      // Perhaps some other type of data was submitted in the form
      // like an image, or some other binary data.
      return null;
  }
}

/**
 * Creates a JSON response with the specified status code, content, and headers.
 *
 * @param {number} statusCode - The HTTP status code for the response.
 * @param {Object} responseContent - The content to be serialized as JSON in the response body.
 * @param {Object} [headers] - Additional headers to include in the response (optional).
 * @returns {Response} A new Response object with JSON content and specified headers.
 */
export function createJSONResponse(statusCode, responseContent, headers) {
  return new Response(JSON.stringify(responseContent), {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
  });
}
