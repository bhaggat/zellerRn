import {render} from '@testing-library/react-native';
import CustomerTypes from './CustomerTypes';

describe('Divider Component', () => {
  const onSelectMock = jest.fn();
  const role = 'ADMIN';
  describe('Snapshot', () => {
    test('matches', () => {
      const tree = render(
        <CustomerTypes
          selectedCustomerType={role}
          onSelectCustomerType={onSelectMock}
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('Render', () => {
    test('renders correctly', () => {
      const tree = render(
        <CustomerTypes
          selectedCustomerType={role}
          onSelectCustomerType={onSelectMock}
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
