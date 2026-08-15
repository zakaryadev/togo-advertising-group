const fs = require('fs');
const path = require('path');

const targetHtmlFile = fs.existsSync('togogroup-sayt_8.html') ? 'togogroup-sayt_8.html' : 'public/index.html';
console.log('Building landing page from:', targetHtmlFile);

let htmlContent = fs.readFileSync(targetHtmlFile, 'utf8');

// Copy target html to public/index.html for consistency
fs.writeFileSync('public/index.html', htmlContent, 'utf8');

// Extract all client JS scripts
let executableJs = '';
let htmlBody = htmlContent.replace(/<script([\s\S]*?)>([\s\S]*?)<\/script>/gi, (match, attrs, body) => {
  if (!attrs.includes('application/ld+json') && !attrs.includes('src=')) {
    executableJs += '\n;\n' + body;
    return ''; // Remove script from HTML
  }
  return match; // Keep ld+json and external src scripts
});

// Patch theme logic to persist preference in localStorage
executableJs = executableJs.replace(
  /function setTheme\(m\)\{[\s\S]*?\}/,
  `function setTheme(m){
  if(m==='light') {
    root.setAttribute('data-theme','light');
    try { localStorage.setItem('togo_theme','light'); } catch(e){}
  } else {
    root.removeAttribute('data-theme');
    try { localStorage.setItem('togo_theme','dark'); } catch(e){}
  }
  if(mtheme) mtheme.setAttribute('content', m==='light' ? '#2563EB' : '#FFC61A');
  if(window.__fxTheme) window.__fxTheme();
}`
);
// Remove legacy window.open calls that open Telegram links directly in the browser
executableJs = executableJs.replace(/window\.open\([^)]*\);?/g, '// window.open disabled');

// Update modal labels in I18N
executableJs = executableJs.replace(
  '"ordSend": {"uz": "Telegram orqali yuborish"',
  '"ordSend": {"uz": "Ariza yuborish"'
);
executableJs = executableJs.replace(
  '"ordHint": {"uz": "Tugma bosilganda Telegram ochiladi, xabar tayyor turadi - faqat yuborishni bosasiz."',
  '"ordHint": {"uz": "Arizangiz to\'g\'ridan-to\'g\'ri menejerlarga yuboriladi."'
);

// Append API hooks directly into executableJs (at build time, not at runtime via template)
executableJs += `
;
// Hook up Next.js /api/contact API for order form
(function(){
  var odSendBtn = document.getElementById('odSend');
  if (odSendBtn) {
    odSendBtn.addEventListener('click', function (e) {
      var nameEl = document.getElementById('odName');
      var phoneEl = document.getElementById('odPhone');
      var noteEl = document.getElementById('odNote');
      var name = nameEl ? nameEl.value.trim() : '';
      var phone = phoneEl ? phoneEl.value.trim() : '';
      var note = noteEl ? noteEl.value.trim() : '';
      if (!name || !phone) {
        return; // Validation handled by original script
      }
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, phone: phone, note: note, formType: 'order' })
      }).then(function(res){
        if (res.ok) {
          var od = document.getElementById('od');
          if (od) od.hidden = true;
          document.body.classList.remove('modal');
          if (nameEl) nameEl.value = '';
          if (phoneEl) phoneEl.value = '';
          if (noteEl) noteEl.value = '';
        }
      }).catch(function(e){ console.error(e); });
    });
  }
  // Hook up Next.js /api/contact API for job form
  var jSendBtn = document.getElementById('jSend');
  if (jSendBtn) {
    jSendBtn.addEventListener('click', function () {
      var nameEl = document.getElementById('jName');
      var phoneEl = document.getElementById('jPhone');
      var name = nameEl ? nameEl.value.trim() : '';
      var phone = phoneEl ? phoneEl.value.trim() : '';
      var posEl = document.getElementById('jPos');
      var expEl = document.getElementById('jExp');
      var position = posEl ? posEl.options[posEl.selectedIndex].text : '';
      var experience = expEl ? expEl.options[expEl.selectedIndex].text : '';
      var aboutEl = document.getElementById('jAbout');
      var about = aboutEl ? aboutEl.value.trim() : '';
      if (!name || !phone) {
        return;
      }
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, phone: phone, position: position, experience: experience, about: about, formType: 'career' })
      }).then(function(res){
        if (res.ok) {
          if (nameEl) nameEl.value = '';
          if (phoneEl) phoneEl.value = '';
          if (aboutEl) aboutEl.value = '';
        }
      }).catch(function(e){ console.error(e); });
    });
  }
})();
`;

// Remove <html>, </html>, <body>, </body>, <head>, </head> wrapper tags
htmlBody = htmlBody
  .replace(/<!DOCTYPE[^>]*>/gi, '')
  .replace(/<html[^>]*>/gi, '')
  .replace(/<\/html>/gi, '')
  .replace(/<head[^>]*>/gi, '')
  .replace(/<\/head>/gi, '')
  .replace(/<body[^>]*>/gi, '')
  .replace(/<\/body>/gi, '')
  .trim();

console.log('HTML content length:', htmlBody.length);
console.log('Executable JS length:', executableJs.length);

// Generate the component — use textContent (not innerHTML with template literal)
// so backticks inside the JS code don't cause syntax errors
const fileContent = `'use client';

import React, { useEffect } from 'react';

const rawHtml = ${JSON.stringify(htmlBody)};
const cleanJsCode = ${JSON.stringify(executableJs)};

export default function LandingContainer() {
  useEffect(() => {
    const scriptEl = document.createElement('script');
    scriptEl.textContent = '(function(){if(window.__togoLandingInit)return;window.__togoLandingInit=true;' + cleanJsCode + '})();';
    document.body.appendChild(scriptEl);

    return () => {
      if (document.body.contains(scriptEl)) {
        document.body.removeChild(scriptEl);
      }
    };
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: rawHtml }}
      style={{ width: '100%', minHeight: '100vh' }}
    />
  );
}
`;

fs.writeFileSync('components/landing-container.tsx', fileContent, 'utf8');
console.log('Successfully generated components/landing-container.tsx!');
