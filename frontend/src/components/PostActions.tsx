import { Feather } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { Post } from '@/types';
import { useToggleLike } from '@/hooks/useToggleLike';
import { formatCount } from '@/utils/formatCount';
import { colors, spacing } from '@/theme/tokens';

function Action({
  icon,
  count,
  active,
  onPress,
}: {
  icon: keyof typeof Feather.glyphMap;
  count: number;
  active?: boolean;
  onPress?: () => void;
}) {
  const color = active ? colors.accent : colors.textSecondary;
  return (
    <TouchableOpacity style={styles.action} onPress={onPress} activeOpacity={0.7}>
      <Feather name={icon} size={20} color={color} />
      <Text style={[styles.count, { color }]}>{formatCount(count)}</Text>
    </TouchableOpacity>
  );
}

/** Fila de acciones: like (corazón) · comentarios · reposts · guardados. */
export function PostActions({ post }: { post: Post }) {
  const { toggle } = useToggleLike(post);

  return (
    <View style={styles.row}>
      <Action
        icon={post.likedByMe ? 'heart' : 'heart'}
        count={post.likesCount}
        active={post.likedByMe}
        onPress={toggle}
      />
      <Action icon="message-circle" count={post.commentsCount} />
      <Action icon="send" count={post.repostsCount} />
      <Action icon="bookmark" count={post.savesCount} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxl + spacing.sm,
    marginTop: spacing.lg,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  count: {
    fontSize: 15,
    fontWeight: '600',
  },
});
