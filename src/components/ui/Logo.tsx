import React from "react";

export const Logo = ({ size = 22, color = "#D4A520" }: { size?: number; color?: string }) => {
  return (
    <svg 
      width={size} 
      height={(size * 560) / 500} 
      viewBox="0 0 500 560" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <path 
        d="M60 30H400L60 290V30Z" 
        fill={color} 
      />
      <path 
        d="M195 320L400 530H60L195 320Z" 
        fill={color} 
      />
    </svg>
  );
};
