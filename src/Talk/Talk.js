import React from 'react';
import './Talk.css'

class Talk extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            
                <div className="col-sm-4">
                    
                    <span className="badge badge-primary">
                    { this.props.data.startTime } - { this.props.data.endTime }
                    </span>

                    <div 
                        className="card talk-item" 
                        data-toggle="modal" 
                        data-target="#talkDetailModal" 
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