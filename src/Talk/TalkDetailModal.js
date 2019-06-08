import React from 'react';
import './TalkDetailModal.css';

class TalkDetailModal extends React.Component {
  render() {
    return (
        <div className="modal fade" id="talkDetailModal" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modal-talk-title"></h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" id="modal-talk-description"></div>
                    <div className="modal-footer">
                        <span className="blockquote-footer" id="modal-talk-level"></span>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary">Laisser un avis</button>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default TalkDetailModal;
