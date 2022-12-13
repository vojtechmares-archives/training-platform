import Link from "next/link";
import clsx from "clsx";
import { type ReactNode } from "react";

const baseStyles = {
  solid:
    "inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shaddow-sm focus:outline-none focus:ring-2 focus:ring-offset-2",
  outline:
    " hover:text-white inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shaddow-sm focus:outline-none ring-1 focus:ring-2 focus:ring-offset-2",
};

const variantStyles = {
  solid: {
    red: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500", // active:bg-red-500 active:text-red-300',
    gray: "text-white bg-gray-600 hover:bg-gray-700 focus:ring-gray-500", // active:bg-gray-500 active:text-gray-300',
    blue: "text-white bg-blue-600 hover:bg-blue-500 focus:ring-blue-500",
  },
  outline: {
    red: "text-red-700 bg-white ring-red-700 hover:bg-red-700 focus:ring-red-800", // active:ring-red-700 active:text-red-400',
    gray: "text-gray-900 bg-white ring-gray-700 hover:bg-gray-700 focus:ring-gray-800", // active:bg-gray-100 active:text-gray-600',
    blue: "text-blue-700 bg-white ring-blue-700 hover:bg-blue-700 focus:ring-blue-800",
  },
};

type Props = {
  variant?: "solid" | "outline";
  color?: "gray" | "red" | "blue";
  className?: string;
  href?: string;
  type?: "submit";
  children?: ReactNode;
};

export function Button({
  variant = "solid",
  color = "gray",
  className,
  href,
  type,
  children,
}: Props) {
  className = clsx(
    baseStyles[variant],
    variantStyles[variant][color],
    className
  );

  if (href !== undefined) {
    return (
      <Link href={href} className={className} type={type}>
        {children}
      </Link>
    );
  } else {
    return (
      <button className={className} type={type}>
        {children}
      </button>
    );
  }
}
