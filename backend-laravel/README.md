# THE ROYAL BAND — Production Laravel 11 / PHP 8.3 Architecture & Deployment Guide

This directory contains the production-ready PHP/Laravel implementation files for THE ROYAL BAND luxury musical entertainment CMS.

## 1. System Requirements
- PHP 8.3+ with extensions: `pdo_mysql`, `mbstring`, `openssl`, `bcmath`, `ctype`, `json`, `fileinfo`
- MySQL 8.0+ or MariaDB 10.6+
- Composer 2+
- Nginx / Apache with URL rewrite enabled

## 2. Installation & Database Setup
```bash
# 1. Install dependencies
composer install --optimize-autoloader --no-dev

# 2. Configure Environment (.env)
cp .env.example .env
php artisan key:generate

# 3. Database configuration in .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=royal_band_production
DB_USERNAME=royal_band_user
DB_PASSWORD=SecurePassword_2026

# 4. Run database migrations & seeders
php artisan migrate --seed

# 5. Storage symlink for public media
php artisan storage:link

# 6. Cache configuration & route optimization
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 3. Database Architecture Summary
The database includes 13 enterprise relational tables:
- `users`: RBAC support (`super_admin`, `website_owner`, `content_editor`, `seo_manager`, `inquiry_manager`)
- `website_settings`: Branding, primary gold hex, direct WhatsApp lines, white-label tenant ID
- `ownership_transfers`: Multi-step verified owner handoff with audit sealing
- `pages`, `page_sections`, `page_blocks`, `page_revisions`: Structured block storage & immutable rollback snapshots
- `services`: Wedding, Corporate, Destination, Soirée, Festival catalogs
- `locations`: Regional city landing pages (Agra, Mathura, Lucknow, Jodhpur + dynamically added cities)
- `packages`: Production tiers (The Crown Quintet, The Royal Grandeur, The Imperial Symphony)
- `inquiries`: Direct VIP inquiry storage with pipeline statuses (`new`, `under_review`, `quoted`, `deposit_paid`, `confirmed`, `archived`)
- `seo_metadata`: Polymorphic SEO tags, OpenGraph cards, Twitter cards, and Schema.org types
- `audit_logs`: Immutable ledger of all administrative mutations

## 4. Default Seeded Administrative Credentials
- **Website Owner**: `vikramaditya@theroyalband.com` / `RoyalConductor@2026`
- **Super Admin**: `admin@theroyalband.com` / `RoyalSuperAdmin@2026`
- **Content Editor**: `editor@theroyalband.com` / `RoyalEditor@2026`
- **SEO Manager**: `seo@theroyalband.com` / `RoyalSeo@2026`
