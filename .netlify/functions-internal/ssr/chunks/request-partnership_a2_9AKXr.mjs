import sanitizeHtml from 'sanitize-html';
import { c as createResponse } from './helpers_78RTG-S2.mjs';

const prerender = false;
const SENDPULSE_API_URL = process.env.SENDPULSE_API_URL || "https://events.sendpulse.com/events/id";
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    let { name, organization, message, source = "", email } = body;
    if (!name || typeof name !== "string" || !organization || typeof organization !== "string" || !message || typeof message !== "string" || typeof source !== "string" || !email || typeof email !== "string") {
      return createResponse({
        message: "Please provide all required data",
        success: false,
        status: 404
      });
    }
    name = sanitizeHtml(name);
    organization = sanitizeHtml(organization);
    message = sanitizeHtml(message);
    source = sanitizeHtml(source);
    email = sanitizeHtml(email);
    const sendpulseRequest = await fetch(
      `${SENDPULSE_API_URL}/a5845b0419324023828b3577f1e43dff/8603131`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          phone: "000000000000",
          data: [
            {
              name,
              organisation: organization,
              topic: message,
              found_out_from: source
            }
          ]
        })
      }
    );
    if (!sendpulseRequest.ok) {
      return createResponse({
        message: "There was a problem with the server sendpulseRequest.",
        success: false,
        status: 500
      });
    }
    const sendpulseResponse = await sendpulseRequest.json();
    return createResponse({
      message: sendpulseResponse,
      success: true,
      status: 200
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return createResponse({
        message: error.message,
        success: false,
        status: 500
      });
    }
  }
  return createResponse({
    message: "Something went wrong",
    success: false,
    status: 404
  });
};

export { POST, prerender };
