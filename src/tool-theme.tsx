import React, { Fragment, useCallback } from "react";
import { useGlobals } from "@storybook/api";
import { IconButton, WithTooltip, TooltipLinkList } from "@storybook/components";

export const ToolTheme = () => {
  const [{ currentTheme }, updateGlobals] = useGlobals();
  const themes = [
    {
      id: 1,
      title: 'LIGHT',
    },
    {
      id: 2,
      title: 'DARK',
    },       
  ];
  const changeTheme = useCallback(
    (theme) =>
      updateGlobals({
        currentTheme: theme,
      }),
    [currentTheme]
  );
  const onThemes = (items: any, close: any) => {
    return items.map((i: any) => ({
      id: i.id,
      title: i.title,
      onClick: () => {
        changeTheme(i.title);
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
        doc.body.classList.remove('app-theme-LIGHT');
        doc.body.classList.remove('app-theme-DARK');
        doc.body.classList.add(`app-theme-${className}`);
      }
    }
  };

  if(!currentTheme) {
    changeTheme(themes[0].title);
    setClasses(themes[0].title);
  }  

  return (
    <Fragment>
      <WithTooltip
        placement="top"
        trigger="click"
        tooltip={({ onHide }) => (
          <TooltipLinkList links={onThemes(themes, onHide)} /> 
        )}
      >
        <IconButton title="change app theme">
          <span >app-theme: </span>
          {currentTheme == 'LIGHT' && <span>LIGHT</span>}
          {currentTheme == 'DARK' && <span>DARK</span>}                    
        </IconButton>
      </WithTooltip>
    </Fragment>
  );
};