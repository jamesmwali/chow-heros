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
import Select from 'react-select';
import HEREMap, { Marker } from 'react-here-maps';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {},
      chows: {},
      options: [
          {value: 'SMME', label: 'SMME'},
        {value: 'Corporate', label: 'Corporate'},
        {value: 'Student', label: 'Student'},
        {value: 'Anonymous', label: 'Anonymous'},
      ]
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
        <div className="chowhero-container">


          <div className="hero-container">

            <div className="hero">
              <div className="hero-nav">
                <Link className="back" to="/landing-page">
                    Back
                </Link>
              </div>

              <div className="hero-header">
                Please provide details
              </div>


              <div className="hero-inputs">
                
                <div className="form-group">
                  <input type="text" placeholder="Name" />
                </div>

                <div className="form-group">
                  <input type="text" placeholder="Surname" />
                </div>

                <div className="form-group">
                  <Select className="select-picker"
                          classNamePrefix="select-picker"
                          placeholder="Please select entity name"
                          options={this.state.options}



                  />
                </div>

                <div className="form-group">

                </div>

                <div className="form-group">
                  <textarea name="" id="" cols="30" rows="10" placeholder="Product Description"/>
                </div>



              </div>



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
