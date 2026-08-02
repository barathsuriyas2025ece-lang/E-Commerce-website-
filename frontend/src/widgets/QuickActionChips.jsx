import React from 'react';
import { Search, Scale, Package, Tag, HelpCircle, ShoppingBag } from 'lucide-react';

const chips = [
  { label: 'Laptops under ₹70,000', icon: Search, text: 'Show laptops under ₹70,000' },
  { label: 'Compare Products', icon: Scale, text: 'Compare first two products' },
  { label: 'Track Order', icon: Package, text: 'Where is my order?' },
  { label: 'Apply Coupon', icon: Tag, text: 'Apply coupon SAVE10' },
  { label: 'Return Policy', icon: HelpCircle, text: 'What is your return policy?' },
];

const QuickActionChips = ({ onSelectChip }) => {
  return (
    <div className="flex gap-2 overflow-x-auto py-2 px-1 scrollbar-none">
      {chips.map((chip, idx) => {
        const Icon = chip.icon;
        return (
          <button
            key={idx}
            onClick={() => onSelectChip(chip.text)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 hover:bg-indigo-600/30 hover:border-indigo-500/50 text-indigo-300 text-[11px] font-medium whitespace-nowrap transition"
          >
            <Icon className="w-3 h-3 text-indigo-400" />
            <span>{chip.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default QuickActionChips;
