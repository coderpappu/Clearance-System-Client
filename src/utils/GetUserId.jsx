import jwt_decode from "jwt-decode";

const token = localStorage.getItem("token");

function getUserDetails() {
  if (!token) {
    return null;
  }
  try {
    const decodedToken = jwt_decode(token);
    return decodedToken;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}

export default getUserDetails;
