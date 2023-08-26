import { goParseFields } from '@base/utils/helpers/pageLayoutUtils';
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';

interface useWriteFormProps {
  menu: string;
}

export const useWriteForm = ({ menu }: useWriteFormProps) => {
  //let exceptMenus = ['desk_ticket', 'desk_knowledge', 'customer_account', 'customer_contact'];
  //let isExceptMenu = exceptMenus.indexOf(menu) !== -1 ? true : false;

  let { data: writeLayoutData, isLoading } = usePageLayoutByMenu(menu, 'write');
  // console.log('writeLayoutData: ', writeLayoutData);

  //const configMenu: string = isExceptMenu ? menu : menu.split('_')[0] || '';
  const parsedFields = goParseFields(writeLayoutData?.data, menu);
  // console.log('parsedFields: ', parsedFields);

  return {
    loading: isLoading,
    ...parsedFields
  };
};
