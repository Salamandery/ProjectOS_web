import React, {
    useEffect,
    useState
} from 'react';
import {
    useSelector
} from 'react-redux';
import api from '../../Services/api';
import {
    Container,
    Table,
    CardBlock
} from '../../Style';

export default function PnlOs() {
    document.title = "INTRANET - PAINEL O.S.";

    const user = useSelector(state=>state.user.user);
    const me = useSelector(state=>state.user.me);
    
    const [os, setOs] = useState([]);

    useEffect(() => {
        async function loadOS() {
            try {
                const res = await api.get(`/push_tb_os/${user.multi_oficina}/${me}/${user.cd_oficina}`);

                if (res.data) {
                    setOs(res.data.rows);
                }
            } catch(err) {
                console.log(err);
            }
        }
        loadOS();
        setInterval(()=>{
            loadOS();
        }, 60000);
    }, []);
    return (
        <Container direction="column" w="100%" h="100%">
            <h1>PAINEL DE O.S.</h1>
            <CardBlock w="100%" h="100%" overflow="auto">
                <Table titleAlign="left" fontSize="12px" lastRowAlign="left" textColor="#000" textAlign="left">
                    <thead>
                        <tr>
                            <th>Cód.</th>
                            <th>DATA</th>
                            <th>DESCRIÇÃO</th>
                            <th>SOLICITANTE</th>
                            <th>SETOR</th>
                            <th>RESPONSÁVEL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            os ? os.map(srv=>(
                                <tr key={srv.CD}>
                                    <td>{srv.CD}</td>
                                    <td>{srv.DATA}</td>
                                    <td>{srv.DS}</td>
                                    <td>{srv.SOL}</td>
                                    <td>{srv.SETOR}</td>
                                    <td>{srv.RES}</td>
                                </tr>
                            )) : null
                        }
                    </tbody>
                </Table>
            </CardBlock>
        </Container>
    );
}