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
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Feather } from "@expo/vector-icons";
import { AccountDisabled} from "@/components/utils/accountDisabled"
import { Modal } from '@/components/utils/modal'

export default function VetDeleteAccount() {
  const navigation = useNavigation();
  const dismissKeyboard = () => Keyboard.dismiss();
  const [checked, setChecked] = useState(false);
  const [accountDisabledOpen, setAccountDisabledOpen] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 10 }}>
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
                  All your chats, profile, and appointment
                  history will be permanently deleted.
                  </Text>
                </View>
                <View style={styles.infoTextContainer}>
                  <Image
                    source={require("../../assets/images/Adoption icon.png")}
                    style={{ width: 20, height: 20, marginRight: 20 }}
                  />
                  <Text style={styles.Subsubtitle}>
                  You won’t be able to view or manage your ongoing appointment requests or updates.
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
                  Once you delete your account, you’ll be logged out
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
                  Are you sure you want to delete your account? (This can’t be
                  undone)
                </Text>
                <View style={styles.checkContainer}>
                  <TouchableOpacity
                    style={[styles.checkbox, checked && styles.checkedBox]}
                    onPress={() => setChecked(!checked)}
                  >
                    {" "}
                    {checked && (
                      <Feather name="check" size={20} color="white" />
                    )}{" "}
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
                onPress={() => setAccountDisabledOpen(true)}
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
      <Modal style={{justifyContent:"center"}} isOpen={accountDisabledOpen} closeModal={() => setAccountDisabledOpen(false)}>
        <AccountDisabled closeModal={() => setAccountDisabledOpen(false)}/>
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
    marginTop: 20,
    marginBottom: 20,
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
  scrollContainer: {
    width: "100%",
    marginBottom: "10%",
  },

  Title: {
    fontSize: 24,
    fontWeight: "500",
    marginTop: 20,
    marginBottom: 18,
  },
  Subtitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  Subsubtitle: {
    fontSize: 18,
    fontWeight: "400",
  },
  infoContainer: {
    width: "100%", // Ensures full width
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
    width: "100%", // Ensures full width
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
    alignItems: "center", // Center tick horizontally
    justifyContent: "center", // Center tick vertically
  },
  checkedBox: {
    backgroundColor: "#2BBFFF", // Change background when checked
    borderColor: "#2BBFFF",
  },
  inputNote: {
    color: "#939393",
    fontSize: 10,
    marginTop: -10,
  },
  deleteButton: {
    backgroundColor: "#2BBFFF",
    width: "100%",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 20,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Moves shadow downwards
    shadowOpacity: 0.1, // Adjust shadow visibility
    shadowRadius: 4, // Blur effect for shadow
    elevation: 3, // For Android shadow
  },
  deleteText: {
    color: "#2BBFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#F0F0F0",
  },
});