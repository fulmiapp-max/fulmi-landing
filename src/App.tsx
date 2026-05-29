import React, { useState, useEffect, useRef } from 'react';
import { CONFIG } from './config';
import { 
  Sparkles, 
  ChevronDown, 
  Globe,
  Smile,
  Activity,
  CheckSquare,
  MessageSquare
} from 'lucide-react';

// 다국어 번역 리소스 사전 정의
const TRANSLATIONS = {
  ko: {
    nav: {
      logo: "Fulmi",
      startBtn: "무료로 시작하기",
      langKo: "한국어",
      langEn: "English"
    },
    hero: {
      mainTitle: "기록을 통해 나를 성찰하며,",
      mainTitleHighlight: "내일을 채운다",
      subTitle: "행동 유도형 AI 셀프 성장 플랫폼, 풀미(Fulmi)",
      startBtn: "풀미 시작하기 ➔"
    },
    background: {
      headline: "왜 우리는 매일 일기를 쓰고도 변하지 않을까?",
      subHeadline: "기록을 과거에 묻어두는 당신을 위해, Fulmi가 풀고 싶은 문제들",
      card1Title: "과거에 묻혀버리는 소중한 기록",
      card1Desc: "매일 열심히 쓰는 일기가 그저 감정을 쏟아내는 일회성 기록에 그치고 있진 않나요?\n어제의 일기를 깊은 성찰로 연결하지 못하면, 소중한 기록들은 결국 과거에 묻히고 말아요.",
      card2Title: "아침마다 찾아오는 실행의 막막함",
      card2Desc: "어제 다이어리를 가득 채웠어도, 다음 날 아침이면 \"오늘 뭐 해야 하지?\" 하는 막막함이 밀려옵니다.\n무거운 결정 피로 속에서 정작 오늘 나를 움직이게 만들 실행력은 점점 희미해지곤 하죠.",
      card3Title: "공감과 행동을 잇는 고리의 부재",
      card3Desc: "따뜻한 위로를 받더라도 오늘 바로 실천할 구체적인 행동으로 이어지기는 생각보다 어려워요.\n일기가 피드백을 거쳐 할 일로 이어지는 선순환이 없기에, 우리 삶은 제자리걸음을 반복하게 됩니다."
    },
    features: {
      headline: "나를 바꾸는 3단계 셀프 성장 시스템",
      subHeadline: "기록에서 성찰로, 성찰에서 실행으로 이어지는 강력한 솔루션",
      feat1Title: "감정·에너지 트래킹 (Log)",
      feat1Desc: "단순 텍스트를 넘어 그날의 감정과 에너지 레벨을 직관적으로 데이터화합니다. 내가 언제 지치고 힘을 얻는지 한눈에 파악하세요.",
      feat2Title: "AI 성찰 피드백 (Reality Check)",
      feat2Desc: "따뜻한 공감을 넘어, 때로는 객관적인 분석과 냉철한 조언(Stinging Advice)으로 진짜 나를 직면하게 돕습니다.",
      feat3Title: "기록 기반 To-Do 자동 생성 (Action)",
      feat3Desc: "어제 일기의 맥락을 분석해 오늘 실천할 Micro-task를 받아보세요. 무엇을 해야 할지 고민하는 피로도가 0이 됩니다."
    },
    demo: {
      headline: "AI 분석 실시간 가상 체험하기",
      subHeadline: "오늘 느꼈던 감정이나 일기를 가볍게 한 줄만 써보세요. AI 분석의 핵심 가치를 즉석에서 무료로 맛볼 수 있습니다.",
      placeholder: "예: 오늘 직장에서 프로젝트 기획안을 최종 통과시켰다! 정말 너무 기쁘고 뿌듯하다 🚀",
      btnText: "AI 가상 분석 시뮬레이팅",
      analyzingText: "AI가 당신의 성찰 데이터를 정밀 분석 중...",
      resultTitle: "AI 성찰 분석 리포트 (시뮬레이터)",
      energy: "정신/신체 에너지 레벨",
      positivity: "긍정도 점수",
      realityCheck: "AI 현실 점검 (Reality Check)",
      actionItem: "내일 아침 바로 실천할 To-Do (Micro-task)"
    },
    faq: {
      headline: "자주 묻는 질문",
      q1: "정말 일기만 쓰면 To-Do가 자동으로 생기나요?",
      a1: "네, 맞습니다! 작성하신 감정 상태와 사건 일기의 텍스트를 인공지능이 면밀히 분석하여, 다음 날 아침 당신의 멘탈을 케어하거나 생산성을 높여줄 초소형 행동 요령(Micro-task)을 자동으로 장착해 줍니다.",
      q2: "Pro 멤버십 결제는 나중에 모바일 앱을 다운받아도 유지되나요?",
      a2: "네, 완벽하게 연동됩니다. 웹(Web) 브라우저를 통해 먼저 구독을 시작하셨더라도 동일한 로그인 이메일 ID를 사용해 나중에 출시될 스마트폰 앱(iOS/Android)에 로그인하시면 Pro 권한 및 다이어리 히스토리가 고스란히 활성화됩니다.",
      q3: "데이터와 일기 기록의 보안은 안전한가요?",
      a3: "Fulmi는 모든 일기 텍스트와 감정 분석 데이터를 군사 등급의 최첨단 암호화 표준을 활용하여 안전하게 암호화하여 저장합니다. 개인 식별 데이터는 절대 외부 공유되지 않습니다."
    },
    cta: {
      mainCopy: "매일 아침 마주하던 막막함을, 내일의 확실한 성취로.",
      subCopy: "지금 Fulmi와 함께 어제의 기록을 오늘의 행동으로 바꿔보세요.",
      startBtn: "무료로 시작하기"
    },
    footer: {
      desc: "기록을 행동으로 바꾸는 혁신적 AI 성장 서포터, 풀미(Fulmi).",
      terms: "이용 약관",
      privacy: "개인정보처리방침",
      support: "고객 문의",
      companyInfo: "LAVITOS | 사업자등록번호: 516-63-00849",
      copyright: "© 2026 LAVITOS. All rights reserved."
    }
  },
  en: {
    nav: {
      logo: "Fulmi",
      startBtn: "Get Started Free",
      langKo: "한국어",
      langEn: "English"
    },
    hero: {
      mainTitle: "Reflect on Yourself by Recording,",
      mainTitleHighlight: "Fill Your Tomorrow",
      subTitle: "Action-Oriented AI Self-Growth Platform, Fulmi",
      startBtn: "Start Fulmi ➔"
    },
    background: {
      headline: "Why Do We Keep Journaling Daily and Still Not Change?",
      subHeadline: "For you who buries your records in the past, problems Fulmi wants to solve",
      card1Title: "Precious Records Buried in the Past",
      card1Desc: "Does your daily, dedicated journaling end up as just a one-off emotional release?\nWithout connecting yesterday's diary to deep reflection, your precious records eventually get buried.",
      card2Title: "Morning Hesitation in Taking Action",
      card2Desc: "Even if you filled your journal yesterday, you face blank-page anxiety tomorrow morning.\nUnder heavy decision fatigue, the actual drive to move today gradually fades away.",
      card3Title: "Absence of a Bridge Between Empathy and Action",
      card3Desc: "Even with warm comfort, bridging it directly to actionable steps today is harder than it looks.\nWithout a loop from journal to feedback to to-do, life keeps running in circles."
    },
    features: {
      headline: "3-Step Self-Growth System",
      subHeadline: "A powerful workflow moving from recording to reflection, and reflection to execution.",
      feat1Title: "Emotion & Energy Tracking (Log)",
      feat1Desc: "Go beyond simple text to intuitively digitize your emotions and energy levels. See at a glance when you drain and gain strength.",
      feat2Title: "AI Reflection Feedback (Reality Check)",
      feat2Desc: "Go beyond warm empathy; face your true self with objective analysis and stinging advice when you need it.",
      feat3Title: "Diary-Driven Automated To-Do (Action)",
      feat3Desc: "Analyze yesterday's diary to receive micro-tasks for today. Reduce the fatigue of planning to absolute zero."
    },
    demo: {
      headline: "Try Live AI Analysis Simulation",
      subHeadline: "Type a brief one-line diary or how you felt today. Experience the core values of AI analysis instantly for free.",
      placeholder: "e.g., Finally passed the project proposal at work today! So happy and proud 🚀",
      btnText: "Simulate AI Analysis",
      analyzingText: "AI is analyzing your reflection data...",
      resultTitle: "AI Reflection Report (Simulator)",
      energy: "Mental & Physical Energy",
      positivity: "Positivity Score",
      realityCheck: "AI Reality Check",
      actionItem: "Actionable To-Do for Tomorrow"
    },
    faq: {
      headline: "Frequently Asked Questions",
      q1: "Does it really generate To-Dos automatically just by writing?",
      a1: "Yes, exactly! Our AI scans your mood logs and notes to equip you with tiny, high-impact habits (Micro-tasks) that optimize your mental state and boost productivity next morning.",
      q2: "Will my Pro membership persist if I download the mobile app later?",
      a2: "Absolutely. Even if you subscribe on the web landing page, signing into the future iOS/Android apps with the same email ID instantly unlocks your Pro features and syncs your diary logs.",
      q3: "Is my personal data and diary content secure?",
      a3: "Fulmi encrypts all logs and emotional analyses using military-grade security standards. Your personal identifiable data is never exposed or sold to third parties."
    },
    cta: {
      mainCopy: "Turn morning hesitation into tomorrow's definite achievement.",
      subCopy: "Transform yesterday's records into today's actions with Fulmi now.",
      startBtn: "Start Free Now"
    },
    footer: {
      desc: "An innovative AI-powered growth companion that turns records into actions, Fulmi.",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      support: "Support",
      companyInfo: "LAVITOS | Business Registration Number: 516-63-00849",
      copyright: "© 2026 LAVITOS. All rights reserved."
    }
  }
};

// 실시간 AI 체험 가상 데이터셋
const DEMO_PRESETS = {
  성취: {
    ko: {
      emotion: "성취감/기쁨 😊",
      energy: 92,
      positivity: 95,
      realityCheck: "노력에 합당한 대단히 눈부신 하루였습니다! 마음껏 성취감을 누리셔도 좋습니다. 다만, 내일의 안정적인 에너지를 위해 지나친 늦은 밤 축하 활동보다 차분한 명상으로 수면 주기를 보호하세요.",
      todo: "기분 좋은 성취 에너지를 유지하기 위해, 오늘 고생한 동료나 나에게 따뜻한 감사 쪽지 하나 남기기 💌"
    },
    en: {
      emotion: "Accomplishment/Joy 😊",
      energy: 92,
      positivity: 95,
      realityCheck: "A truly brilliant day matching your efforts! You deserve to celebrate. However, protect your sleep cycle with calm winding-down rather than over-excitement to sustain this drive tomorrow.",
      todo: "To keep this positive momentum, write a quick thank-you note to a teammate or yourself 💌"
    }
  },
  지침: {
    ko: {
      emotion: "스트레스/피로 😭",
      energy: 35,
      positivity: 28,
      realityCheck: "상당히 지치고 압박감이 느껴지는 위험 신호입니다. 오늘 할 일은 이미 다 끝났으니, 더 이상 생산성에 대해 죄책감을 갖지 마세요. 뇌와 몸의 긴장을 억지로 푸는 따뜻한 시간이 급선무입니다.",
      todo: "스마트폰을 완전히 끄고, 따뜻한 우유나 허브차 한 잔 마시며 20분간 멍하니 창밖 바라보기 🍵"
    },
    en: {
      emotion: "Stress/Fatigue 😭",
      energy: 35,
      positivity: 28,
      realityCheck: "A clear red flag signaling severe depletion. The day's work is done; reject any productivity guilt. Forcing your mind and body into complete, deep physical relaxation is your highest priority.",
      todo: "Shut down your smartphone entirely, drink a warm herbal tea, and look out the window for 20 minutes 🍵"
    }
  },
  갈등: {
    ko: {
      emotion: "갈등/분노 😡",
      energy: 78,
      positivity: 15,
      realityCheck: "타인과의 갈등으로 머릿속이 온통 분노로 끓어오르는 상태입니다. 상대방의 무례함이나 부당함을 곱씹을수록 스스로의 소중한 에너지만 소모될 뿐입니다. 지금 당장 화를 가라앉히려 애쓰기보다, 물리적으로 그 생각에서 한 걸음 떨어져 나와 호흡을 전환하세요.",
      todo: "갈등을 곱씹는 회로를 억지로 끊기 위해, 신나는 음악을 들으며 10분간 활기차게 빠른 걸음으로 산책하기 🎧"
    },
    en: {
      emotion: "Conflict/Anger 😡",
      energy: 78,
      positivity: 15,
      realityCheck: "Your mind is boiling with anger due to interpersonal conflict. Ruminating on their rudeness only drains your own precious energy. Instead of forcing yourself to calm down right now, physically step away from the environment to shift your focus.",
      todo: "Listen to fast-paced music and go for a brisk 10-minute walk to physically interrupt the rumination cycle 🎧"
    }
  },
  슬픔: {
    ko: {
      emotion: "우울/슬픔 😢",
      energy: 25,
      positivity: 10,
      realityCheck: "마음이 깊고 차분한 어둠 속에 잠겨있는 상태입니다. 억지로 힘을 내어 밝은 척하거나 활기차지려 할 필요 전혀 없습니다. 슬픈 감정을 부정하지 말고 있는 그대로 인정해 주되, 몸의 최소 감각을 깨워 가벼운 닻을 내리는 것이 감정의 밑바닥을 딛고 일어설 디딤돌이 됩니다.",
      todo: "방 안의 커튼을 걷고 5분 동안 햇볕을 온전히 쬐며 손끝과 발끝의 감각에 집중해보기 ☀️"
    },
    en: {
      emotion: "Sadness/Melancholic 😢",
      energy: 25,
      positivity: 10,
      realityCheck: "Your mind is gently submerged in a deep, quiet shadow. There's absolutely no need to force a smile or act cheerful. Let yourself feel the sorrow, but ground yourself by awakening physical senses to step back into the present.",
      todo: "Open the curtains and stand in the sunlight for 5 minutes, focusing purely on the sensation of warmth on your skin ☀️"
    }
  },
  불안: {
    ko: {
      emotion: "불안/무기력 😰",
      energy: 40,
      positivity: 30,
      realityCheck: "아직 오지 않은 미래에 대한 과도한 상상과 걱정이 마음을 짓누르고 있습니다. 뇌가 '모호함'을 위험으로 인지할 때 불안은 극대화됩니다. 걱정거리를 통제할 수 있는 작은 크기로 쪼개어 종이에 쏟아내는 순간, 뇌는 상황을 장악할 수 있다고 느껴 평온을 찾게 됩니다.",
      todo: "노트와 펜을 들고, 지금 머릿속을 괴롭히는 걱정거리 3가지를 적어보고 손으로 찢어 쓰레기통에 버리기 📝"
    },
    en: {
      emotion: "Anxiety/Helplessness 😰",
      energy: 40,
      positivity: 30,
      realityCheck: "Excessive imaginations about an uncertain future are weighing heavily on your mind. When the brain senses ambiguity, anxiety spikes. Break down your worries into small, manageable pieces and dump them onto paper to regain control.",
      todo: "Grab a pen, write down the top 3 worries bugging your brain right now, then physically tear the page and throw it away 📝"
    }
  },
  평온: {
    ko: {
      emotion: "평온/보통 🌿",
      energy: 65,
      positivity: 60,
      realityCheck: "잔잔하고 평화로운 하루였습니다. 무난한 하루 속에서 숨겨진 소소한 감사를 발견하는 능력을 기를 때 성장은 가속됩니다. 오늘 하루 평안했음에 감사해 보세요.",
      todo: "내일의 활기찬 시작을 위해, 오늘 가볍게 10분만 스트레칭하고 평소보다 15분 일찍 눕기 🧘"
    },
    en: {
      emotion: "Calm/Normal 🌿",
      energy: 65,
      positivity: 60,
      realityCheck: "A calm, neutral day. Real growth speeds up when you recognize hidden micro-joys in ordinary routines. Be grateful for the peaceful lack of chaotic events today.",
      todo: "For a fresh morning start, do a quick 10-minute stretch and lay down 15 minutes earlier than usual 🧘"
    }
  }
};

export default function App() {
  // 디바이스 언어 감지 및 설정 (기본: ko가 아닐 경우 en으로 설정)
  const [lang, setLang] = useState<'ko' | 'en'>(() => {
    const userLang = navigator.language || 'en';
    return userLang.startsWith('ko') ? 'ko' : 'en';
  });

  // 다크모드 해제 결정에 따른 기존 HTML 'dark' 클래스 소거 및 테마 설정 삭제
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('landing_theme');
  }, []);

  const t = TRANSLATIONS[lang];

  // 언어 선택 드롭다운 상태
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // AI 시뮬레이터 관련 상태
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [demoResult, setDemoResult] = useState<any>(null);

  // FAQ 아코디언 상태
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    setDemoResult(null);

    // 1.8초 동안 실감나는 AI 연산 애니메이션 수행 후 시뮬레이션 결과 표출
    setTimeout(() => {
      let category: '성취' | '지침' | '갈등' | '슬픔' | '불안' | '평온' = '평온';
      const text = inputText.toLowerCase();

      if (text.includes('기쁘') || text.includes('통과') || text.includes('해냈') || text.includes('성공') || text.includes('100') || text.includes('백점') || text.includes('happy') || text.includes('win') || text.includes('pass') || text.includes('대박') || text.includes('좋다') || text.includes('최고')) {
        category = '성취';
      } else if (text.includes('짜증') || text.includes('화남') || text.includes('싸움') || text.includes('싸웠') || text.includes('상사') || text.includes('갈등') || text.includes('분노') || text.includes('화가') || text.includes('angry') || text.includes('mad') || text.includes('fight') || text.includes('hate') || text.includes('열받')) {
        category = '갈등';
      } else if (text.includes('슬프') || text.includes('눈물') || text.includes('외롭') || text.includes('우울') || text.includes('쓸쓸') || text.includes('sad') || text.includes('depress') || text.includes('lonely') || text.includes('cry') || text.includes('속상')) {
        category = '슬픔';
      } else if (text.includes('불안') || text.includes('걱정') || text.includes('무기력') || text.includes('막막') || text.includes('포기') || text.includes('번아웃') || text.includes('anxious') || text.includes('worry') || text.includes('burnout') || text.includes('두렵') || text.includes('무섭')) {
        category = '불안';
      } else if (text.includes('힘들') || text.includes('피곤') || text.includes('지친') || text.includes('피로') || text.includes('지친다') || text.includes(' tired') || text.includes('stress') || text.includes('exhaust') || text.includes('아프')) {
        category = '지침';
      }

      setDemoResult(DEMO_PRESETS[category][lang]);
      setIsAnalyzing(false);
    }, 1800);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleGoToApp = () => {
    window.location.href = CONFIG.appDomain;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* ────────────────── 1. 스티키 상단 헤더 (좌우 여유 공간 압축형 레이아웃) ────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between">
          {/* 로고 */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-outfit">{t.nav.logo}</span>
          </div>

          {/* 우측 메뉴 구성 */}
          <div className="flex items-center gap-3">
            {/* 드롭다운 방식 언어 선택 메뉴 */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700/80 px-3 py-2 rounded-lg border border-slate-200/50 dark:border-slate-700/50 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 transition-all active:scale-95"
              >
                <Globe className="w-4 h-4 text-slate-500" />
                <span>{lang === 'ko' ? '한국어' : 'English'}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isLangOpen ? 'rotate-180 text-indigo-600' : ''}`} />
              </button>
              
              {/* 드롭다운 레이어 */}
              {isLangOpen && (
                <div className="absolute right-0 mt-1.5 w-32 bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-xl shadow-xl py-1 z-50 animate-fade-in text-left">
                  <button 
                    onClick={() => { setLang('ko'); setIsLangOpen(false); }}
                    className={`w-full px-4 py-3 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold ${lang === 'ko' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/40 dark:bg-indigo-950/20' : 'text-slate-700 dark:text-slate-300'}`}
                  >
                    한국어
                  </button>
                  <button 
                    onClick={() => { setLang('en'); setIsLangOpen(false); }}
                    className={`w-full px-4 py-3 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold ${lang === 'en' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/40 dark:bg-indigo-950/20' : 'text-slate-700 dark:text-slate-300'}`}
                  >
                    English
                  </button>
                </div>
              )}
            </div>

            {/* 무료로 시작하기 버튼 */}
            <button 
              onClick={handleGoToApp}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold px-3 py-2 sm:px-4.5 sm:py-2.5 rounded-lg shadow-md shadow-indigo-600/10 active:scale-95 transition-all"
            >
              {t.nav.startBtn}
            </button>
          </div>
        </div>
      </header>

      {/* ────────────────── 2. [섹션 1] 히어로 배너 (좌우 여유 공간을 최소화하여 와이드하게 화면 가득 채움) ────────────────── */}
      <section className="relative overflow-hidden pt-8 pb-12 md:pt-14 md:pb-16">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-500/10 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* 히어로 왼쪽 카피 영역 */}
            <div className="lg:col-span-7 flex flex-col items-start text-left animate-fade-in-up">
              {/* 반짝이 태그 */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100/60 dark:border-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-4 md:mb-6 font-outfit uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                AI Self-Growth Platform
              </div>
              
              {/* 타이틀: 모바일 제목 크기 26px로 컴팩트화 */}
              <h1 className="text-[26px] sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.25] mb-4 md:mb-6 font-outfit tracking-tight">
                {t.hero.mainTitle} <br />
                <span className="gradient-text-indigo">{t.hero.mainTitleHighlight}</span>
              </h1>
              
              {/* 서브 타이틀 */}
              <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 font-normal mb-6 md:mb-8 max-w-2xl leading-relaxed">
                {t.hero.subTitle}
              </p>

              {/* 버튼 */}
              <div className="w-full sm:w-auto">
                <button 
                  onClick={handleGoToApp}
                  className="group w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-7 py-4 rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 flex items-center justify-center gap-2 active:scale-95 transition-all text-base sm:text-lg"
                >
                  {t.hero.startBtn}
                </button>
              </div>
            </div>

            {/* 히어로 오른쪽 이미지 영역 */}
            <div className="lg:col-span-5 flex justify-center items-center animate-fade-in animation-delay-200 mt-6 lg:mt-0">
              <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/15 to-purple-500/15 rounded-3xl blur-2xl -z-10 scale-105"></div>
                <img 
                  src="/assets/fulmi_home_mockup.png" 
                  alt="Fulmi Mobile Application Mockup" 
                  className="w-full h-auto rounded-2xl shadow-xl border border-slate-200/10 dark:border-slate-800/10 animate-float"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ────────────────── 3. [섹션 2] 탄생 배경과 가치 (좌우 여유 공간 압축) ────────────────── */}
      <section className="py-12 md:py-16 bg-white dark:bg-slate-800/40 border-y border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          
          {/* 섹션 대제목 */}
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
              {t.background.headline}
            </h2>
            {t.background.subHeadline && (
              <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg mt-3 max-w-2xl mx-auto">
                {t.background.subHeadline}
              </p>
            )}
            <div className="w-12 h-1 bg-indigo-600 rounded-full mx-auto mt-4"></div>
          </div>

          {/* 3대 핵심 가치 카드 구성 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* 카드 1 */}
            <div className="group glass-card rounded-2xl p-6 sm:p-8 hover:-translate-y-1 hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between">
              <div>
                <div className="w-full h-60 sm:h-64 bg-white dark:bg-slate-900/60 rounded-xl p-0 mb-6 flex items-center justify-center border border-slate-200/40 dark:border-slate-800/40 overflow-hidden">
                  <img 
                     src="/assets/notion_diary.png" 
                     alt={t.background.card1Title} 
                     className="w-full h-full object-contain mix-blend-darken dark:mix-blend-normal opacity-90 scale-135 sm:scale-145 transition-transform duration-500 ease-out group-hover:scale-155" 
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {t.background.card1Title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base sm:text-lg font-normal whitespace-pre-line">
                  {t.background.card1Desc}
                </p>
              </div>
            </div>

            {/* 카드 2 */}
            <div className="group glass-card rounded-2xl p-6 sm:p-8 hover:-translate-y-1 hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between">
              <div>
                <div className="w-full h-60 sm:h-64 bg-white dark:bg-slate-900/60 rounded-xl p-0 mb-6 flex items-center justify-center border border-slate-200/40 dark:border-slate-800/40 overflow-hidden">
                  <img 
                     src="/assets/notion_people.png" 
                     alt={t.background.card2Title} 
                     className="w-full h-full object-contain mix-blend-darken dark:mix-blend-normal opacity-90 scale-135 sm:scale-145 transition-transform duration-500 ease-out group-hover:scale-155" 
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {t.background.card2Title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base sm:text-lg font-normal whitespace-pre-line">
                  {t.background.card2Desc}
                </p>
              </div>
            </div>

            {/* 카드 3 */}
            <div className="group glass-card rounded-2xl p-6 sm:p-8 hover:-translate-y-1 hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between">
              <div>
                <div className="w-full h-60 sm:h-64 bg-white dark:bg-slate-900/60 rounded-xl p-0 mb-6 flex items-center justify-center border border-slate-200/40 dark:border-slate-800/40 overflow-hidden">
                  <img 
                     src="/assets/notion_growth.png" 
                     alt={t.background.card3Title} 
                     className="w-full h-full object-contain mix-blend-darken dark:mix-blend-normal opacity-90 scale-135 sm:scale-145 transition-transform duration-500 ease-out group-hover:scale-155" 
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {t.background.card3Title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base sm:text-lg font-normal whitespace-pre-line">
                  {t.background.card3Desc}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ────────────────── 4. [섹션 3] 앱 핵심 기능 (좌우 여백을 넉넉하게 조정) ────────────────── */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10">
          
          {/* 타이틀 헤더 */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
              {t.features.headline}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">
              {t.features.subHeadline}
            </p>
          </div>

          {/* 지그재그식 3대 기능 소개 블록 */}
          <div className="space-y-12 md:space-y-16">
            
            {/* 기능 1: 트래킹 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
              <div className="lg:col-span-6 flex flex-col items-start text-left">
                <div className="w-9 h-9 rounded-lg bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-bold text-sm sm:text-base mb-3.5">
                  01
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6">
                  {t.features.feat1Title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base sm:text-lg font-normal">
                  {t.features.feat1Desc}
                </p>
              </div>
              <div className="lg:col-span-6 bg-slate-100 dark:bg-slate-800 rounded-2xl p-3 sm:p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-sm flex flex-col gap-4 sm:gap-6 mt-4 lg:mt-0">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-xs sm:text-sm">Today's State</span>
                  <span className="text-[10px] sm:text-xs text-slate-400 font-mono">Log #129</span>
                </div>
                <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3">
                    <Smile className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-500" />
                    <div className="text-left">
                      <p className="text-[10px] sm:text-xs text-slate-400 font-semibold">Emotion</p>
                      <p className="font-extrabold text-slate-800 dark:text-slate-200 text-xs sm:text-sm">기쁨 & 설렘 (Joyful)</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-50 dark:bg-green-950/30 text-green-600 text-[10px] sm:text-xs font-black rounded-full">Good</span>
                </div>
                <div className="flex flex-col gap-1.5 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm text-left">
                  <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-400 font-bold">
                    <span>Energy Status</span>
                    <span className="font-extrabold text-indigo-600">85%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 기능 2: 성찰 피드백 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
              <div className="lg:col-span-6 lg:order-2 flex flex-col items-start text-left">
                <div className="w-9 h-9 rounded-lg bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-bold text-sm sm:text-base mb-3.5">
                  02
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6">
                  {t.features.feat2Title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base sm:text-lg font-normal">
                  {t.features.feat2Desc}
                </p>
              </div>
              <div className="lg:col-span-6 lg:order-1 bg-slate-100 dark:bg-slate-800 rounded-2xl p-3 sm:p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-sm flex flex-col gap-3 text-left mt-4 lg:mt-0">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs sm:text-sm">
                  <MessageSquare className="w-4 h-4" />
                  Reality Check
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border-l-4 border-indigo-600 shadow-sm text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-semibold">
                  {lang === 'ko' ? (
                    <>
                      "매일 바쁘게 움직이고 있지만 정작 알맹이가 빠진 기분이 드는 건 당연합니다. 지금 당신은 계획을 너무 무리하게 세워놓고 정작 중요한 <strong>'선택과 집중'</strong>을 방해하고 있어요. 오늘 밤엔 내일의 To-Do 목록 중 3가지를 지워 가볍게 만드는 것부터 시작해야 무너지지 않습니다."
                    </>
                  ) : (
                    <>
                      "It's natural to feel busy yet empty inside. Right now, you are over-planning and obstructing actual <strong>'focus & selectiveness'</strong>. To avoid burning out, delete at least 3 tasks from tomorrow's list tonight and keep it light."
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* 기능 3: 자동 투두 생성 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
              <div className="lg:col-span-6 flex flex-col items-start text-left">
                <div className="w-9 h-9 rounded-lg bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-bold text-sm sm:text-base mb-3.5">
                  03
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6">
                  {t.features.feat3Title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base sm:text-lg font-normal">
                  {t.features.feat3Desc}
                </p>
              </div>
              <div className="lg:col-span-6 bg-slate-100 dark:bg-slate-800 rounded-2xl p-3 sm:p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-sm flex flex-col gap-3.5 text-left mt-4 lg:mt-0">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base">Tomorrow's Micro-Tasks</span>
                  <span className="px-2.5 py-0.5 bg-indigo-600 text-white text-xs font-bold rounded">AI Generated</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200/60 dark:border-slate-800">
                    <input type="checkbox" checked={false} readOnly className="mt-1 w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500" />
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed">
                        {lang === 'ko' ? "내일 아침 눈떴을 때 스마트폰 대신 창문 열고 1분간 깊은 호흡하기" : "Upon waking tomorrow, open the window and take a deep breath for 1 min instead of checking your phone"}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1">Based on: 어제 아침 일어날 때 극심한 무기력감을 느꼈다는 기록</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200/60 dark:border-slate-800">
                    <input type="checkbox" checked={false} readOnly className="mt-1 w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500" />
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed">
                        {lang === 'ko' ? "프로젝트 명세서 작업 시 타이머를 25분에 맞추고 초집중 후 5분 무조건 눕기" : "Set a timer for 25 mins when working on documentation, then lie down for 5 mins"}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1">Based on: 프로젝트 문서화 과정에서 집중력이 끊겨 괴로웠다는 기록</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ────────────────── 5. [인터랙티브 체험존] Live AI Trial Simulator (좌우 여유 공간 압축) ────────────────── */}
      <section className="py-12 md:py-16 bg-slate-900 dark:bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[60%] h-[60%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-indigo-400 font-bold text-xs sm:text-sm uppercase tracking-widest font-outfit">Live Simulator</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight mt-1 mb-2">
              {t.demo.headline}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
              {t.demo.subHeadline}
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-5 sm:p-8 shadow-2xl">
            
            {/* 입력 폼 */}
            <form onSubmit={handleSimulate} className="space-y-4">
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t.demo.placeholder}
                rows={3}
                disabled={isAnalyzing}
                className="w-full bg-slate-900/80 border border-slate-700/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl p-4 text-white placeholder-slate-500 focus:outline-none transition-all resize-none text-sm"
              />
              <div className="flex justify-end">
                <button 
                  type="submit"
                  disabled={isAnalyzing || !inputText.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg active:scale-95 transition-all text-sm flex items-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {t.demo.analyzingText}
                    </>
                  ) : (
                    <>
                      <Activity className="w-4 h-4" />
                      {t.demo.btnText}
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* AI 가상 연산 로딩 상태 */}
            {isAnalyzing && (
              <div className="mt-6 py-8 flex flex-col items-center justify-center gap-3">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-slate-400 text-xs animate-pulse">{t.demo.analyzingText}</p>
              </div>
            )}

            {/* 분석 결과 데이터 출력 */}
            {demoResult && !isAnalyzing && (
              <div className="mt-6 border-t border-slate-700/60 pt-6 text-left space-y-4 sm:space-y-6 animate-fade-in">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-700/40">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  <h4 className="text-base sm:text-lg font-bold text-white">{t.demo.resultTitle}</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 기분 */}
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/30 flex items-center justify-between">
                    <span className="text-slate-400 text-sm font-semibold">Today's Emotion</span>
                    <span className="font-bold text-indigo-400 text-base">{demoResult.emotion}</span>
                  </div>
                  {/* 긍정도 */}
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/30 flex items-center justify-between">
                    <span className="text-slate-400 text-sm font-semibold">{t.demo.positivity}</span>
                    <span className="font-extrabold text-indigo-400 text-base">{demoResult.positivity} / 100</span>
                  </div>
                </div>

                {/* 에너지 게이지 바 */}
                <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-700/30 space-y-2">
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-400">
                    <span>{t.demo.energy}</span>
                    <span className="text-indigo-400 font-extrabold">{demoResult.energy}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: `${demoResult.energy}%` }}></div>
                  </div>
                </div>

                {/* Reality Check 피드백 */}
                <div className="bg-indigo-950/40 p-5 rounded-xl border-l-4 border-indigo-500 space-y-2">
                  <p className="text-sm font-bold text-indigo-400 uppercase tracking-wider">{t.demo.realityCheck}</p>
                  <p className="text-slate-300 text-base leading-relaxed whitespace-pre-line font-semibold">
                    {demoResult.realityCheck}
                  </p>
                </div>

                {/* Micro Task 추천 */}
                <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-700/50 space-y-2">
                  <p className="text-sm font-bold text-indigo-400 uppercase tracking-wider">{t.demo.actionItem}</p>
                  <div className="flex items-start gap-3 mt-2">
                    <CheckSquare className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-200 text-base font-bold leading-relaxed">
                      {demoResult.todo}
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ────────────────── 6. [FAQ] 자주 묻는 질문 아코디언 (좌우 여유 공간 압축) ────────────────── */}
      <section className="py-12 md:py-16 max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2 font-outfit">
            {t.faq.headline}
          </h2>
          <div className="w-12 h-1 bg-indigo-600 rounded-full mx-auto mt-3"></div>
        </div>

        <div className="space-y-4 text-left">
          {/* FAQ 1 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 overflow-hidden transition-all duration-300">
            <button 
              onClick={() => toggleFaq(1)}
              className="w-full px-4 py-3.5 flex items-center justify-between font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 transition-colors focus:outline-none"
            >
              <span className="text-base md:text-lg font-bold tracking-tight pr-4 text-left leading-snug">{t.faq.q1}</span>
              <ChevronDown className={`w-5.5 h-5.5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${activeFaq === 1 ? 'rotate-180 text-indigo-600' : ''}`} />
            </button>
            <div className={`transition-all duration-300 overflow-hidden ${activeFaq === 1 ? 'max-h-80 border-t border-slate-100 dark:border-slate-750' : 'max-h-0'}`}>
              <div className="pt-0.5 pb-3.5 px-4 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-normal">
                {t.faq.a1}
              </div>
            </div>
          </div>

          {/* FAQ 2 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 overflow-hidden transition-all duration-300">
            <button 
              onClick={() => toggleFaq(2)}
              className="w-full px-4 py-3.5 flex items-center justify-between font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 transition-colors focus:outline-none"
            >
              <span className="text-base md:text-lg font-bold tracking-tight pr-4 text-left leading-snug">{t.faq.q2}</span>
              <ChevronDown className={`w-5.5 h-5.5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${activeFaq === 2 ? 'rotate-180 text-indigo-600' : ''}`} />
            </button>
            <div className={`transition-all duration-300 overflow-hidden ${activeFaq === 2 ? 'max-h-80 border-t border-slate-100 dark:border-slate-750' : 'max-h-0'}`}>
              <div className="pt-0.5 pb-3.5 px-4 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-normal">
                {t.faq.a2}
              </div>
            </div>
          </div>

          {/* FAQ 3 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 overflow-hidden transition-all duration-300">
            <button 
              onClick={() => toggleFaq(3)}
              className="w-full px-4 py-3.5 flex items-center justify-between font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 transition-colors focus:outline-none"
            >
              <span className="text-base md:text-lg font-bold tracking-tight pr-4 text-left leading-snug">{t.faq.q3}</span>
              <ChevronDown className={`w-5.5 h-5.5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${activeFaq === 3 ? 'rotate-180 text-indigo-600' : ''}`} />
            </button>
            <div className={`transition-all duration-300 overflow-hidden ${activeFaq === 3 ? 'max-h-80 border-t border-slate-100 dark:border-slate-750' : 'max-h-0'}`}>
              <div className="pt-0.5 pb-3.5 px-4 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-normal">
                {t.faq.a3}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── 7. [섹션 4] 하단 배너 (좌우 여유 공간 압축) ────────────────── */}
      <section className="py-12 md:py-14 bg-gradient-to-tr from-indigo-900 to-indigo-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_60%)]"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            {t.cta.mainCopy}
          </h2>
          <p className="text-indigo-200 text-base sm:text-lg font-normal max-w-xl mx-auto">
            {t.cta.subCopy}
          </p>
          <div className="pt-2 sm:pt-4">
            <button 
              onClick={handleGoToApp}
              className="bg-white hover:bg-slate-100 text-indigo-950 font-extrabold px-8 py-4 sm:px-10 sm:py-4 rounded-xl shadow-xl active:scale-95 transition-all text-sm sm:text-base"
            >
              {t.cta.startBtn}
            </button>
          </div>
        </div>
      </section>

      {/* ────────────────── 8. 사이트 풋터 (Footer - 좌우 여유 공간 압축) ────────────────── */}
      <footer className="py-12 bg-slate-950 text-slate-500 text-center border-t border-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-5">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0">
              <span className="text-white font-bold text-base">F</span>
            </div>
            <span className="text-slate-200 font-bold text-base sm:text-lg tracking-tight font-outfit">Fulmi</span>
          </div>
          <p className="max-w-lg mx-auto leading-relaxed text-slate-350 text-base sm:text-lg">
            {t.footer.desc}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-xs sm:text-sm text-slate-400 font-semibold">
            <a href="https://terms.fulmi.app" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 hover:underline transition-colors">{t.footer.terms}</a>
            <span className="text-slate-800 hidden sm:inline">|</span>
            <a href="https://privacy.fulmi.app" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 hover:underline transition-colors">{t.footer.privacy}</a>
            <span className="text-slate-800 hidden sm:inline">|</span>
            <a href="mailto:support@fulmi.app" className="hover:text-indigo-400 hover:underline transition-colors">
              {t.footer.support}: support@fulmi.app
            </a>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {t.footer.companyInfo}
          </p>

          <p className="pt-2 font-mono text-[10px] sm:text-xs text-slate-600">
            {t.footer.copyright}
          </p>
        </div>
      </footer>

    </div>
  );
}
