import React, { forwardRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <input ref={ref} {...props} />;
});

export default Input;
