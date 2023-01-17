import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProductCard from "./ProductCard";

const { width } = Dimensions.get("window");

const ProductItem = ({ product }) => {
  return <ProductCard product={product} />;
};

const styles = StyleSheet.create({
  container: {
    width: "50%",
  },
  wrapper: {
    width: width / 2,
    backgroundColor: "gainsboro",
  },
});

export default ProductItem;
