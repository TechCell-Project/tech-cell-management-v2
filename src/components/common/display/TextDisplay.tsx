'use client';

/**
 * TextDisplayProps Type
 *
 * Defines the props for the TextDisplay component
 *
 * @property {string} label - The label for the text content.
 * @property {string} content - The text content to be displayed.
 * @property {string} [className] - Additional CSS classes to be applied to the text display container.
 */
type TextDisplayProps = {
  label: string;
  content: string;
  className?: string;
};

/**
 * TextDisplay component displays a label and corresponding text content.
 *
 * @param {TextDisplayProps} props - The properties passed to the TextDisplay component.
 * @returns {JSX.Element} The TextDisplay component with the specified label and text content.
 */
export const TextDisplay = ({ label, content, className }: TextDisplayProps): JSX.Element => {
  return (
    <div className={`flex gap-[5px] items-start ${className}`}>
      {label}:<b className="font-semibold">{content}</b>
    </div>
  );
};
