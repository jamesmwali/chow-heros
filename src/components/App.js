import React, {Component} from 'react';
import {clearForm} from '../utilities';
import * as _ from 'lodash';
import {connect} from 'react-redux';
import {
  deleteChow,
  getChows,
  saveChow,
} from '../redux/actions/chow/chowActions';
import ChowCard from './chow-card';
import {getUser} from '../redux/actions/user/userActions';
import {Link} from 'react-router-dom';
import '../components/App.scss';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {},
      chows: {},
    };
  }

  handleChange(e) {
    let {name, value} = e.target;
    let {form} = this.state;

    form = Object.assign(form, {[name]: value});
    this.setState({form});

  }

  handleSubmit(e) {
    e.preventDefault();
    let {form} = this.state;

    let chow = {
      name: form.name,
      description: form.description,
      uid: this.props.user.uid,
    };

    //? database.push(notes);
    // ? replaced with a function from the redux actions.

    this.props.saveChow(chow);
    this.setState({form: {}}, () => clearForm(this));

  }

  renderChows() {

    return _.map(this.props.chows, (note, index) => {

      return (
          <ChowCard key={index}>
            <Link to={`note/${index}`}>
              <h2>{note.name}</h2>
            </Link>

            <p>{note.description}</p>

            {note.uid === this.props.user.uid &&

            <button className="btn btn-danger"
                    onClick={() => this.props.deleteChow(index)}>Delete</button>
            }
          </ChowCard>
      );
    });

  }

  //life cycles
  componentDidMount() {
    //?  function from the redux actions.

  }

  render() {


    return (
        <div className="container-fluid" style={{paddingTop: 20}}>
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <form onSubmit={this.handleSubmit.bind(this)}
                    style={{paddingBottom: 20}}>
                <div className="form-group">

                  <input type="text" name="name" value={this.state.form.name}
                         onChange={this.handleChange.bind(this)}
                         className="form-control no-border"
                         placeholder="Title..." required={true}/>
                </div>

                <div className="form-group">

                  <textarea name="description" style={{resize: 'none', minHeight: 100}}
                            onChange={this.handleChange.bind(this)}
                            value={this.state.form.description}
                            className="form-control no-border"
                            placeholder="Product description..." required={true}/>
                </div>

                <div className="form-group">
                  <button className="btn btn-primary col-sm-12"> Save</button>
                </div>

              </form>
              <br/>
              {this.renderChows()}
            </div>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    chows: state.chows,
    user: state.user,
  };
}

//?  function from the redux actions.

export default connect(mapStateToProps,
    {getChows, saveChow, deleteChow, getUser})(App);
