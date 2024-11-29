import { jwtDecode } from "jwt-decode"; // Fix: should be the default import

const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp * 1000 > Date.now(); // Check if the token has expired
  } catch (error) {
    console.error("Invalid Token:", error);
    return false;
  }
};

export default isTokenValid;
