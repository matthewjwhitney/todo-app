import { Button } from "@material-ui/core";

const RefreshButton = () => (
  <Button onClick={() => window.location.reload()}>Refresh</Button>
);

export default RefreshButton;
