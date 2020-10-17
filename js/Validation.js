function Validation() {
    this.kiemTraRong = function(input, mess) {
        if (input === "") {
            alert(mess);
            return false;
        }
        return true;
    }
    this.kiemTraTrungTask = function(input, mess, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].textTodo === input) {
                alert(mess);
                return false;
            }
        }
        return true;
    }
}