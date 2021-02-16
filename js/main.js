var taskService = new TaskService();
var validation = new Validation();
getTaskList();
var a = [];

function getTaskList() {
  isLoading = true;
  checkLoading(true);
  taskService
    .getTaskListService()
    .then(function (rs) {
      checkLoading(false);
      displayTask(rs.data);
    })
    .catch(function (err) {
      checkLoading(false);
    });
}
// Display task
function displayTask(arr) {
  var contentToDo = "";
  var contentCompleted = "";
  arr.forEach(function (item) {
    if (item.status === "todo") {
      contentToDo = taoBang(contentToDo, item.textTodo, item.id);
    } else {
      contentCompleted = taoBang(contentCompleted, item.textTodo, item.id);
    }
  });
  getEle("todo").innerHTML = contentToDo;
  getEle("completed").innerHTML = contentCompleted;
}

function taoBang(content, textTodo, id) {
  content += `
                    <li>
                        <span>${textTodo}</span>
                        <div class="buttons">
                            <button class="remove" onclick="deleteToDo(${id})">
                                <i class="fa fa-trash-alt"></i>
                            </button>
                            <button class="complete" onclick="changeStatus(${id})">
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-check-circle"></i>
                            </button>
                        </div>
                    </li>
                 `;
  return content;
}
// Delete Task
function deleteToDo(id) {
  checkLoading(true);
  taskService
    .deleteTaskService(id)
    .then(function (rs) {
      checkLoading(false);
      getTaskList();
      alert("!Deleted Task");
    })
    .catch(function (err) {
      console.log(err);
      checkLoading(false);
    });
}

//Event click btn add
getEle("addItem").addEventListener("click", function () {
  // Lấy giá trị task
  var textTodo = getEle("newTask").value;
  //Tạo newTask
  var newTask = new Task();
  // Check rỗng
  var flagStatus = true;
  checkLoading(true);
  flagStatus &= validation.kiemTraRong(textTodo, "Task empty!");
  taskService
    .getTaskListService()
    .then(function (rs) {
      flagStatus &= validation.kiemTraTrungTask(
        textTodo,
        "Trùng Task",
        rs.data
      );
      if (flagStatus) {
        newTask = new Task("", textTodo, "todo");
        taskService
          .addTaskService(newTask)
          .then(function (rs) {
            checkLoading(false);
            getTaskList();
            alert("!Add Task success");
          })
          .catch(function (err) {
            console.log(err);
            checkLoading(false);
          });
      } else {
        checkLoading(false);
      }
    })
    .catch(function (err) {
      console.log(err);
      checkLoading(false);
    });
});

// Upadte task
function changeStatus(id) {
  checkLoading(true);
  taskService
    .getTaskByIdService(id)
    .then(function (rs) {
      if (rs.data.status === "todo") {
        rs.data.status = "completed";
      } else {
        rs.data.status = "todo";
      }
      taskService
        .updateTaskService(rs.data)
        .then(function (rs) {
          checkLoading(false);
          getTaskList();
          alert("!Update Task success");
        })
        .catch(function (err) {
          checkLoading(false);
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
}
// checkLoading
function checkLoading(flag) {
  if (flag) {
    document.getElementsByClassName("loader")[0].style.display = "block";
  } else {
    document.getElementsByClassName("loader")[0].style.display = "none";
  }
}

function getEle(id) {
  return document.getElementById(id);
}
