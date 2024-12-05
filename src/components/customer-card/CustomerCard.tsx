import React, {useMemo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Customer} from '../../services/graphql/customers';
import {useNavigation, NavigationProp} from '@react-navigation/native';

export type RootStackParamList = {
  Details: {customer: Customer};
};

type Navigation = NavigationProp<RootStackParamList, 'Details'>;

type CustomerCardProps = {
  customer: Customer;
};

const CustomerCard = ({customer}: CustomerCardProps) => {
  const {name, role} = customer;
  const firstLetter = useMemo(() => name.charAt(0).toUpperCase(), [name]);
  const navigation = useNavigation<Navigation>();

  const onCustomerPress = () => {
    navigation.navigate('Details', {customer});
  };

  return (
    <TouchableOpacity onPress={onCustomerPress} style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{firstLetter}</Text>
      </View>
      <View>
        <Text style={styles.name} testID="customer-name">
          {name}
        </Text>
        <Text style={styles.role} testID="customer-role">
          {role}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: '#D1E4FC',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    color: '#007BFF',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  role: {
    fontSize: 14,
    color: '#6B7280',
    textTransform: 'capitalize',
  },
});

export default CustomerCard;
