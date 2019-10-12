import * as $ from 'jquery';


export const clearForm = (component) => {
  component.setState({errors: {}});
  $('input, textarea').val('');
};