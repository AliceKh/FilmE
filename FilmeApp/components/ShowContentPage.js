import React, { Component } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const data = [
  { id: '1', source: require('../images/user1.png') },
  { id: '2', source: require('../images/user2.png') },
  { id: '3', source: require('../images/user3.png') },
  { id: '4', source: require('../images/user4.png') },
  { id: '5', source: require('../images/user5.png') },
  { id: '6', source: require('../images/user6.png') },
  { id: '7', source: require('../images/user7.png') },
  { id: '8', source: require('../images/user1.png') },
  { id: '9', source: require('../images/user8.png') },
];

export default class ImageGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImageId: null,
    };
  }

  renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.itemContainer, item.id === this.state.selectedImageId && styles.selectedItemContainer]}
      onPress={() => this.setState({ selectedImageId: item.id })}
    >
      <Image style={styles.itemImage} source={item.source} />
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          numColumns={3}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    flex: 1,
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },
  selectedItemContainer: {
    borderWidth: 2,
    borderColor: '#2196f3',
  },
  itemImage: {
    flex: 1,
    width: 200,
    height: 200,
    aspectRatio: 1,
  },
});
