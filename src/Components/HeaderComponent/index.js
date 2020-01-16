import React from 'react';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import history from '../../Services/history';
import {
    Container,
    User,
    UserInfo,
    Username,
    ButtonPerfil,
    Sair,
    Intranet
} from './style';

import { signOutRequest } from '../../Services/store/auth/action';
const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector(state=> state.user.user);

    function handlerLogout() {
        dispatch(signOutRequest());
    }
    function handlerIntranet() {
        history.push('/Dashboard');
    }
    function handlerPerfil() {
        history.push('/Perfil');
    }
    return (
        <Container>
            <Intranet onClick={handlerIntranet}>INTRANET</Intranet>
            <User>
                <UserInfo>
                    <Username>{user.name}</Username>
                    <ButtonPerfil onClick={handlerPerfil}>Meu Perfil</ButtonPerfil>
                </UserInfo>
                <Sair onClick={handlerLogout}>Sair</Sair>
            </User>
        </Container>
    );
}

export default Header;