var newTodoInput = document.querySelector("#newTodo");
        var addBtn = document.querySelector("#addTodo");
        var todoList = document.querySelector("#todoList");
        var taskCount = document.querySelector("#taskCount");
        var clearBtn = document.querySelector("#clearTask");

        var todoData = [];

        // 監聽事件
        addBtn.addEventListener('click',addTodo); //新增代辦事項的點擊事件
        newTodoInput.addEventListener('keypress',addTodo); //新增代辦事項的鍵盤事件
        clearBtn.addEventListener('click',clearAllTask);
        todoList.addEventListener('click',todoListRemove);
        todoList.addEventListener('click',todoListComplete);

        
    //監聽function區 
        // 新增代辦事項
        function addTodo(e) {
            var newTodoVal = newTodoInput.value;
            // console.log(e);
            if(e.keyCode == 13 || e.type === 'click'){
                if (newTodoVal.trim() !== '') {
                todoData.push({
                    id: Math.floor(Date.now()),
                    title: newTodoVal,
                    completed: false,
                })
                // console.log(todoData);
                renderPage(todoData);  // 印出輸入事項          
                newTodoInput.value = ''; //當點擊新增事項時 清空input的值
                }
            }
            
        };

        // 刪除所有代辦事項
        function clearAllTask(e) {
            e.preventDefault();
            todoData = [];
            // console.log(todoData);
            renderPage(todoData); 
        };

        //刪除單筆代辦事項
        function todoListRemove(e) {
            var newIndex = 0;
            if (e.target.dataset.action == 'remove') {
                todoData.forEach(function (item, key) {
                if (e.target.dataset.id == item.id) {
                        newIndex = key;
                    }
                })
                todoData.splice(newIndex, 1);
                renderPage(todoData);

            }
        };
        
        //完成代辦事項
        function todoListComplete(e) {
            if (e.target.dataset.action == 'complete') {
                todoData.forEach(function (item) {
                    if (e.target.dataset.id == item.id) {
                        if (item.completed) {
                            item.completed = false;
                        } else {
                            item.completed = true;
                        }
                    }
                })
                renderPage(todoData);
            }
        };

        //重複區塊(畫面呈現)
        function renderPage (item) { 
            var str = '';
            todoData.forEach(function (item) {
                str += `<li class="list-group-item">
                <div class="d-flex">
                <div class="form-check">
                <input type="checkbox" class="form-check-input" ${item.completed ? 'checked' : ''} data-action="complete" data-id="${item.id}">
                <label class="form-check-label ${item.completed ? 'completed' : ''}" data-action="complete" data-id="${item.id}"> ${item.title}</label>
                </div>
                <button type="button" class="close ml-auto" aria-label="Close">
                <span aria-hidden="true" data-action="remove" data-id="${item.id}">&times;</span>
                </button>
                </div>
                </li>`;
            });
            todoList.innerHTML = str;
            taskCount.textContent = item.length;
        }