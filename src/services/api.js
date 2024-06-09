import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/movie`);
    if (response.data.status) {
      return response.data.movies;
    } else {
      console.error("Failed to fetch data:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
