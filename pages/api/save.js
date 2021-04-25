import gql from 'graphql-tag';

const SUBMIT_RESULTS_FROM_API_MUTATION = gql`
  mutation submitResultFromAPI(
    $userId: ID!
    $templateId: ID
    $taskId: ID
    $studyId: ID
    $data: Json
    $dataString: String
    $metadata: Json
    $dataPolicy: String
    $resultType: ResultType
  ) {
    submitResultFromAPI(
      userId: $userId
      templateId: $templateId
      taskId: $taskId
      studyId: $studyId
      data: $data
      dataString: $dataString
      metadata: $metadata
      dataPolicy: $dataPolicy
      resultType: $resultType
    ) {
      message
    }
  }
`;

export { SUBMIT_RESULTS_FROM_API_MUTATION };
