import { Link } from 'react-router-dom';
import { User, Package, MapPin, Heart, Coins, Star, LogOut, ChevronRight, Store } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useShopStore } from '../store/shopStore';
import { useShopPath } from '../hooks/useShopPath';
import SEO from '../components/SEO';

export default function ShopClientAccount() {
  const { profile, signOut } = useAuthStore();
  const { currentShop } = useShopStore();
  const sp = useShopPath();

  const firstName = profile?.full_name?.split(' ')[0] ?? 'Client';
  const initials = profile?.full_name
    ? profile.full_name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
    : 'CL';

  const items = [
    { label: 'Mes commandes', desc: 'Suivez vos achats et livraisons.', icon: Package, to: sp('/compte/commandes') },
    { label: 'Mes adresses', desc: 'Gérez vos adresses de livraison.', icon: MapPin, to: sp('/compte/adresses') },
    { label: 'Mes favoris', desc: 'Retrouvez vos produits préférés.', icon: Heart, to: sp('/compte/favoris') },
    { label: 'Mes abonnements', desc: 'Pilotez vos livraisons récurrentes.', icon: Star, to: sp('/compte/abonnements') },
    { label: 'Mes points fidélité', desc: 'Consultez vos récompenses boutique.', icon: Coins, to: sp('/compte/fidelite') },
    { label: 'Mon profil', desc: 'Mettez à jour vos informations client.', icon: User, to: sp('/compte/profil') },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-24">
      <SEO
        title={`Mon compte client — ${currentShop?.name ?? 'Boutique'} `}
        description="Espace client de la boutique : commandes, adresses, favoris et fidélité."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-green-neon/20 rounded-3xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-green-neon/15 border border-green-neon/30 flex items-center justify-center text-green-neon font-black">
                {initials}
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-500">Compte client</p>
                <h1 className="text-3xl font-serif font-bold">Bonjour {firstName}</h1>
                <p className="text-sm text-zinc-400 mt-1 inline-flex items-center gap-2"><Store className="w-4 h-4" /> {currentShop?.name ?? 'Votre boutique'}</p>
              </div>
            </div>

            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-bold"
            >
              <LogOut className="w-4 h-4" /> Déconnexion
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-2xl hover:border-green-neon/30 hover:bg-zinc-900 transition-all group flex items-center gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center group-hover:border-green-neon/30 group-hover:text-green-neon transition-all">
                <item.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-bold">{item.label}</p>
                <p className="text-xs text-zinc-500">{item.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-green-neon" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
