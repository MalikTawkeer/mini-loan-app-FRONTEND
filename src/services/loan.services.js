import axios from "axios";

import {
  API_BASE_URL,
  RETRIVE_USER_LOANS_ENDPOINT,
} from "../apis/api.constants.js";

export const fetchUserLoans = async (token) => {
  try {
    const res = await axios.get(API_BASE_URL + RETRIVE_USER_LOANS_ENDPOINT, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "", // Add token if available
      },
    });

    return res;
  } catch (error) {
    console.log(error, "Error fetching user loans");
    return error;
  }
};
