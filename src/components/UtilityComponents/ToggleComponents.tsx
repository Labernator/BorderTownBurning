import React from "react";

export const ToggleContents = ({ toggle, content }: { toggle: any; content: any }) => {
  const [isShown, setIsShown] = React.useState(false);
  const toggling = () => isShown ? hide() : show();
  const hide = () => setIsShown(false);
  const show = () => setIsShown(true);

  return (
    <React.Fragment>
      {toggle(toggling)}
      {isShown && content(hide)}
    </React.Fragment>
  );
};
