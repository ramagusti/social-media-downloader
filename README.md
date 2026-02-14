# 📥 SnapFetch - Social Media Downloader Chrome Extension

[![GitHub Release](https://img.shields.io/badge/Download-Latest%20Release-green)](https://github.com/ramagusti/social-media-downloader/releases)
[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Submitting-orange)](#)

> **Download images and videos from Instagram, TikTok, Twitter/X, and Reddit with one click.** Fast, free, and privacy-focused.

![SnapFetch Logo](https://github.com/ramagusti/social-media-downloader/raw/main/icons/icon128.png)

## ✨ What It Does

**SnapFetch** is a powerful Chrome extension that lets you save media from your favorite social platforms. No watermarks, no account required, no data collection - just simple, fast downloads.

### Supported Platforms

| Platform | Images | Videos | Stories |
|----------|--------|--------|---------|
| **Instagram** | ✅ Posts | ✅ Videos | ❌ |
| **TikTok** | ✅ Thumbnails | ✅ Videos | ❌ |
| **Twitter/X** | ✅ Photos | ✅ Videos | ❌ |
| **Reddit** | ✅ Posts | ✅ Videos | ❌ |

### Key Features

- 🖱️ **One-Click Downloads** - Simple, intuitive interface
- 🔍 **Auto-Detection** - Automatically finds available media
- 📁 **Smart Filenames** - Organized downloads with meaningful names
- 🖱️ **Right-Click Menu** - Quick download from context menu
- 🎨 **Modern UI** - Clean, distraction-free design
- 🔒 **Privacy First** - No data collection, no external servers
- ⚡ **Lightning Fast** - Downloads processed locally in browser

## 📥 Installation

### Option 1: Chrome Web Store (Recommended)
*Coming soon - awaiting approval*

### Option 2: Download from GitHub
1. Download the latest release: **[snapfetch-v1.0.1.zip](https://github.com/ramagusti/social-media-downloader/releases/download/v1.0.1/snapfetch-v1.0.1.zip)**
2. Extract the ZIP file
3. Open Chrome → `chrome://extensions/`
4. Enable "Developer mode" (top right)
5. Click "Load unpacked"
6. Select the extracted folder

### Option 3: Build from Source
```bash
git clone https://github.com/ramagusti/social-media-downloader.git
cd social-media-downloader
# Load folder in Chrome extensions
```

## 🚀 How to Use

1. **Navigate** to a post on Instagram, TikTok, Twitter/X, or Reddit
2. **Click** the SnapFetch icon in your browser toolbar
3. **Review** detected media
4. **Download** individual files or all at once

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Vanilla JavaScript** - No frameworks, maximum performance
| **Chrome Extension Manifest V3** - Modern extension architecture
| **Content Scripts** - Page interaction and media detection
| **Background Service Worker** - Download management
| **Injected Scripts** - Advanced media extraction

## 🎯 Why I Built This

Social media platforms make it unnecessarily difficult to save content you've created or have permission to use. Existing downloaders are often:
- ❌ Bloated with ads and trackers
- ❌ Require sketchy permissions
- ❌ Send your data to external servers
- ❌ Watermark downloads

**SnapFetch** is the opposite: lightweight, private, and respects your data.

## 🔒 Privacy & Security

- ✅ **No Data Collection** - Nothing leaves your browser
- ✅ **No External Servers** - All processing happens locally
- ✅ **Minimal Permissions** - Only asks for what's needed
- ✅ **Open Source** - Full transparency, audit the code
- ✅ **No Account Required** - Use immediately, no signup

## 📂 File Structure

```
social-media-downloader/
├── manifest.json          # Extension configuration
├── popup.html/.css/.js    # Extension popup UI
├── content.js             # Content script (page interaction)
├── background.js          # Service worker (downloads)
├── inject.js              # Advanced media extraction
├── icons/                 # Extension icons (16, 48, 128px)
├── CHROME_WEBSTORE_LISTING.md  # Store listing copy
├── MARKETING_KIT.md       # Marketing materials
└── README.md              # This file
```

## 🏆 What I Learned

- **Chrome Extension Architecture** - Manifest V3, content scripts, service workers
- **Cross-Origin Resource Handling** - Working with CORS and CSP
- **Media Extraction Techniques** - Finding hidden video sources
- **Browser Security Model** - Permissions and sandboxing
- **Extension Distribution** - Chrome Web Store submission process

## 📝 Permissions Explained

| Permission | Why It's Needed |
|------------|-----------------|
| `activeTab` | Access current page when you click the icon |
| `storage` | Save your preferences locally |
| `downloads` | Save media files to your computer |
| Host permissions | Access Instagram, TikTok, Twitter, Reddit |

## 🔮 Roadmap

- [ ] Chrome Web Store publication
- [ ] Batch download with ZIP export
- [ ] Quality selection for videos
- [ ] Download history and favorites
- [ ] Custom filename templates
- [ ] Firefox extension support

## 📝 Legal Notice

This tool is for downloading content you own or have permission to download. Respect copyright and platform Terms of Service. The developer is not responsible for misuse.

## 📄 License

MIT License - Feel free to modify and distribute.

---

**Built by Rama Gusti** | [Portfolio](https://github.com/ramagusti) | [Twitter](#)

*Part of the "Vibe-Coding Tools" collection.*

## 🙏 Support

If you find this extension useful, consider:
- ⭐ Starring the repo
- 🐛 Reporting bugs
- 💡 Suggesting features
- ☕ [Buying me a coffee](#)
