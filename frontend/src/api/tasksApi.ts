const BASE_URL = "http://localhost:4000/api/tasks";

export const fetchTasks = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export async function deleteTaskList(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`,{
    method:"DELETE"
  });

  if(!res.ok){
    throw new Error("Falied to delete taskList");
  }

  return await res.json();
}