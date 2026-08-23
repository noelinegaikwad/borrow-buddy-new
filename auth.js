/*
  BorrowBuddy - Real Supabase Authentication
*/

const BB_SESSION_KEY = "bb_session";

// ---------- current user ----------

async function bbCurrentUser() {
    const { data, error } = await supabaseClient.auth.getUser();

    if (error || !data.user) {
        return null;
    }

    const user = data.user;

    return {
        id: user.id,
        name:
            user.user_metadata?.full_name ||
            "BorrowBuddy User",
        email: user.email,
        role:
            user.user_metadata?.role ||
            "user"
    };
}


// ---------- signup ----------

async function bbSignup(name, email, password) {

    name = name.trim();
    email = email.trim().toLowerCase();

    if (!name || !email || !password) {
        return {
            ok: false,
            error: "Please fill all fields."
        };
    }

    if (password.length < 6) {
        return {
            ok: false,
            error: "Password must be at least 6 characters."
        };
    }

    const { data, error } =
        await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: name
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
        user: data.user,
        session: data.session
    };
}


// ---------- login ----------

async function bbLogin(email, password) {

    email = email.trim().toLowerCase();

    if (!email || !password) {
        return {
            ok: false,
            error: "Please enter your email and password."
        };
    }

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

    if (error) {
        return {
            ok: false,
            error: "Incorrect email or password."
        };
    }

    return {
        ok: true,
        user: data.user,
        session: data.session
    };
}


// ---------- logout ----------

async function bbLogout() {

    const { error } =
        await supabaseClient.auth.signOut();

    if (error) {
        console.error("Logout error:", error);
    }

    window.location.href = "index.html";
}


// ---------- protect page ----------

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


// ---------- get profile ----------

async function bbGetProfile() {

    const user = await bbCurrentUser();

    if (!user) {
        return null;
    }

    const { data, error } =
        await supabaseClient
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

    if (error) {
        console.error("Profile error:", error);
        return null;
    }

    return data;
}


// ---------- update navigation ----------

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

            const firstName =
                user.name
                    ? user.name.split(" ")[0]
                    : "User";

            nameEl.textContent = firstName;
        }

    } else {

        loggedOutEl.style.display = "flex";

        loggedInEl.style.display = "none";
    }
}


// ---------- authentication listener ----------

supabaseClient.auth.onAuthStateChange(
    async function(event, session) {

        console.log(
            "BorrowBuddy authentication:",
            event
        );

        await updateAuthNav();
    }
);


// ---------- page load ----------

document.addEventListener(
    "DOMContentLoaded",
    function() {
        updateAuthNav();
    }
);