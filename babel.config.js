module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./", // Allows imports like "@/components/...", "@/hooks/..."
          },
        },
      ],
      "react-native-reanimated/plugin", // must always be last
    ],
  };
};