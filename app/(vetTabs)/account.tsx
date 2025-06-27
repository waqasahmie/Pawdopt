import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  Platform,
  FlatList,
} from "react-native";
import { vs } from "react-native-size-matters";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal } from "@/components/utils/modal";
import { Logout } from "@/components/utils/logout";
import { Preference } from "@/components/utils/preference";
import { LinkedAccount } from "@/components/utils/linkedAccounts";
import { router } from "expo-router";
import { useAppContext } from "@/hooks/AppContext";
import { useAuth, useUser } from "@clerk/clerk-expo";
import responsive from "@/constants/Responsive";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export default function VetAccountScreen() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { user } = useUser();
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [linkedAccountOpen, setLinkedAccountOpen] = useState(false);
  const { vetData, updateVetData } = useAppContext();
  const { signOut } = useAuth();
  const handleLogout = async () => {
    try {
      updateVetData("firstName", "");
      updateVetData("lastName", "");
      updateVetData("email", "");
      updateVetData("phoneNumber", "");
      updateVetData("gender", "");
      updateVetData("cnic", "");
      updateVetData("cnicFront", "");
      updateVetData("cnicBack", "");
      updateVetData("title", "");
      updateVetData("clinicName", "");
      updateVetData("startTime", "");
      updateVetData("endTime", "");
      updateVetData("license", "");
      updateVetData("email", "");
      await signOut();
      if (user?.id) {
        await updateDoc(doc(db, "users", user?.id), {
          loggedIn: false,
        });
      }
      router.replace("/(onboarding)/getStarted");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const settingsData = [
    {
      type: "section",
      title: "Account Management",
      data: [
        {
          title: "Notification & Privacy",
          subtitle: "Enable or disable your notifications",
          icon: require("../../assets/images/notification.png"),
          iconSize: { width: 24, height: 23.04 },
          onPress: () => router.push("/(others)/notificationsSettings"),
        },
        {
          title: "Account & Security",
          subtitle: "Manage account and security settings",
          icon: require("../../assets/images/security.png"),
          iconSize: { width: 21.45, height: 16.01 },
          onPress: () => router.push("/(others)/securitySettings"),
        },
      ],
    },
    {
      type: "section",
      title: "Support & Legal",
      data: [
        {
          title: "Help Center",
          subtitle: "Browse FAQs and get support",
          icon: require("../../assets/images/help.png"),
          iconSize: { width: 21, height: 21 },
          onPress: () => {},
        },
        {
          title: "Privacy Policy",
          subtitle: "Read to see how we protect your privacy",
          icon: require("../../assets/images/policy.png"),
          iconSize: { width: 19.99, height: 22.1 },
          onPress: () => {},
        },
        {
          title: "Terms & Conditions",
          subtitle: "View our Terms and Conditions for more details",
          icon: require("../../assets/images/terms.png"),
          iconSize: { width: 19, height: 20 },
          onPress: () => {},
        },
      ],
    },
  ];

  const renderItem = ({ item }: { item: any }) => {
    if (item.type === "section") {
      return (
        <>
          {item.title ? (
            <Text style={styles.sectionHeader}>{item.title}</Text>
          ) : null}
          <View style={styles.cardContainer}>
            {item.data.map((setting: any, idx: number) => (
              <React.Fragment key={idx}>
                <Pressable onPress={setting.onPress}>
                  <View style={styles.settingCard}>
                    <View style={styles.cardicon}>
                      <Image
                        source={setting.icon}
                        style={{
                          width: setting.iconSize?.width,
                          height: setting.iconSize?.height,
                        }}
                      />
                    </View>
                    <View>
                      <Text style={styles.cardTitle}>{setting.title}</Text>
                      <Text style={styles.cardSubtitle}>
                        {setting.subtitle}
                      </Text>
                    </View>
                    <View style={styles.arrowIcon}>
                      {setting.isLogout ? (
                        <AntDesign name="logout" size={16} color="#fff" />
                      ) : (
                        <Ionicons
                          name="chevron-forward"
                          size={20}
                          color="#fff"
                        />
                      )}
                    </View>
                  </View>
                </Pressable>
                {idx < item.data.length - 1 && <View style={styles.line} />}
              </React.Fragment>
            ))}
          </View>
        </>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.headerContainer}>
          <Text style={{ fontSize: 22, fontWeight: 500 }}>
            Account & Settings
          </Text>
        </View>
        <FlatList
          data={settingsData}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
          ListHeaderComponent={
            <>
              {/* Profile Section */}
              <Pressable
                style={styles.profileCard}
                onPress={() => router.push("/(others)/profileScreen")}
              >
                <Image
                  source={
                    vetData.profilePicUrl
                      ? { uri: vetData.profilePicUrl }
                      : require("../../assets/images/avatar.png")
                  }
                  style={styles.avatar}
                />
                <View>
                  <Text style={styles.profileTitle}>
                    {vetData.title} {vetData.firstName}{" "}
                    {vetData?.lastName ?? ""}
                  </Text>
                  <Text style={styles.profileSubtitle}>{vetData.email}</Text>
                </View>
                <View style={styles.arrowIcon}>
                  <Ionicons name="chevron-forward" size={20} color="#fff" />
                </View>
              </Pressable>
            </>
          }
          ListFooterComponent={
            <>
              <View
                style={[
                  styles.cardContainer,
                  { marginTop: 24, marginBottom: 24 },
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
            </>
          }
        />
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
        <Logout
          closeModal={() => setLogoutOpen(false)}
          onConfirmLogout={handleLogout}
        />
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    paddingTop: Platform.OS === "ios" ? 20 : 20,
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
  title: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
    fontWeight: 500,
  },
  sectionHeader: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
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
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(21) : responsive.fontSize(18),
    fontWeight: "500",
  },
  profileSubtitle: {
    marginTop: 5,
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
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
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    fontWeight: "500",
  },
  cardSubtitle: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
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
