const listEl = document.getElementById("userList");
const errorEl = document.getElementById("errorMsg");
const searchInputEl = document.getElementById("searchInput");

let allUsers = [];

function renderUsers(usersArray) {
    listEl.innerHTML = "";
    usersArray.forEach(function (user) {
        const li = document.createElement("li");
        li.textContent = `${user.name} | `;
        listEl.appendChild(li);
        const emailLink = document.createElement("a");
        emailLink.href = `mailto:${user.email}`;
        emailLink.textContent = user.email;
        li.appendChild(emailLink);
        li.appendChild(document.createTextNode(` - ${user.company.name}`));
        const btn = document.createElement("button");
        btn.textContent = "More Info";
        li.appendChild(btn);
        btn.addEventListener("click", function () {
            const existing = li.querySelector("p");
            if (existing) {
                existing.remove();
                btn.textContent = "More Info";
            } else {
                const p = document.createElement("p");
                p.textContent = `${user.phone} | ${user.website}`;
                li.appendChild(p);
                btn.textContent = "X";
            }
        });
    });
}

function fetchUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            allUsers = data;
            renderUsers(allUsers);
        })
        .catch(function (error) {
            errorEl.textContent =
                "We’re having trouble loading the user list. Please refresh or check your connection";
        });
}

fetchUsers();

searchInputEl.addEventListener("input", handleSearch);

function handleSearch() {
    const term = searchInputEl.value.toLowerCase().trim();
    const filtered = allUsers.filter(function (person) {
        return person.name.toLowerCase().includes(term);
    });
    renderUsers(filtered);
}