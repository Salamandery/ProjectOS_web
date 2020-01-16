import React, {
    useEffect,
    useState
} from 'react';
import { toast } from 'react-toastify';
import api from '../../Services/api';
import {
    Container,
    Table,
    CardBlock,
    ButtonDefault,
    Wrapper,
    Input,
    Form,
    Select,
} from '../../Style';
import Modal from '../../Components/ModalController';
import { FaCheck, FaCogs } from 'react-icons/fa';

export default function GenMod() {
    document.title = "INTRANET - MODULOS";

    const [handlerModal, setHandlerModal] = useState(false);
    const [cd_mod, setCdMod] = useState('');
    const [cd_papel_mod, setCdPapelMod] = useState('');
    const [cd_mod_papel, setCdModPapel] = useState('');
    const [ds_mod, setDs] = useState('');
    const [label, setLabel] = useState('');
    const [sn_ativo, setSN] = useState('S');
    const [modulo, setModulo] = useState([]);
    const [papel, setPapel] = useState([]);
    const [mod_papel, setModPapel] = useState([]);

    useEffect(() => {
        async function loadMod() {
            try {
                const res = await api.get(`/push_gen_mod/`);
                if (res.data) {
                    setModulo(res.data.rows);
                }
            } catch(err) {
                toast.error('Ops, aconteceu alguma coisa, faça login novamente');
                console.log(err);
            }
        }
        async function loadModPapel() {
            try {
                const res = await api.get(`/push_mod_papel/`);
                if (res.data) {
                    setModPapel(res.data.rows);
                }
            } catch(err) {
                toast.error('Ops, aconteceu alguma coisa, faça login novamente');
                console.log(err);
            }
        }
        async function loadPapel() {
            try {
                const res = await api.get(`/get_papel_to_select`);
                if (res.data) {
                    setPapel(res.data.rows);
                }
            } catch(err) {
                toast.error('Ops, aconteceu alguma coisa, faça login novamente');
                console.log(err);
            }
        }
        loadModPapel();
        loadPapel();
        loadMod();
    }, []);

    async function loadMod() {
        try {
            const res = await api.get(`/push_gen_mod/`);
            if (res.data) {
                setModulo(res.data.rows);
            }
        } catch(err) {
            toast.error('Ops, aconteceu alguma coisa, faça login novamente');
            console.log(err);
        }
    }
    async function loadModPapel() {
        try {
            const res = await api.get(`/push_mod_papel/`);
            if (res.data) {
                setModPapel(res.data.rows);
            }
        } catch(err) {
            toast.error('Ops, aconteceu alguma coisa, faça login novamente');
            console.log(err);
        }
    }
    async function handlerInsert() {
        try {
            await api.post(`/ins_mod`, {
                cd: cd_mod,
                ds: ds_mod,
                label: label,
                ativo: sn_ativo,
            });
            
            toast.success('Recebimento realizado com sucesso');

            setTimeout(()=>{
                loadMod();
            }, 1000);
        } catch(err) {
            toast.error('Ops, aconteceu alguma coisa, faça login novamente');
            console.log(err);
        }
    }
    async function handlerInsertMod() {
        try {
            await api.post(`/ins_mod_papel`, {
                papel: cd_papel_mod,
                mod: cd_mod_papel,
            });
            
            toast.success('Recebimento realizado com sucesso');

            setTimeout(()=>{
                loadModPapel();
            }, 1000);
        } catch(err) {
            toast.error('Ops, aconteceu alguma coisa, faça login novamente');
            console.log(err);
        }
    }
    function handlerSet(item) {
        setCdMod(item.cd_modulo || "");
        setDs(item.nm_modulo || "");
        setLabel(item.label || "");
        setSN(item.sn_ativo || "S");
    }
    function handlerRequestModal() {
        setHandlerModal(!handlerModal);
    }
    return (
        <Container direction="column" w="100%" h="100%">
            <h1>GERENCIAMENTO DE MÓDULOS</h1>
            <CardBlock w="100%" h="100%" overflow="auto">
                <Container direction="column" w="100%" h="100%" pad="15px">
                    <Form>
                        <Wrapper w="100%">
                            <Wrapper w="70%">
                                <Input disabled marginLeft="true" borderless="true"
                                    w="10%"
                                    placeholder="CÓDIGO"
                                    value={cd_mod}
                                    onChange={e=>setCdMod(e.target.value)}
                                />
                                <Input disable marginLeft="true" borderless="true"
                                    w="45%"
                                    placeholder="LABEL"
                                    value={label}
                                    onChange={e=>setLabel(e.target.value)}
                                />
                            </Wrapper>
                            <Wrapper w="55%">
                               <Input marginLeft="true" borderless="true"
                                    w="100%"
                                    placeholder="DESCRIÇÃO"
                                    value={ds_mod}
                                    onChange={e=>setDs(e.target.value)}
                                />
                            </Wrapper>
                            <Wrapper>
                                <Input type="checkbox"
                                        checked={sn_ativo === "S" ? true : false}
                                        onChange={e=>setSN(e.target.checked === true ? "S" : "N")}
                                />
                                <span>Ativo ?</span>
                            </Wrapper>
                            {
                                cd_mod ? 
                                    <ButtonDefault tp="action"  onClick={handlerInsert}>
                                        <FaCheck />
                                        <span>Atualizar</span>
                                    </ButtonDefault> : 
                                    <ButtonDefault tp="action"  onClick={handlerInsert}>
                                        <FaCheck />
                                        <span>Cadastrar</span>
                                    </ButtonDefault>
                            }
                            <ButtonDefault tp="action" onClick={handlerRequestModal}>
                                <FaCogs />
                                <span>Configurar</span>
                            </ButtonDefault>
                        </Wrapper>             
                    </Form>
                    <Table titleAlign="center" fontSize="12px" lastRowAlign="center">
                        <thead>
                            <tr>
                                <th>Cód.</th>
                                <th>DESCRIÇÃO</th>
                                <th>LABEL</th>
                                <th>S/N ATIVO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                modulo ? modulo.map(srv=>(
                                    <tr key={srv.cd_modulo} onClick={e=>handlerSet(srv)}>
                                        <td>{srv.cd_modulo}</td>
                                        <td>{srv.nm_modulo}</td>
                                        <td>{srv.label}</td>
                                        <td>{srv.sn_ativo === "S" ? "SIM" : "NÃO"}</td>
                                    </tr>
                                )) : null
                            }
                        </tbody>
                    </Table>
                </Container>
            </CardBlock>
            { handlerModal ? 
            <Modal onHandler={handlerRequestModal} size="90%" h="true">
                <Container w="100%" direction="column" h="100%">
                    <h1>MÓDULOS / PAPÉIS</h1><br />
                    <Wrapper w="100%">
                        <Select marginLeft="true" defaultValue={cd_mod_papel} onChange={e=>setCdModPapel(e.target.value)}>
                            <option>SELECIONE UM MÓDULO</option>
                            {
                                modulo ? modulo.map((srv, idx)=>(
                                    <option key={idx} value={srv.cd_modulo}>
                                        {srv.label}
                                    </option>
                                )) : null 
                            }
                        </Select>
                        <Select defaultValue={cd_papel_mod} onChange={e=>setCdPapelMod(e.target.value)}>
                            <option>SELECIONE UM PAPEL</option>
                            {
                                papel ? papel.map((srv, idx)=>(
                                    <option key={idx} value={srv.cd_papel}>
                                        {srv.ds_papel}
                                    </option>
                                )) : null 
                            }
                        </Select>
                        <ButtonDefault tp="action"  onClick={handlerInsertMod}>
                            <FaCheck />
                            <span>Cadastrar</span>
                        </ButtonDefault>
                    </Wrapper>
                    <CardBlock w="100%" overflow="auto">
                        <Container direction="column" w="100%">
                            <Table titleAlign="center" fontSize="14px" lastRowAlign="center">
                                <thead>
                                    <tr>
                                        <th>Cód.</th>
                                        <th>Form</th>
                                        <th>Cód.</th>
                                        <th>Módulo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        mod_papel ? mod_papel.map((pe, idx)=>(
                                            <tr key={idx}>
                                                <td>{pe.cd_modulo}</td>
                                                <td>{pe.label}</td>
                                                <td>{pe.cd_papel}</td>
                                                <td>{pe.ds_papel}</td>
                                            </tr>
                                        )) : null
                                    }
                                </tbody>
                            </Table>        
                        </Container>        
                    </CardBlock>
                </Container>
            </Modal>
            : null
            }
        </Container>
    );
}