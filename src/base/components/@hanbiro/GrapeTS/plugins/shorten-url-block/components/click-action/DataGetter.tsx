import { createFilterOptions } from '@mui/base';
import { usGetSurveyList } from '@settings/digital/survey/hooks/useGetSurveyList';
import { useEffect } from 'react';

interface DataGetterProps {
  editor: any;
  component?: string;
  onClose?: () => void;
  onSelectItem?: () => void;
}

const SurveyDataGetter = (editor: any, component: string, data: any) => {
  console.log('CTA Options data,', data);
  const selector = `#${component}`;
  const SelectedComponent = editor?.DomComponents?.getWrapper().find(selector)[0];
  console.log('SelectedComponent', SelectedComponent);
  console.log('SelectedComponent.getClasses()', SelectedComponent?.getAttributes());
  const attr = SelectedComponent.getAttributes();
  console.log('attr.downloadId', attr);

  SelectedComponent.components(`
      ${
        attr.downloadId
          ? ''
          : `<option value="" selected disabled hidden>
            Select a CTA
          </option>`
      }
      ${
        data?.data
          ? data?.data
              ?.map((tag: any) => {
                return createOption(tag.id, tag.name, attr.source);
              })
              .join('')
          : `<option value="none" selected >
              No CTA found
              </option>`
      }
      `);
  const oldHtmlComponent = SelectedComponent.getInnerHTML();
  SelectedComponent.getEl().innerHTML = oldHtmlComponent;
};

export default SurveyDataGetter;

//get options/data
const createOption = (value: string, content: string, attr: string) => {
  const nVal = attr ? attr.split(':')[1] : '';
  console.log(' compare', value, nVal);

  return `<option value="${value}" ${value == nVal ? 'selected' : ''} >${content}</option>`;
};
