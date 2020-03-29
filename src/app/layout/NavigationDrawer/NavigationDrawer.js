import React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { useStyles } from "./NavigationDrawer.style";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["User Profile", "Missions"].map((text, index) => (
          <ListItem button key={text}>
            {index === 0 ? (
              <Link to="/user" className={classes.link}>
                <AccountCircleIcon fontSize="large" />
                <ListItemText primary={text} />
              </Link>
            ) : (
              <Link to="/missions" className={classes.link}>
                <AssignmentIcon fontSize="large" />
                <ListItemText primary={text} />
              </Link>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );

  const anchor = "right";
  return (
    <React.Fragment key={anchor}>
      <Button
        classes={{ root: classes.root, label: classes.label }}
        onClick={toggleDrawer(anchor, true)}
      >
        <MenuIcon fontSize="large" />
      </Button>
      <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
        {list(anchor)}
      </Drawer>
    </React.Fragment>
  );
}