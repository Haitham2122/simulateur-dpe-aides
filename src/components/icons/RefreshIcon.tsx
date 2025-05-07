import React from 'react';

interface IconProps {
  className?: string;
}

const RefreshIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg 
      className={className}
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M4 4V9H9" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M20 20V15H15" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M19.7778 10C19.908 10.6819 20 11.3886 20 12.1111C20 16.7458 16.4458 20.5 12 20.5C10.9382 20.5 9.92484 20.2969 8.99998 19.9259" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M4.22217 14C4.09195 13.3181 4 12.6114 4 11.8889C4 7.25417 7.55421 3.5 12 3.5C13.0618 3.5 14.0752 3.70309 15 4.07407" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RefreshIcon; 