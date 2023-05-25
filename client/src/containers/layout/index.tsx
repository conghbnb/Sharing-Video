import { ReactNode } from "react";
import Navbar from "../navbar";
import styled from "styled-components";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <Navbar />
      {children}
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
`;

export default Layout;
