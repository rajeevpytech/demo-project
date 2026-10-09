import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';

export const VipLineScreen: React.FC = () => {
  const { settings, setActivePublicTab, showToast } = useCms();

  const [messages, setMessages] = useState<{ sender: 'user' | 'director'; text: string; time: string }[]>([
    {
      sender: 'director',
      text: `Greetings from The Royal Band Liaison Office. I am Vikramaditya Rathore, Principal Director. Which royal destination and auspicious dates are you planning for your celebration?`,
      time: '11:00 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = "Understood. Our 10-piece Royal Grandeur and 16-piece Imperial Symphony formations are currently available for priority hold on these dates. Would you like me to prepare a tailored performance rider and audio overture?";
      if (userMsg.text.toLowerCase().includes('price') || userMsg.text.toLowerCase().includes('cost') || userMsg.text.toLowerCase().includes('quote')) {
        reply = "Our retainers range from Tier I Crown Quintet to Tier III Imperial All-Night Symphony. I have initiated your priority docket. Let's formalize your guest count and palace location in the booking desk.";
      } else if (userMsg.text.toLowerCase().includes('udaipur') || userMsg.text.toLowerCase().includes('jaipur') || userMsg.text.toLowerCase().includes('jodhpur')) {
        reply = "Our resident stationed fleet in Rajasthan handles palace lawn acoustics with dedicated Meyer Sound rigs. We can lock the date immediately upon formal retainer.";
      }
      setMessages(prev => [...prev, {
        sender: 'director' as const,
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 pb-28 max-w-3xl mx-auto selection:bg-[#d4af37] selection:text-[#131315]">
      {/* Liaison Director Header Card */}
      <div className="bg-[#2a2a2c] border border-[#4d4635]/60 rounded-xl p-4 sm:p-5 shadow-lg mt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <img 
              alt={settings.directorName} 
              className="w-14 h-14 rounded-full object-cover border-2 border-[#f2ca50] shadow-[0_0_12px_rgba(212,175,55,0.3)]" 
              src={settings.directorPhotoUrl} 
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#131315]"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-luxury text-base sm:text-lg font-semibold text-[#e5e1e4]">
                {settings.directorName}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#4f471b] text-[#f1e3a9] text-[9px] font-bold uppercase tracking-wider">
                Direct Line
              </span>
            </div>
            <p className="text-xs text-[#d0c5af]">{settings.directorTitle}</p>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Online &bull; Instant Response Active
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <a 
            href={`tel:${settings.directorPhone.replace(/\s+/g, '')}`}
            className="flex-1 sm:flex-none h-10 px-3.5 rounded-lg bg-[#f2ca50] text-[#3c2f00] text-xs font-bold flex items-center justify-center gap-1.5 hover:brightness-105 active:scale-95 transition-all shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>Direct Call</span>
          </a>
          <a 
            href={`https://wa.me/${settings.whatsAppPhone.replace(/\D/g, '')}?text=Greetings%20Vikramaditya,%20I%20am%20reaching%20out%20via%20The%20Royal%20Band%20VIP%20Line.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none h-10 px-3.5 rounded-lg bg-[#201f22] border border-[#4d4635] text-[#f1e3a9] hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#353437] transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-[#f2ca50]">chat</span>
            <span>External App</span>
          </a>
        </div>
      </div>

      {/* Live Concierge Terminal Messages */}
      <div className="my-4 bg-[#1c1b1e] border border-[#4d4635]/40 rounded-xl p-4 min-h-[340px] flex flex-col justify-between shadow-inner">
        <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
          <div className="text-center my-2">
            <span className="text-[10px] uppercase tracking-widest text-[#99907c] bg-[#2a2a2c] px-3 py-1 rounded-full border border-[#4d4635]/30">
              Encrypted VIP Concierge Session &bull; ISO Confidentiality
            </span>
          </div>

          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#f2ca50] text-[#3c2f00] rounded-br-none font-medium shadow-md'
                  : 'bg-[#2a2a2c] text-[#e5e1e4] border border-[#4d4635]/50 rounded-bl-none shadow'
              }`}>
                {msg.text}
              </div>
              <span className="text-[10px] text-[#99907c] mt-1 px-1">{msg.time}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 text-xs text-[#d0c5af] p-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] animate-bounce" style={{ animationDelay: '300ms' }}></span>
              <span className="text-[11px] ml-1">Vikramaditya is drafting response...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="mt-3 pt-3 border-t border-[#353437] flex gap-2">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type confidential date inquiry, venue details, or repertoire request..."
            className="flex-1 bg-[#2a2a2c] text-[#e5e1e4] placeholder:text-[#99907c] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm border border-[#4d4635] focus:outline-none focus:border-[#f2ca50]"
          />
          <button 
            type="submit"
            className="h-10 px-4 rounded-lg bg-[#f2ca50] text-[#3c2f00] font-bold text-xs flex items-center justify-center gap-1 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Send</span>
            <span className="material-symbols-outlined text-[16px]">send</span>
          </button>
        </form>
      </div>

      {/* Quick Action Chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          "Check availability for November 2025",
          "Request 10-piece Royal Grandeur Rider",
          "Inquire about Udaipur Palace Lawn sound calibration",
          "Lock date with Management Retainer"
        ].map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => setInputText(chip)}
            className="text-left text-[11px] px-3 py-1.5 rounded-full bg-[#201f22] hover:bg-[#2a2a2c] text-[#d0c5af] border border-[#4d4635]/40 transition-colors cursor-pointer"
          >
            + {chip}
          </button>
        ))}
      </div>

      {/* Book Date Redirection Card */}
      <div className="bg-[#201f22] border border-[#4d4635]/40 rounded-xl p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#4f471b] text-[#f2ca50] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-[#e5e1e4]">Formal Contract &amp; Date Lock</h4>
            <p className="text-[11px] text-[#d0c5af]">Execute date lock deposit on our verified booking register.</p>
          </div>
        </div>
        <button 
          onClick={() => setActivePublicTab('book')}
          className="px-3.5 py-2 rounded-lg bg-[#d4af37] text-[#131315] text-xs font-bold uppercase tracking-wider hover:brightness-105 transition-all"
        >
          Open Form
        </button>
      </div>
    </div>
  );
};
