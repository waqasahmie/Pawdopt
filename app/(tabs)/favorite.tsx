import { FemaleSymbolIcon, MaleSymbolIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Animated,
  SafeAreaView,
} from "react-native";
import { s, vs, ms } from "react-native-size-matters";

const width = 336;
const BANNER_HEIGHT = 140;

const allPets = [
  {
    id: 1,
    breed: "Maine Coon",
    name: "Smokey",
    category: "Cats",
    gender: "Male",
    size: { width: 16, height: 16 },
    distance: "1.7km Away",
    image: require("../../assets/images/mainecoon.jpg"),
  },
  {
    id: 2,
    breed: "Macaw",
    name: "Lily",
    category: "Parrots",
    gender: "Female",
    size: { width: 14, height: 16 },
    distance: "3.2km Away",
    image: require("../../assets/images/macaw.jpg"),
  },
  {
    id: 3,
    breed: "Golden Ret.",
    name: "Lucy",
    category: "Dogs",
    gender: "Female",
    size: { width: 14, height: 16 },
    distance: "1.3km Away",
    image: require("../../assets/images/goldenretriever.jpg"),
  },
  {
    id: 4,
    breed: "British Short.",
    name: "Raya",
    category: "Cats",
    gender: "Female",
    size: { width: 14, height: 16 },
    distance: "2.9km Away",
    image: require("../../assets/images/britishshorthair.jpg"),
  },
  {
    id: 5,
    breed: "Cockatoo",
    name: "Smiley",
    category: "Parrots",
    gender: "Male",
    size: { width: 16, height: 16 },
    distance: "2.8km Away",
    image: require("../../assets/images/cockatoo.jpg"),
  },
  {
    id: 6,
    breed: "Ragdoll",
    name: "Leo",
    category: "Cats",
    gender: "Male",
    size: { width: 16, height: 16 },
    distance: "2.6km Away",
    image: require("../../assets/images/ragdoll.jpg"),
  },
  {
    id: 7,
    breed: "Samoyed",
    name: "Frosty",
    category: "Dogs",
    gender: "Male",
    size: { width: 16, height: 16 },
    distance: "3.1km Away",
    image: require("../../assets/images/samoyed.jpg"),
  },
  {
    id: 8,
    breed: "African Grey",
    name: "Gizmo",
    category: "Parrots",
    gender: "Male",
    size: { width: 16, height: 16 },
    distance: "1.9km Away",
    image: require("../../assets/images/africangrey.jpg"),
  },
  {
    id: 9,
    breed: "Siberian L.",
    name: "Mila",
    category: "Cats",
    gender: "Female",
    size: { width: 14, height: 16 },
    distance: "2.8km Away",
    image: require("../../assets/images/siberian.jpg"),
  },
  {
    id: 10,
    breed: "Labrador R.",
    name: "Daisy",
    category: "Dogs",
    gender: "Male",
    size: { width: 16, height: 16 },
    distance: "2.6km Away",
    image: require("../../assets/images/labrador.jpg"),
  },
  {
    id: 11,
    breed: "M. Cockatoo",
    name: "Candy",
    category: "Parrots",
    gender: "Male",
    size: { width: 16, height: 16 },
    distance: "2.6km Away",
    image: require("../../assets/images/mcockatoo.jpg"),
  },
  {
    id: 12,
    breed: "German Sh.",
    name: "Bruno",
    category: "Dogs",
    gender: "Male",
    size: { width: 16, height: 16 },
    distance: "1.8km Away",
    image: require("../../assets/images/german.jpg"),
  },
  {
    id: 13,
    breed: "Sun Conure",
    name: "Cane",
    category: "Parrots",
    gender: "Male",
    size: { width: 16, height: 16 },
    distance: "1.7km Away",
    image: require("../../assets/images/sunconure.jpg"),
  },
  {
    id: 14,
    breed: "Persian",
    name: "Abby",
    category: "Cats",
    gender: "Female",
    size: { width: 14, height: 16 },
    distance: "3.8km Away",
    image: require("../../assets/images/persian.jpg"),
  },
  {
    id: 15,
    breed: "Husky",
    name: "Snowy",
    category: "Dogs",
    gender: "Female",
    size: { width: 14, height: 16 },
    distance: "2.8km Away",
    image: require("../../assets/images/husky.jpg"),
  },
];

export default function FavoriteScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Cats", "Dogs", "Parrots"];

  const pillAnim = useRef(new Animated.Value(0)).current;
  const pillWidth = useRef(new Animated.Value(0)).current;
  const categoryRefs = useRef<{ [key: string]: View | null }>({});

  const filteredPets =
    selectedCategory === "All"
      ? allPets
      : allPets.filter((pet) => pet.category === selectedCategory);

  useEffect(() => {
    if (categoryRefs.current[selectedCategory]) {
      categoryRefs.current[selectedCategory].measure((x, _y, width) => {
        Animated.parallel([
          Animated.spring(pillAnim, {
            toValue: x,
            stiffness: 150,      // lower = softer spring
            damping: 20,  
            useNativeDriver: false,
          }),
          Animated.spring(pillWidth, {
            toValue: width,
            stiffness: 150,      // lower = softer spring
            damping: 20,  
            useNativeDriver: false,
          }),
        ]).start();
      });
    }
  }, [selectedCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
      <View style={styles.headerContainer}>
          <Text style={{ fontSize: 22, fontWeight: 500 }}>
            Favorite Pets
          </Text>
        </View>

        <View style={styles.categories}>
          {/* 🔧 Animated background pill */}
          <Animated.View
            style={[
              styles.activeCategory,
              { transform: [{ translateX: pillAnim }], width: pillWidth },
            ]}
          />
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              activeOpacity={0.7}
              ref={(ref) => (categoryRefs.current[category] = ref)}
              style={styles.categoryButton}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.activeCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.scrollContainer}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {filteredPets.map((pet) => (
              <View key={pet.id} style={styles.petCard}>
              <Image source={pet.image} style={styles.petImage} />
              <View style={styles.petInfo}>
                <Text style={styles.breedText}>{pet.breed}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.nameText}>{pet.name}</Text>
                  <View style={styles.gender}>
                    {pet.gender === "Female" ? (
                      <HugeiconsIcon icon={FemaleSymbolIcon} size={ms(16)} color="#2BBFFF" strokeWidth={2.5}/>
                    ) : pet.gender === "Male" ? (
                      <HugeiconsIcon icon={MaleSymbolIcon} size={ms(16)} color="#2BBFFF" strokeWidth={2.5}/>
                    ) : null}
                  </View>
                </View>
                <Text style={styles.distanceText}>{pet.distance}</Text>
              </View>
            </View>
            ))}
            <Text style={styles.note}>Looks like you've reached the end!</Text>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: s(20),
    gap: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: vs(5),
    marginBottom: vs(10),
    // marginTop: Platform.OS === "ios" ? 50 : 20,
  },
  scrollContainer: {
    width: "100%",
    marginBottom: Platform.OS === "ios" ? "50%" : "70%",
  },
  greetingContainer: {
    flexDirection: "row",
  },
  greeting: {
    flexDirection: "column",
  },
  greetingText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#acacac",
  },
  username: {
    fontSize: 16,
    fontWeight: "400",
  },
  paw: {
    width: 20,
    height: 20,
    right: 8,
  },
  searchContainer: {
    width: "50%",
    justifyContent: "center",
  },
  searchInput: {
    height: ms(40),
    fontSize: Platform.OS === "ios" ? ms(15) : ms(12),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    paddingVertical: vs(10),
    paddingLeft: ms(20),
    paddingRight: ms(40),
  },
  searchIcon: {
    position: "absolute",
    right: 10,
    color: "#000",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  icon: {
    width: 40,
    height: 40,
  },
  wrapper: {
    width: width,
    height: BANNER_HEIGHT,
    borderRadius: 26,
    overflow: "hidden",
    alignSelf: "center",
    position: "relative",
    backgroundColor: "#eee",
    marginTop: 20,
  },
  bannerImage: {
    width: width,
    height: BANNER_HEIGHT,
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
  },
  paginationContainer: {
    position: "absolute",
    bottom: 4,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: 6,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
  },
  categories: {
    flexDirection: "row",
    backgroundColor: "#F2FBFF",
    padding: 6,
    borderRadius: 50,
    justifyContent: "space-between",
    position: "relative",
  },
  categoryButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 50,
    // backgroundColor:"pink",
  },
  activeCategory: {
    alignSelf: "center",
    position: "absolute",
    height: "100%",
    backgroundColor: "#2bbfff",
    borderRadius: 50,
    zIndex: 0,
  },
  categoryText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
  activeCategoryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  petCard: {
    flexDirection: "row",
    marginBottom: ms(25),
    marginTop: ms(2),
    padding: ms(6),
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: vs(4) },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  petImage: {
    width: ms(145),
    height: ms(170),

    borderRadius: 14,
  },
  petInfo: {
    paddingHorizontal: s(15),
    paddingVertical: vs(10),
    flex: 1,
  },
  breedText: {
    fontFamily: "JUST Sans Outline ExBold",
    fontSize: Platform.OS === "ios" ? ms(26) : ms(21),
    fontWeight: "600",
    color: "#D4D4D4",
  },
  nameInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameText: {
    fontSize: Platform.OS === "ios" ? ms(17) : ms(14),
    color: "#ACACAC",
    marginTop: ms(5),
  },
  gender: {
    marginTop: ms(7),
    marginLeft: ms(6),
  },
  distanceText: {
    fontSize: Platform.OS === "ios" ? ms(11) : ms(8),
    color: "#ACACAC",
    position: "absolute",
    bottom: 1,
    right: 10,
  },
  note: {
    fontSize: Platform.OS === "ios" ? ms(11) : ms(8),
    fontWeight: "400",
    alignSelf: "center",
    color: "#ACACAC",
    marginBottom: ms(25),
  },
});