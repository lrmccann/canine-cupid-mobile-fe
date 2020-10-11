import React from "react";
import { FlatList , View , StyleSheet } from "react-native";

// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    <View className="list-overflow-container">
      <FlatList className="list-group">{children}</FlatList>
    </View>
  );
}

export function ListItem({ children }) {
  return <FlatList className="list-group-item">{children}</FlatList>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});