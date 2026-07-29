import { Image } from 'expo-image';
import { useState } from 'react';
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '@/theme/tokens';

function initialsFromName(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

/** Avatar circular con fallback a iniciales si la URL falla. */
export function Avatar({
  uri,
  name,
  size,
  style,
}: {
  uri: string;
  name: string;
  size: number;
  style?: StyleProp<ViewStyle>;
}) {
  const [failed, setFailed] = useState(false);
  const borderRadius = size / 2;
  const initials = initialsFromName(name);
  const boxStyle: StyleProp<ViewStyle> = [
    { width: size, height: size, borderRadius },
    style,
  ];

  if (failed || !uri) {
    return (
      <View style={[styles.placeholder, boxStyle]}>
        <Text style={[styles.initials, { fontSize: size * 0.36 }]}>
          {initials}
        </Text>
      </View>
    );
  }

  const imageStyle: StyleProp<ImageStyle> = {
    width: size,
    height: size,
    borderRadius,
  };

  return (
    <View style={boxStyle}>
      <Image
        source={{ uri }}
        style={imageStyle}
        contentFit="cover"
        transition={200}
        onError={() => setFailed(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: colors.textSecondary,
    fontWeight: '700',
  },
});
