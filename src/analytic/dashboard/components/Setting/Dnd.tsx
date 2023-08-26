import React from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableChildrenFn,
  Droppable,
  DroppableId,
  DropResult,
  ResponderProvided,
  TypeId
} from "react-beautiful-dnd";
import {Box} from "@mui/material";
import {LabelValueIcon} from "@base/types/app";

interface DndProps {
  droppableId: DroppableId;
  onDragEnd?: (result: DropResult, provided: ResponderProvided) => void;
  renderClone: DraggableChildrenFn;
  items: LabelValueIcon[];
  type?: TypeId;
}

const Dnd = (props: DndProps) => {
  const {
    droppableId,
    onDragEnd,
    renderClone,
    items,
    type
  } = props;

  const renderDroppable = () => (
    <Droppable droppableId={droppableId} type={type ?? 'droppable'} renderClone={renderClone}>
      {(provided, {isDraggingOver}) => (
        <Box
          {...provided.droppableProps}
          ref={provided.innerRef}
          sx={{
            bgcolor: 'secondary.lighter'
          }}
        >
          {
            items.map((s, i) => (
              <Draggable key={s.value} draggableId={s.value} index={i}>
                {renderClone}
              </Draggable>
            ))
          }
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );

  return !onDragEnd ? renderDroppable() : (
    <DragDropContext onDragEnd={(...args) => onDragEnd && onDragEnd(...args)}>
      {renderDroppable()}
    </DragDropContext>
  );
};

export default Dnd;