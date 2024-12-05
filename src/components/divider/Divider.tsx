import {StyleSheet, View, ViewProps} from 'react-native';

export default function Divider({style, ...props}: ViewProps) {
  return <View style={[styles.divider, style]} {...props} />;
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: '#E2E8F0',
    width: '100%',
    height: 1,
    marginVertical: 10,
  },
});
