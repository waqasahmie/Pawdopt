import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome6 } from "@expo/vector-icons";
import { useAppContext } from "@/hooks/AppContext";
import { db } from "@/config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { uploadImage } from "@/config/uploadImage";
import {
  query,
  where,
  getDocs,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import responsive from "@/constants/Responsive";

type PetSubmittedProps = {
  closeModal: () => void;
  direction?: "vertical" | "horizontal";
};

const screenHeight = Dimensions.get("window").height;
export const PetSubmitted = ({
  closeModal,
  direction = "vertical",
}: PetSubmittedProps) => {
  const [slideAnim] = useState(new Animated.Value(screenHeight * 0.9));
  const { petListingData, userData, isEdit, resetPetListingData ,setIsEdit} = useAppContext();
  const { user } = useUser();

  
  // keep your uploadPetListing clean
  const uploadPetListing = async (petListingData: any, user: any) => {
    if (!user) throw new Error("User not logged in");
    if (isEdit == "false") {
      try {
        const uploadedImageUrls = await Promise.all(
          petListingData.image.map(
            async (localImage: string, index: number) => {
             
              if (
                typeof localImage === "string" &&
                localImage.startsWith("http")
              ) {
                return localImage;
              } else {
                const uploadedUrl = await uploadImage(
                  "user-documents",
                  `pets/${user.id}_${Date.now()}_${index}.jpg`,
                  localImage
                );
                return uploadedUrl;
              }
            }
          )
        );

        const petDataToUpload = {
          ...petListingData,
          image: uploadedImageUrls,
          ownerId: user.id,
          latitude: userData?.latitude,
          longitude: userData?.longitude,

          createdAt: new Date(),
        };

        const petDocRef = await addDoc(
          collection(db, "petlistings"),
          petDataToUpload
        );
        const petId = petDocRef.id;
        resetPetListingData();
        // Notify users with matching breed preferences
        const usersRef = collection(db, "users");
        const snapshot = await getDocs(usersRef);

        for (const userDoc of snapshot.docs) {
          const userData = userDoc.data();
          const userId = userDoc.id;

          const favouriteBreeds: string[] = userData.favoriteBreeds || [];
          const petBreeds: string[] = petListingData.breed || [];
          const petName = petListingData.name;

          const hasMatchingBreed = petBreeds.some((breed) =>
            favouriteBreeds.includes(breed)
          );

          const isNotOwner = userId !== user.id;

          if (hasMatchingBreed && isNotOwner) {
            const expoPushToken = userData.expoPushToken;
            const isLoggedIn=userData.loggedIn;
            const title = "New pet alert!";
            const description = `${petName}, a ${petBreeds.join(
              ", "
            )}, has just been listed for adoption! Don’t miss the chance to meet your new best friend.`;

            // Save to Firestore
            await addDoc(collection(db, "users", userId, "notifications"), {
              title,
              description,
              petId,
              timestamp: serverTimestamp(),
              read: false,
            });

            // Send push notification
            if (expoPushToken && isLoggedIn) {
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
                  data: { breeds: petBreeds },
                }),
              });
            }
          }
        }
        return true;
      } catch (error) {
        return false;
      }
    }
    else if (isEdit && isEdit.trim().length > 0) {
      setIsEdit("false");
      try {
        const uploadedImageUrls = await Promise.all(
          petListingData.image.map(
            async (localImage: string, index: number) => {
              if (
                typeof localImage === "string" &&
                localImage.startsWith("http")
              ) {
                return localImage;
              } else {
                const uploadedUrl = await uploadImage(
                  "user-documents",
                  `pets/${user.id}_${Date.now()}_${index}.jpg`,
                  localImage
                );
                return uploadedUrl;
              }
            }
          )
        );
        const petDataToUpload = {
          ...petListingData,
          image: uploadedImageUrls,

          createdAt: new Date(),
        };

        // Notify users with matching breed preferences
        const docRef = doc(db, "petlistings", isEdit);
        await updateDoc(docRef, petDataToUpload);

        return true;
      } catch (error) {
        return false;
      }
    }
  };
  useEffect(() => {
    // Slide up animation
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    const upload = async () => {
      const success = await uploadPetListing(petListingData, user);
      if (success) {
        handleClose();
      }
    };
    upload();

    const timer = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: screenHeight * 0.9,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      closeModal();
    });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            direction === "horizontal"
              ? { translateX: slideAnim }
              : { translateY: slideAnim },
          ],
        },
      ]}
    >
      <View style={styles.indicator} />
      <View style={styles.innerContainer}>
        <Image
          source={require("../../assets/images/SuccessTick.png")}
          style={styles.image}
        />
        <Text style={styles.title}>You’re All Set</Text>
        <Text style={styles.subTitle}>
          Your Ad has been submitted for review.
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#ccc",
    marginTop: 8,
  },
  container: {
    width: "95%",
    height: 480,
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 30,
  },
  innerContainer: {
    height: 436,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 10,
    marginBottom: 5,
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(19) : responsive.fontSize(16),
    fontWeight: "700",
    width: "90%",
  },
  subTitle: {
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    color: "#939393",
    fontWeight: "500",
    width: "90%",
    marginBottom: 20,
  },
  image: {
    width: 90,
    height: 90,
  },
});
