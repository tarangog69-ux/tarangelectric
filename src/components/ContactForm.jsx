import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, Phone, User, MessageSquare, CheckCircle2, AlertCircle, 
  Loader2, MapPin, ArrowUpRight, ExternalLink, MessageCircle 
} from 'lucide-react';
import { supabase } from '../supabaseClient';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    query: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  const MAP_SHARE_LINK = "https://share.google/Bk2m217yEUFbqnkMR";
  const STORE_PHONE = "+91 90995 60111";
  const STORE_PHONE_TEL = "+919099560111";
  const WHATSAPP_LINK = "https://wa.me/919099560111?text=Hello%20Tarang%20Electric,%20I%20have%20an%20inquiry%20regarding%20electrical%20products.";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

      if (!formData.name.trim() || !formData.phone.trim() || !formData.query.trim()) {
        setStatus({ type: 'error', message: 'Please complete all fields before submitting.' });
        setLoading(false);
        return;
      }

      if (!supabaseUrl || supabaseUrl.includes('your-project-id') || supabaseUrl.includes('your-supabase-url')) {
        setStatus({
          type: 'success',
          message: `Thank you, ${formData.name}! Your message has been logged. Connect Supabase credentials to persist database entries.`
        });
        setFormData({ name: '', phone: '', query: '' });
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('contact_queries')
        .insert([
          {
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            query: formData.query.trim(),
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) throw error;

      setStatus({
        type: 'success',
        message: `Thank you, ${formData.name}! Your query has been recorded in our Supabase database. Our team will contact you shortly.`
      });

      setFormData({ name: '', phone: '', query: '' });

    } catch (err) {
      console.error('Supabase submission error:', err);
      setStatus({
        type: 'error',
        message: err.message || 'Unable to submit query. Please verify Supabase database configuration.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-[#F8F9FA] text-[#0A1128] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-6">
          <div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#0A1128] tracking-tighter uppercase leading-none">
              GET IN <br />TOUCH<span className="text-[#D90429]">.</span>
            </h2>
            <p className="text-gray-500 font-light text-sm sm:text-base mt-4 max-w-xl">
              Post your query, phone number, and requirements directly into our database, or reach out to us directly on WhatsApp.
            </p>
          </div>

          <a
            href={MAP_SHARE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0033A0] hover:text-[#D90429] transition-colors"
          >
            Google Maps Location <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          {/* Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-xl shadow-gray-200/50"
          >
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0A1128] mb-6">
              Post Your Message
            </h3>

            {status.type === 'success' && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Query Received!</p>
                  <p className="text-xs text-emerald-700 mt-0.5">{status.message}</p>
                </div>
              </div>
            )}

            {status.type === 'error' && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Submission Notice</p>
                  <p className="text-xs text-red-700 mt-0.5">{status.message}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-2">
                  <User size={14} className="text-[#0033A0]" /> Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm text-[#0A1128] placeholder-gray-400 focus:outline-none focus:border-[#0033A0] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-2">
                  <Phone size={14} className="text-[#0033A0]" /> Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="e.g. +91 90995 60111"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm text-[#0A1128] placeholder-gray-400 focus:outline-none focus:border-[#0033A0] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-2">
                  <MessageSquare size={14} className="text-[#0033A0]" /> Your Query *
                </label>
                <textarea
                  name="query"
                  required
                  rows={4}
                  placeholder="Describe your requirement or product specifications..."
                  value={formData.query}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm text-[#0A1128] placeholder-gray-400 focus:outline-none focus:border-[#0033A0] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0033A0] hover:bg-[#002277] text-white py-4 rounded-xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-xl transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting to Supabase...
                  </>
                ) : (
                  <>
                    Submit Query <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Store Details & WhatsApp Card Column */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* WhatsApp Inquiry Card */}
            <div className="bg-emerald-600 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                  <MessageCircle size={28} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
                  Instant Support
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-2">
                Enquire on WhatsApp
              </h4>
              <p className="text-xs text-emerald-100 leading-relaxed mb-6 font-light">
                Have an urgent requirement for wires, cables, or switchboards? Send a direct message to our store on WhatsApp.
              </p>

              <div className="mb-6 flex items-center gap-3 bg-emerald-700/60 p-4 rounded-xl border border-emerald-500/40">
                <Phone size={18} className="text-emerald-200 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-200 block">WhatsApp Phone Number</span>
                  <a href={`tel:${STORE_PHONE_TEL}`} className="font-bold text-white text-base hover:underline">
                    {STORE_PHONE}
                  </a>
                </div>
              </div>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-emerald-900 hover:bg-emerald-50 py-3.5 px-6 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                Chat on WhatsApp <ExternalLink size={16} />
              </a>
            </div>

            {/* Store Location Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-xl shadow-gray-200/50 space-y-6">
              <div>
                <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4 flex items-center gap-2">
                  <MapPin className="text-[#D90429] w-4 h-4" /> Store Location
                </h4>
                <div className="text-[#0A1128] leading-relaxed text-base">
                  <p className="font-bold text-lg mb-1">Tarang Electric</p>
                  <p className="text-gray-700 font-medium">Shop No-12, Maharaja Shopping Center,</p>
                  <p className="text-gray-600 font-light">Nearby Ground Canteen, Umargam GIDC Estate,</p>
                  <p className="text-gray-600 font-light">Umbergaon, Gujarat - 396171, India</p>
                </div>
              </div>

              <hr className="border-gray-100" />

              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Direct Phone Call</span>
                  <a href={`tel:${STORE_PHONE_TEL}`} className="font-bold text-[#0033A0] hover:underline text-lg flex items-center gap-2">
                    <Phone size={16} /> {STORE_PHONE}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={MAP_SHARE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#0A1128] hover:bg-black text-white py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow"
                >
                  Open in Google Maps <ExternalLink size={16} />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Live Google Maps Pinpointed Embed Container */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-xl shadow-gray-200/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-black uppercase text-[#0A1128] flex items-center gap-2">
                <MapPin size={20} className="text-[#D90429] shrink-0" /> Exact Store Location on Google Maps
              </h3>
              <p className="text-xs text-gray-500 mt-1">Shop No-12, Maharaja Shopping Center, Umargam GIDC Estate, Umbergaon</p>
            </div>
            
            <a
              href={MAP_SHARE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#0033A0] hover:text-[#D90429] uppercase tracking-wider flex items-center gap-1"
            >
              Open Direct Map Link <ExternalLink size={14} />
            </a>
          </div>

          <div className="w-full h-[300px] sm:h-[450px] rounded-xl overflow-hidden border border-gray-200 bg-gray-100 relative">
            <iframe
              title="Tarang Electric Pinpoint Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4191.868969217937!2d72.77373035078975!3d20.16189573993066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be72bbcffffffff%3A0xdb747f37acfbde20!2sTarang%20Electric!5e0!3m2!1sen!2sus!4v1791040515641!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
