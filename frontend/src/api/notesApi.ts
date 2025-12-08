const API_URL = "http://localhost:4000/api/notes";

export const fetchNotes = async () => {
  const res = await fetch(API_URL);
  return res.json();
};