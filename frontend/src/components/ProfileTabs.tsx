import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, spacing } from '@/theme/tokens';

interface Tab {
  key: string;
  label: string;
  hasChevron?: boolean;
}

const TABS: Tab[] = [
  { key: 'talks', label: 'Talks' },
  { key: 'biblioteca', label: 'Biblioteca' },
  { key: 'lines', label: 'Lines', hasChevron: true },
  { key: 'convos', label: 'Convos', hasChevron: true },
  { key: 'destacados', label: 'Destacados' },
];

/** Tabs horizontales con subrayado rojo en el activo (por defecto "Convos"). */
export function ProfileTabs() {
  const [active, setActive] = useState('convos');

  return (
    <View style={styles.wrap}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {TABS.map((tab) => {
          const isActive = tab.key === active;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActive(tab.key)}
              activeOpacity={0.8}
              style={styles.tab}
            >
              <View style={styles.tabInner}>
                <Text
                  style={[
                    styles.label,
                    { color: isActive ? colors.textPrimary : colors.textMuted },
                  ]}
                >
                  {tab.label}
                </Text>
                {tab.hasChevron ? (
                  <Feather
                    name="chevron-down"
                    size={16}
                    color={isActive ? colors.textPrimary : colors.textMuted}
                  />
                ) : null}
              </View>
              {isActive ? <View style={styles.underline} /> : null}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.bg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  content: {
    paddingHorizontal: spacing.xl,
    gap: spacing.xl,
  },
  tab: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  tabInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
  },
  underline: {
    marginTop: spacing.sm,
    height: 3,
    borderRadius: 2,
    alignSelf: 'stretch',
    backgroundColor: colors.accent,
  },
});
