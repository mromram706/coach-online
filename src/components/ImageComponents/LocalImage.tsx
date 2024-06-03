import Image from "next/image";
import React from "react";

interface LocalImageProps {
  src: string;
  alt: string;
  layout?: "fill" | "fixed" | "intrinsic" | "responsive";
  width?: number;
  height?: number;
  sizes?: string;
  fetchPriority?: "high" | "low" | "auto";
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  objectPosition?: string;
}

const LocalImage: React.FC<LocalImageProps> = ({
  src,
  alt,
  layout = "fill",
  width,
  height,
  sizes = "(max-width: 600px) 100vw, 600px",
  fetchPriority = "auto",
  objectFit = "cover",
  objectPosition = "center",
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      layout={layout}
      width={layout === "fill" ? undefined : width}
      height={layout === "fill" ? undefined : height}
      sizes={sizes}
      style={{ objectFit, objectPosition }}
      priority={fetchPriority === "high"}
    />
  );
};

export default LocalImage;
