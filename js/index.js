// You Need to implement

//渲染整个页面
function renderPage() {
  //showStatisticsCards();
  showAllTasks();
}

// 显示所有任务
function showAllTasks(sortKey = "createDate", sortValue = -1) {
  //sortTasks(sortKey, sortValue);
  let allTasks = getAllTasks();
  createTaskBody(allTasks);
}

//创建任务列表
function createTaskBody(tasks) {
  let taskBody = document.getElementById("taskBody");
  taskBody.innerHTML = "";
  tasks.forEach((task) => {
    let taskRow = document.createElement("tr");
    taskRow.classList.add("task-row");

    let taskNumCol = document.createElement("td");
    taskNumCol.classList.add("task-num-col");
    taskNumCol.textContent = task.id;
    taskRow.appendChild(taskNumCol);

    let taskNameCol = document.createElement("td");
    taskNameCol.classList.add("task-name-col");
    taskNameCol.textContent = task.name;
    taskRow.appendChild(taskNameCol);

    let taskDescCol = document.createElement("td");
    taskDescCol.classList.add("task-desc-col");
    taskDescCol.textContent = task.description;
    taskRow.appendChild(taskDescCol);

    let taskDeadlineCol = document.createElement("td");
    taskDeadlineCol.classList.add("task-deadline-col");
    taskDeadlineCol.textContent = task.deadline;
    taskRow.appendChild(taskDeadlineCol);

    let taskStatusCol = document.createElement("td");
    taskStatusCol.classList.add("task-status-col");
    taskStatusCol.classList.add(task.status.toLowerCase());
    taskStatusCol.textContent = task.status;
    taskRow.appendChild(taskStatusCol);

    let taskOperationCol = document.createElement("td");
    taskOperationCol.classList.add("task-operation-col");
    //删除按钮
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn-icon");
    deleteBtn.setAttribute(
      "onclick",
      "createDeleteTaskPopover(" + task.id + ")"
    );
    let deleteImg = document.createElement("img");
    deleteImg.setAttribute("src", "images/delete.svg");
    deleteImg.setAttribute("alt", "delete");
    deleteBtn.appendChild(deleteImg);
    taskOperationCol.appendChild(deleteBtn);

    //更新按钮
    let updateBtn = document.createElement("button");
    updateBtn.classList.add("btn");
    updateBtn.classList.add("btn-icon");
    updateBtn.setAttribute(
      "onclick",
      "createUpdateTaskPopover(" + task.id + ")"
    );
    let updateImg = document.createElement("img");
    updateImg.setAttribute("src", "images/update.svg");
    updateImg.setAttribute("alt", "update");
    updateBtn.appendChild(updateImg);
    taskOperationCol.appendChild(updateBtn);

    taskRow.appendChild(taskOperationCol);
    taskBody.appendChild(taskRow);
  });
}

window.onload = function () {
  renderPage();
};
