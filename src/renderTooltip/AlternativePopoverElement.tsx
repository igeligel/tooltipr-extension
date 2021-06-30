import React, { ReactNode, useState } from "react";
import styled from "@emotion/styled";
import { Popover } from "react-tiny-popover";
import { useDebounce } from "react-use";
import { keyframes } from "@emotion/react";
import { HStack } from "./HStack";
import { FiCheck, FiSettings } from "react-icons/fi";
import { LogoContainer } from "./LogoContainer";

const Span = styled.span`
  display: inline-block;
  cursor: pointer;
  background-color: #edfdfd;
`;

const Hop = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95) translateZ(0px);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

const PopoverContainer = styled.div`
  padding-bottom: 12px;
  animation: ${Hop} 0.2s linear;
`;

const PopoverHeading = styled.h2`
  color: hsl(220deg 26% 14%);
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-feature-setting: "kern";
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  text-align: left:
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  border: none;
`;

type PopoverParagraphProps = {
  marginTop?: string;
};

const PopoverParagraph = styled.p<PopoverParagraphProps>`
  margin: 0;
  padding: 0;
  color: hsl(216deg 15% 52%);
  display: block;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-feature-setting: "kern";
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  text-align: left:
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  margin-top: ${(props) => props.marginTop || "0"};
`;

const PopoverContent = styled.div`
  display: flex;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  color: #1a202c;
  background-color: white;
  flex-direction: column;
  width: 320px;

  :focus {
    outline: 1px dashed red;
  }
`;

const Tag = styled.span`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-feature-setting: "kern";
  display: inline-flex;
  vertical-align: top;
  -webkit-box-align: center;
  align-items: center;
  max-width: 100%;
  font-weight: 600;
  line-height: 1.2;
  outline: transparent solid 2px;
  outline-offset: 2px;
  min-height: 1.25rem;
  min-width: 1.25rem;
  font-size: 12px;
  padding-inline-start: 8px;
  padding-inline-end: 8px;
  border-radius: 0.375rem;
  background: rgba(49, 151, 149, 0.6);
  background-image: initial;
  background-position-x: initial;
  background-position-y: initial;
  background-size: initial;
  background-repeat-x: initial;
  background-repeat-y: initial;
  background-attachment: initial;
  background-origin: initial;
  background-clip: initial;
  background-color: hsl(190, 100%, 42%);
  color: hsl(0, 0%, 100%);
`;

const SettingsBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SettingsMenuButton = styled.button`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  padding: 4px;
  box-shadow: none;
  font-size: 24px;
  transition-property: all;
  transition-duration: 250ms;
  transition-timing-function: ease;
  transition-delay: 0s;
  border-radius: 6px;
  border: 1px solid transparent;
  color: hsl(214deg 32% 91%);
  background: transparent;
  max-height: 32px;
  max-width: 32px;
  cursor: pointer;

  :active {
    background: hsl(189deg 82% 87%);
  }

  :focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
  }

  :hover {
    color: hsl(190deg 89% 21%);
  }
`;

const ExplanationContent = styled.div`
  margin-top: 8px;
`;

const Main = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
`;

const Footer = styled.div`
  background: hsl(180deg 80% 96%);
  padding-right: 16px;
  padding-left: 16px;
  padding-bottom: 8px;
  display: flex;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  margin-top: 24px;
  padding-top: 8px;
`;

type PopoverElementProps = {
  title: ReactNode;
  description: ReactNode;
  tags: Array<string>;
};

export const AlternativePopoverElement: React.FC<PopoverElementProps> = (
  props
) => {
  const [isPopoverHovered, setIsPopoverHovered] = useState(false);
  const [isPopoverActive, setIsPopoverActive] = useState(false);

  const [, _cancel] = useDebounce(
    () => {
      if (!isPopoverHovered && isPopoverActive) {
        setIsPopoverActive(false);
      }
      if (isPopoverHovered && !isPopoverActive) {
        setIsPopoverActive(true);
      }
    },
    300,
    [isPopoverHovered]
  );

  return (
    <>
      <Popover
        containerStyle={{
          zIndex: "2147483647",
        }}
        isOpen={isPopoverActive || isPopoverHovered}
        positions={["top", "bottom", "left", "right"]} // preferred positions by priority
        reposition={false}
        content={
          <PopoverContainer
            onMouseEnter={() => {
              setIsPopoverHovered(true);
            }}
            onMouseLeave={() => setIsPopoverHovered(false)}
          >
            <PopoverContent>
              <Main>
                <SettingsBar>
                  <div>
                    <SettingsMenuButton>
                      <FiCheck height={"24px"} width={"24px"} />
                    </SettingsMenuButton>
                  </div>
                  <div>
                    <SettingsMenuButton>
                      <FiSettings height={"24px"} width={"24px"} />
                    </SettingsMenuButton>
                  </div>
                </SettingsBar>
                <ExplanationContent>
                  <PopoverHeading>{props.title}</PopoverHeading>
                  <PopoverParagraph marginTop={"4px"}>
                    {props.description}
                  </PopoverParagraph>
                  <HStack spacing={"4px"} marginTop={"6px"}>
                    {props.tags.map((tag) => {
                      return <Tag key={tag}>{tag}</Tag>;
                    })}
                  </HStack>
                </ExplanationContent>
              </Main>
              <Footer>
                <LogoContainer />
              </Footer>
            </PopoverContent>
          </PopoverContainer>
        }
      >
        <Span
          onMouseEnter={() => {
            setIsPopoverHovered(true);
          }}
          onMouseLeave={() => setIsPopoverHovered(false)}
        >
          {props.children}
        </Span>
      </Popover>
    </>
  );
};
