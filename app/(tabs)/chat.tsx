import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  Pressable,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { s, vs, ms } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";

const messages = [
  {
    id: 1,
    name: "The Crazy Pets",
    message:
      "A new pet, Max, has been added. Check him out in the adoption list!",
    time: "2h",
    image: require("../../assets/images/user1.png"),
    isOnline: true,
  },
  {
    id: 2,
    name: "Waqas Ahmed",
    message:
      "I’m interested in adopting your cat. Could you share more details about her?",
    time: "4h",
    image: require("../../assets/images/user2.png"),
    isOnline: true,
  },
  {
    id: 3,
    name: "Faisal Awan",
    message:
      "When can I visit to meet your cat? I’d like to see if she’s a good fit for our family.",
    time: "6h",
    image: require("../../assets/images/user3.png"),
    isOnline: false,
  },
  {
    id: 4,
    name: "Aleysha Amir",
    message: "I will send you Smokie’s vaccination records for his new vet.",
    time: "1d",
    image: require("../../assets/images/user4.png"),
    isOnline: false,
  },
  {
    id: 5,
    name: "James Norris",
    message:
      "Leo has a calm temperament. Would you like to know more about Leo?",
    time: "1d",
    image: require("../../assets/images/user5.png"),
    isOnline: true,
  },
  {
    id: 6,
    name: "Dr. Sara",
    message: "Can I schedule a check-up for Bella next week?",
    time: "1d",
    image: require("../../assets/images/user6.png"),
    isOnline: false,
  },
  {
    id: 7,
    name: "Dr. Asad",
    message: "Luna is recovering well. Make sure she gets plenty of rest.",
    time: "2d",
    image: require("../../assets/images/user7.png"),
    isOnline: true,
  },
  {
    id: 8,
    name: "Dr. Saif",
    message: "Bella’s X-rays are clear. She can resume her regular activities!",
    time: "4d",
    image: require("../../assets/images/user8.png"),
    isOnline: false,
  },
  {
    id: 9,
    name: "Aleysha Amir",
    message: "I will send you Smokie’s vaccination records for his new vet.",
    time: "1d",
    image: require("../../assets/images/user4.png"),
    isOnline: false,
  },
  {
    id: 10,
    name: "James Norris",
    message:
      "Leo has a calm temperament. Would you like to know more about Leo?",
    time: "1d",
    image: require("../../assets/images/user5.png"),
    isOnline: true,
  },
  {
    id: 11,
    name: "Dr. Sara",
    message: "Can I schedule a check-up for Bella next week?",
    time: "1d",
    image: require("../../assets/images/user6.png"),
    isOnline: false,
  },
  {
    id: 12,
    name: "Dr. Asad",
    message: "Luna is recovering well. Make sure she gets plenty of rest.",
    time: "2d",
    image: require("../../assets/images/user7.png"),
    isOnline: true,
  },
  {
    id: 13,
    name: "Dr. Saif",
    message: "Bella’s X-rays are clear. She can resume her regular activities!",
    time: "4d",
    image: require("../../assets/images/user8.png"),
    isOnline: false,
  },
];

export default function InboxScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [readMessage, setReadMessage] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handlePress = (id: number) => {
    setReadMessage((prev) => ({ ...prev, [id]: true }));
  };

  const filteredMessages = messages.filter((msg) =>
    msg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.headerContainer}>
          <TextInput
            placeholder="Search for owners and vets"
            style={styles.searchInput}
            placeholderTextColor="#939393"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <Ionicons name="search" size={ms(19)} style={styles.searchIcon} />
          <Image
            source={require("../../assets/images/avatar.png")}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.header}>Inbox</Text>
        <View style={styles.scrollContainer}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {filteredMessages.map((item) => (
              <Pressable
                key={item.id}
                style={styles.messageItem}
                onPress={() => handlePress(item.id)}
              >
                <View style={styles.imageContainer}>
                  <Image source={item.image} style={styles.users} />
                  <View
                    style={[
                      styles.onlineIndicator,
                      {
                        backgroundColor: item.isOnline ? "#2bbfff" : "#ACACAC",
                      },
                    ]}
                  />
                </View>
                <View style={styles.messageContent}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text
                    style={[
                      styles.messageText,
                      readMessage[item.id] && styles.readMessageText,
                    ]}
                  >
                    {item.message} · {item.time}
                  </Text>
                </View>
              </Pressable>
            ))}
            <View style={styles.noteContainer}>
              <FontAwesome6 name="lock" size={ms(12)} color="#939393" />
              <Text style={styles.note}>
                Your personal messages are{" "}
                <Text style={styles.noteColor}>end-to-end encrypted</Text>
              </Text>
            </View>
          </ScrollView>
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
    // top: 40,
    justifyContent: "flex-start",
    paddingHorizontal: s(20),
  },
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    marginVertical: vs(20),
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchInput: {
    width: "80%",
    height: ms(40),
    fontSize: Platform.OS === "ios" ? ms(15) : ms(12),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    paddingVertical: vs(10),
    paddingLeft: ms(20),
    paddingRight: ms(40),
  },
  searchIcon: {
    position: "absolute",
    right: 85,
    color: "#000",
  },
  avatar: {
    width: ms(40),
    height: ms(40),
    borderRadius: 50,
  },
  scrollContainer: {
    width: "100%",
    marginBottom: Platform.OS === "ios" ? "50%" : "60%",
  },
  header: {
    fontSize: Platform.OS === "ios" ? ms(33) : ms(30),
    fontWeight: "600",
    marginBottom: ms(20),
  },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: ms(22),
  },
  imageContainer: {
    marginRight: ms(12),
    marginLeft: ms(3),
  },
  users: {
    width: ms(40),
    height: ms(40),
    borderRadius: 25,
  },
  onlineIndicator: {
    position: "absolute",
    right: 1,
    bottom: 0,
    width: ms(10),
    height: ms(10),
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  messageContent: {
    width: "82%",
  },
  name: {
    fontWeight: "500",
    fontSize: Platform.OS === "ios" ? ms(15) : ms(12),
  },
  messageText: {
    fontWeight: "400",
    fontSize: Platform.OS === "ios" ? ms(13) : ms(10),
  },
  readMessageText: {
    color: "#939393",
  },
  noteContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: ms(50),
  },
  note: {
    fontSize: Platform.OS === "ios" ? ms(13) : ms(10),
    fontWeight: "400",
    color: "#939393",
  },
  noteColor: {
    fontSize: Platform.OS === "ios" ? ms(13) : ms(10),
    fontWeight: "600",
    color: "#2BBFFF",
  },
});
