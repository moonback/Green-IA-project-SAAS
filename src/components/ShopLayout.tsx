import { Outlet, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AgeGate from "./AgeGate";
import CartSidebar from "./CartSidebar";
import BudTender from "./BudTender";
import ToastContainer from "./Toast";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { useShopStore } from "../store/shopStore";
import { useSettingsStore } from "../store/settingsStore";
import { useShopTheme } from "../hooks/useShopTheme";

// Modularized components
import { ShopAnnouncement } from "./shop/ShopAnnouncement";
import { ShopHeader } from "./shop/ShopHeader";
import { ShopMobileMenu } from "./shop/ShopMobileMenu";
import { ShopFooter } from "./shop/ShopFooter";

/**
 * ShopLayout — Layout dédié aux boutiques.
 * Désormais modulaire et simplifié.
 */
export default function ShopLayout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    const [isBannerVisible, setIsBannerVisible] = useState(true);
    const location = useLocation();
    const { shopSlug } = useParams<{ shopSlug: string }>();

    const { currentShop } = useShopStore();
    const itemCount = useCartStore((s) => s.itemCount());
    const openSidebar = useCartStore((s) => s.openSidebar);
    const { user, profile, signOut } = useAuthStore();
    const settings = useSettingsStore((s) => s.settings);

    // Custom hook for theme injection
    useShopTheme(currentShop);

    useEffect(() => {
        setIsMenuOpen(false);
        setIsAccountMenuOpen(false);
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const sp = (path: string) => `/${shopSlug}${path}`;
    const primaryColor = currentShop?.settings?.theme?.primary_color || currentShop?.settings?.primary_color || '#39ff14';
    const shopFont = currentShop?.settings?.theme?.font_family || 'Inter';
    const shopName = currentShop?.name || 'Boutique CBD';

    const isOwner = currentShop && user && currentShop.owner_id === user.id;
    const isRegisteredToShop = Boolean(isOwner || (profile?.current_shop_id === currentShop?.id));

    const navLinks = [
        { name: "Vitrine", path: sp("/") },
        { name: "Catalogue", path: sp("/catalogue") },
        { name: "Notre Boutique", path: sp("/boutique") },
        { name: "Qualité", path: sp("/qualite") },
        { name: "Contact", path: sp("/contact") },
    ];

    return (
        <div
            className="min-h-screen flex flex-col text-zinc-100"
            style={{
                backgroundColor: currentShop?.settings?.theme?.background_color || '#09090b',
                fontFamily: shopFont,
            }}
        >
            <AgeGate />
            <CartSidebar />
            {settings.budtender_enabled && user && isRegisteredToShop && <BudTender />}
            <ToastContainer />

            <ShopAnnouncement
                isVisible={isBannerVisible}
                onClose={() => setIsBannerVisible(false)}
                primaryColor={primaryColor}
            />

            <ShopHeader
                currentShop={currentShop}
                shopName={shopName}
                primaryColor={primaryColor}
                itemCount={itemCount}
                onOpenCart={openSidebar}
                user={user}
                profile={profile}
                isRegisteredToShop={isRegisteredToShop}
                isAccountMenuOpen={isAccountMenuOpen}
                setIsAccountMenuOpen={setIsAccountMenuOpen}
                onSignOut={signOut}
                onMenuToggle={() => setIsMenuOpen(true)}
                navLinks={navLinks}
                sp={sp}
                isOwner={isOwner}
            />

            <ShopMobileMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                currentShop={currentShop}
                shopName={shopName}
                primaryColor={primaryColor}
                navLinks={navLinks}
                sp={sp}
                user={user}
                profile={profile}
                isRegisteredToShop={isRegisteredToShop}
                isOwner={isOwner}
                onSignOut={signOut}
            />

            <main className="flex-grow page-content-shell">
                <Outlet />
            </main>

            <ShopFooter
                currentShop={currentShop}
                shopName={shopName}
                primaryColor={primaryColor}
                settings={settings}
                navLinks={navLinks}
                sp={sp}
            />
        </div>
    );
}
