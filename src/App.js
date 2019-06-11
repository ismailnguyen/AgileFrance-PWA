import React from 'react';
import './App.css';

import Talk from './Talk/Talk';
import TalkDetail from './Talk/TalkDetail';
import DayScheduleNavigation from './DayScheduleNavigation/DayScheduleNavigation'
import scheduleDatas from './datas/schedule.json';

class App extends React.Component {
  constructor(props)  {
    super(props);

    this.state = {
      schedule: scheduleDatas,
      lastClickedTalkData: null,
      bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || []
    };

    this.onTalkClicked = this.onTalkClicked.bind(this);
  }

  onTalkClicked (talkData) {
    this.setState({
      lastClickedTalkData: talkData
    });
  }

  onBookmarkUpdated() {
      this.setState({
        bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || []
      });
  }

  eventsForHalfdayTime (dayName, halfdayName) {
    return this.state.schedule.days.find(d => d.dayName === dayName).events
        .filter(e => e.halfdayName.toLowerCase().includes(halfdayName.toLowerCase()));
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <img src="/assets/img/favicon-96x96.png" className="logo animated bounceInUp" alt="Agile France" />
          <h4>La Grande Conférence Agile Francophone</h4>
          <small>Chalet de la Porte Jaune - Bois de Vincennes, Paris</small>
        </header>

        <div className="container main-container">

          <DayScheduleNavigation>
            { this.state.schedule.days.map((day, index) =>
              <div label={ day.dayName } key={ index }>
                <div className="row title-row">
                  <div className="col-xs-12">
                    <h3>Matin</h3>
                  </div>
                </div>
                <div className="row">
                { this.eventsForHalfdayTime(day.dayName, 'Matin').map((item, index) =>
                    <Talk data={ item } key={index} bookmarks={ this.state.bookmarks } clickedCallback={ talkData => this.onTalkClicked(talkData) } />
                  ) }
                </div>
                
                <div className="row title-row">
                  <div className="col-xs-12">
                    <h3>Apr&egrave;s midi</h3>
                  </div>
                </div>
                <div className="row">
                { this.eventsForHalfdayTime(day.dayName, 'Midi').map((item, index) =>
                    <Talk data={ item } key={index} bookmarks={ this.state.bookmarks } clickedCallback={ talkData => this.onTalkClicked(talkData) } />
                  ) }
                </div>
              </div>
            )}
          </DayScheduleNavigation>

          
        </div>

        <TalkDetail talkData={ this.state.lastClickedTalkData } bookmarks={ this.state.bookmarks } bookmarkUpdated={ status => this.onBookmarkUpdated() } />
      </div>
    )
  }
}

export default App;
