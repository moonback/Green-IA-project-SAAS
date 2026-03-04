import { Link } from "react-router-dom";
import { MapPin, Clock, Phone } from "lucide-react";

interface ShopFooterProps {
    currentShop: any;
    shopName: string;
    primaryColor: string;
    settings: any;
    navLinks: Array<{ name: string; path: string }>;
    sp: (path: string) => string;
}

export function ShopFooter({
    currentShop,
    shopName,
    primaryColor,
    settings,
    navLinks,
    sp
}: ShopFooterProps) {
    return (
        <footer className="bg-black border-t border-white/[0.06] pt-16 pb-10">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-5">
                        <Link to={sp("/")} className="flex items-center gap-3 group">
                            {currentShop?.logo_url ? (
                                <img src={currentShop.logo_url} alt={shopName} className="h-10 w-10 rounded-xl object-cover" />
                            ) : (
                                <div className="h-10 w-10 rounded-xl flex items-center justify-center text-black font-black text-lg" style={{ backgroundColor: primaryColor }}>
                                    {shopName[0]}
                                </div>
                            )}
                            <span className="text-xl font-black text-white group-hover:text-green-400 transition-colors">{shopName}</span>
                        </Link>
                        <p className="text-zinc-500 text-sm leading-relaxed font-light">
                            Votre boutique CBD de confiance.
                            Produits premium, conseils IA et service sur mesure.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-200 mb-6">Navigation</h3>
                        <ul className="space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-zinc-500 hover:text-white transition-colors text-sm font-light">{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Info */}
                    <div className="space-y-5">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-200 mb-6">Informations</h3>
                        {settings.store_address && (
                            <div className="flex items-start gap-3 text-sm text-zinc-500">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                                <span>{settings.store_address}</span>
                            </div>
                        )}
                        {settings.store_hours && (
                            <div className="flex items-start gap-3 text-sm text-zinc-500">
                                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                                <span>{settings.store_hours}</span>
                            </div>
                        )}
                        {settings.store_phone && (
                            <div className="flex items-start gap-3 text-sm text-zinc-500">
                                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                                <span>{settings.store_phone}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-[0.15em] text-zinc-600">
                    <p>&copy; {new Date().getFullYear()} {shopName}. Propulsé par Green IA SaaS.</p>
                    <div className="flex gap-6">
                        <Link to={sp("/mentions-legales")} className="hover:text-white transition-colors">Mentions Légales</Link>
                        <a href="/" className="hover:text-white transition-colors" style={{ color: primaryColor }}>Green IA Platform</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
