import React, {act} from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {getCustomers} from '../../services/graphql/customers';
import Home from './Home';

jest.mock('../../services/graphql/customers', () => ({
  getCustomers: jest.fn(),
}));

const mockedGetCustomers =
  require('../../services/graphql/customers').getCustomers;

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('Snapshots', () => {
    test('matches', () => {
      const tree = render(<Home />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('Render', () => {
    it('renders the loading indicator while fetching data', async () => {
      mockedGetCustomers.mockResolvedValue([]);
      const {getByTestId} = render(<Home />);
      expect(getByTestId('loadingIndicator')).toBeTruthy();
      await waitFor(() => expect(mockedGetCustomers).toHaveBeenCalledTimes(1));
    });
    it('renders error message if data fetching fails', async () => {
      mockedGetCustomers.mockRejectedValue(new Error('Network error'));
      const {getByText} = render(<Home />);
      await waitFor(() => {
        expect(
          getByText('Failed to fetch customer data. Please try again later.'),
        ).toBeTruthy();
      });
    });
    it('renders customer data when fetched successfully', async () => {
      const mockCustomers = [
        {id: '1', name: 'Dhruv Bhagat'},
        {id: '2', name: 'Kanika Bhagat'},
      ];
      mockedGetCustomers.mockResolvedValue(mockCustomers);
      const {getByText} = render(<Home />);
      await waitFor(() => {
        expect(getByText('Dhruv Bhagat')).toBeTruthy();
        expect(getByText('Kanika Bhagat')).toBeTruthy();
      });
    });
    it('renders empty state when no customers are found', async () => {
      mockedGetCustomers.mockResolvedValue([]);
      const {getByText} = render(<Home />);
      await waitFor(() => {
        expect(getByText('No users found')).toBeTruthy();
      });
    });
  });

  describe('Interactions', () => {
    it('updates the customer list when the search term changes', async () => {
      const mockCustomers = [{id: '1', name: 'Dhruv Bhagat'}];

      mockedGetCustomers
        .mockResolvedValueOnce(mockCustomers)
        .mockResolvedValueOnce([]);

      const {getByPlaceholderText, getByText} = render(<Home />);
      await waitFor(() => {
        expect(getByText('Dhruv Bhagat')).toBeTruthy();
      });
      const searchBar = getByPlaceholderText('Search...');
      fireEvent.changeText(searchBar, 'Test');
      fireEvent.changeText(searchBar, 'Test1');
      await act(async () => {
        jest.advanceTimersByTime(750);
      });
      await waitFor(() => {
        expect(getByText('No users found')).toBeTruthy();
      });
    });

    it('changes customer type and fetches new data', async () => {
      const adminCustomers = [{id: '1', name: 'Admin User'}];
      const managerCustomers = [{id: '2', name: 'Manager User'}];

      mockedGetCustomers
        .mockResolvedValueOnce(adminCustomers)
        .mockResolvedValueOnce(managerCustomers);

      const {getByText} = render(<Home />);

      await waitFor(() => {
        expect(getByText('Admin User')).toBeTruthy();
      });

      const managerTab = getByText('MANAGER');
      fireEvent.press(managerTab);

      await waitFor(() => {
        expect(getByText('Manager User')).toBeTruthy();
      });
    });

    it('refreshes customer list on pull-to-refresh', async () => {
      const mockCustomers = [{id: '1', name: 'Dhruv Bhagat'}];

      mockedGetCustomers.mockResolvedValue(mockCustomers);
      const {getByText, getByTestId} = render(<Home />);

      await waitFor(() => {
        expect(getByText('Dhruv Bhagat')).toBeTruthy();
      });

      const flatList = getByTestId('UsersFlatList');
      fireEvent(flatList, 'refresh');

      await waitFor(() => {
        expect(mockedGetCustomers).toHaveBeenCalledTimes(2);
      });
    });
  });
});
