import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Layout from "./components/Layout";
import ShopLayout from "./components/ShopLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import ShopResolver from "./components/ShopResolver";
import { useAuthStore } from "./store/authStore";
import SplashScreen from "./components/SplashScreen";
import ProjectForSaleModal from "./components/ProjectForSaleModal";

// ── Pages SaaS (globales, hors shop) ──
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const ShopLogin = lazy(() => import("./pages/ShopLogin"));
const ShopRegister = lazy(() => import("./pages/ShopRegister"));
const RegisterShop = lazy(() => import("./pages/RegisterShop"));
const SolutionSaaS = lazy(() => import("./pages/SolutionSaaS"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Directory = lazy(() => import("./pages/Directory"));

// ── Pages Shop (sous /:shopSlug) ──
const ShopHome = lazy(() => import("./pages/ShopHome"));
const ShopAbout = lazy(() => import("./pages/ShopAbout"));
const ShopContact = lazy(() => import("./pages/ShopContact"));
const Shop = lazy(() => import("./pages/Shop"));
const Products = lazy(() => import("./pages/Products"));
const Quality = lazy(() => import("./pages/Quality"));
const Contact = lazy(() => import("./pages/Contact"));
const Legal = lazy(() => import("./pages/Legal"));
const Catalog = lazy(() => import("./pages/Catalog"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const Account = lazy(() => import("./pages/Account"));
const ShopClientAccount = lazy(() => import("./pages/ShopClientAccount"));
const Orders = lazy(() => import("./pages/Orders"));
const Addresses = lazy(() => import("./pages/Addresses"));
const Profile = lazy(() => import("./pages/Profile"));
const Admin = lazy(() => import("./pages/Admin"));
const Subscriptions = lazy(() => import("./pages/Subscriptions"));
const LoyaltyHistory = lazy(() => import("./pages/LoyaltyHistory"));
const MyReviews = lazy(() => import("./pages/MyReviews"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Referrals = lazy(() => import("./pages/Referrals"));
const POSPage = lazy(() => import("./pages/POSPage"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const initializeAuth = useAuthStore((s) => s.initialize);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <BrowserRouter>
      <SplashScreen />
      <ProjectForSaleModal />
      <Suspense fallback={<PageLoader />}>
        <Routes>

          {/* ═══ Pages globales SaaS (pas de shop) ═══ */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="solution" element={<SolutionSaaS />} />
            <Route path="annuaire" element={<Directory />} />
            <Route path="catalogue" element={<Catalog />} />
            <Route path="qualite" element={<Quality />} />
            <Route path="contact" element={<Contact />} />
            <Route path="connexion" element={<Login />} />
            <Route path="ouvrir-boutique" element={<RegisterShop />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="mentions-legales" element={<Legal />} />
            <Route path="404" element={<NotFound />} />

            {/* Account (SaaS Global context) */}
            <Route path="compte" element={<Account />} />
            <Route path="compte/commandes" element={<Orders />} />
            <Route path="compte/adresses" element={<Addresses />} />
            <Route path="compte/abonnements" element={<Subscriptions />} />
            <Route path="compte/fidelite" element={<LoyaltyHistory />} />
            <Route path="compte/avis" element={<MyReviews />} />
            <Route path="compte/favoris" element={<Favorites />} />
            <Route path="compte/parrainage" element={<Referrals />} />
            <Route path="compte/profil" element={<Profile />} />
          </Route>

          {/* ═══ Routes de boutique (préfixées par /:shopSlug) ═══ */}
          <Route path="/:shopSlug" element={<ShopResolver />}>

            {/* Vitrine publique (avec ShopLayout header/footer personnalisé) */}
            <Route element={<ShopLayout />}>
              <Route index element={<ShopHome />} />
              <Route path="boutique" element={<ShopAbout />} />
              <Route path="produits" element={<Products />} />
              <Route path="qualite" element={<Quality />} />
              <Route path="contact" element={<ShopContact />} />
              <Route path="connexion" element={<ShopLogin />} />
              <Route path="inscription" element={<ShopRegister />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="mentions-legales" element={<Legal />} />

              {/* Catalogue */}
              <Route path="catalogue" element={<Catalog />} />
              <Route path="catalogue/:slug" element={<ProductDetail />} />
              <Route path="panier" element={<Cart />} />

              {/* Pages protégées (connexion requise) */}
              <Route element={<ProtectedRoute />}>
                <Route path="commande" element={<Checkout />} />
                <Route path="commande/confirmation" element={<OrderConfirmation />} />
                <Route path="compte" element={<ShopClientAccount />} />
                <Route path="compte/commandes" element={<Orders />} />
                <Route path="compte/adresses" element={<Addresses />} />
                <Route path="compte/abonnements" element={<Subscriptions />} />
                <Route path="compte/fidelite" element={<LoyaltyHistory />} />
                <Route path="compte/avis" element={<MyReviews />} />
                <Route path="compte/favoris" element={<Favorites />} />
                <Route path="compte/parrainage" element={<Referrals />} />
                <Route path="compte/profil" element={<Profile />} />
              </Route>
            </Route>

            {/* Admin & POS (hors Layout, plein écran) */}
            <Route element={<AdminRoute />}>
              <Route path="admin" element={<Admin />} />
              <Route path="pos" element={<POSPage />} />
            </Route>
          </Route>

          {/* ═══ Catch-all 404 ═══ */}
          <Route path="*" element={<Layout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
