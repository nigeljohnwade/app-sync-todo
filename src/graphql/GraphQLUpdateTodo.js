import gql from 'graphql-tag';

export default gql`
mutation(
    $id: ID! 
    $name: String 
    $description: String 
    $status: TodoStatus
    $comment: String 
    $version: Int!
) {
    updateTodo(input:{
        id: $id
        name: $name
        description: $description
        status: $status
        comment: $comment
        expectedVersion: $version
    }){
        id
        name
        description
        status
        comment
        version
    }
}`