# GitHub Pages Deployment Guide for Pures International Website

## 🚀 Complete Guide to Deploy on GitHub Pages

Your project is already connected to GitHub repository: `het875/pures-int-new`. This guide will help you deploy it to GitHub Pages for free hosting.

## 📋 Prerequisites

- ✅ GitHub repository (already set up: `het875/pures-int-new`)
- ✅ Git configured locally
- ✅ Project files ready for deployment

## 🔧 What I've Prepared for You

1. **GitHub Actions Workflow** (`.github/workflows/deploy-pages.yml`)
   - Automatic deployment on every push to `main` branch
   - Copies files from `new/` directory to root level for GitHub Pages
   - Handles robots.txt and sitemap.xml properly

## 🎯 Step-by-Step Deployment Instructions

### Step 1: Enable GitHub Pages

1. **Go to your GitHub repository**:
   - Navigate to: https://github.com/het875/pures-int-new

2. **Access Repository Settings**:
   - Click on "Settings" tab in your repository
   - Scroll down to "Pages" section in the left sidebar

3. **Configure GitHub Pages**:
   - **Source**: Select "GitHub Actions" (not "Deploy from a branch")
   - This will allow our custom workflow to handle the deployment

### Step 2: Push the GitHub Actions Workflow

Run these commands in your project directory:

```powershell
# Add the new GitHub Actions workflow
git add .github/workflows/deploy-pages.yml

# Commit the changes
git commit -m "Add GitHub Actions workflow for Pages deployment"

# Push to GitHub
git push origin main
```

### Step 3: Monitor the Deployment

1. **Check Actions Tab**:
   - Go to your repository on GitHub
   - Click "Actions" tab
   - You should see "Deploy to GitHub Pages" workflow running

2. **Wait for Completion**:
   - The workflow will take 2-3 minutes to complete
   - Green checkmark = successful deployment
   - Red X = failed deployment (check logs)

### Step 4: Access Your Live Website

Once deployment is complete:
- Your website will be available at: **https://het875.github.io/pures-int-new/**
- It may take 5-10 minutes for the first deployment to be accessible

## 🔄 Automatic Updates

After initial setup:
- ✅ Every push to `main` branch automatically deploys
- ✅ Pull requests create preview deployments
- ✅ No manual intervention needed

## 🛠️ Manual Deployment (Alternative Method)

If you prefer manual deployment without GitHub Actions:

### Option 1: Using GitHub's Built-in Pages

1. **Create gh-pages branch**:
   ```powershell
   # Create and switch to gh-pages branch
   git checkout -b gh-pages
   
   # Copy files from new/ to root
   Copy-Item -Path "new\*" -Destination "." -Recurse -Force
   
   # Add and commit
   git add .
   git commit -m "Deploy to GitHub Pages"
   
   # Push gh-pages branch
   git push origin gh-pages
   
   # Switch back to main
   git checkout main
   ```

2. **Configure Pages Source**:
   - In repository Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: "gh-pages"
   - Folder: "/ (root)"

### Option 2: Using npm gh-pages package

1. **Install gh-pages**:
   ```powershell
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**:
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d new"
     }
   }
   ```

3. **Deploy**:
   ```powershell
   npm run deploy
   ```

## 🌐 Custom Domain Setup (Optional)

To use your own domain (e.g., puresinternational.com):

1. **Add CNAME file**:
   ```powershell
   echo "puresinternational.com" > new/CNAME
   git add new/CNAME
   git commit -m "Add custom domain"
   git push origin main
   ```

2. **Configure DNS**:
   - Add CNAME record: `www` → `het875.github.io`
   - Add A records for apex domain:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

3. **Enable in GitHub**:
   - Settings → Pages → Custom domain
   - Enter your domain and save
   - Enable "Enforce HTTPS"

## 📊 Monitoring and Analytics

### GitHub Insights
- Repository → Insights → Traffic
- View visitor statistics and popular pages

### Add Google Analytics (Recommended)
1. Create Google Analytics account
2. Add tracking code to all HTML files in `<head>` section:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

## 🔍 Troubleshooting

### Common Issues:

1. **404 Page Not Found**:
   - Check if files are in correct location
   - Verify GitHub Pages is enabled
   - Wait 5-10 minutes after deployment

2. **Images Not Loading**:
   - Ensure image paths are relative (not absolute)
   - Check case sensitivity (GitHub Pages is case-sensitive)

3. **CSS/JS Not Loading**:
   - Verify file paths in HTML
   - Check for mixed content issues (HTTP vs HTTPS)

4. **Workflow Fails**:
   - Check Actions tab for error logs
   - Verify permissions are set correctly
   - Ensure `new/` directory exists

### Debug Commands:
```powershell
# Check current branch
git branch

# Check remote repository
git remote -v

# Check recent commits
git log --oneline -5

# Force push (use carefully)
git push origin main --force
```

## 📈 SEO Optimization for GitHub Pages

1. **Update robots.txt** (if needed):
   ```
   User-agent: *
   Allow: /
   Sitemap: https://het875.github.io/pures-int-new/sitemap.xml
   ```

2. **Update sitemap.xml** with GitHub Pages URL
3. **Submit to Google Search Console**
4. **Add structured data markup**

## 🔐 Security Best Practices

- ✅ HTTPS enforced automatically
- ✅ Security headers configured
- ✅ No sensitive data in repository
- ✅ Regular dependency updates

## 📞 Support

- **GitHub Pages Documentation**: https://docs.github.com/en/pages
- **GitHub Actions Documentation**: https://docs.github.com/en/actions
- **Community Support**: https://github.community

## 🎉 Next Steps After Deployment

1. **Test thoroughly**: Check all pages and functionality
2. **Set up monitoring**: Add analytics and error tracking
3. **Optimize performance**: Compress images, minify CSS/JS
4. **SEO setup**: Submit sitemap to search engines
5. **Backup strategy**: Keep local backups of important files

Your Pures International website will be live at:
**https://het875.github.io/pures-int-new/**

Happy deploying! 🚀