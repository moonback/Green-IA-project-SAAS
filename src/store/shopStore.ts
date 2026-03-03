import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Shop } from '../lib/types';
import { useSettingsStore } from './settingsStore';

interface ShopStore {
    currentShop: Shop | null;
    isLoading: boolean;
    error: string | null;
    fetchShop: (shopId: string) => Promise<void>;
    fetchShopBySlug: (slug: string) => Promise<void>;
    setShop: (shop: Shop | null) => void;
    clearShop: () => void;
}

export const useShopStore = create<ShopStore>((set) => ({
    currentShop: null,
    isLoading: false,
    error: null,

    fetchShop: async (shopId: string) => {
        set({ isLoading: true, error: null });
        try {
            const { data, error } = await supabase
                .from('shops')
                .select('*')
                .eq('id', shopId)
                .single();

            if (error) throw error;
            set({ currentShop: data as Shop, isLoading: false });
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
            console.error('Error fetching shop:', err);
        }
    },

    fetchShopBySlug: async (slug: string) => {
        set({ isLoading: true, error: null });
        try {
            const { data, error } = await supabase
                .from('shops')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error) throw error;
            set({ currentShop: data as Shop, isLoading: false });
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
            console.error('Error fetching shop by slug:', err);
        }
    },

    setShop: (shop: Shop | null) => {
        set({ currentShop: shop });
        useSettingsStore.getState().fetchSettings();
    },

    clearShop: () => set({ currentShop: null, error: null }),
}));
