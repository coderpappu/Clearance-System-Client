import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");

function getUserDetails() {
  if (!token) {
    return null;
  }
  try {
    const decodedToken = jwtDecode(token);

    return decodedToken;
  } catch (error) {
    return null;
  }
}

export default getUserDetails;
