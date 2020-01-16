import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Login, LoginForm } from "./style";
import { Input, Select } from "../../Style";
import { signInRequest } from "../../Services/store/auth/action";

const SignIn = () => {
  document.title = "Tela de Login";
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState(3);

  async function handlerLogin() {
    dispatch(signInRequest(login, password, company));
  }

  return (
    <Container>
      <LoginForm>
        <span>INTRANET</span>
        <Input
          value={login}
          onChange={e => setLogin(e.target.value)}
          placeholder="Login"
        />
        <Input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Senha"
        />
        <Select
          w="100%"
          defaultValue={3}
          onChange={e => setCompany(e.target.value)}
        >
          <option value={3}>HEAT</option>
          <option value={2}>HEJBC</option>
        </Select>
        <Login onClick={handlerLogin}>
          {loading === true ? "Carregando.." : "ENTRAR"}
        </Login>
      </LoginForm>
    </Container>
  );
};

export default SignIn;
