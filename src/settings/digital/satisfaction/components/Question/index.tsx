import { useEffect, useMemo, useState } from 'react';
import _, { cloneDeep } from 'lodash';
// import MainCard from '@base/components/App/MainCard';
// import { styled } from '@mui/material';
import { Box } from '@mui/material';
//import { VerticalLine } from '@settings/digital/survey/components/Lines';
import Option from './Option';
import { VerticalLine } from '@settings/digital/survey/components/Lines';

interface QuestionProps {
  editMode: 'write' | 'view';
  keyS: number;
  keyQ: number;
  focusS?: number;
  focusQ?: number;
  focusEle?: string;
  value: any; //=question content: {type, title, image, required, options}
  onChange: (keyS: number, keyQ: number, newQValue: any) => void; //handle question change
  setFocusEle?: (ele: any) => void;
  onFocusQuestionChange?: (keyS: number, keyQ: number) => void;
}

const Question = (props: QuestionProps) => {
  const {
    editMode = 'write',
    keyS,
    keyQ,
    focusS,
    focusQ,
    focusEle,
    value, //=question content: {type, title, image, required, options}
    onChange, //handle question change
    setFocusEle,
    onFocusQuestionChange
  } = props;

  //state
  const [isLoading, setIsLoading] = useState(false);
  const [questionValue, setQuestionValue] = useState<any>(value);
  const [isValid, setIsValid] = useState<any>(null); //default validation is OK

  //init value
  useEffect(() => {
    if (value) {
      if (!_.isEqual(value, questionValue)) {
        setQuestionValue(value);
      }
    }
  }, [value]);

  //check duplicate, not for empty
  function checkOptionDuplicate(curOptions: any, newValue: any) {
    let isDuplicated = false;
    curOptions.map((_option: any) => {
      if (_option.value !== '' && _option.value === newValue) {
        isDuplicated = true;
      }
    });
    return isDuplicated;
  }

  //for grid
  const handleGridOptionValueChange = (gridType: 'rows' | 'cols', val: string, idx: number) => {
    const newQValue = { ...questionValue };
    const preOptionsQ = cloneDeep(newQValue.options); //for check duplicated
    newQValue.options[gridType][idx].value = val;

    //check duplicate
    const duplicated = checkOptionDuplicate(preOptionsQ[gridType], val);
    setIsValid({ id: idx, type: gridType, value: !duplicated });
    if (!duplicated) {
      setQuestionValue(newQValue);
      //callback
      onChange && onChange(keyS, keyQ, newQValue);
    }
  };

  //for grid
  const handleRemoveGridOption = (gridType: 'rows' | 'cols', idx: number) => {
    const newQValue = { ...questionValue };
    newQValue.options[gridType].splice(idx, 1);
    setQuestionValue(newQValue);
    //callback
    onChange && onChange(keyS, keyQ, newQValue);
  };

  //radio check
  const handleGridOptionCheckChange = (checked: boolean, rIdx: number, cIdx: number) => {
    if (editMode === 'view') {
      const newQValue = { ...questionValue };
      //reset answer
      if (!questionValue.options.answer) {
        questionValue.options.answer = {}; //reset all
        questionValue.options.answer[rIdx] = {};
      } else {
        //reset if exists
        questionValue.options.answer[rIdx] = {};
      }
      //set new answer
      questionValue.options.answer[rIdx][cIdx] = checked;
      setQuestionValue(newQValue);
      //callback
      onChange && onChange(keyS, keyQ, newQValue);
    }
  };

  //render blue vertical line
  const BlueVerticalLine = useMemo(() => {
    return focusS === keyS && focusQ === keyQ + 1 && <VerticalLine />;
  }, [focusS, keyS, focusQ, keyQ]);

  return (
    <Box
      sx={{ position: 'relative' }}
      onClick={() => {
        onFocusQuestionChange && onFocusQuestionChange(keyS, keyQ + 1);
      }}
    >
      {BlueVerticalLine}
      <Option
        focusS={focusS}
        focusQ={focusQ}
        keyS={keyS}
        keyQ={keyQ}
        focusEle={focusEle}
        optionsQ={questionValue?.options}
        onRowOptionValueChange={(val: any, idx: number) => handleGridOptionValueChange('rows', val, idx)}
        onGridOptionCheckChange={handleGridOptionCheckChange}
        onRemoveOptionRow={(rIdx: number) => handleRemoveGridOption('rows', rIdx)}
      />
    </Box>
  );
};

export default Question;
