# Paid Media BOM Builder

Turns a GTM strategy doc into a paid media plan: a bill of materials (BOM), a creative spec sheet, a line-by-line agency trafficking and tagging sheet, and monthly flighting. It builds Low, Medium and High versions of each, plus a side-by-side comparison.

It uses the look of The Haul (Montserrat and Playfair Display, cream and espresso, with a cream hero and a mulberry-to-black small-caps title). It opens pre-filled with a fictional sample GTM strategy (Vaultline, a B2B data resilience company selling backup, recovery and ransomware protection to IT and infrastructure teams, with a free-edition and trial motion for SMB plus an ABM, partner-led motion for enterprise) as a worked example. Every number is illustrative. Saved plans are stored in this browser under their own key, so they never mix with other copies of the hub on the same github.io domain.

## Run it

It's a static site with no build step.

- **Locally:** open `index.html` in a browser.
- **GitHub Pages:** go to *Settings → Pages*, set *Source* to "Deploy from a branch", then choose `main` and `/ (root)`. The site will be served at `https://<user>.github.io/<repo>/`.

## Inputs (left rail)

1. **GTM brief:** campaign name, product, and the doc text. You can paste it or upload a `.pdf`/`.docx`/`.txt`, then use "Fill inputs from doc" to set markets and channels. The **AI agent** panel connects your own Google Gemini key (free tier available from Google AI Studio) or Anthropic API key so an agent reads the brief, and reads uploaded PDFs whole (tables, charts and scanned pages included).
2. **Budget & flight:** a budget for each version, flight dates, and the **Brand vs Growth Split**: brand share of media, the self-serve vs pipeline split inside Growth and Performance Media, and a test & learn reserve held back from the lines. Every line is rescaled to land on it.
3. **Markets:** weight %, budget $ (for the selected version) and language for each market. Edit % or $ and the other updates.
4. **Audiences:** decision-maker, technical influencer and day-to-day user, plus any audiences you add in the blank row.
5. **Initiatives & pillars:** pulled from the GTM doc (blank if it names none), each with a funnel stage and message pillar. Placements use the initiative that matches their stage.
6. **Launch moments:** key milestones from the GTM doc (blank if none), which drive the monthly bursts.
7. **Channels:** turn each on or off and set its weight or its budget $. L/M/H shows the first version a channel appears in.
8. **Creative volume:** concepts per placement and refresh cadence for each version.
9. **Creative units:** every ad unit, grouped by platform (search, display, LinkedIn, Meta, X, Reddit, YouTube, WeChat, publishers, creators, events) with its specs. Ticked units feed the Spec Sheet and BOM. Also sets the video cut-down lengths.
10. **Messaging & ad copy:** voice, headlines and body copy per initiative, CTAs and proof points.

## Outputs (tabs)

| Tab | What it shows |
| --- | --- |
| Summary | Totals, budget by channel, market, initiative and funnel stage, and the assumptions used |
| BOM (MVP) | The minimum creative set. Each master (one per format and aspect ratio) has click-to-edit ad copy with character counters (red when over), the media lines it covers, platform resizes and file counts |
| Line items | One row per channel × placement × market, with targeting, buy type, rate, budget, estimated delivery, KPI and BOM items |
| Spec Sheet for Creative | Sizes, file types, max sizes, copy limits and lead times for each ad unit in the plan |
| Flighting & Projected Outcomes | Monthly spend per channel with launch and event bursts, projected outcomes by month, and KPIs and outcomes by channel |
| Media Mix Outcomes | Brand vs demand. A left-to-right chain from brand spend to brand lift, demand signals, pipeline and CAC payback, with each link's assumption editable and a hover or tap formula on every number. A brand share slider tries another split, prompts before writing it back to Buy Details, and compares the mix with putting the whole budget into demand. Also upper-funnel delivery, exposed vs unexposed rates and a lift study plan |
| Channel Incrementality | Per channel: spend by side (Brand, Self-Serve, Pipeline), platform-reported signups and SQLs, an editable MMM read and lift test read, incremental signups and SQLs, cost per incremental result, 3-year contribution per $, what the next $ returns, and a Scale / Hold / Trim / Judge on lift call |
| Attribution & Journey | The self-serve journey (visit → signup → approved → activated → revenue) and the sales-led journey (lead → MQL → SQL → won), stage rates checked against benchmark ranges with fixes, and credit by side under last touch vs incremental with brand halo |
| Budget Governance | Monthly pacing for Brand, Self-Serve and Pipeline with actuals you type, forecast to land, guardrails (pacing tolerance, Scale and Trim thresholds, contribution target), Scale / Hold / Trim actions and who can move money |
| Measurement | How platform data, MMM, brand lift, geo holdouts and conversion lift fit together, triangulation by channel with the next calibration test, and data foundations |
| Operating Rhythm | Daily to quarterly forums, a flight calendar, the agency-to-in-house plan, team owners and AI-assisted workflows |
| Plan Checks | Checks on every change: inputs in sensible ranges, totals that tie out across tabs (lines + reserve = budget, each side = split, flighting and pacing = lines, test budget within reserve) and numbers worth a second look |
| Buy Details | Every buy in the selected version: buy type, editable rate vs benchmark, budget, delivery, markets, KPI and a Brand / Demand role per placement (Awareness placements start as Brand) |
| Spec Sheet & Tagging for Agency | A trafficking row for every line (BOM items, files, ad copy that follows BOM edits, pixel, ad name, UTMs and tracked URL), plus pixel and conversion setup for each channel |

Exports: an `.xlsx` for the current version, one `.xlsx` with all versions, a CSV of the current tab, or "Copy table" to paste into Sheets.

## Notes

- Rates are 2026 B2B planning benchmarks, not quotes. Override them on the Rates tab.
- Specs marked "Confirm" vary by platform or publisher. Check the current spec before production.
- When the page runs as a claude.ai Artifact, "Fill inputs from doc" and "Draft copy with Claude" use the built-in Claude on your Claude account (no key needed). PDFs are sent as text plus page images, so charts, tables and scanned pages are read too. On the standalone site, connect an AI agent (a Gemini or Anthropic API key, saved only in your browser and sent only to that provider). Gemini's free tier has daily limits, and Google may use free-tier prompts to improve its products for the same features plus full-PDF reading. With no agent, "Fill inputs from doc" falls back to a keyword scan and you write the copy by hand.
- Inputs are saved in your browser's localStorage. Use "Reload example" to reset, or "Start blank" to clear everything.

## Files

- `index.html`: page structure and inputs
- `styles.css`: theme tokens (light and dark) and layout
- `app.js`: the channel, placement and spec library, plan engine, rendering and exports
