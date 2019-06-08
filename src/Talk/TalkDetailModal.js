import React from 'react';
import './TalkDetailModal.css';

class TalkDetailModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            isBookmarked: this.isBookmarked()
        };
    }

    getParsedData(key) {
        let talkData = this.props.talkData;
        if (talkData)
            return JSON.parse(talkData)[key]
        
        return '';
    }

    isBookmarked() {
        const localStorageBookmarkKey = 'bookmarks';

        let bookmarks = JSON.parse(localStorage.getItem(localStorageBookmarkKey)) || [];

        let talkData = this.props.talkData;
        if (talkData) {
            talkData = JSON.parse(this.props.talkData)

            let currentTalkId = talkData.id;
            let bookmarkIndex = bookmarks.indexOf(currentTalkId);

            return bookmarkIndex > -1;
        }

        return false;
    }

    addToBookmark() {
        const localStorageBookmarkKey = 'bookmarks';

        let bookmarks = JSON.parse(localStorage.getItem(localStorageBookmarkKey)) || [];
        
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
            
            this.setState({ isBookmarked: !this.state.isBookmarked });
            localStorage.setItem(localStorageBookmarkKey, JSON.stringify(bookmarks));

            this.props.bookmarkUpdated(true);
        }
    }

  render() {
    return (
        <div className="modal fade" id="talkDetailModal" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{ this.getParsedData('title') }</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" dangerouslySetInnerHTML={{__html: this.getParsedData('description')}}></div>
                    <div className="modal-footer">
                        <span className="blockquote-footer">{ this.getParsedData('level') }</span>
                    </div>
                    <div className="modal-footer">
                        {/* TODO: Activate when link with Roti.express works
                            <button type="button" className="btn btn-primary">Laisser un avis</button> */}
                        
                        { this.isBookmarked() ? 
                            <button type="button" onClick={ () => this.addToBookmark() } className="btn btn-outline-danger float-right">Supprimer des favoris</button>
                            :
                            <button type="button" onClick={ () => this.addToBookmark() } className="btn btn-danger float-right">Ajouter aux favoris</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default TalkDetailModal;
