import React, { useEffect, useState } from "react";
import { formatDate, InputformatDate } from "../../Utils/formatDate";
import { MdArrowBack } from "react-icons/md";
import { FaPen, FaPlus, FaCheck } from "react-icons/fa";
import api from "../../Services/api";
import history from "../../Services/history";
import { toast } from "react-toastify";
import {
  Container,
  Table,
  CardBlock,
  ButtonDefault,
  Form,
  Input,
  Select,
  Wrapper
} from "../../Style";

export default function EditOs() {
  document.title = "INTRANET - ORDEM DE SERVIÇO";

  const srv = history.location.state;

  const [id, setId] = useState("");
  const [date, setData] = useState("");
  const [desc, setDesc] = useState("");
  const [descServ, setDescServ] = useState("");
  const [note, setNote] = useState("");
  const [solutions, setSolutions] = useState([]);
  const [solution_id, setSolution] = useState(0);
  const [date_initial, setDti] = useState("");
  const [date_final, setDtf] = useState("");
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function loadInfoOs() {
      try {
        const res = await api.get(`/user_service/${srv.id}`);
        if (res.data) {
          setServices(res.data);
          setData(srv.formattedDate || "");
          setDesc(srv.description || "");
          setNote(srv.note || "");
        }
      } catch (err) {
        toast.error("Ops, aconteceu alguma coisa, faça login novamente");
        console.log(err);
      }
    }

    async function selectServico() {
      try {
        const res = await api.get(`/solutions/`);
        setSolutions(res.data);
      } catch (err) {
        toast.error("Ops, aconteceu alguma coisa, faça login novamente");
        console.log(err);
      }
    }
    loadInfoOs();
    selectServico();
  }, []);

  async function loadInfoOs() {
    try {
      const res = await api.get(`/user_service/${srv.id}`);
      if (res.data) {
        setServices(res.data);
        setData(srv.formattedDate || "");
        setDesc(srv.description || "");
        setNote(srv.note || "");
      }
    } catch (err) {
      toast.error("Ops, aconteceu alguma coisa, faça login novamente");
      console.log(err);
    }
  }

  async function handlerUpdate() {
    try {
      const res = await api.put(`/service`, {});

      if (res.data.status) {
        toast.info(res.data.msg);
      } else {
        toast.success("Ordem de Serviço atualizada com sucesso!");
      }

      setTimeout(() => {
        loadInfoOs();
      }, 1000);
    } catch (err) {
      toast.error("Ops, aconteceu alguma coisa, faça login novamente");
      console.log(err);
    }
  }
  async function handlerInsert() {
    try {
      const res = await api.post(`/user_service`, {
        service_id: srv.id,
        date_initial,
        date_final,
        note,
        solution_id
      });

      if (res.data.status) {
        toast.info(res.data.msg);
      } else {
        toast.success("Serviço criado com sucesso!");
      }
      setTimeout(() => {
        loadInfoOs();
      }, 1000);
    } catch (err) {
      toast.error("Ops, aconteceu alguma coisa, faça login novamente");
      console.log(err);
    }
  }
  async function handlerFinaliza() {
    try {
      const res = await api.put(`/user_service`, {});

      if (res.data.status) {
        toast.info(res.data.msg);
      } else {
        toast.success("Ordem de Serviço finalizada com sucesso!");
      }

      setTimeout(() => {
        history.push("/gen_os");
      }, 1000);
    } catch (err) {
      toast.error("Ops, aconteceu alguma coisa, faça login novamente");
      console.log(err);
    }
  }
  function handlerBack() {
    history.goBack();
  }
  async function handlerSelect(item) {
    setId(item.id);
    setNote(item.note);
    setDescServ(item.service.note || "");
    setSolution(item.solution.id || 0);
    setDti(InputformatDate(item.date_initial));
    setDtf(InputformatDate(item.date_final));
  }
  return (
    <Container direction="column" w="100%">
      <Wrapper w="65%" content="space-between">
        <ButtonDefault onClick={handlerBack} tp="action">
          <MdArrowBack />
        </ButtonDefault>
        <h1>
          SERVIÇO: {srv.id} - {srv.user.name.toUpperCase()}
        </h1>
      </Wrapper>
      <CardBlock w="100%" overflow="auto">
        <Container w="100%" direction="column" pad="15px">
          <Form>
            <Wrapper w="100%">
              <Wrapper w="100%">
                <Input
                  borderless="true"
                  bold="true"
                  marginleft="true"
                  placeholder="CÓDIGO"
                  value={id}
                  onChange={e => setId(e.target.value)}
                  w="10%"
                  disabled
                />
                <Input
                  borderless="true"
                  bold="true"
                  marginleft="true"
                  placeholder="DATA"
                  value={date}
                  onChange={e => setData(e.target.value)}
                  w="15%"
                  disabled
                />
                <Select
                  borderless="true"
                  bold="true"
                  marginleft="true"
                  value={solution_id}
                  onChange={e => setSolution(e.target.value)}
                >
                  <option value={0}>SELECIONE UM SERVIÇO</option>
                  {solutions
                    ? solutions.map(srv => (
                        <option key={srv.id} value={srv.id}>
                          {srv.description}
                        </option>
                      ))
                    : null}
                </Select>
                <Input
                  borderless="true"
                  bold="true"
                  placeholder="DESCRIÇÃO DA SOLICITAÇÃO"
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  w="100%"
                  disabled
                />
              </Wrapper>
              <Wrapper w="100%">
                <Input
                  borderless="true"
                  bold="true"
                  placeholder="OBSERVAÇÃO DO SERVIÇO"
                  value={descServ}
                  onChange={e => setDescServ(e.target.value)}
                  w="100%"
                />
              </Wrapper>
              <Wrapper w="100%">
                <Input
                  borderless="true"
                  bold="true"
                  marginleft="true"
                  type="datetime-local"
                  placeholder="DATA INICIAL"
                  value={date_initial}
                  onChange={e => setDti(e.target.value)}
                  w="23%"
                />
                <Input
                  borderless="true"
                  bold="true"
                  marginleft="true"
                  type="datetime-local"
                  placeholder="DATA FINAL"
                  value={date_final}
                  onChange={e => setDtf(e.target.value)}
                  w="23%"
                />
              </Wrapper>
              <Wrapper w="100%">
                <Input
                  borderless="true"
                  bold="true"
                  marginleft="true"
                  placeholder="DESCRIÇÃO DO SERVIÇO REALIZADO"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  w="40%"
                />
                {id ? (
                  <ButtonDefault
                    size="md"
                    tp={srv.status === "CONCLUIDO" ? "" : "action"}
                    onClick={handlerUpdate}
                  >
                    <FaPen />
                    <span>Atualizar Serviço</span>
                  </ButtonDefault>
                ) : (
                  <ButtonDefault
                    size="md"
                    tp={srv.status === "CONCLUIDO" ? "" : "action"}
                    onClick={handlerInsert}
                  >
                    <FaPlus />
                    <span>Novo Serviço</span>
                  </ButtonDefault>
                )}
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
                <th>DATA FINAL</th>
              </tr>
            </thead>
            <tbody>
              {services
                ? services.map((srvi, idx) => (
                    <tr key={idx} onClick={e => handlerSelect(srvi)}>
                      <td></td>
                      <td>{srvi.id}</td>
                      <td>{formatDate(srvi.date_initial)}</td>
                      <td>{formatDate(srvi.date_final)}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
        </Container>
      </CardBlock>
    </Container>
  );
}
