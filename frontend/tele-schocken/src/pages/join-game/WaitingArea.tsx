import React from 'react';
import { observer } from 'mobx-react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import classes from '*.module.css';
import "./WaitingArea.css"
import StarIcon from '@material-ui/icons/Star';

interface WaitingAreaProps {}

@observer
export class WaitingArea extends React.Component<WaitingAreaProps> {
  render() {
    return (
    <div>
      <List component="nav" className="waiting-area-list" aria-label="contacts">
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Chelsea Otakan" />
      </ListItem>
      <ListItem button>
        <ListItemText inset primary="Eric Hoffman" />
      </ListItem>
    </List>
    </div>
    );
  }
}
