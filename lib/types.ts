export type ServiceIcon = "leaf" | "bowl" | "heart" | "drop";

export interface Service {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  details: string[];
  icon: ServiceIcon;
}
