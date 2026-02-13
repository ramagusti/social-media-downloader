// content.js - Content script injected into pages

console.log('Social Media Downloader: Content script loaded');

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scan') {
    const media = extractMedia();
    sendResponse({ media });
  }
});

function extractMedia() {
  const media = [];
  const hostname = window.location.hostname;
  
  // Instagram
  if (hostname.includes('instagram.com')) {
    // Images
    document.querySelectorAll('img[srcset], article img').forEach(img => {
      if (img.src && !img.src.includes('profile') && img.naturalWidth > 300) {
        media.push({
          type: 'image',
          url: img.src,
          size: `${img.naturalWidth}x${img.naturalHeight}`
        });
      }
    });
    
    // Videos
    document.querySelectorAll('video').forEach(video => {
      if (video.src) {
        media.push({
          type: 'video',
          url: video.src,
          size: 'Video'
        });
      }
    });
  }
  
  // TikTok
  if (hostname.includes('tiktok.com')) {
    document.querySelectorAll('video').forEach(video => {
      if (video.src) {
        media.push({
          type: 'video',
          url: video.src,
          size: 'Video'
        });
      }
    });
  }
  
  // Twitter/X
  if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
    document.querySelectorAll('img[src*="media"]').forEach(img => {
      if (img.src && img.naturalWidth > 200) {
        const highResUrl = img.src.replace('&name=small', '&name=large').replace('&name=medium', '&name=large');
        media.push({
          type: 'image',
          url: highResUrl,
          size: `${img.naturalWidth}x${img.naturalHeight}`
        });
      }
    });
    
    document.querySelectorAll('video').forEach(video => {
      if (video.src) {
        media.push({
          type: 'video',
          url: video.src,
          size: 'Video'
        });
      }
    });
  }
  
  // Reddit
  if (hostname.includes('reddit.com')) {
    document.querySelectorAll('img[src*="preview"], img[src*="i.redd.it"]').forEach(img => {
      if (img.src) {
        media.push({
          type: 'image',
          url: img.src,
          size: `${img.naturalWidth || 'Unknown'}x${img.naturalHeight || 'Unknown'}`
        });
      }
    });
    
    document.querySelectorAll('video').forEach(video => {
      if (video.src) {
        media.push({
          type: 'video',
          url: video.src,
          size: 'Video'
        });
      }
    });
  }
  
  // Remove duplicates
  const uniqueUrls = new Set();
  return media.filter(item => {
    if (uniqueUrls.has(item.url)) return false;
    uniqueUrls.add(item.url);
    return true;
  });
}
