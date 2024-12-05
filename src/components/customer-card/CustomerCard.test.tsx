import {render} from '@testing-library/react-native';
import CustomerCard from './CustomerCard';

describe('CustomerCard Component', () => {
  const customer = {
    id: '1',
    name: 'Dhruv Bhagat',
    email: 'dhruvbhagat98@gmail.com',
    role: 'Admin',
  };
  describe('Snapshot', () => {
    test('matches', () => {
      const tree = render(<CustomerCard customer={customer} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('Render', () => {
    test('Component render based on props', () => {
      const {getByTestId} = render(<CustomerCard customer={customer} />);
      expect(getByTestId('customer-name').props.children).toBe(customer.name);
      expect(getByTestId('customer-role').props.children).toBe(customer.role);
    });
  });
});
