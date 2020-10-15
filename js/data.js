function saveAllTasks(allTasks) {
  localStorage.setItem("tasks", JSON.stringify(allTasks));
}

function getAllTasks() {
  return JSON.parse(localStorage.getItem("tasks"));
}

//为更新和删除任务而服务
function findTask(id) {
  return getAllTasks().find((task) => task.id === id);
}

//为删除任务而服务
function removeTask(id) {
  let leftTasks = getAllTasks().filter((task) => task.id !== id);
  saveAllTasks(leftTasks);
}

function findTasksByStatus(status) {
  return getAllTasks().filter((task) => task.status === status);
}

function findTasksByName(name) {
  return getAllTasks().filter((task) => task.name.includes(name));
}
