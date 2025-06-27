import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { useAppContext, UserData } from "@/hooks/AppContext";
import responsive from "@/constants/Responsive";
import Toast from "@/components/utils/toast";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Payment() {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const [booking, setBooking] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vet, setVet] = useState<any>(null);
  const starImages = [
    require("../../assets/images/poor.png"),
    require("../../assets/images/better.png"),
    require("../../assets/images/neutral.png"),
    require("../../assets/images/good.png"),
    require("../../assets/images/excited.png"),
  ];
  const filledStarImages = [
    require("../../assets/images/poor_fill.png"),
    require("../../assets/images/better_fill.png"),
    require("../../assets/images/neutral_fill.png"),
    require("../../assets/images/good_fill.png"),
    require("../../assets/images/excited_fill.png"),
  ];
  const [comment, setComment] = useState<string>("");
  const isPayButtonDisabled = rating === 0 || comment.trim() === "";
  const { user } = useUser();
  const toastRef = useRef<any>({});
  const { userData } = useAppContext();
  useEffect(() => {
    if (!bookingId) return;

    (async () => {
      try {
        // fetch the appointment
        const bSnap = await getDoc(doc(db, "appointments", bookingId));
        if (!bSnap.exists()) throw new Error("Booking not found");
        const bData = bSnap.data();
        setBooking(bData);

        // fetch the vet
        const vSnap = await getDoc(doc(db, "users", bData.vetId));
        if (vSnap.exists()) setVet(vSnap.data());
      } catch (err) {
        console.error(err);
      } 
    })();
  }, [bookingId]);

  const submitReview = async () => {
    if (
      isSubmitting ||
      !user?.id ||
      !booking.vetId ||
      rating === 0 ||
      comment.trim() === ""
    ) {
      return;
    }
    setIsSubmitting(true);
    try {
      const ratingsRef = collection(db, "reviews", booking.vetId, "ratings");
      await addDoc(ratingsRef, {
        userId: user.id,
        rating,
        comment: comment.trim(),
        createdAt: serverTimestamp(),
      });

      const apptRef = doc(db, "appointments", bookingId);
    await updateDoc(apptRef, {
      status: "done",           
    });

      const snap = await getDocs(ratingsRef);
      let sum = 0;
      snap.forEach((d) => {
        sum += d.data().rating;
      });
      const count = snap.size;
      const avg = count > 0 ? sum / count : 0;

      const ownerDocRef = doc(db, "reviews", booking.vetId);
      await setDoc(
        ownerDocRef,
        {
          averageRating: avg,
          ratingCount: count,
        },
        { merge: true }
      );

      toastRef.current.show({
        type: "success",
        title: "Thank You",
        description: "Your review has been submitted.",
      });
      
      setRating(0);
      setComment("");
      router.replace("/(tabs)");
    } catch (err) {
      console.error("Error saving review:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        <StatusBar barStyle="dark-content" />

        {/* Back Button (Positioned Below Status Bar) */}
        <View style={styles.headerContainer}>
          <Text style={styles.navText}>Payment</Text>
        </View>
        <View style={styles.scrollContainer}>
           <TouchableWithoutFeedback onPress={dismissKeyboard}>
             <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
        <View style={styles.cardContainer}>
          <View style={styles.cardRow}>
            <Text style={styles.label}>Service</Text>
            <Text style={styles.value}>
            {booking?.service}
            </Text>
          </View>
          <View style={styles.cardRow}>    
            <Text style={[styles.label, { alignSelf: "center" }]}>Doctor</Text>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.value}>
              {vet?.title} {vet?.firstName} {vet?.lastName}
              </Text>
            </View>
          </View>
        </View>
        {booking?.notes?.trim() !== '' && (
        <View style={styles.cardContainer}>
          <View style={styles.cardColumn}>
            <Text style={styles.label}>Notes from Vet: </Text>
            <Text style={styles.value}>
            {booking?.notes}
            </Text>
          </View>
        </View>
        )}
        <View style={styles.ReviewContainer}>
          <Text style={styles.reviewText}>Tell us about your experience?</Text>
          <View style={styles.stars}>
            {starImages.map((_image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setRating(index + 1)}
              >
                <Image
                  source={
                    rating > index ? filledStarImages[index] : starImages[index]
                  }
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
                placeholder="Doctor was professional, caring, & ......"
                style={styles.commentBox}
                placeholderTextColor="#939393"
                autoCapitalize="sentences"
                value={comment}
                onChangeText={setComment}
                multiline={true}
              />
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.cardRow}>
            <Text style={styles.label}>Total amount</Text>
            <Text style={styles.value}>PKR {booking?.fees}</Text>
          </View>
          <View style={styles.cardRow}>
            <View style={styles.paymentCard}>
              <Image
                source={require("../../assets/images/Apple Pay.png")}
                style={styles.paymentIcon}
              />
            </View>
            <Text style={styles.paymentCardText}>Apple Pay</Text>
            <TouchableOpacity style={styles.changeButton}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
        </TouchableWithoutFeedback>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={submitReview} style={[styles.payButton, isPayButtonDisabled && styles.disabledButton]} disabled={isPayButtonDisabled}>
            <Text style={styles.payText}>Pay</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Toast ref={toastRef} />
    </KeyboardAvoidingView>
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
    marginTop: Platform.OS === "ios" ? 20 : 20,
    marginBottom: 40,
  },
  navText: {
    fontSize: Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
    fontWeight: "500",
    color: "#000",
    position: "absolute",
    textAlign: "center",
    left: 0,
    right: 0,
  },
  scrollContainer: {
    width: "100%",
    marginBottom: "50%",
  },
  cardContainer: {
    width: "100%",
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    marginBottom: 28,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 16,
  },
  cardColumn: {
    marginTop: 20,
    marginBottom: 16,
  },
  label: {
   fontSize: Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    fontWeight: 600,
    color: "#939393",
  },
  value: {
   fontSize: Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    fontWeight: 500,
    color: "#ACACAC",
  },
  ReviewContainer: {
    width: "100%",
    paddingHorizontal: 28,
    paddingVertical: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    marginBottom: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  reviewText: {
    fontSize: Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    fontWeight: 500,
    color: "#5B555C",
  },
  stars: {
    flexDirection: "row",
    marginBottom: 24,
    marginTop: 6,
  },
  starIcon: {
    width: 44,
    height: 44,
    marginHorizontal: 4,
  },
  commentBox: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 12,
    fontSize: Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: 400,
  },
  paymentCard: {
    width: 43,
    height: 30,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  paymentIcon: {
    width: 30,
    height: 12,
  },
  paymentCardText: {
    fontSize: Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: 600,
    flex: 1,
    alignSelf: "center",
    color: "#939393",
  },
  changeButton: {
    backgroundColor: "#C9EFFF",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  changeText: {
    fontSize: Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    color: "#2bbfff",
    fontWeight: 700,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 40, 
    width: "100%",
  },
  payButton: {
    backgroundColor: "#2BBFFF",
    width: "100%",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  payText: {
    color: "#fff",
    fontSize: Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#E3E5E5",
  },
});