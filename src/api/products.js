import axios from 'axios';

export async function fetchAllProducts() {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
