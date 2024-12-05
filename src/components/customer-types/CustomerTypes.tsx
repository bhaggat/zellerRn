import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import RadioButton from '../radio-button/RadioButton';
import {CustomerType, customerTypeOptions} from '../../screens/home/Home';

type CustomerTypesProps = {
  selectedCustomerType: CustomerType;
  onSelectCustomerType: (customerType: CustomerType) => void;
};

const CustomerTypes = ({
  selectedCustomerType,
  onSelectCustomerType,
}: CustomerTypesProps) => {
  return (
    <View style={styles.optionsContainer}>
      {customerTypeOptions.map(option => {
        const isSelected = selectedCustomerType === option;
        return (
          <TouchableOpacity
            key={option}
            style={[
              styles.radioButtonContainer,
              isSelected ? styles.selectedButton : {},
            ]}
            onPress={() => onSelectCustomerType(option)}>
            <RadioButton isChecked={isSelected} />
            <Text style={styles.option}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    gap: 4,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 10,
  },
  selectedButton: {
    backgroundColor: '#E8F2FB',
  },
  option: {
    textTransform: 'capitalize',
    fontSize: 16,
  },
});

export default CustomerTypes;
