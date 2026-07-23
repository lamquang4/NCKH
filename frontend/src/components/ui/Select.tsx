import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {}

function Select({ children, ...props }: Props) {
  return <select {...props}>{children}</select>;
}

export default Select;
