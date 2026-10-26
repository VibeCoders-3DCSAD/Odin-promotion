# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

The surface in this repo is the public landing site (budgie-finances.app), a static HTML/CSS/JS page. The product it promotes is an **Android-only** app; iOS, web access, and multi-user/admin modules are out of scope for the product.

## Users

Filipinos who manage their own income, expenses, savings, and debt. The audience is Filipinos broadly — not only young professionals. They include salaried and variable earners, people supporting family, people carrying debt, and people who currently track money in their head, a notebook, a spreadsheet, or not at all.

Their job: know where their money went, see what is coming (especially seasonal and unexpected expenses), and decide how to split income across essentials, obligations, savings, and debt before the money is gone.

A secondary audience is the thesis panel and evaluators at the University of Makati, who will judge whether the product claims hold up. The page speaks to end users first but must survive that scrutiny.

## Product Purpose

BUDGIE is a personal financial management (PFM) app that records financial activity, monitors spending, forecasts seasonal changes in spending, and turns that into a coordinated monthly plan: a **budget**, a **savings-contribution plan**, and a **debt-repayment plan**, plus unusual-spending alerts. Together these form the user's **Financial Plan**, which is decision support the user reviews and approves.

Success: users anticipate expenses like Christmas, school enrollment, and summer electricity rate increases before those expenses arrive, and they allocate income deliberately instead of reacting.

## Positioning

Existing PFM apps record the past and rely on user-set limits and historical averages. BUDGIE combines the user's own records with **Philippine seasonal consumption patterns** (PSA household expenditure data) so the plan accounts for expenses that predictably rise during the year. Its categories also reflect Filipino financial practice: family support, remittances, and government contributions. Most surveyed respondents (89.4%) felt existing apps do not address family obligations.

Tagline lineage: the earlier "Odin" version used "Odin makes truly Filipino budgets." The brand is now Budgie, and this tagline is not confirmed as current.

## Operating Context

- Manual entry only. There is no bank or e-wallet integration, no auto-import, no receipt scanning, and no credit-score monitoring.
- Offline-first: users record locally (SQLite) and sync to the cloud (Supabase/PostgreSQL) when connected.
- Money lives across cash, bank accounts, and e-wallets. Income arrives as salary, allowance, side income, and remittances.
- Real Filipino expense texture: Meralco, Maynilad/Manila Water, LPG, prepaid load, PLDT/Globe/Smart, jeepney/tricycle/train fares, tuition, padala/family support, paluwagan, and government contributions.
- Cold start: new users get no active forecasts or unusual-spending alerts until they have enough transaction history.

## Capabilities and Constraints

Confirmed features: account registration with email verification, login and recovery, a savings and debt profile questionnaire, onboarding, a dashboard, income sources and accounts, savings goals with completion projection, debt management with payoff-date projection, billers and remittances, cash flow (transactions), custom income/expense categories, **Intelligent Financial Planning** (a season-appropriate budget, savings contribution schedule, and debt repayment plan), financial reports, and settings.

The mechanisms, named accurately:
- **SARIMA** forecasting of total and category-level expenses. This is the core of the product.
- **Rule-based classification** of the savings and debt profile from the questionnaire. It updates as the user adds data.
- **Linear Programming** budget recommendations, using the forecast as input.
- **IQR** (interquartile range) flagging of unusual spending.

Terminology: "Financial Plan", "Intelligent Financial Planning", "savings and debt profile", "unusual spending" (not "anomaly detection"), "billers and remittances".

Constraints:
- Not licensed financial, investment, tax, or legal advice. The plan stays subject to the user's review and approval.
- Findings and recommendations are tuned to the Philippine context.
- The app is not yet publicly available. **"Get Early Access" is a placeholder** with no signup or store link behind it, so the page must not promise a download, a working waitlist, a launch date, or pricing.
- Superseded claims still on the current page must not survive: "AI-powered", LSTM, Isolation Forest, Random Forest, the four Stable/Variable × Obligated/Flexible profiles, "anomaly detection", insurance tracking, and web access.

## Brand Commitments

- Name: **Budgie** in prose (written BUDGIE in the thesis). Domain: budgie-finances.app.
- Mascot and marks: `public/budgie-logo.png`, `public/budgie-mark.png`, and `public/budgie-hi.png` (mascot waving).
- Voice carried over from the current page and confirmed by the thesis tone: calm, non-shaming, practical. Culturally necessary spending (family support, handaan, enrollment) is respected, never treated as a failure.

## Evidence on Hand

From the researchers' survey (thesis, Chapter I):
- 97.9% are willing to use their spending data to predict future financial needs
- 97.9% must accommodate family obligations in their plans
- 91.5% cover essentials first when they receive income
- 89.4% feel existing budgeting apps don't address family obligations
- 85.1% find it difficult to monitor spending consistently
- 85.1% divide their income into categories
- 72.3% cite unexpected expenses as a source of stress
- 66.0% frequently struggle to identify where their money went

National: 77% of Filipino adults find raising emergency funds somewhat or very difficult (BSP, 2026).

The survey's sample size is not stated in the material provided, so the page must not state one.

Older pilot survey (Odin title defense, may be superseded): 57.8% use no tool or app at all, and 22.2% use a basic spreadsheet or notebook.

Expert consultation (from the Odin title defense; confirm it still applies to Budgie before citing): Dr. Pamela A. Go, Professor, College of Business and Financial Science, University of Makati, validated the profile and category logic and suggested government and community categories.

App screenshots in `public/`: `budgie-home.png`, `budgie-home-summaries.png`, `budgie-budget-suggestion.png`, `budgie-budgets.png`, `budgie-forecast.png`, `budgie-goal-projection.png`, `budgie-debts.png`, `budgie-debt-detail.png`, `budgie-scheduled.png`, `budgie-alerts.png`, `budgie-alert-detail.png`, `budgie-activity.png`, `budgie-new-transaction.png`.

Team: Stefanie S. Gabion, Joaquin Luis T. Guevarra, Alexa Joanne Paula G. San Jose, and Charles Nathaniel B. Togle. BS Computer Science, College of Computing and Information Sciences, University of Makati, AY 2026–2027.

Absent, never fabricate: user testimonials, download or user counts, ratings, press, partner logos, pricing, launch dates, and model accuracy figures (the evaluation has not been reported yet).

## Product Principles

1. **Plan ahead, don't just log the past.** Seasonal forecasting feeding a coordinated budget, savings, and debt plan is the reason Budgie exists. Lead with it.
2. **Filipino reality is the default, not a localization layer.** Family obligations, remittances, government contributions, and seasonal spikes are first-class concepts.
3. **Name the mechanism truthfully.** Say SARIMA, rules, LP, and IQR where precision helps. Never inflate them to "AI".
4. **The user decides.** Every plan and alert is advice the user can review, accept, or change. No shame and no fake urgency.
5. **Claim only what's real.** Use the survey figures and screenshots that exist, and be honest that access isn't open yet.

## Accessibility & Inclusion

Copy is in English, with Filipino financial terms (padala, paluwagan, handaan) used naturally. Content must work on low-end Android phones over mobile data, since that is where this audience will open the link.
