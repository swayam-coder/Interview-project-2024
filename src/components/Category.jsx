import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../reducers/category-slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { appendSearchParams } from '../util';

function CategoryCard(props) {
  const { name, slug, setSelectedCategory, selectedCategory } = props;
  return (
    <div key={name} className="category-card">
      <input
        type="radio"
        checked={slug === selectedCategory}
        value={slug}
        id={name}
        onChange={(e) => setSelectedCategory(e.target.value)}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
}

export default function Category() {
  const { categories, isError, isLoading } = useSelector(
    (state) => state.categories
  );

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedCategory = new URLSearchParams(location.search).get('category');

  const appendQueryParam = (key, value) => {
    const params = appendSearchParams(location.search, key, value);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const retry = () => dispatch(fetchCategories());

  const setSelectedCategoryHandler = (value) =>
    appendQueryParam('category', value);

  if (isError) {
    return (
      <p>
        Failed to fetch categories
        <span style={{ color: 'blue' }} onClick={retry}>
          Retry?
        </span>
      </p>
    );
  }

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  return (
    <>
      {categories.map((cat) => (
        <CategoryCard
          key={cat['slug']}
          name={cat['name']}
          slug={cat['slug']}
          setSelectedCategory={setSelectedCategoryHandler}
          selectedCategory={selectedCategory}
        />
      ))}
    </>
  );
}
