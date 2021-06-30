import styled from "@emotion/styled";
import React from "react";
import { Logo } from "./Logo";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const LogoText = styled.span`
  color: hsl(190deg 89% 21%);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-feature-setting: "kern";
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  text-align: left:
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  margin-left: 6px;
`;

export const LogoContainer = () => {
  return (
    <Container>
      <Logo width={"24px"} height={"24px"} />
      <LogoText>tooltipr</LogoText>
    </Container>
  );
};
