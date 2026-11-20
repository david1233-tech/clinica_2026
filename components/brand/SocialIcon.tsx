import { FacebookLogo, TiktokLogo, WhatsappLogo } from "@phosphor-icons/react/ssr";
import type { SocialName } from "@/lib/site";

const ICONS = {
  Facebook: FacebookLogo,
  TikTok: TiktokLogo,
  WhatsApp: WhatsappLogo,
} as const;

export function SocialIcon({ name, size = 20 }: { name: SocialName; size?: number }) {
  const Icon = ICONS[name];
  return <Icon size={size} weight="fill" aria-hidden="true" />;
}
