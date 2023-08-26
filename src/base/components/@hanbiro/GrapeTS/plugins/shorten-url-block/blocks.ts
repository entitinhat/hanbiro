import { AddGlobalBlocks } from '../../GlobalBlocks';

export default function (editor: any, opts: any) {
  const c = opts;
  let bm = editor.BlockManager;
  let { blocks } = c;
  blocks.map((block: string) => {
    console.log('cur block', block);
    if (block in AddGlobalBlocks) AddGlobalBlocks[block](bm, c);
  });
  // const toAdd = (name: string) => blocks.indexOf(name) >= 0;

  // toAdd('click-action') &&
  //   bm.add('click-action', {
  //     label: c.labelClickAction,
  //     category: c.category,
  //     media: `
  //     <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" style="fill: none; stroke-width: 1.2;" viewBox="-5 -5 34 34"><path d="M15.5 10h0a1.5 1.5 0 0 1 1.5 1.5v2.502M19.5 14v-1.5A1.5 1.5 0 0 0 18 11h0M14.172 14V8.5a1.5 1.5 0 0 0-1.5-1.5h0a1.5 1.5 0 0 0-1.5 1.5v7.625l-1.381-1.197c-.459-.689-1.922-.9-2.384-.389s-.572 1.363-.112 2.053c0 0 1.878 1.405 3.086 3.408s2.955 1.997 2.955 1.997H19s3-.075 3-4.943V14.5a1.5 1.5 0 0 0-1.5-1.5h0M22 9V2H2v9h5"></path></svg>
  //     `,
  //     // content: '<a>placeHolder</a>'
  //     content: {
  //       type: 'click-action',
  //     }
  //   });

  // toAdd('survey-url') &&
  //   bm.add('survey-url', {
  //     label: c.labelSurvey,
  //     category: c.category,
  //     media: `
  //       <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;"><path d="M16 3h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2m1-1h6a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm-1.998 9 .923 1L11 9m3 8h3m-3-6h3m-9.667 4h2.335c.184 0 .332.149.332.334v2.332a.332.332 0 0 1-.333.334H7.333A.332.332 0 0 1 7 17.666v-2.332c0-.185.148-.334.333-.334z"></path></svg>
  //     `,
  //     // content: '<a class="cta-button">Cta Button</a>',
  //     content: {
  //       type: 'survey-url'
  //     }
  //   });
}
