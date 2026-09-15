import React, { useState, useEffect, useRef } from 'react';
import { CONVERSATIONAL_LESSONS, ConversationalLesson, ConversationStep, OptionChoice } from '../data/conversationalLessons';
import { playClickSound, playExitCryptSound } from '../audio';
import { CrypticSigil } from './ui/CrypticSigil';

export interface TerminalMessage {
  id: string;
  sender: 'mentor' | 'user';
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
    caption?: string;
  };
  exampleBox?: {
    exampleNumber: number;
    title: string;
    input?: string;
    output?: string;
    explanation: string;
  };
}

export interface ConversationalTerminalProps {
  onReturnToLanding: () => void;
}

const DISCONNECT_QUOTES = [
  "In cryptography, trust is not given — it is mathematically proven. Until next time.",
  "Encryption is power. Use it to keep the darkness silent.",
  "What is hidden remains unbroken. Disconnecting...",
  "Secrets are short-lived. The math that protects them is eternal.",
  "Stay vigilant. The cipher never rests.",
];

export const ConversationalTerminal: React.FC<ConversationalTerminalProps> = ({
  onReturnToLanding,
}) => {
  // 1. INITIAL STATE: Start with mentor greeting, NO active lesson auto-started
  const [messages, setMessages] = useState<TerminalMessage[]>([
    {
      id: 'msg_initial_1',
      sender: 'mentor',
      content: "You're inside.\n\nChoose what you want to learn.",
    },
  ]);

  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [activeStepId, setActiveStepId] = useState<string | null>(null);

  // Typing engine state
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typingText, setTypingText] = useState<string>('');
  const [pendingStep, setPendingStep] = useState<{
    fullText: string;
    codeSnippet?: ConversationStep['codeSnippet'];
    exampleBox?: ConversationStep['exampleBox'];
  } | null>(null);

  // Disconnect & Blur state
  const [isDisconnecting, setIsDisconnecting] = useState<boolean>(false);
  const [showBlurOverlay, setShowBlurOverlay] = useState<boolean>(false);

  // Command bar (CTRL + SHIFT + K)
  const [isCmdOpen, setIsCmdOpen] = useState<boolean>(false);
  const [cmdQuery, setCmdQuery] = useState<string>('');

  // Curriculum overlay drawer
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const cmdInputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll smoothly when messages or typing updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingText, isTyping]);

  // Global Keyboard Shortcuts (CTRL + SHIFT + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'K' || e.key === 'k')) {
        e.preventDefault();
        setIsCmdOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsCmdOpen(false);
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isCmdOpen) {
      setTimeout(() => cmdInputRef.current?.focus(), 50);
    }
  }, [isCmdOpen]);

  // Typing effect execution
  useEffect(() => {
    if (!pendingStep) return;

    setIsTyping(true);
    setTypingText('');
    let charIdx = 0;
    const targetText = pendingStep.fullText;

    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    typingTimerRef.current = setInterval(() => {
      charIdx += 2; // Typing speed step
      if (charIdx >= targetText.length) {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);

        // Finalize message into messages list EXACTLY ONCE
        const finalMsg: TerminalMessage = {
          id: `msg_m_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          sender: 'mentor',
          content: targetText,
          codeSnippet: pendingStep.codeSnippet,
          exampleBox: pendingStep.exampleBox,
        };

        setMessages((prev) => [...prev, finalMsg]);
        setIsTyping(false);
        setTypingText('');
        setPendingStep(null);
      } else {
        setTypingText(targetText.substring(0, charIdx));
      }
    }, 18);

    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [pendingStep]);

  // Trigger a step in the active lesson
  const triggerStep = (lessonId: string, stepId: string) => {
    const lesson = CONVERSATIONAL_LESSONS[lessonId];
    if (!lesson) return;

    const step = lesson.steps[stepId] || lesson.steps[lesson.initialStepId];
    if (!step) return;

    setCurrentLessonId(lessonId);
    setActiveStepId(stepId);

    // Prepare full mentor transmission text
    const fullText = step.mentorMessages.join('\n\n');

    setPendingStep({
      fullText,
      codeSnippet: step.codeSnippet,
      exampleBox: step.exampleBox,
    });
  };

  // End Lesson ("Thank you") Handler
  const handleEndLesson = () => {
    if (isTyping || isDisconnecting) return;
    playClickSound();

    setIsDisconnecting(true);

    // 1. Add USER "Thank you" message
    const userMsg: TerminalMessage = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      content: 'Thank you.',
    };
    setMessages((prev) => [...prev, userMsg]);

    // 2. Pick a random mentor cool crisp quote
    const quote = DISCONNECT_QUOTES[Math.floor(Math.random() * DISCONNECT_QUOTES.length)];

    // 3. Mentor writes quote
    setTimeout(() => {
      setPendingStep({
        fullText: quote,
      });

      // 4. Trigger screen blur out and navigate to landing page
      setTimeout(() => {
        playExitCryptSound();
        setShowBlurOverlay(true);
        setTimeout(() => {
          onReturnToLanding();
        }, 2200);
      }, 1000);
    }, 300);
  };

  // User clicks a choice button
  const handleChoiceClick = (label: string, nextStepId: string) => {
    if (isTyping || isDisconnecting) return;

    if (nextStepId === 'DISCONNECT') {
      handleEndLesson();
      return;
    }

    playClickSound();

    // 1. Add USER response message on the right
    const userMsg: TerminalMessage = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      content: label,
    };
    setMessages((prev) => [...prev, userMsg]);

    // 2. Determine target lesson & step
    if (nextStepId.startsWith('GOTO:')) {
      const targetLessonId = nextStepId.replace('GOTO:', '');
      const targetLesson = CONVERSATIONAL_LESSONS[targetLessonId];
      if (targetLesson) {
        setTimeout(() => triggerStep(targetLessonId, targetLesson.initialStepId), 300);
      }
    } else if (currentLessonId) {
      setTimeout(() => triggerStep(currentLessonId, nextStepId), 300);
    }
  };

  // Start a lesson directly (from initial state, menu, or command bar)
  const handleStartLesson = (lessonId: string) => {
    if (isTyping || isDisconnecting) return;
    playClickSound();

    const lesson = CONVERSATIONAL_LESSONS[lessonId];
    if (!lesson) return;

    // Add user selection message
    const userMsg: TerminalMessage = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      content: `${lesson.number} ${lesson.title}`,
    };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      triggerStep(lessonId, lesson.initialStepId);
    }, 300);
  };

  // Command bar search submit
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmdQuery.trim() || isTyping || isDisconnecting) return;

    const q = cmdQuery.trim().toLowerCase();
    const match = Object.values(CONVERSATIONAL_LESSONS).find(
      (l) =>
        l.id.toLowerCase() === q ||
        l.title.toLowerCase().includes(q) ||
        l.number === q ||
        l.keywords.some((kw) => kw.toLowerCase().includes(q))
    );

    if (match) {
      setIsCmdOpen(false);
      setCmdQuery('');
      handleStartLesson(match.id);
    } else {
      setCmdQuery('');
    }
  };

  // Determine currently available choices
  const getAvailableChoices = (): { label: string; action: () => void }[] => {
    if (isTyping || isDisconnecting) return [];

    // INITIAL STATE: If no lesson is active yet, show all 13 curriculum topics + Thank you choice
    if (!currentLessonId || !activeStepId) {
      const list = Object.values(CONVERSATIONAL_LESSONS).map((l) => ({
        label: `${l.number} ${l.title}`,
        action: () => handleStartLesson(l.id),
      }));
      list.push({
        label: 'THANK YOU / DISCONNECT',
        action: handleEndLesson,
      });
      return list;
    }

    // LESSON STATE: Show options from the current step + Thank you choice
    const lesson = CONVERSATIONAL_LESSONS[currentLessonId];
    const step = lesson?.steps[activeStepId];

    if (!step?.options || step.options.length === 0) {
      // Fallback: allow returning to curriculum selection or ending lesson
      const list = Object.values(CONVERSATIONAL_LESSONS).map((l) => ({
        label: `${l.number} ${l.title}`,
        action: () => handleStartLesson(l.id),
      }));
      list.push({
        label: 'THANK YOU / DISCONNECT',
        action: handleEndLesson,
      });
      return list;
    }

    const opts = step.options.map((opt: OptionChoice) => ({
      label: opt.label,
      action: () => handleChoiceClick(opt.label, opt.nextStepId),
    }));

    // Add Thank You / Disconnect choice at the end of response options
    opts.push({
      label: 'THANK YOU',
      action: handleEndLesson,
    });

    return opts;
  };

  const choices = getAvailableChoices();
  const activeLesson = currentLessonId ? CONVERSATIONAL_LESSONS[currentLessonId] : null;

  return (
    <div className="w-full h-screen bg-[#020305] text-[#d8e0ec] font-mono flex flex-col justify-between overflow-hidden relative select-none">
      {/* CRYPTIC BLUR & FADE OVERLAY ON LESSON END */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-1000 pointer-events-none flex flex-col items-center justify-center gap-6 bg-[#020305]/95 backdrop-blur-2xl ${
          showBlurOverlay ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <CrypticSigil size={160} color="#ffffff" className="animate-pulse" />
        <span className="text-white text-sm font-bold tracking-[0.3em] font-mono uppercase animate-pulse drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">
          // TERMINATING SESSION... ARS CRYPTOGRAPHICA
        </span>
      </div>

      {/* 1. MINIMAL HEADER */}
      <header className="z-30 w-full bg-[#030407]/90 border-b border-[#141824] py-2.5 px-3 sm:py-3.5 sm:px-5 md:px-[5vw] lg:px-[8vw] flex items-center justify-between gap-2">
        {/* Brand & Landing Link */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            onClick={() => {
              playClickSound();
              handleEndLesson();
            }}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
            title="Return to ENCRYPT Portal"
          >
            <span className="w-2.5 h-2.5 bg-[#ff003c] shadow-[0_0_10px_#ff003c] group-hover:scale-125 transition-transform" />
            <span className="font-heading font-black text-base sm:text-lg text-white tracking-widest group-hover:text-[#ff003c] transition-colors">
              E<span className="text-[#ff003c]">N</span>CRYPT
            </span>
          </button>

          {activeLesson && (
            <>
              <span className="text-[#202838] hidden sm:inline">/</span>
              <div className="hidden sm:flex items-center gap-1.5 text-xs truncate max-w-[120px] sm:max-w-none">
                <span className="text-[#ff003c] font-bold">{activeLesson.number}</span>
                <span className="text-[#e2e8f0] font-bold uppercase tracking-wider truncate">
                  {activeLesson.title}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Curriculum drawer toggle & Anytime End Lesson button */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="px-2.5 py-1 sm:px-3 bg-[#0b0e18] hover:bg-[#161c2e] border border-[#1e273a] hover:border-[#ff003c]/50 text-[#a0aab8] hover:text-white transition-all cursor-pointer text-[10px] sm:text-xs font-bold uppercase tracking-wider clip-chamfer"
          >
            CURRICULUM
          </button>

          <button
            onClick={handleEndLesson}
            disabled={isDisconnecting}
            className="px-2.5 py-1 sm:px-3 bg-[#ff003c]/10 hover:bg-[#ff003c] border border-[#ff003c]/60 text-[#ff003c] hover:text-white transition-all cursor-pointer text-[10px] sm:text-xs font-bold uppercase tracking-wider clip-chamfer active:scale-95 disabled:opacity-50"
            title="End lesson and disconnect session"
          >
            END LESSON
          </button>
        </div>
      </header>

      {/* HIDDEN COMMAND BAR OVERLAY (CTRL + SHIFT + K) */}
      {isCmdOpen && (
        <div className="absolute top-12 sm:top-14 left-0 right-0 z-50 bg-[#05070c]/98 border-b border-[#ff003c]/50 p-3 sm:p-4 shadow-[0_10px_30px_rgba(255,0,60,0.15)] backdrop-blur-md">
          <form onSubmit={handleCommandSubmit} className="w-full max-w-4xl mx-auto flex items-center gap-2 sm:gap-3">
            <span className="text-[#ff003c] font-bold text-xs sm:text-sm tracking-widest">&gt;</span>
            <input
              ref={cmdInputRef}
              type="text"
              value={cmdQuery}
              onChange={(e) => setCmdQuery(e.target.value)}
              placeholder="type lesson (e.g. hashing, symmetric, hmac, tls)..."
              className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none placeholder-[#3f4a5c]"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-[#ff003c] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider clip-chamfer hover:bg-[#d60032] cursor-pointer"
            >
              EXECUTE
            </button>
          </form>
        </div>
      )}

      {/* CURRICULUM OVERLAY DRAWER */}
      {isMenuOpen && (
        <div className="absolute top-12 sm:top-14 right-2 sm:right-4 left-2 sm:left-auto z-50 w-[calc(100vw-1rem)] sm:w-80 bg-[#05070c] border border-[#ff003c]/40 p-3 sm:p-4 shadow-[0_10px_40px_rgba(0,0,0,0.95)] clip-chamfer flex flex-col gap-3 font-mono">
          <div className="flex items-center justify-between pb-2 border-b border-[#141824]">
            <span className="text-[10px] text-[#ff003c] font-bold tracking-widest uppercase">
              // CURRICULUM ARCHIVE
            </span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-xs text-[#717d94] hover:text-white cursor-pointer p-1"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-1.5 max-h-[60vh] sm:max-h-96 overflow-y-auto no-scrollbar">
            {Object.values(CONVERSATIONAL_LESSONS).map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  setIsMenuOpen(false);
                  handleStartLesson(l.id);
                }}
                className={`w-full text-left p-2.5 text-xs clip-chamfer flex items-center justify-between border transition-all cursor-pointer min-h-[40px] ${
                  l.id === currentLessonId
                    ? 'bg-[#ff003c]/20 border-[#ff003c] text-white font-bold'
                    : 'bg-[#080b12] border-[#141824] text-[#a0aab8] hover:text-white hover:border-[#ff003c]/40'
                }`}
              >
                <span>{l.number} / {l.title}</span>
                {l.id === currentLessonId && <span className="text-[#ff003c]">●</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. FULL-WIDTH TERMINAL CONVERSATION STREAM */}
      <main className="flex-1 w-full px-3 sm:px-5 md:px-[5vw] lg:px-[10vw] py-4 sm:py-8 overflow-y-auto flex flex-col gap-6 sm:gap-8 no-scrollbar">
        {/* Render Finalized Messages */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col gap-1.5 sm:gap-2 ${
              msg.sender === 'user'
                ? 'self-end items-end max-w-[92%] sm:max-w-[85%] md:max-w-[70%]'
                : 'self-start items-start max-w-[96%] sm:max-w-[90%] md:max-w-[75%]'
            }`}
          >
            {/* Sender Label */}
            <span
              className={`text-[9px] sm:text-[10px] font-bold tracking-widest uppercase font-mono ${
                msg.sender === 'user' ? 'text-[#00e699]' : 'text-[#ff003c]'
              }`}
            >
              {msg.sender === 'user' ? 'YOU' : 'MENTOR // ENCRYPT'}
            </span>

            {/* Content Body */}
            <div
              className={`text-xs sm:text-sm md:text-base leading-relaxed font-mono whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-[#0d121f] border border-[#00e699]/30 text-[#00e699] px-3.5 py-2 sm:px-4 sm:py-2.5 clip-chamfer font-bold'
                  : 'text-[#d8e0ec] pl-2.5 sm:pl-3 border-l-2 border-[#ff003c]/50'
              }`}
            >
              {msg.content}

              {/* Optional Attached Code Snippet */}
              {msg.codeSnippet && (
                <div className="mt-3 p-2.5 sm:p-3.5 bg-[#030407] border border-[#181d2c] text-xs font-mono clip-chamfer text-[#00e699] max-w-full overflow-hidden">
                  {msg.codeSnippet.caption && (
                    <span className="text-[9px] sm:text-[10px] text-[#637088] block mb-1 uppercase font-bold">
                      // {msg.codeSnippet.caption}
                    </span>
                  )}
                  <pre className="overflow-x-auto text-[10px] sm:text-[11px] text-[#a0aab8] leading-normal whitespace-pre p-1">
                    {msg.codeSnippet.code}
                  </pre>
                </div>
              )}

              {/* Optional Attached Example Box */}
              {msg.exampleBox && (
                <div className="mt-3 p-3 sm:p-4 bg-[#05060b] border border-[#ff003c]/30 clip-chamfer flex flex-col gap-2 text-xs font-mono max-w-full">
                  <div className="text-[9px] sm:text-[10px] text-[#ff003c] font-bold uppercase tracking-widest pb-1 border-b border-[#141824]">
                    EXAMPLE {msg.exampleBox.exampleNumber} OF 5: {msg.exampleBox.title}
                  </div>

                  {msg.exampleBox.input && (
                    <div className="text-[10px] sm:text-[11px] break-all">
                      <span className="text-[#637088]">INPUT: </span>
                      <span className="text-white">{msg.exampleBox.input}</span>
                    </div>
                  )}

                  {msg.exampleBox.output && (
                    <div className="text-[10px] sm:text-[11px] break-all">
                      <span className="text-[#637088]">OUTPUT / RESULT: </span>
                      <span className="text-[#00e699]">{msg.exampleBox.output}</span>
                    </div>
                  )}

                  <p className="text-[10px] sm:text-[11px] text-[#909cb0] italic pt-1">
                    {msg.exampleBox.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Dynamic Typing Buffer */}
        {isTyping && (
          <div className="self-start items-start max-w-[96%] sm:max-w-[90%] md:max-w-[75%] flex flex-col gap-1.5 sm:gap-2">
            <span className="text-[9px] sm:text-[10px] text-[#ff003c] font-bold tracking-widest uppercase font-mono">
              MENTOR // ENCRYPT
            </span>
            <div className="text-xs sm:text-sm md:text-base leading-relaxed text-[#d8e0ec] font-mono whitespace-pre-wrap pl-2.5 sm:pl-3 border-l-2 border-[#ff003c]">
              {typingText}
              <span className="inline-block w-2 h-4 bg-[#ff003c] animate-pulse ml-1" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* 3. AVAILABLE RESPONSE CHOICES FOOTER */}
      <footer className="z-30 w-full bg-[#030407]/95 border-t border-[#141824] px-3 sm:px-5 md:px-[5vw] lg:px-[10vw] py-3 sm:py-5 backdrop-blur-md">
        <div className="flex flex-col gap-2.5 sm:gap-3 max-w-full">
          <span className="text-[9px] sm:text-[10px] text-[#56637a] uppercase font-bold tracking-widest font-mono">
            // AVAILABLE RESPONSES
          </span>

          <div className="flex flex-wrap gap-2 max-h-40 sm:max-h-48 overflow-y-auto no-scrollbar">
            {!isTyping && !isDisconnecting && choices.length > 0 ? (
              choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={choice.action}
                  className={`px-3 py-2 sm:px-4 sm:py-2.5 border text-[11px] sm:text-xs font-bold uppercase tracking-wider clip-chamfer active:scale-95 transition-all cursor-pointer min-h-[44px] flex items-center justify-center text-left ${
                    choice.label.includes('THANK YOU')
                      ? 'bg-[#ff003c]/15 hover:bg-[#ff003c] border-[#ff003c] text-white shadow-[0_0_15px_rgba(255,0,60,0.25)]'
                      : 'bg-[#080b14] hover:bg-[#141a2b] border-[#ff003c]/40 hover:border-[#ff003c] text-[#e2e8f0] hover:text-[#00e699] shadow-[0_0_12px_rgba(255,0,60,0.1)]'
                  }`}
                >
                  [ {choice.label} ]
                </button>
              ))
            ) : isTyping ? (
              <div className="text-xs text-[#56637a] italic flex items-center gap-2 font-mono py-1">
                <span className="w-2 h-2 rounded-full bg-[#ff003c] animate-ping" />
                Mentor transmission typing...
              </div>
            ) : isDisconnecting ? (
              <div className="text-xs text-[#ff003c] font-bold flex items-center gap-2 font-mono animate-pulse py-1">
                <span className="w-2 h-2 rounded-full bg-[#ff003c]" />
                SESSION DISCONNECTING...
              </div>
            ) : null}
          </div>
        </div>
      </footer>
    </div>
  );
};
