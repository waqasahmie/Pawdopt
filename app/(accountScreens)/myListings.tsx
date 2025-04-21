import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  Animated,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import Toast from "../../components/utils/toast";
import { PetCategoryBS } from "@/components/utils/petCategoryBS";
import { CatBreedBS } from "@/components/utils/catBreedBS";
import { PetImages } from "@/components/utils/petImagesBS";
import { PetDescription } from "@/components/utils/petDescriptionBS";
import { PetInfoBS } from "@/components/utils/petInfoBS";
import { PetSubmitted } from "@/components/utils/petSubmitted";
import { Modal } from "@/components/utils/modal";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Edit02Icon } from "@hugeicons/core-free-icons";
import { DogBreedBS } from "@/components/utils/dogBreedBS";
import { ParrotBreedBS } from "@/components/utils/parrotBreedBS";

export default function MyListings() {
  const toastRef = useRef<any>({});
  const navigation = useNavigation();
  const [listings, setListings] = useState([
    {
      id: 1,
      petType: "Maine Coon",
      name: "Smokey",
      gender: require("../../assets/images/male.png"),
      image: require("../../assets/images/mainecoon.jpg"),
    },
    {
      id: 2,
      petType: "Macaw",
      name: "Lily",
      gender: require("../../assets/images/female.png"),
      image: require("../../assets/images/macaw.jpg"),
    },
    {
      id: 3,
      petType: "Golden Ret.",
      name: "Lucy",
      gender: require("../../assets/images/female.png"),
      image: require("../../assets/images/goldenretriever.jpg"),
    },
    {
      id: 4,
      petType: "British Short.",
      name: "Raya",
      gender: require("../../assets/images/male.png"),
      image: require("../../assets/images/britishshorthair.jpg"),
    },
    {
      id: 5,
      petType: "Cockatoo",
      name: "Smiley",
      gender: require("../../assets/images/female.png"),
      image: require("../../assets/images/cockatoo.jpg"),
    },
    {
      id: 6,
      petType: "Ragdoll",
      name: "Leo",
      gender: require("../../assets/images/male.png"),
      image: require("../../assets/images/ragdoll.jpg"),
    },
    {
      id: 7,
      petType: "Samoyed",
      name: "Frosty",
      gender: require("../../assets/images/male.png"),
      image: require("../../assets/images/samoyed.jpg"),
    },
    {
      id: 8,
      petType: "African Grey",
      name: "Gizmo",
      gender: require("../../assets/images/female.png"),
      image: require("../../assets/images/africangrey.jpg"),
    },
    {
      id: 9,
      petType: "Persian",
      name: "Abby",
      gender: require("../../assets/images/female.png"),
      image: require("../../assets/images/persian.jpg"),
    },
  ]);

  const [petCategoryBSOpen, setPetCategoryBSOpen] = useState(false);
  const [petImagesBSOpen, setPetImagesBSOpen] = useState(false);
  const [petDescriptionBSOpen, setPetDescriptionBSOpen] = useState(false);
  const [petInfoBSOpen, setPetInfoBSOpen] = useState(false);
  const [petSubmittedOpen, setPetSubmittedOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [dogBreedOpen, setDogBreedOpen] = useState(false);
  const [catBreedOpen, setCatBreedOpen] = useState(false);
  const [parrotBreedOpen, setParrotBreedOpen] = useState(false);

  // Function to delete an item
  const deleteItem = (id: number, petName: string) => {
    setListings(listings.filter((item) => item.id !== id));

    toastRef.current.show({
      type: "success",
      title: "Successfully Deleted",
      description: `${petName} has been removed.`,
    });

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
  };

  // Render the delete button
  const renderRightActions = (
    id: number,
    petName: string,
    progress: Animated.AnimatedInterpolation<string | number>
  ) => {
    const opacity = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return (
      <TouchableOpacity
        onPress={() => deleteItem(id, petName)}
        style={styles.deleteButton}
      >
        <Animated.Text style={[styles.deleteText, { opacity }]}>
          Delete
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.innerContainer}>
        <StatusBar barStyle="dark-content" />

        {/* Back Button */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ zIndex: 10 }}
          >
            <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
          </TouchableOpacity>
          <Text style={styles.navText}>My Listings</Text>
        </View>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20 }}
        >
          {listings.map((item) => (
            <Swipeable
              key={item.id}
              renderRightActions={(progress) =>
                renderRightActions(item.id, item.name, progress)
              }
              onSwipeableWillOpen={() =>
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              }
            >
              <View style={styles.listingCard}>
                <Image source={item.image} style={styles.petImage} />
                <View style={styles.textContainer}>
                  <Text style={styles.petType}>{item.petType}</Text>
                  <View style={styles.nameGender}>
                    <Text style={styles.petName}>{item.name}</Text>
                    <Image source={item.gender} style={styles.genderIcon} />
                  </View>
                </View>
                <Pressable
                  onPress={() => setPetCategoryBSOpen(true)}
                  style={styles.editlistingIcon}
                >
                  <HugeiconsIcon icon={Edit02Icon} size={18} color="#000" />
                </Pressable>
              </View>
            </Swipeable>
          ))}
        </ScrollView>
        <Modal
          isOpen={petCategoryBSOpen}
          closeModal={() => setPetCategoryBSOpen(false)}
        >
          <PetCategoryBS
            // closeModal={() => setPetCategoryBSOpen(false)}
            onSelectCategory={(category) => {
              setSelectedCategory(category);
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
          />
        </Modal>
        <Modal isOpen={catBreedOpen} closeModal={() => setCatBreedOpen(false)}>
          <CatBreedBS
            onCloseAndOpenModal={() => {
              setCatBreedOpen(false);
              setPetImagesBSOpen(true);
            }}
          />
        </Modal>
        <Modal isOpen={dogBreedOpen} closeModal={() => setDogBreedOpen(false)}>
          <DogBreedBS
            onCloseAndOpenModal={() => {
              setDogBreedOpen(false);
              setPetImagesBSOpen(true);
            }}
          />
        </Modal>
        <Modal
          isOpen={parrotBreedOpen}
          closeModal={() => setParrotBreedOpen(false)}
        >
          <ParrotBreedBS
            onCloseAndOpenModal={() => {
              setParrotBreedOpen(false);
              setPetImagesBSOpen(true);
            }}
          />
        </Modal>

        <Modal
          isOpen={petImagesBSOpen}
          closeModal={() => setPetImagesBSOpen(false)}
        >
          <PetImages
            onCloseAndOpenModal={() => {
              setPetImagesBSOpen(false);
              setPetDescriptionBSOpen(true);
            }}
          />
        </Modal>
        <Modal
          isOpen={petDescriptionBSOpen}
          closeModal={() => setPetDescriptionBSOpen(false)}
        >
          <PetDescription
            onCloseAndOpenModal={() => {
              setPetDescriptionBSOpen(false);
              setPetInfoBSOpen(true);
            }}
          />
        </Modal>
        <Modal
          isOpen={petInfoBSOpen}
          closeModal={() => setPetInfoBSOpen(false)}
        >
          <PetInfoBS
            onCloseAndOpenModal={() => {
              setPetInfoBSOpen(false);
              setPetSubmittedOpen(true);
            }}
          />
        </Modal>
        <Modal
          isOpen={petSubmittedOpen}
          closeModal={() => setPetSubmittedOpen(false)}
        >
          <PetSubmitted closeModal={() => setPetSubmittedOpen(false)} />
        </Modal>
      </View>
      <Toast ref={toastRef} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 60,
    marginBottom: 40,
  },
  navText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#000",
    position: "absolute",
    textAlign: "center",
    left: 0,
    right: 0,
  },
  listingCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    padding: 7,
    width: "100%",
  },
  petImage: {
    width: 73,
    height: 73,
    borderRadius: 8,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  petType: {
    fontFamily: "JUST Sans Outline ExBold",
    fontSize: 28,
    fontWeight: "700",
    color: "#AAAAAA",
    marginBottom: 10,
  },
  nameGender: {
    flex: 1,
    flexDirection: "row",
  },
  petName: {
    fontSize: 16,
    color: "#ACACAC",
    fontWeight: "600",
  },
  genderIcon: {
    width: 14,
    height: 14,
    marginLeft: 8,
    marginTop: 2,
    resizeMode: "contain",
  },
  editlistingIcon: {
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: "85%",
    borderRadius: 15,
    marginLeft: 5,
  },
  deleteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
