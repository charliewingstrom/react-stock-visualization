import React from 'react';
import Page from './page.js';
import Map from './map.js';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Drawer from '@material-ui/core/Drawer';
import ListItemText from '@material-ui/core/ListItemText';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Link,Switch,Router,Route,withRouter} from "react-router-dom";
import { createBrowserHistory } from "history";


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: '#2E3B55' 
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
const customHistory = createBrowserHistory();



function App() {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <Router history={customHistory}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" noWrap>Final Project</Typography>
            </Toolbar>
          </AppBar>
          <Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper,}}>
            <Toolbar />
            <div className={classes.drawerContainer}>
              <Toolbar>
                <List>
                  <ListItem button pageName="welcome" component={Link} to="/">
                    <ListItemText primary='Welcome'/>
                  </ListItem>
                  <ListItem button pageName="chart" component={Link} to="/chart">
                    <ListItemText primary='Stock Chart'/>
                  </ListItem>
                  <ListItem button pageName="map" component={Link} to="/map">
                    <ListItemText primary='COVID-19 Heatmap'/>
                  </ListItem>
                  <ListItem button pageName="about" component={Link} to="/about">
                    <ListItemText primary='About'/>
                  </ListItem>
                </List>
              </Toolbar>
            </div>
          </Drawer>
          <main className={classes.content}>
            <Toolbar />
            <Typography variant="h6">
                <Switch>
                  <Route exact path="/">
                    <WelcomePage />
                  </Route>
                  <Route path="/chart">
                    <ChartPage />
                  </Route>
                  <Route path="/map">
                    <MapPage />
                  </Route>
                  <Route path="/about">
                    <AboutPage />
                  </Route>
                </Switch>
            </Typography>
          </main>
        </Router>
      </div>
      );
  }
  
class _MapPage extends React.Component{
    render() {
      return (
        <div className="MapPage">
          <Map />
        </div>
      );
    }
  }
  
class _WelcomePage extends React.Component {
    render() {
        return(
        <div className={'chartAndMap'}>
        <Page/>,
        <Map />
    </div>)
    }
  }
class _ChartPage extends React.Component {
    render() {
        return(
        <div className={'ChartPage'}>
        <Page/>
    </div>)
    }
  }

class _AboutPage extends React.Component{
  render(){
    return(
      <div className={'AboutPage'}>
      <h1>About</h1>
      <p>Our project is creating visualizations to show users historical stock data of companies of their choosing against Covid-19 case numbers. </p>
        <ul>
          <li>Our first visualization will be an interactive chart of stocks chosen by the user with Covid-19 case numbers placed on the graph. </li>
          <li>The second visualization will be a map of Covid-19 cases colored by severity of the outbreak. </li>
          <li>Our stock data will be from an API provided by Alpha Vantage to display real time and historical stock data. </li>
          <li>The authentication required is an API key provided for free by Alpha Vantage.</li>
        </ul>
        <p>The Covid-19 case data will be gathered from Johns Hopkins using an API. This API requires no authentication to use.</p>
        </div>
    )
  }
}
const MapPage = withRouter(_MapPage);
const ChartPage = withRouter(_ChartPage);
const WelcomePage = withRouter(_WelcomePage);
const AboutPage = withRouter(_AboutPage);

export default App;

