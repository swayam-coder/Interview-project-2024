import { useDispatch } from 'react-redux';
import Category from './components/Category';
import Product from './components/Product';
import { fetchCategories } from './reducers/category-slice';
import { fetchProducts } from './reducers/product-slice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Functional Requirement - 
1. Use https://dummyjson.com/docs to find JSON contract for fetching products and product categories.
2. Display all categories and make it selectable (single-select).
3. Show products for the selected category otherwise show products from all categories when no category selected.
4. Implement Search for the products on the selected category or all.
5. List down if there are any limitations of your app as comments in “App.js”.

Technical Requirement
1. Use only functional components.
2. Use Redux to store and retrieve product and category data.
3. Selected Category and search input should be stored as queryparams 
4. No need to update the UX.
 */

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="container">
      <div className="panel left-panel">
        <button onClick={() => navigate('/')}>Clear filter</button>
        <Category />
      </div>
      <div className="vertical-divider" />
      <div className="panel right-panel">
        <Product />
      </div>
    </div>
  );
}

export default App;
