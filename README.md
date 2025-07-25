# 🛒 E-commerce Monorepo

Modern, full-stack e-commerce platform built with **NestJS**, **React.js**, and **Prisma**.

## 🚀 Tech Stack

- **Backend**: NestJS + Prisma + PostgreSQL
- **Frontend**: React.js 19
- **Authentication**: NextAuth.js with social providers
- **Payments**: Stripe integration
- **Deployment**: Docker + Traefik (Self-hosted)

## 📊 Features

- ✅ **Comprehensive Database Schema** (13 tables)
- ✅ **Product Catalog** with variants and attributes
- ✅ **Shopping Cart** with guest support
- ✅ **Order Management** with tracking
- ✅ **SEO Optimized** with slugs and meta tags
- ✅ **Analytics Ready** with session tracking
- ⏳ **Payment Processing** (Stripe/PayPal)
- ⏳ **Admin Dashboard** 
- ⏳ **Mobile Responsive** frontend

## 🏃‍♂️ Quick Start

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/monorepo-ecom.git
cd monorepo-ecom

# Install dependencies
pnpm install

# Generate Prisma client
pnpm --filter @repo/db db:generate

# Start development server with Docker
make docker-up
```

## 🚢 Deployment to Hetzner Cloud

### Prerequisites

1. A Hetzner Cloud account and server (recommended: CX21 or higher)
2. Domain name pointing to your server
3. SSH access to your server

### Setup Steps

1. **Update environment variables:**

   Copy `.env.production.template` to `.env.production` and update the values:

   ```bash
   cp .env.production.template .env.production
   # Edit the values in .env.production
   ```

2. **Update your server IP in `.env.production`:**

   ```
   HETZNER_SERVER_IP=your_server_ip
   ```

3. **Set up the server:**

   ```bash
   # SSH into your server
   ssh root@your_server_ip
   
   # Run the setup script
   bash /path/to/scripts/server_setup.sh
   ```

4. **Deploy the application:**

   ```bash
   # From your local machine
   bash scripts/deploy_to_hetzner.sh
   ```

### Continuous Deployment

This project uses GitHub Actions for CI/CD. To set it up:

1. Add these secrets to your GitHub repository:
   - `HETZNER_HOST`: Your server IP
   - `HETZNER_USER`: SSH username (usually root)
   - `HETZNER_SSH_KEY`: Your private SSH key
   - `DOMAIN`: Your domain name
   - `NOTIFICATION_EMAIL`: Email to receive deployment notifications

2. Push to the main branch to trigger automatic deployment.

### Maintenance

- **Database backups:** Automatically run daily with retention policies
- **System updates:** Run `bash scripts/update.sh` on your server periodically
- **Health checks:** Run every 15 minutes via cron
- **Security scans:** Run weekly via cron

### Monitoring & Alerting

This project includes a production-ready monitoring and alerting stack:

1. **Prometheus**: Collects metrics from services
2. **Grafana**: Visualizes metrics in dashboards
3. **Node Exporter**: Collects host metrics
4. **cAdvisor**: Collects container metrics
5. **Alertmanager**: Handles alert notifications

Access your Grafana dashboard at `https://grafana.yourdomain.com`  
(Default credentials: admin/admin - change on first login)

#### Alerting Configuration

The system is configured to send alerts via email and Slack when critical issues are detected:

1. **Email Alerts**: Update `NOTIFICATION_EMAIL`, `SMTP_USER`, and `SMTP_PASS` in `.env.production`
2. **Slack Alerts**: Update `SLACK_WEBHOOK_URL` in `.env.production` with your Slack webhook URL

You can customize alert rules in `monitoring/alerts.yml` and notification templates in `monitoring/templates/`.

To verify the monitoring system is working correctly:

```bash
# Run the health check script
bash scripts/health_check.sh
```
