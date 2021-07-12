export const storage = {
  getItem: (key) => {
    const defaultData = []
    try {
      const data = localStorage.getItem(key)
      return (data) ? JSON.parse(data) : defaultData
    } catch(err) {
      console.eror(err)
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch(err) {
      alert('메모리가 부족합니다.')
    }
  }
}