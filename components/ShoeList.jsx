// components/ShoeList.js

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const shoes = [
  { id: '1', name: 'Nike Air Force 1', price: '$90', description: 'Classic sneaker', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Adidas Ultraboost', price: '$180', description: 'Running shoe', image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Converse Chuck Taylor', price: '$55', description: 'Iconic sneaker', image: 'https://via.placeholder.com/150' },
];

const ShoeList = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ShoeDetail', { item })}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <Text>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={shoes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
});

export default ShoeList;
