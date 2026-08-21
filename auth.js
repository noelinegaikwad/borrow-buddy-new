/*
  BorrowBuddy shared auth module.
  Uses localStorage to simulate a backend (no server yet).
  Include this file on every page via:
    [script tag for auth.js]
  and call updateAuthNav() after the header loads.
*/

const BB_USERS_KEY = "bb_users";
const BB_SESSION_KEY = "bb_session";

// ---------- storage helpers ----------

function bbGetUsers() {
    const raw = localStorage.getItem(BB_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
}

function bbSaveUsers(users) {
    localStorage.setItem(BB_USERS_KEY, JSON.stringify(users));
}

function bbGetSession() {
    const raw = localStorage.getItem(BB_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
}

function bbSaveSession(session) {
    localStorage.setItem(BB_SESSION_KEY, JSON.stringify(session));
}

function bbClearSession() {
    localStorage.removeItem(BB_SESSION_KEY);
}

// Very small hash so we're not storing raw passwords in plain text in
// localStorage. This is NOT secure — it's a placeholder until there's a
// real backend with proper password hashing. Good enough for a frontend demo.
function bbSimpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return hash.toString(36);
}

// ---------- public API ----------

function bbCurrentUser() {
    const session = bbGetSession();
    if (!session) return null;
    const users = bbGetUsers();
    return users.find(u => u.id === session.userId) || null;
}

function bbSignup(name, email, password) {
    email = email.trim().toLowerCase();
    const users = bbGetUsers();

    if (users.some(u => u.email === email)) {
        return { ok: false, error: "An account with this email already exists." };
    }
    if (!name.trim() || !email || password.length < 6) {
        return { ok: false, error: "Please fill all fields. Password must be at least 6 characters." };
    }

    const newUser = {
        id: "u_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
        name: name.trim(),
        email: email,
        passwordHash: bbSimpleHash(password),
        role: "user",
        joined: new Date().toISOString(),
        rating: null,
        reviewCount: 0
    };

    users.push(newUser);
    bbSaveUsers(users);
    bbSaveSession({ userId: newUser.id });

    return { ok: true, user: newUser };
}

function bbLogin(email, password) {
    email = email.trim().toLowerCase();
    const users = bbGetUsers();
    const user = users.find(u => u.email === email);

    if (!user || user.passwordHash !== bbSimpleHash(password)) {
        return { ok: false, error: "Incorrect email or password." };
    }

    bbSaveSession({ userId: user.id });
    return { ok: true, user: user };
}

function bbLogout() {
    bbClearSession();
    window.location.href = "index.html";
}

function bbRequireAuth() {
    const user = bbCurrentUser();
    if (!user) {
        window.location.href = "login.html?redirect=" + encodeURIComponent(window.location.pathname + window.location.search);
    }
    return user;
}

// Seeds one demo admin account on first load so the Admin Dashboard has
// something to log into during the internship demo.
function bbSeedAdmin() {
    const users = bbGetUsers();
    if (!users.some(u => u.role === "admin")) {
        users.push({
            id: "u_admin_seed",
            name: "Admin",
            email: "admin@borrowbuddy.com",
            passwordHash: bbSimpleHash("admin123"),
            role: "admin",
            joined: new Date().toISOString(),
            rating: null,
            reviewCount: 0
        });
        bbSaveUsers(users);
    }
}
bbSeedAdmin();

// Updates any header nav on the page to reflect logged-in/out state.
// Expects the nav to contain elements with these IDs (see header markup
// added to each page):
//   #authLoggedOut  -> wraps Login/Sign Up links
//   #authLoggedIn   -> wraps user greeting/dashboard/logout links
//   #authUserName   -> text node for the user's name
function updateAuthNav() {
    const user = bbCurrentUser();
    const loggedOutEl = document.getElementById("authLoggedOut");
    const loggedInEl = document.getElementById("authLoggedIn");
    const nameEl = document.getElementById("authUserName");

    if (!loggedOutEl || !loggedInEl) return;

    if (user) {
        loggedOutEl.style.display = "none";
        loggedInEl.style.display = "flex";
        if (nameEl) nameEl.textContent = user.name.split(" ")[0];
    } else {
        loggedOutEl.style.display = "flex";
        loggedInEl.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", updateAuthNav);
