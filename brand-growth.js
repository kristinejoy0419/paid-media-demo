/* Brand vs Growth: the section 2 split card and the tabs that plan, pace and measure Brand and Growth media.
   Loaded before app.js; everything here runs at call time, after app.js has defined S, compute() and the helpers. */

const BG_TABS=[['incr','Channel Incrementality'],['journey','Attribution & Journey'],['gov','Budget Governance'],['meas','Measurement'],['rhythm','Operating Rhythm'],['checks','Plan Checks']];

// Planning inputs (editable on the tabs). These are placeholders to replace with your own data, not company figures.
// incr: share of platform-reported conversions that are incremental (MMM-style read) by channel, with a few placement overrides.
const BG_DEF={appr:0.70,actv:0.75,arpa:2400,ssLife:3,tol:10,scaleAt:1.5,trimAt:1.0,ltvTarget:3,
 incr:{google:0.60,linkedin:0.55,meta:0.50,x:0.40,reddit:0.45,youtube:0.70,ctv:0.70,trade:0.55,creators:0.60,abm:0.50,events:0.60,wechat:0.50,baidu:0.50,naver:0.50},
 incrPl:{gs_brand:0.25,li_rt:0.35,abm_rt:0.35}};
const bgOf=()=>{const b=S.bg||{};return {...BG_DEF,...b,incr:{...BG_DEF.incr,...(b.incr||{})},incrPl:{...BG_DEF.incrPl,...(b.incrPl||{})},lift:{...(b.lift||{})}}};
const bgSet=(k,v)=>{S.bg=S.bg||{};S.bg[k]=v;changed()};
const incrOf=(B,l)=>{const lr=B.lift[l.c.id];if(lr!=null&&lr!=='')return {v:Math.max(0,Math.min(1,+lr/100)),src:'Lift test'};
 const pv=B.incrPl[l.p.id];return {v:pv!=null?pv:(B.incr[l.c.id]??0.5),src:'MMM read'}};
const pctI=v=>Math.round(v*100)+'%';
const x1=v=>(Math.round(v*10)/10).toFixed(1)+'×';

// Per-line outcomes: self-serve and brand lines produce signups, pipeline lines produce SQLs; revenue from each side's economics
function bgLine(l,B,G,P){const f=lineFun(l)||{leads:0,imp:0,clk:0,lpv:0},inc=incrOf(B,l),side=l.side||sideOf(l.p);
 const signups=side==='pipe'?0:f.leads,sql=side==='pipe'?f.leads*P.mql*P.sql:0;
 const act=B.appr*B.actv,iS=signups*inc.v,iQ=sql*inc.v;
 const rev=iS*act*B.arpa+iQ*P.win*G.acv,contrib=(iS*act*B.arpa*B.ssLife+iQ*P.win*G.acv*G.life)*G.gm/100;
 return {side,f,signups,sql,iS,iQ,rev,contrib,inc}}

function bgChannels(R){const B=bgOf(),G=gr(),P=pipe(),by={};
 R.lines.forEach(l=>{const x=bgLine(l,B,G,P),o=(by[l.c.id]=by[l.c.id]||{c:l.c,spend:0,side:{brand:0,self:0,pipe:0},signups:0,sql:0,iS:0,iQ:0,rev:0,contrib:0,srcs:new Set(),imp:0});
  o.spend+=l.budget;o.side[x.side]+=l.budget;o.signups+=x.signups;o.sql+=x.sql;o.iS+=x.iS;o.iQ+=x.iQ;o.rev+=x.rev;o.contrib+=x.contrib;o.srcs.add(x.inc.src);o.imp+=x.f.imp||0});
 return Object.values(by).sort((a,b)=>b.spend-a.spend).map(o=>{const r=o.spend/(SAT_CAP[o.c.id]||500000),f=satF(o.c.id,o.spend)||1,mk=Math.exp(-r)/f;
  const brandShare=o.spend?o.side.brand/o.spend:0,cpp=o.spend?o.contrib/o.spend:0,marg=cpp*mk;
  const call=brandShare>=0.6?'brand':marg>=B.scaleAt?'scale':marg<B.trimAt?'trim':'hold';
  return {...o,brandShare,cpp,marg,mk,call,iCacS:o.iS?(o.side.self+o.side.brand)/o.iS:0,iCacQ:o.iQ?o.side.pipe/o.iQ:0,incrIn:o.spend?(B.lift[o.c.id]!=null&&B.lift[o.c.id]!==''?+B.lift[o.c.id]:Math.round((B.incr[o.c.id]??0.5)*100)):0}})}

function bgSides(R){const B=bgOf(),G=gr(),P=pipe(),o={};SIDES.forEach(k=>o[k]={spend:0,signups:0,sql:0,iS:0,iQ:0,rev:0,contrib:0,imp:0});
 R.lines.forEach(l=>{const x=bgLine(l,B,G,P),s=o[x.side];s.spend+=l.budget;s.signups+=x.signups;s.sql+=x.sql;s.iS+=x.iS;s.iQ+=x.iQ;s.rev+=x.rev;s.contrib+=x.contrib;s.imp+=x.f.imp||0});
 return o}

const CALL={scale:['Scale','aw'],hold:['Hold','co'],trim:['Trim','over'],brand:['Judge on lift','cv']};
const callChip=k=>`<span class="chip ${CALL[k][1]}">${CALL[k][0]}</span>`;
const sideBar=o=>{const t=o.spend||1;return `<span class="bg-mini" title="Brand ${pctI(o.side.brand/t)} · Self-Serve ${pctI(o.side.self/t)} · Pipeline ${pctI(o.side.pipe/t)}"><i class="b" style="width:${o.side.brand/t*100}%"></i><i class="s" style="width:${o.side.self/t*100}%"></i><i class="q" style="width:${o.side.pipe/t*100}%"></i></span>`};
const head=(k,h,note)=>`<div><div class="eyebrow">${k}</div><h2 style="font-size:20px;margin-top:2px">${h}</h2>${note?`<div class="note" style="max-width:80ch">${note}</div>`:''}</div>`;
const tbl=(cols,rows,foot)=>`<div class="tscroll"><table><thead><tr>${cols.map(c=>`<th${c[1]?' class="n"':''}>${c[0]}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody>${foot?`<tfoot>${foot}</tfoot>`:''}</table></div>`;
const vname=R=>`${TIERNAME[R.tier]} version · ${money(R.total)}`;

/* ---------- Growth Plan: Brand vs Growth section (shown above the existing Growth Plan) ---------- */
function bgGrowthSection(R){const B=bgOf(),G=gr(),sd=bgSides(R),sp=R.split,M=mixOf(),X=mixStats(R,M,mixStudySpend(M));
 const self=sd.self,pip=sd.pipe,br=sd.brand,act=B.appr*B.actv;
 const incRev=self.rev+pip.rev+br.rev,growthSpend=self.spend+pip.spend,contrib=self.contrib+pip.contrib+br.contrib,allSpend=growthSpend+br.spend;
 const ltvCac=allSpend?contrib/allSpend:0;
 // brand share that returns the most 3-year contribution, counting the brand halo from Media Mix Outcomes
 const scan=[10,15,20,25,30,35,40,45,50,55,60].map(b=>{const Rb=computeWith(R.tier,{brand:b/100}),s=bgSides(Rb),Xb=mixStats(Rb,M,mixStudySpend(M)),base=Xb.b.leads+Xb.d.leads,halo=base?Math.max(0,Xb.leads/base-1):0;
  return {b,c:(s.self.contrib+s.pipe.contrib+s.brand.contrib)*(1+halo)}});
 const best=scan.reduce((a,x)=>x.c>a.c?x:a,scan[0]),cur=Math.round(splitOf().brand*100);
 const ch=bgChannels(R),nx=k=>ch.filter(o=>o.side[k]>0&&o.call!=='brand').sort((a,b)=>b.marg-a.marg)[0];
 const ns=nx('self'),nq=nx('pipe');
 const tile=(v,k,sub,cls='')=>`<div class="tile ${cls}"><span class="v">${v}</span><span class="k">${k}</span>${sub?`<span class="note">${sub}</span>`:''}</div>`;
 const vers=[0,1,2].map(t=>{const Rt=t===R.tier?R:compute(t),s=bgSides(Rt);return {t,Rt,s}});
 return `<div class="panel bg-panel" style="display:flex;flex-direction:column;gap:16px;margin-bottom:18px">
 ${head(vname(R),'Brand vs Growth',`Spend follows the Brand vs Growth Split in section 2. Growth is judged on incremental self-serve signups and qualified pipeline, not platform-reported conversions. Incrementality reads are on Channel Incrementality; brand links are on Media Mix Outcomes.`)}
 <div class="tiles">
  ${tile(money(br.spend),'Brand media',`+${X.aw.toFixed(1)} pts aided awareness (assumed until a lift study reads out)`)}
  ${tile(compact(self.iS),'Incremental self-serve signups',`${money(self.spend)} · ${self.iS?money(self.spend/self.iS):'—'} per incremental signup · ${compact(self.iS*act)} activated`)}
  ${tile(money(pip.iQ*G.acv),'Incremental qualified pipeline',`${compact(pip.iQ)} SQLs · ${money(pip.spend)} · ${pip.iQ?money(pip.spend/pip.iQ):'—'} per incremental SQL`)}
  ${tile(money(incRev),'Incremental first-year revenue',`Self-serve ${money(self.rev+br.rev)} · sales-led ${money(pip.rev)}`)}
  ${tile(x1(ltvCac),'3-year contribution per media $',`Target ${B.ltvTarget}× (editable on Budget Governance)`,ltvCac<B.ltvTarget?'warn':'')}
  ${tile(money(sp.reserve),'Test & learn reserve','Held back from the lines; funds the Test Plan')}
 </div>
 <div class="cols">
  <div class="bg-card"><h3>Best brand share at these assumptions</h3><p>You are putting <strong>${cur}%</strong> of the budget into brand. The share that returns the most 3-year contribution, counting the brand halo on Growth, is <strong>${best.b}%</strong>${Math.abs(best.b-cur)<=2?', so the split is already close.':'.'}</p>
   ${Math.abs(best.b-cur)>2?`<div class="btns"><button class="btn sm" type="button" id="bg-best" data-v="${best.b}">Use ${best.b}%</button></div>`:''}
   <p class="note">The halo comes from Media Mix Outcomes, whose brand links are conservative placeholders. Treat this as a direction until a lift study or geo holdout reads out.</p></div>
  <div class="bg-card"><h3>Where the next $100K goes</h3>
   <p>${ns?`<span class="chip co">Self-Serve</span> <strong>${esc(ns.c.name)}</strong>: ${x1(ns.marg)} 3-year contribution per extra dollar.`:'No self-serve channel is on.'}</p>
   <p>${nq?`<span class="chip cv">Pipeline</span> <strong>${esc(nq.c.name)}</strong>: ${x1(nq.marg)} 3-year contribution per extra dollar.`:'No pipeline channel is on.'}</p>
   <p class="note">Ranked by what the next dollar returns after diminishing returns, not the average dollar.</p></div>
 </div>
 ${tbl([['Version'],['Brand',1],['Self-Serve',1],['Pipeline',1],['Reserve',1],['Incr. signups',1],['Incr. SQLs',1],['Incr. first-year revenue',1]],
   vers.map(({t,Rt,s})=>`<tr${t===R.tier?' class="bg-cur"':''}><td>${TIERNAME[t]} · ${money(Rt.total)}</td><td class="n">${money(s.brand.spend)}</td><td class="n">${money(s.self.spend)}</td><td class="n">${money(s.pipe.spend)}</td><td class="n">${money(Rt.split.reserve)}</td><td class="n">${compact(s.self.iS+s.brand.iS)}</td><td class="n">${compact(s.pipe.iQ)}</td><td class="n">${money(s.self.rev+s.pipe.rev+s.brand.rev)}</td></tr>`))}
 <details class="bg-inputs"><summary>Self-serve economics (placeholders: replace with your cohort data)</summary>
  <div class="bg-fields">${bgIn('appr','Download / trial → installed','%',100)}${bgIn('actv','Installed → activated (first backup job)','%',100)}${bgIn('arpa','First-year revenue per active self-serve account','$',1)}${bgIn('ssLife','Self-serve customer life','yrs',1)}</div>
  <p class="note">Sales-led deal size, gross margin, customer life and pipeline rates are in the Growth Plan inputs below and on the Flighting tab.</p></details>
 </div>`}
function bgIn(k,label,unit,scale){const B=bgOf(),v=scale===100?Math.round(B[k]*100):B[k];return `<label class="bg-f">${label}<span><input class="rate bg-in" type="number" min="0" step="${scale===100?1:k==='arpa'?100:1}" data-k="${k}" data-scale="${scale}" value="${v}">${unit}</span></label>`}

/* ---------- Channel Incrementality ---------- */
function renderIncr(R){const B=bgOf(),ch=bgChannels(R),T=sum(ch.map(o=>o.spend));
 const rows=ch.map(o=>{const lr=B.lift[o.c.id];return `<tr><td><strong>${esc(o.c.name)}</strong><div class="sub2">${[...o.srcs].join(', ')}</div></td><td>${sideBar(o)}</td><td class="n">${money(o.spend)}</td>
  <td class="n">${compact(o.signups)}</td><td class="n">${compact(o.sql)}</td>
  <td class="n"><input class="rate bg-incr" type="number" min="0" max="100" step="5" data-id="${o.c.id}" value="${Math.round((B.incr[o.c.id]??0.5)*100)}" aria-label="MMM incrementality for ${esc(o.c.name)}">%</td>
  <td class="n"><input class="rate bg-lift" type="number" min="0" max="100" step="1" data-id="${o.c.id}" value="${lr==null?'':esc(lr)}" placeholder="—" aria-label="Lift test read for ${esc(o.c.name)}">%</td>
  <td class="n">${compact(o.iS)}</td><td class="n">${compact(o.iQ)}</td><td class="n">${o.iS?money((o.side.self+o.side.brand)/o.iS):'—'}</td><td class="n">${o.iQ?money(o.side.pipe/o.iQ):'—'}</td>
  <td class="n">${x1(o.cpp)}</td><td class="n">${x1(o.marg)}</td><td>${callChip(o.call)}</td></tr>`});
 const t=k=>sum(ch.map(o=>o[k]));
 return `<div class="panel" style="display:flex;flex-direction:column;gap:16px">
 ${head(vname(R),'Channel Incrementality',`Platform-reported conversions overstate what paid media causes. Each channel's conversions are discounted to incremental ones: a lift test read when you have one, otherwise an MMM-style read. Returns fall as spend grows, so the call uses what the <em>next</em> dollar returns. Change any read and every tab updates.`)}
 ${tbl([['Channel'],['Brand · Self-Serve · Pipeline'],['Spend',1],['Platform signups',1],['Platform SQLs',1],['MMM read',1],['Lift test',1],['Incr. signups',1],['Incr. SQLs',1],['Cost / incr. signup',1],['Cost / incr. SQL',1],['3-yr contribution per $',1],['Next $ returns',1],['Call']],rows,
  `<tr><td><strong>Total</strong></td><td></td><td class="n">${money(T)}</td><td class="n">${compact(t('signups'))}</td><td class="n">${compact(t('sql'))}</td><td></td><td></td><td class="n">${compact(t('iS'))}</td><td class="n">${compact(t('iQ'))}</td><td></td><td></td><td class="n">${x1(T?t('contrib')/T:0)}</td><td></td><td></td></tr>`)}
 <div class="note bg-legend-n"><span>${callChip('scale')} next dollar returns ≥ ${B.scaleAt}× 3-year contribution</span><span>${callChip('hold')} between ${B.trimAt}× and ${B.scaleAt}×</span><span>${callChip('trim')} under ${B.trimAt}×</span><span>${callChip('brand')} mostly brand spend: judged on brand lift and branded search, not direct conversions</span></div>
 <ul class="assump">
  <li>MMM reads are planning placeholders in the usual range for B2B paid media (brand search and retargeting are the least incremental; prospecting video and CTV are mostly incremental but convert slowly). Replace them with your MMM output.</li>
  <li>A lift test read (conversion lift or geo holdout) overrides the MMM read for that channel.</li>
  <li>Diminishing returns use each channel's saturation point from the Growth Plan. Thresholds for Scale and Trim are on Budget Governance.</li>
 </ul></div>`}

/* ---------- Attribution & Journey ---------- */
function renderJourney(R){const B=bgOf(),G=gr(),P=pipe(),o=funnel(R),sd=bgSides(R),ch=bgChannels(R);
 const selfL=R.lines.filter(l=>(l.side||sideOf(l.p))!=='pipe'),pipeL=R.lines.filter(l=>(l.side||sideOf(l.p))==='pipe');
 const agg=ls=>{const a={imp:0,clk:0,lpv:0,leads:0};ls.forEach(l=>{const f=lineFun(l);if(f)for(const k in a)a[k]+=f[k]||0});return a};
 const a=agg(selfL),q=agg(pipeL),appr=a.leads*B.appr,actv=appr*B.actv,mql=q.leads*P.mql,sql=mql*P.sql,won=sql*P.win;
 const st=(name,v,rate,lo,hi,fix,src)=>({name,v,rate,lo,hi,fix,src});
 const SS=[st('Impressions',a.imp),st('Landing page visits',a.lpv,a.imp?a.lpv/a.imp:0),st('Downloads & trial signups',a.leads,a.lpv?a.leads/a.lpv:0,0.01,0.05,'Shorten the download form, match the page to the ad, and test the offer (free Community Edition, 30-day full trial).','Click-to-lead 1.9–5% (B2B search benchmarks on Flighting)'),
  st('Installed',appr,B.appr,null,null,'Send a quick-start guide and install video right after download; retarget downloaders who have not installed.','Your product telemetry'),st('Activated (first backup job)',actv,B.actv,null,null,'Onboarding emails and in-product nudges in the first 7 days; paid retargeting of installed-not-activated trials.','Your product data'),
  st('First-year revenue',actv*B.arpa)];
 const PL=[st('Leads',q.leads),st('MQLs',mql,P.mql,0.31,0.41,'Re-agree the MQL definition with sales and add one qualifying question to forms.','Lead → MQL 31–41% (pipeline benchmarks on Flighting)'),st('SQLs',sql,P.sql,0.13,0.26,'Route within an hour, tighten firmographic targeting, and exclude students and tiny companies.','MQL → SQL 13–26%'),
  st('Closed-won',won,P.win,0.10,0.15,'Give sales the ad and content history for each opportunity; check deal size against the ICP.','SQL → customer ≈ 10–15%'),st('Revenue',won*G.acv)];
 const fm=(s,i)=>i===SS.length-1||s.name==='Revenue'||s.name==='First-year revenue'?money(s.v):compact(s.v);
 const flag=s=>s.lo==null?'<span class="chip">Your data</span>':s.rate<s.lo?'<span class="chip over">Below range</span>':s.rate>s.hi?'<span class="chip aw">Above range</span>':'<span class="chip co">In range</span>';
 const fun=(L)=>tbl([['Stage'],['Volume',1],['Stage rate',1],['Check'],['If it stalls here']],L.map((s,i)=>`<tr><td>${esc(s.name)}</td><td class="n">${fm(s,i)}</td><td class="n">${s.rate!=null?(+(s.rate*100).toFixed(1))+'%':'—'}</td><td>${s.rate!=null&&s.fix?flag(s):''}${s.src?`<div class="sub2">${esc(s.src)}</div>`:''}</td><td>${s.fix?esc(s.fix):''}</td></tr>`));
 // credit by side under three views: last touch (platform-reported), incremental (MMM-calibrated), spend
 const T=sum(SIDES.map(k=>sd[k].spend)),lt=SIDES.map(k=>sd[k].signups+sd[k].sql*20),ltT=sum(lt),inc=SIDES.map(k=>sd[k].contrib),incT=sum(inc);
 const M=mixOf(),X=mixStats(R,M,mixStudySpend(M)),base=X.b.leads+X.d.leads,halo=base?Math.max(0,X.leads/base-1):0,growthC=inc[1]+inc[2];
 const mm=[inc[0]+growthC*halo,inc[1],inc[2]],mmT=sum(mm);
 const cr=SIDES.map((k,i)=>`<tr><td>${SIDENAME[k]}</td><td class="n">${pctI(T?sd[k].spend/T:0)}</td><td class="n">${pctI(ltT?lt[i]/ltT:0)}</td><td class="n">${pctI(mmT?mm[i]/mmT:0)}</td></tr>`);
 return `<div class="panel" style="display:flex;flex-direction:column;gap:16px">
 ${head(vname(R),'Attribution & Journey','The two journeys this plan pays for, stage by stage, with the stage rates checked against benchmark ranges. Then how much credit each side gets under each view of attribution.')}
 <div class="cols"><div><h3 style="font-size:15px;margin-bottom:6px">Self-serve journey · ${money(sd.self.spend+sd.brand.spend)}</h3>${fun(SS)}</div>
 <div><h3 style="font-size:15px;margin-bottom:6px">Sales-led journey · ${money(sd.pipe.spend)}</h3>${fun(PL)}</div></div>
 <div><h3 style="font-size:15px;margin-bottom:6px">Credit by side</h3>
 ${tbl([['Side'],['Share of spend',1],['Last touch (platform-reported)',1],['Incremental, with brand halo',1]],cr)}
 <div class="note" style="margin-top:6px">Last touch counts each SQL as 20 signups so the two sides compare. It gives brand almost no credit because brand rarely gets the last click. The incremental view uses the MMM and lift reads from Channel Incrementality and moves ${pctI(halo)} of Growth's contribution to brand (the halo on Media Mix Outcomes). The gap between the two columns is what last touch hides.</div></div>
 <ul class="assump"><li>Approval and activation rates and first-year revenue per account are placeholders. Set them under Self-serve economics on the Growth Plan.</li><li>Pipeline stage rates are editable on the Flighting tab and use the B2B benchmarks listed there.</li></ul>
 </div>`}

/* ---------- Budget Governance ---------- */
function bgPacing(R){const months=R.months,by={brand:months.map(()=>0),self:months.map(()=>0),pipe:months.map(()=>0)},chSide={};
 R.lines.forEach(l=>{const c=(chSide[l.c.id]=chSide[l.c.id]||{brand:0,self:0,pipe:0,t:0});c[l.side]+=l.budget;c.t+=l.budget});
 R.flightRows.forEach(fr=>{const c=chSide[fr.c.id];if(!c||!c.t)return;fr.months.forEach((v,i)=>SIDES.forEach(k=>by[k][i]+=v*c[k]/c.t))});
 return {months,by}}
function renderGov(R){const B=bgOf(),T=TIERS[R.tier],{months,by}=bgPacing(R),A=(S.bg?.act||{})[T]||{},ch=bgChannels(R);
 const act=(mo,k)=>{const v=A[mo]?.[k];return v==null||v===''?null:+v};
 const rows=[],tot={plan:0,act:0,land:0};
 months.forEach((mo,i)=>{const plan=sum(SIDES.map(k=>by[k][i]));const cells=SIDES.map(k=>{const a=act(mo,k);return `<td class="n"><span class="sub2">${money(by[k][i])}</span><input class="rate bg-act" type="number" min="0" step="1000" data-mo="${mo}" data-k="${k}" value="${a==null?'':a}" placeholder="actual" aria-label="${SIDENAME[k]} actual ${monthLabel(mo)}"></td>`});
  const as=SIDES.map(k=>act(mo,k)),has=as.some(x=>x!=null),aSum=sum(as.map((x,j)=>x==null?by[SIDES[j]][i]:x)),v=has&&plan?(aSum-plan)/plan:null;
  tot.plan+=plan;tot.land+=has?aSum:plan;if(has)tot.act+=aSum;
  rows.push(`<tr><td>${monthLabel(mo)}</td>${cells.join('')}<td class="n">${money(plan)}</td><td class="n">${v==null?'<span class="sub2">—</span>':`<span class="chip ${Math.abs(v)*100>B.tol?'over':'aw'}">${v>=0?'+':'−'}${Math.abs(Math.round(v*100))}%</span>`}</td></tr>`)});
 const media=R.split.media,landVar=media?(tot.land-media)/media:0;
 const gi=(k,l,u,step)=>`<label class="bg-f">${l}<span><input class="rate bg-in" type="number" min="0" step="${step}" data-k="${k}" data-scale="1" value="${B[k]}">${u}</span></label>`;
 const RIGHTS=[['Move money between placements in a channel','Channel owner','Weekly','Inside the channel budget'],['Move money between channels on the same side','Head of Growth Marketing','Monthly','Up to 15% of the side'],['Release the test & learn reserve','Head of Growth Marketing with the test owner','Per test readout','A winning test cell scales into its channel'],['Change the Brand vs Growth Split','Head of Paid Media with Brand and Finance','Quarterly','After an MMM refresh or brand lift readout'],['Change the total budget','CMO with Finance','Quarterly / annual plan','Forecast to land outside tolerance']];
 return `<div class="panel" style="display:flex;flex-direction:column;gap:16px">
 ${head(vname(R),'Budget Governance',`Monthly pacing for Brand and Growth against the plan, a forecast to land, the guardrails that trigger a change, and who can move money. Type actuals as they land (from Finance or the platforms); months without actuals forecast at plan.`)}
 <div class="tiles">
  <div class="tile"><span class="v">${money(media)}</span><span class="k">Media plan (after ${money(R.split.reserve)} reserve)</span></div>
  <div class="tile"><span class="v">${money(tot.act)}</span><span class="k">Spent so far (months with actuals)</span></div>
  <div class="tile ${Math.abs(landVar)*100>B.tol?'warn':''}"><span class="v">${money(tot.land)}</span><span class="k">Forecast to land · ${Math.round(landVar*100)===0?'on plan':(landVar>0?'+':'−')+Math.abs(Math.round(landVar*100))+'% vs plan'}</span></div>
 </div>
 ${tbl([['Month'],['Brand',1],['Self-Serve',1],['Pipeline',1],['Plan',1],['Variance',1]],rows,`<tr><td><strong>Total</strong></td>${SIDES.map(k=>`<td class="n">${money(sum(by[k]))}</td>`).join('')}<td class="n">${money(tot.plan)}</td><td></td></tr>`)}
 <div class="btns"><button class="btn sm ghost" type="button" id="bg-act-clear">Clear actuals for this version</button></div>
 <div><h3 style="font-size:15px;margin-bottom:6px">Guardrails</h3><div class="bg-fields">${gi('tol','Pacing tolerance ±','%',1)}${gi('scaleAt','Scale when next $ returns ≥','×',0.1)}${gi('trimAt','Trim when next $ returns <','×',0.1)}${gi('ltvTarget','3-year contribution per $ target','×',0.5)}</div>
 <p class="note">Common practice: review pacing weekly, act when a side is more than ±10% off plan two weeks running, and keep 10–15% of the budget for tests.</p></div>
 <div><h3 style="font-size:15px;margin-bottom:6px">Scale, hold or trim</h3>
 ${tbl([['Channel'],['Spend',1],['Next $ returns',1],['Call'],['Action']],ch.map(o=>`<tr><td>${esc(o.c.name)}</td><td class="n">${money(o.spend)}</td><td class="n">${x1(o.marg)}</td><td>${callChip(o.call)}</td><td>${o.call==='scale'?'Add budget in 10–20% steps from the reserve or a Trim channel; recheck after two weeks.':o.call==='trim'?'Cut 10–20%, restructure (audiences, creative, bids) and retest before cutting further.':o.call==='brand'?'Hold to the brand plan; judge on lift study and branded search.':'Keep pacing; optimize inside the channel.'}</td></tr>`))}</div>
 <div><h3 style="font-size:15px;margin-bottom:6px">Who can move money</h3>${tbl([['Decision'],['Owner'],['Cadence'],['Limit or trigger']],RIGHTS.map(r=>`<tr>${r.map(x=>`<td>${esc(x)}</td>`).join('')}</tr>`))}</div>
 </div>`}

/* ---------- Measurement ---------- */
function renderMeas(R){const B=bgOf(),ch=bgChannels(R);
 const METHODS=[['Platform reporting / MTA','Which ad, audience and creative drove a click or signup','Daily','Bids, budgets inside a campaign, creative rotation','Over-credits retargeting and brand search; can’t see brand or CTV'],
  ['Marketing mix model (MMM)','How much each channel adds at the margin, and where returns flatten','Quarterly refresh on weekly data','The split across channels and between Brand and Growth','Reads slowly; needs 2+ years of weekly data and lift tests to calibrate'],
  ['Brand lift study','Aided awareness, ad recall and consideration among exposed vs control','Per campaign (platform studies on YouTube, LinkedIn, Meta)','Whether brand media is moving Brand’s KPIs','Doesn’t tie to revenue on its own'],
  ['Geo holdout','What paid media adds to signups, pipeline and branded search in test vs control markets','2–3 per year','Keep, scale or cut a channel; validate the brand → demand link','Needs enough markets and 4–8 weeks'],
  ['Conversion lift (platform)','Incremental conversions from one platform','Per test','A channel’s incrementality read','Platform-run; check its design']];
 const tri=ch.map(o=>{const lr=B.lift[o.c.id],plat=o.signups+o.sql,mmm=Math.round((B.incr[o.c.id]??0.5)*100);
  const next=o.brandShare>=0.6?'Brand lift study + geo holdout on branded search':o.c.id==='google'?'Geo holdout on non-brand search':['linkedin','meta'].includes(o.c.id)?'Platform conversion lift test':'Geo holdout';
  return `<tr><td>${esc(o.c.name)}</td><td class="n">${compact(plat)}</td><td class="n">${mmm}%</td><td class="n">${lr==null||lr===''?'<span class="sub2">not run</span>':esc(lr)+'%'}</td><td>${esc(next)}</td></tr>`});
 const DATA=['Offline conversion import: send approved accounts, activations and SQLs back to Google, LinkedIn and Meta','Server-side conversion APIs (Meta CAPI, LinkedIn CAPI, Google enhanced conversions)','One UTM and campaign naming standard across agency and in-house buys (the Tagging tab)','Self-serve product events (download, install, first backup job) in the warehouse, joined to campaign data','Weekly spend and outcome history by channel and market for the MMM','A standing holdout or dark market for brand media'];
 return `<div class="panel" style="display:flex;flex-direction:column;gap:16px">
 ${head(vname(R),'Measurement','How the reads fit together: platform data steers the day to day, the MMM sets the mix, and lift tests and geo holdouts keep both honest. Each read decides a different kind of call.')}
 ${tbl([['Method'],['Answers'],['Cadence'],['Decides'],['Watch out for']],METHODS.map(r=>`<tr><td><strong>${esc(r[0])}</strong></td>${r.slice(1).map(x=>`<td>${esc(x)}</td>`).join('')}</tr>`))}
 <div><h3 style="font-size:15px;margin-bottom:6px">Triangulation by channel</h3>${tbl([['Channel'],['Platform-reported conversions',1],['MMM read',1],['Lift read',1],['Next calibration test']],tri)}
 <p class="note" style="margin-top:6px">Edit MMM and lift reads on Channel Incrementality. Test budgets come from the test &amp; learn reserve.</p></div>
 <div><h3 style="font-size:15px;margin-bottom:6px">Data foundations</h3><ul class="assump">${DATA.map(d=>`<li>${esc(d)}</li>`).join('')}</ul></div>
 </div>`}

/* ---------- Operating Rhythm ---------- */
function renderRhythm(R){const months=R.months;
 const FORUMS=[['Daily','Platform check','Channel owners (in-house and agency)','Pacing, delivery, disapprovals, anomalies','Bid and budget moves inside a campaign'],
  ['Weekly','Growth performance review','Head of Growth Marketing, channel owners, Marketing Ops','Spend vs pace, cost per incremental signup and SQL, test status','Moves between placements; test launches and stops'],
  ['Weekly','Creative review','Paid media, Brand, Creative','Creative performance by concept, hook and format; fatigue signals','Refresh, retire or scale concepts; briefs for the next round'],
  ['Monthly','Budget and pacing review','Head of Paid Media, Finance, Marketing Ops','Actuals vs plan by side, forecast to land, scale / hold / trim calls','Moves between channels; release of the test reserve'],
  ['Monthly','Insights readout','Paid media, Data, Brand, Growth','Attribution and journey data, test results, funnel stalls','What to restructure and what to scale'],
  ['Quarterly','Business review','CMO, Finance, Brand, Sales, Head of Paid Media','MMM refresh, lift results, LTV cohorts, pipeline and revenue','Next quarter’s Brand vs Growth Split, total budget and test roadmap']];
 const q=mo=>['01','04','07','10'].includes(mo.slice(5));
 const cal=months.map(mo=>{const ev=[];ev.push('Pacing review with Finance');if(q(mo))ev.push('Quarterly business review · MMM refresh');ev.push('Insights readout');
  S.moments.filter(m=>m.month===mo&&m.name).forEach(m=>ev.push(`${m.type==='event'?'Event':'Launch'}: ${m.name}`));return `<tr><td>${monthLabel(mo)}</td><td>${ev.map(esc).join(' · ')}</td></tr>`});
 const INHOUSE=[['Phase 1 · first 90 days','Audit agency buys, fees and data access; own the ad accounts, pixels and naming standard','Agency still buys; in-house team shadows'],
  ['Phase 2 · months 4–6','Bring paid search and paid social (LinkedIn, Meta) in-house','Agency keeps programmatic and CTV'],
  ['Phase 3 · months 7–9','Buy programmatic and CTV through a DSP with a managed-service partner','Agency moves to strategy and production support'],
  ['Phase 4 · months 10–12','In-house center of excellence runs Brand and Growth buying; agency on project retainers only','Review fees saved against team cost']];
 const AI=[['Brief to plan','The hub reads the GTM brief and drafts budgets, channels and copy','Paid media lead reviews and edits'],['Ad copy and variants','AI drafts headlines and body copy to each platform’s limits','Brand reviews voice and claims'],['Pacing alerts','Rules flag sides off pace and channels to scale or trim','Owner decides the move'],['Test readouts','AI summarizes results and significance','Analyst checks the design'],['Trafficking','Tagging sheet with names, UTMs and pixels generated per line','Ad ops QA before launch']];
 const ROLES=[['Head of Paid Media','Strategy, Brand vs Growth Split, budget with Finance, team'],['Growth Marketing Manager · Search','Google and Microsoft search, self-serve signups'],['Growth Marketing Manager · Social','LinkedIn and Meta, pipeline and signups'],['Brand Media Manager','YouTube, CTV, programmatic, brand lift'],['Marketing Analyst','Pacing, MMM inputs, test design and readouts'],['Ad Ops (shared with Marketing Ops)','Trafficking, tagging, QA']];
 return `<div class="panel" style="display:flex;flex-direction:column;gap:16px">
 ${head(vname(R),'Operating Rhythm','The forums that run this plan, a calendar for the flight, the move from agency to an in-house center of excellence, the team and the steps where AI does the first draft.')}
 ${tbl([['Cadence'],['Forum'],['Who'],['Inputs'],['Decides']],FORUMS.map(r=>`<tr>${r.map((x,i)=>`<td>${i===1?'<strong>'+esc(x)+'</strong>':esc(x)}</td>`).join('')}</tr>`))}
 <div><h3 style="font-size:15px;margin-bottom:6px">Flight calendar</h3>${tbl([['Month'],['Reviews, readouts and moments']],cal)}</div>
 <div class="cols"><div><h3 style="font-size:15px;margin-bottom:6px">Agency to in-house</h3>${tbl([['Phase'],['What moves'],['Agency role']],INHOUSE.map(r=>`<tr>${r.map(x=>`<td>${esc(x)}</td>`).join('')}</tr>`))}</div>
 <div><h3 style="font-size:15px;margin-bottom:6px">Team and owners</h3>${tbl([['Role'],['Owns']],ROLES.map(r=>`<tr>${r.map(x=>`<td>${esc(x)}</td>`).join('')}</tr>`))}</div></div>
 <div><h3 style="font-size:15px;margin-bottom:6px">AI-assisted workflows</h3>${tbl([['Step'],['What AI does'],['Human check']],AI.map(r=>`<tr>${r.map(x=>`<td>${esc(x)}</td>`).join('')}</tr>`))}</div>
 </div>`}

/* ---------- Plan Checks ---------- */
function bgChecks(R){const out=[],add=(g,name,got,want,st,why)=>out.push({g,name,got,want,st,why}),B=bgOf(),sp=splitOf(),tg=R.split;
 const bud=[0,1,2].map(i=>+S.budgets[TIERS[i]]||0),tie=(a,b)=>Math.abs(a-b)<=Math.max(1,b*0.001);
 add('Inputs','Budgets rise Low → Medium → High',bud.map(compact).join(' → '),'ascending',bud[0]<=bud[1]&&bud[1]<=bud[2]?'pass':'warn','Versions are meant to show what more money buys.');
 add('Inputs','Flight end after start',`${S.start} → ${S.end}`,'end > start',parseD(S.end)>parseD(S.start)?'pass':'fail','Flighting and pacing need a real flight.');
 const on=S.markets.filter(m=>m.on),ws=sum(on.map(m=>+m.weight||0));
 add('Inputs','Market weights add to 100%',(+ws.toFixed(1))+'%','100%',Math.abs(ws-100)<=0.5?'pass':'warn','Weights that don’t add to 100% are treated as shares.');
 add('Inputs','Brand share in the usual B2B range',pctI(sp.brand),'20–50%',sp.brand>=0.2&&sp.brand<=0.5?'pass':'warn','Binet & Field put B2B at about 46% brand; plans building toward that usually sit at 20–50%. Outside it, check the reason with Brand and Finance.');
 add('Inputs','Test & learn reserve',pctI(sp.tl),'5–20%',sp.tl>=0.05&&sp.tl<=0.2?'pass':'warn','The common 70/20/10 practice keeps 10–20% for tests and new channels; under 5% leaves too little to learn.');
 const mx=(S.mix||{});add('Inputs','Brand lift assumption is conservative',(mixOf().studyLift)+' pts','≤ 5 pts until measured',mixOf().studyLift<=5||mx.studyLift==null?'pass':'warn','YouTube Brand Lift studies average about +17% relative awareness lift, about 3 points on an 18% base (Think with Google).');
 const lines=sum(R.lines.map(l=>l.budget));
 add('Ties out','Lines + reserve = budget',money(lines+tg.reserve),money(R.total),tie(lines+tg.reserve,R.total)?'pass':'fail','Every dollar is either on a line or in the reserve.');
 const sd={brand:0,self:0,pipe:0};R.lines.forEach(l=>sd[l.side]+=l.budget);const has=SIDES.filter(k=>sd[k]>0),ts=sum(has.map(k=>tg[k]));
 SIDES.forEach(k=>{const want=has.includes(k)&&ts?tg[k]*tg.media/ts:0;add('Ties out',`${SIDENAME[k]} spend = split`,money(sd[k]),money(tg[k]),!has.includes(k)&&tg[k]>0?'warn':tie(sd[k],want)?'pass':'fail',!has.includes(k)&&tg[k]>0?'No line on this side, so its share went to the other sides. Turn on a channel or change a role in Buy Details.':'Lines are rescaled to land on the section 2 split.')});
 const fl=sum(R.flightRows.map(f=>f.total));add('Ties out','Flighting = lines',money(fl),money(lines),tie(fl,lines)?'pass':'fail','Monthly flighting spreads exactly the line budgets.');
 const pc=bgPacing(R),pt=sum(SIDES.map(k=>sum(pc.by[k])));add('Ties out','Pacing plan = lines',money(pt),money(lines),tie(pt,lines)?'pass':'fail','Budget Governance paces exactly the line budgets.');
 const noBom=R.lines.filter(l=>!l.bomIds||!l.bomIds.length).length;add('Ties out','Every line has BOM creative',noBom?noBom+' without':'all lines','all lines',noBom?'warn':'pass','Lines without creative can’t launch; check Creative units in section 9.');
 let TP=null;try{TP=testPlan(R)}catch(e){}
 if(TP)add('Ties out','Test budget within reserve',money(TP.budget||0),'≤ '+money(tg.reserve),(TP.budget||0)<=tg.reserve*1.05+1?'pass':'warn','Tests are funded from the test & learn reserve.');
 const sides=bgSides(R),T=sum(SIDES.map(k=>sides[k].spend)),c=T?sum(SIDES.map(k=>sides[k].contrib))/T:0;
 add('Second look','3-year contribution per media $',x1(c),'≥ '+B.ltvTarget+'×',c>=B.ltvTarget?'pass':'warn','Below target, shift money toward Scale channels or revisit economics on the Growth Plan.');
 const ch=bgChannels(R),tr=ch.filter(o=>o.call==='trim');add('Second look','Channels to trim',tr.length?tr.map(o=>o.c.name).join(', '):'none','none',tr.length?'warn':'pass','Their next dollar returns less than the Trim threshold on Budget Governance.');
 const flat=R.lines.filter(l=>l.under).length;add('Second look','Flat-fee lines with less than one unit',String(flat),'0',flat?'warn':'pass','Raise the budget, lower the market weight, or turn the channel off there.');
 return out}
function renderChecks(R){const C=bgChecks(R),n=k=>C.filter(c=>c.st===k).length,G=['Inputs','Ties out','Second look'];
 const ic={pass:'✓',warn:'!',fail:'✕'};
 return `<div class="panel" style="display:flex;flex-direction:column;gap:16px">
 ${head(vname(R),'Plan Checks',`${C.length} checks run on every change: inputs that make sense, totals that must match across tabs, and numbers worth a second look.`)}
 <div class="tiles"><div class="tile"><span class="v">${n('pass')}</span><span class="k">Pass</span></div><div class="tile ${n('warn')?'warn':''}"><span class="v">${n('warn')}</span><span class="k">Worth a look</span></div><div class="tile ${n('fail')?'warn':''}"><span class="v">${n('fail')}</span><span class="k">Don’t tie out</span></div></div>
 ${tbl([[''],['Check'],['Plan'],['Expected'],['Why it matters']],G.flatMap(g=>[`<tr class="bg-g"><td colspan="5">${g}</td></tr>`,...C.filter(c=>c.g===g).map(c=>`<tr><td><span class="bg-ck ${c.st}" aria-label="${c.st}">${ic[c.st]}</span></td><td>${esc(c.name)}</td><td>${esc(c.got)}</td><td>${esc(c.want)}</td><td>${esc(c.why)}</td></tr>`)]))}
 </div>`}

const BG_RENDER={incr:renderIncr,journey:renderJourney,gov:renderGov,meas:renderMeas,rhythm:renderRhythm,checks:renderChecks};

function bgWireCommon(){const v=$('#view');
 v.querySelectorAll('.bg-in').forEach(el=>el.onchange=()=>{const sc=+el.dataset.scale||1,x=Math.max(0,+el.value||0);bgSet(el.dataset.k,sc===100?x/100:x)});
 const b=$('#bg-best');if(b)b.onclick=()=>{S.split={...splitOf(),brand:+b.dataset.v/100};changed()}}
const BG_WIRE={
 growth:bgWireCommon,
 incr(){bgWireCommon();const v=$('#view');
  v.querySelectorAll('.bg-incr').forEach(el=>el.onchange=()=>{S.bg=S.bg||{};S.bg.incr={...(S.bg.incr||{}),[el.dataset.id]:Math.min(100,Math.max(0,+el.value||0))/100};changed()});
  v.querySelectorAll('.bg-lift').forEach(el=>el.onchange=()=>{S.bg=S.bg||{};S.bg.lift={...(S.bg.lift||{})};if(el.value==='')delete S.bg.lift[el.dataset.id];else S.bg.lift[el.dataset.id]=Math.min(100,Math.max(0,+el.value));changed()})},
 gov(){bgWireCommon();const v=$('#view'),T=TIERS[UI.tier];
  v.querySelectorAll('.bg-act').forEach(el=>el.onchange=()=>{S.bg=S.bg||{};const A=((S.bg.act=S.bg.act||{})[T]=S.bg.act[T]||{}),m=(A[el.dataset.mo]=A[el.dataset.mo]||{});if(el.value==='')delete m[el.dataset.k];else m[el.dataset.k]=Math.max(0,+el.value);changed()});
  const c=$('#bg-act-clear');if(c)c.onclick=()=>{if(S.bg?.act)delete S.bg.act[T];changed()}},
 journey:bgWireCommon,meas:bgWireCommon,rhythm:bgWireCommon,checks:bgWireCommon};

/* ---------- Section 2 card ---------- */
function bgSyncSplit(R){const sp=splitOf(),b=document.getElementById('sp-brand');if(!b)return;
 const set=(id,v)=>{const el=document.getElementById(id);if(el&&el!==document.activeElement)el.value=v};
 set('sp-brand',Math.round(sp.brand*100));set('sp-ss',Math.round(sp.ss*100));set('sp-tl',Math.round(sp.tl*100));bgPaint(sp,R)}
function bgPaint(sp,R){const g=Math.max(0,1-sp.brand-sp.tl),s=g*sp.ss,q=g-s,t=UI.tier===3?1:UI.tier,tot=+S.budgets[TIERS[t]]||0,f=v=>(Math.round(v*1000)/10)+'%';
 const put=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v};
 put('sp-brand-o',Math.round(sp.brand*100)+'%');put('sp-ss-o',Math.round(sp.ss*100)+'%');put('sp-tl-o',Math.round(sp.tl*100)+'%');
 [['b',sp.brand],['s',s],['q',q],['t',sp.tl]].forEach(([k,v])=>{const el=document.getElementById('sp-bar-'+k);if(el)el.style.width=(v*100)+'%';put('sp-l-'+k,f(v))});
 // Total line: the four parts must add to exactly 100% and to the version's budget
 const parts=[sp.brand,s,q,sp.tl],pt=sum(parts),dol=parts.map(v=>Math.round(tot*v)),ds=sum(dol),ok=Math.abs(pt-1)<1e-9&&Math.abs(ds-tot)<=2;
 const te=document.getElementById('sp-total');if(te){te.className='bg-total '+(ok?'ok':'bad');te.innerHTML=`<span>Total</span><b>${(Math.round(pt*1000)/10)}%</b><b>${money(ds)}</b><span>${ok?'✓ matches the '+esc(TIERNAME[t])+' budget':'✕ should be 100% and '+money(tot)}</span>`}
 const n=document.getElementById('sp-note');if(n)n.innerHTML=`${esc(TIERNAME[t])} version: brand <strong>${money(tot*sp.brand)}</strong> · growth <strong>${money(tot*g)}</strong> (self-serve ${money(tot*s)}, pipeline ${money(tot*q)}) · test &amp; learn <strong>${money(tot*sp.tl)}</strong>. Every media line is rescaled to land on this split, so typed channel budgets in section 7 scale with their side; channel weights decide the mix inside each side.`}
function bgWireSplit(){const b=document.getElementById('sp-brand');if(!b||b.dataset.wired)return;b.dataset.wired=1;
 const ss=document.getElementById('sp-ss'),tl=document.getElementById('sp-tl');
 const read=()=>({...splitOf(),brand:+b.value/100,ss:+ss.value/100,tl:+tl.value/100});
 // Brand + reserve can never pass 95%, so Growth always keeps at least 5% and the parts never exceed 100%
 const cap=el=>{const bv=+b.value,tv=+tl.value;if(bv+tv>95){if(el===b)tl.value=Math.max(0,95-bv);else b.value=Math.max(+b.min,95-tv)}};
 [b,ss,tl].forEach(el=>{el.oninput=()=>{cap(el);bgPaint(read())};el.onchange=()=>{cap(el);S.split=read();changed()}});
 
 const bb=document.getElementById('sp-b2b');if(bb)bb.onclick=()=>{S.split={...splitOf(),brand:0.46};bgSyncSplit();changed()}}
document.addEventListener('DOMContentLoaded',()=>{bgWireSplit();try{bgSyncSplit()}catch(e){}});
