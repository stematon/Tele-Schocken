import React from 'react';
import { observer } from 'mobx-react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  TextField
} from '@material-ui/core';
import classes from '*.module.css';
import './WaitingArea.css';
import { observable, computed, action } from 'mobx';
import { User } from '../../../store/User';
import { Game } from '../../../store/Game';

interface WaitingAreaProps {
  gameUuid: string;
  onGameStarted(game: Game): void;
}

@observer
export class WaitingArea extends React.Component<WaitingAreaProps> {
  @observable private timer: number = -1;
  @observable private users: User[] = [];
  @observable private game: Game = undefined;

  @computed
  private get gameUuid(): string {
    return this.props.gameUuid;
  }

  @computed
  private get userElements(): JSX.Element[] {
    return this.users.map((user, index) => {
      if (user.Id == 1) {
        //if admin
        return (
          <ListItem button key={index}>
            <ListItemIcon>{/*<StarIcon /> */}</ListItemIcon>
            <ListItemText primary={user.Name} />
          </ListItem>
        );
      } else {
        return (
          <ListItem button key={index}>
            <ListItemText inset primary={user.Name} />
          </ListItem>
        );
      }
    });
  }

  @action.bound
  public componentDidMount(): void {
    //TODO: Dispose this timer when component is unmounted
    this.timer = window.setInterval(() => this.waitForUsers(), 5000) as any;
    console.log('timer', this.timer);
    console.log('Test');
    const user1 = new User();
    user1.Id = 1;
    user1.Name = 'Admin';
    this.users.push(user1);
    const user2 = new User();
    user2.Id = 2;
    user2.Name = 'User2';
    this.users.push(user2);
    const user3 = new User();
    user3.Id = 3;
    user3.Name = 'User3';
    this.users.push(user3);
  }

  render() {
    return (
      <div
        style={{
          alignContent: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}>
        <div className='.waiting-area-list-area'>
          <List
            component='nav'
            className='waiting-area-list'
            aria-label='contacts'>
            {this.userElements}
          </List>
        </div>
        <div style={{ flex: '1', marginTop: '200px' }}>
          <Button variant='contained' onClick={this.handleStartGame}>
            Start Game
          </Button>
        </div>
      </div>
    );
  }

  @action.bound
  private waitForUsers(): void {
    fetch(`/api/game/${this.gameUuid}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        console.log('Game', res);
        this.game = res;
        if (this.game.State !== 'started') {
          // TODO: Uncomment this, when long-polling is used
          // this.waitForUsers();
          console.log("Game not start yet")
        } else {
          this.props.onGameStarted(this.game)
        }
      });
  }

  @action.bound
  private handleStartGame(): void {
    window.clearInterval(this.timer);
    this.props.onGameStarted(this.game);
  }
}
