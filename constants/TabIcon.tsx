import { HugeiconsIcon } from "@hugeicons/react-native";
import { Home04Icon, FavouriteIcon, Comment02Icon, UserIcon, ChatBotIcon } from "@hugeicons/core-free-icons"; // Replace with your actual icon imports

export const icon = {
  index: ({ focused }: { focused: boolean }) => (
    <HugeiconsIcon icon={Home04Icon} fill={focused ? "black" : "white"} size={24} color={focused ? "black" : "white"}/>
  ),
  location: ({ focused }: { focused: boolean }) => (
    <HugeiconsIcon icon={ChatBotIcon} fill={focused ? "black" : "white"} size={24} color={focused ? "black" : "white"}/>
  ),
  favorite: ({ focused }: { focused: boolean }) => (
    <HugeiconsIcon icon={FavouriteIcon} fill={focused ? "black" : "white"} size={24} color={focused ? "black" : "white"}/>
  ),
  chat: ({ focused }: { focused: boolean }) => (
    <HugeiconsIcon icon={Comment02Icon} fill={focused ? "black" : "white"} size={24} color={focused ? "black" : "white"}/>
  ),
  account: ({ focused }: { focused: boolean }) => (
    <HugeiconsIcon icon={UserIcon} fill={focused ? "black" : "white"} size={24} color={focused ? "black" : "white"}/>
  ),
};
