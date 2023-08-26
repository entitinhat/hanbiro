import * as React from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

interface Tab {
  id: string;
  label: string;
  value: string;
  content: string;
}

interface TabProps {
  index: number;
  child: React.ReactElement;
  label: string;
  value: string;
}

function DraggableTab(props: TabProps) {
  return (
    <Draggable draggableId={`${props.index}`} index={props.index} disableInteractiveElementBlocking>
      {(draggableProvided) => (
        <div ref={draggableProvided.innerRef} {...draggableProvided.draggableProps}>
          {React.cloneElement(props.child, {
            ...props,
            ...draggableProvided.dragHandleProps
          })}
        </div>
      )}
    </Draggable>
  );
}

const reorderItem = (list: Tab[], startIndex: number, endIndex: number): Tab[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const StyledTabList = styled(TabList)();
const StyledTab = styled(Tab)();

export default function DraggableTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setValue(newValue);
  };

  const [tabs, setTabs] = React.useState<Tab[]>(
    [...Array(55)].map((_, index) => ({
      id: `tab${index + 1}`,
      label: `Tab ${index + 1}`,
      value: `${index + 1}`,
      content: `Content ${index + 1}`
    }))
  );

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const newTabs: Tab[] = reorderItem(tabs, result.source.index, result.destination.index);
    setTabs(newTabs);
  };

  const _renderTabList = (droppableProvided: DroppableProvided) => (
    <StyledTabList onChange={handleChange} variant="scrollable">
      {tabs.map((tab, index) => {
        const child = <StyledTab label={tab.label} value={tab.value} key={index} />;

        return <DraggableTab label={tab.label} value={tab.value} index={index} key={index} child={child} />;
      })}
      {droppableProvided ? droppableProvided.placeholder : null}
    </StyledTabList>
  );

  const _renderTabListWrappedInDroppable = () => (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="1" direction="horizontal">
          {(droppableProvided) => (
            <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
              {_renderTabList(droppableProvided)}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );

  return (
    <TabContext value={value}>
      <Stack>{_renderTabListWrappedInDroppable()}</Stack>
      {tabs.map((tab, index) => (
        <TabPanel value={tab.value} key={index}>
          {tab.content}
        </TabPanel>
      ))}
    </TabContext>
  );
}
