import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import Header from "./Header";
import Main from "./Main";

const theme = createMuiTheme({});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline>
      <SnackbarProvider>
        <Header />
        <Main />
      </SnackbarProvider>
    </CssBaseline>
  </ThemeProvider>
);

export default App;
