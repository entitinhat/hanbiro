import React from 'react';
import { Q_MULTI_CHOICES_GRID, Q_TICK_BOX_GRID } from '@settings/digital/survey/config/constants';
import OptionGridView from './GridView';
import OptionGridWrite from './GridWrite';
import OptionNormal from './Normal';

//render question options
const QuestionOption = (props: any) => {
  //props
  const {
    focusS,
    focusQ,
    keyS,
    keyQ,
    focusEle,
    type = '',
    optionsQ = [],
    isValid,
    imageOptRefs,
    //normal option event
    onOptionValueChange,
    onOptionSelectChange,
    onOpenUpload,
    onImageOptChange,
    onRemoveOptImage,
    onRemoveOption,
    onAddOption,
    onAddOtherOption,
    //grid option events
    onRowOptionValueChange,
    onRemoveRowOption,
    onColOptionValueChange,
    onRemoveColOption,
    onAddRowOption,
    onAddColOption
  } = props;

  //render
  return (
    <>
      {type === Q_MULTI_CHOICES_GRID || type === Q_TICK_BOX_GRID ? (
        focusS === keyS && focusQ === keyQ + 1 ? (
          <OptionGridWrite
            focusS={focusS}
            focusQ={focusQ}
            keyS={keyS}
            keyQ={keyQ}
            focusEle={focusEle}
            type={type}
            optionsQ={optionsQ}
            isValid={isValid}
            onRowOptionValueChange={onRowOptionValueChange}
            onRemoveRowOption={onRemoveRowOption}
            onColOptionValueChange={onColOptionValueChange}
            onRemoveColOption={onRemoveColOption}
            onAddRowOption={onAddRowOption}
            onAddColOption={onAddColOption}
          />
        ) : (
          <OptionGridView type={type} optionsQ={optionsQ} />
        )
      ) : (
        <OptionNormal
          focusS={focusS}
          focusQ={focusQ}
          keyS={keyS}
          keyQ={keyQ}
          focusEle={focusEle}
          type={type}
          optionsQ={optionsQ}
          isValid={isValid}
          imageOptRefs={imageOptRefs}
          onOptionValueChange={onOptionValueChange}
          onOptionSelectChange={onOptionSelectChange}
          onOpenUpload={onOpenUpload}
          onImageOptChange={onImageOptChange}
          onRemoveOptImage={onRemoveOptImage}
          onRemoveOption={onRemoveOption}
          onAddOption={onAddOption}
          onAddOtherOption={onAddOtherOption}
        />
      )}
    </>
  );
};

export default QuestionOption;
