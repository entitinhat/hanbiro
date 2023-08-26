import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import ListToolbar from '@base/components/@hanbiro/List/ListToolbar';
import { MENU_PROJECT, MENU_PROJECT_TASK } from '@base/config/menus';
import { PROJECT_TEMPLATE_MENU } from '@base/config/routeMenus';
import { Add } from '@mui/icons-material';
import { taskTemplateOpenAtom } from '@project/store/atoms/template';

interface ToolbarProps {
  category: string;
  onRefresh: () => void;
  onDelete?: () => void;
}

const Toolbar = (props: ToolbarProps) => {
  console.log('list toolbar');
  const navigate = useNavigate();
  const { category, onRefresh, onDelete } = props;
  const setTemplateTaskOpen = useSetRecoilState(taskTemplateOpenAtom);
  
  return (
    <>
      <ListToolbar
        menu={MENU_PROJECT_TASK}
        onRefresh={onRefresh}
        onDelete={onDelete}
        categoryMenuProps={{
          items: PROJECT_TEMPLATE_MENU,
          selected: category ?? '',
          onClick: (category: string) => {
            navigate(`/${MENU_PROJECT}/template/${category}`);
          }
        }}
        addingMenuProps={{
          icon: <Add />,
          label: 'New',
          onClick: () => {
            setTemplateTaskOpen({ open: true });
          }
        }}
      />
    </>
  );
};

export default Toolbar;
