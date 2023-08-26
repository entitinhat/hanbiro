import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  id?: any;
  node?: any;
  children: React.ReactNode;
}

const Portal = (props: PortalProps) => {
  const { id, node, children } = props;
  const [element, setElement] = useState(node);

  useEffect(() => {
    if (element !== null) return;
    if (id instanceof Element) {
      setElement(id);
    } else {
      setElement(document.getElementById(id));
    }
  }, [element, id]);

  return element && ReactDOM.createPortal(children, element);
};

Portal.defaultProps = {
  // id: document.body,
  id: 'crm-device',
  node: null,
};

export default Portal;
