import { Link } from 'react-router-dom';
import { X, ShoppingCart, Trash2, Package, Truck, ShoppingBag, ArrowRight, Minus, Plus, ShieldCheck, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCartStore } from '../store/cartStore';
import FreeShippingGauge from './FreeShippingGauge';

export default function CartSidebar() {
  const {
    items,
    isOpen,
    deliveryType,
    closeSidebar,
    removeItem,
    updateQuantity,
    setDeliveryType,
    itemCount,
    subtotal,
    deliveryFee,
    total,
  } = useCartStore();

  const sub = subtotal();
  const fee = deliveryFee();
  const tot = total();
  const count = itemCount();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-md z-[60]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[450px] z-[60] flex flex-col bg-zinc-950/40 backdrop-blur-3xl border-l border-white/[0.08] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 blur-[120px] -ml-48 -mb-48" />

            {/* Header */}
            <div className="px-8 pt-10 pb-6 flex items-center justify-between relative z-10">
              <div className="space-y-1">
                <h2 className="text-2xl font-black tracking-tighter text-white uppercase italic">
                  Ma <span className="text-emerald-500">Sélection.</span>
                </h2>
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <Sparkles className="w-2.5 h-2.5 text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Premium Choice</span>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                    {count} ARTICLE{count > 1 ? 'S' : ''}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeSidebar}
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-all group shadow-xl"
              >
                <X className="w-5 h-5 transition-transform" />
              </motion.button>
            </div>

            <div className="flex-1 flex flex-col min-h-0 relative z-10">
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center px-10 text-center space-y-8">
                  <div className="w-24 h-24 rounded-[2.5rem] bg-zinc-900 border border-white/5 flex items-center justify-center shadow-2xl group transition-all">
                    <ShoppingBag className="w-10 h-10 text-zinc-700 group-hover:scale-110 group-hover:text-emerald-500 transition-all duration-500" />
                  </div>
                  <div className="space-y-3">
                    <p className="font-black text-2xl text-white uppercase tracking-tighter italic">Panier Vide</p>
                    <p className="text-zinc-500 font-medium leading-relaxed max-w-[240px] mx-auto">
                      Votre sélection est actuellement vide. Laissez BudTender vous guider vers l'excellence.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeSidebar}
                    className="bg-emerald-500 text-black font-black text-xs px-10 py-4 rounded-2xl uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/20"
                  >
                    Explorer
                  </motion.button>
                </div>
              ) : (
                <>
                  <div className="px-8 pb-6 space-y-6">
                    <div className="relative grid grid-cols-2 gap-2 bg-black/40 border border-white/5 rounded-2xl p-1.5 backdrop-blur-xl">
                      <motion.div
                        layout
                        className="absolute inset-y-1.5 w-[calc(50%-6px)] rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/20"
                        animate={{ left: deliveryType === 'click_collect' ? 6 : 'calc(50%)' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                      <button
                        onClick={() => setDeliveryType('click_collect')}
                        className={`relative z-10 flex items-center justify-center gap-2.5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${deliveryType === 'click_collect' ? 'text-black' : 'text-zinc-500 hover:text-white'}`}
                      >
                        <Package className="w-4 h-4" />
                        Click & Collect
                      </button>
                      <button
                        onClick={() => setDeliveryType('delivery')}
                        className={`relative z-10 flex items-center justify-center gap-2.5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${deliveryType === 'delivery' ? 'text-black' : 'text-zinc-500 hover:text-white'}`}
                      >
                        <Truck className="w-4 h-4" />
                        Livraison
                      </button>
                    </div>

                    <div className="bg-emerald-500/5 rounded-3xl p-5 border border-emerald-500/10 shadow-inner">
                      <FreeShippingGauge variant="compact" />
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto px-8 py-2 space-y-4 scrollbar-none">
                    <AnimatePresence initial={false} mode="popLayout">
                      {items.map(({ product, quantity }) => (
                        <motion.div
                          key={product.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9, x: 20 }}
                          className="group relative flex gap-5 bg-white/[0.03] border border-white/[0.06] rounded-[2rem] p-4 hover:bg-white/[0.06] transition-all duration-500 hover:border-emerald-500/20 shadow-xl"
                        >
                          <div className="relative w-24 h-24 aspect-square rounded-2xl overflow-hidden border border-white/5 shrink-0 shadow-2xl group-hover:scale-105 transition-transform duration-700">
                            <img src={product.image_url ?? ''} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          </div>

                          <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                            <div className="flex justify-between items-start gap-4">
                              <div className="min-w-0">
                                <h4 className="font-black text-sm text-white uppercase italic tracking-tight truncate group-hover:text-emerald-400 transition-colors">
                                  {product.name}
                                </h4>
                                <div className="flex flex-wrap gap-1.5 mt-2.5">
                                  {[1, 5, 10, 30].map(weight => (
                                    <motion.button
                                      key={weight}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() => updateQuantity(product.id, Math.min(weight, product.stock_quantity))}
                                      className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase transition-all border ${quantity === weight
                                        ? 'bg-emerald-500 border-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                                        : 'bg-white/5 border-white/10 text-zinc-500 hover:text-white hover:border-white/20'
                                        }`}
                                    >
                                      {weight}g
                                    </motion.button>
                                  ))}
                                </div>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.2, color: '#ef4444' }}
                                whileTap={{ scale: 0.8 }}
                                onClick={() => removeItem(product.id)}
                                className="text-zinc-700 transition-colors shrink-0 p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-2 bg-black/40 rounded-xl border border-white/5 p-1 backdrop-blur-md shadow-inner">
                                <motion.button
                                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                                  onClick={() => updateQuantity(product.id, quantity - 1)}
                                  disabled={quantity <= 1}
                                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-10 flex items-center justify-center transition-all"
                                >
                                  <Minus className="w-3.5 h-3.5 text-white" />
                                </motion.button>
                                <div className="relative flex items-center gap-1 px-1">
                                  <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => updateQuantity(product.id, Math.min(parseFloat(e.target.value) || 1, product.stock_quantity))}
                                    className="w-10 bg-transparent text-[11px] font-black text-white text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                  />
                                  <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">g</span>
                                </div>
                                <motion.button
                                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                                  onClick={() => updateQuantity(product.id, quantity + 1)}
                                  disabled={quantity >= product.stock_quantity}
                                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-10 flex items-center justify-center transition-all"
                                >
                                  <Plus className="w-3.5 h-3.5 text-white" />
                                </motion.button>
                              </div>
                              <div className="text-right">
                                <p className="text-base font-black text-white leading-none italic uppercase tracking-tighter">
                                  {(product.price * quantity).toFixed(2)}<span className="text-[10px] text-emerald-500 ml-1 font-sans not-italic">€</span>
                                </p>
                                <p className="text-[9px] text-zinc-600 font-black uppercase mt-1 tracking-widest opacity-60">{(product.price).toFixed(2)}€/g</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Footer */}
                  <div className="px-8 pt-8 pb-10 border-t border-white/[0.08] bg-black/40 backdrop-blur-2xl space-y-8 relative overflow-hidden">
                    <div className="space-y-3.5 relative z-10">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">
                        <span>Sous-total</span>
                        <span className="text-zinc-300">{sub.toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">
                        <span>Estimation Livraison</span>
                        <span className={fee === 0 ? 'text-emerald-500' : 'text-zinc-300'}>{fee === 0 ? 'OFFERTE' : `${fee.toFixed(2)} €`}</span>
                      </div>
                      <div className="flex justify-between items-end pt-5 border-t border-white/5 mt-5">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-2">Montant Total</span>
                        <span className="text-4xl font-black text-white tracking-tighter italic uppercase">
                          {tot.toFixed(2)}<span className="text-emerald-500 text-lg ml-1 font-sans not-italic">€</span>
                        </span>
                      </div>
                    </div>

                    <div className="space-y-6 relative z-10">
                      <Link to="/commande" onClick={closeSidebar} className="block w-full group">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-emerald-500 text-black font-black text-sm py-5 shadow-2xl shadow-emerald-500/20 active:shadow-none transition-all duration-300 uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-4 relative overflow-hidden group"
                        >
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                          <span className="relative z-10 italic">Passer la Commande</span>
                          <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
                        </motion.div>
                      </Link>
                      <div className="flex items-center justify-center gap-3 opacity-40">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 font-mono">Paiement Sécurisé SSL</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
