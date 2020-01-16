import React, {
    useState,
    useEffect,
} from 'react';
import {
    useSelector,
} from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../../Services/api';
import Modal from '../../../Components/ModalController';
import {
    FaCheck
} from 'react-icons/fa';
import { 
    Container,
    CardBlock,
    Input,
    Wrapper,
    ButtonDefault,
    Table,
} from '../../../Style';

export default function EspSaida() {
    document.title = "INTRANET - PRONTUÁRIO"
    const me = useSelector(state=>state.user.me);

    const [handlerModal, setHandlerModal] = useState(false);
    const [pres_espec, setPresEspec] = useState([]);
    const [base, setBase] = useState([]);
    const [cd_atendimento, setCdAtendimento] = useState('');
    const [cd_paciente, setCdPaciente] = useState('');
    const [nm_paciente, setNmPaciente] = useState('');
    const [prestador, setPrestador] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [novo_prestador, setNovoPrestador] = useState('');
    const [nova_especialidade, setNovaEspecialidade] = useState('');
    const [cd_prestador, setCdPrestador] = useState(0);
    const [cd_especialidade, setCdEspecialidade] = useState(0);

    useEffect(()=>{
        async function PushPrestEspec() {
            try {
                const res = await api.get(`/push_pres_espec/${me}`);

                setPresEspec(res.data.rows);
                setBase(res.data.rows);

            } catch(err) {
                toast.error("Ops, algo de errado aconteceu");
                console.log(err);
            }
        }
        PushPrestEspec();
    }, []);
    async function handlerPushPac() {
        try {
            const res = await api.get(`/push_pac_info_mv/${cd_atendimento}`);

            setCdPaciente(res.data.rows[0].CD_PAC || '');
            setNmPaciente(res.data.rows[0].NM_PAC || '');
            setPrestador(res.data.rows[0].PRESTADOR || '');
            setEspecialidade(res.data.rows[0].ES || '');

            toast.success("Dados encontrados. Ah.. Não esqueça de verificar as informações antes de concluir a operação ;)");

        } catch(err) {
            toast.error("Ops, algo de errado aconteceu");
            console.log(err);
        }
    }
    function typeSearch(type, text) {
        let items = pres_espec;
        let filteredName;
        switch(type) {
            default: 
                filteredName = items.filter((item) => {
                    return item.NM_PRESTADOR.toLowerCase().match(text);
                });
            break;
        }
        
        if (!text || text === '') {
            setPresEspec(base);
        } else if (!Array.isArray(filteredName) && !filteredName.length) {
            setPresEspec(filteredName);
        } else if (Array.isArray(filteredName)) {
            setPresEspec(filteredName);
        } 
    }
    function searchText(e) {
        let text = e.toLowerCase();
        typeSearch('', text);
    }
    function handlerRequestModal() {
        setHandlerModal(!handlerModal);
    }
    function handlerSet(item) {
        setCdPrestador(item.CD_PRESTADOR);
        setNovoPrestador(item.NM_PRESTADOR);
        setCdEspecialidade(item.CD_ESPECIALID);
        setNovaEspecialidade(item.DS_ESPECIALID);

        handlerRequestModal();
    }
    async function handlerUpdate() {
        try {
            await api.post(`/update_prestador_especialid/`, {
                cd_atendimento,
                cd_prestador,
                cd_especialidade,
            });

            toast.success("Alteração realizada com sucesso");

        } catch(err) {
            toast.error("Ops, algo de errado aconteceu");
            console.log(err);
        }
    }
    return (
    <Container direction="column" w="100%">
        <CardBlock w="100%">
            <Container w="100%" direction="column" pad="15px">
                <h1>ATUAL</h1><br />
                <Wrapper w="100%">
                    <Input bold="true" marginLeft="true" w="15%"
                        borderless="true"
                        placeholder="CÓDIGO DO ATENDIMENTO" 
                        value={cd_atendimento}
                        onChange={e=>setCdAtendimento(e.target.value)}
                        onBlur={handlerPushPac}
                    />
                    <Input bold="true" marginLeft="true" w="15%"
                        disabled
                        borderless="true"
                        placeholder="CÓDIGO DO PACIENTE" 
                        value={cd_paciente}
                        onChange={e=>setCdPaciente(e.target.value)}
                    />
                    <Input bold="true" marginLeft="true" w="30%"
                        disabled
                        borderless="true"
                        placeholder="NOME DO PACIENTE" 
                        value={nm_paciente}
                        onChange={e=>setNmPaciente(e.target.value)}
                    />
                </Wrapper>
                <Wrapper w="100%">
                    <Input bold="true" marginLeft="true" w="30.6%"
                        disabled
                        borderless="true"
                        placeholder="NOME DO PRESTADOR" 
                        value={prestador}
                        onChange={e=>setPrestador(e.target.value)}
                    />
                    <Input bold="true" marginLeft="true" w="30%"
                        disabled
                        borderless="true"
                        placeholder="ESPECIALIDADE DA ALTA" 
                        value={especialidade}
                        onChange={e=>setEspecialidade(e.target.value)}
                    />
                </Wrapper>
                <h1>NOVO</h1><br />
                <Wrapper w="100%">
                    <Input bold="true" marginLeft="true" w="30.6%"
                        borderless="true"
                        placeholder="NOME DO PRESTADOR" 
                        value={novo_prestador}
                        onChange={e=>setNovoPrestador(e.target.value)}
                        onFocus={handlerRequestModal}
                    />
                    <Input bold="true" marginLeft="true" w="30%"
                        borderless="true"
                        placeholder="ESPECIALIDADE DA ALTA" 
                        value={nova_especialidade}
                        onChange={e=>setNovaEspecialidade(e.target.value)}
                        onFocus={handlerRequestModal}
                    />
                    <ButtonDefault 
                                    tp={ cd_especialidade > 0 ? "success" : "default"} 
                                    onClick={ cd_prestador > 0 ? handlerUpdate : null}>
                        <FaCheck />
                        <span>Confirmar</span>
                    </ButtonDefault>
                </Wrapper>
            </Container>
        </CardBlock>
        { handlerModal ? 
            <Modal onHandler={handlerRequestModal} size="90%" h="true">
                <Container w="100%" direction="column" h="100%">
                    <h1>PRESTADOR / ESPECIALIDADE</h1><br />
                    <Input placeholder="PESQUISAR POR NOME" 
                           bgless="true" 
                           bg="#f2f2f2" 
                           borderless="true" 
                           onChange={e=>searchText(e.target.value)}
                    />
                        <CardBlock w="100%" overflow="auto">
                            <Container direction="column" w="100%">
                                <Table titleAlign="center" fontSize="14px" lastRowAlign="center">
                                    <thead>
                                        <tr>
                                            <th>PRESTADOR</th>
                                            <th>ESPECIALIDADE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            pres_espec ? pres_espec.map(pe=>(
                                                <tr key={pe.CD_PRESTADOR} onClick={e=>handlerSet(pe)}>
                                                    <td>{pe.NM_PRESTADOR}</td>
                                                    <td>{pe.DS_ESPECIALID}</td>
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
