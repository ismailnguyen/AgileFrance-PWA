import React from 'react';
import './TalkDetailModal.css';

class TalkDetailModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            showFeedbackForm: false
        };
    }

    getParsedData(key) {
        let talkData = this.props.talkData;
        
        if (!talkData) {
            return '';
        }
        
        return JSON.parse(talkData)[key] || '';
    }

    isBookmarked() {
        let bookmarks = this.props.bookmarks;

        let talkData = this.props.talkData;
        if (talkData) {
            talkData = JSON.parse(this.props.talkData)

            let currentTalkId = talkData.id;
            let bookmarkIndex = bookmarks.indexOf(currentTalkId);

            return bookmarkIndex > -1;
        }

        return false;
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
    const feedbackUrl = this.getParsedData('feedbackUrl');
    const isFeedbackUrlFilled = feedbackUrl !== '';
    let feedbackButton;
    if (isFeedbackUrlFilled) {
        feedbackButton = <button type="button" onClick={() => this.openFeedbackForm() } className="btn btn-primary">Laisser un avis</button>
    }

    let bookmarkButton;
    if (this.isBookmarked()) {
        bookmarkButton = <button type="button" onClick={ () => this.addToBookmark() } className="btn btn-outline-danger float-right" data-dismiss="modal">Supprimer des favoris</button>;
    } else {
        bookmarkButton = <button type="button" onClick={ () => this.addToBookmark() } className="btn btn-danger float-right" data-dismiss="modal">Ajouter aux favoris</button>;
    }

    let talkLevel;
    if (this.getParsedData('level') !== '') {
        talkLevel = <div className="modal-footer">
                        <span className="blockquote-footer">{ this.getParsedData('level') }</span>
                    </div>;
    }

    return (
        <div className="modal fade" id="talkDetailModal" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{ this.getParsedData('title') }</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={ () => this.closeFeedbackForm() }>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    { this.state.showFeedbackForm ?
                        <div className="modal-body">
                            <iframe title="Roti" src={ this.getParsedData('feedbackUrl') } scrolling="no" frameborder="0" style={{ border: "none", width: "100%", height: "500px" }}></iframe>
                        </div>
                        :
                        <div className="modal-body" dangerouslySetInnerHTML={{__html: this.getParsedData('description')}}></div>
                    }
                    
                    { talkLevel }
                    
                    <div className="modal-footer">
                        { feedbackButton }
                        
                        { bookmarkButton }

                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default TalkDetailModal;
