import {
  Box,
  lighten,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography
} from "@material-ui/core";
import { getMonthDayYear, isOverdue } from "../../utils";
import BlackCheckbox from "../BlackCheckbox";

const useStyles = makeStyles((theme) => ({
  listItemIcon: {
    minWidth: theme.spacing(1)
  },
  listItemGrey: {
    backgroundColor: theme.palette.grey[300],
    margin: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    },
    "&:focus": {
      backgroundColor: theme.palette.grey[200]
    }
  },
  listItemGreen: {
    backgroundColor: lighten(theme.palette.success.light, 0.4),
    margin: theme.spacing(1),
    "&:hover": {
      backgroundColor: lighten(theme.palette.success.light, 0.6)
    },
    "&:focus": {
      backgroundColor: lighten(theme.palette.success.light, 0.6)
    }
  },
  listItemRed: {
    backgroundColor: lighten(theme.palette.error.light, 0.4),
    margin: theme.spacing(1),
    "&:hover": {
      backgroundColor: lighten(theme.palette.error.light, 0.6)
    },
    "&:focus": {
      backgroundColor: lighten(theme.palette.error.light, 0.6)
    }
  },
  ListItemTextCompleted: {
    textDecoration: "line-through"
  }
}));

const TodoListItem = ({
  id,
  isComplete,
  description,
  dueDate,
  OnClickCheckbox
}) => {
  const labelId = `checkbox-list-label-${id}`;
  const classes = useStyles();

  const getListItemStyle = () => {
    if (isComplete) {
      return classes.listItemGreen;
    } else if (isOverdue(dueDate)) {
      return classes.listItemRed;
    } else {
      return classes.listItemGrey;
    }
  };

  return (
    <ListItem
      classes={{ root: getListItemStyle() }}
      dense
      button
      onClick={() => OnClickCheckbox(id)}
    >
      <ListItemIcon className={classes.listItemIcon}>
        <BlackCheckbox
          edge="start"
          checked={isComplete}
          disableRipple
          tabIndex={-1}
          inputProps={{ "aria-labelledby": labelId }}
        />
      </ListItemIcon>
      <ListItemText
        id={labelId}
        className={isComplete ? classes.ListItemTextCompleted : ""}
        primary={
          <Typography variant="h5" component="span">
            {description}
          </Typography>
        }
      />
      {dueDate && (
        <Box edge="end" border={1} p={0.5} m={0.5}>
          <Typography variant="h6" component="span">
            {getMonthDayYear(dueDate)}
          </Typography>
        </Box>
      )}
    </ListItem>
  );
};

export default TodoListItem;
