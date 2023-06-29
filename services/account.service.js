import { signIn} from "next-auth/react";

const apiUrl = process.env.public_url_api;
const baseApiUrl = `${apiUrl}/admin/users/new`;

export const accountService = {
  login,
  register
};

function login(email, password) {
  return signIn("credentials", {
    redirect: false,
    email: email,
    password: password,
    callbackUrl: `${window.location.origin}`,
  }).then((user) => {
    return user;
  });
}


function register(userinformation) {

  return fetch(`${baseApiUrl}`, {method: "POST",  body: JSON.stringify({ userinformation })});
}


