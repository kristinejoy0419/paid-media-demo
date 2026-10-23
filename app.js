/* ==================== LIBRARY: channels, placements, ad unit specs ==================== */
const TIERS=['lean','standard','full'], TIERNAME=['Low','Medium','High'];
const STAGE={Awareness:'aw',Consideration:'co',Conversion:'cv'};
const BUYUNIT={CPM:'impressions',CPC:'clicks',CPV:'views',CPL:'leads',CPS:'sends'};

const UNITS={
 li_image:{platform:'LinkedIn',name:'Single Image Ad',variants:['1.91:1 · 1200×627','1:1 · 1080×1080'],files:'JPG, PNG, GIF (static)',max:'5 MB',length:'—',copy:['Main copy (intro text) ≤150 chars recommended (3,000 max)','Headline ≤70 chars recommended (200 max)','Description ≤100 chars recommended (300 max; shows on LinkedIn Audience Network)','CTA button from LinkedIn list'],notes:'Keep logo and key claim inside the center 80%.',lead:10},
 li_video:{platform:'LinkedIn',name:'Video Ad',variants:['16:9 · 1920×1080','1:1 · 1080×1080','9:16 · 1080×1920'],files:'MP4',max:'200 MB',length:'15–30s recommended (3s–30min)',copy:['Main copy (intro text) ≤150 chars recommended (3,000 max)','Headline ≤70 chars recommended (200 max)','Burned-in captions or .srt file'],notes:'Brand and proof point in the first 3 seconds; most views are muted.',lead:21},
 li_tla:{platform:'LinkedIn',name:'Thought Leader Ad',variants:['Organic member post (image, video or text)'],files:'As posted by the member',max:'—',length:'—',copy:['Post up to 3,000 chars','Sponsorship approval from the member'],notes:'Post cannot be edited once promoted. Use exec and security-practitioner creator posts.',lead:7},
 li_doc:{platform:'LinkedIn',name:'Document Ad',variants:['PDF, 1:1 or 4:5 pages'],files:'PDF, PPT, DOCX',max:'100 MB · 300 pages',length:'≤10 pages recommended',copy:['Main copy (intro text) ≤150 chars recommended (3,000 max)','Headline ≤70 chars recommended (200 max)'],notes:'Gate after 3–5 preview pages with a Lead Gen Form.',lead:15},
 li_lgf:{platform:'LinkedIn',name:'Lead Gen Form',variants:['Form'],files:'—',max:'—',length:'—',copy:['Headline ≤60 chars','Details ≤160 chars','3–4 questions recommended (12 max)','Privacy policy URL, thank-you message ≤300 chars'],notes:'Sync to CRM / MAP before launch.',lead:5},
 li_conv:{platform:'LinkedIn',name:'Conversation Ad',variants:['Message flow','Banner 300×250 (desktop, optional)'],files:'JPG, PNG',max:'2 MB banner',length:'—',copy:['Opening message ≤500 chars recommended (8,000 max)','Up to 5 CTA buttons ≤25 chars each','Sender: real person with profile photo'],notes:'Map each button to a branch before trafficking.',lead:10},
 gs_rsa:{platform:'Google Ads',name:'Responsive Search Ad',variants:['RSA set per ad group'],files:'—',max:'—',length:'—',copy:['Up to 15 headlines ≤30 chars','Up to 4 descriptions ≤90 chars','2 path fields ≤15 chars'],notes:'Pin brand headline in position 1 for brand ad groups.',lead:5},
 gs_ext:{platform:'Google Ads',name:'Search assets',variants:['Sitelinks','Callouts','Image asset 1.91:1 · 1200×628','Image asset 1:1 · 1200×1200'],files:'JPG, PNG',max:'5 MB',length:'—',copy:['Sitelink text ≤25 chars, 2 lines ≤35 chars','Callouts ≤25 chars'],notes:'',lead:5},
 x_image:{platform:'X',name:'Image Ad',variants:['1:1 · 1200×1200','1.91:1 · 1200×628'],files:'PNG, JPG',max:'5 MB',length:'—',copy:['Post text ≤280 chars (≤100 recommended)','Website card headline ≤70 chars (≤50 recommended; truncates after ~50)'],notes:'',lead:7},
 x_video:{platform:'X',name:'Video Ad',variants:['1:1 · 1200×1200','16:9 · 1920×1080','9:16 · 1080×1920'],files:'MP4, MOV',max:'1 GB',length:'≤15s recommended (2:20 max)',copy:['Post text ≤280 chars','Captions recommended'],notes:'',lead:14},
 rd_image:{platform:'Reddit',name:'Promoted Post · Image',variants:['1:1 · 1080×1080','4:5 · 1080×1350'],files:'JPG, PNG, GIF',max:'20 MB',length:'—',copy:['Headline ≤300 chars (≤150 recommended)','Native, practitioner tone; no hard sell'],notes:'Turn comments on and assign a community manager.',lead:7,verify:true},
 meta_feed_img:{platform:'Meta',name:'Feed image ad',covers:'Facebook Feed, Instagram Feed, Marketplace, Messenger inbox',variants:['1:1 · 1080×1080','4:5 · 1080×1350'],files:'JPG, PNG',max:'30 MB',length:'—',copy:['Primary text ≤125 chars recommended','Headline ≤40 chars recommended','Description ≤30 chars (Facebook only)'],notes:'Keep text light on the image; Advantage+ placements may crop to 1.91:1, so keep the logo and claim centered.',lead:7},
 meta_feed_vid:{platform:'Meta',name:'Feed video ad',covers:'Facebook Feed, Instagram Feed, in-stream',variants:['4:5 · 1080×1350','1:1 · 1080×1080'],files:'MP4, MOV',max:'4 GB',length:'≤15s recommended (1s–241 min)',copy:['Primary text ≤125 chars recommended','Headline ≤40 chars recommended','Captions on (most views are muted)'],notes:'Product or proof point in the first 3 seconds.',lead:14},
 meta_reels:{platform:'Meta',name:'Reels & Stories video',covers:'Facebook Reels, Instagram Reels, Facebook Stories, Instagram Stories',variants:['9:16 · 1080×1920'],files:'MP4, MOV',max:'4 GB',length:'≤15s recommended (Reels ≤90s, Stories ≤60s per card)',copy:['Primary text ≤72 chars shown','Keep the top 14% and bottom 35% clear of text (UI overlay)'],notes:'Shoot vertical; sound on with captions.',lead:14},
 meta_lgf:{platform:'Meta',name:'Instant Form (lead ad)',covers:'Facebook and Instagram lead ads',variants:['Form'],files:'—',max:'—',length:'—',copy:['Intro headline ≤60 chars','3–4 questions recommended (15 max)','Privacy policy URL, thank-you screen'],notes:'Sync to CRM / MAP before launch; use "Higher intent" form type for B2B.',lead:5},
 yt_instream:{platform:'YouTube',name:'Skippable In-stream',variants:['16:9 · 1920×1080'],files:'Upload to YouTube (MP4/MOV)',max:'—',length:'15–30s recommended; skippable after 5s',copy:['Headline ≤40 chars (shown in-stream)','Long headline ≤90 chars (in-feed placements)','Description ≤90 chars','Companion banner auto-generated'],notes:'Logo and message inside the first 5 seconds.',lead:21},
 yt_shorts:{platform:'YouTube',name:'Shorts',variants:['9:16 · 1080×1920'],files:'Upload to YouTube',max:'—',length:'15–30s recommended (60s max)',copy:['Headline ≤40 chars'],notes:'Keep text clear of the bottom 20% and right edge (UI overlay).',lead:14},
 nl_sponsor:{platform:'Publisher',name:'Newsletter sponsorship',variants:['Hero image 600×300','Logo (PNG, transparent)'],files:'PNG, JPG',max:'Per media kit',length:'—',copy:['Headline ≤60 chars','Body 50–75 words','1 CTA with tracked URL'],notes:'Specs vary by publisher. Confirm against the media kit.',lead:10,verify:true},
 iab_display:{platform:'Programmatic / publisher',name:'IAB display set',variants:['300×250','728×90','970×250','300×600','320×50','160×600'],files:'JPG, PNG, GIF, HTML5',max:'150 KB initial load',length:'Animation ≤15s, max 3 loops',copy:['Headline ≤8 words','CTA ≤3 words'],notes:'1px border on white backgrounds. HTML5 needs clickTag.',lead:10},
 native_display:{platform:'Programmatic',name:'Native display',variants:['1.91:1 · 1200×627','1:1 · 1200×1200','Logo 1:1 ≥300×300'],files:'JPG, PNG',max:'1 MB',length:'—',copy:['Headline ≤50 chars','Body ≤90 chars','CTA ≤15 chars'],notes:'',lead:7},
 native_article:{platform:'Publisher',name:'Sponsored article',variants:['Header image 1200×675','Logo'],files:'DOCX copy + JPG/PNG',max:'—',length:'800–1,200 words',copy:['2–3 links with UTM','Customer quote with approval'],notes:'Publisher editorial review adds about a week.',lead:21},
 podcast:{platform:'Podcast',name:'Host-read mid-roll',variants:['Talking points'],files:'DOC',max:'—',length:'60s read',copy:['3–5 talking points','Pronunciation guide','Vanity URL or promo code'],notes:'',lead:10},
 creator_post:{platform:'Creator',name:'Paid creator post',variants:['Creator brief'],files:'DOC brief',max:'—',length:'—',copy:['Key messages and proof points','Mandatory #ad / partnership disclosure'],notes:'Creator keeps their own voice; approve claims only.',lead:14},
 event_pkg:{platform:'Event organizer',name:'Event digital package',variants:['App / site banner (organizer spec)','Attendee email','Logo files (SVG, EPS)'],files:'PNG, SVG, HTML email',max:'Per organizer',length:'—',copy:['Meeting-booking CTA','Booth / session details'],notes:'Organizer deadlines are usually 4–6 weeks before the show.',lead:30,verify:true},
 wc_moments:{platform:'WeChat (Tencent Ads)',name:'Moments ad',variants:['Image 1:1 · 800×800','Video 16:9 · 1280×720','Video 9:16 · 720×1280'],files:'JPG, PNG, MP4',max:'Per Tencent Ads',length:'6–30s video',copy:['Outer text ≤40 Chinese characters','Localized ZH copy and landing page'],notes:'Tencent review and China-accessible landing page required.',lead:21,verify:true},
 wc_oa:{platform:'WeChat (Tencent Ads)',name:'Official Account article ad',variants:['Banner (Tencent Ads spec)'],files:'JPG, PNG',max:'Per Tencent Ads',length:'—',copy:['Title and description per Tencent Ads limits','Localized ZH copy'],notes:'',lead:21,verify:true},
 wc_channels:{platform:'WeChat (Tencent Ads)',name:'Channels video',variants:['9:16 · 1080×1920'],files:'MP4',max:'Per Tencent Ads',length:'6–60s',copy:['ZH captions burned in'],notes:'',lead:21,verify:true},
 bd_search:{platform:'Baidu',name:'Search ad',variants:['Text ad set'],files:'—',max:'—',length:'—',copy:['Title ≤25 Chinese characters','Description ≤80 Chinese characters'],notes:'Landing page must be reachable in mainland China.',lead:21,verify:true},
 nv_search:{platform:'Naver',name:'PowerLink search ad',variants:['Text ad set'],files:'—',max:'—',length:'—',copy:['Title ≤15 chars','Description ≤45 chars','Localized KO copy'],notes:'',lead:10,verify:true},
 nv_gfa:{platform:'Naver',name:'GFA feed / display',variants:['1.91:1 · 1200×628','1:1 · 1200×1200'],files:'JPG, PNG',max:'Per Naver GFA',length:'—',copy:['Headline and body per Naver GFA limits','Localized KO copy'],notes:'',lead:14,verify:true},
};

const FORMATS=[
 {id:'video',name:'Video',note:'In-feed, in-stream, Shorts, Channels'},
 {id:'static',name:'Static image',note:'Single image, in-feed, native, logos'},
 {id:'display',name:'Display banners (static / HTML5)',note:'IAB sizes, publisher banners'},
 {id:'document',name:'Document / PDF',note:'Gated reports, decks'},
 {id:'text',name:'Search & text ads',note:'RSA sets, sitelinks, local search'},
 {id:'messaging',name:'Messaging & lead forms',note:'Conversation ads, lead gen forms'},
 {id:'social_post',name:'Thought leader & creator posts',note:'Exec and creator posts, briefs'},
 {id:'article',name:'Newsletter & sponsored copy',note:'Newsletter units, articles'},
 {id:'audio',name:'Audio',note:'Podcast host-reads'},
 {id:'event',name:'Event packages',note:'Organizer banners, attendee email'}];
const FMTNAME=Object.fromEntries(FORMATS.map(f=>[f.id,f.name]));
// creative units grouped by platform for the inputs panel and the spec sheet
const UNIT_GROUPS=[['Search',['gs_rsa','gs_ext','bd_search','nv_search']],['Display & programmatic',['iab_display','native_display','nv_gfa']],['LinkedIn',['li_image','li_video','li_doc','li_lgf','li_conv','li_tla']],
 ['Meta',['meta_feed_img','meta_feed_vid','meta_reels','meta_lgf']],['X',['x_image','x_video']],['Reddit',['rd_image']],['YouTube',['yt_instream','yt_shorts']],['WeChat',['wc_moments','wc_oa','wc_channels']],
 ['Publishers & newsletters',['nl_sponsor','native_article']],['Creators & podcasts',['creator_post','podcast']],['Events',['event_pkg']]];
const UNIT_GROUP=Object.fromEntries(UNIT_GROUPS.flatMap(([g,us])=>us.map(u=>[u,g])));
const specSig=u=>{const U=UNITS[u];return [U.variants.join('|'),U.files,U.max,U.length,U.copy.join('|')].join('#')};
const UNIT_META={li_image:['static','paid_social'],li_video:['video','paid_social'],li_tla:['social_post','paid_social'],li_doc:['document','paid_social'],li_lgf:['messaging','paid_social'],li_conv:['messaging','paid_messaging'],
 gs_rsa:['text','cpc'],gs_ext:['text','cpc'],meta_feed_img:['static','paid_social'],meta_feed_vid:['video','paid_social'],meta_reels:['video','paid_social'],meta_lgf:['messaging','paid_social'],x_image:['static','paid_social'],x_video:['video','paid_social'],rd_image:['static','paid_social'],yt_instream:['video','paid_video'],yt_shorts:['video','paid_video'],
 nl_sponsor:['article','newsletter'],iab_display:['display','display'],native_display:['static','native'],native_article:['article','sponsored_content'],podcast:['audio','audio'],creator_post:['social_post','influencer'],
 event_pkg:['event','event'],wc_moments:['static','paid_social'],wc_oa:['display','display'],wc_channels:['video','paid_social'],bd_search:['text','cpc'],nv_search:['text','cpc'],nv_gfa:['static','display']};
const TAGS={
 linkedin:{tag:'LinkedIn Insight Tag (site-wide) + Conversions API',events:'Page view, sign-up start, account created, report download, webinar registration',click:'li_fat_id (auto) + UTMs; Lead Gen Forms synced to CRM / MAP with hidden field = line ID',extra:'Matched audiences from CRM lists; Insight Tag retargeting audiences'},
 google:{tag:'Google tag (gtag.js) + Google Ads conversion actions; enhanced conversions; GA4 conversion import',events:'Sign-up start, account created, first campaign created',click:'Auto-tagging (gclid) on; ValueTrack {campaignid} {adgroupid} {keyword} in final URL suffix',extra:'Customer Match lists for brand exclusions'},
 meta:{tag:'Meta Pixel + Conversions API',events:'PageView, Lead, CompleteRegistration, sign-up start',click:'fbclid (auto) + UTMs; Instant Form leads synced to CRM / MAP',extra:'Custom audiences from CRM lists; exclude active customers'},
 x:{tag:'X Pixel (base code + event codes) + X Conversions API',events:'Page view, sign-up start, account created',click:'twclid (auto) + UTMs',extra:'Website activity audiences'},
 reddit:{tag:'Reddit Pixel + Reddit Conversions API',events:'Page view, sign-up start, lead',click:'rdt_cid (auto) + UTMs',extra:''},
 youtube:{tag:'Google Ads conversion actions (shared Google tag); view-through conversions on',events:'Engaged view, site visit, sign-up start',click:'Auto-tagging (gclid) + UTMs',extra:'Video viewer remarketing lists'},
 trade:{tag:'Ad server (e.g., CM360) third-party display tags + 1×1 impression trackers for newsletters and articles',events:'Floodlight / site activity: landing view, sign-up start',click:'Ad-server click trackers wrapping the UTM URL',extra:'Verification (e.g., DV or IAS) on display; publisher sends delivery screenshots for newsletters'},
 creators:{tag:'Vanity URLs and promo codes per creator / show, redirecting to UTM URLs',events:'Landing view, sign-up start',click:'Unique UTM per creator or episode',extra:'Creator reports post analytics weekly'},
 abm:{tag:'ABM platform pixel (site-wide) + ad-server tags',events:'Account engagement, page view, sign-up start',click:'DSP click macros + UTMs',extra:'Account list sync from CRM; exclude active customers per format'},
 events:{tag:'Organizer lead-retrieval export + meeting-scheduler tracking',events:'Meeting booked, booth scan, session attendance',click:'QR codes and scheduler links carry UTMs',extra:'Upload attendee list to CRM within 48 hours'},
 wechat:{tag:'Tencent Ads conversion tracking (data source JS / SDK) on a China-hosted H5 landing page',events:'Page view, form submit, follow official account',click:'Tencent click ID (auto) + UTMs',extra:'Landing page hosted in mainland China; PIPL consent'},
 baidu:{tag:'Baidu Tongji (百度统计) + Baidu Ads OCPC conversion tracking',events:'Page view, form submit',click:'bd_vid (auto) + UTMs',extra:'ICP-licensed, China-hosted landing page'},
 naver:{tag:'Naver Premium Log Analysis (wcs script) + Naver Ads conversion tracking',events:'Page view, sign-up start, form submit',click:'Naver auto parameters + UTMs',extra:'PIPA consent on Korean landing page'},
};
const UTM_SRC={linkedin:'linkedin',google:'google',meta:'meta',x:'x',reddit:'reddit',youtube:'youtube',trade:'tradepress',creators:'creators',abm:'abm_dsp',events:'events',wechat:'wechat',baidu:'baidu',naver:'naver'};
const TRADE_PUB={NA:'Dark Reading, CSO Online, SecurityWeek, TechTarget (SearchSecurity, SearchDataBackup), CIO Dive',EMEA:'Infosecurity Magazine, The Register, ComputerWeekly, SC Media UK',CN:'FreeBuf, InfoQ China',JP:'ITmedia Enterprise, Nikkei xTECH, @IT',KR:'Boannews, ZDNet Korea',SEA:'Tech in Asia, CIO & CISO Asia',LATAM:'IT Forum, CISO Advisor'};

// ini = index of initiative (0 brand / 1 cross-sell / 2 data), min = first tier (0 lean, 1 standard, 2 full)
const CH=[
 {id:'linkedin',name:'LinkedIn',group:'Paid social',weight:34,markets:{exclude:['CN']},personas:['dm','tech','user'],pl:[
  {id:'li_si',name:'Sponsored Content · Single Image',units:['li_image'],min:0,share:30,buy:'CPM',rate:55,stage:'Awareness',ini:0,tgt:'Job functions & titles (CISO, CIO, VP Infrastructure, Security Architect, Backup Admin); industries: financial services, healthcare, public sector, retail, manufacturing; company list: named target accounts + lookalikes',kpi:'CTR ≥ 0.5%; eCPM'},
  {id:'li_vid',name:'Sponsored Content · Video (proof-point testimonials)',units:['li_video'],min:0,share:25,buy:'CPM',rate:60,stage:'Awareness',ini:0,tgt:'Same as single image + video viewer retargeting',kpi:'VTR ≥ 25%; cost per 3s view'},
  {id:'li_tla',name:'Thought Leader Ads (execs + creators)',units:['li_tla'],min:0,share:15,buy:'CPM',rate:40,stage:'Awareness',ini:0,tgt:'Followers of competitor and industry pages; job titles above',kpi:'Engagement ≥ 2%; social share of voice'},
  {id:'li_doc',name:'Document Ads + Lead Gen (gated report)',units:['li_doc','li_lgf'],min:1,share:20,buy:'CPL',rate:150,stage:'Consideration',ini:0,tgt:'CISO, Security Architect, Backup / Storage Architect at target accounts',kpi:'CPL ≤ $120; form completion ≥ 10%'},
  {id:'li_rt',name:'Retargeting · existing customers (cross-sell)',units:['li_image'],min:1,share:10,buy:'CPC',rate:9,stage:'Conversion',ini:1,tgt:'Matched audiences: current customer contact lists (data-center-only users); site visitors',kpi:'CTR ≥ 0.8%; cloud / SaaS expansion opportunities'},
  {id:'li_tech',name:'Sponsored Content · technical webinars & labs (cloud, SaaS, identity)',units:['li_image'],min:1,share:10,buy:'CPC',rate:9,stage:'Consideration',ini:2,tgt:'Cloud Architect, Security Architect, SecOps; current customers not yet protecting cloud or SaaS data',kpi:'Webinar and lab registrations; expansion opportunities'},
  {id:'li_conv',name:'Conversation Ads · workshop & webinar invites',units:['li_conv'],min:2,share:10,buy:'CPS',rate:0.6,stage:'Consideration',ini:2,tgt:'Tier 1–2 account lists; security and infrastructure leads',kpi:'Open ≥ 50%; click ≥ 3%; registrations'}]},
 {id:'google',name:'Google Search',group:'Paid search',weight:12,markets:{exclude:['CN']},personas:['tech','user'],pl:[
  {id:'gs_brand',name:'Brand + product terms',units:['gs_rsa','gs_ext'],min:0,share:35,buy:'CPC',rate:4,stage:'Conversion',ini:1,tgt:'Exact / phrase: brand, product and feature names',kpi:'Impression share ≥ 90%; sign-up CVR'},
  {id:'gs_cat',name:'Category terms (ransomware recovery, data security)',units:['gs_rsa','gs_ext'],min:0,share:45,buy:'CPC',rate:9,stage:'Consideration',ini:0,tgt:'Phrase / broad + smart bidding: “ransomware recovery”, “immutable backup”, “cyber recovery”, “data security posture management”',kpi:'CPC ≤ $9; CTR ≥ 4%'},
  {id:'gs_comp',name:'Competitor conquest',units:['gs_rsa'],min:2,share:20,buy:'CPC',rate:12,stage:'Consideration',ini:0,tgt:'Competitor brand + “alternative” terms (no trademark in ad copy)',kpi:'CTR ≥ 3%; assisted sign-ups'}]},
 {id:'meta',name:'Meta (Facebook + Instagram)',group:'Paid social',weight:8,markets:{exclude:['CN']},personas:['user','tech'],pl:[
  {id:'mt_feed',name:'Feed ads · image (Facebook + Instagram)',units:['meta_feed_img'],min:0,share:45,buy:'CPM',rate:12,stage:'Awareness',ini:0,tgt:'Interests and job titles (marketing, advertising, growth); lookalikes of customer lists',kpi:'CTR ≥ 0.6%; CPM ≤ $12'},
  {id:'mt_vid',name:'Reels, Stories & feed video',units:['meta_reels','meta_feed_vid'],min:1,share:35,buy:'CPM',rate:10,stage:'Awareness',ini:0,tgt:'Same as feed + video viewer retargeting',kpi:'ThruPlay rate ≥ 20%; cost per ThruPlay'},
  {id:'mt_lead',name:'Lead ads · Instant Form (gated report)',units:['meta_feed_img','meta_lgf'],min:2,share:20,buy:'CPL',rate:60,stage:'Consideration',ini:0,tgt:'Lookalikes of SQLs; site and video retargeting',kpi:'CPL ≤ $60; SQL rate'}]},
 {id:'x',name:'X (Twitter)',group:'Paid social',weight:7,markets:{exclude:['CN']},boost:{JP:2.5},personas:['tech','user'],pl:[
  {id:'x_img',name:'Promoted posts · image',units:['x_image'],min:1,share:50,buy:'CPM',rate:9,stage:'Awareness',ini:0,tgt:'Follower lookalikes of security and infrastructure thought leaders; keywords',kpi:'Engagement ≥ 1%'},
  {id:'x_vid',name:'Promoted video · proof-point clips',units:['x_video'],min:1,share:50,buy:'CPM',rate:12,stage:'Awareness',ini:0,tgt:'Same as image + conference hashtags',kpi:'VTR ≥ 20%'}]},
 {id:'reddit',name:'Reddit',group:'Paid social',weight:3,markets:{exclude:['CN']},boost:{JP:0.5,KR:0.3,SEA:0.6,LATAM:0.6},personas:['user'],pl:[
  {id:'rd_img',name:'Promoted posts · security & sysadmin communities',units:['rd_image'],min:2,share:100,buy:'CPM',rate:6,stage:'Consideration',ini:2,tgt:'Communities: r/sysadmin, r/cybersecurity, r/netsec, r/ITManagers',kpi:'CTR ≥ 0.4%; comment sentiment'}]},
 {id:'youtube',name:'YouTube',group:'Online video',weight:9,markets:{exclude:['CN']},personas:['dm','tech','user'],pl:[
  {id:'yt_in',name:'Skippable in-stream · testimonial series',units:['yt_instream'],min:1,share:70,buy:'CPV',rate:0.05,stage:'Awareness',ini:0,tgt:'Custom segments: ransomware and backup search terms, competitor channel viewers; customer match',kpi:'VTR ≥ 25%; CPV ≤ $0.06'},
  {id:'yt_sh',name:'Shorts · 15s cut-downs',units:['yt_shorts'],min:2,share:30,buy:'CPM',rate:8,stage:'Awareness',ini:0,tgt:'Same custom segments',kpi:'View rate; earned subs'}]},
 {id:'trade',name:'Trade & endemic press',group:'Trade & endemic',weight:13,markets:'all',personas:['dm','tech'],pub:m=>TRADE_PUB[m.id]||'Local security / IT trades',pl:[
  {id:'tr_nl',name:'Newsletter sponsorship',units:['nl_sponsor'],min:0,share:40,buy:'Flat',rate:4500,unit:'sends',stage:'Consideration',ini:0,tgt:'Publisher subscriber base (CISOs, IT and security leaders)',kpi:'CTR ≥ 1.5%'},
  {id:'tr_disp',name:'Run-of-site display (IAB)',units:['iab_display'],min:1,share:35,buy:'CPM',rate:30,stage:'Awareness',ini:0,tgt:'Run of site, security and data protection sections',kpi:'Viewability ≥ 70%; CTR ≥ 0.15%'},
  {id:'tr_nat',name:'Sponsored article · customer proof point',units:['native_article'],min:2,share:25,buy:'Flat',rate:15000,unit:'articles',stage:'Consideration',ini:0,tgt:'Publisher audience + social amplification',kpi:'Time on page; referral sign-ups'}]},
 {id:'creators',name:'Newsletters, podcasts & creators',group:'Trade & endemic',weight:6,markets:{only:['NA','EMEA']},personas:['dm','tech'],pub:()=>'Security newsletters, podcasts and practitioner creators',pl:[
  {id:'cr_nl',name:'Specialist newsletter sponsorship',units:['nl_sponsor'],min:1,share:50,buy:'Flat',rate:3500,unit:'sends',stage:'Consideration',ini:0,tgt:'Subscriber base',kpi:'CTR ≥ 2%'},
  {id:'cr_inf',name:'Paid creator posts (LinkedIn / X)',units:['creator_post'],min:1,share:20,buy:'Flat',rate:2500,unit:'posts',stage:'Awareness',ini:0,tgt:'Creator follower base',kpi:'Mentions, shares, comments; social SOV'},
  {id:'cr_pod',name:'Podcast host-read',units:['podcast'],min:2,share:30,buy:'Flat',rate:6000,unit:'episodes',stage:'Awareness',ini:0,tgt:'Listener base (CISOs, security and IT leaders)',kpi:'Vanity URL visits'}]},
 {id:'abm',name:'ABM programmatic',group:'Programmatic',weight:8,markets:{exclude:['CN']},personas:['dm','tech'],pub:()=>'ABM DSP (e.g., Demandbase, 6sense)',pl:[
  {id:'abm_d',name:'Account-based display · target account list',units:['iab_display','native_display'],min:1,share:70,buy:'CPM',rate:28,stage:'Consideration',ini:0,tgt:'Tier 1–3 named target accounts; buying-committee roles (security + infrastructure)',kpi:'Account reach ≥ 60%; engaged accounts'},
  {id:'abm_rt',name:'Site retargeting · product, pricing & docs visitors',units:['iab_display'],min:1,share:30,buy:'CPM',rate:12,stage:'Conversion',ini:1,tgt:'Site visitors (30-day), excluding active customers of that format',kpi:'Return-visit rate; sign-ups'}]},
 {id:'events',name:'Event amplification',group:'Events',weight:6,markets:'all',personas:['dm'],burst:'events',pub:()=>'Event organizers (per moment)',pl:[
  {id:'ev_pkg',name:'Sponsor digital package (app, attendee email)',units:['event_pkg'],min:1,share:60,buy:'Flat',rate:12000,unit:'events',stage:'Consideration',ini:0,tgt:'Registered attendees',kpi:'Meetings booked; booth scans'},
  {id:'ev_soc',name:'Geo-targeted paid social · meeting booking',units:m=>m.id==='CN'?['wc_moments']:['li_image'],min:1,share:40,buy:'CPM',rate:45,stage:'Consideration',ini:0,tgt:'Venue geo-fence + attendee job titles, 2 weeks pre-show',kpi:'Meetings booked; CTR ≥ 0.6%'}]},
 {id:'wechat',name:'WeChat',group:'Regional platforms',weight:14,markets:{only:['CN']},personas:['dm','tech','user'],pub:()=>'Tencent Ads',pl:[
  {id:'wc_m',name:'Moments ads',units:['wc_moments'],min:0,share:60,buy:'CPM',rate:15,stage:'Awareness',ini:0,tgt:'Industry & interest: enterprise IT, cybersecurity, cloud; lookalikes of target account list',kpi:'CTR ≥ 0.8%; follows'},
  {id:'wc_o',name:'Official Account article ads',units:['wc_oa'],min:1,share:25,buy:'CPC',rate:1.5,stage:'Consideration',ini:0,tgt:'Security / enterprise IT official accounts',kpi:'CPC; account follows'},
  {id:'wc_c',name:'Channels video',units:['wc_channels'],min:2,share:15,buy:'CPM',rate:12,stage:'Awareness',ini:0,tgt:'Same as Moments',kpi:'Completion rate'}]},
 {id:'baidu',name:'Baidu Search',group:'Regional platforms',weight:8,markets:{only:['CN']},personas:['tech','user'],pub:()=>'Baidu',pl:[
  {id:'bd_s',name:'Brand + category search',units:['bd_search'],min:0,share:100,buy:'CPC',rate:2.5,stage:'Consideration',ini:1,tgt:'Brand, product and category terms in Chinese',kpi:'CTR ≥ 3%; leads'}]},
 {id:'naver',name:'Naver',group:'Regional platforms',weight:8,markets:{only:['KR']},personas:['tech','user'],pub:()=>'Naver',pl:[
  {id:'nv_s',name:'PowerLink search',units:['nv_search'],min:0,share:70,buy:'CPC',rate:1.8,stage:'Consideration',ini:1,tgt:'Brand, product and category terms in Korean',kpi:'CTR ≥ 3%'},
  {id:'nv_g',name:'GFA feed & display',units:['nv_gfa'],min:1,share:30,buy:'CPM',rate:6,stage:'Awareness',ini:0,tgt:'Interest: IT, security, business software',kpi:'CTR ≥ 0.5%'}]},
];
for(const u in UNITS){UNITS[u].fmt=UNIT_META[u][0];UNITS[u].medium=UNIT_META[u][1]}
// copy limits used to fit the ad copy column (h = headline, b = body / primary text, cta = button)
const LIMS={meta_feed_img:{h:40,b:125},meta_feed_vid:{h:40,b:125},meta_reels:{b:72},meta_lgf:{h:60,b:160},li_image:{h:70,b:150},li_video:{h:70,b:150},li_tla:{b:3000},li_doc:{h:70,b:150},li_lgf:{h:60,b:160},li_conv:{b:500,cta:25},gs_rsa:{h:30,b:90},gs_ext:{h:25,b:35},
 x_image:{h:70,b:100},x_video:{b:100},rd_image:{h:150},yt_instream:{h:40,b:90},yt_shorts:{h:40},nl_sponsor:{h:60,b:450},iab_display:{h:40,cta:15},native_display:{h:50,b:90,cta:15},native_article:{h:90},
 podcast:{},creator_post:{},event_pkg:{h:60,b:300},wc_moments:{b:40},wc_oa:{h:28,b:60},wc_channels:{b:40},bd_search:{h:25,b:80},nv_search:{h:15,b:45},nv_gfa:{h:25,b:45}};
const CHMAP=Object.fromEntries(CH.map(c=>[c.id,c]));
const PLMAP={};CH.forEach(c=>c.pl.forEach(p=>PLMAP[p.id]={...p,ch:c}));

/* ==================== EXAMPLE STATE (fictional sample: "Example Co." data security lead-gen plan) ==================== */
// Fictional sample data: a lead-gen plan for an enterprise data security company. Every number is illustrative.
const EX_NAME='Example Co. · Cyber Resilience Lead Gen FY28';
const EXAMPLE_BRIEF=`SAMPLE DATA. GTM Strategy: Example Co. · Cyber Resilience Lead Gen FY28
"Example Co." is a fictional enterprise data security company. Budgets, KPIs, timing and proof points are illustrative assumptions.

Solution: Example Co. Data Security Platform. Back up, secure and recover data across data center, cloud, SaaS and identity: immutable backups, threat monitoring, data security posture (DSPM), identity recovery and clean, fast recovery after ransomware.

Program goal: pipeline. Paid media is measured on qualified meetings and sourced pipeline, not clicks.

FY28 initiatives (Feb 2027 – Jan 2028)
1. Ransomware Recovery Category Leadership: own "recover clean data fast" with security and IT leaders. KPIs (illustrative): +15 pts aided awareness in target accounts; 60% of tier-1 accounts engaged.
2. Pipeline Acceleration (Assessment & Demo): turn engaged accounts into meetings. KPIs (illustrative): 1,800 MQLs; 25% MQL→SQL; $40M sourced pipeline; cost per SQL ≤ $1,200.
3. Cloud, SaaS & Identity Expansion: grow existing data center customers into cloud, Microsoft 365, identity recovery and DSPM. KPIs (illustrative): 20% of customers adding a cloud, SaaS or identity workload; 300 expansion opportunities.

ICP: enterprise (5,000+ employees) and upper mid-market (1,000–5,000) in financial services, healthcare, public sector, retail and manufacturing; ~1,500 named target accounts in tiers 1–3, many replacing legacy backup (conquest: legacy backup vendors).
Buying committee & where they learn:
- Decision-maker (CISO, CIO, VP Infrastructure): LinkedIn; security and IT trade press; RSAC, Gartner Security & Risk; analyst reports; exec podcasts.
- Technical influencer (Security Architect, Backup / Storage Architect, Cloud Architect): LinkedIn groups, Reddit (r/sysadmin, r/cybersecurity), technical webinars, peer review sites.
- Day-to-day user (Backup Admin, IT Ops Manager, SecOps Analyst): LinkedIn, Reddit, forums, YouTube how-tos, search / LLM search.
Markets: North America leads; EMEA (UK, DACH, France) and Japan.

Offers by stage: annual State of Data Security report (gated); ransomware readiness assessment; live recovery demo and hands-on lab; cyber recovery workshop for SecOps and IT teams; cost-of-downtime calculator.

Moments (illustrative timing): Mar ransomware readiness assessment push; Apr/May RSAC; Jun Gartner Security & Risk Summit and AWS re:Inforce; Jul State of Data Security report; Aug Black Hat; Sep identity resilience campaign; Oct Example Co. customer summit and Cybersecurity Awareness Month; Nov Microsoft Ignite; Dec AWS re:Invent. Ongoing: customer recovery stories, analyst recognition, partner co-marketing (Microsoft, AWS, Google Cloud, SIs), technical webinars.`;

function exampleState(){return{
 name:EX_NAME,product:'Example Co. Data Security Platform (backup, threat monitoring, DSPM, identity recovery and clean recovery across data center, cloud and SaaS)',brief:EXAMPLE_BRIEF,
 budgets:{lean:600000,standard:1500000,full:3000000},start:'2027-02-01',end:'2028-01-31',
 markets:[
  {id:'NA',name:'North America',lang:'EN',on:true,weight:60},
  {id:'EMEA',name:'EMEA',lang:'EN',on:true,weight:28},
  {id:'CN',name:'China',lang:'ZH',on:false,weight:0},
  {id:'JP',name:'Japan',lang:'JA',on:true,weight:12},
  {id:'KR',name:'Korea',lang:'KO',on:false,weight:0},
  {id:'SEA',name:'Southeast Asia',lang:'EN',on:false,weight:5},
  {id:'LATAM',name:'LATAM',lang:'ES',on:false,weight:5}],
 personas:{dm:{label:'Decision-maker (CISO, CIO, VP Infrastructure)',on:true},tech:{label:'Technical influencer (Security / Backup / Cloud Architect)',on:true},user:{label:'Day-to-day user (Backup Admin, IT Ops, SecOps)',on:true}},
 initiatives:[
  {name:'Ransomware Recovery Category Leadership',stage:'Awareness',pillar:'When ransomware hits, recover clean data in hours, not weeks'},
  {name:'Pipeline Acceleration (Assessment & Demo)',stage:'Conversion',pillar:'Find out how fast you could recover: get a ransomware readiness assessment'},
  {name:'Cloud, SaaS & Identity Expansion',stage:'Consideration',pillar:'Secure and recover data across data center, cloud, SaaS and identity'}],
 moments:[
  {name:'Ransomware readiness assessment push',month:'2027-03',type:'launch',ini:1},
  {name:'RSAC',month:'2027-04',type:'event',ini:0},
  {name:'Gartner Security & Risk Summit',month:'2027-06',type:'event',ini:0},
  {name:'AWS re:Inforce',month:'2027-06',type:'event',ini:2},
  {name:'State of Data Security report',month:'2027-07',type:'content',ini:0},
  {name:'Black Hat USA',month:'2027-08',type:'event',ini:0},
  {name:'Identity resilience campaign',month:'2027-09',type:'launch',ini:2},
  {name:'Example Co. customer summit',month:'2027-10',type:'event',ini:1},
  {name:'Microsoft Ignite',month:'2027-11',type:'event',ini:2},
  {name:'AWS re:Invent',month:'2027-12',type:'event',ini:2}],
 channels:Object.fromEntries(CH.map(c=>[c.id,{on:true,weight:c.weight}])),
 concepts:{lean:2,standard:3,full:4},refresh:{lean:12,standard:8,full:6},rates:{},
 formats:defaultFormats(),landing:'https://example.com/',copy:exampleCopy(),
 // illustrative enterprise deal economics for the Growth Plan tab
 growth:{acv:120000,gm:80,life:5,agency:12,creative:150000,tools:40000,sdr:6,perSdr:150,goalType:'pipe',goal:40000000}
};}
function exampleCopy(){return{src:EX_NAME+' · sample copy, illustrative proof points',
 voice:'Calm, credible and specific. Speak to security and IT leaders who expect an attack: lead with recovery time and proof, name the risk plainly, never use fear for its own sake.',
 eyebrow:'New: State of Data Security report\nRansomware readiness assessment\nRecover in hours',
 ctas:'Get your readiness assessment\nBook a recovery demo\nGet the report\nTry the hands-on lab\nRegister now',
 proof:'Illustrative: a regional bank restored critical systems in 4 hours during a ransomware drill\nIllustrative: a hospital network cut backup admin time 60% after replacing legacy backup\nIllustrative: a retailer protected Microsoft 365, cloud and identity from one console in 30 days',
 ini:[
  {h:'Recover in hours, not weeks\nAssume breach. Recover fast.\nRansomware will hit. Be ready.\nClean recovery, proven\nYour last line of defense',
   b:'Backups attackers cannot touch.\nExample Co. combines immutable backups, threat monitoring and clean recovery, so ransomware does not mean weeks of downtime.\nIllustrative: a regional bank restored critical systems in 4 hours during a ransomware drill.'},
  {h:'How fast could you recover?\nGet a free readiness review\nSee a live recovery demo\nTest your ransomware plan',
   b:'Find your recovery gaps.\nA free ransomware readiness assessment shows how long recovery would really take, and what to fix first.\nBook a 30-minute demo and watch a full restore from a simulated attack.'},
  {h:'Secure cloud and SaaS data\nRecover identity, too\nOne platform, every workload\nData security beyond backup',
   b:'Cover cloud, SaaS and identity in one place.\nExtend protection to cloud, Microsoft 365 and identity from the console you already use.\nSee where sensitive data lives, who can reach it, and recover it if it is hit.'}]};}
function blankPersonas(){return {dm:{label:'Decision-maker',on:true},tech:{label:'Technical influencer',on:true},user:{label:'Day-to-day user',on:true}}}
function blankState(){const yr=new Date().getFullYear()+1;return{
 name:'',product:'',brief:'',budgets:{lean:250000,standard:500000,full:1000000},start:yr+'-01-01',end:yr+'-12-31',
 markets:MKT_RULES.map(r=>({id:r[0],name:r[2],lang:r[3],on:r[0]==='NA',weight:r[0]==='NA'?100:0})),
 personas:blankPersonas(),initiatives:[],moments:[],
 channels:Object.fromEntries(CH.map(c=>[c.id,{on:!['wechat','baidu','naver'].includes(c.id),weight:c.weight}])),
 concepts:{lean:2,standard:3,full:4},refresh:{lean:12,standard:8,full:6},rates:{},formats:defaultFormats(),landing:'',copy:{src:'',voice:'',ctas:'',proof:'',ini:[]},copyEdits:{}}}
function defaultFormats(){return Object.fromEntries(FORMATS.map(f=>[f.id,{on:true}]).concat([['_video',{lengths:'15s, 30s'}]]))}

const LSKEY='paid-media-demo-v1';
let S;try{S=JSON.parse(localStorage.getItem(LSKEY)||'null')}catch(e){S=null}
if(!S||!S.markets)S=exampleState();
if(!S.formats)S.formats=defaultFormats();if(!S.formats._video)S.formats._video={lengths:'15s, 30s'};if(S.landing==null)S.landing='https://example.com/';if(!S.copy)S.copy=exampleCopy();if(S.copy.eyebrow==null&&S.copy.src===EX_NAME)S.copy.eyebrow=exampleCopy().eyebrow;if(S.copy.src==null&&S.name===EX_NAME)S.copy.src=S.name;
let UI={tier:1,tab:'summary',group:'channel',mvp:'master'};
try{Object.assign(UI,JSON.parse(localStorage.getItem(LSKEY+'-ui')||'{}'))}catch(e){}
// Projects: every plan lives in a library in this browser; the open one autosaves. Backups are one JSON file with every project.
const PJKEY=LSKEY+'-projects';
const pjAll=()=>{try{return JSON.parse(localStorage.getItem(PJKEY)||'{}')||{}}catch(e){return {}}};
const pjPut=P=>{try{localStorage.setItem(PJKEY,JSON.stringify(P));return true}catch(e){return false}};
const pjId=()=>'p'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
let PJ_ERR=false;
function save(){try{localStorage.setItem(LSKEY,JSON.stringify(S));localStorage.setItem(LSKEY+'-ui',JSON.stringify(UI))}catch(e){}
 if(UI.pj){const P=pjAll();if(P[UI.pj]){P[UI.pj].S=S;P[UI.pj].saved=Date.now();PJ_ERR=!pjPut(P);const h=document.getElementById('pj-hint');if(h)h.textContent=PJ_ERR?'browser storage full: download a backup':'saved '+new Date().toLocaleTimeString([],{hour:'numeric',minute:'2-digit'})}}}
(function pjEnsure(){const P=pjAll();if(!UI.pj||!P[UI.pj]){const id=pjId();P[id]={name:S.name||'My first plan',S,saved:Date.now()};UI.pj=id;pjPut(P);try{localStorage.setItem(LSKEY+'-ui',JSON.stringify(UI))}catch(e){}}})();
function pjOpen(id){const P=pjAll();if(!P[id])return;try{localStorage.setItem(LSKEY,JSON.stringify(P[id].S));UI.pj=id;localStorage.setItem(LSKEY+'-ui',JSON.stringify(UI))}catch(e){}location.reload()}
function renderProjects(){const P=pjAll(),ids=Object.keys(P).sort((a,b)=>(P[b].saved||0)-(P[a].saved||0));
 $('#pj-sel').innerHTML=ids.map(id=>`<option value="${id}" ${id===UI.pj?'selected':''}>${esc(P[id].name||'Untitled plan')}</option>`).join('');
 $('#pj-name').value=P[UI.pj]?.name||'';$('#pj-del').disabled=ids.length<2}
function wireProjects(){
 $('#pj-sel').onchange=e=>{save();pjOpen(e.target.value)};
 $('#pj-name').oninput=e=>{const P=pjAll();if(P[UI.pj]){P[UI.pj].name=e.target.value.trim()||'Untitled plan';pjPut(P);const o=$('#pj-sel').querySelector(`option[value="${UI.pj}"]`);if(o)o.textContent=P[UI.pj].name}};
 $('#pj-new').onclick=()=>{save();const P=pjAll(),id=pjId();P[id]={name:'New plan '+new Date().toLocaleDateString(),S:blankState(),saved:Date.now()};if(!pjPut(P))return setStatus('#pj-status','Browser storage is full. Download a backup, then delete an old project.',true);pjOpen(id)};
 $('#pj-copy').onclick=()=>{save();const P=pjAll(),id=pjId();P[id]={name:(P[UI.pj]?.name||'Plan')+' (copy)',S:JSON.parse(JSON.stringify(S)),saved:Date.now()};if(!pjPut(P))return setStatus('#pj-status','Browser storage is full. Download a backup, then delete an old project.',true);UI.pj=id;save();renderProjects();setStatus('#pj-status','Copy saved. You are now working in the copy; rename it above.')};
 $('#pj-del').onclick=()=>{const P=pjAll(),n=P[UI.pj]?.name||'this project';if(Object.keys(P).length<2||!confirm('Delete “'+n+'”? Download a backup first if you might want it back.'))return;delete P[UI.pj];pjPut(P);const next=Object.keys(P).sort((a,b)=>(P[b].saved||0)-(P[a].saved||0))[0];UI.pj=null;pjOpen(next)};
 $('#pj-export').onclick=()=>{save();const d=new Date().toISOString().slice(0,10);saveFile('paid-media-hub-projects-'+d+'.json',JSON.stringify({app:'paid-media-hub',version:1,exported:new Date().toISOString(),projects:pjAll()},null,1))};
 $('#pj-file').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const j=JSON.parse(await f.text()),inc=j&&j.projects;if(!inc||typeof inc!=='object')throw 0;
   const P=pjAll();let n=0,m=0;for(const [id,pr] of Object.entries(inc)){if(!pr||!pr.S||!pr.S.markets)continue;if(P[id]&&JSON.stringify(P[id].S)===JSON.stringify(pr.S)){m++;continue}const k=P[id]?pjId():id;P[k]={name:pr.name||'Imported plan',S:pr.S,saved:pr.saved||Date.now()};n++}
   if(!n&&!m)throw 0;if(!pjPut(P))return setStatus('#pj-status','Browser storage is full, so the backup could not be opened. Delete an old project first.',true);renderProjects();setStatus('#pj-status',n?`Opened the backup: ${n} project${n>1?'s':''} added to your list${m?` (${m} already here)`:''}. Pick one above.`:'Everything in that backup is already in your list.')}
  catch(err){setStatus('#pj-status','That file isn’t a Paid Media Hub backup.',true)}e.target.value=''}}

/* ==================== HELPERS ==================== */
const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);
const PERSONA_HINT={dm:'Decision-maker (titles)',tech:'Technical influencer (titles)',user:'Day-to-day user (titles)'};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sum=a=>a.reduce((x,y)=>x+(+y||0),0);
const money=v=>'$'+Math.round(v).toLocaleString('en-US');
const rateFmt=(v,b)=>b==='Flat'?money(v):'$'+(+v).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const compact=v=>v>=1e6?(v/1e6).toFixed(v>=1e7?0:1)+'M':v>=1e4?Math.round(v/1e3)+'K':Math.round(v).toLocaleString('en-US');
const parseD=s=>{const [y,m,d]=(s||'').split('-').map(Number);return new Date(Date.UTC(y||2026,(m||1)-1,d||1))};
const fmtD=dt=>dt.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'});
const isoD=dt=>dt.toISOString().slice(0,10);
const MONTHN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function monthsList(){const a=parseD(S.start),b=parseD(S.end);const out=[];if(!(b>=a))return out;let y=a.getUTCFullYear(),m=a.getUTCMonth();
 while(y<b.getUTCFullYear()||(y===b.getUTCFullYear()&&m<=b.getUTCMonth())){out.push(`${y}-${String(m+1).padStart(2,'0')}`);m++;if(m>11){m=0;y++}if(out.length>60)break}return out}
const monthLabel=k=>{const [y,m]=k.split('-');return MONTHN[+m-1]+' '+y.slice(2)};
function flightWeeks(){return Math.max(1,(parseD(S.end)-parseD(S.start))/6048e5)}
function eligible(c,m){const k=c.markets;if(k==='all')return true;if(k.only)return k.only.includes(m.id);if(k.exclude)return !k.exclude.includes(m.id);return true}
// A checked channel runs in every version: bigger versions add its extra placements, smaller ones keep its entry placement.
function activePl(c,tier){const a=c.pl.filter(p=>p.min<=tier);if(a.length)return a;const m=Math.min(...c.pl.map(p=>p.min));return c.pl.filter(p=>p.min===m)}
function vinfo(u,v){const U=UNITS[u];let fmt=U.fmt,logo=false;
 if(/^video/i.test(v))fmt='video';else if(/^logo/i.test(v)){fmt='static';logo=true}else if(/^image/i.test(v))fmt='static';else if(/^banner/i.test(v))fmt='display';
 const sz=v.match(/(\d{2,4})×(\d{2,4})/);let ratio=null;const rm=v.match(/(\d+(?:\.\d+)?:\d+)/);
 if(rm)ratio=rm[1];else if(sz){const r=sz[1]/sz[2],K=[['1.91:1',1.91],['1:1',1],['4:5',.8],['9:16',.5625],['16:9',1.778],['2:1',2],['3:4',.75],['4:3',1.333]];const k=K.find(k=>Math.abs(k[1]-r)<.03);ratio=k?k[0]:null}
 return {fmt,logo,size:sz?sz[1]+'×'+sz[2]:null,area:sz?sz[1]*sz[2]:0,ratio,label:v}}
const unitOn=u=>S.units?.[u]!==false;
const sizeOn=(u,v)=>!S.vOff?.[u+'|'+v];
function variantsOf(u){return unitOn(u)?UNITS[u].variants.filter(v=>sizeOn(u,v)):[]}
function videoLengths(){const a=String(S.formats._video?.lengths||'').split(/[,;/]+/).map(x=>x.trim()).filter(Boolean);return a.length?a:['1 length']}
function unitsFor(p,m){const a=typeof p.units==='function'?p.units(m):p.units;return a.filter(u=>variantsOf(u).length)}
function rateOf(p){const r=S.rates[p.id];return r!=null&&r!==''&&!isNaN(r)?+r:p.rate}
// placements map to the initiative whose funnel stage matches theirs (falls back to the library's suggestion, then the first)
function iniIdx(p){const L=S.initiatives;if(!L.length)return -1;const m=L.map((x,i)=>x.stage===p.stage?i:-1).filter(i=>i>=0);
 return m.length?m[(p.ini||0)%m.length]:(L[p.ini]?p.ini:0)}
function iniOf(p){const i=iniIdx(p);return i<0?{name:'—',pillar:'—'}:S.initiatives[i]}
const perKeys=c=>[...c.personas,...Object.keys(S.personas).filter(k=>S.personas[k].custom)].filter(k=>S.personas[k]?.on&&S.personas[k].label);
function personaShort(c){return perKeys(c).map(k=>S.personas[k].label.split('(')[0].trim()).join(', ')||'—'}
function personaText(c){return perKeys(c).map(k=>S.personas[k].label).join('; ')||'—'}

/* ==================== AD COPY ==================== */
const linesOf=t=>String(t||'').split('\n').map(x=>x.trim()).filter(Boolean);
function pickFit(list,lim,i){if(!list.length)return null;if(!lim)return {t:list[i%list.length],over:0};
 const fit=list.filter(x=>x.length<=lim);if(fit.length){const t=fit[fit.length-1-(i%fit.length)];return {t,over:0}}
 const t=list.slice().sort((a,b)=>a.length-b.length)[0];return {t,over:t.length-lim}}
const copyText=(rows,note)=>rows.map(r=>r.label+': '+r.parts.map(p=>`${p.k} "${p.t}"${p.over>0?` [OVER LIMIT ${p.t.length}/${p.lim}]`:''}`).join(' | ')).join('\n')+(note?'\n'+note:'');
function finishAd(ad){ad.text=copyText(ad.rows,ad.note);ad.flags=ad.rows.reduce((a,r)=>a+r.parts.filter(p=>p.over>0).length,0);return ad}
function adCopy({fmt,logo,lim,ini,concepts,langs}){
 if(logo)return {rows:[],note:'Brand lockups only. No copy.',text:'Brand lockups only'};
 const C=S.copy||{},bank=(C.ini||[])[ini]||(C.ini||[])[0]||{},H=linesOf(bank.h),B=linesOf(bank.b),CT=linesOf(C.ctas),P=linesOf(C.proof);
 const loc=langs.filter(l=>l!=='EN');const note=loc.length?'Localize for '+loc.join(', ')+'; check limits after translation.':'';
 const rows=[];
 if(['audio','social_post'].includes(fmt)){rows.push({label:'Talking points',parts:[...H.slice(0,1).map(t=>({k:'Hook',t,over:0})),...P.slice(0,3).map(t=>({k:'Proof',t,over:0})),...CT.slice(0,1).map(t=>({k:'CTA',t,over:0}))]})}
 else if(fmt==='text'){const hs=[0,1,2].map(i=>pickFit(H,lim.h,i)).filter(Boolean),bs=[0,1].map(i=>pickFit(B,lim.b,i)).filter(Boolean);
  rows.push({label:'Ad set',parts:[...[...new Map(hs.map(x=>[x.t,x])).values()].map(x=>({k:'H',lim:lim.h,...x})),...[...new Map(bs.map(x=>[x.t,x])).values()].map(x=>({k:'D',lim:lim.b,...x}))]})}
 else for(let i=0;i<concepts;i++){const parts=[];
  if(lim.h||!('b' in lim)){const h=pickFit(H,lim.h,i);if(h)parts.push({k:'H',lim:lim.h,...h})}
  if(lim.b){const b=pickFit(B,lim.b,i);if(b)parts.push({k:'Body',lim:lim.b,...b})}
  const c=pickFit(CT,lim.cta,i);if(c&&fmt!=='document')parts.push({k:'CTA',lim:lim.cta,...c});
  if(parts.length)rows.push({label:'C'+(i+1),parts})}
 if(!rows.length)return {rows,note:'Add headlines and body copy in section 10.',text:'(no copy yet)'};
 return finishAd({rows,note});
}

// On-image copy: the words designed into the image, video supers or banner. Same for every platform the master is resized for.
const ONIMG={eye:20,h:35,cta:15};
const VISUAL=f=>['static','video','display'].includes(f);
function onImageCopy({fmt,logo,ini,concepts,langs}){
 if(logo)return {rows:[],note:'Brand lockups only. No copy.',text:'Brand lockups only'};
 const C=S.copy||{},bank=(C.ini||[])[ini]||(C.ini||[])[0]||{},H=linesOf(bank.h),E=linesOf(C.eyebrow),CT=linesOf(C.ctas);
 const loc=langs.filter(l=>l!=='EN'),rows=[];
 for(let i=0;i<concepts;i++){const parts=[];const e=pickFit(E,ONIMG.eye,i),h=pickFit(H,ONIMG.h,i),c=pickFit(CT,ONIMG.cta,i);
  if(e&&fmt!=='video')parts.push({k:'Eyebrow',lim:ONIMG.eye,...e});if(h)parts.push({k:fmt==='video'?'On-screen headline (super)':'Headline',lim:ONIMG.h,...h});
  if(c&&fmt!=='static')parts.push({k:fmt==='video'?'End card CTA':'CTA button',lim:ONIMG.cta,...c});if(parts.length)rows.push({label:'C'+(i+1),parts})}
 const note=[fmt==='static'?'Social feeds: keep text to about 20% of the image or less (Meta favors light text).':fmt==='display'?'Logo, headline and CTA on every size.':'Hold each on-screen line 2–3 seconds; burn in captions for muted autoplay; end card with logo and CTA.',loc.length?'Localize for '+loc.join(', ')+'; check limits after translation.':''].filter(Boolean).join(' ');
 if(!rows.length)return {rows,note:'Add headlines (and on-image eyebrows) in section 10.',text:'(no copy yet)'};
 return finishAd({rows,note})}
// Platform copy: the text typed into each platform's ad fields, with that platform's own names and limits.
const FIELD_NAMES={LinkedIn:{H:'Headline',Body:'Main copy (intro text)'},Meta:{H:'Headline',Body:'Primary text'},'Google Ads':{H:'Headline',D:'Description'},'X (Twitter)':{H:'Card headline',Body:'Post text'},X:{H:'Card headline',Body:'Post text'},Reddit:{H:'Headline'},YouTube:{H:'Headline',Body:'Description'}};
const LGF={li_lgf:1,meta_lgf:1},PERSONAL={li_image:1,li_video:1,li_doc:1};
function platformAd(u,{ini,concepts,langs}){const U=UNITS[u],L=LIMS[u]||{},f=VISUAL(U.fmt)?'static':U.fmt;
 if(U.fmt==='display'&&!L.b)return {rows:[],note:'No typed fields: the copy lives on the banner (see On-image copy in the BOM tab).',text:'Copy lives on the banner'};
 const ad=adCopy({fmt:f,lim:L,ini,concepts,langs}),N=FIELD_NAMES[U.platform]||{};
// LinkedIn, Meta and Reddit CTAs are chosen from a fixed button list, so map the bank's CTA to the closest option
const CTA_OPT={LinkedIn:{demo:'Request demo',reg:'Register',dl:'Download',sign:'Sign up',def:'Learn more'},Meta:{demo:'Book now',reg:'Sign up',dl:'Download',sign:'Sign up',def:'Learn more'},Reddit:{demo:'Learn more',reg:'Sign up',dl:'Download',sign:'Sign up',def:'Learn more'}};
function pickCTA(pl,t){const o=CTA_OPT[pl];if(!o)return t;const x=String(t).toLowerCase();return /demo|meeting|call|book/.test(x)?o.demo:/regist|webinar|event|attend|save (my|your) seat/.test(x)?o.reg:/download|report|guide|ebook|get the/.test(x)?o.dl:/sign ?up|start|try|free|trial|create/.test(x)?o.sign:o.def}
const CTAPICK={LinkedIn:'CTA button (pick from LinkedIn list)',Meta:'CTA button (pick from Meta list)',X:'CTA (website card button)','X (Twitter)':'CTA (website card button)',YouTube:'CTA button (≤10 chars)',Reddit:'CTA button (pick from list)'};
 ad.rows.forEach(r=>{r.parts.forEach(p=>{if(p.k==='CTA'){p.t=pickCTA(U.platform,p.t);p.k=CTAPICK[U.platform]||'CTA';if(U.platform==='YouTube')p.lim=10;else if(CTAPICK[U.platform])p.lim=0;return}if(u==='gs_ext'){p.k=p.k==='H'?'Sitelink text':p.k==='D'?'Sitelink description':p.k;return}if(LGF[u])p.k=p.k==='H'?'Form headline':p.k==='Body'?'Offer detail':p.k;else p.k=N[p.k]||(p.k==='H'?'Headline':p.k==='D'?'Description':p.k)});
  if(LGF[u])r.parts.push({k:'Thank-you message',lim:300,t:'Thanks! Your copy is on its way to your inbox.',over:0});
  if(PERSONAL[u]){const b=r.parts.find(p=>p.k==='Main copy (intro text)');if(b)r.parts.push({k:'Personalized intro (optional)',lim:L.b,t:'Hi %FIRSTNAME%, '+b.t.charAt(0).toLowerCase()+b.t.slice(1),over:0})}});
 ad.rows.forEach(r=>r.parts.forEach(p=>{p.over=p.lim?Math.max(0,p.t.length-p.lim):0}));
 return applyEdits(finishAd(ad),'P|'+u)}
/* ==================== ENGINE ==================== */
// Channel split per version: a version's own weights once its budgets are edited, else the shared default split
const chW=(id,t)=>{const c=S.channels[id];return c?+c.weight:0};
const setChW=(id,t,v)=>{const c=S.channels[id];(c.tw=c.tw||{})[TIERS[t]]=v};
function compute(tier){
 const T=TIERS[tier],total=+S.budgets[T]||0;
 const mkts=S.markets.filter(m=>m.on&&+m.weight>0),wsum=sum(mkts.map(m=>m.weight));
 const weeks=flightWeeks(),rounds=Math.max(1,Math.ceil(weeks/Math.max(1,+S.refresh[T]||8))),concepts=Math.max(1,+S.concepts[T]||1);
 const evMonths=S.moments.filter(x=>x.type==='event'&&x.month);
 const lines=[];
 // Budget split: channels with a typed $ (section 7) get exactly that, spread over the markets they run in by market weight.
 // The rest of the budget goes market by market to the other checked channels, by channel weight.
 const plsInM=(c,m)=>{const a=activePl(c,tier).filter(p=>unitsFor(p,m).length);if(a.length)return a;const b=c.pl.filter(p=>unitsFor(p,m).length);const mn=Math.min(...b.map(p=>p.min));return b.filter(p=>p.min===mn)},runs=(c,m)=>S.channels[c.id]?.on&&eligible(c,m)&&plsInM(c,m).length>0;
 const pinned=CH.filter(c=>S.channels[c.id]?.on&&pinOf(c.id,tier)!=null&&mkts.some(m=>runs(c,m))),ps=sum(pinned.map(c=>pinOf(c.id,tier))),sc=ps>total&&ps>0?total/ps:1;
 const alloc={};const put=(m,c,b)=>{if(b>0)(alloc[m.id]=alloc[m.id]||[]).push([c,b])};
 pinned.forEach(c=>{const ms=mkts.filter(m=>runs(c,m)),w=ms.map(m=>m.weight*(c.boost?.[m.id]||1)),ws=sum(w);ms.forEach((m,i)=>put(m,c,pinOf(c.id,tier)*sc*w[i]/ws))});
 const free=c=>!pinned.includes(c)&&chW(c.id,tier)>0,left=Math.max(0,total-ps*sc);
 const has=mkts.map(m=>CH.some(c=>free(c)&&runs(c,m)));
 let room=mkts.map((m,j)=>has[j]?Math.max(0,total*m.weight/wsum-sum((alloc[m.id]||[]).map(x=>x[1]))):0);if(!sum(room))room=mkts.map((m,j)=>has[j]?+m.weight:0);const rs=sum(room);
 mkts.forEach((m,j)=>{if(!rs||!room[j])return;const mb=left*room[j]/rs,el=CH.filter(c=>free(c)&&runs(c,m)),cw=el.map(c=>chW(c.id,tier)*(c.boost?.[m.id]||1)),cws=sum(cw);el.forEach((c,i)=>put(m,c,mb*cw[i]/cws))});
 // Placement budgets typed in Buy Details: that placement gets exactly its $ inside its channel; the channel's other placements share the rest.
 const chTot={},plAmt={},remK={};mkts.forEach(m=>(alloc[m.id]||[]).forEach(([c,cb])=>{chTot[c.id]=(chTot[c.id]||0)+cb}));
 CH.forEach(c=>{const CB=chTot[c.id];if(!CB)return;const ms=mkts.filter(m=>(alloc[m.id]||[]).some(x=>x[0]===c));
  const pp=c.pl.filter(p=>plPinOf(p.id,tier)!=null&&ms.some(m=>plsInM(c,m).includes(p)));if(!pp.length)return;
  const P=sum(pp.map(p=>plPinOf(p.id,tier))),s2=P>CB?CB/P:1;
  pp.forEach(p=>{const mm=ms.filter(m=>plsInM(c,m).includes(p)),w=mm.map(m=>+m.weight),ws=sum(w);mm.forEach((m,i)=>plAmt[m.id+'|'+p.id]=plPinOf(p.id,tier)*s2*w[i]/ws)});
  let rr=0;ms.forEach(m=>{const pl=plsInM(c,m),cb=alloc[m.id].find(x=>x[0]===c)[1];if(pl.some(p=>plAmt[m.id+'|'+p.id]==null))rr+=Math.max(0,cb-sum(pl.map(p=>plAmt[m.id+'|'+p.id]||0)))});
  remK[c.id]=rr?(CB-P*s2)/rr:0});
 for(const m of mkts){
  const plsIn=c=>plsInM(c,m);
  (alloc[m.id]||[]).sort((a,b)=>CH.indexOf(a[0])-CH.indexOf(b[0])).forEach(([c,cb])=>{const pls=plsIn(c),pk=p=>plAmt[m.id+'|'+p.id],un=pls.filter(p=>pk(p)==null),ups=sum(un.map(p=>p.share)),rem=c.id in remK?Math.max(0,cb-sum(pls.map(p=>pk(p)||0)))*remK[c.id]:cb;
   pls.forEach(p=>{const b=pk(p)!=null?pk(p):ups?rem*p.share/ups:0;if(!(b>0))return;const rate=rateOf(p),units=unitsFor(p,m);
    let qty,qu;if(p.buy==='Flat'){qty=Math.floor(b/rate);qu=p.unit||'units'}else{qty=p.buy==='CPM'?b/rate*1000:b/rate;qu=BUYUNIT[p.buy]}
    const variants=sum(units.map(u=>variantsOf(u).length));
    const lead=Math.max(...units.map(u=>UNITS[u].lead));
    const ini=iniOf(p);
    const flight=c.burst==='events'&&evMonths.length?evMonths.map(e=>`${e.name} (${monthLabel(e.month)})`).join('; '):`${fmtD(parseD(S.start))} – ${fmtD(parseD(S.end))}`;
    lines.push({tier,c,p,m,budget:b,rate,qty,qu,units,variants,concepts,rounds,lead,ini,flight,
     group:c.group,channel:c.name,placement:p.name,publisher:c.pub?c.pub(m):c.name,market:m.name,lang:m.lang,
     audience:audKeyOf(p)?audLabel(c,p):personaText(c),aud:audLabel(c,p),targeting:p.tgt,tmethod:tgtOf(c,p),stage:p.stage,kpi:p.kpi,
     due:isoD(new Date(parseD(S.start)-lead*864e5)),under:p.buy==='Flat'&&qty<1});
   });});
 }
 lines.forEach((l,i)=>l.id='L'+String(i+1).padStart(3,'0'));
 // diminishing returns: each line's results scale with its channel's total spend
 const chSp={};lines.forEach(l=>chSp[l.c.id]=(chSp[l.c.id]||0)+l.budget);lines.forEach(l=>l.sat=satF(l.c.id,chSp[l.c.id]));
 // flighting
 const months=monthsList();
 const flightRows=[];const byCh={};lines.forEach(l=>{(byCh[l.c.id]=byCh[l.c.id]||{c:l.c,b:0}).b+=l.budget});
 for(const k in byCh){const {c,b}=byCh[k];
  let w=months.map(mo=>{if(c.burst==='events')return evMonths.length?evMonths.filter(e=>e.month===mo).length:1;
   const here=S.moments.filter(x=>x.month===mo&&x.type!=='event').length;
   const prev=S.moments.filter(x=>x.type!=='event'&&x.month&&nextMonth(x.month)===mo).length;return 1+1.0*here+0.5*prev});
  if(sum(w)===0)w=months.map(()=>1);const ws=sum(w);
  flightRows.push({c,total:b,months:months.map((mo,i)=>b*w[i]/ws)});}
 // creative deliverables, de-duplicated across markets that share a language
 const del={};lines.forEach(l=>l.units.forEach(u=>{const k=l.p.id+'|'+u+'|'+l.lang;
  if(!del[k])del[k]={channel:l.channel,placement:l.placement,unit:u,lang:l.lang,markets:new Set(),concepts,variants:variantsOf(u).length,rounds,lead:UNITS[u].lead};
  del[k].markets.add(l.market)}));
 const deliverables=Object.values(del).map(d=>({...d,markets:[...d.markets].join(', '),files:d.concepts*d.variants*d.rounds,due:isoD(new Date(parseD(S.start)-d.lead*864e5))}));
 // MVP BOM: group every unit variant on every line into creative masters (same format + aspect ratio, or same unit)
 const ms={},lens=videoLengths();
 lines.forEach(l=>{l.bom=new Set();l.units.forEach(u=>variantsOf(u).forEach(v=>{const vi=vinfo(u,v);
  const key=vi.logo?'static|logo':(['static','video'].includes(vi.fmt)&&vi.ratio)?vi.fmt+'|'+vi.ratio:(vi.fmt==='display'&&vi.size)?'display|'+vi.size:vi.fmt+'|'+u;
  const M=ms[key]=ms[key]||{key,fmt:vi.fmt,ratio:vi.ratio,logo:vi.logo,unit:u,units:new Set(),sizes:{},langs:new Set(),lines:new Set(),pls:new Set(),chs:new Set(),mk:new Set(),budget:0,lead:0,best:null,iniB:{}};
  M.units.add(u);const ii=Math.max(0,iniIdx(l.p));M.iniB[ii]=(M.iniB[ii]||0)+l.budget;
  M.sizes[UNITS[u].platform+' '+UNITS[u].name+(vi.size?' '+vi.size:'')]=1;if(!M.best||vi.area>M.best.area)M.best=vi;
  M.langs.add(l.lang);M.pls.add(l.channel+' · '+l.placement);M.chs.add(l.channel);M.mk.add(l.market);M.lead=Math.max(M.lead,UNITS[u].lead);
  if(!M.lines.has(l.id)){M.lines.add(l.id);M.budget+=l.budget}l.bom.add(key)}))});
 const order=['video','static','display','document','text','messaging','social_post','article','audio','event'];
 const masters=Object.values(ms).sort((a,b)=>order.indexOf(a.fmt)-order.indexOf(b.fmt)||b.lines.size-a.lines.size).map((M,i)=>{
  const id='B'+String(i+1).padStart(2,'0');const nL=M.fmt==='video'?lens.length:1;const adapt=Object.keys(M.sizes).length;
  const name=M.logo?'Logo lockups':(['static','video'].includes(M.fmt)&&M.ratio)?`${FMTNAME[M.fmt]} · ${M.ratio}`:M.fmt==='display'&&M.best.size?`Display banner · ${M.best.size}`:`${UNITS[M.unit].platform} ${UNITS[M.unit].name}`;
  const masterFiles=concepts*rounds*M.langs.size*nL;
  const LOCAL=/^(wc_|bd_|nv_)/,us=[...M.units],usE=us.filter(u=>!LOCAL.test(u));const lim={};(usE.length?usE:us).forEach(u=>{const L=LIMS[u]||{};for(const k in L)lim[k]=Math.min(lim[k]??1e9,L[k])});
  const ini=+Object.entries(M.iniB).sort((a,b)=>b[1]-a[1])[0]?.[0]||0;
  const ad=VISUAL(M.fmt)?applyEdits(onImageCopy({fmt:M.fmt,logo:M.logo,ini,concepts,langs:[...M.langs]}),'OI|'+M.key):{rows:[],note:'Typed into the platform: see the Platform copy column.',text:'See Platform copy',flags:0,lk:''};
  // platform copy typed in each platform this master runs on (also exported as the Ad Copy sheet)
  const pads=[];{const seen=new Set();[...M.units].forEach(u=>{const P=UNITS[u].platform,L=LIMS[u]||{};if(seen.has(P)||!(L.b||L.h))return;seen.add(P);const pa=platformAd(u,{ini,concepts,langs:[...M.langs]});if(pa.rows.length)pads.push({platform:P,unit:u,ad:pa})})}
  return {...M,id,name,nL,adapt,masterFiles,ad,iniName:S.initiatives[ini]?.name||'—',units:[...M.units],totalFiles:masterFiles*adapt,pads,lines:[...M.lines],langs:[...M.langs],pls:[...M.pls],chs:[...M.chs],mk:[...M.mk],due:isoD(new Date(parseD(S.start)-M.lead*864e5)),
   master:M.best.size||'—'}});
 const keyToId=Object.fromEntries(masters.map(m=>[m.key,m.id]));
 lines.forEach(l=>{l.bomIds=[...l.bom].map(k=>keyToId[k]).sort()});
 return {tier,total,lines,months,flightRows,deliverables,rounds,concepts,masters,lens};
}
function nextMonth(k){let [y,m]=k.split('-').map(Number);m++;if(m>12){m=1;y++}return `${y}-${String(m).padStart(2,'0')}`}

/* ==================== TABLE DEFINITIONS (shared by UI + exports) ==================== */
// Round a list so the parts still add up to the rounded total (largest remainder)
function fairRound(v){const f=v.map(Math.floor),left=Math.round(sum(v))-sum(f);v.map((x,i)=>[x-f[i],i]).sort((a,b)=>b[0]-a[0]).slice(0,Math.max(0,left)).forEach(([,i])=>f[i]++);return f}
function bomTable(R){
 const cols0=[['Line','id'],['Version','ver'],['Initiative','ini'],['Message pillar','pillar'],['Funnel stage','stage'],['Channel group','group'],['Channel','channel'],['Placement','placement'],['Platform / publisher','publisher'],['Market','market'],['Language','lang'],['Audience','audience'],['Targeting','targeting'],['Ad units','unitsTxt'],['Sizes / specs','sizes'],['Buy type','buy'],['Rate','rateTxt'],['Budget','budget'],['Est. delivery','qty'],['Delivery unit','qu'],['Flight','flight'],['KPI','kpi'],['Creative (concepts × sizes × rounds)','creative'],['Creative due','due'],['BOM items','bomIds'],['Category','cat']];
 const cols=cols0;
 const rows=R.lines.map(l=>({id:l.id,ver:TIERNAME[l.tier],ini:l.ini.name,pillar:l.ini.pillar,stage:l.stage,group:l.group,channel:l.channel,placement:l.placement,publisher:l.publisher,market:l.market,lang:l.lang,audience:l.audience,targeting:l.targeting,
  unitsTxt:l.units.map(u=>UNITS[u].platform+' '+UNITS[u].name).join(' + '),sizes:l.units.flatMap(u=>variantsOf(u)).join(' | '),buy:l.p.buy,rateTxt:rateFmt(l.rate,l.p.buy)+(l.p.buy==='Flat'?' per '+(l.p.unit||'unit').replace(/s$/,''):l.p.buy==='CPM'?' CPM':''),
  aud:l.aud,budget:l.budget,qty:Math.round(l.qty),qu:l.qu,flight:l.flight,kpi:l.kpi,creative:`${l.concepts} × ${l.variants} × ${l.rounds}`,due:l.due,bomIds:l.bomIds.join(', '),cat:catOf(l.p.id)}));
 const fb=fairRound(rows.map(r=>r.budget));rows.forEach((r,i)=>r.budget=fb[i]);
 return {name:'Line Items',cols,rows};
}
function mvpTable(R){
 const cols=[['BOM item','id'],['Format','fmtName'],['Creative master','name'],['On-image copy','adTxt'],['Platform copy','padTxt'],['Lead initiative','iniName'],['Media lines covered','linesTxt'],['# lines','nLines'],['Master size','master'],['Languages','langsTxt'],['Concepts','concepts'],['Refresh rounds','rounds'],['Video cuts','cuts'],['Master files','masterFiles'],['Platform resizes','adapt'],['Total files incl. resizes','totalFiles'],['Platform adaptations','adaptTxt'],['Channels','chsTxt'],['Markets','mkTxt'],['Media budget on these lines','budget'],['First due','due']];
 const rows=R.masters.map(m=>({id:m.id,fmtName:FMTNAME[m.fmt]||m.fmt,name:m.name,adTxt:m.ad.text,padTxt:(m.pads||[]).map(x=>x.platform+'\n'+x.ad.text).join('\n\n')||'—',iniName:m.iniName,master:m.master,langsTxt:m.langs.join(', '),concepts:R.concepts,rounds:R.rounds,cuts:m.fmt==='video'?R.lens.join(', '):'—',masterFiles:m.masterFiles,adapt:m.adapt,totalFiles:m.totalFiles,
  adaptTxt:Object.keys(m.sizes).join('; '),chsTxt:m.chs.join(', '),mkTxt:m.mk.join(', '),linesTxt:m.lines.join(', '),nLines:m.lines.length,budget:Math.round(m.budget),due:m.due}));
 return {name:'BOM',cols,rows};
}
const slugU=s=>String(s||'').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'');
const code=s=>String(s||'').toUpperCase().replace(/[^A-Z0-9]+/g,'').slice(0,6)||'X';
function pixelTable(R){
 const used=CH.filter(c=>R.lines.some(l=>l.c.id===c.id));
 const cols=[['Channel','channel'],['Tag / pixel','tag'],['Conversion events','events'],['Click IDs & URL parameters','click'],['Audiences, verification & notes','extra'],['Markets','mk'],['Lines','n']];
 const rows=used.map(c=>{const t=TAGS[c.id]||{},ls=R.lines.filter(l=>l.c.id===c.id);return{channel:c.name,tag:t.tag,events:t.events,click:t.click,extra:t.extra,mk:[...new Set(ls.map(l=>l.market))].join(', '),n:ls.length}});
 return {name:'Tagging - Pixels',cols,rows};
}
// Trafficking settings (activation-guide style): naming taxonomy, cost center, CRM, gated/ungated
const TRAFFIC_DEF={bu:'',region:'',cc:'',crm:'',crmName:'',content:'ug',ctype:'rpt',med:'channel',assets:'',doc:'',build:'Agency builds'};
const trafficOf=()=>({...TRAFFIC_DEF,...(S.traffic||{})});
const OBJ={CPM:['Brand awareness','Impressions / reach'],CPC:['Website traffic','Landing page clicks'],CPL:['Lead generation','Leads'],CPV:['Video views','Views (2s+ / ThruPlay)'],CPS:['Sponsored messaging','Sends / opens'],Flat:['Sponsorship (IO)','Delivery per IO']};
const STG={Awareness:'aw',Consideration:'co',Conversion:'cv'};
const CHC={linkedin:'soc-li',google:'sem-gg',meta:'soc-fb',x:'soc-x',reddit:'soc-rd',youtube:'vid-yt',trade:'pr-trd',creators:'cr-nl',abm:'prg-abm',events:'evt',wechat:'soc-wc',baidu:'sem-bd',naver:'sem-nv'};
const FMTC={static:'img',video:'vid',carousel:'car',text:'txt',display:'dsp',native:'nat',messaging:'msg',audio:'aud',doc:'doc'};
const DEF_EXCL='Competitor & partner lists; current employees; students & interns; existing customers / converters (CRM upload)';
const DEVICES={search:'All (mobile bid adj.)',video:'All',display:'All',social:'All (mobile-first)'};
function workback(){const t=trafficOf(),live=parseD(S.start),d=n=>isoD(new Date(live-n*864e5));
 return [['Budget, cost center & CRM campaign ID confirmed','Client',17],['Brief + BOM handed to agency','Client',16],['Audience lists, exclusions & conversion events shared','Client',14],['Creative files + ad copy final','Client',11],['Trafficking sheet filled (campaign & ad IDs, placeholder URLs)','Agency',10],['Campaigns built in platform (paused)','Agency',9],['Tags & pixels verified, test conversions fire','Agency',8],['Lead gen forms built & synced to CRM','Agency',8],['Client QA of builds (names, URLs, targeting, budgets)','Client',5],['Fixes from QA','Agency',5],['Final sign-off','Client',2],['Go live','Agency',0]].map(([task,owner,n])=>({task,owner,due:d(n),days:n?'T−'+n:'Launch'}))}
function geoBudget(R){const m={};R.lines.forEach(l=>{const k=l.market;(m[k]=m[k]||{market:k,lines:0,budget:0,ch:new Set()});m[k].lines++;m[k].budget+=l.budget;m[k].ch.add(l.channel)});
 const rows=Object.values(m).sort((a,b)=>b.budget-a.budget).map(r=>({...r,ch:[...r.ch].join(', ')}));return {rows,total:sum(rows.map(r=>r.budget))}}
function utmTable(R){
 const base=(S.landing||'https://example.com/').trim(),camp=slugU(S.name)+'_'+TIERS[R.tier];
 const cols=[['Line','id'],['Channel','channel'],['Placement','placement'],['Market','market'],['Lang','lang'],['BOM items','bom'],['Files to traffic','files'],['Campaign name','cname'],['Campaign group','cgroup'],['Objective','obj'],['Optimization goal','opt'],['Budget','budget'],['Daily budget','daily'],['Ad set / audience','adset'],['Exclusions','excl'],['Devices','devices'],['Conversion event','conv'],['Lead gen form','lgf'],['CTA','cta'],['# of ads','nads'],['Builds needed','build'],['Platform ad copy','copy'],['On-image copy','onimg'],['Ad / placement name','adname'],['Ad names (one per file)','adnames'],['Test cells','test'],['Pixel / tag','pixel'],['utm_source','src'],['utm_medium','med'],['utm_campaign','camp'],['utm_content','cont'],['utm_term','term'],['Tracked URL','url'],['Flight','flight'],['Creative due','due'],['Cost center','cc'],['CRM campaign ID','crm'],['Content type','ctype'],['Campaign ID (agency)','x1'],['Ad IDs (agency)','x2'],['Est. audience size (agency)','x3'],['Client QA','x4']];
 const TR=trafficOf(),days=Math.max(1,(parseD(S.end)-parseD(S.start))/864e5+1),yymm=String(S.start||'').slice(0,7);
 const idByKey=Object.fromEntries(R.masters.map(m=>[m.key,m])),TP=testPlan(R);
 const rows=R.lines.map(l=>{const tt=testOfLine(TP,l.id);const src=UTM_SRC[l.c.id]||slugU(l.channel),med=TR.med==='cpc'&&!/^Flat$/.test(l.p.buy)?'cpc':UNITS[l.units[0]].medium,cont=slugU(l.id+'_'+l.p.id),term=slugU(l.m.id+'_'+l.lang);
  const q=`utm_source=${encodeURIComponent(src)}&utm_medium=${encodeURIComponent(med)}&utm_campaign=${encodeURIComponent(camp)}&utm_content=${encodeURIComponent(cont)}&utm_term=${encodeURIComponent(term)}`;
  const lim={};l.units.forEach(u=>{const L=LIMS[u]||{};for(const k in L)lim[k]=Math.min(lim[k]??1e9,L[k])});
  const lm=l.bomIds.map(id=>R.masters.find(m=>m.id===id)).filter(m=>m&&m.ad.rows.length),oi=lm[0];
  const cu=l.units.find(u=>(LIMS[u]||{}).b||(LIMS[u]||{}).h)||l.units[0],pa=platformAd(cu,{ini:Math.max(0,iniIdx(l.p)),concepts:l.concepts,langs:[l.lang]});
  let ad=JSON.parse(JSON.stringify(pa));ad=applyEdits(ad,editKey(R.tier,l));
  const files=[...l.bom].map(k=>{const m=idByKey[k];return m?m.id+' '+m.name:''}).filter(Boolean).join('; ')+' → '+l.units.flatMap(u=>variantsOf(u).map(v=>UNITS[u].name+' '+v)).join(', ')+` (${l.concepts} concepts × ${l.rounds} rounds)`;
  return {id:l.id,channel:l.channel,placement:l.placement,market:l.market,lang:l.lang,bom:l.bomIds.join(', '),files,copy:ad.text,_ad:ad,onimg:oi?oi.id+': '+oi.ad.text:'—',_oi:oi,pixel:(TAGS[l.c.id]||{}).tag||'',_test:tt,test:tt?tt.id+' · '+tt.cells.map(c=>tt.id+'-'+c[0]+' '+c.slice(2)).join(' / ')+` (one ad per cell: add _${tt.id}-A, _${tt.id}-B… to the ad name and utm_content; readout ${tt.readoutISO})`:'',flight:l.flight,due:l.due,adname:[code(S.name),TIERS[R.tier].toUpperCase().slice(0,3),code(l.m.id),code(l.c.id),l.p.id.toUpperCase(),l.stage.slice(0,3).toUpperCase(),l.lang,l.id].join('_'),
   src,med,camp,cont,term,url:base+(base.includes('?')?'&':'?')+q,...trafficRow(R,l,TR,days,yymm,cu,ad)}});
 return {name:'Agency trafficking sheet',cols,rows};
}
const audCode=a=>String(a||'all').split(/[,&+/;]| and /).map(x=>x.trim()).filter(Boolean).slice(0,4).map(x=>x.split(/[\s-]+/).map(w=>w[0]||'').join('').toLowerCase()).join('-')||'all';
const szCode=v=>{const m=String(v).match(/(\d+)\s*[×x]\s*(\d+)/);if(m)return m[1]+'x'+m[2];const r=String(v).match(/(\d+(?:\.\d+)?):(\d+)/);return r?r[1]+'-'+r[2]:slugU(v).slice(0,10)};
function trafficRow(R,l,TR,days,yymm,cu,ad){
 const ob=OBJ[l.p.buy]||['—','—'],lg=l.units.find(u=>LGF[u]),U=UNITS[cu]||{},t=TAGS[l.c.id]||{};
 const cname=[slugU(TR.bu)||'bu',slugU(TR.region)||'global',slugU(l.m.id),slugU(l.lang),TR.content,CHC[l.c.id]||slugU(l.c.id),slugU(ob[0]),STG[l.stage]||'aw',yymm,audCode(l.aud),TR.cc?'cc'+slugU(TR.cc):'ccXXXX',slugU(S.initiatives[l.ini]?.name||'')].filter(Boolean).join('_');
 const adnames=l.units.flatMap(u=>variantsOf(u).map(v=>[TR.content==='g'?'g':'ug',TR.ctype,'s-'+(FMTC[UNITS[u].fmt]||UNITS[u].fmt),'nm:'+slugU(l.bomIds[0]||l.id)+'-01','sz:'+szCode(v),audCode(l.aud),'a',slugU(l.m.id)].join('_')));
 const cta=(ad.rows[0]?.parts||[]).find(p=>/cta/i.test(p.k))?.t||(l.stage==='Awareness'?'Learn more':l.stage==='Conversion'?'Sign up':'Download');
 return {cname,cgroup:slugU(S.name)+'_'+(STG[l.stage]||'aw'),obj:ob[0],opt:ob[1],budget:Math.round(l.budget),daily:Math.round(l.budget/days),budgetTxt:money(l.budget),dailyTxt:money(l.budget/days)+'/day',
  adset:(l.aud||'')+' · '+l.tmethod,excl:DEF_EXCL,devices:l.c.group==='Search'?DEVICES.search:/video/i.test(U.fmt||'')?DEVICES.video:DEVICES.social,
  conv:String(t.events||'').split(',')[0].trim()||'—',lgf:lg?'Yes: '+UNITS[lg].name+' (sync to CRM, hidden field = line ID)':'No (landing page)',cta,nads:adnames.length*Math.max(1,l.concepts),adnames:adnames.join('\n'),
  build:TR.build,cc:TR.cc||'(add in Tagging settings)',crm:TR.crm?TR.crm+(TR.crmName?' · '+TR.crmName:''):'(add in Tagging settings)',ctype:(TR.content==='g'?'Gated':'Ungated')+' · '+TR.ctype,x1:'',x2:'',x3:'',x4:''}}
function specTable(R){
 const used={};R.lines.forEach(l=>l.units.forEach(u=>{(used[u]=used[u]||{pl:new Set(),mk:new Set(),lg:new Set()});used[u].pl.add(l.channel+' · '+l.placement);used[u].mk.add(l.market);used[u].lg.add(l.lang)}));
 const cols=[['Platform','group'],['Ad unit','name'],['Runs on','covers'],['Sizes / aspect ratios','sizes'],['File types','files'],['Max file size','max'],['Length / duration','length'],['Copy limits','copy'],['Notes','notes'],['Used in','usedIn'],['Markets','mk'],['Languages','lg'],['Production lead (days)','lead'],['Confirm with platform','verify']];
 const mk=S.markets.filter(m=>m.on),inCh=new Set(CH.filter(c=>S.channels[c.id]?.on).flatMap(c=>{const cm=mk.filter(m=>eligible(c,m));return cm.length?c.pl.flatMap(p=>typeof p.units==='function'?cm.flatMap(m=>p.units(m)):p.units):[]}));
 const rows=[];UNIT_GROUPS.forEach(([g,us])=>{const by={};us.filter(u=>inCh.has(u)&&variantsOf(u).length).forEach(u=>(by[specSig(u)]=by[specSig(u)]||[]).push(u));
  Object.values(by).forEach(grp=>{const s=UNITS[grp[0]],U=k=>[...new Set(grp.flatMap(u=>used[u]?[...used[u][k]]:[]))];const pl=U('pl');
   rows.push({group:g,units:grp,name:grp.map(u=>UNITS[u].name).join(' + '),covers:grp.map(u=>UNITS[u].covers).filter(Boolean).join('; '),sizes:variantsOf(grp[0]).join(' | '),files:s.files,max:s.max,length:s.length,
    copy:[...new Set(grp.flatMap(u=>UNITS[u].copy))].join(' | '),notes:[...new Set(grp.map(u=>UNITS[u].notes).filter(Boolean))].join(' '),usedIn:pl.length?pl.join('; '):'Selected · not bought in '+TIERNAME[R.tier],bought:pl.length>0,
    mk:U('mk').join(', '),lg:U('lg').join(', '),lead:Math.max(...grp.map(u=>UNITS[u].lead)),verify:grp.some(u=>UNITS[u].verify)?'Yes':''})})});
 return {name:'Spec Sheet',cols,rows};
}
function creativeTable(R){
 const cols=[['Channel','channel'],['Placement','placement'],['Ad unit','unitTxt'],['Language','lang'],['Markets served','markets'],['Concepts','concepts'],['Sizes','variants'],['Refresh rounds','rounds'],['Total files','files'],['First round due','due']];
 const rows=R.deliverables.map(d=>({...d,unitTxt:UNITS[d.unit].platform+' '+UNITS[d.unit].name}));
 return {name:'Creative Deliverables',cols,rows};
}
// projected outcomes: each line's delivery spread over months like its channel's spend
const FULLK=[['imp','Impressions'],['clk','Clicks'],['lpv','Visits (landing page)'],['leads','Leads'],['mql','MQLs'],['sql','SQLs'],['cust','Customers (closed-won)']];
const COSTK=[['Cost per lead','leads'],['Cost per MQL','mql'],['Cost per SQL','sql'],['CAC (media cost per customer)','cust']];
const OUTK=[['imp','Impressions','CPM'],['clk','Clicks','CPC'],['views','Video views','CPV'],['leads','Leads','CPL'],['sends','Messages sent','CPS']];
function outcomes(R){
 const fr=Object.fromEntries(R.flightRows.map(f=>[f.c.id,f]));const by={},mo={},flat={},full={},spend=R.months.map(()=>0);
 R.lines.forEach(l=>{const f=fr[l.c.id],k=(OUTK.find(o=>o[2]===l.p.buy)||[])[0];const share=f&&f.total?f.months.map(v=>v/f.total):R.months.map(()=>1/Math.max(1,R.months.length));
  const c=by[l.c.id]=by[l.c.id]||{c:l.c,budget:0,kpis:new Set(),flat:{}};c.budget+=l.budget;c.kpis.add(l.kpi);
  const lf=lineFun(l);if(lf){const P=pipe(),v={imp:lf.imp,clk:lf.clk,lpv:lf.lpv,leads:lf.leads};v.mql=v.leads*P.mql;v.sql=v.mql*P.sql;v.cust=v.sql*P.win;for(const kk in v){c['f_'+kk]=(c['f_'+kk]||0)+v[kk];(full[kk]=full[kk]||R.months.map(()=>0)).forEach((_,i)=>full[kk][i]+=v[kk]*share[i])}}
  (spend).forEach((_,i)=>spend[i]+=l.budget*share[i]);
  if(k){c[k]=(c[k]||0)+l.qty;(mo[k]=mo[k]||R.months.map(()=>0)).forEach((_,i)=>mo[k][i]+=l.qty*share[i])}
  else{c.flat[l.qu]=(c.flat[l.qu]||0)+l.qty;(flat[l.qu]=flat[l.qu]||R.months.map(()=>0)).forEach((_,i)=>flat[l.qu][i]+=l.qty*share[i])}});
 return {by:Object.values(by).sort((a,b)=>b.budget-a.budget),mo,flat,full,spend};
}
function flightAOA(R){const tb=flightTable(R),O=outcomes(R);const a=tableToAOA(tb,tb.cols.slice(1).map(c=>c[1]));a.push([],['Projected outcomes by month',...R.months.map(monthLabel),'Total']);
 FULLK.forEach(([k,n])=>{if(O.full[k])a.push([n,...O.full[k].map(v=>+v.toFixed(1)),+sum(O.full[k]).toFixed(1)])});a.push(['Media spend',...O.spend.map(Math.round),Math.round(sum(O.spend))]);
 COSTK.forEach(([n,k])=>{if(O.full[k])a.push([n,...O.full[k].map((v,i)=>v>=.05?+(O.spend[i]/v).toFixed(2):''),sum(O.full[k])?+(sum(O.spend)/sum(O.full[k])).toFixed(2):''])});
 Object.entries(O.flat).forEach(([u,v])=>a.push(['Flat-fee '+u,...v.map(x=>+x.toFixed(1)),+sum(v).toFixed(1)]));
 a.push([],['KPIs & projected outcomes by channel','Budget','KPIs',...OUTK.map(o=>o[1]),'Flat-fee units']);
 O.by.forEach(c=>a.push([c.c.name,Math.round(c.budget),[...c.kpis].join('; '),...OUTK.map(([k])=>c[k]?Math.round(c[k]):''),Object.entries(c.flat).map(([u,v])=>Math.round(v*10)/10+' '+u).join(', ')]));
 return a}
function flightTable(R){
 const cols=[['Channel','channel'],...R.months.map(m=>[monthLabel(m),m]),['Total','total']];
 const rows=R.flightRows.map(f=>{const o={channel:f.c.name,total:Math.round(f.total)};R.months.forEach((m,i)=>o[m]=Math.round(f.months[i]));return o});
 return {name:'Flighting',cols,rows};
}
function assumptionTable(R){
 const cols=[['Channel','channel'],['Placement','placement'],['Audience','aud'],['Targeting','tmethod'],['Buy type','buy'],['Rate used','rate'],['Benchmark rate','bench'],['Budget','budget'],['Est. delivery','qty'],['Delivery unit','qu'],['Proj. impressions','imp'],['Proj. clicks','clk'],['Proj. landing page visits','lpv'],['Proj. video views','views'],['Proj. leads','leads'],['Cost per lead','cpl'],['Markets','mk'],['Lines','n'],['Share of channel %','share'],['Funnel stage','stage'],['KPI','kpi']];
 const rows=[];CH.forEach(c=>c.pl.forEach(p=>{const ls=R.lines.filter(l=>l.p.id===p.id);if(!ls.length)return;
  const F_={imp:0,clk:0,lpv:0,views:0,leads:0};ls.forEach(l=>{const f=lineFun(l);if(f)for(const k in F_)F_[k]+=f[k]});for(const k in F_)F_[k]=Math.round(F_[k]);
  rows.push({...F_,cpl:F_.leads?+(sum(ls.map(l=>l.budget))/F_.leads).toFixed(2):'',channel:c.name,placement:p.name,tier:TIERNAME[p.min],buy:p.buy,rate:rateOf(p),bench:p.rate,budget:sum(ls.map(l=>l.budget)),qty:Math.round(sum(ls.map(l=>l.qty))),qu:ls[0].qu,mk:ls.map(l=>l.market).join(', '),n:ls.length,share:p.share,stage:p.stage,kpi:p.kpi,_id:p.id,aud:audLabel(c,p),tmethod:tgtOf(c,p)})}));
 const fb=fairRound(rows.map(r=>r.budget));rows.forEach((r,i)=>r.budget=fb[i]);
 return {name:'Buy Details',cols,rows};
}
function summaryRows(R){
 const agg=(key)=>{const o={};R.lines.forEach(l=>o[l[key]]=(o[l[key]]||0)+l.budget);return Object.entries(o).sort((a,b)=>b[1]-a[1])};
 return {byChannel:agg('channel'),byMarket:agg('market'),byStage:agg('stage'),byIni:(()=>{const o={};R.lines.forEach(l=>o[l.ini.name]=(o[l.ini.name]||0)+l.budget);return Object.entries(o).sort((a,b)=>b[1]-a[1])})()};
}
function totals(R){const t={imp:0,clk:0,views:0,leads:0};R.lines.forEach(l=>{if(l.p.buy==='CPM')t.imp+=l.qty;if(l.p.buy==='CPC')t.clk+=l.qty;if(l.p.buy==='CPV')t.views+=l.qty;if(l.p.buy==='CPL')t.leads+=l.qty});
 t.files=sum(R.masters.map(m=>m.masterFiles));t.masters=R.masters.length;t.channels=new Set(R.lines.map(l=>l.c.id)).size;t.placements=new Set(R.lines.map(l=>l.p.id)).size;t.markets=new Set(R.lines.map(l=>l.market)).size;t.lines=R.lines.length;t.budget=sum(R.lines.map(l=>l.budget));return t}

// Full-funnel estimate across every buy: each line's bought unit plus benchmark ratios for the rest (flat-fee buys not estimated)
const FUN={ctr:0.005,ctrCpc:0.05,viewRate:0.3,leadForm:0.10,openRate:0.4,sendCtr:0.03,lpv:0.8,eng:0.006,cvr:0.02};
// Channel benchmarks (B2B, 2025 industry data): override FUN per channel. Sources are listed on the Flighting tab.
const CHFUN={linkedin:{ctr:0.005,leadForm:0.10,cvr:0.025,lpv:0.75},google:{ctrCpc:0.06,cvr:0.03,lpv:0.85},meta:{ctr:0.008,leadForm:0.12,cvr:0.015},x:{ctr:0.004,cvr:0.01},reddit:{ctr:0.005,cvr:0.01},youtube:{ctr:0.004,viewRate:0.3,cvr:0.01},
 trade:{ctr:0.001,cvr:0.015},abm:{ctr:0.002,cvr:0.015},events:{ctr:0.005,cvr:0.02},wechat:{ctr:0.008,cvr:0.01},baidu:{ctrCpc:0.04,cvr:0.02},naver:{ctrCpc:0.04,ctr:0.003,cvr:0.02}};
const funOf=id=>({...FUN,...(CHFUN[id]||{})});
const BENCH_SRC=[['LinkedIn','CPM $30–90 · CTR 0.44–0.65% · CPC $6–10 ($10+ for software) · lead form completion 6–18% · CPL $75–250','https://www.clickminded.com/linkedin-ads-benchmarks/'],
 ['Google Search','B2B search CTR ~6.3% · click-to-lead 1.9% (Metadata) to 3–5% (B2B, Search Engine Land) · median search CPC $5.26, higher for software','https://metadata.io/b2b-advertising-benchmarks'],
 ['Google (trend)','CPC up ~7% in 2025; average CPL $70 all industries (B2B runs higher)','https://searchengineland.com/google-ads-costs-keep-rising-but-conversion-rates-improved-in-2025-477927'],
 ['Meta','B2B link CTR ~0.8% · lead ads CPL up ~21% in 2025 · B2B SaaS CPL ~$60','https://wordstream.com/blog/facebook-ads-benchmarks-2025'],
 ['Reddit','CPM $3–12 · promoted post CTR 0.3–1.0% · B2B CPC $0.50–4','https://benly.ai/learn/reddit-ads/reddit-ads-cost-benchmarks'],
 ['YouTube','CPM ~$9 (standard video) · in-stream CPV ~$0.05','https://storegrowers.com/youtube-ads-benchmarks'],
 ['Pipeline','Lead→MQL 31–41% · MQL→SQL 13% median (Salesforce) to 26% for paid search · SQL→opp 30–50% × opp→won 20–35% ≈ 10–15% SQL→customer','https://thedigitalbloom.com/learn/pipeline-performance-benchmarks-2025/'],
 ['Pipeline (trend)','SQL→closed-won fell 5–6 points in 2025 (ICONIQ)','https://www.saastr.com/the-age-of-ai-the-top-10-gtm-learnings-from-iconiqs-2025-b2b-saas-report']];
function benchHTML(){const ids=CH.filter(c=>S.channels[c.id]?.on).map(c=>c);
 return `<details class="bench" style="margin-top:14px"><summary style="cursor:pointer;font-weight:600">Benchmarks behind these projections (B2B, 2025 industry data)</summary>
 <div class="tscroll" style="margin-top:8px"><table><thead><tr><th>Channel</th><th class="n">CTR</th><th class="n">Search CTR</th><th class="n">Click → visit</th><th class="n">Visit → lead</th><th class="n">Lead form completion</th><th class="n">Video view rate</th></tr></thead><tbody>
 ${ids.map(c=>{const f=funOf(c.id),bs=c.pl.map(p=>p.buy),na='<span class="sub2">—</span>',srch=['google','baidu','naver'].includes(c.id);return `<tr><td>${esc(c.name)}</td><td class="n">${srch&&!bs.includes('CPM')?na:pct(f.ctr)}</td><td class="n">${srch?pct(f.ctrCpc):na}</td><td class="n">${pct(f.lpv)}</td><td class="n">${pct(f.cvr)}</td><td class="n">${bs.includes('CPL')?pct(f.leadForm):na}</td><td class="n">${bs.includes('CPV')?pct(f.viewRate):na}</td></tr>`}).join('')}</tbody></table></div>
 <div class="note" style="margin-top:8px">Rates per buy (CPM, CPC, CPL, CPV) are on the Buy Details tab, where you can replace any of them with your rate card. Where sources disagree we used the middle of the B2B range. Swap in your own CRM history as soon as you have it.</div>
 <ul class="note" style="margin:6px 0 0 18px">${BENCH_SRC.map(([n,t,u])=>`<li><strong>${n}:</strong> ${esc(t)} · <a href="${u}" target="_blank" rel="noopener">source</a></li>`).join('')}</ul></details>`}
// Pipeline rates (editable on the Flighting tab): lead → MQL → SQL → closed-won customer
const PIPE_DEF={mql:0.35,sql:0.20,win:0.15};const pipe=()=>({...PIPE_DEF,...(S.pipe||{})});
const FUNNEL=[['imp','Impressions'],['reach','Est. reach (unique people)'],['clk','Clicks'],['lpv','Landing page visits'],['eng','Engagements (clicks, likes, shares, comments)'],['views','Video views'],['sends','Messages sent'],['leads','Leads'],['mql','MQLs'],['sql','SQLs'],['cust','Customers (closed-won)']];
function lineFun(l){const q=l.qty||0,FUN=funOf(l.c.id);let imp=0,clk=0,views=0,sends=0,leads=0;
 switch(l.p.buy){case'CPM':imp=q;clk=q*FUN.ctr;break;case'CPC':clk=q;imp=q/FUN.ctrCpc;break;
  case'CPV':views=q;imp=q/FUN.viewRate;clk=imp*FUN.ctr;break;case'CPL':leads=q;clk=q/FUN.leadForm;imp=clk/FUN.ctr;break;
  case'CPS':sends=q;imp=q*FUN.openRate;clk=q*FUN.sendCtr;break;default:return null}
 const lpv=clk*FUN.lpv;if(l.p.buy!=='CPL')leads=lpv*FUN.cvr;leads*=l.sat||1;return {imp,clk,lpv,eng:clk+imp*FUN.eng,views,sends,leads,opens:l.p.buy==='CPL'?clk:0}}
function funnel(R){const o={imp:0,reach:0,clk:0,lpv:0,eng:0,views:0,sends:0,leads:0,spend:0};
 R.lines.forEach(l=>{const f=lineFun(l);if(!f)return;for(const k in o)if(k in f)o[k]+=f[k];o.spend+=l.budget});
 const P=pipe();o.mql=o.leads*P.mql;o.sql=o.mql*P.sql;o.cust=o.sql*P.win;
 o.reach=o.imp/3.5;o.cpm=o.imp?o.spend/o.imp*1000:0;o.cpc=o.clk?o.spend/o.clk:0;o.cpl=o.leads?o.spend/o.leads:0;o.cpmql=o.mql?o.spend/o.mql:0;o.cpsql=o.sql?o.spend/o.sql:0;o.cac=o.cust?o.spend/o.cust:0;return o}

/* ==================== GROWTH PLAN ==================== */
// Revenue side, goal-back budget, scenarios, saturation, total cost, sales capacity, in-flight rules, incrementality
const GROWTH_DEF={acv:60000,gm:80,life:4,agency:12,creative:40000,tools:15000,sdr:2,perSdr:150,goalType:'cust',goal:40};
const gr=()=>({...GROWTH_DEF,...(S.growth||{})});
// Diminishing returns: spend where a channel's results fall to ~63% of linear (planning estimate per flight)
const SAT_CAP={linkedin:1500000,google:800000,meta:1000000,x:300000,reddit:300000,youtube:800000,trade:300000,creators:200000,abm:600000,events:300000,wechat:300000,baidu:200000,naver:200000};
const satF=(id,x)=>{const c=SAT_CAP[id]||500000,r=x/c;return r>0?(1-Math.exp(-r))/r:1};
function econ(R,o){const G=gr(),media=sum(R.lines.map(l=>l.budget)),fees=media*G.agency/100,total=media+fees+(+G.creative||0)+(+G.tools||0);
 const pipeline=o.sql*G.acv,rev=o.cust*G.acv,gp=rev*G.gm/100,cacM=o.cust?media/o.cust:0,cacF=o.cust?total/o.cust:0,ltv=G.acv*G.gm/100*G.life;
 return {G,media,fees,total,pipeline,rev,gp,cacM,cacF,ltv,ltvCac:cacF?ltv/cacF:0,payback:G.acv?cacF/(G.acv*G.gm/100/12):0,roi:total?(gp-total)/total:0,pipeRoi:total?pipeline/total:0}}
const goalVal=(o,t)=>t==='pipe'?o.sql*gr().acv:t==='sql'?o.sql:o.cust;
function goalBudget(tier){const G=gr(),T=TIERS[tier],keep=S.budgets[T],target=+G.goal||0;if(!target)return null;
 const at=b=>{S.budgets[T]=b;const v=goalVal(funnel(compute(tier)),G.goalType);return v};
 try{let lo=0,hi=Math.max(+keep||1,1)*1;let n=0;while(at(hi)<target&&n<12){lo=hi;hi*=2;n++}
  if(at(hi)<target)return {budget:null};for(let i=0;i<22;i++){const mid=(lo+hi)/2;if(at(mid)<target)lo=mid;else hi=mid}return {budget:hi}}
 finally{S.budgets[T]=keep}}
function scen(o,k,pk){const P=pipe(),leads=o.leads*k,mql=leads*Math.min(1,P.mql*pk),sql=mql*Math.min(1,P.sql*pk),cust=sql*Math.min(1,P.win*pk);return {...o,leads,mql,sql,cust}}
function renderGrowth(R){const G=gr(),o=funnel(R),E=econ(R,o),mo=outcomes(R),cap=G.sdr*G.perSdr;
 const inp=(k,l,u,step=1,w=96)=>`<label>${l} <input class="rate g-in" style="width:${w+24}px!important" type="number" min="0" step="${step}" data-k="${k}" value="${G[k]}">${u||''}</label>`;
 const tile=(v,k,cls='',f='')=>`<div class="tile ${cls}"${f?` title="How it's calculated: ${esc(f)}"`:''}><span class="v">${v}</span><span class="k">${k}</span>${f?`<span class="tf">= ${esc(f)}</span>`:''}</div>`;
 const n1=v=>v>=10?compact(v):(+v.toFixed(1)).toString(),gpm=G.acv*G.gm/100/12;
 const gl={cust:'customers',pipe:'pipeline $',sql:'SQLs'}[G.goalType];
 const gb=[0,1,2].map(t=>({t,o:funnel(compute(t)),b:+S.budgets[TIERS[t]]||0})),need=goalBudget(R.tier);
 const goalTxt=v=>G.goalType==='pipe'?money(v):compact(v);
 const S3=[['Conservative','Leads 30% under plan, pipeline rates 15% worse',0.7,0.85],['Expected','Benchmarks as planned',1,1],['Strong','Leads 25% over plan, pipeline rates 10% better',1.25,1.1]].map(([n,d,k,pk])=>{const x=scen(o,k,pk);return {n,d,x,e:econ(R,x)}});
 const FIXES=[['CPL above target 2 weeks running','Move budget to the lowest-CPL channel, refresh creative (ad fatigue shows after 3–4 weeks), tighten targeting and exclusions, and test lead gen forms against the landing page.'],
  ['Landing page conversion under plan','Cut the form to 3–5 fields, match the page headline to the ad, add customer logos and proof up top, and A/B test the offer (demo vs report vs calculator).'],
  ['Sales rejecting more than 40% of MQLs','Re-agree the MQL definition with sales, add one or two qualifying questions to forms, exclude students, job seekers and tiny companies, and follow up within an hour.'],
  ['Deals stalling past the normal sales cycle','Retarget open opportunities with case studies, ROI proof and competitor comparisons, reach the whole buying committee with ABM, and give sales a follow-up content kit.']];
 const SENS=[['CPL 20% higher (fewer leads)',scen(o,1/1.2,1)],['Visit → lead 20% lower',scen(o,0.8,1)],['MQL → SQL 5 pts lower',(()=>{const P=pipe(),f=Math.max(0,P.sql-0.05)/P.sql;const mql=o.leads*P.mql,sql=mql*P.sql*f;return {...o,mql,sql,cust:sql*P.win}})()],['SQL → customer 5 pts lower',(()=>{const P=pipe(),f=Math.max(0,P.win-0.05)/P.win;return {...o,cust:o.cust*f}})()]];
 const byC={};R.lines.forEach(l=>{const f=lineFun(l),b=byC[l.c.id]=byC[l.c.id]||{c:l.c,spend:0,leads:0};b.spend+=l.budget;if(f)b.leads+=f.leads});
 const satRows=Object.values(byC).sort((a,b)=>b.spend-a.spend).map(b=>{const eff=satF(b.c.id,b.spend),lin=eff?b.leads/eff:0,next=b.spend+10000,nl=lin*(next/b.spend)*satF(b.c.id,next),ml=nl-b.leads;
  return {...b,eff,cpl:b.leads?b.spend/b.leads:0,mcpl:ml>0?10000/ml:0}});
 const lm=mo.full.leads||R.months.map(()=>0),over=lm.map(v=>v>cap);
 const rules=satRows.filter(r=>r.spend>0).map(r=>{const lead=r.leads>0.5;const tgt=r.cpl;
  return {ch:r.c.name,metric:lead?'Cost per lead':'CTR vs benchmark',target:lead?money(tgt):pct(funOf(r.c.id).ctr),
   scale:lead?`CPL ≤ ${money(tgt*0.8)} and MQL rate on plan → add 20%`:`CTR ≥ ${pct(funOf(r.c.id).ctr*1.3)} → add 15%`,
   cut:lead?`CPL ≥ ${money(tgt*1.3)} after ${money(tgt*3)} spent → cut 30%, move to best CPL`:`CTR < ${pct(funOf(r.c.id).ctr*0.5)} after 2 weeks → swap creative, then cut 30%`,
   check:r.c.group==='Search'||/search/i.test(r.c.name)?'Weekly':'Week 2, then every 2 weeks'}});
 const mk=S.markets.filter(m=>m.on&&+m.weight>0).sort((a,b)=>a.weight-b.weight),hold=mk.length>2?mk[0]:null,hs=hold?sum(R.lines.filter(l=>l.m.id===hold.id).map(l=>l.budget)):0,ht=sum(R.lines.map(l=>l.budget))||1;
 const flagCap=over.some(Boolean);
 return `<div class="panel" style="display:flex;flex-direction:column;gap:18px">
 <div><div class="eyebrow">${esc(TIERNAME[R.tier])} version · growth view</div><h2 style="font-size:20px;margin-top:2px">${money(E.total)} all-in buys about ${compact(o.cust)} customers and ${money(E.pipeline)} of pipeline</h2>
  <div class="note">Media plan outcomes turned into revenue, payback and ROI. Type your own numbers in the boxes; everything on this tab and the Summary updates. Planning estimates, not guarantees.</div></div>
 <div class="pipe-set"><span class="sub2">Revenue:</span>${inp('acv','Deal size (ACV) $','',1000,110)}${inp('gm','Gross margin','%',1,64)}${inp('life','Customer lifetime','yrs',0.5,64)}</div>
 <div class="pipe-set"><span class="sub2">Other costs:</span>${inp('agency','Agency fee','% of media',1,64)}${inp('creative','Creative production $','',1000,110)}${inp('tools','Tools &amp; data $','',1000,110)}</div>
 <div class="tiles">${tile(money(E.pipeline),'Pipeline (SQLs × ACV)','',`${n1(o.sql)} SQLs × ${money(G.acv)} ACV`)}${tile(money(E.rev),'First-year new revenue','',`${n1(o.cust)} customers × ${money(G.acv)} ACV`)}${tile(money(E.total),'All-in cost','',`${money(E.media)} media + ${money(E.fees)} agency fee (${G.agency}%) + ${money(+G.creative||0)} creative + ${money(+G.tools||0)} tools`)}
  ${tile(money(E.cacF),`Fully loaded CAC (media only ${money(E.cacM)})`,'',`${money(E.total)} all-in ÷ ${n1(o.cust)} customers`)}${tile(E.ltvCac?E.ltvCac.toFixed(1)+' : 1':'—',`LTV : CAC (aim for 3 : 1 or better)`,E.ltvCac&&E.ltvCac<3?'warn':'',`${money(E.ltv)} lifetime gross profit ÷ ${money(E.cacF)} CAC`)}${tile(E.payback?Math.round(E.payback)+' mo':'—','CAC payback (aim for under 18 months)',E.payback>18?'warn':'',`${money(E.cacF)} CAC ÷ ${money(gpm)} gross profit a month (ACV × ${G.gm}% ÷ 12)`)}
  ${tile((E.pipeRoi).toFixed(1)+'×','Pipeline per $1 spent','',`${money(E.pipeline)} pipeline ÷ ${money(E.total)} all-in`)}${tile(Math.round(E.roi*100)+'%','First-year ROI on gross profit','',`(${money(E.rev)} revenue × ${G.gm}% − ${money(E.total)} cost) ÷ ${money(E.total)}`)}${tile(money(E.ltv),'Lifetime gross profit per customer','',`${money(G.acv)} ACV × ${G.gm}% margin × ${G.life} yrs`)}</div>

 <div><h2 style="font-size:18px">Start from the goal</h2><div class="note">Pick what you need to deliver and see the budget it takes at this plan's mix, including diminishing returns.</div>
  <div class="pipe-set" style="margin-top:8px"><label>Goal <select id="g-goaltype">${[['cust','Customers'],['sql','SQLs'],['pipe','Pipeline $']].map(([v,n])=>`<option value="${v}" ${G.goalType===v?'selected':''}>${n}</option>`).join('')}</select></label>${inp('goal','Target','',1,120)}</div>
  <div class="tscroll"><table><thead><tr><th>Version</th><th class="n">Media budget</th><th class="n">Delivers</th><th class="n">vs goal</th></tr></thead><tbody>
  ${gb.map(g=>{const v=goalVal(g.o,G.goalType),ok=v>=G.goal;return `<tr><td>${esc(TIERNAME[g.t])}</td><td class="n">${money(g.b)}</td><td class="n">${goalTxt(v)} ${gl}</td><td class="n"><span class="chip ${ok?'aw':'flag'}">${ok?'Hits goal':Math.round(v/Math.max(1,G.goal)*100)+'% of goal'}</span></td></tr>`}).join('')}
  <tr class="tot"><td>Budget needed (${esc(TIERNAME[R.tier])} mix)</td><td class="n">${need&&need.budget?money(need.budget):'Not reachable with this mix'}</td><td class="n">${goalTxt(G.goal)} ${gl}</td><td class="n">${need&&need.budget?money(need.budget*(1+G.agency/100)+(+G.creative)+(+G.tools))+' all-in':''}</td></tr></tbody></table></div></div>

 <div style="display:flex;flex-direction:column;gap:18px"><div><h2 style="font-size:18px">Range of outcomes</h2><div class="tscroll"><table><thead><tr><th>Case</th><th class="n">Leads</th><th class="n">SQLs</th><th class="n">Customers</th><th class="n">Pipeline</th><th class="n">CAC (all-in)</th><th class="n">Payback</th></tr></thead><tbody>
  ${S3.map(s=>`<tr${s.n==='Expected'?' class="tot"':''}><td>${s.n}<div class="sub2">${s.d}</div></td><td class="n">${compact(s.x.leads)}</td><td class="n">${compact(s.x.sql)}</td><td class="n">${compact(s.x.cust)}</td><td class="n">${money(s.e.pipeline)}</td><td class="n">${s.x.cust?money(s.e.cacF):'—'}</td><td class="n">${s.e.payback?Math.round(s.e.payback)+' mo':'—'}</td></tr>`).join('')}</tbody></table></div><div class="note" style="margin-top:8px"><strong>If you're tracking toward Conservative by week 4:</strong> keep 10–15% of the budget unallocated until then so you can move it; cut the bottom two placements by CPL and fund the top two; lean on retargeting and lead gen forms, which convert fastest; and reset the goal with leadership early rather than at quarter end. <strong>If you're tracking toward Strong:</strong> raise budget on channels that still have room to grow (see Diminishing returns) and check sales capacity before you add spend.</div></div>
  <div><h2 style="font-size:18px">What if one number slips</h2><div class="tscroll"><table><thead><tr><th>If…</th><th class="n">Customers</th><th class="n">CAC (all-in)</th><th class="n">Change</th><th>Early warning</th><th>What to do</th></tr></thead><tbody>
  ${SENS.map(([n,x],i)=>{const e=econ(R,x);return `<tr><td style="min-width:150px">${n}</td><td class="n">${compact(x.cust)}</td><td class="n">${x.cust?money(e.cacF):'—'}</td><td class="n" style="white-space:nowrap">${E.cacF&&e.cacF?'+'+Math.round((e.cacF/E.cacF-1)*100)+'% CAC':'—'}</td><td class="sub2" style="min-width:150px">${FIXES[i][0]}</td><td class="sub2" style="min-width:280px">${FIXES[i][1]}</td></tr>`}).join('')}</tbody></table></div></div></div>

 <div><h2 style="font-size:18px">Diminishing returns by channel</h2><div class="note">Each extra dollar in a channel buys a bit less as you exhaust its best audiences. Efficiency is the share of straight-line results you still get at this spend; the last column is what the next $10K would cost per lead.</div>
  <div class="tscroll"><table><thead><tr><th>Channel</th><th class="n">Spend</th><th class="n">Efficiency</th><th class="n">Leads</th><th class="n">Avg cost per lead</th><th class="n">Next $10K: cost per lead</th><th>Room to grow</th></tr></thead><tbody>
  ${satRows.map(r=>`<tr><td>${esc(r.c.name)}</td><td class="n">${money(r.spend)}</td><td class="n">${Math.round(r.eff*100)}%</td><td class="n">${r.leads>0.5?compact(r.leads):'<span class="sub2">—</span>'}</td><td class="n">${r.cpl&&r.leads>0.5?money(r.cpl):'<span class="sub2">—</span>'}</td><td class="n">${r.mcpl&&r.leads>0.5?money(r.mcpl):'<span class="sub2">—</span>'}</td><td><span class="chip ${r.eff>0.9?'aw':r.eff>0.8?'':'flag'}">${r.eff>0.9?'Plenty':r.eff>0.8?'Some':'Near saturation'}</span></td></tr>`).join('')}</tbody></table></div></div>

 <div><h2 style="font-size:18px">Can sales keep up?</h2><div class="note">Compares the leads this plan creates each month with how many your SDRs can actually call. Capacity = number of SDRs × leads each can work in a month. A month in amber has more leads than the team can follow up on, usually launch and event months when spend is heaviest.</div><div class="pipe-set" style="margin-top:6px">${inp('sdr','SDRs working these leads','',1,64)}${inp('perSdr','Leads each can work a month','',10,72)}<span class="chip ${flagCap?'flag':'aw'}">${flagCap?`${over.filter(Boolean).length} month${over.filter(Boolean).length>1?'s':''} over capacity`:'Capacity covers every month'}</span></div>
  <div class="tscroll"><table><thead><tr><th>Month</th>${R.months.map(m=>`<th class="n">${esc(monthLabel(m))}</th>`).join('')}</tr></thead><tbody>
  <tr><td>Leads from this plan</td>${lm.map((v,i)=>`<td class="n"${over[i]?' style="color:var(--flag);font-weight:600"':''}>${compact(v)}</td>`).join('')}</tr>
  <tr><td>Leads your SDRs can work</td>${lm.map(()=>`<td class="n">${compact(cap)}</td>`).join('')}</tr></tbody></table></div>
  <div class="note" style="margin-top:6px">To fix an amber month: add an SDR (or borrow one) for that month, raise leads per SDR, or shift some of that month's spend later. Agree an SLA with sales before launch: follow up on every hand-raiser within 1 hour (5 minutes for demo requests), route by market, and send leads from months over capacity to nurture instead of letting them go cold.</div></div>

 <div><h2 style="font-size:18px">In-flight rules: when to scale, hold or cut</h2><div class="note">Agree these with the agency up front so budget moves on data, not opinion. Targets come from this plan's projections.</div>
  <div class="tscroll"><table><thead><tr><th>Channel</th><th>Watch</th><th class="n">Target</th><th>Scale if</th><th>Cut if</th><th>Check</th></tr></thead><tbody>
  ${rules.map(r=>`<tr><td>${esc(r.ch)}</td><td>${r.metric}</td><td class="n">${r.target}</td><td class="sub2" style="min-width:200px">${r.scale}</td><td class="sub2" style="min-width:240px">${r.cut}</td><td class="sub2">${r.check}</td></tr>`).join('')}</tbody></table></div>
  <div class="note" style="margin-top:6px">Hold everything for the first 2 weeks while platforms learn. Move at most 20–30% of a channel's budget per change, and log every move in the trafficking sheet.</div></div>

 <div><h2 style="font-size:18px">Prove it's incremental</h2><div class="tscroll"><table><thead><tr><th>Method</th><th>How</th><th>Cost</th></tr></thead><tbody>
  ${hold?`<tr><td><strong>Geo holdout</strong></td><td>Pause paid media in ${esc(hold.name)} for 6–8 weeks mid-flight and compare its pipeline with forecast and with similar markets. The gap is what media actually caused.</td><td class="n">${money(hs*8/Math.max(4,flightWeeks()))} of ${esc(hold.name)} spend held back (${Math.round(hs/ht*100)}% of plan)</td></tr>`:`<tr><td><strong>Geo holdout</strong></td><td>Add a third market to run a geo holdout; with two markets, use a time-based on/off test instead.</td><td class="n">—</td></tr>`}
  <tr><td><strong>Platform lift studies</strong></td><td>Ask LinkedIn and Meta reps for a conversion lift study, and run Google conversion lift where eligible. Each splits the audience into exposed and holdout groups.</td><td class="n">Usually free above a spend minimum</td></tr>
  <tr><td><strong>Brand search watch</strong></td><td>Track branded search volume and direct traffic in markets with and without upper-funnel spend.</td><td class="n">Free</td></tr>
  <tr><td><strong>Self-reported attribution</strong></td><td>Add a required "How did you hear about us?" field to forms and demo bookings to catch dark social, podcasts and creators.</td><td class="n">Free</td></tr></tbody></table></div></div>
 </div>`}
function growthAOA(R){const o=funnel(R),E=econ(R,o),G=E.G;return [['GROWTH PLAN · '+TIERNAME[R.tier]],[],['Deal size (ACV)',G.acv],['Gross margin %',G.gm],['Customer lifetime (yrs)',G.life],['Agency fee % of media',G.agency],['Creative production',G.creative],['Tools & data',G.tools],[],
 ['Media spend',Math.round(E.media)],['All-in cost',Math.round(E.total)],['Leads',Math.round(o.leads)],['SQLs',Math.round(o.sql)],['Customers',+o.cust.toFixed(1)],['Pipeline (SQLs × ACV)',Math.round(E.pipeline)],['First-year revenue',Math.round(E.rev)],
 ['CAC (media only)',Math.round(E.cacM)],['CAC (fully loaded)',Math.round(E.cacF)],['LTV : CAC',+E.ltvCac.toFixed(2)],['Payback (months)',Math.round(E.payback)],['First-year ROI on gross profit',+(E.roi*100).toFixed(0)+'%']]}

/* ==================== AUDIENCE, TARGETING & ASSETS ==================== */
// Per-placement audience (from the personas in section 4) and targeting method, editable on Buy Details; flows to the agency sheet
const TGT_METHODS=['Job title','Skills','Predictive','TAL','Industry','Interests','Keywords','Retargeting','Contextual','Geo-fence'];
function tgtDefault(c,p){const id=p.id;if(c.id==='google'||c.id==='baidu'||(c.id==='naver'&&/_s$/.test(id)))return 'Keywords';
 if(/_rt$/.test(id))return 'Retargeting';if(c.id==='abm')return 'TAL';if(c.id==='events')return 'Geo-fence';
 if(c.id==='linkedin')return 'Job title';if(['trade','creators'].includes(c.id))return 'Contextual';return 'Interests'}
const tgtOf=(c,p)=>{const v=(S.plTgt||{})[p.id];return TGT_METHODS.includes(v)?v:tgtDefault(c,p)};
const audKeyOf=p=>(S.plAud||{})[p.id]||'';
function audLabel(c,p){const k=audKeyOf(p);if(k==='_all')return Object.keys(S.personas).filter(x=>S.personas[x]?.on&&S.personas[x].label).map(x=>S.personas[x].label.split('(')[0].trim()).join(', ')||'—';
 if(k&&S.personas[k]?.label)return S.personas[k].label.split('(')[0].trim();return personaShort(c)}
function audSelect(c,p){const k=audKeyOf(p),ps=Object.keys(S.personas).filter(x=>S.personas[x]?.on&&S.personas[x].label);
 return `<select class="aud-in" data-pid="${p.id}" aria-label="Audience for ${esc(p.name)}" style="width:100%"><option value="" ${!k?'selected':''}>Default: ${esc(personaShort(c))}</option>${ps.map(x=>`<option value="${x}" ${k===x?'selected':''}>${esc(S.personas[x].label)}</option>`).join('')}<option value="_all" ${k==='_all'?'selected':''}>All personas</option></select>`}
function tgtSelect(c,p){const v=tgtOf(c,p);return `<select class="tgt-in" data-pid="${p.id}" aria-label="Targeting for ${esc(p.name)}" style="width:100%">${TGT_METHODS.map(m=>`<option ${m===v?'selected':''}>${esc(m)}</option>`).join('')}</select>`}

// Assets: the content each campaign promotes (ebooks, webinars, videos…), with links, dates and Salesforce IDs
const ASSET_TYPES=['eBook','Report / guide','Webinar','Video','Case study','Demo / trial','Event','Blog / article','Tool / calculator','Other'];
const ASSET_KEEP=1.5e6;
function assetTypeFromFile(f){const n=f.name.toLowerCase();if(/\.(mp4|mov|webm|m4v)$/.test(n))return 'Video';if(/\.(pdf|epub)$/.test(n))return 'eBook';if(/\.(pptx?|key)$/.test(n))return 'Report / guide';if(/\.(png|jpe?g|gif|webp|svg)$/.test(n))return 'Other';return 'Other'}
const prettyName=n=>n.replace(/\.[a-z0-9]+$/i,'').replace(/[_-]+/g,' ').replace(/\s+/g,' ').trim().replace(/^./,c=>c.toUpperCase());
const fmtSize=b=>b>=1e6?(b/1e6).toFixed(1)+' MB':Math.max(1,Math.round(b/1e3))+' KB';
function renderAssets(R){const A=S.assets||[];const live=S.start||'';
 const row=(a,i)=>`<tr><td style="min-width:200px"><input class="as-in" data-i="${i}" data-k="name" value="${esc(a.name||'')}" placeholder="Content name"></td>
  <td style="min-width:240px"><textarea class="as-in" data-i="${i}" data-k="desc" rows="2" placeholder="What it is and who it's for">${esc(a.desc||'')}</textarea></td>
  <td style="min-width:200px"><input class="as-in" data-i="${i}" data-k="link" type="url" value="${esc(a.link||'')}" placeholder="https://">${a.link&&/^https?:\/\//.test(a.link)?`<div class="sub2"><a href="${esc(a.link)}" target="_blank" rel="noopener">Open link</a></div>`:''}</td>
  <td><select class="as-in" data-i="${i}" data-k="ctype">${ASSET_TYPES.map(t=>`<option ${t===(a.ctype||'eBook')?'selected':''}>${t}</option>`).join('')}</select></td>
  <td><input class="as-in" data-i="${i}" data-k="due" type="date" value="${esc(a.due||'')}" aria-label="Delivery date"></td>
  <td><input class="as-in" data-i="${i}" data-k="live" type="date" value="${esc(a.live||live)}" aria-label="Live date"></td>
  <td style="min-width:170px"><input class="as-in m" data-i="${i}" data-k="sfid" value="${esc(a.sfid||'')}" placeholder="701…" aria-label="Salesforce ID"></td>
  <td class="sub2" style="min-width:150px">${a.file?(a.file.data?`<a href="${a.file.data}" download="${esc(a.file.name)}">${esc(a.file.name)}</a>`:esc(a.file.name))+`<div>${fmtSize(a.file.size)}${a.file.data?'':' · too large to keep here; add a link'}</div>`:'—'}</td>
  <td><button class="btn sm ghost as-del" data-i="${i}" aria-label="Remove ${esc(a.name||'asset')}">×</button></td></tr>`;
 const late=A.filter(a=>a.due&&(a.live||live)&&a.due>(a.live||live)).length;
 return `<div class="toolbar"><span class="note">The content this plan promotes. Upload a file (we fill the name and type for you) or add a row, then fill in the link, dates and Salesforce campaign ID the agency needs. Files up to ${fmtSize(ASSET_KEEP)} are kept with the project; for bigger ones, paste a link to where they live.</span>
  <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><label class="btn sm" for="as-file" tabindex="0" role="button">Upload content</label><input type="file" id="as-file" multiple hidden><button class="btn sm" id="as-add">Add a row</button>${late?`<span class="chip flag">${late} delivered after live date</span>`:A.length?`<span class="chip aw">${A.length} asset${A.length>1?'s':''}</span>`:''}</div></div>
 <div class="tscroll"><table class="as-table"><thead><tr><th>Content name</th><th>Description</th><th>Link</th><th>Content type</th><th>Delivery date</th><th>Live date</th><th>SFID</th><th>File</th><th></th></tr></thead><tbody>
 ${A.length?A.map(row).join(''):`<tr><td colspan="9" class="sub2" style="padding:18px">No assets yet. Upload your ebook, webinar or video, or add a row.</td></tr>`}</tbody></table></div>`}
function wireAssets(){const A=()=>S.assets=S.assets||[];
 $('#view').querySelectorAll('.as-in').forEach(el=>{const up=()=>{const a=A()[+el.dataset.i];if(!a)return;a[el.dataset.k]=el.value;save()};el.oninput=up;el.onchange=()=>{up();if(['due','live','link','ctype'].includes(el.dataset.k))renderOut()}});
 $('#view').querySelectorAll('.as-del').forEach(b=>b.onclick=()=>{const a=A()[+b.dataset.i];if(a&&(a.name||a.link||a.file)&&!confirm('Remove “'+(a.name||'this asset')+'”?'))return;A().splice(+b.dataset.i,1);save();renderOut()});
 const add=$('#as-add');if(add)add.onclick=()=>{A().push({name:'',desc:'',link:'',ctype:'eBook',due:'',live:S.start||'',sfid:''});save();renderOut()};
 const fi=$('#as-file');if(fi)fi.onchange=async e=>{for(const f of [...e.target.files]){const a={name:prettyName(f.name),desc:'',link:'',ctype:assetTypeFromFile(f),due:'',live:S.start||'',sfid:'',file:{name:f.name,size:f.size,type:f.type}};
   if(f.size<=ASSET_KEEP)a.file.data=await new Promise(r=>{const fr=new FileReader();fr.onload=()=>r(fr.result);fr.onerror=()=>r(null);fr.readAsDataURL(f)});A().push(a)}
  save();renderOut();setStatus('#x-status',e.target.files.length+' file'+(e.target.files.length>1?'s':'')+' added to Assets.');e.target.value=''}}
function assetsAOA(){return [['Content name','Description','Link','Content type','Delivery date','Live date','SFID','File'],...(S.assets||[]).map(a=>[a.name||'',a.desc||'',a.link||'',a.ctype||'',a.due||'',a.live||S.start||'',a.sfid||'',a.file?a.file.name:''])]}

/* ==================== TEST PLAN ==================== */
// Tests are generated from the plan's own lines. Sample per cell = 16·p(1−p)/(p·lift)² (95% confidence, 80% power).
const TEST_SHARE=[10,12,15],SQL_RATE=0.25;
const needN=(p,lift)=>Math.ceil(16*p*(1-p)/Math.pow(p*lift,2));
const UNITNAME={imp:'impressions',clk:'clicks',lpv:'visits',opens:'form opens',leads:'leads'};
const isSocial=a=>a.c.group==='Paid social';
const isVid=a=>a.p.buy==='CPV'||/vid|reel/i.test(JSON.stringify(a.p.units||''));
const shortName=s=>s.length>30?s.slice(0,30).replace(/\s+\S*$/,'').replace(/[\s+&,–-]+$/,'')+'…':s;
const guardOf=a=>a.p.buy==='CPL'?'SQL rate in CRM':a.p.buy+' ≤ '+rateFmt(rateOf(a.p)*(a.p.buy==='CPM'?1.1:1),a.p.buy);
const ctrK=a=>['CTR','imp',a.p.buy==='CPC'?funOf(a.c.id).ctrCpc:funOf(a.c.id).ctr];
// Test library: each template knows which lines can run it and how to fill in the row.
const TEST_LIB={
 msg:{name:'Message (claim vs proof)',fitsTxt:'CPM social, display',fits:a=>a.p.buy==='CPM',make:a=>({type:'Message',variable:'Headline lead',cells:['A product claim','B customer proof point'],
  hyp:'If we lead with a customer result instead of a product claim, CTR improves because buyers trust peer proof over promises.',kpi:ctrK(a),guard:guardOf(a),rule:'Winner gets 70% of this line’s spend next round; retest in 6 weeks.'})},
 pillar:{name:'Pillar (initiative A vs B)',fitsTxt:'Search, CPM lines · needs 2 initiatives',fits:(a,c)=>c.ini.length>1&&['CPC','CPM'].includes(a.p.buy),make:(a,c)=>{const x=shortName(c.ini[0].name),y=shortName(c.ini[1].name),cpc=a.p.buy==='CPC';
  return {type:'Pillar',variable:'Headline pillar',cells:['A '+x,'B '+y],hyp:cpc?`If search ads lead with “${x}” instead of “${y}”, more visitors sign up because it matches what they searched for.`:`If ads lead with “${x}” instead of “${y}”, CTR improves because that pillar matters more to this audience.`,
   kpi:cpc?['Sign-up CVR','lpv',funOf(a.c.id).cvr]:ctrK(a),proxy:cpc?ctrK(a):null,guard:guardOf(a),rule:cpc?'Winner leads every search ad next round.':'Winning pillar leads this line’s creative next round.'}}},
 angle:{name:'Headline angle (benefit vs feature)',fitsTxt:'Search, CPM lines',fits:a=>['CPC','CPM'].includes(a.p.buy),make:a=>{const cpc=a.p.buy==='CPC';return {type:'Message',variable:'Headline angle',cells:['A benefit-led','B feature-led'],
  hyp:'If ads lead with the outcome instead of the feature, more visitors sign up because it answers why before how.',kpi:cpc?['Sign-up CVR','lpv',funOf(a.c.id).cvr]:ctrK(a),proxy:cpc?ctrK(a):null,guard:guardOf(a),rule:'Winning angle leads this line’s ads next round.'}}},
 visual:{name:'Visual (product vs people)',fitsTxt:'Image lines bought on CPM',fits:a=>a.p.buy==='CPM'&&!isVid(a),make:a=>({type:'Creative',variable:'Visual',cells:['A product UI','B customer photo'],
  hyp:'If the image shows a real customer instead of the product UI, CTR improves because people stop for faces.',kpi:ctrK(a),guard:guardOf(a),rule:'Winning visual style carries into the next round’s masters.'})},
 hook:{name:'Video hook (first 5s)',fitsTxt:'Video lines',fits:isVid,make:a=>({type:'Creative',variable:'Opening hook (first 5s)',cells:['A product UI','B customer face','C headline stat'],
  hyp:'If the first 5 seconds show a customer face instead of the product UI, more people keep watching because faces hold attention.',kpi:['View rate','imp',funOf(a.c.id).viewRate],guard:guardOf(a),rule:'Winning hook opens every video cut next round.'})},
 lp:{name:'Landing page',fitsTxt:'Any line that drives clicks',fits:a=>['CPM','CPC','CPV'].includes(a.p.buy),make:a=>({type:'Landing page',variable:'Landing page',cells:['A product page','B cost-of-downtime calculator'],
  hyp:'If clicks land on an interactive calculator instead of the product page, more visitors sign up because they see their own numbers.',kpi:['Visit → sign-up rate','lpv',funOf(a.c.id).cvr],guard:guardOf(a),rule:'Winning page becomes the default destination for this line.'})},
 offer:{name:'Offer (demo vs report)',fitsTxt:'Lead gen lines',fits:a=>a.p.buy==='CPL',make:a=>({type:'Offer',variable:'Offer',cells:['A demo request','B gated report'],
  hyp:'If the form offers the report instead of a demo, more people complete it because a report asks for less commitment.',kpi:['Form completion','opens',funOf(a.c.id).leadForm],proxy:['CTR','imp',funOf(a.c.id).ctr],guard:'SQL rate in CRM',rule:'Winner becomes the default offer; keep the loser only where its SQL rate is higher.'})},
 audience:{name:'Audience (ABM list vs titles)',fitsTxt:'LinkedIn, Meta, ABM, social',fits:a=>a.p.buy==='CPM'&&(isSocial(a)||/abm|account/i.test(a.c.id+a.c.name+a.p.name)),make:a=>({type:'Audience',variable:'Targeting',cells:['A ABM account list','B job-title targeting'],
  hyp:'If we target the ABM account list instead of job titles, more clicks turn into landing page visits because every impression reaches a target account.',kpi:['Click → visit rate','imp',funOf(a.c.id).ctr*funOf(a.c.id).lpv],guard:'Target-account match ≥ 60%',rule:'Winner gets 70% of prospecting spend; retest in 6 weeks.'})},
 cta:{name:'CTA wording',fitsTxt:'Any line that drives clicks',fits:a=>['CPM','CPC','CPV'].includes(a.p.buy),make:a=>({type:'CTA',variable:'Call to action',cells:['A “Book a demo”','B “See it in action”'],
  hyp:'If the button says “See it in action” instead of “Book a demo”, more people click because it sounds like less of a commitment.',kpi:ctrK(a),guard:guardOf(a),rule:'Winning CTA becomes the default on this line.'})},
 bid:{name:'Bid strategy (manual vs auto)',fitsTxt:'Search, paid social',fits:a=>a.p.buy==='CPC'||(isSocial(a)&&a.p.buy==='CPM'),make:a=>({type:'Bid strategy',variable:'Bidding',cells:['A manual bids','B maximize conversions'],
  hyp:'If the platform bids for conversions instead of manual bids, more visitors sign up at the same spend because it finds the people likeliest to act.',kpi:['Sign-up CVR','lpv',funOf(a.c.id).cvr],proxy:ctrK(a),guard:guardOf(a),rule:'Winning strategy runs the line next round.'})},
 freq:{name:'Frequency cap',fitsTxt:'CPM lines',fits:a=>a.p.buy==='CPM',make:a=>({type:'Frequency',variable:'Frequency cap',cells:['A 2 per week','B 5 per week'],
  hyp:'If we cap at 2 ads per person per week instead of 5, CTR holds up because people don’t tune the ads out.',kpi:ctrK(a),guard:'Reach ≥ plan',rule:'Winning cap becomes the line’s default.'})}};
function testPlan(R,edits){
 const T=TIERS[R.tier],lift=(+S.testLift||20)/100,fw=flightWeeks(),rw=Math.max(2,+S.refresh[T]||8),W=Math.max(2,Math.min(rw-1,Math.floor(fw)));
 const t0=parseD(S.start),wk=6048e5,end=parseD(S.end);
 const byP={};R.lines.forEach(l=>{(byP[l.p.id]=byP[l.p.id]||{p:l.p,c:l.c,lines:[],budget:0}).lines.push(l);byP[l.p.id].budget+=l.budget});
 const P=Object.values(byP).sort((a,b)=>b.budget-a.budget);
 const used=new Set();
 const pick=f=>{const x=P.find(a=>!used.has(a.p.id)&&f(a))||P.find(f);if(x)used.add(x.p.id);return x};
 const ini=S.initiatives.filter(x=>x.name),ctx={ini,R};
 const mk=(id,a,round)=>a&&TEST_LIB[id]?{...TEST_LIB[id].make(a,ctx),a,round,tpl:id,key:id+':'+a.p.id}:null;
 let defs=[];const push=d=>{if(d)defs.push(d)};
 const msg=pick(a=>isSocial(a)&&a.p.buy==='CPM')||pick(a=>a.p.buy==='CPM');
 push(mk('msg',msg,0));
 push(mk(ini.length>1?'pillar':'angle',pick(a=>a.p.buy==='CPC'&&/search/i.test(a.c.group+a.c.name)),0));
 if(R.tier===0)push(mk('visual',pick(a=>TEST_LIB.visual.fits(a,ctx)),1));
 if(R.tier>=1){
  push(mk('hook',pick(a=>a.p.buy==='CPV'),1));
  push(mk('offer',pick(a=>a.p.buy==='CPL'),1));
  used.delete(msg&&msg.p.id);
  push(mk('audience',pick(a=>a.c.id==='linkedin'&&a.p.buy==='CPM')||pick(a=>isSocial(a)&&a.p.buy==='CPM'),2));
 }
 // the person's own changes from the builder: drop auto tests, add tests from the library
 const ed=edits||S.testEdits?.[T]||{},drop=ed.drop||[];
 defs=defs.filter(d=>!drop.includes(d.key));
 (ed.add||[]).forEach(x=>{const a=byP[x.pid],L=TEST_LIB[x.tpl];if(!a||!L||!L.fits(a,ctx)||defs.some(d=>d.key===x.tpl+':'+x.pid))return;
  const d=mk(x.tpl,a,Math.min(defs.filter(d=>d.a.p.id===x.pid).length,3));d.added=true;
  if(x.hyp)d.hyp=x.hyp;if(Array.isArray(x.cells)&&x.cells.length>1)d.cells=x.cells.slice(0,4).map((c,i)=>String.fromCharCode(65+i)+' '+String(c).replace(/^[A-D][\s.:)-]+/,''));if(x.variable)d.variable=x.variable;d.custom=!!(x.hyp||x.cells);defs.push(d)});
 // run each line-based test
 const tests=[],total=+S.budgets[T]||0,held=(S.testShare?.[T]??TEST_SHARE[R.tier])/100;
 const topOf=a=>{const mk={};a.lines.forEach(l=>mk[l.m.id]=(mk[l.m.id]||0)+l.budget);return Object.keys(mk).sort((x,y)=>mk[y]-mk[x])};
 const base=d=>sum(d.a.lines.filter(l=>l.m.id===topOf(d.a)[0]).map(l=>l.budget))*W/fw,bs=sum(defs.map(base)),k=bs?Math.max(1,held*total/bs):1;
 const deliver=(a,scope,weeks,unit)=>{const ls=a.lines.filter(l=>scope.includes(l.m.id)),cap=sum(ls.map(l=>l.budget))*0.5,raw=sum(ls.map(l=>l.budget))*weeks/fw,kk=raw?Math.min(k,Math.max(1,cap/raw)):1;
  let v=0;ls.forEach(l=>{const f=lineFun(l);if(f)v+=f[unit]*weeks/fw*kk});return {v,b:raw*kk}};
 defs.forEach(d=>{const a=d.a,n=d.cells.length,mk={};a.lines.forEach(l=>mk[l.m.id]=(mk[l.m.id]||0)+l.budget);
  const mids=Object.keys(mk).sort((x,y)=>mk[y]-mk[x]),top=[mids[0]],all=mids,maxW=Math.min(Math.floor(fw),2*rw-1);
  const need=k=>needN(k[2],lift),mkName=ids=>ids.length===all.length&&ids.length>1?'all '+ids.length+' markets':ids.map(id=>(S.markets.find(m=>m.id===id)||{}).name||id).join(', ');
  const tryIt=(k,scope,weeks)=>{const x=deliver(a,scope,weeks,k[1]);return {k,scope,weeks,have:x.v/n,b:x.b,need:need(k)}};
  let r=tryIt(d.kpi,top,W),status='ok',fix='';
  if(r.have<r.need){const opts=[];
   if(all.length>1)opts.push([tryIt(d.kpi,all,W),'Pool '+mkName(all)+' (same KPI, same run).']);
   const wk1=Math.ceil(W*r.need/Math.max(1,r.have));if(wk1<=maxW)opts.push([tryIt(d.kpi,top,wk1),`Run ${wk1} weeks instead of ${W}.`]);
   const pa=tryIt(d.kpi,all,W),wk2=Math.ceil(W*pa.need/Math.max(1,pa.have));if(all.length>1&&wk2<=maxW&&wk2>W)opts.push([tryIt(d.kpi,all,wk2),`Pool ${mkName(all)} and run ${wk2} weeks.`]);
   if(d.proxy){const px=tryIt(d.proxy,top,W);opts.push([px,`Use ${d.proxy[0]} as the primary KPI (needs ${compact(px.need)} ${UNITNAME[d.proxy[1]]} per cell, plan has ${compact(px.have)}); keep ${d.kpi[0]} as a directional read.`]);
    const pxa=tryIt(d.proxy,all,W);if(all.length>1)opts.push([pxa,`Use ${d.proxy[0]} as the primary KPI and pool ${mkName(all)}; keep ${d.kpi[0]} as a directional read.`])}
   const ok=opts.find(o=>o[0].have>=o[0].need);
   if(ok){status='fix';fix=ok[1]+(/primary KPI \(/.test(ok[1])?'':` That gives ${compact(ok[0].have)} ${UNITNAME[ok[0].k[1]]} per cell against ${compact(ok[0].need)} needed.`);r={...ok[0],orig:r}}else{status='no';fix=`Even pooled for ${maxW} weeks${d.proxy?' or on '+d.proxy[0]:''}, this can’t reach 95%. Run it as a directional read with a confidence range, or raise the budget on this line.`}}
  const orig=r.orig||r;
  tests.push({...d,ch:a.c.name,placement:a.p.name,lineIds:a.lines.filter(l=>r.scope.includes(l.m.id)).map(l=>l.id),scopeName:mkName(r.scope),
   kpiName:orig.k[0],kpiFinal:r.k[0]!==orig.k[0]?r.k[0]:null,status,fix,need:orig.need,have:orig.have,unit:UNITNAME[orig.k[1]],run:r.weeks,budget:r.b,cellBudget:r.b/n,
   haveFinal:r.have,needFinal:r.need,unitFinal:UNITNAME[r.k[1]]})});
 // pillar → pipeline (directional read across the program)
 if(R.tier>=1&&ini.length>1&&!drop.includes('pipe')){const leads=funnel(R).leads,per=leads/ini.length,nd=needN(SQL_RATE,lift);
  tests.push({key:'pipe',type:'Pillar → pipeline',ch:'All channels',placement:'Leads tagged by pillar',lineIds:[],scopeName:'all markets',variable:'Message pillar',cells:ini.map((x,i)=>String.fromCharCode(65+i)+' '+shortName(x.name)),
   hyp:'If a pillar wins on clicks, it also wins on pipeline, because the same message carries through to sales.',kpiName:'SQL rate per lead',guard:'Lead volume per pillar',
   rule:'Shift 10 to 15% of budget toward the pillar with the most pipeline.',round:'final',need:nd,have:per,unit:'leads per pillar',run:null,budget:0,cellBudget:0,
   status:per>=nd?'ok':'no',fix:per>=nd?'':`About ${compact(per)} leads per pillar against ${compact(nd)} needed. Report it as directional with a confidence range${R.tier<2?', or move to High, which adds a lift study':''}.`})}
 // incrementality (High)
 if(R.tier===2&&!drop.includes('lift')){const li=P.filter(a=>a.c.id==='linkedin'),geo=!li.length,ls=(li.length?li:P).flatMap(a=>a.lines),wks=Math.min(Math.floor(fw),2*rw);
  const conv=sum(ls.map(l=>(lineFun(l)||{}).leads||0))*wks/fw,visits=sum(ls.map(l=>(lineFun(l)||{}).lpv||0))*wks/fw,hold=geo?0.2:0.1;
  const nd=Math.ceil(7.84*(1/(1-hold)+1/hold)/Math.pow(Math.log(1+lift),2)),okL=conv>=nd,okV=visits>=nd;
  tests.push({key:'lift',type:'Incrementality',ch:geo?'All channels':'LinkedIn',placement:geo?'Geo holdout':'Conversion Lift study',lineIds:ls.map(l=>l.id),scopeName:'all markets',variable:'Exposure',cells:geo?['A exposed markets','B holdout markets']:['A exposed','B '+(hold*100)+'% holdout'],
   hyp:`If ${geo?'paid media':'LinkedIn'} is incremental, exposed ${geo?'markets':'accounts'} convert more than the holdout, so the spend creates leads rather than catching ones that would come anyway.`,
   kpiName:'Lead lift vs holdout',guard:'Holdout stays dark',rule:'Sets next year’s budget for the channel: cut it if lift is under 10%.',round:2,need:nd,have:conv,unit:'leads (total)',run:wks,budget:0,cellBudget:0,
   status:okL?'ok':okV?'fix':'no',kpiFinal:okL?null:'Landing page visit lift',fix:okL?'':okV?`Not enough leads for a lead-level read (${compact(conv)} of ${compact(nd)}). Measure lift on landing page visits instead (${compact(visits)} in the window).`:'Too small to read even on visits. Run it as a directional geo comparison.'})}
 // dates and ids
 const roundStart=k=>new Date(+t0+k*rw*wk);
 tests.forEach((t,i)=>{t.id='T'+String(i+1).padStart(2,'0');
  if(t.round==='final'){t.readout=new Date(+end-21*864e5);t.start=t0;t.runTxt='Whole flight'}
  else{let k=Math.min(t.round,Math.max(0,R.rounds-1));let s=roundStart(k);if(s>=end){k=0;s=t0}t.start=s;
   const r=new Date(+s+(t.run||W)*wk);t.readout=r>end?end:r;t.runTxt=(t.run||W)+' weeks'}
  t.readoutISO=isoD(t.readout);t.month=t.readoutISO.slice(0,7)});
 const budget=sum(tests.map(t=>t.budget));
 return {tests,lift,W,rw,budget,share:total?budget/total:0,target:held,total,cellsN:sum(tests.filter(t=>t.budget).map(t=>t.cells.length)),
  agenda:testAgenda(tests),places:P,ctx,edits:ed};
}
function testAgenda(tests){const q=d=>'Q'+(Math.floor(d.getUTCMonth()/3)+1)+' '+d.getUTCFullYear();
 const G=[[['Pillar','Message'],t=>t.type==='Pillar'?'Which message pillar earns attention?':'Which message earns attention?'],[['Creative'],()=>'Which creative style holds attention?'],[['Offer'],()=>'Does a demo or a gated report turn attention into leads?'],
  [['Audience'],()=>'Do target-account lists beat job-title targeting?'],[['Landing page','CTA'],()=>'Which page and call to action turn clicks into sign-ups?'],[['Bid strategy','Frequency'],()=>'Which delivery settings get the most from each dollar?'],[['Pillar → pipeline'],()=>'Which pillar drives pipeline, not just clicks?'],[['Incrementality'],()=>'Is paid media incremental, or would those leads come anyway?']];
 let out=[];G.forEach(([types,ask])=>{const ts=tests.filter(t=>types.includes(t.type));if(!ts.length)return;const last=ts.reduce((a,b)=>b.readout>a.readout?b:a);
  out.push({k:types[0],when:q(last.readout),at:+last.readout,q:ask(ts.find(t=>t.type==='Pillar')||ts[0]),ids:ts.map(t=>t.id)})});
 const mergeQ=(a,b,q)=>{const i=out.findIndex(x=>x.k===a),j=out.findIndex(x=>x.k===b);if(i<0||j<0)return;out[i].ids.push(...out[j].ids);out[i].at=Math.max(out[i].at,out[j].at);out[i].when=out[out[i].at===out[j].at?j:i].when;if(q)out[i].q=q;out.splice(j,1)};
 if(out.length>4)mergeQ('Pillar','Creative');if(out.length>4)mergeQ('Offer','Audience','Which offer and which audience turn attention into leads?');
 return out.sort((a,b)=>a.at-b.at)}
function testOfLine(TP,id){return TP.tests.find(t=>t.lineIds&&t.lineIds.includes(id)&&t.type!=='Incrementality')}

/* ==================== INPUT RENDERING ==================== */
function bindSimple(){
 const map=[['#in-name','name'],['#in-product','product'],['#in-brief','brief'],['#in-start','start'],['#in-end','end']];
 map.forEach(([sel,k])=>{const el=$(sel);el.value=S[k]||'';el.oninput=()=>{S[k]=el.value;if(k==='name')renderCopyInputs();changed()}});
 TIERS.forEach(t=>{[['#b-','budgets'],['#c-','concepts'],['#r-','refresh']].forEach(([p,k])=>{const el=$(p+t);el.value=S[k][t];el.oninput=()=>{S[k][t]=+el.value;changed()}})});
}
function renderCopyInputs(){
 const C=S.copy;const banks=S.initiatives.length?S.initiatives:[{name:'All lines',general:true}];while(C.ini.length<banks.length)C.ini.push({h:'',b:''});
 $('#cp-voice').value=C.voice||'';$('#cp-voice').oninput=e=>{C.voice=e.target.value;changed()};
 $('#cp-eye').value=C.eyebrow||'';$('#cp-eye').oninput=e=>{C.eyebrow=e.target.value;changed()};
 $('#cp-cta').value=C.ctas||'';$('#cp-cta').oninput=e=>{C.ctas=e.target.value;changed()};
 $('#cp-proof').value=C.proof||'';$('#cp-proof').oninput=e=>{C.proof=e.target.value;changed()};
 const stale=C.src&&C.src!==S.name,empty=!C.ini.some(q=>q&&(q.h||q.b));
 $('#cp-src').innerHTML=empty?'No copy yet for this brief. Press “Draft copy with Claude” or write it below.':stale?`<span class="chip flag">Out of date</span> This copy was written for “${esc(C.src)}”. Redraft it for the current brief.`:`Copy written for “${esc(C.src||S.name)}”.`;
 $('#cp-ini').innerHTML=banks.map((x,i)=>`<div class="li ini" style="grid-template-columns:1fr"><div class="eyebrow">${x.general?'Copy for all lines':'Initiative '+(i+1)}</div><div class="note" style="margin-top:-4px">${x.general?'No initiatives yet. Fill them from the doc or add them in section 5 to write copy per initiative.':esc(x.name||'Untitled')}</div>
  <label class="f">Headlines<textarea id="cp-h-${i}" rows="3">${esc(C.ini[i].h)}</textarea></label>
  <label class="f">Body copy<textarea id="cp-b-${i}" rows="3">${esc(C.ini[i].b)}</textarea></label></div>`).join('');
 banks.forEach((x,i)=>{$('#cp-h-'+i).oninput=e=>{C.ini[i].h=e.target.value;changed()};$('#cp-b-'+i).oninput=e=>{C.ini[i].b=e.target.value;changed()}});
}
function renderInputs(){
 bindSimple();renderCopyInputs();
 const plU={};CH.forEach(c=>c.pl.forEach(p=>{const us=typeof p.units==='function'?[...new Set(S.markets.flatMap(m=>p.units(m)))]:p.units;us.forEach(u=>(plU[u]=plU[u]||new Set()).add(c.name+' · '+p.name))}));
 const grpsOf=us=>{const by={};us.forEach(u=>(by[specSig(u)]=by[specSig(u)]||[]).push(u));return Object.values(by)};
 UI.ug=UI.ug||{};
 $('#fmt-list').innerHTML=UNIT_GROUPS.map(([g,us],gi)=>{const G=grpsOf(us),on=G.filter(grp=>grp.every(u=>variantsOf(u).length)).length;
  return `<details class="ugrp" data-g="${gi}" ${UI.ug[gi]?'open':''}><summary><span>${esc(g)}</span><span class="note">${on} of ${G.length} unit${G.length>1?'s':''} on</span></summary><div class="ugbody">`+G.map(grp=>{const U=UNITS[grp[0]],id=grp.join('+'),pls=[...new Set(grp.flatMap(u=>[...(plU[u]||[])]))],n=pls.length,nv=U.variants.length,uon=grp.every(unitOn),von=uon?U.variants.filter(v=>sizeOn(grp[0],v)).length:0;
   return `<div class="li per unit"><input type="checkbox" id="un-${id}" ${uon?'checked':''} data-partial="${uon&&nv>1&&von<nv?1:''}" title="${nv>1?'Select the whole package (all sizes)':''}" aria-label="Include ${esc(grp.map(u=>UNITS[u].name).join(', '))}"><div style="display:flex;flex-direction:column;min-width:0;gap:2px">
    <label for="un-${id}"><strong style="font-weight:600">${grp.map(u=>esc(UNITS[u].name)).join(' + ')}</strong></label>
    <span class="note">${nv>1?`${von} of ${nv} sizes · `:''}${n?`<span title="${esc(pls.join('; '))}">used in ${n} media placement${n>1?'s':''}</span>`:'not bought in any version'}</span>
    ${U.covers?`<span class="note">Runs on: ${esc(U.covers)}</span>`:''}
    ${nv>1?`<div class="sizes">${U.variants.map((v,vi)=>`<label class="sz"><input type="checkbox" id="sz-${id}-${vi}" ${uon&&sizeOn(grp[0],v)?'checked':''}>${esc(v)}</label>`).join('')}</div>`:`<span class="note spec">${esc(U.variants[0])}</span>`}
    <span class="note spec">${[U.files,U.max!=='—'&&U.max?'max '+U.max:'',U.length!=='—'?U.length:''].filter(x=>x&&x!=='—').map(esc).join(' · ')}</span></div></div>`}).join('')+'</div></details>'}).join('');
 $$('#fmt-list details.ugrp').forEach(d=>d.ontoggle=()=>{UI.ug[d.dataset.g]=d.open;save()});
 UNIT_GROUPS.forEach(([,us])=>grpsOf(us).forEach(grp=>{const id=grp.join('+');
  // the unit box picks the whole package (every size); size chips pick sizes one by one
  const ub=document.getElementById('un-'+id),V=UNITS[grp[0]].variants;if(ub.dataset.partial)ub.indeterminate=true;
  const allSizes=on=>{S.vOff=S.vOff||{};grp.forEach(u=>V.forEach(v=>{if(on)delete S.vOff[u+'|'+v];else S.vOff[u+'|'+v]=true}))};
  ub.onchange=()=>{S.units=S.units||{};const on=ub.dataset.partial?true:ub.checked;grp.forEach(u=>S.units[u]=on);if(on)allSizes(true);renderInputs();changed()};
  V.forEach((v,vi)=>{const el=document.getElementById(`sz-${id}-${vi}`);if(el)el.onchange=e=>{S.vOff=S.vOff||{};S.units=S.units||{};
   if(e.target.checked&&!grp.every(unitOn)){grp.forEach(u=>S.units[u]=true);allSizes(false)}
   grp.forEach(u=>{if(e.target.checked)delete S.vOff[u+'|'+v];else S.vOff[u+'|'+v]=true});
   if(!V.some(x=>sizeOn(grp[0],x))){grp.forEach(u=>S.units[u]=false);allSizes(true)}
   renderInputs();changed()}})}));
 $('#un-all').onclick=()=>{S.units={};S.vOff={};renderInputs();changed()};$('#un-none').onclick=()=>{S.units=Object.fromEntries(Object.keys(UNITS).map(u=>[u,false]));renderInputs();changed()};
 $('#un-open').onclick=()=>{const open=![...$$('#fmt-list details.ugrp')].every(d=>d.open);UNIT_GROUPS.forEach((_,i)=>UI.ug[i]=open);save();renderInputs()};
 const vl=$('#in-vlen');vl.value=S.formats._video.lengths;vl.oninput=()=>{S.formats._video.lengths=vl.value;changed()};
 // markets
 $('#mkt-list').innerHTML=`<div class="li mkt note"><span></span><span>Market</span><span>%</span><span class="bud-h">Budget $</span><span>Lang</span><span></span></div>`+S.markets.map((m,i)=>`
  <div class="li mkt"><input type="checkbox" id="mk-on-${i}" ${m.on?'checked':''} aria-label="Include ${esc(m.name)}">
  <input type="text" id="mk-n-${i}" value="${esc(m.name)}" aria-label="Market name">
  <input type="number" id="mk-w-${i}" value="${m.weight}" min="0" max="100" step="any" aria-label="Weight %">
  <input type="number" id="mk-b-${i}" min="0" step="1000" aria-label="Market budget" ${m.on?'':'disabled'}>
  <input type="text" id="mk-l-${i}" value="${esc(m.lang)}" aria-label="Language" maxlength="5">
  <button class="x" data-i="${i}" aria-label="Remove market">×</button></div>`).join('')+`<div class="li mkt sumrow"><span></span><span>Total</span><span class="n" id="mk-tot-w"></span><span class="n" id="mk-tot-b"></span><span></span><span></span></div>`;
 S.markets.forEach((m,i)=>{$(`#mk-on-${i}`).onchange=e=>{m.on=e.target.checked;$(`#mk-b-${i}`).disabled=!m.on;
  // a market checked at 0% gets an equal share so it isn't silently left out
  if(m.on&&!(+m.weight>0)){const o=S.markets.filter(q=>q!==m&&q.on&&+q.weight>0),os=sum(o.map(q=>+q.weight));m.weight=+(100/(o.length+1)).toFixed(1);o.forEach(q=>q.weight=+(q.weight/os*(100-m.weight)).toFixed(1))}
  changed()};$(`#mk-n-${i}`).oninput=e=>{m.name=e.target.value;changed()};$(`#mk-w-${i}`).oninput=e=>{m.weight=+e.target.value;changed()};
  $(`#mk-b-${i}`).onchange=e=>{setMarketBudget(i,+e.target.value);changed()};$(`#mk-l-${i}`).oninput=e=>{m.lang=e.target.value.toUpperCase();changed()}});
 $('#mkt-list').querySelectorAll('.x').forEach(b=>b.onclick=()=>{S.markets.splice(+b.dataset.i,1);renderInputs();changed()});
 // personas
 $('#per-list').innerHTML=Object.entries(S.personas).map(([k,p])=>`<div class="li per${p.custom?' cust':''}"><input type="checkbox" id="pe-on-${k}" ${p.on?'checked':''} aria-label="Include audience"><input type="text" id="pe-l-${k}" value="${esc(p.label)}" aria-label="Audience" placeholder="${esc(PERSONA_HINT[k]||'Audience')}">${p.custom?`<button class="x" data-k="${k}" aria-label="Remove audience">×</button>`:''}</div>`).join('')
  +`<div class="li per cust"><span class="sub2" style="width:16px;text-align:center">+</span><input type="text" id="pe-new" placeholder="Add an audience (e.g. Agency partners, Finance leads)" aria-label="New audience"><span></span></div>`;
 Object.entries(S.personas).forEach(([k,p])=>{$(`#pe-on-${k}`).onchange=e=>{p.on=e.target.checked;changed()};$(`#pe-l-${k}`).oninput=e=>{p.label=e.target.value;changed()}});
 $('#per-list').querySelectorAll('.x').forEach(b=>b.onclick=()=>{delete S.personas[b.dataset.k];renderInputs();changed()});
 const pn=$('#pe-new');pn.onchange=()=>{const v=pn.value.trim();pn.value='';if(!v)return;S.personas['c'+Date.now()]={label:v,on:true,custom:true};renderInputs();changed();setTimeout(()=>$('#pe-new')?.focus(),0)};
 pn.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();pn.onchange()}};
 // initiatives
 $('#ini-list').innerHTML=(S.initiatives.length?'':'<div class="note">No initiatives yet. Uploading the GTM doc pulls them in, or add your own.</div>')+S.initiatives.map((x,i)=>`<div class="li ini"><input type="text" id="in-n-${i}" value="${esc(x.name)}" aria-label="Initiative name" placeholder="Initiative name">
  <select id="in-s-${i}" aria-label="Funnel stage">${Object.keys(STAGE).map(s=>`<option ${s===x.stage?'selected':''}>${s}</option>`).join('')}</select>
  <input class="full" type="text" id="in-p-${i}" value="${esc(x.pillar)}" aria-label="Message pillar" placeholder="Message pillar">
  <div class="full btns" style="justify-content:space-between"><span class="note">Initiative ${i+1} · ${esc(x.stage)} placements</span><button class="x" data-i="${i}" aria-label="Remove initiative">×</button></div></div>`).join('');
 S.initiatives.forEach((x,i)=>{$(`#in-n-${i}`).oninput=e=>{x.name=e.target.value;renderCopyInputs();changed()};$(`#in-s-${i}`).onchange=e=>{x.stage=e.target.value;renderInputs();changed()};$(`#in-p-${i}`).oninput=e=>{x.pillar=e.target.value;changed()}});
 $('#ini-list').querySelectorAll('.x').forEach(b=>b.onclick=()=>{S.initiatives.splice(+b.dataset.i,1);S.copy.ini.splice(+b.dataset.i,1);renderInputs();changed()});
 // moments
 $('#mom-list').innerHTML=S.moments.map((x,i)=>`<div class="li mom"><input class="full" type="text" id="mo-n-${i}" value="${esc(x.name)}" aria-label="Moment name" placeholder="Milestone, launch or event">
  <select id="mo-t-${i}" aria-label="Type">${['launch','content','event'].map(t=>`<option value="${t}" ${t===x.type?'selected':''}>${t[0].toUpperCase()+t.slice(1)}</option>`).join('')}</select>
  <input type="month" id="mo-m-${i}" value="${esc(x.month)}" aria-label="Month">
  <div class="full btns" style="justify-content:flex-end"><button class="x" data-i="${i}" aria-label="Remove moment">×</button></div></div>`).join('');
 $('#mom-empty').textContent=S.moments.length?'':'No launch moments yet. Add the milestones from your GTM here, or they fill in from the doc when it names dates.';
 S.moments.forEach((x,i)=>{$(`#mo-n-${i}`).oninput=e=>{x.name=e.target.value;changed()};$(`#mo-t-${i}`).onchange=e=>{x.type=e.target.value;changed()};$(`#mo-m-${i}`).onchange=e=>{x.month=e.target.value;changed()}});
 $('#mom-list').querySelectorAll('.x').forEach(b=>b.onclick=()=>{S.moments.splice(+b.dataset.i,1);renderInputs();changed()});
 // channels
 let html=`<div class="li ch note"><span></span><span>Channel</span>${TIERNAME.map(n=>`<span class="n">${n} $</span>`).join('')}</div>`,g='';const GO=[...new Set(CH.map(c=>c.group))];CH.slice().sort((x,y)=>GO.indexOf(x.group)-GO.indexOf(y.group)).forEach(c=>{if(c.group!==g){g=c.group;html+=`<div class="chgroup">${esc(g)}</div>`}
  const st=S.channels[c.id]=S.channels[c.id]||{on:true,weight:c.weight}
  html+=`<div class="li ch"><input type="checkbox" id="ch-on-${c.id}" ${st.on?'checked':''} aria-label="Include ${esc(c.name)}"><label for="ch-on-${c.id}" style="display:flex;gap:6px;align-items:center;min-width:0"><span>${esc(c.name)}</span></label>${[0,1,2].map(t=>`<input type="number" id="ch-b-${c.id}-${t}" min="0" step="1000" aria-label="${esc(c.name)} ${TIERNAME[t]} budget">`).join('')}</div>`});
 $('#ch-list').innerHTML=html+`<div class="li ch sumrow"><span></span><span>Total</span>${[0,1,2].map(t=>`<span class="n" id="ch-tot-b-${t}"></span>`).join('')}</div><div class="li ch chk"><span></span><span>Budget (section 1)</span>${[0,1,2].map(t=>`<span class="n" id="ch-bud-${t}"></span>`).join('')}</div><div class="li ch chk"><span></span><span>Difference</span>${[0,1,2].map(t=>`<span class="n" id="ch-diff-${t}"></span>`).join('')}</div>`;
 CH.forEach(c=>{$(`#ch-on-${c.id}`).onchange=e=>{S.channels[c.id].on=e.target.checked;solveAllPins();changed()};
  [0,1,2].forEach(t=>{$(`#ch-b-${c.id}-${t}`).onchange=e=>{setChannelBudget(c.id,e.target.value===''?null:+e.target.value,t);changed()}})});
 syncBudgetFields();
}
/* budget fields: show $ for the version picked on the right; typing $ rewrites the weights */
const bTier=()=>UI.tier===3?1:UI.tier;
function syncBudgetFields(R){
 const t=bTier();R=R&&R.tier===t?R:compute(t);const total=+S.budgets[TIERS[t]]||0;
 $$('.bud-h').forEach(el=>el.textContent=TIERNAME[t]+' $');
 const on=S.markets.filter(m=>m.on&&+m.weight>0),ws=sum(on.map(m=>+m.weight));
 S.markets.forEach((m,i)=>{const el=$('#mk-b-'+i);if(!el||el===document.activeElement)return;el.value=m.on&&ws?Math.round(total*(+m.weight||0)/ws):'';
  const w=$('#mk-w-'+i);if(w&&w!==document.activeElement)w.value=+(+m.weight).toFixed(1)});
 const mt=$('#mkt-tot');if(mt){mt.innerHTML=`<span>${on.length} markets on${Math.abs(ws-100)>0.5?' · weights don\'t add to 100%, so they\'re treated as shares':''}</span><span>Should match ${money(total)}</span>`}
 const mb=sum(S.markets.map(m=>m.on&&ws?Math.round(total*(+m.weight||0)/ws):0)),mw=$('#mk-tot-w'),mbe=$('#mk-tot-b');
 if(mw){mw.textContent=(+ws.toFixed(1))+'%';mw.className='n'+(Math.abs(ws-100)>0.5?' bad':'');mw.title=Math.abs(ws-100)>0.5?'Weights don\'t add to 100%, so they are treated as shares':''}
 if(mbe){mbe.textContent=money(mb);mbe.className='n'+(Math.abs(mb-total)>on.length?' bad':'');mbe.title='Should equal the '+TIERNAME[t]+' budget: '+money(total)}
 const Rs=[0,1,2].map(i=>R&&R.tier===i?R:compute(i)),tots=[0,1,2].map(i=>+S.budgets[TIERS[i]]||0),cbs=Rs.map(Ri=>{const o={};Ri.lines.forEach(l=>o[l.c.id]=(o[l.c.id]||0)+l.budget);return o});
 CH.forEach(c=>[0,1,2].forEach(i=>{const el=$(`#ch-b-${c.id}-${i}`);if(!el)return;const v=cbs[i][c.id],pin=pinOf(c.id,i);el.disabled=false;el.classList.toggle('pinned',pin!=null&&S.channels[c.id].on);
  el.placeholder='0';el.title=pin!=null?'You set this. Clear it to let it share the rest.':!S.channels[c.id].on?'Type a budget to turn this channel on':v?'Shares what’s left after the channels you typed':'Not in this version’s markets yet';if(el!==document.activeElement)el.value=v?Math.round(v):''}));
 [0,1,2].forEach(i=>{const cs=sum(Object.values(cbs[i])),d=cs-tots[i],bE=$('#ch-bud-'+i),dE=$('#ch-diff-'+i);if(bE)bE.textContent=compact(tots[i]).replace(/^/,'$');
  if(dE){const ok=Math.abs(d)<=1;dE.textContent=ok?'✓ matches':(d>0?'+':'−')+compact(Math.abs(d)).replace(/^/,'$');dE.className='n '+(ok?'good':'bad');dE.title=ok?'Channels add up to the '+TIERNAME[i]+' budget':money(Math.abs(d))+(d<0?' not placed':' over')+' the '+TIERNAME[i]+' budget'}});
 [0,1,2].forEach(i=>{const e=$('#ch-tot-b-'+i);if(!e)return;const cs=sum(Object.values(cbs[i]));e.textContent=compact(cs).replace(/^/,'$');e.className='n'+(Math.abs(cs-tots[i])>1?' bad':'');e.title=money(cs)+' · should equal the '+TIERNAME[i]+' budget: '+money(tots[i])});
 const empty=S.markets.filter(m=>m.on&&+m.weight>0&&!Rs.some(Ri=>Ri.lines.some(l=>l.m.id===m.id)));
 const ct=$('#ch-tot');if(ct)ct.innerHTML=`<span>Each column should match its version: ${tots.map((v,i)=>TIERNAME[i]+' '+money(v)).join(' · ')}</span>`+(empty.length?`<span style="display:block;margin-top:4px;color:var(--flag)">${empty.map(m=>m.name).join(', ')} ${empty.length>1?'have':'has'} no checked channel that runs there, so ${empty.length>1?'their':'its'} share goes to the other markets. Check a channel that runs there, or turn the market off in section 3.</span>`:'');
}
function setMarketBudget(i,x){
 const t=bTier(),total=+S.budgets[TIERS[t]]||0,m=S.markets[i];if(!total||!m.on)return;
 const share=Math.max(0,Math.min(1,x/total)),others=S.markets.filter((q,j)=>j!==i&&q.on&&+q.weight>0),os=sum(others.map(q=>+q.weight));
 m.weight=+(share*100).toFixed(2);
 if(others.length&&os>0)others.forEach(q=>q.weight=+(q.weight/os*(100-share*100)).toFixed(2));
 setStatus('#ch-status','');
}
// Channel $ typed in section 7 are pinned per version. Pinned channels hold their dollars; the rest share what's left.
const plPinOf=(pid,t)=>{const v=S.plPin?.[TIERS[t]]?.[pid];return v==null||v===''?null:+v};
const pinOf=(id,t)=>{const v=S.channels[id]?.pin?.[TIERS[t]];return v==null||v===''?null:+v};
const chByCh=R=>{const o={};R.lines.forEach(l=>o[l.c.id]=(o[l.c.id]||0)+l.budget);return o};
function solveAllPins(){}
// Plain-language reason a checked channel gets no budget in a version
function chanWhy(c,t){const on=S.markets.filter(m=>m.on&&+m.weight>0),zero=S.markets.filter(m=>m.on&&!(+m.weight>0)),nm=ms=>ms.map(m=>m.name).join(', ');
 const z=zero.length?` ${nm(zero)} ${zero.length>1?'are':'is'} checked but at 0%, so ${zero.length>1?'they get':'it gets'} no budget; give ${zero.length>1?'them':'it'} a share in section 3.`:'';
 if(!on.length)return `No market has a budget share yet, so nothing is placed.${z||' Turn on a market and give it a share in section 3.'}`;
 const fit=on.filter(m=>eligible(c,m));
 if(!fit.length){const k=c.markets||{},where=k.only?'only runs in '+k.only.map(id=>(S.markets.find(m=>m.id===id)||{}).name||id).join(' and '):k.exclude?'runs everywhere except '+k.exclude.map(id=>(S.markets.find(m=>m.id===id)||{}).name||id).join(', '):'';
  return `${c.name} ${where}, and the only market${on.length>1?'s':''} with budget ${on.length>1?'are':'is'} ${nm(on)}, so its ${TIERNAME[t]} amount isn’t placed.${z}`}
 return `${c.name} has no creative units switched on for ${nm(fit)}, so its ${TIERNAME[t]} amount isn’t placed. Turn its units back on in section 9.`}
function pinNote(t){const tot=+S.budgets[TIERS[t]]||0,ids=Object.keys(S.channels).filter(k=>S.channels[k].on&&pinOf(k,t)!=null);if(!ids.length)return '';
 const ps=sum(ids.map(k=>pinOf(k,t))),cur=chByCh(compute(t)),none=ids.filter(k=>!cur[k]);
 if(none.length)return none.map(k=>chanWhy(CHMAP[k],t)).join(' ');
 if(ps>tot+1)return `The channels you typed add to ${money(ps)} in ${TIERNAME[t]}, more than its ${money(tot)} budget, so they were scaled down to fit. Raise the ${TIERNAME[t]} budget in section 1 or lower a channel.`;
 return ''}
function setChannelBudget(id,x,t){
 if(t==null)t=bTier();const c=S.channels[id];c.pin=c.pin||{};
 if(x==null||isNaN(x))delete c.pin[TIERS[t]];else{c.pin[TIERS[t]]=Math.max(0,x);if(!c.on){c.on=true;const cb=$('#ch-on-'+id);if(cb)cb.checked=true}}
 const n=[0,1,2].map(pinNote).filter(Boolean);setStatus('#ch-status',n.join(' '),n.length>0);
}
function autoChannels(){Object.values(S.channels).forEach(c=>{delete c.tw;delete c.pin})}

$('#ch-auto').onclick=()=>{autoChannels();setStatus('#ch-status','Channel budgets refilled from each version\'s total.');renderInputs();changed()};
$('#add-mkt').onclick=()=>{S.markets.push({id:'M'+Date.now(),name:'New market',lang:'EN',on:true,weight:5});renderInputs();changed()};
$('#add-ini').onclick=()=>{S.initiatives.push({name:'',stage:'Consideration',pillar:''});renderInputs();changed();setTimeout(()=>$('#in-n-'+(S.initiatives.length-1))?.focus(),0)};
$('#add-mom').onclick=()=>{S.moments.push({name:'',month:S.start.slice(0,7),type:'launch',ini:0});renderInputs();changed();setTimeout(()=>$('#mo-n-'+(S.moments.length-1))?.focus(),0)};
$('#btn-blank').onclick=()=>{if(!confirm('Clear every input and start a blank plan? This replaces the plan saved in this browser.'))return;S=blankState();PDF=null;renderInputs();changed();setStatus('#extract-status','Blank plan ready. Paste or upload a GTM doc, then press “Fill inputs from doc”.');$('#exampleBadge').hidden=true};
$('#btn-reset').onclick=()=>{S=exampleState();renderInputs();changed();setStatus('#extract-status','Example reloaded.');$('#exampleBadge').hidden=false};

/* ==================== OUTPUT RENDERING ==================== */
let T_=null;function changed(){save();clearTimeout(T_);T_=setTimeout(()=>{renderOut()},120)}
const TABS=[['summary','Paid Media Summary'],['growth','Growth Plan'],['bom','BOM'],['spec','Spec Sheet for Creative Studio'],['assets','Assets'],['flight','Flighting & Projected Outcomes'],['assump','Buy Details'],['tests','Test Plan'],['tagging','Spec Sheet & Tagging for Agency']];
function renderSeg(){
 $('#ver-seg').innerHTML=TIERNAME.map((n,i)=>`<button aria-pressed="${UI.tier===i}" data-t="${i}">${n}<span class="amt">${compact(+S.budgets[TIERS[i]]||0).replace(/^/,'$')}</span></button>`).join('')+`<button aria-pressed="${UI.tier===3}" data-t="3">Compare<span class="amt">all three</span></button>`;
 $('#ver-seg').querySelectorAll('button').forEach(b=>b.onclick=()=>{UI.tier=+b.dataset.t;save();renderOut()});
 const ord=UI.tabOrder||[],tabs=TABS.slice().sort((a,b)=>{const i=ord.indexOf(a[0]),j=ord.indexOf(b[0]);return (i<0?99:i)-(j<0?99:j)});
 $('#tabs').innerHTML=UI.tier===3?'':tabs.map(([k,n])=>`<button role="tab" aria-selected="${UI.tab===k}" data-k="${k}" draggable="true" title="Drag to reorder">${n}</button>`).join('');
 let dragK=null;$('#tabs').querySelectorAll('button').forEach(b=>{
  b.ondragstart=e=>{dragK=b.dataset.k;b.classList.add('drag');e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',dragK)};
  b.ondragend=()=>{b.classList.remove('drag');$('#tabs').querySelectorAll('.over').forEach(x=>x.classList.remove('over'))};
  b.ondragover=e=>{e.preventDefault();b.classList.add('over')};b.ondragleave=()=>b.classList.remove('over');
  b.ondrop=e=>{e.preventDefault();const from=dragK||e.dataTransfer.getData('text/plain'),to=b.dataset.k;if(!from||from===to)return;
   const ks=tabs.map(t=>t[0]).filter(k=>k!==from);ks.splice(ks.indexOf(to),0,from);UI.tabOrder=ks;save();renderOut()}});
 $('#tabs').hidden=UI.tier===3;
 $('#tabs').querySelectorAll('button').forEach(b=>b.onclick=()=>{if(UI.tab===b.dataset.k||b.isContentEditable)return;UI.tab=b.dataset.k;save();renderOut()});
}
function barList(title,entries,total){
 const max=Math.max(1,...entries.map(e=>e[1]));
 return `<div class="bars"><h3>${esc(title)}</h3>${entries.map(([k,v])=>`<div class="brow" title="${esc(k)}: ${money(v)} (${(v/total*100).toFixed(1)}%)"><span class="lab">${esc(k)}</span><span class="track"><span class="fill" style="width:${(v/max*100).toFixed(1)}%;display:block"></span></span><span class="val">${(v/total*100).toFixed(0)}% · ${compact(v)}</span></div>`).join('')}<div class="btot"><span>Total</span><span class="${Math.abs(sum(entries.map(e=>e[1]))-total)>1?'bad':''}">${money(sum(entries.map(e=>e[1])))} · 100%</span></div></div>`;
}
function stageChip(s){return `<span class="chip ${STAGE[s]||''}">${esc(s)}</span>`}
function renderSummary(R){
 const t=totals(R),s=summaryRows(R),o=funnel(R);
 const flags=R.lines.filter(l=>l.under);
 return `<div class="panel" style="display:flex;flex-direction:column;gap:18px">
  <div><div class="eyebrow">${esc(TIERNAME[R.tier])} version · ${esc(S.name)}</div><h2 style="font-size:20px;margin-top:2px">${money(t.budget)} across ${t.channels} channels and ${t.markets} markets</h2>
  <div class="note">${esc(S.product)} · ${fmtD(parseD(S.start))} – ${fmtD(parseD(S.end))} · ${R.concepts} concepts per placement, refreshed ${R.rounds}× over the flight</div></div>
  <div class="tiles">
   <div class="tile"><span class="v">${t.lines}</span><span class="k">Media line items</span></div>
   <div class="tile"><span class="v">${compact(o.imp)}</span><span class="k">Est. impressions</span></div>
   <div class="tile"><span class="v">${compact(o.clk)}</span><span class="k">Est. clicks</span></div>
   <div class="tile"><span class="v">${compact(o.lpv)}</span><span class="k">Est. landing page visits</span></div>
   <div class="tile"><span class="v">${compact(o.leads)}</span><span class="k">Est. leads</span></div>
   <div class="tile"><span class="v">${R.masters.length}</span><span class="k">BOM creative masters · ${t.files.toLocaleString()} files</span></div>
   ${(()=>{const E=econ(R,o);return `<div class="tile"><span class="v">${money(E.pipeline)}</span><span class="k">Est. pipeline · ${compact(o.sql)} SQLs</span></div><div class="tile"><span class="v">${o.cust?money(E.cacF):'—'}</span><span class="k">Fully loaded CAC · ${compact(o.cust)} customers</span></div><div class="tile ${E.payback>18?'warn':''}"><span class="v">${E.payback?Math.round(E.payback)+' mo':'—'}</span><span class="k">CAC payback · see Growth Plan</span></div>`})()}
  </div>
  <div class="cols">${barList('Budget by channel',s.byChannel,t.budget)}${barList('Budget by market',s.byMarket,t.budget)}</div>
  <div class="cols">${barList('Budget by initiative',s.byIni,t.budget)}${barList('Budget by funnel stage',s.byStage,t.budget)}</div>
  ${flags.length?`<div class="note"><span class="chip flag">Check</span> ${flags.length} flat-fee line(s) get less than one unit at this budget: ${flags.map(l=>esc(l.placement+' · '+l.market)).join('; ')}. Raise the budget, lower the market weight, or switch the channel off there.</div>`:''}
  <div><h3 style="font-size:14px;margin-bottom:6px">Defaults this plan assumes</h3><ul class="assump">
   <li>Unless the GTM doc states a paid media budget, the Low, Medium and High budgets are planning placeholders. Replace them with your real numbers.</li>
   <li>Rates are 2026 B2B planning benchmarks, not quotes. Override any of them on the Buy Details tab.</li>
   <li>Market budget is set first from the weights; each market then splits across the channels available there (LinkedIn, Google, X and YouTube are off in China, where WeChat and Baidu take over; Naver runs in Korea; X gets extra weight in Japan).</li>
   <li>Flighting runs always-on across the flight, with extra weight in launch months and the month after. Event amplification only spends in event months.</li>
   <li>The BOM is the minimum set: one master per format and aspect ratio, made once per language (North America and EMEA share English) and resized for each platform.</li>
  </ul></div></div>`;
}
function renderTable(tb,{group=null,numeric=[],money_=[],wrapCols=[],totalCols=[]}={}){
 const cols=tb.cols;
 const head=`<tr>${cols.map(([l,k])=>`<th class="${numeric.includes(k)||money_.includes(k)?'n':''}">${esc(l)}</th>`).join('')}</tr>`;
 const cell=(r,k)=>{const v=r[k];if(money_.includes(k))return `<td class="n">${money(v)}</td>`;if(numeric.includes(k))return `<td class="n">${(+v||0).toLocaleString()}</td>`;
  if(k==='stage')return `<td>${stageChip(v)}</td>`;return `<td class="${wrapCols.includes(k)?'':'m'}" ${wrapCols.includes(k)?'style="min-width:220px"':''}>${esc(v)}</td>`};
 let body='';
 if(group){const gs={};tb.rows.forEach(r=>(gs[r[group]]=gs[r[group]]||[]).push(r));
  for(const [g,rs] of Object.entries(gs)){const sub=totalCols.map(k=>sum(rs.map(r=>r[k])));
   body+=`<tr class="grp"><td colspan="${cols.length}">${esc(g)} <span class="sub2" style="font-weight:400">· ${rs.length} lines${totalCols.length?' · '+money(sub[0]):''}</span></td></tr>`+rs.map(r=>`<tr>${cols.map(([,k])=>cell(r,k)).join('')}</tr>`).join('')}}
 else body=tb.rows.map(r=>`<tr>${cols.map(([,k])=>cell(r,k)).join('')}</tr>`).join('');
 if(totalCols.length){body+=`<tr class="tot">${cols.map(([,k],i)=>i===0?'<td>Total</td>':totalCols.includes(k)?`<td class="n">${money_.includes(k)?money(sum(tb.rows.map(r=>r[k]))):sum(tb.rows.map(r=>r[k])).toLocaleString()}</td>`:'<td></td>').join('')}</tr>`}
 return `<div class="tscroll"><table><thead>${head}</thead><tbody>${body}</tbody></table></div>`;
}
// Ad preview per BOM master: a small mock of the ad with lettered callouts showing where each piece of copy sits
function adPreview(M){
 const pick=(ad,re)=>{const r=(ad&&ad.rows||[])[0];const p=r&&r.parts.find(x=>re.test(x.k));return p?p.t:''};
 const oi=M.ad,pa=(M.pads||[])[0],ad=pa&&pa.ad;
 const brand=esc(String(S.name||'Brand').split(/[·|–-]/)[0].trim()||'Brand'),ini=esc((brand.match(/[A-Za-z0-9]/)||['B'])[0]);
 const eye=pick(oi,/eyebrow/i),oh=pick(oi,/headline|super/i),octa=pick(oi,/cta/i);
 const main=pick(ad,/main copy|primary|post text|intro|description|body/i),hl=pick(ad,/headline/i),cta=pick(ad,/cta/i)||octa||'Learn more';
 const b=(l,c)=>`<span class="pvb pv-${c}">${l}</span>`,cut=(t,n)=>esc(t.length>n?t.slice(0,n-1)+'…':t);
 const ratio=(M.ratio||'').match(/(\d+(?:\.\d+)?):(\d+(?:\.\d+)?)/),ar=ratio?`${ratio[1]}/${ratio[2]}`:'1.91/1';
 const tall=ratio&&+ratio[1]<+ratio[2];
 const head=`<div class="pv-hd"><span class="pv-av">${ini}</span><div><strong>${brand}</strong><div class="pv-sub">Promoted</div></div></div>`;
 const art=(inner,extra='')=>`<div class="pv-art" style="aspect-ratio:${ar};${tall?'max-height:220px;':''}${extra}">${inner}</div>`;
 const oiBlock=`${b('D','d')}${eye?`<div class="pv-eye">${cut(eye,24)}</div>`:''}<div class="pv-h">${cut(oh||hl||'On-image headline',40)}</div>`;
 let body='',legend=[];
 if(M.logo){body=`<div class="pv-card">${art(`<div class="pv-logo">${brand}</div>`)}</div>`;legend=[['D','d','Logo lockup only']]}
 else if(M.fmt==='static'||M.fmt==='document'){
  body=`<div class="pv-card">${head}${main?`<div class="pv-main">${b('A','a')} ${cut(main,110)}</div>`:''}${art(`<div class="pv-oi">${oiBlock}${M.fmt==='document'?'<div class="pv-doc">PDF · 1 / 8</div>':''}</div>`)}
   <div class="pv-ft">${hl?`<span class="pv-hl">${b('B','b')} ${cut(hl,48)}</span>`:'<span></span>'}<span class="pv-cta">${b('C','c')} ${cut(cta,18)}</span></div></div>`;
  legend=[main&&['A','a','Main copy (typed in platform)'],hl&&['B','b','Headline (typed in platform)'],['C','c','CTA button'],['D','d','On-image copy (designed into the image)']].filter(Boolean)}
 else if(M.fmt==='video'){
  const sup=pick(oi,/on-screen|super/i)||oh,end=pick(oi,/end card|cta/i)||cta;
  body=`<div class="pv-card">${head}${main?`<div class="pv-main">${b('A','a')} ${cut(main,110)}</div>`:''}${art(`<div class="pv-play">▶</div><div class="pv-oi pv-sup">${b('D','d')}<div class="pv-h">${cut(sup||'Super',40)}</div></div><div class="pv-end">${b('E','e')} End card: ${cut(end,18)}</div>`)}
   <div class="pv-ft">${hl?`<span class="pv-hl">${b('B','b')} ${cut(hl,48)}</span>`:'<span></span>'}<span class="pv-cta">${b('C','c')} ${cut(cta,18)}</span></div></div>`;
  legend=[main&&['A','a','Main copy (typed in platform)'],hl&&['B','b','Headline (typed in platform)'],['C','c','CTA button'],['D','d','On-screen headline (super)'],['E','e','End card CTA']].filter(Boolean)}
 else if(M.fmt==='display'){
  body=`<div class="pv-ban">${b('D','d')}<div class="pv-blogo">${brand}</div><div class="pv-h">${cut(oh||'Headline on the banner',36)}</div><span class="pv-bcta">${b('C','c')} ${cut(octa||'Learn more',16)}</span></div>`;
  legend=[['D','d','Headline designed into the banner'],['C','c','CTA button on the banner']]}
 else if(M.fmt==='text'){
  const d=pick(ad,/description/i)||main;
  body=`<div class="pv-card pv-srch"><div class="pv-sub">Sponsored · ${brand.toLowerCase().replace(/[^a-z0-9]+/g,'')}.com</div><div class="pv-sh">${b('B','b')} ${cut(hl||'Headline 1 | Headline 2',60)}</div><div class="pv-sd">${b('A','a')} ${cut(d||'Description line',110)}</div></div>`;
  legend=[['B','b','Headlines (≤30 each)'],['A','a','Descriptions (≤90 each)']]}
 else if(M.fmt==='messaging'){
  const fh=pick(ad,/form headline|headline/i),od=pick(ad,/offer|detail|main|body/i),ty=pick(ad,/thank/i);
  body=`<div class="pv-card">${head}<div class="pv-form"><div class="pv-fh">${b('A','a')} ${cut(fh||'Form headline',48)}</div><div class="pv-od">${b('B','b')} ${cut(od||'Offer detail',90)}</div><div class="pv-field">Work email</div><div class="pv-field">Company</div><div class="pv-sub2">Submit</div></div>${ty?`<div class="pv-ty">${b('C','c')} ${cut(ty,70)}</div>`:''}</div>`;
  legend=[['A','a','Form headline'],['B','b','Offer detail'],ty&&['C','c','Thank-you message']].filter(Boolean)}
 else{body=`<div class="pv-card">${head}<div class="pv-main">${b('A','a')} ${cut(main||oh||'Copy from the brief',110)}</div></div>`;legend=[['A','a','Copy']]}
 return `<div class="pv">${body}<div class="pv-lg">${legend.map(([l,c,t])=>`<div>${b(l,c)} ${t}</div>`).join('')}</div>${pa?`<div class="pv-note">Shown as it runs on ${esc(pa.platform)}</div>`:''}</div>`;
}
function renderMVP(R){
 const tb=mvpTable(R),t=totals(R);
 const covered=new Set(R.masters.flatMap(m=>m.lines)).size;
 const gs={};tb.rows.forEach(r=>(gs[r.fmtName]=gs[r.fmtName]||[]).push(r));
 return `<div class="toolbar"><span class="note">The minimum creative set: every ad unit on every media line is grouped into one master per format and aspect ratio (or per unit for copy-led formats). Resize each master for the platforms listed. Each master shows two kinds of copy: the on-image text designed into the image (eyebrow ≤20, headline ≤35 characters, the same on every platform it's resized for), and the copy typed into each platform with that platform's own limits (LinkedIn: main copy &lt;150 recommended and headline &lt;70; Google: headlines ≤30 and descriptions ≤90; Meta: primary text 125 and headline 40). The Excel export also has an Ad Copy sheet with every field, its character count and limit, for the agency.</span>
  <span class="chip ${covered===t.lines?'aw':'flag'}">${covered} of ${t.lines} media lines covered</span></div>
 <div class="tscroll"><table><thead><tr><th>BOM</th><th>Creative master</th><th>Preview</th><th>On-image copy <span class="sub2" style="font-weight:400;text-transform:none;letter-spacing:0">(designed into the image)</span></th><th>Platform copy <span class="sub2" style="font-weight:400;text-transform:none;letter-spacing:0">(typed into each platform)</span></th><th>Media lines covered</th><th>Master size</th><th>Lang</th><th class="n">Concepts × rounds${R.lens.length>1?' × cuts':''}</th><th class="n">Master files</th><th class="n">Incl. resizes</th><th>Platform adaptations</th><th class="n">Budget on lines</th><th>First due</th></tr></thead><tbody>
 ${Object.entries(gs).map(([g,rs])=>`<tr class="grp"><td colspan="14">${esc(g)} <span class="sub2" style="font-weight:400">· ${rs.length} masters · ${sum(rs.map(r=>r.masterFiles)).toLocaleString()} master files</span></td></tr>`+rs.map(r=>`<tr>
  <td class="m"><strong>${r.id}</strong></td><td style="min-width:170px"><strong>${esc(r.name)}</strong><div class="sub2">${esc(r.chsTxt)}</div></td><td style="min-width:280px">${adPreview(R.masters.find(m=>m.id===r.id))}</td>
  <td style="min-width:340px">${adCellEdit(R.masters.find(m=>m.id===r.id).ad)}</td><td style="min-width:380px">${(()=>{const pd=R.masters.find(m=>m.id===r.id).pads||[];return pd.length?pd.map(x=>`<div class="pad"><div class="pad-h">${esc(x.platform)} <span class="sub2">· ${esc(UNITS[x.unit].name)}</span></div>${adCellEdit(x.ad)}</div>`).join(''):'<span class="sub2">No typed copy for this format.</span>'})()}</td><td class="m" style="min-width:220px"><span class="chip">${r.nLines} lines</span> ${esc(r.linesTxt)}</td><td class="m">${esc(r.master)}</td><td class="m" style="white-space:nowrap">${esc(r.langsTxt)}</td>
  <td class="n">${r.concepts} × ${r.rounds}${r.cuts!=='—'?' × '+R.lens.length:''}</td><td class="n">${r.masterFiles.toLocaleString()}</td><td class="n">${r.totalFiles.toLocaleString()}</td>
  <td class="sub2" style="min-width:230px">${Object.keys(R.masters.find(m=>m.id===r.id).sizes).map(esc).join('<br>')}</td><td class="n">${money(r.budget)}</td><td class="m">${r.due}</td></tr>`).join('')).join('')}
 <tr class="tot"><td>Total</td><td>${tb.rows.length} masters</td><td></td><td></td><td>${(()=>{const f=sum(R.masters.map(m=>m.ad.flags||0));return f?`<span class="chip over">${f} copy lines over limit</span>`:'<span class="chip aw">All copy within limits</span>'})()}</td><td>${covered} / ${t.lines} lines</td><td></td><td></td><td></td><td class="n">${sum(tb.rows.map(r=>r.masterFiles)).toLocaleString()}</td><td class="n">${sum(tb.rows.map(r=>r.totalFiles)).toLocaleString()}</td><td></td><td class="n">${money(t.budget)}</td><td></td></tr>
 </tbody></table></div>
 <div class="note" style="margin-top:8px">“Budget on lines” is the media budget of the lines that use a master. A line with several units counts toward each of them, so this column does not add up to the plan total.${R.lens.length>1?` Video masters are cut into ${R.lens.length} lengths (${esc(R.lens.join(', '))}).`:''}</div>`;
}
// agency edits to a line's ad copy, keyed by version + placement + market so they survive renumbering
const editKey=(tier,l)=>TIERS[tier]+'|'+l.p.id+'|'+l.m.id;
function applyEdits(ad,lk){
 const E=(S.copyEdits||{})[lk];ad.lk=lk;if(!E||!ad.rows.length)return ad;let any=false;
 ad.rows.forEach(r=>r.parts.forEach((p,j)=>{const v=E[r.label+'|'+j];if(v!=null){p.t=v;p.edited=true;any=true;p.over=p.lim?Math.max(0,v.length-p.lim):0}}));
 if(any)ad.edited=true;return finishAd(ad);
}
// copy edited on a BOM master flows to every trafficking line that uses that master (matched by concept + copy field)
function mvpOverlay(ad,mad){
 if(!mad||!ad.rows.length)return ad;
 ad.rows.forEach(r=>{const mr=mad.rows.find(x=>x.label===r.label);if(!mr)return;
  r.parts.forEach(p=>{const mp=mr.parts.find(x=>x.k===p.k&&x.edited);if(mp){p.t=mp.t;p.fromMvp=true;p.over=p.lim?Math.max(0,p.t.length-p.lim):0}})});
 return finishAd(ad);
}
function adCellEdit(ad){
 if(!ad.rows.length)return `<span class="sub2">${esc(ad.note)}</span>`;
 return `<div style="display:flex;flex-direction:column;gap:6px">${ad.rows.map(r=>`<div><span class="tierchip">${esc(/^C\d+$/.test(r.label)?'Concept '+r.label.slice(1):r.label)}</span>${r.parts.map((p,j)=>{const long=(p.lim||0)>90||p.t.length>90;
  const attrs=`class="cp-edit" data-lk="${esc(ad.lk)}" data-key="${esc(r.label+'|'+j)}" data-lim="${p.lim||''}" aria-label="${esc(r.label+' '+p.k)}"`;
  return `<div style="margin-top:4px"><div class="sub2" style="display:flex;justify-content:space-between;gap:8px"><span>${esc(p.k)}${p.edited?' · edited':p.fromMvp?' · from BOM':''}</span><span class="cp-count ${p.over>0?'over':''}">${p.lim?`${p.t.length}/${p.lim}`:p.t.length+' chars'}</span></div>
   ${long?`<textarea ${attrs} rows="2">${esc(p.t)}</textarea>`:`<input type="text" ${attrs} value="${esc(p.t)}">`}</div>`}).join('')}</div>`).join('')}
  ${ad.edited?`<button class="btn sm ghost cp-reset" data-lk="${esc(ad.lk)}">${/^(M|OI|P)\|/.test(ad.lk)?'Reset to bank copy':'Reset to platform copy'}</button>`:''}${ad.note?`<div class="sub2">${esc(ad.note)}</div>`:''}</div>`;
}
function adCell(ad){
 if(!ad.rows.length)return `<span class="sub2">${esc(ad.note)}</span>`;
 return `<div style="display:flex;flex-direction:column;gap:6px">${ad.rows.map(r=>`<div><span class="tierchip">${esc(/^C\d+$/.test(r.label)?'Concept '+r.label.slice(1):r.label)}</span> ${r.parts.map(p=>`<div style="margin-top:2px"><span class="sub2">${esc(p.k)}${p.lim?` (${p.t.length}/${p.lim})`:''}:</span> ${esc(p.t)}${p.over>0?` <span class="chip over">over by ${p.over}</span>`:''}</div>`).join('')}</div>`).join('')}${ad.note?`<div class="sub2">${esc(ad.note)}</div>`:''}</div>`;
}
function adCopyUnits(R){const used={};R.lines.forEach(l=>l.units.forEach(u=>{(used[u]=used[u]||{pls:new Set(),ini:{},langs:new Set()}).pls.add(l.channel+' · '+l.placement);const i=Math.max(0,iniIdx(l.p));used[u].ini[i]=(used[u].ini[i]||0)+l.budget;used[u].langs.add(l.lang)}));
 return UNIT_GROUPS.map(([g,us])=>[g,us.filter(u=>used[u]).map(u=>{const x=used[u],ini=+Object.entries(x.ini).sort((a,b)=>b[1]-a[1])[0][0];return {u,U:UNITS[u],pls:[...x.pls],ad:platformAd(u,{ini,concepts:R.concepts,langs:[...x.langs]})}})]).filter(([,a])=>a.length)}
function renderAdCopy(R){const G=adCopyUnits(R),fl=sum(G.flatMap(([,a])=>a.map(x=>x.ad.flags||0)));
 return `<div class="toolbar"><span class="note">The copy typed into each platform’s ad fields, with that platform’s own field names and limits, so LinkedIn, Google and Meta never share a limit. Each concept (C1, C2…) pairs with the matching on-image copy in the BOM tab. Edit any line; counters turn red when it’s over, and edits flow to every trafficking line that uses the unit.</span>
  <span class="chip ${fl?'over':'aw'}">${fl?fl+' lines over limit':'All copy within limits'}</span></div>
 ${G.map(([g,a])=>`<h3 style="font-size:15px;margin:14px 0 8px">${esc(g)}</h3><div class="ac-grid">${a.map(x=>`<div class="ac-card"><div><strong>${esc(x.U.platform)} · ${esc(x.U.name)}</strong><div class="sub2">${x.U.copy.map(esc).join(' · ')}</div><div class="sub2" style="margin-top:2px">Used in: ${esc(x.pls.join('; '))}</div></div>${adCellEdit(x.ad)}</div>`).join('')}</div>`).join('')}`}
function adCopyAOA(R){const a=[['Platform group','Platform','Ad unit','Concept','Field','Copy','Characters','Limit','Over by','Used in']];
 adCopyUnits(R).forEach(([g,us])=>us.forEach(x=>{if(!x.ad.rows.length)a.push([g,x.U.platform,x.U.name,'','',x.ad.note,'','','',x.pls.join('; ')]);x.ad.rows.forEach(r=>r.parts.forEach(p=>a.push([g,x.U.platform,x.U.name,r.label,p.k,p.t,p.t.length,p.lim||'',p.over||'',x.pls.join('; ')])))}));
 a.push([],['ON-IMAGE COPY (designed into the image, video or banner)'],['BOM item','Creative master','Concept','Field','Copy','Characters','Limit','Note']);
 R.masters.filter(m=>m.ad.rows.length).forEach(m=>m.ad.rows.forEach(r=>r.parts.forEach(p=>a.push([m.id,m.name,r.label,p.k,p.t,p.t.length,p.lim||'',m.ad.note]))));return a}
function renderTagging(R){
 const px=pixelTable(R),ut=utmTable(R),T=trafficOf(),wb=workback(),gb=geoBudget(R);
 const inp=(k,lab,ph)=>`<label class="f">${lab}<input type="text" class="tr-in" data-k="${k}" value="${esc(T[k])}" placeholder="${esc(ph||'')}"></label>`;
 const sel=(k,lab,opts)=>`<label class="f">${lab}<select class="tr-in" data-k="${k}">${opts.map(([v,n])=>`<option value="${v}" ${T[k]===v?'selected':''}>${n}</option>`).join('')}</select></label>`;
 return `<div class="panel" style="display:flex;flex-direction:column;gap:14px"><div class="toolbar" style="margin:0"><div><div class="eyebrow">Spec sheet &amp; tagging for agency</div><h2 style="font-size:18px">Agency trafficking sheet: every line</h2><div class="note">One row per media line, laid out the way the agency builds it: <strong>campaign → ad set → ads</strong>. It names each campaign and ad with a standard taxonomy, gives the objective, budget (total and daily), audience and exclusions, conversion event, lead form, CTA, files, copy and tracked URL. The grey columns at the end are for the agency to fill in (campaign ID, ad IDs, audience size) and for your QA.</div></div>
   <label class="f" style="min-width:260px">Landing page URL<input type="text" id="in-landing" value="${esc(S.landing)}"></label></div>
  <div class="tr-set"><div class="eyebrow" style="grid-column:1/-1">Trafficking settings (fill once, used in every name)</div>
   ${inp('bu','Business unit code','e.g. grow')}${inp('region','Region code','e.g. amer, emea, global')}${inp('cc','Cost center','e.g. 4410')}${inp('crm','CRM campaign ID','e.g. 701Ux000…')}${inp('crmName','CRM campaign name','')}
   ${sel('content','Content access',[['ug','Ungated'],['g','Gated (form)']])}${inp('ctype','Content type code','rpt, wbn, demo, ebook')}
   ${sel('med','utm_medium style',[['channel','By channel (paid_social, cpc, display…)'],['cpc','Always cpc']])}
   ${sel('build','Who builds audiences & conversions',[['Agency builds','Agency builds audiences, exclusions & conversion events'],['Client provides','Client provides lists & events; agency applies'],['Already exist','Already exist in the ad accounts']])}
   ${inp('assets','Asset folder link','Drive / Box link to final files')}${inp('doc','Brief / copy doc link','')}</div>
  <div class="tscroll"><table class="tr-tbl"><thead><tr class="tr-grp"><th colspan="2"></th><th colspan="4">Campaign</th><th colspan="3">Ad set</th><th colspan="5">Ads</th><th colspan="2">Tracking</th><th colspan="4" class="ag">Agency fills · client QA</th></tr>
   <tr><th>Line</th><th>Placement · market</th><th>Campaign name</th><th>Objective · optimization</th><th>Budget</th><th>Flight · due</th><th>Audience &amp; targeting</th><th>Exclusions · devices</th><th>Conversion · lead form</th><th>BOM items · files</th><th>Ad copy</th><th>CTA · # ads</th><th>Ad names</th><th>Test cells</th><th>UTMs</th><th>Tracked URL</th><th class="ag">Campaign ID</th><th class="ag">Ad IDs</th><th class="ag">Est. audience</th><th class="ag">Client QA</th></tr></thead><tbody>
  ${ut.rows.map(r=>`<tr><td class="m"><strong>${r.id}</strong></td><td style="min-width:190px">${esc(r.placement)}<div class="sub2">${esc(r.channel)} · ${esc(r.market)} · ${esc(r.lang)}</div></td>
   <td class="m" style="min-width:240px;word-break:break-all">${esc(r.cname)}<div class="sub2">group: ${esc(r.cgroup)}</div></td>
   <td style="min-width:150px">${esc(r.obj)}<div class="sub2">${esc(r.opt)}</div></td>
   <td class="m" style="white-space:nowrap">${esc(r.budgetTxt)}<div class="sub2">${esc(r.dailyTxt)}</div></td>
   <td style="min-width:140px">${esc(r.flight)}<div class="sub2">creative due ${esc(r.due)}</div></td>
   <td style="min-width:220px">${esc(r.adset)}<div class="sub2">${esc(r.build)}</div></td>
   <td class="sub2" style="min-width:200px">${esc(r.excl)}<div>Devices: ${esc(r.devices)}</div></td>
   <td style="min-width:180px">${esc(r.conv)}<div class="sub2">${esc(r.lgf)}</div></td>
   <td class="sub2" style="min-width:220px"><span class="m">${esc(r.bom)}</span><div>${esc(r.files)}</div></td>
   <td style="min-width:420px">${adCellEdit(r._ad)}</td>
   <td style="white-space:nowrap">${esc(r.cta)}<div class="sub2">${r.nads} ads</div></td>
   <td class="m sub2" style="min-width:260px;word-break:break-all">${r.adnames.split('\n').map(esc).join('<br>')}<div style="margin-top:4px">short: ${esc(r.adname)}</div></td>
   <td style="min-width:180px">${r._test?`<span class="chip cv">${r._test.id}</span> ${esc(r._test.type)}<div class="m sub2" style="word-break:break-all;margin-top:4px">${r._test.cells.map(c=>esc(r.adname+'_'+r._test.id+'-'+c[0])).join('<br>')}</div><div class="sub2">utm_content + _${r._test.id.toLowerCase()}-a, -b…</div>`:'<span class="sub2">—</span>'}</td>
   <td class="m" style="min-width:200px">source=${esc(r.src)}<br>medium=${esc(r.med)}<br>campaign=${esc(r.camp)}<br>content=${esc(r.cont)}<br>term=${esc(r.term)}</td>
   <td class="m" style="min-width:260px;word-break:break-all">${esc(r.url)}</td>
   <td class="ag"></td><td class="ag"></td><td class="ag"></td><td class="ag"></td></tr>`).join('')}
  </tbody></table></div>
  <div class="tr-two"><div><h2 style="font-size:18px">Budget by market</h2><div class="note">Totals the sheet above so finance and the agency can check it against the PO. Cost center: ${esc(T.cc||'not set yet')}.</div>
   <div class="tscroll"><table><thead><tr><th>Market</th><th>Channels</th><th>Lines</th><th style="text-align:right">Budget</th></tr></thead><tbody>${gb.rows.map(r=>`<tr><td>${esc(r.market)}</td><td class="sub2">${esc(r.ch)}</td><td class="m">${r.lines}</td><td class="m" style="text-align:right">${money(r.budget)}</td></tr>`).join('')}
   <tr class="tot"><td><strong>Grand total</strong></td><td></td><td class="m">${R.lines.length}</td><td class="m" style="text-align:right"><strong>${money(gb.total)}</strong></td></tr></tbody></table></div></div>
   <div><h2 style="font-size:18px">Launch workback</h2><div class="note">Counted back from the flight start (${esc(fmtD(parseD(S.start)))}). Move the start date in section 2 and these move with it.</div>
   <div class="tscroll"><table><thead><tr><th>When</th><th>Due</th><th>Task</th><th>Owner</th></tr></thead><tbody>${wb.map(w=>`<tr><td class="m">${w.days}</td><td class="m" style="white-space:nowrap">${w.due}</td><td>${esc(w.task)}</td><td><span class="chip ${w.owner==='Agency'?'cv':''}">${w.owner}</span></td></tr>`).join('')}</tbody></table></div></div></div>
  <div style="margin-top:10px"><h2 style="font-size:18px">Pixels &amp; conversion tracking by channel</h2>
  <div class="note">Install site-wide tags before launch and gate them behind your consent manager (GDPR in EMEA, PIPL in China, PIPA in Korea). Fire the same conversion events on every channel so results compare.</div></div>
  ${renderTable(px,{numeric:['n'],wrapCols:['tag','events','click','extra','mk']})}</div>`;
}
function renderBOM(R){
 const tb=bomTable(R);
 const all=Object.fromEntries([...tb.cols,['Audience','aud']].map(c=>[c[1],c]));
 const view={...tb,cols:['id','placement','publisher','market','aud','stage','unitsTxt','sizes','buy','rateTxt','budget','qty','qu','flight','kpi','bomIds'].map(k=>all[k])};
 const gk={channel:'channel',market:'market',initiative:'ini',stage:'stage'}[UI.group];
 return `<div class="toolbar"><div class="left"><label class="note" for="grp">Group by</label><select id="grp">${[['channel','Channel'],['market','Market'],['initiative','Initiative'],['stage','Funnel stage']].map(([v,n])=>`<option value="${v}" ${UI.group===v?'selected':''}>${n}</option>`).join('')}</select></div>
  <span class="note">Exports include every column: initiative, pillar, targeting, language and creative due dates.</span></div>
  ${renderTable(view,{group:gk,numeric:['qty'],money_:['budget'],wrapCols:['placement','aud','sizes','flight','kpi','publisher'],totalCols:['budget']})}`;
}
function renderSpec(R){
 const tb=specTable(R);let g='';
 return `<div class="toolbar"><span class="note">${tb.rows.length} creative units from the channels you turned on, grouped by platform (units that share a spec are listed once). ${tb.rows.filter(r=>r.bought).length} are bought in the ${TIERNAME[R.tier]} version. Units marked “Confirm” change often or vary by publisher; check the current platform spec before production. Turn channels on or off in the Channels section; pick units and sizes in section 9.</span></div>
 <div class="tscroll"><table><thead><tr><th>Ad unit</th><th>Sizes / ratios</th><th>Files · max size · length</th><th>Copy limits</th><th>Notes</th><th>Used in</th><th class="n">Lead (days)</th></tr></thead><tbody>
 ${tb.rows.map(r=>{const s=UNITS[r.units[0]];const head=r.group!==g?(g=r.group,`<tr class="grp"><td colspan="7">${esc(g)}</td></tr>`):'';return head+`<tr${r.bought?'':' style="opacity:.7"'}><td style="min-width:170px"><strong>${esc(r.name)}</strong>${r.covers?`<div class="sub2">${esc(r.covers)}</div>`:`<div class="sub2">${esc(s.platform)}</div>`}${r.verify?'<span class="chip flag">Confirm</span>':''}</td>
  <td class="m" style="min-width:150px"><ul class="spec-list">${variantsOf(r.units[0]).map(v=>`<li>${esc(v)}</li>`).join('')}</ul></td>
  <td style="min-width:160px">${esc(r.files)}<div class="sub2">${esc(r.max)}${r.length!=='—'?' · '+esc(r.length):''}</div></td>
  <td style="min-width:220px"><ul class="spec-list">${r.copy.split(' | ').map(v=>`<li>${esc(v)}</li>`).join('')}</ul></td>
  <td style="min-width:180px" class="sub2">${esc(r.notes)}</td>
  <td style="min-width:200px" class="sub2">${r.bought?esc(r.usedIn):`<span class="chip">Not bought in ${esc(TIERNAME[R.tier])}</span>`}<div>${esc(r.lg)}</div></td><td class="n">${r.lead}</td></tr>`}).join('')}
 </tbody></table></div>`;
}
function renderCreative(R){
 const tb=creativeTable(R);
 return `<div class="toolbar"><span class="note">Files = concepts × sizes × refresh rounds, counted once per language. First round is due before the flight starts, using each unit's production lead time.</span></div>
 ${renderTable(tb,{group:'lang',numeric:['concepts','variants','rounds','files'],wrapCols:['placement','markets'],totalCols:['files']})}`;
}
function testStatusChip(t){return t.status==='ok'?'<span class="chip aw">Reads out</span>':t.status==='fix'?'<span class="chip flag" title="Too little volume on the main KPI in time, so it reads out on a backup metric (CTR or visits), pooled markets, or a longer run. The row says which.">Backup metric</span>':'<span class="chip over">Can’t reach significance</span>'}
const TB_UNIT={CPM:['imp','impr.'],CPC:['clk','clicks'],CPV:['views','views'],CPL:['leads','leads'],CPS:['sends','sends']};
function testSuggest(R,TP){const ed=TP.edits,tested=new Set(TP.tests.flatMap(t=>t.a?[t.a.p.id]:[])),out=[];
 for(const a of TP.places){if(out.length>=3)break;if(tested.has(a.p.id)||!TB_UNIT[a.p.buy])continue;
  const use=id=>TP.tests.filter(t=>t.tpl===id).length+out.filter(x=>x.tpl===id).length;
  for(const [id,L] of Object.entries(TEST_LIB).sort((x,y)=>use(x[0])-use(y[0]))){if(!L.fits(a,TP.ctx))continue;
   const x=testPlan(R,{drop:ed.drop||[],add:[...(ed.add||[]),{tpl:id,pid:a.p.id}]}).tests.find(t=>t.key===id+':'+a.p.id);
   if(x&&x.status!=='no'){out.push({tpl:id,pid:a.p.id,t:x,a});break}}}
 return out}
function renderTestBuilder(R,TP){
 const sel=UI.tpSel,L=sel&&TEST_LIB[sel],ctx=TP.ctx,byPid={};TP.tests.forEach(t=>{if(t.a)(byPid[t.a.p.id]=byPid[t.a.p.id]||[]).push(t)});
 const prog=TP.tests.filter(t=>!t.a),nFit=L?TP.places.filter(a=>L.fits(a,ctx)).length:0,sug=testSuggest(R,TP);
 const fitsOf=id=>TP.places.filter(a=>TEST_LIB[id].fits(a,ctx)).map(a=>a.p.id).join(' ');
 const del=a=>{const u=TB_UNIT[a.p.buy];if(!u)return 'flat fee';return compact(sum(a.lines.map(l=>(lineFun(l)||{})[u[0]]||0)))+' '+u[1]};
 const chip=t=>`<span class="chip cv tb-chip${t.key===UI.tpNew?' tb-new':''}" title="${esc(t.type)}: ${esc(t.variable)}">${t.id} ${esc(t.type)}<button class="tb-x" data-key="${esc(t.key)}" aria-label="Remove ${t.id}">×</button></span>`;
 const ed=TP.edits,custom=(ed.add||[]).length||(ed.drop||[]).length;
 return `<div class="tb">
 <div class="toolbar" style="margin:0;align-items:flex-end"><div><h3 style="font-size:16px">Build the plan</h3>
  <div class="note">Drag a test from the library onto a media line. Lines that can run it light up, and the row below fills in the cells, budget, KPI, sample size, run time and readout. Or click a template, then click a line.</div></div>
  </div>
 <div class="tb-ai"><label class="f" style="flex:1;min-width:220px">Add one test: describe it in plain words${aiReady()?' ('+esc(aiLabel())+' sets it up)':''}
   <input type="text" id="tb-ask" placeholder="e.g. Test a demo offer vs a free trial on LinkedIn lead gen" value="${esc(UI.tpAsk||'')}"></label>
   <button class="btn primary run" id="tb-ask-go" style="width:auto"><span class="spin" aria-hidden="true"></span><span>Add this test</span></button>
   <span class="sub2" style="align-self:center">or</span>
   <button class="btn" id="tb-auto" title="Replace the plan with the recommended tests for this version">Recommend a full plan</button><button class="btn ghost" id="tb-clear">Start blank</button></div>
 ${custom?`<div class="note">You’ve changed the auto-built plan (${(ed.add||[]).length} added, ${(ed.drop||[]).length} removed). “Recommend a full plan” puts back the recommended tests.</div>`:''}
 ${UI.tpMsg?`<div class="tb-msg">${UI.tpMsg}</div>`:''}
 <div class="tb-grid">
  <div class="tb-lib"><div class="tb-h"><strong>Test library</strong><span class="sub2">${Object.keys(TEST_LIB).length} templates</span></div>
   ${Object.entries(TEST_LIB).map(([id,t])=>{const f=fitsOf(id);return `<div class="tb-tpl${sel===id?' on':''}${f?'':' none'}" draggable="${f?'true':'false'}" tabindex="0" role="button" aria-pressed="${sel===id}" data-tpl="${id}" data-fits="${f}">
    <svg width="10" height="16" viewBox="0 0 10 16" aria-hidden="true"><g fill="currentColor"><circle cx="2.5" cy="3" r="1.4"/><circle cx="7.5" cy="3" r="1.4"/><circle cx="2.5" cy="8" r="1.4"/><circle cx="7.5" cy="8" r="1.4"/><circle cx="2.5" cy="13" r="1.4"/><circle cx="7.5" cy="13" r="1.4"/></g></svg>
    <span><strong>${esc(t.name)}</strong><span class="sub2">${f?'Fits: '+esc(t.fitsTxt):'No line in this version can run it'}</span></span></div>`}).join('')}
   <div class="sub2" style="border-top:1px dashed var(--line);padding-top:8px">${R.tier===0?'Medium adds a pipeline read and High adds an incrementality study.':R.tier===1?'The pipeline read is added for you. High adds an incrementality study.':'The pipeline read and incrementality study are added for you.'}</div></div>
  <div class="tb-lines"><div class="tb-h"><strong>Media lines</strong><span class="sub2" id="tb-hint">${L?`${esc(L.name)}: ${nFit} line${nFit===1?'':'s'} can run it. Click one, or press Esc to cancel.`:'Biggest lines first'}</span></div>
   ${TP.places.map(a=>{const ts=byPid[a.p.id]||[],fit=L?L.fits(a,ctx):false;return `<div class="tb-line${L?fit?' fit':' nofit':''}" data-pid="${a.p.id}"${fit?' tabindex="0" role="button"':''}>
    <span><strong>${esc(a.c.name)}</strong><span class="sub2">${esc(a.p.name)}</span></span>
    <span class="n">${money(a.budget)}</span><span class="sub2">${del(a)}</span>
    <span class="tb-chips">${ts.map(chip).join('')}<span class="tb-drop">Drop here</span></span></div>`}).join('')}
   ${prog.length?`<div class="tb-line prog"><span><strong>Program-wide</strong><span class="sub2">Reads across every line</span></span><span></span><span></span><span class="tb-chips">${prog.map(chip).join('')}</span></div>`:''}
  </div></div>
 ${sug.length?`<div><h3 style="font-size:14px;margin-bottom:4px">Suggested next tests</h3><div class="note" style="margin-bottom:8px">Lines with no test yet that have enough volume to read out. One click adds it.</div>
  <div class="tb-sug">${sug.map(x=>`<div class="tb-card"><div style="display:flex;justify-content:space-between;gap:6px;align-items:center"><strong>${esc(TEST_LIB[x.tpl].name)}</strong>${testStatusChip(x.t)}</div>
   <span class="sub2">${esc(x.a.c.name)} · ${esc(x.a.p.name)}</span><span class="sub2">${compact(x.t.have)} ${esc(x.t.unit)} per cell against ${compact(x.t.need)} needed · ${money(x.t.budget)} in test cells</span>
   <button class="btn ghost tb-add" data-tpl="${x.tpl}" data-pid="${x.a.p.id}">+ Add</button></div>`).join('')}</div></div>`:''}
 </div>`}
// "Describe a test": AI picks the template and line and writes the hypothesis and cells; without AI, a keyword match picks them
const TB_WORDS={msg:/message|claim|proof|headline lead/i,pillar:/pillar|initiative/i,angle:/angle|benefit|feature/i,visual:/visual|image|photo|picture/i,hook:/hook|first (3|5|five|three)|opening|video/i,lp:/landing|\blp\b|page|calculator/i,offer:/offer|demo|trial|report|ebook|e-book|webinar|gated/i,audience:/audience|abm|target|job title|persona|account list/i,cta:/\bcta\b|button|call to action/i,bid:/bid|bidding|max(imize)? conv|manual/i,freq:/frequen|cap\b/i};
function testGuess(txt,TP){const T=Object.entries(TEST_LIB),tl=txt.toLowerCase();
 const tpl=(T.find(([id])=>TB_WORDS[id].test(txt))||T[0])[0],L=TEST_LIB[tpl];
 const fits=TP.places.filter(a=>L.fits(a,TP.ctx)),named=fits.filter(a=>tl.includes(a.c.name.toLowerCase().split(/[ (]/)[0])||tl.includes(a.c.id));
 const a=(named.length?named:fits)[0];const vs=txt.match(/(.+?)\s+(?:vs\.?|versus|against|or)\s+(.+?)(?:\s+(?:on|in|for|across)\s|$)/i);
 if(!a)return null;if(!vs)return {tpl,pid:a.p.id,ov:null};const A=vs[1].replace(/^(test(ing)?|try|compare)\s+(an?\s+|the\s+)?/i,'').trim(),B=vs[2].replace(/^(an?\s+|the\s+)/i,'').trim(),k0=L.make(a,TP.ctx).kpi[0],k=/^[A-Z][a-z]/.test(k0)?k0[0].toLowerCase()+k0.slice(1):k0;
 return {tpl,pid:a.p.id,ov:{cells:[A,B],hyp:`If we run ${B} instead of ${A} on this line, ${k} improves because it’s a better fit for what this audience wants.`}}}
async function testFromText(txt,btn){txt=(txt||'').trim();if(txt.length<6){UI.tpMsg='Describe the test in a few words first, like “demo vs free trial on LinkedIn lead gen”.';return renderOut()}
 const R=compute(UI.tier),TP=testPlan(R);btn.classList.add('busy');btn.disabled=true;let pick=null,how='keyword match';
 try{if(aiReady()){btn.lastElementChild.textContent=aiLabel()+' is setting it up…';
   const lib=Object.entries(TEST_LIB).map(([id,t])=>`${id}: ${t.name} (fits ${t.fitsTxt})`).join('\n');
   const lines=TP.places.map(a=>`${a.p.id}: ${a.c.name} · ${a.p.name} · ${a.p.buy} · ${money(a.budget)} · fits: ${Object.keys(TEST_LIB).filter(k=>TEST_LIB[k].fits(a,TP.ctx)).join(',')}`).join('\n');
   const x=await aiJSON(`You are a B2B paid media testing strategist. Set up one A/B test from the request below, using this media plan.
Test templates (id: name):
${lib}
Media lines (id: channel · placement · buy type · budget · templates that fit):
${lines}
Request: """${txt}"""
Pick the template and the media line that best match the request; the template must be in that line's "fits" list. Write a one-sentence hypothesis in the form "If ..., then ... because ...", a short variable name, and 2 to 3 test cells (short labels, no letters).
Reply with only JSON: {"tpl":string,"pid":string,"variable":string,"hyp":string,"cells":[string],"why":string}`);
   if(x&&TEST_LIB[x.tpl]&&TP.places.some(a=>a.p.id===x.pid&&TEST_LIB[x.tpl].fits(a,TP.ctx)))pick={tpl:x.tpl,pid:x.pid,ov:{hyp:x.hyp,cells:x.cells,variable:x.variable},why:x.why};how=aiLabel()}
 }catch(e){}
 if(!pick)pick=testGuess(txt,TP);btn.classList.remove('busy');btn.disabled=false;
 if(!pick){UI.tpMsg='No line in this version can run that kind of test. Try another channel or switch versions.';return renderOut()}
 UI.tpAsk='';testAdd(pick.tpl,pick.pid,pick.ov||{variable:TEST_LIB[pick.tpl].name});
 UI.tpMsg=(UI.tpMsg||'')+` <span class="sub2">Set up by ${esc(how)}${pick.why?': '+esc(pick.why):''}. Edit or remove it with × on the line.</span>`;renderOut()}
function testEdit(f){const T=TIERS[UI.tier];S.testEdits=S.testEdits||{};const e=S.testEdits[T]=S.testEdits[T]||{add:[],drop:[]};e.add=e.add||[];e.drop=e.drop||[];f(e);save();renderOut()}
function testAdd(tpl,pid,ov){const R=compute(UI.tier);let key=tpl+':'+pid;
 testEdit(e=>{e.drop=e.drop.filter(k=>k!==key);const auto=testPlan(R,{drop:e.drop,add:[]}).tests.some(t=>t.key===key);
  if(ov){e.add=e.add.filter(x=>!(x.tpl===tpl&&x.pid===pid));if(auto)e.drop.push(key);e.add.push({tpl,pid,...ov})}
  else if(!auto&&!e.add.some(x=>x.tpl===tpl&&x.pid===pid))e.add.push({tpl,pid})});
 const t=testPlan(compute(UI.tier)).tests.find(t=>t.key===key);UI.tpSel=null;UI.tpNew=key;
 UI.tpMsg=t?`Added <strong>${t.id} ${esc(t.type)}</strong> on ${esc(t.ch)} · ${esc(t.placement)}: ${t.status==='ok'?'reads out as planned':t.status==='fix'?'reads out on a backup metric (see its row)':'can’t reach significance, so it runs as a directional read'}. Readout ${fmtD(t.readout)}.`:'That line already has this test.';renderOut();
 setTimeout(()=>{const r=document.querySelector('tr.tb-new');if(r)r.scrollIntoView({block:'nearest',behavior:'smooth'})},50)}
function testRemove(key){UI.tpMsg='';UI.tpNew=null;testEdit(e=>{const n=e.add.length;e.add=e.add.filter(x=>x.tpl+':'+x.pid!==key);if(e.add.length===n&&!e.drop.includes(key))e.drop.push(key)})}
function wireTestBuilder(){const v=$('#view'),lines=[...v.querySelectorAll('.tb-line[data-pid]')];
 const light=fits=>{const f=new Set((fits||'').split(' '));lines.forEach(l=>{l.classList.toggle('fit',f.has(l.dataset.pid));l.classList.toggle('nofit',!f.has(l.dataset.pid))})};
 const clear=()=>lines.forEach(l=>l.classList.remove('fit','nofit','over'));
 v.querySelectorAll('.tb-tpl').forEach(el=>{const pickIt=()=>{if(!el.dataset.fits)return;UI.tpSel=UI.tpSel===el.dataset.tpl?null:el.dataset.tpl;UI.tpMsg='';renderOut();if(UI.tpSel)setTimeout(()=>{const f=document.querySelector('.tb-line.fit');if(f)f.focus({preventScroll:true})},30)};
  el.onclick=pickIt;el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pickIt()}};
  el.ondragstart=e=>{e.dataTransfer.setData('text/plain',el.dataset.tpl);e.dataTransfer.effectAllowed='copy';UI.tpDrag=el.dataset.tpl;el.classList.add('drag');light(el.dataset.fits)};
  el.ondragend=()=>{el.classList.remove('drag');UI.tpDrag=null;clear()}});
 lines.forEach(l=>{const ok=()=>{const id=UI.tpDrag||UI.tpSel;return id&&TEST_LIB[id]&&(v.querySelector(`.tb-tpl[data-tpl="${id}"]`)?.dataset.fits||'').split(' ').includes(l.dataset.pid)};
  l.ondragover=e=>{if(ok()){e.preventDefault();e.dataTransfer.dropEffect='copy';l.classList.add('over')}};
  l.ondragleave=()=>l.classList.remove('over');
  l.ondrop=e=>{e.preventDefault();const id=e.dataTransfer.getData('text/plain')||UI.tpDrag;UI.tpDrag=null;if(id&&TEST_LIB[id]&&(v.querySelector(`.tb-tpl[data-tpl="${id}"]`)?.dataset.fits||'').split(' ').includes(l.dataset.pid))testAdd(id,l.dataset.pid);else clear()};
  l.onclick=e=>{if(e.target.closest('.tb-x'))return;if(UI.tpSel&&ok())testAdd(UI.tpSel,l.dataset.pid)};
  l.onkeydown=e=>{if((e.key==='Enter'||e.key===' ')&&UI.tpSel&&ok()){e.preventDefault();testAdd(UI.tpSel,l.dataset.pid)}}});
 v.querySelectorAll('.tb-x').forEach(b=>b.onclick=e=>{e.stopPropagation();testRemove(b.dataset.key)});
 v.querySelectorAll('.tb-add').forEach(b=>b.onclick=()=>testAdd(b.dataset.tpl,b.dataset.pid));
 const ask=$('#tb-ask'),go=$('#tb-ask-go');if(ask&&go){ask.oninput=()=>{UI.tpAsk=ask.value};ask.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();go.click()}};go.onclick=()=>testFromText(ask.value,go)}
 const au=$('#tb-auto');if(au)au.onclick=()=>{const T=TIERS[UI.tier];if(S.testEdits)delete S.testEdits[T];UI.tpSel=null;UI.tpNew=null;UI.tpMsg='Rebuilt the recommended test plan for this version.';save();renderOut()};
 const cl=$('#tb-clear');if(cl)cl.onclick=()=>{const R=compute(UI.tier),T=TIERS[UI.tier];const keys=testPlan(R,{add:[],drop:[]}).tests.map(t=>t.key);S.testEdits=S.testEdits||{};S.testEdits[T]={add:[],drop:keys};UI.tpSel=null;UI.tpNew=null;UI.tpMsg='Cleared every test. Drag tests in from the library, or press Auto-build.';save();renderOut()};
}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&UI.tpSel){UI.tpSel=null;renderOut()}});
function renderTests(R){
 const TP=testPlan(R),T=TIERS[R.tier],ts=TP.tests,cnt=s=>ts.filter(t=>t.status===s).length,o=funnel(R),fw=flightWeeks();
 const winLeads=o.leads*TP.W/fw,ndV=needN(FUN.cvr,TP.lift);
 const rs=[];for(let k=0;k<R.rounds;k++){const d=new Date(+parseD(S.start)+k*TP.rw*6048e5);if(d<=parseD(S.end))rs.push(isoD(d).slice(0,7))}
 const ro={};ts.forEach(t=>(ro[t.month]=ro[t.month]||[]).push(t.id));
 const U=utmTable(R),ex=ts.find(t=>t.lineIds.length&&t.type!=='Incrementality'),exRow=ex&&U.rows.find(r=>r.id===ex.lineIds[0]);
 const prev=['Low','Medium','High'].slice(0,R.tier);
 return `<div class="panel" style="display:flex;flex-direction:column;gap:16px">
 <div class="toolbar" style="margin:0;align-items:flex-end"><div><div class="eyebrow">${esc(TIERNAME[R.tier])} version · test plan</div>
  <h2 style="font-size:20px;margin-top:2px">How we’ll run the ${money(TP.total)}: ${ts.length} tests, ${money(TP.budget)} through test cells</h2>
  <div class="note">Every test comes from a line in this plan. Sample sizes use the plan’s own estimated impressions, clicks and leads, so a test that can’t reach significance is flagged with a fallback before money moves. ${R.tier===0?'Low runs creative and message tests.':R.tier===1?'Medium adds audience and offer tests.':'High adds an incrementality read.'}</div></div>
  <div class="btns"><label class="f">Test budget %<input type="number" id="tp-share" min="0" max="40" step="1" value="${Math.round(TP.target*100)}" style="width:80px"></label>
  <label class="f">Lift to detect<select id="tp-lift">${[10,15,20,25,30].map(v=>`<option value="${v}" ${v===Math.round(TP.lift*100)?'selected':''}>${v}% relative</option>`).join('')}</select></label></div></div>
 <div class="tiles" style="grid-template-columns:repeat(5,minmax(0,1fr))">
  <div class="tile"><span class="v">${ts.length}</span><span class="k">Tests in ${esc(TIERNAME[R.tier])}</span></div>
  <div class="tile"><span class="v">${compact(TP.budget).replace(/^/,'$')}</span><span class="k">In test cells · ${(TP.share*100).toFixed(0)}% of budget</span></div>
  <div class="tile"><span class="v" style="color:var(--green)">${cnt('ok')}</span><span class="k">Read out as planned</span></div>
  <div class="tile"><span class="v" style="color:var(--flag)">${cnt('fix')}</span><span class="k" title="Too little volume on the main KPI in time, so these read out on a backup metric (CTR or visits), pooled markets, or a longer run. Each row says which.">Read out on a backup metric</span></div>
  <div class="tile"><span class="v" style="color:var(--over)">${cnt('no')}</span><span class="k">Can’t reach significance</span></div></div>
 <div class="note" style="background:var(--flag-soft);border-radius:12px;padding:10px 12px;color:var(--ink)">${esc(TIERNAME[R.tier])} projects about <strong>${compact(o.leads)} leads</strong> over the flight, about ${compact(winLeads)} in a ${TP.W}-week test window across every line. A lead-rate A/B test needs about ${compact(ndV)} visits per cell (around ${compact(ndV*FUN.cvr)} leads per cell) to see a ${Math.round(TP.lift*100)}% lift, so lead-level tests here use a proxy KPI, pool markets or run longer. The fix is shown on each row.</div>
 ${renderTestBuilder(R,TP)}
 <div class="tscroll"><table><thead><tr><th>Test</th><th>Hypothesis</th><th>Channel · line</th><th>Variable · cells</th><th class="n">Budget / cell</th><th>Primary KPI · guardrail</th><th>Sample needed vs plan</th><th>Run · readout</th></tr></thead><tbody>
 ${ts.length?'':`<tr><td colspan="8" class="sub2" style="text-align:center;padding:18px">No tests yet. Drag one in from the library above, or press Recommend a full plan.</td></tr>`}
 ${ts.map(t=>`<tr${t.key===UI.tpNew?' class="tb-new"':''}><td class="m"><strong>${t.id}</strong><div class="sub2">${esc(t.type)}</div></td><td style="min-width:190px">${esc(t.hyp)}</td>
  <td style="min-width:110px"><strong>${esc(t.ch)}</strong><div class="sub2">${esc(t.placement)} · ${esc(t.scopeName)}</div></td>
  <td style="min-width:110px">${esc(t.variable)}<div class="sub2">${t.cells.map(esc).join('<br>')}</div></td>
  <td class="n">${t.cellBudget?money(t.cellBudget):'<span class="sub2">uses test spend</span>'}</td>
  <td style="min-width:110px"><strong>${esc(t.kpiName)}</strong>${t.kpiFinal?`<div class="sub2">→ ${esc(t.kpiFinal)}</div>`:''}<div class="sub2">Guardrail: ${esc(t.guard)}</div></td>
  <td style="min-width:110px">${compact(t.need)} ${esc(t.unit)}${/per pillar|total/.test(t.unit)?'':' / cell'}<div class="sub2">Plan: ${compact(t.have)}</div><div style="margin-top:4px">${testStatusChip(t)}</div></td>
  <td style="white-space:nowrap">${esc(t.runTxt)}<div class="sub2">Readout ${fmtD(t.readout)}</div></td></tr>
  <tr><td style="border-top:0"></td><td colspan="7" style="padding-top:0;border-top:0"><strong>Decision rule:</strong> ${esc(t.rule)}${t.fix?`<br><span style="color:${t.status==='no'?'var(--over)':'var(--flag)'}"><strong>Fallback:</strong></span> ${esc(t.fix)}`:''}</td></tr>`).join('')}
 <tr class="tot"><td>Total</td><td>${ts.length} tests · ${TP.cellsN} cells</td><td></td><td></td><td class="n">${money(TP.budget)}</td><td colspan="3">${(TP.share*100).toFixed(1)}% of the ${money(TP.total)} ${esc(TIERNAME[R.tier])} budget (target ${Math.round(TP.target*100)}%${TP.share+0.005<TP.target?'; the rest stays in the regular lines, since a test cell never takes more than half its line’s budget':''})</td></tr>
 </tbody></table></div>
 <div class="note">Sample per cell = 16 × p(1 − p) ÷ (p × lift)², at 95% confidence and 80% power. Baselines come from each channel's B2B benchmarks (listed on the Flighting tab), with ${pct(SQL_RATE)} lead-to-SQL. Test cells take the held test budget, spread over the tests in proportion to each line’s spend in its test window.</div>
 <div class="cols">
  <div><h3 style="font-size:14px;margin-bottom:6px">On the flighting calendar</h3><div class="note" style="margin-bottom:8px">Readouts land before each creative refresh (every ${TP.rw} weeks), so results feed the next round of creative.</div>
   <div class="tscroll"><table><thead><tr>${R.months.map(m=>`<th class="n">${monthLabel(m)}</th>`).join('')}</tr></thead><tbody>
   <tr>${R.months.map(m=>`<td class="n sub2">${rs.includes(m)?'Refresh R'+(rs.indexOf(m)+1):''}</td>`).join('')}</tr>
   <tr>${R.months.map(m=>`<td class="n">${(ro[m]||[]).map(id=>`<span class="chip cv">${id}</span>`).join(' ')}</td>`).join('')}</tr></tbody></table></div></div>
  <div><h3 style="font-size:14px;margin-bottom:6px">In the tagging sheet</h3><div class="note" style="margin-bottom:8px">Each test cell becomes its own ad, so results split cleanly in the platform and in GA4. The Spec Sheet &amp; Tagging tab lists the cells on every line in a test.</div>
   ${exRow?`<div class="m" style="background:var(--sunk);border-radius:10px;padding:10px 12px;font-size:11px;line-height:1.6;word-break:break-all"><span class="sub2">Ad name</span> ${esc(exRow.adname)}_<strong style="color:var(--rose)">${ex.id}-B</strong><br><span class="sub2">utm_content</span> ${esc(exRow.cont)}_<strong style="color:var(--rose)">${ex.id.toLowerCase()}-b</strong></div>`:''}</div></div>
 <div><h3 style="font-size:14px;margin-bottom:8px">Learning agenda</h3><div class="cols" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr))">
  ${TP.agenda.map(a=>`<div style="border:1px solid var(--line);border-radius:12px;padding:12px 14px;display:flex;flex-direction:column;gap:4px"><span class="eyebrow">${esc(a.when)} · ${a.ids.join(', ')}</span><span style="font-family:var(--f-display);font-size:16px;font-weight:600">${esc(a.q)}</span></div>`).join('')}
 </div></div></div>`;
}
function testAOA(R){const TP=testPlan(R);const a=[['Test','Type','Hypothesis','Channel','Line / placement','Scope','Variable','Cells','Budget per cell','Primary KPI','KPI after fallback','Guardrail','Sample needed','Sample in plan','Unit','Status','Fallback','Run','Readout','Decision rule','Media lines']];
 TP.tests.forEach(t=>a.push([t.id,t.type,t.hyp,t.ch,t.placement,t.scopeName,t.variable,t.cells.join(' | '),Math.round(t.cellBudget),t.kpiName,t.kpiFinal||'',t.guard,Math.round(t.need),Math.round(t.have),t.unit,{ok:'Reads out',fix:'Backup metric',no:'Can’t reach significance'}[t.status],t.fix,t.runTxt,t.readoutISO,t.rule,t.lineIds.join(', ')]));
 a.push(['Total','',TP.tests.length+' tests','','','','',TP.cellsN+' cells',Math.round(TP.budget)]);
 a.push([],['LEARNING AGENDA'],...TP.agenda.map(x=>[x.when,x.ids.join(', '),x.q]));return a}
function renderFlight(R){
 const tb=flightTable(R);const max=Math.max(1,...R.flightRows.flatMap(f=>f.months));
 const mm={};S.moments.forEach(x=>{(mm[x.month]=mm[x.month]||[]).push(x)});
 return `<div class="toolbar"><span class="note">Monthly spend by channel. Darker cells carry more budget. Moments are listed under each month. Projected outcomes and KPIs follow below.</span></div>
 <div class="tscroll"><table class="heat"><thead><tr><th>Channel</th>${R.months.map(m=>`<th class="n">${monthLabel(m)}</th>`).join('')}<th class="n">Total</th></tr>
 <tr><td class="sub2">Moments</td>${R.months.map(m=>`<td class="sub2" style="min-width:92px;font-size:10.5px">${(mm[m]||[]).map(x=>esc(x.name)).join('<br>')}</td>`).join('')}<td></td></tr>
 ${(()=>{const ro={};testPlan(R).tests.forEach(t=>(ro[t.month]=ro[t.month]||[]).push(t.id));return `<tr><td class="sub2">Test readouts</td>${R.months.map(m=>`<td>${(ro[m]||[]).map(id=>`<span class="chip cv">${id}</span>`).join(' ')}</td>`).join('')}<td></td></tr>`})()}</thead><tbody>
 ${R.flightRows.map(f=>`<tr><td style="white-space:nowrap">${esc(f.c.name)}</td>${f.months.map(v=>`<td class="h" style="background:color-mix(in srgb,var(--heat1) ${(v/max*70).toFixed(0)}%,var(--heat0));color:${v/max>.55?'var(--accent-ink)':'var(--ink)'}">${v>0?compact(v):'<span class="sub2">—</span>'}</td>`).join('')}<td class="n">${money(f.total)}</td></tr>`).join('')}
 <tr class="tot"><td>Total</td>${R.months.map((m,i)=>`<td class="n">${compact(sum(R.flightRows.map(f=>f.months[i])))}</td>`).join('')}<td class="n">${money(sum(R.flightRows.map(f=>f.total)))}</td></tr>
 </tbody></table></div>
 ${(()=>{const O=outcomes(R);const fl=Object.entries(O.flat);return `
 <h2 style="font-size:18px;margin:18px 0 4px">Projected outcomes by month</h2>
 <div class="note" style="margin-bottom:8px">The full funnel by month, phased like each channel's spend: impressions, clicks, landing page visits and leads from each buy plus benchmark rates, then MQLs, SQLs and customers from your pipeline rates. Cost rows divide that month's media spend by the result; CAC here is media cost only (add team and tooling cost for fully loaded CAC). Planning estimates, not guarantees.</div>
 ${(()=>{const P=pipe();return `<div class="pipe-set"><span class="sub2">Pipeline rates (B2B industry defaults; replace with your CRM history):</span><label>Lead → MQL <input class="rate pipe-in" type="number" min="0" max="100" step="1" data-k="mql" value="${Math.round(P.mql*100)}">%</label><label>MQL → SQL <input class="rate pipe-in" type="number" min="0" max="100" step="1" data-k="sql" value="${Math.round(P.sql*100)}">%</label><label>SQL → customer <input class="rate pipe-in" type="number" min="0" max="100" step="1" data-k="win" value="${Math.round(P.win*100)}">%</label></div>`})()}
 <div class="tscroll"><table><thead><tr><th>Outcome</th>${R.months.map(m=>`<th class="n">${monthLabel(m)}</th>`).join('')}<th class="n">Total</th></tr></thead><tbody>
 ${FULLK.filter(([k])=>O.full[k]).map(([k,n])=>`<tr${k==='leads'?' class="costrow"':''}><td style="white-space:nowrap">${n}</td>${O.full[k].map(v=>`<td class="n">${v>=.5?compact(v):v>=.05?(+v.toFixed(1)):'<span class="sub2">—</span>'}</td>`).join('')}<td class="n"><strong>${sum(O.full[k])>=10?compact(sum(O.full[k])):(+sum(O.full[k]).toFixed(1))}</strong></td></tr>`).join('')}
 <tr class="costrow"><td style="white-space:nowrap">Media spend</td>${O.spend.map(v=>`<td class="n">${v?compact(v):'<span class="sub2">—</span>'}</td>`).join('')}<td class="n"><strong>${money(sum(O.spend))}</strong></td></tr>
 ${COSTK.filter(([,k])=>O.full[k]).map(([n,k])=>`<tr><td style="white-space:nowrap"><strong>${n}</strong></td>${O.full[k].map((v,i)=>`<td class="n">${v>=.05?money2(O.spend[i]/v):'<span class="sub2">—</span>'}</td>`).join('')}<td class="n"><strong>${sum(O.full[k])?money2(sum(O.spend)/sum(O.full[k])):'—'}</strong></td></tr>`).join('')}
 ${fl.map(([u,v])=>`<tr><td style="white-space:nowrap">Flat-fee ${esc(u)}</td>${v.map(x=>`<td class="n">${x>=.05?(+x.toFixed(1)).toLocaleString():'<span class="sub2">—</span>'}</td>`).join('')}<td class="n"><strong>${(+sum(v).toFixed(1)).toLocaleString()}</strong></td></tr>`).join('')}
 </tbody></table></div>
 ${benchHTML()}
 <h2 style="font-size:18px;margin:18px 0 4px">KPIs &amp; projected outcomes by channel</h2>
 <div class="tscroll"><table><thead><tr><th>Channel</th><th class="n">Budget</th><th>KPIs to track</th>${OUTK.filter(([k])=>O.mo[k]).map(([,n])=>`<th class="n">${n}</th>`).join('')}<th>Flat-fee units</th><th class="n">Blended cost per result</th><th class="n">Leads</th><th class="n">SQLs</th><th class="n">CAC</th></tr></thead><tbody>
 ${O.by.map(c=>{const res=sum(OUTK.filter(([k])=>k!=='imp').map(([k])=>c[k]||0));return `<tr><td style="white-space:nowrap"><strong>${esc(c.c.name)}</strong></td><td class="n">${money(c.budget)}</td><td class="sub2" style="min-width:260px">${[...c.kpis].map(esc).join('<br>')}</td>
  ${OUTK.filter(([k])=>O.mo[k]).map(([k])=>`<td class="n">${c[k]?compact(c[k]):'<span class="sub2">—</span>'}</td>`).join('')}<td class="sub2">${Object.entries(c.flat).map(([u,v])=>esc((Math.round(v*10)/10)+' '+u)).join('<br>')||'—'}</td><td class="n">${res?rateFmt(c.budget/res,'CPC'):'<span class="sub2">—</span>'}</td><td class="n">${c.f_leads>=.5?compact(c.f_leads):'—'}</td><td class="n">${c.f_sql>=.05?(c.f_sql>=10?compact(c.f_sql):+c.f_sql.toFixed(1)):'—'}</td><td class="n">${c.f_cust>=.01?money(c.budget/c.f_cust):'—'}</td></tr>`}).join('')}
 ${(()=>{const T={budget:sum(O.by.map(c=>c.budget))};OUTK.forEach(([k])=>T[k]=sum(O.by.map(c=>c[k]||0)));const res=sum(OUTK.filter(([k])=>k!=='imp').map(([k])=>T[k]));
  return `<tr class="tot"><td>Total</td><td class="n">${money(T.budget)}</td><td></td>${OUTK.filter(([k])=>O.mo[k]).map(([k])=>`<td class="n">${T[k]?compact(T[k]):'—'}</td>`).join('')}<td></td><td class="n">${res?rateFmt(T.budget/res,'CPC'):'—'}</td></tr>`})()}
 </tbody></table></div>
 <div class="note" style="margin-top:8px">Blended cost per result divides the channel budget by its clicks, views, leads and messages (impressions excluded).</div>`})()}`;
}
// Buy Details: every buy, by placement or by line (market), grouped and categorized the way you want
const CAT_SUGGEST=['Always-on','Launch burst','Event support','Retargeting','Brand','Demand gen','Test & learn','Local market'];
const catOf=pid=>(S.cats||{})[pid]||'';
function renderAssump(R){
 const tb=assumptionTable(R),view=UI.bdView||'pl';let grp=UI.bdGroup||'none';if(grp==='market'&&view==='pl')grp='none';
 const cats=[...new Set([...CAT_SUGGEST,...Object.values(S.cats||{}).filter(Boolean)])];
 const plan=+S.budgets[TIERS[R.tier]]||0,lb=bomTable(R).rows;
 const rowsPl=tb.rows.map(r=>{const p=PLMAP[r._id];return {...r,_g:{channel:r.channel,stage:r.stage,ini:iniOf(p).name,buy:r.buy,cat:catOf(r._id)||'Uncategorized'}}});
 const rowsLn=R.lines.map((l,i)=>({...lb[i],_id:l.p.id,rate:rateOf(l.p),qty:Math.round(l.qty),_g:{channel:l.channel,market:l.market,stage:l.stage,ini:l.ini.name,buy:l.p.buy,cat:catOf(l.p.id)||'Uncategorized'}}));
 const rows=view==='pl'?rowsPl:rowsLn;
 const groups=grp==='none'?[['',rows]]:Object.entries(rows.reduce((o,r)=>{(o[r._g[grp]]=o[r._g[grp]]||[]).push(r);return o},{})).sort((a,b)=>a[0]==='Uncategorized'?1:b[0]==='Uncategorized'?-1:sum(b[1].map(r=>r.budget))-sum(a[1].map(r=>r.budget)));
 const catCell=pid=>`<td><input class="cat-in" list="cat-list" data-pid="${pid}" value="${esc(catOf(pid))}" placeholder="Add category" aria-label="Category"></td>`;
 const rateCell=r=>`<td class="n"><input class="rate" type="number" step="any" min="0" data-rt="${r._id}" value="${r.rate}" aria-label="Rate for ${esc(r.placement)}"></td>`;
 const plHead=`<th>Channel</th><th>Placement</th><th>Category</th><th>Audience</th><th>Targeting</th><th>Buy</th><th class="n">Rate</th><th class="n">Benchmark</th><th class="n">Budget</th><th class="n">Est. delivery</th><th class="n">Proj. impressions</th><th class="n">Proj. clicks</th><th class="n">Proj. LP visits</th><th class="n">Proj. video views</th><th class="n">Proj. leads</th><th class="n">Cost per lead</th><th>Markets</th><th>Stage</th><th>KPI</th>`;
 const lnHead=`<th>Line</th><th>Channel</th><th>Placement</th><th>Category</th><th>Market</th><th>Lang</th><th>Audience</th><th>Stage</th><th>Buy</th><th class="n">Rate</th><th class="n">Budget</th><th class="n">Est. delivery</th><th>Flight</th><th>Initiative</th><th>KPI</th><th>BOM items</th>`;
 const plRow=r=>`<tr><td>${esc(r.channel)}</td><td style="min-width:200px">${esc(r.placement)}</td>${catCell(r._id)}${(()=>{const p=PLMAP[r._id],c=CH.find(x=>x.pl.some(q=>q.id===r._id)),pp=c.pl.find(q=>q.id===r._id);return `<td style="min-width:200px">${audSelect(c,pp)}</td><td style="min-width:150px">${tgtSelect(c,pp)}</td>`})()}<td class="m">${esc(r.buy)}${r.buy==='Flat'?' / '+esc((PLMAP[r._id].unit||'unit').replace(/s$/,'')):''}</td>
  ${rateCell(r)}<td class="n">${rateFmt(r.bench,r.buy)}</td><td class="n"><input class="rate bud${plPinOf(r._id,R.tier)!=null?' pinned':''}" type="number" step="100" min="0" id="pb-${r._id}" value="${Math.round(r.budget)}" title="Type a budget for this placement" aria-label="Budget for ${esc(r.placement)}"></td><td class="n">${compact(r.qty)} <span class="sub2">${esc(r.qu)}</span></td>${['imp','clk','lpv','views','leads'].map(k=>`<td class="n">${r[k]?compact(r[k]):'<span class="sub2">—</span>'}</td>`).join('')}<td class="n">${r.cpl?money2(r.cpl):'<span class="sub2">—</span>'}</td><td class="sub2" style="min-width:140px">${esc(r.mk)}</td><td>${stageChip(r.stage)}</td><td class="sub2" style="min-width:160px">${esc(r.kpi)}</td></tr>`;
 const lnRow=r=>`<tr><td class="m"><strong>${r.id}</strong></td><td style="white-space:nowrap">${esc(r.channel)}</td><td style="min-width:200px">${esc(r.placement)}<div class="sub2">${esc(r.publisher)}</div></td>${catCell(r._id)}<td>${esc(r.market)}</td><td class="m">${esc(r.lang)}</td><td class="sub2" style="min-width:160px">${esc(r.aud||'')}</td><td>${stageChip(r.stage)}</td><td class="m">${esc(r.buy)}</td>
  ${rateCell(r)}<td class="n">${money(r.budget)}</td><td class="n">${compact(r.qty)} <span class="sub2">${esc(r.qu)}</span></td><td class="sub2" style="min-width:140px">${esc(r.flight)}</td><td class="sub2">${esc(r.ini)}</td><td class="sub2" style="min-width:160px">${esc(r.kpi)}</td><td class="m">${esc(r.bomIds)}</td></tr>`;
 const subtotal=(name,rs)=>view==='pl'?`<tr class="grp"><td colspan="8">${esc(name)} <span class="sub2" style="font-weight:400">· ${rs.length} placements</span></td><td class="n">${money(sum(rs.map(r=>r.budget)))}</td><td></td>${['imp','clk','lpv','views','leads'].map(k=>`<td class="n">${compact(sum(rs.map(r=>r[k]||0)))}</td>`).join('')}<td colspan="4"></td></tr>`
  :`<tr class="grp"><td colspan="10">${esc(name)} <span class="sub2" style="font-weight:400">· ${rs.length} lines</span></td><td class="n">${money(sum(rs.map(r=>r.budget)))}</td><td colspan="5"></td></tr>`;
 const total=sum(rows.map(r=>r.budget)),ok=Math.abs(total-plan)<1;
 const opt=(v,n,cur)=>`<option value="${v}" ${cur===v?'selected':''}>${n}</option>`;
 return `<div class="toolbar"><span class="note">Every buy in the ${esc(TIERNAME[R.tier])} version, with the line items folded in. <strong>By placement</strong> sums each buy across markets: click a budget to type your own (that placement gets exactly that amount, its channel total moves with it, and the rest rebalances to stay on ${money(plan)}). <strong>By line</strong> shows every placement × market line the agency books. Edit a rate to replace the benchmark with your rate card (it applies to all versions). Type a category on any row, then group by it.</span>
  <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn sm" id="rates-reset">Reset rates</button><button class="btn sm" id="pb-reset" ${Object.keys(S.plPin?.[TIERS[R.tier]]||{}).length?'':'disabled'}>Clear typed budgets</button></div></div>
 <div class="toolbar"><div class="left" style="display:flex;gap:14px;flex-wrap:wrap;align-items:center">
  <div style="display:flex;gap:6px" role="group" aria-label="View"><button class="btn sm ${view==='pl'?'primary':''}" data-bdview="pl">By placement</button><button class="btn sm ${view==='line'?'primary':''}" data-bdview="line">By line (each market)</button></div>
  <label class="note" style="display:flex;gap:6px;align-items:center">Group by <select id="bd-grp">${opt('none','No grouping',grp)}${opt('cat','My categories',grp)}${opt('channel','Channel',grp)}${view==='line'?opt('market','Market',grp):''}${opt('stage','Funnel stage',grp)}${opt('ini','Initiative',grp)}${opt('buy','Buy type',grp)}</select></label></div>
  <span class="chip ${ok?'aw':'flag'}">Total ${money(total)} ${ok?'matches':'vs'} the ${money(plan)} budget</span></div>
 <datalist id="cat-list">${cats.map(c=>`<option value="${esc(c)}">`).join('')}</datalist>
 <div class="tscroll"><table><thead><tr>${view==='pl'?plHead:lnHead}</tr></thead><tbody>
 ${groups.map(([g,rs])=>(g?subtotal(g,rs):'')+rs.map(view==='pl'?plRow:lnRow).join('')).join('')}
 ${view==='pl'?`<tr class="tot"><td>Total</td><td>${rows.length} placements</td><td></td><td></td><td></td><td></td><td></td><td></td><td class="n">${money(total)}</td><td></td>${['imp','clk','lpv','views','leads'].map(k=>`<td class="n">${compact(sum(rows.map(r=>r[k])))}</td>`).join('')}<td class="n">${(()=>{const L=sum(rows.map(r=>r.leads));return L?money2(total/L):'—'})()}</td><td></td><td></td><td></td></tr>`
  :`<tr class="tot"><td>Total</td><td colspan="9">${rows.length} lines</td><td class="n">${money(total)}</td><td colspan="5"></td></tr>`}
 </tbody></table></div>`;
}
function renderCompare(){
 const Rs=[0,1,2].map(compute),Ts=Rs.map(totals),Fs=Rs.map(funnel);
 const plan=[['Budget',t=>money(t.budget)],['Channels',t=>t.channels],['Placements',t=>t.placements],['Markets',t=>t.markets],['BOM line items',t=>t.lines],['BOM creative masters',t=>t.masters],['Master files',t=>t.files.toLocaleString()]];
 const cost=[['Blended CPM','cpm'],['Blended cost per click','cpc'],['Blended cost per lead','cpl'],['Cost per MQL','cpmql'],['Cost per SQL','cpsql'],['CAC (media cost per customer)','cac']];
 const chs=CH.filter(c=>Rs.some(R=>R.lines.some(l=>l.c.id===c.id)));
 const chB=(R,c)=>sum(R.lines.filter(l=>l.c.id===c.id).map(l=>l.budget));
 const head=t=>`<thead><tr><th>${t}</th>${TIERNAME.map(n=>`<th class="n">${n}</th>`).join('')}</tr></thead>`;
 return `<div class="panel" style="display:flex;flex-direction:column;gap:16px"><div><div class="eyebrow">Side by side</div><h2 style="font-size:20px">Low vs Medium vs High</h2>
 <div class="note">Low runs the always-on core (LinkedIn, search, trade newsletters, China and Korea local platforms). Medium adds video, X, ABM, retargeting, lead gen and events. High adds Reddit, Shorts, conquest search, conversation ads, sponsored articles and podcasts.</div></div>
 <div><h3 style="font-size:14px;margin-bottom:6px">Plan</h3>
 <div class="tscroll"><table>${head('Metric')}<tbody>${plan.map(([n,f])=>`<tr><td>${n}</td>${Ts.map(t=>`<td class="n">${f(t)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>
 <div id="cmp-outcomes"><h3 style="font-size:14px;margin-bottom:6px">Outcomes</h3>
 <div class="tscroll"><table>${head('Estimated outcome')}<tbody>${FUNNEL.map(([k,n])=>`<tr><td>${n}</td>${Fs.map(o=>`<td class="n">${o[k]?compact(o[k]):'<span class="sub2">—</span>'}</td>`).join('')}</tr>`).join('')}
 ${cost.map(([n,k],i)=>`<tr${i?'':' class="costrow"'}><td><strong>${n}</strong></td>${Fs.map(o=>`<td class="n">${o[k]?money2(o[k]):'—'}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
 <div class="note" style="margin-top:6px">Each buy delivers what it's bought on (impressions for CPM, clicks for CPC, views for CPV, leads for CPL). Everything else is estimated with each channel's own B2B benchmarks (CTR, click-to-visit, visit-to-lead, lead-form completion, view rate; see the list on the Flighting tab), and reach = impressions ÷ 3.5 frequency. Flat-fee buys (events, sponsorships, newsletters) aren't counted.</div></div>
 <div><h3 style="font-size:14px;margin-bottom:6px">Channel budget</h3>
 <div class="tscroll"><table>${head('Channel')}<tbody>${chs.map(c=>`<tr><td>${esc(c.name)}</td>${Rs.map(R=>{const v=chB(R,c);return `<td class="n">${v?money(v):'<span class="sub2">—</span>'}</td>`}).join('')}</tr>`).join('')}<tr class="tot"><td>Total</td>${Rs.map(R=>`<td class="n">${money(sum(R.lines.map(l=>l.budget)))}</td>`).join('')}</tr></tbody></table></div></div></div>`;
}
const pct=v=>(+(v*100).toFixed(1))+'%';
const money2=v=>'$'+(v<10?v.toFixed(2):Math.round(v).toLocaleString('en-US'));
// Double-click to edit any text in the dashboard. Edits are saved per tab, keyed by the original text and its position among identical texts,
// so an edited number falls back to the live value once the inputs change it.
const TE_SEL='td,th,h1,h2,h3,h4,li,summary,label,p,.note,.k,.v,.sub2,.chip,.tierchip,.eyebrow,strong,.pv-h,.pv-main,.pv-lg div,#tabs button';
const teScope=el=>el.closest('#tabs')?'_tabs':UI.tier===3?'_compare':UI.tab;
const teOk=el=>el&&!el.querySelector('input,select,textarea,button:not(#tabs button),a')&&!el.closest('input,select,textarea,a');
function teKey(el){const root=el.closest('#tabs')||$('#view'),t=(el.dataset.orig??el.textContent).trim();let n=0;
 for(const x of root.querySelectorAll(TE_SEL)){if(x===el)break;if((x.dataset.orig??x.textContent).trim()===t)n++}return t+'#'+n}
function applyTextEdits(){for(const root of [$('#tabs'),$('#view')]){const seen={};
  root.querySelectorAll(TE_SEL).forEach(el=>{const t=el.textContent.trim();if(!t)return;const n=seen[t]=(seen[t]??-1)+1,E=(S.textEdits||{})[teScope(el)]||{},v=E[t+'#'+n];
   if(v!=null&&teOk(el)){el.dataset.orig=t;el.textContent=v;el.classList.add('te-edited');el.title='You edited this. Original: '+t}})}
 const E=(S.textEdits||{})[UI.tier===3?'_compare':UI.tab];$('#te-reset').hidden=!(E&&Object.keys(E).length)}
function teStart(el){if(el.isContentEditable)return;const key=teKey(el),scope=teScope(el),before=el.textContent;
 el.contentEditable='true';el.classList.add('te-on');el.focus();const r=document.createRange();r.selectNodeContents(el);const sel=getSelection();sel.removeAllRanges();sel.addRange(r);
 const done=keep=>{el.removeEventListener('blur',onBlur);el.removeEventListener('keydown',onKey);el.contentEditable='false';el.classList.remove('te-on');
  if(!keep){el.textContent=before;return}const v=el.textContent.trim(),orig=(el.dataset.orig??before).trim();S.textEdits=S.textEdits||{};const E=S.textEdits[scope]=S.textEdits[scope]||{};
  if(!v||v===orig){delete E[key];el.textContent=orig;el.classList.remove('te-edited');delete el.dataset.orig;el.removeAttribute('title')}else{E[key]=v;el.dataset.orig=orig;el.classList.add('te-edited');el.title='You edited this. Original: '+orig}
  save();$('#te-reset').hidden=!Object.keys(S.textEdits[UI.tier===3?'_compare':UI.tab]||{}).length};
 const onBlur=()=>done(true),onKey=e=>{if(e.key===' '&&el.tagName==='BUTTON'){e.preventDefault();document.execCommand('insertText',false,' ')}else if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();el.blur()}else if(e.key==='Escape'){e.preventDefault();done(false)}};
 el.addEventListener('blur',onBlur);el.addEventListener('keydown',onKey)}
document.addEventListener('dblclick',e=>{const el=e.target.closest&&e.target.closest(TE_SEL);if(!el||!el.closest('#view,#tabs')||!teOk(el))return;e.preventDefault();teStart(el)});
function renderOut(){_renderOut();applyTextEdits()}
function _renderOut(){
 renderSeg();
 const v=$('#view');
 if(UI.tier===3){v.innerHTML=renderCompare();$('#x-csv').disabled=true;syncBudgetFields();return}
 $('#x-csv').disabled=false;
 const R=compute(UI.tier);syncBudgetFields(R);
 if(!TABS.some(t=>t[0]===UI.tab))UI.tab='summary';
 v.innerHTML={assets:renderAssets,growth:renderGrowth,summary:renderSummary,bom:renderMVP,copy:renderAdCopy,lines:renderBOM,spec:renderSpec,flight:renderFlight,assump:renderAssump,tests:renderTests,tagging:renderTagging}[UI.tab](R);
 const tps=$('#tp-share');if(tps)tps.onchange=()=>{S.testShare=S.testShare||{};S.testShare[TIERS[UI.tier]]=Math.max(0,+tps.value||0);changed()};
 const tpl=$('#tp-lift');if(tpl)tpl.onchange=()=>{S.testLift=+tpl.value;changed()};
 if(UI.tab==='tests')wireTestBuilder();
 v.querySelectorAll('.g-in').forEach(el=>el.onchange=()=>{S.growth=S.growth||{};S.growth[el.dataset.k]=Math.max(0,+el.value||0);changed()});
 const gt=$('#g-goaltype');if(gt)gt.onchange=()=>{S.growth=S.growth||{};S.growth.goalType=gt.value;if(gt.value==='pipe'&&gr().goal<10000)S.growth.goal=3000000;if(gt.value!=='pipe'&&gr().goal>=10000)S.growth.goal=gt.value==='sql'?300:40;changed()};
 v.querySelectorAll('.pipe-in').forEach(el=>el.onchange=()=>{S.pipe=S.pipe||{};S.pipe[el.dataset.k]=Math.min(100,Math.max(0,+el.value||0))/100;changed()});
 const ld=$('#in-landing');if(ld)ld.onchange=()=>{S.landing=ld.value;save();renderOut()};
 v.querySelectorAll('.tr-in').forEach(el=>el.onchange=()=>{S.traffic=S.traffic||{};S.traffic[el.dataset.k]=el.value.trim();save();setTimeout(renderOut,0)});
 v.querySelectorAll('.cp-edit').forEach(el=>{const lim=+el.dataset.lim||0;const mark=()=>{const n=el.value.length,c=el.parentElement.querySelector('.cp-count');c.textContent=lim?n+'/'+lim:n+' chars';const o=lim&&n>lim;c.classList.toggle('over',!!o);el.classList.toggle('over',!!o)};mark();
  el.oninput=()=>{S.copyEdits=S.copyEdits||{};(S.copyEdits[el.dataset.lk]=S.copyEdits[el.dataset.lk]||{})[el.dataset.key]=el.value;mark();save()}});
 v.querySelectorAll('.cp-reset').forEach(b=>b.onclick=()=>{if(S.copyEdits)delete S.copyEdits[b.dataset.lk];save();renderOut()});
 const g=$('#grp');if(g)g.onchange=()=>{UI.group=g.value;save();renderOut()};
 if(UI.tab==='assets')wireAssets();
 if(UI.tab==='assump'){v.querySelectorAll('.aud-in').forEach(el=>el.onchange=()=>{S.plAud=S.plAud||{};if(el.value)S.plAud[el.dataset.pid]=el.value;else delete S.plAud[el.dataset.pid];changed()});
  v.querySelectorAll('.tgt-in').forEach(el=>el.onchange=()=>{S.plTgt=S.plTgt||{};S.plTgt[el.dataset.pid]=el.value;changed()});v.querySelectorAll('input[data-rt]').forEach(el=>el.onchange=()=>{S.rates[el.dataset.rt]=el.value===''?null:+el.value;changed()});
  v.querySelectorAll('[data-bdview]').forEach(b=>b.onclick=()=>{UI.bdView=b.dataset.bdview;save();renderOut()});
  const bg=$('#bd-grp');if(bg)bg.onchange=()=>{UI.bdGroup=bg.value;save();renderOut()};
  v.querySelectorAll('.cat-in').forEach(el=>el.onchange=()=>{S.cats=S.cats||{};const x=el.value.trim();if(x)S.cats[el.dataset.pid]=x;else delete S.cats[el.dataset.pid];save();setTimeout(renderOut,0)});
  $('#rates-reset').onclick=()=>{S.rates={};save();renderOut()};
  const R0=compute(UI.tier===3?1:UI.tier),T0=TIERS[R0.tier];
  CH.forEach(c=>c.pl.forEach(p=>{const el=$('#pb-'+p.id);if(!el)return;el.onchange=()=>{
   S.plPin=S.plPin||{};const pp=(S.plPin[T0]=S.plPin[T0]||{});const old=sum(R0.lines.filter(l=>l.p.id===p.id).map(l=>l.budget)),ct=sum(R0.lines.filter(l=>l.c.id===c.id).map(l=>l.budget));
   if(el.value===''){delete pp[p.id]}else{const x=Math.max(0,+el.value||0);pp[p.id]=x;const ch=S.channels[c.id];(ch.pin=ch.pin||{})[T0]=Math.round(ct-old+x);((S.plPinCh=S.plPinCh||{})[T0]=S.plPinCh[T0]||{})[c.id]=1}
   changed()}}));
  const pr=$('#pb-reset');if(pr)pr.onclick=()=>{if(S.plPin)delete S.plPin[T0];Object.keys(S.plPinCh?.[T0]||{}).forEach(id=>{if(S.channels[id]?.pin)delete S.channels[id].pin[T0]});if(S.plPinCh)delete S.plPinCh[T0];changed()}}
}

/* ==================== EXPORTS ==================== */
function tableToAOA(tb,tot){const a=[tb.cols.map(c=>c[0]),...tb.rows.map(r=>tb.cols.map(([,k])=>r[k]))];
 if(tot&&tb.rows.length)a.push(tb.cols.map(([,k],i)=>tot.includes(k)?Math.round(sum(tb.rows.map(r=>+r[k]||0))):i===0?'Total':''));return a}
function summaryAOA(R){const t=totals(R),s=summaryRows(R),o=funnel(R);const a=[[S.name],[S.product],['Version',TIERNAME[R.tier]],['Flight',S.start+' to '+S.end],['Total budget',Math.round(t.budget)],['Line items',t.lines],['BOM creative masters',R.masters.length],['Master files',t.files],[],['OUTCOMES (estimated)'],...FUNNEL.map(([k,n])=>[n,Math.round(o[k])]),['Blended CPM',+o.cpm.toFixed(2)],['Blended cost per click',+o.cpc.toFixed(2)],['Blended cost per lead',+o.cpl.toFixed(2)],['Cost per MQL',+o.cpmql.toFixed(2)],['Cost per SQL',+o.cpsql.toFixed(2)],['CAC (media cost per customer)',+o.cac.toFixed(2)],['Pipeline rates','Lead→MQL '+pct(pipe().mql)+', MQL→SQL '+pct(pipe().sql)+', SQL→won '+pct(pipe().win)],[]];
 [['By channel',s.byChannel],['By market',s.byMarket],['By initiative',s.byIni],['By funnel stage',s.byStage]].forEach(([n,e])=>{a.push([n,'Budget','Share']);e.forEach(([k,v])=>a.push([k,Math.round(v),+(v/t.budget).toFixed(4)]));a.push(['Total',Math.round(sum(e.map(x=>x[1]))),+(sum(e.map(x=>x[1]))/t.budget).toFixed(4)],[])});return a}
function addSheet(wb,name,aoa,widths){const ws=XLSX.utils.aoa_to_sheet(aoa);if(widths)ws['!cols']=widths.map(w=>({wch:w}));XLSX.utils.book_append_sheet(wb,ws,name.slice(0,31))}
function workbookFor(tiers){
 const wb=XLSX.utils.book_new();
 const many=tiers.length>1;
 if(many){const Rs=[0,1,2].map(compute),Ts=Rs.map(totals),Fs=Rs.map(funnel);addSheet(wb,'Compare',[['PLAN',...TIERNAME],['Budget',...Ts.map(t=>Math.round(t.budget))],['Channels',...Ts.map(t=>t.channels)],['Placements',...Ts.map(t=>t.placements)],['Markets',...Ts.map(t=>t.markets)],['Line items',...Ts.map(t=>t.lines)],['BOM creative masters',...Rs.map(R=>R.masters.length)],['Master files',...Ts.map(t=>t.files)],[],['OUTCOMES (estimated)',...TIERNAME],...FUNNEL.map(([k,n])=>[n,...Fs.map(o=>Math.round(o[k]))]),['Blended CPM',...Fs.map(o=>+o.cpm.toFixed(2))],['Blended cost per click',...Fs.map(o=>+o.cpc.toFixed(2))],['Blended cost per lead',...Fs.map(o=>+o.cpl.toFixed(2))]],[34,14,14,14])}
 tiers.forEach(ti=>{const R=compute(ti),p=many?TIERNAME[ti]+' ':'';
  addSheet(wb,p+'Summary',summaryAOA(R),[40,14,10]);
  addSheet(wb,p+'BOM',tableToAOA(mvpTable(R),['masterFiles','adapt','totalFiles']),[8,22,26,80,80,30,60,8,12,12,9,9,12,10,10,12,60,36,30,14,11]);
  addSheet(wb,p+'Ad Copy',adCopyAOA(R),[18,16,26,8,24,80,10,8,8,60]);
  addSheet(wb,p+'Line Items',tableToAOA(bomTable(R),['budget']),[6,9,30,40,13,16,18,36,30,14,8,40,50,32,50,8,16,11,12,11,30,30,16,11,16]);
  addSheet(wb,p+'Creative Spec Sheet',tableToAOA(specTable(R)),[20,30,40,50,24,16,24,60,40,50,24,12,10,10]);
  addSheet(wb,p+'Flighting & Outcomes',flightAOA(R),[30]);addSheet(wb,p+'Growth Plan',growthAOA(R),[34,16]);if((S.assets||[]).length)addSheet(wb,p+'Assets',assetsAOA(),[30,40,40,16,14,14,20,24]);
  addSheet(wb,p+'Test Plan',testAOA(R),[6,14,60,16,36,16,18,40,10,18,16,22,10,10,14,18,60,12,11,50,30]);
  addSheet(wb,p+'Buy Details',tableToAOA(assumptionTable(R),['budget','n','imp','clk','lpv','views','leads']),[24,44,10,8,10,12,12,12,12,40,6,10,13,40]);
  addSheet(wb,p+'Agency Tags - Pixels',tableToAOA(pixelTable(R)),[24,50,40,44,44,30,6]);
  addSheet(wb,p+'Workback',[['When','Due','Task','Owner'],...workback().map(w=>[w.days,w.due,w.task,w.owner])],[8,12,60,10]);
  {const g=geoBudget(R);addSheet(wb,p+'Budget by Market',[['Market','Channels','Lines','Budget'],...g.rows.map(r=>[r.market,r.ch,r.lines,Math.round(r.budget)]),['Grand total','',R.lines.length,Math.round(g.total)]],[24,60,8,14])}
  addSheet(wb,p+'Agency Trafficking',tableToAOA(utmTable(R)),[6,22,36,14,6,14,70,80,40,60,40,12,16,30,22,14,90,30,11]);
 });
 return wb;
}
function slug(){return (S.name||'media-plan').replace(/[^a-z0-9]+/gi,'-').replace(/^-|-$/g,'').slice(0,60)||'media-plan'}
window.__exportWorkbookB64=(all)=>XLSX.write(workbookFor(all?[0,1,2]:[UI.tier===3?1:UI.tier]),{type:'base64',bookType:'xlsx'});
function currentTable(){const R=compute(UI.tier);return {summary:()=>({cols:[['A','a'],['B','b'],['C','c']],rows:summaryAOA(R).map(r=>({a:r[0],b:r[1],c:r[2]})),raw:true}),bom:()=>mvpTable(R),lines:()=>bomTable(R),tagging:()=>utmTable(R),spec:()=>specTable(R),flight:()=>{const a=flightAOA(R),w=Math.max(...a.map(r=>r.length));return {cols:Array.from({length:w},(_,i)=>['',i]),rows:a.map(r=>Object.fromEntries(r.map((v,i)=>[i,v]))),aoa:a}},assump:()=>(UI.bdView==='line'?bomTable(R):assumptionTable(R)),assets:()=>{const a=assetsAOA(),w=a[0].length;return {cols:Array.from({length:w},(_,i)=>['',i]),rows:a.map(r=>Object.fromEntries(r.map((v,i)=>[i,v]))),aoa:a}},growth:()=>{const a=growthAOA(R),w=Math.max(...a.map(r=>r.length));return {cols:Array.from({length:w},(_,i)=>['',i]),rows:a.map(r=>Object.fromEntries(r.map((v,i)=>[i,v]))),aoa:a}},tests:()=>{const a=testAOA(R),w=Math.max(...a.map(r=>r.length));return {cols:Array.from({length:w},(_,i)=>['',i]),rows:a.map(r=>Object.fromEntries(r.map((v,i)=>[i,v]))),aoa:a}},copy:()=>{const a=adCopyAOA(R),w=Math.max(...a.map(r=>r.length));return {cols:Array.from({length:w},(_,i)=>['',i]),rows:a.map(r=>Object.fromEntries(r.map((v,i)=>[i,v]))),aoa:a}}}[UI.tab]()}
function toDelim(tb,d){const q=v=>{v=v==null?'':String(v);return d===','&&/[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v.replace(/\t|\n/g,' ')};
 const rows=tb.aoa?tb.aoa:tb.raw?tb.rows.map(r=>[r.a,r.b,r.c]):[tb.cols.map(c=>c[0]),...tb.rows.map(r=>tb.cols.map(([,k])=>r[k]))];return rows.map(r=>r.map(q).join(d)).join('\n')}
function setStatus(sel,msg,err){const el=$(sel);el.textContent=msg;el.classList.toggle('err',!!err)}
let DL=null;
async function saveFile(filename,data){
 if(!DL){ // standalone site (e.g. GitHub Pages): plain browser download
  try{const blob=data instanceof Blob?data:new Blob([data],{type:/\.csv$/.test(filename)?'text/csv;charset=utf-8':'application/octet-stream'});
   const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1000);setStatus('#x-status','Downloaded '+filename)}
  catch(e){setStatus('#x-status','Downloads are not available here. Use “Copy table” and paste into a sheet.',true)}return}
 try{await DL.save({filename,data});setStatus('#x-status','Saved '+filename)}catch(e){setStatus('#x-status',e&&e.code==='declined'?'Download cancelled.':'Could not save the file ('+(e&&e.code||'error')+').',e&&e.code!=='declined')}
}
$('#x-xlsx').onclick=()=>{if(!window.XLSX)return setStatus('#x-status','The spreadsheet library did not load. Reload the page and try again.',true);const ti=UI.tier===3?1:UI.tier;
 saveFile(`${slug()}-${TIERS[ti]}-paid-media-bom.xlsx`,XLSX.write(workbookFor([ti]),{type:'array',bookType:'xlsx'}))};
$('#x-all').onclick=()=>{if(!window.XLSX)return setStatus('#x-status','The spreadsheet library did not load. Reload the page and try again.',true);
 saveFile(`${slug()}-all-versions-paid-media-bom.xlsx`,XLSX.write(workbookFor([0,1,2]),{type:'array',bookType:'xlsx'}))};
$('#x-csv').onclick=()=>saveFile(`${slug()}-${TIERS[UI.tier]}-${UI.tab}.csv`,toDelim(currentTable(),','));
$('#x-refresh').onclick=()=>{save();renderInputs();renderOut();setStatus('#x-status','Refreshed. Every number was recalculated from your inputs at '+new Date().toLocaleTimeString([], {hour:'numeric',minute:'2-digit'})+'.')};
$('#te-reset').onclick=()=>{if(S.textEdits)delete S.textEdits[UI.tier===3?'_compare':UI.tab];save();renderOut();setStatus('#x-status','Text edits on this tab were undone.')};
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&!document.activeElement?.isContentEditable)renderOut()});
$('#x-copy').onclick=()=>{const txt=UI.tier===3?'':toDelim(currentTable(),'\t');
 navigator.clipboard.writeText(txt).then(()=>setStatus('#x-status','Copied. Paste into Excel or Google Sheets.')).catch(()=>{const ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');setStatus('#x-status','Copied. Paste into Excel or Google Sheets.')}catch(e){setStatus('#x-status','Copy was blocked here.',true)}ta.remove()})};

/* ==================== DOC UPLOAD + EXTRACTION ==================== */
let BUSY_T=null;function runBusy(txt){const b=$('#btn-upload'),t=$('#btn-upload-t');clearTimeout(BUSY_T);b.classList.remove('done');
 if(txt===false){b.classList.remove('busy');b.removeAttribute('aria-busy');t.textContent='Upload GTM doc';return}
 if(txt==='done'){b.classList.remove('busy');b.removeAttribute('aria-busy');b.classList.add('done');t.textContent='✓ Inputs filled';BUSY_T=setTimeout(()=>runBusy(false),2500);return}
 b.classList.add('busy');b.setAttribute('aria-busy','true');t.textContent=txt}
$('#btn-upload').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('#in-file').click()}};
$('#in-brief').addEventListener('paste',()=>setTimeout(()=>{S.brief=$('#in-brief').value;save();if(S.brief.trim().length>=200)runExtract()},50));
$('#in-file').onchange=async e=>{const f=e.target.files[0];if(!f)return;setStatus('#extract-status','Reading '+f.name+'…');runBusy('Reading '+f.name+'…');
 try{let text;PDF=null;
  if(/\.pdf$/i.test(f.name)||f.type==='application/pdf'){const buf=await f.arrayBuffer();const r=await pdfRead(buf);PDF={name:f.name,buf,pageChars:r.pageChars,b64:b64(buf),text:r.text.replace(/\n{3,}/g,'\n\n').trim(),pages:r.pages};text=PDF.text;
   if(text.length<40){S.brief='';$('#in-brief').value='';save();
    e.target.value='';if(agentOn()||SAMPLE)return runExtract();runBusy(false);
    return setStatus('#extract-status',`${f.name} has no selectable text (it may be scanned). Connect an AI agent below so it can read the pages, or paste the text.`,true)}}
  else if(/\.docx$/i.test(f.name)){if(!window.mammoth)throw new Error('Word reader did not load');const r=await mammoth.extractRawText({arrayBuffer:await f.arrayBuffer()});text=r.value}
  else text=await f.text();
  S.brief=text.replace(/\n{3,}/g,'\n\n').trim();$('#in-brief').value=S.brief;save();
  e.target.value='';return runExtract()}
 catch(err){runBusy(false);setStatus('#extract-status','Could not read that file: '+err.message,true)}e.target.value=''};

const MKT_RULES=[['NA',/north america|\bus\b|\busa\b|united states|canada/i,'North America','EN'],['EMEA',/emea|europe|\buk\b|turkey|germany|france|middle east/i,'EMEA','EN'],['CN',/china|chinese|mainland/i,'China','ZH'],['JP',/japan/i,'Japan','JA'],['KR',/korea/i,'Korea','KO'],['SEA',/southeast asia|\bsea\b|vietnam|indonesia|thailand|philippines|singapore/i,'Southeast Asia','EN'],['LATAM',/latam|latin america|brazil|mexico/i,'LATAM','ES']];
const CH_RULES={linkedin:/linkedin/i,meta:/\bmeta\b|facebook|instagram/i,google:/google search|paid search|\bsem\b|search ads|llm search|organic search/i,x:/\bx \(twitter\)|twitter|\bx\b/i,reddit:/reddit/i,youtube:/youtube|video series|video testimonial/i,trade:/dark reading|cso online|securityweek|techtarget|trade press|industry press/i,creators:/podcast|newsletter|influencer|creator/i,abm:/abm|account[- ]based|target account/i,events:/\brsac\b|black hat|conference|summit|event/i,wechat:/wechat|china/i,baidu:/baidu|china/i,naver:/naver|korea/i};
function applyExtract(x){
 const changes=[];
 if(x.campaignName){S.name=x.campaignName;changes.push('name')}
 if(x.product){S.product=x.product;changes.push('product')}
 if(Array.isArray(x.markets)&&x.markets.length){
  const nm=[];x.markets.forEach(m=>{const name=String(m.name||'');let w=+m.weight||10;
   if(/^apac$|asia[- ]pacific/i.test(name)){['CN','JP','KR','SEA'].forEach(id=>{const r=MKT_RULES.find(r=>r[0]===id);nm.push({id,name:r[2],lang:r[3],on:true,weight:Math.round(w/4)})});return}
   const r=MKT_RULES.find(r=>r[1].test(name));const id=r?r[0]:'M'+nm.length+Date.now();
   const ex=nm.find(q=>q.id===id);if(ex){ex.weight+=w;return}
   nm.push({id,name:r?r[2]:name,lang:r?r[3]:(m.language||'EN').toUpperCase().slice(0,5),on:true,weight:w})});
  MKT_RULES.forEach(r=>{if(!nm.find(q=>q.id===r[0]))nm.push({id:r[0],name:r[2],lang:r[3],on:false,weight:5})});
  S.markets=nm;changes.push(nm.filter(m=>m.on).length+' markets')}
 // audiences: reset to generic roles, then fill from the doc
 S.personas=blankPersonas();
 if(Array.isArray(x.personas))x.personas.forEach(p=>{if(!p.label)return;if(['dm','tech','user'].includes(p.role)){S.personas[p.role].label=p.label;S.personas[p.role].on=true}else S.personas['c'+Math.random().toString(36).slice(2,8)]={label:p.label,on:true,custom:true}});
 if(Array.isArray(x.personas)&&x.personas.length)changes.push('audiences');
 // initiatives and launch moments come only from the doc; none found leaves them blank to fill in
 S.initiatives=(Array.isArray(x.initiatives)?x.initiatives:[]).filter(i=>i&&i.name).slice(0,6).map(i=>({name:String(i.name),stage:STAGE[i.stage]?i.stage:'Consideration',pillar:i.pillar||''}));
 changes.push(S.initiatives.length?S.initiatives.length+' initiatives':'no initiatives found (add them in section 5)');
 S.moments=(Array.isArray(x.moments)?x.moments:[]).filter(m=>m&&/^\d{4}-\d{2}$/.test(m.month||'')).map(m=>({name:m.name||'Milestone',month:m.month,type:['launch','event','content'].includes(m.type)?m.type:'launch',ini:+m.initiative||0}));
 changes.push(S.moments.length?S.moments.length+' launch moments':'no dated milestones found (add them in section 6)');
 if(Array.isArray(x.channels)&&x.channels.length){CH.forEach(c=>{S.channels[c.id].on=x.channels.includes(c.id)});
  // local platforms follow their market
  if(S.markets.find(m=>m.id==='CN'&&m.on)){S.channels.wechat.on=true;S.channels.baidu.on=true}if(S.markets.find(m=>m.id==='KR'&&m.on))S.channels.naver.on=true;
  S.channels.linkedin.on=true;changes.push(CH.filter(c=>S.channels[c.id].on).length+' channels')}
 if(/^\d{4}-\d{2}-\d{2}$/.test(x.flightStart||'')){S.start=x.flightStart;changes.push('flight')}
 if(/^\d{4}-\d{2}-\d{2}$/.test(x.flightEnd||''))S.end=x.flightEnd;
 if(+x.budget>0){S.budgets={lean:Math.round(x.budget*0.45/1000)*1000,standard:Math.round(+x.budget),full:Math.round(x.budget*1.75/1000)*1000};changes.push('budgets')}
 return changes;
}
// keyword-scan helpers: numbered / bulleted items under an "initiatives" heading, and dated milestones
function scanList(text,head){const out=[];let on=false;
 for(const raw of text.split('\n')){const s=raw.trim();if(!s){if(out.length)on=false;continue}
  const item=s.match(/^(?:\d+[.)]|[-•*▪●])\s*(.+)$/);
  if(!item&&head.test(s)&&s.length<140){on=true;const after=s.split(/:\s*/).slice(1).join(': ');if(after&&/;/.test(after))after.split(/;\s*/).forEach(a=>a.trim()&&out.push(a.trim()));continue}
  if(on){if(item)out.push(item[1]);else if(out.length)on=false}}
 return out}
const guessStage=t=>/brand|awareness|perception|narrative|reputation|thought leader/i.test(t)?'Awareness':/adopt|cross-sell|upsell|convert|revenue|sales|pipeline|acquisition|signup|sign-up|trial/i.test(t)?'Conversion':'Consideration';
function scanInitiatives(text){
 return scanList(text,/initiatives?|strategic (pillars?|priorities)|priorities|objectives|pillars/i).slice(0,6).map(t=>{
  const [n,...rest]=t.split(/:\s+|\s+[–—-]\s+/);const name=n.replace(/["“”]/g,'').trim().slice(0,100);const pillar=rest.join(': ').split(/(?<=\.)\s|KPIs?:/i)[0].trim().slice(0,160);
  return {name,stage:guessStage(name)!=='Consideration'?guessStage(name):guessStage(t),pillar}}).filter(i=>i.name.length>2)}
const MONTHS_RE=/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\.?\b/i;
function scanMoments(text,yr){const out=[];
 text.split('\n').filter(l=>/launch|calendar|milestone|roadmap|timeline|key dates|release|go-live|event/i.test(l)).forEach(l=>{
  l.replace(/^[^:]{0,40}:\s*/,'').split(/;\s*|\s+·\s+/).forEach(seg=>{
   const mm=seg.match(MONTHS_RE),q=seg.match(/\bQ([1-4])\b/i),y=(seg.match(/\b(20\d\d)\b/)||[])[1]||yr;if(!mm&&!q)return;
   const mi=mm?['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'].indexOf(mm[1].toLowerCase().slice(0,3)):(+q[1]-1)*3;
   seg=seg.split(/\.\s+(?=[A-Z])/)[0];const name=seg.replace(/\b(Q[1-4](\s*\/\s*Q[1-4])?|H[12])\b[\s\/-]*/gi,'').replace(new RegExp(MONTHS_RE.source+'(\\s*\\/\\s*'+MONTHS_RE.source.slice(2,-2)+'[a-z]*)?','gi'),'').replace(/\b20\d\d\b/g,'').replace(/^[\s:,–—-]+|[\s:,–—-]+$/g,'').replace(/\s{2,}/g,' ').trim();
   if(name.length<3)return;
   out.push({name:name.slice(0,90),month:`${y}-${String(mi+1).padStart(2,'0')}`,type:/summit|conference|expo|rsac|event|meetup|webinar|show\b/i.test(name)?'event':/report|video|newsletter|series|guide|ebook|whitepaper|content/i.test(name)?'content':'launch',initiative:0})})});
 return out.slice(0,24)}
function localExtract(text){
 const x={markets:[],channels:[]};
 MKT_RULES.forEach(r=>{const n=(text.match(new RegExp(r[1].source,'gi'))||[]).length;if(n)x.markets.push({name:r[2],weight:n})});
 if(/\bapac\b/i.test(text)&&!x.markets.some(m=>['China','Japan','Korea'].includes(m.name)))x.markets.push({name:'APAC',weight:4});
 const tot=sum(x.markets.map(m=>m.weight));x.markets.forEach(m=>m.weight=Math.max(5,Math.round(m.weight/tot*100)));
 for(const k in CH_RULES)if(CH_RULES[k].test(text))x.channels.push(k);
 const first=text.split('\n').map(s=>s.trim()).find(s=>s.length>3&&s.length<90);if(first)x.campaignName=first;
 x.initiatives=scanInitiatives(text);x.moments=scanMoments(text,(S.start||'2026').slice(0,4));
 return x;
}
let SAMPLE=null;
const PDFJS_WORKER='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

/* ==================== HERO PEP TALK ==================== */
const CHEERS=['You make work suck less. 🙌','Your media plan is so balanced it does yoga. 🧘','Somewhere a CFO just smiled at your CPL. 😌','You + this BOM = the agency’s favorite brief. 💌','Spreadsheets fear you. Respectfully. 📊','Your UTMs are cleaner than my kitchen. 🧼','Reminder: you are more than your CTR. But also, nice CTR. ✨','That budget isn’t going to allocate itself. Oh wait, it is. 🤖','Creative due dates? You eat those for breakfast. 🥞','You put the “fun” in funnel. 🎢','Legend has it your media plans never need a v2. 🏆','Coffee count: high. Brilliance: higher. ☕','Plot twist: the algorithm is a fan of yours. 💅','You are the A in every A/B test. 🅰️','Go ahead, flex that blended CPM. 💪'];
let cheerI=Math.floor(Math.random()*CHEERS.length);
function showCheer(t){const el=$('#cheer-t');if(el)el.textContent=t}
async function newCheer(useAI){
 if(useAI&&aiReady()){try{const x=await aiJSON(`Write one short, funny, warm line of encouragement for a B2B paid media marketer opening their media planning dashboard${S.name?` for "${S.name}"`:''}. Playful, workplace-safe, under 80 characters, ending with exactly one fitting emoji. In the spirit of "You make work suck less. 🙌". Don't repeat: ${CHEERS[cheerI]}. Reply with only JSON: {"line": string}`);
   if(x&&typeof x.line==='string'&&x.line.trim().length>4&&x.line.length<140)return showCheer(x.line.trim())}catch(e){}}
 cheerI=(cheerI+1)%CHEERS.length;showCheer(CHEERS[cheerI])}
showCheer(CHEERS[cheerI]);
$('#cheer-new').onclick=()=>newCheer(true);$('#spider').onclick=()=>newCheer(true);
/* ==================== AI AGENT ====================
   Two ways to reach Claude: the built-in one when this page runs inside Claude (SAMPLE),
   or the viewer's own Anthropic API key, which also reads PDFs natively (layout, tables, scans). */
const AGENT_LS='paid-media-bom-agent';
let AGENT=null;try{AGENT=JSON.parse(localStorage.getItem(AGENT_LS)||'null')}catch(e){AGENT=null}
let PDF=null; // {name,b64,text,pages} of the last uploaded PDF, kept in memory only
const AGENT_MODELS=[['claude-opus-5-5','Claude Opus 5.5 (best)'],['claude-sonnet-5-5','Claude Sonnet 5.5 (faster)'],['claude-haiku-5-5','Claude Haiku 5.5 (cheapest)']];
const agentOn=()=>!SAMPLE&&!!(AGENT&&AGENT.key);
if(AGENT&&!AGENT.provider)AGENT.provider='anthropic';
const aiReady=()=>agentOn()||!!SAMPLE;
const aiLabel=()=>agentOn()?(AGENT.provider==='gemini'?'Gemini':'Your AI agent'):'Claude';
// Page images for the built-in Claude: scanned or chart-heavy pages first, up to the view's image limit.
async function pdfImages(pdf){
 const lim=await SAMPLE.limits().catch(()=>null);const max=lim&&lim.images&&lim.images.maxCount;if(!max||!window.pdfjsLib)return null;
 const order=pdf.pageChars.map((c,i)=>[c,i+1]).sort((a,b)=>(a[0]>=400)-(b[0]>=400)||a[1]-b[1]).slice(0,max).map(x=>x[1]).sort((a,b)=>a-b);
 if(pdf.pageChars.every(c=>c>=400)&&pdf.pages>max)order.splice(0,order.length,...Array.from({length:Math.min(max,pdf.pages)},(_,i)=>i+1));
 const doc=await pdfjsLib.getDocument({data:new Uint8Array(pdf.buf.slice(0))}).promise;const blobs=[];
 for(const n of order){const pg=await doc.getPage(n);const v1=pg.getViewport({scale:1});const sc=Math.min(2,Math.sqrt(1.2e6/(v1.width*v1.height)));
  const v=pg.getViewport({scale:sc});const c=document.createElement('canvas');c.width=Math.round(v.width);c.height=Math.round(v.height);
  const g=c.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,c.width,c.height);await pg.render({canvasContext:g,viewport:v}).promise;
  blobs.push(await new Promise(r=>c.toBlob(r,'image/jpeg',.85)))}
 return {blobs,pages:order};
}
function pdfForBrief(){return PDF&&(agentOn()||SAMPLE)&&(!PDF.text.trim()||(S.brief||'').trim()===PDF.text.trim())?PDF:null}
async function aiJSON(prompt,{pdf}={}){
 if(SAMPLE){const imgs=pdf?await pdfImages(pdf):null;
  if(imgs)return SAMPLE.json(`${imgs.pages.length>1?`The ${imgs.pages.length} images are pages ${imgs.pages.join(', ')}`:`The image is page ${imgs.pages[0]}`} of the GTM strategy PDF${imgs.pages.length<pdf.pages?` (of ${pdf.pages})`:''}, rendered as pictures. Read their text, tables and charts as part of the doc.\n\n`+prompt,{modelTier:'default',images:imgs.blobs});
  return SAMPLE.json(prompt,{modelTier:'default'})}
 if(agentOn())return agentJSON(prompt,pdf);
 throw {code:'no_agent'};
}
async function agentJSON(prompt,pdf){
 if(AGENT.provider==='gemini')return geminiJSON(prompt,pdf);
 const content=[];
 if(pdf)content.push({type:'document',source:{type:'base64',media_type:'application/pdf',data:pdf.b64},title:pdf.name});
 content.push({type:'text',text:pdf?'The attached PDF is the GTM strategy doc. Read all of it, including tables and charts.\n\n'+prompt:prompt});
 const body={model:AGENT.model||AGENT_MODELS[0][0],max_tokens:16000,output_config:{effort:'medium'},messages:[{role:'user',content}]};
 const fb=/^claude-(opus|sonnet)-5-5$/.test(body.model);if(fb)body.fallbacks='default';
 let r;
 try{r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:Object.assign({'content-type':'application/json','x-api-key':AGENT.key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},fb?{'anthropic-beta':'server-side-fallback-2026-07-01'}:{}),body:JSON.stringify(body)})}
 catch(e){throw {code:'agent_network',message:'Could not reach api.anthropic.com from this browser.'}}
 const j=await r.json().catch(()=>({}));
 if(!r.ok){const m=(j.error&&j.error.message)||('HTTP '+r.status);
  throw {code:r.status===401||r.status===403?'agent_key':r.status===429?'rate_limited':r.status===413?'agent_too_big':'agent_error',message:m}}
 if(j.stop_reason==='refusal')throw {code:'agent_refusal',message:'The model declined this request.'};
 return parseReply((j.content||[]).filter(b=>b.type==='text').map(b=>b.text).join(''));
}
function parseReply(t){
 const m=String(t||'').match(/[\[{][\s\S]*[\]}]/);if(!m)throw {code:'agent_bad_reply',message:'The reply was not JSON.'};
 try{return JSON.parse(m[0])}catch(e){throw {code:'agent_bad_reply',message:'The reply was not valid JSON.'}}
}
/* Gemini (Google AI Studio key, free tier available). PDFs go in whole as inline data. */
const GEM='https://generativelanguage.googleapis.com/v1beta';
function gemErr(r,j){const m=(j.error&&j.error.message)||('HTTP '+r.status);const s=j.error&&j.error.status;
 return {code:r.status===429||s==='RESOURCE_EXHAUSTED'?'rate_limited':/API key|API_KEY/i.test(m)||r.status===401||r.status===403?'agent_key':r.status===413?'agent_too_big':'agent_error',message:m}}
async function geminiJSON(prompt,pdf,tried=[]){
 const parts=[];
 if(pdf)parts.push({inline_data:{mime_type:'application/pdf',data:pdf.b64}});
 parts.push({text:pdf?'The attached PDF is the GTM strategy doc. Read all of it, including tables and charts.\n\n'+prompt:prompt});
 let r;
 try{r=await fetch(`${GEM}/models/${encodeURIComponent(AGENT.model||((AGENT.models||[])[0]||['gemini-flash-latest'])[0])}:generateContent`,{method:'POST',headers:{'content-type':'application/json','x-goog-api-key':AGENT.key},
  body:JSON.stringify({contents:[{role:'user',parts}],generationConfig:{responseMimeType:'application/json',maxOutputTokens:16000}})})}
 catch(e){throw {code:'agent_network',message:'Could not reach Google’s Gemini API from this browser.'}}
 const j=await r.json().catch(()=>({}));
 if(!r.ok){
  // Retired or unknown model: switch to the one Google suggests, else the next listed one, and retry (up to 3 times).
  const msg=(j.error&&j.error.message)||'';const cur=AGENT.model;
  if((r.status===404||r.status===400)&&/no longer available|not found|not supported|deprecated|retired|update your code/i.test(msg)&&tried.length<3){
   const done=[...tried,cur];const sug=[...msg.matchAll(/models\/(gemini[\w.-]*\w)/g)].map(m=>m[1]).filter(m=>!done.includes(m));
   const next=sug.pop()||((AGENT.models||[]).map(m=>m[0]).find(m=>!done.includes(m)));
   if(next){AGENT.model=next;if(AGENT.models&&!AGENT.models.some(m=>m[0]===next))AGENT.models.unshift([next,next]);
    try{localStorage.setItem(AGENT_LS,JSON.stringify(AGENT))}catch(e){}renderAgent();return geminiJSON(prompt,pdf,done)}
  }
  throw gemErr(r,j);
 }
 const c=(j.candidates||[])[0];
 if(!c)throw {code:'agent_refusal',message:'Gemini returned no answer'+(j.promptFeedback&&j.promptFeedback.blockReason?' ('+j.promptFeedback.blockReason+')':'')};
 return parseReply(((c.content&&c.content.parts)||[]).filter(p=>p.text&&!p.thought).map(p=>p.text).join(''));
}
async function geminiModels(key){
 const r=await fetch(`${GEM}/models?pageSize=200`,{headers:{'x-goog-api-key':key}});const j=await r.json().catch(()=>({}));
 if(!r.ok)throw gemErr(r,j);
 const ms=(j.models||[]).filter(m=>(m.supportedGenerationMethods||[]).includes('generateContent')&&/gemini/i.test(m.name)&&!/embed|image|tts|audio|live|vision-only/i.test(m.name))
  .map(m=>[m.name.replace(/^models\//,''),m.displayName||m.name]);
 const rank=id=>(/flash/.test(id)&&!/lite/.test(id)?0:/pro/.test(id)?1:/lite/.test(id)?2:3)+(/preview|exp/.test(id)?4:0)+(/latest/.test(id)?0.5:0);
 return ms.sort((a,b)=>rank(a[0])-rank(b[0])||b[0].localeCompare(a[0],undefined,{numeric:true}));
}
function aiErr(e,what){
 const c=e&&e.code;const who=agentOn()&&AGENT.provider==='gemini'?'Gemini':'The AI agent';
 if(c==='agent_key')return 'Your API key was rejected. Check it under “AI agent”.';
 if(c==='rate_limited')return who+' is busy or over its free quota. Wait a minute and try again.';
 if(c==='agent_too_big')return 'That PDF is too large for the agent. Try a smaller file.';
 if(c==='agent_network'||c==='agent_refusal'||c==='agent_bad_reply'||c==='agent_error')return what+' failed: '+(e.message||c)+'.';
 return what+' failed'+(c?' ('+c+')':'')+'. Try again, or shorten the text to the key sections.';
}
const PROV={gemini:{label:'Google Gemini',key:'Gemini API key',ph:'AIza… or AQ.…',test:/^[\w.-]{20,}$/,bad:'That does not look like a Gemini API key. Copy it with the “Copy key” button in AI Studio.',
  note:'Get a free key at aistudio.google.com → Get API key. The free tier has daily limits, and Google may use free-tier prompts to improve its products, so avoid confidential docs there.'},
 anthropic:{label:'Anthropic Claude',key:'Anthropic API key',ph:'sk-ant-…',test:/^sk-ant-/,bad:'That does not look like an Anthropic API key (it starts with sk-ant-).',
  note:'Create a key at console.anthropic.com → API keys. Usage is billed to that account.'}};
const provNow=()=>agentOn()?AGENT.provider||'anthropic':$('#agent-prov').value||'gemini';
function modelOpts(p){return p==='gemini'?((agentOn()&&AGENT.provider==='gemini'&&AGENT.models)||[['','Newest Flash (picked when you connect)']]):AGENT_MODELS}
function renderAgent(){
 const on=agentOn(),p=provNow(),P=PROV[p];
 $('#agent-chip').textContent=SAMPLE?'Your Claude account':on?(p==='gemini'?'Gemini connected':'Claude connected'):'Not connected';
 $('#agent-chip').classList.toggle('on',on||!!SAMPLE);
 $('#agent-prov').value=p;$('#agent-prov').disabled=on;
 $('#agent-key-l').firstChild.textContent=P.key;
 $('#agent-key').value='';$('#agent-key').placeholder=on?'Key saved (…'+AGENT.key.slice(-4)+')':P.ph;
 const ms=modelOpts(p),cur=on&&AGENT.model||ms[0][0];
 $('#agent-model').innerHTML=ms.map(([v,l])=>`<option value="${v}"${cur===v?' selected':''}>${esc(l)}</option>`).join('');
 $('#agent-off').hidden=!on;$('#agent-share').hidden=!on;$('#agent-note').textContent='The key is saved only in this browser and is sent only to '+(p==='gemini'?'Google (generativelanguage.googleapis.com)':'api.anthropic.com')+'. '+P.note;
 document.querySelectorAll('#d-agent .agent-body>:not(#agent-msg)').forEach(el=>el.hidden=!!SAMPLE);
 const mn=(ms.find(m=>m[0]===cur)||[cur,cur])[1];
 $('#agent-msg').textContent=on?`Connected to ${mn}. Uploaded PDFs go to the agent whole, so it reads tables, charts and scanned pages.`
  :SAMPLE?'Claude is built in here and runs on your Claude account, so no key is needed. Uploaded PDFs are sent as text plus page images, so tables, charts and scanned pages are read too.'
  :'Connect an AI agent to read the brief and PDFs and draft the ad copy. Gemini has a free key; Claude needs a paid Anthropic key. Without one, a keyword scan fills the inputs.';
}
async function pdfRead(buf){
 if(!window.pdfjsLib)throw new Error('PDF reader did not load');
 pdfjsLib.GlobalWorkerOptions.workerSrc=PDFJS_WORKER;
 const doc=await pdfjsLib.getDocument({data:new Uint8Array(buf.slice(0))}).promise;const out=[];
 for(let i=1;i<=doc.numPages;i++){const c=await(await doc.getPage(i)).getTextContent();
  out.push(c.items.map(it=>it.str+(it.hasEOL?'\n':' ')).join('').replace(/[ \t]+\n/g,'\n'))}
 return {text:out.join('\n\n'),pages:doc.numPages,pageChars:out.map(t=>t.replace(/\s+/g,'').length)};
}
function b64(buf){const u=new Uint8Array(buf);let s='';for(let i=0;i<u.length;i+=0x8000)s+=String.fromCharCode.apply(null,u.subarray(i,i+0x8000));return btoa(s)}
$('#agent-prov').onchange=()=>renderAgent();
$('#agent-on').onclick=async()=>{
 const p=provNow(),P=PROV[p],k=$('#agent-key').value.trim();let model=$('#agent-model').value;
 if(!k&&!agentOn())return setStatus('#agent-status','Paste an API key first.',true);
 if(k&&!P.test.test(k))return setStatus('#agent-status',P.bad,true);
 const key=k||AGENT.key;const btn=$('#agent-on');btn.disabled=true;
 try{
  let models=null;
  if(p==='gemini'){setStatus('#agent-status','Checking the key and loading the models it can use…');
   models=await geminiModels(key);if(!models.length)throw {code:'agent_error',message:'This key has no Gemini models that can read documents'};
   if(!model||!models.some(m=>m[0]===model))model=models[0][0]}
  AGENT={provider:p,key,model,models};try{localStorage.setItem(AGENT_LS,JSON.stringify(AGENT))}catch(e){}
  renderAgent();setStatus('#agent-status','Saved. Testing the connection…');
  await agentJSON('Reply with only this JSON: {"ok":true}');setStatus('#agent-status',(p==='gemini'?'Gemini':'Claude')+' is connected and answering.');
 }catch(e){setStatus('#agent-status',aiErr(e,'The test'),true)}
 finally{btn.disabled=false}
};
$('#agent-model').onchange=()=>{if(agentOn()){AGENT.model=$('#agent-model').value;try{localStorage.setItem(AGENT_LS,JSON.stringify(AGENT))}catch(e){}renderAgent()}};
/* Share link: the key rides in the URL fragment (never sent to the web server or stored in the repo).
   Opening the link saves it in that person's browser, then the fragment is wiped from the address bar. */
$('#agent-share').onclick=()=>{if(!agentOn())return;
 const link=location.origin+location.pathname+'#agent='+encodeURIComponent(btoa(JSON.stringify({p:AGENT.provider,k:AGENT.key,m:AGENT.model})));
 const done=()=>setStatus('#agent-status','Share link copied. Send it privately (Slack DM or email), only to people who should use your key: anyone with the link can.');
 navigator.clipboard.writeText(link).then(done).catch(()=>{window.prompt('Copy this link:',link)})};
function agentFromLink(){
 const m=/[#&]agent=([^&]+)/.exec(location.hash);if(!m)return;
 try{const o=JSON.parse(atob(decodeURIComponent(m[1])));if(!o.k||!PROV[o.p])throw 0;
  AGENT={provider:o.p,key:o.k,model:o.m||null,models:null};try{localStorage.setItem(AGENT_LS,JSON.stringify(AGENT))}catch(e){}
  if(o.p==='gemini')geminiModels(o.k).then(ms=>{AGENT.models=ms;if(!ms.some(x=>x[0]===AGENT.model)&&ms.length)AGENT.model=ms[0][0];try{localStorage.setItem(AGENT_LS,JSON.stringify(AGENT))}catch(e){}renderAgent()}).catch(()=>{});
  setTimeout(()=>{$('#d-agent').open=true;setStatus('#agent-status','Connected with the shared key. This browser will remember it; Disconnect removes it.')},0);
 }catch(e){setTimeout(()=>setStatus('#agent-status','That share link is not valid. Ask for a new one.',true),0)}
 history.replaceState(null,'',location.pathname+location.search);
}
agentFromLink();
$('#agent-off').onclick=()=>{AGENT=null;try{localStorage.removeItem(AGENT_LS)}catch(e){}renderAgent();setStatus('#agent-status','Disconnected. Your key was removed from this browser.')};

$('#btn-extract').onclick=()=>runExtract();
let RUNNING=false;
async function runExtract(){
 if(RUNNING)return;S.brief=$('#in-brief').value;
 const text=(S.brief||'').trim();const pdf=pdfForBrief();if(text.length<40&&!pdf){runBusy(false);return setStatus('#extract-status','Upload the GTM doc or paste its text first.',true)}
 const btn=$('#btn-extract');btn.disabled=true;RUNNING=true;let ok=false;runBusy(aiReady()?'Reading the doc…':'Filling inputs…');
 const yr=(S.start||'2026').slice(0,4);
 try{
  let x,how;
  if(aiReady()){
   setStatus('#extract-status',aiLabel()+(pdf?' is reading '+pdf.name+'…':' is reading the brief…'));runBusy((SAMPLE?'Claude':'AI')+' is reading the doc…');
   const prompt=`You are a senior paid media planner. Read the GTM strategy text below and extract inputs for a paid media plan.
Reply with only JSON in exactly this shape:
{"campaignName":string,"product":string,
 "markets":[{"name":string,"weight":number}],
 "personas":[{"role":"dm"|"tech"|"user"|"other","label":string}],
 "initiatives":[{"name":string,"stage":"Awareness"|"Consideration"|"Conversion","pillar":string}],
 "moments":[{"name":string,"month":"YYYY-MM","type":"launch"|"event"|"content","initiative":number}],
 "channels":[string],"flightStart":"YYYY-MM-DD"|null,"flightEnd":"YYYY-MM-DD"|null,"budget":number|null}
Rules:
- markets: regions or countries the doc prioritizes, using names like North America, EMEA, China, Japan, Korea, Southeast Asia, LATAM. weight = suggested % of paid budget, summing to 100.
- personas: dm = economic decision-maker, tech = technical influencer / practitioner lead, user = day-to-day user, other = any further audience the doc names (partners, agencies, finance, etc.). label = the audience name plus short job titles from the doc.
- initiatives: the doc's own strategic initiatives or pillars (max 6), named as the doc names them, each with a one-line message pillar and the funnel stage it mainly serves. Return [] if the doc has none; never invent generic ones.
- moments: the key milestones the doc names (product launches, releases, content drops such as reports or video series, and events), each with a month. Return [] if the doc names no dated milestones. Convert quarters to the quarter's first month unless a month is named. Year defaults to ${yr}. initiative = 0-based index into initiatives.
- channels: choose from linkedin, google, meta, x, reddit, youtube, trade, creators, abm, events, wechat, baidu, naver, based on where the audiences learn about solutions and on the tactics in the doc.
- budget: total paid media budget in USD only if the doc states one, else null. flightStart/flightEnd only if stated, else null.

GTM STRATEGY TEXT:
"""
${text.slice(0,60000)}
"""`;
   x=await aiJSON(prompt,{pdf});how=SAMPLE?'Claude'+(pdf?', with page images':''):(AGENT.provider==='gemini'?'Gemini':'AI agent')+(pdf?', full PDF':'');
  }else{x=localExtract(text);how='keyword scan'}
  const ch=applyExtract(x||{});clearCopyForNewBrief();renderInputs();changed();$('#exampleBadge').hidden=true;
  setStatus('#extract-status',ch.length?`Filled from the doc (${how}): ${ch.join(', ')}. Review the sections below.`:'Nothing usable was found in the text. Fill the inputs by hand.',!ch.length);ok=ch.length>0;
  if(aiReady())draftCopy();else setStatus('#copy-status','The previous ad copy was cleared for this brief. Write new copy here.');
 }catch(e){
  if(e&&e.code==='not_granted'){const x=localExtract(text);const ch=applyExtract(x);clearCopyForNewBrief();renderInputs();changed();setStatus('#copy-status','The previous ad copy was cleared for this brief. Write new copy here.');setStatus('#extract-status','Claude access was declined, so a keyword scan filled: '+(ch.join(', ')||'nothing')+'.')}
  else setStatus('#extract-status',aiErr(e,'Extraction'),true)
 }finally{btn.disabled=false;RUNNING=false;runBusy(ok?'done':false)}
}

function clearCopyForNewBrief(){S.copyEdits={};S.copy={src:S.name,voice:'',ctas:'',proof:'',ini:S.initiatives.map(()=>({h:'',b:''}))}}
$('#btn-copy').onclick=()=>draftCopy();
async function draftCopy(){
 if(!aiReady())return setStatus('#copy-status','No AI agent is connected. Connect one in section 1, or write the copy for this brief by hand.',true);
 const btn=$('#btn-copy');btn.disabled=true;setStatus('#copy-status',aiLabel()+' is drafting copy for '+(S.name||'this brief')+'…');
 try{
  const prompt=`You are a B2B performance copywriter. Write paid media ad copy for this campaign.
Campaign: ${S.name}
Product: ${S.product}
Voice: ${S.copy.voice||'clear, specific, outcome-led'}
Audiences: ${Object.values(S.personas).filter(p=>p.on).map(p=>p.label).join('; ')}
Initiatives (index: name: message pillar):
${S.initiatives.map((x,i)=>i+': '+x.name+': '+x.pillar).join('\n')}
Brief excerpt:
<<<
${(S.brief||'').slice(0,15000)}
>>>
Reply with only JSON: {"voice":string,"ctas":[string],"proof":[string],"initiatives":[{"headlines":[string],"body":[string]}]}
Rules: one entry in "initiatives" per initiative above, same order. For each: 5 headlines that mix lengths (at least 2 of 30 characters or fewer, 1 of 15 or fewer, others up to 70) and 3 body lines (one of 40 characters or fewer, one of about 90, one of about 150). CTAs: 5, each 25 characters or fewer. Proof points: up to 4, only facts stated in the brief. No exclamation marks, no invented numbers.`;
  const x=await aiJSON(prompt);
  if(x.voice)S.copy.voice=x.voice;if(Array.isArray(x.ctas))S.copy.ctas=x.ctas.join('\n');if(Array.isArray(x.proof)&&x.proof.length)S.copy.proof=x.proof.join('\n');
  if(Array.isArray(x.initiatives))x.initiatives.forEach((q,i)=>{if(!S.copy.ini[i])S.copy.ini[i]={h:'',b:''};S.copy.ini[i].h=(q.headlines||[]).join('\n');S.copy.ini[i].b=(q.body||[]).join('\n')});
  S.copy.src=S.name;renderCopyInputs();changed();setStatus('#copy-status','Copy drafted for '+(S.name||'this brief')+'. Edit any line; the BOM updates as you type.');
 }catch(e){setStatus('#copy-status',e&&e.code==='not_granted'?'Claude access was declined. Write the copy by hand.':aiErr(e,'Drafting'),true)}
 finally{btn.disabled=false}
}

/* ==================== BOOT ==================== */
renderInputs();renderOut();renderAgent();renderProjects();wireProjects();
(function hook(n){
 if(window.claude&&claude.use){claude.use('downloads').then(d=>{DL=d}).catch(()=>{});claude.use('sample').then(s=>{SAMPLE=s;renderAgent();newCheer(true)}).catch(()=>{});return}
 if(n<20)setTimeout(()=>hook(n+1),250);
})(0);
