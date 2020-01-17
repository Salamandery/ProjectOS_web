import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import { Container, Table, CardBlock } from "../../Style";

export default function PnlOs() {
  document.title = "INTRANET - PAINEL O.S.";

  const [services, setServices] = useState([]);

  useEffect(() => {
    async function loadOS() {
      try {
        const res = await api.get(`/schedules/2`);

        if (res.data) {
          setServices(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    loadOS();
    setInterval(() => {
      loadOS();
    }, 60000);
  }, []);
  return (
    <Container direction="column" w="100%" h="100%">
      <h1>PAINEL DE O.S.</h1>
      <CardBlock w="100%" h="100%" overflow="auto">
        <Table
          titleAlign="left"
          fontSize="12px"
          lastRowAlign="left"
          textColor="#000"
          textAlign="left"
        >
          <thead>
            <tr>
              <th>Cód.</th>
              <th>DATA</th>
              <th>TÍTULO</th>
              <th>SOLICITANTE</th>
              <th>LOCALIDADE</th>
              <th>RESPONSÁVEL</th>
            </tr>
          </thead>
          <tbody>
            {services
              ? services.map(srv => (
                  <tr key={srv.id}>
                    <td>{srv.id}</td>
                    <td>{srv.formattedDate}</td>
                    <td>{srv.title}</td>
                    <td>{srv.user ? srv.user.name : null}</td>
                    <td>{srv.location.description}</td>
                    <td>{srv.provider ? srv.provider.name : null}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </CardBlock>
    </Container>
  );
}
