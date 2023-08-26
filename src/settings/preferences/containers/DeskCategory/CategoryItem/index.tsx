import { TicketCategory } from '@settings/preferences/types/desk/ticketCategory';
import RuleItem from './RuleItem';

interface RenderCategotyProps {
  category: TicketCategory;
  cateIdx: number;
  setCategories: (type: string, nData?: any, category?: TicketCategory, rule?: any, cateIdx?: number, ruleIdx?: number) => void;
  openEdit?: boolean;
}

const CategoryItem = (props: RenderCategotyProps) => {
  const { category, cateIdx, setCategories, openEdit = false } = props;

  return (
    <>
      {category.rules.length > 0 &&
        category.rules.map((rule, ruleIdx) => {
          return (
            <RuleItem
              key={ruleIdx}
              rule={rule}
              category={category}
              ruleIdx={ruleIdx}
              cateIdx={cateIdx}
              openEdit={openEdit}
              setCategories={setCategories}
            />
          );
        })}
    </>
  );
};

export default CategoryItem;
