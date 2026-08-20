import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant = "accent" | "ghost";
type ButtonSize = "sm" | "md" | "icon";

type ButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
  children?: ReactNode;
};

type ButtonAsAnchor = ButtonOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href"> & {
    href: string;
  };

type ButtonAsButton = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

type ButtonProps = ButtonAsAnchor | ButtonAsButton;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  // Outlined-in-accent CTA — the "accent-btn" recipe already defined in globals.css
  accent: "accent-btn",
  // The "glass + accent-border" ghost pill used everywhere else in the app
  ghost: "glass accent-border text-gray-300 hover:text-white",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded-full gap-1.5",
  md: "px-5 py-3 text-sm rounded-full gap-2",
  icon: "w-9 h-9 rounded-full justify-center",
};

/**
 * Shared button/pill primitive collapsing the 3+ near-identical hand-rolled
 * "glass accent-border" and "accent-btn" recipes scattered across the app.
 * Renders an `<a>` when `href` is given, a `<button>` otherwise.
 */
export default function Button({
  variant = "ghost",
  size = "md",
  leadingIcon,
  trailingIcon,
  className = "",
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = `inline-flex items-center font-medium transition disabled:opacity-40 disabled:pointer-events-none ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {leadingIcon}
        {children}
        {trailingIcon}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
}
