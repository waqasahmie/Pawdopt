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
  TouchableWithoutFeedback,
  Pressable,
  ActivityIndicator,
  Linking,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Feather, Ionicons } from "@expo/vector-icons";
import { CoverFlowCarousel } from "@/components/utils/petCarousel";
import {
  Call02Icon,
  Comment01Icon,
  Share08Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { router, useLocalSearchParams } from "expo-router";
import { db } from "../../config/firebaseConfig"; // Assuming you are using Firebase
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import responsive from "@/constants/Responsive";
import { red } from "react-native-reanimated/lib/typescript/Colors";

interface Pet {
  name: string;
  age: string;
  breed: string[];
  category: string;
  createdAt: string;
  description: string;
  eyeColor: string;
  gender: string;
  image: string[];
  ownerId: string;
  price: number;
  weight: string;
}

export default function PetDetail() {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [petDetails, setPetDetails] = useState<Pet | null>(null);
  const [ownerDetails, setOwnerDetails] = useState<any>(null);
  const scale = useRef(new Animated.Value(1)).current;
  const { petId } = useLocalSearchParams<{ petId: string }>();
  const [loading, setLoading] = useState(true);
  const [chatId, setChatId] = useState<string>("");
  const { user } = useUser();
  useEffect(() => {
    const fetchPetData = async () => {
      if (petId) {
        try {
          const petRef = doc(db, "petlistings", petId);
          const petSnap = await getDoc(petRef);

          if (petSnap.exists()) {
            const petData = petSnap.data() as Pet;
            setPetDetails(petData);
          }
        } catch (error) {
          console.error("Error fetching pet details:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPetData();
  }, [petId]);

  useEffect(() => {
    const fetchOwnerDetails = async () => {
      if (petDetails?.ownerId) {
        try {
          const ownerRef = doc(db, "users", petDetails.ownerId);
          const ownerSnap = await getDoc(ownerRef);

          if (ownerSnap.exists()) {
            setOwnerDetails(ownerSnap.data());
          }
        } catch (error) {
          console.error("Error fetching owner details:", error);
        }
      }
    };

    fetchOwnerDetails();
  }, [petDetails?.ownerId]);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        if (!user?.id) return;
        const userRef = doc(db, "users", user.id);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const favorites = userSnap.data().favorites || [];
          setLiked(favorites.includes(petId));
        }
      } catch (error) {
        console.error("Error fetching user favorites:", error);
      }
    };

    if (user?.id && petId) {
      fetchFavoriteStatus();
    }
  }, [user?.id, petId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2BBFFF" />
        <Text>Loading your pet...</Text>
      </View>
    );
  }

  const animateHeart = async () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.4,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    const updatedLiked = !liked;
    setLiked(updatedLiked);
    try {
      if (!user?.id) {
        return;
      }
      const userRef = doc(db, "users", user?.id);
      await updateDoc(userRef, {
        favorites: updatedLiked ? arrayUnion(petId) : arrayRemove(petId),
      });

      const updatedDocSnap = await getDoc(userRef);
      if (updatedDocSnap.exists()) {
        const updatedData = updatedDocSnap.data();
      }
    } catch (error) {
      console.error("Failed to update favorites:", error);
      setLiked(!updatedLiked);
    }
  };

  const handleChatNavigation = () => {
    if (!petDetails?.ownerId) return;
    const ids = [user?.id, petDetails.ownerId].sort();
    const newChatId = `${ids[0]}_${ids[1]}`;
    setChatId(newChatId);
    router.push({
      pathname: "/(chat)/[chat]",
      params: { chat: newChatId },
    });
  };

  const infoData = [
    { title: "Gender", value: petDetails?.gender },
    { title: "Age", value: petDetails?.age + " years" },
    { title: "Breed", value: petDetails?.breed.join(", ") },
    { title: "Eye Color", value: petDetails?.eyeColor },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <StatusBar barStyle="dark-content" />

        {/* Back Button (Positioned Below Status Bar) */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.circle, { zIndex: 10 }]}
          >
            <MaterialIcons
              style={{ right: 1 }}
              name="arrow-back-ios-new"
              size={16}
              color="black"
            />
          </TouchableOpacity>

          <Text style={styles.navText}>Pet Details</Text>

          <TouchableWithoutFeedback onPress={animateHeart}>
            <View style={styles.circle}>
              <Animated.View style={{ transform: [{ scale }] }}>
                <Ionicons
                  name={liked ? "heart" : "heart-outline"}
                  size={20}
                  style={{ top: 1 }}
                  color={liked ? "red" : "black"}
                />
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.coverflow}>
          <CoverFlowCarousel images={petDetails?.image || []} />
        </View>

        <View style={styles.infoSection}>
          <View style={styles.innerInfoSection}>
            <Text style={styles.title}>{petDetails?.name} </Text>
            <HugeiconsIcon icon={Share08Icon} size={20} color="black" />
          </View>
          <TouchableOpacity
            onPress={() => {
              const latitude = ownerDetails?.latitude;
              const longitude = ownerDetails?.longitude;

              if (latitude && longitude) {
                const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
                Linking.openURL(url);
              }
            }}
          >
            <Text style={styles.subTitle}>{ownerDetails?.address}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.scrollContainer}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.infoBoxWrapper}
            >
              {infoData.map((item, index) => {
                if (!item.value) return null; // Skip if value is empty or falsy

                return (
                  <View key={index} style={styles.infoBox}>
                    <Text style={styles.infoTitle}>{item.title}</Text>
                    <Text style={styles.infoSubtitle}>{item.value}</Text>
                  </View>
                );
              })}
            </ScrollView>

            <Pressable
              style={styles.ownerBox}
              onPress={() =>
                router.push({
                  pathname: "./ownerDetails",
                  params: { ownerId: petDetails?.ownerId },
                })
              }
            >
              <View>
                <Image
                  source={{ uri: ownerDetails?.profilePicUrl }}
                  style={styles.ownerImage}
                />
              </View>
              <View style={styles.ownerTextWrapper}>
                {ownerDetails && (
                  <Text style={styles.ownerName}>
                    {ownerDetails.organizationName
                      ? ownerDetails.organizationName
                      : `${ownerDetails.firstName} ${ownerDetails.lastName}`}
                  </Text>
                )}
                <Text style={styles.ownerRole}>Pet Owner</Text>
              </View>
              <View style={styles.contactIcons}>
                <TouchableOpacity
                  style={styles.contactIconButton}
                  onPress={handleChatNavigation}
                >
                  <HugeiconsIcon icon={Comment01Icon} size={20} color="black" />
                </TouchableOpacity>
              </View>
            </Pressable>

            <View style={styles.aboutSection}>
              <Text style={styles.aboutTitle}>About</Text>
              <Text style={styles.aboutDescription}>
                {petDetails?.description}
              </Text>
            </View>
          </ScrollView>
        </View>
        <View style={styles.footerBox}>
          <View>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.priceValue}>Rs {petDetails?.price}</Text>
          </View>
          <TouchableOpacity
            style={styles.adoptButton}
            onPress={() =>
              router.push({
                pathname: "/(others)/payment",
                params: {
                  petId,
                  ownerId: petDetails?.ownerId,
                },
              })
            }
          >
            <Text style={styles.adoptText}>Adopt Me</Text>
          </TouchableOpacity>
        </View>
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
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: Platform.OS === "ios" ? 70 : 20,
    marginBottom: 20,
  },
  coverflow: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 35,
    height: 35,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#DCDCDC",
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
    fontWeight: "600",
    color: "#000",
    position: "absolute",
    textAlign: "center",
    left: 0,
    right: 0,
  },
  scrollContainer: {
    width: "100%",
    marginBottom: "155%",
  },
  imageContainer: {
    width: 304,
    height: 300,
    marginBottom: 20,
  },
  infoSection: {
    alignItems: "flex-start",
    width: "95%",
    marginBottom: 20,
  },
  innerInfoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(19) : responsive.fontSize(16),
    fontWeight: "500",
  },
  subTitle: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    color: "#939393",
    fontWeight: "400",
  },
  infoBoxWrapper: {
    width: "100%",
    marginBottom: 20,
  },
  infoBox: {
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#DCDCDC",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 20,
    minWidth: 90,
    marginRight: 12,
  },
  infoTitle: {
    color: "gray",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(9),
    fontWeight: "400",
  },
  infoSubtitle: {
    fontWeight: "500",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    marginTop: 4,
  },
  ownerBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  ownerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  ownerTextWrapper: {
    flex: 1,
    marginLeft: 10,
    gap: 5,
  },
  ownerName: {
    fontWeight: "600",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
  },
  ownerRole: {
    color: "gray",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
  },
  contactIcons: {
    flexDirection: "row",
    gap: 10,
  },
  contactIconButton: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 20,
  },
  aboutSection: {
    marginTop: 5,
    width: "95%",
    alignSelf: "center",
  },
  aboutTitle: {
    fontWeight: "600",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
  },
  aboutDescription: {
    color: "gray",
    marginTop: 4,
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    lineHeight: 20,
  },
  footerBox: {
    width: "100%",
    position: "absolute",
    bottom: 23,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  priceLabel: {
    color: "gray",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(9),
    fontWeight: "300",
    paddingLeft: 25,
  },
  priceValue: {
    color: "white",
    fontWeight: "bold",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    paddingLeft: 25,
  },
  adoptButton: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 50,
  },
  adoptText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "600",
  },
});
