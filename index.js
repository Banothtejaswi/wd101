document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = new Date(document.getElementById('dob').value);
    const acceptTerms = document.getElementById('acceptTerms').checked;

    const today = new Date();
    const minAge = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
    const maxAge = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    if (dob < minAge || dob > maxAge) {
        alert('Please enter a valid date of birth between ages 18 and 55.');
        return;
    }

    const userData = {
        name: name,
        email: email,
        password: password,
        dob: dob.toISOString().slice(0, 10),
        acceptTerms: acceptTerms ? 'Yes' : 'No'
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    displayUsers();
    document.getElementById('registrationForm').reset();
});

function displayUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tableBody = document.getElementById('userTableBody');

    tableBody.innerHTML = '';

    users.forEach(function (user) {
        const row = tableBody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);

        cell1.textContent = user.name;
        cell2.textContent = user.email;
        cell3.textContent = user.password;
        cell4.textContent = user.dob;
        cell5.textContent = user.acceptTerms;
    });
}

window.onload = function () {
    displayUsers();
};
