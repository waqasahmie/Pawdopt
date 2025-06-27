import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Feather } from "@expo/vector-icons";
import { AccountDisabled } from "@/components/utils/accountDisabled";
import { useUser } from "@clerk/clerk-expo";
import { db } from "../../config/firebaseConfig";
import {
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { supabase } from "../../config/supabase";
import { router } from "expo-router";
import { Modal } from "@/components/utils/modal";
import responsive from "@/constants/Responsive";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VetDeleteAccount() {
  const navigation = useNavigation();
  const dismissKeyboard = () => Keyboard.dismiss();
  const [checked, setChecked] = useState(false);
  const [accountDisabledOpen, setAccountDisabledOpen] = useState(false);
  const { user } = useUser();
  const handleDeleteAccount = async () => {
    if (!user) return;

    const userId = user.id;

    try {
      // Get user document
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
      const userData = userDocSnap.exists() ? userDocSnap.data() : null;

      if (userData) {
        const {frontCNICUrl, backCNICUrl } = userData;
        const imageUrls = [frontCNICUrl, backCNICUrl];

        for (const url of imageUrls) {
          if (url) {
            const path = url.split(
              "/storage/v1/object/public/user-documents/"
            )[1];
            await supabase.storage.from("user-documents").remove([path]);
          }
        }
      }


      // Delete appointments
      const appointmentsQuery = query(
        collection(db, "appointments"),
        where("vetId", "==", userId)
      );
      const appointmentsSnapshot = await getDocs(appointmentsQuery);
      for (const appointmentDoc of appointmentsSnapshot.docs) {
        await deleteDoc(appointmentDoc.ref);
      }

      // Delete user Firestore document
      await deleteDoc(userDocRef);

      // Delete Clerk user
      await user.delete();
    } catch (error) {
      console.error("Error deleting account:", error);
      Alert.alert("Error", "Failed to delete account. Please try again.");
    }
  };
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
          <Text style={styles.navText}>Delete Account</Text>
        </View>
      </View>

      <View style={styles.line} />

      <View style={styles.innerContainer}>
        <View style={styles.scrollContainer}>
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
              keyboardDismissMode="on-drag"
            >
              <Text style={styles.Title}>
                Are you sure you want to delete your account?
              </Text>
              <Text style={styles.Subtitle}>If you delete your account:</Text>
              <View style={styles.infoContainer}>
                <View style={styles.infoTextContainer}>
                  <Image
                    source={require("../../assets/images/bookmark.png")}
                    style={{ width: 15, height: 18.74, marginRight: 24 }}
                  />
                  <Text style={styles.Subsubtitle}>
                    All your chats, profile, and appointment history will be
                    permanently deleted.
                  </Text>
                </View>
                <View style={styles.infoTextContainer}>
                  <Image
                    source={require("../../assets/images/Adoption icon.png")}
                    style={{ width: 20, height: 20, marginRight: 20 }}
                  />
                  <Text style={styles.Subsubtitle}>
                    You won’t be able to view or manage your ongoing appointment
                    requests or updates.
                  </Text>
                </View>
                <View style={styles.infoTextContainer}>
                  <Image
                    source={require("../../assets/images/info-link.png")}
                    style={{ width: 18, height: 18, marginRight: 22 }}
                  />
                  <Text style={styles.Subsubtitle}>
                    Any notifications from appointment bookings will be removed.
                  </Text>
                </View>
              </View>
              <View>
                <Text style={[styles.Subsubtitle, styles.infoPara]}>
                  Once you delete your account, you'll be logged out
                  immediately. If you are logged into the Pawdopt platform on
                  other devices, it may take a few minutes for the session to
                  expire.
                </Text>
                <Text style={styles.Subsubtitle}>
                  For assistance with account deletion or accessing previous
                  appointment records, please contact.
                </Text>
                <Text
                  style={[
                    styles.Subsubtitle,
                    styles.infoPara,
                    { color: "#2bbfff" },
                  ]}
                >
                  support@pawdopt.com
                </Text>
                <Text style={[styles.Subsubtitle, styles.infoPara]}>
                  If you change your mind you can always come back and open a
                  new account with us.
                </Text>
                <Text style={[styles.Subtitle, styles.infoPara]}>
                  Are you sure you want to delete your account? (This can't be
                  undone)
                </Text>
                <View style={styles.checkContainer}>
                  <TouchableOpacity
                    style={[styles.checkbox, checked && styles.checkedBox]}
                    onPress={() => setChecked(!checked)}
                  >
                    {checked && (
                      <Feather name="check" size={20} color="white" />
                    )}
                  </TouchableOpacity>
                  <Text style={[styles.Subtitle, styles.infoPara]}>
                    Yes, I want to delete my account.
                  </Text>
                </View>
                <Text style={styles.inputNote}>
                  After you submit your request, we will disable your account.
                  It may take up to 30 days to fully delete and remove all of
                  your data.
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  handleDeleteAccount();
                  setAccountDisabledOpen(true);
                }}
                style={[
                  styles.deleteButton,
                  { backgroundColor: checked ? "#2bbfff" : "#E3E5E5" },
                ]}
                disabled={!checked}
              >
                <Text
                  style={[
                    styles.deleteText,
                    { color: checked ? "#fff" : "#939393" },
                  ]}
                >
                  Delete My Account
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <Modal
        style={{ justifyContent: "center" }}
        isOpen={accountDisabledOpen}
        closeModal={() => setAccountDisabledOpen(false)}
      >
        <AccountDisabled closeModal={() => setAccountDisabledOpen(false)} />
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: Platform.OS === "ios" ? 20 : 20,
    marginBottom: 20,
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
    marginBottom: "10%",
  },

  Title: {
    fontSize: Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
    fontWeight: "500",
    marginTop: 20,
    marginBottom: 18,
  },
  Subtitle: {
    fontSize: Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    fontWeight: "500",
  },
  Subsubtitle: {
    fontSize: Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    fontWeight: "400",
  },
  infoContainer: {
    width: "100%", 
    marginVertical: 18,
  },
  infoTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginBottom: 15,
    paddingHorizontal: 15,
    padding: 5,
  },
  infoPara: {
    width: "100%", 
    marginBottom: 16,
  },
  checkContainer: {
    flexDirection: "row",
    width: "90%",
    marginBottom: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#2BBFFF",
    marginRight: 10,
    alignItems: "center", 
    justifyContent: "center", 
  },
  checkedBox: {
    backgroundColor: "#2BBFFF", 
    borderColor: "#2BBFFF",
  },
  inputNote: {
    color: "#939393",
    fontSize: Platform.OS === "ios" ? responsive.fontSize(9) : responsive.fontSize(7),
    marginTop: -10,
  },
  deleteButton: {
    backgroundColor: "#2BBFFF",
    width: "100%",
    padding: 15,
    marginBottom:40,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 20,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3, // For Android shadow
  },
  deleteText: {
    color: "#2BBFFF",
    fontSize: Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "600",
  },

  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#F0F0F0",
  },
});
