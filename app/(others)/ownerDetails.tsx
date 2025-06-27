import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import { s, vs, ms } from "react-native-size-matters";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { StarIcon } from "@hugeicons/core-free-icons";
import LottieView from "lottie-react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import dayjs from "dayjs";
import responsive from "@/constants/Responsive";

interface Pet {
  id: string;
  name: string;
  age: string;
  breed: string[];
  category: string;
  createdAt: string;
  description: string;
  eyeColor: string;
  size: { width: 16; height: 16 };
  gender: string;
  image: string[];
  ownerId: string;
  price: number;
  weight: string;
}

interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  user?: { firstName: string; lastName: string; profilePicUrl: string };
}
interface DisplayReview {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

const policies = [
  {
    title: "Adoption Requirements",
    description:
      "Adopters must meet age, identification, and housing criteria to ensure a stable environment for the pet.",
  },
  {
    title: "Pet Selection Process",
    description:
      "Potential adopters must choose a pet that matches their lifestyle, living situation, and experience.",
  },
  {
    title: "Adoption Fees (if any)",
    description:
      "All adoption fees are non-refundable and cover the medical care and upkeep of the pet before adoption.",
  },
  {
    title: "Health and Vaccinations",
    description:
      "Every pet is spayed/neutered (if their owner wants to) and vaccinated before going to their new home.",
  },
  {
    title: "Return Policy",
    description:
      "Pets can be returned if unforeseen circumstances arise, and we’ll help rehome them responsibly.",
  },
  {
    title: "Adopter Responsibilities",
    description:
      "Adopters are expected to provide a loving, safe, and permanent home with adequate care and veterinary support.",
  },
  {
    title: "Rehoming",
    description:
      "If at any point the adopter cannot keep the pet, they are required to return the pet to our organization.",
  },
];

const LottieLoader = () => {
  return (
    <LottieView
      source={require("../../components/utils/animation/reviews_refresh.json")}
      autoPlay
      loop
      style={styles.lottieLoader}
    />
  );
};

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);

  return (
    <View style={{ flexDirection: "row" }}>
      {[...Array(5)].map((_, i) => {
        let fill = "none";

        if (i < fullStars) {
          fill = "#2BBFFF";
        }

        return (
          <HugeiconsIcon
            key={i}
            icon={StarIcon}
            width={16}
            height={16}
            style={{ marginRight: 2 }}
            color="#2BBFFF"
            fill={fill}
          />
        );
      })}
    </View>
  );
};
const ReviewCard = ({ review }: { review: DisplayReview }) => {

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          source={
            review.avatar && review.avatar.trim() !== ""
              ? { uri: review.avatar }
              : require("../../assets/images/avatar.png")
          }
          style={styles.avatarreview}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{review.name}</Text>
          <StarRating rating={review.rating} />
        </View>
        <Text style={styles.date}>{review.date}</Text>
      </View>
      <Text style={styles.comment}>{review.comment}</Text>
    </View>
  );
};

export default function Owner_Organization() {
  const { ownerId } = useLocalSearchParams<{ ownerId: string }>();
  const [pets, setPets] = useState<Pet[]>([]);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [liveReviews, setLiveReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const totalReviews = liveReviews.length;
  const averageRating =
    totalReviews > 0
      ? (
          liveReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        ).toFixed(1)
      : "0.0";
  useEffect(() => {
    const fetchPetsByOwner = async () => {
      if (!ownerId) return;

      try {
        const q = query(
          collection(db, "petlistings"),
          where("ownerId", "==", ownerId)
        );
        const querySnapshot = await getDocs(q);
        const petsData: Pet[] = [];

        querySnapshot.forEach((doc) => {
          petsData.push({ id: doc.id, ...doc.data() } as Pet);
        });

        setPets(petsData);

        const userDocRef = doc(db, "users", ownerId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserDetails(userDoc.data());
        } 
      } catch (error) {
        console.error("Error fetching owner's pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPetsByOwner();
  }, [ownerId]);

  useEffect(() => {
    const fetchReviewsWithUser = async () => {
      if (!ownerId) return;
      setLoadingReviews(true);

      const ratingsRef = collection(db, "reviews", ownerId, "ratings");
      const q = query(ratingsRef, orderBy("createdAt", "desc"));
      const snap = await getDocs(q);

      const raw: Review[] = snap.docs.map((d) => ({
        id: d.id,
        userId: d.data().userId,
        rating: d.data().rating,
        comment: d.data().comment,
        createdAt: d.data().createdAt.toDate(),
      }));

      const uniqueUserIds = Array.from(new Set(raw.map((r) => r.userId)));
      const userFetches = uniqueUserIds.map((uid) =>
        getDoc(doc(db, "users", uid))
      );
      const userSnaps = await Promise.all(userFetches);

      const userMap: Record<
        string,
        { firstName: string; lastName: string; profilePicUrl: string }
      > = {};
      userSnaps.forEach((usnap) => {
        if (usnap.exists()) {
          const data = usnap.data();
          userMap[usnap.id] = {
            firstName: data.firstName,
            lastName: data.lastName,
            profilePicUrl: data.profilePicUrl,
          };
        }
      });

      const enriched = raw.map((r) => ({
        ...r,
        user: userMap[r.userId],
      }));

      setLiveReviews(enriched);
      setLoadingReviews(false);
    };

    fetchReviewsWithUser();
  }, [ownerId]);

  const contactDetails = [
    {
      id: 1,
      icon: require("../../assets/images/Black-Location.png"),
      text: userDetails?.address || "no phone available",
      iconStyle: { width: 13, height: 15, marginTop: 12 },
    },
    {
      id: 2,
      icon: require("../../assets/images/phone.png"),
      text: userDetails?.phone || "no phone available",
      iconStyle: { width: 13, height: 13, marginTop: ms(12) },
    },
    {
      id: 3,
      icon: require("../../assets/images/Mail.png"),
      text: userDetails?.email || "No email available",
      iconStyle: { width: 14, height: 10, marginTop: ms(12) },
    },
  ];

  const navigation = useNavigation();
  const [showPolicy, setShowPolicy] = useState(false);
  const [activeTab, setActiveTab] = useState("Listings");
  const tabBarPosition = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(tabBarPosition, {
      toValue: activeTab === "Listings" ? 0 : 1,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [activeTab]);

  useEffect(() => {
    setCurrentReviews(liveReviews.slice(0, 6));
    setPage(1);
  }, [liveReviews]);

  const [currentReviews, setCurrentReviews] = useState<Review[]>([]);

  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const loadMoreReviews = () => {
    if (loading || currentReviews.length >= liveReviews.length) return;

    setLoading(true);
    setTimeout(() => {
      const newSlice = liveReviews.slice(page * 6, (page + 1) * 6);
      setCurrentReviews((prev) => [...prev, ...newSlice]);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    }, 900);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setCurrentReviews(liveReviews.slice(0, 6));
      setPage(1);
      setRefreshing(false);
    }, 1500);
  }, [liveReviews]);

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator size="small" color="#2BBFFF" />;
    } else if (currentReviews.length === liveReviews.length) {
      return <Text style={styles.noMoreReviews}>No More Reviews</Text>;
    }
    return null;
  };

  const renderPetItem = ({ item }:{item:any}) => (
    <TouchableOpacity onPress={() => router.push(`/petDetail?petId=${item.id}`)}>
      <View style={styles.petCard}>
        <Image source={{ uri: item.image[0] }} style={styles.petImage} />
        <View style={styles.petInfo}>
          <Text style={styles.breedText}>{item.breed}</Text>
          <View style={styles.nameInfo}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Image
              source={
                item.gender.toLowerCase() === 'male'
                  ? require('../../assets/images/male.png')
                  : require('../../assets/images/female.png')
              }
              style={[
                styles.genderImage,
                item.gender.toLowerCase() === 'male'
                  ? { width: 16, height: 16 }
                  : { width: 14, height: 16 },
              ]}
            />
          </View>
          <Text style={styles.distanceText}>1.5 km away</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ zIndex: 10 }}
          >
            <MaterialIcons name="arrow-back-ios-new" size={15} color="black" />
          </TouchableOpacity>
          <Text style={styles.navText}>
            {userDetails
              ? userDetails.organizationName
                ? "Organization"
                : "Owner"
              : ""}
          </Text>
        </View>

        <View style={styles.profileCard}>
          <Image
            source={
              userDetails?.profilePicUrl
                ? { uri: userDetails.profilePicUrl }
                : require("../../assets/images/avatar.png")
            }
            style={styles.avatar}
          />
          <View>
            {userDetails && (
              <Text style={styles.profileTitle}>
                {userDetails.organizationName
                  ? userDetails.organizationName
                  : `${userDetails.firstName} ${userDetails.lastName}`}
              </Text>
            )}
            {contactDetails.map((item) => (
              <View
                key={item.id}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <View style={{ width: 20 }}>
                  <Image source={item.icon} style={item.iconStyle} />
                </View>
                <Text style={styles.profileSubtitle}>{item.text}</Text>
              </View>
            ))}
          </View>
        </View>

        <Pressable
          style={styles.dropdown}
          onPress={() => setShowPolicy(!showPolicy)}
        >
          <Text style={styles.dropdownText}>Adoption Policy</Text>
          <Ionicons
            name={showPolicy ? "chevron-up" : "chevron-down"}
            size={19}
            color="black"
          />
        </Pressable>
        <View
          style={
            showPolicy
              ? styles.policyContainerOpen
              : styles.policyContainerClosed
          }
        >
          <View>
            <ScrollView
              style={styles.policyScroll}
              showsVerticalScrollIndicator={false}
            >
              {policies.map((policy, index) => (
                <View key={index}>
                  <Text style={styles.policyHeader}>{policy.title}</Text>
                  <Text style={styles.policyText}>{policy.description}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.tabsWrapper}>
          <View style={styles.tabsContainer}>
            <TouchableOpacity onPress={() => setActiveTab("Listings")}>
              <Text
                style={
                  activeTab === "Listings"
                    ? styles.activeTab
                    : styles.inactiveTab
                }
              >
                Listings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab("Reviews")}>
              <Text
                style={
                  activeTab === "Reviews"
                    ? styles.activeTab
                    : styles.inactiveTab
                }
              >
                Reviews
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tabBarBackground}>
            <Animated.View
              style={[
                styles.tabBar,
                {
                  left: tabBarPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "50%"],
                  }),
                },
              ]}
            />
          </View>
        </View>

        {activeTab === "Listings" && (
          <FlatList
          data={pets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPetItem}
         
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={
            pets.length > 0 ? (
              <Text style={styles.note}>Looks like you reached the end!</Text>
            ) : null
          }
        />
        )}

        {activeTab === "Reviews" && (
          <View style={styles.reviewContainer}>
            <View style={styles.statsRow}>
              <Text style={styles.avgRating}>{averageRating}</Text>
              <StarRating rating={Math.round(Number(averageRating))} />
              <Text style={styles.totalReviews}>({totalReviews} reviews)</Text>
            </View>

            <FlatList
              data={liveReviews}
              keyExtractor={(r) => r.id}
              renderItem={({ item }) => {
                return (
                  <ReviewCard
                    review={{
                      id: item.id,
                      name: `${item.user?.firstName} ${item.user?.lastName}`,
                      avatar: item.user?.profilePicUrl ?? "",
                      rating: item.rating,
                      comment: item.comment,
                      date: dayjs(item.createdAt).format("MMM D, YYYY"),
                    }}
                  />
                );
              }}
             
              showsVerticalScrollIndicator={false}
              onEndReached={loadMoreReviews}
              onEndReachedThreshold={0.5}
              ListHeaderComponent={refreshing ? <LottieLoader /> : null}
              ListFooterComponent={renderFooter}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor="transparent"
                  colors={["transparent"]}
                  progressBackgroundColor="transparent"
                />
              }
            />
          </View>
        )}
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
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: Platform.OS === "ios" ? 70 : 20,
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
  profileCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#f0f0f0",
    marginBottom: 30,
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 50,
    marginRight: 15,
  },
  profileTitle: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
    fontWeight: "500",
    marginTop: 5,
  },
  profileSubtitle: {
    width: "80%",
    marginTop: 10,
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(8),
    fontWeight: "400",
    color: "#939393",
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  dropdownText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(12),
  },
  policyScroll: {
    maxHeight: 250,
  },
  policyContainerOpen: {
    marginTop: 5,
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  policyContainerClosed: {
    display: "none",
  },
  policyHeader: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    fontWeight: "500",
    marginTop: 15,
    marginBottom: 5,
  },
  policyText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(12),
    fontWeight: "300",
    marginBottom: 5,
  },
  tabsWrapper: {
    marginVertical: 24,
    marginHorizontal: 8,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  tabBarBackground: {
    position: "relative",
    height: 4,
    backgroundColor: "#dcdcdc",
    borderRadius: 5,
    marginTop: 8,
    overflow: "hidden",
  },
  tabBar: {
    height: 4,
    width: "50%",
    borderRadius: 5,
    backgroundColor: "#2bbfff",
  },
  activeTab: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    color: "#2bbfff",
    marginRight: 20,
  },
  inactiveTab: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    color: "#dcdcdc",
    marginRight: 20,
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
  genderImage: {
    marginTop: 8,
    marginLeft: 10,
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
  reviewContainer: {
    marginBottom: 470,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 20,
  },
  avgRating: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(19) : responsive.fontSize(16),
    fontWeight: "600",
    color: "#2BBFFF",
  },
  totalReviews: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    color: "#666",
  },
  lottieLoader: {
    width: 25,
    height: 25,
    alignSelf: "center",
    marginBottom: 30,
    marginTop: -50,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 12,
  },
  avatarreview: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 8,
  },
  name: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "600",
    color: "#333",
  },
  date: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(9),
    color: "#999",
  },
  comment: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    color: "#444",
    lineHeight: 20,
    marginTop: 4,
  },
  noMoreReviews: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "500",
    color: "#999",
    textAlign: "center",
    paddingTop: 16,
    paddingBottom: 30,
  },
});
