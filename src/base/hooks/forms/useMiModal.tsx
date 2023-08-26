import { useContext } from 'react';
import React from 'react';

const MiContext = React.createContext({ hmState: {} });

const useMiModal = (): object | null => {
  const { hmState = null } = useContext(MiContext);

  return hmState;
};

export default useMiModal;
