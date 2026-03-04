import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Est-ce conforme à la législation française ?",
    answer: "Oui, notre plateforme intègre nativement les contraintes légales. Les taux de THC sont vérifiables en cas de contrôle, les factures sont conformes, et les mentions légales obligatoires (avertissements) sont gérées automatiquement sur votre boutique en ligne."
  },
  {
    question: "L'IA peut-elle faire des recommandations médicales ?",
    answer: "Non, et c'est une sécurité essentielle pour vous. L'IA BudTender est strictement bridée pour ne jamais émettre d'avis médical ou de promesse thérapeutique. Elle s'oriente uniquement sur le bien-être, les profils terpéniques et les effets ressentis, vous protégeant ainsi légalement."
  },
  {
    question: "Puis-je l'utiliser en magasin sans connexion ?",
    answer: "Le POS (logiciel de caisse) nécessite une connexion internet pour synchroniser vos stocks et vos ventes en temps réel avec votre e-commerce et votre base client. Cependant, il est conçu pour être extrêmement léger et fonctionne parfaitement avec un simple partage de connexion 4G/5G."
  },
  {
    question: "Puis-je importer mon catalogue existant (Shopify, Prestashop) ?",
    answer: "Absolument. Vous pouvez importer facilement l'intégralité de votre catalogue (produits, variantes, prix, stocks) depuis un fichier CSV ou Excel. Notre équipe support basée en France est également disponible pour vous assister gratuitement lors de cette migration."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-16 md:py-24 bg-zinc-950 border-t border-white/[0.06]">
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif font-bold text-white mb-4"
          >
            Questions Fréquentes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400"
          >
            Tout ce que vous devez savoir sur le CBD et notre boutique.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-white/[0.08] rounded-2xl overflow-hidden bg-zinc-900/30 hover:border-green-neon/20 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-medium text-white pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-green-neon shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-4 text-zinc-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
