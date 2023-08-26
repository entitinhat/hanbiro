export const inputStyle = {
  display: 'block',
  padding: '0.375rem 0.75rem',
  fontSize: '1rem',
  fontWeight: '400',
  lineHeight: '1.5',
  color: '#212529',
  'background-color': '#FFFFFF',
  'background-clip': 'padding-box',
  border: '1px solid #CED4DA',
  appearance: 'none',
  'border-radius': '0.25rem',
  transition: 'background-color 0.05s ease-in-out, border-color 0.05s ease-in-out, box-shadow 0.05s ease-in-out'
};

export const checkboxStyle = {};
export const checkboxGroupStyle = {
  'flex-direction': 'column',
  padding: '8px',
  gap: '10px',
  width: '100%'
};

export const fieldStyle = {
  display: 'flex',
  'flex-direction': 'column',
  padding: '8px',
  gap: '10px'
  // width: '100%'
};

export const labelStyle = {
  color: '#8c8c8c',
  'font-size': '0.875rem',
  'line-height': '1.4375em',
  'font-family': 'Roboto,sans-serif',
  'font-weight': '400',
  padding: '0',
  position: 'relative',
  display: 'block',
  // transformRrigin: 'top left',
  'white-space': 'nowrap',
  overflow: 'hidden',
  'text-overflow': 'ellipsis',
  'max-width': '100%'
};
export const buttonStyle = `
.muiButton-primary {
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  outline: 0px;
  border: 0px;
  margin: 0px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  min-width: 64px;
  padding: 6px 16px;
  border-radius: 4px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  color: rgb(255, 255, 255);
  background-color: rgb(25, 118, 210);
  box-shadow: rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px;
}

.muiButton-primary:hover {
  text-decoration: none;
  background-color: rgb(21, 101, 192);
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;
}
`;

export const rowStyle = {
  'min-height': '60px',
  width: '100%',
  padding: '10px',
  display: 'flex',
  position: 'relative',
  overflow: 'hidden'
  // gap: '10px'
};
