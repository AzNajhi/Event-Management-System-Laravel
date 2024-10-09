function addStaff () {
    let listContainer = document.querySelector('.app-form table tbody');
    let listNumber = document.querySelectorAll('.app-form table tr').length;
    listContainer.innerHTML += `
    <tr>
        <td>
            <input class='form-control staff-input' type='text' value='' data-id='' data-index='${listNumber + 1}'>
        </td>
        <td>
            <div class='button-group'>
                <button class='btn btn-secondary save-button' data-index="${listNumber + 1}" type="button" onclick="saveStaff(this)"><i class="fa-regular fa-floppy-disk"></i></button>
            </div>
        </td>
    </tr>
    `;
}

function deleteStaff (button) {
    let staffIndex = button.getAttribute('data-index');
    let staffID = document.querySelector(`input[data-index='${staffIndex}']`).getAttribute('data-id');

    if (staffID != "") {
        let requestData = {
            'id' : staffID
        };

        fetch('request-delete-db', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.text())
        .then(view => document.querySelector('.app-form .card').innerHTML = view)
        .catch(error => console.error('Error:', error));
    }
}

function editStaff (button) {
    let staffIndex = button.getAttribute('data-index');
    let parent = button.parentElement;
    let input = document.querySelector(`input[data-index='${staffIndex}']`);
    input.disabled = false;
    parent.innerHTML = `<button class="btn btn-secondary save-button" data-index="${staffIndex}" type="button" onclick="saveStaff(this)"><i class="fa-regular fa-floppy-disk"></i></button>`
}

function saveStaff (button) {
    let staffIndex = button.getAttribute('data-index');
    let staffID = document.querySelector(`input[data-index='${staffIndex}']`).getAttribute('data-id');
    let staffName = document.querySelector(`input[data-index='${staffIndex}']`).value;

    if (staffID != "" && staffName != "") {
        let requestData = {
            'id' : staffID,
            'name' : staffName,
        };

        fetch('request-edit-db', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.text())
        .then(view => document.querySelector('.app-form .card').innerHTML = view)
        .catch((error) => console.error('Error:', error));

    } else if (staffID == "" && staffName != "" ){
        let requestData = {
            'name' : staffName
        };

        fetch('request-add-db', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.text())
        .then(view => document.querySelector('.app-form .card').innerHTML = view)
        .catch((error) => console.error('Error:', error));

    } else {
        alert("Please make sure to enter the staff name before you save!")
        return

    }
    let parent = button.parentElement;
    let input = document.querySelector(`input[data-index='${staffIndex}']`);
    input.disabled = true;
    parent.innerHTML = `
        <button class="btn btn-secondary edit-button" data-index="${staffIndex}" type="button" onclick="editStaff(this)"><i class="fa-regular fa-pen-to-square"></i></button>
        <button class="btn btn-danger delete-button" data-index="${staffIndex}" type="button" onclick="deleteStaff(this)"><i class="fas fa-trash"></i></button>
    `
}