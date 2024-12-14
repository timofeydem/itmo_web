document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const userTableContainer = document.getElementById("userTableContainer");
    const errorMessage = document.getElementById("errorMessage");
    const loadUsersButton = document.getElementById("loadUsersButton");
    const API_URL = "https://jsonplaceholder.typicode.com/users";

    preloader.style.display = "block";

    const hidePreloader = () => {
        preloader.style.display = "none";
    };

    const loadUsers = async () => {
        preloader.style.display = "block";
        userTableContainer.innerHTML = "";
        errorMessage.textContent = "";

        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }

            const users = await response.json();
            renderUsers(users);
        } catch (error) {
            errorMessage.textContent = `Ошибка: ${error.message}`;
        } finally {
            hidePreloader();
        }
    };

    const renderUsers = (users) => {
        if (users.length === 0) {
            userTableContainer.innerHTML = "<p class='block__text'>Нет данных для отображения</p>";
            return;
        }

        const table = document.createElement("div");
        table.className = "table";

        table.innerHTML = `
            <div class="table__row">
                <div class="table__cell table__header">Имя пользователя</div>
                <div class="table__cell table__header">Email</div>
                <div class="table__cell table__header">Телефон</div>
                <div class="table__cell table__header">Компания</div>
            </div>
        `;

        users.forEach((user) => {
            const row = `
                <div class="table__row">
                    <div class="table__cell">${user.name}</div>
                    <div class="table__cell">${user.email}</div>
                    <div class="table__cell">${user.phone}</div>
                    <div class="table__cell">${user.company.name}</div>
                </div>
            `;
            table.innerHTML += row;
        });

        userTableContainer.appendChild(table);
    };

    loadUsersButton.addEventListener("click", () => {
        loadUsers();
    });
});