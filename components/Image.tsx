import React from "react";
import Image, { type ImageProps } from "next/image";

export function Img(props: ImageProps) {
  const { src, alt, style, className, ...rest } = props;

  if (!src) {
    return null;
  }

  return (
    <Image
      src={src}
      alt={alt}
      style={style}
      className={className}
      width={800}
      height={600}
      {...rest}
    />
  );
}
