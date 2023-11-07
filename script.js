// Defining Lists
let todo_list = document.getElementById('todo-list')
let doing_list = document.getElementById('doing-list')

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
        new_li.innerText = new_task.value

        // Create task div
        let task_div = document.createElement('div')
        task_div.className = 'task-div'

        // Create checkbox
        let task_checkbox = document.createElement('input');
        task_checkbox.type = 'checkbox';
        task_checkbox.setAttribute('class', 'task-checkbox');

        // Create add button
        let add_btn = document.getElementById('add-task')
        add_btn.addEventListener('click', add_task)

        // Create edit button
        let edit_btn = document.createElement('button')
        edit_btn.innerHTML = '&#128394;'
        edit_btn.setAttribute('class', 'task_btn')

        //Edit task function
        edit_btn.addEventListener('click', function() {
            let edit_task = prompt("Edit Task: ", new_li.innerText)
            if(edit_task !== null) {
                new_li.innerText = edit_task

                task_div.appendChild(edit_btn)
                task_div.appendChild(delete_btn)
                todo_list.appendChild(task_div)
            }
        })

        // Create delete button
        let delete_btn = document.createElement('button')
        delete_btn.innerHTML = '&#10005;'
        delete_btn.setAttribute('class', 'task_btn')

        // Delete task function
        delete_btn.addEventListener('click', function() {
            new_li.remove()
        })

        task_div.appendChild(task_checkbox)
        task_div.appendChild(new_li)
        task_div.appendChild(edit_btn)
        task_div.appendChild(delete_btn)

        new_li.addEventListener('click', function() {
            doing_list.appendChild(new_li)
        })
        
        todo_list.appendChild(task_div)

        new_task.value = ''
    }
}