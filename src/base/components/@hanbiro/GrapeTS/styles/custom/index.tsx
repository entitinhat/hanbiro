import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Box, Button, FormControlLabel, Grid, IconButton, RadioGroup, Tooltip, Typography } from '@mui/material';
import TextFieldGTS from './TextFieldGTS';
import { Radio } from '@mui/material';
import ColorPicker from './ColorPicker';
import SelectGTS from './SelectGTS';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ToolBarItem } from './Styles';
import { LabelValueIcon } from '@base/types/app';
import { Component, Editor } from '../../types/editor';
import { styleManagers } from '../config';
import * as property from '../property';
interface StyleManagerProps {
  editor: Editor;
  isCustomStyleManager: boolean;
  grapesId: string;
}
const MAX_ROW_HIGHT = 40;
const NUMBER_ROWS_ALLOWED = 5;
//Change width Factor to change width of Style Manger in grapejs
const ST_WIDTH_FACTOR = 0.4;
const GS_WIDTH = 1276;
const ST_MAX_WIDTH = `${(ST_WIDTH_FACTOR + 0.1) * 100}%`;

const StyleManager: React.FC<StyleManagerProps> = (props: StyleManagerProps) => {
  const { editor, isCustomStyleManager, grapesId } = props;
  const [sectors, setSectors] = useState<any[]>([]);
  // const [prevCompType, setPrevCompType] = useState<string | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [isButtonShow, setIsButtonShow] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const styleManagerRef = useRef(null);

  //  //init - track changes
  // && isCustomStyleManager)
  if (editor) {
    let sm = editor.StyleManager;
    editor.on('component:selected', (component: Component) => {
      const getType = () => {
        let type = component.get('type');
        if (!type) {
          // type = component.get('tagName');
        }
        return type;
      };

      const compType = getType();
      // setPrevCompType(compType);
      // && prevCompType !== compType
      // console.log(component)
      if (compType && Object.keys(styleManagers).includes(compType)) {
        // component.set('stylable', styleManagers[compType]);
        setIsShow(true);
      } else {
        // component.set('stylable', true);
        setIsShow(false);
      }
    });

    editor.on('style:custom', (props: any) => {
      // const {container} = props;
      //using className 'gjs-pn-panels' to move style manger to panel
      const grapesNode = document.getElementById(grapesId);
      // console.log('grapesId', grapesId);
      const selectedComponent = editor.getSelected();
      if (grapesNode) {
        const container = grapesNode.querySelector('.gjs-pn-panels');
        const node = document.getElementById(`style-manager-${grapesId}`);
        if (container && node && !container.contains(node)) {
          // setIsShow(true);
          container.appendChild(node);
        }
      }

      let Newsectors = sm.getSectors({ visible: true });
      // console.log("Newsectors: " + selectedComponent.get('type'))
      if (JSON.stringify(Newsectors) !== JSON.stringify(sectors) && Object.keys(styleManagers).includes(selectedComponent?.get('type'))) {
        // console.log('Set Sectors Again', Newsectors);
        setSectors(Newsectors);
      }
    });
  }
  //@TODO improve performance
  useEffect(() => {
    if (styleManagerRef.current) {
      const observer = new ResizeObserver(([entry]) => {
        const grapesNode = document.getElementById(grapesId);
        const grapesWidth = grapesNode?.clientWidth || GS_WIDTH;
        const maxWidth = grapesWidth * ST_WIDTH_FACTOR + 100;
        if (entry.contentRect.width >= maxWidth) {
          setIsButtonShow(true);
        } else {
          setIsButtonShow(false);
        }
      });
      observer.observe(styleManagerRef.current);
      return () => observer.disconnect();
    }
  }, []);

  //https://grapesjs.com/docs/api/property.html#property
  const getPropType = (prop: any) => {
    switch (prop.getType()) {
      case property.TYPE_NUMBER: {
        return (
          <TextFieldGTS
            value={prop.getValue()}
            onChange={(value: string) => {
              prop.upValue(value);
            }}
            type="text"
            unit="px"
            placeholder={prop.getLabel()}
          />
        );
      }
      case property.TYPE_RADIO: {
        const options = prop.getOptions().map((option: LabelValueIcon) => ({
          value: prop.getOptionId(option),
          label: prop.getOptionLabel(option),
          icon: option?.icon
        }));
        return (
          <RadioGroup
            row
            value={prop.getValue()}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              prop.upValue((event.target as HTMLInputElement).value);
            }}
          >
            {options.map((option: any, index: number) => {
              const Icon = option?.icon;
              return (
                <FormControlLabel
                  key={option.value + index}
                  sx={{
                    position: 'relative',
                    marginRight: '11px',
                    '& span': {
                      lineHeight: '1.40'
                    }
                  }}
                  value={option.value}
                  control={
                    <Radio
                      sx={{
                        opacity: 0
                      }}
                      size="small"
                    />
                  }
                  label={
                    Icon ? (
                      <Icon
                        fontSize="small"
                        color={prop.getValue() === option.value ? 'primary' : 'secondary'}
                        sx={{ position: 'aboslute' }}
                      />
                    ) : (
                      <Typography fontSize="small" color={prop.getValue() === option.value ? 'primary' : 'secondary'}>
                        {option?.label ?? option.name}
                      </Typography>
                    )
                  }
                />
              );
            })}
          </RadioGroup>
        );
      }

      case property.TYPE_COLOR: {
        return (
          <ColorPicker
            onChange={(color: string) => {
              prop.upValue(color);
            }}
            value={prop.getValue()}
            type={prop.getId()}
          />
        );
      }
      case property.TYPE_SELECT: {
        const options = prop.getOptions().map((option: LabelValueIcon) => ({
          value: prop.getOptionId(option),
          label: prop.getOptionLabel(option),
          icon: option?.icon
        }));

        return (
          <SelectGTS
            options={options}
            value={prop.getValue()}
            onChange={(value: string) => {
              prop.upValue(value);
            }}
            type={prop.getId()}
          />
        );
      }
      case property.TYPE_COMPOSITE: {
        const newProperties = prop.getProperties();
        return (
          <Grid container>
            {/* <Button size="small">{property.getLabel()}</Button> */}

            {newProperties.map((prop: any, index: number) => {
              return (
                <ToolBarItem key={index + prop.getId()} item>
                  {getPropType(prop)}
                </ToolBarItem>
              );
            })}
          </Grid>
        );
      }
      case property.TYPE_STACK:

      case property.TYPE_LAYER:

      default: {
        return (
          <Button sx={{ opacity: '50%' }} size="small">
            {prop.getLabel()}
          </Button>
          // <TextFieldGTS
          //   sx={{ '& .MuiInputBase-input': { width: 70 } }}
          //   value={property.getValue()}
          //   onChange={(value: string) => {
          //     property.upValue(value);
          //   }}
          //   type="text"
          //   placeholder={property.getLabel()}
          // />
        );
      }
    }
  };

  //https://grapesjs.com/docs/api/sector.html#sector
  const renderProperties = (sector: any) => {
    const properties = sector.getProperties();
    // console.log('properties: ', properties)
    return (
      <>
        {properties.map((prop: any, index: number) => {
          if (prop.get('visible')) {
            return (
              <ToolBarItem item key={index + prop.getId()}>
                {/* {prop.getLabel()} */}
                {getPropType(prop)}
              </ToolBarItem>
            );
          }
        })}
      </>
    );
  };

  // console.log('check render.........................');
  // console.log('check render.........................', isShow);
  // console.log("check render.........................",sectors);
  //render
  return (
    <Box
      sx={{
        display: `${isShow ? 'flex' : 'none'}`,
        visibility: `${isShow ? 'visibility' : 'hidden'}`, //isCustomStyleManager && isShow
        boxShadow: isOpen && isButtonShow ? '0 0 5px #c0c6cc' : 'none',
        minHeight: ` ${MAX_ROW_HIGHT}px`,
        alignItems: 'center'
      }}
      id={`style-manager-${grapesId}`}
      className="style-manager"
      style={{
        maxWidth: ST_MAX_WIDTH
      }}
      ref={styleManagerRef}
    >
      <Grid
        // className="scroll-box"
        sx={{
          alignItems: 'center',
          maxHeight: isOpen ? ` ${MAX_ROW_HIGHT * NUMBER_ROWS_ALLOWED}px` : ` ${MAX_ROW_HIGHT}px`,
          overflow: 'hidden',
          transition: 'all .5s ease-in-out'
        }}
        container
      >
        {isButtonShow && (
          <IconButton
            onClick={() => {
              setIsOpen((isOpen) => !isOpen);
            }}
          >
            <Tooltip title={isOpen ? 'Less Tools' : 'More Tools'}>
              <MoreVertIcon />
            </Tooltip>
          </IconButton>
        )}
        {sectors.map((sector, index: number) => {
          // const newSetector = setor.get
          return <React.Fragment key={sector.getId()}>{renderProperties(sector)}</React.Fragment>;
        })}
      </Grid>
    </Box>
  );
};

export default StyleManager;
