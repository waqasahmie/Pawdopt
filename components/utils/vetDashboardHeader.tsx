import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  Notification03Icon,
} from "@hugeicons/core-free-icons";
import { router } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import responsive from "@/constants/Responsive";

const CustomHeader = () => {

  const { user } = useUser();
  useEffect(() => {
    const STORAGE_KEY = `vetName:${user?.id}`;

    const loadCachedName = async () => {
      if (!user) return;
      try {
        const cached = await AsyncStorage.getItem(STORAGE_KEY);
        if (cached) {
          setName(cached);
          
        }
      } catch (e) {
        console.error("Failed to read vetName from storage", e);
      }
    };

    const fetchAndCacheName = async () => {
      if (!user) return;
      try {
        const vetDoc = await getDoc(doc(db, "users", user.id));
        if (vetDoc.exists()) {
          const data = vetDoc.data();
          const title = data.title ?? "";
          const first = data.firstName ?? "";
          const last  = data.lastName ?? "";
          const fullName = `${title} ${first}${last ? ` ${last}` : ""}`.trim();

          setName(fullName);
          await AsyncStorage.setItem(STORAGE_KEY, fullName);
        }
      } catch (e) {
        console.error("Error fetching vet name:", e);
      } 
    };

    loadCachedName().then(fetchAndCacheName);
  }, [user]);
  const [name, setName] = useState<string | null>(null);
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Hello, </Text>
          <Text style={styles.username}>{name}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <HugeiconsIcon
          icon={Notification03Icon}
          size={22}
          onPress={() => {
            router.push("/(others)/notifications");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 50 : 20,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    gap: 10,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  greeting: {
    flexDirection: "column",
  },
  greetingText: {
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    fontWeight: "400",
    color: "#ACACAC",
  },
  username: {
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    fontWeight: "400",
  },
  paw: {
    width: 20,
    height: 20,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});

export default CustomHeader;