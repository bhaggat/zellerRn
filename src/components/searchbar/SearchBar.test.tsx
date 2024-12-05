import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import SearchBar from './SearchBar';

jest.mock('../../services/utils', () => ({
  debounce: jest.fn(fn => fn),
}));

describe('SearchBar Component', () => {
  const onSearchMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Snapshot', () => {
    test('matches', () => {
      const tree = render(<SearchBar onSearch={onSearchMock} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('Render', () => {
    test('renders correctly with initial state', () => {
      const {getByPlaceholderText, queryByTestId} = render(
        <SearchBar onSearch={onSearchMock} />,
      );

      expect(getByPlaceholderText('Search...')).toBeTruthy();
      expect(queryByTestId('activity-indicator')).toBeNull();
    });
  });
  describe('Interactions', () => {
    test('updates the search input value on typing', () => {
      const {getByPlaceholderText} = render(
        <SearchBar onSearch={onSearchMock} />,
      );

      const input = getByPlaceholderText('Search...');
      fireEvent.changeText(input, 'test query');

      expect(input.props.value).toBe('test query');
    });

    test('calls onSearch with the correct value after debounce', () => {
      const {getByPlaceholderText} = render(
        <SearchBar onSearch={onSearchMock} />,
      );

      const input = getByPlaceholderText('Search...');
      fireEvent.changeText(input, 'debounced query');

      expect(onSearchMock).toHaveBeenCalledWith('debounced query');
    });

    test('shows the activity indicator when isLoading is true', () => {
      const {getByTestId, getByPlaceholderText, queryByTestId} = render(
        <SearchBar onSearch={onSearchMock} isLoading={true} />,
      );

      const input = getByPlaceholderText('Search...');
      fireEvent.changeText(input, 'debounced query');

      expect(getByTestId('activity-indicator')).toBeTruthy();
      expect(queryByTestId('activity-indicator')).not.toBeNull();
    });

    test('hides the activity indicator when isLoading is false', () => {
      const {queryByTestId} = render(
        <SearchBar onSearch={onSearchMock} isLoading={false} />,
      );

      expect(queryByTestId('activity-indicator')).toBeNull();
    });

    test('does not show activity indicator when search input is empty', () => {
      const {queryByTestId} = render(
        <SearchBar onSearch={onSearchMock} isLoading={true} />,
      );

      expect(queryByTestId('activity-indicator')).toBeNull();
    });
  });
});
