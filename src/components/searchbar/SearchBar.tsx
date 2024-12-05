import React, {useState, useCallback, Dispatch, SetStateAction} from 'react';
import {View, TextInput, StyleSheet, ActivityIndicator} from 'react-native';
import {debounce} from '../../services/utils';

interface SearchBoxProps {
  onSearch: Dispatch<SetStateAction<string>>;
  isLoading?: boolean;
}

export default function SearchBar({onSearch, isLoading}: SearchBoxProps) {
  const [search, setSearch] = useState('');

  const throttledSearch = useCallback(
    debounce((search: string) => {
      onSearch(search);
    }),
    [],
  );

  const handleChangeText = (text: string) => {
    setSearch(text);
    throttledSearch(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor={'black'}
        placeholder="Search..."
        value={search}
        onChangeText={handleChangeText}
        clearButtonMode="always"
      />
      {isLoading && search && (
        <ActivityIndicator
          size="small"
          color="#0000ff"
          testID="activity-indicator"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    width: '100%',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
});
