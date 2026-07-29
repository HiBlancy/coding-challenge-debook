import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/theme/tokens';

/** Sello de verificado (rojo, con estrella/decágono) como en el diseño. */
export function VerifiedBadge({ size = 18 }: { size?: number }) {
  return (
    <MaterialCommunityIcons
      name="check-decagram"
      size={size}
      color={colors.brand}
    />
  );
}
