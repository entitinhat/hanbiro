import React from "react";

export interface DndBaseItem {
  key: string;
  title?: string;
  component: React.FunctionComponent;
  componentProps?: any;
}

export interface DndItem extends DndBaseItem{
  draggableProps?: any;
}

export interface DndSourceItem extends DndBaseItem{
  wrapperProps?: any;
  dndItem?: React.FunctionComponent;
  dndItemProps?: any;
  unused?: boolean;
}