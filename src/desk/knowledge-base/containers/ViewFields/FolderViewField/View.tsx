import React from 'react';
import TextView from '@base/containers/ViewField/Text/View';
import { KnowledgeBaseCategory } from '@desk/knowledge-base/types/knowledge';
import { Typography } from '@mui/material';

//TODO: convert value to address string
interface ViewProps {
  value: KnowledgeBaseCategory;
  onChange?: (nVal: KnowledgeBaseCategory) => void;
}
const View = (props: ViewProps) => {
  const { value } = props;
  const renderString = value?.parent ? `${value?.parent.name}/${value?.name}` : value.name;
  return <Typography>{renderString}</Typography>;
};

export default View;
