console.log("Auth system loaded");

// Load users list
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// Save users list
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// Save logged in user
function loginUser(user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
}

// Logout user
function logoutUser() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "../auth/login.html";
}

// Check login status
function getLoggedInUser() {
    return JSON.parse(localStorage.getItem("loggedInUser"));
}


// ========================
// HANDLE REGISTRATION
// ========================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("regName").value;
        const email = document.getElementById("regEmail").value.toLowerCase();
        const password = document.getElementById("regPassword").value;

        let users = getUsers();

        // Check if email already exists
        if (users.find(u => u.email === email)) {
            alert("Email already registered.");
            return;
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            password
        };

        users.push(newUser);
        saveUsers(users);

        alert("Account created successfully!");
        window.location.href = "login.html";
    });
}


// ========================
// HANDLE LOGIN
// ========================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value.toLowerCase();
        const password = document.getElementById("loginPassword").value;

        let users = getUsers();

        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            alert("Invalid email or password");
            return;
        }

        loginUser(user);
        window.location.href = "../account/index.html";
    });
}

