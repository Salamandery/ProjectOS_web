import React, {
    useState,
    useEffect
} from 'react';
import {
    useSelector
} from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../Services/api';
import history from '../../Services/history';
import {
    FaCheck
} from 'react-icons/fa';
import {
    Container,
    Wrapper,
    Form,
    Input,
    ButtonDefault
} from '../../Style';

import {
    Link,
    NavBar
} from './style';

import Modal from '../ModalController';

const HeaderHome = () => {

    const me = useSelector(state=>state.user.me);

    const [usuario_mv, setUsuarioMV] = useState('');
    const [webmail, setWebmail] = useState('');
    const [epimed, setEpimed] = useState('');
    const [timed, setTimed] = useState('');
    const [handlerModal, setHandlerModal] = useState(false);

    useEffect(() => {
        if (me === 1) {
            setTimed("http://10.42.112.14:8080/heat/pages/painel.do");
            setWebmail('https://webmail-seguro.com.br/heat.org.br');
            setEpimed('https://secure.epimedmonitor.com/Login.aspx?Token=EN2DCNq%2FCyn5o6P3REznzk0XZBpgVJKNdVlzhbLO%2BOVYMPeQfjWzX%2Bt4In4pRxowrWjDwEFGrgQgz6HVxdAgMopaH%2FSXWlcci9ilm%2FdiZ3pnrxZIydlmod1IizYPMxoL');
        } else {
            setTimed("http://10.42.112.13:7050/hepjbc/pages/painel.do");
            setWebmail('https://webmail-seguro.com.br/hejbc.org.br');
            setEpimed("https://secure.epimedmonitor.com/Login.aspx?Token=DLOGLtOTJn35%2F95bXYByNqwhOS%2BsH7cTSTAtp3N8dLbVHCWRoPzTG5Ifpe5uzbvWiXaonxe5Bi362a%2BypPHIvwZrVvbAH6DuLNHtlRB2KPQeFafV9aIVuSNaBcQHep0i");
        }
    }, [me]);

    function handlerRequestModal(e) {
        setHandlerModal(!handlerModal);
    }

    async function handlerSolOs(e) {
        try {
            const res = await api.post('/cliente_auth', {
                clienteuser: usuario_mv,
            });

            if (res.data) {

                toast.success('Acesso autorizado com sucesso');

                setTimeout(()=>{
                    handlerRequestModal();
                    
                    history.push('/novo_chamado', {
                        user: res.data,
                    });
                }, 1000);

            } else {
                toast.info('Acesso negado, verifique se o usuário está correto');
            }
        } catch (err) {
            toast.error('Ops, algo de errado aconteceu. :(');
            console.log(err);
        }
    }

    return (
        <Container self="stretch" w="100%" h="10%" direction="column">
            <NavBar>
                { /* 
                    <Link data-toggle='modal' data-target='#myModal' style={styles.newOS} onClick={handlerRequestModal}>ABRIR - O.S.</Link> 
                    <Link target="_blank" href="http://10.42.111.12/apoio/">MVSOUL</Link>
                    <Link target="_blank" href="http://10.42.111.12/mvpep/">MVPEP</Link>
                    <Link target="_blank" href="http://10.42.111.12:8040/mvsacr/">SACR</Link>
                */ }
                <Link target="_blank" href={timed}>F71</Link>
                <Link target="_blank" href="http://10.42.111.12/apoio/">MVSOUL</Link>
                <Link target="_blank" href="http://10.42.111.12/mvpep/">MVPEP</Link>
                <Link target="_blank" href="http://10.42.112.91:8085/PD/login">MEDILAB</Link>
                <Link target="_blank" href={webmail}>WEBMAIL</Link>
                <Link target="_blank" href="https://secure.epimedmonitor.com/Login.aspx">EPIMED</Link>
                <Link target='_blank' href={epimed}>EPIMED EVENTOS</Link>
                <Link target="_blank" href="http://www.cid10.com.br/">CID 10</Link>
                <Link target="_blank" href="https://cadastro.saude.gov.br/novocartao/">CNS</Link>
                <Link target="_blank" href="http://sigtap.datasus.gov.br/tabela-unificada/app/sec/inicio.jsp">SIGTAP</Link>
                <Link target="_blank" href="/Login">PORTAL</Link>
            </NavBar>

            { handlerModal ? 
                <Modal size="50%" items="center" onHandler={e=>handlerRequestModal(e)}>
                    <Container w="100%" direction="column">
                        <Wrapper w="100%" items="center" content="space-between">
                            <Wrapper items="center" content="flex-start">
                                <span className="labelModal">Usuário MV</span>
                                <Form>
                                    <Input  bold="true" 
                                            value={usuario_mv} 
                                            onChange={e=>setUsuarioMV(e.target.value)} />
                                    <ButtonDefault tp="success" onClick={e=>handlerSolOs(e)}>
                                        <FaCheck />
                                        <span>Confirmar</span>
                                    </ButtonDefault>
                                </Form>
                            </Wrapper>     
                        </Wrapper>              
                    </Container>
                </Modal>
              : null
            }
        </Container>
    );
}

const styles = {
    newOS: {
        background: "red",
    },
}
export default HeaderHome;