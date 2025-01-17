import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ searchQuery, onSearch }) => {
  return (
    <TextInput
      style={styles.searchBar}
      placeholder="Search restaurants..."
      value={searchQuery}
      onChangeText={onSearch}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
});

export default SearchBar;
