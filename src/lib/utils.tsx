import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToBulletList = (text: string) => {
  // Split on '. ' and filter out empty strings
  const items = text.split(". ").filter((item) => item.trim().length > 0);

  // If we have more than one item after splitting, render as bullet list
  if (items.length > 1) {
    return (
      <div className="flex flex-col gap-1">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <span>•</span>
            <span>
              {item.trim()}
              {index < items.length - 1 && !item.endsWith(".") ? "." : ""}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // If only one item or no '. ' found, render as regular text
  return <span>{text}</span>;
};
