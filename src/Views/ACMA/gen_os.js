import React, {
    useEffect,
    useState
} from 'react';
import history from '../../Services/history';
import {
    FaCheck,
    FaPause,
    FaPlay,
    FaPen
} from 'react-icons/fa';
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
    Input,
} from '../../Style';

export default function GenOs() {
    document.title = "INTRANET - MINHAS O.S.";

    const user = useSelector(state=>state.user.user);
    const me = useSelector(state=>state.user.me);

    const [os, setOs] = useState([]);
    const [base, setBase] = useState([]);

    useEffect(() => {
        async function loadOS() {
            try {
                const res = await api.get(`/tb_minhas_os/${user.cd_usuario}/${user.multi_oficina}/${me}`);
                if (res.data) {
                    setOs(res.data.rows);
                    setBase(res.data.rows);
                }
            } catch(err) {
                toast.error('Ops, aconteceu alguma coisa, faça login novamente');
                console.log(err);
            }
        }
        loadOS();
    }, [me, user.cd_usuario, user.multi_oficina]);
    
    async function loadOS() {
        try {
            const res = await api.get(`/tb_minhas_os/${user.cd_usuario}/${user.multi_oficina}/${me}`);
            if (res.data) {
                setOs(res.data.rows);
            }
        } catch(err) {
            toast.error('Ops, aconteceu alguma coisa, faça login novamente');
            console.log(err);
        }
    }
    function handlerEdit(item) {
        history.push('/edit_os', item);
    }
    async function handlerAtend(item) {
        await api.get(`/set_atend_os/${item.CDI}/${item.CD}/${user.cd_usuario}/${user.cd_oficina}`);
        toast.success('Serviço iniciado com sucesso');
        setTimeout(()=>{
            loadOS();
        }, 1000);
    }
    function typeSearch(type, text) {
        let items = os;
        let filteredName;
        switch(type) {
            default: 
                filteredName = items.filter((item) => {
                    return item.ds_servico.toLowerCase().match(text);
                });
            break;
        }
        
        if (!text || text === '') {
            setOs(base);
        } else if (!Array.isArray(filteredName) && !filteredName.length) {
            setOs(filteredName);
        } else if (Array.isArray(filteredName)) {
            setOs(filteredName);
        } 
    }
    function searchText(e) {
        let text = e.toLowerCase();
        typeSearch('', text);
    }
    return (
        <Container direction="column" w="100%" h="100%">
            <h1>MINHAS O.S.</h1>
            <Input placeholder="PESQUISA POR DESCRIÇÃO" onChange={e=>searchText(e.target.value)} />
            <CardBlock w="100%" h="100%" overflow="auto">
                <Table titleAlign="left" textAlign="left" fontSize="14px">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Cód.</th>
                            <th>DATA</th>
                            <th>DESCRIÇÃO</th>
                            <th>SOLICITANTE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            os ? os.map(srv=>(
                                <tr key={srv.CD}>
                                    <td>
                                        {
                                            srv.TP === "CONCLUIDO" ? 
                                            <> 
                                                <ButtonDefault size="small" tp="success">
                                                    <FaCheck />
                                                </ButtonDefault>
                                                <ButtonDefault size="small" tp="action" onClick={e=>handlerEdit(srv)}>
                                                    <FaPen />
                                                </ButtonDefault>
                                            </> : 
                                            (
                                                srv.CDI ?
                                                <> 
                                                    <ButtonDefault size="small" tp="warn" onClick={e=>handlerEdit(srv)}>
                                                        <FaPause />
                                                    </ButtonDefault>
                                                    <ButtonDefault size="small">
                                                        <FaPen />
                                                    </ButtonDefault>
                                                </>
                                                :
                                                <> 
                                                    <ButtonDefault size="small" tp="action" onClick={e=>handlerAtend(srv)}>
                                                        <FaPlay />
                                                    </ButtonDefault>
                                                    <ButtonDefault onClick={e=>handlerEdit(srv)} size="small" tp="success">
                                                        <FaPen />
                                                    </ButtonDefault>
                                                </>
                                            )
                                        }
                                    </td>
                                    <td>{srv.CD}</td>
                                    <td>{srv.DATA}</td>
                                    <td>{srv.DESCR}</td>
                                    <td>{srv.SOL}</td>
                                </tr>
                            )) : null
                        }
                    </tbody>
                </Table>
            </CardBlock>
        </Container>
    );
}