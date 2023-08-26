import { Box, Stack, Typography, useTheme } from '@mui/material';
import React, { DragEvent, useState } from 'react';

const SidebarStep = () => {
  const theme = useTheme();
  const [shapeType, setShapeType] = useState(0);
  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const selectedTab = (selected: number) => {
    return shapeType == selected ? { color: theme.palette.grey[0], backgroundColor: theme.palette.grey[600] } : {};
  };
  return (
    <div className="dndsidebar">
      <aside>
        <Stack spacing={1.5}>
          {/* <Box sx={{ backgroundColor: (theme) => theme.palette.grey[300], padding: 1 }}>
            <Typography variant="inherit" color="dark">
              + Add Step
            </Typography>
          </Box> */}
          <Stack direction="row" sx={{ alignItems: 'center', backgroundColor: theme.palette.grey[300], justifyContent: 'center' }}>
            <Box sx={{ flex: 1, cursor: 'pointer', textAlign: 'center', padding: 1, ...selectedTab(0) }} onClick={() => setShapeType(0)}>
              F
            </Box>
            <Box sx={{ flex: 1, cursor: 'pointer', textAlign: 'center', padding: 1, ...selectedTab(1) }} onClick={() => setShapeType(1)}>
              B
            </Box>
          </Stack>
          <Stack spacing={1.5} sx={{ padding: 1 }}>
            <div
              className="dndnode diagram-item diagram-action mini"
              onDragStart={(event) => onDragStart(event, shapeType == 0 ? 'nodeAction' : 'nodeActionBack')}
              draggable
            >
              <div className="diagram-item-name">Action</div>
            </div>
            <div
              className="dndnode diagram-item diagram-wait mini"
              onDragStart={(event) => onDragStart(event, shapeType == 0 ? 'nodeWait' : 'nodeWaitBack')}
              draggable
            >
              <div className="diagram-item-name">Wait</div>
            </div>
            <div
              className="dndnode diagram-item diagram-criteria mini"
              onDragStart={(event) => onDragStart(event, shapeType == 0 ? 'nodeCriteria' : 'nodeCriteriaBack')}
              draggable
            >
              <div className="criteria-shape"></div>
              <div className="diagram-item-name">Criteria</div>
            </div>
            <div
              className="dndnode diagram-item diagram-checklist mini"
              onDragStart={(event) => onDragStart(event, shapeType == 0 ? 'nodeChecklist' : 'nodeChecklistBack')}
              draggable
            >
              <div className="diagram-item-name">Checklist</div>
            </div>
            {shapeType == 0 && (
              <div
                className="dndnode diagram-item diagram-other-process mini"
                onDragStart={(event) => onDragStart(event, 'nodeProcess')}
                draggable
              >
                <div className="diagram-item-name">Process</div>
              </div>
            )}
            <div
              className="dndnode diagram-item diagram-status mini"
              onDragStart={(event) => onDragStart(event, shapeType == 0 ? 'nodeStatus' : 'nodeStatusBack')}
              draggable
            >
              <div className="diagram-item-name">Status</div>
            </div>
            <div
              className="dndnode diagram-item diagram-simple mini"
              onDragStart={(event) => onDragStart(event, shapeType == 0 ? 'nodeSimple' : 'nodeSimpleBack')}
              draggable
            >
              <div className="diagram-item-name">SimpleAction</div>
            </div>
            <div
              className="dndnode diagram-item diagram-site mini"
              onDragStart={(event) => onDragStart(event, shapeType == 0 ? 'nodeSite' : 'nodeSiteBack')}
              draggable
            >
              <div className="diagram-item-name">Site</div>
            </div>
            {shapeType == 0 && (
              <div className="dndnode diagram-item diagram-status mini" onDragStart={(event) => onDragStart(event, 'nodeClose')} draggable>
                <div className="diagram-item-name">Close</div>
              </div>
            )}
          </Stack>
        </Stack>
      </aside>
    </div>
  );
};

export default SidebarStep;
