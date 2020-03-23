import React from 'react';
import { observer } from 'mobx-react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import classes from '*.module.css';
import './WaitingArea.css';
import StarIcon from '@material-ui/icons/Star';
import { observable, computed, action } from 'mobx';
import { User } from '../../store/User';

interface WaitingAreaProps { }

@observer
export class WaitingArea extends React.Component<WaitingAreaProps> {
  @observable private users: User[] = [];

  @computed
  private get userElements(): JSX.Element[] {
    return this.users.map((user, index) => {
      if(user.id==1){  //if admin
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



  @action.bound
  public componentDidMount(): void {
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
