import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import { vs } from "react-native-size-matters";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal } from "@/components/utils/modal";
import { Logout } from "@/components/utils/logout";
import { Preference } from "@/components/utils/preference";
import { LinkedAccount } from "@/components/utils/linkedAccounts";
import { router } from "expo-router";

export default function ForgotPasswordPhoneScreen() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [linkedAccountOpen, setLinkedAccountOpen] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.headerContainer}>
          <Text style={{ fontSize: 22, fontWeight: 500 }}>
            Account & Settings
          </Text>
        </View>
        <View style={styles.scrollContainer}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Profile Section */}
            <Pressable
              style={styles.profileCard}
              onPress={() => router.push("/(accountScreens)/profileScreen")}
            >
              <Image
                source={require("../../assets/images/avatar.png")}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.profileTitle}>Waqas Ahmed</Text>
                <Text style={styles.profileSubtitle}>waqasahmie@gmail.com</Text>
              </View>
              <View style={styles.arrowIcon}>
                <Ionicons name="chevron-forward" size={20} color="#fff" />
              </View>
            </Pressable>

            <Text style={styles.sectionHeader}>Account Management</Text>
            <View style={styles.cardContainer}>
              <Pressable onPress={() => setPreferencesOpen(true)}>
                <View style={styles.settingCard}>
                  <View style={styles.cardicon}>
                    <Image
                      source={require("../../assets/images/preferences.png")}
                      style={{ width: 24, height: 23.04 }}
                    />
                  </View>
                  <View>
                    <Text style={styles.cardTitle}>Pet Preferences</Text>
                    <Text style={styles.cardSubtitle}>
                      View and change your pet preferences
                    </Text>
                  </View>
                  <View style={styles.arrowIcon}>
                    <Ionicons name="chevron-forward" size={20} color="#fff" />
                  </View>
                </View>
              </Pressable>
              <View style={styles.line} />

              <Pressable
                onPress={() =>
                  router.push("/(accountScreens)/notificationsSettings")
                }
              >
                <View style={styles.settingCard}>
                  <View style={styles.cardicon}>
                    <Image
                      source={require("../../assets/images/notification.png")}
                      style={{ width: 24, height: 23.04 }}
                    />
                  </View>
                  <View>
                    <Text style={styles.cardTitle}>Notification & Privacy</Text>
                    <Text style={styles.cardSubtitle}>
                      Enable or disable your notifications
                    </Text>
                  </View>
                  <View style={styles.arrowIcon}>
                    <Ionicons name="chevron-forward" size={20} color="#fff" />
                  </View>
                </View>
              </Pressable>
              <View style={styles.line} />

              <Pressable
                onPress={() =>
                  router.push("/(accountScreens)/securitySettings")
                }
              >
                <View style={styles.settingCard}>
                  <View style={styles.cardicon}>
                    <Image
                      source={require("../../assets/images/security.png")}
                      style={{ width: 21.45, height: 16.01 }}
                    />
                  </View>
                  <View>
                    <Text style={styles.cardTitle}>Account & Security</Text>
                    <Text style={styles.cardSubtitle}>
                      Manage account and security settings
                    </Text>
                  </View>
                  <View style={styles.arrowIcon}>
                    <Ionicons name="chevron-forward" size={20} color="#fff" />
                  </View>
                </View>
              </Pressable>
              <View style={styles.line} />

              <Pressable onPress={() => setLinkedAccountOpen(true)}>
                <View style={styles.settingCard}>
                  <View style={styles.cardicon}>
                    <Image
                      source={require("../../assets/images/link.png")}
                      style={{ width: 24, height: 24 }}
                    />
                  </View>
                  <View>
                    <Text style={styles.cardTitle}>Linked Accounts</Text>
                    <Text style={styles.cardSubtitle}>
                      View and manage your linked accounts
                    </Text>
                  </View>
                  <View style={styles.arrowIcon}>
                    <Ionicons name="chevron-forward" size={20} color="#fff" />
                  </View>
                </View>
              </Pressable>
              <View style={styles.line} />

              <Pressable
                onPress={() => router.push("/(accountScreens)/myListings")}
              >
                <View style={styles.settingCard}>
                  <View style={styles.cardicon}>
                    <Image
                      source={require("../../assets/images/listing.png")}
                      style={{ width: 21, height: 15.75 }}
                    />
                  </View>
                  <View>
                    <Text style={styles.cardTitle}>My Listings</Text>
                    <Text style={styles.cardSubtitle}>
                      View and manage your listed pets
                    </Text>
                  </View>
                  <View style={styles.arrowIcon}>
                    <Ionicons name="chevron-forward" size={20} color="#fff" />
                  </View>
                </View>
              </Pressable>
            </View>

            <Text style={styles.sectionHeader}>Support & Legal</Text>
            <View style={styles.cardContainer}>
              <Pressable>
                <View style={styles.settingCard}>
                  <View style={styles.cardicon}>
                    <Image
                      source={require("../../assets/images/help.png")}
                      style={{ width: 21, height: 21 }}
                    />
                  </View>
                  <View>
                    <Text style={styles.cardTitle}>Help Center</Text>
                    <Text style={styles.cardSubtitle}>
                      Browse FAQs and get support
                    </Text>
                  </View>
                  <View style={styles.arrowIcon}>
                    <Ionicons name="chevron-forward" size={20} color="#fff" />
                  </View>
                </View>
              </Pressable>
              <View style={styles.line} />

              <Pressable>
                <View style={styles.settingCard}>
                  <View style={styles.cardicon}>
                    <Image
                      source={require("../../assets/images/policy.png")}
                      style={{ width: 19.99, height: 22.1 }}
                    />
                  </View>
                  <View>
                    <Text style={styles.cardTitle}>Privacy Policy</Text>
                    <Text style={styles.cardSubtitle}>
                      Read to see how we protect your privacy
                    </Text>
                  </View>
                  <View style={styles.arrowIcon}>
                    <Ionicons name="chevron-forward" size={20} color="#fff" />
                  </View>
                </View>
              </Pressable>
              <View style={styles.line} />

              <Pressable>
                <View style={styles.settingCard}>
                  <View style={styles.cardicon}>
                    <Image
                      source={require("../../assets/images/terms.png")}
                      style={{ width: 19, height: 20 }}
                    />
                  </View>
                  <View>
                    <Text style={styles.cardTitle}>Terms & Conditions</Text>
                    <Text style={styles.cardSubtitle}>
                      View our Terms and Conditions for more details
                    </Text>
                  </View>
                  <View style={styles.arrowIcon}>
                    <Ionicons name="chevron-forward" size={20} color="#fff" />
                  </View>
                </View>
              </Pressable>
            </View>

            <View
              style={[
                styles.cardContainer,
                { marginTop: 24, marginBottom: 60 },
              ]}
            >
              <Pressable onPress={() => setLogoutOpen(true)}>
                <View style={styles.settingCard}>
                  <View style={styles.cardicon}>
                    <Image
                      source={require("../../assets/images/logout.png")}
                      style={{ width: 24.01, height: 25 }}
                    />
                  </View>
                  <View>
                    <Text style={styles.cardTitle}>Logout</Text>
                    <Text style={styles.cardSubtitle}>Goodbye for now!</Text>
                  </View>
                  <View style={styles.arrowIcon}>
                    <AntDesign name="logout" size={16} color="#fff" />
                  </View>
                </View>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
      <Modal
        isOpen={preferencesOpen}
        closeModal={() => setPreferencesOpen(false)}
      >
        <Preference closeModal={() => setPreferencesOpen(false)} />
      </Modal>
      <Modal
        isOpen={linkedAccountOpen}
        closeModal={() => setLinkedAccountOpen(false)}
      >
        <LinkedAccount />
      </Modal>
      <Modal isOpen={logoutOpen} closeModal={() => setLogoutOpen(false)}>
        <Logout closeModal={() => setLogoutOpen(false)} />
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
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 14,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center", // Back button left & email right
    alignItems: "center",
    width: "100%",
    marginTop: vs(5),
    marginBottom: vs(20),
  },
  scrollContainer: {
    width: "100%",
    marginBottom: "25%",
    marginTop: 10,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#f0f0f0",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 500,
    marginTop: 24,
  },
  cardContainer: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#f0f0f0",
    marginTop: 8,
  },
  profileTitle: {
    fontSize: 22,
    fontWeight: "500",
  },
  profileSubtitle: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "400",
    color: "#939393",
  },
  arrowIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: 30,
    marginLeft: "auto",
    marginRight: 10,
    backgroundColor: "#C9EFFF",
  },
  settingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingLeft: 10,
    paddingRight: 8,
    marginBottom: 16,
    marginTop: 14,
  },
  cardicon: {
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 48,
    marginRight: 15,
    borderRadius: 50,
    backgroundColor: "#C9EFFF",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: 300,
    color: "#acacac",
    width: 190,
  },
  line: {
    flex: 1,
    height: 1,
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#F0F0F0",
  },
});
