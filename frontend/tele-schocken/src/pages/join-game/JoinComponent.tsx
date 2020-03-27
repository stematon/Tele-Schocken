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
import { observer } from 'mobx-react';
import SwipeableViews from 'react-swipeable-views';
import { Redirect } from 'react-router';
import { Game } from '../../store/Game';

interface CreateGameDto {
  Link: string;
  UUID: string;
  Admin_Id: number;
}

interface ValidationFailure{
  error: boolean;
  helperText: string;
}

interface JoinComponentProps {
  onAdminIdChange(id: number): void;
}

@observer
export class JoinComponent extends React.Component<JoinComponentProps> {
  @observable private gameCodeInput: string = '';
  @observable private usernameInput: string = '';
  @observable private tabIndex: number = 1;
  @observable private gameUuid: string;
  @observable private validationFailure: ValidationFailure;
  @observable private adminId: number;

  @computed
  private get redirect(): JSX.Element {
    if (this.gameUuid === undefined) {
      return <div></div>;
    } else {
      return <Redirect to={`/${this.gameUuid}`} />;
    }
  }

  public constructor(props: any){
    super(props);
    console.log(this.props)

    this.validationFailure = {
      error: false,
      helperText: ""
    };
  }

  render() {
    return (
      <div style={{ alignContent: 'center', display: 'flex', height: '60%' }}>
        {this.redirect}
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
                        error={this.validationFailure.error}
                        id='game-uuid'
                        label='Spiel-Code'
                        variant='outlined'
                        helperText={this.validationFailure.helperText}
                        onChange={this.handleInputGameCodeChange}
                      />
                    </form>
                  </div>
                  <div
                    className='join-component-button-area-button'
                    onClick={this.handleJoinGame}>
                    <Button
                      color='primary'
                      disabled={this.gameCodeInput === ''}>
                      Join!
                    </Button>
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
  }

  @action.bound
  private handleInputGameCodeChange(e: any): void {
    this.gameCodeInput = e.target.value;
    this.validationFailure= {
      error: false,
      helperText: ""
    }
  }

  @action.bound
  private handleTabIndexChange(e: any, value: number): void {
    this.tabIndex = value;
  }

  @action.bound
  private handleJoinGame(e: any): void {
    fetch(`/api/game/${this.gameCodeInput}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      if (res.status === 404) {
        this.validationFailure={
          error: true,
          helperText: "Unknown Game Id!"
        }
      } else {
        this.gameUuid = this.gameCodeInput;
      }
    });
  }

  @action.bound
  private handleCreateGame(e: any): void {
    fetch('/api/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: this.usernameInput })
    })
      .then(res => res.json())
      .then(res => {
        const createGameDto = res as CreateGameDto;
        this.gameUuid = createGameDto.UUID;
        this.adminId = createGameDto.Admin_Id;
      });
  }
}
