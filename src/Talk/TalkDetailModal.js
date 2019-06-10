import React from 'react';
import './TalkDetailModal.css';

class TalkDetailModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            showFeedbackForm: false,
            talk: JSON.parse(props.talkData),
            isBookmarked: false
        };
    }

    componentWillReceiveProps (nextProps) {
        const talk = JSON.parse(nextProps.talkData);

        this.setState({
            showFeedbackForm: false,
            talk: talk,
            isBookmarked: this.isBookmarked(talk.id, nextProps.bookmarks)
        });
    }

    getParsedData(key) {
        let talkData = this.props.talkData;
        
        if (!talkData) {
            return '';
        }
        
        return JSON.parse(talkData)[key] || '';
    }

    isBookmarked(talkId, bookmarks) {
        return bookmarks.indexOf(talkId)  > -1;
    }

    addToBookmark () {
        let bookmarks = this.props.bookmarks;
        
        let talkData = this.props.talkData;
        if (talkData !== '') {
            talkData = JSON.parse(talkData)
            
            let currentTalkId = talkData.id;
            let bookmarkIndex = bookmarks.indexOf(currentTalkId);
            
            if (bookmarkIndex > -1) {
                bookmarks.splice(bookmarkIndex, 1);
            } else {
                bookmarks.push(currentTalkId)
            }
            
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

            this.props.bookmarkUpdated(true);
        }
    }

    openFeedbackForm () {
        this.setState({
            showFeedbackForm: true
        });
    }

    closeFeedbackForm () {
        this.setState({
            showFeedbackForm: false
        });
    }

  render() {
    if (this.state.talk) {
        const feedbackUrl = this.state.talk.feedbackUrl;
        const isFeedbackUrlFilled = feedbackUrl !== '';
        let feedbackButton;
        if (isFeedbackUrlFilled) {
            if (this.state.showFeedbackForm) {
                feedbackButton = <button type="button" onClick={() => this.closeFeedbackForm() } className="btn btn-primary">Retour</button>
            } else {
                feedbackButton = <button type="button" onClick={() => this.openFeedbackForm() } className="btn btn-primary">Laisser un avis</button>
            }
        }
    
        let bookmarkButton;
        if (this.state.isBookmarked) {
            bookmarkButton = <button type="button" onClick={ () => this.addToBookmark() } className="btn btn-outline-danger float-right" data-dismiss="modal">Supprimer des favoris</button>;
        } else {
            bookmarkButton = <button type="button" onClick={ () => this.addToBookmark() } className="btn btn-danger float-right" data-dismiss="modal">Ajouter aux favoris</button>;
        }
    
        let talkLevel;
        if (this.state.talk.level !== '') {
            talkLevel = <div className="modal-footer">
                            <span className="blockquote-footer">{ this.state.talk.level }</span>
                        </div>;
        }
    
        return (
            <div className="modal" id="talkDetailModal" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{ this.state.talk.title }</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={ () => this.closeFeedbackForm() }>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-footer">
                            { this.state.talk.speakers.map((speakerName, index) =>
                                <span className="badge badge-pill badge-light" key={index}>{speakerName}</span>
                            )}
                        </div>

                        { this.state.showFeedbackForm ?
                            <div className="modal-body">
                                <iframe title="Roti" src={ this.state.talk.feedbackUrl } scrolling="no" frameBorder="0" style={{ border: "none", width: "100%", height: "500px" }}></iframe>
                            </div>
                            :
                            <div className="modal-body" dangerouslySetInnerHTML={{ __html: this.state.talk.description }}></div>
                        }
                        
                        { talkLevel }

                        <div className="modal-footer">
                            <span>{ this.state.talk.dayName } { this.state.talk.halfdayName } : { this.state.talk.startTime } - { this.state.talk.endTime } ({ this.state.talk.room })</span>
                        </div>
                        
                        <div className="modal-footer">
                            { feedbackButton }
                            
                            { bookmarkButton }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    return (
        <div className="modal" id="talkDetailModal" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
            </div>
        </div>
    )
  }
}

export default TalkDetailModal;
