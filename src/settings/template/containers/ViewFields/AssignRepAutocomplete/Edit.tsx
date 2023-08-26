import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import { useEffect, useState } from 'react';
interface EditProps {
  value: any;
  componentProps: any;
  onChange: (val: any) => void;
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;
  const [newValue, setNewValue] = useState<any[]>([]);
  const handleChange = (value: any) => {
    const currentValue =
      value.length > 0
        ? value.map((item: any, index: number) => {
            return {
              user: { name: item.name, id: item.id },
              group: {}
            };
          })
        : [];
    onChange && onChange(currentValue);
  };
  useEffect(() => {
    if(Array.isArray(value)){
     const currentValue  = value.map((item)=>{
        if(item['user']){
          return item.user
        } else {
          return item
        }
      })
      setNewValue(currentValue)
    }
  }, [value]);
  return <UserAutoComplete value={newValue} {...componentProps} onChange={handleChange} />;
};

export default Edit;
