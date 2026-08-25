/*
  BorrowBuddy - Supabase Authentication
*/

async function bbCurrentUser() {

    const {
        data: { user },
        error
    } = await supabaseClient.auth.getUser();

    if (error || !user) {
        return null;
    }

    return user;
}


// SIGN UP
async function bbSignup(name, email, password) {

    email = email.trim().toLowerCase();

    if (!name.trim() || !email || password.length < 6) {
        return {
            ok: false,
            error: "Please fill all fields. Password must be at least 6 characters."
        };
    }

    const {
        data,
        error
    } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                full_name: name.trim()
            }
        }
    });

    if (error) {
        return {
            ok: false,
            error: error.message
        };
    }

    return {
        ok: true,
        user: data.user
    };
}


// LOGIN
async function bbLogin(email, password) {

    email = email.trim().toLowerCase();

    const {
        data,
        error
    } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        return {
            ok: false,
            error: error.message
        };
    }

    return {
    ok: true,
    user: data.user,
    session: data.session
};
}


// LOGOUT
async function bbLogout() {

    await supabaseClient.auth.signOut();

    window.location.href = "index.html";
}


// REQUIRE LOGIN
async function bbRequireAuth() {

    const user = await bbCurrentUser();

    if (!user) {

        window.location.href =
            "login.html?redirect=" +
            encodeURIComponent(
                window.location.pathname +
                window.location.search
            );

        return null;
    }

    return user;
}


// UPDATE NAVIGATION
async function updateAuthNav() {

    const user = await bbCurrentUser();

    const loggedOutEl =
        document.getElementById("authLoggedOut");

    const loggedInEl =
        document.getElementById("authLoggedIn");

    const nameEl =
        document.getElementById("authUserName");

    if (!loggedOutEl || !loggedInEl) {
        return;
    }

    if (user) {

        loggedOutEl.style.display = "none";

        loggedInEl.style.display = "flex";

        if (nameEl) {

            const name =
                user.user_metadata?.full_name ||
                user.email ||
                "User";

            nameEl.textContent =
                name.split(" ")[0];
        }

    } else {

        loggedOutEl.style.display = "flex";

        loggedInEl.style.display = "none";
    }
}


document.addEventListener(
    "DOMContentLoaded",
    updateAuthNav
);