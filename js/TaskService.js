function TaskService() {
    this.getTaskListService = function() {
        return axios({
            url: "https://5f826f4006957200164334fd.mockapi.io/api/TASK",
            method: "GET",
        })
    }
    this.deleteTaskService = function(id) {
        return axios({
            url: `https://5f826f4006957200164334fd.mockapi.io/api/TASK/${id}`,
            method: "DELETE"
        });
    }
    this.addTaskService = function(task) {
        return axios({
            url: "https://5f826f4006957200164334fd.mockapi.io/api/TASK",
            method: "POST",
            data: task,
        })
    }
    this.getTaskByIdService = function(id) {
        return axios({
            url: `https://5f826f4006957200164334fd.mockapi.io/api/TASK/${id}`,
            method: "GET",
        });
    }
    this.updateTaskService = function(task) {
        return axios({
            url: `https://5f826f4006957200164334fd.mockapi.io/api/TASK/${task.id}`,
            method: "PUT",
            data: task,
        });
    }
}