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
        return (
            
                <div className="col-sm-4">
                    
                    <span className="badge badge-primary">
                    { this.props.data.startTime } - { this.props.data.endTime }
                    </span>

                    <div 
                        className={ "card talk-item" + (this.isBookmarked() ? ' red-border' : '') } 
                        data-toggle="modal" 
                        data-target="#talkDetailModal" 
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
                            <span className="btn btn-outline-secondary">
                                { this.props.data.room }
                            </span>
                        </div>
                    </div>  

                </div>
        )
    }
}

export default Talk;