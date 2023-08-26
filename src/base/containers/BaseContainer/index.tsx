import React from 'react';
import { DeviceType, LayoutType, FormType } from '@base/types/app';

type BaseLayoutDisplayProps = {
  displayConfig: any;
  device: DeviceType;
  layout: LayoutType;
  form: FormType;
  [key: string]: any; // for rest props
};

const BaseLayoutDisplay = (props: BaseLayoutDisplayProps) => {
  const { displayConfig, device, layout, form, ...rest } = props;

  let Component = null;
  let displayLayout = displayConfig[device][layout];
  if (form === 'write') {
    if (rest['component']) {
      Component = displayLayout?.[rest['component']];
      if (!Component) {
        Component = displayConfig['desktop']['layout1'][rest['component']];
      }
    } else {
      Component = displayLayout?.write;

      if (!Component) {
        Component = displayConfig['desktop']['layout1'].write; //default
      }
    }
  }
  if (form === 'list') {
    //// console.log(displayConfig, device, layout);
    Component = displayLayout?.list;
    if (!Component) {
      Component = displayConfig['desktop']['layout1'].list; //default
    }
  }
  if (form === 'view') {
    Component = displayLayout?.view;
    if (!Component) {
      Component = displayConfig['desktop']['layout1'].view; //default
    }
  }

  if (form === 'setting') {
    Component = displayLayout?.setting;
    if (!Component) {
      Component = displayConfig['desktop']['layout1'].setting; //default
    }
  }
  if (form === 'diagram') {
    Component = displayLayout?.diagram;
    if (!Component) {
      Component = displayConfig['desktop']['layout1'].diagram; //default
    }
  }

  if (form === 'basic') {
    Component = displayLayout?.basic;
    if (!Component) {
      Component = displayConfig['desktop']['layout1'].basic; //default
    }
  }
  if (form === 'dashboard') {
    Component = displayLayout?.dashboard;
    if (!Component) {
      Component = displayConfig['desktop']['layout1'].dashboard; //default
    }
  }

  return Component ? (
    <React.Suspense fallback={<></>}>
      <Component {...rest} />
    </React.Suspense>
  ) : (
    <></>
  );
};

export default BaseLayoutDisplay;
