// components/CustomHeader.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Platform,
  Animated,
} from "react-native";
import { ms, vs } from "react-native-size-matters"; // assuming you're using this
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  Notification03Icon,
  Search01Icon,
  Stethoscope02Icon,
} from "@hugeicons/core-free-icons";
import { router } from "expo-router";
import { Easing } from "react-native-reanimated";

const CustomHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const exploreTextTranslateX = useRef(new Animated.Value(0)).current;
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

    return () => shake.stop(); // cleanup on unmount
  }, []);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Hey, </Text>
          <Text style={styles.username}>Waqas!</Text>
        </View>
        <Image
          source={require("../../assets/images/Pawprint.png")}
          style={styles.paw}
        />
      </View>

      <View style={styles.centerSection}>
        <TextInput
          placeholder="Persian Cat"
          returnKeyType="search"
          style={styles.searchInput}
          placeholderTextColor="#939393"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <View style={styles.searchIconContainer}>
          <HugeiconsIcon
            icon={Search01Icon}
            size={ms(19)}
            style={styles.searchIcon}
          />
        </View>
      </View>

      <View style={styles.rightSection}>
        <HugeiconsIcon
          icon={Stethoscope02Icon}
          size={ms(22)}
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
          size={ms(22)}
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
    paddingTop: Platform.OS === "ios" ? 50 : 40,
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
    fontSize: 14,
    fontWeight: "400",
    color: "#ACACAC",
  },
  username: {
    fontSize: 16,
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
    right: 12,
    top: 10,
  },
  searchInput: {
    height: ms(40),
    fontSize: Platform.OS === "ios" ? ms(15) : ms(13),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    paddingVertical: vs(10),
    paddingLeft: ms(20),
    paddingRight: ms(40),
  },
  searchIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  exploreText: {
    fontSize: 6,
    backgroundColor: "#2bbfff",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: "#444",
    position: "absolute",
    right: 18, // wherever you want
    top: 30, // wherever you want
    alignSelf: "center",
  },
});

export default CustomHeader;
