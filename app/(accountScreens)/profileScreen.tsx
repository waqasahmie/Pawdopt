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
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const dismissKeyboard = () => Keyboard.dismiss();

  const [initialUser, setInitialUser] = useState({
    firstName: "Waqas",
    lastName: "Ahmed",
    email: "waqasahmed@gmail.com",
    phoneNumber: "3147544535",
    gender: "male",
    cnic: "32304-9995584-3",
    countryCode: "PK",
    callingCode: "92",
  });

  const [user, setUser] = useState(initialUser);

  const [countryCode, setCountryCode] = useState<CountryCode>("PK"); // Default to Pakistan
  const [callingCode, setCallingCode] = useState<string>("92"); // Default calling code
  const [visible, setVisible] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(user.gender);
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" },
  ]);

  // Validation functions
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhoneNumber = (number: string) =>
    /^(?:\d{10,11})$/.test(number);

  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const emailValid = validateEmail(user.email);
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
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 10 }}>
            <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
          </TouchableOpacity>
          <Text style={styles.navText}>My Profile</Text>
        </View>

        <View style={styles.profileContainer}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("../../assets/images/avatar.png")
            }
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
                      setCountryCode((country?.cca2 as CountryCode) || "PK");
                      setCallingCode(country?.callingCode[0] || "92");
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
                value={gender}
                items={items}
                setOpen={setOpen}
                setValue={setGender}
                onChangeValue={() => {
                  setIsUpdated(true); // Mark the form as updated
                }}
                setItems={setItems}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                containerStyle={{ marginBottom: open ? 160 : 15 }} // Push UI down when open
                dropDownDirection="BOTTOM"
              />
              <View style={{marginBottom: 50}}>
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

        {isUpdated && (
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => {
                Keyboard.dismiss();
                setUser((prevUser) => {
                  const updatedUser = { ...prevUser, gender };
                  setInitialUser(updatedUser); // Update initialUser
                  return updatedUser;
                });
                setIsUpdated(false);
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
    marginTop: 20,
    marginBottom: 40,
  },
  navText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#000",
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
    width: "100%", // Ensures full width
  },
  inputHeader: {
    fontSize: 14,
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
    fontSize: 16,
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
    fontSize: 16,
  },
  phoneNumberInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 5,
  },
  mobileNumber: {
    color: "#2BBFFF",
    fontSize: 16,
    marginTop: 15,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 8,
    paddingHorizontal: 10, // Padding inside the dropdown box
    paddingVertical: 8,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 8,
    padding: 10, // Padding inside the dropdown options container
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0, // Change to 50 if needed
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
    fontSize: 16,
    fontWeight: "600",
  },
});
