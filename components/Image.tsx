/* eslint-disable @typescript-eslint/no-explicit-any */
import Image, { type ImageProps } from "next/image";

import { urlFor } from "../sanity/lib/image";

type SanityImageSource = any; // Using any to match sanity/lib/image usage

export function Img(
  props: Omit<ImageProps, "src"> & {
    src: string | SanityImageSource;
    fetchPriority?: string;
    containerClassName?: string;
  },
) {
  const {
    src,
    alt,
    style,
    className,
    fill = true,
    priority,
    fetchPriority,
    loading,
    containerClassName,
    ...rest
  } = props;

  if (!src) {
    return null;
  }

  // Handle Sanity image source
  let imageSrc;
  try {
    imageSrc =
      typeof src === "string" || (src as any).src ? src : urlFor(src).url();
  } catch (error) {
    console.error("Error generating image URL:", error);
    return null;
  }

  // If width and height are provided, or fill is explicitly set to false, use standard image
  if ("width" in rest || "height" in rest || fill === false) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        style={style}
        fetchPriority={fetchPriority}
        priority={priority}
        loading={loading}
        className={className}
        {...rest}
      />
    );
  }

  // Use fill mode
  return (
    <div
      className={`relative w-full ${containerClassName ? containerClassName : "h-full"}`}
    >
      <Image
        src={imageSrc}
        alt={alt}
        style={{
          ...style,
          position: "absolute",
          height: "100%",
          width: "100%",
        }}
        fill
        fetchPriority={fetchPriority}
        priority={priority}
        loading={loading}
        className={`object-cover ${className || ""}`}
        sizes={rest.sizes || "100vw"}
        {...rest}
      />
    </div>
  );
}
