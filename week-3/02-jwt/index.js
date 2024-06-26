const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
const zod = require("zod");
/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */

const valudation = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});

function signJwt(username, password) {
  // Your code here
  const response = valudation.safeParse({
    username: username,
    password: password,
  });

  if (!response.success) {
    return null;
  }
  const sign = jwt.sign(
    {
      username: username,
      password: password,
    },
    jwtPassword
  );
  // console.log(sign);
  return sign;
}

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
  try {
    const verifyToken = jwt.verify(token, jwtPassword);
    // console.log(verifyToken);
    if (verifyToken) {
      return true;
    }
  } catch (err) {
    if (err) {
      return false;
    }
  }

  // Your code here
}

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */
function decodeJwt(token) {
  // Your code here
  const decodeToken = jwt.decode(token);
  console.log(decodeToken);
  if (decodeToken) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};

// console.log(
//   decodeJwt(
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJ1c2VybmFtZSI6InNoYXNoaXZhZGFuOTlAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE3MDMxNjM5MTd9.h5Dtde0r8qg0p-PEnpWrf0qf93la7-Ul2-Qak1VSz-I"
//   )
// );
