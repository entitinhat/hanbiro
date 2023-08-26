import { atom } from 'recoil';
import { EmailTemplate } from '@settings/template/types/template';

const siteTplData: EmailTemplate = {
  id: 'ACCT-0000001',
  name: 'Template 1', //name
  title: 'Subject', //title
  type: 'TYPE_GENERAL',
  description: 'description',
  language: 'en',
  products: [
    //{ id: 'all', label: 'All', name: 'All', value: 'all' },
    {
      id: '244df9bd-645a-4427-95d9-12a9de9a41d7',
      value: '244df9bd-645a-4427-95d9-12a9de9a41d7',
      label: 'PROD 01',
      name: 'PROD 01',
    },
    {
      id: '244c0084-bdbd-4855-a773-b654a1638018',
      value: '244c0084-bdbd-4855-a773-b654a1638018',
      label: 'PROD 02',
      name: 'PROD 02',
    },
  ],
  assignTo: [
    {
      id: '244e1920-b3ea-4a92-afe3-1a65ff5535ea',
      value: '244e1920-b3ea-4a92-afe3-1a65ff5535ea',
      label: 'Hanbiro Test_1',
      name: 'Hanbiro Test_1',
    },
    {
      id: '244e1b3d-eb0f-4dc0-a467-9add61980a12',
      value: '244e1b3d-eb0f-4dc0-a467-9add61980a12',
      label: 'Hanbiro Test_2',
      name: 'Hanbiro Test_2',
    },
  ],
  stage: 'STAGE_ACTIVE',
};

export const siteTplDataState = atom({
  key: 'emailDataDetail',
  default: siteTplData,
});
