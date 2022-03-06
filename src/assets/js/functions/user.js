const user = (() => {
    // Create logIn function
    const logIn = () => {
        window.location.href = "/login";
    }
    // Create logOut function
    const logOut = () => {
        window.location.href = "/logout";
    }
    return {
        logIn,
        logOut
    }
})();

export default user;