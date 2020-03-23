import React from 'react';
import { Button, Container } from '@material-ui/core';
import './Dice.css';
import { computed } from 'mobx';

interface DiceProps {
  eyes: number;
}

export class Dice extends React.Component<DiceProps> {
  
  @computed
  private get eyes(): number {
    return this.props.eyes;
  }

  @computed
  private get dicePage(): JSX.Element {
    switch (this.eyes) {
      case 1: {
        return (
          <div className='dice dice-first-face'>
            <span className='dot' />
          </div>
        );
      }
      case 2: {
        return (
          <div className='dice dice-second-face'>
            <span className='dot' />
            <span className='dot' />
          </div>
        );
      }
      case 3: {
        return (
          <div className='dice dice-third-face'>
            <span className='dot' />
            <span className='dot' />
            <span className='dot' />
          </div>
        );
      }
      case 4: {
        return (
          <div className='dice dice-fourth-face'>
            <div className='dice-column'>
              <span className='dot' />
              <span className='dot' />
            </div>
            <div className='dice-column'>
              <span className='dot' />
              <span className='dot' />
            </div>
          </div>
        );
      }
      case 5: {
        return (
          <div className='dice dice-fifth-face'>
            <div className='dice-column'>
              <span className='dot' />
              <span className='dot' />
            </div>
            <div className='dice-column'>
              <span className='dot' />
            </div>
            <div className='dice-column'>
              <span className='dot' />
              <span className='dot' />
            </div>
          </div>
        );
      }
      case 6: {
        return (
          <div className='dice dice-sixth-face'>
            <div className='dice-column'>
              <span className='dot' />
              <span className='dot' />
              <span className='dot' />
            </div>
            <div className='dice-column'>
              <span className='dot' />
              <span className='dot' />
              <span className='dot' />
            </div>
          </div>
        );
      }
      default: {
        return <div />;
      }
    }
  }

  render() {
    return (
     <div>
       {this.dicePage}
     </div>
    );
  }
}
