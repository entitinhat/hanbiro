/// <reference types="react" />
/// <reference types="react-dom" />

declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.json' {
  const content;
  export default content;
}

declare module '*.ttf' {
  const content;
  export default content;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

  const src: string;
  export default src;
}

interface SvgrComponent
  extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

// declare module "*.svg" {
//   const svgUrl: string;
//   const svgComponent: SvgrComponent;
//   export default svgUrl;
//   export { svgComponent as ReactComponent };
// }

declare module 'grapesjs';
declare module 'react-color';