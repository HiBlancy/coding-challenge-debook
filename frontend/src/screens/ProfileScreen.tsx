import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Post } from '@/types';
import { PROFILE_USER_ID } from '@/api/client';
import { ProfileHeader } from '@/components/ProfileHeader';
import { ProfileTabs } from '@/components/ProfileTabs';
import { PostCard } from '@/components/PostCard';
import { useProfile } from '@/hooks/useProfile';
import { useProfilePosts } from '@/hooks/useProfilePosts';
import { colors, spacing } from '@/theme/tokens';

export function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [headerHeight, setHeaderHeight] = useState(0);
  const profileQuery = useProfile(PROFILE_USER_ID);
  const {
    posts,
    isLoading: postsLoading,
    isError: postsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProfilePosts(PROFILE_USER_ID);

  const onHeaderLayout = (event: LayoutChangeEvent) => {
    setHeaderHeight(event.nativeEvent.layout.height);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Degradado rosa → negro hasta el final del ProfileHeader (chips). */}
      <LinearGradient
        colors={[colors.gradientTop, colors.bg]}
        locations={[0, 1]}
        style={[
          styles.gradient,
          { height: insets.top + headerHeight },
        ]}
      />

      {profileQuery.isLoading ? (
        <View style={[styles.center, { paddingTop: insets.top + 80 }]}>
          <ActivityIndicator color={colors.textPrimary} />
        </View>
      ) : profileQuery.isError || !profileQuery.data ? (
        <View style={[styles.center, { paddingTop: insets.top + 80 }]}>
          <Text style={styles.errorText}>
            No se pudo cargar el perfil.{'\n'}¿Está el backend levantado?
          </Text>
        </View>
      ) : (
        <FlatList<Post>
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostCard post={item} />}
          contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
          ListHeaderComponent={
            <View style={{ paddingTop: insets.top }}>
              <View onLayout={onHeaderLayout}>
                <ProfileHeader profile={profileQuery.data} />
              </View>
              <ProfileTabs />
            </View>
          }
          stickyHeaderIndices={[]}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage();
          }}
          ListEmptyComponent={
            <ListEmpty loading={postsLoading} error={postsError} />
          }
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator
                style={{ marginVertical: spacing.xl }}
                color={colors.textPrimary}
              />
            ) : null
          }
        />
      )}
    </View>
  );
}

function ListEmpty({ loading, error }: { loading: boolean; error: boolean }) {
  return (
    <View style={styles.emptyState}>
      {loading ? (
        <ActivityIndicator color={colors.textPrimary} />
      ) : error ? (
        <Text style={styles.errorText}>Error al cargar los posts.</Text>
      ) : (
        <Text style={styles.emptyText}>
          Aún no hay convos.{'\n'}
          (Implementa `useProfilePosts` para traerlos del backend.)
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  emptyState: {
    paddingVertical: spacing.xxl * 2,
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyText: {
    color: colors.textMuted,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
  },
  errorText: {
    color: colors.textSecondary,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
  },
});
