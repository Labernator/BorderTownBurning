import React from "react";

export const ToggleContent = ({ toggle, content }: {toggle: any; content: any}) => {
    const [isShown, setIsShown] = React.useState(false);
    const hide = () => setIsShown(false);
    const show = () => setIsShown(true);

    return (
      <React.Fragment>
        {toggle(show)}
        {isShown && content(hide)}
      </React.Fragment>
    );
};
