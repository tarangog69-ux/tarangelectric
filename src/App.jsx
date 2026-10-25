import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, Power, Zap, Cable, ShieldCheck, 
  Menu, X, ArrowRight, MapPin, Phone, Cpu, Wrench, 
  Layers, Gauge, CheckCircle2, FileText, 
  MessageCircle, Sparkles, Clock, ChevronRight
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

const STORE_WHATSAPP_NUMBER = "919099560111";
const STORE_PHONE = "+91 90995 60111";

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
          scrolled || activePage !== 'home' ? 'bg-white/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.06)] py-4' : 'bg-transparent py-8'
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
              href={`tel:${STORE_PHONE.replace(/\s+/g, '')}`}
              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full border transition-all ${
                scrolled || activePage !== 'home'
                  ? 'bg-blue-50 text-[#0033A0] border-blue-200 hover:bg-[#0033A0] hover:text-white'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white hover:text-[#0A1128]'
              }`}
            >
              <Phone size={14} className="text-[#D90429]" /> {STORE_PHONE}
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
                href={`tel:${STORE_PHONE.replace(/\s+/g, '')}`}
                className="mt-4 flex items-center gap-2 text-lg font-bold uppercase tracking-wider text-white bg-[#0033A0] px-6 py-3 rounded-full"
              >
                <Phone size={20} /> {STORE_PHONE}
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
    <section id="home" ref={vantaRef} className="relative min-h-screen overflow-hidden flex items-center justify-center pt-28 pb-20" style={{ backgroundColor: '#121010' }}>
      
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
              <motion.h1 variants={textReveal} className="text-3xl sm:text-5xl md:text-7xl lg:text-[5.2rem] font-extrabold text-white leading-[0.95] tracking-tight font-serif">
                POWERING
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1 variants={textReveal} className="text-3xl sm:text-5xl md:text-7xl lg:text-[5.2rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0033A0] via-[#4361ee] to-white leading-[0.95] tracking-tight font-serif">
                MODERN
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1 variants={textReveal} className="text-3xl sm:text-5xl md:text-7xl lg:text-[5.2rem] font-extrabold text-white leading-[0.95] tracking-tight font-serif">
                INFRASTRUCTURE<span className="text-[#D90429]">.</span>
              </motion.h1>
            </div>
          </div>

          <motion.p variants={fadeInUp} className="text-base md:text-xl text-white/80 max-w-2xl font-light leading-relaxed mb-8 tracking-wide">
            Your trusted industrial electrical partner in Umbergaon GIDC and beyond. Authorized stockists of control panel accessories, flexible wires, heavy-duty industrial cables, switchgear, cable glands, lugs, and precision testing instruments.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 sm:gap-6 items-center mb-12">
            <button
              onClick={onExplore}
              className="group relative overflow-hidden bg-white text-[#0A1128] px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs md:text-sm flex items-center gap-3 shadow-2xl transition-transform hover:scale-105"
            >
              <span className="relative z-10">Explore Catalog</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-300 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </button>

            <a
              href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Tarang Electric, I would like to inquire about industrial electrical products and price lists.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-white/10 hover:bg-white/20 border border-white/20 text-white px-7 py-4 rounded-full font-bold uppercase tracking-widest text-xs md:text-sm flex items-center gap-2 backdrop-blur-md transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Request Quotation</span>
            </a>
          </motion.div>

          {/* Quick Electrical Highlights Strip */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-white/70">
            <div>
              <p className="text-white text-xl sm:text-2xl font-black">30+</p>
              <p className="text-xs tracking-wider uppercase text-gray-400 mt-0.5">Top Electrical Brands</p>
            </div>
            <div>
              <p className="text-white text-xl sm:text-2xl font-black">100%</p>
              <p className="text-xs tracking-wider uppercase text-gray-400 mt-0.5">Tested &amp; Genuine</p>
            </div>
            <div>
              <p className="text-white text-xl sm:text-2xl font-black">READY</p>
              <p className="text-xs tracking-wider uppercase text-gray-400 mt-0.5">Stock Available</p>
            </div>
            <div>
              <p className="text-white text-xl sm:text-2xl font-black">BEST</p>
              <p className="text-xs tracking-wider uppercase text-gray-400 mt-0.5">Wholesale Rates</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// --- OFFICIAL SVG LOGO MARQUEE (EXPANDED WITH REFERENCE BRANDS) ---
const LogoMarquee = () => {
  const brandLogos = [
    {
      name: "BCH Electric",
      svg: (
        <a
          href="https://bchindia.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3.5 bg-gradient-to-r from-red-950/40 via-blue-950/40 to-slate-900/60 hover:from-red-900/60 hover:to-blue-900/60 px-5 py-2.5 rounded-full border border-[#D90429]/50 hover:border-[#D90429] transition-all shadow-lg group/bch cursor-pointer"
        >
          <svg viewBox="0 0 115 38" className="h-7 w-auto shrink-0">
            <rect x="2" y="4" width="111" height="30" rx="4" fill="#003366" />
            <text x="10" y="26" fill="#ffffff" fontFamily="sans-serif" fontWeight="900" fontSize="21" letterSpacing="1.5">BCH</text>
            <text x="66" y="24" fill="#e30613" fontFamily="sans-serif" fontWeight="900" fontSize="10" letterSpacing="0.5">ELECTRIC</text>
          </svg>
          <div className="h-5 w-px bg-white/20 shrink-0" />
          <div className="flex items-center gap-2 text-xs shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#D90429] animate-pulse shrink-0" />
            <span className="font-extrabold uppercase tracking-wider text-white text-[0.72rem] sm:text-xs whitespace-nowrap">
              OFFICIAL DISTRIBUTOR OF <span className="text-[#D90429]">BCH ELECTRIC LIMITED (BCHINDIA.COM)</span>
            </span>
            <span className="text-gray-300 font-semibold tracking-wider uppercase text-[0.65rem] whitespace-nowrap">
              &bull; SWITCHGEAR &bull; MOTOR STARTERS &bull; INDUSTRIAL CONTROL GEAR
            </span>
          </div>
        </a>
      )
    },
    {
      name: "Jainson",
      svg: (
        <svg viewBox="0 0 130 40" className="h-8 w-auto">
          <text x="4" y="26" fill="#d90429" fontFamily="sans-serif" fontWeight="900" fontSize="20" letterSpacing="1">JAINSON</text>
          <line x1="4" y1="32" x2="114" y2="32" stroke="#0033A0" strokeWidth="2.5" />
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
          <text x="12" y="37" fill="#ffffff" fontFamily="sans-serif" fontWeight="bold" fontSize="6" letterSpacing="1">WIRES &amp; CABLES</text>
        </svg>
      )
    },
    {
      name: "L&T Switchgear",
      svg: (
        <svg viewBox="0 0 135 40" className="h-8 w-auto">
          <rect x="2" y="6" width="26" height="26" rx="4" fill="#003366" />
          <text x="8" y="25" fill="#ffffff" fontFamily="sans-serif" fontWeight="900" fontSize="15">LT</text>
          <text x="36" y="20" fill="#003366" fontFamily="sans-serif" fontWeight="900" fontSize="13" letterSpacing="1">L&amp;T</text>
          <text x="36" y="31" fill="#e30613" fontFamily="sans-serif" fontWeight="bold" fontSize="9" letterSpacing="0.5">SWITCHGEAR</text>
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
    },
    {
      name: "Schneider Electric",
      svg: (
        <svg viewBox="0 0 160 40" className="h-8 w-auto">
          <path d="M10 25 Q 16 12 22 25 Q 16 35 10 25 Z" fill="#32b53a" />
          <text x="32" y="24" fill="#32b53a" fontFamily="sans-serif" fontWeight="bold" fontSize="14">Schneider</text>
          <text x="32" y="35" fill="#32b53a" fontFamily="sans-serif" fontWeight="bold" fontSize="9" letterSpacing="1">Electric</text>
        </svg>
      )
    },
    {
      name: "Meco",
      svg: (
        <svg viewBox="0 0 110 40" className="h-8 w-auto">
          <rect x="2" y="6" width="106" height="28" rx="4" fill="#003366" />
          <text x="14" y="27" fill="#ffffff" fontFamily="sans-serif" fontWeight="900" fontSize="20" letterSpacing="3">MECO</text>
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
      name: "KSS",
      svg: (
        <svg viewBox="0 0 110 40" className="h-8 w-auto">
          <polygon points="12,8 28,8 22,32 6,32" fill="#00539f" />
          <text x="36" y="27" fill="#00539f" fontFamily="sans-serif" fontWeight="900" fontSize="22" letterSpacing="2">KSS</text>
        </svg>
      )
    },
    {
      name: "Jigo",
      svg: (
        <svg viewBox="0 0 110 40" className="h-8 w-auto">
          <circle cx="20" cy="20" r="14" fill="#d90429" />
          <path d="M16 20 L24 20 M20 16 L20 24" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <text x="42" y="27" fill="#ffffff" fontFamily="sans-serif" fontWeight="900" fontSize="18" letterSpacing="1">JIGO</text>
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
      name: "Crompton Lighting",
      svg: (
        <svg viewBox="0 0 150 40" className="h-8 w-auto">
          <rect x="2" y="4" width="30" height="16" fill="#003399" />
          <rect x="32" y="4" width="30" height="16" fill="#66cc00" />
          <text x="18" y="17" fill="#ffffff" fontFamily="sans-serif" fontWeight="900" fontSize="12">G</text>
          <text x="2" y="34" fill="#ffffff" fontFamily="sans-serif" fontWeight="bold" fontSize="11">Crompton Lighting</text>
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
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
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

// --- INDUSTRIAL ELECTRICAL TRUST PILLARS ---
const QualityBanner = () => {
  const pillars = [
    {
      icon: <ShieldCheck size={32} />,
      title: "100% Quality Assured",
      desc: "Strict adherence to ISI, CE, and industrial safety compliance standards.",
      iconBg: "bg-[#0033A0]/10 text-[#0033A0]"
    },
    {
      icon: <Zap size={32} />,
      title: "100% Original Products",
      desc: "Direct authorized factory supply ensuring genuine copper conductivity and thermal ratings.",
      iconBg: "bg-[#D90429]/10 text-[#D90429]"
    },
    {
      icon: <Clock size={32} />,
      title: "Ready Stock",
      desc: "Immediate availability of essential electrical goods, cables, and panel accessories to eliminate plant downtime.",
      iconBg: "bg-amber-500/10 text-amber-600"
    },
    {
      icon: <FileText size={32} />,
      title: "Competitive Wholesale Pricing",
      desc: "Direct bulk trade pricing, transparent quotations, and tailored product recommendations for all projects.",
      iconBg: "bg-emerald-500/10 text-emerald-600"
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-gray-100 relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, i) => (
            <div 
              key={i} 
              className="flex flex-col p-7 rounded-2xl bg-[#F8F9FA] border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${item.iconBg} flex items-center justify-center mb-5 shrink-0`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-black text-[#0A1128] tracking-tight uppercase mb-2">
                {item.title}
              </h3>
              <p className="text-sm font-normal text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- CORE DIVISIONS SECTION ---
const Divisions = ({ onNavigateShop }) => {
  const divisions = [
    {
      title: "Industrial Cables",
      desc: "Heavy-duty power transmission cables engineered for extreme environments, high-voltage applications, and zero-loss efficiency.",
      specs: ["Armoured LT / HT XLPE Cables", "Multi-core Control & Instrumentation", "3-Core Submersible Flat Cables"],
      icon: <Cable className="w-12 h-12" />,
      color: "from-[#0033A0] to-[#0A1128]"
    },
    {
      title: "Commercial Wires",
      desc: "FR/FRLS insulated precision wiring solutions ensuring maximum fire safety and conductivity for commercial architecture.",
      specs: ["FRLS / ZHFR Flame Retardant", "Multi-strand Annealed Copper", "High Thermal & Spark Resistance"],
      icon: <Zap className="w-12 h-12" />,
      color: "from-[#D90429] to-[#800015]"
    },
    {
      title: "Electrical Goods",
      desc: "Enterprise-grade switchgear, distribution boards, and industrial lighting built to detect, protect, and illuminate.",
      specs: ["MCB / MCCB Circuit Breakers", "Heavy-duty Power Contactors", "Modular Panel Accessories"],
      icon: <Power className="w-12 h-12" />,
      color: "from-gray-800 to-black"
    }
  ];

  return (
    <section id="divisions" className="py-28 bg-[#F8F9FA] relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <span className="text-xs font-black tracking-widest uppercase text-[#0033A0] block mb-2">
              ENGINEERED ENERGY TRANSMISSION
            </span>
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
              className="text-4xl sm:text-6xl md:text-7xl font-black text-[#0A1128] tracking-tighter uppercase leading-none"
            >
              OUR CORE <br />DIVISIONS<span className="text-[#D90429]">.</span>
            </motion.h2>
          </div>
          
          <button
            onClick={onNavigateShop}
            className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-[#0A1128] cursor-pointer transition-colors mt-6 md:mt-0"
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
              whileHover={{ y: -8 }}
              onClick={onNavigateShop}
              className="group relative p-8 md:p-12 bg-white rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 cursor-pointer border border-gray-100 flex flex-col justify-between"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${div.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out`} />
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white/10 transition-colors duration-500">
                  <div className="text-[#0A1128] group-hover:text-white transition-colors duration-500">
                    {div.icon}
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-[#0A1128] mb-4 group-hover:text-white transition-colors duration-500">
                  {div.title}
                </h3>
                <p className="text-gray-600 group-hover:text-white/80 font-light leading-relaxed transition-colors duration-500 mb-6 text-sm md:text-base">
                  {div.desc}
                </p>

                {/* Electrical spec bullets */}
                <div className="space-y-2 pt-4 border-t border-gray-100 group-hover:border-white/10 transition-colors">
                  {div.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 group-hover:text-white/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D90429] group-hover:bg-white" />
                      {spec}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative z-10 mt-8 pt-4 flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-[#0033A0] group-hover:text-white transition-colors duration-500">
                Explore Category <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- DETAILED INDUSTRIAL ELECTRICAL PRODUCT PORTFOLIO (REFERENCE INSPIRED) ---
const ElectricalPortfolio = ({ onNavigateShop }) => {
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    {
      id: "panel",
      title: "Control Panel Accessories",
      tag: "PANEL HARDWARE",
      icon: <Cpu className="w-8 h-8 text-[#0033A0]" />,
      summary: "Precision panel accessories and enclosures for seamless switchboard wiring and secure enclosure mounting.",
      items: [
        "PVC Slotted Channels & Wiring Trunking",
        "Cable Tie Mounts & Identification Tags",
        "Self-Adhesive Panel Gaskets & Lacing Cords",
        "DMC / Epoxy Busbar Insulators & Supports",
        "Neutral Links & TPN Power Connectors",
        "M.S. & Stainless Steel Panel Locks, Keys & Knobs",
        "DIN-Rail Mounted Terminal Blocks & End Stops"
      ],
      brands: ["Elmex", "KSS", "Jigo", "Metal Craft (MCI)"]
    },
    {
      id: "cables",
      title: "Flexible Wires & Power Cables",
      tag: "CONDUCTORS & TRANSMISSION",
      icon: <Cable className="w-8 h-8 text-[#D90429]" />,
      summary: "Certified high-conductivity conductors engineered for zero-loss power delivery and superior fire protection.",
      items: [
        "Multi-core Industrial Flexible Copper Wires",
        "FR / FRLS / ZHFR Fire-Retardant Building Wires",
        "LT / HT Armoured Power Transmission Cables",
        "Shielded Control & Instrumentation Cables",
        "3-Core Flat Cables for Submersible Pumps",
        "Solar DC Cables & Heat-Resistant Elastomeric Leads",
        "Rubber Insulated & High-Flex Trailing Cables"
      ],
      brands: ["Polycab", "Apar Anushakti", "GreatWhite", "SGI"]
    },
    {
      id: "switchgear",
      title: "Industrial Switchgear & Relays",
      tag: "CIRCUIT PROTECTION",
      icon: <Power className="w-8 h-8 text-[#0033A0]" />,
      summary: "Mission-critical motor starters, circuit breakers, and switches designed to protect equipment and ensure uptime.",
      items: [
        "Air Circuit Breakers (ACB) & Moulded Case Breakers (MCCB)",
        "Miniature Circuit Breakers (MCB) & Isolators",
        "3-Pole & 4-Pole Power Contactors",
        "Bimetallic Thermal Overload Relays (TOR)",
        "Motor Protection Circuit Breakers (MPCB)",
        "Rotary Cam Switches & Volt / Ammeter Selectors",
        "Changeover & Auto-Transfer Switches (ATS)"
      ],
      brands: ["BCH Electric (Distributor)", "Schneider Electric", "Siemens", "L&T Switchgear", "Hager"]
    },
    {
      id: "glands-lugs",
      title: "Cable Glands, Lugs & Terminals",
      tag: "TERMINATIONS",
      icon: <Layers className="w-8 h-8 text-[#D90429]" />,
      summary: "Heavy-duty crimping hardware and glands for safe, corrosion-resistant, and high-conductivity connections.",
      items: [
        "Single & Double Compression Brass Cable Glands",
        "Weatherproof PVC / Nylon Glands with Locknuts",
        "Heavy-duty Electrolytic Copper Ring / Pin / Fork Lugs",
        "Aluminium Tubular Crimping Ferrules & Inline Connectors",
        "Bimetallic Friction-Welded Transition Lugs",
        "Heat Shrinkable Terminations & Transition Sleeves",
        "Brass Earth Tags & Shrouds"
      ],
      brands: ["Hex", "Jainson", "Kripson", "Brisk"]
    },
    {
      id: "testing",
      title: "Testing & Measuring Instruments",
      tag: "SAFETY & CALIBRATION",
      icon: <Gauge className="w-8 h-8 text-[#0033A0]" />,
      summary: "Professional diagnostic instruments for accurate field verification, phase detection, and preventive maintenance.",
      items: [
        "True RMS Digital Multimeters with Backlight",
        "AC / DC Digital Clamp Meters (up to 1000A)",
        "Insulation Resistance Testers (Megger)",
        "Digital Earth Resistance Testers & Phase Indicators",
        "Non-Contact High-Voltage AC Detectors",
        "Digital Panel Voltmeters & Ammeters",
        "Laser Tachometers & Thermal Sensors"
      ],
      brands: ["Meco", "Kusam Meco", "Waco", "Neotech"]
    },
    {
      id: "tools",
      title: "Crimping Tools & Enclosure Cooling",
      tag: "ASSEMBLY & WORKSHOP",
      icon: <Wrench className="w-8 h-8 text-[#D90429]" />,
      summary: "Rugged contractor tools, enclosure ventilation fans, and accessories essential for clean, professional panel builds.",
      items: [
        "Hydraulic & Heavy-Duty Ratchet Crimping Tools",
        "High-Leverage Cable Cutters & Wire Strippers",
        "Enclosure Fan Filters with Louvers (120mm to 250mm)",
        "Panel Exhaust Fans & Thermostats",
        "UV-Resistant Nylon Cable Ties & Tensioning Tools",
        "Heat Guns & Polyolefin Heat Shrink Tubing",
        "Ferruling Guns & Cable Marker Systems"
      ],
      brands: ["Jainson", "Sibass", "Elettro", "SFX"]
    }
  ];

  const filteredCategories = activeTab === "all" 
    ? categories 
    : categories.filter(c => c.id === activeTab);

  return (
    <section className="py-28 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0033A0] text-xs font-black tracking-widest uppercase mb-4">
            <Sparkles size={14} className="text-[#D90429]" />
            INDUSTRIAL ELECTRICAL CATALOGUE
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0A1128] tracking-tight uppercase leading-tight mb-4">
            ELECTRICAL PRODUCTS <br />WE DISTRIBUTE<span className="text-[#D90429]">.</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed">
            As authorized stockists and dealers for premier national brands, Tarang Electric supplies comprehensive electrical panel components, switchgear, wiring, and testing tools for heavy industries, panel builders, and contractors.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "all"
                ? "bg-[#0A1128] text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All Products ({categories.length})
          </button>
          <button
            onClick={() => setActiveTab("panel")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "panel"
                ? "bg-[#0033A0] text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Control Panel Accessories
          </button>
          <button
            onClick={() => setActiveTab("cables")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "cables"
                ? "bg-[#D90429] text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Wires &amp; Cables
          </button>
          <button
            onClick={() => setActiveTab("switchgear")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "switchgear"
                ? "bg-[#0033A0] text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Switchgear &amp; Relays
          </button>
          <button
            onClick={() => setActiveTab("glands-lugs")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "glands-lugs"
                ? "bg-[#D90429] text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Glands, Lugs &amp; Terminals
          </button>
          <button
            onClick={() => setActiveTab("testing")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "testing"
                ? "bg-[#0033A0] text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Testing Meters
          </button>
          <button
            onClick={() => setActiveTab("tools")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "tools"
                ? "bg-[#D90429] text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Tools &amp; Cooling
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="group bg-[#F8F9FA] rounded-2xl p-8 border border-gray-200/80 hover:border-gray-300 hover:bg-white hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-white border border-gray-200/60 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {cat.icon}
                  </div>
                  <span className="text-[0.65rem] font-black tracking-widest uppercase px-3 py-1 bg-white border border-gray-200 text-gray-500 rounded-full">
                    {cat.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-[#0A1128] mb-3 group-hover:text-[#0033A0] transition-colors tracking-tight">
                  {cat.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 font-normal">
                  {cat.summary}
                </p>

                {/* Sub-items list */}
                <div className="mb-6 space-y-2">
                  <p className="text-xs font-bold text-[#0A1128] uppercase tracking-wider mb-2">
                    Key Electrical Items:
                  </p>
                  {cat.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle2 size={13} className="text-[#0033A0] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Associated Brands */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Trusted Brands:
                  </p>
                  <p className="text-xs font-semibold text-[#0A1128]">
                    {cat.brands.join(" • ")}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-4 border-t border-gray-200 flex items-center justify-between gap-3">
                <button
                  onClick={onNavigateShop}
                  className="text-xs font-black uppercase tracking-wider text-[#0033A0] hover:text-[#D90429] flex items-center gap-1 transition-colors"
                >
                  View in Shop <ChevronRight size={14} />
                </button>

                <a
                  href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello Tarang Electric, I want to inquire about availability and pricing for: ${cat.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
                >
                  <MessageCircle size={13} /> Inquire
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- INDUSTRIAL SECTORS & APPLICATIONS SECTION ---
const IndustrialApplications = () => {
  const sectors = [
    {
      title: "Control Panel Builders & Switchboard OEMs",
      desc: "Supplying precision slotted trunking, DMC busbar supports, neutral links, DIN rail terminals, and cabinet locks for PCC, MCC, and APFC panels.",
      items: ["PCC / MCC Panels", "APFC Power Factor Panels", "Automation Control Consoles"]
    },
    {
      title: "Heavy Industries & Manufacturing Units",
      desc: "Armoured HT/LT cables, high-current MCCBs, bimetallic crimping lugs, and motor circuit breakers built for heavy duty plant machinery.",
      items: ["Chemical & Pharma Plants", "Steel & Plastic Fabricators", "Textile & Packaging Mills"]
    },
    {
      title: "Automation & Machinery Manufacturers",
      desc: "Shielded multi-core flexible control cables, true RMS digital multimeters, rotary cam switches, and enclosure cooling fan units.",
      items: ["CNC & Conveyor Systems", "Packaging Automation", "Solar & Renewable Inverters"]
    },
    {
      title: "Electrical & Infrastructure Contractors",
      desc: "Comprehensive bulk distribution of FRLS wires, distribution boards, brass cable glands, and copper earthing materials for projects.",
      items: ["Commercial High-Rises", "Industrial Warehouses", "Utility Substation Feeders"]
    }
  ];

  return (
    <section className="py-24 bg-[#0A1128] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0033A0]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D90429]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#D90429] block mb-2">
              POWERING INDUSTRIAL PERFORMANCE
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase leading-none">
              WHO WE <br />SERVE<span className="text-[#0033A0]">.</span>
            </h2>
          </div>
          <p className="text-white/70 max-w-md font-light text-sm sm:text-base mt-4 md:mt-0 leading-relaxed">
            Delivering engineered electrical equipment and verified electrical hardware to mission-critical facilities across Umbergaon GIDC and western India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sec, i) => (
            <div 
              key={i} 
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-[#D90429] font-mono text-sm font-black mb-3 block">0{i + 1}</span>
                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-3">
                  {sec.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-6 font-light">
                  {sec.desc}
                </p>
              </div>

              <div className="space-y-1.5 pt-4 border-t border-white/10">
                {sec.items.map((it, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0033A0]" />
                    {it}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- RFQ & BRAND PRICE LIST CALLOUT (REFERENCE INSPIRED) ---
const ElectricalRFQBanner = ({ onNavigateContact }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#0033A0] to-[#0A1128] text-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight mb-4">
              NEED BRAND PRICE LISTS OR A CUSTOM PROJECT QUOTATION?
            </h2>
            <p className="text-white/80 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
              Whether you need bulk quantity rates on Hex lugs, Polycab industrial cables, L&amp;T switchgear, or Jainson crimping tools — submit your product requirements for an instant quotation.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center lg:items-end">
            <a
              href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Tarang Electric, I have a requirement for industrial electrical items and would like to request a quotation/price list.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-[#25D366] text-white hover:bg-[#20ba59] font-black text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-all text-center"
            >
              <MessageCircle size={18} />
              <span>WhatsApp Instant Quote</span>
            </a>

            <button
              onClick={onNavigateContact}
              className="px-8 py-4 rounded-full bg-white text-[#0A1128] hover:bg-gray-100 font-black text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl transition-all text-center"
            >
              <span>Contact Store Directly</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

const Footer = ({ setActivePage }) => {
  return (
    <footer className="bg-[#0A1128] pt-24 pb-12 relative overflow-hidden text-white border-t border-white/10">
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
              <p className="text-white/60 font-light max-w-md leading-relaxed text-base mb-6">
                Authorized dealers and suppliers of industrial electrical items, control panel accessories, flexible wires, cables, switchgear, cable glands, lugs, and testing instruments.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Serving Umbergaon GIDC &amp; Industrial Regions
              </div>
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
                <a href={`tel:${STORE_PHONE.replace(/\s+/g, '')}`} className="hover:text-[#D90429] transition-colors">
                  Phone: {STORE_PHONE}
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
                  Contact &amp; Location
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-white/40 text-xs font-bold uppercase tracking-widest gap-4">
          <p>&copy; {new Date().getFullYear()} Tarang Electric. All rights reserved.</p>
          <p>House of Industrial Electrical Goods &amp; Control Panel Accessories</p>
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
            <ElectricalPortfolio onNavigateShop={() => setActivePage('shop')} />
            <IndustrialApplications />
            <ElectricalRFQBanner onNavigateContact={() => setActivePage('contact')} />
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