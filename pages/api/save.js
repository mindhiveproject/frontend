import gql from 'graphql-tag';

const SUBMIT_RESULTS_FROM_API_MUTATION = gql`
  mutation submitResultFromAPI(
    $userId: ID
    $templateId: ID
    $taskId: ID
    $studyId: ID
    $data: Json
    $dataString: String
    $metadata: Json
    $dataPolicy: String
    $resultType: ResultType
    $version: String
    $guestId: ID
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
      version: $version
      guestId: $guestId
    ) {
      id
    }
  }
`;

const SUBMIT_AGGREGATED_RESULTS_FROM_API_MUTATION = gql`
  mutation submitAggregatedResultFromAPI(
    $userId: ID
    $guestId: ID
    $studyId: ID
    $templateId: ID
    $taskId: ID
    $version: String
    $metadataId: String
    $dataPolicy: String
    $fullResultId: ID
    $data: Json
  ) {
    submitAggregatedResultFromAPI(
      userId: $userId
      guestId: $guestId
      studyId: $studyId
      templateId: $templateId
      taskId: $taskId
      version: $version
      metadataId: $metadataId
      dataPolicy: $dataPolicy
      fullResultId: $fullResultId
      data: $data
    ) {
      message
    }
  }
`;

export {
  SUBMIT_RESULTS_FROM_API_MUTATION,
  SUBMIT_AGGREGATED_RESULTS_FROM_API_MUTATION,
};
