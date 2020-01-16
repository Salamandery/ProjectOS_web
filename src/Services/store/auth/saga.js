import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import history from "../../history";
import { signSuccess, signFailure } from "./action";

import api from "../../api";

export function* signIn({ payload }) {
  try {
    const { login, password, company } = payload;

    let res = yield call(api.post, "session", {
      login,
      password,
      company
    });

    const { token } = res.data;

    const userConfig = res.data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    //res = yield call(api.get, `push_menu/${login.toUpperCase()}`);

    const menuConfig = {};

    yield put(signSuccess(token, { userConfig, company }, menuConfig));

    yield toast.success("Login realizado com sucesso");

    setTimeout(() => {
      history.push("/Dashboard");
    }, 1000);
  } catch (err) {
    yield put(signFailure());
    toast.error("Erro ao fazer o login, verifique os dados informados!");
    console.log(err);
  }
}

export function* signUp({ payload }) {
  try {
    const { name, login, password, company } = payload;

    yield call(api.post, "users", {
      name,
      login,
      company,
      password
    });

    history.push("/");

    toast.success("Cadastro realizado com sucesso");
  } catch (err) {
    yield put(signFailure());
    toast.error("Erro ao cadastrar, verifique os dados informados");
    console.log(err);
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;
  api.defaults.headers.authorization = `Bearer ${token}`;
}

export function signOut() {
  history.push("/Login");
}

export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest("@auth/SIGN_IN_REQUEST", signIn),
  takeLatest("@auth/SIGN_UP_REQUEST", signUp),
  takeLatest("@auth/SIGN_OUT_REQUEST", signOut)
]);
