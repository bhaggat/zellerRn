import {awsClient} from './awsClient';
import {CustomerType} from '../../screens/home/Home';

const listZellerCustomers = `
  query listZellerCustomers($filter: TableZellerCustomerFilterInput, $limit: Int, $nextToken: String) {
    listZellerCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        role
      }
      nextToken
    }
  }
`;

export type Customer = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const LIMIT = 5;

type Options = {
  role: CustomerType;
  search: string;
};

export async function getCustomers(options: Options) {
  try {
    const variables = {
      filter: {
        role: {eq: options.role},
        name: {contains: options.search},
      },
      input: {
        limit: LIMIT,
      },
    };
    const response = await awsClient.graphql({
      query: listZellerCustomers,
      variables,
    });
    if ('data' in response) {
      return response?.data?.listZellerCustomers?.items || [];
    }
    return [];
  } catch (error) {
    return [];
  }
}
