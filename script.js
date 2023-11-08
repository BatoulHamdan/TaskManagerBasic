// Defining Lists
let todo_list = document.getElementById('todo-list')

// Defining Add button
let add_btn = document.getElementById('add-task');
add_btn.addEventListener('click', add_task);

function add_task() {
    let new_task = document.getElementsByName('new-task')[0]

    // Check is added task is empty
    if(new_task.value.length === 0) {
        // Send an alert of empty input
        alert("We can't add an empty task!")
    }

    else {
        // Add new task to the todo list
        let new_li = document.createElement('li')

        // Create task div
        let task_div = document.createElement('div')
        task_div.className = 'task-div'

        // Create task container div
        let task = document.createElement('div')
        task.className = 'task'
        task.innerText = new_task.value

        // Create checkbox
        let task_checkbox = document.createElement('input');
        task_checkbox.type = 'checkbox';
        task_checkbox.setAttribute('class', 'task-checkbox');

        // Create edit button
        let edit_btn = document.createElement('button')
        edit_btn.innerHTML = '&#128394;'

        //Edit task function
        edit_btn.addEventListener('click', function() {
            let edit_task = prompt("Edit Task: ", task.innerText)
            if(edit_task !== null) {
                task.innerText = edit_task
            }
        })

        // Create delete button
        let delete_btn = document.createElement('button')
        delete_btn.innerHTML = '&#10005;'

        // Delete task function
        delete_btn.addEventListener('click', function() {
            task_div.remove()
        })

        task_div.appendChild(task_checkbox)
        task_div.appendChild(task)
        task_div.appendChild(edit_btn)
        task_div.appendChild(delete_btn)
        
        new_li.appendChild(task_div)
        todo_list.appendChild(new_li)

        new_task.value = ''
    }
}