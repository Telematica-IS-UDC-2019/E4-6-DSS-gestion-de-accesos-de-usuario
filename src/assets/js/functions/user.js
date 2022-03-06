const user = (() => {
    const logIn = () => {
        window.location.href = "/login";
    }
    const logOut = () => {
        window.location.href = "/logout";
    }
    return {
        logIn,
        logOut
    }
})();

export default user;