import React from "react";
import { Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={x => x.id}
      renderItem={itemData => <Text>{itemData.item.title}</Text>}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products"
};

const styles = StyleSheet.create({});

export default ProductsOverviewScreen;
