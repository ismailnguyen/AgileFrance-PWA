import React from 'react';
import logo from './logo.png';
import './App.css';

import Talk from './Talk/Talk';
import TalkDetailModal from './Talk/TalkDetailModal';
import DayScheduleNavigation from './DayScheduleNavigation/DayScheduleNavigation'
import scheduleDatas from './datas/schedule.json';


class App extends React.Component {
  constructor()  {
    super();

    this.state = {
      schedule: scheduleDatas
    };
  }

  eventsForHalfdayTime(dayName, halfdayName) {
    return this.state.schedule.days.find(d => d.dayName === dayName).events
        .filter(e => e.halfdayName.toLowerCase().includes(halfdayName.toLowerCase()));
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
          <h4>La Grande Conférence Agile Francophone</h4>
          <small>Chalet de la Porte Jaune - Bois de Vincennes, Paris</small>
        </header>

        <div className="container main-container">

          <DayScheduleNavigation>
            <div label="Jeudi">
                <div className="row title-row">
                <div className="col-xs-12">
                  <h3>Matin</h3>
                </div>
              </div>
              <div className="row">
              { this.eventsForHalfdayTime('Jeudi', 'Matin').map((item, index) =>
                  <Talk data={ item } key={index} />
                ) }
              </div>
              
              <div className="row title-row">
                <div className="col-xs-12">
                  <h3>Apr&egrave;s midi</h3>
                </div>
              </div>
              <div className="row">
              { this.eventsForHalfdayTime('Jeudi', 'Midi').map((item, index) =>
                  <Talk data={ item } key={index} />
                ) }
              </div>
            </div>
            <div label="Vendredi">
                <div className="row title-row">
                <div className="col-xs-12">
                  <h3>Matin</h3>
                </div>
              </div>
              <div className="row">
              { this.eventsForHalfdayTime('Vendredi', 'Matin').map((item, index) =>
                  <Talk data={ item } key={index} />
                ) }
              </div>
              
              <div className="row title-row">
              <div className="col-xs-12">
                  <h3>Apr&egrave;s midi</h3>
                </div>
              </div>
              <div className="row">
              { this.eventsForHalfdayTime('Vendredi', 'Midi').map((item, index) =>
                  <Talk data={ item } key={index} />
                ) }
              </div>
            </div>
          </DayScheduleNavigation>

          
        </div>

        <TalkDetailModal />

      </div>
    )
  }
}

export default App;
