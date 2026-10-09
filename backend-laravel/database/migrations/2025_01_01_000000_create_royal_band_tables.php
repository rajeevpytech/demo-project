<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Users & RBAC
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->enum('role', [
                'super_admin',
                'website_owner',
                'content_editor',
                'seo_manager',
                'inquiry_manager',
                'read_only'
            ])->default('content_editor');
            $table->string('avatar_url')->nullable();
            $table->enum('status', ['active', 'pending', 'disabled'])->default('active');
            $table->rememberToken();
            $table->timestamps();
        });

        // 2. Website Settings & White-Label Profile
        Schema::create('website_settings', function (Blueprint $table) {
            $table->id();
            $table->string('brand_name')->default('THE ROYAL BAND');
            $table->string('tagline')->nullable();
            $table->text('logo_url')->nullable();
            $table->text('favicon_url')->nullable();
            $table->string('primary_color', 10)->default('#f2ca50');
            $table->string('secondary_color', 10)->default('#d4c78f');
            $table->string('surface_color', 10)->default('#131315');
            $table->string('phone')->nullable();
            $table->string('whatsapp_phone')->nullable();
            $table->string('concierge_email')->nullable();
            $table->text('address')->nullable();
            $table->string('director_name')->nullable();
            $table->string('director_title')->nullable();
            $table->string('director_phone')->nullable();
            $table->text('director_photo_url')->nullable();
            $table->json('social_links')->nullable();
            $table->string('tenant_id')->default('royal-band-prod-01');
            $table->timestamps();
        });

        // 3. Ownership Transfers (Section 10)
        Schema::create('ownership_transfers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('current_owner_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('target_user_id')->constrained('users')->onDelete('cascade');
            $table->enum('status', ['initiated', 'verified_by_recipient', 'reauthenticated', 'completed', 'cancelled']);
            $table->string('security_token', 64)->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });

        // 4. Pages & Revisions
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->enum('status', ['published', 'draft', 'scheduled'])->default('draft');
            $table->foreignId('author_id')->constrained('users');
            $table->timestamps();
        });

        Schema::create('page_sections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_id')->constrained('pages')->onDelete('cascade');
            $table->string('name');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('page_blocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('section_id')->constrained('page_sections')->onDelete('cascade');
            $table->string('type'); // hero, metrics, lineups, quote, etc.
            $table->string('title')->nullable();
            $table->text('subtitle')->nullable();
            $table->longText('content')->nullable();
            $table->text('image_url')->nullable();
            $table->string('badge')->nullable();
            $table->string('cta_text')->nullable();
            $table->string('cta_link')->nullable();
            $table->json('data_payload')->nullable();
            $table->boolean('is_visible')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('page_revisions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_id')->constrained('pages')->onDelete('cascade');
            $table->integer('version');
            $table->json('snapshot_data');
            $table->foreignId('author_id')->constrained('users');
            $table->string('change_summary');
            $table->timestamps();
        });

        // 5. Services Catalog
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('tagline')->nullable();
            $table->text('description');
            $table->text('image_url');
            $table->string('badge')->nullable();
            $table->json('tags')->nullable();
            $table->json('features')->nullable();
            $table->string('duration')->nullable();
            $table->string('estimated_pricing')->nullable();
            $table->enum('category', ['wedding', 'corporate', 'destination', 'soiree', 'festival', 'addon'])->default('wedding');
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        // 6. Locations (City Hubs)
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('state');
            $table->string('tagline')->nullable();
            $table->text('description');
            $table->string('resident_troupes')->nullable();
            $table->string('readiness_time')->nullable();
            $table->string('specialty')->nullable();
            $table->string('acoustic_certification')->nullable();
            $table->json('key_venues')->nullable();
            $table->boolean('is_stationed')->default(true);
            $table->timestamps();
        });

        // 7. Packages
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('subtitle')->nullable();
            $table->string('tier_label'); // Tier I, Tier II, Tier III
            $table->string('duration_label'); // 60 Min, 120 Min
            $table->text('description');
            $table->string('ideal_for')->nullable();
            $table->json('inclusions');
            $table->string('highlight_badge')->nullable();
            $table->boolean('is_recommended')->default(false);
            $table->timestamps();
        });

        // 8. Media Assets Library
        Schema::create('media_assets', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('url');
            $table->enum('type', ['image', 'video', 'audio']);
            $table->string('alt_text');
            $table->string('file_size')->nullable();
            $table->string('dimensions')->nullable();
            $table->string('duration')->nullable();
            $table->timestamps();
        });

        // 9. Booking Inquiries (Leads)
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('title', 30)->nullable();
            $table->string('full_name');
            $table->string('phone');
            $table->string('email');
            $table->string('occasion_type');
            $table->date('event_date');
            $table->string('timing_slot');
            $table->string('city');
            $table->string('ensemble_package');
            $table->json('curated_addons')->nullable();
            $table->integer('guest_count');
            $table->text('special_requests')->nullable();
            $table->enum('status', ['new', 'under_review', 'quoted', 'deposit_paid', 'confirmed', 'archived'])->default('new');
            $table->string('quote_amount')->nullable();
            $table->text('admin_notes')->nullable();
            $table->timestamps();
        });

        // 10. SEO Metadata & Technical Directives
        Schema::create('seo_metadata', function (Blueprint $table) {
            $table->id();
            $table->morphs('seoble');
            $table->string('meta_title');
            $table->text('meta_description');
            $table->string('canonical_url');
            $table->string('og_title')->nullable();
            $table->text('og_description')->nullable();
            $table->text('og_image_url')->nullable();
            $table->string('twitter_card')->default('summary_large_image');
            $table->boolean('is_noindex')->default(false);
            $table->boolean('is_nofollow')->default(false);
            $table->string('schema_type')->default('Organization');
            $table->timestamps();
        });

        // 11. Testimonials
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('client_name');
            $table->string('designation')->nullable();
            $table->string('venue');
            $table->string('event_date');
            $table->text('quote');
            $table->integer('rating')->default(5);
            $table->boolean('is_approved')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });

        // 12. Blog Articles
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('summary');
            $table->longText('content');
            $table->text('cover_image')->nullable();
            $table->string('category');
            $table->foreignId('author_id')->constrained('users');
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        // 13. Audit Logs (Immutable)
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('user_name');
            $table->string('action');
            $table->string('entity_type');
            $table->string('entity_id')->nullable();
            $table->text('details');
            $table->string('ip_address')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
        Schema::dropIfExists('blogs');
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('seo_metadata');
        Schema::dropIfExists('inquiries');
        Schema::dropIfExists('media_assets');
        Schema::dropIfExists('packages');
        Schema::dropIfExists('locations');
        Schema::dropIfExists('services');
        Schema::dropIfExists('page_revisions');
        Schema::dropIfExists('page_blocks');
        Schema::dropIfExists('page_sections');
        Schema::dropIfExists('pages');
        Schema::dropIfExists('ownership_transfers');
        Schema::dropIfExists('website_settings');
        Schema::dropIfExists('users');
    }
};
