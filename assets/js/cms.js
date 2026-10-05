/**
 * DigitalSamWorld (digitalsamworld.com) - Full Website CMS Engine v5.0
 * Supports Full CRUD & Live Configuration for:
 *  1. Core CMS Settings (General, Writing, Reading, Discussion Rules & Comments, Media Sizes)
 *  2. Permalinks & URL Routing Manager (Custom Slugs, Link Rewriting, Canonical URLs, Redirects, .htaccess & Sitemap)
 *  3. Custom Website Pages (Header Menu, Footer Links, Dynamic Page Template page.html)
 *  4. Blog Posts & Insights (Homepage Blog Section, Blog Hub blog.html, Single Article post.html + Comments)
 *  5. 360° Services (Homepage, Services Hub, Header Mega-Menu, Footer, Dynamic Service Detail Page)
 *  6. Homepage Sections, Global Contact Info, SEO Meta & Leads Inbox
 */

(function (window) {
  'use strict';

  var STORAGE_KEY = 'sam_digital_cms_v1';
  var LEADS_KEY = 'sam_digital_leads_v1';
  var COMMENTS_KEY = 'sam_digital_comments_v1';
  var AUTH_KEY = 'sam_digital_admin_session';
  var PASS_KEY = 'sam_digital_admin_pass';

  // Vector SVG Icons Library for Services
  var ICON_SVGS = {
    seo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>',
    ads: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    growth: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
    social: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
    web: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    content: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    leads: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
    design: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',
    ecommerce: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
    ai: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
  };

  var POST_THEME_STYLES = {
    indigo: 'linear-gradient(135deg, #0F172A 0%, #312E81 55%, #4F46E5 100%)',
    emerald: 'linear-gradient(135deg, #064E3B 0%, #047857 55%, #10B981 100%)',
    amber: 'linear-gradient(135deg, #1E1B4B 0%, #7C2D12 55%, #F59E0B 100%)',
    cyber: 'linear-gradient(135deg, #090D16 0%, #1E293B 50%, #6366F1 100%)'
  };

  // Core CMS Settings (General, Writing, Reading, Discussion, Media Sizes)
  var DEFAULT_SETTINGS = {
    general: {
      siteTitle: 'DigitalSamWorld',
      tagline: '#1 ROI-Driven 360° Digital Marketing Agency in India',
      siteUrl: 'https://digitalsamworld.com',
      adminEmail: 'info@digitalsamworld.com',
      timezone: 'Asia/Kolkata (UTC+05:30)',
      dateFormat: 'MMM DD, YYYY',
      timeFormat: '12h'
    },
    writing: {
      defaultCategory: 'SEO & AI Search',
      defaultPostFormat: 'Standard Playbook',
      defaultAuthor: 'Sameer Malhotra',
      defaultAuthorRole: 'Founder & Chief Growth Strategist',
      defaultPostStatus: 'Published',
      editorMode: 'markdown-html',
      autoSlugExcerpt: 'yes',
      pingServices:
        'https://rpc.pingomatic.com/\nhttps://www.google.com/ping?sitemap=https://digitalsamworld.com/sitemap.xml'
    },
    reading: {
      frontPageDisplays: 'default_home', // 'default_home', 'blog_feed', or 'custom_page'
      frontPageSlug: 'pricing-packages',
      postsPerPage: 6,
      homePostsCount: 3,
      feedDisplay: 'excerpt', // 'excerpt' or 'full'
      excerptLength: 165,
      showReadTime: 'yes',
      showAuthorBadge: 'yes',
      searchVisibility: 'index' // 'index' (allow indexing) or 'noindex' (discourage search engines)
    },
    discussion: {
      allowComments: 'yes',
      allowPingbacks: 'yes',
      requireNameEmail: 'yes',
      requireLogin: 'no',
      closeAfterDays: 90,
      threadedComments: 'yes',
      manualModeration: 'no',
      maxLinks: 2,
      moderationKeys: 'casino, crypto-airdrop, viagra, cheap-backlinks, adult, lottery',
      showAvatars: 'yes',
      avatarStyle: 'gradient' // 'gradient', 'emerald', 'slate'
    },
    media: {
      thumbWidth: 300,
      thumbHeight: 300,
      thumbCrop: 'yes',
      mediumWidth: 768,
      mediumHeight: 512,
      largeWidth: 1280,
      largeHeight: 720,
      cardBannerHeight: 175,
      imageFit: 'cover',
      lazyLoad: 'yes',
      webpPriority: 'yes',
      maxUploadMb: 10,
      allowedTypes: 'svg, webp, png, jpg, jpeg, gif, pdf'
    }
  };

  var DEFAULT_COMMENTS = [
    {
      id: 'cmt_1',
      postSlug: 'ai-search-geo-aeo-seo-india-2026',
      author: 'Rohit Bansal',
      email: 'rohit@tricityrealty.in',
      date: 'Sep 30, 2026',
      content:
        'Fantastic breakdown of Generative Engine Optimization (GEO)! After implementing entity schema with DigitalSamWorld, our project started appearing in ChatGPT recommendations for Chandigarh luxury flats.',
      status: 'Approved'
    },
    {
      id: 'cmt_2',
      postSlug: 'google-ads-pmax-strategies-lower-cpl',
      author: 'Dr. Kavita Sharma',
      email: 'drkavita@chandigarhskin.com',
      date: 'Sep 28, 2026',
      content:
        'Offline Conversion Tracking and negative keyword lists cut our clinic Google Ads CPL by more than 45%. Highly practical guide!',
      status: 'Approved'
    },
    {
      id: 'cmt_3',
      postSlug: 'high-converting-landing-pages-cro-guide',
      author: 'Ankit Verma',
      email: 'ankit@d2cbrandhub.in',
      date: 'Sep 29, 2026',
      content:
        'We would love to book a landing page CRO teardown for our Shopify store. Does your Sector 34-A Chandigarh team also audit checkout drop-offs?',
      status: 'Pending'
    },
    {
      id: 'cmt_4',
      postSlug: 'ai-search-geo-aeo-seo-india-2026',
      author: 'Simran Kaur',
      email: 'simran@edutechpunjab.com',
      date: 'Sep 27, 2026',
      content:
        'Very insightful article on AEO and structured data. Bookmarking this for our internal content marketing team!',
      status: 'Approved'
    }
  ];

  var DEFAULT_PERMALINKS = [
    {
      id: 'plink_home',
      label: 'Homepage (Main Landing Page)',
      type: 'Core Page',
      sourceUrl: 'index.html',
      customUrl: 'index.html',
      canonicalUrl: 'https://digitalsamworld.com/',
      inSitemap: 'yes',
      priority: '1.0'
    },
    {
      id: 'plink_about',
      label: 'About Us Page',
      type: 'Core Page',
      sourceUrl: 'about.html',
      customUrl: 'about.html',
      canonicalUrl: 'https://digitalsamworld.com/about.html',
      inSitemap: 'yes',
      priority: '0.8'
    },
    {
      id: 'plink_services',
      label: 'All 360° Services Hub',
      type: 'Core Page',
      sourceUrl: 'services.html',
      customUrl: 'services.html',
      canonicalUrl: 'https://digitalsamworld.com/services.html',
      inSitemap: 'yes',
      priority: '0.9'
    },
    {
      id: 'plink_portfolio',
      label: 'Portfolio & Client Case Studies',
      type: 'Core Page',
      sourceUrl: 'portfolio.html',
      customUrl: 'portfolio.html',
      canonicalUrl: 'https://digitalsamworld.com/portfolio.html',
      inSitemap: 'yes',
      priority: '0.9'
    },
    {
      id: 'plink_blog',
      label: 'Blog & Insights Hub',
      type: 'Core Page',
      sourceUrl: 'blog.html',
      customUrl: 'blog.html',
      canonicalUrl: 'https://digitalsamworld.com/blog.html',
      inSitemap: 'yes',
      priority: '0.9'
    },
    {
      id: 'plink_contact',
      label: 'Contact Us Page',
      type: 'Core Page',
      sourceUrl: 'contact.html',
      customUrl: 'contact.html',
      canonicalUrl: 'https://digitalsamworld.com/contact.html',
      inSitemap: 'yes',
      priority: '0.8'
    },
    {
      id: 'plink_privacy',
      label: 'Privacy Policy',
      type: 'Legal Page',
      sourceUrl: 'privacy-policy.html',
      customUrl: 'privacy-policy.html',
      canonicalUrl: 'https://digitalsamworld.com/privacy-policy.html',
      inSitemap: 'yes',
      priority: '0.5'
    },
    {
      id: 'plink_terms',
      label: 'Terms & Conditions',
      type: 'Legal Page',
      sourceUrl: 'terms-and-conditions.html',
      customUrl: 'terms-and-conditions.html',
      canonicalUrl: 'https://digitalsamworld.com/terms-and-conditions.html',
      inSitemap: 'yes',
      priority: '0.5'
    },
    {
      id: 'plink_disclaimer',
      label: 'Website Disclaimer',
      type: 'Legal Page',
      sourceUrl: 'disclaimer.html',
      customUrl: 'disclaimer.html',
      canonicalUrl: 'https://digitalsamworld.com/disclaimer.html',
      inSitemap: 'yes',
      priority: '0.5'
    },
    {
      id: 'plink_signup',
      label: 'Client Sign Up (Growth Portal Registration)',
      type: 'Core Page',
      sourceUrl: 'signup.html',
      customUrl: 'signup.html',
      canonicalUrl: 'https://digitalsamworld.com/signup.html',
      inSitemap: 'yes',
      priority: '0.8'
    },
    {
      id: 'plink_login',
      label: 'Client Login (Growth Dashboard Sign In)',
      type: 'Core Page',
      sourceUrl: 'login.html',
      customUrl: 'login.html',
      canonicalUrl: 'https://digitalsamworld.com/login.html',
      inSitemap: 'yes',
      priority: '0.8'
    }
  ];

  // Role-Based Access Control (RBAC) Definitions
  var ROLE_DEFINITIONS = {
    Administrator: {
      role: 'Administrator',
      badgeClass: 'role-admin',
      summary: 'Full unrestricted access to Core Settings, User Accounts, Permalinks, Pages, Posts, Services & Leads.',
      capabilities: ['Manage Users & Roles', 'Configure Core Settings', 'Manage Permalinks', 'Publish & Delete Any Page/Post', 'Manage Services & Leads']
    },
    Editor: {
      role: 'Editor',
      badgeClass: 'role-editor',
      summary: 'Can create, edit, publish, and delete any Custom Pages, Blog Posts, Services, and moderate reader comments.',
      capabilities: ['Publish & Edit All Posts', 'Manage Custom Pages', 'Moderate Comments', 'Manage Services & Case Studies']
    },
    Author: {
      role: 'Author',
      badgeClass: 'role-author',
      summary: 'Can write, edit, and publish their own Blog Posts & Playbooks and manage their author bio profile.',
      capabilities: ['Write & Publish Own Posts', 'Edit Own Published Articles', 'Manage Author Profile & Tags']
    },
    Contributor: {
      role: 'Contributor',
      badgeClass: 'role-contributor',
      summary: 'Can write and edit their own Blog Post drafts for editorial review, but cannot publish directly or change settings.',
      capabilities: ['Write Draft Articles', 'Submit Posts for Editor Review', 'Edit Own Profile']
    },
    Subscriber: {
      role: 'Subscriber',
      badgeClass: 'role-subscriber',
      summary: 'Can log in, manage their personal account profile, read playbooks, and post verified comments without moderation queue.',
      capabilities: ['Manage Personal Profile', 'Post Verified Article Comments', 'Access Member Playbooks']
    }
  };

  // Default CMS User Accounts (Single Administrator Account)
  var DEFAULT_USERS = [
    {
      id: 'usr_admin_1',
      name: 'Sameer Malhotra',
      username: 'admin',
      email: 'admin@digitalsamworld.com',
      role: 'Administrator',
      designation: 'Founder & Chief Growth Strategist',
      phone: '+91 82840 38539',
      password: 'sam123',
      status: 'Active',
      initials: 'SM',
      avatarTheme: 'indigo',
      bio: '10+ years scaling 550+ Indian & global brands through full-funnel performance marketing and revenue architecture at DigitalSamWorld Chandigarh.',
      createdAt: 'Jan 10, 2025',
      lastLogin: 'Today, 5:30 PM'
    }
  ];

  // Default Appearance Configuration (Themes, Menus, Widgets & Site Editor)
  var DEFAULT_APPEARANCE = {
    activeThemeId: 'theme_astra',
    themes: [
      {
        id: 'theme_astra',
        name: 'DigitalSamWorld Astra Minimal',
        version: '3.0.0',
        author: 'DigitalSamWorld Design Studio',
        description: 'Clean, light, minimal & professional WordPress Astra theme featuring crisp off-white canvas, Astra Royal Cerulean brand colors, and fresh Emerald accents. Completely dark-free aesthetic.',
        primaryColor: '#2563EB',
        secondaryColor: '#0EA5E9',
        accentColor: '#10B981',
        darkBgColor: '#F8FAFC',
        lightBgColor: '#FFFFFF',
        headingFont: 'Plus Jakarta Sans',
        bodyFont: 'Plus Jakarta Sans',
        cardRadius: '12px',
        buttonStyle: 'rounded',
        isBuiltIn: true
      },
      {
        id: 'theme_ocean',
        name: 'Astra Ocean Breeze',
        version: '2.0.0',
        author: 'DigitalSamWorld Design Studio',
        description: 'Vibrant sky-blue and emerald palette inspired by Astra Pro starter sites, optimized for modern digital marketing and high readability.',
        primaryColor: '#0284C7',
        secondaryColor: '#38BDF8',
        accentColor: '#10B981',
        darkBgColor: '#F0F9FF',
        lightBgColor: '#FFFFFF',
        headingFont: 'Plus Jakarta Sans',
        bodyFont: 'Plus Jakarta Sans',
        cardRadius: '12px',
        buttonStyle: 'pill',
        isBuiltIn: true
      },
      {
        id: 'theme_emerald_clean',
        name: 'Astra Mint & Slate',
        version: '2.0.0',
        author: 'DigitalSamWorld Design Studio',
        description: 'Minimal mint-green and crisp charcoal agency aesthetic designed for maximum clarity, SEO, and fast loading.',
        primaryColor: '#059669',
        secondaryColor: '#0D9488',
        accentColor: '#2563EB',
        darkBgColor: '#F0FDF4',
        lightBgColor: '#FFFFFF',
        headingFont: 'Plus Jakarta Sans',
        bodyFont: 'Plus Jakarta Sans',
        cardRadius: '12px',
        buttonStyle: 'rounded',
        isBuiltIn: true
      }
    ],
    menuSettings: {
      ctaText: 'Sign Up',
      ctaUrl: 'signup.html',
      showPhone: 'yes',
      stickyHeader: 'yes'
    },
    menus: [
      {
        id: 'menu_home',
        label: 'Home',
        url: 'index.html',
        location: 'both',
        type: 'core',
        target: '_self',
        highlight: 'normal',
        status: 'Enabled'
      },
      {
        id: 'menu_about',
        label: 'About Us',
        url: 'about.html',
        location: 'both',
        type: 'core',
        target: '_self',
        highlight: 'normal',
        status: 'Enabled'
      },
      {
        id: 'menu_services',
        label: 'Services',
        url: 'services.html',
        location: 'both',
        type: 'services_dropdown',
        target: '_self',
        highlight: 'normal',
        status: 'Enabled'
      },
      {
        id: 'menu_portfolio',
        label: 'Portfolio',
        url: 'portfolio.html',
        location: 'both',
        type: 'core',
        target: '_self',
        highlight: 'normal',
        status: 'Enabled'
      },
      {
        id: 'menu_cases',
        label: 'Case Studies',
        url: 'index.html#case-studies',
        location: 'header',
        type: 'anchor',
        target: '_self',
        highlight: 'normal',
        status: 'Enabled'
      },
      {
        id: 'menu_pricing',
        label: 'Pricing',
        url: 'page.html?slug=pricing-packages',
        location: 'both',
        type: 'page',
        target: '_self',
        highlight: 'normal',
        status: 'Enabled'
      },
      {
        id: 'menu_blog',
        label: 'Blog',
        url: 'blog.html',
        location: 'both',
        type: 'core',
        target: '_self',
        highlight: 'normal',
        status: 'Enabled'
      },
      {
        id: 'menu_contact',
        label: 'Contact Us',
        url: 'contact.html',
        location: 'both',
        type: 'core',
        target: '_self',
        highlight: 'normal',
        status: 'Enabled'
      }
    ],
    widgets: [
      {
        id: 'wdg_audit_cta',
        title: 'Free 360° Digital Audit',
        type: 'cta_card',
        area: 'sidebar',
        badge: 'Chandigarh HQ • Sector 34-A',
        content: 'Get a custom SEO, Google Ads & CRO competitor breakdown delivered within 24 hours by our senior strategists.',
        btnText: 'Book Strategy Call →',
        btnUrl: 'contact.html',
        theme: 'dark',
        status: 'Active'
      },
      {
        id: 'wdg_recent_posts',
        title: 'Latest Growth Playbooks',
        type: 'recent_posts',
        area: 'sidebar',
        badge: 'Trending Insights',
        content: 'Actionable articles on AI Search (GEO), Google Ads PMax, and Landing Page CRO.',
        btnText: 'View All Articles →',
        btnUrl: 'blog.html',
        theme: 'light',
        status: 'Active'
      },
      {
        id: 'wdg_kpi_proof',
        title: 'Why 550+ Brands Trust Us',
        type: 'stats_badge',
        area: 'above_footer',
        badge: 'Verified Agency Track Record',
        content: '550+ Brands Scaled | 4.8x Avg. Client ROAS | ₹25Cr+ Profitable Ad Spend Managed | 98% Retention',
        btnText: 'Explore Case Studies →',
        btnUrl: 'index.html#case-studies',
        theme: 'gradient',
        status: 'Active'
      },
      {
        id: 'wdg_newsletter',
        title: 'Join 12,000+ Founders & CMOs',
        type: 'newsletter',
        area: 'footer_col',
        badge: 'Weekly ROI Playbook',
        content: 'Receive our weekly Chandigarh growth notes on SEO, AI search citations, and profitable paid media scaling.',
        btnText: 'Subscribe Free',
        btnUrl: 'contact.html',
        theme: 'dark',
        status: 'Active'
      }
    ],
    siteEditor: {
      containerWidth: '1280px',
      sectionSpacing: 'standard',
      cardShadow: 'medium',
      showTopbar: 'yes',
      showFloatingActions: 'yes',
      showPreFooterWidgets: 'yes',
      headerBrandBadge: '',
      footerCopyright: '© 2026 DigitalSamWorld (digitalsamworld.com). All Rights Reserved.',
      sectionsVisibility: {
        hero: 'show',
        marquee: 'show',
        about: 'show',
        services: 'show',
        whyUs: 'show',
        caseStudies: 'show',
        team: 'show',
        testimonials: 'show',
        blog: 'show',
        cities: 'show',
        faqs: 'show',
        contact: 'show'
      },
      customCss: '/* Custom Site Editor CSS Rules */\n'
    }
  };

  // WordPress-Style External Theme Directory / Repository (Installable External Themes)
  var EXTERNAL_THEME_DIRECTORY = [
    {
      id: 'ext_astra_agency',
      name: 'Astra Pro Growth Agency',
      version: '4.6.2',
      author: 'Brainstorm Force (WP Directory)',
      category: 'agency',
      rating: '4.9 (4,820+)',
      tags: ['Agency & Growth', 'Fast', 'Conversion', 'Clean'],
      description: 'Ultra-fast WordPress-inspired agency theme featuring Royal Cobalt Blue gradients, crisp sky-cyan accents, and high-converting lead capture cards.',
      primaryColor: '#2563EB',
      secondaryColor: '#0284C7',
      accentColor: '#10B981',
      darkBgColor: '#F8FAFC',
      lightBgColor: '#FFFFFF',
      headingFont: 'Plus Jakarta Sans',
      bodyFont: 'Inter',
      cardRadius: '12px',
      buttonStyle: 'rounded',
      source: 'directory',
      externalCssUrl: '',
      customCss: '/* Astra Pro Growth Agency Theme Overrides */\n.service-card, .case-card, .testimonial-card { border-top: 3px solid var(--primary); }\n',
      isBuiltIn: false
    },
    {
      id: 'ext_generatepress_seo',
      name: 'GeneratePress Ultra SEO',
      version: '3.4.0',
      author: 'Tom Usborne (WP Directory)',
      category: 'agency',
      rating: '5.0 (3,610+)',
      tags: ['Technical SEO', 'Lightweight', 'Minimal', 'Core Web Vitals'],
      description: 'Featherweight, Core Web Vitals-focused theme built for technical SEO agencies, organic search consultancies, and content-first publishers.',
      primaryColor: '#2563EB',
      secondaryColor: '#0D9488',
      accentColor: '#059669',
      darkBgColor: '#F8FAFC',
      lightBgColor: '#FFFFFF',
      headingFont: 'Inter',
      bodyFont: 'Inter',
      cardRadius: '8px',
      buttonStyle: 'sharp',
      source: 'directory',
      externalCssUrl: '',
      customCss: '/* GeneratePress Ultra SEO Theme Overrides */\n.hero-badge, .section-tag { letter-spacing: 0.08em; text-transform: uppercase; }\n',
      isBuiltIn: false
    },
    {
      id: 'ext_kadence_cyber',
      name: 'Kadence Neon Cyber Studio',
      version: '2.9.5',
      author: 'Kadence WP (WP Directory)',
      category: 'dark',
      rating: '4.9 (2,940+)',
      tags: ['Dark & Cyber', 'Neon', 'Web3 & SaaS', 'Creative'],
      description: 'Futuristic neon-violet and electric-magenta theme with deep obsidian-cosmos hero backgrounds and glowing gradient card accents.',
      primaryColor: '#8B5CF6',
      secondaryColor: '#EC4899',
      accentColor: '#06B6D4',
      darkBgColor: '#050511',
      lightBgColor: '#F5F3FF',
      headingFont: 'Space Grotesk',
      bodyFont: 'Plus Jakarta Sans',
      cardRadius: '18px',
      buttonStyle: 'pill',
      source: 'directory',
      externalCssUrl: '',
      customCss: '/* Kadence Neon Cyber Studio Theme Overrides */\n.service-card:hover, .case-card:hover { box-shadow: 0 20px 45px -10px rgba(139, 92, 246, 0.28) !important; border-color: #8B5CF6 !important; }\n',
      isBuiltIn: false
    },
    {
      id: 'ext_oceanwp_d2c',
      name: 'OceanWP E-Commerce & D2C Scale',
      version: '3.5.8',
      author: 'OceanWP Team (WP Directory)',
      category: 'agency',
      rating: '4.8 (5,100+)',
      tags: ['E-Commerce', 'D2C & Retail', 'High ROAS', 'Warm Palette'],
      description: 'High-energy sunset orange, warm amber, and emerald theme crafted for Shopify/WooCommerce scaling agencies and performance ad buyers.',
      primaryColor: '#EA580C',
      secondaryColor: '#D97706',
      accentColor: '#059669',
      darkBgColor: '#140C08',
      lightBgColor: '#FFF7ED',
      headingFont: 'Outfit',
      bodyFont: 'Plus Jakarta Sans',
      cardRadius: '16px',
      buttonStyle: 'pill',
      source: 'directory',
      externalCssUrl: '',
      customCss: '/* OceanWP D2C Scale Theme Overrides */\n.btn-primary { box-shadow: 0 10px 25px -5px rgba(234, 88, 12, 0.4); }\n',
      isBuiltIn: false
    },
    {
      id: 'ext_blocksy_ai',
      name: 'Blocksy AI & MarTech SaaS',
      version: '2.1.4',
      author: 'CreativeThemes (WP Directory)',
      category: 'saas',
      rating: '5.0 (2,450+)',
      tags: ['SaaS & Tech', 'AI Automation', 'Glassmorphic', 'Modern'],
      description: 'Next-gen MarTech and AI automation theme combining Electric Cyan, Deep Indigo, and Neon Emerald with sleek modern typography.',
      primaryColor: '#0891B2',
      secondaryColor: '#4F46E5',
      accentColor: '#10B981',
      darkBgColor: '#041019',
      lightBgColor: '#ECFEFF',
      headingFont: 'Space Grotesk',
      bodyFont: 'DM Sans',
      cardRadius: '16px',
      buttonStyle: 'rounded',
      source: 'directory',
      externalCssUrl: '',
      customCss: '/* Blocksy AI & MarTech Theme Overrides */\n.site-header { backdrop-filter: blur(18px); }\n',
      isBuiltIn: false
    },
    {
      id: 'ext_hello_swiss',
      name: 'Hello Elementor Swiss Editorial',
      version: '3.1.1',
      author: 'Elementor Team (WP Directory)',
      category: 'editorial',
      rating: '4.8 (6,200+)',
      tags: ['Editorial & Luxury', 'Swiss Grid', 'Brutalist', 'Minimal'],
      description: 'Architectural Swiss-grid editorial theme pairing monochrome obsidian typography with punchy crimson highlights and warm ivory surfaces.',
      primaryColor: '#18181B',
      secondaryColor: '#E11D48',
      accentColor: '#2563EB',
      darkBgColor: '#09090B',
      lightBgColor: '#FAF8F5',
      headingFont: 'Space Grotesk',
      bodyFont: 'Inter',
      cardRadius: '4px',
      buttonStyle: 'sharp',
      source: 'directory',
      externalCssUrl: '',
      customCss: '/* Hello Elementor Swiss Editorial Overrides */\n.service-card, .case-card, .testimonial-card { border: 1.5px solid #18181B; }\n',
      isBuiltIn: false
    },
    {
      id: 'ext_neve_fintech',
      name: 'Neve B2B & Enterprise Consulting',
      version: '3.8.1',
      author: 'ThemeIsle (WP Directory)',
      category: 'saas',
      rating: '4.9 (3,190+)',
      tags: ['B2B Enterprise', 'Fintech', 'Corporate', 'Executive'],
      description: 'Authoritative executive theme designed for B2B lead generation, enterprise consulting, and account-based marketing (ABM) firms.',
      primaryColor: '#1D4ED8',
      secondaryColor: '#0F766E',
      accentColor: '#D97706',
      darkBgColor: '#0A1124',
      lightBgColor: '#F8FAFC',
      headingFont: 'Montserrat',
      bodyFont: 'Plus Jakarta Sans',
      cardRadius: '10px',
      buttonStyle: 'rounded',
      source: 'directory',
      externalCssUrl: '',
      customCss: '/* Neve B2B Enterprise Theme Overrides */\n',
      isBuiltIn: false
    },
    {
      id: 'ext_sydney_creative',
      name: 'Sydney Creative Media & PR Hub',
      version: '2.4.9',
      author: 'aThemes (WP Directory)',
      category: 'editorial',
      rating: '4.9 (1,980+)',
      tags: ['Creative Studio', 'Social & PR', 'Video Reels', 'Vibrant'],
      description: 'Vibrant creative studio theme featuring Electric Rose, Deep Violet, and Amber accents tailored for social media, PR, and influencer agencies.',
      primaryColor: '#F43F5E',
      secondaryColor: '#7C3AED',
      accentColor: '#F59E0B',
      darkBgColor: '#13071E',
      lightBgColor: '#FFF1F2',
      headingFont: 'Poppins',
      bodyFont: 'Plus Jakarta Sans',
      cardRadius: '20px',
      buttonStyle: 'pill',
      source: 'directory',
      externalCssUrl: '',
      customCss: '/* Sydney Creative Media Theme Overrides */\n',
      isBuiltIn: false
    }
  ];

  // Default WordPress-Style Media Library Items (Images, Documents / PDFs, Videos / MP4)
  var DEFAULT_MEDIA_LIBRARY = [
    {
      id: 'med_ai_seo',
      title: 'AI Search & GEO/AEO Authority Banner',
      filename: 'post-ai-seo.svg',
      url: 'assets/images/post-ai-seo.svg',
      type: 'image',
      mimeType: 'image/svg+xml',
      fileSize: '18.2 KB',
      dimensions: '1200 × 630',
      uploadedBy: 'Sameer Malhotra',
      date: 'Sep 30, 2026',
      altText: 'AI Search & Generative Engine Optimization Cover',
      caption: 'Visualizing AI answer engine citation graphs and neural search',
      description: 'High-resolution vector banner for generative engine optimization and AEO playbooks.',
      attachedTo: 'Post: AI Search & SEO'
    },
    {
      id: 'med_gads',
      title: 'Google Ads & PMax Campaign Analytics',
      filename: 'post-google-ads.svg',
      url: 'assets/images/post-google-ads.svg',
      type: 'image',
      mimeType: 'image/svg+xml',
      fileSize: '20.1 KB',
      dimensions: '1200 × 630',
      uploadedBy: 'Aarav Khanna',
      date: 'Sep 28, 2026',
      altText: 'Google Ads PMax Dashboard with 5.4x Blended ROAS',
      caption: 'Performance Max campaign analytics dashboard',
      description: 'High-res diagram of Google Ads multi-channel conversion architecture.',
      attachedTo: 'Post: Google Ads & PMax'
    },
    {
      id: 'med_cro',
      title: 'Landing Page CRO & Speed 99 Architecture',
      filename: 'post-cro-landing.svg',
      url: 'assets/images/post-cro-landing.svg',
      type: 'image',
      mimeType: 'image/svg+xml',
      fileSize: '19.4 KB',
      dimensions: '1200 × 630',
      uploadedBy: 'Kabir Bajwa',
      date: 'Sep 25, 2026',
      altText: 'PageSpeed 99 Score and CRO High-Converting Funnel',
      caption: 'High-converting agency landing page framework',
      description: 'Detailed graphic of PageSpeed 99 metrics, heatmaps and CRO funnel.',
      attachedTo: 'Post: Landing Page CRO'
    },
    {
      id: 'med_meta',
      title: 'Social Media & Meta Ads ROAS Dashboard',
      filename: 'post-meta-ads.svg',
      url: 'assets/images/post-meta-ads.svg',
      type: 'image',
      mimeType: 'image/svg+xml',
      fileSize: '21.0 KB',
      dimensions: '1200 × 630',
      uploadedBy: 'Sameer Malhotra',
      date: 'Sep 22, 2026',
      altText: 'Meta Ads & Instagram Reels Scaling System',
      caption: 'Full-funnel D2C Meta advertising framework',
      description: 'ROAS performance chart for Instagram Reels and Meta Ads campaigns.',
      attachedTo: 'Post: Meta Ads & Reels'
    },
    {
      id: 'med_local_seo',
      title: 'Local SEO Chandigarh Maps #1 Dominance',
      filename: 'post-local-seo.svg',
      url: 'assets/images/post-local-seo.svg',
      type: 'image',
      mimeType: 'image/svg+xml',
      fileSize: '22.3 KB',
      dimensions: '1200 × 630',
      uploadedBy: 'Riya Gill',
      date: 'Sep 20, 2026',
      altText: 'Local SEO Chandigarh Maps 3-Pack Rank 1',
      caption: 'Google Business Profile 3-pack ranking map',
      description: 'Chandigarh local search dominance case study infographic and rank tracker.',
      attachedTo: 'Post: Local SEO Chandigarh'
    },
    {
      id: 'med_page_hero',
      title: 'Agency Executive Hero Banner',
      filename: 'page-default-hero.svg',
      url: 'assets/images/page-default-hero.svg',
      type: 'image',
      mimeType: 'image/svg+xml',
      fileSize: '17.8 KB',
      dimensions: '1200 × 630',
      uploadedBy: 'Sameer Malhotra',
      date: 'Sep 18, 2026',
      altText: 'DigitalSamWorld Executive Growth Infrastructure',
      caption: 'Digital marketing growth engine banner',
      description: 'Core hero banner graphic for company overview, leadership and service pages.',
      attachedTo: 'Page: About Us'
    },
    {
      id: 'med_page_pricing',
      title: 'Growth Pricing & Scalable Packages',
      filename: 'page-pricing.svg',
      url: 'assets/images/page-pricing.svg',
      type: 'image',
      mimeType: 'image/svg+xml',
      fileSize: '19.2 KB',
      dimensions: '1200 × 630',
      uploadedBy: 'Sameer Malhotra',
      date: 'Sep 15, 2026',
      altText: 'Transparent Pricing & Growth Plans for Businesses',
      caption: 'Three-tiered agency pricing packages overview',
      description: 'Hero cover for the custom Pricing & Packages page.',
      attachedTo: 'Page: Pricing Packages'
    },
    {
      id: 'med_page_careers',
      title: 'Careers & Agency Culture Chandigarh HQ',
      filename: 'page-careers.svg',
      url: 'assets/images/page-careers.svg',
      type: 'image',
      mimeType: 'image/svg+xml',
      fileSize: '18.6 KB',
      dimensions: '1200 × 630',
      uploadedBy: 'Sameer Malhotra',
      date: 'Sep 12, 2026',
      altText: 'Join DigitalSamWorld Team in Sector 34-A',
      caption: 'Work culture, leadership and innovation at Chandigarh HQ',
      description: 'Hero cover for the Agency Careers & Team Culture custom page.',
      attachedTo: 'Page: Careers & Culture'
    },
    {
      id: 'med_page_legal',
      title: 'Legal, Privacy & Compliance Shield',
      filename: 'page-legal.svg',
      url: 'assets/images/page-legal.svg',
      type: 'image',
      mimeType: 'image/svg+xml',
      fileSize: '16.5 KB',
      dimensions: '1200 × 630',
      uploadedBy: 'Sameer Malhotra',
      date: 'Sep 10, 2026',
      altText: 'Data Security, GDPR & DPDP Act 2023 Compliance',
      caption: 'Legal compliance shield banner for privacy and terms',
      description: 'Header graphic for Privacy Policy, Terms, and Disclaimer pages.',
      attachedTo: 'Page: Privacy Policy'
    },
    {
      id: 'med_logo_light',
      title: 'DigitalSamWorld Light Brand Logo',
      filename: 'logo-light.svg',
      url: 'assets/images/logo-light.svg',
      type: 'image',
      mimeType: 'image/svg+xml',
      fileSize: '8.4 KB',
      dimensions: '240 × 48',
      uploadedBy: 'Kabir Bajwa',
      date: 'Sep 01, 2026',
      altText: 'DigitalSamWorld Official Light Logo',
      caption: 'Navbar brand vector logo',
      description: 'Official horizontal brand logo for dark backgrounds and header navbar.',
      attachedTo: 'Header Navigation'
    },
    {
      id: 'med_deck_pdf',
      title: 'Corporate Capabilities Deck 2026',
      filename: 'DigitalSamWorld-Corporate-Deck-2026.pdf',
      url: 'assets/docs/DigitalSamWorld-Corporate-Deck-2026.pdf',
      type: 'document',
      mimeType: 'application/pdf',
      fileSize: '3.8 MB',
      dimensions: '12 Pages',
      uploadedBy: 'Sameer Malhotra',
      date: 'Sep 29, 2026',
      altText: 'DigitalSamWorld Corporate Credentials & Pitch Deck 2026',
      caption: 'Agency overview, case studies, client testimonials, and services',
      description: 'Comprehensive 12-page agency credentials PDF for prospective enterprise clients.',
      attachedTo: 'Unattached'
    },
    {
      id: 'med_seo_pdf',
      title: '120-Point Technical SEO & AEO Checklist',
      filename: 'SEO-Audit-Checklist-2026.pdf',
      url: 'assets/docs/SEO-Audit-Checklist-2026.pdf',
      type: 'document',
      mimeType: 'application/pdf',
      fileSize: '1.9 MB',
      dimensions: '8 Pages',
      uploadedBy: 'Riya Gill',
      date: 'Sep 27, 2026',
      altText: '120-Point Technical SEO and AI Answer Engine Checklist',
      caption: 'Full technical audit framework for Indian and global brands',
      description: 'In-depth downloadable SEO audit checklist covering Core Web Vitals, Schema markup, and GEO.',
      attachedTo: 'Post: AI Search & SEO'
    },
    {
      id: 'med_showreel_mp4',
      title: 'DigitalSamWorld 2026 Growth Showreel',
      filename: 'agency-showreel-2026.mp4',
      url: 'assets/videos/agency-showreel-2026.mp4',
      type: 'video',
      mimeType: 'video/mp4',
      fileSize: '18.4 MB',
      dimensions: '1920 × 1080 (1080p)',
      uploadedBy: 'Kabir Bajwa',
      date: 'Sep 26, 2026',
      altText: 'DigitalSamWorld 2026 Agency Showreel & Client ROI Highlights',
      caption: '60-second agency reel showcasing campaign results and design work',
      description: 'High-definition 1080p agency video reel for homepage and client presentations.',
      attachedTo: 'Homepage Hero'
    }
  ];

  var DEFAULT_CMS_DATA = {
    lastUpdated: 'Default Configuration',
    settings: deepClone(DEFAULT_SETTINGS),
    appearance: deepClone(DEFAULT_APPEARANCE),
    users: deepClone(DEFAULT_USERS),
    mediaLibrary: deepClone(DEFAULT_MEDIA_LIBRARY),
    permalinkSettings: {
      baseUrl: 'https://digitalsamworld.com',
      structure: 'default',
      autoCanonical: 'yes',
      rewriteLinks: 'yes'
    },
    permalinks: deepClone(DEFAULT_PERMALINKS),
    seo: {
      title: 'DigitalSamWorld | #1 ROI-Driven Digital Marketing Agency in India & Chandigarh',
      description:
        'DigitalSamWorld (digitalsamworld.com) is a full-service 360° digital marketing agency in India headquartered at SCO 64-65, 2nd Floor, Sector 34-A, Chandigarh. We scale brands via SEO, Google Ads, Performance Marketing, Social Media & Web Development. Call +91 8284038539.'
    },
    contact: {
      topbarBadge: '360° ROI-Driven Growth Partner',
      address: 'SCO 64-65, 2nd Floor, Sector 34-A, Chandigarh',
      phoneDisplay: '+91 82840 38539',
      phoneRaw: '8284038539',
      email: 'info@digitalsamworld.com',
      hours: 'Mon – Sat: 9:30 AM – 7:00 PM',
      ctaTag: 'Ready to Scale Your Business?',
      ctaTitle: "Let's Build Your Custom Revenue Engine Today",
      ctaSubtitle:
        'Experience better results with our expert team working for you. Connect with DigitalSamWorld for a free 360° digital audit and competitor breakdown.'
    },
    hero: {
      badge: 'Accelerating Digital Growth Nationwide • Chandigarh HQ',
      titlePrefix: 'Result-Obsessed',
      titleHighlight: 'Digital Marketing Agency',
      titleSuffix: 'in India',
      lead: 'Welcome to DigitalSamWorld (digitalsamworld.com) — a premier 360° digital marketing company committed to driving measurable revenue, qualified leads, and market dominance. Our certified strategists combine AI-powered analytics, high-converting creatives, and full-funnel execution to turn every rupee invested into predictable ROI.',
      primaryBtnText: 'Book Free Strategy Call',
      primaryBtnLink: 'contact.html',
      secondaryBtnText: 'Explore 360° Services',
      secondaryBtnLink: 'services.html',
      formTitle: 'Get Your Free Growth Proposal',
      formSubtitle: 'Speak directly with our senior strategists in Sector 34-A, Chandigarh within 24 hours.',
      metrics: [
        { value: '550+', label: 'Brands Scaled' },
        { value: '4.8x', label: 'Average Client ROAS' },
        { value: '₹25Cr+', label: 'Ad Spend Managed' },
        { value: '98%', label: 'Client Retention' }
      ]
    },
    about: {
      tag: 'About DigitalSamWorld',
      title: 'Leading 360° Digital Marketing Company in India',
      para1:
        'Headquartered at SCO 64-65, 2nd Floor, Sector 34-A, Chandigarh, DigitalSamWorld has grown into one of India\'s fastest-scaling digital marketing agencies. Our growth is built on a clear, performance-first philosophy: we don\'t sell generic "filler packages"—we engineer custom revenue engines.',
      para2:
        'Over the years, we have scaled 550+ brands organically and inorganically across D2C e-commerce, real estate, healthcare, SaaS, education, and B2B enterprises. For us, success is never measured in mere impressions—it is measured by ROAS, qualified pipeline, revenue impact, and sustainable compounding growth.',
      bentoTag: 'Performance-First Mindset',
      bentoTitle: 'Scaling Indian & Global Brands with Precision Analytics',
      bentoDesc:
        'Every campaign we architect is tracked down to cost-per-lead (CPL), customer acquisition cost (CAC), and return on ad spend (ROAS).',
      stat1Num: '320%',
      stat1Title: 'Avg. Organic Traffic Surge',
      stat1Desc: 'Within 6 months of technical & authority SEO execution.',
      stat2Num: '24/7',
      stat2Title: 'Live KPI Dashboards',
      stat2Desc: 'Zero vanity metrics. 100% transparent real-time reporting.',
      checklists: [
        'Consistent & Scalable Lead Gen',
        'Higher Landing Page Conversions',
        'Maximized Paid Media ROAS',
        'AI-Ready SEO, AEO & GEO',
        'Dedicated Account Strategists',
        'Transparent Weekly Sprints'
      ]
    },
    servicesSection: {
      tag: 'Our 360° Capabilities',
      titlePrefix: 'Reinvent Your Digital Presence',
      titleHighlight: 'Across India',
      subtitle:
        'Every service below has a dedicated specialist team and tailored execution framework. Click any service to explore our methodology, deliverables, and case results.',
      items: [
        {
          id: 'srv_seo',
          icon: 'seo',
          title: 'Search Engine Optimization (SEO, AEO & GEO)',
          menuTitle: 'SEO, AEO & GEO Services',
          menuSubtitle: 'Rank #1 on Google & AI search engines with authority SEO',
          desc: 'Dominate Google Page #1, Google Maps, and AI answer engines (ChatGPT, Gemini & Perplexity) with technical SEO, high-DR link building, and semantic content clusters.',
          tags: 'Technical SEO, Local SEO, AI Search (GEO)',
          linkText: 'Explore SEO Services',
          linkUrl: 'seo-services.html'
        },
        {
          id: 'srv_ads',
          icon: 'ads',
          title: 'Google Ads & PPC Management',
          menuTitle: 'Google Ads & PPC',
          menuSubtitle: 'Instant high-intent traffic, Search, Display & Shopping Ads',
          desc: 'Drive instant, high-intent leads and sales with precision-engineered Google Search, Performance Max, Display, YouTube Video, and Google Shopping campaigns.',
          tags: 'Search PPC, Shopping Ads, YouTube Ads',
          linkText: 'Explore Google Ads',
          linkUrl: 'paid-ads.html'
        },
        {
          id: 'srv_perf',
          icon: 'growth',
          title: 'Performance Marketing',
          menuTitle: 'Performance Marketing',
          menuSubtitle: 'Data-driven ROAS scaling across Meta, Google & LinkedIn',
          desc: 'ROI-obsessed multi-channel paid media scaling across Meta (Facebook & Instagram), Google, LinkedIn, and programmatic networks with rigorous A/B creative testing.',
          tags: 'ROAS Scaling, Meta Ads, Retargeting',
          linkText: 'Explore Performance Marketing',
          linkUrl: 'performance-marketing.html'
        },
        {
          id: 'srv_smm',
          icon: 'social',
          title: 'Social Media Marketing',
          menuTitle: 'Social Media Marketing',
          menuSubtitle: 'Viral Reels, brand storytelling, community & ad campaigns',
          desc: 'Build an unforgettable brand community on Instagram, LinkedIn, Facebook, and YouTube with viral short-form Reels, carousel storytelling, and influencer collaborations.',
          tags: 'Instagram Reels, LinkedIn Growth, Influencer PR',
          linkText: 'Explore Social Media',
          linkUrl: 'social-media-marketing.html'
        },
        {
          id: 'srv_web',
          icon: 'web',
          title: 'Website Design & Development',
          menuTitle: 'Website Development',
          menuSubtitle: 'Custom WordPress, Shopify, React & high-converting landing pages',
          desc: 'Lightning-fast, mobile-first custom websites, Shopify/WooCommerce stores, and bespoke web applications engineered for Core Web Vitals and maximum conversion rates.',
          tags: 'WordPress & Custom, Shopify D2C, UI/UX Design',
          linkText: 'Explore Web Development',
          linkUrl: 'website-development.html'
        },
        {
          id: 'srv_content',
          icon: 'content',
          title: 'Content & Blog Writing',
          menuTitle: 'Content & Blog Writing',
          menuSubtitle: 'SEO-optimized articles, web copywriting & thought leadership',
          desc: 'Research-backed SEO blogs, persuasive website copywriting, whitepapers, email sequences, and ad scripts that rank on search engines and convert readers into buyers.',
          tags: 'SEO Blogs, Sales Copywriting, Brand Scripts',
          linkText: 'Explore Content Marketing',
          linkUrl: 'content-marketing.html'
        },
        {
          id: 'srv_leads',
          icon: 'leads',
          title: 'Lead Generation & CRO',
          menuTitle: 'Lead Generation & CRO',
          menuSubtitle: 'B2B & B2C sales funnels, landing page optimization & CRM pipelines',
          desc: 'Fill your sales pipeline with pre-qualified B2B and B2C prospects through high-converting landing pages, WhatsApp automation, and conversion rate optimization.',
          tags: 'B2B & B2C Leads, Landing Pages, CRO Audits',
          linkText: 'Explore Lead Generation',
          linkUrl: 'lead-generation.html'
        },
        {
          id: 'srv_brand',
          icon: 'design',
          title: 'Designing & Branding',
          menuTitle: 'Designing & Branding',
          menuSubtitle: 'Logo identity, brand guidelines, packaging & ad creatives',
          desc: 'Craft a category-defining visual identity with bespoke logo design, brand guidelines, product packaging, pitch decks, and scroll-stopping ad graphics.',
          tags: 'Brand Identity, Packaging Design, Ad Creatives',
          linkText: 'Explore Branding & Design',
          linkUrl: 'graphic-design.html'
        }
      ]
    },
    pagesInitializedV8: true,
    pages: [
      {
        id: 'page_home',
        slug: 'home',
        permalink: 'index.html',
        pageType: 'Core Page',
        author: 'Sameer Malhotra',
        title: '#1 ROI-Driven Digital Marketing Agency in India — DigitalSamWorld',
        menuTitle: 'Home',
        badge: '#1 Performance & AI Search Marketing Agency in India',
        subtitle:
          'We engineer predictable revenue growth through Technical SEO, AI Search (GEO/AEO), Google Ads, Meta Performance Marketing, and 99/100 Speed Web Architecture.',
        featuredImage: 'assets/images/page-default-hero.svg',
        content:
          '## Welcome to DigitalSamWorld (Chandigarh HQ)\nOperating from SCO 64-65, 2nd Floor, Sector 34-A, Chandigarh, DigitalSamWorld partners with 550+ ambitious brands across India to scale qualified leads, organic rankings, and multi-crore Return on Ad Spend (ROAS).\n\n## Core Growth Pillars\n- Search Engine Optimization (SEO, AEO & Generative Engine Optimization)\n- High-ROAS Google Search, Shopping & Performance Max Campaigns\n- Full-Funnel Meta, Instagram & LinkedIn Paid Media\n- Conversion-Engineered Custom Websites & Landing Pages',
        ctaText: 'Book Free Growth Audit',
        ctaLink: 'contact.html',
        showInHeader: 'yes',
        showInFooter: 'yes',
        status: 'Published',
        seoTitle: 'DigitalSamWorld | #1 Digital Marketing Agency in Chandigarh & India',
        seoDesc:
          'DigitalSamWorld (digitalsamworld.com) is India\'s premier 360° digital marketing agency in Sector 34-A, Chandigarh specializing in SEO, Google Ads, Social Media & Web Development.',
        date: 'Sep 30, 2026'
      },
      {
        id: 'page_about',
        slug: 'about-us',
        permalink: 'about.html',
        pageType: 'Core Page',
        author: 'Sameer Malhotra',
        title: 'About DigitalSamWorld — Engineering Measurable Digital Dominance',
        menuTitle: 'About Us',
        badge: 'About DigitalSamWorld • Sector 34-A, Chandigarh',
        subtitle:
          'Founded to replace vanity agency metrics with verifiable revenue growth, transparent reporting, and senior in-house execution.',
        featuredImage: 'assets/images/page-default-hero.svg',
        content:
          '## Our Story & Mission\nLocated at SCO 64-65, 2nd Floor, Sector 34-A, Chandigarh, DigitalSamWorld was built on a single principle: every rupee invested in digital marketing must be accountable to bottom-line revenue.\n\n## Why 550+ Brands Trust Our Squad\n- 100% In-House Google & Meta Certified Strategists\n- ₹25Cr+ Profitable Ad Spend Managed Across D2C, Real Estate, Healthcare & SaaS\n- Live 24/7 Looker Studio Dashboards & Weekly Growth Sprints',
        ctaText: 'Meet Our Strategy Team',
        ctaLink: 'contact.html',
        showInHeader: 'yes',
        showInFooter: 'yes',
        status: 'Published',
        seoTitle: 'About Us | DigitalSamWorld — Digital Marketing Agency Chandigarh',
        seoDesc:
          'Learn how DigitalSamWorld scales 550+ brands from our Sector 34-A, Chandigarh headquarters through data-driven SEO, PPC, and Web Engineering.',
        date: 'Sep 30, 2026'
      },
      {
        id: 'page_services',
        slug: 'services',
        permalink: 'services.html',
        pageType: 'Core Page',
        author: 'Sameer Malhotra',
        title: '360° Digital Marketing Services Engineered for Maximum ROI',
        menuTitle: 'Services',
        badge: 'Full-Funnel Growth Solutions • DigitalSamWorld',
        subtitle:
          'From Technical SEO and AI Search optimization to multi-crore Google Ads, Meta ROAS scaling, and custom web development.',
        featuredImage: 'assets/images/page-default-hero.svg',
        content:
          '## Complete 360° Digital Growth Under One Roof\nExplore our specialized digital marketing departments below, or book a strategy call with our Chandigarh HQ team to build a custom omnichannel growth roadmap.',
        ctaText: 'Get Custom 360° Proposal',
        ctaLink: 'contact.html',
        showInHeader: 'yes',
        showInFooter: 'yes',
        status: 'Published',
        seoTitle: '360° Digital Marketing Services in India | DigitalSamWorld',
        seoDesc:
          'Explore SEO, Google Ads, Performance Marketing, Social Media, Web Development, and Lead Generation services by DigitalSamWorld.',
        date: 'Sep 30, 2026'
      },
      {
        id: 'page_blog',
        slug: 'blog',
        permalink: 'blog.html',
        pageType: 'Core Page',
        author: 'Riya Gill',
        title: 'Digital Growth Playbooks, AI Search & Performance Marketing Insights',
        menuTitle: 'Blog',
        badge: 'DigitalSamWorld Knowledge Hub & Case Playbooks',
        subtitle:
          'Actionable frameworks on Technical SEO, Generative Engine Optimization (GEO), Google Ads, Meta ROAS scaling, and Landing Page CRO.',
        featuredImage: 'assets/images/post-ai-seo.svg',
        content:
          '## Actionable Digital Marketing Playbooks\nWritten by our practicing SEO architects, media buyers, and UI/UX engineers in Sector 34-A, Chandigarh.',
        ctaText: 'Subscribe to Growth Playbooks',
        ctaLink: 'contact.html',
        showInHeader: 'yes',
        showInFooter: 'yes',
        status: 'Published',
        seoTitle: 'Digital Marketing Blog & SEO Playbooks | DigitalSamWorld',
        seoDesc:
          'Read the latest SEO, GEO, AEO, Google Ads, and Conversion Rate Optimization guides from DigitalSamWorld.',
        date: 'Sep 30, 2026'
      },
      {
        id: 'page_portfolio',
        slug: 'portfolio',
        permalink: 'portfolio.html',
        pageType: 'Custom Page',
        author: 'Sameer Malhotra',
        title: 'Our Proven Client Growth Portfolio & Case Studies',
        menuTitle: 'Portfolio',
        badge: '550+ Successful Client Case Studies',
        subtitle:
          'Explore how DigitalSamWorld scales revenue, search authority, and customer acquisition across 550+ brands nationwide.',
        featuredImage: 'assets/images/page-pricing.svg',
        content:
          '## Real Brands. Real Metrics. Predictable Revenue Growth.\nBrowse our client portfolio across Search Engine Optimization, Google Ads, Performance Marketing, and Custom Web Engineering executed from our Chandigarh headquarters.\n\n### 1. Tricity Prime Realty Group (Chandigarh)\n- Service: SEO & Local GEO\n- Results: +340% Organic Search Traffic & ₹18.4 Cr Sales Pipeline Generated\n\n### 2. VedaGlow Ayurvedic Wellness (Pan-India)\n- Service: Performance Marketing & Meta Ads\n- Results: 5.8x Blended ROAS & ₹1.4 Cr Monthly Recurring Revenue\n\n### 3. Apex Cloud Technologies (B2B SaaS)\n- Service: B2B SaaS Growth & Technical SEO\n- Results: -54% Cost Per Qualified Lead & 185+ Enterprise Demos / Mo\n\n### 4. Chandigarh Elite Dental Care\n- Service: Google Ads & PPC\n- Results: +280% Implants Inquiries & ₹420 Average Cost Per Lead\n\n### 5. StyleCouture Luxury Fashion\n- Service: Custom Headless Shopify Development\n- Results: 0.8s Page Load Speed & 4.2% E-Commerce Conversion Rate',
        ctaText: 'Request Custom Growth Proposal',
        ctaLink: 'contact.html',
        showInHeader: 'yes',
        showInFooter: 'yes',
        status: 'Published',
        seoTitle: 'Client Growth Portfolio & Case Studies | DigitalSamWorld',
        seoDesc:
          'Explore DigitalSamWorld client case studies, SEO rankings, Google Ads ROAS transformations, and web development portfolio from Sector 34-A, Chandigarh.',
        date: 'Sep 30, 2026'
      },
      {
        id: 'page_pricing',
        slug: 'pricing-packages',
        permalink: 'page.html?slug=pricing-packages',
        pageType: 'Custom Page',
        author: 'Sameer Malhotra',
        title: 'Transparent 360° Digital Marketing Pricing & Growth Plans',
        menuTitle: 'Pricing',
        badge: 'Custom ROI-Focused Retainers • No Hidden Fees',
        subtitle:
          'Flexible monthly growth retainers tailored to your business stage, target market, and revenue goals. Partner with our Chandigarh HQ squad.',
        featuredImage: 'assets/images/page-pricing.svg',
        content:
          '## Why DigitalSamWorld Does Not Believe in Cheap "Filler" Packages\nAt DigitalSamWorld (digitalsamworld.com), every rupee you invest is tied to clear KPIs—qualified leads, organic rankings, and Return on Ad Spend (ROAS). While every client receives a custom roadmap, our three core growth tiers below provide transparent starting benchmarks.\n\n## Tier 1: Local & Startup Accelerator (₹25,000 – ₹45,000 / Month)\nIdeal for clinics, local service businesses, real estate consultants, and emerging startups looking to dominate Chandigarh, Tricity, or regional markets.\n- Complete Technical & Local SEO (Google Business Profile #1 Ranking)\n- High-Intent Google Search Ads or Meta Lead Generation Setup\n- 12 Custom Social Media Graphics & 4 Viral Instagram Reels Monthly\n- Conversion-Optimized Landing Page & WhatsApp Lead Integration\n- Bi-Weekly KPI & Lead Attribution Reporting\n\n## Tier 2: National Growth & D2C Scale Engine (₹50,000 – ₹95,000 / Month)\nEngineered for scaling D2C e-commerce brands, multi-city enterprises, educational institutions, and B2B companies targeting pan-India growth.\n- Comprehensive SEO, AEO & GEO (AI Search Optimization for ChatGPT & Gemini)\n- Full-Funnel Google Ads (Search, Performance Max, Shopping & YouTube)\n- Meta & LinkedIn Paid Media Scaling with Weekly Creative A/B Testing\n- 4 Long-Form Authority Blog Articles & Landing Page CRO Sprints\n- 24/7 Live Looker Studio Dashboard & Dedicated Account Strategist\n\n## Tier 3: Enterprise 360° Revenue Department (Custom Retainer)\nYour dedicated full-stack growth pod operating from SCO 64-65, 2nd Floor, Sector 34-A, Chandigarh.\n- Dedicated Senior SEO Architect, PPC Media Buyer, UI/UX Developer & Video Editor\n- Multi-Crore Ad Spend Management with Algorithmic Bid Scripting\n- Custom Web/Shopify Development, CRM Automation & Revenue Attribution\n- Weekly Executive Strategy Sprints with Founder Sameer Malhotra',
        ctaText: 'Request Your Custom Pricing Proposal',
        ctaLink: 'contact.html',
        showInHeader: 'yes',
        showInFooter: 'yes',
        status: 'Published',
        seoTitle: 'Digital Marketing Pricing & Packages in India | DigitalSamWorld',
        seoDesc:
          'Explore transparent SEO, Google Ads, Social Media, and 360° digital marketing packages from DigitalSamWorld in Sector 34-A, Chandigarh.',
        date: 'Sep 30, 2026'
      },
      {
        id: 'page_careers',
        slug: 'careers',
        permalink: 'page.html?slug=careers',
        pageType: 'Custom Page',
        author: 'Sameer Malhotra',
        title: 'Careers at DigitalSamWorld — Build the Future of Digital Growth',
        menuTitle: 'Careers',
        badge: 'We Are Hiring in Sector 34-A, Chandigarh',
        subtitle:
          'Join a fast-paced team of SEO engineers, performance marketers, designers, and developers scaling 550+ brands across India.',
        featuredImage: 'assets/images/page-careers.svg',
        content:
          '## Life at DigitalSamWorld (Chandigarh HQ)\nLocated at SCO 64-65, 2nd Floor, Sector 34-A, Chandigarh, DigitalSamWorld is where ambitious digital marketers do the best work of their careers. We don\'t believe in micromanagement or outdated agency hierarchies—we reward curiosity, data-driven experimentation, and real client impact.\n\n## Why Join Our Team?\n- Work Directly on High-Growth D2C, Real Estate, SaaS & Healthcare Brands\n- Access Premium AI, SEO (Ahrefs, Semrush) & Analytics Tools\n- Fast-Track Career Progression & Performance Bonuses\n- Collaborative Studio Culture in the Heart of Sector 34-A, Chandigarh\n\n## Current Open Positions\n- Senior Performance Marketing Specialist (Google Ads & Meta Ads — 3+ Years Exp)\n- Technical SEO & AI Search (GEO) Analyst (2+ Years Exp)\n- Short-Form Video Editor & Motion Designer (Reels / YouTube Shorts)\n- Full-Stack Web & Shopify Developer (WordPress, Liquid, React)\n\n## How to Apply\nSend your updated CV, portfolio links, and a short note about the best campaign you have ever executed to info@digitalsamworld.com or WhatsApp us at +91 82840 38539.',
        ctaText: 'Apply Now / Contact HR',
        ctaLink: 'contact.html',
        showInHeader: 'no',
        showInFooter: 'yes',
        status: 'Published',
        seoTitle: 'Careers & Digital Marketing Jobs in Chandigarh | DigitalSamWorld',
        seoDesc:
          'Apply for SEO, Google Ads, Social Media, and Web Development jobs at DigitalSamWorld, SCO 64-65, 2nd Floor, Sector 34-A, Chandigarh.',
        date: 'Sep 30, 2026'
      },
      {
        id: 'page_contact',
        slug: 'contact-us',
        permalink: 'contact.html',
        pageType: 'Core Page',
        author: 'Sameer Malhotra',
        title: 'Let\'s Build Your Predictable Digital Growth Engine Today',
        menuTitle: 'Contact Us',
        badge: 'Book Your Free 30-Minute Strategy Audit • +91 82840 38539',
        subtitle:
          'Visit our headquarters at SCO 64-65, 2nd Floor, Sector 34-A, Chandigarh, or schedule a live video teardown of your current SEO and ad campaigns.',
        featuredImage: 'assets/images/page-default-hero.svg',
        content:
          '## Direct Agency Contact Details\n- Headquarters: SCO 64-65, 2nd Floor, Sector 34-A, Chandigarh\n- Direct Phone & WhatsApp: +91 82840 38539\n- Official Email: info@digitalsamworld.com\n- Working Hours: Mon – Sat, 9:30 AM – 7:00 PM IST',
        ctaText: 'Call +91 82840 38539 Now',
        ctaLink: 'tel:8284038539',
        showInHeader: 'yes',
        showInFooter: 'yes',
        status: 'Published',
        seoTitle: 'Contact DigitalSamWorld | SCO 64-65, Sector 34-A, Chandigarh',
        seoDesc:
          'Contact DigitalSamWorld at +91 82840 38539 or visit SCO 64-65, 2nd Floor, Sector 34-A, Chandigarh for a free digital marketing consultation.',
        date: 'Sep 30, 2026'
      },
      {
        id: 'page_privacy',
        slug: 'privacy-policy',
        permalink: 'privacy-policy.html',
        pageType: 'Legal Page',
        author: 'Sameer Malhotra',
        title: 'Privacy Policy — DigitalSamWorld (digitalsamworld.com)',
        menuTitle: 'Privacy Policy',
        badge: 'Legal & Data Protection Compliance',
        subtitle:
          'How DigitalSamWorld collects, protects, and processes client and visitor information across digitalsamworld.com.',
        featuredImage: 'assets/images/page-legal.svg',
        content:
          '## 1. Information We Collect\nWhen you submit an inquiry form, request a free digital marketing audit, or contact us via WhatsApp/phone (+91 82840 38539), we collect your name, business email, phone number, website URL, and project requirements solely to prepare your consultation.\n\n## 2. How We Use & Protect Your Data\nWe never sell, rent, or trade your personal or business contact details to third-party list brokers. All lead submissions are encrypted and restricted to senior strategy personnel at DigitalSamWorld.\n\n## 3. Cookies & Analytics\nOur website uses standard first-party analytics cookies (Google Analytics 4, Google Tag Manager, and Meta Pixel) to measure page speed, user experience, and campaign attribution.\n\n## 4. Contact Our Grievance & Privacy Officer\nDigitalSamWorld, SCO 64-65, 2nd Floor, Sector 34-A, Chandigarh | Phone: +91 82840 38539 | Email: info@digitalsamworld.com.',
        ctaText: 'Contact Privacy Team',
        ctaLink: 'contact.html',
        showInHeader: 'no',
        showInFooter: 'yes',
        status: 'Published',
        seoTitle: 'Privacy Policy | DigitalSamWorld (digitalsamworld.com)',
        seoDesc: 'Read the official Privacy Policy and data protection practices of DigitalSamWorld.',
        date: 'Sep 30, 2026'
      },
      {
        id: 'page_disclaimer',
        slug: 'disclaimer',
        permalink: 'disclaimer.html',
        pageType: 'Legal Page',
        author: 'Sameer Malhotra',
        title: 'Website & Marketing Performance Disclaimer — DigitalSamWorld',
        menuTitle: 'Disclaimer',
        badge: 'Official Transparency & Earnings Disclaimer',
        subtitle:
          'Important disclosures regarding case study metrics, search engine algorithms, and third-party advertising platforms.',
        featuredImage: 'assets/images/page-legal.svg',
        content:
          '## 1. Case Study & ROI Disclosures\nAll revenue figures, ROAS multiples, and keyword ranking milestones shared on digitalsamworld.com reflect real historical results achieved for active clients. However, individual results vary based on industry competition, product-market fit, historical domain authority, and ad budget.\n\n## 2. Third-Party Platform Policies\nDigitalSamWorld executes campaigns across Google, Meta, LinkedIn, YouTube, and Shopify. We are an independent agency headquartered at SCO 64-65, 2nd Floor, Sector 34-A, Chandigarh and are not liable for unilateral algorithm updates or policy changes enacted by third-party platforms.',
        ctaText: 'Speak With Our Team',
        ctaLink: 'contact.html',
        showInHeader: 'no',
        showInFooter: 'yes',
        status: 'Published',
        seoTitle: 'Website Disclaimer | DigitalSamWorld',
        seoDesc: 'Official website and marketing performance disclaimer for DigitalSamWorld (digitalsamworld.com).',
        date: 'Sep 30, 2026'
      },
      {
        id: 'page_terms',
        slug: 'terms-and-conditions',
        permalink: 'terms-and-conditions.html',
        pageType: 'Legal Page',
        author: 'Sameer Malhotra',
        title: 'Terms & Conditions of Service — DigitalSamWorld',
        menuTitle: 'Terms & Conditions',
        badge: 'Standard Service Agreement & Website Terms',
        subtitle:
          'Governing terms for using digitalsamworld.com and engaging DigitalSamWorld for digital marketing and web development retainers.',
        featuredImage: 'assets/images/page-legal.svg',
        content:
          '## 1. Scope of Services & Deliverables\nAll digital marketing retainers, SEO sprints, paid media campaigns, and web development projects are governed by a mutually signed Statement of Work (SOW) outlining monthly deliverables, timelines, and reporting cadences.\n\n## 2. Intellectual Property & Ad Account Ownership\nClients retain 100% ownership of their domain names, Google Ads accounts, Meta Business Managers, and custom website code upon full settlement of invoices.\n\n## 3. Governing Law & Jurisdiction\nThese Terms & Conditions are governed by the laws of India, with exclusive jurisdiction in the courts of Chandigarh (HQ: SCO 64-65, 2nd Floor, Sector 34-A, Chandigarh).',
        ctaText: 'Contact Legal & Billing Desk',
        ctaLink: 'contact.html',
        showInHeader: 'no',
        showInFooter: 'yes',
        status: 'Published',
        seoTitle: 'Terms & Conditions | DigitalSamWorld Chandigarh',
        seoDesc: 'Standard terms and conditions of service for DigitalSamWorld (digitalsamworld.com).',
        date: 'Sep 30, 2026'
      }
    ],
    postCategories: [
      {
        id: 'cat_seo',
        name: 'SEO & AI Search',
        slug: 'seo-ai-search',
        parent: 'None',
        color: '#4F46E5',
        description: 'Technical SEO, Local SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO) for ChatGPT & Google AI Overviews.'
      },
      {
        id: 'cat_ppc',
        name: 'Google Ads & PPC',
        slug: 'google-ads-ppc',
        parent: 'None',
        color: '#059669',
        description: 'High-ROAS Google Search, Performance Max, Shopping Ads, YouTube Ads, and paid acquisition playbooks.'
      },
      {
        id: 'cat_cro',
        name: 'Web Development & CRO',
        slug: 'web-development-cro',
        parent: 'None',
        color: '#D97706',
        description: 'Speed-engineered landing pages, Core Web Vitals, Shopify/WordPress architecture, and Conversion Rate Optimization.'
      },
      {
        id: 'cat_social',
        name: 'Social Media & Meta Ads',
        slug: 'social-media-meta-ads',
        parent: 'None',
        color: '#E11D48',
        description: 'Viral Instagram Reels, Meta Ads creative testing, D2C e-commerce scaling, and LinkedIn executive branding.'
      },
      {
        id: 'cat_local',
        name: 'Local SEO & Tricity Growth',
        slug: 'local-seo-tricity',
        parent: 'SEO & AI Search',
        color: '#0891B2',
        description: 'Google Business Profile #1 rankings and local lead generation for Chandigarh, Mohali, Panchkula, and multi-city brands.'
      }
    ],
    postTags: [
      { id: 'tag_1', name: 'AI SEO', slug: 'ai-seo', description: 'Ranking inside ChatGPT, Gemini, and Google AI Overviews.' },
      { id: 'tag_2', name: 'GEO', slug: 'geo', description: 'Generative Engine Optimization frameworks.' },
      { id: 'tag_3', name: 'Answer Engine Optimization', slug: 'answer-engine-optimization', description: 'Entity schema and direct Q&A optimization.' },
      { id: 'tag_4', name: 'Google Rankings', slug: 'google-rankings', description: 'Page #1 organic search dominance.' },
      { id: 'tag_5', name: 'Google Ads', slug: 'google-ads', description: 'High-intent paid search and display campaigns.' },
      { id: 'tag_6', name: 'PPC Management', slug: 'ppc-management', description: 'Pay-per-click bid and budget optimization.' },
      { id: 'tag_7', name: 'Performance Max', slug: 'performance-max', description: 'Google PMax asset groups and audience signals.' },
      { id: 'tag_8', name: 'Lead Generation', slug: 'lead-generation', description: 'Qualified B2B and B2C buyer inquiry generation.' },
      { id: 'tag_9', name: 'Conversion Rate Optimization', slug: 'conversion-rate-optimization', description: 'Turning existing website traffic into revenue.' },
      { id: 'tag_10', name: 'Landing Pages', slug: 'landing-pages', description: 'High-speed paid media destination pages.' },
      { id: 'tag_11', name: 'Web Design', slug: 'web-design', description: 'Modern UI/UX design and responsive web architecture.' },
      { id: 'tag_12', name: 'Core Web Vitals', slug: 'core-web-vitals', description: '99/100 Google PageSpeed & LCP optimization.' },
      { id: 'tag_13', name: 'Meta Ads', slug: 'meta-ads', description: 'Facebook & Instagram ROAS scaling.' },
      { id: 'tag_14', name: 'Local SEO Chandigarh', slug: 'local-seo-chandigarh', description: 'Dominating Google Maps & Local Pack in Chandigarh.' }
    ],
    posts: [
      {
        id: 'post_1',
        slug: 'ai-search-geo-aeo-seo-india-2026',
        permalink: 'post.html?slug=ai-search-geo-aeo-seo-india-2026',
        title: 'How AI Search (GEO & AEO) Is Redefining SEO in India in 2026',
        category: 'SEO & AI Search',
        author: 'Riya Gill',
        authorRole: 'Lead SEO, AEO & Content Architect',
        date: 'Sep 30, 2026',
        readTime: '6 Min Read',
        coverTheme: 'indigo',
        featuredImage: 'assets/images/post-ai-seo.svg',
        excerpt:
          'Ranking on Google Page #1 is only half the battle today. Learn how Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) put your brand inside ChatGPT, Gemini, and Google AI Overviews.',
        tags: 'AI SEO, GEO, Answer Engine Optimization, Google Rankings',
        status: 'Published',
        content:
          '## The Shift From Traditional Keywords to AI Citations\nSearch behavior in India has evolved dramatically. Buyers no longer type two-word phrases into Google and click ten blue links—they ask conversational, high-intent questions on Google AI Overviews, ChatGPT, Perplexity, and Gemini.\n\nAt DigitalSamWorld in Sector 34-A, Chandigarh, we have pioneered a unified Search + AI visibility framework that ensures our clients rank #1 on traditional Google SERPs while also being cited as the top recommended brand inside AI answer engines.\n\n## 3 Pillars of Generative Engine Optimization (GEO)\n- Entity-First Schema Markup: Implementing rich Organization, Service, FAQ, and Review JSON-LD structured data so LLMs can verify your credentials, pricing, and location immediately.\n- High-Information-Gain Content Clusters: Replacing generic blog filler with original case metrics, comparison tables, and direct Q&A blocks that AI engines extract verbatim.\n- Digital PR & Brand Mentions: Building authority citations across high-DR industry publications, local directories, and trusted forums.\n\n## How to Audit Your Brand\'s AI Visibility Today\nOpen ChatGPT or Google Gemini and ask: "Who is the best provider of [your service] in [your city]?" If your company is not cited in the top 3 recommendations, your competitors are capturing your highest-intent buyers.\n\n### Ready to Future-Proof Your Organic Traffic?\nConnect with our SEO & GEO architects at SCO 64-65, 2nd Floor, Sector 34-A, Chandigarh or call +91 82840 38539 for a free AI Search Visibility Audit.'
      },
      {
        id: 'post_2',
        slug: 'google-ads-pmax-strategies-lower-cpl',
        permalink: 'post.html?slug=google-ads-pmax-strategies-lower-cpl',
        title: '7 Google Ads & Performance Max Strategies to Cut Your CPL by 50%',
        category: 'Google Ads & PPC',
        author: 'Aarav Khanna',
        authorRole: 'Head of Paid Media & Google Ads',
        date: 'Sep 26, 2026',
        readTime: '5 Min Read',
        coverTheme: 'emerald',
        featuredImage: 'assets/images/post-google-ads.svg',
        excerpt:
          'Wasting budget on irrelevant clicks and low-quality leads? Discover the exact Google Search & Performance Max architecture we use to manage ₹25Cr+ in profitable ad spend.',
        tags: 'Google Ads, PPC Management, Performance Max, Lead Generation',
        status: 'Published',
        content:
          '## Why 80% of Google Ads Accounts Bleed Budget\nAfter auditing hundreds of Google Ads accounts across real estate, healthcare, D2C e-commerce, and B2B services in India, we see the same three costly mistakes: broad match keywords without negative lists, sending paid traffic to slow homepages, and optimizing for fake form fills instead of qualified revenue.\n\n## Our 7-Step High-ROAS Blueprint\n- High-Intent Exact & Phrase Match Segmentation: Isolate bottom-of-funnel commercial keywords ("near me", "pricing", "hire", "consultation") into dedicated ad groups.\n- Offline Conversion Tracking (OCT): Feed CRM lead quality and closed-deal data back into Google Ads so Smart Bidding optimizes for actual buyers, not spam bots.\n- Negative Keyword Fortresses: Exclude job seekers, freebie hunters, and competitor employee searches from Day 1.\n- Performance Max Asset Group Discipline: Separate PMax asset groups by product margin and audience signals rather than lumping everything into one campaign.\n- Speed-Engineered Dedicated Landing Pages: Every ad group should route to a mobile-first page loading in under 1.2 seconds with instant WhatsApp and call triggers.\n\n## Real Results From Our Chandigarh Media Buying Desk\nUsing this exact framework, we recently reduced Cost Per Lead (CPL) by 62% for a luxury real estate developer in Tricity while scaling their qualified site visits by 380%.'
      },
      {
        id: 'post_3',
        slug: 'high-converting-landing-pages-cro-guide',
        permalink: 'post.html?slug=high-converting-landing-pages-cro-guide',
        title: 'Why Custom High-Speed Landing Pages Double Your Paid Media ROAS',
        category: 'Web Development & CRO',
        author: 'Kabir Bajwa',
        authorRole: 'Principal Web & UI/UX Engineer',
        date: 'Sep 20, 2026',
        readTime: '4 Min Read',
        coverTheme: 'amber',
        featuredImage: 'assets/images/post-cro-landing.svg',
        excerpt:
          'Even the best Google or Meta ad campaign will fail if your website takes 5 seconds to load. Here is how Conversion Rate Optimization (CRO) turns existing traffic into twice the revenue.',
        tags: 'Conversion Rate Optimization, Landing Pages, Web Design, Core Web Vitals',
        status: 'Published',
        content:
          '## Your Landing Page Is Your 24/7 Salesperson\nImagine paying ₹150 per click on Google Ads, only for 98% of visitors to bounce because your page is cluttered, slow, or confusing on mobile devices. When you double your landing page conversion rate from 2% to 4%, you effectively cut your Customer Acquisition Cost (CAC) in half without spending an extra rupee on ads.\n\n## The Anatomy of a 10%+ Converting Landing Page\n- Above-the-Fold Clarity: Within 3 seconds, visitors must know what you offer, who it is for, and why they should trust you.\n- Frictionless 2-Step Lead Capture: Keep forms concise above the fold and pair them with one-tap WhatsApp and phone call buttons.\n- Verifiable Social Proof: Display real client KPIs, video testimonials, industry certifications, and recognizable client logos.\n- 99/100 Core Web Vitals Performance: Clean semantic code, compressed vector assets, and zero bloated third-party scripts.\n\n## Need a Conversion Audit of Your Website?\nReach out to DigitalSamWorld at +91 82840 38539 and our UI/UX engineering team will record a personalized teardown of your current website.'
      },
      {
        id: 'post_4',
        slug: 'meta-ads-reels-creative-testing-d2c-roas',
        permalink: 'post.html?slug=meta-ads-reels-creative-testing-d2c-roas',
        title: 'How We Scale D2C Brands to 5.4x ROAS Using Meta Reels Creative Sprints',
        category: 'Social Media & Meta Ads',
        author: 'Sameer Malhotra',
        authorRole: 'Founder & Chief Growth Strategist',
        date: 'Sep 15, 2026',
        readTime: '5 Min Read',
        coverTheme: 'cyber',
        featuredImage: 'assets/images/post-meta-ads.svg',
        excerpt:
          'In modern Meta advertising, your creative IS your targeting. See our 3-second hook testing framework that scaled Velvet Loom Menswear by +290% in monthly revenue.',
        tags: 'Meta Ads, Lead Generation, Conversion Rate Optimization',
        status: 'Published',
        content:
          '## Creative Is the New Targeting on Meta\nSince Meta introduced Advantage+ Shopping and broad algorithmic targeting, manual interest stacking no longer drives outsized returns. Instead, Meta\'s AI reads your video frames, audio hooks, and on-screen captions to decide which buyers see your ad.\n\n## Our Weekly Creative Testing Matrix\n- 3-Second Pattern-Interrupt Hooks: Testing 3 distinct opening hooks for every core video concept.\n- Founder Story & UGC Mashups: Combining authentic customer unboxings with authority proof points.\n- Offer & Bundle Framing: Testing AOV-boosting bundles on dedicated Shopify landing pages.'
      },
      {
        id: 'post_5',
        slug: 'local-seo-google-business-profile-chandigarh-guide',
        permalink: 'post.html?slug=local-seo-google-business-profile-chandigarh-guide',
        title: 'Local SEO Playbook: Ranking #1 on Google Maps in Chandigarh & Tricity',
        category: 'Local SEO & Tricity Growth',
        author: 'Riya Gill',
        authorRole: 'Lead SEO, AEO & Content Architect',
        date: 'Sep 10, 2026',
        readTime: '5 Min Read',
        coverTheme: 'indigo',
        featuredImage: 'assets/images/post-local-seo.svg',
        excerpt:
          'Want daily phone calls from high-intent local buyers searching "near me"? Follow our 5-step Google Business Profile & local citation blueprint.',
        tags: 'Local SEO Chandigarh, Google Rankings, Lead Generation',
        status: 'Published',
        content:
          '## Why the Google Local 3-Pack Captures 68% of Calls\nWhen someone in Chandigarh, Mohali, or Panchkula searches for a clinic, real estate developer, architect, or agency, over two-thirds of mobile users tap directly on the top three Google Maps results.\n\n## 5 Steps to Dominate Local Pack Rankings\n- Primary & Secondary GBP Category Precision\n- Keyword-Rich Service & Product Catalogs\n- Consistent NAP Citations (SCO 64-65, 2nd Floor, Sector 34-A, Chandigarh)\n- Geo-Tagged Office & Team Photography\n- Velocity of Verified Client Reviews with Service Keywords'
      }
    ],
    whyUs: {
      tag: 'Why Choose DigitalSamWorld?',
      titlePrefix: 'When You Choose Us, You Choose',
      titleHighlight: 'Measurable Excellence',
      subtitle:
        'We eliminate guesswork from digital marketing. Here is why ambitious founders and CMOs across India trust our Chandigarh headquarters.',
      items: [
        {
          badge: '01 • PROVEN TRACK RECORD',
          title: '550+ Brands Scaled Across India',
          desc: 'From ambitious startups in Chandigarh and Delhi NCR to established enterprises in Mumbai and Bengaluru, over 550+ businesses trust our growth playbooks.'
        },
        {
          badge: '02 • CUSTOMISED SOLUTIONS',
          title: 'Bespoke Strategies, Zero Cookie-Cutter Plans',
          desc: 'We never push "one-size-fits-all" filler packages. Every roadmap is custom-engineered around your unit economics, margins, and buyer journey.'
        },
        {
          badge: '03 • HIGH AD SPENDS MANAGED',
          title: '₹25Cr+ Managed on Google & Meta',
          desc: 'Our media buyers manage substantial multi-crore budgets with 90%+ optimization scores, unlocking lower CPCs and higher conversion volumes.'
        },
        {
          badge: '04 • CERTIFIED SPECIALISTS',
          title: 'Google & Meta Certified In-House Talent',
          desc: 'Your account is never handed off to junior freelancers. Seasoned SEO architects, PPC analysts, and senior designers execute every sprint.'
        },
        {
          badge: '05 • TRANSPARENT COMMUNICATION',
          title: 'Live Reporting & Weekly Growth Calls',
          desc: 'Track every rupee spent with real-time Looker Studio dashboards, weekly WhatsApp/Slack updates, and crystal-clear ROI attribution.'
        },
        {
          badge: '06 • ON-TIME DELIVERY',
          title: 'Strict SLA Timelines & Rapid Execution',
          desc: 'In digital marketing, speed wins. We launch campaigns, landing pages, and creative iterations on schedule—every single time.'
        }
      ]
    },
    caseStudies: {
      tag: 'Client Growth Stories',
      titlePrefix: 'How We Helped Businesses',
      titleHighlight: 'Scale Rapidly',
      subtitle: 'Real brands, real budgets, and verifiable bottom-line transformation across India.',
      items: [
        {
          category: 'Real Estate & Luxury Housing',
          title: 'Tricity Pinnacle Developers',
          desc: 'A premier luxury residential developer in Chandigarh & Mohali needed high-net-worth buyer inquiries and weekend site visits for their ₹1.8Cr+ apartments.',
          kpi1Val: '+380%',
          kpi1Label: 'Qualified Site Visits',
          kpi2Val: '-62%',
          kpi2Label: 'Cost Per Lead (CPL)',
          services: 'Google Search Ads, Meta Lead Generation, High-Converting Microsite & CRM Automation.'
        },
        {
          category: 'D2C Apparel & Lifestyle',
          title: 'Velvet Loom Menswear',
          desc: 'A sustainable luxury menswear label sought to scale pan-India online orders while maintaining profitable return on ad spend across Meta and Google Shopping.',
          kpi1Val: '5.4x',
          kpi1Label: 'Blended ROAS',
          kpi2Val: '+290%',
          kpi2Label: 'Monthly D2C Revenue',
          services: 'Performance Marketing, Shopify CRO, Performance Max & Viral Instagram Reels.'
        },
        {
          category: 'Healthcare & Multi-Specialty',
          title: 'Apex Care & Dental Align',
          desc: 'A multi-city chain of dental & aesthetic clinics wanted to dominate local search rankings and generate daily patient bookings without relying solely on ads.',
          kpi1Val: '#1 Rank',
          kpi1Label: '45+ High-Intent Keywords',
          kpi2Val: '+415%',
          kpi2Label: 'Organic Patient Calls',
          services: 'Local SEO, Technical SEO, Content Marketing & Google Business Profile Optimization.'
        }
      ]
    },
    team: {
      tag: 'Core Leadership & Specialists',
      titlePrefix: 'Meet Our',
      titleHighlight: 'Experienced Professionals',
      subtitle: 'The strategists, engineers, and creative minds driving your growth from Sector 34-A, Chandigarh.',
      members: [
        {
          initials: 'SM',
          name: 'Sameer Malhotra',
          role: 'Founder & Chief Growth Strategist',
          bio: '10+ years scaling 550+ Indian & global brands through full-funnel performance marketing and revenue architecture.'
        },
        {
          initials: 'AK',
          name: 'Aarav Khanna',
          role: 'Head of Paid Media & Google Ads',
          bio: 'Google Partner certified specialist managing multi-crore search, PMax, and YouTube ad portfolios with 5x+ ROAS.'
        },
        {
          initials: 'RG',
          name: 'Riya Gill',
          role: 'Lead SEO, AEO & Content Architect',
          bio: 'Expert in technical SEO, semantic authority clusters, and ranking brands across Google and AI search engines.'
        },
        {
          initials: 'KB',
          name: 'Kabir Bajwa',
          role: 'Principal Web & UI/UX Engineer',
          bio: 'Full-stack architect crafting 99/100 PageSpeed websites, Shopify stores, and conversion-engineered landing pages.'
        }
      ]
    },
    testimonials: {
      tag: 'Verified Client Reviews',
      titlePrefix: 'Their Words,',
      titleHighlight: 'Our Pride!',
      subtitle: 'Discover why founders, directors, and marketing heads rate DigitalSamWorld 4.9/5 across India.',
      items: [
        {
          quote:
            '"We partnered with DigitalSamWorld for 360° digital marketing and custom web development over 18 months ago. Our organic traffic tripled and our Google Ads cost-per-lead dropped by half. Easily the most transparent agency in Chandigarh!"',
          initials: 'VK',
          name: 'Vikramjit Singh',
          role: 'Managing Director, Horizon Infra Group'
        },
        {
          quote:
            '"DigitalSamWorld\'s performance marketing and Meta Ads creative strategy transformed our D2C store. They act like a true extension of our internal team, sticking to every timeline and scaling our ROAS consistently above 5x."',
          initials: 'NM',
          name: 'Neha Mehta',
          role: 'Founder, Aura Botanicals India'
        },
        {
          quote:
            '"Before meeting the team at Sector 34-A Chandigarh, we wasted lakhs on agencies that only reported clicks. DigitalSamWorld redesigned our landing pages and built a lead generation machine that fills our clinic calendar every week."',
          initials: 'DS',
          name: 'Dr. Siddharth Verma',
          role: 'Chief Director, SmileCraft Dental & Aesthetics'
        }
      ]
    },
    faqs: {
      tag: 'Uncover Clarity, Navigate Success',
      titlePrefix: 'Frequently Asked',
      titleHighlight: 'Questions',
      subtitle: 'Everything you need to know about partnering with DigitalSamWorld (digitalsamworld.com).',
      items: [
        {
          q: 'Why should I hire DigitalSamWorld in India rather than doing marketing in-house?',
          a: 'Running ads or posting content appears simple on the surface, but generating consistent, profitable ROI requires specialized expertise across technical SEO, algorithmic media buying, conversion copywriting, UI/UX, and analytics attribution. When you partner with DigitalSamWorld, you get an entire certified growth department for less than the cost of hiring a single senior manager—saving time, avoiding costly ad-spend mistakes, and accelerating results.'
        },
        {
          q: 'What is 360° Digital Marketing and what does it include?',
          a: "360° Digital Marketing is our holistic, full-funnel approach that unifies Search Engine Optimization (SEO, AEO & GEO), Google Ads (PPC), Performance Marketing (Meta & LinkedIn Ads), Social Media Management, Content & Blog Writing, Conversion Rate Optimization (CRO), Graphic Branding, and Custom Web Development so every channel compounds your brand's online revenue."
        },
        {
          q: 'How soon can I expect to see measurable results?',
          a: 'Timelines depend on the channels deployed. Paid advertising campaigns (Google Search Ads, Meta Lead Generation, and Shopping Ads) begin generating traffic, inquiries, and sales within 48 to 72 hours of launch. Organic channels like Technical SEO, Content Marketing, and Authority Building typically show strong momentum within 60–90 days and compound into dominant page-one rankings over 3 to 6 months.'
        },
        {
          q: 'How is DigitalSamWorld different from other digital marketing agencies in India?',
          a: 'We never sell pre-packaged "filler plans" that focus on vanity likes or meaningless impressions. Every strategy we build at our Sector 34-A, Chandigarh headquarters is custom-engineered around your unit economics—tracking Cost Per Lead (CPL), Customer Acquisition Cost (CAC), and Return on Ad Spend (ROAS) with 100% transparent reporting.'
        },
        {
          q: 'Where is DigitalSamWorld located and can we meet in person?',
          a: 'Yes! Our headquarters is located at SCO 64-65, 2nd Floor, Sector 34-A, Chandigarh. You are always welcome to visit our office for an in-person strategy session, or schedule a video consultation via Google Meet/Zoom from anywhere in India or abroad. Call us directly at +91 8284038539 to book your slot.'
        }
      ]
    },
    cities: {
      hqCity: '★ Chandigarh (HQ - Sector 34-A)',
      otherCities:
        'Delhi NCR, Mumbai, Bengaluru, Gurugram, Noida, Mohali & Panchkula, Hyderabad, Pune, Ahmedabad, Jaipur, Indore, Ludhiana, Kolkata'
    }
  };

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function cleanSlugOnly(str) {
    return String(str || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function formatDateBySetting(dateStr, format) {
    if (!dateStr) return '';
    var d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    var day = String(d.getDate()).padStart(2, '0');
    var monthNum = String(d.getMonth() + 1).padStart(2, '0');
    var year = d.getFullYear();
    var shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var fullMonths = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    if (format === 'DD/MM/YYYY') return day + '/' + monthNum + '/' + year;
    if (format === 'YYYY-MM-DD') return year + '-' + monthNum + '-' + day;
    if (format === 'DD Month YYYY') return day + ' ' + fullMonths[d.getMonth()] + ' ' + year;
    return shortMonths[d.getMonth()] + ' ' + d.getDate() + ', ' + year;
  }

  function normalizeSettings(s) {
    var def = deepClone(DEFAULT_SETTINGS);
    if (!s) return def;
    return {
      general: Object.assign(def.general, s.general || {}),
      writing: Object.assign(def.writing, s.writing || {}),
      reading: Object.assign(def.reading, s.reading || {}),
      discussion: Object.assign(def.discussion, s.discussion || {}),
      media: Object.assign(def.media, s.media || {})
    };
  }

  function normalizeServiceItem(item, index) {
    var defIcons = ['seo', 'ads', 'growth', 'social', 'web', 'content', 'leads', 'design'];
    var id = item.id || 'srv_custom_' + index;
    return {
      id: id,
      icon: item.icon && ICON_SVGS[item.icon] ? item.icon : defIcons[index % defIcons.length] || 'growth',
      title: item.title || 'Digital Marketing Service',
      menuTitle: item.menuTitle || item.title || 'Digital Service',
      menuSubtitle:
        item.menuSubtitle ||
        (item.desc ? item.desc.substring(0, 62) + (item.desc.length > 62 ? '...' : '') : 'ROI-focused digital marketing solution'),
      desc: item.desc || '',
      tags: item.tags || 'Strategy, Execution, ROI',
      linkText: item.linkText || 'Explore Service',
      linkUrl: item.linkUrl || 'service-detail.html?id=' + id
    };
  }

  function normalizePageItem(item, index) {
    var id = item.id || 'page_' + index;
    var slug = item.slug ? cleanSlugOnly(item.slug) : cleanSlugOnly(item.menuTitle || item.title || id);
    slug = slug || id;
    var defaultPermalink = 'page.html?slug=' + slug;
    var permalink = item.permalink ? item.permalink.trim() : defaultPermalink;
    var inferredType =
      item.pageType ||
      (permalink === 'privacy-policy.html' || permalink === 'disclaimer.html' || permalink === 'terms-and-conditions.html'
        ? 'Legal Page'
        : permalink.indexOf('page.html') === -1 && /\.html$/i.test(permalink)
        ? 'Core Page'
        : 'Custom Page');

    return {
      id: id,
      slug: slug,
      permalink: permalink,
      pageType: inferredType,
      author: item.author || 'Sameer Malhotra',
      title: item.title || 'Untitled Website Page',
      menuTitle: item.menuTitle || item.title || 'Website Page',
      badge: item.badge || 'DigitalSamWorld • Chandigarh HQ',
      subtitle: item.subtitle || '',
      featuredImage: item.featuredImage !== undefined && item.featuredImage !== null ? String(item.featuredImage).trim() : '',
      content: item.content || '',
      ctaText: item.ctaText || 'Book Free Consultation',
      ctaLink: item.ctaLink || 'contact.html',
      showInHeader: item.showInHeader === 'yes' ? 'yes' : 'no',
      showInFooter: item.showInFooter === 'no' ? 'no' : 'yes',
      status: item.status === 'Draft' ? 'Draft' : 'Published',
      seoTitle: item.seoTitle || (item.title ? item.title + ' | DigitalSamWorld' : 'DigitalSamWorld'),
      seoDesc: item.seoDesc || item.subtitle || '',
      date: item.date || 'Sep 30, 2026'
    };
  }

  function normalizeCategoryItem(item, index) {
    var id = item.id || 'cat_' + Date.now() + '_' + index;
    var name = (item.name || 'Category #' + (index + 1)).trim();
    var slug = item.slug ? cleanSlugOnly(item.slug) : cleanSlugOnly(name);
    return {
      id: id,
      name: name,
      slug: slug || 'category-' + (index + 1),
      parent: item.parent || 'None',
      color: item.color || '#4F46E5',
      description: (item.description || 'Blog category for ' + name + ' articles and playbooks.').trim()
    };
  }

  function normalizeTagItem(item, index) {
    var id = item.id || 'tag_' + Date.now() + '_' + index;
    var name = (item.name || 'Tag #' + (index + 1)).trim();
    var slug = item.slug ? cleanSlugOnly(item.slug) : cleanSlugOnly(name);
    return {
      id: id,
      name: name,
      slug: slug || 'tag-' + (index + 1),
      description: (item.description || 'Posts tagged with ' + name + '.').trim()
    };
  }

  function normalizePostItem(item, index) {
    var id = item.id || 'post_' + index;
    var slug = item.slug ? cleanSlugOnly(item.slug) : cleanSlugOnly(item.title || id);
    slug = slug || id;
    var defaultPermalink = 'post.html?slug=' + slug;
    return {
      id: id,
      slug: slug,
      permalink: item.permalink ? item.permalink.trim() : defaultPermalink,
      title: item.title || 'Untitled Blog Post',
      category: item.category || 'SEO & AI Search',
      author: item.author || 'Sameer Malhotra',
      authorRole: item.authorRole || 'Founder & Chief Growth Strategist',
      date: item.date || 'Sep 30, 2026',
      readTime: item.readTime || '5 Min Read',
      coverTheme: item.coverTheme && POST_THEME_STYLES[item.coverTheme] ? item.coverTheme : 'indigo',
      featuredImage: item.featuredImage !== undefined && item.featuredImage !== null ? String(item.featuredImage).trim() : '',
      excerpt:
        item.excerpt ||
        (item.content ? item.content.replace(/^#+\s+/gm, '').substring(0, 150) + '...' : ''),
      tags: item.tags || 'AI SEO, Google Ads, ROI',
      status: item.status === 'Draft' ? 'Draft' : 'Published',
      content: item.content || ''
    };
  }

  function normalizePermalinkItem(item, index) {
    var id = item.id || 'plink_' + index;
    var sourceUrl = (item.sourceUrl || 'index.html').trim();
    var customUrl = (item.customUrl || sourceUrl).trim();
    return {
      id: id,
      label: item.label || 'Website Permalink #' + (index + 1),
      type: item.type || 'Custom Permalink',
      sourceUrl: sourceUrl,
      customUrl: customUrl,
      canonicalUrl:
        item.canonicalUrl ||
        'https://digitalsamworld.com/' + customUrl.replace(/^\//, '').replace(/^index\.html$/, ''),
      inSitemap: item.inSitemap === 'no' ? 'no' : 'yes',
      priority: item.priority || '0.8'
    };
  }

  function normalizeUserItem(item, index) {
    var id = item.id || 'usr_' + Date.now() + '_' + index;
    var name = (item.name || 'Agency User #' + (index + 1)).trim();
    var username = (item.username || cleanSlugOnly(name).replace(/-/g, '_') || 'user' + (index + 1)).trim();
    var validRoles = ['Administrator', 'Editor', 'Author', 'Contributor', 'Subscriber'];
    var role = validRoles.indexOf(item.role) !== -1 ? item.role : 'Author';
    var initials =
      (item.initials ||
        name
          .split(' ')
          .map(function (w) {
            return w.charAt(0);
          })
          .join(''))
        .substring(0, 2)
        .toUpperCase() || 'US';

    return {
      id: id,
      name: name,
      username: username,
      email: (item.email || username + '@digitalsamworld.com').trim(),
      role: role,
      designation: (item.designation || role + ' • DigitalSamWorld').trim(),
      phone: (item.phone || '+91 82840 38539').trim(),
      password: item.password || 'sam123',
      status: item.status === 'Suspended' || item.status === 'Pending' ? item.status : 'Active',
      initials: initials,
      avatarTheme: item.avatarTheme && POST_THEME_STYLES[item.avatarTheme] ? item.avatarTheme : 'indigo',
      bio: item.bio || 'Digital growth specialist at DigitalSamWorld Chandigarh.',
      createdAt: item.createdAt || 'Sep 30, 2026',
      lastLogin: item.lastLogin || 'Never'
    };
  }

  function authenticateUser(usernameOrEmail, password) {
    var data = getCMSData();
    var uInput = String(usernameOrEmail || '').trim().toLowerCase();
    var pInput = String(password || '').trim();
    var users = Array.isArray(data.users) ? data.users : DEFAULT_USERS;

    for (var i = 0; i < users.length; i++) {
      var u = users[i];
      if (
        (u.username.toLowerCase() === uInput || u.email.toLowerCase() === uInput) &&
        (u.password === pInput || (u.username.toLowerCase() === 'admin' && pInput === 'sam123'))
      ) {
        if (u.status === 'Suspended') {
          return { ok: false, error: 'This user account is currently Suspended. Please contact an Administrator.' };
        }
        u.lastLogin = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
        saveCMSData(data);
        return { ok: true, user: u };
      }
    }

    // Fallback default admin check
    if (uInput === 'admin' && pInput === 'sam123') {
      return { ok: true, user: DEFAULT_USERS[0] };
    }
    return { ok: false, error: 'Invalid username/email or password. Please try again.' };
  }

  function normalizeThemeItem(item, index) {
    var id = item.id || 'theme_custom_' + index;
    return {
      id: id,
      name: (item.name || 'Custom Agency Theme #' + (index + 1)).trim(),
      version: (item.version || '1.0.0').trim(),
      author: (item.author || 'DigitalSamWorld Admin').trim(),
      description: (item.description || 'Custom color palette and typography configuration for DigitalSamWorld.').trim(),
      primaryColor: item.primaryColor || '#4F46E5',
      secondaryColor: item.secondaryColor || '#7C3AED',
      accentColor: item.accentColor || '#10B981',
      darkBgColor: item.darkBgColor || '#070B14',
      lightBgColor: item.lightBgColor || '#F8FAFC',
      headingFont: item.headingFont || 'Space Grotesk',
      bodyFont: item.bodyFont || 'Plus Jakarta Sans',
      cardRadius: item.cardRadius || '14px',
      buttonStyle: item.buttonStyle || 'rounded',
      source: item.source || (item.isBuiltIn ? 'builtin' : 'custom'),
      externalCssUrl: (item.externalCssUrl || '').trim(),
      customCss: item.customCss || '',
      rating: item.rating || '',
      tags: Array.isArray(item.tags) ? item.tags : [],
      isBuiltIn: Boolean(item.isBuiltIn)
    };
  }

  function parseWPStyleCssTheme(rawText, fallbackName) {
    var text = String(rawText || '').trim();
    if (!text) return null;

    // 1. Check if JSON Theme Package
    if (text.charAt(0) === '{') {
      try {
        var parsedJson = JSON.parse(text);
        if (parsedJson && (parsedJson.name || parsedJson.primaryColor)) {
          return normalizeThemeItem(
            Object.assign({}, parsedJson, {
              id: parsedJson.id || 'theme_ext_' + Date.now(),
              source: parsedJson.source || 'uploaded',
              isBuiltIn: false
            }),
            Date.now()
          );
        }
      } catch (e) {}
    }

    // 2. Parse WordPress style.css Header Comments + CSS Variables
    var getMeta = function (key, defVal) {
      var rx = new RegExp(key + '\\s*:\\s*([^\\n\\r*]+)', 'i');
      var m = text.match(rx);
      return m ? m[1].trim() : defVal;
    };

    var getCssVar = function (varName, defVal) {
      var rx = new RegExp(varName + '\\s*:\\s*([^;\\n\\r}]+)', 'i');
      var m = text.match(rx);
      return m ? m[1].trim() : defVal;
    };

    var name = getMeta('Theme Name', fallbackName || 'Imported WP External Theme');
    var author = getMeta('Author', 'WordPress External Author');
    var version = getMeta('Version', '1.0.0');
    var description = getMeta('Description', 'Imported external WordPress style.css theme with custom palette and stylesheet rules.');
    var tagsRaw = getMeta('Tags', 'External, WordPress, Custom CSS');
    var tags = tagsRaw
      .split(',')
      .map(function (s) { return s.trim(); })
      .filter(Boolean);

    var primaryColor = getCssVar('--primary', '#2563EB');
    var secondaryColor = getCssVar('--secondary', '#7C3AED');
    var accentColor = getCssVar('--accent', '#10B981');
    var darkBgColor = getCssVar('--bg-dark', '#0B1120');
    var lightBgColor = getCssVar('--bg-light', '#F8FAFC');
    var cardRadius = getCssVar('--radius-md', '14px');

    return normalizeThemeItem(
      {
        id: 'theme_wp_' + Date.now(),
        name: name,
        version: version,
        author: author,
        description: description,
        primaryColor: primaryColor.charAt(0) === '#' ? primaryColor : '#2563EB',
        secondaryColor: secondaryColor.charAt(0) === '#' ? secondaryColor : '#7C3AED',
        accentColor: accentColor.charAt(0) === '#' ? accentColor : '#10B981',
        darkBgColor: darkBgColor.charAt(0) === '#' ? darkBgColor : '#0B1120',
        lightBgColor: lightBgColor.charAt(0) === '#' ? lightBgColor : '#F8FAFC',
        headingFont: 'Space Grotesk',
        bodyFont: 'Plus Jakarta Sans',
        cardRadius: cardRadius,
        buttonStyle: 'rounded',
        source: 'uploaded',
        externalCssUrl: '',
        customCss: text,
        tags: tags,
        isBuiltIn: false
      },
      Date.now()
    );
  }

  function normalizeMenuItem(item, index) {
    var id = item.id || 'menu_' + Date.now() + '_' + index;
    return {
      id: id,
      label: (item.label || 'Menu Item #' + (index + 1)).trim(),
      url: (item.url || 'index.html').trim(),
      location: item.location === 'header' || item.location === 'footer' ? item.location : 'both',
      type: item.type || 'custom',
      target: item.target === '_blank' ? '_blank' : '_self',
      highlight: item.highlight === 'badge' ? 'badge' : 'normal',
      status: item.status === 'Hidden' ? 'Hidden' : 'Enabled'
    };
  }

  function normalizeWidgetItem(item, index) {
    var id = item.id || 'wdg_' + Date.now() + '_' + index;
    return {
      id: id,
      title: (item.title || 'Agency Widget #' + (index + 1)).trim(),
      type: item.type || 'cta_card',
      area: item.area || 'sidebar',
      badge: (item.badge || 'DigitalSamWorld').trim(),
      content: item.content || '',
      btnText: (item.btnText || 'Learn More →').trim(),
      btnUrl: (item.btnUrl || 'contact.html').trim(),
      theme: item.theme || 'light',
      status: item.status === 'Hidden' ? 'Hidden' : 'Active'
    };
  }

  function normalizeAppearance(app) {
    var def = deepClone(DEFAULT_APPEARANCE);
    if (!app) return def;
    var themes = Array.isArray(app.themes) && app.themes.length
      ? app.themes.map(normalizeThemeItem)
      : def.themes;
    var activeThemeId = app.activeThemeId || def.activeThemeId;
    if (!app.astraThemeV1 || activeThemeId === 'theme_indigo') {
      activeThemeId = 'theme_astra';
      themes = def.themes;
      app.astraThemeV1 = true;
    }
    if (!themes.some(function (t) { return t.id === activeThemeId; })) {
      activeThemeId = themes[0].id;
    }
    var menus = Array.isArray(app.menus) && app.menus.length
      ? app.menus.map(normalizeMenuItem)
      : def.menus;
    if (!menus.some(function (m) { return m.id === 'menu_portfolio' || m.url === 'portfolio.html'; })) {
      var caseIdx = menus.findIndex(function (m) { return m.id === 'menu_cases'; });
      var portItem = {
        id: 'menu_portfolio',
        label: 'Portfolio',
        url: 'portfolio.html',
        location: 'both',
        type: 'core',
        target: '_self',
        highlight: 'normal',
        status: 'Enabled'
      };
      if (caseIdx !== -1) {
        menus.splice(caseIdx, 0, portItem);
      } else {
        menus.push(portItem);
      }
    }
    var widgets = Array.isArray(app.widgets)
      ? app.widgets.map(normalizeWidgetItem)
      : def.widgets;
    var menuSettings = Object.assign({}, def.menuSettings, app.menuSettings || {});
    if (!app.menuSettings || menuSettings.ctaText === 'Get Free Audit') {
      menuSettings.ctaText = 'Sign Up';
      menuSettings.ctaUrl = 'signup.html';
    }
    var siteEditor = Object.assign({}, def.siteEditor, app.siteEditor || {});
    siteEditor.sectionsVisibility = Object.assign(
      {},
      def.siteEditor.sectionsVisibility,
      (app.siteEditor && app.siteEditor.sectionsVisibility) || {}
    );
    return {
      activeThemeId: activeThemeId,
      themes: themes,
      menuSettings: menuSettings,
      menus: menus,
      widgets: widgets,
      siteEditor: siteEditor,
      astraThemeV1: true
    };
  }

  function parseMediaBytes(sizeStr) {
    if (typeof sizeStr === 'number' && !isNaN(sizeStr)) return sizeStr;
    if (!sizeStr || typeof sizeStr !== 'string') return 18432;
    var clean = sizeStr.trim().toUpperCase();
    var num = parseFloat(clean);
    if (isNaN(num)) return 18432;
    if (clean.indexOf('GB') !== -1) return Math.round(num * 1024 * 1024 * 1024);
    if (clean.indexOf('MB') !== -1) return Math.round(num * 1024 * 1024);
    if (clean.indexOf('KB') !== -1) return Math.round(num * 1024);
    return Math.round(num);
  }

  function formatMediaBytes(bytes) {
    var b = parseInt(bytes, 10);
    if (isNaN(b) || b <= 0) return '18.4 KB';
    if (b >= 1073741824) return (b / 1073741824).toFixed(1) + ' GB';
    if (b >= 1048576) return (b / 1048576).toFixed(1) + ' MB';
    if (b >= 1024) return (b / 1024).toFixed(1) + ' KB';
    return b + ' B';
  }

  function normalizeMediaItem(item) {
    if (!item || typeof item !== 'object') item = {};
    var mime = String(item.mimeType || '').toLowerCase();
    var ext = String(item.filename || item.url || '').split('.').pop().toLowerCase();
    var type = item.type;
    if (!type) {
      if (ext === 'mp4' || ext === 'webm' || mime.indexOf('video') !== -1) type = 'video';
      else if (ext === 'pdf' || mime.indexOf('pdf') !== -1 || ext === 'doc' || ext === 'docx') type = 'document';
      else type = 'image';
    }

    var sizeBytes = item.sizeBytes ? parseInt(item.sizeBytes, 10) : parseMediaBytes(item.fileSize);
    if (isNaN(sizeBytes) || sizeBytes <= 0) {
      sizeBytes = type === 'video' ? 19293798 : (type === 'document' ? 3984588 : 18841);
    }
    var sizeFormatted = item.sizeFormatted && item.sizeFormatted !== '0 KB' && item.sizeFormatted !== '0 B'
      ? item.sizeFormatted
      : (item.fileSize && item.fileSize !== '0 KB' && item.fileSize !== '0 B' ? item.fileSize : formatMediaBytes(sizeBytes));

    var alt = String(item.alt || item.altText || item.title || '').trim();
    var altText = String(item.altText || item.alt || item.title || '').trim();

    return {
      id: item.id || ('med_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5)),
      title: String(item.title || 'Untitled Media').trim(),
      filename: String(item.filename || (item.url ? item.url.split('/').pop() : 'file')).trim(),
      url: String(item.url || '').trim(),
      type: type,
      mimeType: String(item.mimeType || (type === 'video' ? 'video/mp4' : type === 'document' ? 'application/pdf' : 'image/jpeg')),
      fileSize: sizeFormatted,
      sizeBytes: sizeBytes,
      sizeFormatted: sizeFormatted,
      dimensions: String(item.dimensions || (type === 'image' ? '1200 × 630' : type === 'video' ? '1920 × 1080' : '-')),
      uploadedBy: String(item.uploadedBy || 'Sameer Malhotra'),
      date: String(item.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })),
      alt: alt,
      altText: altText,
      caption: String(item.caption || ''),
      description: String(item.description || ''),
      attachedTo: String(item.attachedTo || 'Unattached')
    };
  }

  function addMediaItem(item) {
    var data = getCMSData();
    if (!Array.isArray(data.mediaLibrary)) data.mediaLibrary = [];
    var normalized = normalizeMediaItem(item);
    data.mediaLibrary.unshift(normalized);
    saveCMSData(data);
    return normalized;
  }

  function updateMediaItem(id, updates) {
    var data = getCMSData();
    if (!Array.isArray(data.mediaLibrary)) return null;
    var idx = data.mediaLibrary.findIndex(function (m) { return m.id === id; });
    if (idx === -1) return null;
    data.mediaLibrary[idx] = normalizeMediaItem(Object.assign({}, data.mediaLibrary[idx], updates));
    saveCMSData(data);
    return data.mediaLibrary[idx];
  }

  function deleteMediaItem(id) {
    var data = getCMSData();
    if (!Array.isArray(data.mediaLibrary)) return false;
    var lenBefore = data.mediaLibrary.length;
    data.mediaLibrary = data.mediaLibrary.filter(function (m) { return m.id !== id; });
    if (data.mediaLibrary.length !== lenBefore) {
      saveCMSData(data);
      return true;
    }
    return false;
  }

  function deleteMediaItems(idArray) {
    if (!Array.isArray(idArray) || !idArray.length) return 0;
    var data = getCMSData();
    if (!Array.isArray(data.mediaLibrary)) return 0;
    var initialCount = data.mediaLibrary.length;
    data.mediaLibrary = data.mediaLibrary.filter(function (m) {
      return idArray.indexOf(m.id) === -1;
    });
    var removed = initialCount - data.mediaLibrary.length;
    if (removed > 0) {
      saveCMSData(data);
    }
    return removed;
  }

  function getCMSData() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw && (raw.indexOf('samdigitalagency') !== -1 || raw.indexOf('SamDigital') !== -1)) {
        raw = raw.split('https://samdigitalagency.com').join('https://digitalsamworld.com')
                 .split('samdigitalagency.com').join('digitalsamworld.com')
                 .split('SamDigitalAgency').join('DigitalSamWorld')
                 .split('SamDigital').join('DigitalSamWorld');
        try { localStorage.setItem(STORAGE_KEY, raw); } catch (e) {}
      }
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return deepClone(DEFAULT_CMS_DATA);
      var parsed = JSON.parse(raw);
      var merged = Object.assign(deepClone(DEFAULT_CMS_DATA), parsed);
      merged.settings = normalizeSettings(parsed.settings);
      merged.appearance = normalizeAppearance(parsed.appearance);
      if (!Array.isArray(merged.users) || !merged.users.length) {
        merged.users = deepClone(DEFAULT_USERS);
      } else {
        var legacyDummies = ['usr_editor_1', 'usr_author_1', 'usr_contrib_1', 'usr_sub_1', 'riya_editor', 'aarav_author', 'kabir_contrib', 'vikram_sub'];
        merged.users = merged.users
          .filter(function (u) {
            return legacyDummies.indexOf(u.id) === -1 && legacyDummies.indexOf(u.username) === -1;
          })
          .map(normalizeUserItem);
        if (!merged.users.length) {
          merged.users = deepClone(DEFAULT_USERS);
        }
      }
      if (!merged.permalinkSettings) {
        merged.permalinkSettings = deepClone(DEFAULT_CMS_DATA.permalinkSettings);
      }
      if (!Array.isArray(merged.permalinks)) {
        merged.permalinks = deepClone(DEFAULT_PERMALINKS);
      } else {
        merged.permalinks = merged.permalinks.map(normalizePermalinkItem);
      }
      if (!merged.permalinks.some(function (p) { return p.id === 'plink_portfolio' || p.sourceUrl === 'portfolio.html'; })) {
        var defPortPlink = DEFAULT_PERMALINKS.find(function (p) { return p.id === 'plink_portfolio'; });
        if (defPortPlink) {
          merged.permalinks.push(deepClone(defPortPlink));
        }
      }
      if (merged.servicesSection && Array.isArray(merged.servicesSection.items)) {
        merged.servicesSection.items = merged.servicesSection.items.map(normalizeServiceItem);
      }

      // Ensure all Core, Legal, and Custom Pages are initialized if migrating from older localStorage
      if (!Array.isArray(merged.pages) || !merged.pages.length) {
        merged.pages = deepClone(DEFAULT_CMS_DATA.pages);
        merged.pagesInitializedV8 = true;
      } else if (!parsed.pagesInitializedV8) {
        var existingPages = merged.pages.map(normalizePageItem);
        var fullPages = [];
        DEFAULT_CMS_DATA.pages.forEach(function (defPg) {
          var match = existingPages.find(function (ep) {
            return ep.id === defPg.id || ep.permalink === defPg.permalink || ep.slug === defPg.slug;
          });
          fullPages.push(match ? normalizePageItem(Object.assign({}, defPg, match), fullPages.length) : deepClone(defPg));
        });
        existingPages.forEach(function (ep) {
          if (!fullPages.some(function (fp) { return fp.id === ep.id || fp.permalink === ep.permalink; })) {
            fullPages.push(ep);
          }
        });
        merged.pages = fullPages;
        merged.pagesInitializedV8 = true;
      } else {
        merged.pages = merged.pages.map(normalizePageItem);
      }
      if (!merged.pages.some(function (p) { return p.id === 'page_portfolio' || p.slug === 'portfolio'; })) {
        var defPortPage = DEFAULT_CMS_DATA.pages.find(function (p) { return p.id === 'page_portfolio'; });
        if (defPortPage) {
          merged.pages.push(deepClone(defPortPage));
        }
      }

      if (!Array.isArray(merged.postCategories) || !merged.postCategories.length) {
        merged.postCategories = deepClone(DEFAULT_CMS_DATA.postCategories);
      } else {
        merged.postCategories = merged.postCategories.map(normalizeCategoryItem);
      }

      if (!Array.isArray(merged.postTags) || !merged.postTags.length) {
        merged.postTags = deepClone(DEFAULT_CMS_DATA.postTags);
      } else {
        merged.postTags = merged.postTags.map(normalizeTagItem);
      }

      if (!Array.isArray(merged.posts) || !merged.posts.length) {
        merged.posts = deepClone(DEFAULT_CMS_DATA.posts);
      } else {
        merged.posts = merged.posts.map(normalizePostItem);
      }

      // Backward compatibility: populate default featured images on existing posts and pages if not initialized
      if (!parsed.featuredImagesV9) {
        var postDefImgMap = {
          'post_1': 'assets/images/post-ai-seo.svg',
          'post_2': 'assets/images/post-google-ads.svg',
          'post_3': 'assets/images/post-cro-landing.svg',
          'post_4': 'assets/images/post-meta-ads.svg',
          'post_5': 'assets/images/post-local-seo.svg'
        };
        var pageDefImgMap = {
          'page_home': 'assets/images/page-default-hero.svg',
          'page_about': 'assets/images/page-default-hero.svg',
          'page_services': 'assets/images/page-default-hero.svg',
          'page_blog': 'assets/images/post-ai-seo.svg',
          'page_pricing': 'assets/images/page-pricing.svg',
          'page_careers': 'assets/images/page-careers.svg',
          'page_contact': 'assets/images/page-default-hero.svg',
          'page_privacy': 'assets/images/page-legal.svg',
          'page_disclaimer': 'assets/images/page-legal.svg',
          'page_terms': 'assets/images/page-legal.svg'
        };
        if (Array.isArray(merged.posts)) {
          merged.posts.forEach(function (p) {
            if (p.featuredImage === undefined || p.featuredImage === null || p.featuredImage === '') {
              p.featuredImage = postDefImgMap[p.id] || 'assets/images/post-ai-seo.svg';
            }
          });
        }
        if (Array.isArray(merged.pages)) {
          merged.pages.forEach(function (pg) {
            if (pg.featuredImage === undefined || pg.featuredImage === null || pg.featuredImage === '') {
              pg.featuredImage = pageDefImgMap[pg.id] || 'assets/images/page-default-hero.svg';
            }
          });
        }
        merged.featuredImagesV9 = true;
      }

      // Media Library initialization & migration V2
      if (!Array.isArray(merged.mediaLibrary) || !merged.mediaLibrary.length || !parsed.mediaLibraryV2) {
        if (!Array.isArray(merged.mediaLibrary) || !merged.mediaLibrary.length) {
          merged.mediaLibrary = deepClone(DEFAULT_MEDIA_LIBRARY);
        } else {
          var existingMediaMap = {};
          merged.mediaLibrary.forEach(function (m) {
            if (m && m.id) existingMediaMap[m.id] = m;
          });
          DEFAULT_MEDIA_LIBRARY.forEach(function (dm) {
            if (!existingMediaMap[dm.id]) {
              merged.mediaLibrary.push(deepClone(dm));
            } else {
              var ex = existingMediaMap[dm.id];
              if (!ex.url || ex.fileSize === '0 KB' || ex.fileSize === '0 B' || !ex.sizeBytes) {
                Object.assign(ex, deepClone(dm));
              }
            }
          });
        }
        merged.mediaLibraryV1 = true;
        merged.mediaLibraryV2 = true;
      }
      merged.mediaLibrary = merged.mediaLibrary.map(normalizeMediaItem);

      return merged;
    } catch (e) {
      return deepClone(DEFAULT_CMS_DATA);
    }
  }

  function saveCMSData(data) {
    data.settings = normalizeSettings(data.settings);
    data.appearance = normalizeAppearance(data.appearance);
    data.pagesInitializedV8 = true;
    data.featuredImagesV9 = true;
    data.mediaLibraryV1 = true;
    data.mediaLibraryV2 = true;
    if (Array.isArray(data.users)) {
      data.users = data.users.map(normalizeUserItem);
    }
    if (Array.isArray(data.mediaLibrary)) {
      data.mediaLibrary = data.mediaLibrary.map(normalizeMediaItem);
    }
    if (Array.isArray(data.permalinks)) {
      data.permalinks = data.permalinks.map(normalizePermalinkItem);
    }
    if (data.servicesSection && Array.isArray(data.servicesSection.items)) {
      data.servicesSection.items = data.servicesSection.items.map(normalizeServiceItem);
    }
    if (Array.isArray(data.pages)) {
      data.pages = data.pages.map(normalizePageItem);
    }
    if (Array.isArray(data.postCategories)) {
      data.postCategories = data.postCategories.map(normalizeCategoryItem);
    }
    if (Array.isArray(data.postTags)) {
      data.postTags = data.postTags.map(normalizeTagItem);
    }
    if (Array.isArray(data.posts)) {
      data.posts = data.posts.map(normalizePostItem);
    }
    data.lastUpdated = new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    if (window.BroadcastChannel) {
      try {
        var bc = new BroadcastChannel('sam_cms_channel');
        bc.postMessage({ type: 'CMS_UPDATED', data: data });
        bc.close();
      } catch (err) {}
    }
    return data;
  }

  function resetCMSData() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(COMMENTS_KEY);
    var fresh = deepClone(DEFAULT_CMS_DATA);
    if (window.BroadcastChannel) {
      try {
        var bc = new BroadcastChannel('sam_cms_channel');
        bc.postMessage({ type: 'CMS_UPDATED', data: fresh });
        bc.close();
      } catch (err) {}
    }
    return fresh;
  }

  // Discussion Comments Management (Enforces Discussion Rules from Settings)
  function getComments() {
    try {
      var raw = localStorage.getItem(COMMENTS_KEY);
      return raw ? JSON.parse(raw) : deepClone(DEFAULT_COMMENTS);
    } catch (e) {
      return deepClone(DEFAULT_COMMENTS);
    }
  }

  function saveComments(list) {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(list));
    return list;
  }

  function addCommentAdmin(commentObj) {
    var data = getCMSData();
    var newCmt = {
      id: 'cmt_' + Date.now(),
      postSlug: commentObj.postSlug || 'ai-search-geo-aeo-seo-india-2026',
      author: String(commentObj.author || 'Sameer Malhotra').trim(),
      email: String(commentObj.email || 'info@digitalsamworld.com').trim(),
      date: commentObj.date || formatDateBySetting(new Date().toISOString(), data.settings.general.dateFormat),
      content: String(commentObj.content || '').trim(),
      status: commentObj.status || 'Approved'
    };
    var all = getComments();
    all.unshift(newCmt);
    saveComments(all);
    return newCmt;
  }

  function updateComment(id, fields) {
    var list = getComments().map(function (c) {
      if (c.id === id) {
        return Object.assign({}, c, fields);
      }
      return c;
    });
    return saveComments(list);
  }

  function setCommentStatus(id, newStatus) {
    var list = getComments().map(function (c) {
      if (c.id === id) {
        c.status = newStatus;
      }
      return c;
    });
    return saveComments(list);
  }

  function submitComment(commentObj) {
    var data = getCMSData();
    var disc = (data.settings && data.settings.discussion) || DEFAULT_SETTINGS.discussion;
    var content = String(commentObj.content || '').trim();
    var author = String(commentObj.author || '').trim() || 'Guest Reader';
    var email = String(commentObj.email || '').trim();

    // 1. Check link count against maxLinks rule
    var linkMatches = content.match(/(https?:\/\/|www\.)/gi) || [];
    var maxLinks = parseInt(disc.maxLinks, 10);
    if (isNaN(maxLinks)) maxLinks = 2;

    // 2. Check disallowed / moderation keywords
    var modWords = String(disc.moderationKeys || '')
      .split(/[,\n]/)
      .map(function (w) {
        return w.trim().toLowerCase();
      })
      .filter(Boolean);
    var flaggedByKeyword = modWords.some(function (word) {
      return content.toLowerCase().indexOf(word) !== -1;
    });

    var status = 'Approved';
    if (disc.manualModeration === 'yes' || linkMatches.length >= maxLinks || flaggedByKeyword) {
      status = 'Pending';
    }

    var newCmt = {
      id: 'cmt_' + Date.now(),
      postSlug: commentObj.postSlug || 'general',
      author: author,
      email: email,
      date: formatDateBySetting(new Date().toISOString(), data.settings.general.dateFormat),
      content: content,
      status: status
    };

    var all = getComments();
    all.unshift(newCmt);
    saveComments(all);
    return newCmt;
  }

  function toggleCommentStatus(id) {
    var list = getComments().map(function (c) {
      if (c.id === id) {
        c.status = c.status === 'Approved' ? 'Pending' : 'Approved';
      }
      return c;
    });
    return saveComments(list);
  }

  function deleteComment(id) {
    var list = getComments().filter(function (c) {
      return c.id !== id;
    });
    return saveComments(list);
  }

  // Resolve a URL using the Permalinks Registry
  function resolvePermalink(url, data) {
    if (!url) return '';
    if (!data) data = getCMSData();
    if (!Array.isArray(data.permalinks)) return url;
    var found = data.permalinks.find(function (p) {
      return p.sourceUrl === url;
    });
    if (found && found.customUrl) {
      return found.customUrl;
    }
    return url;
  }

  // Generate Apache .htaccess rewrite rules
  function generateHtaccessRules(data) {
    if (!data) data = getCMSData();
    var lines = [
      '# =====================================================================',
      '# DigitalSamWorld (digitalsamworld.com) - SEO Permalink Rewrite Rules',
      '# Generated by DigitalSamWorld CMS v5.0',
      '# =====================================================================',
      'RewriteEngine On',
      'RewriteBase /',
      '',
      '# 1. Custom Permalinks & Redirects'
    ];

    if (Array.isArray(data.permalinks)) {
      data.permalinks.forEach(function (pl) {
        if (pl.customUrl && pl.sourceUrl && pl.customUrl !== pl.sourceUrl) {
          var cleanCustom = pl.customUrl.replace(/^\//, '');
          if (pl.type === '301 Redirect') {
            lines.push('Redirect 301 /' + cleanCustom + ' /' + pl.sourceUrl.replace(/^\//, ''));
          } else {
            lines.push('RewriteRule ^' + cleanCustom + '/?$ ' + pl.sourceUrl.replace(/^\//, '') + ' [L,QSA]');
          }
        }
      });
    }

    lines.push('');
    lines.push('# 2. Clean URLs for Custom CMS Pages');
    if (Array.isArray(data.pages)) {
      data.pages.forEach(function (pg) {
        if (pg.slug) {
          lines.push('RewriteRule ^' + pg.slug + '/?$ page.html?slug=' + pg.slug + ' [L,QSA]');
        }
      });
    }

    lines.push('');
    lines.push('# 3. Clean URLs for Blog Posts');
    if (Array.isArray(data.posts)) {
      data.posts.forEach(function (pt) {
        if (pt.slug) {
          lines.push('RewriteRule ^blog/' + pt.slug + '/?$ post.html?slug=' + pt.slug + ' [L,QSA]');
        }
      });
    }

    lines.push('');
    lines.push('# 4. Extensionless .html Support');
    lines.push('RewriteCond %{REQUEST_FILENAME} !-d');
    lines.push('RewriteCond %{REQUEST_FILENAME}\\.html -f');
    lines.push('RewriteRule ^([^/]+)/?$ $1.html [L]');

    return lines.join('\n');
  }

  // Leads Management
  function getLeads() {
    try {
      var raw = localStorage.getItem(LEADS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function addLead(leadObj) {
    var leads = getLeads();
    leadObj.id = 'lead_' + Date.now();
    leadObj.date = new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
    leadObj.status = 'New';
    leads.unshift(leadObj);
    try {
      localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
    } catch (e) {}
    return leadObj;
  }

  function deleteLead(id) {
    var leads = getLeads().filter(function (l) {
      return l.id !== id;
    });
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
    return leads;
  }

  function toggleLeadStatus(id) {
    var leads = getLeads().map(function (l) {
      if (l.id === id) {
        l.status = l.status === 'New' ? 'Contacted' : 'New';
      }
      return l;
    });
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
    return leads;
  }

  function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatRichContent(raw) {
    if (!raw) return '<p>Content coming soon.</p>';
    var trimmed = String(raw).trim();
    if (/<(p|h2|h3|h4|ul|ol|div|section|blockquote)\b/i.test(trimmed)) {
      return trimmed;
    }

    var lines = trimmed.split(/\r?\n/);
    var html = '';
    var inList = false;

    lines.forEach(function (line) {
      var l = line.trim();
      if (!l) {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        return;
      }
      if (l.indexOf('### ') === 0) {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        html += '<h3 style="margin:1.65rem 0 0.7rem;font-size:1.28rem;">' + escapeHTML(l.substring(4)) + '</h3>';
      } else if (l.indexOf('## ') === 0) {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        html += '<h2 style="margin:2rem 0 0.85rem;font-size:1.55rem;">' + escapeHTML(l.substring(3)) + '</h2>';
      } else if (l.indexOf('- ') === 0 || l.indexOf('* ') === 0 || l.indexOf('• ') === 0) {
        if (!inList) {
          html += '<ul style="margin:0.85rem 0 1.35rem 1.25rem;list-style:disc;display:grid;gap:0.5rem;">';
          inList = true;
        }
        var itemText = l.substring(2);
        var colonIdx = itemText.indexOf(':');
        if (colonIdx > 0 && colonIdx < 45) {
          html +=
            '<li><strong>' +
            escapeHTML(itemText.substring(0, colonIdx + 1)) +
            '</strong>' +
            escapeHTML(itemText.substring(colonIdx + 1)) +
            '</li>';
        } else {
          html += '<li>' + escapeHTML(itemText) + '</li>';
        }
      } else {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        html += '<p style="margin-bottom:1.15rem;line-height:1.8;">' + escapeHTML(l) + '</p>';
      }
    });

    if (inList) {
      html += '</ul>';
    }
    return html;
  }

  // Build HTML for a single Service Card
  function renderServiceCardHTML(srv) {
    var iconSvg = ICON_SVGS[srv.icon] || ICON_SVGS.growth;
    var tagArr = (srv.tags || '')
      .split(',')
      .map(function (t) {
        return t.trim();
      })
      .filter(Boolean);
    var tagsHtml = tagArr
      .map(function (t) {
        return '<span class="service-tag-pill">' + escapeHTML(t) + '</span>';
      })
      .join('');

    return (
      '<article class="service-card">' +
      '<div>' +
      '<div class="service-icon-wrap">' +
      iconSvg +
      '</div>' +
      '<h3>' +
      escapeHTML(srv.title) +
      '</h3>' +
      '<p>' +
      escapeHTML(srv.desc) +
      '</p>' +
      '<div class="service-tags">' +
      tagsHtml +
      '</div>' +
      '</div>' +
      '<a href="' +
      escapeHTML(srv.linkUrl) +
      '" class="service-link">' +
      '<span>' +
      escapeHTML(srv.linkText) +
      '</span>' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>' +
      '</a>' +
      '</article>'
    );
  }

  // Build HTML for a single Blog Post Card (Enforces Reading, Discussion & Media Settings!)
  function renderPostCardHTML(post, settings) {
    var s = normalizeSettings(settings);
    var reading = s.reading;
    var disc = s.discussion;
    var media = s.media;
    var general = s.general;

    var bgGrad = POST_THEME_STYLES[post.coverTheme] || POST_THEME_STYLES.indigo;
    var postUrl = post.permalink || 'post.html?slug=' + encodeURIComponent(post.slug || post.id);
    var initials = (post.author || 'SM')
      .split(' ')
      .map(function (n) {
        return n.charAt(0);
      })
      .join('')
      .substring(0, 2)
      .toUpperCase();

    var bannerH = parseInt(media.cardBannerHeight, 10) || 175;
    var formattedDate = formatDateBySetting(post.date, general.dateFormat);

    // Excerpt vs Full Feed Display & Excerpt Length
    var maxExcerptChars = parseInt(reading.excerptLength, 10) || 165;
    var bodyPreview = '';
    if (reading.feedDisplay === 'full') {
      bodyPreview = String(post.content || post.excerpt || '')
        .replace(/^#+\s+/gm, '')
        .substring(0, 420) + '...';
    } else {
      var rawExc = String(post.excerpt || '');
      bodyPreview =
        rawExc.length > maxExcerptChars ? rawExc.substring(0, maxExcerptChars).trim() + '...' : rawExc;
    }

    var metaHtml = '<span>&#128197; ' + escapeHTML(formattedDate) + '</span>';
    if (reading.showReadTime !== 'no') {
      metaHtml += '<span>&bull;</span><span>&#9201; ' + escapeHTML(post.readTime) + '</span>';
    }

    var avatarBg =
      disc.avatarStyle === 'emerald'
        ? '#DCFCE7;color:#065F46'
        : disc.avatarStyle === 'slate'
        ? '#E2E8F0;color:#1E293B'
        : 'var(--primary-light);color:var(--primary)';

    var authorHtml = '';
    if (reading.showAuthorBadge !== 'no') {
      authorHtml =
        '<div style="display:flex;align-items:center;gap:0.6rem;">' +
        (disc.showAvatars !== 'no'
          ? '<div style="width:32px;height:32px;border-radius:50%;background:' +
            avatarBg +
            ';display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.75rem;">' +
            escapeHTML(initials) +
            '</div>'
          : '') +
        '<span style="font-size:0.82rem;font-weight:700;color:var(--text-main);">' +
        escapeHTML(post.author) +
        '</span>' +
        '</div>';
    } else {
      authorHtml = '<span></span>';
    }

    return (
      '<article class="case-card" style="display:flex;flex-direction:column;justify-content:space-between;">' +
      '<div>' +
      (post.featuredImage
        ? '<a href="' +
          escapeHTML(postUrl) +
          '" class="case-banner" style="display:block;position:relative;padding:0;overflow:hidden;min-height:' +
          bannerH +
          'px;background:' +
          bgGrad +
          ';">' +
          '<img src="' +
          escapeHTML(post.featuredImage) +
          '" alt="' +
          escapeHTML(post.title) +
          '" style="width:100%;height:' +
          bannerH +
          'px;object-fit:' +
          (media.imageFit || 'cover') +
          ';display:block;" loading="lazy" />' +
          '<div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.2) 60%, transparent 100%);pointer-events:none;"></div>' +
          '<div style="position:absolute;top:1rem;left:1rem;z-index:2;"><span class="case-category" style="backdrop-filter:blur(8px);background:rgba(15,23,42,0.75);">' +
          escapeHTML(post.category) +
          '</span></div>' +
          '<div style="position:absolute;bottom:0.85rem;left:1.25rem;right:1.25rem;z-index:2;"><h3 style="color:#FFFFFF;font-size:1.15rem;line-height:1.35;margin:0;text-shadow:0 2px 4px rgba(0,0,0,0.6);">' +
          escapeHTML(post.title) +
          '</h3></div>' +
          '</a>'
        : '<a href="' +
          escapeHTML(postUrl) +
          '" class="case-banner" style="display:block;background:' +
          bgGrad +
          ';min-height:' +
          bannerH +
          'px;padding:1.5rem;">' +
          '<span class="case-category">' +
          escapeHTML(post.category) +
          '</span>' +
          '<h3 style="color:#FFFFFF;font-size:1.22rem;line-height:1.38;margin-top:0.4rem;">' +
          escapeHTML(post.title) +
          '</h3>' +
          '</a>') +
      '<div class="case-body" style="padding:1.5rem;">' +
      '<div style="display:flex;align-items:center;gap:0.75rem;font-size:0.78rem;color:var(--text-muted);margin-bottom:0.75rem;font-weight:600;">' +
      metaHtml +
      '</div>' +
      '<p style="font-size:0.93rem;color:var(--text-body);margin-bottom:1.25rem;">' +
      escapeHTML(bodyPreview) +
      '</p>' +
      '</div>' +
      '</div>' +
      '<div style="padding:0 1.5rem 1.5rem;display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--border-light);padding-top:1rem;margin-top:auto;">' +
      authorHtml +
      '<a href="' +
      escapeHTML(postUrl) +
      '" class="service-link" style="font-size:0.86rem;">' +
      '<span>Read Post</span>' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>' +
      '</a>' +
      '</div>' +
      '</article>'
    );
  }

  // Apply Media Sizes & Reading Search Visibility to DOM
  function applyCoreSettingsToDOM(data) {
    var s = normalizeSettings(data.settings);
    var media = s.media;
    var reading = s.reading;

    // 1. Inject dynamic CSS variables and classes for Media Sizes (Thumbnail, Medium, Large, Banner)
    var styleEl = document.getElementById('sam-cms-media-styles');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'sam-cms-media-styles';
      document.head.appendChild(styleEl);
    }
    var thumbCropRule =
      media.thumbCrop === 'yes'
        ? 'width:' + media.thumbWidth + 'px;height:' + media.thumbHeight + 'px;object-fit:cover;'
        : 'max-width:' + media.thumbWidth + 'px;max-height:' + media.thumbHeight + 'px;object-fit:contain;';

    styleEl.textContent =
      ':root {' +
      '--cms-thumb-w: ' + (media.thumbWidth || 300) + 'px;' +
      '--cms-thumb-h: ' + (media.thumbHeight || 300) + 'px;' +
      '--cms-medium-w: ' + (media.mediumWidth || 768) + 'px;' +
      '--cms-medium-h: ' + (media.mediumHeight || 512) + 'px;' +
      '--cms-large-w: ' + (media.largeWidth || 1280) + 'px;' +
      '--cms-large-h: ' + (media.largeHeight || 720) + 'px;' +
      '--cms-banner-h: ' + (media.cardBannerHeight || 175) + 'px;' +
      '}' +
      '.cms-media-thumb, img.size-thumbnail { ' + thumbCropRule + ' border-radius: 8px; }' +
      '.cms-media-medium, img.size-medium { max-width: ' + (media.mediumWidth || 768) + 'px; max-height: ' + (media.mediumHeight || 512) + 'px; object-fit: ' + (media.imageFit || 'cover') + '; }' +
      '.cms-media-large, img.size-large { max-width: ' + (media.largeWidth || 1280) + 'px; max-height: ' + (media.largeHeight || 720) + 'px; object-fit: ' + (media.imageFit || 'cover') + '; }';

    // 2. Apply Native Lazy Loading to images if enabled in Media Settings
    if (media.lazyLoad === 'yes') {
      document.querySelectorAll('img:not([loading])').forEach(function (img) {
        if (!img.closest('.site-header')) {
          img.setAttribute('loading', 'lazy');
        }
      });
    }

    // 3. Apply Search Engine Visibility (Reading Settings) on non-admin pages
    if (window.location.pathname.indexOf('admin.html') === -1) {
      var metaRobots = document.querySelector('meta[name="robots"]');
      if (!metaRobots) {
        metaRobots = document.createElement('meta');
        metaRobots.setAttribute('name', 'robots');
        document.head.appendChild(metaRobots);
      }
      metaRobots.setAttribute(
        'content',
        reading.searchVisibility === 'noindex' ? 'noindex, nofollow' : 'index, follow'
      );
    }
  }

  // Generate XML Sitemap string dynamically
  function generateSitemapXML(data) {
    if (!data) data = getCMSData();
    var baseUrl = (data.permalinkSettings && data.permalinkSettings.baseUrl
      ? data.permalinkSettings.baseUrl
      : 'https://digitalsamworld.com'
    ).replace(/\/+$/, '');
    var today = new Date().toISOString().split('T')[0];
    var urls = [];
    var seenLocs = {};

    function addUrl(loc, priority, freq) {
      if (!loc) return;
      var full = loc.indexOf('http') === 0 ? loc : baseUrl + '/' + loc.replace(/^\//, '');
      if (seenLocs[full]) return;
      seenLocs[full] = true;
      urls.push({ loc: full, priority: priority || '0.8', freq: freq || 'weekly' });
    }

    addUrl(baseUrl + '/', '1.0', 'weekly');

    if (Array.isArray(data.permalinks)) {
      data.permalinks.forEach(function (pl) {
        if (pl.inSitemap !== 'no') {
          addUrl(pl.canonicalUrl || pl.customUrl, pl.priority || '0.8', 'weekly');
        }
      });
    }

    if (data.servicesSection && Array.isArray(data.servicesSection.items)) {
      data.servicesSection.items.forEach(function (s) {
        if (s.linkUrl) {
          addUrl(s.linkUrl, '0.9', 'weekly');
        }
      });
    }

    if (Array.isArray(data.pages)) {
      data.pages.forEach(function (pg) {
        if (pg.status !== 'Draft') {
          addUrl(pg.permalink || 'page.html?slug=' + encodeURIComponent(pg.slug || pg.id), '0.8', 'weekly');
        }
      });
    }

    if (Array.isArray(data.posts)) {
      data.posts.forEach(function (pt) {
        if (pt.status !== 'Draft') {
          addUrl(pt.permalink || 'post.html?slug=' + encodeURIComponent(pt.slug || pt.id), '0.8', 'weekly');
        }
      });
    }

    var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    urls.forEach(function (u) {
      xml += '  <url>\n';
      xml += '    <loc>' + escapeHTML(u.loc) + '</loc>\n';
      xml += '    <lastmod>' + today + '</lastmod>\n';
      xml += '    <changefreq>' + u.freq + '</changefreq>\n';
      xml += '    <priority>' + u.priority + '</priority>\n';
      xml += '  </url>\n';
    });
    xml += '</urlset>\n';
    return xml;
  }

  // Apply Permalink Rewrites & Canonical Tag
  function applyPermalinksToDOM(data) {
    if (!data || !Array.isArray(data.permalinks)) return;
    var settings = data.permalinkSettings || {};
    var baseUrl = (settings.baseUrl || 'https://digitalsamworld.com').replace(/\/+$/, '');
    var currentFile = window.location.pathname.split('/').pop() || 'index.html';
    var currentRel = currentFile + (window.location.search || '');

    var redirectMatch = data.permalinks.find(function (pl) {
      return (
        pl.type === '301 Redirect' &&
        pl.customUrl &&
        pl.sourceUrl &&
        (pl.customUrl.replace(/^\//, '') === currentFile || pl.customUrl.replace(/^\//, '') === currentRel) &&
        pl.customUrl !== pl.sourceUrl
      );
    });
    if (redirectMatch && redirectMatch.sourceUrl) {
      window.location.replace(redirectMatch.sourceUrl);
      return;
    }

    if (settings.autoCanonical !== 'no') {
      var matchedPl = data.permalinks.find(function (pl) {
        return pl.sourceUrl === currentRel || pl.sourceUrl === currentFile || pl.customUrl === currentRel;
      });
      var canonicalHref = matchedPl
        ? matchedPl.canonicalUrl || baseUrl + '/' + matchedPl.customUrl.replace(/^\//, '')
        : baseUrl + '/' + (currentRel === 'index.html' ? '' : currentRel);

      var linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonicalHref);
    }

    if (settings.rewriteLinks !== 'no') {
      var map = {};
      data.permalinks.forEach(function (pl) {
        if (pl.sourceUrl && pl.customUrl && pl.sourceUrl !== pl.customUrl && pl.type !== '301 Redirect') {
          map[pl.sourceUrl] = pl.customUrl;
        }
      });

      if (Object.keys(map).length > 0) {
        document.querySelectorAll('a[href]').forEach(function (a) {
          var href = a.getAttribute('href');
          if (map[href]) {
            a.setAttribute('href', map[href]);
          }
        });
      }
    }
  }

  // Render Discussion / Comments Section on Single Blog Post (post.html)
  function renderPostDiscussionSection(matchedPost, data) {
    var disc = (data.settings && data.settings.discussion) || DEFAULT_SETTINGS.discussion;
    var existingBox = document.getElementById('cmsDiscussionSection');
    var articleCol = document.getElementById('singlePostBody')
      ? document.getElementById('singlePostBody').closest('div')
      : null;
    if (!articleCol) return;

    if (disc.allowComments === 'no') {
      if (existingBox) existingBox.remove();
      return;
    }

    if (!existingBox) {
      existingBox = document.createElement('div');
      existingBox.id = 'cmsDiscussionSection';
      existingBox.className = 'legal-box';
      existingBox.style.cssText = 'padding:2rem;margin-top:2rem;';
      articleCol.appendChild(existingBox);
    }

    var allComments = getComments().filter(function (c) {
      return (c.postSlug === matchedPost.slug || c.postSlug === matchedPost.id) && c.status === 'Approved';
    });

    var avatarBg =
      disc.avatarStyle === 'emerald'
        ? '#DCFCE7;color:#065F46'
        : disc.avatarStyle === 'slate'
        ? '#E2E8F0;color:#1E293B'
        : 'var(--primary-light);color:var(--primary)';

    var commentsListHtml = '';
    if (!allComments.length) {
      commentsListHtml =
        '<p style="color:var(--text-muted);font-size:0.92rem;margin-bottom:1.5rem;">No comments yet. Be the first to share your thoughts!</p>';
    } else {
      commentsListHtml =
        '<div style="display:grid;gap:1rem;margin-bottom:1.75rem;">' +
        allComments
          .map(function (c) {
            var init = (c.author || 'G')
              .split(' ')
              .map(function (n) {
                return n.charAt(0);
              })
              .join('')
              .substring(0, 2)
              .toUpperCase();
            return (
              '<div style="padding:1.15rem;border-radius:12px;background:var(--bg-light);border:1px solid var(--border-light);">' +
              '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem;">' +
              '<div style="display:flex;align-items:center;gap:0.65rem;">' +
              (disc.showAvatars !== 'no'
                ? '<div style="width:34px;height:34px;border-radius:50%;background:' +
                  avatarBg +
                  ';display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.78rem;">' +
                  escapeHTML(init) +
                  '</div>'
                : '') +
              '<strong>' +
              escapeHTML(c.author) +
              '</strong>' +
              '</div>' +
              '<span style="font-size:0.78rem;color:var(--text-muted);">' +
              escapeHTML(c.date) +
              '</span>' +
              '</div>' +
              '<p style="font-size:0.94rem;color:var(--text-body);margin:0;">' +
              escapeHTML(c.content) +
              '</p>' +
              '</div>'
            );
          })
          .join('') +
        '</div>';
    }

    var reqAttr = disc.requireNameEmail !== 'no' ? ' required' : '';
    var reqStar = disc.requireNameEmail !== 'no' ? ' *' : '';

    existingBox.innerHTML =
      '<h3 style="font-size:1.35rem;margin-bottom:1rem;">Reader Discussion (' +
      allComments.length +
      ')</h3>' +
      commentsListHtml +
      '<form id="cmsCommentForm" style="border-top:1px solid var(--border-light);padding-top:1.5rem;">' +
      '<h4 style="font-size:1.08rem;margin-bottom:0.85rem;">Leave a Comment</h4>' +
      '<div class="form-row">' +
      '<div class="form-group">' +
      '<label class="form-label">Your Name' +
      reqStar +
      '</label>' +
      '<input type="text" id="cmtAuthor" class="form-control" placeholder="Full Name"' +
      reqAttr +
      ' />' +
      '</div>' +
      '<div class="form-group">' +
      '<label class="form-label">Email Address' +
      reqStar +
      '</label>' +
      '<input type="email" id="cmtEmail" class="form-control" placeholder="you@company.com"' +
      reqAttr +
      ' />' +
      '</div>' +
      '</div>' +
      '<div class="form-group">' +
      '<label class="form-label">Comment *</label>' +
      '<textarea id="cmtContent" rows="3" class="form-control" placeholder="Share your question or feedback..." required></textarea>' +
      '</div>' +
      '<div id="cmtNotice" style="display:none;margin-bottom:0.85rem;padding:0.65rem 1rem;border-radius:8px;font-size:0.86rem;font-weight:600;"></div>' +
      '<button type="submit" class="btn btn-primary btn-sm">Post Comment &rarr;</button>' +
      '</form>';

    var cmtForm = document.getElementById('cmsCommentForm');
    if (cmtForm) {
      cmtForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var saved = submitComment({
          postSlug: matchedPost.slug || matchedPost.id,
          author: document.getElementById('cmtAuthor').value,
          email: document.getElementById('cmtEmail').value,
          content: document.getElementById('cmtContent').value
        });
        var notice = document.getElementById('cmtNotice');
        if (saved.status === 'Pending') {
          if (notice) {
            notice.style.display = 'block';
            notice.style.background = '#FEF3C7';
            notice.style.color = '#92400E';
            notice.textContent =
              'Thank you! Your comment has been submitted and is awaiting moderation per our Discussion Rules.';
          }
          cmtForm.reset();
        } else {
          renderPostDiscussionSection(matchedPost, data);
        }
      });
    }
  }

  // Apply CMS Data to Any Page on the Site
  function applyCMSToPage(data) {
    if (!data) data = getCMSData();
    var settings = normalizeSettings(data.settings);

    // Apply Media Sizes & Search Visibility first
    applyCoreSettingsToDOM(data);

    var isHome = Boolean(
      document.querySelector('.hero') && document.getElementById('services') && document.getElementById('about')
    );
    var isServicesHub = Boolean(
      window.location.pathname.indexOf('services.html') !== -1 ||
        (document.querySelector('.page-hero') &&
          document.querySelector('.services-grid') &&
          !isHome &&
          !document.getElementById('dynHeroTitle'))
    );
    var isServiceDetail = Boolean(document.getElementById('dynHeroTitle'));
    var isCustomPage = Boolean(document.getElementById('customPageTitle'));
    var isBlogHub = Boolean(document.getElementById('blogPostsGrid'));
    var isSinglePost = Boolean(document.getElementById('singlePostTitle'));

    // 1. Update Header Navigation Menu with "Blog" and Custom Pages (showInHeader === 'yes')
    var navMenus = document.querySelectorAll('.nav-menu');
    navMenus.forEach(function (menu) {
      var oldDynamic = menu.querySelectorAll('.js-cms-nav-dynamic');
      oldDynamic.forEach(function (el) {
        el.remove();
      });

      var contactLi = null;
      menu.querySelectorAll('li.nav-item').forEach(function (li) {
        var a = li.querySelector('a');
        if (a && (a.getAttribute('href') || '').indexOf('contact') !== -1) {
          contactLi = li;
        }
      });

      if (Array.isArray(data.pages)) {
        data.pages.forEach(function (pg) {
          if (pg.status !== 'Draft' && pg.showInHeader === 'yes') {
            var li = document.createElement('li');
            li.className = 'nav-item js-cms-nav-dynamic';
            var pageHref = pg.permalink || 'page.html?slug=' + encodeURIComponent(pg.slug || pg.id);
            var isActive =
              isCustomPage &&
              new URLSearchParams(window.location.search).get('slug') === (pg.slug || pg.id);
            li.innerHTML =
              '<a href="' +
              escapeHTML(pageHref) +
              '" class="nav-link' +
              (isActive ? ' active' : '') +
              '">' +
              escapeHTML(pg.menuTitle || pg.title) +
              '</a>';
            if (contactLi) menu.insertBefore(li, contactLi);
            else menu.appendChild(li);
          }
        });
      }

      var hasBlogLink = false;
      menu.querySelectorAll('a').forEach(function (a) {
        if ((a.getAttribute('href') || '').indexOf('blog') !== -1) {
          hasBlogLink = true;
        }
      });
      if (!hasBlogLink) {
        var blogLi = document.createElement('li');
        blogLi.className = 'nav-item js-cms-nav-dynamic';
        var blogHref = resolvePermalink('blog.html', data);
        blogLi.innerHTML =
          '<a href="' +
          escapeHTML(blogHref) +
          '" class="nav-link' +
          (isBlogHub || isSinglePost ? ' active' : '') +
          '">Blog</a>';
        if (contactLi) menu.insertBefore(blogLi, contactLi);
        else menu.appendChild(blogLi);
      }
    });

    // 2. Update Header Services Mega-Menu Dropdown & Footer Links
    if (data.servicesSection && Array.isArray(data.servicesSection.items)) {
      var dropdownGrids = document.querySelectorAll('.dropdown-menu .dropdown-grid');
      var dropdownHtml = data.servicesSection.items
        .map(function (srv) {
          var iconSvg = ICON_SVGS[srv.icon] || ICON_SVGS.growth;
          return (
            '<a href="' +
            escapeHTML(srv.linkUrl) +
            '" class="dropdown-item">' +
            '<div class="dropdown-icon">' +
            iconSvg +
            '</div>' +
            '<div class="dropdown-text">' +
            '<strong>' +
            escapeHTML(srv.menuTitle || srv.title) +
            '</strong>' +
            '<span>' +
            escapeHTML(srv.menuSubtitle) +
            '</span>' +
            '</div>' +
            '</a>'
          );
        })
        .join('');

      dropdownGrids.forEach(function (grid) {
        grid.innerHTML = dropdownHtml;
      });

      var footerCols = document.querySelectorAll('.footer-col');
      footerCols.forEach(function (col) {
        var h4 = col.querySelector('h4');
        var ul = col.querySelector('ul.footer-links');
        if (!h4 || !ul) return;
        var headingTxt = h4.textContent.trim().toLowerCase();

        if (headingTxt === 'our services') {
          ul.innerHTML = data.servicesSection.items
            .map(function (srv) {
              return (
                '<li><a href="' +
                escapeHTML(srv.linkUrl) +
                '">' +
                escapeHTML(srv.menuTitle || srv.title) +
                '</a></li>'
              );
            })
            .join('');
        }

        if (headingTxt.indexOf('quick links') !== -1) {
          var baseLinks = [
            '<li><a href="' + escapeHTML(resolvePermalink('index.html', data)) + '">Home</a></li>',
            '<li><a href="' + escapeHTML(resolvePermalink('about.html', data)) + '">About Company</a></li>',
            '<li><a href="' + escapeHTML(resolvePermalink('services.html', data)) + '">All 360° Services</a></li>',
            '<li><a href="' + escapeHTML(resolvePermalink('blog.html', data)) + '">Blog &amp; Insights</a></li>'
          ];
          if (Array.isArray(data.pages)) {
            data.pages.forEach(function (pg) {
              if (pg.status !== 'Draft' && pg.showInFooter !== 'no') {
                var pgHref = pg.permalink || 'page.html?slug=' + encodeURIComponent(pg.slug || pg.id);
                baseLinks.push(
                  '<li><a href="' + escapeHTML(pgHref) + '">' + escapeHTML(pg.menuTitle || pg.title) + '</a></li>'
                );
              }
            });
          }
          baseLinks.push('<li><a href="' + escapeHTML(resolvePermalink('contact.html', data)) + '">Contact Us</a></li>');
          baseLinks.push(
            '<li><a href="' + escapeHTML(resolvePermalink('privacy-policy.html', data)) + '">Privacy Policy</a></li>'
          );
          baseLinks.push(
            '<li><a href="' + escapeHTML(resolvePermalink('disclaimer.html', data)) + '">Disclaimer</a></li>'
          );
          baseLinks.push(
            '<li><a href="' +
              escapeHTML(resolvePermalink('terms-and-conditions.html', data)) +
              '">Terms &amp; Conditions</a></li>'
          );
          ul.innerHTML = baseLinks.join('');
        }
      });

      var serviceSelects = document.querySelectorAll('select[name="service"]');
      serviceSelects.forEach(function (sel) {
        var html = '<option value="">— Select Primary Service —</option>';
        html += '<option value="360° Complete Digital Marketing">360° Complete Digital Marketing</option>';
        data.servicesSection.items.forEach(function (srv) {
          html += '<option value="' + escapeHTML(srv.title) + '">' + escapeHTML(srv.title) + '</option>';
        });
        sel.innerHTML = html;
      });
    }

    // 3. Update Global Topbar & Contact across pages
    if (data.contact) {
      var topBadge = document.querySelector('.topbar-badge');
      if (topBadge && isHome) topBadge.textContent = data.contact.topbarBadge;

      var topItems = document.querySelectorAll('.topbar-info .topbar-item span');
      if (topItems[0]) topItems[0].textContent = data.contact.address;
      if (topItems[1]) topItems[1].textContent = data.contact.email;

      var topActSpans = document.querySelectorAll('.topbar-actions .topbar-item span');
      if (topActSpans.length >= 2) {
        topActSpans[0].textContent = data.contact.hours;
        topActSpans[1].textContent = data.contact.phoneDisplay;
      } else if (topActSpans.length === 1) {
        topActSpans[0].textContent = data.contact.phoneDisplay;
      }

      var navPhoneSpan = document.querySelector('.nav-phone span');
      if (navPhoneSpan) navPhoneSpan.textContent = data.contact.phoneDisplay.replace('+91 ', '');
    }

    // 4. If on services.html (All Services Hub)
    if (isServicesHub && data.servicesSection && Array.isArray(data.servicesSection.items)) {
      var hubGrid = document.querySelector('.section .services-grid');
      if (hubGrid) {
        var cardsHtml = data.servicesSection.items.map(renderServiceCardHTML).join('');
        cardsHtml +=
          '<article class="service-card" style="background:linear-gradient(135deg, #EFF6FF 0%, #F0FDF4 100%);color:var(--text-main);border:1px solid #BFDBFE;">' +
          '<div>' +
          '<h3 style="color:var(--text-main);">Not Sure Which Service Fits Best?</h3>' +
          '<p style="color:var(--text-muted);">Book a free 30-minute consultation call with our Chandigarh strategy team (+91 ' +
          escapeHTML(data.contact.phoneRaw) +
          ') and we will build a custom roadmap for your business.</p>' +
          '</div>' +
          '<a href="contact.html" class="btn btn-accent btn-block">Get Free Custom Proposal &rarr;</a>' +
          '</article>';
        hubGrid.innerHTML = cardsHtml;
      }
    }

    // 5. If on service-detail.html
    if (isServiceDetail && data.servicesSection && Array.isArray(data.servicesSection.items)) {
      var params = new URLSearchParams(window.location.search);
      var srvId = params.get('id');
      var matched =
        data.servicesSection.items.find(function (s) {
          return s.id === srvId;
        }) || data.servicesSection.items[0];

      if (matched) {
        document.title = matched.title + ' | ' + settings.general.siteTitle;
        var bcEl = document.getElementById('dynBreadcrumb');
        var titleEl = document.getElementById('dynHeroTitle');
        var descEl = document.getElementById('dynHeroDesc');
        var tagsEl = document.getElementById('dynHeroTags');
        var formTitleEl = document.getElementById('dynFormTitle');
        var formSrvEl = document.getElementById('dynFormService');

        if (bcEl) bcEl.textContent = matched.menuTitle || matched.title;
        if (titleEl) {
          titleEl.innerHTML = '<span class="text-gradient-emerald">' + escapeHTML(matched.title) + '</span>';
        }
        if (descEl) descEl.textContent = matched.desc;
        if (tagsEl && matched.tags) {
          tagsEl.innerHTML = matched.tags
            .split(',')
            .map(function (t) {
              return (
                '<span class="service-tag-pill" style="background:rgba(255,255,255,0.12);color:#FFFFFF;">' +
                escapeHTML(t.trim()) +
                '</span>'
              );
            })
            .join('');
        }
        if (formTitleEl) formTitleEl.textContent = 'Get Your ' + (matched.menuTitle || matched.title) + ' Plan';
        if (formSrvEl) formSrvEl.value = matched.title;
      }

      var allGrid = document.getElementById('allServicesGrid');
      if (allGrid) {
        allGrid.innerHTML = data.servicesSection.items.map(renderServiceCardHTML).join('');
      }
    }

    // 6. Apply Page-Specific Edits from data.pages (Core Pages, Legal Pages & Custom Pages on page.html)
    if (Array.isArray(data.pages)) {
      var curFileOnly = window.location.pathname.split('/').pop() || 'index.html';
      if (isCustomPage) {
        var pgParams = new URLSearchParams(window.location.search);
        var slugParam = pgParams.get('slug') || pgParams.get('id');
        var matchedPage =
          data.pages.find(function (p) {
            return p.slug === slugParam || p.id === slugParam;
          }) ||
          data.pages.find(function (p) {
            return p.pageType === 'Custom Page';
          }) ||
          data.pages[0];

        if (matchedPage) {
          document.title = matchedPage.seoTitle || matchedPage.title + ' | ' + settings.general.siteTitle;
          var pgMeta = document.querySelector('meta[name="description"]');
          if (pgMeta && matchedPage.seoDesc) pgMeta.setAttribute('content', matchedPage.seoDesc);

          var pgBc = document.getElementById('customPageBreadcrumb');
          var pgBadge = document.getElementById('customPageBadge');
          var pgTitle = document.getElementById('customPageTitle');
          var pgSub = document.getElementById('customPageSubtitle');
          var pgBody = document.getElementById('customPageBody');
          var pgCta = document.getElementById('customPageCtaBtn');
          var pgDate = document.getElementById('customPageDate');

          if (pgBc) pgBc.textContent = matchedPage.menuTitle || matchedPage.title;
          if (pgBadge) pgBadge.textContent = matchedPage.badge || 'DigitalSamWorld • Chandigarh HQ';
          if (pgTitle) pgTitle.textContent = matchedPage.title;
          if (pgSub) pgSub.textContent = matchedPage.subtitle;
          if (pgBody) pgBody.innerHTML = formatRichContent(matchedPage.content);

          // Render or remove Featured Image on page.html
          var pgImgHolder = document.getElementById('customPageFeaturedImage');
          if (!pgImgHolder) {
            var pageLegalBox = document.querySelector('.section .about-grid .legal-box');
            if (pageLegalBox) {
              pgImgHolder = document.createElement('div');
              pgImgHolder.id = 'customPageFeaturedImage';
              var dtBar = document.getElementById('customPageDate');
              if (dtBar && dtBar.parentElement) {
                dtBar.parentElement.after(pgImgHolder);
              } else {
                pageLegalBox.insertBefore(pgImgHolder, pageLegalBox.firstChild);
              }
            }
          }
          if (pgImgHolder) {
            if (matchedPage.featuredImage) {
              pgImgHolder.style.display = 'block';
              pgImgHolder.style.marginBottom = '2rem';
              pgImgHolder.style.borderRadius = '14px';
              pgImgHolder.style.overflow = 'hidden';
              pgImgHolder.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              pgImgHolder.innerHTML =
                '<img src="' +
                escapeHTML(matchedPage.featuredImage) +
                '" alt="' +
                escapeAttr(matchedPage.title) +
                '" class="size-large" style="width:100%;max-height:420px;object-fit:' +
                (settings.media.imageFit || 'cover') +
                ';display:block;" />';
            } else {
              pgImgHolder.style.display = 'none';
              pgImgHolder.innerHTML = '';
            }
          }
          if (pgCta) {
            pgCta.textContent = matchedPage.ctaText || 'Book Free Strategy Call';
            pgCta.setAttribute('href', matchedPage.ctaLink || 'contact.html');
          }
          if (pgDate) {
            pgDate.textContent =
              'Last Updated: ' + formatDateBySetting(matchedPage.date || 'Sep 30, 2026', settings.general.dateFormat);
          }
        }
      } else if (!isHome && !isSinglePost && !isServiceDetail && curFileOnly !== 'admin.html') {
        var matchedCoreOrLegal = data.pages.find(function (p) {
          return p.permalink === curFileOnly;
        });
        if (matchedCoreOrLegal) {
          if (matchedCoreOrLegal.seoTitle) document.title = matchedCoreOrLegal.seoTitle;
          var coreMeta = document.querySelector('meta[name="description"]');
          if (coreMeta && matchedCoreOrLegal.seoDesc) coreMeta.setAttribute('content', matchedCoreOrLegal.seoDesc);

          var pageHero = document.querySelector('.page-hero');
          if (pageHero) {
            var phBadge = pageHero.querySelector('.hero-badge span:last-child, .section-tag');
            var phH1 = pageHero.querySelector('h1');
            var phSub = pageHero.querySelector('p');
            if (phBadge && matchedCoreOrLegal.badge) phBadge.textContent = matchedCoreOrLegal.badge;
            if (phH1 && matchedCoreOrLegal.title) phH1.textContent = matchedCoreOrLegal.title;
            if (phSub && matchedCoreOrLegal.subtitle) phSub.textContent = matchedCoreOrLegal.subtitle;
          }

          // Render or remove Featured Image on core / legal pages
          var coreImgHolder = document.getElementById('corePageFeaturedImage');
          if (!coreImgHolder) {
            var coreBox = document.querySelector('.section .legal-box, .legal-box, .legal-card, .about-grid > div:first-child');
            if (coreBox) {
              coreImgHolder = document.createElement('div');
              coreImgHolder.id = 'corePageFeaturedImage';
              coreBox.insertBefore(coreImgHolder, coreBox.firstChild);
            }
          }
          if (coreImgHolder) {
            if (matchedCoreOrLegal.featuredImage && curFileOnly !== 'index.html' && curFileOnly !== 'services.html') {
              coreImgHolder.style.display = 'block';
              coreImgHolder.style.marginBottom = '2rem';
              coreImgHolder.style.borderRadius = '14px';
              coreImgHolder.style.overflow = 'hidden';
              coreImgHolder.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              coreImgHolder.innerHTML =
                '<img src="' +
                escapeHTML(matchedCoreOrLegal.featuredImage) +
                '" alt="' +
                escapeAttr(matchedCoreOrLegal.title) +
                '" class="size-large" style="width:100%;max-height:420px;object-fit:' +
                (settings.media.imageFit || 'cover') +
                ';display:block;" />';
            } else {
              coreImgHolder.style.display = 'none';
              coreImgHolder.innerHTML = '';
            }
          }
        }
      }
    }

    // 7. If on blog.html (Blog & Insights Hub) — enforces Reading Settings (postsPerPage, feedDisplay, excerptLength)
    if (isBlogHub && Array.isArray(data.posts)) {
      var publishedPosts = data.posts.filter(function (p) {
        return p.status !== 'Draft';
      });
      var maxPerPage = parseInt(settings.reading.postsPerPage, 10) || 6;
      var blogGrid = document.getElementById('blogPostsGrid');
      var filterWrap = document.getElementById('blogCategoryFilters');

      var varSliced = [];
      function renderFilteredPosts(cat) {
        var list =
          !cat || cat === 'ALL'
            ? publishedPosts
            : publishedPosts.filter(function (p) {
                return p.category === cat;
              });
        varSliced = list.slice(0, maxPerPage);
        if (!varSliced.length) {
          blogGrid.innerHTML =
            '<div style="grid-column:1/-1;text-align:center;padding:3rem;background:#FFFFFF;border-radius:16px;border:1px solid var(--border-light);">' +
            '<h3>No blog posts found in this category</h3>' +
            '<p style="color:var(--text-muted);margin-top:0.5rem;">Add or publish new posts from the Admin Panel.</p>' +
            '</div>';
          return;
        }
        blogGrid.innerHTML = varSliced
          .map(function (pt) {
            return renderPostCardHTML(pt, settings);
          })
          .join('');
      }
      if (filterWrap) {
        var cats = ['ALL'];
        publishedPosts.forEach(function (p) {
          if (p.category && cats.indexOf(p.category) === -1) cats.push(p.category);
        });
        filterWrap.innerHTML = cats
          .map(function (c, idx) {
            var label = c === 'ALL' ? 'All Insights (' + publishedPosts.length + ')' : c;
            return (
              '<button type="button" class="city-pill' +
              (idx === 0 ? ' hq' : '') +
              '" data-cat="' +
              escapeHTML(c) +
              '" style="cursor:pointer;">' +
              escapeHTML(label) +
              '</button>'
            );
          })
          .join('');

        var filterBtns = filterWrap.querySelectorAll('button[data-cat]');
        filterBtns.forEach(function (btn) {
          btn.addEventListener('click', function () {
            filterBtns.forEach(function (b) {
              b.classList.remove('hq');
            });
            btn.classList.add('hq');
            renderFilteredPosts(btn.getAttribute('data-cat'));
          });
        });
      }

      renderFilteredPosts('ALL');
    }

    // 8. If on post.html (Single Blog Post Reader) — enforces Discussion & Reading Settings
    if (isSinglePost && Array.isArray(data.posts)) {
      var postParams = new URLSearchParams(window.location.search);
      var postSlug = postParams.get('slug') || postParams.get('id');
      var matchedPost =
        data.posts.find(function (p) {
          return p.slug === postSlug || p.id === postSlug;
        }) || data.posts[0];

      if (matchedPost) {
        document.title = matchedPost.title + ' | ' + settings.general.siteTitle + ' Blog';
        var postMeta = document.querySelector('meta[name="description"]');
        if (postMeta && matchedPost.excerpt) postMeta.setAttribute('content', matchedPost.excerpt);

        var pBc = document.getElementById('singlePostBreadcrumb');
        var pCat = document.getElementById('singlePostCategory');
        var pTitle = document.getElementById('singlePostTitle');
        var pMetaBar = document.getElementById('singlePostMeta');
        var pBody = document.getElementById('singlePostBody');
        var pTags = document.getElementById('singlePostTags');
        var pAuthorName = document.getElementById('singlePostAuthorName');
        var pAuthorRole = document.getElementById('singlePostAuthorRole');
        var pAuthorInit = document.getElementById('singlePostAuthorInit');

        if (pBc) pBc.textContent = matchedPost.title;
        if (pCat) pCat.textContent = matchedPost.category;
        if (pTitle) pTitle.textContent = matchedPost.title;
        if (pMetaBar) {
          pMetaBar.innerHTML =
            '<span>By <strong>' +
            escapeHTML(matchedPost.author) +
            '</strong> (' +
            escapeHTML(matchedPost.authorRole) +
            ')</span>' +
            '<span>&bull;</span>' +
            '<span>&#128197; ' +
            escapeHTML(formatDateBySetting(matchedPost.date, settings.general.dateFormat)) +
            '</span>' +
            (settings.reading.showReadTime !== 'no'
              ? '<span>&bull;</span><span>&#9201; ' + escapeHTML(matchedPost.readTime) + '</span>'
              : '');
        }
        if (pBody) pBody.innerHTML = formatRichContent(matchedPost.content);

        // Render or remove Featured Image on post.html
        var postImgHolder = document.getElementById('singlePostFeaturedImage');
        if (!postImgHolder) {
          var postArticleBox = document.querySelector('article.legal-box');
          if (postArticleBox) {
            postImgHolder = document.createElement('div');
            postImgHolder.id = 'singlePostFeaturedImage';
            postArticleBox.insertBefore(postImgHolder, postArticleBox.firstChild);
          }
        }
        if (postImgHolder) {
          if (matchedPost.featuredImage) {
            postImgHolder.style.display = 'block';
            postImgHolder.style.marginBottom = '2rem';
            postImgHolder.style.borderRadius = '14px';
            postImgHolder.style.overflow = 'hidden';
            postImgHolder.style.boxShadow = '0 10px 30px rgba(0,0,0,0.12)';
            postImgHolder.innerHTML =
              '<img src="' +
              escapeHTML(matchedPost.featuredImage) +
              '" alt="' +
              escapeAttr(matchedPost.title) +
              '" class="size-large" style="width:100%;max-height:480px;object-fit:' +
              (settings.media.imageFit || 'cover') +
              ';display:block;" />';
          } else {
            postImgHolder.style.display = 'none';
            postImgHolder.innerHTML = '';
          }
        }
        if (pTags && matchedPost.tags) {
          pTags.innerHTML = matchedPost.tags
            .split(',')
            .map(function (t) {
              return '<span class="service-tag-pill">' + escapeHTML(t.trim()) + '</span>';
            })
            .join('');
        }
        if (pAuthorName) pAuthorName.textContent = matchedPost.author;
        if (pAuthorRole) pAuthorRole.textContent = matchedPost.authorRole;
        if (pAuthorInit) {
          pAuthorInit.style.display = settings.discussion.showAvatars === 'no' ? 'none' : 'flex';
          pAuthorInit.textContent = (matchedPost.author || 'SM')
            .split(' ')
            .map(function (n) {
              return n.charAt(0);
            })
            .join('')
            .substring(0, 2)
            .toUpperCase();
        }

        // Render Reader Discussion & Comments Section based on Discussion Rules
        renderPostDiscussionSection(matchedPost, data);

        var relatedGrid = document.getElementById('relatedPostsGrid');
        if (relatedGrid) {
          var others = data.posts
            .filter(function (p) {
              return p.id !== matchedPost.id && p.status !== 'Draft';
            })
            .slice(0, 3);
          relatedGrid.innerHTML = others
            .map(function (pt) {
              return renderPostCardHTML(pt, settings);
            })
            .join('');
        }
      }
    }

    if (isHome) {
      // Check if Reading Settings override Homepage Display Mode (e.g., Static Custom Page or Blog Feed)
      if (settings.reading.frontPageDisplays === 'blog_feed' && window.location.search.indexOf('no_redirect') === -1) {
        window.location.replace('blog.html');
        return;
      } else if (
        settings.reading.frontPageDisplays === 'custom_page' &&
        settings.reading.frontPageSlug &&
        window.location.search.indexOf('no_redirect') === -1
      ) {
        window.location.replace('page.html?slug=' + encodeURIComponent(settings.reading.frontPageSlug));
        return;
      }

      // 9. Homepage Specific Updates
      if (data.seo) {
        if (data.seo.title) document.title = data.seo.title;
        var metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && data.seo.description) metaDesc.setAttribute('content', data.seo.description);
      }

      if (data.hero) {
        var heroBadgeText = document.querySelector('.hero-badge span:last-child');
        if (heroBadgeText) heroBadgeText.textContent = data.hero.badge;

        var heroH1 = document.querySelector('.hero h1');
        if (heroH1) {
          heroH1.innerHTML =
            escapeHTML(data.hero.titlePrefix) +
            ' <span class="text-gradient-emerald">' +
            escapeHTML(data.hero.titleHighlight) +
            '</span> ' +
            escapeHTML(data.hero.titleSuffix);
        }

        var heroLead = document.querySelector('.hero-lead');
        if (heroLead) heroLead.textContent = data.hero.lead;

        var heroBtns = document.querySelectorAll('.hero-ctas .btn');
        if (heroBtns[0]) {
          var span0 = heroBtns[0].querySelector('span');
          if (span0) span0.textContent = data.hero.primaryBtnText;
          else heroBtns[0].textContent = data.hero.primaryBtnText;
          heroBtns[0].setAttribute('href', data.hero.primaryBtnLink || 'contact.html');
        }
        if (heroBtns[1]) {
          heroBtns[1].textContent = data.hero.secondaryBtnText;
          heroBtns[1].setAttribute('href', data.hero.secondaryBtnLink || 'services.html');
        }

        var metricEls = document.querySelectorAll('.hero-metric-item');
        if (data.hero.metrics) {
          data.hero.metrics.forEach(function (m, idx) {
            if (metricEls[idx]) {
              var st = metricEls[idx].querySelector('strong');
              var sp = metricEls[idx].querySelector('span');
              if (st) st.textContent = m.value;
              if (sp) sp.textContent = m.label;
            }
          });
        }

        var formH2 = document.querySelector('.hero-card-header h2');
        var formP = document.querySelector('.hero-card-header p');
        if (formH2) formH2.textContent = data.hero.formTitle;
        if (formP) formP.textContent = data.hero.formSubtitle;
      }

      // About Section
      var aboutSec = document.getElementById('about');
      if (aboutSec && data.about) {
        var aboutContent = aboutSec.querySelector('.about-content');
        if (aboutContent) {
          var tagEl = aboutContent.querySelector('.section-tag');
          var titleEl = aboutContent.querySelector('.section-title');
          var pEls = aboutContent.querySelectorAll('p');
          if (tagEl) tagEl.textContent = data.about.tag;
          if (titleEl) titleEl.textContent = data.about.title;
          if (pEls[0]) pEls[0].textContent = data.about.para1;
          if (pEls[1]) pEls[1].textContent = data.about.para2;

          var checkSpans = aboutContent.querySelectorAll('.check-item span:last-child');
          if (data.about.checklists) {
            data.about.checklists.forEach(function (txt, idx) {
              if (checkSpans[idx]) checkSpans[idx].textContent = txt;
            });
          }
        }

        var bentoCards = aboutSec.querySelectorAll('.bento-stat-card');
        if (bentoCards[0]) {
          var bTag = bentoCards[0].querySelector('.section-tag');
          var bH3 = bentoCards[0].querySelector('h3');
          var bP = bentoCards[0].querySelector('p');
          if (bTag) bTag.textContent = data.about.bentoTag;
          if (bH3) bH3.textContent = data.about.bentoTitle;
          if (bP) bP.textContent = data.about.bentoDesc;
        }
        if (bentoCards[1]) {
          var bNum1 = bentoCards[1].querySelector('.bento-number');
          var bSt1 = bentoCards[1].querySelector('strong');
          var bP1 = bentoCards[1].querySelector('p');
          if (bNum1) bNum1.textContent = data.about.stat1Num;
          if (bSt1) bSt1.textContent = data.about.stat1Title;
          if (bP1) bP1.textContent = data.about.stat1Desc;
        }
        if (bentoCards[2]) {
          var bNum2 = bentoCards[2].querySelector('.bento-number');
          var bSt2 = bentoCards[2].querySelector('strong');
          var bP2 = bentoCards[2].querySelector('p');
          if (bNum2) bNum2.textContent = data.about.stat2Num;
          if (bSt2) bSt2.textContent = data.about.stat2Title;
          if (bP2) bP2.textContent = data.about.stat2Desc;
        }
      }

      // Dynamic Services Section on Homepage
      var servicesSec = document.getElementById('services');
      if (servicesSec && data.servicesSection) {
        var sTag = servicesSec.querySelector('.section-header .section-tag');
        var sTitle = servicesSec.querySelector('.section-header .section-title');
        var sSub = servicesSec.querySelector('.section-header .section-subtitle');
        if (sTag) sTag.textContent = data.servicesSection.tag;
        if (sTitle) {
          sTitle.innerHTML =
            escapeHTML(data.servicesSection.titlePrefix) +
            ' <span class="text-gradient">' +
            escapeHTML(data.servicesSection.titleHighlight) +
            '</span>';
        }
        if (sSub) sSub.textContent = data.servicesSection.subtitle;

        var sGrid = servicesSec.querySelector('.services-grid');
        if (sGrid && Array.isArray(data.servicesSection.items)) {
          var gridHtml = data.servicesSection.items.map(renderServiceCardHTML).join('');
          gridHtml +=
            '<article class="service-card" style="background:linear-gradient(135deg, #EFF6FF 0%, #F0FDF4 100%);color:var(--text-main);border:1px solid #BFDBFE;">' +
            '<div>' +
            '<div class="service-icon-wrap" style="background:#ECFDF5;color:#059669;border:1px solid #A7F3D0;">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' +
            '</div>' +
            '<h3 style="color:var(--text-main);">360° Full-Funnel Growth Retainer</h3>' +
            '<p style="color:var(--text-muted);">Want our entire Chandigarh squad of SEO engineers, media buyers, designers, and developers working as your extended growth department?</p>' +
            '<div class="service-tags">' +
            '<span class="service-tag-pill" style="background:#EFF6FF;color:#2563EB;border:1px solid #BFDBFE;">Dedicated Pod</span>' +
            '<span class="service-tag-pill" style="background:#ECFDF5;color:#059669;border:1px solid #A7F3D0;">Omnichannel ROI</span>' +
            '</div>' +
            '</div>' +
            '<a href="contact.html" class="btn btn-accent btn-sm" style="margin-top:auto;">' +
            '<span>Get Custom 360° Plan</span>' +
            '</a>' +
            '</article>';
          sGrid.innerHTML = gridHtml;
        }
      }

      // Why Choose Us Section
      var whyCards = document.querySelectorAll('.why-grid .why-card');
      if (whyCards.length && data.whyUs) {
        var whySec = whyCards[0].closest('.section');
        if (whySec) {
          var wTag = whySec.querySelector('.section-header .section-tag');
          var wTitle = whySec.querySelector('.section-header .section-title');
          var wSub = whySec.querySelector('.section-header .section-subtitle');
          if (wTag) wTag.textContent = data.whyUs.tag;
          if (wTitle) {
            wTitle.innerHTML =
              escapeHTML(data.whyUs.titlePrefix) +
              ' <span class="text-gradient-emerald">' +
              escapeHTML(data.whyUs.titleHighlight) +
              '</span>';
          }
          if (wSub) wSub.textContent = data.whyUs.subtitle;
        }
        data.whyUs.items.forEach(function (w, idx) {
          var c = whyCards[idx];
          if (!c) return;
          var num = c.querySelector('.why-num');
          var h3 = c.querySelector('h3');
          var p = c.querySelector('p');
          if (num) num.textContent = w.badge;
          if (h3) h3.textContent = w.title;
          if (p) p.textContent = w.desc;
        });
      }

      // Case Studies Section
      var caseSec = document.getElementById('case-studies');
      if (caseSec && data.caseStudies) {
        var cTag = caseSec.querySelector('.section-header .section-tag');
        var cTitle = caseSec.querySelector('.section-header .section-title');
        var cSub = caseSec.querySelector('.section-header .section-subtitle');
        if (cTag) cTag.textContent = data.caseStudies.tag;
        if (cTitle) {
          cTitle.innerHTML =
            escapeHTML(data.caseStudies.titlePrefix) +
            ' <span class="text-gradient">' +
            escapeHTML(data.caseStudies.titleHighlight) +
            '</span>';
        }
        if (cSub) cSub.textContent = data.caseStudies.subtitle;

        var caseCards = caseSec.querySelectorAll('.case-card');
        data.caseStudies.items.forEach(function (cs, idx) {
          var card = caseCards[idx];
          if (!card) return;
          var cat = card.querySelector('.case-category');
          var h3 = card.querySelector('.case-banner h3');
          var bodyPs = card.querySelectorAll('.case-body > p');
          var kpis = card.querySelectorAll('.case-kpi');
          if (cat) cat.textContent = cs.category;
          if (h3) h3.textContent = cs.title;
          if (bodyPs[0]) bodyPs[0].textContent = cs.desc;
          if (kpis[0]) {
            kpis[0].querySelector('strong').textContent = cs.kpi1Val;
            kpis[0].querySelector('span').textContent = cs.kpi1Label;
          }
          if (kpis[1]) {
            kpis[1].querySelector('strong').textContent = cs.kpi2Val;
            kpis[1].querySelector('span').textContent = cs.kpi2Label;
          }
          if (bodyPs[1]) {
            bodyPs[1].innerHTML = '<strong>Services Deployed:</strong> ' + escapeHTML(cs.services);
          }
        });
      }

      // Core Team Section
      var teamCards = document.querySelectorAll('.team-grid .team-card');
      if (teamCards.length && data.team) {
        var teamSec = teamCards[0].closest('.section');
        if (teamSec) {
          var tTag = teamSec.querySelector('.section-header .section-tag');
          var tTitle = teamSec.querySelector('.section-header .section-title');
          var tSub = teamSec.querySelector('.section-header .section-subtitle');
          if (tTag) tTag.textContent = data.team.tag;
          if (tTitle) {
            tTitle.innerHTML =
              escapeHTML(data.team.titlePrefix) +
              ' <span class="text-gradient">' +
              escapeHTML(data.team.titleHighlight) +
              '</span>';
          }
          if (tSub) tSub.textContent = data.team.subtitle;
        }
        data.team.members.forEach(function (tm, idx) {
          var card = teamCards[idx];
          if (!card) return;
          var av = card.querySelector('.team-avatar');
          var h3 = card.querySelector('h3');
          var role = card.querySelector('.team-role');
          var bio = card.querySelector('.team-bio');
          if (av) av.textContent = tm.initials;
          if (h3) h3.textContent = tm.name;
          if (role) role.textContent = tm.role;
          if (bio) bio.textContent = tm.bio;
        });
      }

      // Testimonials Section
      var testSec = document.getElementById('testimonials');
      if (testSec && data.testimonials) {
        var tsTag = testSec.querySelector('.section-header .section-tag');
        var tsTitle = testSec.querySelector('.section-header .section-title');
        var tsSub = testSec.querySelector('.section-header .section-subtitle');
        if (tsTag) tsTag.textContent = data.testimonials.tag;
        if (tsTitle) {
          tsTitle.innerHTML =
            escapeHTML(data.testimonials.titlePrefix) +
            ' <span class="text-gradient">' +
            escapeHTML(data.testimonials.titleHighlight) +
            '</span>';
        }
        if (tsSub) tsSub.textContent = data.testimonials.subtitle;

        var testCards = testSec.querySelectorAll('.testimonial-card');
        data.testimonials.items.forEach(function (item, idx) {
          var card = testCards[idx];
          if (!card) return;
          var q = card.querySelector('.testimonial-quote');
          var init = card.querySelector('.author-Init');
          var name = card.querySelector('.author-info strong');
          var role = card.querySelector('.author-info span');
          if (q) q.textContent = item.quote;
          if (init) init.textContent = item.initials;
          if (name) name.textContent = item.name;
          if (role) role.textContent = item.role;
        });
      }

      // Dynamic "Latest Blog Posts & Insights" Section on Homepage (Respects Reading Settings homePostsCount!)
      var faqSec = document.getElementById('faqs');
      var homeBlogSec = document.getElementById('latest-articles') || document.getElementById('home-blog-section');
      if (Array.isArray(data.posts)) {
        var pubPosts = data.posts.filter(function (p) {
          return p.status !== 'Draft';
        });
        var homeMax = parseInt(settings.reading.homePostsCount, 10);
        if (isNaN(homeMax)) homeMax = 3;

        var isSectionHidden = data.appearance && data.appearance.siteEditor &&
          data.appearance.siteEditor.sectionVisibility &&
          data.appearance.siteEditor.sectionVisibility.blog === 'hide';

        if (pubPosts.length > 0 && homeMax > 0 && !isSectionHidden) {
          if (!homeBlogSec && faqSec) {
            homeBlogSec = document.createElement('section');
            homeBlogSec.id = 'latest-articles';
            homeBlogSec.className = 'section';
            faqSec.parentNode.insertBefore(homeBlogSec, faqSec);
          }
          if (homeBlogSec) {
            homeBlogSec.style.display = 'block';
            var latestSlice = pubPosts.slice(0, homeMax);
            var gridEl = homeBlogSec.querySelector('#homeLatestPostsGrid') ||
                         homeBlogSec.querySelector('.case-grid') ||
                         homeBlogSec.querySelector('.cases-grid');
            if (gridEl) {
              gridEl.innerHTML = latestSlice
                .map(function (pt) {
                  return renderPostCardHTML(pt, settings);
                })
                .join('');
            } else {
              homeBlogSec.innerHTML =
                '<div class="container">' +
                '<div class="section-header">' +
                '<span class="section-tag">Digital Growth Playbooks &amp; Insights</span>' +
                '<h2 class="section-title">Latest Articles From Our <span class="text-gradient">Growth Strategists</span></h2>' +
                '<p class="section-subtitle">Actionable case frameworks on SEO, AI Search (GEO), Performance Marketing, and Conversion Architecture.</p>' +
                '</div>' +
                '<div class="case-grid cases-grid" id="homeLatestPostsGrid">' +
                latestSlice
                  .map(function (pt) {
                    return renderPostCardHTML(pt, settings);
                  })
                  .join('') +
                '</div>' +
                '<div style="text-align:center;margin-top:2.5rem;">' +
                '<a href="' +
                escapeHTML(resolvePermalink('blog.html', data)) +
                '" class="btn btn-outline">View All Articles &amp; Insights &rarr;</a>' +
                '</div>' +
                '</div>';
            }
          }
        } else if (homeBlogSec) {
          homeBlogSec.style.display = 'none';
        }
      }

      // Cities Section
      var citiesWrap = document.querySelector('.cities-wrap');
      if (citiesWrap && data.cities) {
        var cityList = data.cities.otherCities
          .split(',')
          .map(function (c) {
            return c.trim();
          })
          .filter(Boolean);
        var html = '<span class="city-pill hq">' + escapeHTML(data.cities.hqCity) + '</span>';
        cityList.forEach(function (c) {
          html += '<span class="city-pill">' + escapeHTML(c) + '</span>';
        });
        citiesWrap.innerHTML = html;
      }

      // FAQs Section
      if (faqSec && data.faqs) {
        var fTag = faqSec.querySelector('.section-header .section-tag');
        var fTitle = faqSec.querySelector('.section-header .section-title');
        var fSub = faqSec.querySelector('.section-header .section-subtitle');
        if (fTag) fTag.textContent = data.faqs.tag;
        if (fTitle) {
          fTitle.innerHTML =
            escapeHTML(data.faqs.titlePrefix) +
            ' <span class="text-gradient">' +
            escapeHTML(data.faqs.titleHighlight) +
            '</span>';
        }
        if (fSub) fSub.textContent = data.faqs.subtitle;

        var faqItems = faqSec.querySelectorAll('.faq-item');
        data.faqs.items.forEach(function (fq, idx) {
          var item = faqItems[idx];
          if (!item) return;
          var qSpan = item.querySelector('.faq-question span:first-child');
          var aInner = item.querySelector('.faq-answer-inner');
          if (qSpan) qSpan.textContent = fq.q;
          if (aInner) aInner.textContent = fq.a;
        });
      }

      // Bottom Contact Card
      var contactSec = document.getElementById('contact-section');
      if (contactSec && data.contact) {
        var infoCard = contactSec.querySelector('.contact-info-card');
        if (infoCard) {
          var cTag2 = infoCard.querySelector('.section-tag');
          var cH3 = infoCard.querySelector('h3');
          var cP = infoCard.querySelector('p');
          if (cTag2) cTag2.textContent = data.contact.ctaTag;
          if (cH3) cH3.textContent = data.contact.ctaTitle;
          if (cP) cP.textContent = data.contact.ctaSubtitle;

          var infoPs = infoCard.querySelectorAll('.contact-info-item p');
          if (infoPs[0]) infoPs[0].textContent = data.contact.address;
          if (infoPs[1]) {
            infoPs[1].innerHTML =
              '<a href="tel:+91' +
              escapeHTML(data.contact.phoneRaw) +
              '">' +
              escapeHTML(data.contact.phoneDisplay) +
              '</a>';
          }
          if (infoPs[2]) {
            infoPs[2].innerHTML =
              '<a href="mailto:' +
              escapeHTML(data.contact.email) +
              '">' +
              escapeHTML(data.contact.email) +
              '</a> (digitalsamworld.com)';
          }
          if (infoPs[3]) infoPs[3].textContent = data.contact.hours + ' • Sunday: Closed';
        }
      }
    }

    // Apply Appearance (Themes, Custom Menus, Widgets & Site Editor) across the entire page
    applyAppearanceToDOM(data);

    // Apply Permalinks rewrites & Canonical tag across the entire page
    applyPermalinksToDOM(data);
  }

  function renderSingleWidgetHTML(w, data) {
    var posts = Array.isArray(data.posts)
      ? data.posts.filter(function (p) { return p.status !== 'Draft'; }).slice(0, 3)
      : [];
    var services = (data.servicesSection && Array.isArray(data.servicesSection.items))
      ? data.servicesSection.items.slice(0, 5)
      : [];

    var isDark = w.theme === 'dark';
    var isGrad = w.theme === 'gradient';
    var bgStyle = isGrad
      ? 'background:var(--grad-brand);color:#FFFFFF;border:none;'
      : isDark
      ? 'background:var(--bg-dark-elevated);color:#FFFFFF;border:1px solid rgba(255,255,255,0.12);'
      : 'background:#FFFFFF;color:var(--text-main);border:1px solid var(--border-light);';
    var textColor = isDark || isGrad ? '#E2E8F0' : 'var(--text-body)';
    var headingColor = isDark || isGrad ? '#FFFFFF' : 'var(--text-main)';
    var badgeBg = isDark || isGrad ? 'rgba(255,255,255,0.15)' : 'var(--primary-light)';
    var badgeCol = isDark || isGrad ? '#FFFFFF' : 'var(--primary)';

    var innerExtra = '';
    if (w.type === 'recent_posts' && posts.length) {
      innerExtra =
        '<ul style="margin:0.75rem 0 1rem;display:grid;gap:0.55rem;list-style:none;padding:0;">' +
        posts
          .map(function (pt) {
            var u = pt.permalink || 'post.html?slug=' + encodeURIComponent(pt.slug || pt.id);
            return (
              '<li style="padding-bottom:0.5rem;border-bottom:1px dashed ' +
              (isDark || isGrad ? 'rgba(255,255,255,0.15)' : 'var(--border-light)') +
              ';">' +
              '<a href="' + escapeHTML(u) + '" style="font-size:0.86rem;font-weight:700;color:' + headingColor + ';display:block;line-height:1.35;">' +
              '&rarr; ' + escapeHTML(pt.title) +
              '</a>' +
              '<span style="font-size:0.73rem;color:' + textColor + ';opacity:0.8;">' + escapeHTML(pt.category) + ' &bull; ' + escapeHTML(pt.readTime) + '</span>' +
              '</li>'
            );
          })
          .join('') +
        '</ul>';
    } else if (w.type === 'services_list' && services.length) {
      innerExtra =
        '<ul style="margin:0.75rem 0 1rem;display:grid;gap:0.45rem;list-style:none;padding:0;">' +
        services
          .map(function (srv) {
            return (
              '<li><a href="' + escapeHTML(srv.linkUrl) + '" style="font-size:0.86rem;font-weight:600;color:' + headingColor + ';">&#10003; ' +
              escapeHTML(srv.menuTitle || srv.title) +
              '</a></li>'
            );
          })
          .join('') +
        '</ul>';
    } else if (w.type === 'newsletter') {
      innerExtra =
        '<div style="display:flex;gap:0.45rem;margin-top:0.75rem;flex-wrap:wrap;">' +
        '<input type="email" placeholder="Enter work email..." style="flex:1;min-width:150px;padding:0.55rem 0.75rem;border-radius:8px;border:1px solid rgba(148,163,184,0.4);background:#FFFFFF;color:#0F172A;font-size:0.84rem;" />' +
        '<a href="' + escapeHTML(w.btnUrl || 'contact.html') + '" class="btn btn-accent btn-sm">' + escapeHTML(w.btnText || 'Subscribe') + '</a>' +
        '</div>';
    }

    var btnHtml = '';
    if (w.btnText && w.type !== 'newsletter') {
      btnHtml =
        '<a href="' +
        escapeHTML(w.btnUrl || 'contact.html') +
        '" class="btn ' +
        (isDark || isGrad ? 'btn-accent' : 'btn-primary') +
        ' btn-sm" style="margin-top:0.5rem;">' +
        escapeHTML(w.btnText) +
        '</a>';
    }

    return (
      '<div class="cms-widget-card" data-widget-id="' + escapeHTML(w.id) + '" style="padding:1.45rem;border-radius:var(--radius-md);box-shadow:var(--shadow-sm);' + bgStyle + '">' +
      (w.badge
        ? '<span style="display:inline-block;font-size:0.7rem;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;padding:0.2rem 0.6rem;border-radius:99px;margin-bottom:0.55rem;background:' +
          badgeBg +
          ';color:' +
          badgeCol +
          ';">' +
          escapeHTML(w.badge) +
          '</span>'
        : '') +
      '<h4 style="font-size:1.12rem;margin-bottom:0.45rem;color:' + headingColor + ';">' + escapeHTML(w.title) + '</h4>' +
      (w.content ? '<p style="font-size:0.88rem;line-height:1.6;margin-bottom:0.75rem;color:' + textColor + ';">' + escapeHTML(w.content) + '</p>' : '') +
      innerExtra +
      btnHtml +
      '</div>'
    );
  }

  function applyAppearanceToDOM(data) {
    if (!data) data = getCMSData();
    var app = normalizeAppearance(data.appearance);
    var activeTheme =
      app.themes.find(function (t) {
        return t.id === app.activeThemeId;
      }) || app.themes[0];
    var ed = app.siteEditor || DEFAULT_APPEARANCE.siteEditor;
    var menuCfg = app.menuSettings || DEFAULT_APPEARANCE.menuSettings;

    // 1. Inject Active Theme & Site Editor Global CSS Variables
    var appStyleEl = document.getElementById('sam-cms-appearance-styles');
    if (!appStyleEl) {
      appStyleEl = document.createElement('style');
      appStyleEl.id = 'sam-cms-appearance-styles';
      document.head.appendChild(appStyleEl);
    }

    var btnRadius =
      activeTheme.buttonStyle === 'pill'
        ? '9999px'
        : activeTheme.buttonStyle === 'sharp'
        ? '4px'
        : '12px';

    var secPad =
      ed.sectionSpacing === 'compact'
        ? '3.5rem 0'
        : ed.sectionSpacing === 'spacious'
        ? '6.75rem 0'
        : '5rem 0';

    var cardShadowVal =
      ed.cardShadow === 'subtle'
        ? '0 1px 3px rgba(15, 23, 42, 0.04)'
        : ed.cardShadow === 'elevated'
        ? '0 12px 30px -4px rgba(15, 23, 42, 0.1)'
        : '0 4px 16px -2px rgba(15, 23, 42, 0.06)';

    var isFrontend = window.location.pathname.indexOf('admin.html') === -1;

    if (isFrontend) {
      // Load External Theme Google Fonts dynamically if needed
      var gFontLink = document.getElementById('sam-cms-theme-google-fonts');
      var fontFamilies = [];
      [activeTheme.headingFont, activeTheme.bodyFont].forEach(function (f) {
        if (f && f !== 'System UI' && fontFamilies.indexOf(f) === -1) {
          fontFamilies.push('family=' + encodeURIComponent(f) + ':wght@400;500;600;700;800');
        }
      });
      if (fontFamilies.length) {
        if (!gFontLink) {
          gFontLink = document.createElement('link');
          gFontLink.id = 'sam-cms-theme-google-fonts';
          gFontLink.rel = 'stylesheet';
          document.head.appendChild(gFontLink);
        }
        var fontHref = 'https://fonts.googleapis.com/css2?' + fontFamilies.join('&') + '&display=swap';
        if (gFontLink.getAttribute('href') !== fontHref) {
          gFontLink.setAttribute('href', fontHref);
        }
      }

      // Load External Theme Stylesheet URL (<link rel="stylesheet">) if specified
      var extLinkEl = document.getElementById('sam-cms-external-theme-css');
      if (activeTheme.externalCssUrl) {
        if (!extLinkEl) {
          extLinkEl = document.createElement('link');
          extLinkEl.id = 'sam-cms-external-theme-css';
          extLinkEl.rel = 'stylesheet';
          document.head.appendChild(extLinkEl);
        }
        if (extLinkEl.getAttribute('href') !== activeTheme.externalCssUrl) {
          extLinkEl.setAttribute('href', activeTheme.externalCssUrl);
        }
      } else if (extLinkEl) {
        extLinkEl.remove();
      }

      appStyleEl.textContent =
        ':root {' +
        '--primary: ' + activeTheme.primaryColor + ';' +
        '--primary-hover: ' + activeTheme.secondaryColor + ';' +
        '--secondary: ' + activeTheme.secondaryColor + ';' +
        '--accent: ' + activeTheme.accentColor + ';' +
        '--bg-dark: ' + (activeTheme.darkBgColor || '#F8FAFC') + ';' +
        '--bg-dark-elevated: #FFFFFF;' +
        '--bg-dark-card: #FFFFFF;' +
        '--bg-light: ' + (activeTheme.lightBgColor || '#FFFFFF') + ';' +
        '--text-on-dark: #0F172A;' +
        '--text-on-dark-muted: #64748B;' +
        '--grad-brand: linear-gradient(135deg, ' + activeTheme.primaryColor + ' 0%, ' + activeTheme.secondaryColor + ' 100%);' +
        '--grad-accent: linear-gradient(135deg, #059669 0%, ' + activeTheme.accentColor + ' 100%);' +
        '--grad-dark: linear-gradient(180deg, #F0F7FF 0%, ' + (activeTheme.darkBgColor || '#F8FAFC') + ' 60%, #FFFFFF 100%);' +
        '--font-display: "' + activeTheme.headingFont + '", "Plus Jakarta Sans", sans-serif;' +
        '--font-sans: "' + activeTheme.bodyFont + '", -apple-system, BlinkMacSystemFont, sans-serif;' +
        '--radius-md: ' + (activeTheme.cardRadius || '12px') + ';' +
        '--container-max: ' + (ed.containerWidth || '1280px') + ';' +
        '--shadow-md: ' + cardShadowVal + ';' +
        '}' +
        '.btn { border-radius: ' + btnRadius + '; }' +
        '.section { padding: ' + secPad + '; }' +
        (menuCfg.stickyHeader === 'no' ? '.site-header { position: relative !important; top: auto !important; }' : '') +
        (ed.showTopbar === 'no' ? '.topbar { display: none !important; }' : '') +
        (ed.showFloatingActions === 'no' ? '.floating-actions, .whatsapp-float { display: none !important; }' : '') +
        '\n' +
        (activeTheme.customCss || '') +
        '\n' +
        (ed.customCss || '');
    } else {
      // On admin.html, keep admin styles clean
      appStyleEl.textContent = '';
    }

    if (!isFrontend) return;

    // 2. Apply Custom Navigation Menus (Header .nav-menu & Footer Quick Links)
    var enabledMenus = (app.menus || []).filter(function (m) {
      return m.status !== 'Hidden';
    });
    var headerItems = enabledMenus.filter(function (m) {
      return m.location === 'header' || m.location === 'both';
    });
    var footerItems = enabledMenus.filter(function (m) {
      return m.location === 'footer' || m.location === 'both';
    });

    // Also include published Custom Pages with showInHeader === 'yes' if not already in headerItems
    if (Array.isArray(data.pages)) {
      data.pages.forEach(function (pg) {
        if (pg.status !== 'Draft' && pg.showInHeader === 'yes') {
          var pgHref = pg.permalink || 'page.html?slug=' + encodeURIComponent(pg.slug || pg.id);
          var exists = headerItems.some(function (m) {
            return m.url === pgHref || m.label.toLowerCase() === (pg.menuTitle || pg.title).toLowerCase();
          });
          if (!exists) {
            headerItems.push({
              id: 'dyn_pg_' + pg.id,
              label: pg.menuTitle || pg.title,
              url: pgHref,
              location: 'header',
              type: 'page',
              target: '_self',
              highlight: 'normal',
              status: 'Enabled'
            });
          }
        }
      });
    }

    // Render Header .nav-menu
    var currentFile = window.location.pathname.split('/').pop() || 'index.html';
    var currentRel = currentFile + (window.location.search || '');
    var servicesDropdownItemsHtml = '';
    if (data.servicesSection && Array.isArray(data.servicesSection.items)) {
      servicesDropdownItemsHtml = data.servicesSection.items
        .map(function (srv) {
          var iconSvg = ICON_SVGS[srv.icon] || ICON_SVGS.growth;
          return (
            '<a href="' +
            escapeHTML(srv.linkUrl) +
            '" class="dropdown-item">' +
            '<div class="dropdown-icon">' +
            iconSvg +
            '</div>' +
            '<div class="dropdown-text">' +
            '<strong>' +
            escapeHTML(srv.menuTitle || srv.title) +
            '</strong>' +
            '<span>' +
            escapeHTML(srv.menuSubtitle) +
            '</span>' +
            '</div>' +
            '</a>'
          );
        })
        .join('');
    }

    var navMenus = document.querySelectorAll('.nav-menu');
    if (headerItems.length && navMenus.length) {
      navMenus.forEach(function (menuEl) {
        menuEl.innerHTML = headerItems
          .map(function (item) {
            var resolvedUrl = resolvePermalink(item.url, data);
            var isActive =
              currentRel === item.url ||
              currentFile === item.url ||
              (item.url === 'blog.html' && (currentFile === 'blog.html' || currentFile === 'post.html'));
            var targetAttr = item.target === '_blank' ? ' target="_blank" rel="noopener"' : '';
            var badgeStyle =
              item.highlight === 'badge'
                ? ' style="background:var(--primary-light);color:var(--primary);padding:0.28rem 0.7rem;border-radius:99px;font-weight:700;"'
                : '';

            if (item.type === 'services_dropdown' || item.url === 'services.html') {
              return (
                '<li class="nav-item has-dropdown">' +
                '<a href="' +
                escapeHTML(resolvedUrl) +
                '" class="nav-link js-dropdown-trigger' +
                (isActive ? ' active' : '') +
                '" aria-haspopup="true">' +
                '<span>' +
                escapeHTML(item.label) +
                '</span>' +
                '<svg class="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>' +
                '</a>' +
                '<div class="dropdown-menu" role="menu">' +
                '<div class="dropdown-grid">' +
                servicesDropdownItemsHtml +
                '</div>' +
                '<div class="dropdown-footer">' +
                '<span>Need a custom 360° growth package for your business?</span>' +
                '<a href="services.html">View All 360° Services &rarr;</a>' +
                '</div>' +
                '</div>' +
                '</li>'
              );
            }

            return (
              '<li class="nav-item">' +
              '<a href="' +
              escapeHTML(resolvedUrl) +
              '" class="nav-link' +
              (isActive ? ' active' : '') +
              '"' +
              targetAttr +
              badgeStyle +
              '>' +
              escapeHTML(item.label) +
              '</a>' +
              '</li>'
            );
          })
          .join('');
      });
    }

    // Apply Header CTA Button & Phone Visibility
    var navCtaBtn = document.querySelector('.nav-actions .btn-primary');
    if (navCtaBtn && menuCfg.ctaText) {
      navCtaBtn.textContent = menuCfg.ctaText;
      if (menuCfg.ctaUrl) navCtaBtn.setAttribute('href', menuCfg.ctaUrl);
    }
    var navActions = document.querySelector('.nav-actions');
    if (navActions && !navActions.querySelector('.nav-login-link')) {
      var loginA = document.createElement('a');
      loginA.href = 'login.html';
      loginA.className = 'nav-login-link';
      loginA.textContent = 'Log In';
      if (navCtaBtn) {
        navActions.insertBefore(loginA, navCtaBtn);
      } else {
        navActions.appendChild(loginA);
      }
    }
    var navPhoneEl = document.querySelector('.nav-actions .nav-phone');
    if (navPhoneEl) {
      navPhoneEl.style.display = menuCfg.showPhone === 'no' ? 'none' : '';
    }

    // Update Footer Quick Links from Custom Menus
    if (footerItems.length) {
      var footerCols = document.querySelectorAll('.footer-col');
      footerCols.forEach(function (col) {
        var h4 = col.querySelector('h4');
        var ul = col.querySelector('ul.footer-links');
        if (!h4 || !ul) return;
        if (h4.textContent.trim().toLowerCase().indexOf('quick links') !== -1) {
          var linksHtml = footerItems.map(function (m) {
            var targetAttr = m.target === '_blank' ? ' target="_blank" rel="noopener"' : '';
            return '<li><a href="' + escapeHTML(resolvePermalink(m.url, data)) + '"' + targetAttr + '>' + escapeHTML(m.label) + '</a></li>';
          });
          // Ensure legal links remain accessible
          ['privacy-policy.html|Privacy Policy', 'disclaimer.html|Disclaimer', 'terms-and-conditions.html|Terms & Conditions'].forEach(function (pair) {
            var parts = pair.split('|');
            if (!footerItems.some(function (fi) { return fi.url === parts[0]; })) {
              linksHtml.push('<li><a href="' + escapeHTML(resolvePermalink(parts[0], data)) + '">' + escapeHTML(parts[1]) + '</a></li>');
            }
          });
          ul.innerHTML = linksHtml.join('');
        }
      });
    }

    // 3. Render Custom Widgets in Sidebar, Pre-Footer, Footer & Floating Areas
    var activeWidgets = (app.widgets || []).filter(function (w) {
      return w.status === 'Active';
    });

    // 3A. Sidebar Widgets (on post.html and page.html)
    var sidebarWidgets = activeWidgets.filter(function (w) {
      return w.area === 'sidebar';
    });
    var stickyFormCard = document.querySelector('.about-grid .contact-form-card');
    var existingSidebarWrap = document.getElementById('cmsSidebarWidgetsWrap');
    if (stickyFormCard) {
      if (!existingSidebarWrap) {
        var rightColWrapper = document.createElement('div');
        rightColWrapper.style.cssText = 'display:grid;gap:1.35rem;position:sticky;top:100px;';
        stickyFormCard.style.position = 'static';
        stickyFormCard.parentNode.insertBefore(rightColWrapper, stickyFormCard);
        rightColWrapper.appendChild(stickyFormCard);
        existingSidebarWrap = document.createElement('div');
        existingSidebarWrap.id = 'cmsSidebarWidgetsWrap';
        existingSidebarWrap.style.cssText = 'display:grid;gap:1.25rem;';
        rightColWrapper.appendChild(existingSidebarWrap);
      }
      existingSidebarWrap.innerHTML = sidebarWidgets
        .map(function (w) {
          return renderSingleWidgetHTML(w, data);
        })
        .join('');
    }

    // 3B. Pre-Footer / Above Footer Widgets
    var aboveFooterWidgets = activeWidgets.filter(function (w) {
      return w.area === 'above_footer';
    });
    var siteFooter = document.querySelector('footer.site-footer');
    var existingAboveFooter = document.getElementById('cmsAboveFooterWidgets');
    if (siteFooter) {
      if (aboveFooterWidgets.length > 0 && ed.showPreFooterWidgets !== 'no') {
        if (!existingAboveFooter) {
          existingAboveFooter = document.createElement('section');
          existingAboveFooter.id = 'cmsAboveFooterWidgets';
          existingAboveFooter.className = 'section';
          existingAboveFooter.style.cssText = 'padding:2.75rem 0;background:var(--bg-subtle);border-top:1px solid var(--border-light);';
          siteFooter.parentNode.insertBefore(existingAboveFooter, siteFooter);
        }
        var colsCount = Math.min(aboveFooterWidgets.length, 3);
        existingAboveFooter.innerHTML =
          '<div class="container">' +
          '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.35rem;">' +
          aboveFooterWidgets
            .map(function (w) {
              return renderSingleWidgetHTML(w, data);
            })
            .join('') +
          '</div>' +
          '</div>';
      } else if (existingAboveFooter) {
        existingAboveFooter.remove();
      }
    }

    // 3C. Footer Column Widgets
    var footerColWidgets = activeWidgets.filter(function (w) {
      return w.area === 'footer_col';
    });
    var footerBrand = document.querySelector('.footer-brand');
    var existingFooterWdg = document.getElementById('cmsFooterColWidgets');
    if (footerBrand) {
      if (footerColWidgets.length > 0) {
        if (!existingFooterWdg) {
          existingFooterWdg = document.createElement('div');
          existingFooterWdg.id = 'cmsFooterColWidgets';
          existingFooterWdg.style.cssText = 'margin-top:1.25rem;display:grid;gap:0.85rem;';
          footerBrand.appendChild(existingFooterWdg);
        }
        existingFooterWdg.innerHTML = footerColWidgets
          .map(function (w) {
            return renderSingleWidgetHTML(w, data);
          })
          .join('');
      } else if (existingFooterWdg) {
        existingFooterWdg.remove();
      }
    }

    // 3D. Floating Promo Badge Widget
    var floatingWidgets = activeWidgets.filter(function (w) {
      return w.area === 'floating_badge';
    });
    var existingFloatWdg = document.getElementById('cmsFloatingBadgeWidget');
    if (floatingWidgets.length > 0) {
      if (!existingFloatWdg) {
        existingFloatWdg = document.createElement('div');
        existingFloatWdg.id = 'cmsFloatingBadgeWidget';
        existingFloatWdg.style.cssText = 'position:fixed;bottom:20px;left:20px;z-index:990;max-width:300px;';
        document.body.appendChild(existingFloatWdg);
      }
      existingFloatWdg.innerHTML = renderSingleWidgetHTML(floatingWidgets[0], data);
    } else if (existingFloatWdg) {
      existingFloatWdg.remove();
    }

    // 4. Apply Site Editor Section Visibility & Footer Copyright
    if (ed.footerCopyright) {
      var footerCopyP = document.querySelector('.footer-bottom p');
      if (footerCopyP) {
        footerCopyP.textContent = ed.footerCopyright;
      }
    }

    if (ed.sectionsVisibility) {
      var vis = ed.sectionsVisibility;
      var secMap = {
        hero: document.querySelector('.hero'),
        marquee: document.querySelector('.trust-bar, .marquee-section'),
        about: document.getElementById('about'),
        services: document.getElementById('services'),
        whyUs: document.querySelector('.why-grid') ? document.querySelector('.why-grid').closest('.section') : null,
        caseStudies: document.getElementById('case-studies'),
        team: document.querySelector('.team-grid') ? document.querySelector('.team-grid').closest('.section') : null,
        testimonials: document.getElementById('testimonials'),
        blog: document.getElementById('home-blog-section'),
        cities: document.querySelector('.cities-wrap') ? document.querySelector('.cities-wrap').closest('.section') : null,
        faqs: document.getElementById('faqs'),
        contact: document.getElementById('contact-section')
      };
      Object.keys(secMap).forEach(function (k) {
        if (secMap[k]) {
          secMap[k].style.display = vis[k] === 'hide' ? 'none' : '';
        }
      });
    }
  }

  // Expose API globally for admin.html and main.js
  window.SamCMS = {
    DEFAULT_DATA: DEFAULT_CMS_DATA,
    DEFAULT_SETTINGS: DEFAULT_SETTINGS,
    DEFAULT_APPEARANCE: DEFAULT_APPEARANCE,
    EXTERNAL_THEME_DIRECTORY: EXTERNAL_THEME_DIRECTORY,
    parseWPTheme: parseWPStyleCssTheme,
    DEFAULT_USERS: DEFAULT_USERS,
    ROLE_DEFINITIONS: ROLE_DEFINITIONS,
    DEFAULT_PERMALINKS: DEFAULT_PERMALINKS,
    DEFAULT_MEDIA_LIBRARY: DEFAULT_MEDIA_LIBRARY,
    normalizeMediaItem: normalizeMediaItem,
    formatMediaBytes: formatMediaBytes,
    parseMediaBytes: parseMediaBytes,
    getMediaItems: function () { return (getCMSData().mediaLibrary || []); },
    addMediaItem: addMediaItem,
    updateMediaItem: updateMediaItem,
    deleteMediaItem: deleteMediaItem,
    deleteMediaItems: deleteMediaItems,
    ICON_SVGS: ICON_SVGS,
    POST_THEME_STYLES: POST_THEME_STYLES,
    slugify: cleanSlugOnly,
    getData: getCMSData,
    saveData: saveCMSData,
    resetData: resetCMSData,
    authenticateUser: authenticateUser,
    resolvePermalink: resolvePermalink,
    generateSitemapXML: generateSitemapXML,
    generateHtaccessRules: generateHtaccessRules,
    applyToPage: applyCMSToPage,
    applyAppearance: applyAppearanceToDOM,
    getComments: getComments,
    saveComments: saveComments,
    addCommentAdmin: addCommentAdmin,
    updateComment: updateComment,
    setCommentStatus: setCommentStatus,
    submitComment: submitComment,
    toggleCommentStatus: toggleCommentStatus,
    deleteComment: deleteComment,
    getLeads: getLeads,
    addLead: addLead,
    deleteLead: deleteLead,
    toggleLeadStatus: toggleLeadStatus,
    AUTH_KEY: AUTH_KEY,
    PASS_KEY: PASS_KEY
  };

  // Auto-apply on DOMContentLoaded & listen for live changes from Admin Panel
  document.addEventListener('DOMContentLoaded', function () {
    applyCMSToPage();

    window.addEventListener('storage', function (e) {
      if (e.key === STORAGE_KEY || e.key === COMMENTS_KEY) {
        applyCMSToPage();
      }
    });

    if (window.BroadcastChannel) {
      try {
        var bc = new BroadcastChannel('sam_cms_channel');
        bc.onmessage = function (ev) {
          if (ev.data && ev.data.type === 'CMS_UPDATED') {
            applyCMSToPage(ev.data.data);
          }
        };
      } catch (err) {}
    }
  });
})(window);
