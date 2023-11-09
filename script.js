// Defining Lists
let todo_list = document.getElementById('todo-list')

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
        comment.innerText = 'Unfinished'

        // Create checkbox
        let checkbox_div = document.createElement('div');
        checkbox_div.className = 'check';
        let task_checkbox = document.createElement('input');
        task_checkbox.type = 'checkbox';
        task_checkbox.className = 'checkbox';
        checkbox_div.appendChild(task_checkbox)

        // Set task finished when clicked on checkbox
        task_checkbox.addEventListener('change', function() {
            if (task_checkbox.checked) {
                comment.innerText = 'Completed';

            } 
            else {
                comment.innerText = 'Uncompleted';
            }
        });

        // Create edit button
        let edit_btn = document.createElement('button')
        edit_btn.innerHTML = '&#128394;'

        //Edit task function
        edit_btn.addEventListener('click', function() {
            let edit_task = prompt("Edit Task: ", task.innerText)
            let edit_date = prompt("Edit Date: ", date.innerText)
            if(edit_task !== null) {
                task.innerText = edit_task
            }
            if(edit_date !== null) {
                date.innerText = edit_date
            }
        })

        // Create delete button
        let delete_btn = document.createElement('button')
        delete_btn.innerHTML = '&#10005;'

        // Delete task function
        delete_btn.addEventListener('click', function() {
            task_div.remove()
        })

        // Set task active when clicking on it
        task.addEventListener('click', function() {
            
            new_li.classList.toggle('clicked');

            if(comment.innerText === 'Active') {
                comment.innerText = 'Inactive'
            }
            else {
                comment.innerText = 'Active'
            }
        })
        
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
    }
}

// Add an event listener for change event on the filter select
let filterSelect = document.getElementById('filter');
filterSelect.addEventListener('change', function() {
    let selectedFilter = filterSelect.value;
    let task_divs = document.getElementsByClassName('task-div');

    for (let i = 0; i < task_divs.length; i++) {
        let task_div = task_divs[i];
        let comment = task_div.getElementsByClassName('comment')[0].innerText;

        if (selectedFilter === 'all-tasks') {
            task_div.style.visibility = 'visible';
        } else if (selectedFilter === 'active-tasks') {
            if (comment === 'Active') {
                task_div.style.visibility = 'visible';
            } else {
                task_div.style.visibility = 'hidden';
            }
        } else if (selectedFilter === 'completed-tasks') {
            if (comment === 'Finished') {
                task_div.style.visibility = 'visible';
            } else {
                task_div.style.visibility = 'hidden';
            }
        }
    }
});