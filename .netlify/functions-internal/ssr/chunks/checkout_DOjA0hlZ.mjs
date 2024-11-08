import { c as createResponse, g as generateLiqPaySignature } from './helpers_78RTG-S2.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const { data } = await request.json();
    if (!data || typeof data !== "string") {
      return createResponse({
        message: "Please provide json string",
        success: false,
        status: 404
      });
    }
    const privateKey = process.env.PRIVATE_LIQPAY_KEY;
    if (!privateKey) {
      return createResponse({
        message: "Please set liqpay private key as environmental variable",
        success: false,
        status: 500
      });
    }
    const signature = generateLiqPaySignature(data, privateKey);
    return new Response(
      JSON.stringify({
        data: signature,
        success: true
      }),
      {
        status: 200
      }
    );
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return createResponse({
        message: error.message,
        success: false,
        status: 500
      });
    }
  }
  return createResponse({
    message: "An unexpected error occurred",
    success: false,
    status: 404
  });
};

export { POST, prerender };
