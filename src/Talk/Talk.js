import React from 'react';
import './Talk.css'

class Talk extends React.Component {
    onClicked() {
        this.props.clickedCallback(JSON.stringify(this.props.data));
    }

    isBookmarked() {
        let bookmarks = this.props.bookmarks;

        let currentTalkId = this.props.data.id;
        let bookmarkIndex = bookmarks.indexOf(currentTalkId);

        return bookmarkIndex > -1;
    }

    render() {
        if (this.props.data.type === 'talk') {
            return (
                <div className="col-sm-4">
                    
                    <span className="badge badge-primary">
                    { this.props.data.startTime } - { this.props.data.endTime }
                    </span>

                    <div 
                        className={ "card talk-item" + (this.isBookmarked() ? ' red-border' : '') } 
                        data-toggle="modal" 
                        data-target="#talkDetail" 
                        onClick={ () => this.onClicked() }
                        data-id={this.props.data.id} 
                        data-title={this.props.data.title} 
                        data-description={this.props.data.description} 
                        data-level={this.props.data.level}>

                        <div className="card-body">
                            <h5 className="card-title">
                                { this.props.data.title }
                            </h5>

                            { this.props.data.speakers.map((speakerName, index) =>
                                <h6 key={index}>{speakerName}</h6>
                            ) }

                            <p className="card-text">
                                { this.props.data.objectif }
                            </p>
                            
                        </div>
                        <div className="card-footer">
                            <span className="text-muted">
                                { this.props.data.room }
                            </span>

                            <div className="arrow right-arrow">
                                <div className="arrow-bar arrow-bar-1"></div>
                                <div className="arrow-bar arrow-bar-2"></div>
                            </div>
                        </div>
                    </div>  

                </div>
            )
        }
        else {
            return (
                <div className="col-sm-4">
                    <span className="badge badge-secondary">
                    { this.props.data.startTime } - { this.props.data.endTime }
                    </span>

                    <div className="card special-event">
                        <div className="card-body">
                            <h5 className="card-title">
                                { this.props.data.title }
                            </h5>
                        </div>
                    </div>  
                </div>
            )
        }
    }
}

export default Talk;