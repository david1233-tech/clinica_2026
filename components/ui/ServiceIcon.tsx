import { BowlFood, Drop, Heartbeat, Leaf } from "@phosphor-icons/react/ssr";
import type { ServiceIcon as ServiceIconKey } from "@/lib/types";

const ICONS = { leaf: Leaf, bowl: BowlFood, heart: Heartbeat, drop: Drop } as const;

export function ServiceIcon({ icon, size = 26 }: { icon: ServiceIconKey; size?: number }) {
  const Icon = ICONS[icon];
  return <Icon size={size} weight="duotone" aria-hidden="true" />;
}
