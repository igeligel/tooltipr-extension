import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import Tippy from "@tippyjs/react";
import { keyframes } from "@emotion/react";
import { HStack } from "./HStack";
import { LogoContainer } from "./LogoContainer";
import { IconCheck } from "./IconCheck";
import { IconSettings } from "./IconSettings";

const Span = styled.span`
  display: inline-block;
  cursor: pointer;
  background-color: hsla(180, 100%, 80%, 0.2);
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
  color: ${(props) => props.theme.colors.PopoverHeadingHeadingColor};
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
  color: ${(props) => props.theme.colors.ParagraphColor};
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
  background-color: ${(props) =>
    props.theme.colors.PopoverContentBackgroundColor};
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
  font-size: 12px !important;
  min-height: 20px;
  min-width: 20px;
  padding-inline-start: 8px;
  padding-inline-end: 8px;
  border-radius: 6px;
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
  margin: 0 !important;
  padding: 0;
  box-sizing: border-box;
  padding: 4px !important;
  box-shadow: none;
  font-size: 24px;
  transition-property: all;
  transition-duration: 250ms;
  transition-timing-function: ease;
  transition-delay: 0s;
  border-radius: 6px;
  border: 1px solid transparent;
  color: ${(props) => props.theme.colors.SettingMenuButtonColor};
  background: transparent;
  height: 32px !important;
  width: 32px !important;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

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
  background: ${(props) => props.theme.colors.FooterBackground};
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
  return (
    <>
      <Tippy
        delay={[0, 10 * 1000]}
        appendTo={() => document.querySelector("#tooltipr-tippy-root")}
        interactive={true}
        content={
          <PopoverContainer>
            <PopoverContent>
              <Main>
                <SettingsBar>
                  <div>
                    <SettingsMenuButton>
                      <IconCheck />
                    </SettingsMenuButton>
                  </div>
                  <div>
                    <SettingsMenuButton>
                      <IconSettings />
                    </SettingsMenuButton>
                  </div>
                </SettingsBar>
                <ExplanationContent>
                  <PopoverHeading data-tooltipr-skip>
                    {props.title}
                  </PopoverHeading>
                  <PopoverParagraph marginTop={"4px"} data-tooltipr-skip>
                    {props.description}
                  </PopoverParagraph>
                  <HStack spacing={"4px"} marginTop={"6px"}>
                    {props.tags.map((tag) => {
                      return (
                        <Tag key={tag} data-tooltipr-skip>
                          {tag}
                        </Tag>
                      );
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
        <Span>{props.children}</Span>
      </Tippy>
    </>
  );
};
