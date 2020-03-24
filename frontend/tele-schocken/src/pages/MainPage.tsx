import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, AppBar, Toolbar, Button } from '@material-ui/core';
import './MainPage.css';
import { PlayGamePage } from './play-game/PlayGamePage';
import { JoinComponent } from './join-game/JoinComponent';
import { observer } from 'mobx-react';
import { WaitingArea } from './join-game/WaitingArea';

@observer
export class MainPage extends React.Component {
  render() {
    return (
      <Container className="main-page">
        <AppBar position='static' className='main-page-header'>
          <Toolbar>
            <h1 className='main-page-header-text'>Tele-Schocken</h1>
          </Toolbar>
        </AppBar>
        <Router>
          <Switch>
            <Route exact path='/play' component={PlayGamePage} gameId={1234} isWaiting={true}/>
            <Route path='' component={JoinComponent} />
          </Switch>
        </Router>
      </Container>
    );
  }
}
