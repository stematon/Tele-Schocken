import React from 'react';
import { Button, Container } from '@material-ui/core';
import './ForeignPlayer.css';
import { Dice } from '../../../../../components/dice/Dice';
import { computed } from 'mobx';

interface ForeignPlayerProps {
  displayName: string;
  dice1: number;
  dice2: number;
  dice3: number;
}

export class ForeignPlayer extends React.Component<ForeignPlayerProps> {

  @computed
  private get displayName(): string {
    return this.props.displayName;
  }
  @computed
  private get dice1(): number{
    return this.props.dice1;
  }
  @computed
  private get dice2(): number{
    return this.props.dice2;
  }
  @computed
  private get dice3(): number{
    return this.props.dice3;
  }

  render() {
    return (
      <div className='foreign-player'>
        <h4>{this.displayName}</h4>
        <div className='foreign-player-dices'>
          <Dice eyes={this.dice1} />
          <Dice eyes={this.dice2} />
          <Dice eyes={this.dice3} />
        </div>
      </div>
    );
  }
}
