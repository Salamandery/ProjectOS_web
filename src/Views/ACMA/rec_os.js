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
    ButtonDefault
} from '../../Style';
import { FaCheck } from 'react-icons/fa';

export default function RecOs() {
    document.title = "INTRANET - RECEBIMENTO";
    const user = useSelector(state=>state.user.user);
    const me = useSelector(state=>state.user.me);
    const [os, setOs] = useState([]);

    useEffect(() => {
        loadOS();
    }, []);

    async function loadOS() {
        try {
            const res = await api.get(`/push_to_rec_os/${user.multi_oficina}/${me}`);
            if (res.data) {
                setOs(res.data.rows);
                console.log(res.data.rows)
            }
        } catch(err) {
            toast.error('Ops, aconteceu alguma coisa, faça login novamente');
            console.log(err);
        }
    }

    async function handlerRec(srv) {
        try {
            await api.post(`/to_rec_os`, {
                resp: user.cd_usuario,
                os: srv.CD
            });
            
            toast.success('Recebimento realizado com sucesso');

            setTimeout(()=>{
                loadOS();
            }, 1000);
        } catch(err) {
            toast.error('Ops, aconteceu alguma coisa, faça login novamente');
            console.log(err);
        }
    }
    
    return (
        <Container direction="column" w="100%" h="100%">
            <h1>RECEBIMENTO DE O.S.</h1>
            <CardBlock w="100%" h="100%" overflow="auto">
                <Table titleAlign="left" fontSize="12px" lastRowAlign="left" textAlign="left">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Cód.</th>
                            <th>DATA</th>
                            <th>SOLICITANTE</th>
                            <th>DESCRIÇÃO</th>
                            <th>SETOR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            os ? os.map(srv=>(
                                <tr key={srv.CD}>
                                    <td>
                                        <ButtonDefault tp="success"  onClick={e=>handlerRec(srv)}>
                                            <FaCheck />
                                        </ButtonDefault>
                                    </td>
                                    <td>{srv.CD}</td>
                                    <td>{srv.DATA}</td>
                                    <td>{srv.SOL}</td>
                                    <td>{srv.DESCR}</td>
                                    <td>{srv.SETOR}</td>
                                </tr>
                            )) : null
                        }
                    </tbody>
                </Table>
            </CardBlock>
        </Container>
    );
}