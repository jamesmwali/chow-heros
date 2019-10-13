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
      ],
      selected_file: [],
      heroeType: '',
      errors: {}
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
      surname: form.surname,
      phone_numbers: form.phoneNumber,
      description: form.description,
      heroeType: this.state.heroeType.value,
      uid: this.props.user.uid,
    };


    //? database.push(notes);
    // ? replaced with a function from the redux actions.

    this.props.saveChow(chow);
    this.setState({form: {}}, () => clearForm(this));

  }
  handleImage(e){

    console.log(e.target.files[0]);
    this.setState({selected_file: e.target.files[0]})

  }

  handleDropDown(selectedOption, name) {
    let { errors } = this.state;

    if ([name] === "") {
      Object.assign(errors, { [name]: `${name} can not be empty` });
      this.setState({ errors });
    } else {
      delete errors[name];
      this.setState({ [name]: selectedOption });
    }
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
                  <input type="text" placeholder="Name" name="name"
                         value={this.state.form.name}
                         onChange={this.handleChange.bind(this)} />
                </div>

                <div className="form-group">
                  <input type="text" placeholder="Surname"  name="surname"
                         value={this.state.form.surname}
                         onChange={this.handleChange.bind(this)}
                  />
                </div>

                <div className="form-group">
                  <input type="text" placeholder="Phone numbers" name="phoneNumber"
                         value={this.state.form.phoneNumber}
                         onChange={this.handleChange.bind(this)}

                  />
                </div>

                <div className="form-group">
                  <Select className="select-picker"
                          classNamePrefix="select-picker"
                          placeholder="Please select entity name"
                          options={this.state.options}
                          onChange={selectedOption =>
                              this.handleDropDown(selectedOption, "heroeType")
                          }

                  />
                </div>

                <div className="form-group">
                  <textarea name="description" value={this.state.form.value} onChange={this.handleChange.bind(this)}
                            placeholder="Product Description"/>
                </div>


                <div className="form-group">

                  <div className="upload-btn-wrapper">
                    <button className="btn">Upload a file</button>
                    <input type="file" name="file" onChange={this.handleImage.bind(this)}/>
                  </div>

                  {this.state.selected_file.name}

                </div>

                <div className="button-container">
                  <button onClick={this.handleSubmit.bind(this)}>
                    Submit
                  </button>

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
    {saveChow,getChows, deleteChow, getUser})(App);
