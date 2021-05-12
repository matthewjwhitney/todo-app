import { AppBar, Toolbar, Typography } from "@material-ui/core";

const Header = () => (
  <AppBar position="sticky">
    <Toolbar>
      <Typography variant="h5">Todo App</Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
