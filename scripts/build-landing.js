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

// Remove <html>, </html>, <body>, </body>, <head>, </head> wrapper tags if any, but keep content inside <head> like <style>
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

const fileContent = `'use client';

import React, { useEffect } from 'react';

const rawHtml = ${JSON.stringify(htmlBody)};
const cleanJsCode = ${JSON.stringify(executableJs)};

export default function LandingContainer() {
  useEffect(() => {
    // Inject and execute client JS in DOM scope
    const scriptEl = document.createElement('script');
    scriptEl.innerHTML = \`(function() {
      try {
        \${cleanJsCode}

        // Hook up Next.js /api/contact API for order form
        const odSendBtn = document.getElementById('odSend');
        if (odSendBtn) {
          odSendBtn.addEventListener('click', function () {
            const name = document.getElementById('odName')?.value?.trim();
            const phone = document.getElementById('odPhone')?.value?.trim();
            const note = document.getElementById('odNote')?.value?.trim();
            if (name && phone) {
              fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, note, formType: 'order' })
              }).catch(function(e){ console.error(e); });
            }
          });
        }

        // Hook up Next.js /api/contact API for job form
        const jSendBtn = document.getElementById('jSend');
        if (jSendBtn) {
          jSendBtn.addEventListener('click', function () {
            const name = document.getElementById('jName')?.value?.trim();
            const phone = document.getElementById('jPhone')?.value?.trim();
            const posEl = document.getElementById('jPos');
            const expEl = document.getElementById('jExp');
            const position = posEl ? posEl.options[posEl.selectedIndex]?.text : '';
            const experience = expEl ? expEl.options[expEl.selectedIndex]?.text : '';
            const about = document.getElementById('jAbout')?.value?.trim();
            if (name && phone) {
              fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, position, experience, about, formType: 'career' })
              }).catch(function(e){ console.error(e); });
            }
          });
        }
      } catch (err) {
        console.error('Error initializing landing script:', err);
      }
    })();\`;

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

