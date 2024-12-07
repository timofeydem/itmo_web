document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("waitlistForm");
    const tableContainer = document.getElementById("waitlistTable");
    const localStorageKey = "waitlist";

    const loadWaitlist = () => {
        const waitlist = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        renderTable(waitlist);
    };

    const saveWaitlist = (waitlist) => {
        localStorage.setItem(localStorageKey, JSON.stringify(waitlist));
    };

    const renderTable = (waitlist) => {
        if (waitlist.length === 0) {
            tableContainer.innerHTML = "<p>Лист ожидания пуст</p>";
            return;
        }

        const table = document.createElement("div");
        table.className = "table";

        table.innerHTML = `
            <div class="table__row">
                <div class="table__cell table__header">Имя</div>
                <div class="table__cell table__header">Позиция</div>
                <div class="table__cell table__header">Действия</div>
            </div>
        `;

        waitlist.reverse().forEach((item, index) => {
            table.innerHTML += `
                <div class="table__row">
                    <div class="table__cell">${item.name}</div>
                    <div class="table__cell">${item.position}</div>
                    <div class="table__cell">
                        <button class="form__button" data-index="${index}">Удалить</button>
                    </div>
                </div>
            `;
        });

        tableContainer.innerHTML = "";
        tableContainer.appendChild(table);

        table.querySelectorAll("button").forEach((button) => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                waitlist.splice(index, 1);
                saveWaitlist(waitlist);
                renderTable(waitlist);
            });
        });
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // const name = document.getElementById("name").value.trim();
        // const position = document.getElementById("position").value.trim();

        const name = e.target.name.value;
        const position = e.target.position.value;


        if (!name || !position) return;

        const waitlist = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        waitlist.push({ name, position });

        saveWaitlist(waitlist);
        renderTable(waitlist);

        form.reset();
    });

    loadWaitlist();
});
