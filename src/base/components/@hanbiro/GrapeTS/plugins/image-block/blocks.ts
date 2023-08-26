import { AddGlobalBlocks } from '../../GlobalBlocks';

export default function (editor: any, opts: any) {
  const c = opts;
  let bm = editor.BlockManager;
  let { blocks } = c;
  blocks.map((block: string) => {
    console.log('cur block', block);
    if (block in AddGlobalBlocks) AddGlobalBlocks[block](bm, c);
  });
  
//   const toAdd = (name: string) => blocks.indexOf(name) >= 0;

//   toAdd('image-only') &&
//     bm.add('image-only', {
//       label: c.labelImageOnly,
//       category: c.category,
//       media: `
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
//     `,
//       // content: '<a class="cta-button">Cta Button</a>',
//       content: [
//         `<img data-gjs-type="n-image"  src="https://app-rsrc.getbee.io/public/resources/defaultrows/placeholder1col.png" width="100%" class="n-img" />`
//       ]
//       // content: {
//       //   type: 'image-only'
//       // }
//     });

//   toAdd('image-on-top') &&
//     bm.add('image-on-top', {
//       label: c.labelImageOnTop,
//       category: c.category,
//       media: `
//       <svg viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
//   <rect x="3" y="3" width="18" height="10.37" rx="2" ry="2" style=""/>
//   <circle cx="8.5" cy="6.5" r="1.5"/>
//   <polyline points="21 10.017 18.203 7.723 12.052 12.771" style=""/>
//   <polyline points="21.066 16.363 21.069 16.363 3 16.418" style=""/>
//   <polyline points="21.033 19.386 21.036 19.386 2.967 19.441" style=""/>
// </svg>
//     `,
//       //activate: true,
//       content: [
//         `<div style="margin: 10px;">
//           <img data-gjs-type="n-image"  src="https://app-rsrc.getbee.io/public/resources/defaultrows/placeholder1col.png" width="100%" class="n-img" />
//           <div> Another year is nearly over and we want to thank you for the trust and loyalty you place upon us. We hope you and your family have a great Christmas and a very Happy New Year.</div>
//         </div>`
//       ]
//       // content: '<a class="cta-button">Cta Button</a>',
//       // content: {
//       //   type: 'image-on-top'
//       // }
//     });

//   toAdd('image-on-bottom') &&
//     bm.add('image-on-bottom', {
//       label: c.labelImageOnBottom,
//       category: c.category,
//       media: `
//       <svg viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
//   <rect x="3" y="9" width="18" height="10.37" rx="2" ry="2" style=""/>
//   <circle cx="8.5" cy="12.5" r="1.5"/>
//   <polyline points="21 16.017 18.203 13.723 12.052 18.771" style=""/>
//   <polyline points="21.066 3.363 21.069 3.363 3 3.418" style=""/>
//   <polyline points="21.033 6.386 21.036 6.386 2.967 6.441" style=""/>
// </svg>
//     `,
//       content: [
//         `<div style="margin: 10px;">
//           <div> Another year is nearly over and we want to thank you for the trust and loyalty you place upon us. We hope you and your family have a great Christmas and a very Happy New Year.</div>
//           <img data-gjs-type="n-image"  src="https://app-rsrc.getbee.io/public/resources/defaultrows/placeholder1col.png" width="100%" class="n-img" />
//         </div>`
//       ]
//     });

//   toAdd('image-on-left') &&
//     bm.add('image-on-left', {
//       label: c.labelImageOnLeft,
//       category: c.category,
//       media: `
//       <svg viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
//   <rect x="3.296" y="8" width="8.704" height="11.406" rx="2" ry="2" style=""/>
//   <circle cx="7.5" cy="11.5" r="1.5"/>
//   <polyline points="12 16.499 9.477 15 3.928 18.297" style=""/>
//   <polyline points="20.578 9.919 20.579 9.919 14.47 9.949" style=""/>
//   <polyline points="20.578 12.919 20.579 12.919 14.47 12.949" style=""/>
//   <polyline points="20.578 15.919 20.579 15.919 14.47 15.949" style=""/>
//   <polyline points="20.613 18.946 20.614 18.946 14.505 18.976" style=""/>
// </svg>
//     `,
//       content: [
//         `<div style="margin: 10px;">
//         <table style="width:100%">
//           <tr>
//             <td width="50%"><img data-gjs-type="n-image"  src="https://app-rsrc.getbee.io/public/resources/defaultrows/placeholdercol3.png" width="100%" class="n-img" /></td>
//             <td><div>Another year is nearly over and we want to thank you for the trust and loyalty you place upon us. We hope you and your family have a great Christmas and a very Happy New Year.</div></td>
//           </tr>
//         </table>
//       </div>`
//       ]
//     });

//   toAdd('image-on-right') &&
//     bm.add('image-on-right', {
//       label: c.labelImageOnRight,
//       category: c.category,
//       media: `
//       <svg viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
//   <rect x="12.296" y="8" width="8.704" height="11.406" rx="2" ry="2" style=""/>
//   <circle cx="16.5" cy="11.5" r="1.5"/>
//   <polyline points="21 16.499 18.477 15 12.928 18.297" style=""/>
//   <polyline points="9.578 9.919 9.579 9.919 3.47 9.949" style=""/>
//   <polyline points="9.578 12.919 9.579 12.919 3.47 12.949" style=""/>
//   <polyline points="9.578 15.919 9.579 15.919 3.47 15.949" style=""/>
//   <polyline points="9.613 18.946 9.614 18.946 3.505 18.976" style=""/>
// </svg>
//     `,
//       content: [
//         `<div style="margin: 10px;">
//         <table style="width:100%">
//           <tr>
//             <td width="50%"><div>Another year is nearly over and we want to thank you for the trust and loyalty you place upon us. We hope you and your family have a great Christmas and a very Happy New Year.</div></td>
//             <td><img data-gjs-type="n-image"  src="https://app-rsrc.getbee.io/public/resources/defaultrows/placeholdercol3.png" width="100%" class="n-img" /></td>
//           </tr>
//         </table>
//       </div>`
//       ]
//     });
}
