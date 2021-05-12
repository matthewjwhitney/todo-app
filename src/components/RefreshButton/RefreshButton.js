import { Button } from "@material-ui/core";

const RefreshButton = () => (
  <Button data-testid="refresh-button" onClick={() => window.location.reload()}>
    Refresh
  </Button>
);

export default RefreshButton;
