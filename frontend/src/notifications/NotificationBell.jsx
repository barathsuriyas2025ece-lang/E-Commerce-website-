import React, { useState } from 'react';
import { Bell, Tag, Package, Sparkles } from 'lucide-react';

const sampleNotifications = [
  { id: 1, title: '🎉 Order #ord_10231 Shipped!', time: '10m ago', icon: Package, read: false },
  { id: 2, title: '🔥 Flash Sale: 20% off with coupon SAVE10', time: '1h ago', icon: Tag, read: false },
  { id: 3, title: '🤖 AI Assistant updated with new voice commands', time: '3h ago', icon: Sparkles, read: true },
];

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(sampleNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 relative transition"
        title="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 glass-panel border border-slate-800 shadow-2xl z-50 p-4 text-slate-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
            <h3 className="text-sm font-bold text-white">Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-[11px] text-indigo-400 hover:underline">
                Mark all read
              </button>
            )}
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {notifications.map((n) => {
              const IconComp = n.icon;
              return (
                <div key={n.id} className={`flex items-start gap-3 p-2.5 rounded-lg text-xs transition ${n.read ? 'bg-slate-900/40 opacity-70' : 'bg-slate-800/80 border-l-2 border-indigo-500'}`}>
                  <IconComp className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-100">{n.title}</p>
                    <span className="text-[10px] text-slate-400">{n.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
