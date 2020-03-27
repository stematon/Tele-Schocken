import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, AppBar, Toolbar } from '@material-ui/core';
import './MainPage.css';
import { PlayGamePage } from './play-game/PlayGamePage';
import { JoinComponent } from './join-game/JoinComponent';
import { observer, Observer } from 'mobx-react';
import { observable, action } from 'mobx';



@observer
export class MainPage extends React.Component {
  @observable private adminId: number|undefined = undefined;

  render() {
    return (
      <Container className='main-page'>
        <AppBar position='static' className='main-page-header'>
          <Toolbar>
            <h1 className='main-page-header-text'>Tele-Schocken</h1>
          </Toolbar>
        </AppBar>
        <Router>
          <Switch>
          
          <Route
              exact
              path='/:gameUuid'
              render={routeProps => (
                <Observer>
                  {() => <PlayGamePage adminId={this.adminId} isWaiting={true} {...routeProps}/>}
                </Observer>
              )}
            />
            <Route path='/' 
              render={routeProps => (
                <Observer>
                  {() => <JoinComponent onAdminIdChange={this.handleAdminIdChange} {...routeProps} />}
                </Observer>
              )}
            />
            
          </Switch>
        </Router>
      </Container>
    );
  }

  @action.bound
  private handleAdminIdChange(id: number): void {
    this.adminId = id;
  }
}
