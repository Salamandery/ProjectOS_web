import React, { useEffect, useState } from "react";
import history from "../../Services/history";
import { FaPen } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../Services/api";
import { Container, Table, CardBlock, ButtonDefault, Input } from "../../Style";

export default function GenOs() {
  document.title = "INTRANET - MINHAS O.S.";

  const [services, setServices] = useState([]);
  const [base, setBase] = useState([]);

  useEffect(() => {
    async function loadOS() {
      try {
        const res = await api.get(`/schedules/1`);
        if (res.data) {
          setServices(res.data);
          setBase(res.data);
        }
      } catch (err) {
        toast.error("Ops, aconteceu alguma coisa, faça login novamente");
        console.log(err);
      }
    }
    loadOS();
  }, []);
  function handlerEdit(item) {
    history.push("/edit_os", item);
  }
  function typeSearch(type, text) {
    let items = services;
    let filteredName;

    switch (type) {
      default:
        filteredName = items.filter(item => {
          return item.description.toLowerCase().match(text);
        });
        break;
    }

    if (!text || text === "") {
      setServices(base);
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      setServices(filteredName);
    } else if (Array.isArray(filteredName)) {
      setServices(filteredName);
    }
  }
  function searchText(e) {
    let text = e.toLowerCase();
    typeSearch("", text);
  }
  return (
    <Container direction="column" w="100%" h="100%">
      <h1>MINHAS O.S.</h1>
      <Input
        placeholder="PESQUISA POR DESCRIÇÃO"
        onChange={e => searchText(e.target.value)}
      />
      <CardBlock w="100%" h="100%" overflow="auto">
        <Table titleAlign="left" textAlign="left" fontSize="14px">
          <thead>
            <tr>
              <th></th>
              <th>Cód.</th>
              <th>DATA</th>
              <th>TÍTULO</th>
              <th>SOLICITANTE</th>
            </tr>
          </thead>
          <tbody>
            {services
              ? services.map(srv => (
                  <tr key={srv.id}>
                    <td>
                      {srv.status === "F" ? (
                        <>
                          <ButtonDefault
                            size="small"
                            tp="success"
                            onClick={e => handlerEdit(srv)}
                          >
                            <FaPen />
                          </ButtonDefault>
                        </>
                      ) : (
                        <>
                          <ButtonDefault
                            size="small"
                            tp="action"
                            onClick={e => handlerEdit(srv)}
                          >
                            <FaPen />
                          </ButtonDefault>
                        </>
                      )}
                    </td>
                    <td>{srv.id}</td>
                    <td>{srv.formattedDate}</td>
                    <td>{srv.description}</td>
                    <td>{srv.user.name}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </CardBlock>
    </Container>
  );
}
