import * as React from "react";

const ALLTRICKS_LOGO_FULL_WHITE_SRC =
  "https://www.figma.com/api/mcp/asset/77e5513b-8662-4f44-9d5d-ae541c00cdf6";

export type AlltricksLogoVariant = "full";

export type AlltricksLogoProps = {
  className?: string;
  alt?: string;
  variant?: AlltricksLogoVariant;
  width?: number;
  height?: number;
};

export function AlltricksLogo({
  className,
  alt = "Alltricks",
  variant = "full",
  width = 223,
  height = 32,
}: AlltricksLogoProps) {
  const src = variant === "full" ? ALLTRICKS_LOGO_FULL_WHITE_SRC : ALLTRICKS_LOGO_FULL_WHITE_SRC;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ width, height, objectFit: "contain" }}
    />
  );
}
