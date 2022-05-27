declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
declare module '*png';
// {
//   import React, { ReactElement, SVGProps } from 'react';
//   import { SvgProps } from 'react-native-svg';
//   const content: (props: SVGProps<SVGElement>) => ReactElement;
//   export default content;
// }
