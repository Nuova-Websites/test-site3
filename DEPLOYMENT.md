# 🚀 Deployment Guide for Smeagles Website

This guide will help you deploy the Smeagles dog sitting website to production.

## Pre-Deployment Checklist

### Required Updates
- [ ] **Replace Images**: Add actual dog photos to replace emoji placeholders
- [ ] **Update Contact Info**: 
  - Phone number (currently placeholder: 555-364-2273)
  - Email address (currently: hello@smeagles.com)
  - Physical address/service area
- [ ] **Generate Favicons**:
  - favicon.png (32x32)
  - icon-192.png (192x192)
  - icon-512.png (512x512)
- [ ] **Update Domain**: Replace `www.smeagles.com` in:
  - sitemap.xml
  - robots.txt
  - manifest.json
  - .htaccess
- [ ] **Configure Contact Form**: Set up backend or third-party service
- [ ] **Add Analytics**: Insert tracking code if desired
- [ ] **Review Content**: Proofread all text, pricing, and services

### Optional Enhancements
- [ ] Add actual customer testimonials with photos
- [ ] Include real dog images in gallery
- [ ] Set up online booking system
- [ ] Configure email notifications
- [ ] Add live chat widget

## Deployment Options

### Option 1: Netlify (Recommended for Beginners)

**Pros**: Free tier, automatic HTTPS, form handling, easy deployment  
**Steps**:

1. **Sign up** at https://netlify.com
2. **Drag and drop** your project folder to Netlify dashboard
3. **Configure form** (if using Netlify Forms):
   ```html
   <!-- Add to form tag in index.html -->
   <form name="contact" method="POST" data-netlify="true">
   ```
4. **Custom Domain**: Follow Netlify's DNS instructions
5. **Deploy**: Automatic deployment on file changes

**Environment Variables** (if needed):
```
# In Netlify dashboard > Site settings > Environment variables
CONTACT_EMAIL=hello@smeagles.com
```

### Option 2: Vercel

**Pros**: Fast edge network, great performance, GitHub integration  
**Steps**:

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in project directory
3. Follow prompts to deploy
4. Configure custom domain in dashboard

### Option 3: GitHub Pages

**Pros**: Free, simple, version controlled  
**Steps**:

1. Create repository on GitHub
2. Push code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/USERNAME/smeagles.git
   git push -u origin main
   ```
3. Enable GitHub Pages in repository settings
4. Select branch: `main`, folder: `/ (root)`
5. Access at: `https://USERNAME.github.io/smeagles/`

### Option 4: Traditional Web Hosting (cPanel, FTP)

**Pros**: Full control, traditional setup  
**Steps**:

1. **Purchase hosting** (HostGator, Bluehost, SiteGround, etc.)
2. **Upload files** via FTP:
   - Use FileZilla or similar FTP client
   - Connect to your hosting account
   - Upload all files to `public_html` or `www` directory
3. **Verify .htaccess**:
   - Ensure .htaccess is uploaded (may be hidden file)
   - Check that mod_rewrite is enabled on server
4. **Set permissions**:
   - Files: 644
   - Directories: 755
5. **Test**: Visit your domain

## Contact Form Backend Setup

### Option A: Formspree (Easiest)

1. Sign up at https://formspree.io
2. Create a new form
3. Update form in index.html:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Update field names to match Formspree requirements

### Option B: EmailJS

1. Sign up at https://emailjs.com
2. Set up email service and template
3. Update script.js:
   ```javascript
   async function simulateFormSubmission(data) {
       return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', data);
   }
   ```

### Option C: Custom Backend

Create a simple Node.js backend:

```javascript
// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, dogName, service, message } = req.body;
  
  // Configure email transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
  // Send email
  await transporter.sendMail({
    from: email,
    to: 'hello@smeagles.com',
    subject: `New Contact from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Dog Name:</strong> ${dogName}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Message:</strong> ${message}</p>
    `
  });
  
  res.json({ success: true });
});

app.listen(3000);
```

## SSL/HTTPS Setup

### Automatic SSL (Recommended)
- **Netlify/Vercel**: Automatic Let's Encrypt SSL
- **Cloudflare**: Free SSL with CDN benefits

### Manual SSL Setup
1. Purchase SSL certificate or use Let's Encrypt (free)
2. Install on hosting control panel
3. Force HTTPS (already configured in .htaccess)

## Performance Optimization

### Image Optimization
```bash
# Install tools
npm install -g imagemin-cli

# Optimize images
imagemin images/* --out-dir=images/optimized
```

### Recommended Image Sizes
- **Hero Image**: 1920x1080px, < 200KB
- **Service Icons**: 300x300px, < 50KB
- **Gallery Images**: 800x800px, < 150KB each
- **Favicon**: 32x32px, < 10KB
- **PWA Icons**: 192x192px and 512x512px

### Enable Service Worker
Uncomment in script.js:
```javascript
navigator.serviceWorker.register('/service-worker.js')
  .then(registration => console.log('SW registered'))
  .catch(error => console.log('SW registration failed'));
```

## DNS Configuration

### Example DNS Settings
```
Type    Name    Value                   TTL
A       @       192.168.1.1            3600
CNAME   www     yourdomain.com         3600
```

### For Netlify/Vercel
Follow their custom domain setup wizard in the dashboard.

## Monitoring & Analytics

### Google Analytics
1. Create GA4 property
2. Add tracking code before `</head>`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

### Alternative: Plausible Analytics
Privacy-friendly alternative to Google Analytics.

## Testing After Deployment

### Automated Testing
- **Google Lighthouse**: Performance, SEO, Accessibility audit
- **GTmetrix**: Page speed analysis
- **WebPageTest**: Detailed performance metrics

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Contact form submits successfully
- [ ] Mobile responsive on real devices
- [ ] All links work (no 404s)
- [ ] Images load properly
- [ ] SSL certificate is active (https://)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Form validation works
- [ ] Navigation menu functions on mobile
- [ ] Analytics tracking works

### Tools
- **Mobile Testing**: BrowserStack, Google Mobile-Friendly Test
- **Link Checker**: Dead Link Checker
- **SEO Audit**: Ahrefs, SEMrush, Google Search Console

## Ongoing Maintenance

### Regular Tasks
- **Weekly**: Check form submissions, respond to inquiries
- **Monthly**: Update content, check analytics, fix broken links
- **Quarterly**: Update testimonials, refresh gallery images
- **Annually**: Review pricing, update copyright year, security audit

### Backup Strategy
- Daily automated backups (most hosts provide this)
- Keep local copy of all files
- Version control with Git

### Security Updates
- Monitor security.txt for vulnerability reports
- Keep plugins/dependencies updated (if using any)
- Regular SSL certificate renewal (usually automatic)

## Troubleshooting

### Common Issues

**Forms not working**:
- Check backend API endpoint
- Verify CORS settings
- Check browser console for errors

**.htaccess not working**:
- Ensure mod_rewrite is enabled
- Check file permissions (644)
- Verify AllowOverride is set in Apache config

**Images not loading**:
- Verify file paths are correct
- Check file permissions
- Ensure images are uploaded

**Mobile menu not working**:
- Clear browser cache
- Check JavaScript console for errors
- Verify script.js is loading

## Support Resources

- **Web Hosting**: Contact your hosting provider's support
- **Netlify**: https://docs.netlify.com
- **Vercel**: https://vercel.com/docs
- **General**: Stack Overflow, MDN Web Docs

## Post-Deployment

### Register with Search Engines
1. **Google Search Console**: https://search.google.com/search-console
2. **Bing Webmaster Tools**: https://www.bing.com/webmasters
3. Submit sitemap.xml to both

### Social Media
- Update business profiles with new website URL
- Create Open Graph images (1200x630px)
- Share launch announcement

### Local SEO
- Google Business Profile
- Yelp for Business
- Local directory listings

---

**Need Help?** Contact a web developer or reach out to your hosting provider's support team.

**Estimated Deployment Time**: 1-2 hours (with experience), 3-5 hours (first time)

Good luck with your launch! 🚀🐕

