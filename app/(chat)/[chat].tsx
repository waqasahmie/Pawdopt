import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { db, rtdb } from "../../config/firebaseConfig";
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { KeyboardAvoidingView, Platform } from "react-native";
import { updateDoc } from "firebase/firestore";
import { ref, get, onValue } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { TouchableOpacity } from "react-native";
import { useAppContext } from "@/hooks/AppContext";
import { LayoutAnimation, UIManager } from "react-native";
import * as Animatable from "react-native-animatable";
import { LegendList } from "@legendapp/list";
import { format } from "date-fns";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "@/config/uploadImage";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import responsive from "@/constants/Responsive";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  Image02Icon,
  ImageAdd02Icon,
  SentIcon,
} from "@hugeicons/core-free-icons";
import { useNavigation } from "@react-navigation/native";
import { center } from "@shopify/react-native-skia";

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: any;
  imageUrl?: string;
}

interface UserData {
  firstName: string;
  lastName?: string; // Make optional
  title?: string; // Make optional
  profilePicUrl: string;
}

const ChatScreen = () => {
  const navigation = useNavigation();
  const { chat: chatid } = useLocalSearchParams<{ chat: string }>();
  const { user } = useUser();
  const currentUserId = user?.id;
  const [chatId, setChatId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [ownerData, setOwnerData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [otherUserStatus, setOtherUserStatus] = useState<string>("Offline");
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const flatListRef = React.useRef<FlatList>(null);
  const [messagesReady, setMessagesReady] = useState(false);

  const { userData } = useAppContext();

  const formatDisplayName = (user: UserData | null): string => {
    if (!user) return "Unknown";

    const parts: string[] = [];
    if (user.title) parts.push(user.title);
    parts.push(user.firstName);
    if (user.lastName) parts.push(user.lastName);

    return parts.join(" ");
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental?.(true);
    }
  }, []);
  const [hasScrolledInitially, setHasScrolledInitially] = useState(false);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      if (!hasScrolledInitially) {
        flatListRef.current.scrollToEnd({ animated: false });
        setHasScrolledInitially(true);
      } else {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    }
  }, [messages.length]);

  useEffect(() => {
    if (chatid) {
      setChatId(chatid);
    }
  }, [chatid]);

  useEffect(() => {
    const initializeChat = async () => {
      if (!chatid) return;

      setChatId(chatid);
      try {
        const chatRef = doc(db, "chats", chatid);
        const chatSnap = await getDoc(chatRef);
        const parts = chatid.split("_");
        const userId1 = parts.slice(0, 2).join("_");
        const userId2 = parts.slice(2).join("_");
        if (!chatSnap.exists()) {
          await setDoc(chatRef, {
            participants: [userId1, userId2],
            timestamp: serverTimestamp(),
          });
        }
      } catch (error) {
        console.log("Error initializing chat:", error);
      }
    };

    initializeChat();
  }, [currentUserId, chatid]);

  useEffect(() => {
    const fetchOwnerData = async () => {
      if (!chatid) return;
      const parts = chatid.split("_");
      const userId1 = parts.slice(0, 2).join("_");
      const userId2 = parts.slice(2).join("_");

      let otherUserId;
      if (userId1 === user?.id) {
        otherUserId = userId2;
      } else {
        otherUserId = userId1;
      }
      const cachedData = await AsyncStorage.getItem(`user_${otherUserId}`);

      if (cachedData) {
        setOwnerData(JSON.parse(cachedData));
      }
      try {
        const userRef = doc(db, "users", otherUserId);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as UserData;
          setOwnerData(data);
          await AsyncStorage.setItem(
            `user_${otherUserId}`,
            JSON.stringify(data)
          );
        }

        const userStatusRef = ref(rtdb, `/status/${otherUserId}`);
        const userStatusSnap = await get(userStatusRef);

        if (userStatusSnap.exists()) {
          const status = userStatusSnap.val();
          if (status?.online) {
            setOtherUserStatus("Online");
          } else {
            setOtherUserStatus("Offline");
          }
        } else {
          setOtherUserStatus("Offline");
        }
      } catch (error) {
        console.log("Error fetching owner data:", error);
      }
    };

    fetchOwnerData();
  }, [chatid, user?.id]);

  useEffect(() => {
    if (!chatid) return;

    const parts = chatid.split("_");
    const userId1 = parts.slice(0, 2).join("_");
    const userId2 = parts.slice(2).join("_");

    let otherUserId;
    if (userId1 === user?.id) {
      otherUserId = userId2;
    } else {
      otherUserId = userId1;
    }

    const statusRef = ref(rtdb, `/status/${otherUserId}/online`);

    const unsubscribe = onValue(statusRef, (snapshot) => {
      const status = snapshot.val();
      setIsOnline(status);
    });

    return () => unsubscribe();
  }, [chatid]);
  useEffect(() => {
    if (!chatid) return;

    const messagesRef = collection(db, `chats/${chatid}/messages`);
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData: Message[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          text: data.text || "",
          senderId: data.senderId || "unknown",
          timestamp: data.timestamp?.toDate() || new Date(),
          imageUrl: data.imageUrl,
        };
      });
      setMessages(messagesData);
      setLoading(false);
      setMessagesReady(true);

      snapshot.docs.forEach(async (docSnap) => {
        const msgData = docSnap.data();
        const docRef = docSnap.ref;

        if (
          msgData.senderId !== currentUserId &&
          (!msgData.seenBy || !msgData.seenBy.includes(currentUserId))
        ) {
          await updateDoc(docRef, {
            seenBy: [...(msgData.seenBy || []), currentUserId],
          });
        }
      });
    });

    return () => unsubscribe();
  }, [chatid]);

  const sendMessage = async (imageUri?: string) => {
    if (!text.trim() && !imageUri) return;
    if (!chatId || !currentUserId) return;

    const messageText = text.trim();
    setText("");

    try {
      let imageUrl;
      if (imageUri) {
        const fileName = `messages/${Date.now()}-message.jpg`;

        imageUrl = await uploadImage("user-documents", fileName, imageUri);
      }

      const messagesRef = collection(db, `chats/${chatId}/messages`);
      const newMessage = {
        text: messageText || "",
        imageUrl: imageUrl || "",
        senderId: currentUserId,
        timestamp: serverTimestamp(),
        seenBy: [currentUserId],
      };

      // Add the new message to Firestore
      await addDoc(messagesRef, newMessage);

      const chatRef = doc(db, "chats", chatId);
      await updateDoc(chatRef, {
        lastMessage: messageText || "Image",
        timestamp: serverTimestamp(),
      });

      const parts = chatId.split("_");
      const userId1 = parts.slice(0, 2).join("_");
      const userId2 = parts.slice(2).join("_");
      const otherUserId = currentUserId === userId1 ? userId2 : userId1;

      const otherUserRef = doc(db, "users", otherUserId);
      const otherUserSnap = await getDoc(otherUserRef);
      const token = otherUserSnap.data()?.expoPushToken;
      const isLoggedIn = otherUserSnap.data()?.loggedIn;

      if (token && isLoggedIn) {
        const response = await fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: token,
            sound: "default",
            title: userData?.firstName || "New message",
            body: messageText || "Sent an Image",
            data: { chatId },
          }),
        });

        const data = await response.json();
        if (data.errors) {
          console.log("Error sending push notification:", data.errors);
        }
      }
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2BBFFF" />
      </View>
    );
  }

  const handleSend = async () => {
    if (text.trim()) {
      await sendMessage();
    } else {
      pickAndSendImage();
    }
  };

  const pickAndSendImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      aspect: [4, 4],
    });

    if (!result.canceled && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      await sendMessage(imageUri);
    }
  };
  const pickImageButton = () => {
    return (
      <TouchableOpacity onPress={pickAndSendImage}>
        <Ionicons name="image" size={30} color="black" />
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/images/chatBackground.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          {/* Header */}

          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ zIndex: 10 }}
            >
              <MaterialIcons
                name="arrow-back-ios-new"
                size={16}
                color="black"
              />
            </TouchableOpacity>
            <View style={styles.profilePicWrapper}>
              <Image
                source={
                  !ownerData?.profilePicUrl
                    ? require("../../assets/images/avatar.png")
                    : { uri: ownerData.profilePicUrl }
                }
                style={styles.profilePic}
              />
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor: isOnline === true ? "#2BBFFF" : "#A9A9A9",
                  },
                ]}
              />
            </View>
            <Text style={styles.name}>{formatDisplayName(ownerData)}</Text>
          </View>

          {/* Messages List */}
          <View style={styles.scrollContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {messagesReady ? (
              <LegendList
                data={messages}
                keyExtractor={(item) => item.id}
                estimatedItemSize={8}
                alignItemsAtEnd
                maintainScrollAtEnd
                maintainVisibleContentPosition
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.messagesContainer}
                renderItem={({
                  item,
                  index,
                }: {
                  item: Message;
                  index: number;
                }) => {
                  const getDate = (
                    timestamp: string | undefined
                  ): Date | null => {
                    return timestamp ? new Date(timestamp) : null;
                  };

                  const formatDisplayDate = (
                    date: Date | null
                  ): string | null => {
                    if (!date) return null;

                    const today = new Date();
                    const yesterday = new Date();
                    yesterday.setDate(today.getDate() - 1);

                    const isSameDay = (d1: Date, d2: Date): boolean =>
                      d1.getDate() === d2.getDate() &&
                      d1.getMonth() === d2.getMonth() &&
                      d1.getFullYear() === d2.getFullYear();

                    if (isSameDay(date, today)) return "Today";
                    if (isSameDay(date, yesterday)) return "Yesterday";

                    const diffInDays =
                      (today.getTime() - date.getTime()) /
                      (1000 * 60 * 60 * 24);

                    if (diffInDays < 7) {
                      return date.toLocaleDateString("en-US", {
                        weekday: "long",
                      });
                    }

                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  };

                  const currentDate = formatDisplayDate(
                    getDate(item.timestamp)
                  );
                  const prevDate =
                    index > 0
                      ? formatDisplayDate(
                          getDate(messages[index - 1]?.timestamp)
                        )
                      : null;
                  const showDate = currentDate !== prevDate;

                  return (
                    <>
                      {showDate && currentDate && (
                        <View style={styles.dateSeparator}>
                          <Text style={styles.dateText}>{currentDate}</Text>
                        </View>
                      )}

                      <Animatable.View animation="fadeInUp" duration={100}>
                        <View
                          style={[
                            styles.messageBubble,
                            item.senderId === currentUserId
                              ? styles.sentMessage
                              : styles.receivedMessage,
                          ]}
                        >
                          {item.imageUrl && (
                            <Image
                              source={{ uri: item.imageUrl }}
                              style={styles.messageImage}
                            />
                          )}
                          {item.text ? (
                            <Text style={styles.messageText}>{item.text}</Text>
                          ) : null}
                          <View style={styles.timestampContainer}>
                            <Text
                              style={
                                item.senderId === currentUserId
                                  ? styles.sendTimestamp
                                  : styles.recTimestamp
                              }
                            >
                              {getDate(item.timestamp)?.toLocaleTimeString([], {
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                            </Text>
                          </View>
                        </View>
                      </Animatable.View>
                    </>
                  );
                }}
              />
            ) : (
              <ActivityIndicator size="small" color="#2BBFFF" />
            )}
            </TouchableWithoutFeedback>
          </View>
        </View>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TouchableOpacity
              onPress={pickAndSendImage}
              style={styles.iconButton}
            >
              <HugeiconsIcon
                icon={ImageAdd02Icon}
                size={24}
                color="#2bbfff"
                strokeWidth={1.5}
              />
            </TouchableOpacity>

            <View style={styles.textInputWrapper}>
              <TextInput
                style={styles.input}
                value={text}
                onChangeText={setText}
                placeholder="Type a message"
                placeholderTextColor="#999"
                multiline
              />
            </View>
          </View>
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <View style={styles.sendIcon}>
              <HugeiconsIcon
                icon={SentIcon}
                size={26}
                color="#fff"
                strokeWidth={1.8}
              />
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10,
    paddingTop: Platform.OS === "ios" ? 50 : 10,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    marginBottom: Platform.OS === "ios" ? 120 : 75,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profilePicWrapper: {
    position: "relative",
    width: 50,
    height: 50,
    marginRight: 12,
    marginLeft: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  statusDot: {
    position: "absolute",
    bottom: 2,
    right: 4,
    width: 14,
    height: 14,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: "#A9A9A9",
    borderColor: "#fff",
  },
  name: {
    top: 2,
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(17) : responsive.fontSize(14),
    fontWeight: "600",
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    flexDirection: "column-reverse",
    paddingHorizontal: 16,
  },
  status: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(13) : responsive.fontSize(11),
    color: "#2BBFFF",
    marginTop: 4,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 18,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#2BBFFF",
  },
  receivedMessage: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    color: "#333",
    fontFamily: "Roboto",
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 8,
    marginHorizontal: 22,
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    backgroundColor: "#fff",
    borderRadius: 30,
    width: "90%",
  },
  textInputWrapper: {
    flex: 1,
    width: "85%",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 10 : 6,
    minHeight: 36,
  },
  input: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(15) : responsive.fontSize(13),
    color: "#333",
    padding: 0,
    margin: 0,
    lineHeight: 20,
    minHeight: 28,
    maxHeight: 100,
  },

  iconButton: {
    padding: 6,
    paddingLeft: 8,
  },

  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  overlay: {
    flex: 1,
    padding: 16,
  },
  text: {
    color: "#fff",
  },
  timestampContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 4,
  },
  sendTimestamp: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(9),
    color: "#fff",
    alignSelf: "flex-end",
    fontStyle: "italic",
  },
  recTimestamp: {
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(9),
    color: "#2bbfff",
    alignSelf: "flex-end",
    fontStyle: "italic",
  },
  sendButton: {
    backgroundColor: "#2BBFFF",
    borderRadius: 50,
    padding: 10,
  },
  sendIcon: {
    alignSelf: "center",
    right: 1,
    top: 1,
  },
  messagesWrapper: {
    flex: 1,
    marginBottom: 10,
  },
  dateSeparator: {
    alignItems: "center",
    marginVertical: 10,
  },
  dateText: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize:
      Platform.OS === "ios" ? responsive.fontSize(11) : responsive.fontSize(9),
    color: "#333",
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: Platform.OS === "ios" ? -23 : -25,
    marginTop: -8,
    marginHorizontal: -8,
  },
});

export default ChatScreen;
