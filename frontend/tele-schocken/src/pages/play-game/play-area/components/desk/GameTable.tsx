import React from 'react';
import { observer } from 'mobx-react';
import { ForeignPlayer } from '../foreign-player/ForeignPlayer';
import { OwnPlayer } from '../own-player/OwnPlayer';
import "./GameTable.css";

interface GameTableProps {}

@observer
export class GameTable extends React.Component<GameTableProps> {
  render() {
    return <div className='game-table'>
    <div className='game-table-foreign-section'>
      <ForeignPlayer displayName='Lars' dice1={1} dice2={2} dice3={3} />
      <ForeignPlayer displayName='Marius' dice1={4} dice2={5} dice3={6} />
      <ForeignPlayer displayName='André' dice1={1} dice2={1} dice3={1} />
    </div>
    <div>
      <h2>Hier ist die Mitte mit dem Stack</h2>
    </div>
    <div className='game-table-own-section'>
      <OwnPlayer />
    </div>
  </div>;
  }
}
