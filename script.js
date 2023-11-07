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

        // Create Buttons container
        let btn_container = document.createElement('span')
        btn_container.className = 'btn-container'

        // Create edit button
        let edit_btn = document.createElement('button')
        edit_btn.innerHTML = '&#128394;'
        edit_btn.className = 'task_btn'

        //Edit task function
        edit_btn.addEventListener('click', function() {
            let edit_task = prompt("Edit Task: ", new_li.innerText)
            if(edit_task !== null) {
                new_li.innerText = edit_task
                btn_container.appendChild(edit_btn)
                btn_container.appendChild(delete_btn)

                todo_list.appendChild(new_li)
                todo_list.append(btn_container)
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

        btn_container.appendChild(edit_btn)
        btn_container.appendChild(delete_btn)

        todo_list.appendChild(new_li)
        todo_list.append(btn_container)

        new_task.value = ''
    }
}
