import React, { Fragment, useCallback } from "react";
import { useGlobals } from "@storybook/api";
import { IconButton, WithTooltip, TooltipLinkList } from "@storybook/components";

export const ToolLanguage = () => {
  const [{ currentLanguage }, updateGlobals] = useGlobals();
  const languages = [
    {
      id: 1,
      title: 'ENGLISH',
    },
    {
      id: 2,
      title: 'العربی',
    },       
  ];
  const changeLanguage= useCallback(
    (language) =>
      updateGlobals({
        currentLanguage: language,
      }),
    [currentLanguage]
  );
  const onLanguages = (items: any, close: any) => {
    return items.map((i: any) => ({
      id: i.id,
      title: i.title,
      onClick: () => {
        changeLanguage(i.title);
        setClasses(i.id);
        close();
      }
    }));
  };
  const setClasses = (classId: number) => {
    const iFrame = document.getElementById('storybook-preview-iframe') as any;
    if (iFrame) {
      const doc = iFrame.contentWindow.document;
      if (doc) {
        doc.body.classList.remove('app-language-EN');
        doc.body.classList.remove('app-language-AR');
        let lang = '';
        switch (classId) {
          case 1:
            lang = 'EN';
            break;
          case 2:
            lang = 'AR';
            break;            
        }
        doc.body.classList.add(`app-language-${lang}`);
      }
    }
  };  

  if(!currentLanguage) {
    changeLanguage(languages[0].title);
    setClasses(languages[0].id);
  } 

  return (
    <Fragment>
      <WithTooltip
        placement="top"
        trigger="click"
        tooltip={({ onHide }) => (
          <TooltipLinkList links={onLanguages(languages, onHide)} /> 
        )}
      >
        <IconButton title="change app language">
          <span >app-language: </span>
          {currentLanguage == 'ENGLISH' && <span>ENGLISH</span>}
          {currentLanguage == 'العربی' && <span>العربی</span>}                    
        </IconButton>
      </WithTooltip>
    </Fragment>
  );
};