import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { MailOpen02Icon } from "@hugeicons/core-free-icons";

export default function NotificationScreen() {
  const navigation = useNavigation();

  const [readNotifications, setReadNotifications] = useState<{
    [key: string]: boolean;
  }>({});

  const handlePress = (id: string) => {
    setReadNotifications((prev) => ({ ...prev, [id]: true }));
  };

  const notifications = [
    {
      id: "1",
      title: "New device login reminder\n",
      description:
        "We noticed that your Pawdopt account aleyshaamir@gmail.com was logged in on a new device on 01/08/25, 10:30 PM. To ensure the security of your account, we send you this notification as a reminder.\nLogin details:\n• Device type: Android\n• Login time: 08/01/25, 7:06 PM\nIf this login was you, please ignore this notification.\n",
      timestamp: "08-01 19:06",
    },
    {
      id: "2",
      title: "One-time verification code.\n",
      description:
        "You requested a verification code to link your account.\nVerification code: 987654\nIf you didn’t request this, please contact support immediately.\n",
      timestamp: "20-12 2:30",
    },
    {
      id: "3",
      title: "Upcoming appointment reminder\n",
      description:
        "You have an appointment scheduled with Dr. John Smith on 08/12/25, 05:06 PM.\nLocation: HealthCare Center, Block A.\nPlease arrive 10 minutes early.\n",
      timestamp: "08-12 17:06",
    },
    {
      id: "4",
      title: "New pet alert in your area!\n",
      description:
        "A Labrador Retriever is available for adoption near your location!\nDistance: 2.5 km\nCheck it out on the Pawdopt app.\n",
      timestamp: "15-12 12:09",
    },
    {
      id: "5",
      title: "Updated map details available.\n",
      description:
        "New vet clinics and shelters have been added to the map. Open the app to explore updated locations near you.\n",
      timestamp: "28-11 20:02",
    },
    {
      id: "6",
      title: "Password successfully updated\n",
      description:
        "You have successfully updated your Pawdopt account password on 28/11/25, 10:06 PM.\nIf you did not make this change, please reset your password immediately.\n",
      timestamp: "28-11 22:06",
    },
    {
      id: "7",
      title: "Adoption request approved\n",
      description:
        "Congratulations! Your request to adopt Bella (Golden Retriever) has been approved.\nPlease contact the shelter within 3 days to complete the adoption process.\n",
      timestamp: "03-11 11:16",
    },
    {
      id: "8",
      title: "You've arrived at your destination\n",
      description:
        "Welcome to City Vet Clinic! Tap to check in or navigate back using Pawdopt.\n",
      timestamp: "28-10 14:26",
    },
    {
      id: "9",
      title: "Volunteer with us!\n",
      description:
        "We’re looking for volunteers for our upcoming adoption drive on 22/10/25. Sign up in the app to join.\n",
      timestamp: "22-10 13:26",
    },
  ];

  return (
    <View style={styles.container}>
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
          <Text style={styles.navText}>Notifications</Text>

          <TouchableOpacity
            onPress={() => {
              const allRead = notifications.reduce((acc, item) => {
                acc[item.id] = true;
                return acc;
              }, {} as { [key: string]: boolean });
              setReadNotifications(allRead);
            }}
          >
            <HugeiconsIcon icon={MailOpen02Icon} size={22} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.scrollContainer}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {notifications.map((item, index) => {
              const isRead = readNotifications[item.id];
              return (
                <View key={item.id}>
                  <Pressable
                    style={styles.notificationItems}
                    onPress={() => handlePress(item.id)}
                  >
                    <View
                      style={[
                        styles.dot,
                        isRead && { backgroundColor: "#acacac" },
                      ]}
                    />
                    <View>
                      <Text
                        style={[styles.title, isRead && { color: "#acacac" }]}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={[
                          styles.description,
                          isRead && { color: "#acacac" },
                        ]}
                      >
                        {item.description}
                      </Text>
                      <Text
                        style={[
                          styles.timestamp,
                          isRead && { color: "#acacac" },
                        ]}
                      >
                        {item.timestamp}
                      </Text>
                    </View>
                  </Pressable>
                  {index !== notifications.length - 1 && (
                    <View style={styles.line} />
                  )}
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
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
    justifyContent: "space-between",
    width: "100%",
    marginTop: Platform.OS === "ios" ? 50 : 20,
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
    marginBottom: "25%",
    marginTop: 10,
  },
  notificationItems: {
    flexDirection: "row",
    paddingVertical: 14,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: "#2bbfff",
    marginRight: 12,
    marginTop: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    fontWeight: 300,
    lineHeight: 12 * 1.5,
  },
  timestamp: {
    fontSize: 14,
    fontWeight: 300,
    marginTop: 4,
  },
  line: {
    flex: 1,
    height: 1,
    width: "100%",
    backgroundColor: "#F0F0F0",
  },
});
