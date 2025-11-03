const listEl = document.getElementById("userList");
const errorEl = document.getElementById("errorMsg");

function fetchUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            for (let i = 0; i < data.length; i++) {
                const user = data[i];
                const li = document.createElement("li");
                li.textContent = `${user.name} | `;
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
                listEl.appendChild(li);
            }
        })
        .catch(function (error) {
            errorEl.textContent =
                "We’re having trouble loading the user list. Please refresh or check your connection";
        });
}

fetchUsers();
