import React, { Fragment, useCallback } from "react";
import { useGlobals } from "@storybook/api";
import { IconButton, WithTooltip, TooltipLinkList } from "@storybook/components";

export const ToolDirection = () => {
  const [{ currentDirection }, updateGlobals] = useGlobals();
  const directions = [
    {
      id: 1,
      title: 'LTR',
    },
    {
      id: 2,
      title: 'RTL',
    },       
  ];
  const changeDirection = useCallback(
    (direction) =>
      updateGlobals({
        currentDirection: direction,
      }),
    [currentDirection]
  );
  const onDirections = (items: any, close: any) => {
    return items.map((i: any) => ({
      id: i.id,
      title: i.title,
      onClick: () => {
        changeDirection(i.title);
        setClasses(i.title);
        close();
      }
    }));
  };
  const setClasses = (className: string) => {
    const iFrame = document.getElementById('storybook-preview-iframe') as any;
    if (iFrame) {
      const doc = iFrame.contentWindow.document;
      if (doc) {
        doc.body.classList.remove('app-direction-LTR');
        doc.body.classList.remove('app-direction-RTL');
        doc.body.classList.add(`app-direction-${className}`);
      }
    }
  };  

  if(!currentDirection) {
    changeDirection(directions[0].title);
    setClasses(directions[0].title);
  } 

  return (
    <Fragment>
      <WithTooltip
        placement="top"
        trigger="click"
        tooltip={({ onHide }) => (
          <TooltipLinkList links={onDirections(directions, onHide)} /> 
        )}
      >
        <IconButton title="change app direction">
          <span >app-direction: </span>
          {currentDirection == 'LTR' && <span>LTR</span>}
          {currentDirection == 'RTL' && <span>RTL</span>}                    
        </IconButton>
      </WithTooltip>
    </Fragment>
  );
};