import { supabase } from './supabase';
import { Product, Category } from './types';

const DEMO_CATEGORIES = [
    { name: 'Fleurs', slug: 'fleurs', icon_name: 'Leaf' },
    { name: 'Résines', slug: 'resines', icon_name: 'Hash' },
    { name: 'Huiles', slug: 'huiles', icon_name: 'Droplet' },
    { name: 'Accessoires', slug: 'accessoires', icon_name: 'ShoppingBag' },
];

const DEMO_PRODUCTS = [
    {
        name: 'Amnesia Haze CBD',
        slug: 'amnesia-haze-cbd-demo',
        description: 'Une fleur de CBD premium aux notes citronnées et poivrées. Cultivée en intérieur pour une qualité optimale.',
        price: 35.0,
        cbd_percentage: 18,
        thc_max: 0.2,
        weight_grams: 5,
        image_url: 'https://toucheverte.fr/wp-content/uploads/2023/01/fleur-cbd-premium-orange-haze-416x416.webp',
        category_slug: 'fleurs',
        stock_quantity: 50,
    },
    {
        name: 'Super Skunk CBD',
        slug: 'super-skunk-cbd-demo',
        description: 'Une variété classique avec un arôme puissant et terreux. Effet relaxant garanti.',
        price: 29.0,
        cbd_percentage: 15,
        thc_max: 0.2,
        weight_grams: 5,
        image_url: 'https://toucheverte.fr/wp-content/uploads/2025/09/fleur-n10-amnesia-416x417.webp',
        category_slug: 'fleurs',
        stock_quantity: 40,
    },
    {
        name: 'Hash Afghan CBD',
        slug: 'hash-afghan-cbd-demo',
        description: 'Une résine sombre et malléable, fidèle à la tradition afghane. Arômes épicés.',
        price: 25.0,
        cbd_percentage: 22,
        thc_max: 0.2,
        weight_grams: 3,
        image_url: 'https://toucheverte.fr/wp-content/uploads/2023/01/resine-cbd-cbn-416x416.webp',
        category_slug: 'resines',
        stock_quantity: 30,
    },
    {
        name: 'Pollen Gold CBD',
        slug: 'pollen-gold-cbd-demo',
        description: 'Un pollen compressé de haute qualité, riche en trichomes et en terpènes.',
        price: 18.0,
        cbd_percentage: 12,
        thc_max: 0.2,
        weight_grams: 3,
        image_url: 'https://toucheverte.fr/wp-content/uploads/2023/10/fleur-transformee-cbd-moonrock-cbg-416x416.webp',
        category_slug: 'resines',
        stock_quantity: 60,
    },
    {
        name: 'Huile CBD 10% Full Spectrum',
        slug: 'huile-cbd-10-demo',
        description: 'Huile de CBD premium à spectre complet pour un effet d\'entourage optimal. 10ml.',
        price: 45.0,
        cbd_percentage: 10,
        thc_max: 0.2,
        weight_grams: null,
        image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400',
        category_slug: 'huiles',
        stock_quantity: 20,
    },
    {
        name: 'Huile CBD 20% Full Spectrum',
        slug: 'huile-cbd-20-demo',
        description: 'Notre huile la plus concentrée pour des besoins accrus en relaxation. 10ml.',
        price: 79.0,
        cbd_percentage: 20,
        thc_max: 0.2,
        weight_grams: null,
        image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400',
        category_slug: 'huiles',
        stock_quantity: 15,
    },
    {
        name: 'Grinder de Précision',
        slug: 'grinder-prec-demo',
        description: 'Grinder 4 parties en aluminium aéronautique. Dents ultra-tranchantes.',
        price: 24.9,
        cbd_percentage: null,
        thc_max: null,
        weight_grams: null,
        image_url: 'https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&q=80&w=400',
        category_slug: 'accessoires',
        stock_quantity: 100,
    },
    {
        name: 'Papier à rouler Premium',
        slug: 'papier-premium-demo',
        description: 'Le classique des classiques. Papier ultra-fin et filigrané.',
        price: 1.5,
        cbd_percentage: null,
        thc_max: null,
        weight_grams: null,
        image_url: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=400',
        category_slug: 'accessoires',
        stock_quantity: 500,
    },
    {
        name: 'White Widow CBD',
        slug: 'white-widow-cbd-demo',
        description: 'Une légende hollandaise adaptée en version CBD. Cristaux blancs abondants.',
        price: 32.0,
        cbd_percentage: 16,
        thc_max: 0.2,
        weight_grams: 5,
        image_url: 'https://toucheverte.fr/wp-content/uploads/2025/05/fleur-thco-rambo-416x416.webp',
        category_slug: 'fleurs',
        stock_quantity: 35,
    },
    {
        name: 'Gel Douche au Chanvre',
        slug: 'gel-douche-chanvre-demo',
        description: 'Un gel douche hydratant et apaisant enrichi à l\'huile de graines de chanvre.',
        price: 12.5,
        cbd_percentage: null,
        thc_max: null,
        weight_grams: null,
        image_url: 'https://toucheverte.fr/wp-content/uploads/2023/09/krem-do-rak-glebokie-nawilzenie-naturalny-kosmetyk-416x416.jpg',
        category_slug: 'accessoires',
        stock_quantity: 45,
    }
];

export async function seedDemoProducts(shopId: string) {
    // 1. Create categories if they don't exist
    const categoriesMap: Record<string, string> = {};

    for (const cat of DEMO_CATEGORIES) {
        const { data: existing } = await supabase
            .from('categories')
            .select('id')
            .eq('shop_id', shopId)
            .eq('slug', cat.slug)
            .maybeSingle();

        if (existing) {
            categoriesMap[cat.slug] = existing.id;
        } else {
            const { data: newCat } = await supabase
                .from('categories')
                .insert({
                    ...cat,
                    shop_id: shopId,
                    is_active: true,
                    sort_order: 0
                })
                .select('id')
                .maybeSingle();

            if (newCat) {
                categoriesMap[cat.slug] = newCat.id;
            }
        }
    }

    // 2. Insert products
    const productsToInsert = DEMO_PRODUCTS.map(p => ({
        name: p.name,
        slug: `${p.slug}-${Math.random().toString(36).substring(2, 7)}`,
        description: p.description,
        price: p.price,
        cbd_percentage: p.cbd_percentage,
        thc_max: p.thc_max,
        weight_grams: p.weight_grams,
        image_url: p.image_url,
        category_id: categoriesMap[p.category_slug],
        shop_id: shopId,
        stock_quantity: p.stock_quantity,
        is_available: true,
        is_featured: Math.random() > 0.7,
        is_active: true,
        attributes: { benefits: [], aromas: [] }
    }));

    const { error: prodError } = await supabase
        .from('products')
        .insert(productsToInsert);

    if (prodError) {
        throw prodError;
    }

    return true;
}
