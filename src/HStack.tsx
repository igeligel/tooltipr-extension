import styled from "@emotion/styled";
import React from "react"

type ContainerProps = {
  marginTop? : string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  margin-top: ${props => props.marginTop || '0'};
`;

type DividerProps = {
  width?: string;
};

const Divider = styled.div<DividerProps>`
  width: ${(props) => props.width || "0"};
  background: transparent;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;

type HStackProps = ContainerProps & {
  spacing?: string;
};

export const HStack: React.FC<HStackProps> = (props) => {
  const children = React.Children.toArray(props.children);
  const amountOfChildren = children.length;

  return (
    <Container marginTop={props.marginTop}>
      {children.map((child, index) => {
        const isLastItem = index === amountOfChildren - 1;

        if (isLastItem) return child;

        return (
          <>
            {child}
            <Divider width={props.spacing} />
          </>
        );
      })}
    </Container>
  );
};
