export const cmdImport = 'gjs-open-import-webpage',
  cmdExport = 'gjs-get-inlined-html',
  cmdDeviceDesktop = 'set-device-desktop',
  cmdDeviceTablet = 'set-device-tablet',
  cmdDeviceMobile = 'set-device-mobile',
  cmdClear = 'canvas-clear';

export const notAllowedComponents: string[] = ['td'];

export const selectStyle = {
  display: 'flex',
  'flex-wrap': 'wrap',
  '-webkit-box-pack': 'justify',
  'align-items': 'center',
  'background-color': '#fff',
  'border-radius': '4px',
  'border-style': 'solid',
  'border-width': '1px',
  cursor: 'default',
  'justify-content': 'space-between',
  height: '38px',
  width: '100%',
  outline: '0!important',
  position: 'relative',
  transition: 'all 100ms',
  'box-sizing': 'border-box',
  border: '1px solid #b4bdce',
  padding: '0 10px',
  '-webkit-appearance': 'none',
  '-moz-appearance': 'none',
  appearance: 'none',
  background: `url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='%23000000' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>") no-repeat`,
  'background-position': 'calc(100% - 0.75rem) center !important',
  'padding-right': '2rem !important'
};
export const SelectStyleString = ` .data-select-box { display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  cursor: default;
  justify-content: space-between;
  height: 38px;
  width: 100%;
  outline: 0!important;
  position: relative;
  transition: all 100ms;
  box-sizing: border-box;
  border: 1px solid #b4bdce;
  padding: 0 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='%23000000' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>") no-repeat;
  background-position: calc(100% - 0.75rem) center !important;
  padding-right: 2rem !important }`;

export const formModule = 'ticketform';
export const personalizeModule = 'personalize';
export const surveyModule = 'survey';
export const formType = 'form-select';
export const personalizeType = 'personalize-select';
export const surveyType = 'survey-select';
export const ctaModule = 'cta';
export const ctaType = 'click-action';
