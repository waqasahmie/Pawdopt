import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import {
  FemaleSymbolIcon,
  MaleSymbolIcon,
  MultiplicationSignIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { s, vs, ms } from "react-native-size-matters";
import { useAppContext } from "@/hooks/AppContext";
import { db } from "../../config/firebaseConfig";
import { doc, setDoc, where, query } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs } from "firebase/firestore";
import { router } from "expo-router";
import responsive from "@/constants/Responsive";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
type Pet = {
  id: string;
  name: string;
  category: string;
  gender: string;
  breed: string;
  image: string;
  latitude: number;
  longitude: number;
};
export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const {
    recentSearches,
    setRecentSearches,
    addRecentSearch,
    deleteRecentSearch,
  } = useAppContext();
  const navigation = useNavigation();
  const [allPets, setAllPets] = useState<Pet[]>([]);
  const { userData, fetchUserData, updateUserData, resetPetListingData } =
    useAppContext();
  const normalizeCategory = (type: string) => {
    if (type === "Cat") return "Cats";
    if (type === "Dog") return "Dogs";
    if (type === "Parrot") return "Parrots";
    return type;
  };
  const fetchPets = async () => {
    try {
      const snapshot = await getDocs(collection(db, "petlistings"));
      const pets = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          category: normalizeCategory(data.category),
          gender: data.gender,
          breed: Array.isArray(data.breed) ? data.breed[0] : data.breed,
          size: { width: 16, height: 16 },
          image: Array.isArray(data.image) ? data.image[0] : data.image || "",
          latitude: data.latitude,
          longitude: data.longitude,
        };
      });
      setAllPets(pets);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

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
  const trimmedQuery = query.trim().toLowerCase();

  const filteredPets = allPets.filter((pet) =>
    `${pet.category} ${pet.breed} ${pet.name}`
      .toLowerCase()
      .includes(trimmedQuery)
  );

  const suggestions = trimmedQuery
    ? Array.from(
        new Set(
          allPets
            .filter((pet) =>
              `${pet.category} ${pet.breed} ${pet.name}`
                .toLowerCase()
                .includes(trimmedQuery)
            )
            .map((pet) => ({
              category: pet.category,
              breed: pet.breed,
              name: pet.name,
            }))
        )
      )
    : [];

  const handleSubmit = () => {
    setSuggestionsVisible(false);
    if (query.trim()) {
      addRecentSearch(query.trim());
    }
  };
  const handleDeleteRecentSearch = (item: string) => {
    deleteRecentSearch(item);
  };

  // Helper function at the top of your component/file
  const renderDistance = (pet: any): string => {
    const petLat = Number(pet.latitude);
    const petLon = Number(pet.longitude);
    const userLat = Number(userData?.latitude);
    const userLon = Number(userData?.longitude);

    const distance =
      userLat && userLon && petLat && petLon
        ? getDistanceFromLatLonInKm(userLat, userLon, petLat, petLon)
        : null;

    return distance != null
      ? `${distance.toFixed(1)} km away`
      : "Distance unavailable";
  };

  const renderSuggestionText = (suggestion: {
    category: string;
    breed: string;
    name: string;
  }) => {
    const fullText = `${suggestion.category} ${suggestion.breed} ${suggestion.name}`;
    const index = fullText.toLowerCase().indexOf(trimmedQuery);
    if (index === -1)
      return <Text style={styles.suggestionText}>{fullText}</Text>;

    return (
      <Text style={styles.suggestionText}>
        {fullText.substring(0, index)}
        <Text style={styles.highlightText}>
          {fullText.substring(index, index + trimmedQuery.length)}
        </Text>
        {fullText.substring(index + trimmedQuery.length)}
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ zIndex: 10 }}
          >
            <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Search Pets</Text>
        </View>
        <View style={styles.searchInputContainer}>
          <View style={styles.searchIcon}>
            <HugeiconsIcon icon={Search01Icon} size={ms(19)} color="#999" />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Search by breed or category"
            placeholderTextColor="#aaa"
            value={query}
            onChangeText={(text) => {
              setQuery(text);
              setSuggestionsVisible(text.trim().length > 0);
            }}
            onSubmitEditing={() => {
              handleSubmit();
              setSuggestionsVisible(false);
            }}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity
              style={styles.clearIcon}
              onPress={() => {
                setQuery("");
                setSuggestionsVisible(false);
              }}
            >
              <HugeiconsIcon
                icon={MultiplicationSignIcon}
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          )}
        </View>

        {query.trim().length === 0 && recentSearches.length > 0 && (
          <View style={styles.recentContainer}>
            <Text style={styles.recentTitle}>Recent Searches:</Text>
            {recentSearches.map((item, index) => (
              <View style={styles.recentItemContainer} key={index}>
                <TouchableOpacity onPress={() => setQuery(item)}>
                  <Text style={styles.recentItem}>{item}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteRecentSearch(item)}
                >
                  <HugeiconsIcon
                    icon={MultiplicationSignIcon}
                    size={20}
                    color="#000"
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {suggestionsVisible && suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  const fullText = `${suggestion.category} ${suggestion.breed} ${suggestion.name}`;
                  setQuery(fullText.trim());
                  setSuggestionsVisible(false);
                  addRecentSearch(fullText.trim());
                }}
              >
                {renderSuggestionText(suggestion)}
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={styles.scrollContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {trimmedQuery !== "" &&
              (filteredPets.length > 0 ? (
                <>
                  {filteredPets.map((pet) => (
                    <TouchableOpacity
                      key={pet.id}
                      style={styles.petCard}
                      onPress={() => router.push(`/petDetail?petId=${pet.id}`)}
                    >
                      <Image
                        source={{ uri: pet.image }}
                        style={styles.petImage}
                      />
                      <View style={styles.petInfo}>
                        <Text style={styles.breedText}>{pet.breed}</Text>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text style={styles.nameText}>{pet.name}</Text>
                          <View style={styles.gender}>
                            {pet.gender === "Female" ? (
                              <HugeiconsIcon
                                icon={FemaleSymbolIcon}
                                size={16}
                                color="#2BBFFF"
                                strokeWidth={2.5}
                              />
                            ) : (
                              <HugeiconsIcon
                                icon={MaleSymbolIcon}
                                size={ms(16)}
                                color="#2BBFFF"
                                strokeWidth={2.5}
                              />
                            )}
                          </View>
                        </View>
                        <Text style={styles.distanceText}>
                          {renderDistance(pet)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                  <Text style={styles.note}>
                    Looks like you've reached the end!
                  </Text>
                </>
              ) : (
                <Text style={styles.noResult}>
                  No pets found. Try another search!
                </Text>
              ))}
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
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    marginTop: Platform.OS === "ios" ? 20 : 20,
  },
  headerText: {
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
    fontWeight: "500",
    position: "absolute",
    width: "100%",
    textAlign: "center",
  },
  scrollContainer: {
    width: "100%",
    marginBottom: Platform.OS === "ios" ? "25%" : "35%",
  },
  searchInputContainer: {
    position: "relative",
    justifyContent: "center",
  },
  searchIcon: {
    position: "absolute",
    left: 12,
    top: "50%",
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },
  clearIcon: {
    position: "absolute",
    right: 15,
    top: "50%",
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    marginVertical: 10,
    paddingVertical: "4%",
    color: "#000",
    paddingLeft: 38,
    paddingRight: 35,
  },
  suggestionsContainer: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
  },
  suggestionText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    paddingVertical: 5,
    color: "#333",
  },
  highlightText: {
    color: "#000",
    fontWeight: "600",
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
      Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
    fontWeight: "600",
    color: "#D4D4D4",
  },
  nameText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    color: "#ACACAC",
    marginTop: 5,
  },
  gender: {
    marginLeft: 6,
    marginTop: 6,
  },
  distanceText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(8),
    color: "#aaa",
    position: "absolute",
    bottom: 1,
    right: 10,
  },
  noResult: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    textAlign: "center",
    color: "#999",
    marginTop: 20,
  },
  note: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(8),
    fontWeight: "400",
    alignSelf: "center",
    color: "#ACACAC",
    marginBottom: 25,
  },
  recentContainer: {
    marginBottom: 10,
  },
  recentItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  recentTitle: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "600",
    marginBottom: 5,
  },
  recentItem: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    paddingVertical: 3,
  },
});
