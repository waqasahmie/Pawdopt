import React, { useEffect, useRef, useState } from "react";
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
  Modal,
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
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { Clock } from "@/components/utils/clock";
import { TimeRange } from "@/components/utils/time-range";
import { useAppContext } from "@/hooks/AppContext";
import parsePhoneNumberFromString from "libphonenumber-js";
import { db } from "../../config/firebaseConfig"; // adjust the path if needed
import { doc, updateDoc, getDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "@clerk/clerk-expo";
import { uploadImage } from "../../config/uploadImage";
import responsive from "@/constants/Responsive";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "@/components/utils/toast";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const dismissKeyboard = () => Keyboard.dismiss();
  const { userId } = useAuth();
  const TimezoneOffsetMs = -new Date().getTimezoneOffset() * 60000;
  

  const timeSlots = new Array(48).fill(0).map((_, index) => {
    const hour = Math.floor(index / 2) + 24; // 8:00 AM onward
    const minutes = index % 2 === 0 ? 0 : 30;
    return new Date(2025, 0, 1, hour, minutes);
  });
  const toastRef = useRef<any>({});
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isStartTime, setIsStartTime] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const { vetData, updateVetData } = useAppContext();
  // shared time state
  const selectedDate = useSharedValue(timeSlots[0].getTime());

  const clockDate = useDerivedValue(() => {
    "worklet";
    return selectedDate.value + TimezoneOffsetMs;
  });

  const updateUserProfile = async (params: {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    clinicName: string;
    startTime: Timestamp;
    endTime: Timestamp;
    phoneNumber: string;
    countryCode: string;
    callingCode: string;
    gender: string;
  }): Promise<
    { success: true; data: any } | { success: false; error: string }
  > => {
    try {
      const {
        userId,
        firstName,
        lastName,
        email,
        clinicName,
        startTime,
        endTime,
        phoneNumber,
        countryCode,
        callingCode,
        gender,
      } = params;
      updateVetData("firstName", firstName);
      updateVetData("lastName", lastName);
      updateVetData("clinicName", clinicName);
      updateVetData("startTime", startTime);
      updateVetData("endTime", endTime);
      updateVetData("email", email);
      updateVetData(
        "phoneNumber",
        `+${callingCode}${phoneNumber.replace(/^0+/, "")}`
      );
      updateVetData("gender", gender);
      updateVetData("callingCode", callingCode);
      updateVetData("countryCode", countryCode);
      const userDocRef = doc(db, "users", userId);

      // Update Firestore
      await updateDoc(userDocRef, {
        firstName,
        lastName,
        email,
        clinicName,
        startTime,
        endTime,
        phone: `+${callingCode}${phoneNumber}`,
        countryCode,
        callingCode,
        gender,
        updatedAt: new Date().toISOString(),
      });

      // Get fresh data from Firestore
      const updatedSnap = await getDoc(userDocRef);

      if (!updatedSnap.exists()) {
        throw new Error("Document not found after update");
      }

      const updatedData = updatedSnap.data() as any;

      return { success: true, data: updatedData };
    } catch (error: any) {
      const errorMessage = error.message || "Unknown error occurred";
      return { success: false, error: errorMessage };
    }
  };

  function formatTime(d: Date | Timestamp | undefined): string {
    if (!d) return "Select time";

    // Convert Firestore Timestamp to Date if needed
    const date = d instanceof Timestamp ? d.toDate() : d;

    // Handle invalid dates
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "Invalid time";
    }

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const h12 = hours % 12 || 12;
    const mm = minutes.toString().padStart(2, "0");
    return `${h12}:${mm} ${period}`;
  }

  async function onImagePicked(localUri: string) {
    if (!userId) return Alert.alert("Error", "No user ID found.");

    try {
      // generate a unique path
      const ext = localUri.split(".").pop();
      const filename = `profilePics/${userId}-${Date.now()}.${ext}`;

      const publicUrl = await uploadImage("user-documents", filename, localUri);

      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { profilePicUrl: publicUrl });

      updateVetData("profilePicUrl", publicUrl);
    } catch (e) {
      toastRef.current.show({
        type: "error",
        title: "Upload Failed",
        description: "Please try again.",
      });
      
    }
  }

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

  const parsedPhone = parsePhoneDetails(vetData?.phoneNumber);
  const [initialUser, setInitialUser] = useState({
    firstName: vetData?.firstName,
    lastName: vetData?.lastName,
    email: vetData?.email,
    clinicName: vetData?.clinicName,
    startTime: vetData?.startTime?.toDate(),
    endTime: vetData?.endTime?.toDate(),
    phoneNumber: parsedPhone.phoneNumber,
    gender: vetData?.gender,
    cnic: vetData?.cnic,
    countryCode: vetData?.countryCode,
    callingCode: vetData?.callingCode,
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
  useEffect(() => {
    if (vetData.countryCode && vetData.callingCode) {
      setCountryCode(vetData.countryCode as CountryCode);
      setCallingCode(vetData.callingCode);
    }
  }, []);

  // Validation functions
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhoneNumber = (number: string) =>
    /^(?:\d{10,11})$/.test(number);
  function toTimestamp(input: string | Date | Timestamp): Timestamp {
    if (input instanceof Timestamp) {
      return input;
    } else if (input instanceof Date) {
      return Timestamp.fromDate(input);
    } else {
      const dt = new Date(`1970-01-01T${input}`);
      return Timestamp.fromDate(dt);
    }
  }

  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const emailValid = validateEmail(user.email);
    const phoneValid = validatePhoneNumber(user.phoneNumber);

    const firstNameChanged = user.firstName !== initialUser.firstName;
    const lastNameChanged = user.lastName !== initialUser.lastName;
    const clinicNameChanged = user.clinicName !== initialUser.clinicName;
    const startTimeChanged =
      user.startTime?.getTime?.() !== initialUser.startTime?.getTime?.();
    const endTimeChanged =
      user.endTime?.getTime?.() !== initialUser.endTime?.getTime?.();
    const emailChanged = user.email !== initialUser.email;
    const phoneChanged = user.phoneNumber !== initialUser.phoneNumber;
    const genderChanged = gender !== initialUser.gender;
    const countryChanged = countryCode !== initialUser.countryCode;
    const callingChanged = callingCode !== initialUser.callingCode;

    // Check if any change is made
    const hasChanges =
      firstNameChanged ||
      lastNameChanged ||
      clinicNameChanged ||
      startTimeChanged ||
      endTimeChanged ||
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
      setProfileImage(result.assets[0].uri);
      onImagePicked(result.assets[0].uri); // Update profile picture
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
      setProfileImage(result.assets[0].uri);
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
            source={
              vetData.profilePicUrl
                ? { uri: vetData.profilePicUrl }
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
                <Text style={styles.inputHeader}>Clinic Name</Text>
              </View>
              <TextInput
                style={styles.input}
                value={user.clinicName}
                autoCapitalize="sentences"
                onChangeText={(text) => {
                  setUser({ ...user, clinicName: text });
                  setIsUpdated(true);
                }}
              />

              <View style={styles.textContainer}>
                <Text style={styles.inputHeader}>Clinic Timings</Text>
              </View>

              <View style={styles.timeRow}>
                <TouchableOpacity
                  style={styles.timeBox}
                  onPress={() => {
                    setIsStartTime(true);
                    setShowTimePicker(true);
                  }}
                >
                  <Text style={styles.label}>Start Time</Text>
                  <Text style={styles.timeValue}>
                    {formatTime(user.startTime)}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.timeBox}
                  onPress={() => {
                    setIsStartTime(false);
                    setShowTimePicker(true);
                  }}
                >
                  <Text style={styles.label}>End Time</Text>
                  <Text style={styles.timeValue}>
                    {formatTime(user.endTime)}
                  </Text>
                </TouchableOpacity>
              </View>

              <Modal visible={showTimePicker} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <View style={{ flexDirection: "row", gap: 40 }}>
                      <Clock date={clockDate} size={100} />
                      <TimeRange
                        dates={timeSlots}
                        onDateChange={(updatedDate: number) => {
                          "worklet";
                          selectedDate.value = updatedDate;
                        }}
                      />
                    </View>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                      <TouchableOpacity
                        onPress={() => {
                          const selected = new Date(selectedDate.value);
                          if (isStartTime) {
                            setStartTime(selected);
                            setUser((u) => ({ ...u, startTime: selected }));
                          } else {
                            setEndTime(selected);
                            setUser((u) => ({ ...u, endTime: selected }));
                          }

                          setShowTimePicker(false);

                          setIsUpdated(true);
                        }}
                        style={styles.timingContainer}
                      >
                        <Text style={{ color: "#fff" }}>Confirm</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => setShowTimePicker(false)}
                        style={styles.timingContainer}
                      >
                        <Text style={{ color: "#fff" }}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>

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
                      setCountryCode((country?.cca2 as CountryCode));
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
                  setIsUpdated(true); // Mark the form as updated
                }}
                setItems={setItems}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                containerStyle={{ marginBottom: open ? 160 : 15 }} // Push UI down when open
                dropDownDirection="BOTTOM"
                textStyle={styles.dropdownText}
              />
              <View style={{ marginBottom: 50 }}>
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
                    clinicName: updatedUser.clinicName || "",
                    startTime: toTimestamp(user.startTime),
                    endTime: toTimestamp(user.endTime),

                    email: updatedUser.email || "",
                    phoneNumber: updatedUser.phoneNumber || "",
                    countryCode,
                    callingCode,
                    gender: gender || "others",
                  });

                  if (result.success && result.data) {
                    const parsed = parsePhoneDetails(result.data.phone);
                    const updatuser = {
                      firstName: result.data.firstName,
                      lastName: result.data.lastName,
                      email: result.data.email,
                      clinicName: result.data.clinicName,
                      startTime: result.data.startTime,
                      endTime: result.data.endTime,
                      phoneNumber: parsed.phoneNumber,
                      gender: result.data.gender,
                      cnic: result.data.cnicNumber, // Map Firestore's cnicNumber to local cnic
                      countryCode: countryCode,
                      callingCode: callingCode,
                    };
                    setUser(updatuser);
                    setInitialUser(updatuser);
                    setCountryCode(countryCode as CountryCode);
                    setCallingCode(callingCode);
                    setIsUpdated(false);
                    return updatuser;
                  };
                }
              }}
            >
              <Text style={styles.continueText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Toast ref={toastRef} />
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
    marginTop: Platform.OS === "ios" ? 20 : 20,
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
    width: "100%", // Ensures full width
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

  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 15,
  },
  timeBox: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d3d3d3",
  },
  timingContainer: {
    marginTop: 15,
    backgroundColor: "#1e1e1e",
    padding: 8,
    borderRadius: 8,
    justifyContent: "center",
  },
  label: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(9),
    color: "#939393",
    marginBottom: 4,
  },
  timeValue: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    color: "#000",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 32,
    borderRadius: 24,
    backgroundColor: "#fff",
  },
});
