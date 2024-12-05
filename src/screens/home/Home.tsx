import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Customer, getCustomers} from '../../services/graphql/customers';
import CustomerTypes from '../../components/customer-types/CustomerTypes';
import CustomerCard from '../../components/customer-card/CustomerCard';
import Divider from '../../components/divider/Divider';
import SearchBar from '../../components/searchbar/SearchBar';

export type CustomerType = 'ADMIN' | 'MANAGER';
export const customerTypeOptions: CustomerType[] = ['ADMIN', 'MANAGER'];

export default function Home() {
  const [selectedCustomerType, setSelectedCustomerType] =
    useState<CustomerType>(customerTypeOptions[0]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const keyExtractor = useCallback((customer: Customer) => customer.id, []);

  const getCustomerData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getCustomers({
        role: selectedCustomerType,
        search,
      });
      if (Array.isArray(response)) {
        setCustomers(response);
      }
    } catch (error) {
      setError('Failed to fetch customer data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [search, selectedCustomerType]);

  useEffect(() => {
    getCustomerData();
  }, [getCustomerData]);

  return (
    <View style={styles.container}>
      <SearchBar isLoading={isLoading} onSearch={setSearch} />
      <Divider />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>User Types</Text>
      </View>
      <CustomerTypes
        selectedCustomerType={selectedCustomerType}
        onSelectCustomerType={setSelectedCustomerType}
      />
      <Divider />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{selectedCustomerType} Users</Text>
      </View>
      <View style={styles.listContainer}>
        {isLoading && !customers.length ? (
          <ActivityIndicator size="large" testID="loadingIndicator" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <FlatList
            refreshing={isLoading}
            testID="UsersFlatList"
            onRefresh={getCustomerData}
            keyExtractor={keyExtractor}
            data={customers}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListFooterComponent={<Divider style={styles.footerDivider} />}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No users found</Text>
              </View>
            }
            renderItem={({item}) => <CustomerCard customer={item} />}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    textTransform: 'capitalize',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleContainer: {
    marginVertical: 16,
  },
  listContainer: {
    flex: 1,
  },
  separator: {
    height: 10,
  },
  footerDivider: {
    marginTop: 20,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: '100%',
  },
  emptyText: {
    textAlign: 'center',
    color: 'grey',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});
