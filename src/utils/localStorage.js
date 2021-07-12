export const storage = {
  getItem: (key) => JSON.parse(localStorage.getItem(key)),
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }
}