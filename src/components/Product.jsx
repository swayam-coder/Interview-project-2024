import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../reducers/product-slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { appendSearchParams } from '../util';

function Search(props) {
  const { onSearch, value } = props;
  return <input value={value ?? ''} onChange={(e) => onSearch('search', e.target.value)} />;
}

function Tile(props) {
  const { title, thumbnail } = props;
  return (
    <div className="product-card">
      <div>
        <img src={thumbnail} alt={title} width="190px" height="200px"></img>
      </div>

      <h6>{title}</h6>
    </div>
  );
}

const filterProducts = (products, search, category) => {
  const filteredByCategory = category
    ? products.filter((p) => p['category'] === category)
    : products;

  return search
    ? filteredByCategory.filter((p) =>
        p['title'].toLowerCase().includes(search.toLowerCase())
      )
    : filteredByCategory;
};

export default function Product() {
  const { products, isError, isLoading } = useSelector(
    (state) => state.products
  );

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedCategory = new URLSearchParams(location.search).get('category');
  const searchString = new URLSearchParams(location.search).get('search');

  const appendQueryParam = (key, value) => {
    const params = appendSearchParams(location.search, key, value);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const retry = () => dispatch(fetchProducts());

  if (isError) {
    return (
      <p>
        Failed to fetch products.{' '}
        <span style={{ color: 'blue' }} onClick={retry}>
          Retry?
        </span>
      </p>
    );
  }

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  const filteredProducts = filterProducts(
    products,
    searchString,
    selectedCategory
  );

  const clearSearch = () => {
    const params = appendSearchParams(location.search, 'search', undefined)
    navigate(`${location.pathname}?${params.toString()}`);
  }

  return (
    <>
      <div className="search">
        <Search onSearch={appendQueryParam} value={searchString} />
        <button style={{ marginLeft: 8 }} onClick={clearSearch}>Clear Search</button>
      </div>
      <div className="products">
        {filteredProducts?.length ? (
          filteredProducts.map(({ id, title, thumbnail }) => (
            <Tile title={title} thumbnail={thumbnail} key={id} />
          ))
        ) : (
          <p>No product found.</p>
        )}
      </div>
    </>
  );
}
