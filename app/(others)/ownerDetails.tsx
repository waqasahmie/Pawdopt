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

const reviews = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/100?img=1",
    rating: 5,
    comment: "Dr. Sarah was amazing and very helpful!",
    date: "Apr 14, 2025",
  },
  {
    id: "2",
    name: "Ayesha Ali",
    avatar: "https://i.pravatar.cc/100?img=2",
    rating: 4,
    comment: "Good service. My cat is healthy again!",
    date: "Apr 12, 2025",
  },
  {
    id: "3",
    name: "Ali Raza",
    avatar: "https://i.pravatar.cc/100?img=3",
    rating: 3,
    comment: "Waiting time was a bit too long, but staff was courteous.",
    date: "Apr 11, 2025",
  },
  {
    id: "4",
    name: "Mehwish Tariq",
    avatar: "https://i.pravatar.cc/100?img=4",
    rating: 5,
    comment: "Very professional and caring. Highly recommended!",
    date: "Apr 10, 2025",
  },
  {
    id: "5",
    name: "Hamza Sheikh",
    avatar: "https://i.pravatar.cc/100?img=5",
    rating: 4,
    comment: "Nice experience, the vet was very friendly.",
    date: "Apr 09, 2025",
  },
  {
    id: "6",
    name: "Nida Akram",
    avatar: "https://i.pravatar.cc/100?img=6",
    rating: 2,
    comment: "Clinic was overcrowded and noisy.",
    date: "Apr 08, 2025",
  },
  {
    id: "7",
    name: "Zain Khan",
    avatar: "https://i.pravatar.cc/100?img=7",
    rating: 3,
    comment: "It was okay, could be more organized.",
    date: "Apr 07, 2025",
  },
  {
    id: "8",
    name: "Fatima Noor",
    avatar: "https://i.pravatar.cc/100?img=8",
    rating: 5,
    comment: "My dog loves coming here!",
    date: "Apr 06, 2025",
  },
  {
    id: "9",
    name: "Kashif Ahmed",
    avatar: "https://i.pravatar.cc/100?img=9",
    rating: 4,
    comment: "Clean environment and friendly team.",
    date: "Apr 05, 2025",
  },
  {
    id: "10",
    name: "Sana Javed",
    avatar: "https://i.pravatar.cc/100?img=10",
    rating: 3,
    comment: "Average service, nothing exceptional.",
    date: "Apr 04, 2025",
  },
  {
    id: "11",
    name: "Imran Butt",
    avatar: "https://i.pravatar.cc/100?img=11",
    rating: 1,
    comment: "Extremely dissatisfied. Will not come back.",
    date: "Apr 03, 2025",
  },
  {
    id: "12",
    name: "Rabia Hussain",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 4,
    comment: "Very cooperative staff and timely care.",
    date: "Apr 02, 2025",
  },
  {
    id: "13",
    name: "Ahmed Tariq",
    avatar: "https://i.pravatar.cc/100?img=13",
    rating: 5,
    comment: "Outstanding experience. Loved the professionalism!",
    date: "Apr 01, 2025",
  },
  {
    id: "14",
    name: "Zoya Malik",
    avatar: "https://i.pravatar.cc/100?img=14",
    rating: 4,
    comment: "Easy to get appointments. Friendly environment.",
    date: "Mar 31, 2025",
  },
  {
    id: "15",
    name: "Taha Siddiqui",
    avatar: "https://i.pravatar.cc/100?img=15",
    rating: 2,
    comment: "The staff wasn't very attentive.",
    date: "Mar 30, 2025",
  },
  {
    id: "16",
    name: "Hira Naveed",
    avatar: "https://i.pravatar.cc/100?img=16",
    rating: 3,
    comment: "Good but I expected better follow-up.",
    date: "Mar 29, 2025",
  },
  {
    id: "17",
    name: "Rameez Raja",
    avatar: "https://i.pravatar.cc/100?img=17",
    rating: 5,
    comment: "The best clinic for pets. They truly care!",
    date: "Mar 28, 2025",
  },
  {
    id: "18",
    name: "Mariam Shah",
    avatar: "https://i.pravatar.cc/100?img=18",
    rating: 3,
    comment: "I had to wait a lot despite having an appointment.",
    date: "Mar 27, 2025",
  },
  {
    id: "19",
    name: "Omar Zubair",
    avatar: "https://i.pravatar.cc/100?img=19",
    rating: 4,
    comment: "Helpful doctor, but the clinic was a bit hard to find.",
    date: "Mar 26, 2025",
  },
  {
    id: "20",
    name: "Sadia Qureshi",
    avatar: "https://i.pravatar.cc/100?img=20",
    rating: 2,
    comment: "Wasn't satisfied with the treatment approach.",
    date: "Mar 25, 2025",
  },
  {
    id: "21",
    name: "Hassan Mir",
    avatar: "https://i.pravatar.cc/100?img=21",
    rating: 5,
    comment: "Awesome experience. Will come back for sure!",
    date: "Mar 24, 2025",
  },
  {
    id: "22",
    name: "Laiba Rafiq",
    avatar: "https://i.pravatar.cc/100?img=22",
    rating: 4,
    comment: "They treated my rabbit with great care. Thanks!",
    date: "Mar 23, 2025",
  },
];

const contactDetails = [
  {
    id: 1,
    icon: require("../../assets/images/Black-Location.png"),
    text: "74/6 Wellington St, East Melbourne",
    iconStyle: { width: 13, height: 15, marginTop: ms(12) },
  },
  {
    id: 2,
    icon: require("../../assets/images/phone.png"),
    text: "+92 314 7544535",
    iconStyle: { width: 13, height: 13, marginTop: ms(12) },
  },
  {
    id: 3,
    icon: require("../../assets/images/Mail.png"),
    text: "waqasahmie@gmail.com",
    iconStyle: { width: 14, height: 10, marginTop: ms(12) },
  },
];

const pets = [
  {
    id: 1,
    breed: "Maine Coon",
    name: "Smokey",
    gender: require("../../assets/images/male.png"),
    size: { width: 16, height: 16 },
    distance: "1.7km Away",
    image: require("../../assets/images/mainecoon.jpg"),
  },
  {
    id: 2,
    breed: "Golden Ret.",
    name: "Lucy",
    gender: require("../../assets/images/female.png"),
    size: { width: 14, height: 16 },
    distance: "1.3km Away",
    image: require("../../assets/images/goldenretriever.jpg"),
  },
  {
    id: 3,
    breed: "Cockatoo",
    name: "Smiley",
    gender: require("../../assets/images/male.png"),
    size: { width: 16, height: 16 },
    distance: "3.0km Away",
    image: require("../../assets/images/cockatoo.jpg"),
  },
];

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
      source={require("../../components/utils/animation/reviews_refresh.json")} // Replace with your Lottie animation file path
      autoPlay
      loop
      style={styles.lottieLoader}
    />
  );
};

const averageRating = (
  reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
).toFixed(1);

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

const ReviewCard = ({ review }: { review: (typeof reviews)[0] }) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <Image source={{ uri: review.avatar }} style={styles.avatarreview} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{review.name}</Text>
        <StarRating rating={review.rating} />
      </View>
      <Text style={styles.date}>{review.date}</Text>
    </View>
    <Text style={styles.comment}>{review.comment}</Text>
  </View>
);

export default function Owner_Organization() {
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

  const [currentReviews, setCurrentReviews] = useState(reviews.slice(0, 6)); // Load first 3 reviews
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const loadMoreReviews = () => {
    if (loading || currentReviews.length === reviews.length) return; // Prevent loading if all reviews are loaded

    setLoading(true);
    setTimeout(() => {
      const newReviews = reviews.slice(page * 6, (page + 1) * 6);
      setCurrentReviews((prevReviews) => [...prevReviews, ...newReviews]);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    }, 900); // Simulate network delay
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      // Add the newest reviews to the top of the list
      const newReviews = reviews.slice(0, 6);
      setCurrentReviews(newReviews);
      setPage(1);
      setRefreshing(false);
    }, 1500); // Simulate refresh delay
  }, []);

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator size="small" color="#2BBFFF" />;
    } else if (currentReviews.length === reviews.length) {
      return <Text style={styles.noMoreReviews}>No More Reviews</Text>;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ zIndex: 10 }}
          >
            <MaterialIcons
              name="arrow-back-ios-new"
              size={ms(15)}
              color="black"
            />
          </TouchableOpacity>
          <Text style={styles.navText}>Owner/Organization</Text>
        </View>

        <View style={styles.profileCard}>
          <Image
            source={require("../../assets/images/avatar.png")}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.profileTitle}>The Crazy Pets</Text>
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
            size={ms(19)}
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
              // nestedScrollEnabled={true}
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
          <View style={styles.scrollContainer}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              <View>
                {pets.map((pet) => (
                  <View key={pet.id} style={styles.petCard}>
                    <Image source={pet.image} style={styles.petImage} />
                    <View style={styles.petInfo}>
                      <Text style={styles.breedText}>{pet.breed}</Text>
                      <View style={styles.nameInfo}>
                        <Text style={styles.nameText}>{pet.name}</Text>
                        <Image
                          source={pet.gender}
                          style={[styles.genderImage, pet.size]}
                        />
                      </View>
                      <Text style={styles.distanceText}>{pet.distance}</Text>
                    </View>
                  </View>
                ))}
              </View>
              <Text style={styles.note}> Looks like you reached the end!</Text>
            </ScrollView>
          </View>
        )}

        {activeTab === "Reviews" && (
          <View style={styles.reviewContainer}>
            <View style={styles.statsRow}>
              <Text style={styles.avgRating}>{averageRating}</Text>
              <StarRating rating={Math.round(Number(averageRating))} />
              <Text style={styles.totalReviews}>
                ({reviews.length} reviews)
              </Text>
            </View>

            <FlatList
              data={currentReviews}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <ReviewCard review={item} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 24 }}
              onEndReached={loadMoreReviews} // Trigger loadMoreReviews when scrolled to the bottom
              onEndReachedThreshold={0.5} // 50% of the list before it triggers the function
              // refreshing={refreshing}
              // onRefresh={onRefresh}
              ListHeaderComponent={refreshing ? <LottieLoader /> : null}
              ListFooterComponent={renderFooter} // Custom footer to show "No More Reviews"
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor="transparent" // hides native spinner (iOS)
                  colors={["transparent"]} // hides native spinner (Android)
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
    paddingHorizontal: s(20),
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: ms(20),
    marginBottom: ms(40),
  },
  navText: {
    fontSize: Platform.OS === "ios" ? ms(23) : ms(20),
    fontWeight: "500",
    color: "#000",
    position: "absolute",
    textAlign: "center",
    left: 0,
    right: 0,
  },
  scrollContainer: {
    width: "100%",
    marginBottom: Platform.OS === "ios" ? "110%" : "120%",
  },
  profileCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: vs(15),
    paddingHorizontal: s(8),
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#f0f0f0",
    marginBottom: ms(30),
  },
  avatar: {
    width: ms(75),
    height: ms(75),
    borderRadius: 50,
    marginRight: ms(15),
  },
  profileTitle: {
    fontSize: Platform.OS === "ios" ? ms(21) : ms(18),
    fontWeight: "500",
    marginTop: ms(5),
  },
  profileSubtitle: {
    width: "80%",
    marginTop: ms(10),
    fontSize: Platform.OS === "ios" ? ms(11) : ms(8),
    fontWeight: "400",
    color: "#939393",
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ms(16),
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  dropdownText: {
    fontSize: Platform.OS === "ios" ? ms(15) : ms(12),
  },
  policyScroll: {
    maxHeight: vs(250),
  },
  policyContainerOpen: {
    marginTop: ms(5),
    paddingHorizontal: s(16),
    paddingVertical: vs(5),
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  policyContainerClosed: {
    display: "none",
  },
  policyHeader: {
    fontSize: Platform.OS === "ios" ? ms(17) : ms(14),
    fontWeight: "500",
    marginTop: ms(15),
    marginBottom: ms(5),
  },
  policyText: {
    fontSize: Platform.OS === "ios" ? ms(15) : ms(12),
    fontWeight: "300",
    marginBottom: ms(15),
  },
  tabsWrapper: {
    marginVertical: vs(24),
    marginHorizontal: s(8),
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: ms(10),
  },
  tabBarBackground: {
    position: "relative",
    height: vs(4),
    backgroundColor: "#dcdcdc",
    borderRadius: 5,
    marginTop: ms(8),
    overflow: "hidden",
  },
  tabBar: {
    height: vs(4),
    width: "50%",
    borderRadius: 5,
    backgroundColor: "#2bbfff",
  },
  activeTab: {
    fontSize: Platform.OS === "ios" ? ms(17) : ms(14),
    color: "#2bbfff",
    marginRight: ms(20),
  },
  inactiveTab: {
    fontSize: Platform.OS === "ios" ? ms(17) : ms(14),
    color: "#dcdcdc",
    marginRight: ms(20),
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
    // width: 150,
    // height: 170,
    borderRadius: 14,
  },
  petInfo: {
    paddingHorizontal: s(15),
    paddingVertical: vs(10),
    flex: 1,
  },
  breedText: {
    fontSize: Platform.OS === "ios" ? ms(21) : ms(18),
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
  genderImage: {
    marginTop: ms(8),
    marginLeft: ms(10),
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
  reviewContainer: {
   // marginHorizontal: s(20),
    marginBottom: ms(470),
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 20,
  },
  avgRating: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2BBFFF",
  },
  totalReviews: {
    fontSize: 14,
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
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
  comment: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
    marginTop: 4,
  },
  noMoreReviews: {
    fontSize: 16,
    fontWeight: "500",
    color: "#999",
    textAlign: "center",
    paddingVertical: 16,
    //marginBottom: 40,
  },
});
