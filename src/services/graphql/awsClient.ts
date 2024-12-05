import {Amplify} from 'aws-amplify';
import {generateClient} from 'aws-amplify/api';
import {
  AWS_APPSYNC_GRAPHQL_ENDPOINT,
  AWS_APPSYNC_REGION,
  AWS_APPSYNC_AUTHENTICATION_TYPE,
  AWS_APPSYNC_API_KEY,
} from '@env';

type GraphQLAuthMode =
  | 'apiKey'
  | 'oidc'
  | 'userPool'
  | 'iam'
  | 'identityPool'
  | 'lambda'
  | 'none';

Amplify.configure({
  API: {
    GraphQL: {
      endpoint: AWS_APPSYNC_GRAPHQL_ENDPOINT,
      region: AWS_APPSYNC_REGION,
      apiKey: AWS_APPSYNC_API_KEY,
      defaultAuthMode: AWS_APPSYNC_AUTHENTICATION_TYPE as GraphQLAuthMode,
    },
  },
});

export const awsClient = generateClient();
console.log(awsClient);
