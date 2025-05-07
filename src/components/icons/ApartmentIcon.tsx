import React from 'react';

interface IconProps {
  className?: string;
}

const ApartmentIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg 
      className={className}
      width="40" 
      height="40" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect 
        x="4" 
        y="2" 
        width="16" 
        height="20" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <line 
        x1="9" 
        y1="6" 
        x2="11" 
        y2="6" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      <line 
        x1="9" 
        y1="10" 
        x2="11" 
        y2="10" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      <line 
        x1="9" 
        y1="14" 
        x2="11" 
        y2="14" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      <line 
        x1="13" 
        y1="6" 
        x2="15" 
        y2="6" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      <line 
        x1="13" 
        y1="10" 
        x2="15" 
        y2="10" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      <line 
        x1="13" 
        y1="14" 
        x2="15" 
        y2="14" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      <rect 
        x="9" 
        y="18" 
        width="6" 
        height="4" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};

export default ApartmentIcon; 