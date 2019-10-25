import {
  graphqlMutation,
} from 'aws-appsync-react';

import AddTodo from 'components/AddTodo';
import ListTodos from 'graphql/GraphQLAllTodos';
import ListTodosByStatus from 'graphql/GraphQLAllTodosByStatus';
import CreateTodo from 'graphql/CreateTodo';

/**
 * 
 *  The way graphqlMutation works is it takes in 3 required arguments:
 *
 *  The mutation to run
 *  One or more queries to update in the cache
 *  The GraphQL response signature of the mutation (__typename)
 * 
 */

export const AddTodoOffline = graphqlMutation(
  // Mutation to run
  CreateTodo,
  // Queries to update (initially 'ListTodos') before subscription?
  {
    'auto': [
      ListTodos,
      { query: ListTodosByStatus, variables: { status: 'pending' } }
    ],
  },
  // Response signature of the mutation
  'Todo'
)(AddTodo);

export default AddTodoOffline