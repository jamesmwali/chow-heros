import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';


class ChowDetail extends Component {


  render(){

    const {note} = this.props;


    return (
        <div className="">
          <div className="">
            <div className="">

              <h1>{note.name}</h1>
              <p>{note.description}</p>

              <Link to="/">Back</Link>
            </div>
          </div>

        </div>
    )
  }

}


function mapStateToProps(state, ownProps){
  return {
    note: state.notes[ownProps.match.params.id],
    uid: state.user.uid
  }
}

export default withRouter(connect(mapStateToProps)(ChowDetail))