"use client";

import Button, { type ButtonVariant, type ButtonSize } from "./component";


export default function ButtonPreview() {


  const variant = (props.variant as ButtonVariant) || "primary";
  const size = (props.size as ButtonSize) || "md";
  const children = (props.children as React.ReactNode) || "Click Me";
  const isLoading = Boolean(props.isLoading);
  const disabled = Boolean(props.disabled);

  return (
    <div className="flex h-[300px] w-full items-center justify-center p-8 select-none">
      <Button
        variant={variant}
        size={size}
        isLoading={isLoading}
        disabled={disabled}
      >
        {children}
      </Button>
    </div>
  );
}
