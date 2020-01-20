import React, { useEffect, useState } from "react";
import ErrorHandling from '../../Utils/ErrorHandling';
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import api from "../../Services/api";
import { toast } from "react-toastify";
import {
  Container,
  Table,
  CardBlock,
  ButtonDefault,
  Form,
  Input,
  Select,
  Wrapper,
  TextArea
} from "../../Style";

export default function SolOs() {
  document.title = "INTRANET - SOLICITAÇÃO";
  const user = useSelector(state => state.user.user);

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [workshop_id, setWorkshop] = useState(0);
  const [sector_id, setSector] = useState(0);
  const [location_id, setLocation] = useState(0);
  const [workshops, setWorkshops] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [locations, setLocations] = useState([]);
  const [services, setServices] = useState([]);

  const [provider, setProvider] = useState(true);

  useEffect(() => {
    async function loadInfoOs() {
      try {
        const res = await api.get(`/services`);
        setServices(res.data);
      } catch (err) {
        toast.error(ErrorHandling(err));
        console.log(err);
      }
    }

    async function loadWorkshops() {
      try {
        const res = await api.get(`/workshops/`);
        setWorkshops(res.data);
      } catch (err) {
        toast.error(ErrorHandling(err));
        console.log(err);
      }
    }

    async function loadSectors() {
      try {
        const res = await api.get(`/sectors/`);
        setSectors(res.data);
      } catch (err) {
        toast.error(ErrorHandling(err));
        console.log(err);
      }
    }

    loadInfoOs();
    loadWorkshops();
    loadSectors();
  }, [user.company, user.login]);

  useEffect(() => {
    async function loadLocations() {
      try {
        const res = await api.get(`/locations/${sector_id}`);
        setLocations(res.data);
      } catch (err) {
        toast.error(ErrorHandling(err));
        console.log(err);
      }
    }
    loadLocations();
  }, [sector_id]);

  async function loadInfoOs() {
    try {
      const res = await api.get(`/services`);
      setServices(res.data);
    } catch (err) {
      toast.error(ErrorHandling(err));
      console.log(err);
    }
  }

  async function handlerInsert() {
    try {
      const date = new Date();
      const res = await api.post(`/service/${id}`, {
        date,
        title,
        description,
        sector_id,
        location_id,
        provider: provider ? provider : false,
        workshop_id
      });

      if (res.data.msg) {
        toast.info(res.data.msg);
      } else {
        toast.success("Ordem de Serviço cadastrada com sucesso");
      }
      setTimeout(() => {
        loadInfoOs();
      }, 1000);
    } catch (err) {
      toast.error(ErrorHandling(err));
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
                <Input
                  borderless="true"
                  bold="true"
                  marginLeft="true"
                  placeholder="CÓDIGO"
                  value={id}
                  onChange={e => setId(e.target.value)}
                  w="10%"
                  disabled
                />
                <Select
                  borderless="true"
                  bold="true"
                  marginLeft="true"
                  value={workshop_id}
                  onChange={e => setWorkshop(e.target.value)}
                >
                  <option value={0}>---</option>
                  {workshops.map(w => (
                    <option key={w.id} value={w.id}>
                      {w.description}
                    </option>
                  ))}
                </Select>
                <Select
                  borderless="true"
                  bold="true"
                  marginLeft="true"
                  value={sector_id}
                  onChange={e => setSector(e.target.value)}
                >
                  <option value={0}>---</option>
                  {sectors.map(st => (
                    <option key={st.id} value={st.id}>
                      {st.description}
                    </option>
                  ))}
                </Select>
                <Select
                  borderless="true"
                  bold="true"
                  marginLeft="true"
                  value={location_id}
                  onChange={e => setLocation(e.target.value)}
                >
                  <option value={0}>---</option>
                  {locations.map(lc => (
                    <option key={lc.id} value={lc.id}>
                      {lc.description}
                    </option>
                  ))}
                </Select>
                <Wrapper>
                  <Input
                    type="checkbox"
                    checked={provider}
                    onChange={e => setProvider(e.target.checked)}
                    marginLeft="true"
                  />
                  <span>É o responsável ?</span>
                </Wrapper>
                <Input
                  borderless="true"
                  bold="true"
                  placeholder="TÍTULO DA SOLICITAÇÃO"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  w="100%"
                />
                <TextArea
                  borderless="true"
                  rows="2"
                  bold="true"
                  placeholder="DESCRIÇÃO DA SOLICITAÇÃO"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  w="100%"
                />
              </Wrapper>
            </Wrapper>
          </Form>
          <Table titleAlign="center" fontSize="14px">
            <thead>
              <tr>
                <th></th>
                <th>Cód.</th>
                <th>DATA</th>
                <th>Título</th>
                <th>Respolsável</th>
                <th>Situação</th>
                <th>Empresa</th>
              </tr>
            </thead>
            <tbody>
              {services
                ? services.map(srvi => (
                    <tr key={srvi.id}>
                      <td></td>
                      <td>{srvi.id}</td>
                      <td>{srvi.formattedDate}</td>
                      <td>{srvi.title}</td>
                      <td>
                        {srvi.provider
                          ? srvi.provider.name.toUpperCase()
                          : null}
                      </td>
                      <td>
                        {srvi.status
                          ? srvi.status.replace("O", "ABERTO")
                          : null}
                      </td>
                      <td>{srvi.location.sector.company.id}</td>
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
