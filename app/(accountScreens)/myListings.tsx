import React, { useEffect, useRef, useState } from "react";
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
  Platform,
  RefreshControl,
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
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { db } from "@/config/firebaseConfig";
import { ActivityIndicator, FlatList } from "react-native";
import { supabase } from "@/config/supabase";
import { router } from "expo-router";
import { useAppContext } from "@/hooks/AppContext";
import responsive from "@/constants/Responsive";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyListings() {
  const toastRef = useRef<any>({});
  const navigation = useNavigation();
  const { user } = useUser(); 
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const {
    petListingData,
    updatePetListingData,
    resetPetListingData,
    isEdit,
    setIsEdit,
  } = useAppContext();
  const [petCategoryBSOpen, setPetCategoryBSOpen] = useState(false);
  const [petImagesBSOpen, setPetImagesBSOpen] = useState(false);
  const [petDescriptionBSOpen, setPetDescriptionBSOpen] = useState(false);
  const [petInfoBSOpen, setPetInfoBSOpen] = useState(false);
  const [petSubmittedOpen, setPetSubmittedOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dogBreedOpen, setDogBreedOpen] = useState(false);
  const [catBreedOpen, setCatBreedOpen] = useState(false);
  const [parrotBreedOpen, setParrotBreedOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [petId, setPetId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPets = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const q = query(
        collection(db, "petlistings"),
        where("ownerId", "==", user.id)
      );

      const querySnapshot = await getDocs(q);
      const pets = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data };
      });

      setListings(pets);
      setLoading(false);
    } catch (error) {
      toastRef.current.show({
        type: "error",
        title: "Oops! Something Went Wrong",
        description: "Couldn't load pets.",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPets();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2BBFFF" />
        <Text>Loading your pets...</Text>
      </View>
    );
  }

  const deleteItem = async (id: string, petName: string) => {
    try {
      // Check if pet exists in the listings
      const pet = listings.find((item) => item.id === id);
      if (!pet) {
        console.error(`Pet with id ${id} not found.`);
        toastRef.current.show({
          type: "danger",
          title: "Delete Failed",
          description: `Pet with ID ${id} not found.`,
        });
        return;
      }

      if (pet?.image && Array.isArray(pet.image)) {
        const imagePaths = pet.image.map((url: string) => {
          const parts = url.split(
            "/storage/v1/object/public/user-documents/"
          )[1];
          return parts;
        });

        const { data, error: imageError } = await supabase.storage
          .from("user-documents")
          .remove(imagePaths);
        if (imageError) {
          toastRef.current.show({
            type: "error",
            title: "Delete Failed",
            description: "Error removing images from storage.",
          });
        }
      }

      await deleteDoc(doc(db, "petlistings", id));

      setListings((prev) => prev.filter((item) => item.id !== id));

      toastRef.current.show({
        type: "success",
        title: "Successfully Deleted",
        description: `${petName} has been removed.`,
      });

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    } catch (error) {
      toastRef.current.show({
        type: "error",
        title: "Delete Failed",
        description: `Could not delete ${petName}. Please try again.`,
      });
    }
  };

  const renderRightActions = (
    id: string,
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

  const categoryToIdMap: Record<string, string> = {
    Cat: "1",
    Dog: "2",
    Parrot: "3",
  };

  const renderListingItem = ({ item }: { item: any }) => (
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
        <Pressable
          onPress={() => router.push(`/petDetail?petId=${item.id}`)}
          style={{ flexDirection: "row", flex: 1 }}
        >
          <Image source={{ uri: item.image?.[0] }} style={styles.petImage} />
          <View style={styles.textContainer}>
            <Text style={styles.petType}>{item.breed}</Text>
            <View style={styles.nameGender}>
              <Text style={styles.petName}>{item.name}</Text>
              <Image
                source={
                  item.gender?.toLowerCase() === "male"
                    ? require("../../assets/images/male.png")
                    : require("../../assets/images/female.png")
                }
                style={styles.genderIcon}
              />
            </View>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            setCurrentItem(item.category);
            resetPetListingData();
            updatePetListingData("category", item.category);
            updatePetListingData("breed", item.breed);
            updatePetListingData("image", item.image);
            updatePetListingData("age", item.age);
            updatePetListingData("gender", item.gender);
            updatePetListingData("weight", item.weight);
            updatePetListingData("price", item.price);
            updatePetListingData("eyeColor", item.eyeColor);
            updatePetListingData("name", item.name);
            updatePetListingData("description", item.description);

            setPetCategoryBSOpen(true);
            setIsEdit(item.id);
          }}
          style={styles.editlistingIcon}
        >
          <HugeiconsIcon icon={Edit02Icon} size={18} color="#000" />
        </Pressable>
      </View>
    </Swipeable>
  );

  return (
    <SafeAreaView style={styles.container}>
    <GestureHandlerRootView>
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
        <FlatList
          data={listings}
          keyExtractor={(item) => item.id}
          renderItem={renderListingItem}
          contentContainerStyle={{
            flexGrow: 1,
            marginBottom: 20,
            alignItems: listings.length === 0 ? "center" : undefined,
            justifyContent: listings.length === 0 ? "center" : undefined,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#2bbfff"
              colors={["#2bbfff"]}
              progressBackgroundColor="#f2fbff"
            />
          }
          ListEmptyComponent={() => (
            <Text style={styles.emptyList}>
              🐾 You haven't listed any pets yet!
            </Text>
          )}
        />

        <Modal
          isOpen={petCategoryBSOpen}
          closeModal={() => setPetCategoryBSOpen(false)}
        >
          <PetCategoryBS
            onSelectCategory={(category) => {
              setPetCategoryBSOpen(false);
              if (category === "2") {
                setDogBreedOpen(true);
              } else if (category === "1") {
                setCatBreedOpen(true);
              } else if (category === "3") {
                setParrotBreedOpen(true);
                setSelectedCategory("parrot");
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
            category={selectedCategory}
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
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: Platform.OS === "ios" ? 30 : 20,
    marginBottom: 40,
  },
  navText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
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
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(25) : responsive.fontSize(20),
    fontWeight: "600",
    color: "#D4D4D4",
    marginBottom: 10,
  },
  nameGender: {
    flex: 1,
    flexDirection: "row",
  },
  petName: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
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
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "bold",
  },
  emptyList: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    fontWeight: "400",
    alignSelf: "center",
    color: "#ACACAC",
    marginBottom: 25,
  },
});
