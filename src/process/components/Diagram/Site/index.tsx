import CommonViewField from '@base/containers/ViewField/Common';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import { LabelValue } from '@base/types/app';
import { OptionValue } from '@base/types/common';

import View from './SiteView';
import Write from './SiteWrite';

export const initTypeOption: OptionValue = {
  keyName: '',
  languageKey: 'Select Type'
};

export const initContentOption: OptionValue = {
  keyName: '',
  languageKey: 'Select Content'
};

export const categoryOptions: LabelValue[] = [
  {
    label: 'ncrm_process_site_type_site',
    value: 'SITE_CATEGORY_SITE'
  },
  {
    label: 'ncrm_process_site_type_landingpage',
    value: 'SITE_CATEGORY_LANDING'
  }
];

export const samplePage = `
    Hello, $$Customer$$
    Thank you for using our service.
    plz click following button.

    <a title="Product" href="@@CTA.PAGE=xxxxxxxxxxx@@">Go to page</a>
`;

interface SiteProps extends CommonViewFieldProps {}

function Site(props: SiteProps) {
  return <CommonViewField {...props} componentView={View} componentEdit={Write} value={props.value} />;
}

export default Site;
