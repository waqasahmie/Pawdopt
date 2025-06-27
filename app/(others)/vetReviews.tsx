import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  RefreshControl,
  Platform,
  TouchableOpacity,
} from "react-native";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { StarHalfIcon, StarIcon } from "@hugeicons/core-free-icons";
import LottieView from "lottie-react-native";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import dayjs from "dayjs";
import responsive from "@/constants/Responsive";
import { useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

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

const ReviewCard = ({ review }: { review: DisplayReview }) => (
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
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [liveReviews, setLiveReviews] = useState<Review[]>([]);
  const [currentReviews, setCurrentReviews] = useState(reviews.slice(0, 6));
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const totalReviews = liveReviews.length;
  const averageRating =
    totalReviews > 0
      ? (
          liveReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        ).toFixed(1)
      : "0.0";
  useEffect(() => {
    const fetchReviewsWithUser = async () => {
      if (!id) return;
      setLoading(true);

      const ratingsRef = collection(db, "reviews", id, "ratings");
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
      setLoading(false);
    };

    fetchReviewsWithUser();
  }, [id]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      const newReviews = reviews.slice(0, 6);
      setCurrentReviews(newReviews);
      setPage(1);
      setRefreshing(false);
    }, 1500);
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
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ zIndex: 10 }}
        >
          <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>User Reviews</Text>
      </View>
      <View style={styles.statsRow}>
        <Text style={styles.avgRating}>{averageRating}</Text>
        <StarRating rating={Math.round(Number(averageRating))} />
        <Text style={styles.totalReviews}>({totalReviews} reviews)</Text>
      </View>

      <FlatList
        data={liveReviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
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
        )}
        contentContainerStyle={{ paddingBottom: 90 }}
        showsVerticalScrollIndicator={false}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    marginTop: Platform.OS === "ios" ? 70 : 20,
  },
  title: {
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
    fontWeight: "500",
    position: "absolute",
    textAlign: "center",
    width: "100%",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 20,
    marginTop: 20,
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
    paddingVertical: 12,
  },
});
