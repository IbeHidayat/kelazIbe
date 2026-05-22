"use client";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [socialState, setSocialState] = useState("none"); // "none", "hover", "click"
  const [scrollProgress, setScrollProgress] = useState(0);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      // PENGAMAN: Jika durasi masih 0, paksa ambil dari audio
      if (duration === 0 && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: any) => {
    if (audioRef.current) {
      const seekTime = (e.target.value / 100) * duration;
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const socials = [
    {
      id: 1,
      name: "TikTok",
      user: "@Ibeee3",
      link: "https://tiktok.com/@Ibeee3",
      bg: "bg-gradient-to-br from-slate-900 to-black",
      icon: (
        <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
        </svg>
      ),
    },
    {
      id: 2,
      name: "Instagram",
      user: "@_ibehidayat",
      link: "https://instagram.com/_ibehidayat",
      bg: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400",
      icon: (
        <svg
          className="h-10 w-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
    },
    {
      id: 3,
      name: "Facebook",
      user: "Ibnu Hidayat",
      link: "https://facebook.com/ibnuhidayat",
      bg: "bg-gradient-to-br from-blue-600 to-blue-800",
      icon: (
        <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      ),
    },
    {
      id: 4,
      name: "GitHub",
      user: "IbeTheKid",
      link: "https://github.com/ibethekid",
      bg: "bg-gradient-to-br from-slate-700 to-slate-900",
      icon: (
        <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      id: 5,
      name: "Email",
      user: "ibeehidayat@gmail.com",
      link: "mailto:ibeehidayat@gmail.com",
      bg: "bg-gradient-to-br from-red-500 to-red-700",
      icon: (
        <svg
          className="h-10 w-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      ),
    },
  ];

  useEffect(() => {
    // Logika scroll tetap di sini
    const handleScroll = () => {
      const sections = ["home", "about", "experiences", "contact"];

      for (const section of sections) {
        const element = document.getElementById(section);

        if (element) {
          const rect = element.getBoundingClientRect();

          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
          }
        }
      }

      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Scroll Progress Bar (Spotify Style - Clickable & Clearer) */}
      <div className="fixed left-4 top-1/2 z-[60] flex -translate-y-1/2 flex-col items-center gap-3 md:left-10">
        {/* Indikator 0 (Sekarang pakai background kapsul kaca) */}
        <span className="rounded-full bg-slate-950/40 px-2 py-1 text-xs font-bold tracking-widest text-white backdrop-blur-md shadow-sm">
          0%
        </span>

        {/* Track / Rel */}
        <div
          className="relative h-[50vh] w-1.5 cursor-pointer overflow-hidden rounded-full bg-slate-700 transition-colors hover:bg-slate-600 md:h-[60vh] md:w-2"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickY = e.clientY - rect.top;
            const percentage = Math.max(0, Math.min(1, clickY / rect.height));
            const totalScrollHeight =
              document.documentElement.scrollHeight - window.innerHeight;

            window.scrollTo({
              top: percentage * totalScrollHeight,
              behavior: "smooth",
            });
          }}
        >
          {/* Progress Bar (Isi) */}
          <div
            className="absolute left-0 top-0 w-full rounded-full bg-gradient-to-b from-sky-400 via-purple-500 to-[#1DB954] transition-all duration-150 ease-out"
            style={{ height: `${scrollProgress}%` }}
          >
            {/* Titik Cahaya */}
            <div className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_12px_4px_#1DB954]"></div>
          </div>
        </div>

        {/* Indikator 100 (Sekarang pakai background kapsul kaca) */}
        <span className="min-w-[40px] text-center rounded-full bg-slate-950/40 px-2 py-1 text-xs font-bold tracking-widest text-white backdrop-blur-md shadow-sm">
          {Math.round(scrollProgress)}%
        </span>
      </div>
      {/* Navbar */}
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="#" className="text-xl font-bold tracking-wide">
            Kelazz Ibe
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
            <div className="hidden items-center gap-3 text-sm font-bold md:flex">
              <a
                href="#home"
                className={`rounded-full px-4 py-2 transition-all duration-300 hover:bg-white hover:text-slate-950 ${
                  activeSection === "home"
                    ? "bg-white text-slate-950"
                    : "text-slate-300"
                }`}
              >
                Home
              </a>

              <a
                href="#about"
                className={`rounded-full px-4 py-2 transition-all duration-300 hover:bg-white hover:text-slate-950 ${
                  activeSection === "about"
                    ? "bg-white text-slate-950"
                    : "text-slate-300"
                }`}
              >
                About
              </a>

              <a
                href="#experiences"
                className={`rounded-full px-4 py-2 transition-all duration-300 hover:bg-white hover:text-slate-950 ${
                  activeSection === "experiences"
                    ? "bg-white text-slate-950"
                    : "text-slate-300"
                }`}
              >
                Experiences
              </a>

              <a
                href="#contact"
                className={`rounded-full px-4 py-2 transition-all duration-300 hover:bg-white hover:text-slate-950 ${
                  activeSection === "contact"
                    ? "bg-white text-slate-950"
                    : "text-slate-300"
                }`}
              >
                Contact
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-12 px-6 pt-24 md:flex-row"
      >
        {/* Bagian Teks Kiri */}
        <div className="max-w-xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
            Portfolio Website
          </p>

          <h1 className="text-5xl font-bold leading-tight md:text-6xl">
            Halo, saya <span className="text-sky-400">Ibnu Hidayat</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Saya Mahasiswa Fisika Universitas Hasanuddin. Fokus Saya Adalah
            Fisika Partikel, Dan Juga Berkecimpung Di Bidang Web Development.
          </p>

          <div className="mt-8">
            <a
              href="#about"
              className="group inline-flex items-center gap-3 rounded-full bg-sky-400 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-sky-500/30 transition-all duration-300 hover:-translate-y-2 hover:scale-110 hover:bg-sky-400 hover:shadow-2xl hover:shadow-sky-400/50"
            >
              <span>Ayo Kenalan</span>
              <span className="wave-hover inline-block text-2xl transition-transform duration-300 group-hover:scale-150">
                👋
              </span>
            </a>
          </div>
        </div>

        {/* Bagian Foto Kanan dengan Efek Roket 3D */}
        {/* Bagian Foto Kanan dengan Efek Roket 3D */}
        <div className="group relative flex h-80 w-80 items-center justify-center">
          {/* Cahaya Latar */}
          <div className="absolute h-72 w-72 rounded-full bg-sky-500 blur-3xl opacity-30" />

          {/* Tooltip / Foto Kecil */}
          <div className="absolute -top-10 left-1/2 z-20 flex -translate-x-1/2 -translate-y-4 items-center gap-3 rounded-2xl bg-white px-4 py-3 text-slate-900 opacity-0 shadow-xl transition-all duration-500 group-hover:-translate-y-8 group-hover:opacity-100">
            <img
              src="home/mbg.jpg"
              alt="Foto kecil"
              className="h-10 w-10 rounded-full object-cover scale-150"
              style={{ objectPosition: "center 10%" }}
            />
            <span className="text-sm font-semibold">when yah?</span>
          </div>

          {/* Foto Utama (z-10 sebagai pembatas layer tengah) */}
          <div className="relative z-10 h-72 w-72 overflow-hidden rounded-[40%] border border-white/20 bg-slate-800">
            <img
              src="home/gue.jpeg"
              alt="Foto saya"
              className="h-full w-full object-cover scale-125"
              style={{ objectPosition: "center 30%" }}
            />
          </div>

          {/* Roket Animasi */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -ml-12 -mt-12 h-24 w-24 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <img
              src="home/rocket.png"
              alt="Rocket Orbit"
              className="rocket-animate h-full w-full object-contain drop-shadow-2xl"
            />
          </div>

          {/* CSS Animasi Orbit 3D Roket yang Sangat Mulus */}
          {/* CSS Animasi Orbit 3D Roket yang Diperlebar dan Dinamis */}
          <style>{`
            .rocket-animate {
              /* Gunakan 'linear' agar terbangnya meluncur stabil tanpa jeda */
              animation: orbit-path 4.5s linear infinite;
              animation-play-state: paused;
            }
            
            .group:hover .rocket-animate {
              animation-play-state: running;
            }

            @keyframes orbit-path {
              /* ========================================================
                 FASE 1: DI BELAKANG FOTO (0% - 49%)
                 Rocket kecil, z-index 0 (kalah dari foto z-10)
                 ======================================================== */

              /* 0%: Di Kiri Jauh (Leluasa/Wider) */
              0% {
                transform: translate(-300px, -20px) scale(0.6) rotate(15deg);
                z-index: 0;
              }
              /* 25%: Di Atas (Mengecil karena paling jauh di belakang foto) */
              25% {
                transform: translate(0px, -130px) scale(0.3) rotate(60deg);
                z-index: 0;
              }
              /* 49.9%: Momen tepat sebelum pindah ke depan di sisi kanan */
              49.9% { z-index: 0; }


              /* ========================================================
                 FASE 2: MELINTAS DI DEPAN FOTO (50% - 100%)
                 Rocket membesar, z-index 20 (menutupi foto z-10)
                 ======================================================== */

              /* 50%: Di Kanan Jauh (Pindah layer ke depan, leluasa) */
              50% {
                transform: translate(300px, 20px) scale(0.6) rotate(180deg);
                z-index: 20;
              }
              /* 75%: Di Bawah (Membesar untuk melintas *over* di depan wajah/foto) */
              75% {
                transform: translate(0px, 160px) scale(1.8) rotate(270deg);
                z-index: 20;
              }
              /* 100%: Kembali ke Kiri Jauh (Rotasi 360 agar menyambung) */
              100% {
                transform: translate(-300px, -20px) scale(0.6) rotate(360deg);
                z-index: 20;
              }
            }
          `}</style>
        </div>
      </section>

      {/* GetWaves.io */}
      <div className="bg-slate-950">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -1 1440 320"
          className="w-full block" // block ditambahkan untuk cegah garis putih
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,32L6.2,42.7C12.3,53,25,75,37,117.3C49.2,160,62,224,74,208C86.2,192,98,96,111,74.7C123.1,53,135,107,148,133.3C160,160,172,160,185,181.3C196.9,203,209,245,222,250.7C233.8,256,246,224,258,192C270.8,160,283,128,295,128C307.7,128,320,160,332,154.7C344.6,149,357,107,369,85.3C381.5,64,394,64,406,96C418.5,128,431,192,443,197.3C455.4,203,468,149,480,106.7C492.3,64,505,32,517,37.3C529.2,43,542,85,554,117.3C566.2,149,578,171,591,149.3C603.1,128,615,64,628,69.3C640,75,652,149,665,202.7C676.9,256,689,288,702,293.3C713.8,299,726,277,738,245.3C750.8,213,763,171,775,154.7C787.7,139,800,149,812,149.3C824.6,149,837,139,849,122.7C861.5,107,874,85,886,90.7C898.5,96,911,128,923,165.3C935.4,203,948,245,960,256C972.3,267,985,245,997,229.3C1009.2,213,1022,203,1034,192C1046.2,181,1058,171,1071,144C1083.1,117,1095,75,1108,90.7C1120,107,1132,181,1145,186.7C1156.9,192,1169,128,1182,101.3C1193.8,75,1206,85,1218,106.7C1230.8,128,1243,160,1255,181.3C1267.7,203,1280,213,1292,213.3C1304.6,213,1317,203,1329,176C1341.5,149,1354,107,1366,117.3C1378.5,128,1391,192,1403,224C1415.4,256,1428,256,1434,256L1440,256L1440,320L1433.8,320C1427.7,320,1415,320,1403,320C1390.8,320,1378,320,1366,320C1353.8,320,1342,320,1329,320C1316.9,320,1305,320,1292,320C1280,320,1268,320,1255,320C1243.1,320,1231,320,1218,320C1206.2,320,1194,320,1182,320C1169.2,320,1157,320,1145,320C1132.3,320,1120,320,1108,320C1095.4,320,1083,320,1071,320C1058.5,320,1046,320,1034,320C1021.5,320,1009,320,997,320C984.6,320,972,320,960,320C947.7,320,935,320,923,320C910.8,320,898,320,886,320C873.8,320,862,320,849,320C836.9,320,825,320,812,320C800,320,788,320,775,320C763.1,320,751,320,738,320C726.2,320,714,320,702,320C689.2,320,677,320,665,320C652.3,320,640,320,628,320C615.4,320,603,320,591,320C578.5,320,566,320,554,320C541.5,320,529,320,517,320C504.6,320,492,320,480,320C467.7,320,455,320,443,320C430.8,320,418,320,406,320C393.8,320,382,320,369,320C356.9,320,345,320,332,320C320,320,308,320,295,320C283.1,320,271,320,258,320C246.2,320,234,320,222,320C209.2,320,197,320,185,320C172.3,320,160,320,148,320C135.4,320,123,320,111,320C98.5,320,86,320,74,320C61.5,320,49,320,37,320C24.6,320,12,320,6,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* About Section */}
      <section id="about" className="min-h-screen bg-white text-slate-950">
        <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2">
          {/* Kolom kiri */}
          <div>
            <h2 className="text-4xl font-bold md:text-5xl">Tentang Saya</h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Meski langkah kita kerap tertatih melintasi terjalnya perjuangan,
              kasih sayang ini perlahan tumbuh menjadi akar yang mengikat kita
              agar tak lagi mudah rebah. Bersamamu, setiap luka belajar untuk
              sembuh, dan setiap kejatuhan hanyalah awalan untuk kita kembali
              bangkit menantang badai yang datang. Kutitipkan segala pengharapan
              di dalam genggamanmu, meyakini bahwa cinta yang kita rawat hari
              ini akan terus mekar sebagai kekuatan, menuntun kita berjalan
              berdampingan menembus apa pun takdir yang menanti di depan sana.
            </p>
          </div>

          {/* Kolom kanan - Spotify Music Player */}
          <div className="relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#121212] p-8 shadow-2xl">
            {/* Tag Audio (Tersembunyi) */}
            {/* Tag Audio (Tersembunyi) */}
            <audio
              ref={audioRef}
              src="music/music.mp3"
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />

            {/* Header Player */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                Keep Relax and Listen to Music
              </span>
              {/* Logo Spotify SVG */}
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-[#1DB954]"
                fill="currentColor"
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.659.3 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.001 10.62 18.661 12.9c.42.18.6.78.3 1.14zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.18-1.38-.781-.18-.6.18-1.2.78-1.38 4.2-1.261 11.22-1.021 16.14 1.92.54.3.72.96.42 1.5-.299.54-.959.72-1.5.42z" />
              </svg>
            </div>

            {/* Track Info */}
            <div className="flex items-center gap-5 mb-8">
              {/* Cover Album/Foto */}
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md shadow-lg">
                <img
                  src="about/shapeofmyheart.jpg"
                  alt="Album Cover"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white line-clamp-1">
                  Shape Of My Heart
                </h3>
                <p className="text-sm text-slate-400 mt-1">Backstreet Boys</p>
              </div>
            </div>

            {/* Progress Bar & Durasi */}
            <div className="mb-6 flex flex-col gap-2">
              <input
                type="range"
                min="0"
                max="100"
                value={duration > 0 ? (currentTime / duration) * 100 : 0}
                onChange={handleSeek}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-[#1DB954]"
              />
              <div className="flex justify-between text-xs font-medium text-slate-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6">
              {/* Tombol Previous */}
              <button
                onClick={() => {
                  if (audioRef.current) audioRef.current.currentTime -= 10;
                }}
                className="text-slate-400 transition-colors hover:text-white"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>

              {/* Tombol Play/Pause Utama */}
              <button
                onClick={togglePlay}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1DB954] text-black transition-transform hover:scale-105"
              >
                {isPlaying ? (
                  // Ikon Pause
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  // Ikon Play
                  <svg
                    className="h-6 w-6 ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Tombol Next */}
              <button
                onClick={() => {
                  if (audioRef.current) audioRef.current.currentTime += 10;
                }}
                className="text-slate-400 transition-colors hover:text-white"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* GetWaves.io */}
      <div className="bg-slate-950">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffffff"
            fill-opacity="1"
            d="M0,32L10,74.7C20,117,40,203,60,197.3C80,192,100,96,120,80C140,64,160,128,180,165.3C200,203,220,213,240,186.7C260,160,280,96,300,64C320,32,340,32,360,69.3C380,107,400,181,420,197.3C440,213,460,171,480,128C500,85,520,43,540,26.7C560,11,580,21,600,58.7C620,96,640,160,660,170.7C680,181,700,139,720,133.3C740,128,760,160,780,176C800,192,820,192,840,192C860,192,880,192,900,202.7C920,213,940,235,960,218.7C980,203,1000,149,1020,154.7C1040,160,1060,224,1080,229.3C1100,235,1120,181,1140,181.3C1160,181,1180,235,1200,240C1220,245,1240,203,1260,160C1280,117,1300,75,1320,96C1340,117,1360,203,1380,234.7C1400,267,1420,245,1430,234.7L1440,224L1440,0L1430,0C1420,0,1400,0,1380,0C1360,0,1340,0,1320,0C1300,0,1280,0,1260,0C1240,0,1220,0,1200,0C1180,0,1160,0,1140,0C1120,0,1100,0,1080,0C1060,0,1040,0,1020,0C1000,0,980,0,960,0C940,0,920,0,900,0C880,0,860,0,840,0C820,0,800,0,780,0C760,0,740,0,720,0C700,0,680,0,660,0C640,0,620,0,600,0C580,0,560,0,540,0C520,0,500,0,480,0C460,0,440,0,420,0C400,0,380,0,360,0C340,0,320,0,300,0C280,0,260,0,240,0C220,0,200,0,180,0C160,0,140,0,120,0C100,0,80,0,60,0C40,0,20,0,10,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Experiences */}
      {/* Projects Section */}
      <section
        id="experiences"
        className="min-h-screen bg-slate-950 px-6 py-24 text-white"
      >
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="mb-16 text-center">
            <h2 className="text-5xl font-bold leading-tight md:text-6xl">
              My <span className="text-sky-400">Project</span>
            </h2>
            <p className="mt-6 text-slate-400">
              Berikut beberapa project dan pengalaman yang pernah dikembangkan
            </p>
          </div>

          {/* Grid Project - 2 Kolom Pertama */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Project 1 */}
            <div className="group">
              {/* Container Foto Project */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition-all duration-500 group-hover:border-sky-400/50 shadow-xl">
                <img
                  src="experiences/alumniproject.png"
                  alt="Sistem Monitoring Siswa"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Konten Text */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-sky-400">
                  Sistem Monitoring Siswa (Project UKK SMK)
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">
                  Sistem ini dirancang untuk memantau kehadiran, prestasi
                  akademik, dan aktivitas ekstrakurikuler siswa secara
                  real-time. Menggunakan Laravel sebagai backend dan React untuk
                  frontend sistem ini.
                </p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group">
              {/* Container Foto Project */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition-all duration-500 group-hover:border-sky-400/50 shadow-xl">
                <img
                  src="experiences/websiteportfolio1.png"
                  alt="Portfolio1"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Konten Text */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-sky-400">
                  Portfolio #1 (Tailwind Camp)
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">
                  Website portfolio yang dibuat untuk mengikuti Tailwind,
                  menggunakan Next.js dan Tailwind CSS. Website ini menampilkan
                  informasi tentang saya, pengalaman, dan project yang pernah
                  saya kerjakan.
                </p>
              </div>
            </div>
          </div>

          {/* Grid Project - 2 Kolom Kedua */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Project 3 */}
            <div className="group">
              {/* Container Foto Project */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition-all duration-500 group-hover:border-sky-400/50 shadow-xl mt-12">
                <img
                  src="experiences/bloglaravel8.png"
                  alt="Blog Laravel 8"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Konten Text 3 */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-sky-400">
                  Blog Laravel 8
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">
                  Latihan membuat blog sederhana menggunakan Laravel 8. Blog ini
                  memiliki fitur CRUD untuk postingan, kategori, dan komentar.
                  Tujuannya untuk memahami dasar-dasar framework Laravel dan
                  konsep MVC dalam pengembangan web.
                </p>
              </div>
            </div>

            {/* Project 4 */}
            <div className="group">
              {/* Container Foto Project */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition-all duration-500 group-hover:border-sky-400/50 shadow-xl  mt-12">
                <img
                  src="experiences/cfcchampion.jpeg"
                  alt="CFC Champion"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Konten Text 4 */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-sky-400">
                  CFC Champion 1 - Physics Individual Competition
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">
                  Juara 1 Lomba Fisika CFC Champion 2020 untuk kategori Physics
                  Individual Competition. Kompetisi ini menguji pemahaman konsep
                  fisika dan kemampuan problem-solving dalam berbagai topik
                  seperti mekanika, termodinamika, dan elektromagnetisme.
                </p>
              </div>
            </div>
          </div>

          {/* Grid Project - 2 Kolom Ketiga */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Project 5 */}
            <div className="group">
              {/* Container Foto Project */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition-all duration-500 group-hover:border-sky-400/50 shadow-xl mt-12">
                <img
                  src="experiences/magang.jpg"
                  alt="Magang SMK"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Konten Text 5 */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-sky-400">
                  PKL di PT. Kreasi Binar Indonesia (2023)
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">
                  Magang selama 3 bulan di PT. Kreasi Binar Indonesia, sebuah
                  perusahaan dibawah naungan Bosowa Berlian Motor, sebagai IT
                  Support dan Backend Developer.
                </p>
              </div>
            </div>

            {/* Project 4 */}
            <div className="group">
              {/* Container Foto Project */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition-all duration-500 group-hover:border-sky-400/50 shadow-xl  mt-12">
                <img
                  src="experiences/imo.jpeg"
                  alt="IMMO"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Konten Text 4 */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-sky-400">
                  Mythical Immortal - As Gold Laner
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">
                  Menamatkan Prestasi Mythical Immortal sebagai Gold Laner di
                  Mobile Legends. Yang katanya Immo all prestasi (Ban 30 Juz)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GetWaves.io */}
      <div className="bg-slate-950">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -1 1440 320">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,0L6.2,0C12.3,0,25,0,37,16C49.2,32,62,64,74,69.3C86.2,75,98,53,111,42.7C123.1,32,135,32,148,69.3C160,107,172,181,185,208C196.9,235,209,213,222,192C233.8,171,246,149,258,144C270.8,139,283,149,295,138.7C307.7,128,320,96,332,85.3C344.6,75,357,85,369,117.3C381.5,149,394,203,406,218.7C418.5,235,431,213,443,186.7C455.4,160,468,128,480,149.3C492.3,171,505,245,517,266.7C529.2,288,542,256,554,234.7C566.2,213,578,203,591,170.7C603.1,139,615,85,628,90.7C640,96,652,160,665,170.7C676.9,181,689,139,702,117.3C713.8,96,726,96,738,117.3C750.8,139,763,181,775,202.7C787.7,224,800,224,812,224C824.6,224,837,224,849,208C861.5,192,874,160,886,128C898.5,96,911,64,923,80C935.4,96,948,160,960,192C972.3,224,985,224,997,234.7C1009.2,245,1022,267,1034,256C1046.2,245,1058,203,1071,181.3C1083.1,160,1095,160,1108,154.7C1120,149,1132,139,1145,160C1156.9,181,1169,235,1182,224C1193.8,213,1206,139,1218,138.7C1230.8,139,1243,213,1255,245.3C1267.7,277,1280,267,1292,234.7C1304.6,203,1317,149,1329,122.7C1341.5,96,1354,96,1366,96C1378.5,96,1391,96,1403,85.3C1415.4,75,1428,53,1434,42.7L1440,32L1440,320L1433.8,320C1427.7,320,1415,320,1403,320C1390.8,320,1378,320,1366,320C1353.8,320,1342,320,1329,320C1316.9,320,1305,320,1292,320C1280,320,1268,320,1255,320C1243.1,320,1231,320,1218,320C1206.2,320,1194,320,1182,320C1169.2,320,1157,320,1145,320C1132.3,320,1120,320,1108,320C1095.4,320,1083,320,1071,320C1058.5,320,1046,320,1034,320C1021.5,320,1009,320,997,320C984.6,320,972,320,960,320C947.7,320,935,320,923,320C910.8,320,898,320,886,320C873.8,320,862,320,849,320C836.9,320,825,320,812,320C800,320,788,320,775,320C763.1,320,751,320,738,320C726.2,320,714,320,702,320C689.2,320,677,320,665,320C652.3,320,640,320,628,320C615.4,320,603,320,591,320C578.5,320,566,320,554,320C541.5,320,529,320,517,320C504.6,320,492,320,480,320C467.7,320,455,320,443,320C430.8,320,418,320,406,320C393.8,320,382,320,369,320C356.9,320,345,320,332,320C320,320,308,320,295,320C283.1,320,271,320,258,320C246.2,320,234,320,222,320C209.2,320,197,320,185,320C172.3,320,160,320,148,320C135.4,320,123,320,111,320C98.5,320,86,320,74,320C61.5,320,49,320,37,320C24.6,320,12,320,6,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Contact */}
      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen bg-white px-6 py-24 text-slate-950"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-5xl font-bold leading-tight md:text-6xl">
              Hubungi Saya
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Kolom Kiri */}
            {/* Kolom Kiri: Stacked Cards (Trigger) */}
            <div
              // Container disesuaikan ukurannya agar pas membungkus kartu yang sudah dikecilkan
              className={`relative mx-auto h-[280px] w-[160px] lg:h-[300px] lg:w-[180px] cursor-pointer transition-all duration-500 ${
                socialState !== "none"
                  ? "opacity-0 pointer-events-none scale-90"
                  : "opacity-100 scale-100"
              }`}
              onMouseEnter={() =>
                socialState === "none" && setSocialState("hover")
              }
              onClick={() => setSocialState("click")}
            >
              {socials.map((social, idx) => (
                <div
                  key={social.id}
                  // Ukuran disamakan persis dengan kartu saat active
                  className={`absolute left-0 top-0 flex h-[240px] w-[160px] lg:h-[260px] lg:w-[180px] flex-col items-center justify-center rounded-3xl p-4 text-white shadow-2xl transition-all duration-500 ${social.bg}`}
                  style={{
                    zIndex: 50 - idx,
                    // Jarak tumpukan (translateY) sedikit dirapatkan agar proporsional dengan kartu yang mengecil
                    transform: `translateY(${idx * 12}px) scale(${1 - idx * 0.05})`,
                    opacity: 1 - idx * 0.15,
                  }}
                >
                  {/* Ikon diperkecil */}
                  <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    {social.icon}
                  </div>

                  {/* Teks diperkecil */}
                  <h3 className="text-lg font-bold">{social.name}</h3>
                  <p className="mb-4 text-xs opacity-80">{social.user}</p>

                  {/* Tombol Visit diperkecil */}
                  <div className="rounded-full bg-white/20 px-6 py-2 text-xs font-semibold backdrop-blur-md">
                    Visit
                  </div>
                </div>
              ))}
            </div>

            {/* Kolom Kanan */}
            <div>
              {/* Kolom Kanan: WhatsApp CTA */}
              <div className="flex h-[280px] w-full flex-col items-center justify-center rounded-3xl border border-white/10 bg-[#121212] p-8 text-center shadow-xl lg:h-[300px]">
                <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl">
                  Mau Kenalan Lebih Jauh? 😉
                </h3>

                <p className="mb-8 text-slate-400">Mari kenalan di WhatsApp</p>

                <a
                  href="https://api.whatsapp.com/send?phone=6281549285644&text=Aku%20Mau%20kenalan%20dong%20Ibe%20Ganteng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-4 font-bold text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#20ba56] hover:shadow-[#25D366]/50"
                >
                  <span>Chat Aku</span>
                  {/* Ikon Pesawat Kertas (Paper Plane) */}
                  <svg
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Fullscreen Blurred Overlay untuk Social Media */}
        {/* z-40 memastikan dia di bawah Navbar (z-50) tapi menutupi semua konten lainnya */}
        <div
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-xl transition-all duration-500 ${
            socialState !== "none"
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          onMouseLeave={() => {
            // Keluar mode jika kursor dijauhkan (hanya berlaku jika dibuka via hover)
            if (socialState === "hover") setSocialState("none");
          }}
        >
          {/* Container Utama untuk Barisan Card & Tombol Close */}
          <div
            className={`flex flex-col items-center transition-transform duration-700 ${
              socialState !== "none"
                ? "translate-y-0 scale-100"
                : "translate-y-32 scale-75"
            }`}
          >
            {/* Barisan Card yang Terbuka */}
            <div className="flex w-full max-w-6xl flex-wrap lg:flex-nowrap justify-center gap-4 lg:gap-6 p-4">
              {socials.map((social) => (
                <div
                  key={`expanded-${social.id}`}
                  // UKURAN CARD DIPERKECIL DI SINI: h-[240px] w-[160px] untuk HP, lg:h-[260px] lg:w-[180px] untuk Laptop
                  className={`group flex h-60 w-40 lg:h-65 lg:w-45 shrink-0 flex-col items-center justify-center rounded-3xl p-4 text-white shadow-2xl transition-transform duration-300 hover:-translate-y-4 ${social.bg}`}
                >
                  {/* Ikon diperkecil jadi h-16 w-16 */}
                  <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    {social.icon}
                  </div>
                  {/* Teks diperkecil jadi text-lg dan text-xs */}
                  <h3 className="text-lg font-bold">{social.name}</h3>
                  <p className="mb-4 text-xs opacity-80">{social.user}</p>
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    // Tombol visit diperkecil paddingnya
                    className="rounded-full bg-white/20 px-6 py-2 text-xs font-semibold backdrop-blur-md transition-colors hover:bg-white/40"
                  >
                    Visit
                  </a>
                </div>
              ))}
            </div>

            {/* Tombol Close (Pindah ke bawah, di tengah) */}
            <button
              onClick={() => setSocialState("none")}
              className="mt-8 rounded-full bg-red-500/20 p-4 text-red-500 backdrop-blur-md transition-all hover:scale-110 hover:bg-red-500 hover:text-white"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
