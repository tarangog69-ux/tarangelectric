import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, Power, Zap, Cable, ShieldCheck, 
  Menu, X, ArrowRight, MapPin, Phone 
} from 'lucide-react';
import { Shop } from './components/Shop';
import { ContactForm } from './components/ContactForm';

const EASE = [0.16, 1, 0.3, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const textReveal = {
  hidden: { y: '100%' },
  visible: { y: '0%', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

const BrandLogo = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="42" stroke="#0033A0" strokeWidth="10" strokeDasharray="132 132" strokeDashoffset="0" strokeLinecap="round" />
    <circle cx="50" cy="50" r="42" stroke="#D90429" strokeWidth="10" strokeDasharray="132 132" strokeDashoffset="-132" strokeLinecap="round" />
    <path d="M 25 32 H 75" stroke="#0033A0" strokeWidth="11" strokeLinecap="round" />
    <path d="M 45 32 V 76" stroke="#0033A0" strokeWidth="11" strokeLinecap="round" />
    <path d="M 45 54 H 70" stroke="#D90429" strokeWidth="10" strokeLinecap="round" />
    <path d="M 45 76 H 75" stroke="#D90429" strokeWidth="11" strokeLinecap="round" />
  </svg>
);

const Navbar = ({ activePage, setActivePage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Home", key: "home" },
    { name: "Shop", key: "shop" },
    { name: "Contact", key: "contact" }
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: EASE }}
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          scrolled || activePage !== 'home' ? 'bg-white/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] py-4' : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          
          <div 
            onClick={() => setActivePage('home')}
            className="flex items-center gap-2 sm:gap-3 md:gap-4 cursor-pointer group justify-start min-w-0"
          >
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.6, ease: EASE }} className="shrink-0">
              <BrandLogo className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
            </motion.div>
            <div className="flex flex-col min-w-0">
              <h1 className={`text-lg sm:text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none transition-colors duration-500 truncate ${scrolled || activePage !== 'home' ? 'text-[#0A1128]' : 'text-white'}`}>
                <span className="text-[#0033A0]">Tarang</span> <span className="text-[#D90429]">Electric</span>
              </h1>
              <span className={`text-[0.45rem] sm:text-[0.55rem] font-bold tracking-[0.12em] sm:tracking-[0.2em] mt-1 transition-colors duration-500 truncate ${scrolled || activePage !== 'home' ? 'text-gray-500' : 'text-gray-300'}`}>
                HOUSE OF ELECTRICAL GOODS
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center gap-10">
            {navItems.map((item) => {
              const isActive = activePage === item.key;
              const isDarkHeader = scrolled || activePage !== 'home';
              return (
                <button
                  key={item.key}
                  onClick={() => setActivePage(item.key)}
                  className={`text-sm font-bold uppercase tracking-widest relative overflow-hidden group py-1 ${
                    isDarkHeader ? (isActive ? 'text-[#D90429]' : 'text-[#0A1128]') : (isActive ? 'text-[#D90429]' : 'text-white')
                  }`}
                >
                  <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">{item.name}</span>
                  <span className="absolute top-1 left-0 inline-block transition-transform duration-500 translate-y-full group-hover:translate-y-0 text-[#D90429]">{item.name}</span>
                  {isActive && (
                    <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D90429]" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+919099560111"
              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full border transition-all ${
                scrolled || activePage !== 'home'
                  ? 'bg-blue-50 text-[#0033A0] border-blue-200 hover:bg-[#0033A0] hover:text-white'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white hover:text-[#0A1128]'
              }`}
            >
              <Phone size={14} className="text-[#D90429]" /> +91 90995 60111
            </a>
          </div>

          <div className="flex justify-end lg:hidden shrink-0">
            <button className={`p-1.5 rounded-xl ${scrolled || activePage !== 'home' ? 'text-[#0A1128]' : 'text-white'}`} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 bg-[#0A1128] z-40 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.button 
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  onClick={() => {
                    setActivePage(item.key);
                    setMenuOpen(false);
                  }}
                  className={`text-4xl md:text-6xl font-black uppercase tracking-tighter transition-colors ${
                    activePage === item.key ? 'text-[#D90429]' : 'text-white hover:text-[#D90429]'
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}

              <a
                href="tel:+919099560111"
                className="mt-4 flex items-center gap-2 text-lg font-bold uppercase tracking-wider text-white bg-[#0033A0] px-6 py-3 rounded-full"
              >
                <Phone size={20} /> +91 90995 60111
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = ({ onExplore }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaEffect = null;
    
    const loadScript = (src) => new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      document.head.appendChild(script);
    });

    const initVanta = async () => {
      try {
        if (!window.THREE) await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
        if (!window.VANTA) await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js');

        if (!vantaEffect && vantaRef.current) {
          vantaEffect = window.VANTA.WAVES({
            el: vantaRef.current,
            THREE: window.THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x121010,
            shininess: 38.00,
            waveHeight: 25.50
          });
        }
      } catch (error) {
        console.error("Failed to load Vanta background:", error);
      }
    };

    initVanta();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <section id="home" ref={vantaRef} className="relative min-h-screen overflow-hidden flex items-center justify-center pt-24 pb-16" style={{ backgroundColor: '#121010' }}>
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-[#0033A0]/10 to-transparent rounded-full blur-[100px]"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-gradient-to-tr from-[#D90429]/10 to-transparent rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 w-full pointer-events-none">
        <motion.div 
          style={{ opacity }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl pointer-events-auto"
        >
          <div className="space-y-3 mb-8">
            <div className="overflow-hidden pt-1">
              <motion.h1 variants={textReveal} className="text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold text-white leading-[0.95] tracking-tight font-serif">
                POWERING
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1 variants={textReveal} className="text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0033A0] via-[#4361ee] to-white leading-[0.95] tracking-tight font-serif">
                MODERN
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1 variants={textReveal} className="text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold text-white leading-[0.95] tracking-tight font-serif">
                INFRASTRUCTURE<span className="text-[#D90429]">.</span>
              </motion.h1>
            </div>
          </div>

          <motion.p variants={fadeInUp} className="text-base md:text-xl text-white/70 max-w-xl font-light leading-relaxed mb-10 tracking-wide">
            Engineered for absolute reliability and unparalleled global scale.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-6 items-center">
            <button
              onClick={onExplore}
              className="group relative overflow-hidden bg-white text-[#0A1128] px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs md:text-sm flex items-center gap-3 shadow-2xl"
            >
              <span className="relative z-10">Explore Divisions</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-300 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// --- OFFICIAL SVG LOGO MARQUEE ---
const LogoMarquee = () => {
  const brandLogos = [
    {
      name: "Hager",
      svg: (
        <svg viewBox="0 0 120 40" className="h-8 w-auto">
          <text x="0" y="30" fill="#00539f" fontFamily="sans-serif" fontWeight="900" fontSize="28" letterSpacing="-1">
            <tspan fill="#e30613" fontSize="32">:</tspan>hager
          </text>
        </svg>
      )
    },
    {
      name: "Apar Anushakti",
      svg: (
        <svg viewBox="0 0 160 40" className="h-8 w-auto">
          <circle cx="20" cy="20" r="16" fill="none" stroke="#003366" strokeWidth="2.5"/>
          <path d="M12 20 Q 20 8 28 20 Q 20 32 12 20 Z" fill="#00539f" opacity="0.8"/>
          <text x="42" y="18" fill="#003366" fontFamily="sans-serif" fontWeight="800" fontSize="12" letterSpacing="1">APAR</text>
          <text x="42" y="31" fill="#003366" fontFamily="sans-serif" fontWeight="700" fontSize="9" letterSpacing="0.5">ANUSHAKTI</text>
        </svg>
      )
    },
    {
      name: "GreatWhite",
      svg: (
        <svg viewBox="0 0 150 40" className="h-8 w-auto">
          <rect x="2" y="10" width="12" height="18" fill="#cc0000" />
          <text x="20" y="27" fill="#ffffff" fontFamily="serif" fontWeight="bold" fontSize="18" fontStyle="italic">GreatWhite</text>
        </svg>
      )
    },
    {
      name: "Schneider Electric",
      svg: (
        <svg viewBox="0 0 160 40" className="h-8 w-auto">
          <path d="M10 25 Q 16 12 22 25 Q 16 35 10 25 Z" fill="#32b53a" />
          <text x="32" y="24" fill="#228b22" fontFamily="sans-serif" fontWeight="bold" fontSize="14">Schneider</text>
          <text x="32" y="35" fill="#228b22" fontFamily="sans-serif" fontWeight="bold" fontSize="9" letterSpacing="1">Electric</text>
        </svg>
      )
    },
    {
      name: "Elmex",
      svg: (
        <svg viewBox="0 0 110 40" className="h-8 w-auto">
          <rect x="0" y="4" width="110" height="32" rx="4" fill="#e25d20" />
          <text x="12" y="28" fill="#ffffff" fontFamily="serif" fontWeight="bold" fontStyle="italic" fontSize="22" letterSpacing="1">elmex</text>
          <text x="68" y="34" fill="#ffffff" fontFamily="sans-serif" fontSize="6">since 1963</text>
        </svg>
      )
    },
    {
      name: "Crompton Lighting",
      svg: (
        <svg viewBox="0 0 150 40" className="h-8 w-auto">
          <rect x="2" y="4" width="30" height="16" fill="#003399" />
          <rect x="32" y="4" width="30" height="16" fill="#66cc00" />
          <text x="18" y="17" fill="#ffffff" fontFamily="sans-serif" fontWeight="900" fontSize="12">G</text>
          <text x="2" y="34" fill="#ffffff" fontFamily="sans-serif" fontWeight="bold" fontSize="11">Crompton Lighting</text>
        </svg>
      )
    },
    {
      name: "HEX",
      svg: (
        <svg viewBox="0 0 100 40" className="h-8 w-auto">
          <polygon points="30,2 70,2 85,20 70,38 30,38 15,20" fill="none" stroke="#e30613" strokeWidth="3"/>
          <text x="25" y="28" fill="#003399" fontFamily="sans-serif" fontWeight="900" fontSize="20" letterSpacing="2">HEX</text>
        </svg>
      )
    },
    {
      name: "Polycab",
      svg: (
        <svg viewBox="0 0 130 40" className="h-8 w-auto">
          <rect x="2" y="4" width="126" height="32" fill="none" stroke="#e30613" strokeWidth="2.5" />
          <text x="10" y="27" fill="#e30613" fontFamily="sans-serif" fontWeight="900" fontSize="20" letterSpacing="2">POLYCAB</text>
          <text x="12" y="37" fill="#ffffff" fontFamily="sans-serif" fontWeight="bold" fontSize="6" letterSpacing="1">WIRES & CABLES</text>
        </svg>
      )
    },
    {
      name: "Legrand",
      svg: (
        <svg viewBox="0 0 120 40" className="h-8 w-auto">
          <rect x="2" y="10" width="16" height="16" fill="#111" />
          <text x="6" y="23" fill="#fff" fontFamily="serif" fontSize="12">L</text>
          <text x="22" y="26" fill="#cc0000" fontFamily="sans-serif" fontWeight="bold" fontSize="20">legrand</text>
        </svg>
      )
    },
    {
      name: "Siemens",
      svg: (
        <svg viewBox="0 0 130 40" className="h-8 w-auto">
          <text x="5" y="22" fill="#009999" fontFamily="sans-serif" fontWeight="900" fontSize="16" letterSpacing="1">SIEMENS</text>
          <text x="6" y="33" fill="#ffffff" fontFamily="sans-serif" fontStyle="italic" fontSize="9">Ingenuity for life</text>
        </svg>
      )
    }
  ];

  return (
    <div className="bg-slate-950 py-10 overflow-hidden border-y border-white/10 relative shadow-2xl">
      <div className="absolute left-0 inset-y-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      <div className="flex overflow-hidden whitespace-nowrap">
        <motion.div 
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
          className="flex items-center gap-16 min-w-max px-8"
        >
          {[...brandLogos, ...brandLogos].map((brand, i) => (
            <div key={i} className="flex items-center gap-16 group cursor-default">
              <div className="transition-transform duration-300 group-hover:scale-110 flex items-center">
                {brand.svg}
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// --- QUALITY BANNER ---
const QualityBanner = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex items-center gap-6 p-8 rounded-2xl bg-[#F8F9FA] border border-gray-100 shadow-sm">
            <div className="w-16 h-16 rounded-xl bg-[#0033A0]/10 flex items-center justify-center text-[#0033A0] shrink-0">
              <ShieldCheck size={36} />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-[#0A1128] tracking-tight uppercase">
                100% QUALITY ASSURED
              </h3>
              <p className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">
                Rigorous testing standards
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 p-8 rounded-2xl bg-[#F8F9FA] border border-gray-100 shadow-sm">
            <div className="w-16 h-16 rounded-xl bg-[#D90429]/10 flex items-center justify-center text-[#D90429] shrink-0">
              <Zap size={36} />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-[#0A1128] tracking-tight uppercase">
                100% ORIGINAL PRODUCT
              </h3>
              <p className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">
                Authorized factory direct supply
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Divisions = ({ onNavigateShop }) => {
  const divisions = [
    {
      title: "Industrial Cables",
      desc: "Heavy-duty power transmission cables engineered for extreme environments, high-voltage applications, and zero-loss efficiency.",
      icon: <Cable className="w-12 h-12" />,
      color: "from-[#0033A0] to-[#0A1128]"
    },
    {
      title: "Commercial Wires",
      desc: "FR/FRLS insulated precision wiring solutions ensuring maximum fire safety and conductivity for commercial architecture.",
      icon: <Zap className="w-12 h-12" />,
      color: "from-[#D90429] to-[#800015]"
    },
    {
      title: "Electrical Goods",
      desc: "Enterprise-grade switchgears, distribution boards, and industrial lighting built to detect, protect, and illuminate.",
      icon: <Power className="w-12 h-12" />,
      color: "from-gray-800 to-black"
    }
  ];

  return (
    <section id="divisions" className="py-32 bg-[#F8F9FA] relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="text-4xl sm:text-6xl md:text-7xl font-black text-[#0A1128] tracking-tighter uppercase leading-none"
          >
            OUR <br />DIVISIONS<span className="text-[#D90429]">.</span>
          </motion.h2>
          
          <button
            onClick={onNavigateShop}
            className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-[#0A1128] cursor-pointer transition-colors"
          >
            View Shop Catalog <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {divisions.map((div, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.15, duration: 1, ease: EASE }}
              whileHover={{ y: -10 }}
              onClick={onNavigateShop}
              className="group relative p-10 md:p-14 bg-white rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${div.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out`} />
              
              <div className="relative z-10 flex flex-col h-full min-h-[350px] justify-between">
                <div>
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-8 group-hover:bg-white/10 transition-colors duration-500">
                    <div className="text-[#0A1128] group-hover:text-white transition-colors duration-500">
                      {div.icon}
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-[#0A1128] mb-4 group-hover:text-white transition-colors duration-500">
                    {div.title}
                  </h3>
                  <p className="text-gray-500 group-hover:text-white/80 font-light leading-relaxed transition-colors duration-500">
                    {div.desc}
                  </p>
                </div>
                
                <div className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#0033A0] group-hover:text-white transition-colors duration-500">
                  Explore Products <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ setActivePage }) => {
  return (
    <footer className="bg-[#0A1128] pt-24 pb-12 relative overflow-hidden text-white">
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none select-none flex justify-center opacity-[0.03]">
        <h2 className="text-[15vw] font-black text-white whitespace-nowrap leading-none tracking-tighter">
          TARANG ELECTRIC
        </h2>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-white/10 pb-16 mb-12">
          
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <BrandLogo className="w-14 h-14" />
                <div>
                   <h3 className="text-3xl font-black tracking-tighter uppercase text-white leading-none">
                     <span className="text-[#0033A0]">Tarang</span> <span className="text-[#D90429]">Electric</span>
                   </h3>
                   <span className="text-[0.6rem] font-bold tracking-[0.2em] text-gray-400 uppercase mt-1 block">House of Electrical Goods</span>
                </div>
              </div>
              <p className="text-white/60 font-light max-w-md leading-relaxed text-base">
                Driving energy transmission with absolute reliability and global engineering standards.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <h4 className="text-white font-bold tracking-[0.2em] uppercase text-sm mb-6 flex items-center gap-2">
              <MapPin className="text-[#D90429] w-4 h-4" /> Store Location
            </h4>
            <div className="text-white/60 font-light leading-relaxed text-sm space-y-1">
              <p className="font-bold text-white text-base mb-1">Tarang Electric</p>
              <p>Shop No-12, Maharaja Shopping Center,</p>
              <p>Nearby Ground Canteen, Umargam GIDC Estate,</p>
              <p>Umbergaon, Gujarat - 396171, India</p>
              <p className="pt-2 text-white font-semibold">
                <a href="tel:+919099560111" className="hover:text-[#D90429] transition-colors">
                  Phone: +91 90995 60111
                </a>
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-bold tracking-[0.2em] uppercase text-sm mb-6">Quick Navigation</h4>
            <ul className="space-y-3 text-white/60 font-medium text-sm">
              <li>
                <button onClick={() => setActivePage('home')} className="hover:text-white transition-colors uppercase tracking-wider">
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('shop')} className="hover:text-white transition-colors uppercase tracking-wider">
                  Shop Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('contact')} className="hover:text-white transition-colors uppercase tracking-wider">
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-white/40 text-xs font-bold uppercase tracking-widest gap-4">
          <p>&copy; {new Date().getFullYear()} Tarang Electric. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <div className="min-h-screen bg-[#0A1128] font-sans selection:bg-[#D90429] selection:text-white">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main className="pt-0">
        {activePage === 'home' && (
          <>
            <Hero onExplore={() => setActivePage('shop')} />
            <LogoMarquee />
            <QualityBanner />
            <Divisions onNavigateShop={() => setActivePage('shop')} />
          </>
        )}

        {activePage === 'shop' && (
          <div className="pt-24">
            <Shop onNavigateContact={() => setActivePage('contact')} />
          </div>
        )}

        {activePage === 'contact' && (
          <div className="pt-24">
            <ContactForm />
          </div>
        )}
      </main>

      <Footer setActivePage={setActivePage} />
    </div>
  );
}