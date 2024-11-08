import cryptoJs from 'crypto-js';

/**
 * Creates breakpoints classes to use in class:list directive
 */
function getBreakpoints(prefix, prop) {
  return typeof prop === "object"
    ? {
        [`default:${prefix}-${prop.default}`]: prop.default,
        [`tablet:${prefix}-${prop.tablet}`]: prop.tablet,
        [`laptop:${prefix}-${prop.laptop}`]: prop.laptop,
        [`desktop:${prefix}-${prop.desktop}`]: prop.desktop,
      }
    : { [`${prefix}-${prop}`]: prop };
}

/**
 * Replace symbols to double and single quotes
 * @param {String} title
 * @returns Parsed title
 */
function parseTitle(title) {
  return title.replaceAll("&quot;", `"`).replaceAll("&#39;", `'`);
}

/**
 * Returns aspect ratio based on orientation
 * @param {String} orientation
 * @returns {String} Aspect ratio
 */
function getRatio(orientation) {
  if (orientation === "landscape") {
    return "3:2";
  }

  if (orientation === "portrait") {
    return "3:4";
  }

  if (orientation === "square") {
    return "1:1";
  }

  if (orientation === "wide") {
    return "16:9";
  }
}

/**
 * Sort projects by publish date from newest to oldest
 * @param {Array} projects
 * @returns {Array} Sorted projects
 */
function getSortedProjects(projects) {
  return [...projects].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

/**
 * Get project time period
 * @param {Object} period
 * @returns {String} Time period
 */
function getTimePeriod(period) {
  const { startYear, startMonth, endYear, endMonth } = period;

  const isSameYear = startYear === endYear ? "" : startYear;
  return `${startMonth} ${isSameYear} — ${endMonth} ${endYear} р.`;
}

/**
 * Generate liqpay signature hash
 * @param {String} data
 * @param {String} privateKey
 * @returns {String} hash
 */
function generateLiqPaySignature(data, privateKey) {
  return cryptoJs.enc.Base64.stringify(
    cryptoJs.SHA1(privateKey + data + privateKey)
  );
}

/**
 * Decode string from base64
 * @param {String} string
 * @returns {String}
 */
function decodeBase64(string) {
  return decodeURIComponent(
    cryptoJs.enc.Utf8.stringify(cryptoJs.enc.Base64.parse(string))
  );
}

/**
 * Creates a Response object with JSON-formatted content.
 *
 * @param {Object} options - The options for creating the response.
 * @param {string} options.message - The message to include in the response body.
 * @param {boolean} options.success - Indicates whether the operation was successful.
 * @param {number} options.status - The HTTP status code for the response.
 * @returns {Response} A new Response object with the specified content and status.
 */
function createResponse({ message, success, status }) {
  return new Response(JSON.stringify({ message, success }), { status });
}

export { getSortedProjects as a, getTimePeriod as b, createResponse as c, decodeBase64 as d, getRatio as e, getBreakpoints as f, generateLiqPaySignature as g, parseTitle as p };
