let add_btn = document.getElementById('add-task')
add_btn.addEventListener('click', add_task)

let todo_list = document.getElementById('todo-list')

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

        // Create delete button
        let delete_btn = document.createElement('button')
        delete_btn.innerHTML = '&#10005;'
        delete_btn.setAttribute('class', 'delete-task')

        // Delete task function
        delete_btn.addEventListener('click', function() {
            new_li.remove()
        })

        new_li.appendChild(delete_btn)
        todo_list.appendChild(new_li)

        new_task.value = ''
    }
}
