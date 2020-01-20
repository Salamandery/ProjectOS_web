import React, { useState, useEffect } from "react";

import { Container, Content, Input, Form } from "../../Style";

import { MdSearch } from "react-icons/md";

import { Link, NavBar } from "./style";

const HeaderHome = () => {
  const [search, setSearch] = useState("");

  const [relogio, setRelogio] = useState(
    new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds()
  );

  useEffect(() => {
    setTimeout(() => {
      Watch();
    }, 1000);
  }, [relogio]);

  function searchOnGoogle() {
    window.open(
      `https://www.google.com/search?client=ms-google-coop&q=${search.replace(
        " ",
        "+"
      )}&cx=010347505017249818224:0llb0w2kgjb`
    );
  }

  function Watch() {
    let hora, minuto, segundo, horaImprimivel, momentoAtual;

    momentoAtual = new Date();

    hora = momentoAtual.getHours();
    minuto = momentoAtual.getMinutes();
    segundo = momentoAtual.getSeconds();

    if (hora >= 0 && hora <= 9) {
      hora = "0" + hora;
    }

    if (minuto >= 0 && minuto <= 9) {
      minuto = "0" + minuto;
    }

    if (segundo >= 0 && segundo <= 9) {
      segundo = "0" + segundo;
    }

    horaImprimivel = hora + ":" + minuto + ":" + segundo;

    setRelogio(horaImprimivel);
  }

  return (
    <Container
      w="100%"
      h="10%"
      direction="column"
      content="center"
      items="center"
    >
      <NavBar>
        <Link href="/" fSize="2em">
          INTRANET
        </Link>
        <Content w="90%" pad="20px" items="center" content="flex-end">
          <Form
            w="60%"
            bg="#003380"
            fColor="#f2f2f2"
            direction="flex-end"
            items="center"
            pad="0px 10px"
          >
            <Input
              bold
              borderfocus="border: 0"
              borderless
              w="100%"
              fColor="#f2f2f2"
              bg="#003380"
              mBottom="0px"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  searchOnGoogle();
                }
              }}
            />
            <MdSearch
              type="submit"
              name="submit"
              cursor={"pointer"}
              onClick={() => {
                searchOnGoogle();
              }}
              size={24}
            />
          </Form>
          <Link fSize="1.8em">{relogio}</Link>
        </Content>
      </NavBar>
    </Container>
  );
};
export default HeaderHome;
