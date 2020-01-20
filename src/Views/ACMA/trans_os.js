import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ErrorHandling from "../../utils/ErrorHandling";
import api from "../../Services/api";
import {
  Container,
  Table,
  CardBlock,
  ButtonDefault,
  Wrapper,
  Select,
  Input,
  Form
} from "../../Style";
import { FaCheck } from "react-icons/fa";

export default function TransOs() {
  document.title = "INTRANET - TRANSFÊRENCIA";

  const [id, setId] = useState("");
  const [provider_id, setProvider] = useState(0);
  const [providers, setProviders] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function loadOS() {
      try {
        const res = await api.get(`/schedules/1`);
        if (res.data) {
          setServices(res.data);
        }
      } catch (err) {
        toast.error(ErrorHandling(err));
        console.tron.log(err);
      }
    }
    async function selectFunc() {
      try {
        const res = await api.get(`/providers`);
        if (res.data) {
          setProviders(res.data);
        }
      } catch (err) {
        toast.error(ErrorHandling(err));
        console.tron.log(err);
      }
    }

    loadOS();
    selectFunc();
  }, []);

  async function loadOS() {
    try {
      const res = await api.get(`/schedules/1`);

      if (res.data) {
        setServices(res.data);
      }
    } catch (err) {
      toast.error(ErrorHandling(err));
      console.tron.log(err);
    }
  }

  async function handlerTrans() {
    try {
      const res = await api.put(`/schedule/${id}/${provider_id}`);

      if (res.data.msg) {
        toast.info(res.data.msg);
      } else {
        toast.success("Transferência realizado com sucesso");
      }

      setTimeout(() => {
        loadOS();
      }, 1000);
    } catch (err) {
      toast.error(ErrorHandling(err));
      console.tron.log(err);
    }
  }

  function handlerSelect(srv) {
    setId(srv.id);
    setProvider("0");
  }
  return (
    <Container direction="column" w="100%" h="100%">
      <h1>TRANSFÊRENCIA DE O.S.</h1>
      <CardBlock w="100%" overflow="auto">
        <Container direction="column" w="100%" h="100%" pad="15px">
          <Form>
            <Wrapper w="100%">
              <Input
                disabled
                marginLeft="true"
                borderless="true"
                placeholder="CÓDIGO"
                value={id}
                onChange={e => setId(e.target.value)}
              />
              <Select
                borderless="true"
                bold="true"
                marginLeft="true"
                value={provider_id}
                onChange={e => setProvider(e.target.value)}
              >
                <option value={0}>SELECIONE UM USUÁRIO</option>
                {providers
                  ? providers.map(usr => (
                      <option key={usr.id} value={usr.id}>
                        {usr.name}
                      </option>
                    ))
                  : null}
              </Select>
              <ButtonDefault tp="action" onClick={handlerTrans}>
                <FaCheck />
                <span>Transferir</span>
              </ButtonDefault>
            </Wrapper>
          </Form>
          <Table
            titleAlign="left"
            fontSize="12px"
            lastRowAlign="left"
            textAlign="left"
          >
            <thead>
              <tr>
                <th>Cód.</th>
                <th>DATA</th>
                <th>TÍTULO</th>
                <th>RESPONSÁVEL</th>
              </tr>
            </thead>
            <tbody>
              {services
                ? services.map(srv => (
                    <tr key={srv.id} onClick={e => handlerSelect(srv)}>
                      <td>{srv.id}</td>
                      <td>{srv.formattedDate}</td>
                      <td>{srv.title}</td>
                      <td>{srv.provider.name}</td>
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
