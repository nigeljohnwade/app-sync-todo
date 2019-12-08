/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const get = `query Get {
  get {
    id
    name
    description
    comment
    status
    version
  }
}
`;
export const getTodo = `query GetTodo($id: ID!) {
  getTodo(id: $id) {
    id
    name
    description
    comment
    status
    version
  }
}
`;
export const listTodos = `query ListTodos(
  $filter: TableTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      comment
      status
      version
    }
    nextToken
  }
}
`;
export const queryTodosByStatusIndex = `query QueryTodosByStatusIndex(
  $status: TodoStatus!
  $first: Int
  $after: String
) {
  queryTodosByStatusIndex(status: $status, first: $first, after: $after) {
    items {
      id
      name
      description
      comment
      status
      version
    }
    nextToken
  }
}
`;
