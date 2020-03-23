import React from 'react';
import {
  Button,
  Container,
  TextField,
  AppBar,
  Tabs,
  Tab
} from '@material-ui/core';
import './JoinComponent.css';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { throwStatement } from '@babel/types';


interface JoinComponentProps {
}

@observer
export class JoinComponent extends React.Component<JoinComponentProps> {
  @observable private gameCodeInput: string = '';
  @observable private usernameInput: string = '';
  @observable private tabIndex: number = 1;

  render() {
    return (
      <div style={{ alignContent: 'center', display: 'flex', height: '60%' }}>
        <div style={{ flex: '1' }} />
        <div className='join-component-button-area'>
          <div>
            <AppBar position='static' color='default'>
              <Tabs
                value={this.tabIndex}
                onChange={this.handleTabIndexChange}
                indicatorColor='primary'
                textColor='primary'
                variant='fullWidth'
                aria-label='full width tabs example'>
                <Tab label='Join Game' />
                <Tab label='Create Game' />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={'x-reverse'}
              index={this.tabIndex}
              onChangeIndex={this.handleTabIndexChange}>
              <div>
                <div className='join-component-button-area-row'>
                  <div className='join-component-button-area-button'>
                    <form
                      className='join-component-form'
                      noValidate
                      autoComplete='off'>
                      <TextField
                        id='game-uuid'
                        label='Spiel-Code'
                        variant='outlined'
                        onChange={this.handleInputGameCodeChange}
                      />
                    </form>
                  </div>
                  <div
                    className='join-component-button-area-button'
                    onClick={this.handleJoinGame}>
                    <Button color='primary'>Beitreten</Button>
                  </div>
                </div>
              </div>
              <div>
                <div className='join-component-button-area-row'>
                  <div className='join-component-button-area-button'>
                    <div className='join-component-button-area-button'>
                      <form
                        className='join-component-form'
                        noValidate
                        autoComplete='off'>
                        <TextField
                          id='user-name'
                          label='Name'
                          variant='outlined'
                          onChange={this.handleInputUserChange}
                        />
                      </form>
                    </div>
                  </div>
                  <div className='join-component-button-area-button'>
                    <Button
                      color='primary'
                      onClick={this.handleCreateGame}
                      disabled={this.usernameInput === ''}>
                      New Game!
                    </Button>
                  </div>
                </div>
              </div>
            </SwipeableViews>
          </div>
        </div>
        <div style={{ flex: '1' }} />
      </div>
    );
  }

  @action.bound
  private handleInputUserChange(e: any): void {
    this.usernameInput = e.target.value;
    //console.log("Username: " + this.usernameInput);
  }

  @action.bound
  private handleInputGameCodeChange(e: any): void {
    this.gameCodeInput = e.target.value;
    //console.log("Game-code: " + this.gameCodeInput);
  }
  @action.bound
  private handleTabIndexChange(e: any, value: number): void {
    this.tabIndex = value;
    //console.log("TabIndexValue ", value);
  }
  private handleJoinGame(e: any): void {
    //console.log("Join Game");
  }

  @action.bound
  private handleCreateGame(e: any): void {
    fetch('/api/game', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: this.usernameInput })
    }).then(result => console.log('Result: ', result));

    //console.log("Create Game");
  }
}
