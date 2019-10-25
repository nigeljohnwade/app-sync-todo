import gql from 'graphql-tag';

/*
 *  Renamed file from GraphQLNewTodo so that
 *  I can follow the path easier.
*/

export default gql`
mutation(
    $name: String 
    $description: String 
    $status:TodoStatus
) {
  createTodo(input : { 
        name:$name 
        description:$description 
        status:$status
    }){
    id
    name
    description
    status
    version
  }
}`
