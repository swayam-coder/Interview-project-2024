export const appendSearchParams = (search, key, value) => {
  const params = new URLSearchParams(search);

  if (value) {
    params.set(key, value);
  } else {
    if (params.has(key)) {
      params.delete(key);
    }
  }

  return params;
};
