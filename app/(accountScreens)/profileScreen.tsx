import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Alert,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import { useAppContext, UserData } from "@/hooks/AppContext";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { db } from "../../config/firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useAuth } from "@clerk/clerk-expo";
import { uploadImage } from "../../config/uploadImage";
import responsive from "@/constants/Responsive";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { userId } = useAuth();
  const navigation = useNavigation();
  const dismissKeyboard = () => Keyboard.dismiss();
  const parsePhoneDetails = (phone: string | undefined) => {
    if (!phone) {
      return {
        phoneNumber: "",
        countryCode: "US",
        callingCode: "1",
      };
    }
    const phoneNumberObj = parsePhoneNumberFromString(phone);
    if (phoneNumberObj) {
      return {
        phoneNumber: phoneNumberObj.nationalNumber,
        countryCode: phoneNumberObj.country,
        callingCode: phoneNumberObj.countryCallingCode,
      };
    } else {
      return {
        phoneNumber: "",
        countryCode: "US",
        callingCode: "1",
      };
    }
  };

  const updateUserProfile = async (params: {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    countryCode: string;
    callingCode: string;
    gender: string;
  }): Promise<
    { success: true; data: UserData } | { success: false; error: string }
  > => {
    try {
      const {
        userId,
        firstName,
        lastName,
        email,
        phoneNumber,
        countryCode,
        callingCode,
        gender,
      } = params;

      const userDocRef = doc(db, "users", userId);

      await updateDoc(userDocRef, {
        firstName,
        lastName,
        email,
        phone: `+${callingCode}${phoneNumber}`,
        countryCode,
        callingCode,
        gender,
        updatedAt: new Date().toISOString(),
      });

      const updatedSnap = await getDoc(userDocRef);

      if (!updatedSnap.exists()) {
        throw new Error("Document not found after update");
      }

      const updatedData = updatedSnap.data() as UserData;
      return { success: true, data: updatedData };
    } catch (error: any) {
      const errorMessage = error.message || "Unknown error occurred";
      return { success: false, error: errorMessage };
    }
  };

  async function onImagePicked(localUri: string) {
    if (!userId) return Alert.alert("Error", "No user ID found.");

    try {
      const ext = localUri.split(".").pop();
      const filename = `profilePics/${userId}-${Date.now()}.${ext}`;

      const publicUrl = await uploadImage("user-documents", filename, localUri);

      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { profilePicUrl: publicUrl });

      updateUserData({ ...userData!, profilePicUrl: publicUrl });
    } catch (e) {
      Alert.alert("Upload failed", "Please try again.");
    }
  }

  const { userData, fetchUserData, updateUserData } = useAppContext();
  const parsedPhone = parsePhoneDetails(userData?.phone);
  const [initialUser, setInitialUser] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    email: userData?.email,
    phoneNumber: parsedPhone.phoneNumber,
    gender: userData?.gender,
    cnic: userData?.cnicNumber,
    countryCode: userData?.countryCode,
    callingCode: userData?.callingCode,
  });

  const [user, setUser] = useState(initialUser);

  const [countryCode, setCountryCode] = useState<CountryCode>("PK");
  const [callingCode, setCallingCode] = useState<string>("92");
  const [visible, setVisible] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(user.gender);
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" },
  ]);

  useEffect(() => {
    if (userData?.countryCode && userData.callingCode) {
      setCountryCode(userData.countryCode as CountryCode);
      setCallingCode(userData.callingCode);
    }
  }, []);

  // Validation functions
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhoneNumber = (number: string) =>
    /^(?:\d{10,11})$/.test(number);

  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const emailValid = validateEmail(user.email || "");
    const phoneValid = validatePhoneNumber(user.phoneNumber);

    const firstNameChanged = user.firstName !== initialUser.firstName;
    const lastNameChanged = user.lastName !== initialUser.lastName;
    const emailChanged = user.email !== initialUser.email;
    const phoneChanged = user.phoneNumber !== initialUser.phoneNumber;
    const genderChanged = gender !== initialUser.gender;
    const countryChanged = countryCode !== initialUser.countryCode;
    const callingChanged = callingCode !== initialUser.callingCode;

    // Check if any change is made
    const hasChanges =
      firstNameChanged ||
      lastNameChanged ||
      genderChanged ||
      countryChanged ||
      callingChanged ||
      emailChanged ||
      phoneChanged;

    // Check if the update is valid
    const hasValidUpdate =
      hasChanges &&
      (!emailChanged || emailValid) &&
      (!phoneChanged || phoneValid);

    setIsUpdated(hasValidUpdate);
  }, [user, gender, countryCode, callingCode]);

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImagePicker = async () => {
    Alert.alert("Change Profile Picture", "Choose an option", [
      { text: "Take Photo", onPress: openCamera },
      { text: "Choose from Gallery", onPress: openGallery },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  // Open camera
  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Denied", "Allow camera access to take a photo.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri); // Update profile picture
      onImagePicked(result.assets[0].uri);
    }
  };

  // Open gallery
  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri); // Update profile picture
      onImagePicked(result.assets[0].uri);
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
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ zIndex: 10 }}
          >
            <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
          </TouchableOpacity>
          <Text style={styles.navText}>My Profile</Text>
        </View>

        <View style={styles.profileContainer}>
          <Image
            source={{ uri: userData?.profilePicUrl }}
            style={styles.avatar}
          />

          <TouchableOpacity
            style={styles.editButton}
            onPress={handleImagePicker}
          >
            <Image
              source={require("../../assets/images/edit.png")}
              style={styles.editicon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.scrollContainer}>
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
              keyboardDismissMode="on-drag"
            >
              <View style={[styles.textContainer, { paddingTop: 26 }]}>
                <Text style={styles.inputHeader}>First Name</Text>
              </View>
              <TextInput
                style={styles.input}
                autoCapitalize="sentences"
                value={user.firstName}
                onChangeText={(text) => {
                  setUser({ ...user, firstName: text });
                  setIsUpdated(true);
                }}
              />

              <View style={styles.textContainer}>
                <Text style={styles.inputHeader}>Last Name</Text>
              </View>
              <TextInput
                style={styles.input}
                value={user.lastName}
                autoCapitalize="sentences"
                onChangeText={(text) => {
                  setUser({ ...user, lastName: text });
                  setIsUpdated(true);
                }}
              />

              <View style={styles.textContainer}>
                <Text style={styles.inputHeader}>Email</Text>
              </View>
              <TextInput
                style={styles.input}
                value={user.email}
                keyboardType="email-address"
                onChangeText={(text) => {
                  setUser({ ...user, email: text });
                  setIsUpdated(true);
                }}
              />

              <View style={styles.textContainer}>
                <Text style={styles.inputHeader}>Phone Number</Text>
              </View>
              <View style={styles.InputContainer}>
                <TouchableOpacity
                  style={styles.countryPicker}
                  onPress={() => setVisible(true)}
                >
                  <CountryPicker
                    visible={visible}
                    withFilter={true}
                    withFlag={true}
                    withCallingCode={true}
                    withModal={true}
                    countryCode={countryCode}
                    onSelect={(country: Country) => {
                      setCountryCode(country?.cca2 as CountryCode);
                      setCallingCode(country?.callingCode[0]);
                      setVisible(false);
                      setIsUpdated(true);
                    }}
                    onClose={() => setVisible(false)}
                  />
                  <Text style={styles.callingCode}>+{callingCode} ▼</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.phoneNumberInput}
                  value={user.phoneNumber}
                  keyboardType="numeric"
                  maxLength={11}
                  onChangeText={(text) => {
                    setUser({ ...user, phoneNumber: text });
                    setIsUpdated(true);
                  }}
                />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.inputHeader}>Gender</Text>
              </View>
              <DropDownPicker
                listMode="SCROLLVIEW"
                open={open}
                value={gender ?? null}
                items={items}
                setOpen={setOpen}
                setValue={setGender}
                onChangeValue={() => {
                  setIsUpdated(true);
                }}
                setItems={setItems}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                containerStyle={{ marginBottom: open ? 160 : 15 }}
                dropDownDirection="BOTTOM"
                textStyle={styles.dropdownText}
              />
              <View style={{ marginBottom: 80 }}>
                <View style={styles.textContainer}>
                  <Text style={styles.inputHeader}>CNIC Number</Text>
                </View>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: "#F6F6F6",
                      color: "#ABABAB",
                      borderColor: "#e3e5e5",
                    },
                  ]}
                  value={user.cnic}
                  editable={false}
                  selectTextOnFocus={false}
                />
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </View>

        {isUpdated  && !isKeyboardVisible && (
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={async () => {
                Keyboard.dismiss();
                setIsUpdated(false);
                const updatedUser = { ...user, gender };

                if (!userId) {
                  throw new Error("No user ID found. User must be logged in.");
                } else {
                  const result = await updateUserProfile({
                    userId: userId,
                    firstName: updatedUser.firstName || "",
                    lastName: updatedUser.lastName || "",
                    email: updatedUser.email || "",
                    phoneNumber: updatedUser.phoneNumber,
                    countryCode,
                    callingCode,
                    gender: gender || "others",
                  });

                  if (result.success && result.data) {
                    const parsed = parsePhoneDetails(result.data.phone);

                    const updatedUser = {
                      firstName: result.data.firstName,
                      lastName: result.data.lastName,
                      email: result.data.email,
                      phoneNumber: parsed.phoneNumber,
                      gender: result.data.gender,
                      cnic: result.data.cnicNumber,
                      countryCode: countryCode,
                      callingCode: callingCode,
                    };

                    setUser(updatedUser);
                    setInitialUser(updatedUser);
                    setCountryCode(countryCode as CountryCode); 
                    setCallingCode(callingCode);
                    setIsUpdated(false); 
                    await fetchUserData();
                  }
                }
              }}
            >
              <Text style={styles.continueText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
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
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: Platform.OS === "ios" ? 30 : 20,
    marginBottom: 40,
  },
  navText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
    fontWeight: "500",
    position: "absolute",
    textAlign: "center",
    left: 0,
    right: 0,
  },
  profileContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  avatar: {
    width: 135,
    height: 135,
    alignSelf: "center",
    borderRadius: 100,
    marginRight: 15,
  },
  editButton: {
    position: "absolute",
    width: 17,
    height: 17,
    bottom: 10,
    right: 28,
    backgroundColor: "#2bbfff",
    borderRadius: 4,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  editicon: {
    width: 11,
    height: 11,
  },
  scrollContainer: {
    width: "100%",
    marginBottom: "65%",
  },
  textContainer: {
    width: "100%", 
  },
  inputHeader: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    marginBottom: 5,
    fontWeight: 400,
    marginLeft: 5,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#d3d3d3",
    backgroundColor: "#fff",
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    marginBottom: 15,
  },
  InputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#d3d3d3",
    backgroundColor: "#fff",
    marginBottom: 15,
    paddingHorizontal: 15,
    padding: 5,
  },
  countryPicker: {
    flexDirection: "row",
    alignItems: "center",
  },
  callingCode: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
  },
  phoneNumberInput: {
    flex: 1,
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    marginLeft: 5,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  dropdownText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 8,
    padding: 10,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 30,
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
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "600",
  },
});
