import { StyleSheet, Text, View } from 'react-native';
import { formatCount } from '@/utils/formatCount';
import { spacing, typography } from '@/theme/tokens';

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={typography.statValue}>{formatCount(value)}</Text>
      <Text style={typography.statLabel}>{label}</Text>
    </View>
  );
}

/** LIBROS · SEGUIDORES · VIDA */
export function StatsRow({
  booksCount,
  followersCount,
  lifeScore,
}: {
  booksCount: number;
  followersCount: number;
  lifeScore: number;
}) {
  return (
    <View style={styles.row}>
      <Stat value={booksCount} label="LIBROS" />
      <Stat value={followersCount} label="SEGUIDORES" />
      <Stat value={lifeScore} label="VIDA" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xxl + spacing.md,
  },
  stat: {
    alignItems: 'center',
    gap: 2,
  },
});
