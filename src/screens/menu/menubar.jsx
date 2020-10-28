import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useTheme } from '@material-ui/core/styles';
import { Route, Link, Router, Switch, useHistory } from 'react-router-dom';
import { useStyles } from './menubar.styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/user/actions';
const MenuBar = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const dispath = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const history = useHistory();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    const params = {
      userId: user.id
    };

    dispath(logout(params))
    window.location.replace('/');;
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {props.routes.map((item, index) => (
          <Link key={index} to={item.path} className={classes.linkStyle}>
            <ListItem button key={item.name}>
              <ListItemIcon>{item.icon()}</ListItemIcon>
              <ListItemText style={{ color: 'white' }} primary={item.name} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <Link to={"/"} onClick={handleLogout} className={classes.linkStyle}>
        <ListItem >
          <ListItemIcon>
            <ExitToAppIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText style={{ color: 'white' }} primary={"Cerrar Sesion"} />
        </ListItem>
      </Link>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const getCurrentLocationName = () => {
    const { routes } = props;
    let name = "";
    if (routes) {
      const element = routes.find(item => item.path === history.location.pathname);
      name = element.name;
    }
    return name
  }

  return (
    <Router history={history} >
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {getCurrentLocationName()}
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            {
              props.routes.map((item, key) => (
                item.name === 'Panel' ?
                  <Route key={key} path={item.path} component={item.component} exact />
                  :
                  <Route key={key} path={item.path} component={item.component} />
              ))
            }
          </Switch>
        </main>
      </div>
    </Router>
  );
}

MenuBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default MenuBar;