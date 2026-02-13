// popup.js - Main popup script

let currentMedia = [];
let currentPlatform = 'unknown';

document.addEventListener('DOMContentLoaded', async () => {
  // Get current tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (!tab) {
    showError('Cannot access current tab');
    return;
  }

  // Detect platform
  currentPlatform = detectPlatform(tab.url);
  updatePlatformBadge(currentPlatform);

  // If on supported platform, scan for media
  if (currentPlatform !== 'unknown') {
    scanForMedia(tab.id);
  } else {
    showEmptyState();
  }

  // Event listeners
  document.getElementById('refreshBtn').addEventListener('click', () => {
    scanForMedia(tab.id);
  });

  document.getElementById('downloadAllBtn').addEventListener('click', downloadAll);
});

function detectPlatform(url) {
  if (url.includes('instagram.com')) return 'instagram';
  if (url.includes('tiktok.com')) return 'tiktok';
  if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
  if (url.includes('reddit.com')) return 'reddit';
  return 'unknown';
}

function updatePlatformBadge(platform) {
  const badge = document.getElementById('platformBadge');
  const names = {
    instagram: 'Instagram',
    tiktok: 'TikTok',
    twitter: 'Twitter/X',
    reddit: 'Reddit',
    unknown: 'Unknown'
  };
  
  badge.textContent = names[platform] || platform;
  badge.className = 'platform-badge ' + platform;
}

async function scanForMedia(tabId) {
  const loading = document.getElementById('loading');
  const mediaList = document.getElementById('mediaList');
  const emptyState = document.getElementById('emptyState');
  const downloadAllBtn = document.getElementById('downloadAllBtn');

  loading.classList.remove('hidden');
  mediaList.innerHTML = '';
  emptyState.style.display = 'none';
  downloadAllBtn.disabled = true;
  currentMedia = [];

  try {
    // Execute content script
    const results = await chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: extractMedia
    });

    const media = results[0]?.result || [];
    currentMedia = media;

    loading.classList.add('hidden');

    if (media.length === 0) {
      showEmptyState();
    } else {
      renderMediaList(media);
      downloadAllBtn.disabled = false;
    }
  } catch (error) {
    console.error('Error scanning:', error);
    loading.classList.add('hidden');
    showEmptyState();
  }
}

function renderMediaList(media) {
  const mediaList = document.getElementById('mediaList');
  mediaList.innerHTML = '';

  media.forEach((item, index) => {
    const mediaItem = document.createElement('div');
    mediaItem.className = 'media-item';
    
    const typeIcon = item.type === 'video' ? '🎬' : '🖼️';
    const filename = generateFilename(item, index);
    
    mediaItem.innerHTML = `
      <div class="media-thumb" style="background: #dee2e6; display: flex; align-items: center; justify-content: center; font-size: 24px;">
        ${typeIcon}
      </div>
      <div class="media-info">
        <div class="media-type">${typeIcon} ${item.type}</div>
        <div class="media-filename">${filename}</div>
        <div class="media-size">${item.size || 'Unknown size'}</div>
      </div>
      <button class="btn-download" data-index="${index}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
        </svg>
      </button>
    `;
    
    mediaItem.querySelector('.btn-download').addEventListener('click', () => {
      downloadMedia(item, filename);
    });
    
    mediaList.appendChild(mediaItem);
  });
}

function generateFilename(item, index) {
  const timestamp = new Date().toISOString().slice(0,10);
  const platform = currentPlatform;
  const type = item.type;
  const ext = type === 'video' ? 'mp4' : 'jpg';
  return `${platform}_${type}_${timestamp}_${index + 1}.${ext}`;
}

async function downloadMedia(item, filename) {
  try {
    await chrome.downloads.download({
      url: item.url,
      filename: `social-downloader/${filename}`,
      saveAs: false
    });
  } catch (error) {
    console.error('Download error:', error);
    // Fallback: open in new tab
    chrome.tabs.create({ url: item.url });
  }
}

async function downloadAll() {
  for (let i = 0; i < currentMedia.length; i++) {
    const filename = generateFilename(currentMedia[i], i);
    await downloadMedia(currentMedia[i], filename);
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

function showEmptyState() {
  document.getElementById('emptyState').style.display = 'block';
  document.getElementById('mediaList').innerHTML = '';
}

function showError(message) {
  const mediaList = document.getElementById('mediaList');
  mediaList.innerHTML = `<div class="empty-state"><p style="color: #dc3545;">${message}</p></div>`;
}

// Content script function to extract media
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
        // Get highest quality version
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
