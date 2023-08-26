import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragIndicator from "@mui/icons-material/DragIndicator";

const items = ["JTD #123", "JTD #125", "JTD #127", "JTD #129"];

const DraggableSimple = () => {
  const [sortedItems, setSortedItems] = useState(items);

  const handleDrop = (droppedItem: any) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...sortedItems];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setSortedItems(updatedList);
  };

  return (
    <DragDropContext onDragEnd={handleDrop}>
      <Droppable droppableId={"list"}>
        {({ droppableProps, innerRef, placeholder }) => (
          <List {...droppableProps} ref={innerRef}>
            {sortedItems.map((item, index) => (
              <Draggable key={item} draggableId={item} index={index}>
                {({ draggableProps, dragHandleProps, innerRef }) => (
                  <ListItem key={item} {...draggableProps} ref={innerRef}>
                    <ListItemIcon {...dragHandleProps}>
                      <DragIndicator />
                    </ListItemIcon>

                    <ListItemText primary={item} />
                  </ListItem>
                )}
              </Draggable>
            ))}
            {placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableSimple;