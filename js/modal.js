//不单独使用
//显示弹出框
function showModalPopover() {
  let modal = document.getElementById("modal");
  modal.classList.add("modal-flex-center");
}

//隐藏弹出框
function hideModalPopover() {
  let modal = document.getElementById("modal");
  modal.classList.remove("modal-flex-center");
}

//设置新任务弹出框
function createAddTaskPopover() {
  const icon = "./images/modal_add_icon.svg";
  const title = "A New Task";
  createModalPopover(icon, title, "createTask()"); //没有传入task参数，所以不显示状态选择栏
  showModalPopover();
}

//设置弹出框架构内容
function createModalPopover(icon, title, okBtnClickEvent, task) {
  createPopoverHeaderAndFooter(icon, title, okBtnClickEvent);
  createPopoverContent(task);
}

//设置弹出框头部和尾部内容
function createPopoverHeaderAndFooter(icon, title, okBtnClickEvent) {
  let modalIcon = document.getElementById("modalIcon");
  modalIcon.setAttribute("src", icon);
  let modalTitle = document.getElementById("modalTitle");
  modalTitle.textContent = title;
  let okBtn = document.getElementById("modalBtnOk");
  okBtn.setAttribute("onclick", okBtnClickEvent);
}

//新建任务
function createTask() {
  let taskName = document.getElementById("taskName");
  let deadline = document.getElementById("taskDeadline");
  let desc = document.getElementById("taskDesc");

  //如果输入为空，输入框变红, 函数直接返回
  if (requiredCheck([taskName, deadline, desc])) {
    return;
  }

  //若不为空则关闭弹出框，新增任务行
  let allTask = getAllTasks(); //复制已有任务
  //test fixing bugs
  const maxId = !allTask
    ? (maxId = 0)
    : allTask.reduce((preId, task) => (preId > task.id ? preId : task.id), 0);

  let task = {
    id: maxId + 1,
    name: taskName.value,
    deadline: deadline.value,
    description: desc.value,
    status: "Active",
    createDate: new Date().getTime(),
  };

  allTask.push(task); //形成新的任务列表
  saveAllTasks(allTask); //告诉localstorage
  renderPage();
  hideModalPopover();
}

//判断输入框是否为空
function requiredCheck(elements) {
  let result = false;

  elements.forEach((element) => {
    if (!element.value || element.value.trim() === "") {
      // element.classList.add("invalid-input");
      element.style["border-color"] = "red";
      result = true;
    }
  });
  return result;
}

//填充弹出框的主体内容
function createPopoverContent(task) {
  let container = document.createElement("p");
  container.classList.add("text-container");

  let nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "taskName");
  nameLabel.textContent = "Name";
  container.appendChild(nameLabel);

  let nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("id", "taskName");
  nameInput.setAttribute("placeholder", "Going to Norway");
  nameInput.value = task ? task.name : "";
  container.appendChild(nameInput);

  let deadlineLabel = document.createElement("label");
  deadlineLabel.setAttribute("for", "taskDeadline");
  deadlineLabel.textContent = "Deadline";
  container.appendChild(deadlineLabel);

  let deadlineInput = document.createElement("input");
  deadlineInput.setAttribute("type", "text");
  deadlineInput.setAttribute("id", "taskDeadline");
  deadlineInput.setAttribute("placeholder", "2020-10-15");
  deadlineInput.value = task ? task.deadline : "";
  container.appendChild(deadlineInput);

  //如果task已经存在，就展示状态栏
  if (task) {
    let statusLabel = document.createElement("label");
    statusLabel.textContent = "Status";
    container.appendChild(statusLabel);

    let statusContainer = document.createElement("div");
    statusContainer.classList.add("status-container");
    container.appendChild(statusContainer);

    let activeInput = document.createElement("input");
    activeInput.setAttribute("type", "radio");
    activeInput.setAttribute("id", "active");
    activeInput.setAttribute("name", "Status");
    activeInput.setAttribute("value", "Active");
    // activeInput.checked = task.status === "Active";
    statusContainer.appendChild(activeInput);
    let activeLable = document.createElement("label");
    activeLable.textContent = "Active";
    activeLable.setAttribute("for", "active");
    statusContainer.appendChild(activeLable);

    let pendingInput = document.createElement("input");
    pendingInput.setAttribute("type", "radio");
    pendingInput.setAttribute("id", "pending");
    pendingInput.setAttribute("name", "Status");
    pendingInput.setAttribute("value", "Pending");
    // pendingInput.checked = task.status === "Pending";
    statusContainer.appendChild(pendingInput);
    let pendingLable = document.createElement("label");
    pendingLable.textContent = "Pending";
    pendingLable.setAttribute("for", "pending");
    statusContainer.appendChild(pendingLable);

    let closedInput = document.createElement("input");
    closedInput.setAttribute("type", "radio");
    closedInput.setAttribute("id", "closed");
    closedInput.setAttribute("name", "Status");
    closedInput.setAttribute("value", "Closed");
    //  closedInput.checked = task.status === "Closed";
    statusContainer.appendChild(closedInput);
    let closedLable = document.createElement("label");
    closedLable.textContent = "Closed";
    closedLable.setAttribute("for", "closed");
    statusContainer.appendChild(closedLable);

    if (task.status === "Active") {
      activeInput.setAttribute("checked", "");
    }

    if (task.status === "Pending") {
      pendingInput.setAttribute("checked", "");
    }

    if (task.status === "Closed") {
      closedInput.setAttribute("checked", "");
    }
  }

  let descLabel = document.createElement("label");
  descLabel.setAttribute("for", "taskDesc");
  descLabel.textContent = "Description";
  container.appendChild(descLabel);
  let descTextarea = document.createElement("textarea");
  descTextarea.setAttribute("id", "taskDesc");
  descTextarea.setAttribute("rows", "5");
  descTextarea.setAttribute("maxlength", "200");
  descTextarea.setAttribute(
    "placeholder",
    "Please enter task description, maximum 200 characters"
  );
  descTextarea.value = task ? task.description : "";
  container.appendChild(descTextarea);

  let modalContainer = document.getElementById("modalContainer");
  modalContainer.innerHTML = "";
  modalContainer.appendChild(container);
}

//创建更新任务弹出框
function createUpdateTaskPopover(id) {
  const icon = "./images/update.svg";
  const title = "Update Task";
  const okBtnClickEvent = "updateTask(" + id + ")";
  let task = findTask(id);
  createModalPopover(icon, title, okBtnClickEvent, task); //传入了task参数，显示状态选择栏
  showModalPopover();
}

//更新任务
function updateTask(id) {
  let taskName = document.getElementById("taskName");
  let deadline = document.getElementById("taskDeadline");
  let desc = document.getElementById("taskDesc");
  if (requiredCheck([taskName, deadline, desc])) {
    return;
  }
  let statusDoms = document.getElementsByName("Status");
  let status = Array.from(statusDoms).find((status) => status.checked).value;
  let tasks = getAllTasks().map((task) => {
    if (task.id === id) {
      task.name = taskName.value;
      task.deadline = deadline.value;
      task.description = desc.value;
      task.status = status;
    }
    return task;
  });
  saveAllTasks(tasks);
  renderPage();
  hideModalPopover();
}

//删除任务
function deleteTask(id) {
  removeTask(id);
  renderPage();
  hideModalPopover();
}

//删除任务弹出框
function createDeleteTaskPopover(id) {
  const icon = "./images/modal_delete_icon.svg";
  const title = "Delete This Task Wohoo";
  const okBtnClickEvent = "deleteTask(" + id + ")";
  createPopoverHeaderAndFooter(icon, title, okBtnClickEvent);
  let p = document.createElement("p");
  let taskName = findTask(id).name;
  p.textContent = 'Do you confirm to delete task: "' + taskName + '" ?';
  let modalContainer = document.getElementById("modalContainer");
  modalContainer.innerHTML = "";
  modalContainer.appendChild(p);
  //不是alert，还是modal，不过只显示这句话，不显示名字、描述等等
  showModalPopover();
}
