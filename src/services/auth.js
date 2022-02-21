const { decode, sign, verify } = require("jsonwebtoken");

export const TOKEN_KEY = "access-token";

const createTokens = (user) => {
    
  const accessToken = sign(
    { id: user.idpessoa, username: user.usuario },
    "jwtsecretplschange"
  );

  return accessToken;
};


export const isAuthenticated = () => {
    const accessToken = localStorage.getItem(TOKEN_KEY);
    if (!accessToken){
        return false;
    }
    try {
        const validToken = verify(accessToken, "jwtsecretplschange");
        if (validToken) {
          return true;
        }
    } catch (err) {
        return false
    }
}
export const getTokenUser = () => decode(localStorage.getItem(TOKEN_KEY));
export const loginToken = user => {
  localStorage.setItem(TOKEN_KEY, createTokens(user));
};
export const logoutToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};