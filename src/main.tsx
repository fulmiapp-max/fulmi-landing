import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// 카카오톡 인앱 브라우저 강제 탈출 (아웃링크 - Chrome 우선, 미설치 시 Safari 폴백)
const userAgent = navigator.userAgent.toLowerCase();
const isKakao = userAgent.indexOf('kakaotalk') > -1;

if (isKakao) {
  const rawUrl = window.location.href.replace(/https?:\/\//i, '');
  if (userAgent.indexOf('android') > -1) {
    // 안드로이드: 크롬 브라우저 패키지로 강제 실행
    window.location.href = `intent://${rawUrl}#Intent;scheme=https;package=com.android.chrome;end`;
  } else if (/iphone|ipad|ipod/i.test(userAgent)) {
    // iOS: 크롬 실행 1순위 시도 후, 반응이 없으면(크롬 미설치) 사파리로 전환
    const chromeUrl = `googlechromes://${rawUrl}`;
    const safariUrl = `kakaotalk://web/openExternalApp?url=${encodeURIComponent(window.location.href)}`;
    
    window.location.href = chromeUrl;
    
    const start = Date.now();
    setTimeout(() => {
      // 1.5초 이내에 포커스가 이동하여 브라우저 이탈이 되지 않았다면 (크롬 앱 없음) 사파리로 실행
      if (Date.now() - start < 2000) {
        window.location.href = safariUrl;
      }
    }, 1500);
  }
}

// 접속 브라우저/단말기 언어 설정에 따른 탭 타이틀 다국어 처리
const TITLES: Record<string, string> = {
  ko: 'Fulmi - 기록을 통해 나를 성찰하며, 내일을 채운다',
  en: 'Fulmi - Reflect on your day, fill your tomorrow',
  ja: 'Fulmi - 記録を通じて自分を省み、明日を満たす',
};

const userLang = (navigator.language || (navigator as any).userLanguage || 'ko').toLowerCase();
const matchedLang = Object.keys(TITLES).find((lang) => userLang.startsWith(lang)) || 'en';

document.title = TITLES[matchedLang];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
