import Image from "next/image";
import styles from "./Logo.module.css";

interface LogoProps {
  /** "light" = logo for dark backgrounds, "dark" = logo for light backgrounds */
  variant?: "light" | "dark";
  /** Rendered height in px. Width scales automatically from aspect ratio. */
  height?: number;
}

export default function Logo({ variant = "dark", height = 28 }: LogoProps) {
  const src =
    variant === "light"
      ? "/ektazept/logo-darkTheme.png"
      : "/ektazept/logo.png";

  return (
    <Image
      src={src}
      alt="EKTAZECT"
      width={0}
      height={0}
      className={styles.logo}
      style={{ height, width: "auto" }}
      priority
      sizes="200px"
    />
  );
}
