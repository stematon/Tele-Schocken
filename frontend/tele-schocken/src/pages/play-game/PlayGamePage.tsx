import React from 'react';
import './PlayGamePage.css';
import { OwnPlayer } from './play-area/own-player/OwnPlayer';
import { ForeignPlayer } from './play-area/foreign-player/ForeignPlayer';
import { observable, computed, action } from 'mobx';
import { WaitingArea } from './waiting-area/WaitingArea';
import { observer } from 'mobx-react';

interface PlayGamePageProps {
  isWaiting: boolean;
}

@observer
export class PlayGamePage extends React.Component<PlayGamePageProps> {
  @observable private isWaiting: boolean;
  @observable private gameUuid: string;

  public constructor(props: any) {
    super(props);
    this.isWaiting = true;
    console.log("Props", props)
    this.gameUuid = props.match.params.gameUuid;
  }

  render() {
    if (this.isWaiting) {
      return (
        <WaitingArea
        gameUuid={this.gameUuid}
          onGameStarted={this.handleGameStarted}
        />
      );
    } else {
      return (
        <div className='play-game-page'>
          <div className='play-game-page-foreign-section'>
            <ForeignPlayer displayName='Lars' dice1={1} dice2={2} dice3={3} />
            <ForeignPlayer displayName='Marius' dice1={4} dice2={5} dice3={6} />
            <ForeignPlayer displayName='André' dice1={1} dice2={1} dice3={1} />
          </div>
          <div>
            <h2>Hier ist die Mitte mit dem Stack</h2>
          </div>
          <div className='play-game-page-own-section'>
            <OwnPlayer />
          </div>
        </div>
      );
    }
  }

  @action.bound
  private handleGameStarted(): void {
    this.isWaiting = false;
    console.log('Start', this.isWaiting);
  }
}
