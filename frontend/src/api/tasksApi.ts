const API_URL = "http://localhost:4000/api/tasks";

export const fetchTasks = async () => {
  const res = await fetch(API_URL);
  return res.json();
};