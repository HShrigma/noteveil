const BASE_URL = "http://localhost:4000/api/notes";

export const fetchNotes = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export async function deleteNote(id:number) {
  
  const res = await fetch(`${BASE_URL}/${id}`, {
    method:"DELETE"
  });

  if (!res.ok) throw new Error("Falied to delete note");
  return await res.json();
}

export async function addNote(id:number) {
  const res = await fetch(`${BASE_URL}`, {
    method:"POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({id:id})
  });
  
  if (!res.ok) throw new Error("Falied to add note");
  return await res.json();
}