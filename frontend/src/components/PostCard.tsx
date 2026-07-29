import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Post } from '@/types';
import { formatShortDate } from '@/utils/formatDate';
import { formatCount } from '@/utils/formatCount';
import { colors, radius, sizes, spacing, typography } from '@/theme/tokens';
import { PostActions } from './PostActions';
import { Pill } from './Pill';
import { VerifiedBadge } from './VerifiedBadge';

/** Indentación del cuerpo alineada con "X libros" (no con el avatar). */
const authorTextIndent = sizes.postAvatar + spacing.md;
const authorTextTrailing = sizes.moreIcon + spacing.md;

/**
 * Tarjeta de un post del feed "Convos". Estilo de andamiaje mínimo;
 * el diseño final sale del Figma.
 */
export function PostCard({ post }: { post: Post }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.card}>
      {/* Cabecera de autor */}
      <View style={styles.authorRow}>
        <Image
          source={{ uri: post.author.avatarUrl }}
          style={styles.avatar}
          contentFit="cover"
          transition={200}
          cachePolicy="none"
          onError={(e) => {
            console.warn('avatar load error', post.author.avatarUrl, e);
          }}
        />
        <View style={styles.authorInfo}>
          <View style={styles.authorNameRow}>
            <Text style={typography.authorName}>{post.author.fullName}</Text>
            {post.author.verified ? <VerifiedBadge size={16} /> : null}
            {post.author.isAuthor ? (
              <Pill style={styles.authorPill}>
                <View style={styles.redDot} />
                <Text style={styles.authorPillText}>Autor</Text>
              </Pill>
            ) : null}
            <Text style={styles.date}>{formatShortDate(post.createdAt)}</Text>
          </View>
          <Text style={styles.booksCount}>
            {formatCount(post.author.booksCount)} libros
          </Text>
        </View>
        <Feather
          name="more-horizontal"
          size={sizes.moreIcon}
          color={colors.textMuted}
        />
      </View>

      {/* Cuerpo — alineado con el bloque de texto del autor */}
      <Text
        style={[typography.body, styles.body]}
        numberOfLines={expanded ? undefined : 6}
      >
        {post.content}
      </Text>
      {!expanded ? (
        <TouchableOpacity onPress={() => setExpanded(true)} activeOpacity={0.7}>
          <Text style={styles.readMore}>Leer más</Text>
        </TouchableOpacity>
      ) : null}

      {/* Chip de enlace */}
      {post.linkLabel ? (
        <Pill style={styles.linkChip}>
          <Feather name="link" size={16} color={colors.textPrimary} />
          <Text style={styles.linkText}>{post.linkLabel}</Text>
        </Pill>
      ) : null}

      {/* Localización */}
      {post.location ? (
        <View style={styles.locationRow}>
          <Feather name="map-pin" size={15} color={colors.textMuted} />
          <Text style={styles.location}>{post.location}</Text>
        </View>
      ) : null}

      {/* Chip del libro */}
      {post.bookTitle ? (
        <View style={styles.bookChip}>
          <View style={styles.bookCover}>
            {post.bookCoverUrl ? (
              <Image
                source={{ uri: post.bookCoverUrl }}
                style={styles.bookCoverImg}
              />
            ) : null}
          </View>
          <View style={styles.bookInfo}>
            <Text style={styles.bookAuthor}>{post.bookAuthor}</Text>
            <Text style={styles.bookTitle}>{post.bookTitle}</Text>
          </View>
        </View>
      ) : null}

      {/* Acciones */}
      <PostActions post={post} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    gap: spacing.md,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: sizes.postAvatar,
    height: sizes.postAvatar,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
  },
  authorInfo: {
    flex: 1,
    gap: 2,
  },
  authorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  authorPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 3,
  },
  authorPillText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  date: {
    color: colors.textMuted,
    fontSize: 14,
    marginLeft: 'auto',
  },
  booksCount: {
    color: colors.textMuted,
    fontSize: 14,
  },
  body: {
    marginLeft: authorTextIndent,
    marginRight: authorTextTrailing,
  },
  readMore: {
    color: colors.accent,
    fontSize: 16,
    marginTop: -spacing.sm,
    marginLeft: authorTextIndent,
  },
  linkChip: {
    alignSelf: 'flex-start',
  },
  linkText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  location: {
    color: colors.textMuted,
    fontSize: 14,
  },
  bookChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  bookCover: {
    width: 40,
    height: 52,
    borderRadius: 6,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  bookCoverImg: {
    width: '100%',
    height: '100%',
  },
  bookInfo: {
    flex: 1,
  },
  bookAuthor: {
    color: colors.textMuted,
    fontSize: 13,
  },
  bookTitle: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
  },
});
