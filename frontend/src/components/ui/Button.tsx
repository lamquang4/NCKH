import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function Button({ children, ...props }: Props) {
  return <button {...props}>{children}</button>;
}

export default Button;
