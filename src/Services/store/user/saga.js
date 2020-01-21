import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import api from "../../api";
import { updateProfileSuccess, updateProfileFailure } from "./action";
export function* updateProfile({ payload }) {
  try {
    const {
      name,
      login,
      email,
      ws,
      wd,
      company,
      tp_user,
      ...rest
    } = payload.data;

    const profile = Object.assign(
      {
        name,
        login,
        email,
        workshops: ws,
        workshop_default :wd,
        tp_user
      },
      rest.oldPassword ? rest : {}
    );

    const res = yield call(api.put, "user", profile);

    if (res.data.status) {
      toast.info(res.data.msg);
    } else {
      toast.success("Alteração realizada com sucesso");
    }

    yield put(updateProfileSuccess({ profile, company }));
  } catch (err) {
    yield put(updateProfileFailure());
    toast.error(
      "Houve algum problema ao atualizar seu perfil, confira os dados informados"
    );
    console.log(err);
  }
}

export default all([takeLatest("@user/UPDATE_PROFILE_REQUEST", updateProfile)]);
