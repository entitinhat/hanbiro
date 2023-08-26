import React, { useState } from 'react';
import { CommonViewProps } from '../Common/interface';
interface Template {
  html: string;
  css: string;
}
interface ViewProps extends CommonViewProps {
  value: Template | null;
  showTools?: boolean | false;
  iframHeight?: string | number;
}

const View = (props: ViewProps) => {
  const { value, showTools, iframHeight } = props;

  const cusCss = `
    ::-webkit-scrollbar {
      height: 8px;
      width: 0px;
      border: 1px solid #fff;
    }
    
    ::-webkit-scrollbar-track {
      border-radius: 0;
      background: #eeeeee;
    }
    
    ::-webkit-scrollbar-thumb {
      border-radius: 0;
      background: #b0b0b0;
    }
  `;

  let newCss = cusCss;
  if (value) {
    newCss = value.css + ' ' + cusCss;
  }
  let margin = showTools ? '30px' : '0px';
  const [width, setWidth] = useState<string>('100%'); //770px,320px
  const [device, setDevice] = useState<string>('desktop'); //tablet,mobile
  const checkActive = (inDevice: string) => {
    if (inDevice === device) {
      return 'gjs-pn-active gjs-four-color';
    }
    return '';
  };
  const handleClickDevice = (inDevice: string) => {
    setDevice(inDevice);
    let newWith = '100%';
    if (inDevice == 'tablet') {
      newWith = '770px';
    } else if (inDevice == 'mobile') {
      newWith = '320px';
    }
    setWidth(newWith);
  };
  const renderTools = () => {
    return (
      <div className="gjs-pn-panels">
        <div className="gjs-pn-panel gjs-pn-devices-c gjs-one-bg gjs-two-color">
          <div className="gjs-pn-buttons">
            <span
              data-tooltip="Desktop"
              data-tooltip-pos="bottom"
              //  gjs-pn-active gjs-four-color
              className={'gjs-pn-btn fa fa-desktop ' + checkActive('desktop')}
              onClick={() => handleClickDevice('desktop')}
            ></span>
            <span
              data-tooltip="Tablet"
              data-tooltip-pos="bottom"
              className={'gjs-pn-btn fa fa-tablet ' + checkActive('tablet')}
              onClick={() => handleClickDevice('tablet')}
            ></span>
            <span
              data-tooltip="Mobile"
              data-tooltip-pos="bottom"
              className={'gjs-pn-btn fa fa-mobile ' + checkActive('mobile')}
              onClick={() => handleClickDevice('mobile')}
            ></span>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {showTools && renderTools()}
      <div className="gjs-frame-wrapper" style={{ left: '0px', top: '0px', position: 'relative', width: width }}>
        {value && (
          <iframe
            style={{
              height: `${iframHeight ? iframHeight : 'calc(100vh - 380px)'}`,
              width: '100%',
              border: 0,
              overflow: 'scroll !important',
              marginTop: margin
            }}
            scrolling="yes"
            srcDoc={`<!DOCTYPE html>
          <html>
            <head><style>${newCss}</style></head>
            <body>
              ${value.html}
            </body>
          </html>
        `}
          />
        )}
      </div>
    </>
  );
};

export default View;
