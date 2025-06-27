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
  ActivityIndicator,
} from "react-native";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { supabase } from "@/config/supabase";
import Toast from "@/components/utils/toast";
import { useAppContext, UserData } from "@/hooks/AppContext";
import responsive from "@/constants/Responsive";

export default function Payment() {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { petId, ownerId } = useLocalSearchParams<{
    petId: string;
    ownerId: string;
  }>();

  const toastRef = useRef<any>({});
  

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
  const isPayButtonDisabled =
    rating === 0 || comment.trim() === "" || isSubmitting;
  const { user } = useUser();
  const { userData } = useAppContext();
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const sendAdoptionNotifications = async ({
    adopterId,
    adopterName,
    petName,
    ownerId,
  }: {
    adopterId: string;
    adopterName: string;
    petName: string;
    ownerId: string;
  }) => {
    try {
      const ownerUserRef = doc(db, "users", ownerId);
      const ownerSnap = await getDoc(ownerUserRef);
      if (ownerSnap.exists()) {
        const { expoPushToken ,loggedIn} = ownerSnap.data();
        const title = "Your pet has been adopted!";
        const description = `${adopterName} just adopted ${petName}. Thank you!`;
  
        if (expoPushToken && loggedIn) {
          await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Accept-Encoding": "gzip, deflate",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: expoPushToken,
              sound: "default",
              title,
              body: description,
              data: { petId },
            }),
          });
        }
  
        const ownerNotifRef = collection(db, "users", ownerId, "notifications");
        await addDoc(ownerNotifRef, {
          title,
          description,
          timestamp: serverTimestamp(),
          read: false,
          petId:"",
        });
      }
  
      const adopterUserRef = doc(db, "users", adopterId);
      const adopterSnap = await getDoc(adopterUserRef);
      if (adopterSnap.exists()) {
        const { expoPushToken } = adopterSnap.data();
        const title = "Adoption successful!";
        const description = `You've successfully adopted ${petName}. Welcome to your new journey together!`;
  
        if (expoPushToken) {
          await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Accept-Encoding": "gzip, deflate",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: expoPushToken,
              sound: "default",
              title,
              body: description,
              data: { petId },
            }),
          });
        }
  
        const adopterNotifRef = collection(db, "users", adopterId, "notifications");
        await addDoc(adopterNotifRef, {
          title,
          description,
          timestamp: serverTimestamp(),
          read: false,
          petId:"",
        });
      }
    } catch (err) {
      console.error("Error sending adoption notifications:", err);
    }
  };
  const submitReview = async () => {
    if (
      isSubmitting ||
      !user?.id ||
      !ownerId ||
      !petId ||
      rating === 0 ||
      comment.trim() === ""
    ) {
      return;
    }
    setIsSubmitting(true);
    try {
      const ratingsRef = collection(db, "reviews", ownerId, "ratings");
      await addDoc(ratingsRef, {
        userId: user.id,
        rating,
        comment: comment.trim(),
        createdAt: serverTimestamp(),
      });

      const snap = await getDocs(ratingsRef);
      let sum = 0;
      snap.forEach((d) => {
        sum += d.data().rating;
      });
      const count = snap.size;
      const avg = count > 0 ? sum / count : 0;

      const ownerDocRef = doc(db, "reviews", ownerId);
      await setDoc(
        ownerDocRef,
        {
          averageRating: avg,
          ratingCount: count,
        },
        { merge: true }
      );
      const petDocRef = doc(db, "petlistings", petId);
      const petSnap = await getDoc(petDocRef);

      if (!petSnap.exists()) {
        throw new Error(`Pet with id ${petId} not found in Firestore.`);
      }

      const petData = petSnap.data();
      const images: string[] = Array.isArray(petData.image)
        ? petData.image
        : [];

      if (images.length > 0) {
        const imagePaths = images
          .map((url) => {
            try {
              const u = new URL(url);
              const segments = u.pathname.split(
                "/storage/v1/object/public/user-documents/"
              );
              return segments[1] || null;
            } catch {
              console.warn(`Skipping invalid URL: ${url}`);
              return null;
            }
          })
          .filter((p): p is string => Boolean(p));

        if (imagePaths.length) {
          const { error } = await supabase.storage
            .from("user-documents")
            .remove(imagePaths);

        }
      }

      await deleteDoc(petDocRef);
      

      await sendAdoptionNotifications({
        adopterId: user.id,
        adopterName: userData?.firstName ?? "Anonymous",
        petName: petData.name,
        ownerId,
      });
      toastRef.current.show({
        type: "success",
        title: "Payment Successful",
        description: "Thank you for your payment!",
      });
      setRating(0);
      setComment("");
      setTimeout(() => {
          router.replace("/(tabs)");
        }, 2000);
    } catch (err) {
      toastRef.current.show({
        type: "error",
        title: "Payment Failed",
        description: "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showKeyboard = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideKeyboard = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });
  
    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
      <View style={styles.innerContainer}>
        <StatusBar barStyle="dark-content" />

        {/* Back Button (Positioned Below Status Bar) */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ zIndex: 10 }}
          >
            <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
          </TouchableOpacity>
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
                  <Text style={[styles.value, styles.fontBox]}>Adoption</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={[styles.label, { alignSelf: "center" }]}>
                    Cost
                  </Text>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={[styles.value, styles.fontSubBox]}>
                      Vaccination...
                    </Text>
                    <Text style={[styles.value, styles.fontSubBox]}>
                      Deworming....
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.ReviewContainer}>
                <Text style={styles.reviewText}>
                  Tell us about your experience?
                </Text>
                <View style={styles.stars}>
                  {starImages.map((_image, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setRating(index + 1)}
                    >
                      <Image
                        source={
                          rating > index
                            ? filledStarImages[index]
                            : starImages[index]
                        }
                        style={styles.starIcon}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
                <TextInput
                  placeholder="Type review about service."
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
                  <Text style={[styles.value, styles.fontBox]}>
                    PKR 5000.00
                  </Text>
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
        {/* Bottom Container */}
        {!isKeyboardVisible && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.payButton,
              isPayButtonDisabled && styles.disabledButton,
            ]}
            disabled={isPayButtonDisabled}
            onPress={submitReview}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff"/>
            ) : (
              <Text style={styles.payText}>Pay</Text>
            )}
          </TouchableOpacity>
        </View>
        )}
      <Toast ref={toastRef} />
      </View>
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
    marginTop: Platform.OS === "ios" ? 70 : 20,
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
  label: {
    fontSize: Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    fontWeight: 600,
    color: "#939393",
  },
  value: {
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
  fontBox:{
    fontSize: Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
  },
  fontSubBox:{
    fontSize: Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(8),
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
