import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Profile, Shop } from '../lib/types';
import { useShopStore } from './shopStore';

interface AuthStore {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  initialize: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, referralCode?: string, metadata?: any) => Promise<void>;
  signOut: () => Promise<void>;
  fetchProfile: (userId: string) => Promise<void>;
  setProfile: (profile: Profile | null) => void;
  resetPassword: (email: string) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  profile: null,
  session: null,
  isLoading: true,

  initialize: () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({ session, user: session?.user ?? null, isLoading: false });
      if (session?.user) {
        get().fetchProfile(session.user.id);
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user ?? null });
      if (session?.user) {
        get().fetchProfile(session.user.id);
      } else {
        set({ profile: null });
      }
    });
  },

  fetchProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      return;
    }

    if (data) {
      const profile = data as Profile;
      set({ profile });

      // Load shop context if available
      if (profile.current_shop_id) {
        useShopStore.getState().fetchShop(profile.current_shop_id);
      }
    }
  },

  setProfile: (profile: Profile | null) => set({ profile }),

  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  },

  signUp: async (email, password, fullName, referralCode?: string, metadata?: any) => {
    let referredById: string | null = null;

    if (referralCode) {
      const { data: referrer } = await supabase
        .from('profiles')
        .select('id')
        .eq('referral_code', referralCode.trim().toUpperCase())
        .single();

      if (referrer) {
        referredById = referrer.id;
      }
    }

    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          ...metadata
        }
      },
    });

    if (error) throw error;

    if (authData.user) {
      const currentShop = useShopStore.getState().currentShop;

      // 1. If referral exists
      if (referredById) {
        try {
          // Update referred_by_id
          await supabase
            .from('profiles')
            .update({ referred_by_id: referredById, shop_id: currentShop?.id })
            .eq('id', authData.user.id);

          // Handle Welcome Bonus
          const { data: bonusSetting } = await supabase
            .from('store_settings')
            .select('value')
            .eq('key', 'referral_welcome_bonus')
            .maybeSingle();

          const welcomeBonus = bonusSetting ? parseInt(bonusSetting.value as string) : 0;

          if (welcomeBonus > 0) {
            await supabase
              .from('profiles')
              .update({ loyalty_points: welcomeBonus })
              .eq('id', authData.user.id);

            await supabase.from('loyalty_transactions').insert({
              user_id: authData.user.id,
              type: 'earned',
              points: welcomeBonus,
              balance_after: welcomeBonus,
              shop_id: currentShop?.id,
              note: 'Cadeau de bienvenue (Parrainage)'
            });
          }

          // Create referral entry
          await supabase.from('referrals').insert({
            referrer_id: referredById,
            referee_id: authData.user.id,
            status: 'joined',
            shop_id: currentShop?.id
          });
        } catch (err) {
          if (import.meta.env.DEV) console.error('Referral logic failed:', err);
        }
      } else if (currentShop) {
        // Enforce shop_id even without referral
        try {
          await supabase
            .from('profiles')
            .update({ shop_id: currentShop.id })
            .eq('id', authData.user.id);
        } catch (err) {
          console.error('Failed to set initial shop_id:', err);
        }
      }
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    useShopStore.getState().clearShop();
    set({ user: null, profile: null, session: null });
  },

  resetPassword: async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  },
}));
