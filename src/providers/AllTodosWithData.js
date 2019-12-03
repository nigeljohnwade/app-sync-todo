import {
  graphqlMutation,
} from 'aws-appsync-react';
import {
  graphql,
  compose,
} from 'react-apollo';

import Todos from 'components/Todos';
import ListTodos from 'graphql/GraphQLAllTodos';
import ListTodosByStatus from 'graphql/GraphQLAllTodosByStatus';
import UpdateTodo from 'graphql/GraphQLUpdateTodo';
import DeleteTodo from 'graphql/GraphQLDeleteTodo';

export const AllTodosWithData = compose(
  graphql(ListTodos),
  graphqlMutation(UpdateTodo,
    ({status}) => {
      return {
        'auto': ListTodos,

        // When status is done, add to ListTodosByStatus(status: done), else add to ListTodosByStatus(status: pending)
        'add': { query: ListTodosByStatus, variables: { status: status } },

        // When status is done, remove from ListTodosByStatus(status: pending), else remove from ListTodosByStatus(status: done)
        'remove': status === 'done' ? [
            { query: ListTodosByStatus, variables: { status: 'pending' } },
            { query: ListTodosByStatus, variables: { status: 'doing' } },
            { query: ListTodosByStatus, variables: { status: 'draft' } },
            ] : status === 'doing' ? [
            { query: ListTodosByStatus, variables: { status: 'done' } },
            { query: ListTodosByStatus, variables: { status: 'pending' } },
            { query: ListTodosByStatus, variables: { status: 'draft' } },
            ] : status === 'draft' ? [
            { query: ListTodosByStatus, variables: { status: 'done' } },
            { query: ListTodosByStatus, variables: { status: 'pending' } },
            { query: ListTodosByStatus, variables: { status: 'doing' } },
            ] : [
            { query: ListTodosByStatus, variables: { status: 'done' } },
            { query: ListTodosByStatus, variables: { status: 'draft' } },
            { query: ListTodosByStatus, variables: { status: 'doing' } },
        ]
      }
    },
    'Todo'),
  graphqlMutation(DeleteTodo, {
    'auto': [
      ListTodos,
      { query: ListTodosByStatus, variables: { status: 'done' } },
      { query: ListTodosByStatus, variables: { status: 'pending' } }
    ]
  }, 'Todo')
)(Todos);

export default AllTodosWithData;