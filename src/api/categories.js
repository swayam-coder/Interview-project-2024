import axios from 'axios';

export async function fetchAllCategories() {
  try {
    const response = await axios.get(
      'https://dummyjson.com/products/categories'
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
