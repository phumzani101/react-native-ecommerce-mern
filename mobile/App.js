import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ProductScreen from "./src/screens/products/ProductScreen";
import AppHeader from "./src/components/shared/AppHeader";

export default function App() {
  return (
    <SafeAreaProvider>
      <ProductScreen />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
