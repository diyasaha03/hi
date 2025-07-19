# Patterns - Modern Blog Website

A beautiful, colorful blog website built with HTML, CSS, and JavaScript featuring a pink/lavender theme.

## Features

- **Colorful Design**: Light pink and lavender color scheme with beautiful gradients
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Navigation**: Smooth page transitions and navigation
- **Search Functionality**: Real-time search through blog posts
- **Contact Form**: Working contact form with validation
- **Modern UI**: Clean, professional design with hover effects and animations

## Files Structure

```
standalone-website/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## Pages Included

1. **Home** - Featured blog posts and popular content
2. **Blog** - All blog posts with sidebar
3. **Stories** - Featured stories and experiences
4. **Portfolio** - Project showcase (template ready)
5. **About** - Personal information about Diya Saha
6. **Contact** - Contact form and information

## Personal Information

This website showcases:
- **Name**: Diya Saha
- **Title**: Web Developer & BCA Graduate
- **Location**: Siliguri, West Bengal, India
- **Email**: diyasaha.11slg@gmail.com
- **Phone**: +91 7601957630
- **Education**: BCA from Siliguri Institute of Technology under MAKAUT

## Skills Featured

- HTML, CSS, JavaScript
- Python, PHP, C
- Tailwind CSS
- VS Code, Replit
- Responsive Design
- GitHub
- UI/UX Fundamentals

## How to Use

1. **Simple Setup**: Just open `index.html` in any modern web browser
2. **No Build Process**: Pure HTML/CSS/JS - no compilation needed
3. **Easy Customization**: Edit the files directly to customize content
4. **Add Content**: Modify the `blogPosts` array in `script.js` to add your own posts

## Customization

### Adding Blog Posts
Edit the `blogPosts` array in `script.js`:

```javascript
const blogPosts = [
    {
        id: 7,
        title: "Your New Post Title",
        excerpt: "Brief description of your post...",
        imageUrl: "https://your-image-url.com",
        category: "Your Category",
        author: "Your Name",
        publishDate: "Jan 15, 2025",
        readTime: "5 min read",
        featured: true,
        views: 100
    }
    // Add more posts...
];
```

### Changing Colors
Modify the CSS variables in `styles.css`:

```css
:root {
    --accent-pink: hsl(320, 80%, 60%);
    --accent-lavender: hsl(280, 70%, 70%);
    --accent-blue: hsl(220, 75%, 60%);
    /* Modify other colors as needed */
}
```

### Updating Personal Information
1. Edit the About page section in `index.html`
2. Update contact details in the Contact page
3. Modify the `pageConfig` object in `script.js` for page titles

## Dependencies

- **Lucide Icons**: Used for all icons (loaded via CDN)
- **No Framework**: Pure vanilla JavaScript for maximum compatibility

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes

## Performance Features

- Lazy loading images
- Optimized CSS with minimal dependencies
- Efficient JavaScript with event delegation
- Smooth animations and transitions

## SEO Ready

- Proper HTML structure with semantic elements
- Meta tags for social media sharing
- Descriptive alt texts for images
- Clean URLs and navigation structure

## Contact & Support

For questions or customization help, contact:
- **Email**: diyasaha.11slg@gmail.com
- **Phone**: +91 7601957630

---

**Built with ❤️ by Diya Saha**
*Web Developer & BCA Graduate from Siliguri, West Bengal, India*
