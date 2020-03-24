import React from 'react';
import './PlayGamePage.css';
import { OwnPlayer } from './own-player/OwnPlayer';
import { ForeignPlayer } from './foreign-player/ForeignPlayer';
import { observable, computed, action } from 'mobx';
import { WaitingArea } from '../join-game/WaitingArea';
import { observer } from 'mobx-react';

interface PlayGamePageProps {
  gameId: number;
  isWaiting: boolean;
}

@observer
export class PlayGamePage extends React.Component<PlayGamePageProps> {
  @observable private isWaiting: boolean;

  @computed
  private get gameId(): number{
    return this.props.gameId;
  }

  public constructor(props:any){
    super(props);
    this.isWaiting= true;
  }

  render() {
    if(this.isWaiting){
      return <WaitingArea gameId={this.gameId} onGameStarted={this.handleGameStarted}/>
    }
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

  @action.bound
  private handleGameStarted(): void {
    this.isWaiting = false;
    console.log("Start", this.isWaiting)
  }
}
