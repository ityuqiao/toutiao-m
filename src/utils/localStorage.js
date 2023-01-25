export const setItem = (key, value) => {
  if (typeof value === "object" || typeof value === "array") {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
};

export const getItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return localStorage.getItem(key);
  }
};

export const removeItem = (key) => {
    localStorage.removeItem(key)
}
