import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AddTodo extends Component {
  // Set up state.
  state = {
    name: '',
    description: '',
  }

  // Event handler that takes an event and the state item.
  // Could be refactored to use named input elements.
  onChange(event, type) {
    this.setState({
      [type]: event.target.value
    })
  }

  render() {
    // Render the UI to the browser.
    // Could be refactored to use a proper HTML form 
    // named inputs and a submit function.
    return (
      <div>
        <input onChange={(event) => this.onChange(event, "name")} />
        <input onChange={(event) => this.onChange(event, "description")} />
        {/* 
          this.props.createTodo is the query passed in when this gets
          wrapped by the AddTodOffline provider.
          As far as I can tell this ties the componetn fairly tightly with
          the provider, although I guess that createTodo can reference any
          createTodo function?
          To invoke the mutation, you will need to call this function,
          which is passed as a prop to the component. The prop will be 
          named after the mutation defined in the GraphQL schema. 
          In this example, this is createTodo which you call when 
          clicking a button. Arguments to a mutation can also be passed 
          such as the name, description, and status below. 
          Also note that you will need to pass any arguments which 
          are in the selection set of the query in the second parameter 
          of graphqlMutation.
        */}
        <button onClick={() => this.props.createTodo({
          name: this.state.name,
          description: this.state.description,
          status: 'pending'
        })}>
          Add
      </button>
      </div>
    );
  }
}

AddTodo.propTypes = {
  // As this component relies on having a createTodo
  // function passed in make it a required prop
  createTodo: PropTypes.func.isRequired,
}

export default AddTodo