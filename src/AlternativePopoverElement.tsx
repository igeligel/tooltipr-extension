import React, { ReactNode, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Popover } from "react-tiny-popover";
import { useDebounce } from "react-use";
// backgroundColor={'cyan.50'}
//           style={{ cursor: 'pointer' }}

const Span = styled.span`
  display: inline-block;
  cursor: pointer;
  background-color: #edfdfd;
`;

const PopoverContainer = styled.div`
  display: flex;
  border-radius: 4px;
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  color: #1A202C;
  background-color: white;
`

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
      if (!isPopoverHovered) {
        setIsPopoverActive(false);
      }
    },
    300,
    [isPopoverHovered]
  );

  return (
    <>
      <Popover
        isOpen={isPopoverActive || isPopoverHovered}
        positions={["top", "bottom", "left", "right"]} // preferred positions by priority
        content={
          <PopoverContainer
            onMouseEnter={() => {
              setIsPopoverHovered(true);
            }}
            onMouseLeave={() => setIsPopoverHovered(false)}
          >
            <div>Bar - Settings</div>
            <div>
              <h2>{props.title}</h2>
              <p>{props.description}</p>
              <div>
                {props.tags.map((tag) => {
                  return <div key={tag}>{tag}</div>;
                })}
              </div>
            </div>
            <div>Logo</div>
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
