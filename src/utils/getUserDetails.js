import { jwtDecode } from "jwt-decode";

function getUserDetails() {
  const token = localStorage.getItem("token");

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
