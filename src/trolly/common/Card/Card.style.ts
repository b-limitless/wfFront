import Card from "@material-ui/core/Card";
import {
  spacing,
  palette,
  sizing,
  display,
  borders,
  flexbox,
  grid,
  positions,
  shadows,
  compose,
} from "@material-ui/system";
import CardActions from "@material-ui/core/CardActions";
import { styled } from "@material-ui/core/styles";

export const StyledCard = styled(Card)(
  compose(
    palette,
    spacing,
    borders,
    display,
    sizing,
    grid,
    flexbox,
    positions,
    shadows
  )
);
export const StyledCardActions = styled(CardActions)(
  compose(palette, spacing, borders, display, sizing, grid, flexbox, positions)
);
