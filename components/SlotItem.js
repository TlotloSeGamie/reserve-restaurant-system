import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SlotItem = ({ slot, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.slotItem, isSelected && styles.selectedSlot]}
      onPress={onPress}
    >
      <Text>{slot}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  slotItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 8,
  },
  selectedSlot: {
    backgroundColor: '#add8e6',
  },
});

export default SlotItem;
