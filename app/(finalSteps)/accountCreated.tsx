import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Platform,
} from "react-native";
import Animated from "react-native-reanimated";
import { useAppContext } from "../../hooks/AppContext";
import { db } from "../../config/firebaseConfig";
import { uploadImage } from "../../config/uploadImage";
import { useAuth } from "@clerk/clerk-react";
import { doc, setDoc } from "firebase/firestore";
import "react-native-url-polyfill/auto";
import * as Location from "expo-location";
import responsive from "@/constants/Responsive";

export default function AccountCreated() {
  const { from, role } = useLocalSearchParams();
  const isFromVet = from === "vet";
  const { registrationData } = useAppContext();
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { vetData } = useAppContext();

  const saveVetData = async () => {
    if (!userId) return;
    setIsLoading(true); // Start loading

    try {
      const location = await Location.getCurrentPositionAsync({});
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;

      // Reverse geocode to get readable address
      const geocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      let address = "";

      if (geocode.length > 0) {
        console.log("Full reverse geocoded object:", geocode[0]);
        const { name, street, district, city, region } = geocode[0];
        address = [name, street, district, city, region]
          .filter(Boolean)
          .join(", ");
      }

      const fileUri = vetData.cnicFront; 
      const fileName = `vet-documents/${Date.now()}-front.jpg`;

      const fronturl = await uploadImage("user-documents", fileName, fileUri);

      const fileUri2 = vetData.cnicBack; 
      const fileName2 = `vet-documents/${Date.now()}-back.jpg`;

      const backurl = await uploadImage("user-documents", fileName2, fileUri2);

      const fileUri3 = vetData.cnicBack; 
      const fileName3 = `vet-documents/${Date.now()}-license.jpg`;

      const license = await uploadImage("user-documents", fileName3, fileUri3);

      const vetUserData = {
        title: vetData.title,
        firstName: vetData.firstName,
        lastName: vetData.lastName,
        clinicName: vetData.clinicName,
        startTime: vetData.startTime,
        endTime: vetData.endTime,
        gender: vetData.gender,
        license: license,
        email: vetData.email,
        phone: vetData.phoneNumber,
        cnicNumber: vetData.cnic,
        frontCNICUrl: fronturl, 
        backCNICUrl: backurl, // uploaded URL from Supabase
        experience: vetData.experience,
        profilePicUrl:
          "https://xzrkiwwkrdhsurcqjwrt.supabase.co/storage/v1/object/public/user-documents/banners/avatar.png",
        createdAt: new Date().toISOString(),
        role: "vet", 
        longitude: longitude,
        latitude: latitude,
        address: address,
        callingCode:vetData.callingCode,
        countryCode:vetData.countryCode,
      };

      // Upload to Firestore
      await setDoc(doc(db, "users", userId), vetUserData);
      router.replace(`/(vetTabs)?role=${role}`);
    }finally {
      setIsLoading(false); // End loading
    }
  };

  const saveUserData = async () => {
    if (!userId) return;
    setIsLoading(true); // Start loading

    try {

      const location = await Location.getCurrentPositionAsync({});
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;

      // Reverse geocode to get readable address
      const geocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      let address = "";

      if (geocode.length > 0) {
        const { name, street, district, city, region } = geocode[0];
        address = [name, street, district, city, region]
          .filter(Boolean)
          .join(", ");
      }

      const fileUri = registrationData.frontCNIC; 
      const fileName = `user-documents/${Date.now()}-front.jpg`; 

      const fronturl = await uploadImage("user-documents", fileName, fileUri);

      const fileUri2 = registrationData.frontCNIC; 
      const fileName2 = `user-documents/${Date.now()}-front.jpg`; 

      const backurl = await uploadImage("user-documents", fileName2, fileUri2);

      const userData = {
        organizationName: registrationData.organizationName,
        firstName: registrationData.firstName,
        lastName: registrationData.lastName,
        role: registrationData.role,
        animalType: registrationData.animalType,
        favoriteBreeds: registrationData.favoriteBreeds,
        email: registrationData.email,
        phone: registrationData.phone,
        gender: registrationData.gender,
        cnicNumber: registrationData.cnicNumber,
        frontCNICUrl: fronturl,
        backCNICUrl: backurl,
        profilePicUrl:
          "https://xzrkiwwkrdhsurcqjwrt.supabase.co/storage/v1/object/public/user-documents/banners/avatar.png",
        createdAt: new Date().toISOString(),
        longitude: longitude,
        latitude: latitude,
        address: address,
        countryCode:registrationData.countryCode,
        callingCode:registrationData.callingCode,
      };

      await setDoc(doc(db, "users", userId), userData);
      router.replace(`/(tabs)?role=${role}`);
    }finally {
      setIsLoading(false); 
    }
  };

  return (
    <Animated.View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Top Left Background Image */}
      <Image
        source={require("../../assets/images/PawprintT.png")}
        style={styles.topLeftImage}
      />
      {/* Bottom Right Background Image */}
      <Image
        source={require("../../assets/images/PawprintB.png")}
        style={styles.bottomRightImage}
      />
      <View style={styles.centerWrapper}>
        {/* Logo Icon */}
        <Image
          source={require("../../assets/images/SuccessTick.png")}
          style={styles.successIcon}
        />

        {/* Success Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {isFromVet ? "Interview Scheduled" : "You’re All Set"}
          </Text>
          <Text style={styles.subtitle}>
            {isFromVet
              ? "Your interview has been scheduled. Please arrive on time and be prepared, as your account approval depends on the interview outcome."
              : "Your account has been successfully created and is ready to use."}
          </Text>
        </View>
      </View>

      {/* Continue Button */}
      <View style={styles.bottomContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#2BBFFF" />
        ) : (
          <TouchableOpacity
            style={styles.continueButton}
            onPress={isFromVet ? saveVetData : saveUserData}
          >
            <Text style={styles.continueText}>Go To Homepage</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 50,
    height: "100%", 
  },
  topLeftImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "90%",
    height: "40%",
    resizeMode: "contain",
  },
  bottomRightImage: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "96%",
    height: "49%",
    resizeMode: "contain",
  },
  centerWrapper: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    alignItems: "center",
    transform: [{ translateY: "-50%" }], 
  },
  successIcon: {
    width: 102, 
    height: 102, 
    marginBottom: 10,
  },
  textContainer: {
    alignItems: "center",
    width: "100%", 
  },
  title: {
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(29) : responsive.fontSize(23),
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
  },
  subtitle: {
    fontSize:Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    color: "#939393",
    width: "90%",
    textAlign: "center",
    marginBottom: 10,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 40, 
    width: "100%",
  },
  continueButton: {
    backgroundColor: "#2BBFFF",
    width: "100%",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  continueText: {
    color: "#fff",
    fontSize:Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "600",
  },
});
