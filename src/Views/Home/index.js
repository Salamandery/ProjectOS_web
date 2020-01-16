import React, { useState, useEffect } from "./node_modules/react";
import { useSelector } from "./node_modules/react-redux";
import { MdMail } from "./node_modules/react-icons/md";
import { FaGlobe, FaTools, FaHome, FaCheck, FaBan } from "./node_modules/react-icons/fa";
import {
  CardBlock,
  Container,
  CardButton,
  Content,
  Table,
  Link,
  ButtonDefault,
  Wrapper
} from "../../Style";
import "./styles.css";
import Modal from "../../Components/ModalController";
import "./node_modules/react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from "./node_modules/react-responsive-carousel";

const Home = () => {
  document.title = "INTRANET";
  const me = useSelector(state => state.user.me);
  const [handlerModal, setHandlerModal] = useState(false);
  const [epimed, setEpimed] = useState("");
  const [timed, setTimed] = useState("");
  const [webmail, setWebmail] = useState("");

  useEffect(() => {
    if (me === 1) {
      setTimed("http://10.42.112.14:8080/heat/pages/painel.do");
      setWebmail("https://webmail-seguro.com.br/heat.org.br");
      setEpimed(
        "https://secure.epimedmonitor.com/Login.aspx?Token=EN2DCNq%2FCyn5o6P3REznzk0XZBpgVJKNdVlzhbLO%2BOVYMPeQfjWzX%2Bt4In4pRxowrWjDwEFGrgQgz6HVxdAgMopaH%2FSXWlcci9ilm%2FdiZ3pnrxZIydlmod1IizYPMxoL"
      );
    } else {
      setTimed("http://10.42.112.13:7050/hepjbc/pages/painel.do");
      setWebmail("https://webmail-seguro.com.br/hejbc.org.br");
      setEpimed(
        "https://secure.epimedmonitor.com/Login.aspx?Token=DLOGLtOTJn35%2F95bXYByNqwhOS%2BsH7cTSTAtp3N8dLbVHCWRoPzTG5Ifpe5uzbvWiXaonxe5Bi362a%2BypPHIvwZrVvbAH6DuLNHtlRB2KPQeFafV9aIVuSNaBcQHep0i"
      );
    }
  }, [me]);

  function handlerRequestModal(e) {
    setHandlerModal(!handlerModal);
  }

  return (
    <div id="content">
      <Container
        wrap="true"
        w="100%"
        h="100%"
        items="flex-start"
        content="flex-end"
      >
        <CardBlock w="52%" margin="10px 0">
          <Carousel
            infiniteLoop
            autoPlay
            useKeyboardArrows
            swipeable={false}
            showThumbs={false}
            showStatus={false}
            interval={10000}
          >
            <Container
              className="aviso1"
              w="100%"
              h="100%"
              items="center"
              content="center"
              direction="column"
              bgColor="#003380"
            >
              <span style={{ fontSize: 20, color: "#f2f2f2" }}>
                Tem alguma reclamação sobre a T.I.?
              </span>
              <br />
              <Link target="_blank" href="http://10.42.112.47/glpi/plugins/formcreator/front/formdisplay.php?id=3">
                <ButtonDefault tp="action">Reclame aqui</ButtonDefault>
              </Link>
              <p className="legend">Ouvidoria T.I.</p>
            </Container>
            <Container
              className="aviso2"
              w="100%"
              h="100%"
              items="center"
              content="center"
              direction="column"
              bgColor="#003380"
              pad="25px"
            >
              <h1 style={{ fontWeight: "bold", color: "red" }}>AVISO</h1>
              <span style={{ fontSize: 20, color: "#f2f2f2" }}>
                Conforme orientação da LOCAWEB, em caso de recebimento de
                spoofing (um ataque de falsificação, situação em que uma pessoa
                ou programa se identifica com sucesso como outro, falsificando
                dados, para obter uma vantagem ilegítima), ou e-mails
                desconhecidos, solicitamos que siga as seguintes orientações:
                <br />
                <br />
                <strong>
                  1- Altere a senha da caixa postal que recebeu o spoofing;
                  <br />
                  2- Realize uma varredura com antivírus no computador e
                  classifique a mensagem como spam;
                  <br />
                  3- Evite abrir links desconhecidos, baixar arquivos ou fotos;
                  <br />
                </strong>
              </span>
            </Container>
          </Carousel>
        </CardBlock>
        <CardBlock w="46%" h="46%" margin="10px">
          <Content
            w="100%"
            h="100%"
            wrap="true"
            pad="10px"
            content="center"
            items="center"
          >
            <Link target="_blank" color="#333" href={timed}>
              <CardButton
                border="0"
                fColor="#f2f2f2"
                bgColor="#0059b3"
                hColor="#003380"
                size="md"
              >
                <FaGlobe style={{ marginBottom: 10 }} size={32} />
                F71
              </CardButton>
            </Link>
            <Link
              target="_blank"
              color="#333"
              href="http://10.42.112.91:8085/PD/login"
            >
              <CardButton
                border="0"
                fColor="#f2f2f2"
                bgColor="#0059b3"
                hColor="#003380"
                size="md"
              >
                <FaGlobe style={{ marginBottom: 10 }} size={32} />
                MEDILAB
              </CardButton>
            </Link>
            <Link
              target="_blank"
              color="#333"
              href="https://cadastro.saude.gov.br/novocartao/"
            >
              <CardButton
                border="0"
                fColor="#f2f2f2"
                bgColor="#0059b3"
                hColor="#003380"
                size="md"
              >
                <FaGlobe style={{ marginBottom: 10 }} size={32} />
                CADSUS
              </CardButton>
            </Link>
            <Link
              target="_blank"
              color="#333"
              href="http://sigtap.datasus.gov.br/tabela-unificada/app/sec/inicio.jsp"
            >
              <CardButton
                border="0"
                fColor="#f2f2f2"
                bgColor="#0059b3"
                hColor="#003380"
                size="md"
              >
                <FaGlobe style={{ marginBottom: 10 }} size={32} />
                SIGTAP
              </CardButton>
            </Link>
            <Link target="_blank" color="#333" href="http://www.cid10.com.br/">
              <CardButton
                border="0"
                fColor="#f2f2f2"
                bgColor="#0059b3"
                hColor="#003380"
                size="md"
              >
                <FaGlobe style={{ marginBottom: 10 }} size={32} />
                CID 10
              </CardButton>
            </Link>
            <Link target="_blank" href="http://10.42.111.12/apoio/">
              <CardButton
                border="0"
                fColor="#f2f2f2"
                bgColor="#0059b3"
                hColor="#003380"
                size="md"
              >
                <FaGlobe style={{ marginBottom: 10 }} size={32} />
                MVSOUL
              </CardButton>
            </Link>
            <Link target="_blank" href="http://10.42.111.12/mvpep/">
              <CardButton
                border="0"
                fColor="#f2f2f2"
                bgColor="#0059b3"
                hColor="#003380"
                size="md"
              >
                <FaGlobe style={{ marginBottom: 10 }} size={32} />
                MVPEP
              </CardButton>
            </Link>
            <Link
              data-toggle="modal"
              data-target="#myModal"
              onClick={handlerRequestModal}
            >
              <CardButton
                border="0"
                fColor="#f2f2f2"
                bgColor="#ff0000"
                hColor="#b30000"
                size="md"
              >
                <FaTools style={{ marginBottom: 10 }} size={32} />
                CHAMADO
              </CardButton>
            </Link>
            <Link target="_blank" color="#333" href={webmail}>
              <CardButton
                border="0"
                fColor="#f2f2f2"
                bgColor="#0059b3"
                hColor="#003380"
                size="md"
              >
                <MdMail style={{ marginBottom: 10 }} size={32} />
                WEBMAIL
              </CardButton>
            </Link>
            <Link target="_blank" href="http://10.42.112.48/Login">
              <CardButton
                border="0"
                fColor="#f2f2f2"
                bgColor="#0059b3"
                hColor="#003380"
                size="md"
              >
                <FaHome style={{ marginBottom: 10 }} size={32} />
                PORTAL
              </CardButton>
            </Link>
          </Content>
        </CardBlock>
        <CardBlock overflow="auto" h="42%" w="46%" margin="-65px 10px 0px 0px">
          <Table
            fontSize="14px"
            titleColor="#000"
            textColor="#999"
            titleAlign="left"
            textAlign="left"
            lastRowAlign="left"
            upper="uppercase"
          >
            <thead>
              <tr>
                <th>OUTRAS FERRAMENTAS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <FaGlobe
                    style={{ marginRight: 5, color: "#000" }}
                    size={16}
                  />
                  <Link
                    target="_blank"
                    href="https://secure.epimedmonitor.com/Login.aspx"
                  >
                    EPIMED
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <FaGlobe
                    style={{ marginRight: 5, color: "#000" }}
                    size={16}
                  />
                  <Link target="_blank" href={epimed}>
                    EPIMED EVENTOS
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <FaGlobe
                    style={{ marginRight: 5, color: "#000" }}
                    size={16}
                  />
                  <Link target="_blank" href="/lista_ramais">
                    Lista de Ramais
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <FaGlobe
                    style={{ marginRight: 5, color: "#000" }}
                    size={16}
                  />
                  <Link target="_blank" href="/lista_antibioticos">
                    Antimicrobiano
                  </Link>
                </td>
              </tr>
            </tbody>
          </Table>
        </CardBlock>

        {handlerModal ? (
          <Modal
            size="50%"
            items="center"
            onHandler={e => handlerRequestModal(e)}
          >
            <Container w="100%" direction="column">
              <Wrapper w="100%" items="center" content="space-between">
                <Wrapper items="center" content="flex-start">
                  <span className="labelModal">Já possuí cadastro?</span>
                  <Link
                    target="_blank"
                    href="http://10.42.112.47/glpi/plugins/formcreator/front/formdisplay.php?id=4"
                    onClick={handlerRequestModal}
                  >
                    <ButtonDefault tp="success">
                      <FaCheck />
                      <span>SIM</span>
                    </ButtonDefault>
                  </Link>
                  <Link
                    target="_blank"
                    href="http://10.42.112.47/glpi/plugins/formcreator/front/formdisplay.php?id=1"
                    onClick={handlerRequestModal}
                  >
                    <ButtonDefault tp="warn">
                      <FaBan />
                      <span>NÃO</span>
                    </ButtonDefault>
                  </Link>
                </Wrapper>
              </Wrapper>
            </Container>
          </Modal>
        ) : null}
      </Container>
    </div>
  );
};

export default Home;
