import {render} from '@testing-library/react-native';
import Divider from './Divider';

describe('Divider Component', () => {
  describe('Snapshot', () => {
    test('matches', () => {
      const tree = render(<Divider />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
