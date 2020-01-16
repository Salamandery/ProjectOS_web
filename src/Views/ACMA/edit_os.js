import React, {
    useEffect,
    useState
} from 'react';
import {
    useSelector
} from 'react-redux';
import {
    MdArrowBack,
} from 'react-icons/md';
import {
    FaPen, FaPlus, FaCheck
} from 'react-icons/fa';
import api from '../../Services/api';
import history from '../../Services/history';
import { toast } from 'react-toastify';
import {
    Container,
    Table,
    CardBlock,
    ButtonDefault,
    Form,
    Input,
    Select,
    Wrapper,
    MaskInput
} from '../../Style';

export default function EditOs() {
    document.title = "INTRANET - ORDEM DE SERVIÇO";
    
    const user = useSelector(state=>state.user.user);

    const srv = history.location.state;
    const [cdi, setCdi] = useState('');
    const [data, setData] = useState('');
    const [desc, setDesc] = useState('');
    const [descServ, setDescServ] = useState('');
    const [dSServ, setDSServ] = useState('');
    const [func, setFunc] = useState([]);
    const [serv, setServ] = useState([]);
    const [cdserv, setCdserv] = useState(0);
    const [cdfunc, setCdfunc] = useState(0);
    const [dti, setDti] = useState('');
    const [hri, setHri] = useState('');
    const [dtf, setDtf] = useState('');
    const [hrf, setHrf] = useState('');
    const [os, setOs] = useState([]);

    useEffect(() => {
        async function loadInfoOs() {
            try {
                const res = await api.get(`/push_servicos_os/${srv.CD}`);
                if (res.data) {
                    setOs(res.data.rows);
                    setData(srv.DATA || '');
                    setDesc(srv.DESCR || '');
                    setDescServ(srv.DS_SERV || '');
                }
            } catch(err) {
                toast.error('Ops, aconteceu alguma coisa, faça login novamente');
                console.log(err);
            }
        }
        
        async function selectFunc() {
            try {
                const res = await api.get(`/push_select_func/${user.cd_oficina}`);
                setFunc(res.data.rows);
            } catch(err) {
                toast.error('Ops, aconteceu alguma coisa, faça login novamente');
                console.log(err);
            }
        }
        async function selectServico() {
            try {
                const res = await api.get(`/push_select_servico/${user.cd_oficina}`);
                setServ(res.data.rows);
            } catch(err) {
                toast.error('Ops, aconteceu alguma coisa, faça login novamente');
                console.log(err);
            }
        }
        loadInfoOs();
        selectFunc();
        selectServico();
    }, [user.cd_oficina, srv.CD, srv.DATA, srv.DESCR, srv.DS_SERV]);

    async function checaCampos() {
        if (cdfunc === 0) {
            await toast.info('Selecione um funcionário');
            return false;
        } 
        if (cdserv === 0) {
            await toast.info('Selecione um serviço');
            return false;
        } 
        if (hrf === '') {
            await toast.info('O campo hora final deve ser preenchido');
            return false;
        } 
        if (dtf === '') {
            await toast.info('O campo data final deve ser preenchido');
            return false;
        }

        return true;
    }
    async function loadInfoOs() {
        try {
            const res = await api.get(`/push_servicos_os/${srv.CD}`);
            if (res.data) {
                setOs(res.data.rows);
                setData(srv.DATA || '');
                setDesc(srv.DESCR || '');
                setDescServ(srv.DS_SERV || '');
            }
        } catch(err) {
            toast.error('Ops, aconteceu alguma coisa, faça login novamente');
            console.log(err);
        }
    }

    async function handlerUpdate() {
        const check = await checaCampos();

        if (check) {
            try {
                await api.post(`/set_srv_update`, {
                    cdi,
                    dti,
                    dtf,
                    hri,
                    hrf,
                    cd_func: cdfunc,
                    cd_serv: cdserv,
                    ds_serv: dSServ,
                });

                toast.success('Ordem de Serviço atualizada com sucesso');
                setTimeout(()=>{
                    loadInfoOs();
                }, 1000);
            } catch(err) {
                toast.error('Ops, aconteceu alguma coisa, faça login novamente');
                console.log(err);
            }
        }
    }
    async function handlerInsert() {
        try {
            await api.post(`/set_srv_insert`, {
                cd_os: srv.CD,
                dti,
                dtf,
                hri,
                hrf,
                cd_func: cdfunc,
                cd_serv: cdserv,
                ds_serv: dSServ,
            });

            toast.success('Ordem de Serviço cadastrada com sucesso');
            setTimeout(()=>{
                loadInfoOs();
            }, 1000);
        } catch(err) {
            toast.error('Ops, aconteceu alguma coisa, faça login novamente');
            console.log(err);
        }
    }
    async function handlerFinaliza() {
        try {
            await api.post(`/set_os_concluido`,{
                os: srv.CD,
                ds_serv: descServ
            });

            toast.success('Ordem de Serviço finalizada com sucesso');

            setTimeout(()=>{
                history.push('/gen_os');
            }, 1000);

        } catch(err) {
            toast.error('Ops, aconteceu alguma coisa, faça login novamente');
            console.log(err);
        }
    }
    function handlerBack() {
        history.goBack();
    }
    function getNowDate() {
        return `${new Date().getDate().toString()}/${parseInt(new Date().getMonth()+1).toString()}/${new Date().getFullYear().toString()}`;
    }
    function getNowHour() {
        let min = new Date().getMinutes();
        let hour = new Date().getHours();

        if (min < 10) {
            min = "0"+min;
        }
        if (hour < 10) {
            hour = "0"+hour;
        }
        return `${hour}:${min}`;
    }
    async function handlerSelect(item) {
        setCdi(item.CDI || '');
        setDSServ(item.DSSERV || '');
        setCdserv(item.CD_SERVICO || 0);
        setCdfunc(item.CD_FUNC || 0);
        setDti(item.DTI || '');
        setHri(item.HRI || '');
        setDtf(item.DTF || getNowDate());
        setHrf(item.HRF || getNowHour());
    }
    return (
        <Container direction="column" w="100%">
            <Wrapper w="65%" content="space-between">
                <ButtonDefault onClick={handlerBack} tp="action">
                    <MdArrowBack />
                </ButtonDefault>
                <h1>O.S.: {srv.CD} - {srv.SOL}</h1>
            </Wrapper>
            <CardBlock w="100%" overflow="auto">
                <Container w="100%" direction="column" pad="15px">
                    <Form>
                        <Wrapper w="100%">
                            <Wrapper w="100%">
                                <Input borderless="true" bold="true" marginLeft="true"
                                       placeholder="CÓDIGO" 
                                       value={cdi} 
                                       onChange={e=>setCdi(e.target.value)} 
                                       w="10%" 
                                       disabled />
                                <Input borderless="true" bold="true" marginLeft="true"
                                       placeholder="DATA" 
                                       value={data} 
                                       onChange={e=>setData(e.target.value)} 
                                       w="15%" 
                                       disabled />
                                <Select borderless="true" bold="true" marginLeft="true"
                                        value={cdfunc}
                                        onChange={e=>setCdfunc(e.target.value)}>
                                        <option value={0}>SELECIONE UM FUNCIONÁRIO</option>
                                    {
                                        func.map(fun=>(
                                            <option key={fun.CD_FUNC} value={fun.CD_FUNC}>{fun.NM_FUNC}</option>
                                        ))
                                    }
                                </Select>
                                <Select borderless="true" bold="true" marginLeft="true"
                                        value={cdserv}
                                        onChange={e=>setCdserv(e.target.value)}>
                                        <option value={0}>SELECIONE UM SERVIÇO</option>
                                    {
                                        serv.map(srv=>(
                                            <option key={srv.CD_SERVICO} value={srv.CD_SERVICO}>{srv.NM_SERVICO}</option>
                                        ))
                                    }
                                </Select>
                                <Input borderless="true" bold="true" 
                                       placeholder="DESCRIÇÃO DA SOLICITAÇÃO" 
                                       value={desc} 
                                       onChange={e=>setDesc(e.target.value)}
                                       w="100%" 
                                       disabled />
                                
                            </Wrapper>
                            <Wrapper w="100%">
                                <Input borderless="true" bold="true"
                                    placeholder="DESCRIÇÃO DO SERVIÇO GERAL" 
                                    value={descServ} 
                                    onChange={e=>setDescServ(e.target.value)} 
                                    w="100%" />
                            </Wrapper>
                            <Wrapper w="100%">
                                <MaskInput borderless="true" bold="true" marginLeft="true"   
                                    placeholder="DATA INICIAL"
                                    mask={[ /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                    value={dti}
                                    onChange={e=>setDti(e.target.value)}
                                    w="23%" />
                                <MaskInput borderless="true" bold="true" marginLeft="true"   
                                    placeholder="HORA INICIAL"
                                    mask={[ /\d/, /\d/, ':', /\d/, /\d/]}
                                    value={hri}
                                    onChange={e=>setHri(e.target.value)}
                                    w="23%" />
                                <MaskInput borderless="true" bold="true" marginLeft="true"   
                                    placeholder="DATA FINAL"
                                    mask={[ /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                    value={dtf}
                                    onChange={e=>setDtf(e.target.value)}
                                    w="23%" />
                                <MaskInput borderless="true" bold="true"  
                                    placeholder="HORA FINAL"
                                    mask={[ /\d/, /\d/, ':', /\d/, /\d/]}
                                    value={hrf}
                                    onChange={e=>setHrf(e.target.value)}
                                    w="23%" />
                            </Wrapper>
                            <Wrapper w="100%">
                                <Input borderless="true" bold="true" marginLeft="true"
                                   placeholder="DESCRIÇÃO DO SERVIÇO REALIZADO" 
                                   value={dSServ} 
                                   onChange={e=>setDSServ(e.target.value)} 
                                   w="40%" />
                                {  cdi ?                          
                                    <ButtonDefault size="md" tp={srv.TP === 'CONCLUIDO' ? "" : "action"} onClick={handlerUpdate}>
                                        <FaPen />
                                        <span>Atualizar Serviço</span>
                                    </ButtonDefault> :
                                    <ButtonDefault size="md" tp={srv.TP === 'CONCLUIDO' ? "" : "action"} onClick={handlerInsert}>
                                        <FaPlus />
                                        <span>Novo Serviço</span>
                                    </ButtonDefault>
                                }
                                <ButtonDefault size="md" tp="warn" onClick={handlerFinaliza}>
                                    <FaCheck />
                                    <span>Finalizar</span>
                                </ButtonDefault>
                            </Wrapper>
                        </Wrapper>
                    </Form>
                    <Table titleAlign="center" fontSize="14px">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Cód.</th>
                                <th>DATA INICIAL</th>
                                <th>HORA INICIAL</th>
                                <th>DATA FINAL</th>
                                <th>HORA FINAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                os ? os.map((srvi, idx)=>(
                                    <tr key={idx} onClick={e=>handlerSelect(srvi)}>
                                        <td></td>
                                        <td>{srvi.CDI}</td>
                                        <td>{srvi.DTI}</td>
                                        <td>{srvi.HRI}</td>
                                        <td>{srvi.DTF}</td>
                                        <td>{srvi.HRF}</td>
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