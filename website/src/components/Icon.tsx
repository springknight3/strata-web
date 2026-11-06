import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}

export const Icon: React.FC<IconProps> = ({
  name,
  className = '',
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
}) => {
  const isHidden = ariaHidden ?? !ariaLabel;

  return (
    <span
      className={`material-symbols-rounded select-none inline-flex items-center justify-center leading-none ${className}`}
      aria-label={ariaLabel}
      aria-hidden={isHidden ? 'true' : undefined}
      role={ariaLabel ? 'img' : undefined}
    >
      {name}
    </span>
  );
};
