import { useCallback, useState } from 'react';
import { Chip, Stack, TextField, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface TagInputProps {
  value: string[];
  onChange?: (val: string[]) => void;
  onAdd?: (val: string) => void;
  onDelete?: (val: string) => void;
  mode?: 'view' | 'write';
  size?: 'small' | 'medium' | undefined;
}

const filterTag = (text: string) => {
  return text.replace(/[^0-9a-zA-Zㄱ-힣.\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf ]/g, ' ');
};

const TagInput = (props: TagInputProps) => {
  const { value: tags, onChange, onAdd, onDelete, mode = 'write', size = 'medium' } = props;
  const [inputTag, setInputTag] = useState('');
  const theme = useTheme();
  const { t } = useTranslation();

  const onChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = e;
    setInputTag(value);
  };

  const onChangeTags = (tag: string | string[]) => {
    if (typeof tag == 'string') {
      onChange && onChange([...tags, tag]);
      onAdd && onAdd(tag);
    } else {
      onChange && onChange(tag);
    }
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (['Enter', ','].indexOf(key) !== -1) {
      const addTag = filterTag(inputTag).trim();
      if (addTag === '') return;
      if (tags.indexOf(addTag) !== -1) return;
      if (addTag.length > 25) return;
      onChangeTags(addTag);
      setInputTag('');
      e.preventDefault();
    }

    if (mode == 'write') {
      if (key === 'Backspace' && !inputTag.length && tags.length) {
        e.preventDefault();
        const tagsCopy = [...tags];
        const poppedTag = tagsCopy.pop();
        onChangeTags(tagsCopy);
        poppedTag && setInputTag(poppedTag);
      }
    }
  };

  const deleteTag = useCallback(
    (tag: string) => {
      onChange && onChange(tags.filter((t) => t !== tag));
      onDelete && onDelete(tag);
    },
    [tags]
  );

  const renderWrite = () => {
    return (
      <Stack
        sx={{
          width: '100%',
          p: '5px',
          border: `1px solid ${theme.palette.grey[200]}`,
          borderRadius: '0.25rem'
        }}
      >
        <Stack direction={'row'} spacing={0.5}>
          {tags.map((_tag: string) => (
            <Chip size={size} key={_tag} label={_tag} onDelete={() => deleteTag(_tag)} />
          ))}
        </Stack>
        <TextField
          fullWidth
          placeholder={t('ncrm_common_tag_input_placeholder') as string}
          variant="standard"
          autoComplete="off"
          InputProps={{
            disableUnderline: true
          }}
          value={inputTag}
          onKeyUp={onKeyUp}
          onChange={onChangeTag}
        />
      </Stack>
    );
  };

  return <>{renderWrite()}</>;
};

export default TagInput;
