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
    Input,
    Wrapper,
    Form,
} from '../../Style';
import { FaCheck } from 'react-icons/fa';

export default function GenPapel() {
    document.title = "INTRANET - PAPEL";

    const [cd_papel, setCdPapel] = useState('');
    const [ds_papel, setDs] = useState('');
    const [sn_ativo, setSN] = useState('S');
    const [papel, setPapel] = useState([]);

    useEffect(() => {
        async function loadPapel() {
            try {
                const res = await api.get(`/push_gen_papel`);
                if (res.data) {
                    setPapel(res.data.rows);
                }
            } catch(err) {
                toast.error('Ops, aconteceu alguma coisa, faça login novamente');
                console.log(err);
            }
        }
        loadPapel();
    }, []);
    async function loadPapel() {
        try {
            const res = await api.get(`/push_gen_papel`);
            if (res.data) {
                setPapel(res.data.rows);
            }
        } catch(err) {
            toast.error('Ops, aconteceu alguma coisa, faça login novamente');
            console.log(err);
        }
    }
    async function handlerInsert() {
        try {
            await api.post(`/ins_papel`, {
                cd: cd_papel,
                ds: ds_papel,
                sn: sn_ativo
            });
            toast.success('Recebimento realizado com sucesso');

            setTimeout(()=>{
                loadPapel();
            }, 1000);
        } catch(err) {
            toast.error('Ops, aconteceu alguma coisa, faça login novamente');
            console.log(err);
        }
    }
    function handleSet(item) {
        setSN(item.sn_ativo || "S");
        setCdPapel(item.cd_papel || "");
        setDs(item.ds_papel || "");
    }
    return (
        <Container direction="column" w="100%" h="100%">
            <h1>GERENCIAMENTO DE PAPÉIS</h1>
            <CardBlock w="100%" h="100%" overflow="auto">
              <Container direction="column" w="100%" h="100%" pad="15px">
                    <Form>
                        <Wrapper w="100%">
                            <Input disabled marginLeft="true" borderless="true"
                                w="10%"
                                placeholder="CÓDIGO"
                                value={cd_papel}
                                onChange={e=>setCdPapel(e.target.value)}
                            />
                            <Input marginLeft="true" borderless="true"
                                w="40%"
                                placeholder="DESCRIÇÃO"
                                value={ds_papel}
                                onChange={e=>setDs(e.target.value)}
                            />
                            <Wrapper>
                                <Input type="checkbox"
                                       checked={sn_ativo === "S" ? true : false}
                                       onChange={e=>setSN(e.target.checked === true ? "S" : "N")}
                                />
                                <span>Ativo ?</span>
                            </Wrapper>
                            {
                                cd_papel ? 
                                  <ButtonDefault tp="action"  onClick={handlerInsert}>
                                      <FaCheck />
                                      <span>Atualizar</span>
                                  </ButtonDefault> : 
                                  <ButtonDefault tp="action"  onClick={handlerInsert}>
                                      <FaCheck />
                                      <span>Cadastrar</span>
                                  </ButtonDefault>
                            }
                        </Wrapper>             
                    </Form>
                    <Table titleAlign="center" fontSize="12px" lastRowAlign="center">
                        <thead>
                            <tr>
                                <th>Cód.</th>
                                <th>DESCRIÇÃO</th>
                                <th>S/N ATIVO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                papel ? papel.map(srv=>(
                                    <tr key={srv.cd_papel} onClick={e=>handleSet(srv)}>
                                        <td>{srv.cd_papel}</td>
                                        <td>{srv.ds_papel}</td>
                                        <td>{srv.sn_ativo === "S" ? "SIM" : "NÂO" }</td>
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