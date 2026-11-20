import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.jpg";

type Props = { onClick?: () => void; size?: "sm" | "md" };

export function Logo({ onClick, size = "md" }: Props) {
  const box = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  return (
    <Link href="/" onClick={onClick} className="group flex items-center gap-3" aria-label="Centro Vital Salud, ir al inicio">
      <span className={`relative ${box} overflow-hidden rounded-2xl shadow-md ring-1 ring-line transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3`}>
        <Image src={logo} alt="" fill sizes="44px" className="object-cover" />
      </span>
      <span className="font-display text-xl font-semibold tracking-tight">
        Vital<span className="text-accent">Salud</span>
      </span>
    </Link>
  );
}
