import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Platform,
  Animated,
  TouchableOpacity,
} from "react-native";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  Notification03Icon,
  Search01Icon,
  Stethoscope02Icon,
} from "@hugeicons/core-free-icons";
import { router } from "expo-router";
import { Easing } from "react-native-reanimated";
import { useUser } from "@clerk/clerk-expo";
import { useAppContext } from "@/hooks/AppContext";
import responsive from "@/constants/Responsive";

const CustomHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUser();
  const exploreTextTranslateX = useRef(new Animated.Value(0)).current;
  const emailUsername =
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] || "there";
  const { userData } = useAppContext();
  const firstName = userData?.firstName ?? "there";

  useEffect(() => {
    const shake = Animated.loop(
      Animated.sequence([
        Animated.timing(exploreTextTranslateX, {
          toValue: -3,
          duration: 80,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(exploreTextTranslateX, {
          toValue: 3,
          duration: 80,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(exploreTextTranslateX, {
          toValue: -2,
          duration: 70,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(exploreTextTranslateX, {
          toValue: 2,
          duration: 70,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(exploreTextTranslateX, {
          toValue: 0,
          duration: 60,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.delay(500), // pause before looping again
      ])
    );

    shake.start();

    return () => shake.stop();
  }, []);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Hey, </Text>
          <Text style={styles.username}>{firstName}!</Text>
        </View>
        <Image
          source={require("../../assets/images/Pawprint.png")}
          style={styles.paw}
        />
      </View>
      <View style={styles.centerSection}>
        <TouchableOpacity onPress={() => router.push("./(others)/search")}>
          <TextInput
            placeholder="Persian Cat"
            returnKeyType="search"
            style={styles.searchInput}
            placeholderTextColor="#939393"
            value={searchTerm}
            onChangeText={setSearchTerm}
            editable={false}
          />
          <View style={styles.searchIconContainer}>
            <HugeiconsIcon icon={Search01Icon} size={18} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.rightSection}>
        <HugeiconsIcon
          icon={Stethoscope02Icon}
          size={22}
          onPress={() => router.push("./(vet)")}
        />
        <Animated.Text
          style={[
            styles.exploreText,
            {
              transform: [{ translateX: exploreTextTranslateX }],
            },
          ]}
        >
          Explore Vet
        </Animated.Text>

        <HugeiconsIcon
          icon={Notification03Icon}
          size={22}
          onPress={() => router.push("./(others)/notifications")}
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
    gap: Platform.OS === "ios" ? 6 : 0,

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
  centerSection: {
    flex: 1,
    position: "relative",
    marginHorizontal: 10,
  },
  searchIconContainer: {
    position: "absolute",
    right: 14,
    top: 10,
  },
  searchInput: {
    height: 40,
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 40,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  exploreText: {
    fontSize:
    Platform.OS === "ios" ? responsive.fontSize(7) : responsive.fontSize(6),
    backgroundColor: "#2bbfff",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    color: "#ffffff",
    fontWeight: "600",
    position: "absolute",
    right: 18, 
    top: 30, 
    alignSelf: "center",
  },
});

export default CustomHeader;
