import { Bell, ChevronDown, Search, X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import airagd from "../assets/pics/airagd.jpg";

const NotificationBell = () => {
  const [showNotif, setShowNotif] = useState(false);

  return (
    <div className="relative">
      <Bell
        size={22}
        className="cursor-pointer hover:text-red-500 duration-200"
        onClick={() => setShowNotif(!showNotif)}
      />
    
      <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] px-1.5 py-0.5 rounded-full font-bold text-white">
        1
      </span>

      <AnimatePresence>
        {showNotif && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute right-0 mt-3 bg-black/90 backdrop-blur-md rounded-lg text-sm text-white w-64 shadow-lg border border-white/10 p-3 z-50"
          >
            <div className="flex items-start gap-3">
              <div className="bg-red-600/70 rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                🎈
              </div>
              <div className="flex-1">
                <p className="font-semibold text-red-400">exelanndys_</p>
                <p className="text-xs text-gray-300 mt-1">
                  Happy Birthday, Aira, semoga harimu penuh kebahagiaan! 
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowNotif(false)}
              className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white text-xs py-1.5 rounded-md duration-200"
            >
              Tutup
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = ({ isPinkMode, onLogout, activeMenu, setActiveMenu }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menus = ["Home", "Series", "Movies", "New & Popular", "My List"];

  return (
    <header className={`flex flex-col w-full fixed top-0 left-0 z-40 justify-center duration-500 ${
      isPinkMode 
        ? "bg-gradient-to-b from-pink-200/95 via-pink-100/60 to-transparent" 
        : "bg-gradient-to-b from-black/95 via-black/50 to-transparent"
    }`}>
      <main className="flex items-center justify-between w-full p-5 lg:py-7 lg:px-10 max-w-screen-2xl mx-auto">
        
        <div className="left flex items-center gap-6 lg:gap-10">
          {/* HAMBURGER BUTTON (HANYA MUNCUL DI MOBILE) */}
          <button 
            className={`lg:hidden block p-1 rounded-md transition-colors ${isPinkMode ? "text-pink-950 hover:bg-pink-200/50" : "text-white hover:bg-zinc-800/50"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* LOGO NETFLIX (Ukurannya dikunci aman & responsif) */}
          <a className="block transition-transform active:scale-95 w-24 lg:w-28 shrink-0" href="#" onClick={() => setActiveMenu("Home")}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
              alt="Netflix Logo" 
              className="w-full h-auto object-contain select-none"
            />
          </a>
          
          {/* MENUS UNTUK DESKTOP */}
          <nav className={`menus lg:flex items-center gap-5 text-sm font-medium hidden duration-300 ${
            isPinkMode ? "text-pink-950" : "text-white"
          }`}>
            {menus.map((title) => (
              <button
                key={title}
                onClick={() => setActiveMenu(title)}
                className={`duration-300 ease-in-out hover:text-red-500 relative py-1 ${
                  activeMenu === title ? "text-red-500 font-bold" : ""
                }`}
              >
                {title}
                {activeMenu === title && (
                  <motion.div layoutId="activeIndicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500" />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className={`right flex items-center gap-4 lg:gap-5 duration-300 ${
          isPinkMode ? "text-pink-950" : "text-white"
        }`}>
          {/* SEARCH DESKTOP */}
          <motion.div
            animate={{
              boxShadow: isFocused ? "0 0 10px 2px rgba(255,0,0,0.7)" : "0 0 0px rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.3 }}
            className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md border border-transparent focus-within:border-red-500 ${
              isPinkMode ? "bg-white/70" : "bg-[#222]/60"
            }`}
          >
            <Search size={18} />
            <input
              type="text"
              placeholder="Search..."
              className={`bg-transparent text-sm focus:outline-none placeholder:text-gray-400 w-28 lg:w-48 ${
                isPinkMode ? "text-zinc-800" : "text-white"
              }`}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </motion.div>

          {/* SEARCH MOBILE */}
          <div className="sm:hidden relative">
            <Search size={22} className="cursor-pointer" onClick={() => setShowSearch(true)} />
            <AnimatePresence>
              {showSearch && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -left-36 top-10 flex items-center bg-black/95 px-3 py-2 rounded-full w-[180px] border border-red-600 shadow-[0_0_10px_rgba(255,0,0,0.7)]"
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent text-sm focus:outline-none text-white placeholder:text-gray-400 flex-1 w-full"
                  />
                  <X size={12} className="cursor-pointer text-gray-400 ml-1" onClick={() => setShowSearch(false)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NotificationBell />

          {/* USER PROFILE DROPDOWN */}
          <div className="relative">
            <button onClick={() => setOpenProfile(!openProfile)} className="flex gap-1.5 items-center cursor-pointer">
              <img src={airagd} alt="profile" className="w-9 h-9 rounded-full object-cover border-2 border-red-500" />
              <ChevronDown size={16} className={`duration-300 ${openProfile ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {openProfile && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 bg-black/95 backdrop-blur-lg rounded-md text-sm text-white w-40 shadow-lg border border-white/10 overflow-hidden z-50"
                >
                  <div className="block px-5 py-2 text-xs text-zinc-400 border-b border-zinc-800">Aira's Account</div>
                  <a href="#" className="block px-5 py-2.5 hover:bg-zinc-800 duration-200">Profile</a>
                  <a href="#" className="block px-5 py-2.5 hover:bg-zinc-800 duration-200">Settings</a>
                  {/* TRIGGER LOGOUT FUNCTION */}
                  <button 
                    onClick={() => { setOpenProfile(false); onLogout(); }} 
                    className="w-full text-left block px-5 py-2.5 bg-red-600/90 hover:bg-red-700 text-white font-semibold duration-200"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* MOBILE HAMBURGER MENU LIST ACCORDION */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`lg:hidden w-full flex flex-col px-6 pb-4 border-b border-white/10 overflow-hidden shadow-xl backdrop-blur-lg text-sm font-semibold ${
              isPinkMode ? "bg-pink-100/95 text-pink-950" : "bg-black/95 text-white"
            }`}
          >
            {menus.map((title) => (
              <button
                key={title}
                onClick={() => { setActiveMenu(title); setMobileMenuOpen(false); }}
                className={`text-left py-3 border-b last:border-none duration-200 ${
                  isPinkMode ? "border-pink-200/50 hover:text-pink-600" : "border-zinc-800/60 hover:text-red-500"
                } ${activeMenu === title ? "text-red-500" : ""}`}
              >
                {title}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;