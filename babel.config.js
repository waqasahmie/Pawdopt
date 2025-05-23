module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "react-native-reanimated/plugin", // must always be last
        {
          alias: {
            "@": "./", // Allows imports like "@/components/...", "@/hooks/..."
          },
        },
      ],
    ],
  };
};
