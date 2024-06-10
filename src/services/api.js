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

export const fetchTransactions = async () => {
  try {
    const response = await axios.get(`${API_URL}/transaction/get`);
    if (response.data.status) {
      return response.data.transactions.transaction;
    } else {
      console.error("Failed to fetch data:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/movie/${id}`);
    if (response.data.status) {
      return response.data.movies;
    } else {
      console.error("Failed to fetch data:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const createTransaction = async (orderData) => {
  const response = await axios.post("/api/transaction", orderData);
  return response.data.token;
};
