import React, {
    useEffect,
    useState
} from 'react';
import { toast } from 'react-toastify';
import api from '../../Services/api';
import Modal from '../../Components/ModalController';
import {
    Container,
    Table,
    CardBlock,
    ButtonDefault,
    Form,
    Wrapper,
    Input,
    Select,
} from '../../Style';
import { FaCheck, FaCogs } from 'react-icons/fa';

export default function GenForm() {
    document.title = "INTRANET - FORMS";

    const [handlerModal, setHandlerModal] = useState(false);
    const [cd_form, setCdForm] = useState('');
    const [cd_mod_form, setCdModForm] = useState('');
    const [cd_form_mod, setCdFormMod] = useState('');
    const [ds_form, setDs] = useState('');
    const [sn_ativo, setSN] = useState('S');
    const [ordem, setOrdem] = useState('');
    const [path, setPath] = useState('');
    const [form, setForm] = useState([]);
    const [mod, setMod] = useState([]);
    const [form_mod, setFormMod] = useState([]);

    useEffect(() => {
        async function loadForm() {
            try {
                const res = await api.get(`/push_gen_form`);
                if (res.data) {
                    setForm(res.data.rows);
                }
            } catch(err) {
                toast.error('Ops, aconteceu alguma coisa, faça login novamente');
                console.log(err);
            }
        }
        async function loadMod() {
            try {
                const res = await api.get(`/get_modulo_to_select`);
                if (res.data) {
                    setMod(res.data.rows);
                }
            } catch(err) {
                toast.error('Ops, aconteceu alguma coisa, faça login novamente');
                console.log(err);
            }
        }
        async function loadFormMod() {
            try {
                const res = await api.get(`/push_form_mod`);
                if (res.data) {
                    setFormMod(res.data.rows);
                }
            } catch(err) {
                toast.error('Ops, aconteceu alguma coisa, faça login novamente');
                console.log(err);
            }
        }
        loadFormMod();
        loadForm();
        loadMod();
    }, []);

    async function loadForm() {
        try {
            const res = await api.get(`/push_gen_form`);
            if (res.data) {
                setForm(res.data.rows);
            }
        } catch(err) {
            toast.error('Ops, aconteceu alguma coisa, faça login novamente');
            console.log(err);
        }
    }
    async function loadFormMod() {
        try {
            const res = await api.get(`/push_form_mod`);
            if (res.data) {
                setFormMod(res.data.rows);
            }
        } catch(err) {
            toast.error('Ops, aconteceu alguma coisa, faça login novamente');
            console.log(err);
        }
    }
    function handleSet(item) {
        setSN(item.sn_ativo || "S");
        setCdForm(item.cd_form || "");
        setDs(item.label || "");
        setOrdem(item.ordem || "");
        setPath(item.ds_form || "");
    }
    async function handlerInsert() {
        try {
            await api.post(`/ins_form`, {
                cd: cd_form,
                ds: ds_form,
                ord: ordem,
                path: path,
                ativo: sn_ativo
            });
            
            toast.success('Recebimento realizado com sucesso');

            setTimeout(()=>{
                loadForm();
            }, 1000);
        } catch(err) {
            toast.error('Ops, aconteceu alguma coisa, faça login novamente');
            console.log(err);
        }
    }
    async function handlerInsertMod() {
        try {
            await api.post(`/ins_form_mod`, {
                form: cd_form_mod,
                mod: cd_mod_form,
            });
            
            toast.success('Recebimento realizado com sucesso');

            setTimeout(()=>{
                loadFormMod();
            }, 1000);
        } catch(err) {
            toast.error('Ops, aconteceu alguma coisa, faça login novamente');
            console.log(err);
        }
    }
    function handlerRequestModal() {
        setHandlerModal(!handlerModal);
    }
    return (
        <Container direction="column" w="100%" h="100%">
            <h1>GERENCIAMENTO DE FORMS</h1>
            <CardBlock w="100%" h="100%" overflow="auto">
              <Container direction="column" w="100%" h="100%" pad="15px">
                <Form>
                      <Wrapper w="100%">
                          <Wrapper w="70%">
                            <Input disabled marginLeft="true" borderless="true"
                                w="10%"
                                placeholder="CÓDIGO"
                                value={cd_form}
                                onChange={e=>setCdForm(e.target.value)}
                            />
                            <Input marginLeft="true" borderless="true"
                                w="10%"
                                placeholder="ORDEM"
                                value={ordem}
                                onChange={e=>setOrdem(e.target.value)}
                            />
                          </Wrapper>
                          <Wrapper w="55%">
                              <Input disable marginLeft="true" borderless="true"
                                w="45%"
                                placeholder="DESCRIÇÃO"
                                value={ds_form}
                                onChange={e=>setDs(e.target.value)}
                              />
                            <Input marginLeft="true" borderless="true"
                                w="51%"
                                placeholder="PATH"
                                value={path}
                                onChange={e=>setPath(e.target.value)}
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
                              cd_form ? 
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
                              <th>ORDEM</th>
                              <th>DESCRIÇÃO</th>
                              <th>PATH</th>
                              <th>S/N ATIVO</th>
                          </tr>
                      </thead>
                      <tbody>
                          {
                              form ? form.map(srv=>(
                                  <tr key={srv.cd_form} onClick={e=>handleSet(srv)}>
                                      <td>{srv.cd_form}</td>
                                      <td>{srv.ordem}</td>
                                      <td>{srv.label}</td>
                                      <td>{srv.ds_form}</td>
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
                    <h1>FORMS / MÓDULOS</h1><br />
                        <Wrapper w="100%">
                            <Select marginLeft="true" defaultValue={cd_form_mod} onChange={e=>setCdFormMod(e.target.value)}>
                                <option>SELECIONE UM FORM</option>
                                {
                                    form ? form.map((srv, idx)=>(
                                        <option key={idx} value={srv.cd_form}>
                                            {srv.label}
                                        </option>
                                    )) : null 
                                }
                            </Select>
                            <Select defaultValue={cd_mod_form} onChange={e=>setCdModForm(e.target.value)}>
                                <option>SELECIONE UM MÓDULO</option>
                                {
                                    mod ? mod.map((srv, idx)=>(
                                        <option key={idx} value={srv.cd_modulo}>
                                            {srv.nm_modulo}
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
                                            form_mod ? form_mod.map((pe, idx)=>(
                                                <tr key={idx}>
                                                    <td>{pe.cd_form}</td>
                                                    <td>{pe.label}</td>
                                                    <td>{pe.cd_modulo}</td>
                                                    <td>{pe.nm_modulo}</td>
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