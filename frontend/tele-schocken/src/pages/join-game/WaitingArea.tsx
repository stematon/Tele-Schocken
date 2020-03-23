import React from 'react';
import { observer } from 'mobx-react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import classes from '*.module.css';
import './WaitingArea.css';
import StarIcon from '@material-ui/icons/Star';
import { observable, computed, action } from 'mobx';
import { User } from '../../store/User';

interface WaitingAreaProps {}

@observer
export class WaitingArea extends React.Component<WaitingAreaProps> {
  @observable private users: User[] = [];

  @computed
  private get userElements(): JSX.Element[] {
    return this.users.map((user, index) => {
      return (
        <ListItem button key={index}>
          <ListItemText inset primary={user.name} />
        </ListItem>
      );
    });
  }

  @action.bound
  public componentDidMount(): void {
    const user1 = new User();
    user1.id=1;
    user1.name= "User1";
    this.users.push(user1);
    const user2 = new User();
    user2.id=2;
    user2.name= "User2";
    this.users.push(user2);
  }

  render() {
    return (
      <div>
        <List
          component='nav'
          className='waiting-area-list'
          aria-label='contacts'>
          {this.userElements}
        </List>
      </div>
    );
  }
}
