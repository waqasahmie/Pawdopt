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
  FlatList,
  RefreshControl,
} from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useAppContext } from "@/hooks/AppContext";
import responsive from "@/constants/Responsive";
import Toast from "@/components/utils/toast";
import { SafeAreaView } from "react-native-safe-area-context";

type Pet = {
  id: string;
  name: string;
  category: string;
  gender: string;
  breed: string;
  image: string[];
  longitude: 0;
  latitude: 0;
};

const normalizeCategory = (type: string) => {
  if (type === "Cat") return "Cats";
  if (type === "Dog") return "Dogs";
  if (type === "Parrot") return "Parrots";
  return type;
};

export default function FavoriteScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { user } = useUser();
  const [favoritePetIds, setFavoritePetIds] = useState<Pet[]>([]);
  const router = useRouter();
  const { userData } = useAppContext();
  const [refreshing, setRefreshing] = useState(false);
  const categories = ["All", "Cats", "Dogs", "Parrots"];
  const toastRef = useRef<any>({});
  const pillAnim = useRef(new Animated.Value(0)).current;
  const pillWidth = useRef(new Animated.Value(0)).current;
  const categoryRefs = useRef<{ [key: string]: View | null }>({});

  
  const filteredPets =
    selectedCategory === "All"
      ? favoritePetIds
      : favoritePetIds.filter((pet) => pet.category === selectedCategory);


    const fetchFavorites = async () => {
      if (!user?.id) {
        return;
      }

      try {
        const userRef = doc(db, "users", user.id);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          const favoriteIds: string[] = data?.favorites || [];

          if (favoriteIds.length === 0) {
            setFavoritePetIds([]);
            return;
          }

          const petDocsPromises = favoriteIds.map(async (petId) => {
            return await getDoc(doc(db, "petlistings", petId));
          });

          const petDocs = await Promise.all(petDocsPromises);
          petDocs.forEach((doc, i) => {
            console.log(
              `📄 Pet document ${i}: ID = ${doc.id}, Exists = ${doc.exists()}`
            );
          });
          const favoritePets = petDocs
            .filter((doc) => doc.exists())
            .map((doc) => {
              const petData = doc.data();
              return {
                id: doc.id,
                name: petData.name,
                breed: petData.breed,
                category: normalizeCategory(petData.category),
                gender: petData.gender,
                image: Array.isArray(petData.image)
                  ? petData.image
                  : [petData.image],
                longitude: petData.longitude,
                latitude: petData.latitude,
              };
            });

          setFavoritePetIds(favoritePets);
        }
      } catch (err) {
        toastRef.current.show({
          type: "error",
          title: "Oops! Something Went Wrong",
          description: "Couldn’t load favorites.",
        });
      }
    };

    useEffect(() => {
      fetchFavorites();
    }, [user]);
  
    const onRefresh = async () => {
      setRefreshing(true);
      await fetchFavorites();
      setRefreshing(false);
    };

  useEffect(() => {
    if (categoryRefs.current[selectedCategory]) {
      categoryRefs.current[selectedCategory].measure((x, _y, width) => {
        Animated.parallel([
          Animated.spring(pillAnim, {
            toValue: x,
            stiffness: 150,
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

  const getDistanceFromLatLonInKm = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Radius of Earth in KM
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return parseFloat(distance.toFixed(1));
  };

  const filteredNearbyPets = filteredPets.filter((pet) => {
    const petLat = Number(pet.latitude);
    const petLon = Number(pet.longitude);
    const userLat = Number(userData?.latitude);
    const userLon = Number(userData?.longitude);

    if (!userLat || !userLon || !petLat || !petLon) return false;

    const distance = getDistanceFromLatLonInKm(
      userLat,
      userLon,
      petLat,
      petLon
    );
    return distance <= 30;
  });

  const renderPetItem = ({ item }: { item: any }) => {
    const pet = item;
    const petLat = Number(pet.latitude);
    const petLon = Number(pet.longitude);
    const userLat = Number(userData?.latitude);
    const userLon = Number(userData?.longitude);

    const distance =
      userLat && userLon && petLat && petLon
        ? getDistanceFromLatLonInKm(userLat, userLon, petLat, petLon)
        : null;

    return (
      <TouchableOpacity
        key={pet.id}
        style={styles.petCard}
        onPress={() => router.push(`/petDetail?petId=${pet.id}`)}
      >
        <Image source={{ uri: pet.image[0] }} style={styles.petImage} />
        <View style={styles.petInfo}>
          <Text style={styles.breedText}>{pet.breed}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.nameText}>{pet.name}</Text>
            <View style={styles.gender}>
              {pet.gender === "Female" ? (
                <HugeiconsIcon
                  icon={FemaleSymbolIcon}
                  size={16}
                  color="#2BBFFF"
                  strokeWidth={2.5}
                />
              ) : pet.gender === "Male" ? (
                <HugeiconsIcon
                  icon={MaleSymbolIcon}
                  size={16}
                  color="#2BBFFF"
                  strokeWidth={2.5}
                />
              ) : null}
            </View>
          </View>
          <Text style={styles.distanceText}>
            {distance != null
              ? `${distance.toFixed(1)} km away`
              : "Distance unavailable"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Text style={{ fontSize: 22, fontWeight: 500 }}>Favorite Pets</Text>
        </View>

        <View style={styles.categories}>
          {/* Animated background pill */}
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

        <FlatList
          data={filteredNearbyPets}
          keyExtractor={(item) => item.id}
          renderItem={renderPetItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
          ListFooterComponent={
            <Text style={styles.note}>Looks like you've reached the end!</Text>
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#2bbfff"
              colors={["#2bbfff"]}
              progressBackgroundColor="#f2fbff"
            />
          }
        />
      </View>
      <Toast ref={toastRef} />
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
    paddingHorizontal: 20,
    gap: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
    paddingTop: Platform.OS === "ios" ? 30 : 20,
  },
  scrollContainer: {
    width: "100%",
    marginBottom: Platform.OS === "ios" ? "50%" : "70%",
  },
  title: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
    fontWeight: 500,
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
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(12),
    fontWeight: "500",
  },
  activeCategoryText: {
    color: "#fff",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(12),
    fontWeight: "500",
  },
  petCard: {
    flexDirection: "row",
    marginBottom: 25,
    marginTop: 2,
    padding: 6,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  petImage: {
    width: 145,
    height: 170,
    borderRadius: 14,
  },
  petInfo: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1,
  },
  breedText: {
    fontFamily: "JUST Sans Outline ExBold",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(26) : responsive.fontSize(20),
    fontWeight: "600",
    color: "#D4D4D4",
  },
  nameInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    color: "#ACACAC",
    marginTop: 5,
  },
  gender: {
    marginTop: 7,
    marginLeft: 6,
  },
  distanceText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(8),
    color: "#ACACAC",
    position: "absolute",
    bottom: 1,
    right: 10,
  },
  note: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(8),
    fontWeight: "400",
    alignSelf: "center",
    color: "#ACACAC",
    marginBottom: 25,
  },
});
