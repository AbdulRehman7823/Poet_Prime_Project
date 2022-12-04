import React from "react";
import Drawer from "@mui/material/Drawer";
import {
  AppBar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate, useLocation } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CategoryIcon from "@mui/icons-material/Category";
import LogoutIcon from "@mui/icons-material/Logout";
import InsightsIcon from "@mui/icons-material/Insights";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from '@mui/icons-material/Dashboard';
import {format} from 'date-fns';
import authServices from "../../../Services/AuthServices";

const drawerWidth = 270;

const useStyles = makeStyles((theme)=>
{
 return{  
   page:
    {
    width:"100%",
    paddingTop:"6rem",
    paddingLeft:"2rem",
    paddingRight:"2rem"},

    
  active: {
    backgroundColor: "red"
  },
   appbar: {
    width: `calc(100% - ${drawerWidth}px)`
  },
  drawer: {
    width: drawerWidth
  },
  root: {
    display: "flex"
  },
}
});

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const location = useLocation();
  const menuItems = [
    {
      text: "Home",
      icone: <HomeIcon color="secondary" />,
      path: "/",
    },
    {
      text: "Products",
      icone: <CategoryIcon color="secondary" />,
      path: "/dashboard/products",
    },
    {
      text: "Logout",
      icone: <LogoutIcon color="secondary" />,
      path: "/",
    },
  ];

  return (
    
    <div className={classes.root}>
      <AppBar  style={{ width: `calc(100% - ${drawerWidth}px)`}} >
        <Toolbar>
          <Typography style={{ paddingLeft:"2rem"}}>Today Date is: {format(new Date(),"do MMMM Y")}</Typography>
        </Toolbar>
      </AppBar>
  
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawer }}
      >
      <ListItem>
      <DashboardIcon color='secondary'/>
        <Typography variant="h5" style={{ padding:"0.3rem"}}>
        
        Dashboard</Typography>
        </ListItem>
        <List>
          {menuItems.map((menuItem, index) => (
            <ListItem
              key={index}
              button
              onClick={() => {
                if(menuItem.text=="Logout"){
                    authServices.logout();
                    navigate(menuItem.path);
                    window.location.reload();
                }else{
                  navigate(menuItem.path);
                }
                
              }}
              style={location.pathname === menuItem.path ? {background:"#f4f4f4"} : null}
            >
              <ListItemIcon>{menuItem.icone}</ListItemIcon>
              <ListItemText primary={menuItem.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

<div className={classes.page}>
      <div>{children}</div>
      </div>
    </div>
    
  );
};

export default Layout;
