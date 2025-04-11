import { Image } from "react-native";

export const icon = {
  // index: (props: any) => <Image source={require("../assets/images/Home.png")} style={[{ width: 22, height: 22, resizeMode: "contain" }, props.style]} />,
  // index: (props: any) => <FontAwesome name="home" size={24}  {...props}/>,
  index: ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Image source={require("../assets/images/Black-Home.png")} style={{ tintColor: color, width: 22, height: 22 }} />
    ) : (
      <Image source={require("../assets/images/White-Home.png")} style={{ tintColor: color, width: 22, height: 22 }} />
    ),
  location: ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Image source={require("../assets/images/Black-Location.png")} style={{ tintColor: color, width: 19, height: 22 }} />
    ) : (
      <Image source={require("../assets/images/White-Location.png")} style={{ tintColor: color, width: 19, height: 22 }} />
    ),
  favorite: ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Image source={require("../assets/images/Black-Favorite.png")} style={{ tintColor: color, width: 24, height: 21 }} />
    ) : (
      <Image source={require("../assets/images/White-Favorite.png")} style={{ tintColor: color, width: 24, height: 21 }} />
    ),
  chat: ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Image source={require("../assets/images/Black-Chat.png")} style={{ tintColor: color, width: 22, height: 22 }} />
    ) : (
      <Image source={require("../assets/images/White-Chat.png")} style={{ tintColor: color, width: 22, height: 22 }} />
    ),
  account: ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Image source={require("../assets/images/Black-User.png")} style={{ tintColor: color, width: 19, height: 21 }} />
    ) : (
     <Image source={require("../assets/images/White-User.png")} style={{ tintColor: color, width: 19, height: 21 }} />
    ),
};