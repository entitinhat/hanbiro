import React, {SyntheticEvent, useEffect} from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import {Group} from "@base/types/user";
import {Checkbox, FormControlLabel} from "@mui/material";
import {findAllChildrenGroupIds, findAllGroupsByIds} from "./Helper";
import {xor} from "lodash";

export interface GroupTreeProps {
  dataSource: Group[];
  value?: Group[];
  onChange?: (selectedNodes: Group[]) => void;
  includeSubGroup?: boolean;
  expanded?: string[];
  onExpandChanged?: (selectedNodes: string[]) => void;
}

const GroupTree = (props: GroupTreeProps) => {
  const {
    expanded: iExpanded,
    onExpandChanged,
    value = [] as Group[],
    dataSource,
    includeSubGroup = false,
    onChange
  } = props;

  const [expanded, setExpanded] = React.useState<string[]>(iExpanded ?? []);
  const [selected, setSelected] = React.useState<string[]>(value.map((v) => v.id));

  const handleToggle = (event: SyntheticEvent|any, nodeIds: string[]) => {
    if(['svg', 'path'].includes(event?.target?.nodeName ?? '')){
      setExpanded(nodeIds);
    }
  }

  useEffect(() => {
    if(iExpanded && !!xor(expanded, iExpanded).length){
      setExpanded(iExpanded);
    }
  }, [iExpanded]);

  useEffect(() => {
    if(!!xor(expanded, iExpanded).length){
      onExpandChanged && onExpandChanged(expanded);
    }
  }, [expanded]);

  useEffect(() => {
    const ids = value.map((v) => v.id);
    if(!!xor(ids, selected).length){
      setSelected(ids)
    }
  }, [value]);

  useEffect(() => {
    const ids = value.map((v) => v.id);
    if(!!xor(ids, selected).length){
      const newGroups = findAllGroupsByIds(dataSource, selected);
      onChange && onChange(newGroups);
    }
  }, [selected]);

  const handleCheckboxOnChange = (checked: boolean, node: Group) => {
    let newSelectedIds: string[] = [...selected];

    const childrenIds = includeSubGroup ? findAllChildrenGroupIds(node) : [node.id];

    if(checked){
      newSelectedIds = [...newSelectedIds, ...childrenIds.filter((id) => !newSelectedIds.includes(id))];
    } else {
      newSelectedIds = newSelectedIds.filter((id) => !childrenIds.includes(id));
    }

    setSelected(newSelectedIds)
  }

  const renderTree = (nodes: Group) => {
    return (
      <TreeItem
        key={nodes.id} nodeId={nodes.id}
        label={
          <FormControlLabel control={
            <Checkbox
              color="secondary"
              checked={selected.includes(nodes.id)}
              indeterminate={false}
              onChange={(event, checked) => {
                handleCheckboxOnChange(checked, nodes)
              }}
            />
          } label={nodes.name} />
        }
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    )
  };

  return (
    <TreeView
      sx={{
        flexGrow: 1,
        maxWidth: 400,
        maxHeight: 400,
        overflowY: 'auto'
      }}
      aria-label="Group Selection"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleToggle}
      multiSelect
    >
      {
        dataSource?.map((g) => {
          return renderTree(g);
        })
      }
    </TreeView>
  );
};

export default GroupTree;