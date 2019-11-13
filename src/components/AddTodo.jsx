import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cleanEmptyStrings } from "../graphql/utilities";

export class AddTodo extends Component {
    // Set up state.
    state = {
        name: '',
        description: '',
    }

    // Event handler that takes an event and the state item.
    // (Could be) Has been refactored to use named input elements.
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onReset(){
        this.setState({
            name: '',
            description: '',
        })
    }

    submitHandler(e){
        const todo = {
            name: this.state.name,
            description: this.state.description,
            status: 'pending'
        }
        e.preventDefault();
        this.props.createTodo(cleanEmptyStrings(todo, true));
        this.onReset();
    }

    render() {
        // Render the UI to the browser.
        // Could be refactored to use a proper HTML form
        // named inputs and a submit function.
        return (
            <form
                className="stack"
                onSubmit={e => {
                    this.submitHandler(e);
                }}
            >
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        onChange={(event) => this.onChange(event)}
                        value={this.state.name}
                        id="name"
                        name="name"
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        onChange={(event) => this.onChange(event)}
                        value={this.state.description}
                        id="description"
                        name="description"
                    />
                </div>
                <div>
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
                    <button type="submit">
                        Add
                    </button>
                </div>
            </form>
        );
    }
}

AddTodo.propTypes = {
  // As this component relies on having a createTodo
  // function passed in make it a required prop
  createTodo: PropTypes.func.isRequired,
}

export default AddTodo