import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator, RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HugeiconsIcon } from '@hugeicons/react-native';
import { StarHalfIcon, StarIcon } from '@hugeicons/core-free-icons';
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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


const LottieLoader = () => {
  return (
    <LottieView
      source={require('../../components/utils/animation/reviews_refresh.json')} // Replace with your Lottie animation file path
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
            color = "#2BBFFF"
            fill={fill}
          />
        );
      })}
    </View>
  );
};

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <Image source={{ uri: review.avatar }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{review.name}</Text>
        <StarRating rating={review.rating} />
      </View>
      <Text style={styles.date}>{review.date}</Text>
    </View>
    <Text style={styles.comment}>{review.comment}</Text>
  </View>
);

export default function VetReviewsScreen() {
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>User Reviews</Text>
      <View style={styles.statsRow}>
        <Text style={styles.avgRating}>{averageRating}</Text>
        <StarRating rating={Math.round(Number(averageRating))} />
        <Text style={styles.totalReviews}>({reviews.length} reviews)</Text>
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
        
        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={onRefresh}
        //     colors={["#2BBFFF"]}
        //     progressBackgroundColor="#FAFAFA"
        //     tintColor="#2BBFFF"
        //   />
        // }

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 8,
    color: "#222",
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
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 12,
  },
  avatar: {
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
    marginBottom: 40,
  },
});