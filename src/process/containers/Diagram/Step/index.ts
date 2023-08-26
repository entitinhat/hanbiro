import { NodeType } from '@process/types/diagram';

export { default as StepWrite } from './StepWrite';

export const getModalSize = (value: NodeType) => {
  switch (value) {
    case 'TYPE_ACTION':
      return 600;
    case 'TYPE_CHECKLIST':
      return 400;
    case 'TYPE_CLOSE':
      return 400;
    case 'TYPE_CRITERIA':
      return 600;
    case 'TYPE_SIMPLE_ACTION':
      return 600;
    case 'TYPE_SITE':
      return 600;
    case 'TYPE_WAIT':
      return 600;
    default:
      return 400;
  }
};
