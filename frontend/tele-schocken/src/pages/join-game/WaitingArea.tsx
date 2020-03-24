import React from 'react';
import { observer } from 'mobx-react';
import { List, ListItem, ListItemIcon, ListItemText, Button, TextField } from '@material-ui/core';
import classes from '*.module.css';
import './WaitingArea.css';
import { observable, computed, action } from 'mobx';
import { User } from '../../store/User';

interface WaitingAreaProps { }

@observer
export class WaitingArea extends React.Component<WaitingAreaProps> {
  @observable private timer: NodeJS.Timeout | undefined;
  @observable private users: User[] = [];

  @computed
  private get gameId(): number {
    return this.props.gameId;
  }

  @computed
  private get userElements(): JSX.Element[] {
    return this.users.map((user, index) => {
      if (user.id == 1) {  //if admin
        return (
          <ListItem button key={index}>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary={user.name} />
          </ListItem>
        );
      }
      else {
        return (
          <ListItem button key={index}>
            <ListItemText inset primary={user.name} />
          </ListItem>
        );
      }
    });
  }

  @computed
  private get controlElements() {
    return (
      <div style={{ alignContent: 'center', display: 'flex', height: '20%' }}>
        <div style={{ flex: '1' }}>
          <form noValidate style={{ flex: '1' }} autoComplete="off">
            <TextField id="filled-basic" label="Game ID" variant="filled" defaultValue="4711" />
          </form>
        </div>
        <div style={{ flex: '1' }}>
          <Button variant="contained">Start Game</Button>
        </div>
      </div>
    );
  }



  @action.bound
  public componentDidMount(): void {
    //TODO: Dispose this timer when component is unmounted
    this.timer = setInterval(() => this.waitForUsers(), 1000);
    const user1 = new User();
    user1.id = 1;
    user1.name = "Admin";
    this.users.push(user1);
    const user2 = new User();
    user2.id = 2;
    user2.name = "User2";
    this.users.push(user2);
    const user3 = new User();
    user3.id = 3;
    user3.name = "User3";
    this.users.push(user3);
  }

  @action.bound
  public componentWillUnmount(): void {
    console.log("Unmounted!!!!")
    this.timer=undefined;
  }

  render() {
    return (

      <div style={{ alignContent: 'center', display: 'flex', height: '60%' }}>
        <div style={{ flex: '1' }} />
        <div className=".waiting-area-list-area">
          <List
            component='nav'
            className='waiting-area-list'
            aria-label='contacts'>
            {this.userElements}
          </List>
        </div>
        <div style={{ flex: '1' }} >
          {this.controlElements}
        </div>
      </div>
    );
  }

  @action.bound
  private waitForUsers(): void {
   fetch(`/api/game/${this.gameId}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    }).then(result => {
      console.log('Result: ', result);
    });
  }

  @action.bound
  private handleStartGame(): void{
    this.props.onGameStarted();
  }
}
