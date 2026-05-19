// This file is used to declare global types

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Next.js specific references
/// <reference types="next" />
/// <reference types="next/image-types/global" />
/// <reference types="next/navigation-types/navigation" />
