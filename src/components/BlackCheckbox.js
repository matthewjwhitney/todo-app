import { Checkbox, withStyles } from "@material-ui/core";

export default withStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
    "&$checked": {
      color: theme.palette.text.primary
    }
  },
  checked: {}
}))((props) => <Checkbox color="default" {...props} />);
