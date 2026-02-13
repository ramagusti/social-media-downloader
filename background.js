// background.js - Service worker

chrome.runtime.onInstalled.addListener(() => {
  console.log('Social Media Downloader installed');
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'download') {
    chrome.downloads.download({
      url: request.url,
      filename: `social-downloader/${request.filename}`,
      saveAs: false
    });
  }
});

// Handle context menu (optional enhancement)
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'downloadImage',
    title: 'Download with Social Downloader',
    contexts: ['image', 'video']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'downloadImage') {
    const url = info.srcUrl;
    const filename = url.split('/').pop().split('?')[0] || 'download';
    
    chrome.downloads.download({
      url: url,
      filename: `social-downloader/${filename}`,
      saveAs: false
    });
  }
});
