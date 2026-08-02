import React from 'react';
import { Bot, User, ExternalLink, ShoppingCart, Scale, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAI } from '../context/AIContext';

const AIMessage = ({ msg }) => {
  const isAi = msg.sender === 'ai';
  const { addToCart } = useCart();
  const { setActiveCompareItems } = useAI();

  return (
    <div className={`flex gap-3 text-xs mb-3 ${isAi ? '' : 'flex-row-reverse'}`}>
      {/* Avatar Icon */}
      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${isAi ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-700 text-slate-200'}`}>
        {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>

      {/* Bubble Content */}
      <div className={`max-w-[85%] rounded-2xl p-3.5 ${isAi ? 'bg-slate-800/90 text-slate-200 border border-slate-700/60' : 'bg-indigo-600 text-white font-medium'}`}>
        <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>

        {/* Embedded UI Action Previews (Product Cards) */}
        {isAi && msg.products && msg.products.length > 0 && (
          <div className="mt-3 space-y-2 pt-2 border-t border-slate-700/60">
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">AI Recommendations:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {msg.products.slice(0, 2).map((prod) => (
                <div key={prod._id} className="bg-slate-900/80 p-2 rounded-lg border border-slate-700/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <img src={prod.images?.[0]} alt={prod.name} className="w-9 h-9 rounded object-cover shrink-0" />
                    <div className="truncate">
                      <div className="font-semibold text-slate-100 truncate">{prod.name}</div>
                      <div className="text-[10px] text-indigo-300 font-bold">₹{prod.price?.toLocaleString()}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(prod)}
                    className="p-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white shrink-0"
                    title="Add to Cart"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={`text-[9px] mt-1.5 opacity-60 ${isAi ? 'text-slate-400' : 'text-indigo-200 text-right'}`}>
          {msg.timestamp}
        </div>
      </div>
    </div>
  );
};

export default AIMessage;
