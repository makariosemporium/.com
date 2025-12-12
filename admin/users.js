// TEMPORARY LOCAL STORAGE USERS
let users = JSON.parse(localStorage.getItem("users")) || [
  { id: 1, name: "Emmanuel Kwame", email: "emmanuel@example.com", status: "Active" },
  { id: 2, name: "Abena Mensah", email: "abena@example.com", status: "Active" },
  { id: 3, name: "Kwesi Boateng", email: "kwesi@example.com", status: "Inactive" }
];

function renderUsers() {
  const table = document.getElementById("usersTable");
  table.innerHTML = "";

  users.forEach(user => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>
        <button class="status-btn status-${user.status.toLowerCase()}" onclick="toggleStatus(${user.id})">
          ${user.status}
        </button>
      </td>
      <td>
        <button class="edit-btn" onclick="editUser(${user.id})">Edit</button>
        <button class="action-btn" onclick="deleteUser(${user.id})">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });

  localStorage.setItem("users", JSON.stringify(users));
}

// Toggle Active/Inactive
function toggleStatus(id) {
  const user = users.find(u => u.id === id);
  user.status = user.status === "Active" ? "Inactive" : "Active";
  renderUsers();
}

// Delete User
function deleteUser(id) {
  users = users.filter(u => u.id !== id);
  renderUsers();
}

// Edit User
function editUser(id) {
  const user = users.find(u => u.id === id);
  const newName = prompt("Enter new name:", user.name);
  const newEmail = prompt("Enter new email:", user.email);

  if(newName) user.name = newName;
  if(newEmail) user.email = newEmail;

  renderUsers();
}

// INITIAL RENDER
renderUsers();
