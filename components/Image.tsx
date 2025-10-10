import Image, { type ImageProps } from "next/image";

export function Img(props: ImageProps & { fetchPriority?: string }) {
  const {
    src,
    alt,
    style,
    className,
    fill = true,
    priority,
    fetchPriority,
    loading = priority ? "eager" : "lazy",
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
    <div className="relative h-full w-full">
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
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...rest}
      />
    </div>
  );

  return (
    <Image
      src={src}
      alt={alt}
      style={style}
      className={`object-cover ${className || ""}`}
      {...rest}
    />
  );
}
