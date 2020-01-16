import React, {
    useEffect,
    useState
} from 'react';
import {
    useSelector
} from 'react-redux';
import {
    FaPlus,
} from 'react-icons/fa';
import api from '../../Services/api';
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
} from '../../Style';

export default function SolOs() {
    document.title = "INTRANET - SOLICITAÇÃO";
    const user = useSelector(state=>state.user);

    const [cd, setCd] = useState('');
    const [desc, setDesc] = useState('');
    const [resp, setResp] = useState('S');
    const [ofi, setOfi] = useState(0);
    const [setor, setSetor] = useState(0);
    const [localidade, setLocalidade] = useState(0);
    const [of, setOf] = useState([]);
    const [set, setSet] = useState([]);
    const [loc, setLoc] = useState([]);
    const [os, setOs] = useState([]);

    useEffect(() => {
        async function loadInfoOs() {
            try {
                const res = await api.get(`/push_sol_os_tb/${user.user.cd_usuario}`);
                if (res.data) {
                    setOs(res.data.rows);
                }
            } catch(err) {
                toast.error('Ops, aconteceu alguma coisa de errado');
                console.log(err);
            }
        }

        async function loadOficina() {
            try {
                const res = await api.get(`/select_to_oficina/${user.me}`);
                setOf(res.data.rows);
            } catch (err) {
                toast.error('Ops, aconteceu alguma coisa de errado');
                console.log(err);
            }
        }

        async function loadSetor() {
            try {
                const res = await api.get(`/select_to_setor/${user.me}`);
                setSet(res.data.rows);
            } catch (err) {
                toast.error('Ops, aconteceu alguma coisa de errado');
                console.log(err);
            }
        }

        loadInfoOs();
        loadOficina();
        loadSetor();
    }, [user.me, user.user.cd_usuario]);

    useEffect(() => {
        async function loadLocalidade() {
            try {
                const res = await api.get(`/select_to_localidade/${setor}`);
                setLoc(res.data.rows);
            } catch (err) {
                toast.error('Ops, aconteceu alguma coisa de errado');
                console.log(err);
            }
        }
        loadLocalidade();
    }, [setor]);

    async function loadInfoOs() {
        try {
            const res = await api.get(`/push_sol_os_tb/${user.user.cd_usuario}`);
            if (res.data) {
                setOs(res.data.rows);
            }
        } catch(err) {
            toast.error('Ops, aconteceu alguma coisa de errado');
            console.log(err);
        }
    }

    async function handlerInsert() {
        try {
            await api.post(`/cria_os_to_resp/${user.user.cd_usuario}`, {
                solic: user.user.cd_usuario,
                emp: user.me,
                of: ofi,
                st: setor,
                loc: localidade,
                ds: desc,
                ifresp: resp
            });

            toast.success('Ordem de Serviço cadastrada com sucesso');
            setTimeout(()=>{
                loadInfoOs();
            }, 1000);
        } catch(err) {
            toast.info('Preencha os campos corretamente');
            console.log(err);
        }
    }

    return (
        <Container direction="column" w="100%">
            <Wrapper w="100%" content="space-between">
                <h1>SOLICITAÇÃO DE O.S.</h1>
                <ButtonDefault size="md" tp="action" onClick={handlerInsert}>
                    <FaPlus />
                    <span>Novo Serviço</span>
                </ButtonDefault>
            </Wrapper>
            <CardBlock w="100%" overflow="auto">
                <Container w="100%" direction="column" pad="15px">
                    <Form>
                        <Wrapper w="100%">
                            <Wrapper w="100%">
                                <Input borderless="true" bold="true" marginLeft="true"
                                       placeholder="CÓDIGO" 
                                       value={cd} 
                                       onChange={e=>setCd(e.target.value)} 
                                       w="10%" 
                                       disabled />
                                <Select borderless="true" bold="true" marginLeft="true"
                                        value={ofi}
                                        onChange={e=>setOfi(e.target.value)}>
                                        <option value={0}>SELECIONE UMA OFICINA</option>
                                    {
                                        of.map(oficina=>(
                                            <option key={oficina.CD} value={oficina.CD}>{oficina.DS}</option>
                                        ))
                                    }
                                </Select>
                                <Select borderless="true" bold="true" marginLeft="true"
                                        value={setor}
                                        onChange={e=>setSetor(e.target.value)}>
                                        <option value={0}>SELECIONE UM SETOR</option>
                                    {
                                        set.map(seto=>(
                                            <option key={seto.CD} value={seto.CD}>{seto.DS}</option>
                                        ))
                                    }
                                </Select>
                                <Select borderless="true" bold="true" marginLeft="true"
                                        value={localidade}
                                        onChange={e=>setLocalidade(e.target.value)}>
                                        <option value={0}>SELECIONE UM SETOR</option>
                                    {
                                        loc.map(lo=>(
                                            <option key={lo.CD} value={lo.CD}>{lo.DS}</option>
                                        ))
                                    }
                                </Select>
                                <Wrapper>
                                    <Input type="checkbox"
                                            checked={resp === "S" ? true : false}
                                            onChange={e=>setResp(e.target.checked === true ? "S" : "N")}
                                            marginLeft="true"
                                    />
                                    <span>É o responsável ?</span>
                                </Wrapper>
                                <Input borderless="true" bold="true" 
                                       placeholder="DESCRIÇÃO DA SOLICITAÇÃO" 
                                       value={desc} 
                                       onChange={e=>setDesc(e.target.value)}
                                       w="100%"  />
                            </Wrapper>
                        </Wrapper>
                    </Form>
                    <Table titleAlign="center" fontSize="14px">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Cód.</th>
                                <th>DATA</th>
                                <th>Descrição</th>
                                <th>Respolsável</th>
                                <th>Situação</th>
                                <th>Empresa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                os ? os.map((srvi, idx)=>(
                                    <tr key={idx}>
                                        <td></td>
                                        <td>{srvi.CD}</td>
                                        <td>{srvi.DATA}</td>
                                        <td>{srvi.DESCR}</td>
                                        <td>{srvi.RES}</td>
                                        <td>{srvi.TP}</td>
                                        <td>{srvi.EMP}</td>
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