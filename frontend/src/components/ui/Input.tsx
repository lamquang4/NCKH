import React, { forwardRef } from "react";

const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return <input ref={ref} {...props} />;
});

export default Input;
