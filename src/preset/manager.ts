import { ADDON_ID, TOOL_ID_DIRECTION, TOOL_ID_LANGUAGE, TOOL_ID_SIZE, TOOL_ID_THEME } from "../constants";
import { addons, types, useCallback, useGlobals } from "@storybook/addons";
import { ToolDirection } from "../tool-direction";
import { ToolLanguage } from "../tool-language";
import { ToolTheme } from "../tool-theme";
import { toolSize } from "../tool-size";

addons.register(ADDON_ID, () => {

  addons.add(TOOL_ID_SIZE, {
    type: types.TOOL,
    title: "APP SIZE",
    match: ({ viewMode }) => viewMode === "story",
    render: toolSize,
  }); 

  addons.add(TOOL_ID_THEME, {
    type: types.TOOL,
    title: "APP THEME",
    match: ({ viewMode }) => viewMode === "story",
    render: ToolTheme,
  });

  addons.add(TOOL_ID_LANGUAGE, {
    type: types.TOOL,
    title: "APP LANGUAGE",
    match: ({ viewMode }) => viewMode === "story",
    render: ToolLanguage
  }); 

  addons.add(TOOL_ID_DIRECTION, {
    type: types.TOOL,
    title: "APP DIRECTION",
    match: ({ viewMode }) => viewMode === "story",
    render: ToolDirection,
  });

});




// import { addons, types } from "@storybook/addons";
// import { ToolTheme } from "../tool-theme";

// import { ADDON_ID, TOOL_ID_SIZE, TOOL_ID_THEME, TOOL_ID_LANGUAGE, TOOL_ID_DIRECTION } from "../constants";
// import { ToolSize } from "../tool-size";


// // Register the addon
// addons.register(ADDON_ID, () => {

// });
