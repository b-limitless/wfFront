import React, { useMemo } from "react";
import { IProps, TIconTypes } from "./Icons.interface";
import Skeleton from "@material-ui/lab/Skeleton";
import { getDimensionBySize } from "./icons.utils";
import { makeStyles } from "@material-ui/core/styles";
import Svgs from "./svgs";
interface IIconRendererProps extends IProps {
  iconName: TIconTypes;
}

const useStyles = makeStyles({
  root: {
    borderRadius: "5px",
  },
});

const IconRenderer: React.FC<IIconRendererProps> = ({
  iconName,
  ...restProps
}) => {
  const classes = useStyles();
  const { width, height, iconSize } = restProps;
  const ImportedIcon = useMemo(() => Svgs[iconName], [iconName]);
  return (
    <React.Suspense
      fallback={
        <Skeleton
          classes={classes}
          variant="rect"
          width={iconSize !== "CUSTOM" ? getDimensionBySize(iconSize) : width}
          height={iconSize !== "CUSTOM" ? getDimensionBySize(iconSize) : height}
        />
      }
    >
      <ImportedIcon {...restProps} />
    </React.Suspense>
  );
};

export default IconRenderer;
