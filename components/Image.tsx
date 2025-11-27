import Image, { type ImageProps } from "next/image";

export function Img(
  props: ImageProps & { fetchPriority?: string; containerClassName?: string },
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

  // If width and height are provided, or fill is explicitly set to false, use standard image
  if ("width" in rest || "height" in rest || fill === false) {
    return (
      <Image
        src={src}
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
        src={src}
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
