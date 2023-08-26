import React, {useState, MouseEvent, useEffect, useMemo} from 'react';
import {
  Box,
  Popper,
  Fade,
  IconButton,
  Stack,
  Typography,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  BoxProps,
  Checkbox,
  ListItem,
  List,
  ListItemText,
  ClickAwayListener, CardActions, Button, Divider
} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {
  DraggableProvided,
  DraggableRubric,
  DraggableStateSnapshot,
  DropResult,
  ResponderProvided
} from 'react-beautiful-dnd';
import {FormIcon} from '@base/components/@hanbiro/FormIcon';
import {LabelValueIcon} from "@base/types/app";
import {ESectionType, EUserType} from "@analytic/main/types/enum";
import {chartBoxes} from "@analytic/main/config/charts";
import {DragIndicator} from "@mui/icons-material";
import Dnd from "@analytic/dashboard/components/Setting/Dnd";
import {reorder} from "@analytic/dashboard/utils";
import {sectionTitles} from "@analytic/main/config/sections";
import {DragAndDropItem} from "@analytic/dashboard/types/interfaces/setting";
import {findIndex} from "lodash";
import {useDashboardSettings} from "@analytic/dashboard/hooks/useDashboardSettings";
import MainCard from "@base/components/App/MainCard";
import LoadingCircular from "@base/components/@hanbiro/LoadingCircular";
import { useTranslation } from 'react-i18next';

interface Section extends LabelValueIcon, Pick<DragAndDropItem, 'hide'> {
  sx?: BoxProps['sx'];
  items?: Section[];
}

export interface SettingProps {
  userType: EUserType;
}

const Setting = ({userType}: SettingProps) => {
  console.log('Setting Rerender');
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const handleClose = () => {
    if (!anchorEl) {
      return;
    }
    setOpen(false);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  const {
    isLoading,
    sections: sectionsSetting,
    setSection: setSectionSetting
  } = useDashboardSettings(userType);

  const initialize = useMemo(() => {
    return () => {
      const initSections: Section[] = sectionsSetting.map(({key: k, items = []}: DragAndDropItem) => ({
        label: t(sectionTitles[k]),
        value: k,
        items: items.map(({key: c}: DragAndDropItem) => ({
          label: t(chartBoxes[c]?.title) ?? '-',
          value: c
        }))
      }));

      console.log(sectionsSetting, 'sectionsSetting > initialize');

      const [initCheckedSectionKeys, initCheckedChartKeys] = sectionsSetting.reduce((f: any, v) => {
        f[0][v.key] = !v.hide;
        if(v?.items){
          v.items.forEach((v2, i) => {
            f[1][v2.key] = !v2.hide;
          });
        }
        return f;
      }, [{}, {}]);

      return [initSections, initCheckedSectionKeys, initCheckedChartKeys];
    };
  }, [sectionsSetting]);

  const [initSections, initCheckedSectionKeys, initCheckedChartKeys] = initialize();

  const [sections, setSections] = useState<Section[]>(initSections);

  const [checkedSectionKeys, setCheckedSectionKeys] = useState<{[x: string]: boolean}>(initCheckedSectionKeys);

  const [checkedChartKeys, setCheckedChartKeys] = useState<{[x: string]: boolean}>(initCheckedChartKeys);

  useEffect(() => {
    const [initSections, initCheckedSectionKeys, initCheckedChartKeys] = initialize();
    setSections(initSections);
    setCheckedSectionKeys(initCheckedSectionKeys);
    setCheckedChartKeys(initCheckedChartKeys);
    setHasChanged(false);
  }, [sectionsSetting])

  const [hasChanged, setHasChanged] = useState<boolean>(false);

  useEffect(() => {
    const newSections: Section[] = [...sections].map((v) => {
      return {
        ...v,
        hide: !checkedSectionKeys?.[v.value],
        items: !!v?.items ? [...v.items.map((v) => ({
          ...v,
          hide: !checkedChartKeys?.[v.value]
        }))] : []
      };
    });
    setSections(newSections);
    setHasChanged(true);
  }, [checkedSectionKeys, checkedChartKeys]);

  const [expanded, setExpanded] = useState<string>(ESectionType.SECTION_CUSTOMER);

  const handleAccordionChange = (v: string) => {
    setExpanded(v);
  }

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    if (!result.destination) {
      return;
    }

    if (result.type === "droppable") {
      const newSections = reorder(sections, result.source.index, result.destination.index);
      setSections(newSections);
    } else {
      const newSections = [...sections];
      const index = findIndex(newSections, (s) => s.value === result.type);
      if (index !== -1) {
        const items = sections[index]?.items ?? [];
        newSections[index].items = reorder(items, result.source.index, result?.destination?.index ?? 0);
      }
      setSections(newSections);
    }

    setHasChanged(true);
  }

  const handleOnSectionCheckChanged = (k: string, v: boolean) => {
    setCheckedSectionKeys({...checkedSectionKeys, [k]: v});
  };

  const handleOnChartCheckChanged = (k: string, v: boolean) => {
    setCheckedChartKeys({...checkedChartKeys, [k]: v});
  };

  const DraggableChart = (sources: LabelValueIcon[]) => {
    return (provided: DraggableProvided, snapshot: DraggableStateSnapshot, rubric: DraggableRubric) => {
      const i = rubric.source.index;
      const {label, value} = sources[i];

      console.log('labelinsetting', t(label))

      const isCheckedOne: boolean = sources.reduce((f, v) => {
        if(!!checkedChartKeys?.[v.value]){
          f = f + 1;
        }
        return f;
      }, 0) === 1;

      return (
        <ListItem
          key={value}
          divider={i !== sources.length - 1}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            cursor: 'move!important',
            bgcolor: snapshot.isDragging ? 'secondary.light' : 'background.paper',
            pl: '35px'
          }}
        >
          <Stack direction="row" alignItems="center">
            <DragIndicator fontSize="small"/>
            <Checkbox
              inputProps={{'aria-labelledby': value}}
              color="secondary"
              checked={checkedChartKeys?.[value] ?? false}
              indeterminate={false}
              onClick={(event) => {
                event.stopPropagation();
              }}
              onChange={(_, checked) => handleOnChartCheckChanged(value, checked)}
              sx={{cursor: 'pointer!important'}}
              disabled={isCheckedOne && !!checkedChartKeys?.[value]}
            />
            <ListItemText id={value} primary={t(label) as string}/>
          </Stack>
        </ListItem>
      );
    }
  }

  const DraggableSection = (provided: DraggableProvided, snapshot: DraggableStateSnapshot, rubric: DraggableRubric) => {
    const i = rubric.source.index;
    const {label, value, items = []} = sections[i];
    const isLast = i === sections.length - 1;

    return (
      <Box
        ref={provided.innerRef}
        {...provided.draggableProps}
      >
        <Accordion sx={{
          maxWidth: 250,
          border: snapshot.isDragging ? `solid 1px ${theme.palette.divider}` : 'none',
          borderBottom: isLast ? 'none' : `solid 1px ${theme.palette.divider}`,
          bgcolor: snapshot.isDragging ? 'secondary.light' : undefined
        }} expanded={expanded === value} onChange={() => handleAccordionChange(value)}>
          <AccordionSummary
            sx={{
              pl: '5px',
              flexDirection: 'row',
              backgroundColor: 'inherit'
            }}
            aria-controls={`panel${i}d-content`}
            id={`panel${i}d-header`}
          >
            <Stack sx={{cursor: 'move!important'}} direction="row" alignItems="center" {...provided.dragHandleProps}>
              <DragIndicator fontSize="small"/>
              <Checkbox
                color="secondary"
                checked={checkedSectionKeys?.[value] ?? false}
                indeterminate={false}
                onClick={(event) => {
                  event.stopPropagation();
                }}
                onChange={(_, checked) => handleOnSectionCheckChanged(value, checked)}
                sx={{cursor: 'pointer!important'}}
              />
              <Typography component="span" variant="h6">{label}</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails className="scroll-box" sx={{
            p: 0,
            maxHeight: 300,
            pointerEvents: !!checkedSectionKeys?.[value] ? 'initial': 'none',
            opacity: !!checkedSectionKeys?.[value] ? 1 : 0.15,
            borderColor: theme.palette.divider
          }}>
            <List sx={{width: '100%', bgcolor: 'background.paper'}} disablePadding>
              <Dnd type={value} droppableId={`droppable_${value.toLowerCase()}`} renderClone={DraggableChart(items)}
                   items={items}/>
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>
    );
  }

  const handleOnSave = () => {
    const newSectionsSetting: DragAndDropItem[] = sections.map((v) => {
      return {
        key: v.value,
        hide: !!v?.hide,
        items: v?.items?.map(v2 => ({
          key: v2.value,
          hide: !!v2?.hide
        })) ?? []
      }
    });
    setSectionSetting(newSectionsSetting);
    setHasChanged(false);
    handleClose();
  }

  const handleOnCancel = () => {
    const [initSections, initCheckedSectionKeys, initCheckedChartKeys] = initialize();
    setSections(initSections);
    setCheckedSectionKeys(initCheckedSectionKeys);
    setCheckedChartKeys(initCheckedChartKeys);
    setHasChanged(false);
    handleClose();
  }

  return (
    <Box>
      <IconButton aria-describedby={id} sx={{ml: 0.5}} color="secondary" onClick={handleClick}>
        <FormIcon icon="column_settings" iconType="icon"/>
      </IconButton>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        placement="bottom-end"
        onResize={undefined}
        onResizeCapture={undefined}
      >
        {({TransitionProps}) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Fade {...TransitionProps} timeout={100}>
              <MainCard
                title={<Typography variant="h5">Settings</Typography>}
                sx={{
                  bgcolor: 'background.paper',
                }}
                headerSX={{
                  py: '15px!important',
                  bgcolor: 'background.default'
                }}
                contentSX={{
                  p: '0!important'
                }}
              >
                {
                  isLoading && <LoadingCircular loading/>
                }
                <Dnd
                  droppableId="droppable_section"
                  onDragEnd={onDragEnd}
                  renderClone={DraggableSection}
                  items={sections}
                />
                <Divider color={theme.palette.divider} />
                <CardActions sx={{justifyContent: 'flex-end'}}>
                  <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                    <Button variant="outlined" color="secondary" size="small" onClick={handleOnCancel}>{t('ncrm_common_btn_cancel')}</Button>
                    <Button variant="contained" size="small" disabled={!hasChanged} onClick={handleOnSave}>{t('ncrm_common_btn_save')}</Button>
                  </Stack>
                </CardActions>
              </MainCard>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </Box>
  );
};

export default Setting;
