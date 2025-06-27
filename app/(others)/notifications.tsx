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
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { MailOpen02Icon } from "@hugeicons/core-free-icons";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { router } from "expo-router";
import responsive from "@/constants/Responsive";
import { SafeAreaView } from "react-native-safe-area-context";
// Add this interface at the top
interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  petId: string;
  app:string;
}

export default function NotificationScreen() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [notifications, setNotifications] = useState<any[]>([]);

  const [readNotifications, setReadNotifications] = useState<{
    [key: string]: boolean;
  }>({});

  const handlePress = async (notification: any) => {
    const { id, petId ,app} = notification;
    if (petId) {
      router.push(`/petDetail?petId=${petId}`);
    }
    setReadNotifications((prev) => ({ ...prev, [id]: true }));
    try {
      const userId = user?.id;
      if (!userId) return;

      const notifRef = doc(db, "users", userId, "notifications", id);
      await updateDoc(notifRef, { read: true });

      setNotifications((prev) =>
        prev.map((item) => (item.id === id ? { ...item, read: true } : item))
      );

      // Navigate to pet detail screen if petId exists
    } catch (error) {
      console.log("Failed to mark notification as read", error);
    }
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const notificationsRef = collection(
          db,
          "users",
          user.id,
          "notifications"
        );
        const q = query(notificationsRef, orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => {
          const docData = doc.data();
          const timestamp = docData.timestamp?.toDate();

          const formattedTimestamp = timestamp
            ? `${String(timestamp.getDate()).padStart(2, "0")}-${String(
                timestamp.getMonth() + 1
              ).padStart(2, "0")} ${String(timestamp.getHours()).padStart(
                2,
                "0"
              )}:${String(timestamp.getMinutes()).padStart(2, "0")}`
            : "No date";

          return {
            id: doc.id,
            title: docData.title,
            description: docData.description,
            timestamp: formattedTimestamp,
            read: docData.read || false, // Ensure read status is captured
            petId: docData.petId || "",
            app:docData.app || "",
          };
        });

        setNotifications(data);

        // Initialize readNotifications from Firestore data
        const initialReadStatus = data.reduce((acc, item) => {
          acc[item.id] = item.read;
          return acc;
        }, {} as { [key: string]: boolean });

        setReadNotifications(initialReadStatus);
      } catch (error) {
        console.log("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user]);

  const markAllAsRead = async () => {
    try {
      const userId = user?.id;
      if (!userId) return;

      const updates: Promise<void>[] = [];

      const updatedNotifications = notifications.map((item) => {
        if (!item.read) {
          const notifRef = doc(db, "users", userId, "notifications", item.id);
          updates.push(updateDoc(notifRef, { read: true }));
        }
        return { ...item, read: true };
      });

      await Promise.all(updates); // Update all unread notifications in Firestore

      setNotifications(updatedNotifications);

      const allRead = updatedNotifications.reduce((acc, item) => {
        acc[item.id] = true;
        return acc;
      }, {} as { [key: string]: boolean });

      setReadNotifications(allRead);
    } catch (error) {
      console.log("Failed to mark all notifications as read:", error);
    }
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <StatusBar barStyle="dark-content" />

        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ zIndex: 10 }}
          >
            <MaterialIcons name="arrow-back-ios-new" size={16} color="black" />
          </TouchableOpacity>
          <Text style={styles.navText}>Notifications</Text>

          <TouchableOpacity onPress={markAllAsRead}>
            <HugeiconsIcon icon={MailOpen02Icon} size={22} color="black" />
          </TouchableOpacity>
        </View>

        {/* Content Area */}
        <View style={styles.scrollContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2bbfff" />
            </View>
          ) : notifications.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No notifications found</Text>
            </View>
          ) : (
            <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 20,
              alignItems: notifications.length === 0 ? "center" : undefined,
              justifyContent: notifications.length === 0 ? "center" : undefined,
            }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No notifications found</Text>
            }
            renderItem={({ item, index }) => {
              const isRead = item.read || readNotifications[item.id];
              return (
                <View>
                  <Pressable
                    style={styles.notificationItems}
                    onPress={() => handlePress(item)}
                  >
                    <View
                      style={[
                        styles.dot,
                        isRead ? styles.readDot : styles.unreadDot,
                      ]}
                    />
                    <View>
                      <Text
                        style={[styles.title, isRead && styles.readText]}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={[
                          styles.description,
                          isRead && styles.readText,
                        ]}
                      >
                        {item.description}
                      </Text>
                      <Text
                        style={[styles.timestamp, isRead && styles.readText]}
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
            }}
          />
          )}
        </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", // Add these
    left: 0,
    right: 0,
    top: 300,
    bottom: 0,
    backgroundColor: "#fff", // Match background color
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    color: "#888",
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  unreadDot: {
    backgroundColor: "#2bbfff",
  },
  readDot: {
    backgroundColor: "#acacac",
  },
  readText: {
    color: "#acacac",
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
    marginTop: 7,
  },
  title: {
    fontSize: Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    fontWeight: 500,
    marginBottom: 4,
  },
  description: {
    fontSize: Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(9),
    fontWeight: 300,
    lineHeight:  Platform.OS === "ios" ? 12 * 1.5 : 8 * 1.5,
  },
  timestamp: {
    fontSize: Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
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
