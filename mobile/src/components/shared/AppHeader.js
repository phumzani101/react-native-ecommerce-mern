import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AppHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>App Shop</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
    backgroundColor: "gainsboro",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default AppHeader;
