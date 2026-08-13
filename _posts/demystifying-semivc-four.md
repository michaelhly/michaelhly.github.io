---
title: "Demystifying the Semiconductor Value Chain: Interconnect"
date: "2026-08-10T00:09:17.000Z"
---
In April 2017, the Kansas City Chiefs traded up to the tenth overall pick to select quarterback Patrick Mahomes. Everyone knew that he was meant to be the future of the franchise. The coaches knew, the fans knew, and so did the person he was drafted to replace.

![Alex Smith and Patrick Mahomes](/assets/demystifying-semivc-four/alex-smith-patrick-mahomes.png)

Instead, Mahomes spent his first season on the bench as Chiefs coach Andy Reid chose Alex Smith as the starter. Around the league, Smith was viewed as the archetypal “game manager,” a label scouts often used dismissively. He didn’t have an overpowering arm, preferred the safe checkdown over the risky throw, and rarely forced the ball into tight windows. But Smith was a reliable veteran, and his consistency earned Reid’s trust to start every Sunday.

The AI build-out has its own Alex Smith. It is a piece of copper wire. Its eventual replacement, optical links, will move data faster and farther, and the handoff is already written into the industry roadmap. Yet when hyperscalers assemble the 100K+ GPU clusters driving today’s AI boom, the highest-bandwidth links in the machine still run on copper. What it lacks in flash, it makes up for in reliability — the one thing that matters most in a production deployment.

## The Scouting Report on the Phenom
A [2017 draft profile](https://www.si.com/nfl/2017/03/27/patrick-mahomes-nfl-draft-scouting-report) described watching Patrick Mahomes play quarterback as

> "a bit like watching someone slice a banana with a playing card — you're not sure how it happened, but it looks cool as hell."

In college, he threw for more than 5,000 yards his junior year while routinely attempting passes that most quarterbacks wouldn’t even consider.  The only knock on him was that his team didn’t win. Mahomes once put up 819 yards of total offense in a single game, an FBS record that still stands, and lost [66–59](https://www.espn.com/college-football/matchup?gameId=400869616). Saddled with a 13–16 record as a starter for Texas Tech, college football’s most dazzling player was in the [Heisman conversation](https://www.ncaa.com/news/football/hand-him/2016-10-24/heisman-watch-texas-techs-patrick-mahomes-record-setting-campaign) in October and forgotten by December.

For over a decade, silicon photonics demos looked like Patrick Mahomes’s college highlight reel. The demos showcased trillions of bits flowing through a chip no larger than a fingernail, but the wins that mattered never came. The prototypes skipped nearly every problem standing between a lab demo and a shipping product. Tiny ring-shaped modulators that encode data were so sensitive that just a few nanometers of manufacturing variation or a slight temperature drift could knock them off their wavelength. Lasers posed another problem. A failed laser in a pluggable transceiver just meant swapping the module, but a laser sealed inside a chip that cost tens of thousands of dollars turned the same failure into an expensive loss. And even if reliability had been solved, mass production presented a totally different problem. Attaching fibers to wafers and testing optics at volume remained brutally difficult, and no one had a financial reason to get them right for servers running traditional  [create, read, update, and delete](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) applications.

## The Game Manager's Secret
So why is copper reliable? The answer is simple. A passive copper link is, at heart, just metal. There is no laser to degrade, no modulator to drift, nothing inside the cable to wear out or overheat. Its failure modes are predictable and easy for the engineer to catch while building the server rack. And like most game managers, copper comes without a premium. Moving a bit over copper costs far less than moving the same bit over optical links, because the data never has to change from electrons to photons and back. Copper gets no fanfare for making the short checkdowns that move the ball, but the data keeps moving, and nothing gets dropped.

![Copper vs. Optical Links](/assets/demystifying-semivc-four/copper-vs-optical-link-anatomy.svg)

An optical link is complicated. At each end of every fiber-optic cable sits a small plug-in module that uses a laser to turn data into light. But first, the signal has to travel several inches across the circuit board to reach the module. The trip leaves it smeared and faint, so a chip inside rebuilds every bit before handing it to the laser. That cleanup chip alone can burn nearly [half the module's power](https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=10526441). And the lasers themselves wear out, drawing more and more current to hold the same brightness, until one day they cannot.

![Rebuilding Bits](/assets/demystifying-semivc-four/rebuilding-bits.svg)

Nvidia initially planned a [256-GPU optical scale-up](https://newsletter.semianalysis.com/i/175661160/nvlink-scale-up-interconnect) back in 2022 and [quietly shelved it](https://pytorchtoatoms.substack.com/p/why-dgx-h100-nvl256-never-shipped) due to the cost, power, and latency of running high-bandwidth scale-up over pluggable optics. Scale-up is the tight, ultra-fast mesh that binds a group of GPUs so they behave like a single machine. Scale-out is the ordinary datacenter network that connects those machines into 100K+ GPU clusters. A GPU’s scale-up links carry roughly nine times the bandwidth of its scale-out network, and delivering that over transceivers would have been prohibitively expensive in both dollars and watts. That is before even asking whether the front of the server had room for all the plugs.

When AI models outgrew the 8-GPU server, Nvidia followed the adage to use copper where you can, optics where you must. The GB200 packed all 72 GPUs and their switches into a single liquid-cooled rack, keeping every link within copper’s two-meter reach.

| | With Copper | With Optics |
|---|---|---|
| Hardware | **5,184** copper cables<br>(72 GPUs × 18 NVLink ports × 4 wire pairs per port) | **648** 1.6T twin-port transceivers<br>(1,296 NVLink ports ÷ 4 ports per transceiver × 2 ends per link) |
| Power | **Passive cable**<br>(no transceivers to power) | ≈ **19.4kW** extra per rack<br>(~30W per transceiver) |
| Reach | **~2 m**<br>(enough to stay inside one rack) | **50 m to 2 km**<br>(enough to cross racks and rows) |
| Reliability | **~2 FIT**<br>(failures per billion device-hours) | **~1,000–2,000 FIT** |
| Cost (BoM) | **&lt; $216k/rack**<br>(&lt; $3k/GPU) | **$551k–648k** per rack in transceivers alone<br>(~$850–1,000 per transceiver) |

Nvidia’s decision to go with the game manager paid dividends not just for Nvidia, but for everyone holding the wire. The clearest winner was Amphenol, the connector maker that custom-engineered the NVLink spine cartridge for the GB200 NVL72. In 2025, Amphenol’s IT Datacom business accounted for 36% of company sales. In the fourth quarter, those sales grew 110% year-over-year, largely driven by AI infrastructure spending. Customers were ordering faster than Amphenol could ship, placing $1.31 in orders for every dollar it sold. A connector company that spent nearly a century selling unglamorous metal had become one of the most direct ways to invest in the AI build-out.

![Amphenol IT Datacom Growth](/assets/demystifying-semivc-four/amphenol-datacom-growth.svg)

## The Succession Plan
Andy Reid built the mid-2010 Chiefs offense around Alex Smith's strengths, emphasizing easy completions and yards after the catch. By scheming short, quick throws on first down, Reid shrank the field for the quarterback and let the Chiefs' playmakers generate extra yards to move the chains. Smith then became a mentor for Patrick Mahomes, who spent his rookie season learning Reid's system and absorbing Smith's methodical approach to reading defenses and managing the game. Kansas City also invested in the roster around the quarterback, giving Mahomes the supporting cast he did not have at Texas Tech. When Mahomes took over the following season, he immediately turned it into an MVP campaign.

Nvidia is now planning a similar succession handoff to transition from copper-based scale-up to co-packaged optics (CPO). Co-packaging takes the optical engine, the part that converts electrical signals into light, out of the pluggable module and mounts it on the package beside the chip that moves the data. Because the signal no longer has to cross the circuit board, the pluggable DSP is removed. The laser, however, remains outside the package because it is the most failure-prone part of the link and degrades faster under heat. Placing it next to the chip, the hottest part of the system, makes it difficult for technicians to service when the laser overheats.  Instead, Nvidia uses an external laser source that plugs into the system separately. The architectural shift shows up most clearly in the power budget, where a DSP-based pluggable module consumes around 16 watts to deliver 800G of bandwidth; Nvidia’s co-packaged version requires [4-5 watts, cutting power consumption by roughly 73%](https://newsletter.semianalysis.com/i/178153689/cpo-scale-out-power-budgets).

[At Nvidia's GTC keynote in 2025](https://nvidianews.nvidia.com/news/nvidia-spectrum-x-co-packaged-optics-networking-switches-ai-factories), the company introduced its first CPO products in scale-out networking switches, the networking boxes that route traffic between GPU racks. Those links carry only a ninth of the bandwidth a GPU pushes across its scale-up fabric, giving CPO much needed practice reps at lower stakes. The switches let the supply chain ramp, and teach operators to live with optical engines that no longer unplug like standard transceiver. The bigger payoff comes later in scale-up, where optical links would let Nvidia expand the machine's reach beyond copper’s two-meter limit without forcing more GPUs into a single rack.

Along the way, Nvidia has been buying its way into the optics supply chain, and investors hunting for the Amphenol of optics have started throwing darts at every supplier Nvidia touches. In March 2026, it took sizeable stakes in Lumentum and Cohrent, which are expected to supply the high-power external lasers central to co-packaged optics. Nvidia also [partnered with Corning](https://nvidianews.nvidia.com/news/nvidia-and-corning-announce-long-term-partnership-to-strengthen-us-manufacturing-for-ai-infrastructure), the company that manufactures the glass fibers, to build three new plants in North Carolina and Texas, which will grow Corning’s US optical connectivity capacity tenfold. Since March, Nvidia has put around $6.5 billion into the optical supply chain, with warrants that could push the total past $9 billion.

| Company | Amount | Price per share | Announced | Role in the chain |
|---|---|---|---|---|
| Lumentum | $2B convertible preferred | $695.31 | Mar 2026 | High-power external lasers; SemiAnalysis expects Lumentum to be the sole supplier for Nvidia's initial CPO switch shipments |
| Coherent | $2B common stock | $256.80 | Mar 2026 | High-power external lasers; SemiAnalysis expects Coherent to enter as a second supplier in late 2026 |
| Ayar Labs | Participated in a [$500M Series E](https://ayarlabs.com/news/ayar-labs-closes-500m-series-e-accelerates-volume-production-of-co-packaged-optics) | $3.75B post-money valuation | Mar 2026 | Optical I/O chiplet startup |
| Marvell | $2B convertible preferred | $91.84 conversion price | Mar 2026 | Silicon photonics and networking silicon, bundled with NVLink Fusion |
| Corning | $500M for warrants, <br> rising to $3.2B if the traditional warrant is exercised in full | $180.00 traditional warrant strike | May 2026 | The fiber itself, alongside a partnership funding three new US plants |

Experts say CPO-based scale-up is no longer a question of if or why, but when and how. And the market is already pricing the transition as if the outcome is visible from here. Nvidia paid $695.31 per share for its Lumentum stake at 84 times this year’s expected adjusted earnings. At the time of writing, the stock has traded well above that level, leaving public investors paying over 100 times earnings at a valuation that would need multiple Super Bowls to justify. So it is worth doing the arithmetic out loud ...

---
<i>Paywalled Content</i>

Lumentum is of the most obvious stocks for investors who want exposure to the lasers in the co-packaged optics scale up. But before paying today's multiples, three questions matter. What future is already in the price? If that future arrives, who keeps the money? When will the money arrive, and what is the cost of waiting?

## What future is already in the price?
To keep the exercise conservative, we start from Nvidia’s entry price. That price valued Lumentum at roughly $67 billion on a fully diluted basis. For that valuation to work, the company needs future profits to be large enough, and arrive soon enough, to justify what investors are paying today at an even higher multiple. Running the price backward at an ordinary cost of capital of about 10%, with operating margins held at 32% throughout, Lumentum needs roughly $19.9 billion in revenue by FY2031 and $37.7 billion by FY2036. That is seven times and twelve times the $3 billion year the company just closed. If we measure off the $5 billion run rate Lumentum just guided to in their latest earnings, then the twelvefold ramp shrinks to seven and a half. Whether we start from the trailing $3 billion revenue base or management’s guided $5 billion run rate changes how demanding the growth story looks.

Impossible numbers? Not quite, because the market underneath is growing almost as fast as the price demands. LightCounting, the industry forecaster, sizes optical interconnects inside AI clusters at $26 billion in 2026, up 60% in a year, with a reasonable chance of reaching $100 billion by 2030 if enough goes right. Lumentum’s $3 billion in revenue puts its share somewhere near 12%, and the true figure is lower, because the company stopped reporting a cloud-versus-telecom split when it reorganized into a single segment this year. The $67 billion mark requires about 18% of the market’s projected size by 2031. That is two bets stacked, one on the market and one on Lumentum’s market share, and both have to land.

![What Nvidia's Price Asks For](/assets/demystifying-semivc-four/implied-valuation-ramp-lumentum.svg)

## If the future arrives, who keeps the money?
The market will probably grow. The harder question is how much of that growth Lumentum keeps. That depends on market share, margins, and how much pricing power it has with Nvidia.

**Customer concentration.** In the March quarter, one customer accounted for 26% of Lumentum’s revenue, up from 17% a year earlier, while the top two together reached 38%. The filings do not name them, but the pattern is not hard to read. Getting designed into Nvidia’s platform brings volume, it also gives the buyer more leverage. For Lumentum, the same concentration that proves the opportunity also defines the risk.

**The customer is keeping leverage.** Nvidia invested two billion dollars into Lumentum and Coherent on the same morning, signed non-exclusive agreements with both, and said more partners would follow. The purchase commitment is real, "multi-billion" in Nvidia's own press release, but no filing gives a number. Volume visibility helps but it does not guarantee pricing power. The Chiefs eventually paid Mahomes $450 million because he was irreplaceable. Nvidia has spent $4 billion making sure no laser maker is.

**The scarcity is real.** Here is the strongest counter to the previous two points, and it deserves a fair hearing. Lumentum’s gross margin went from 38% to 50% in four quarters, even as customer concentration increased. Laser fabs take years to build, and hyperscalers designing their own silicon will still need lasers. But production capacity is expensive. Lumentum is turning its profits into fabs rather than cash with capital spending running at several times depreciation. The risk is that today’s margins reflect a shortage, not a permanent change in the business. If scarcity lasts, the margins are real. If too much capacity comes online, this starts to look like Cisco in 1999, when suppliers earned peak margins just as investors paid peak multiples.

## When does the money arrive, and what is the cost of waiting?
Mahomes cost Kansas City a rookie contract, and the first ring arrived inside it, meanwhile optics is being paid at the top of the market and asked to deliver afterward. SemiAnalysis puts the real scale-up handoff past Rubin Ultra, out toward Feynman. A GPU generation runs roughly two years, and at a 10% discount rate, a dollar that arrives two years late is worth 83 cents. Every dollar riding on the handoff takes that haircut, and none of the physics has to be wrong for it to happen.

To be fair, the clock may have started earlier than our model assumes. In Lumentum’s latest earnings release, the CEO pointed to rising demand for high-power CPO lasers and an initial order for external laser modules as "the first signs that optics are starting to penetrate in-rack connectivity." In-rack is copper’s home turf, constrained by the two-meter limit this whole post has been about. The initial order marks the first move from roadmap to revenue for the lasers Nvidia's investment helped secure. 

## Decision Time
In 2017, nobody knew whether Mahomes’s talent would translate to the NFL. The sticker price looked steep on draft night because the Chiefs were paying for uncertainty, and trading up ended a 50-year title drought that delivered three Super Bowls in five seasons. That kind of uncertainty is not for sale here. Everyone already knows optics will take over once copper runs out of physics, and the certainty is exactly what makes the stock expensive.

Lumentum can be a very good company. The technology can arrive on schedule. The shares can still be a poor investment, because the price does not pay off for good. The stock no longer asks whether there will be a dynasty; it assumes one, and the only thing left to argue about is what year it starts.

## What About Coherent?
Nvidia ran the same playbook on Coherent that morning and paid a very different price, about 7 times revenue against the 22 times it paid for Lumentum, which had less than half of Coherent's sales. Part of the discount is the depth chart. Lumentum is expected to supply the high-power lasers for Nvidia's first CPO switches alone, with Coherent entering as a second source in late 2026. Run the same arithmetic we can see while Lumentum's price needs the market to grow and its market share to grow on top of it, Coherent's price just needs the company to hold the share it already has while the market grows.

![What Nvidia's Price Asks of Coherent](/assets/demystifying-semivc-four/implied-valuation-ramp-coherent.svg)

One point works in public's favor. Nvidia bought Coherent in common stock, the same security anyone can buy, and the position shows up in its 13F filings for the market to track. Nvidia bought preferred shares in Lumentum, which will not appear as common stock until they convert. Common investors wont get any purchase commitment like Nvidia, but in Coherent, at least, we are holding the same season tickets.

Could we be wrong? Of course. The model behind the numbers are in these [spreadsheets where you can change every assumption and see what price falls out](/assets/demystifying-semivc-four/lumentum-model.xlsx). Try it for yourself!
