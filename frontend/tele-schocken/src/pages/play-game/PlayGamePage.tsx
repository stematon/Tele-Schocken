import React from 'react';
import { observable, computed, action } from 'mobx';
import { WaitingArea } from './waiting-area/WaitingArea';
import { observer } from 'mobx-react';
import { Game } from '../../store/Game';
import { GameTable } from './play-area/components/game-table/GameTable';

interface PlayGamePageProps {
  adminId: number;
  isWaiting: boolean;
}

@observer
export class PlayGamePage extends React.Component<PlayGamePageProps> {
  @observable private isWaiting: boolean;
  @observable private gameUuid: string;
  @observable private game: Game;
  
  @computed
  private get adminId(): number {
    return this.props.adminId;
  }

  @computed
  private get amIAdmin(): boolean{
    return this.adminId !== undefined;
  }

  public constructor(props: any) {
    super(props);
    this.isWaiting = true;
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
        <GameTable />
      );
    }
  }

  @action.bound
  private handleGameStarted(): void {
    this.isWaiting = false;
    console.log('Start', this.isWaiting);
  }
}
