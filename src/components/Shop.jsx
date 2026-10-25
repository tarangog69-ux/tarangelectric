import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Search, CheckCircle2, 
  AlertCircle, Loader2, Image as ImageIcon, ArrowRight, X, Send,
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, MessageCircle
} from 'lucide-react';
import { supabase } from '../supabaseClient';

const INITIAL_CATEGORIES = ["All", "Industrial Cables", "Commercial Wires", "Electrical Goods", "Lighting & Switches"];

export const Shop = ({ onNavigateContact }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  const STORE_WHATSAPP_NUMBER = "919099560111";

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl || supabaseUrl.includes('your-project-id') || supabaseUrl.includes('your-supabase-url')) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.warn("Supabase fetch note:", fetchError.message);
        setError(fetchError.message);
        setProducts([]);
      } else if (data) {
        setProducts(data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(item => {
    // Ensure only official brochure products are displayed
    const isBrochureItem = item.image_url && item.image_url.includes('/products/');
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) || 
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return isBrochureItem && matchesCategory && matchesSearch;
  });

  // Extract multiple product images helper
  const getProductImages = (product) => {
    if (!product) return [];
    
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images.filter(Boolean);
    }

    let imgs = [];
    if (product.image_url) {
      if (typeof product.image_url === 'string' && product.image_url.includes(',')) {
        imgs = product.image_url.split(',').map(s => s.trim()).filter(Boolean);
      } else {
        imgs.push(product.image_url);
      }
    }

    if (product.image_url_2) imgs.push(product.image_url_2);
    if (product.image_url_3) imgs.push(product.image_url_3);

    return imgs.filter(Boolean);
  };

  const handleOpenProduct = (product) => {
    setSelectedProduct(product);
    setActiveImgIndex(0);
    setZoomLevel(1);
  };

  const handleWhatsAppInquire = (product) => {
    const productName = product ? product.name : 'product';
    const message = encodeURIComponent(`Hello, i want to inquire about the ${productName}`);
    const whatsappUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.4, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.4, 1));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <section className="py-20 sm:py-24 bg-[#F8F9FA] text-[#0A1128] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        
        {/* Section Title */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#0A1128] tracking-tighter uppercase leading-none">
            OUR <br />PRODUCTS<span className="text-[#D90429]">.</span>
          </h2>
        </div>

        {/* Notifications */}
        {error && (
          <div className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
            <span>Database Connection Note: {error}</span>
          </div>
        )}

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {INITIAL_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? 'bg-[#0033A0] text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-full pl-11 pr-4 py-3 text-sm text-[#0A1128] placeholder-gray-400 focus:outline-none focus:border-[#0033A0] transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-[#0033A0]" />
            <p className="text-xs font-bold tracking-widest uppercase text-gray-500">Loading catalog from database...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-xl mx-auto">
            <ShoppingBag className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-[#0A1128] mb-2">No products in catalog yet</h3>
            <p className="text-gray-500 text-xs leading-relaxed max-w-md mx-auto">
              Your store is connected live to Supabase. Add your products into the <code className="text-[#0033A0] font-bold">products</code> table in your Supabase dashboard to display them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const productImgs = getProductImages(product);
              const displayImg = productImgs.length > 0 ? productImgs[0] : null;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleOpenProduct(product)}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* Image */}
                    <div className="h-56 sm:h-60 bg-white relative overflow-hidden flex items-center justify-center p-4 sm:p-5 border-b border-gray-100">
                      {displayImg ? (
                        <img 
                          src={displayImg} 
                          alt={product.name}
                          className="max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                          onError={(e) => {
                            e.target.onerror = null;
                          }}
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-400">
                          <ImageIcon size={32} />
                          <span className="text-xs">No Image Provided</span>
                        </div>
                      )}
                      
                      {product.category && (
                        <span className="absolute top-3 left-3 bg-[#0033A0] text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm z-10 pointer-events-none">
                          {product.category}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-6">
                      <h3 className="text-lg font-black text-[#0A1128] mb-2 line-clamp-2 leading-snug group-hover:text-[#0033A0] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 text-xs font-light line-clamp-3 leading-relaxed mb-4">
                        {product.description || ''}
                      </p>
                    </div>
                  </div>

                  {/* Footer Price & Action */}
                  <div className="p-6 pt-0 flex items-center justify-between border-t border-gray-100 mt-auto">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Price</span>
                      <span className="text-lg font-black text-[#0A1128]">{product.price || 'Contact Store'}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWhatsAppInquire(product);
                      }}
                      className="bg-gray-100 group-hover:bg-[#D90429] group-hover:text-white text-[#0A1128] px-4 py-2.5 rounded-xl text-xs font-bold transition-all uppercase tracking-wider flex items-center gap-1"
                    >
                      Inquire <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-3xl w-full shadow-2xl relative border border-gray-100 text-[#0A1128] max-h-[92vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full bg-gray-100 hover:bg-gray-200 z-20"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Product Images Container with Toggle & Zoom Controls */}
                <div className="md:col-span-6 flex flex-col">
                  <div className="h-72 sm:h-80 bg-white rounded-2xl p-6 border border-gray-100 flex items-center justify-center relative shadow-sm overflow-hidden group/img">
                    
                    {/* Zoom Control Buttons */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm p-1 rounded-xl shadow border border-gray-200 z-20">
                      <button
                        onClick={handleZoomIn}
                        disabled={zoomLevel >= 2.5}
                        className="p-1.5 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                        title="Zoom In (+)"
                      >
                        <ZoomIn size={16} />
                      </button>
                      <button
                        onClick={handleZoomOut}
                        disabled={zoomLevel <= 1}
                        className="p-1.5 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                        title="Zoom Out (-)"
                      >
                        <ZoomOut size={16} />
                      </button>
                      {zoomLevel > 1 && (
                        <button
                          onClick={handleResetZoom}
                          className="p-1.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                          title="Reset Zoom"
                        >
                          <RotateCcw size={14} />
                        </button>
                      )}
                    </div>

                    {/* Toggle Front / Back Arrows */}
                    {getProductImages(selectedProduct).length > 1 && (
                      <>
                        <button
                          onClick={() => {
                            const imgs = getProductImages(selectedProduct);
                            setActiveImgIndex(prev => (prev > 0 ? prev - 1 : imgs.length - 1));
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-900/60 hover:bg-slate-900 text-white p-2 rounded-full transition-colors z-20 shadow-md"
                          title="Previous Photo"
                        >
                          <ChevronLeft size={18} />
                        </button>

                        <button
                          onClick={() => {
                            const imgs = getProductImages(selectedProduct);
                            setActiveImgIndex(prev => (prev < imgs.length - 1 ? prev + 1 : 0));
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-900/60 hover:bg-slate-900 text-white p-2 rounded-full transition-colors z-20 shadow-md"
                          title="Next Photo"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </>
                    )}

                    {/* Main Image with Zoom Transform */}
                    {getProductImages(selectedProduct).length > 0 ? (
                      <div className="w-full h-full flex items-center justify-center overflow-hidden">
                        <img
                          src={getProductImages(selectedProduct)[activeImgIndex] || getProductImages(selectedProduct)[0]}
                          alt={selectedProduct.name}
                          style={{ transform: `scale(${zoomLevel})` }}
                          className="max-w-full max-h-full object-contain transition-transform duration-200 cursor-zoom-in"
                          onDoubleClick={() => setZoomLevel(zoomLevel > 1 ? 1 : 1.8)}
                          onError={(e) => {
                            e.target.onerror = null;
                          }}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-gray-400 p-8 text-center">
                        <ImageIcon size={48} />
                        <span className="text-xs font-semibold">No Image Available</span>
                      </div>
                    )}

                    {selectedProduct.category && (
                      <span className="absolute top-3 left-3 bg-[#0033A0] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow z-10">
                        {selectedProduct.category}
                      </span>
                    )}
                  </div>

                  {/* Thumbnail Selector for Multiple Photos */}
                  {getProductImages(selectedProduct).length > 1 && (
                    <div className="flex gap-2 mt-3 justify-center overflow-x-auto py-1">
                      {getProductImages(selectedProduct).map((imgUrl, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setActiveImgIndex(idx);
                            setZoomLevel(1);
                          }}
                          className={`w-14 h-14 rounded-xl border-2 overflow-hidden bg-white p-1 transition-all flex items-center justify-center ${
                            activeImgIndex === idx 
                              ? 'border-[#0033A0] shadow-md scale-105' 
                              : 'border-gray-200 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={imgUrl} alt={`Photo ${idx + 1}`} className="max-w-full max-h-full object-contain" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Details Column */}
                <div className="md:col-span-6 flex flex-col justify-between h-full space-y-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-[#0A1128] uppercase leading-tight tracking-tight mb-4">
                      {selectedProduct.name}
                    </h3>

                    <div className="mb-6 p-4 rounded-xl bg-[#F8F9FA] border border-gray-100">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                        PRICE / RATE
                      </span>
                      <span className="text-2xl font-black text-[#D90429]">
                        {selectedProduct.price || 'Contact Store for Price'}
                      </span>
                    </div>

                    {selectedProduct.description && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                          PRODUCT DESCRIPTION
                        </h4>
                        <p className="text-gray-600 text-sm font-light leading-relaxed">
                          {selectedProduct.description}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      onClick={() => handleWhatsAppInquire(selectedProduct)}
                      className="flex-1 bg-[#0033A0] hover:bg-[#002277] text-white py-4 px-6 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                    >
                      INQUIRE <Send size={14} />
                    </button>

                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="bg-gray-100 hover:bg-gray-200 text-[#0A1128] py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-xs"
                    >
                      CLOSE
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
