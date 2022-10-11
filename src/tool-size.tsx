import React, { Fragment, useCallback } from "react";
import { useGlobals } from "@storybook/api";
import { IconButton, WithTooltip, TooltipLinkList } from "@storybook/components";

export const toolSize = () => {
  const [{ currentSize }, updateGlobals] = useGlobals();
  const sizes = [
    {
      id: 1,
      title: 'SMALLER',
    },
    {
      id: 2,
      title: 'SMALL',
    },
    {
      id: 3,
      title: 'MEDIUM',
    },
    {
      id: 4,
      title: 'LARGE',
    },
    {
      id: 5,
      title: 'LARGER',
    },        
  ];
  const changeSize = useCallback(
    (size) =>
      updateGlobals({
        currentSize: size,
      }),
    [currentSize]
  );
  const onSizes = (items: any, close: any) => {
    return items.map((i: any) => ({
      id: i.title,
      title: i.title,
      onClick: () => {
        changeSize(i.title);
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
        doc.body.classList.remove('app-size-SMALLER');
        doc.body.classList.remove('app-size-SMALL');
        doc.body.classList.remove('app-size-MEDIUM');
        doc.body.classList.remove('app-size-LARGE');
        doc.body.classList.remove('app-size-LARGER');
        doc.body.classList.add(`app-size-${className}`);
      }
    }
  };  

  if(!currentSize) {
    changeSize(sizes[2].title);
    setClasses(sizes[2].title);
  }

  return (
    <Fragment>
      <WithTooltip
        placement="top"
        trigger="click"
        tooltip={({ onHide }) => (
          <TooltipLinkList links={onSizes(sizes, onHide)} /> 
        )}
      >
        <IconButton title="change app size">
          <span >app-size: </span>
          {currentSize == 'SMALLER' && <span>SMALLER</span>}
          {currentSize == 'SMALL' && <span>SMALL</span>}
          {currentSize == 'MEDIUM' && <span>MEDIUM</span>}
          {currentSize == 'LARGE' && <span>LARGE</span>}
          {currentSize == 'LARGER' && <span>LARGER</span>}                     
        </IconButton>
      </WithTooltip>
    </Fragment>
  );
};