// api.js
import axios from "axios";

const apiURL = "https://api.blog.redberryinternship.ge/api/categories";
const token =
  "937af957925b8398c6c5e8b103b3578aa1e4edb43b00db8b3acd2e841d0d140d";

export const fetchData = async () => {
  try {
    const response = await axios.get(apiURL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
