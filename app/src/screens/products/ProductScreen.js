import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import productsData from "../../../assets/data/products.json";
import ProductItem from "../../components/products/ProductItem";
import AppLayout from "../../components/shared/AppLayout";
import { Searchbar } from "react-native-paper";
import AppHeader from "../../components/shared/AppHeader";
import AppBanner from "../../components/shared/AppBanner";

const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");

  useEffect(() => {
    setProducts(productsData);
    setProductsFiltered(productsData);
    return () => {
      setProducts([]);
      setProductsFiltered([]);
    };
  }, []);

  const onChangeSearch = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
      />

      <View style={styles.banner}>
        <AppBanner />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={products}
        keyExtractor={(item) => item.name}
        numColumns={2}
        renderItem={({ item, index }) => (
          <ProductItem product={item} key={item.name} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  searchBar: {
    margin: 8,
  },
  banner: {
    padding: 20,
  },
});

export default ProductScreen;
