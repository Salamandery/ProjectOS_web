import React, {
    useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegSave } from 'react-icons/fa';
import { updateProfileRequest } from '../../Services/store/user/action';
import {
    Save,
    ChangePassword
} from './style';
import {
    Input,
    Form,
    Container
} from '../../Style';

const Perfil = () => {
    document.title = "INTRANET - PERFIL";
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.user);
    const me = useSelector(state => state.user.me);

    const [assinatura, setAssinatura] = useState(profile.assinatura !== 'null' ? profile.assinatura : '');
    const cd_usuario = profile.cd_usuario;
    const [usuario_mv, setMv] = useState(profile.usuario_mv !== 'null' ? profile.usuario_mv : '');
    const [name, setName] = useState(profile.name !== 'null' ? profile.name : '' );
    const [multi_oficina, setM_o] = useState(profile.multi_oficina !== 'null' ? profile.multi_oficina : '');
    const [cd_oficina, setO] = useState(profile.cd_oficina !== 'null' ? profile.cd_oficina : '');
    const [email, setEmail] = useState(profile.email !== 'null' ? profile.email : '');
    const [password, setPass] = useState('');
    const [oldPassword, setOldPass] = useState('');
    const [confirmPassword, setConfirmPass] = useState('');

    function handlerSave(e) {        
        dispatch(updateProfileRequest({
                cd_usuario,
                name,
                email,
                multi_oficina,
                cd_oficina,
                assinatura,
                password,
                oldPassword,
                confirmPassword,
                me,
                usuario_mv,
                tp_usuario: profile.tp_usuario,
        }));
    }

    return (   
        <Container w="100%" h="100%" items="center" content="center" direction="column">
            <Form direction="column" w="70%" h="100%" self="center">
                <Input placeholder="USUÁRIO" 
                        value={cd_usuario}
                        disabled
                />
                <Input placeholder="USUÁRIO DO MV" 
                        value={usuario_mv}
                        onChange={e=>setMv(e.target.value)}
                />
                <Input placeholder="NOME COMPLETO" 
                        value={name}
                        onChange={e=>setName(e.target.value)}
                />
                <Input placeholder="E-MAIL" 
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                />
                {
                        profile.tp_usuario === "A" ? <>
                <Input placeholder="CÓDIGOS PARA MULTI-OFICINA" 
                        value={multi_oficina}
                        onChange={e=>setM_o(e.target.value)}
                />
                <Input placeholder="OFICINA PADRÃO" 
                        value={cd_oficina}
                        onChange={e=>setO(e.target.value)}
                />
                <Input placeholder="ASSINATURA" 
                        value={assinatura}
                        onChange={e=>setAssinatura(e.target.value)}
                /></> : null
                }
                <ChangePassword>
                    <Input placeholder="SENHA ATUAL" 
                            type="password"
                            value={oldPassword}
                            onChange={e=>setOldPass(e.target.value)}
                    />
                    <Input placeholder="NOVA SENHA"
                            type="password" 
                            value={password}
                            onChange={e=>setPass(e.target.value)}
                    />
                    <Input placeholder="CONFIRMAÇÃO DE SENHA" 
                            type="password"
                            value={confirmPassword}
                            onChange={e=>setConfirmPass(e.target.value)}
                    />
                </ChangePassword>
                <Save onClick={handlerSave}>
                    <FaRegSave />
                    <span>Salvar perfil</span>
                </Save>
            </Form>
        </Container>
    );
}

export default Perfil;