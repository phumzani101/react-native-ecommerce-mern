import { Dimensions, StyleSheet, View, Button, Image } from "react-native";
import { Card, Text } from "react-native-paper";

const { width } = Dimensions.get("window");

const ProductCard = ({ product }) => {
  const imgSrc = product?.image || "https://placeimg.com/640/480/any";
  return (
    <Card style={styles.container}>
      <Card.Cover
        source={{ uri: imgSrc }}
        resizeMode="contain"
        style={styles.image}
      />

      <Card.Content>
        <Text style={styles.title} variant="titleLarge">
          {product.name}
        </Text>
        <Text style={styles.price} variant="bodyMedium">
          R{product.price}
        </Text>
      </Card.Content>

      <Card.Actions style={styles.btnContainer}>
        {/* <Button>Cancel</Button>
        <Button>Ok</Button> */}
        <Button title="Add" color="green"></Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    // height: width / 1.7,
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 12,
    alignItems: "center",
    elevation: 8,
    backgroundColor: "white",
  },
  image: {
    width: width / 2 - 20 - 1,
    height: width / 2 - 30 - 20,
  },
  card: {
    marginBottom: 10,
    width: width / 2 - 20 - 10,
    // height: width / 2 - 30 - 90,
    backgroundColor: "transparent",
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  price: {
    color: "orange",
    fontSize: 20,
    marginTop: 10,
    textAlign: "center",
  },
  btnContainer: { alignContent: "center" },
});

export default ProductCard;
