// Defining Lists
let todo_list = document.getElementById('todo-list')
let doing_list = document.getElementById('doing-list')

// Defining Add button
let add_btn = document.getElementById('add-task');
add_btn.addEventListener('click', add_task);

function add_task() {
    let new_task = document.getElementsByName('new-task')[0]
    let due_date = document.getElementsByName('due-date')[0]

    // Check is added task is empty
    if(new_task.value.length === 0) {
        // Send an alert of empty input
        alert("We can't add an empty task!")
    }

    else {
        // Add new task to the todo list
        let new_li = document.createElement('li')
        new_li.className = 'task-li'

        // Create task div
        let task_div = document.createElement('div')
        task_div.className = 'task-div'
        task_div.draggable = true

        // Create task container div
        let task = document.createElement('div')
        task.className = 'task'
        task.innerText = new_task.value

        // Create date div
        let date = document.createElement('div')
        date.className = 'date'
        date.innerText = due_date.value

        // Create comment div
        let comment = document.createElement('div')
        comment.className = 'comment'
        comment.innerText = 'Uncompleted'

        // Create checkbox
        let checkbox_div = document.createElement('div')
        checkbox_div.className = 'check'
        let task_checkbox = document.createElement('input')
        task_checkbox.type = 'checkbox'
        task_checkbox.className = 'checkbox'
        checkbox_div.appendChild(task_checkbox)

        // Set task finished when clicked on checkbox
        task_checkbox.addEventListener('change', function() {
            if (task_checkbox.checked) {
                comment.innerText = 'Completed'
                let doing_tasks = document.querySelectorAll('.doing-task')
                doing_tasks.forEach((doing_task) => {
                    if (doing_task.innerText === task.innerText) {
                        doing_task.parentElement.parentElement.remove()
                    }
                })
            } 
            else {
                comment.innerText = 'Uncompleted'
            }
        })

        // Create edit button
        let edit_btn = document.createElement('button')
        edit_btn.innerHTML = '&#128394;'

        // Edit task function
        edit_btn.addEventListener('click', function() {
            let edit_task = prompt("Edit Task: ", task.innerText)
            let edit_date = prompt("Edit Date: ", date.innerText)
            if (edit_task !== null) {
                // Updating it in doing list first
                let doing_tasks = document.querySelectorAll('.doing-task')
                doing_tasks.forEach((doing_task) => {
                    if (doing_task.innerText === task.innerText) {
                        doing_task.innerText = edit_task
                    }
                })
                task.innerText = edit_task
            }
            if (edit_date !== null) {
                date.innerText = edit_date
            }
        });

        // Create delete button
        let delete_btn = document.createElement('button')
        delete_btn.innerHTML = '&#10005;'

        // Delete task function
        delete_btn.addEventListener('click', function() {
            new_li.remove()
            // Removing it from doing list
            let doing_tasks = document.querySelectorAll('.doing-task');
            doing_tasks.forEach((doing_task) => {
                if (doing_task.innerText === task.innerText) {
                    doing_task.parentElement.parentElement.remove();
                }
            });
        })

        // Set task active when clicking on it
        task.addEventListener('click', function() {
            if (task_checkbox.checked === false) {
                if (comment.innerText === 'Active') {
                    comment.innerText = 'Inactive'
                } 
                else {
                    comment.innerText = 'Active'

                    // Add task to doing list
                    let doing_div = document.createElement('div')
                    doing_div.className = 'doing-div'

                    let doing_checkbox_div = document.createElement('div')
                    doing_checkbox_div.className = 'check'
                    let doing_checkbox = document.createElement('input')
                    doing_checkbox.type = 'checkbox'
                    doing_checkbox_div.appendChild(doing_checkbox)

                    // Set task finished when clicked on checkbox
                    doing_checkbox.addEventListener('change', function() {
                        if (doing_checkbox.checked) {
                            comment.innerText = 'Completed'
                            task_checkbox.checked = true
                            doing_div.parentElement.remove()

                            // Find the corresponding task in the todo list and check its checkbox
                            let todo_tasks = document.querySelectorAll('.task')
                            todo_tasks.forEach((todo_task) => {
                                if (todo_task.innerText === task.innerText) {
                                    let todo_checkbox = todo_task.parentElement.querySelector('.checkbox');
                                    todo_checkbox.checked = true
                                }
                            })
                        } 
                        else {
                            comment.innerText = 'Uncompleted'
                        }
                    })

                    let doing_li = document.createElement('li')

                    let doing_task = document.createElement('div')
                    doing_task.className = 'doing-task'
                    doing_task.innerText = task.innerText

                    doing_div.appendChild(doing_checkbox_div)
                    doing_div.appendChild(doing_task)
                    doing_li.appendChild(doing_div)
                    doing_list.appendChild(doing_li)
                }
            }
        });

        task_div.appendChild(checkbox_div)
        task_div.appendChild(task)
        task_div.appendChild(date)
        task_div.appendChild(comment)
        task_div.appendChild(edit_btn)
        task_div.appendChild(delete_btn)
        
        new_li.appendChild(task_div)

        todo_list.appendChild(new_li)

        new_task.value = ''
        due_date.value = ''

        sort_by_due_date()
    }
}

// Add an event listener for change event on the filter select
let filterSelect = document.getElementById('filter');
filterSelect.addEventListener('change', function() {
    let selectedFilter = filterSelect.value;
    let task_divs = document.getElementsByClassName('task-li');

    for (let i = 0; i < task_divs.length; i++) {
        let task_div = task_divs[i]
        let comment = task_div.getElementsByClassName('comment')[0].innerText

        if (selectedFilter === 'all-tasks') {
            task_div.style.visibility = 'visible'
        } 
        else if (selectedFilter === 'active-tasks') {
            if (comment === 'Active') {
                task_div.style.visibility = 'visible'
            } 
            else {
                task_div.style.visibility = 'hidden'
            }
        } 
        else if (selectedFilter === 'completed-tasks') {
            if (comment === 'Finished') {
                task_div.style.visibility = 'visible'
            } 
            else {
                task_div.style.visibility = 'hidden'
            }
        }
    }
});

// Sorting by due date function
function sort_by_due_date() {
    let taskElements = document.querySelectorAll('.task-li')
    let tasks = []

    taskElements.forEach((taskElement) => {
        let dueDate = new Date(taskElement.querySelector('.date').innerText)
        tasks.push({ element: taskElement, dueDate: dueDate })
    })
    tasks.sort((a, b) => a.dueDate - b.dueDate)

    let taskList = document.getElementById('todo-list')

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }

    let title_li = document.createElement('li')
    title_li.innerHTML = `
        <div class="todo-title">
            <div class="check"><h4>Completed</h4></div>
            <div class="task"><h4>Task</h4></div> 
            <div class="date"><h4>Due Date</h4></div>
            <div class="comment"><h4>Comment</h4></div>
            <button></button>
            <button></button>
        </div>`
    taskList.appendChild(title_li)

    tasks.forEach((task) => {
        taskList.appendChild(task.element)
    })
}       