const Storage = {
  saveData: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  },
  getData: (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }
};
