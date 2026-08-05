import Link from "next/link";
import { Camera, MessageCircle } from "lucide-react";
import { INSTAGRAM_HANDLE, INSTAGRAM_LINK, WHATSAPP_LINK } from "@/lib/utils";
import { BrandLogo } from "@/components/icons/BrandLogo";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <BrandLogo variant="stacked" className="text-3xl text-foreground" />
            <p className="mt-4 max-w-xs text-sm text-muted">
              Hecha para quienes van por más. Bebida energizante sin azúcar, con sabor real.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Navegación
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Conecta
            </h3>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground cursor-pointer"
              >
                <Camera className="size-4" aria-hidden="true" />
                {INSTAGRAM_HANDLE}
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground cursor-pointer"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Escríbenos por WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} IT&apos;S BOOM Energy Drink. Todos los derechos reservados.</p>
          <p>Bebida energizante · Free sugar, sin excusas</p>
        </div>
      </div>
    </footer>
  );
}
