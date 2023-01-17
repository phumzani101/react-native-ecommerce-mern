import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

const { width, height } = Dimensions.get("window");

const newImage = [
  "https://placeimg.com/640/480/any",
  "https://placeimg.com/640/480/any",
  "https://placeimg.com/640/480/any",
  "https://placeimg.com/640/480/any",
  "https://placeimg.com/640/480/any",
];
const image = (index) => ({ image: newImage[index % newImage.length] });

const items = Array.from(Array(5)).map((_, index) => image(index));

const AppBanner = () => {
  return (
    <View style={styles.container}>
      <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        index={1}
        data={items}
        renderItem={({ item }) => (
          <View style={styles.child}>
            <Image
              style={styles.image}
              source={{ uri: item.image }}
              resizeMode="cover"
            />
          </View>
        )}
        showPagination
        // style={styles.swiper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: height * 0.25,
    width: width - 20,
  },
  container: {
    backgroundColor: "#fff",
    alignContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  swiper: {
    width: width - 20,
    // alignItems: "center",
    margin: 10,
  },
  child: { height: height * 0.25, width: width - 20, justifyContent: "center" },
});

export default AppBanner;
