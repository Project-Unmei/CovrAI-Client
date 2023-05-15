# CoverLetterGeneration
Chromium extension for generating keywords for cover letter from waterloo works. Scans website for important topics, and outputs a json of important keywords.

json generation is handled in content.js, everything conteng.js runs on the browser whenever a waterloo works website loads. popup.js runs on the extension popup when clicking on extension icon. background.js is always running in the browser background.