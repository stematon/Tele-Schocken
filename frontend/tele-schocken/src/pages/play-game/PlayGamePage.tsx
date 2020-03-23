import React from 'react';
import { Button, Container } from '@material-ui/core';
import './PlayGamePage.css';
import { OwnPlayer } from './own-player/OwnPlayer';
import { ForeignPlayer } from './foreign-player/ForeignPlayer';

export class PlayGamePage extends React.Component {
  render() {
    return (
      <div className='play-game-page'>
        <div className='play-game-page-foreign-section'>
          <ForeignPlayer displayName="Lars" dice1={1} dice2={2} dice3={3}/>
          <ForeignPlayer displayName="Marius" dice1={4} dice2={5} dice3={6}/>
          <ForeignPlayer displayName="André" dice1={1} dice2={1} dice3={1}/>
        </div>
        <div>
          <h2>Hier ist die Mitte mit dem Stack</h2>
        </div>
        <div className="play-game-page-own-section">
          <OwnPlayer />
        </div>
      </div>
    );
  }
}
