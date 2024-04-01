type TextDisplayProps = {
  label: string;
  content: string;
  className?: string;
};

export const TextDisplay = ({ label, content, className }: TextDisplayProps) => {
  return (
    <div className={`flex gap-[5px] items-start ${className}`}>
      {label}:<b>{content}</b>
    </div>
  );
};
