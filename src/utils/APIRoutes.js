export const host = "http://localhost:5000";

// auth routes
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvataRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allUsers`;
export const firebaseLoginRoute = `${host}/api/auth/firebaseLogin`;
export const checkUsernameRoute = `${host}/api/auth/checkUsername`;

//messages routes
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const getAllMessageRoute = `${host}/api/messages/getmsg`;
