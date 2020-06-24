import React from 'react';
// MUI Components
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
// MUI Icons
import ListItemIcon from '@material-ui/core/ListItemIcon';
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
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
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
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  image:{
    height:64,
    backgroundImage:`url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize:'cover',
    backgroundPositionY: '-35px',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Core = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const [openInventories, setOpenInventories] = React.useState(false);
  const [openAdmin, setOpenAdmin] = React.useState(false);
  const [title, setTitle] = React.useState('Welcome');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickInventories = () => {
    setOpenInventories(!openInventories);
  };

  const handleClickAdmin = () => {
    setOpenAdmin(!openAdmin);
  };

  const handleSetTitle = title => {
    setTitle(title);
  };

  const drawer = (
    <div>

      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      
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
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
       {drawer}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        
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

export default Core;
