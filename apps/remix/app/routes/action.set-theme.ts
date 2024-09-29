import { createThemeAction } from "remix-themes";
import { themeSessionResolver } from "~/theme.server";

export const action = createThemeAction(themeSessionResolver);
