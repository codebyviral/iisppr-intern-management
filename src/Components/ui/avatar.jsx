// src/components/ui/avatar.jsx
import React from 'react';

// Avatar component
export const Avatar = ({ children, className }) => {
  return (
    <div className={`relative inline-block rounded-full border-2 border-gray-300 p-1 transition-transform duration-300 hover:scale-105 ${className}`}>
      {children}
    </div>
  );
};

// AvatarFallback component (for fallback image/text)
export const AvatarFallback = ({ children, className }) => {
  return (
    <div className={`flex items-center justify-center w-full h-full bg-gray-200 text-gray-600 font-semibold rounded-full shadow-md transition-colors duration-300 hover:bg-gray-300 ${className}`}>
      {children}
    </div>
  );
};

// AvatarImage component (for actual image)
export const AvatarImage = ({ src, alt, className }) => {
  return (
    <img
      className={`w-full h-full object-cover rounded-full shadow-lg transition-transform duration-300 hover:scale-105 ${className}`}
      src={src}
      alt={alt}
    />
  );
};