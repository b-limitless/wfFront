import React from "react";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { useStyles } from "./TreeView.style";
import { ITreeViewProps, TTreeViewOption } from "./TreeView.interface";
import { useCallback } from "react";

const ControlledTreeView: React.FC<ITreeViewProps> = ({
  options,
  onSelectHandler,
  onToggleHandler,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleToggle = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
    if (onToggleHandler) {
      onToggleHandler(event, nodeIds);
    }
    setExpanded(nodeIds);
  };

  const handleSelect = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
    setSelected(nodeIds);
    if (onSelectHandler) {
      onSelectHandler(event, nodeIds);
    }
  };

  const renderNodes = useCallback(
    (items: TTreeViewOption[]) => {
      if (items && items.length > 0) {
        return items.map(({ label, nodeId, nodes }) => {
          return (
            <TreeItem
              className={classes.treeItem}
              label={label}
              nodeId={nodeId}
            >
              {renderNodes(nodes)}
            </TreeItem>
          );
        });
      }
    },
    [classes]
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      {renderNodes(options)}
    </TreeView>
  );
};

export default ControlledTreeView;
