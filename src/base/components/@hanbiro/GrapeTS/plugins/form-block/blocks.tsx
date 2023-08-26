// /* eslint-disable prettier/prettier */

// import { AddGlobalBlocks } from '../../GlobalBlocks';
// import {
//   typeForm,
//   typeInput,
//   typeTextarea,
//   typeSelect,
//   typeCheckbox,
//   typeRadio,
//   typeButton,
//   typeLabel,
//   typeRow,
//   typeFile,
//   typeDate,
//   typeMutipleCheckbox,
//   typeField,
//   typeTermOfUse,
//   typeFormContainer,
//   typeSubmitButton,
//   typeResetButton,
//   typeNumber,
//   typePrivacyPolicy
// } from './constants';
// import { checkboxGroupStyle, fieldStyle, rowStyle } from './style';

// // interface IPluginOption {
// //   blocks: string[];
// //   category: string;
// //   labelForm: string;
// //   labelInput: string;
// //   labelTextarea: string;
// //   labelSelect: string;
// //   labelCheckbox: string;
// //   labelRadio: string;
// //   labelButton: string;
// //   labelLabel: string;
// // }

// // export default function (editor: any, opts: any) {
// //   const c = opts;
// //   let bm = editor.BlockManager;
// //   let { blocks } = c;

// //   // const toAdd = (name: string) => blocks.indexOf(name) >= 0;
// //   blocks.map((block: string) => {
// //     // console.log('cur block', block);
// //     // if (block in AddGlobalBlocks) AddGlobalBlocks[block](bm, c);
// //   });
// //   // toAdd(typeForm) &&
// //   //   bm.add(typeForm, {
// //   //     label: c.labelForm,
// //   //     category: c.category,
// //   //     media:
// //   //       '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 5.5c0-.3-.5-.5-1.3-.5H3.4c-.8 0-1.3.2-1.3.5v3c0 .3.5.5 1.3.5h17.4c.8 0 1.3-.2 1.3-.5v-3zM21 8H3V6h18v2zM22 10.5c0-.3-.5-.5-1.3-.5H3.4c-.8 0-1.3.2-1.3.5v3c0 .3.5.5 1.3.5h17.4c.8 0 1.3-.2 1.3-.5v-3zM21 13H3v-2h18v2z"/><rect width="10" height="3" x="2" y="15" rx=".5"/></svg>',
// //   //     content: {
// //   //       type: typeForm,
// //   //       components: [
// //   //         {
// //   //           components: [{ type: typeLabel, components: 'Name' }, { type: typeInput }]
// //   //         },
// //   //         {
// //   //           components: [
// //   //             { type: typeLabel, components: 'Email' },
// //   //             { type: typeInput, attributes: { type: 'email' } }
// //   //           ]
// //   //         },
// //   //         {
// //   //           components: [
// //   //             { type: typeLabel, components: 'Gender' },
// //   //             { type: typeCheckbox, attributes: { value: 'M' } },
// //   //             { type: typeLabel, components: 'M' },
// //   //             { type: typeCheckbox, attributes: { value: 'F' } },
// //   //             { type: typeLabel, components: 'F' }
// //   //           ]
// //   //         },
// //   //         {
// //   //           components: [{ type: typeLabel, components: 'Message' }, { type: typeTextarea }]
// //   //         },
// //   //         {
// //   //           components: [{ type: typeButton }]
// //   //         }
// //   //       ]
// //   //     }
// //   //   });

// //   // toAdd(typeForm) &&
// //   //   bm.add(typeForm, {
// //   //     label: c.labelForm,
// //   //     category: c.category,
// //   //     media:
// //   //       '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 5.5c0-.3-.5-.5-1.3-.5H3.4c-.8 0-1.3.2-1.3.5v3c0 .3.5.5 1.3.5h17.4c.8 0 1.3-.2 1.3-.5v-3zM21 8H3V6h18v2zM22 10.5c0-.3-.5-.5-1.3-.5H3.4c-.8 0-1.3.2-1.3.5v3c0 .3.5.5 1.3.5h17.4c.8 0 1.3-.2 1.3-.5v-3zM21 13H3v-2h18v2z"/><rect width="10" height="3" x="2" y="15" rx=".5"/></svg>',
// //   //     content: {
// //   //       type: typeForm,
// //   //       components: [
// //   //         {
// //   //           components: [{ type: typeLabel, components: 'Name' }, { type: typeInput }]
// //   //         },
// //   //         {
// //   //           components: [
// //   //             { type: typeLabel, components: 'Email' },
// //   //             { type: typeInput, attributes: { type: 'email' } }
// //   //           ]
// //   //         },
// //   //         {
// //   //           components: [
// //   //             { type: typeLabel, components: 'Gender' },
// //   //             { type: typeCheckbox, attributes: { value: 'M' } },
// //   //             { type: typeLabel, components: 'M' },
// //   //             { type: typeCheckbox, attributes: { value: 'F' } },
// //   //             { type: typeLabel, components: 'F' }
// //   //           ]
// //   //         },
// //   //         {
// //   //           components: [{ type: typeLabel, components: 'Message' }, { type: typeTextarea }]
// //   //         },
// //   //         {
// //   //           components: [{ type: typeButton }]
// //   //         }
// //   //       ]
// //   //     }
// //   //   });

// //   // toAdd(typeFormContainer) &&
// //   //   bm.add(typeFormContainer, {
// //   //     label: c.labelFormContainer,
// //   //     category: c.category,
// //   //     media:
// //   //       '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 38 32" enable-background="new 0 0 38 32" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="#808184" d="M36.5,0h-35C0.673,0,0,0.673,0,1.5v29C0,31.327,0.673,32,1.5,32h35c0.827,0,1.5-0.673,1.5-1.5v-29 C38,0.673,37.327,0,36.5,0z M37,30.5c0,0.275-0.225,0.5-0.5,0.5h-35C1.225,31,1,30.775,1,30.5v-29C1,1.225,1.225,1,1.5,1h35 C36.775,1,37,1.225,37,1.5V30.5z"></path> <path fill="#808184" d="M31.5,14h-25C5.673,14,5,14.673,5,15.5v10C5,26.327,5.673,27,6.5,27h25c0.827,0,1.5-0.673,1.5-1.5v-10 C33,14.673,32.327,14,31.5,14z M32,25.5c0,0.275-0.225,0.5-0.5,0.5h-25C6.225,26,6,25.775,6,25.5v-10C6,15.225,6.225,15,6.5,15h25 c0.275,0,0.5,0.225,0.5,0.5V25.5z"></path> <path fill="#808184" d="M31.5,5h-25C5.673,5,5,5.673,5,6.5v3C5,10.327,5.673,11,6.5,11h25c0.827,0,1.5-0.673,1.5-1.5v-3 C33,5.673,32.327,5,31.5,5z M32,9.5c0,0.275-0.225,0.5-0.5,0.5h-25C6.225,10,6,9.775,6,9.5v-3C6,6.225,6.225,6,6.5,6h25 C31.775,6,32,6.225,32,6.5V9.5z"></path></g></g></svg>',
// //   //     content: [{ type: typeFormContainer }]
// //   //   });
// //   // toAdd(typeRow) &&
// //   //   bm.add(typeRow, {
// //   //     category: c.category,
// //   //     label: c.labelRow,
// //   //     media: `
// //   //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
// //   //       <path d="M494.029,178.04H109.116c-4.366,0-7.903,3.537-7.903,7.903c0,4.366,3.537,7.903,7.903,7.903h384.912 c1.194,0,2.165,0.972,2.165,2.165v119.978c0,1.194-0.972,2.165-2.165,2.165h-60.21c-4.366,0-7.903,3.537-7.903,7.903 s3.537,7.903,7.903,7.903h60.21c9.909,0,17.971-8.062,17.971-17.971V196.011C512,186.101,503.938,178.04,494.029,178.04z" />
// //   //       <path d="M402.207,318.155H17.971c-1.194,0-2.165-0.972-2.165-2.165V196.011c0-1.194,0.971-2.165,2.165-2.165h59.533 c4.366,0,7.903-3.537,7.903-7.903c0-4.366-3.537-7.903-7.903-7.903H17.971C8.061,178.04,0,186.102,0,196.011v119.978 c0,9.909,8.061,17.971,17.971,17.971h384.236c4.366,0,7.903-3.537,7.903-7.903C410.11,321.692,406.573,318.155,402.207,318.155z" />
// //   //       <path d="M316.09,212.084H195.91c-4.366,0-7.903,3.537-7.903,7.903v72.023c0,4.366,3.537,7.903,7.903,7.903H316.09 c4.365,0,7.903-3.537,7.903-7.903v-72.023C323.993,215.622,320.456,212.084,316.09,212.084z M308.187,284.108H203.813h0V227.89h104.375V284.108z"/>
// //   //       <path d="M161.758,212.084H41.578c-4.366,0-7.903,3.537-7.903,7.903v72.023c0,4.366,3.537,7.903,7.903,7.903h120.181 c4.365,0,7.903-3.537,7.903-7.903v-72.023C169.661,215.622,166.124,212.084,161.758,212.084z M153.856,284.108H49.481V227.89 h104.375V284.108z"/>
// //   //       <path d="M470.422,212.084H350.242c-4.366,0-7.903,3.537-7.903,7.903v72.023c0,4.366,3.537,7.903,7.903,7.903h120.181 c4.365,0,7.903-3.537,7.903-7.903v-72.023C478.325,215.622,474.788,212.084,470.422,212.084z M462.519,284.108H358.144V227.89 h104.375V284.108z"/>
// //   //     </svg>
// //   //   `,
// //   //     content: { type: typeRow }
// //   //   });

// //   // toAdd(typeInput) &&
// //   //   bm.add(typeInput, {
// //   //     label: c.labelInput,
// //   //     category: c.category,
// //   //     media:
// //   //       '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M4 10h1v4H4z"/></svg>',
// //   //     content: [{ type: typeInput }]
// //   //   });
// //   // toAdd(typeNumber) &&
// //   //   bm.add(typeNumber, {
// //   //     label: c.labelNumber,
// //   //     category: c.category,
// //   //     media:
// //   //       '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_429_11172)"> <path d="M4 4.00104H20V18.001C20 19.1056 19.1046 20.001 18 20.001H6C4.89543 20.001 4 19.1056 4 18.001V4.00104Z" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> <circle cx="12" cy="14" r="3" stroke="#292929" stroke-width="2.5" stroke-linejoin="round"></circle> <circle cx="12" cy="9" r="2" stroke="#292929" stroke-width="2.5" stroke-linejoin="round"></circle> </g> <defs> <clipPath id="clip0_429_11172"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg>',
// //   //     content: [{ type: typeInput, attributes: { type: 'number' } }]
// //   //   });

// //   // toAdd(typeTextarea) &&
// //   //   bm.add(typeTextarea, {
// //   //     label: c.labelTextarea,
// //   //     category: c.category,
// //   //     media:
// //   //       '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 7.5c0-.9-.5-1.5-1.3-1.5H3.4C2.5 6 2 6.6 2 7.5v9c0 .9.5 1.5 1.3 1.5h17.4c.8 0 1.3-.6 1.3-1.5v-9zM21 17H3V7h18v10z"/><path d="M4 8h1v4H4zM19 7h1v10h-1zM20 8h1v1h-1zM20 15h1v1h-1z"/></svg>',
// //   //     content: [{ type: typeTextarea }]
// //   //   });

// //   // toAdd(typeSelect) &&
// //   //   bm.add(typeSelect, {
// //   //     label: c.labelSelect,
// //   //     category: c.category,
// //   //     media:
// //   //       '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M18.5 13l1.5-2h-3zM4 11.5h11v1H4z"/></svg>',
// //   //     content: [{ type: typeSelect }]
// //   //   });

// //   // toAdd(typeButton) &&
// //   //   bm.add(typeButton, {
// //   //     label: c.labelButton,
// //   //     category: c.category,
// //   //     media:
// //   //       '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M4 11.5h16v1H4z"/></svg>',
// //   //     content: {
// //   //       type: typeRow,
// //   //       style: { ...rowStyle, 'justify-content': 'flex-end' },
// //   //       components: [{ type: typeButton, attributes: { type: 'button' }, text: 'Button' }]
// //   //     }
// //   //   });
// //   // toAdd(typeSubmitButton) &&
// //   //   bm.add(typeSubmitButton, {
// //   //     label: c.labelSubmitButton,
// //   //     category: c.category,
// //   //     media:
// //   //       '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M4 11.5h16v1H4z"/></svg>',
// //   //     content: {
// //   //       type: typeRow,
// //   //       style: { ...rowStyle, 'justify-content': 'flex-end' },
// //   //       components: [{ type: typeButton, attributes: { type: 'submit' }, text: 'Submit' }]
// //   //     }
// //   //   });
// //   // toAdd(typeResetButton) &&
// //   //   bm.add(typeResetButton, {
// //   //     label: c.labelResetButton,
// //   //     category: c.category,
// //   //     media:
// //   //       '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M4 11.5h16v1H4z"/></svg>',
// //   //     content: {
// //   //       type: typeRow,
// //   //       style: { ...rowStyle, 'justify-content': 'flex-end' },
// //   //       components: [{ type: typeButton, attributes: { type: 'reset' }, text: 'Reset' }]
// //   //     }
// //   //   });
// //   // toAdd(typeLabel) &&
// //   //   bm.add(typeLabel, {
// //   //     category: c.category,
// //   //     label: c.labelLabel,
// //   //     media:
// //   //       '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 11.9c0-.6-.5-.9-1.3-.9H3.4c-.8 0-1.3.3-1.3.9V17c0 .5.5.9 1.3.9h17.4c.8 0 1.3-.4 1.3-.9V12zM21 17H3v-5h18v5z"/><rect width="14" height="5" x="2" y="5" rx=".5"/><path d="M4 13h1v3H4z"/></svg>',
// //   //     content: { type: typeLabel }
// //   //   });

// //   // toAdd(typeCheckbox) &&
// //   //   bm.add(typeCheckbox, {
// //   //     label: c.labelCheckbox,
// //   //     category: c.category,
// //   //     media:
// //   //       '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 17l-5-5 1.41-1.42L10 14.17l7.59-7.59L19 8m0-5H5c-1.11 0-2 .89-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5a2 2 0 0 0-2-2z"></path></svg>',
// //   //     content: { type: typeCheckbox }
// //   //   });

// //   // toAdd(typeMutipleCheckbox) &&
// //   //   bm.add(typeMutipleCheckbox, {
// //   //     label: c.labelMutipleCheckbox,
// //   //     category: c.category,
// //   //     media:
// //   //       '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11 5H21M11 12H21M11 19H21" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><rect height="4" rx="1" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="4" x="3" y="3"></rect><rect height="4" rx="1" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="4" x="3" y="10"></rect><rect height="4" rx="1" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="4" x="3" y="17"></rect></g></svg>',
// //   //     content: [{ type: typeMutipleCheckbox }]
// //   //   });

// //   // toAdd(typeTermOfUse) &&
// //   //   bm.add(typeTermOfUse, {
// //   //     label: c.labelTermOfUse,
// //   //     category: c.category,
// //   //     media:
// //   //       '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / List_Checklist"> <path id="Vector" d="M11 17H20M8 15L5.5 18L4 17M11 12H20M8 10L5.5 13L4 12M11 7H20M8 5L5.5 8L4 7" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>',
// //   //     content: `
// //   //     <h1>Terms of Service</h1>
// //   //     <ul class='list-wrap'>
// //   //       <li class='list-item'>Term Here 1</li>
// //   //       <li class='list-item'>Term Here 2</li>
// //   //       <li class='list-item'>Term Here 3</li>
// //   //       <li class='list-item'>Term Here 4</li>
// //   //       <li class='list-item'>Term Here 5</li>
// //   //       <li class='list-item'>Term Here 6</li>
// //   //     </ul>
// //   //   `
// //   //   });
// //   // toAdd(typePrivacyPolicy) &&
// //   //   bm.add(typePrivacyPolicy, {
// //   //     label: c.labelPrivacyPolicy,
// //   //     category: c.category,
// //   //     media:
// //   //       '<svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M182.87 146.29h585.14v292.57h73.14V73.14H109.72v877.72h402.29v-73.15H182.87z" fill="#0F1F3C"></path><path d="M713.14 481.52L512 582.1v88.24c0 110.29 62.31 211.11 160.95 260.43l40.19 20.09 40.19-20.09c98.64-49.32 160.95-150.14 160.95-260.43V582.1L713.14 481.52z m128 188.81c0 83.12-46.18 157.84-120.52 195.01l-7.48 3.74-7.48-3.74c-74.34-37.17-120.52-111.9-120.52-195.01V627.3l128-64 128 64v43.03z" fill="#0F1F3C"></path><path d="M657.87 683.21l-36.33 41.11 93.25 82.43 113.93-131.09-41.39-36L709.69 729zM256 256h438.86v73.14H256zM256 438.86h292.57V512H256zM256 621.71h146.29v73.14H256z" fill="#0F1F3C"></path></g></svg>',
// //   //     content: `
// //   //     <p>By clicking below, you agree to the Vora Cloud Terms of <a href="#"> Service and Privacy Policy.</a></p>

// //   //   `
// //   //   });
// //   // toAdd(typeField) &&
// //   //   bm.add(typeField, {
// //   //     label: c.labelField,
// //   //     category: c.category,
// //   //     media:
// //   //       '<svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="text--input_1_" d="M30,29.36H2c-0.199,0-0.36-0.161-0.36-0.36v-4c0-0.199,0.161-0.36,0.36-0.36h28 c0.199,0,0.36,0.161,0.36,0.36v4C30.36,29.199,30.199,29.36,30,29.36z M2.36,28.64h27.28v-3.28H2.36V28.64z M14,23.36H2v-0.72h12 V23.36z M30,19.36H2c-0.199,0-0.36-0.161-0.36-0.36v-4c0-0.199,0.161-0.36,0.36-0.36h28c0.199,0,0.36,0.161,0.36,0.36v4 C30.36,19.199,30.199,19.36,30,19.36z M2.36,18.64h27.28v-3.28H2.36V18.64z M14,13.36H2v-0.72h12V13.36z M30,9.36H2 C1.801,9.36,1.64,9.199,1.64,9V5c0-0.199,0.161-0.36,0.36-0.36h28c0.199,0,0.36,0.161,0.36,0.36v4C30.36,9.199,30.199,9.36,30,9.36z M2.36,8.64h27.28V5.36H2.36V8.64z M14,3.36H2V2.64h12V3.36z"></path> <rect id="_Transparent_Rectangle" style="fill:none;" width="32" height="32"></rect> </g></svg> ',
// //   //     content: [
// //   //       {
// //   //         type: typeField,
// //   //         style: { ...fieldStyle, width: '100%' },
// //   //         components: [
// //   //           { type: typeLabel, removable: false },
// //   //           { type: typeInput, removable: false }
// //   //         ]
// //   //       }
// //   //     ]
// //   //   });
// //   // toAdd(typeRadio) &&
// //   //   bm.add(typeRadio, {
// //   //     category: c.category,
// //   //     label: c.labelRadio,
// //   //     media:
// //   //       '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m0-18C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 5c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"></path></svg>',
// //   //     content: { type: typeRadio }
// //   //   });

// //   // toAdd(typeFile) &&
// //   //   bm.add(typeFile, {
// //   //     label: c.labelFile,
// //   //     category: c.category,
// //   //     media: `
// //   //       <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round">
// //   //         <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
// //   //       </svg>
// //   //     `,
// //   //     content: { type: typeFile }
// //   //   });

// //   // toAdd(typeDate) &&
// //   //   bm.add(typeDate, {
// //   //     label: c.labelDate,
// //   //     category: c.category,
// //   //     media: `
// //   //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round">
// //   //       <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
// //   //       <line x1="16" y1="2" x2="16" y2="6"></line>
// //   //       <line x1="8" y1="2" x2="8" y2="6"></line>
// //   //       <line x1="3" y1="10" x2="21" y2="10"></line>
// //   //     </svg>
// //   //     `,
// //   //     content: { type: typeDate }
// //   //   });
// // }
