import React from 'react';
import {render} from '@testing-library/react-native';
import RadioButton from './RadioButton';

describe('RadioButton Component', () => {
  describe('Snapshot', () => {
    test('matches', () => {
      const tree = render(<RadioButton />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    test('Matched Checked', () => {
      const tree = render(<RadioButton isChecked={true} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('Render', () => {
    it('renders correctly when unchecked', () => {
      const {getByTestId, queryByTestId} = render(<RadioButton />);
      const outerRadioButton = getByTestId('radioButton');
      expect(outerRadioButton).toBeTruthy();
      const innerRadioButton = queryByTestId('innerRadioButton');
      expect(innerRadioButton).toBeNull();
    });
    it('renders correctly when checked', () => {
      const {getByTestId} = render(<RadioButton isChecked={true} />);
      const outerRadioButton = getByTestId('radioButton');
      expect(outerRadioButton).toBeTruthy();
      const innerRadioButton = getByTestId('innerRadioButton');
      expect(innerRadioButton).toBeTruthy();
    });
  });
});
