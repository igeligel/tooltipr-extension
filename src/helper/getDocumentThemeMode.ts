import rgba from "color-rgba";
import { isDarkColor } from "./isDarkColor";

type DocumentThemeMode = "light" | "dark";

export const getDocumentThemeMode = (
  document: Document,
  window: Window
): DocumentThemeMode => {
  const bodyElement = document.querySelector("body");
  const colorOfBackground = window
    .getComputedStyle(bodyElement, null)
    .getPropertyValue("background-color");

  const [r, g, b, alpha] = rgba(colorOfBackground);
  let documentThemeMode: DocumentThemeMode = "light";

  if (alpha !== 0) {
    if (isDarkColor([r, g, b])) documentThemeMode = "dark";
  }
  return documentThemeMode;
};
