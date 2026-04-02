import { motion } from 'framer-motion';

const logos = [
  { name: 'Logo 1', src: '/logos/logo1.png?v=1' },
  { name: 'Logo 2', src: '/logos/logo2.png?v=1' },
  { name: 'Logo 3', src: '/logos/logo3.png?v=1' },
  { name: 'Logo 4', src: '/logos/logo4.png?v=1' }
];

export const LogoMarquee = () => {
  return (
    <div className="w-full overflow-hidden relative group py-8">
      {/* Sombreamento Lateral removido a pedido do usuário para um visual mais limpo */}

      <motion.div
        animate={{ x: [0, "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        className="flex w-max items-center"
      >
        {/* Repeat logos to make enough width for 50% translation infinite loop */}
        {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
          <div key={index} className="flex-shrink-0 w-40 md:w-48 mx-6 md:mx-10 flex justify-center items-center">
            <img 
               src={logo.src} 
               alt={logo.name} 
               className="max-w-full max-h-16 object-contain opacity-50 grayscale hover:opacity-100 hover:grayscale-0 hover:scale-105 transition-all duration-300"
            />
            {/* Fallback Text */}
            <div className="hidden text-center text-xl font-black text-[#05050a]/30 uppercase tracking-widest">{logo.name}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
