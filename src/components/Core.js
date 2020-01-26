import React from 'react';
// MUI Components
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// MUI Icons
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MenuIcon from '@material-ui/icons/Menu';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import BuildIcon from '@material-ui/icons/Build';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import NoteIcon from '@material-ui/icons/Note';
// Routing
import {Link, Route} from 'react-router-dom';
// Local
import logo from '../assets/logo.png';
import Dashboard from './Dashboard';
import Vehicles from './Vehicles';
import Tools from './Tools';
import Companies from './Companies';
import Positions from './Positions';
import Employees from './Employees';
import Notes from './Notes';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  image:{
    height:64,
    backgroundImage:`url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize:'cover',
    backgroundPositionY: '-35px',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Core = (props) => {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openInventories, setOpenInventories] = React.useState(false);
  const [openAdmin, setOpenAdmin] = React.useState(false);
  const [title, setTitle] = React.useState('Welcome');

  const handleClickInventories = () => {
    setOpenInventories(!openInventories);
  };

  const handleClickAdmin = () => {
    setOpenAdmin(!openAdmin);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleSetTitle = title => {
    setTitle(title);
  };

  const drawer = (
    <div>

      <Link to="/">
        <div className={classes.toolbar}>
          <div className={classes.image} />
        </div>
      </Link>
      
      <Divider />

      <List>
        <ListItem button onClick={handleClickInventories}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Inventarios" />
          {openInventories ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openInventories} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>

            <ListItem button component={Link} to={"/vehiculos"} className={classes.nested}>
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText primary="Vehiculos" />
            </ListItem>

            <ListItem button component={Link} to="/herramientas" className={classes.nested}>
              <ListItemIcon>
                <BuildIcon />
              </ListItemIcon>
              <ListItemText primary="Herramientas" />
            </ListItem>

          </List>
        </Collapse>

        <ListItem button onClick={handleClickAdmin}>
          <ListItemIcon>
            <SupervisorAccountIcon />
          </ListItemIcon>
          <ListItemText primary="Administrador" />
          {openAdmin ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openAdmin} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>

            <ListItem button component={Link} to="/empresas" className={classes.nested}>
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary="Empresas" />
            </ListItem>

            <ListItem button component={Link} to="/puestos" className={classes.nested}>
              <ListItemIcon>
                <AccountTreeIcon />
              </ListItemIcon>
              <ListItemText primary="Puestos" />
            </ListItem>

            <ListItem button component={Link} to="/empleados" className={classes.nested}>
              <ListItemIcon>
                <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Empleados" />
            </ListItem>

          </List>
        </Collapse>

        <ListItem button component={Link} to="/notas">
          <ListItemIcon>
            <NoteIcon />
          </ListItemIcon>
          <ListItemText primary="Notas" />
        </ListItem>

      </List>
    </div>
  );

  return (
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
            {title}
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
        
        <Route path="/" exact render={(props) => <Dashboard {...props} setTitle={handleSetTitle} /> } />
        <Route path="/vehiculos" render={(props) => <Vehicles {...props} setTitle={handleSetTitle} /> } />
        <Route path="/herramientas" render={(props) => <Tools {...props} setTitle={handleSetTitle} /> } />
        <Route path="/empresas" render={(props) => <Companies {...props} setTitle={handleSetTitle} /> } />
        <Route path="/puestos" render={(props) => <Positions {...props} setTitle={handleSetTitle} /> } />
        <Route path="/empleados" render={(props) => <Employees {...props} setTitle={handleSetTitle} /> } />
        <Route path="/notas" render={(props) => <Notes {...props} setTitle={handleSetTitle} /> } />

      </main>

    </div>
  );
}

Core.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default Core;
