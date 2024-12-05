import React from 'react';
import {View, ViewProps, StyleSheet} from 'react-native';

type RadioButtonProps = ViewProps & {
  isChecked?: boolean;
  size?: number;
};

const RadioButton = ({
  isChecked,
  size = 20,
  style,
  ...props
}: RadioButtonProps) => (
  <View
    testID="radioButton"
    style={[
      styles.radioButton,
      {height: size, width: size, borderRadius: size / 2},
      isChecked && styles.checked,
      style,
    ]}
    {...props}>
    {isChecked && (
      <View
        style={{
          height: size / 2,
          width: size / 2,
          borderRadius: size / 4,
          backgroundColor: '#0370CE',
        }}
        testID="innerRadioButton"
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  radioButton: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    borderColor: '#0370CE',
  },
});

export default RadioButton;
