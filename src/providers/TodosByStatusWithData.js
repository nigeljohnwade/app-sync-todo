import { graphql } from 'react-apollo';
import ListTodosByStatus from 'graphql/GraphQLAllTodosByStatus';

import TodosByStatus from 'components/TodosByStatus';

export const TodosByStatusWithData = graphql(ListTodosByStatus)(TodosByStatus);

export default TodosByStatusWithData;