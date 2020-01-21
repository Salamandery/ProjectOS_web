import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRegSave } from "react-icons/fa";
import { updateProfileRequest } from "../../Services/store/user/action";
import { Save, ChangePassword } from "./style";
import { Input, Form, Container } from "../../Style";

const Perfil = () => {
  document.title = "INTRANET - PERFIL";
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.user);

  const [login, setLogin] = useState(profile.login ? profile.login : "");
  const [assinatura, setAssinatura] = useState(
    profile.assinatura !== "null" ? profile.assinatura : ""
  );
  const [name, setName] = useState(profile.name !== "null" ? profile.name : "");
  const [ws, setWs] = useState(profile.ws !== "null" ? profile.ws : "");
  const [wd, setWd] = useState(profile.wd !== "null" ? profile.wd : "");
  const [email, setEmail] = useState(
    profile.email !== "null" ? profile.email : ""
  );
  const [password, setPass] = useState("");
  const [oldPassword, setOldPass] = useState("");
  const [confirmPassword, setConfirmPass] = useState("");

  function handlerSave(e) {
    dispatch(
      updateProfileRequest({
        login,
        name,
        email,
        ws,
        wd,
        assinatura,
        password,
        oldPassword,
        confirmPassword,
        tp_user: profile.provider
      })
    );
  }

  return (
    <Container
      w="100%"
      h="100%"
      items="center"
      content="center"
      direction="column"
    >
      <Form direction="column" w="70%" h="100%" self="center">
        <Input
          placeholder="USUÁRIO"
          value={login}
          onChange={e => setLogin(e.target.value)}
        />
        <Input
          placeholder="NOME COMPLETO"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          placeholder="E-MAIL"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {profile.provider ? (
          <>
            <Input
              placeholder="CÓDIGOS PARA MULTI-OFICINA"
              value={ws}
              onChange={e => setWs(e.target.value)}
            />
            <Input
              placeholder="OFICINA PADRÃO"
              value={wd}
              onChange={e => setWd(e.target.value)}
            />
            <Input
              placeholder="ASSINATURA"
              value={assinatura}
              onChange={e => setAssinatura(e.target.value)}
            />
          </>
        ) : null}
        <ChangePassword>
          <Input
            placeholder="SENHA ATUAL"
            type="password"
            value={oldPassword}
            onChange={e => setOldPass(e.target.value)}
          />
          <Input
            placeholder="NOVA SENHA"
            type="password"
            value={password}
            onChange={e => setPass(e.target.value)}
          />
          <Input
            placeholder="CONFIRMAÇÃO DE SENHA"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPass(e.target.value)}
          />
        </ChangePassword>
        <Save onClick={handlerSave}>
          <FaRegSave />
          <span>Salvar perfil</span>
        </Save>
      </Form>
    </Container>
  );
};

export default Perfil;
