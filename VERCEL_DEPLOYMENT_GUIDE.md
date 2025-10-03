# Vercel Deployment Guide for Pures International Website

## Prerequisites

1. **Git Repository**: Ensure your project is in a Git repository
2. **Vercel Account**: Create a free account at [vercel.com](https://vercel.com)
3. **GitHub Account**: Connect your GitHub account to Vercel

## Project Structure

Your project is now configured for Vercel deployment with:
- ✅ `vercel.json` - Deployment configuration
- ✅ `package.json` - Project metadata
- ✅ `.gitignore` - Excludes unnecessary files
- ✅ Static files in `new/` directory

## Deployment Methods

### Method 1: Deploy via GitHub (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the configuration

3. **Configure Project**:
   - Project Name: `pures-international-website`
   - Framework Preset: `Other`
   - Root Directory: `./` (keep default)
   - Build Command: Leave empty (static site)
   - Output Directory: `new`
   - Install Command: Leave empty

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be available at `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   - Follow the prompts
   - Select "No" for linking to existing project (first time)
   - Accept suggested project name
   - Accept suggested settings

4. **Production Deployment**:
   ```bash
   vercel --prod
   ```

## Custom Domain Setup

1. **In Vercel Dashboard**:
   - Go to your project settings
   - Click "Domains"
   - Add your custom domain (e.g., `puresinternational.com`)

2. **DNS Configuration**:
   - Add CNAME record: `www` → `your-project.vercel.app`
   - Add A record: `@` → `76.76.19.61` (Vercel's IP)

## Environment Variables (if needed)

If you need environment variables:
1. Go to Project Settings → Environment Variables
2. Add variables for different environments (Development, Preview, Production)

## Performance Optimizations

Your `vercel.json` includes:
- ✅ Static file caching (1 year for images, CSS, JS)
- ✅ Security headers
- ✅ Clean URL rewrites
- ✅ Proper redirects

## Automatic Deployments

Once connected to GitHub:
- ✅ Auto-deploy on every push to main branch
- ✅ Preview deployments for pull requests
- ✅ Rollback capabilities

## Monitoring

Access deployment logs and analytics:
1. Vercel Dashboard → Your Project
2. View "Functions" tab for any serverless functions
3. Check "Analytics" for performance metrics

## Troubleshooting

### Common Issues:

1. **404 Errors**: Check that paths in `vercel.json` match your file structure
2. **Images not loading**: Verify image paths are relative and correct
3. **CSS/JS not loading**: Check file paths in HTML files

### Support:
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

## Next Steps After Deployment

1. **Test all pages**: Verify all navigation works
2. **Check mobile responsiveness**: Test on various devices
3. **Verify contact forms**: Ensure forms work properly
4. **Set up analytics**: Add Google Analytics if needed
5. **Configure SEO**: Update meta tags for production domain

Your Pures International website is now ready for deployment! 🚀