import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import type { UserProfile } from '@/types';
import { colors, radius, sizes, spacing, typography } from '@/theme/tokens';
import { Pill } from './Pill';
import { StatsRow } from './StatsRow';
import { VerifiedBadge } from './VerifiedBadge';

/**
 * Header del perfil. Estilo de andamiaje mínimo; el diseño final sale del Figma.
 */
export function ProfileHeader({ profile }: { profile: UserProfile }) {
  return (
    <View style={styles.container}>
      {/* Barra superior */}
      <View style={styles.topBar}>
        <Feather name="chevron-left" size={28} color={colors.textPrimary} />
        <Text style={styles.topTitle}>{profile.displayName}</Text>
        <Feather name="menu" size={26} color={colors.textPrimary} />
      </View>

      {/* Avatar */}
      <View style={styles.avatarWrap}>
        <Image
          source={{ uri: profile.avatarUrl }}
          style={styles.avatar}
          contentFit="cover"
          transition={200}
          cachePolicy="none"
          onError={(e) => {
            console.warn('avatar load error', profile.avatarUrl, e);
          }}
        />
      </View>

      {/* Debooker */}
      <View style={styles.centerRow}>
        <Pill style={styles.debookerPill}>{profile.tagline}</Pill>
      </View>

      {/* Mis lecturas */}
      <View style={[styles.centerRow, styles.readingsRow]}>
        <Text style={styles.readings}>Mis lecturas</Text>
        <Feather name="chevron-right" size={18} color={colors.textPrimary} />
      </View>

      {/* Nombre + llave + verificado */}
      <View style={[styles.centerRow, styles.nameRow]}>
        <Text style={styles.key}>🔑</Text>
        <Text style={typography.h1}>{profile.fullName}</Text>
        {profile.verified ? <VerifiedBadge size={22} /> : null}
      </View>

      {/* Stats */}
      <View style={styles.statsWrap}>
        <StatsRow
          booksCount={profile.booksCount}
          followersCount={profile.followersCount}
          lifeScore={profile.lifeScore}
        />
      </View>

      {/* Bio */}
      <Text style={styles.bio}>{profile.bio}</Text>

      {/* Pills de acción */}
      <View style={styles.actionsRow}>
        <Pill style={styles.actionChip}>Actividad</Pill>
        <Pill style={styles.actionChip}>
          <Feather name="trending-up" size={16} color={colors.success} />
          <Text style={styles.actionText}>10% Impacto</Text>
        </Pill>
        <View style={styles.clubsChipWrap}>
          <Pill style={styles.actionChip}>
            <Text style={styles.actionText}>Clubs</Text>
          </Pill>
          <View style={styles.clubsBadge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  topTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
  avatarWrap: {
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  avatar: {
    width: sizes.profileAvatar,
    height: sizes.profileAvatar,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
  },
  centerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  debookerPill: {
    paddingVertical: spacing.xs + 2,
  },
  readingsRow: {
    marginTop: spacing.xs,
  },
  readings: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '600',
  },
  nameRow: {
    gap: spacing.sm,
  },
  key: {
    fontSize: 24,
    transform: [{ rotate: '-20deg' }],
  },
  statsWrap: {
    marginTop: spacing.sm,
  },
  bio: {
    textAlign: 'center',
    color: colors.textPrimary,
    fontSize: 15,
    marginTop: spacing.xs,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    overflow: 'visible',
  },
  actionChip: {
    backgroundColor: colors.chipBackground,
  },
  actionText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  clubsChipWrap: {
    position: 'relative',
    overflow: 'visible',
  },
  clubsBadge: {
    position: 'absolute',
    top: -spacing.sm,
    right: -spacing.sm,
    minWidth: 18,
    height: 18,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: '700',
  },
});
