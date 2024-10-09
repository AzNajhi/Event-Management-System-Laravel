let nameList = [];
let unusedName = [];
let usedName = [];

function updateStaffInputs () {
    setTimeout(() => {
        document.querySelector(".process-button").disabled = true;
        document.querySelector(".process-button").removeAttribute("onclick");
        nameList = [];
        unusedName = [];
        usedName = [];

        let day = document.querySelector(".form-control[name='day']").value;
        let session = document.querySelector(".form-control[name='session']").value;
        let participant = document.querySelector(".form-control[name='participant']").value;
        let ratioStaff = document.querySelector(".form-control[name='ratio-staff']").value;
        let ratioParticipant = document.querySelector(".form-control[name='ratio-participant']").value;

        if (!day || !session || !participant || !ratioStaff || !ratioParticipant) {
            let message = `<span class="warning-message">Please ensure all inputs are filled out correctly!</span>`
            document.querySelector('.staff-input-label').innerHTML = message;
            document.querySelector('.staff-input').innerHTML = "";
            document.querySelector(".process-button").disabled = true;
            document.querySelector(".process-button").removeAttribute("onclick");
            return;
        }

        let staffPerSession = Math.ceil((ratioStaff / ratioParticipant) * participant);
        let totalStaff = staffPerSession * session * day;

        if (totalStaff == 0 || isNaN(totalStaff) || totalStaff == Infinity) {
            let message = `<span class="warning-message">Please ensure all inputs are filled out correctly!</span>`
            document.querySelector('.staff-input-label').innerHTML = message;
            document.querySelector('.staff-input').innerHTML = "";
        
        } else {
            let requestData = {
                'totalStaff' : totalStaff
            };

            fetch('update-staff-input', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: JSON.stringify(requestData)
            })
            .then(response => response.json())
            .then(responseData => {
                document.querySelector('.staff-input-label').innerHTML = responseData['message'];
                document.querySelector('.staff-input').innerHTML = responseData['view'];
                unusedName = [...responseData['nameList']]
            })
            .catch((error) => console.error('Error:', error));
        };
    }, 500);
}

function checkStaffInputs (input, event) {
    event.preventDefault();
    let inputIndex = input.getAttribute('data-index');
    let staffName = input.value;
    let found = false;

    if (usedName.length === 0) {
        usedName.push({index: inputIndex, name: staffName})
        unusedName = unusedName.filter(name => name !== staffName);

    } else if (staffName === "") {
        usedName = usedName.filter(item => {
            if (item.index === inputIndex) {
                unusedName.push(item.name);
                return false;
            }
            return true;
        });

    } else {
        usedName.forEach(input => {
            if (input.index === inputIndex) {
                found = true;
                if (input.name !== staffName) {
                    unusedName.push(input.name);
                    input.name = staffName;
                    unusedName = unusedName.filter(name => name !== staffName);
                }
            }
        });

        if (!found) {
            usedName.push({index: inputIndex, name: staffName})
            unusedName = unusedName.filter(name => name !== staffName);
        }
    }

    document.querySelectorAll(".staff-id").forEach((input, index) => {
        let options = [];
        let selectedStaff = "";
        usedName.forEach((staff) => {
            if (staff.index == index + 1) {
                options.push(staff.name);
                selectedStaff = staff.name;
            }
        })
        unusedName.forEach((name) => {options.push(name)});
        options.sort();

        const selectElement = input;
        selectElement.innerHTML = '';

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = `Select Staff ${index + 1}`;
        selectElement.appendChild(defaultOption);

        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            selectElement.appendChild(opt);
        });

        selectElement.value = selectedStaff;
    });

    let allFilled = true;
    document.querySelectorAll(".staff-id").forEach((input) => {
        if (input.value == "") {
            allFilled = false;
        }

        if (allFilled) {
            document.querySelector(".process-button").disabled = false;
            document.querySelector(".process-button").addEventListener("click", sendForm);

        } else {
            document.querySelector(".process-button").disabled = true;
            document.querySelector(".process-button").removeAttribute("onclick");

        }
    })
}

function sendForm(event) {
    event.preventDefault();
    
    let data = {
        'day' : document.querySelector(".form-control[name='day']").value,
        'session' : document.querySelector(".form-control[name='session']").value,
        'staffInputs' : Array.from(document.querySelectorAll(".staff-id"), input => input.value)
    };

    fetch('generate-output-table', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(view => {
        document.querySelector(".result-schedule").innerHTML = view;
    })
    .catch((error) => console.error('Error:', error));
}

function navigateToDatabase(button) {
    const key = button.getAttribute('data-key');

    fetch('request-access-db', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
        body: JSON.stringify({ 'key': key })
    })
    .then(response => response.text())
    .then(html => {
        document.documentElement.innerHTML = html;
        window.history.pushState({}, '', '/staff-management.php');
    })
    .catch(error => console.error('Error:', error));
}

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
        let data = {
            'id' : staffID
        };

        fetch('request-delete-db', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(html => document.documentElement.innerHTML = html)
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
        let data = {
            'id' : staffID,
            'name' : staffName,
        };

        fetch('request-edit-db', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(html => {
            document.documentElement.innerHTML = html;
        })
        .catch((error) => console.error('Error:', error));

    } else if (staffID == "" && staffName != "" ){
        let data = {
            'name' : staffName
        };

        fetch('request-add-db', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(html => {
            console.log("Test: ", html);
            document.documentElement.innerHTML = html;
        })
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

updateStaffInputs ();