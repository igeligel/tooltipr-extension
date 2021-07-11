import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      PopoverContentBackgroundColor: string;
      SettingMenuButtonColor: string;
      PopoverHeadingHeadingColor: string;
      ParagraphColor: string;
      FooterBackground: string;
      FooterTextColor: string;
    };
  }
}
