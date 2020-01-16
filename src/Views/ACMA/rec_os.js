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
    
    //const company = useSelector(state=>state.user.company);
    const [services, setServices] = useState([]);

    useEffect(() => {
        loadServices();
    }, []);

    async function loadServices() {
        try {
            const res = await api.get(`/schedules/`);
            if (res.data) {
                setServices(res.data);
                console.log(res.data)
            }
        } catch(err) {
            toast.error('Ops, aconteceu alguma coisa, faça login novamente');
            console.log(err);
        }
    }

    async function handlerRec(srv) {
        try {
            await api.post(`/to_rec_os`, {
                provider: true,
            });
            
            toast.success('Recebimento realizado com sucesso');

            setTimeout(()=>{
                loadServices();
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
                            <th>CÓD.</th>
                            <th>DATA</th>
                            <th>SOLICITANTE</th>
                            <th>TÍTULO</th>
                            <th>SETOR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            services ? services.map(srv=>(
                                <tr key={srv.id}>
                                    <td>
                                        <ButtonDefault tp="success"  onClick={e=>handlerRec(srv)}>
                                            <FaCheck />
                                        </ButtonDefault>
                                    </td>
                                    <td>{srv.id}</td>
                                    <td>{srv.date}</td>
                                    <td>{srv.user_id}</td>
                                    <td>{srv.title}</td>
                                    <td>{srv.location_id}</td>
                                </tr>
                            )) : null
                        }
                    </tbody>
                </Table>
            </CardBlock>
        </Container>
    );
}