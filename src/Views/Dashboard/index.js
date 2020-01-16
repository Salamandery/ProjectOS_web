import React from "react";
import { useSelector } from "react-redux";
import { Container, Wrapper, CardBlock } from "../../Style";

import LinkDropdown from "../../Components/LinkDropdown";

export default function Dashboard() {
  document.title = "Dashboard";

  const me = useSelector(state => state.user.company);

  return (
    <Container direction="column" w="100%">
      <Wrapper content="space-between">
        <h1 style={{ paddingLeft: 25 }}>
          {me === 1
            ? "HOSPITAL ESTADUAL ALBERTO TORRES"
            : "HOSPITAL PREFEITO JOÃO CAFFARO BAPTISTA"}
        </h1>
        <LinkDropdown />
      </Wrapper>
      <CardBlock h="10%" w="100%">
        <Container pad="10px"></Container>
      </CardBlock>
    </Container>
  );
}
