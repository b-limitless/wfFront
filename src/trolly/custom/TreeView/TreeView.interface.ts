import { SingleSelectTreeViewProps } from "@material-ui/lab/TreeView";
import { TreeItemProps } from "@material-ui/lab/TreeItem";
import { ReactNode } from "react";

export type TTreeViewOption = {
  nodeId: string;
  label: string | ReactNode;
  nodes: TTreeViewOption[];
  props?: TreeItemProps;
};
export interface ITreeViewProps extends SingleSelectTreeViewProps {
  options: TTreeViewOption[];
  onSelectHandler?: (event: React.ChangeEvent<{}>, nodeIds: string[]) => void;
  onToggleHandler?: (event: React.ChangeEvent<{}>, nodeIds: string[]) => void;
}
