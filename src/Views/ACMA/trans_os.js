import React, {
    useEffect,
    useState
} from 'react';
import { toast } from 'react-toastify';
import {
    useSelector
} from 'react-redux';
import api from '../../Services/api';
import {
    Container,
    Table,
    CardBlock,
    ButtonDefault,
    Wrapper,
    Select,
    Input,
    Form
} from '../../Style';
import { FaCheck } from 'react-icons/fa';

export default function TransOs() {
    document.title = "INTRANET - TRANSFÊRENCIA";
    const user = useSelector(state=>state.user.user);
    const me = useSelector(state=>state.user.me);
    const [cdos, setCdOS] = useState('');
    const [resp, setResp] = useState('0');
    const [users, setUsers] = useState([]);
    const [os, setOs] = useState([]);

    useEffect(() => {
        async function loadOS() {
            try {
                const res = await api.get(`/to_trans_os/${user.multi_oficina}/${me}`);
                if (res.data) {
                    setOs(res.data.rows);
                }
            } catch(err) {
                toast.error('Ops, aconteceu alguma coisa, faça login novamente');
                console.tron.log(err);
            }
        }
        async function selectFunc() {
            try {
                const res = await api.get(`/select_user_to_rec/${user.cd_oficina}/${me}`);
                if (res.data) {
                    setUsers(res.data.rows);
                }
            } catch(err) {
                toast.error('Ops, aconteceu alguma coisa, faça login novamente');
                console.tron.log(err);
            }
        }
        
        loadOS();
        selectFunc();
    }, [me, user.cd_oficina, user.multi_oficina]);

    async function loadOS() {
        try {
            const res = await api.get(`/to_trans_os/${user.multi_oficina}/${me}`);
            if (res.data) {
                setOs(res.data.rows);
            }
        } catch(err) {
            toast.error('Ops, aconteceu alguma coisa, faça login novamente');
            console.tron.log(err);
        }
    }

    async function handlerTrans() {
        try {
            await api.get(`/trans_os/${resp}/${cdos}`);
            
            toast.success('Transferência realizado com sucesso');

            setTimeout(()=>{
                loadOS();
            }, 1000);
        } catch(err) {
            toast.error('Ops, aconteceu alguma coisa, faça login novamente');
            console.tron.log(err);
        }
    }
    
    function handlerSelect(srv) {
        setCdOS(srv.CD);
        setResp(srv.RESP);
    }
    return (
        <Container direction="column" w="100%" h="100%">
            <h1>TRANSFÊRENCIA DE O.S.</h1>
            <CardBlock w="100%" overflow="auto">
                <Container direction="column" w="100%" h="100%" pad="15px">
                    <Form>
                        <Wrapper w="100%">
                            <Input disabled marginLeft="true" borderless="true"
                                placeholder="CÓDIGO"
                                value={cdos}
                                onChange={e=>setCdOS(e.target.value)}
                            />
                            <Select borderless="true" bold="true" marginLeft="true"
                                    value={resp}
                                    onChange={e=>setResp(e.target.value)}>
                                    <option value={'0'}>SELECIONE UM USUÁRIO</option>
                                {
                                    users.map(usr=>(
                                        <option key={usr.cd} value={usr.cd}>{usr.cd}</option>
                                    ))
                                }
                            </Select>
                            <ButtonDefault tp="action"  onClick={handlerTrans}>
                                <FaCheck />
                                <span>Transferir</span>
                            </ButtonDefault>
                        </Wrapper>             
                    </Form>
                <Table titleAlign="left" fontSize="12px" lastRowAlign="left" textAlign="left">
                    <thead>
                        <tr>
                            <th>Cód.</th>
                            <th>DATA</th>
                            <th>DESCRIÇÃO</th>
                            <th>RESPONSÁVEL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            os ? os.map(srv=>(
                                <tr key={srv.CD} onClick={e=>handlerSelect(srv)}>
                                    <td>{srv.CD}</td>
                                    <td>{srv.DATA}</td>
                                    <td>{srv.DESCR}</td>
                                    <td>{srv.RESP}</td>
                                </tr>
                            )) : null
                        }
                    </tbody>
                </Table>
              </Container>
            </CardBlock>
        </Container>
    );
}