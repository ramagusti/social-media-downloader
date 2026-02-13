// inject.js - Injected into page context for advanced extraction
// This runs in the page context to access JavaScript variables

(function() {
  'use strict';
  
  // Listen for messages from content script
  window.addEventListener('message', (event) => {
    if (event.source !== window) return;
    if (event.data.type && event.data.type === 'SOCIAL_DOWNLOADER_REQUEST') {
      // Handle extraction requests
      const data = extractFromPage();
      window.postMessage({
        type: 'SOCIAL_DOWNLOADER_RESPONSE',
        data: data
      }, '*');
    }
  });

  function extractFromPage() {
    const media = [];
    
    // Try to find video sources in various formats
    document.querySelectorAll('video').forEach(video => {
      if (video.src) {
        media.push({ type: 'video', url: video.src });
      }
      // Check source elements
      video.querySelectorAll('source').forEach(source => {
        if (source.src) {
          media.push({ type: 'video', url: source.src });
        }
      });
    });
    
    // Find all images
    document.querySelectorAll('img').forEach(img => {
      if (img.src && img.naturalWidth > 200) {
        media.push({ 
          type: 'image', 
          url: img.src,
          width: img.naturalWidth,
          height: img.naturalHeight
        });
      }
    });
    
    return media;
  }
})();
