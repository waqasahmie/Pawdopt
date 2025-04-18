import { HugeiconsIcon } from "@hugeicons/react-native";
import { Home04Icon, Comment02Icon, UserIcon, Calendar02Icon, StarIcon } from "@hugeicons/core-free-icons"; // Replace with your actual icon imports

export const Veticon = {
  index: ({ focused }: { focused: boolean }) => (
    <HugeiconsIcon icon={Home04Icon} fill={focused ? "black" : "white"} size={24} color={focused ? "black" : "white"}/>
  ),
  schedule: ({ focused }: { focused: boolean }) => (
    <HugeiconsIcon icon={Calendar02Icon} fill={focused ? "black" : "white"} size={24} color={focused ? "black" : "white"}/>
  ),
  reviews: ({ focused }: { focused: boolean }) => (
    <HugeiconsIcon icon={StarIcon} fill={focused ? "black" : "white"} size={24} color={focused ? "black" : "white"}/>
  ),
  chat: ({ focused }: { focused: boolean }) => (
    <HugeiconsIcon icon={Comment02Icon} fill={focused ? "black" : "white"} size={24} color={focused ? "black" : "white"}/>
  ),
  account: ({ focused }: { focused: boolean }) => (
    <HugeiconsIcon icon={UserIcon} fill={focused ? "black" : "white"} size={24} color={focused ? "black" : "white"}/>
  ),
};
