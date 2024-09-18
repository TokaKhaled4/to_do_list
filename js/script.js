const form = document.querySelector("form");
const list = document.getElementById('to_do_list');
const to_do_input = document.getElementById('todoinput');

let todos = gettodos();
update();

form.addEventListener('submit', function(e) {
    e.preventDefault();
    add_to_do();
});

function add_to_do() {
    const text = to_do_input.value.trim();
    if (text.length > 0) {
        todos.push(text);
        update();
        save();
        to_do_input.value = "";
        alert("Todo added successfully!"); // Alert on add
    }
}

function update() {
    list.innerHTML = ""; 
    todos.forEach((todo, index) => {
        const todoItem = create_item(todo, index);
        list.append(todoItem);
    });
}

function create_item(todo, index) { 
    const todoid = "todo-" + index;
    const todoLi = document.createElement("li");
    todoLi.className = "todo";
    todoLi.innerHTML = `
        <input type="checkbox" id="${todoid}">
        <label class="custom_check" for="${todoid}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>
        </label>
        <label for="${todoid}" class="todo_text">
            ${todo}
        </label>
        <button class="edit">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
            </svg>
        </button>
        <button class="delete">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        </button>
    `;

    const deleteButton = todoLi.querySelector(".delete");
    deleteButton.addEventListener('click', () => {
        if (confirm("Are you sure you want to delete this todo?")) {
            delete_item(index);
            alert("Todo deleted successfully!"); // Alert on delete
        }
    });

    const editButton = todoLi.querySelector(".edit");
    editButton.addEventListener('click', () => {
        edit_item(index, todoLi);
    });

    return todoLi;
}

function edit_item(index, todoLi) {
    const todoTextLabel = todoLi.querySelector('.todo_text');
    const currentText = todoTextLabel.textContent;

    // Replace text with input field
    todoTextLabel.innerHTML = `
        <input type="text" class="edit_input" value="${currentText}">
        <button class="save_edit">Save</button>
    `;
    
    const editInput = todoTextLabel.querySelector('.edit_input');
    const saveButton = todoTextLabel.querySelector('.save_edit');

    saveButton.addEventListener('click', () => {
        const newText = editInput.value.trim();
        if (newText.length > 0) {
            todos[index] = newText;
            update();
            save();
            alert("Todo edited successfully!"); // Alert on edit
        }
    });
}

function delete_item(index) {
    todos = todos.filter((_, i) => i !== index);
    save();
    update();
}

function save() {
    const todoJson = JSON.stringify(todos);
    localStorage.setItem("list_items", todoJson);
    console.log("Data saved:", todoJson);
}

function gettodos() {
    const todos = localStorage.getItem("list_items") || "[]";
    console.log("Data retrieved:", todos);
    return JSON.parse(todos);
}

