import Image from "next/image";
import React from "react";

interface FirebaseImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  fetchPriority?: "high" | "low" | "auto";
}

const FirebaseImage: React.FC<FirebaseImageProps> = ({
  src,
  alt,
  width,
  height,
  sizes = "(max-width: 600px) 100vw, 600px",
  fetchPriority = "auto",
}) => (
  <Image
    src={`https://firebasestorage.googleapis.com/v0/b/coachonline.appspot.com/o/${encodeURIComponent(src)}?alt=media`}
    alt={alt}
    width={width}
    height={height}
    sizes={sizes}
    priority
    fetchPriority={fetchPriority}
  />
);

export default FirebaseImage;
