# Social Media Downloader

A Chrome extension to download videos and images from Instagram, TikTok, Twitter/X, and Reddit.

## Features

- 📥 Download images and videos from major social platforms
- 🔍 Auto-detect platform and available media
- 📁 Organized downloads with meaningful filenames
- 🖱️ Right-click context menu for quick downloads
- 🎨 Clean, modern UI

## Supported Platforms

- **Instagram** - Photos and videos from posts
- **TikTok** - Videos (no watermark detection)
- **Twitter/X** - Images and videos from tweets
- **Reddit** - Images and videos from posts

## Installation

### From Source (Developer Mode)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked"
5. Select the extension folder

### From GitHub

1. Download the latest release from https://github.com/ramagusti/social-media-downloader/releases
2. Extract the ZIP file
3. Follow "From Source" instructions above

### From Chrome Web Store

*Coming soon*

## Usage

1. Navigate to a post on Instagram, TikTok, Twitter/X, or Reddit
2. Click the extension icon in your browser toolbar
3. The extension will automatically detect available media
4. Click individual download buttons or "Download All"

## Development

### File Structure

```
social-media-downloader/
├── manifest.json      # Extension manifest
├── popup.html         # Popup UI
├── popup.css          # Popup styles
├── popup.js           # Popup logic
├── content.js         # Content script for page interaction
├── background.js      # Service worker
├── inject.js          # Injected script for advanced extraction
├── icons/             # Extension icons
└── README.md          # This file
```

### Building

No build step required. This is a vanilla JavaScript extension.

### Testing

1. Make changes to files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension
4. Test on supported platforms

## Permissions

- `activeTab` - Access current tab content
- `storage` - Save user preferences
- `downloads` - Download media files
- Host permissions for supported platforms

## Privacy

This extension:
- ✅ Only accesses pages when you click the extension icon
- ✅ Does not collect any personal data
- ✅ Does not send data to external servers
- ✅ All processing happens locally in your browser

## License

MIT License - Feel free to modify and distribute.

## Roadmap

- [ ] Chrome Web Store publication
- [ ] Batch download with ZIP export
- [ ] Quality selection for videos
- [ ] Download history
- [ ] Custom filename templates

## Support

If you find this extension useful, consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs via Issues
- 💡 Suggesting features

---

Built with ❤️ for content creators and social media users.
