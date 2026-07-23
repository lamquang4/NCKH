import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {}

function Label({ children, ...props }: Props) {
  return <label {...props}>{children}</label>;
}

export default Label;
