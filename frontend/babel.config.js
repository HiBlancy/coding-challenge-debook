module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Reanimated 4 usa el plugin de worklets. Debe ir SIEMPRE el último.
    plugins: ['react-native-worklets/plugin'],
  };
};
