import { FemaleSymbolIcon, MaleSymbolIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { router, useLocalSearchParams } from "expo-router";
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
  PanResponder,
  Modal,
} from "react-native";
import { s, vs, ms } from "react-native-size-matters";
import { ListModal } from "@/components/utils/listModal";
import { PetCategoryBS } from "@/components/utils/petCategoryBS";
import { CatBreedBS } from "@/components/utils/catBreedBS";
import { DogBreedBS } from "@/components/utils/dogBreedBS";
import { ParrotBreedBS } from "@/components/utils/parrotBreedBS";
import { PetImages } from "@/components/utils/petImagesBS";
import { PetDescription } from "@/components/utils/petDescriptionBS";
import { PetInfoBS } from "@/components/utils/petInfoBS";
import { PetSubmitted } from "@/components/utils/petSubmitted";
import { Easing } from "react-native-reanimated";

const bannerImages = [
  require("../../assets/images/bannerOne.png"),
  require("../../assets/images/bannerTwo.png"),
  require("../../assets/images/bannerThree.png"),
];

const width = 336;
const BANNER_HEIGHT = 140;
const AUTO_SCROLL_INTERVAL = 3000;

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

export default function PetAdoptionScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const currentIndex = useRef(0);
  const [activeDot, setActiveDot] = useState(0);

  const [petCategoryBSOpen, setPetCategoryBSOpen] = useState(false);
  const [petImagesBSOpen, setPetImagesBSOpen] = useState(false);
  const [petDescriptionBSOpen, setPetDescriptionBSOpen] = useState(false);
  const [petInfoBSOpen, setPetInfoBSOpen] = useState(false);
  const [petSubmittedOpen, setPetSubmittedOpen] = useState(false);
  const [petSelectedCategory, setPetSelectedCategory] = useState<string | null>(
    null
  );
  const [dogBreedOpen, setDogBreedOpen] = useState(false);
  const [catBreedOpen, setCatBreedOpen] = useState(false);
  const [parrotBreedOpen, setParrotBreedOpen] = useState(false);
  const { role } = useLocalSearchParams();
  console.log("roleIndex", role);
  //const pan = useRef(new Animated.ValueXY()).current;

  const swipeTextOpacity = useRef(new Animated.Value(0)).current;
  const swipeTextTranslateX = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const loopAnimation = () => {
      Animated.sequence([
        // Slide from right to center with fade in
        Animated.parallel([
          Animated.timing(swipeTextOpacity, {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(swipeTextTranslateX, {
            toValue: 0,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
  
        // Hold in center
        Animated.delay(1000),
  
        // Slide slightly left
        Animated.timing(swipeTextTranslateX, {
          toValue: -10,
          duration: 300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
  
        // Fade out and slide smoothly back to right
        Animated.parallel([
          Animated.timing(swipeTextOpacity, {
            toValue: 0,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(swipeTextTranslateX, {
            toValue: 30,
            duration: 400, // smoother slide back
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
  
        // Small pause before restart
        Animated.delay(500),
      ]).start(() => loopAnimation());
    };
  
    loopAnimation();
  }, []);
  
  
  
  const panResponder = useRef(
    PanResponder.create({
      // onMoveShouldSetPanResponder: (evt, gestureState) => {
      //   // Detect left swipe
      //   return gestureState.dx < -20;
      // },

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        return Math.abs(dx) > 20 && Math.abs(dx) > Math.abs(dy);
      },

      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -50) {
          setPetCategoryBSOpen(true);
        }
      },
    })
  ).current;

  const dotAnimations = useRef(
    bannerImages.map(() => new Animated.Value(6))
  ).current;

  const [currentImage, setCurrentImage] = useState(bannerImages[0]);

  useEffect(() => {
    // Initialize first dot animation
    dotAnimations[0].setValue(18);

    const interval = setInterval(() => {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }).start(() => {
        // Update index and image
        currentIndex.current = (currentIndex.current + 1) % bannerImages.length;
        const newIndex = currentIndex.current;
        setCurrentImage(bannerImages[newIndex]);
        setActiveDot(newIndex);

        // Update dot animation
        dotAnimations.forEach((dot, i) => {
          Animated.timing(dot, {
            toValue: i === newIndex ? 18 : 6,
            duration: 300,
            useNativeDriver: false,
          }).start();
        });

        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 50,
          useNativeDriver: true,
        }).start();
      });
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, []);

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
            stiffness: 150, // lower = softer spring
            damping: 20,
            useNativeDriver: false,
          }),
          Animated.spring(pillWidth, {
            toValue: width,
            stiffness: 150, // lower = softer spring
            damping: 20,
            useNativeDriver: false,
          }),
        ]).start();
      });
    }
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.wrapper}>
          <Animated.Image
            source={currentImage}
            style={[styles.bannerImage, { opacity: fadeAnim }]}
          />

          {/* Pagination */}
          <View style={styles.paginationContainer}>
            {bannerImages.map((_, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    width: dotAnimations[index],
                    backgroundColor: activeDot === index ? "#fff" : "#ccc",
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {(role === "Organization" || role === "Owner") && (
          <>
            <View style={styles.listContainer} {...panResponder.panHandlers}>
              <Animated.Text
                style={[
                  styles.swipeText,
                  {
                    opacity: swipeTextOpacity,
                    transform: [
                      { rotate: "90deg" },
                      { translateX: swipeTextTranslateX },
                    ],
                  },
                ]}
              >
                Swipe Left!
              </Animated.Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setPetCategoryBSOpen(true)}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>List Your Pet</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <Text style={styles.title}>Pet Categories</Text>
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
              <TouchableOpacity
                key={pet.id}
                style={styles.petCard}
                onPress={() => router.push("./(others)/petDetail")}
              >
                <Image source={pet.image} style={styles.petImage} />
                <View style={styles.petInfo}>
                  <Text style={styles.breedText}>{pet.breed}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.nameText}>{pet.name}</Text>
                    <View style={styles.gender}>
                      {pet.gender === "Female" ? (
                        <HugeiconsIcon
                          icon={FemaleSymbolIcon}
                          size={ms(16)}
                          color="#2BBFFF"
                          strokeWidth={2.5}
                        />
                      ) : pet.gender === "Male" ? (
                        <HugeiconsIcon
                          icon={MaleSymbolIcon}
                          size={ms(16)}
                          color="#2BBFFF"
                          strokeWidth={2.5}
                        />
                      ) : null}
                    </View>
                  </View>
                  <Text style={styles.distanceText}>{pet.distance}</Text>
                </View>
              </TouchableOpacity>
            ))}
            <Text style={styles.note}>Looks like you've reached the end!</Text>
          </ScrollView>
        </View>
        <ListModal
          isOpen={petCategoryBSOpen}
          closeModal={() => setPetCategoryBSOpen(false)}
        >
          <PetCategoryBS
            // closeModal={() => setPetCategoryBSOpen(false)}
            onSelectCategory={(category) => {
              setPetSelectedCategory(category);
              setPetCategoryBSOpen(false); // close category modal
              // Open the relevant breed modal
              if (category === "2") {
                setDogBreedOpen(true);
              } else if (category === "1") {
                setCatBreedOpen(true);
              } else if (category === "3") {
                setParrotBreedOpen(true);
              }
            }}
            onCloseAndOpenModal={() => {
              setPetCategoryBSOpen(false);
            }}
            direction="horizontal"
          />
        </ListModal>
        <ListModal
          isOpen={catBreedOpen}
          closeModal={() => setCatBreedOpen(false)}
        >
          <CatBreedBS
            onCloseAndOpenModal={() => {
              setCatBreedOpen(false);
              setPetImagesBSOpen(true);
            }}
            direction="horizontal"
          />
        </ListModal>
        <ListModal
          isOpen={dogBreedOpen}
          closeModal={() => setDogBreedOpen(false)}
        >
          <DogBreedBS
            onCloseAndOpenModal={() => {
              setDogBreedOpen(false);
              setPetImagesBSOpen(true);
            }}
            direction="horizontal"
          />
        </ListModal>
        <ListModal
          isOpen={parrotBreedOpen}
          closeModal={() => setParrotBreedOpen(false)}
        >
          <ParrotBreedBS
            onCloseAndOpenModal={() => {
              setParrotBreedOpen(false);
              setPetImagesBSOpen(true);
            }}
            direction="horizontal"
          />
        </ListModal>

        <ListModal
          isOpen={petImagesBSOpen}
          closeModal={() => setPetImagesBSOpen(false)}
        >
          <PetImages
            onCloseAndOpenModal={() => {
              setPetImagesBSOpen(false);
              setPetDescriptionBSOpen(true);
            }}
            direction="horizontal"
          />
        </ListModal>
        <ListModal
          isOpen={petDescriptionBSOpen}
          closeModal={() => setPetDescriptionBSOpen(false)}
        >
          <PetDescription
            onCloseAndOpenModal={() => {
              setPetDescriptionBSOpen(false);
              setPetInfoBSOpen(true);
            }}
            direction="horizontal"
          />
        </ListModal>
        <ListModal
          isOpen={petInfoBSOpen}
          closeModal={() => setPetInfoBSOpen(false)}
        >
          <PetInfoBS
            onCloseAndOpenModal={() => {
              setPetInfoBSOpen(false);
              setPetSubmittedOpen(true);
            }}
            direction="horizontal"
          />
        </ListModal>
        <ListModal
          isOpen={petSubmittedOpen}
          closeModal={() => setPetSubmittedOpen(false)}
        >
          <PetSubmitted
            closeModal={() => setPetSubmittedOpen(false)}
            direction="horizontal"
          />
        </ListModal>
      </View>
    </View>
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
    justifyContent: "space-between",
    width: "100%",
    marginTop: Platform.OS === "ios" ? 50 : 20,
  },
  scrollContainer: {
    width: "100%",
    marginBottom: Platform.OS === "ios" ? "110%" : "120%",
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
  listContainer: {
    position: "absolute",
    right: -22, // Pushes the button out partially from the right edge
    top: 165,
    transform: [{ rotate: "-90deg" }],
    zIndex: 10,
    alignItems: "center",
  },
  swipeText: {
    fontSize: 12,
    color: "#555",
    marginBottom: 4,
    bottom: 30,
    transform: [{ rotate: "90deg" }],
  },
  button: {
    backgroundColor: "#C9EFFF",
    paddingTop: 4,
    paddingBottom: 12,
    paddingHorizontal: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
  },
  buttonText: {
    fontWeight: "500",
    fontSize: 10,
  },
});
