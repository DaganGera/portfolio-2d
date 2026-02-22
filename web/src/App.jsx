import { useEffect, useRef, useState } from 'react';
import { initGame } from './game';
import userData from '../../user_info.json';
import { Github, Linkedin, Instagram, Mail, X, User } from 'lucide-react';

function App() {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    let k;
    if (canvasRef.current && !gameRef.current) {
      k = initGame(canvasRef.current);
      gameRef.current = k;
    }

    const handleOpenModal = (e) => {
      console.log("React received openModal event with detail:", e.detail);
      setModalContent(e.detail);
    };

    window.addEventListener('openModal', handleOpenModal);

    return () => {
      window.removeEventListener('openModal', handleOpenModal);
      if (k) {
        // Cleanup kaboom on unmount (React Strict Mode fix)
        k.quit();
        gameRef.current = null;
      }
    };
  }, []);

  const handleClose = () => {
    setModalContent(null);
    window.dispatchEvent(new CustomEvent('resumeGame'));
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center text-white">
      {/* Game Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Fallback UI / Overlay UI */}
      {!modalContent && (
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <button
            onClick={() => setModalContent('about')}
            className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition shadow-lg text-sm flex items-center gap-2 border border-white/20"
          >
            Skip Game (Standard View)
          </button>
        </div>
      )}

      {/* Controls helper - Hidden on small mobile screens to save space */}
      {!modalContent && (
        <div className="hidden sm:block absolute bottom-6 left-6 z-10 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl pointer-events-none">
          <p className="font-bold text-white mb-2 text-sm uppercase tracking-wider">Controls</p>
          <div className="flex items-center gap-3 mb-2 text-sm text-gray-300">
            <div className="flex gap-1">
              <kbd className="bg-zinc-800 px-2 py-1 rounded shadow-sm border border-zinc-700">W</kbd>
              <kbd className="bg-zinc-800 px-2 py-1 rounded shadow-sm border border-zinc-700">A</kbd>
              <kbd className="bg-zinc-800 px-2 py-1 rounded shadow-sm border border-zinc-700">S</kbd>
              <kbd className="bg-zinc-800 px-2 py-1 rounded shadow-sm border border-zinc-700">D</kbd>
            </div>
            <span>Move</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <div className="flex gap-1">
              <kbd className="bg-zinc-800 px-2 py-1 rounded shadow-sm border border-zinc-700 font-mono">Space</kbd>
              <kbd className="bg-zinc-800 px-2 py-1 rounded shadow-sm border border-zinc-700">E</kbd>
            </div>
            <span>Interact</span>
          </div>
          <p className="text-xs text-blue-400 mt-2 italic">(Or click on the map to pathfind)</p>
        </div>
      )}

      {/* Title */}
      {!modalContent && (
        <div className="absolute top-6 left-6 z-10 pointer-events-none">
          <h1 className="text-2xl font-extrabold tracking-tight drop-shadow-lg text-white">
            {userData.name}
          </h1>
          <p className="text-blue-400 font-medium drop-shadow-md">{userData.role}</p>
        </div>
      )}

      {/* Modals */}
      {modalContent && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={handleClose}>
          <div
            className="relative bg-zinc-950/95 border border-zinc-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl sm:rounded-2xl p-6 sm:p-10 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={handleClose} className="absolute top-5 right-5 p-2 bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:text-white rounded-full transition">
              <X size={20} />
            </button>

            {/* Modal Content Rendering */}
            {modalContent === 'about' && (
              <div className="animate-in slide-in-from-bottom-4 duration-300">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6 text-center sm:text-left">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center shadow-lg border-2 border-zinc-800 shrink-0">
                    <User size={40} className="text-white/80" />
                  </div>
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold mb-1 tracking-tight">{userData.name}</h2>
                    <p className="text-lg sm:text-xl text-blue-400 font-medium">{userData.role}</p>
                  </div>
                </div>

                <div className="space-y-8 text-gray-300 leading-relaxed">
                  <div className="bg-zinc-900/50 p-5 rounded-xl border border-zinc-800/50">
                    <p className="text-lg">{userData.bio}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        Education
                      </h3>
                      {userData.education.map((edu, i) => (
                        <div key={i} className="mb-4 pl-4 border-l-2 border-zinc-800">
                          <div className="font-semibold text-white">{edu.degree}</div>
                          <div className="text-sm mt-1">{edu.school}</div>
                          <div className="text-sm text-blue-400 mt-1">{edu.status}</div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        Experience
                      </h3>
                      {userData.experience.map((exp, i) => (
                        <div key={i} className="mb-5 pl-4 border-l-2 border-zinc-800 relative">
                          <div className="absolute w-2 h-2 bg-zinc-600 rounded-full -left-[5px] top-1.5 ring-4 ring-zinc-950"></div>
                          <div className="font-semibold text-white leading-tight">{exp.role}</div>
                          <div className="text-emerald-400 text-sm font-medium mt-1">{exp.company}</div>
                          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2 mt-1">{exp.date}</div>
                          <p className="text-sm text-zinc-400">{exp.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {modalContent === 'projects' && (
              <div className="animate-in slide-in-from-bottom-4 duration-300">
                <div className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-sm font-medium mb-4">Laboratory</div>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-8 tracking-tight">Projects Showcase</h2>
                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                  {userData.projects.map((proj, i) => (
                    <div key={i} className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 hover:border-emerald-500/50 hover:bg-zinc-900 transition flex flex-col h-full group">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">{proj.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed flex-grow">{proj.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {modalContent === 'skills' && (
              <div className="animate-in slide-in-from-bottom-4 duration-300">
                <div className="inline-block px-3 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full text-sm font-medium mb-4">Library</div>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-8 tracking-tight">Technical Skills</h2>
                <div className="flex flex-wrap gap-2.5 mb-12">
                  {userData.skills.map((skill, i) => (
                    <span key={i} className="px-4 py-2 bg-zinc-900 text-zinc-300 font-medium text-sm rounded-lg border border-zinc-800 hover:bg-zinc-800 hover:text-white hover:border-zinc-600 transition cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-zinc-700"></span>
                  Key Achievements
                  <span className="w-full h-[1px] bg-zinc-800"></span>
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {userData.achievements.map((ach, i) => (
                    <div key={i} className="flex items-start gap-3 bg-zinc-900/30 p-4 rounded-xl border border-zinc-800/50">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 shrink-0"></div>
                      <span className="text-zinc-300 text-sm">{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {modalContent === 'contact' && (
              <div className="animate-in slide-in-from-bottom-4 duration-300">
                <div className="inline-block px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-sm font-medium mb-4">Post Office</div>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">Let's Connect</h2>
                <p className="text-lg sm:text-xl text-zinc-400 mb-8 sm:mb-10">Feel free to reach out for collaborations or new opportunities.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <a href={`mailto:${userData.email}`} className="flex items-center gap-4 bg-zinc-900/60 p-5 rounded-xl border border-zinc-800 hover:border-red-500/50 hover:bg-zinc-800 transition group">
                    <div className="p-3 bg-zinc-950 rounded-lg group-hover:scale-110 transition shrink-0">
                      <Mail className="text-red-400" size={24} />
                    </div>
                    <div className="truncate text-sm font-medium text-zinc-200">Email Me</div>
                  </a>
                  <a href={userData.socials.github} target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-zinc-900/60 p-5 rounded-xl border border-zinc-800 hover:border-zinc-500 transition group">
                    <div className="p-3 bg-zinc-950 rounded-lg group-hover:scale-110 transition shrink-0">
                      <Github className="text-zinc-300" size={24} />
                    </div>
                    <div className="truncate text-sm font-medium text-zinc-200">GitHub</div>
                  </a>
                  <a href={userData.socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-zinc-900/60 p-5 rounded-xl border border-zinc-800 hover:border-blue-500/50 transition group">
                    <div className="p-3 bg-zinc-950 rounded-lg group-hover:scale-110 transition shrink-0">
                      <Linkedin className="text-blue-400" size={24} />
                    </div>
                    <div className="truncate text-sm font-medium text-zinc-200">LinkedIn</div>
                  </a>
                  <a href={userData.socials.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-zinc-900/60 p-5 rounded-xl border border-zinc-800 hover:border-pink-500/50 transition group">
                    <div className="p-3 bg-zinc-950 rounded-lg group-hover:scale-110 transition shrink-0">
                      <Instagram className="text-pink-400" size={24} />
                    </div>
                    <div className="truncate text-sm font-medium text-zinc-200">Instagram</div>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
