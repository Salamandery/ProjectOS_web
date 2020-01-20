import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ErrorHandling from "../../Utils/ErrorHandling";
import api from "../../Services/api";
import { Container, Table, CardBlock, ButtonDefault } from "../../Style";
import { FaCheck } from "react-icons/fa";

export default function RecOs() {
  document.title = "INTRANET - RECEBIMENTO";

  const [services, setServices] = useState([]);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    try {
      const res = await api.get(`/schedules/0`);
      if (res.data) {
        setServices(res.data);
      }
    } catch (err) {
      toast.error(ErrorHandling(err));
      console.log(err);
    }
  }

  async function handlerRec(srv) {
    try {
      const res = await api.put(`/schedule/${srv.id}`);
      if (res.data.msg) {
        toast.info(res.data.msg);
      } else {
        toast.success("Recebimento realizado com sucesso");
      }

      setTimeout(() => {
        loadServices();
      }, 1000);
    } catch (err) {
      toast.error(ErrorHandling(err));
      console.log(err);
    }
  }

  return (
    <Container direction="column" w="100%" h="100%">
      <h1>RECEBIMENTO DE O.S.</h1>
      <CardBlock w="100%" h="100%" overflow="auto">
        <Table
          titleAlign="left"
          fontSize="12px"
          lastRowAlign="left"
          textAlign="left"
        >
          <thead>
            <tr>
              <th></th>
              <th>CÓD.</th>
              <th>DATA</th>
              <th>SOLICITANTE</th>
              <th>TÍTULO</th>
              <th>SETOR</th>
            </tr>
          </thead>
          <tbody>
            {services
              ? services.map(srv => (
                  <tr key={srv.id}>
                    <td>
                      <ButtonDefault
                        tp="success"
                        onClick={e => handlerRec(srv)}
                      >
                        <FaCheck />
                      </ButtonDefault>
                    </td>
                    <td>{srv.id}</td>
                    <td>{srv.formattedDate}</td>
                    <td>{srv.user.name}</td>
                    <td>{srv.title}</td>
                    <td>{srv.location.description}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </CardBlock>
    </Container>
  );
}
