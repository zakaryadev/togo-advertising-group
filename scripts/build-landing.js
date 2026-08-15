const fs = require('fs');
const path = require('path');

const htmlContent = fs.readFileSync('public/index.html', 'utf8');

// Find style end
const styleEnd = htmlContent.indexOf('</style>') + 8;

// Find script tags
const scriptRegex = /<script([\s\S]*?)>([\s\S]*?)<\/script>/gi;

let firstExecScriptIndex = -1;
let lastExecScriptEndIndex = -1;
let executableJs = '';

let match;
while ((match = scriptRegex.exec(htmlContent)) !== null) {
  const attrs = match[1];
  const body = match[2];

  // If it's not JSON-LD and not an external src script, it's our client JS logic
  if (!attrs.includes('application/ld+json') && !attrs.includes('src=')) {
    if (firstExecScriptIndex === -1) {
      firstExecScriptIndex = match.index;
    }
    lastExecScriptEndIndex = match.index + match[0].length;
    executableJs += '\n;\n' + body;
  }
}

// HTML body is everything between styleEnd and firstExecScriptIndex, plus anything after lastExecScriptEndIndex
const htmlBefore = htmlContent.slice(styleEnd, firstExecScriptIndex).trim();
const htmlAfter = htmlContent.slice(lastExecScriptEndIndex).replace(/<\/body>|<\/html>/gi, '').trim();

const fullHtmlBody = htmlBefore + '\n' + htmlAfter;

console.log('HTML body length:', fullHtmlBody.length);
console.log('Executable JS length:', executableJs.length);

const fileContent = `'use client';

import React, { useEffect } from 'react';

const rawHtml = ${JSON.stringify(fullHtmlBody)};
const cleanJsCode = ${JSON.stringify(executableJs)};

export default function LandingContainer() {
  useEffect(() => {
    try {
      // Execute original index.html script logic
      const scriptFn = new Function(cleanJsCode);
      scriptFn();

      // Hook up Next.js /api/contact API for order form
      const odSendBtn = document.getElementById('odSend');
      if (odSendBtn) {
        odSendBtn.addEventListener('click', function () {
          const name = (document.getElementById('odName') as HTMLInputElement)?.value?.trim();
          const phone = (document.getElementById('odPhone') as HTMLInputElement)?.value?.trim();
          const note = (document.getElementById('odNote') as HTMLTextAreaElement)?.value?.trim();
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
          const name = (document.getElementById('jName') as HTMLInputElement)?.value?.trim();
          const phone = (document.getElementById('jPhone') as HTMLInputElement)?.value?.trim();
          const posEl = document.getElementById('jPos') as HTMLSelectElement;
          const expEl = document.getElementById('jExp') as HTMLSelectElement;
          const position = posEl ? posEl.options[posEl.selectedIndex]?.text : '';
          const experience = expEl ? expEl.options[expEl.selectedIndex]?.text : '';
          const about = (document.getElementById('jAbout') as HTMLTextAreaElement)?.value?.trim();
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
