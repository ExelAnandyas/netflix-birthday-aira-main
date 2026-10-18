  import Navbar from "./components/Navbar";
  import heroImg from "./assets/pics/hero.jpg";
  import { Info, Volume2, VolumeX, Star, Heart, Moon, Sparkles, Award, Download } from "lucide-react"; 
  import { FaPlay } from "react-icons/fa6";
  import { useEffect, useState, useRef } from "react"; 
  import { motion, AnimatePresence } from "framer-motion"; 
  import Modal from "./components/Modal";
  import { images } from "./constants/images";
  import CardImage from "./components/CardImage"; 
  import Aos from "aos";
  import "aos/dist/aos.css";
  import html2pdf from "html2pdf.js";

  import profileAira from "./assets/pics/airagd.jpg"; 
  import netflixVideo from "./assets/pics/netflix-intro.mp4";
  import bgMusic from "./assets/pics/bg-music.mp3"; 

  // =========================================================================
  // FITUR: INTERACTIVE FALLING BALLOONS & HEARTS
  // =========================================================================
  const FallingBalloons = () => {
    const items = [...Array(18)].map((_, i) => {
      const emojis = ["🎈", "💖", "✨", "❤️", "🌸", "🎉"];
      return {
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 5 + Math.random() * 5,
        size: Math.random() * (32 - 18) + 18,
      };
    });

    return (
      <div className="fixed inset-0 pointer-events-none z-[80] overflow-hidden">
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="absolute select-none"
            style={{ left: `${item.left}%`, top: "-10%", fontSize: `${item.size}px` }}
            initial={{ y: "-10%", opacity: 0, rotate: 0 }}
            animate={{ 
              y: "115vh", 
              opacity: [0, 1, 1, 0],
              rotate: [0, 45, -45, 90],
              x: [0, Math.random() * 30 - 15, Math.random() * 30 - 15, 0]
            }}
            transition={{ duration: item.duration, repeat: Infinity, delay: item.delay, ease: "linear" }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>
    );
  };

  // =========================================================================
  // KOMPONEN LOKAL: AUDIO VISUALIZER
  // =========================================================================
  const AudioVisualizer = ({ isPlaying, isPinkMode }) => {
    const barsCount = 4;
    const durations = [0.8, 1.1, 0.9, 1.2];
    
    return (
      <div className="flex items-end gap-[3px] h-[18px] w-auto">
        {[...Array(barsCount)].map((_, i) => (
          <motion.div
            key={i}
            className={`w-[3px] rounded-t-[1px] ${
              !isPlaying ? "bg-zinc-500" : isPinkMode ? "bg-pink-500" : "bg-red-500"
            }`}
            initial={{ height: "4px" }}
            animate={isPlaying ? { height: ["4px", "16px", "8px", "14px", "4px"] } : { height: "4px" }}
            transition={isPlaying ? { duration: durations[i], repeat: Infinity, ease: "easeInOut", delay: i * 0.1 } : { duration: 0.2 }}
          />
        ))}
      </div>
    );
  };

  // =========================================================================
  // KOMPONEN LOKAL: TYPEWRITER EFFECT
  // =========================================================================
  const TypewriterText = ({ text, speed = 20 }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
      setDisplayedText(""); 
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayedText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, speed);

      return () => clearInterval(timer);
    }, [text, speed]);

    return <p className="whitespace-pre-line text-zinc-200 text-sm md:text-base leading-relaxed">{displayedText}</p>;
  };

  // =========================================================================
  // MAIN APP COMPONENT
  // =========================================================================
  function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [showIntro, setShowIntro] = useState(false);   
    const [openModal, setOpenModal] = useState(false);
    const [openInfoModal, setOpenInfoModal] = useState(false); 
    const [isMuted, setIsMuted] = useState(false); 
    const [isPlayingAudio, setIsPlayingAudio] = useState(false); 
    const [isDownloading, setIsDownloading] = useState(false);
    
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [showFireworks, setShowFireworks] = useState(false);

    const [isPinkMode, setIsPinkMode] = useState(false);
    const [showAffirmation, setShowAffirmation] = useState(false);
    const [currentQuote, setCurrentQuote] = useState("");

    const audioRef = useRef(null);

    const quotes = [
      "Hari ini kamu cantik banget, jangan lupa senyum ya Airaaa! ✨",
      "Inget, kalau capek itu istirahat, jangan dipaksain. You're doing great! 🌸",
      "Peringatan keras: Hari ini kamu dilarang cemberut sama sekali! 💖",
      "Semoga hari ini harimu menyenangkan dan penuh dengan kejutan baik, raaa! 🥰",
      "Kamu itu berharga, jadi jangan dengerin omongan random orang lain ya! 🐳",
      "Semangat kuliahnya yaa! I'm always rooting for you. 🚀"
    ];

    const handlePopcornClick = () => {
      const randomIdx = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIdx]);
      setShowAffirmation(true);
    };

    const handleDownloadPDF = () => {
      const element = document.getElementById("certificate-area");
      if (!element) return;

      setIsDownloading(true);

      const options = {
        margin:       0.2,
        filename:     "Sertifikat_Aira_Cute.pdf",
        image:        { type: "jpeg", quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, backgroundColor: "#FFF0F5" },
        jsPDF:        { unit: "in", format: "letter", orientation: "portrait" }
      };

      html2pdf().set(options).from(element).save().then(() => {
        setIsDownloading(false);
      }).catch((err) => {
        console.error(err);
        setIsDownloading(false);
      });
    };

    const Button = ({ children, variant, ...rest }) => {
      return (
        <button
          className={`flex items-center gap-2 p-3 px-7 rounded-lg font-semibold active:scale-90 duration-300 ease-in-out ${
            variant === "primary" 
              ? isPinkMode ? "bg-pink-600 text-white hover:bg-pink-700" : "bg-white text-black" 
              : isPinkMode ? "bg-pink-100 text-pink-700 hover:bg-pink-200" : "bg-white/30 text-white"
          }`}
          {...rest}
        >
          {children}
        </button>
      );
    };

    useEffect(() => {
      Aos.init();
    }, []);

    useEffect(() => {
      if (isLoggedIn && !showIntro && audioRef.current) {
        const playTimeout = setTimeout(() => {
          audioRef.current.play()
            .then(() => setIsPlayingAudio(true))
            .catch((err) => {
              const forcePlay = () => {
                audioRef.current.play();
                setIsPlayingAudio(true);
                window.removeEventListener("click", forcePlay);
              };
              window.addEventListener("click", forcePlay);
            });
        }, 300);
        return () => clearTimeout(playTimeout);
      }
    }, [isLoggedIn, showIntro]);

    const handleLogin = () => {
      setIsLoggedIn(true); 
      setShowIntro(true);  
      setTimeout(() => setShowIntro(false), 4500);
    };

    const toggleMute = () => {
      if (audioRef.current) {
        audioRef.current.muted = !audioRef.current.muted;
        setIsMuted(audioRef.current.muted);
      }
    };

    const handleRatingClick = (currentRating) => {
      setRating(currentRating);
      if (currentRating >= 4) {
        setShowFireworks(true);
        setTimeout(() => setShowFireworks(false), 4000);
      }
    };

    const topList = [
      { rank: 1, title: " She can build her own world, but I choose to be the one who brings color to it", desc: "Aira itu mandiri banget, tapi tetep berhak dimanjain sepaket dengan segala hal baik di dunia." },
      { rank: 2, title: "The Best listener in town", desc: "Pendengar paling sabar dan selalu bisa bikin suasana jadi tenang adem ayem." },
      { rank: 3, title: "Aira's Infectious Smile", desc: "Senyum mautnya Aira yang kalau udah keluar, dunia langsung berasa damai tenteram." }
    ];

    const suratAsliAira = `Assalamualaikum Wr. Wb. \nIn the name of Allah, the Most Gracious, the Most Merciful — please allow me to write these few heartfelt words for you.\n\nHappy 22nd Birthday! 🎉 Wow, time really flies — you’re growing up so fast! \nI’m truly sorry I haven’t been able to give you something special yet, but still — happy, happy birthday!!\n\nI wish you a long, healthy, and joyful life. May your journey always be filled with ease, success, and endless blessings. Never forget to cherish your parents, and may all your dreams and prayers come true, one by one.\n\nDon’t be too mischievous, and please get enough rest 😜 Wishing you nothing but the very best, Aira. \nOnce again, happy birthday, my dear! On this special day, I just want to say — may your path continue to shine as brightly as your beautiful soul, and may this year bring you even more joy, love, and success. 💖`;

    if (!isLoggedIn) {
      return (
        <div style={{
          backgroundColor: '#FFF0F5', height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, left: 0, zIndex: 10000, overflow: 'hidden', color: '#D81B60'
        }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', userSelect: 'none', opacity: 0.4 }}>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                style={{ position: 'absolute', fontSize: '24px', color: '#f9a8d4', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3], y: [0, -10, 0] }}
                transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
              >
                💖
              </motion.div>
            ))}
          </div>

          <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 'bold', marginBottom: '35px', letterSpacing: '1px', textAlign: 'center', fontFamily: "'Caveat', 'Playpen Sans', 'Comic Sans MS', cursive", display: 'flex', alignItems: 'center', gap: '8px' }}>
              Hai Airaa! <span className="animate-pulse">❤️❤️</span>
            </h1>
            <motion.div 
              onClick={handleLogin} whileHover={{ scale: 1.05, rotate: 2 }} whileTap={{ scale: 0.95 }}
              style={{ width: 'clamp(120px, 15vw, 170px)', height: 'clamp(120px, 15vw, 170px)', borderRadius: '50%', overflow: 'hidden', cursor: 'pointer', border: '4px solid #fff', boxShadow: '0 10px 25px -5px rgba(216, 27, 96, 0.3), 0 0 15px rgba(244, 63, 94, 0.4)' }}
            >
              <img src={profileAira} alt="Aira Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
            <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} style={{ marginTop: '25px', color: '#C2185B', fontSize: 'clamp(12px, 1.3vw, 15px)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px' }}>
              klik fotonya ya ra! ❤️
            </motion.span>
          </div>
        </div>
      );
    }

    if (showIntro) {
      return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#000000', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <video src={netflixVideo} autoPlay playsInline style={{ width: '100vw', height: '100vh', objectFit: 'contain' }} />
        </div>
      );
    }

    return (
      <main className={`min-h-screen overflow-x-hidden relative transition-colors duration-500 ${isPinkMode ? "bg-[#FFF5F7] text-zinc-800" : "bg-black text-white"}`}>
        
        <audio ref={audioRef} src={bgMusic} loop onPlay={() => setIsPlayingAudio(true)} onPause={() => setIsPlayingAudio(false)} />

        <FallingBalloons />

        <AnimatePresence>
          {showFireworks && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center bg-black/40 backdrop-blur-xs">
              <div className="text-6xl md:text-8xl animate-bounce">🎉 ✨ 🎆 💖 🎇 ✨ 🎉</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FIXED THEME TOGGLE BUTTON */}
        <button
          onClick={() => setIsPinkMode(!isPinkMode)}
          className={`fixed bottom-24 right-5 z-50 p-4 rounded-full shadow-lg border transition-all active:scale-90 flex items-center justify-center ${isPinkMode ? "bg-white text-pink-600 border-pink-200" : "bg-zinc-950 text-yellow-400 border-zinc-800"}`}
        >
          {isPinkMode ? <Moon size={22} /> : <Heart size={22} className="fill-pink-500 text-pink-500" />}
        </button>

        {/* FIXED DAILY AFFIRMATION POPCORN */}
        <button
          onClick={handlePopcornClick}
          className="fixed bottom-44 right-5 z-50 p-3.5 bg-amber-500 text-white rounded-full shadow-xl border border-amber-400 animate-bounce transition-all active:scale-90 flex items-center justify-center"
        >
          🍿
        </button>

        {/* DAILY AFFIRMATION POP-UP */}
        <AnimatePresence>
          {showAffirmation && (
            <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className="fixed top-24 right-5 z-[100] max-w-xs bg-white rounded-xl shadow-2xl p-4 border border-pink-100 flex gap-3 items-start">
              <div className="text-2xl mt-0.5">🍿</div>
              <div className="flex flex-col gap-1.5 w-full">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-pink-600 uppercase tracking-wider flex items-center gap-1"><Sparkles size={12} /> Aira's Capsule</span>
                  <button onClick={() => setShowAffirmation(false)} className="text-zinc-400 hover:text-zinc-600 font-bold text-xs px-1">✕</button>
                </div>
                <p className="text-xs font-semibold text-zinc-700 leading-relaxed pr-2">"{currentQuote}"</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FLOATING MUTE BUTTON */}
        <button
          onClick={toggleMute}
          className={`fixed bottom-5 right-5 z-50 p-4 rounded-full border transition-all active:scale-90 flex items-center justify-center gap-3 w-[160px] hover:w-[170px] ${isPinkMode ? "bg-white text-zinc-700 border-pink-200" : "bg-black/60 hover:bg-black/80 text-white border-white/20"}`}
        >
          <AudioVisualizer isPlaying={isPlayingAudio && !isMuted} isPinkMode={isPinkMode} />
          <div className="flex items-center gap-2">
            {isMuted ? <VolumeX size={20} className="text-zinc-500" /> : <Volume2 size={20} />}
            <span className={`text-xs font-semibold ${isMuted ? "text-zinc-500" : isPinkMode ? "text-pink-600" : "text-white"}`}>{isMuted ? "MUTED" : "PLAYING"}</span>
          </div>
        </button>

        {/* PROPS CONNECTED HERE */}
        <Navbar isPinkMode={isPinkMode} />
        
        {/* HERO BANNER (NO ANIMATION ON BUTTONS) */}
        <section className="relative h-screen flex justify-center items-end bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroImg})` }}>
          <div className={`absolute inset-0 bg-gradient-to-t ${isPinkMode ? "from-[#FFF5F7] via-transparent to-black/40" : "from-black via-black/30 to-black/50"}`}></div>
          <div className="w-full max-w-screen-2xl px-5 lg:px-10 mb-[5%] flex flex-col gap-3 lg:gap-5 z-10 text-white">
            <h1 className="lg:text-5xl text-3xl font-black lg:w-[50%] drop-shadow-md text-white">Happy Birthday, Aira!</h1>
            <p className="text-sm lg:text-base lg:w-[40%] text-zinc-200 drop-shadow-sm">The most special day in the world!!!</p>
            <p className="text-pink-400 font-semibold drop-shadow-sm animate-pulse">Click “Play” to see the details 🎬</p>
            
            <div className="actions flex items-center gap-3">
              <Button variant={"primary"} onClick={() => setOpenModal(true)}>
                <FaPlay /> Play
              </Button>
              <Button variant={"secondary"} onClick={() => setOpenInfoModal(true)}>
                <Info size={20} /> More Info
              </Button>
            </div>
          </div>
        </section>

        {/* TOP 3 THINGS */}
        <section className={`flex justify-center py-10 transition-colors duration-500 ${isPinkMode ? "bg-pink-50/60" : "bg-black"}`}>
          <div className="w-full max-w-screen-2xl px-5 lg:px-10 flex flex-col gap-5">
            <h3 className={`font-bold text-xl md:text-2xl flex items-center gap-2 ${isPinkMode ? "text-zinc-800" : "text-white"}`}>
              Top 3 Things About Aira Today <span className="text-red-600 text-sm bg-red-600/10 px-2 py-0.5 rounded border border-red-600/30">LATEST EPISODE</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
              {topList.map((item) => (
                <div key={item.rank} className={`flex items-center gap-4 group p-5 rounded-lg border transition-all duration-300 ${isPinkMode ? "bg-white border-pink-100 hover:border-pink-400 shadow-xs" : "bg-[#181818] border-zinc-800 hover:border-red-600/50"}`}>
                  <span className="text-6xl md:text-7xl font-black text-transparent stroke-text font-sans select-none opacity-80 group-hover:opacity-100 group-hover:scale-105 duration-300" style={{ WebkitTextStroke: isPinkMode ? '2px #f472b6' : '2px #444' }}>{item.rank}</span>
                  <div className="flex flex-col">
                    <h4 className={`font-bold text-base md:text-lg duration-200 capitalize ${isPinkMode ? "text-zinc-800 group-hover:text-pink-600" : "text-white group-hover:text-red-500"}`}>{item.title}</h4>
                    <p className={`text-xs mt-1 leading-relaxed ${isPinkMode ? "text-zinc-500" : "text-zinc-400"}`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ALBUM FOTO */}
        <section className="flex justify-center pb-20">
          <div className="py-5 flex flex-col gap-5 px-5 lg:px-10 max-w-screen-2xl w-full">
            <h3 className={`font-semibold text-xl ${isPinkMode ? "text-zinc-800" : "text-white"}`}>More to Explore : Aira Album's</h3>
            <section className="grid grid-cols-2 lg:grid-cols-6 gap-3 lg:gap-5">
              {images.map((image, idx) => (
                <CardImage src={image.src} key={idx} idx={idx} />
              ))}
            </section>
          </div>
        </section>

        {/* MODAL 1: SURAT */}
        <Modal setOpenModal={setOpenModal} openModal={openModal}>
          <div className="relative bg-cover bg-center bg-no-repeat h-[200px] lg:h-[320px]" style={{ backgroundImage: `url(${heroImg})`, backgroundPosition: "center 40%" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818]" />
          </div>

          <div className="flex flex-col gap-3 lg:gap-5 p-6 text-white bg-[#181818] min-h-[380px]">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl text-red-500">Happy Birthday, Aira 🎂</h1>
              <p className="text-zinc-400 text-xs tracking-wide uppercase font-semibold mb-2">To: Aira</p>
              <p className="text-zinc-300 text-sm mb-1">Hi Aira! 🌸</p>
              
              {openModal && <TypewriterText text={suratAsliAira} />}
              
              <p className="text-zinc-400 italic mt-4 text-sm">With all my love,<br />&copy; exelanndys_</p>
            </div>

            <div className="h-[1px] bg-zinc-800 my-4" />

            <div className="flex flex-col items-center gap-2 bg-black/40 p-4 rounded-xl border border-zinc-800">
              <h5 className="text-sm font-semibold text-gray-300">Seberapa suka kamu sama kado website ini?</h5>
              <div className="flex items-center gap-1.5 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star} type="button"
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform duration-100 active:scale-90"
                  >
                    <Star size={28} className={`duration-150 ${star <= (hoverRating || rating) ? "text-yellow-400 fill-yellow-400 filter drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]" : "text-zinc-600"} `} />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-xs text-red-400 animate-pulse mt-1 font-medium">
                  {rating === 5 ? "Yay! Makasih banyak Aira sayang! 🎉" : "Terima kasih ratingnya raaa! ✨"}
                </p>
              )}
            </div>
          </div>
        </Modal>

        {/* =========================================================================
            MODAL 2: SERTIFIKAT CUTE & PINKY VERSION (MORE INFO)
            ========================================================================= */}
        <Modal setOpenModal={setOpenInfoModal} openModal={openInfoModal}>
          <div className="p-4 md:p-6 bg-[#FFF5F7] rounded-2xl flex flex-col items-center justify-center min-h-[450px]">
            
            {/* AREA SERTIFIKAT PINK */}
            <div 
              id="certificate-area" 
              className="w-full p-6 md:p-8 rounded-2xl border-4 border-dashed border-pink-400 bg-[#FFF0F5] text-center flex flex-col items-center relative overflow-hidden shadow-xl"
            >
              {/* Latar Belakang Ikon Hati Transparan */}
              <div className="absolute opacity-[0.04] text-pink-500 pointer-events-none scale-[3] flex items-center justify-center inset-0">
                <Heart size={140} className="fill-pink-500" />
              </div>

              {/* Sparkle Header */}
              <div className="text-pink-500 flex items-center justify-center gap-1.5 mb-1">
                <Sparkles size={16} className="fill-pink-300" />
                <span className="text-[10px] uppercase tracking-[3px] font-bold font-sans">✨ Cutest Award ✨</span>
                <Sparkles size={16} className="fill-pink-300" />
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide text-pink-600 drop-shadow-xs font-serif">
                🎀 SERTIFIKAT PENGHARGAAN 🎀
              </h2>
              
              <div className="h-[2px] w-[50%] bg-pink-200 my-3 rounded-full" />

              <p className="text-xs text-pink-500/80 italic font-medium font-sans">Diberikan dengan penuh rasa bangga kepada:</p>
              
              {/* Nama Aira */}
              <h3 className="text-2xl md:text-3xl font-black text-pink-700 tracking-wide mt-3 mb-1 px-4 border-b-2 border-dotted border-pink-300 pb-1 font-serif">
                🌸 Ibu Negara Aira 🌸
              </h3>
              
              <p className="text-[10px] text-pink-400 tracking-widest uppercase font-bold mb-4">🏆 Certified Best Women 🏆</p>

              {/* Isi Deskripsi Lucu */}
              <p className="text-xs md:text-sm text-zinc-700 max-w-sm leading-relaxed px-2 font-medium font-sans">
                Atas pencapaiannya yang luar biasa sebagai <span className="text-pink-600 font-extrabold">"Wanita Terbaik, Terlucu, dan Tercantik"</span> di jagat raya. Terbukti ahli dalam angkat galon dan karpet sendiri wkwkwk, jago dengerin curhat, dan selalu dibekali tingkat ke-random-an yang bikin hari-hari jadi seru! 💕
              </p>

              {/* Kaki Sertifikat: Tanggal & Tanda Tangan */}
              <div className="flex justify-between items-end w-full max-w-xs mt-8 pt-4 border-t border-pink-200">
                <div className="flex flex-col items-start">
                  <span className="text-[8px] text-pink-400 font-mono uppercase tracking-wider">Date:</span>
                  <span className="text-[10px] text-zinc-600 font-bold">19 Oktober 2026</span>
                </div>
                
                {/* Cap Stempel Hati Lucu */}
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-pink-400 flex flex-col items-center justify-center bg-pink-100/50 -rotate-12 scale-110 shadow-xs">
                  <Heart size={16} className="text-pink-500 fill-pink-400 animate-pulse" />
                  <span className="text-[5px] text-pink-600 font-black tracking-tighter mt-0.5">APPROVED</span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-pink-600 font-serif italic font-bold underline decoration-pink-300">System Developer</span>
                  <span className="text-[7px] text-pink-400 font-mono uppercase mt-0.5 tracking-tighter">exelanndys_</span>
                </div>
              </div>

            </div>

            {/* AKSI TOMBOL BAWAH */}
            <div className="flex flex-col gap-2 w-full max-w-sm mt-5">
              {/* Tombol Download PDF */}
              <button 
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md shadow-pink-200"
              >
                <Download size={14} />
                {isDownloading ? "Mencetak PDF Lucu..." : "Download Sertifikat Pink (PDF)"}
              </button>

              {/* Tombol Tutup */}
              <button 
                onClick={() => setOpenInfoModal(false)}
                className="w-full bg-white hover:bg-pink-50 text-pink-400 hover:text-pink-500 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all border border-pink-200 active:scale-95 shadow-xs"
              >
                Tutup Piagam
              </button>
            </div>

          </div>
        </Modal>

        <style>{`
          .stroke-text {
            color: black;
            -webkit-text-fill-color: ${isPinkMode ? '#FFF5F7' : '#141414'};
            -webkit-text-stroke-width: 3px;
          }
        `}</style>
      </main>
    );
  }

  export default App;