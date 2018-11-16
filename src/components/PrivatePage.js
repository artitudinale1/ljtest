import React from 'react';
import {routes} from '../utils';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 240;

const styles = theme => ({
  typography: {
    useNextVariants: true,
  },
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    marginTop: '64px',
  },
});

function PrivatePage(props) {
  const {classes, children} = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container spacing={8} direction="row" >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Grid item xs={11}>
              <Typography variant="h6" color="inherit" noWrap>
                Limejump React-Redux Template
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Link to="/login">Logout</Link>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid item xs={2}>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left">
            <div className={classes.toolbar} />
            <Divider />
            <List>
              {routes.map(
                r =>
                  r.private && (
                    <ListItem button key={r.label} component="a" href={r.path}>
                      <ListItemIcon>{<r.icon />}</ListItemIcon>
                      <ListItemText primary={r.label} />
                    </ListItem>
                  ),
              )}
            </List>
            <Divider />
          </Drawer>
        </Grid>
        <Grid item xs={10}>
          <main className={classes.content}>{children}</main>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(PrivatePage);
