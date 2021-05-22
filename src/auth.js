
export function isAuthenticated() {
    return window.sessionStorage.getItem("authenticated") === "true";
}

export function getCurrentUser() {
    return {
        userId: parseInt(window.sessionStorage.getItem("userId")),
        username: window.sessionStorage.getItem("username"),
        email: window.sessionStorage.getItem("email"),
    }
}

/**
 * @param {{
 *  userId: number,
 *  username: string,
 *  email: string,
 * }} user
 */
export function setCurrentUser(user) {
    window.sessionStorage.setItem("authenticated", "true");
    window.sessionStorage.setItem("userId", user.userId.toString());
    window.sessionStorage.setItem("username", user.username);
    window.sessionStorage.setItem("email", user.email);
}

export function clearCurrentUser(user) {
    window.sessionStorage.removeItem("authenticated");
    window.sessionStorage.removeItem("userId");
    window.sessionStorage.removeItem("username");
    window.sessionStorage.removeItem("email");
}
