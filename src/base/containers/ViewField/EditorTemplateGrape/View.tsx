import { GrapeEditorValue } from '@base/types/setting';
import React, { useState } from 'react';

interface IViewProps {
  value: GrapeEditorValue;
  showTools?: boolean | false;
}

const View: React.FC<IViewProps> = (props: IViewProps) => {
  const { value, showTools } = props;
  console.log('view value grape', value);
  const cusCss = `
    ::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
  `;
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
      <div className="gjs-frame-wrapper" style={{ left: '0px', top: '0px', position: 'relative', width: width, height: '60vh' }}>
        <iframe
          style={{
            height: '100%',
            width: '100%',
            border: 0,
            overflow: 'hidden',
            marginTop: margin
          }}
          scrolling="no"
          srcDoc={`<!DOCTYPE html>
          <html>
            <head><style>${value?.content?.css}</style></head>
            <body>
            <div style="height: calc(100vh - 10px); overflow: auto; padding: 10px 15px">
              ${value?.content?.html ?? value?.content}
            </div>
          </body>

          </html>
        `}
        />
      </div>
    </>
  );
};

export default View;
