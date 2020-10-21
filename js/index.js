// You Need to implement

//渲染整个页面
function renderPage() {
  showStatisticsCards();
  showAllTasks();
}

// 显示所有任务
function showAllTasks(sortKey = "createDate", sortValue = 1) {
  sortTasks(sortKey, sortValue);
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

//显示任务统计栏数据
function showStatisticsCards() {
  let allTaskCount = document.getElementById("allTaskCount");
  let activeTaskCount = document.getElementById("activeTaskCount");
  let pendingTaskCount = document.getElementById("pendingTaskCount");
  let closedTaskCount = document.getElementById("closedTaskCount");

  let activeTaskProp = document.getElementById("activeTaskProportion");
  let pendingTaskProp = document.getElementById("pendingTaskProportion");
  let closedTaskProp = document.getElementById("closedTaskProportion");

  let allTasks = getAllTasks();
  allTaskCount.textContent = allTasks.length;
  countTasks(activeTaskCount, "Active", activeTaskProp);
  countTasks(pendingTaskCount, "Pending", pendingTaskProp);
  countTasks(closedTaskCount, "Closed", closedTaskProp);
}

//统计任务数据
function countTasks(countDom, status, propDom) {
  countDom.textContent = 0;
  let allTasks = getAllTasks();
  allTasks.forEach((task) => {
    if (task.status === status) {
      countDom.textContent++;
    }
  });

  if (allTasks.length === 0) {
    propDom.textContent = "0%";
  } else {
    //0.14*100 精度问题
    propDom.textContent =
      Math.floor(
        parseFloat((countDom.textContent / allTasks.length).toFixed(2)) * 100
      ) + "%";
  }
}

//根据状态检索任务，写在html中
function filterTaskByStatus(status) {
  if (status === "all") {
    showAllTasks();
  } else {
    tasks = findTasksByStatus(status);
    createTaskBody(tasks);
  }
}

//根据任务名检索任务，点击搜索按钮搜索任务，写在html中
function filterTaskByName() {
  let searchInput = document.getElementById("searchInput");
  if (searchInput.value) {
    let taskName = searchInput.value;
    let tasks = findTasksByName(taskName);
    createTaskBody(tasks);
  } else {
    showAllTasks();
  }
}

//搜按回车搜索任务
function searchTasks(event) {
  // let searchInput = document.getElementById("searchInput");
  if (event.keyCode === 13) {
    // console.log("test");
    filterTaskByName();
  }
}

//根据任务名称排序
function sortTasks(sortKey, sortValue) {
  console.log("test");
  let tasks = getAllTasks();
  // let newTasks = [...allTasks];
  tasks.sort((taskA, taskB) => {
    if (taskA[sortKey] < taskB[sortKey]) {
      return -sortValue;
    }
    if (taskA[sortKey] > taskB[sortKey]) {
      return sortValue;
    }
    return 0;
  });

  let newTasks = tasks.map((task, index) => {
    task.id = index + 1;
    return task;
  });
  saveAllTasks(newTasks);
}

//test fixing bugs
window.onload = function () {
  if (!getAllTasks()) {
    saveAllTasks([]);
  }
  renderPage();
};
