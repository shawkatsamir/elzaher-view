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
      fill
      className={`object-cover ${className || ""}`}
      priority={false}
      sizes="100vw"
      {...rest}
    />
  );
}
