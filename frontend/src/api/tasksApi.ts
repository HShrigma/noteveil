const BASE_URL = "http://localhost:4000/api/tasks";

export const fetchTasks = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export async function deleteTaskList(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) throw new Error("Failed to delete taskList");

  return await res.json();
}

export async function deleteTask(id: number, taskId: number) {
  const res = await fetch(`${BASE_URL}/${id}/${taskId}`, {
    method: "DELETE"
  });

  if (!res.ok) throw new Error("Failed to delete task");

  return await res.json();
}


export async function addList(id: number, title: string) {
  const res = await fetch(`${BASE_URL}/list`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ listId: id, title: title })
  })

  if (!res.ok) throw new Error("Failed to add new taskList");

  return await res.json();
}

export async function addTask(id: number, taskId: number, label: string) {
  const res = await fetch(`${BASE_URL}/task`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ 
      listId: id,
      taskId: taskId,
      label: label
    })
  })

  if (!res.ok) throw new Error("Failed to add new task");

  return await res.json();
}