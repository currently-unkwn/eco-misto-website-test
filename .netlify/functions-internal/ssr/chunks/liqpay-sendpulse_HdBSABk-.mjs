import { g as generateLiqPaySignature, c as createResponse, d as decodeBase64 } from './helpers_78RTG-S2.mjs';
import { format } from 'date-fns';

const prerender = false;
const PAYMENT_STATUS = {
  SUCESS: "success",
  SUBSCRIBED: "subscribed"
};
const SENDPULSE_API_URL = process.env.SENDPULSE_API_URL || "https://events.sendpulse.com/events/id";
const POST = async ({ request }) => {
  try {
    console.log("Received LiqPay callback");
    const body = decodeURIComponent(await request.text()).split("&").reduce((acc, curr) => {
      const [key, value] = curr.split(/=(.*)/s);
      return { ...acc, [key]: value };
    }, {});
    const privateKey = process.env.PRIVATE_LIQPAY_KEY || "";
    if (!privateKey) {
      throw new Error("PRIVATE_LIQPAY_KEY is not set");
    }
    const generatedLiqPaySignature = generateLiqPaySignature(
      body.data,
      privateKey
    );
    if (generatedLiqPaySignature !== body.signature) {
      return createResponse({
        message: "Invalid signature",
        success: false,
        status: 400
      });
    }
    const data = JSON.parse(decodeBase64(body.data));
    const customData = JSON.parse(
      decodeBase64(data.dae)
    );
    if (data.status !== PAYMENT_STATUS.SUCESS && data.status !== PAYMENT_STATUS.SUBSCRIBED) {
      console.log(
        `Payment ${data.payment_id} status is ${data.status}. Not processing.`
      );
      return createResponse({
        message: "Payment is not processed",
        success: true,
        status: 200
      });
    }
    const dateObject = data.create_date ? new Date(data.create_date) : /* @__PURE__ */ new Date();
    const sendpulseRequest = await fetch(
      `${SENDPULSE_API_URL}/71cd2c45232e4e119d18a3a356ad331d/8603131`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: customData.email,
          amount: Number(data.amount),
          payment_id: Number(data.payment_id),
          type: data.action,
          date: format(new Date(dateObject), "yyyy-MM-dd")
        })
      }
    );
    if (!sendpulseRequest.ok) {
      console.error("Sendpulse request failed", {
        status: sendpulseRequest.status,
        message: sendpulseRequest.statusText
      });
      return createResponse({
        message: "There was a problem with the server sendpulseRequest.",
        success: true,
        status: 200
      });
    }
    const sendpulseResponse = await sendpulseRequest.json();
    console.log("Sendpulse response:", sendpulseResponse);
    return createResponse({
      message: "Payment processed successfully",
      success: true,
      status: 200
    });
  } catch (error) {
    console.error("Error processing LiqPay callback", error);
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
