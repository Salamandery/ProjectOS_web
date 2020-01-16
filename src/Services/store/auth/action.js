export function signInRequest(login, password, company) {
  return {
    type: "@auth/SIGN_IN_REQUEST",
    payload: { login, password, company }
  };
}

export function signSuccess(token, user, menu) {
  return {
    type: "@auth/SIGN_IN_SUCCESS",
    payload: { token, user, menu }
  };
}

export function signFailure() {
  return {
    type: "@auth/SIGN_FAILURE"
  };
}

export function signUpRequest(name, login, password, company) {
  return {
    type: "@auth/SIGN_UP_REQUEST",
    payload: { name, login, password, company }
  };
}
export function signOutRequest() {
  return {
    type: "@auth/SIGN_OUT_REQUEST"
  };
}
