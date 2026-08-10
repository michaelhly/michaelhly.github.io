---
title: "Demystifying the Semiconductor Value Chain: Interconnect"
date: "2026-08-10T00:09:17.000Z"
---
In April 2017, the Kansas City Chiefs traded up to the tenth overall pick to take Patrick Mahomes. Nobody in the building pretended he was anything other than the future of the franchise, least of all the veteran he was drafted to replace.

![Alex Smith and Patrick Mahomes](/assets/demystifying-semivc-four/alex-smith-patrick-mahomes.png)

Mahomes sat anyway. Andy Reid kept Alex Smith as his starter for the entire 2017 season. Smith carried the “game manager” label around the league, and scouts rarely meant it kindly. His arm was ordinary, and he would take the safe checkdown over the hero throw almost every time. Reid started him every Sunday because he knew exactly what he was getting.

The AI build-out has its own Alex Smith, a piece of copper wire. Optics will take the job eventually. The industry roadmaps already say so. But in the 100K+ GPU clusters getting built today, the highest-bandwidth links in the whole machine still run over copper, mostly because copper does not break, and in a production deployment nothing matters more than that.

## The Scouting Report on the Phenom
A [2017 draft profile](https://www.si.com/nfl/2017/03/27/patrick-mahomes-nfl-draft-scouting-report) described watching Patrick Mahomes play quarterback as

> "a bit like watching someone slice a banana with a playing card — you're not sure how it happened, but it looks cool as hell."

Mahomes threw for more than 5,000 yards in his final year at Texas Tech while attempting passes most quarterbacks would not even consider. The knock was that his team kept losing. He once put up 819 yards of total offense in a single game, an FBS record that still stands, and Texas Tech lost it [66–59](https://www.espn.com/college-football/matchup?gameId=400869616). He finished 13–16 as a college starter. In October 2016 he was in the [Heisman conversation](https://www.ncaa.com/news/football/hand-him/2016-10-24/heisman-watch-texas-techs-patrick-mahomes-record-setting-campaign). By December nobody was talking about him.

Silicon photonics spent more than a decade as the interconnect world's version of that highlight reel. The demos were spectacular, trillions of bits streaming through a chip no bigger than a fingernail, and none of them shipped. Look closely at any of those prototypes and nearly every hard problem between the lab and a product had been skipped. The tiny ring-shaped modulators that encode data onto light are so sensitive that a few nanometers of manufacturing variation, or a mild temperature drift, can knock them off their wavelength. Lasers were a bigger problem. When a laser dies inside a pluggable transceiver, someone swaps the module and moves on. Seal that same laser inside a chip that costs tens of thousands of dollars and its death takes the whole chip with it. Even the boring problems were unsolved. Attaching fibers to wafers is brutally difficult at volume, testing optics at volume is harder still, and for servers running traditional [create, read, update, and delete](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) applications, no one had a financial reason to figure any of it out.

## The Game Manager's Secret
A passive copper link is, at heart, just metal. There is no laser to degrade and no modulator to drift out of tune. When copper fails, it fails in ways an engineer can catch while the rack is still being assembled. It is also cheap. A bit moving over copper never has to be converted from electrons to photons and back, and at cluster scale, skipping that conversion is worth real money. Copper throws the checkdown. Nobody cheers, but the ball keeps moving.

![Copper vs. Optical Links](/assets/demystifying-semivc-four/copper-vs-optical-link-anatomy.svg)

Compare that with everything an optical link has to do. At each end of the fiber sits a small plug-in module with a laser inside that turns data into light. Before the signal ever reaches that module, it has to cross several inches of circuit board, and it arrives smeared and faint. A chip inside the module rebuilds every bit before handing it to the laser, and that cleanup alone can burn nearly [half the module's power](https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=10526441). Then there is the laser itself, which spends its whole life drawing a little more current to hold the same brightness, right up until it dies.

![Rebuilding Bits](/assets/demystifying-semivc-four/rebuilding-bits.svg)

Nvidia learned the economics here the hard way. It planned a [256-GPU optical scale-up](https://newsletter.semianalysis.com/i/175661160/nvlink-scale-up-interconnect) back in 2022 and [quietly shelved it](https://pytorchtoatoms.substack.com/p/why-dgx-h100-nvl256-never-shipped) over the cost, power, and latency of running high-bandwidth scale-up on pluggable optics. Two definitions help here. Scale-up is the tight, ultra-fast mesh that binds a group of GPUs so they behave like a single machine. Scale-out is the ordinary datacenter network that connects those machines into 100K+ GPU clusters. A GPU’s scale-up links carry roughly nine times the bandwidth of its scale-out network, and delivering that over transceivers would have been ruinous in both dollars and watts. That is before asking whether the front of the server even had room for all the plugs.

When AI models outgrew the 8-GPU server, Nvidia followed the old networking adage. Copper where you can, optics where you must. The GB200 packed all 72 GPUs and their switches into a single liquid-cooled rack, keeping every link within copper’s two-meter reach.

| | With Copper | With Optics |
|---|---|---|
| Hardware | **5,184** copper cables<br>(72 GPUs × 18 NVLink ports × 4 wire pairs per port) | **648** 1.6T twin-port transceivers<br>(1,296 NVLink ports ÷ 4 ports per transceiver × 2 ends per link) |
| Power | **Passive cable**<br>(no transceivers to power) | ≈ **19.4kW** extra per rack<br>(~30W per transceiver) |
| Reach | **~2 m**<br>(enough to stay inside one rack) | **50 m to 2 km**<br>(enough to cross racks and rows) |
| Reliability | **~2 FIT**<br>(failures per billion device-hours) | **~1,000–2,000 FIT** |
| Cost (BoM) | **&lt; $216k/rack**<br>(&lt; $3k/GPU) | **$551k–648k** per rack in transceivers alone<br>(~$850–1,000 per transceiver) |

Starting the game manager paid off for everyone holding the wire, and for no one more than Amphenol, the connector maker that custom-engineered the NVLink spine cartridge for the GB200 NVL72. Amphenol’s IT Datacom business was 36% of company sales in 2025 and grew 110% year-over-year in the fourth quarter, almost all of it driven by AI infrastructure. Customers placed $1.31 in orders for every dollar Amphenol shipped. A company that spent nearly a century selling unglamorous metal suddenly found itself one of the most direct ways to own the AI build-out.

![Amphenol IT Datacom Growth](/assets/demystifying-semivc-four/amphenol-datacom-growth.svg)

## The Succession Plan
Reid never asked Smith to be a phenom. He built the offense around easy completions and yards after the catch, scheming short, quick throws that shrank the field for his quarterback. Mahomes spent that rookie year watching, learning the system, and absorbing Smith’s methodical way of reading defenses. Kansas City used the same year to stack the roster, surrounding him with NFL talent he never had at Texas Tech. When Mahomes took over in 2018, he won MVP in his first season as a starter.

Nvidia is running the same succession plan with co-packaged optics, or CPO. Co-packaging pulls the optics out of the plug-in module on the front of the box and mounts them beside the chip that moves the data. The signal no longer has to cross the circuit board, so the pluggable DSP that existed to clean up that trip gets deleted. The laser stays pluggable, and deliberately so, because it is the most failure-prone part of the link and has to be replaceable without touching the package. The payoff is power. A DSP-based pluggable module burns around 16 watts to deliver 800G of bandwidth. Nvidia’s co-packaged version needs [4 to 5 watts, roughly 73% less](https://newsletter.semianalysis.com/i/178153689/cpo-scale-out-power-budgets).

The rookie is being eased in. [Nvidia introduced its first CPO products at GTC 2025 in scale-out switches](https://nvidianews.nvidia.com/news/nvidia-spectrum-x-co-packaged-optics-networking-switches-ai-factories), the networking boxes that route traffic between GPU racks. Scale-out is the forgiving place to debut. A 1.6T port there carries roughly one-ninth the bandwidth of a Blackwell GPU’s scale-up links, and fielding CPO in that network gives the supply chain time to ramp, generates reliability data in the field, and teaches operators to live with optical engines that no longer unplug. The bigger payoff waits in scale-up, where optics would let Nvidia grow the machine past copper’s two-meter reach without forcing more GPUs into a single rack.

Nvidia has also been buying its way into the optics supply chain, and investors hunting for the Amphenol of optics have been throwing darts at every supplier it touches. In March 2026 it took sizeable stakes in Lumentum and Coherent, the two companies expected to supply the high-power external lasers at the center of co-packaged optics. It also [partnered with Corning](https://nvidianews.nvidia.com/news/nvidia-and-corning-announce-long-term-partnership-to-strengthen-us-manufacturing-for-ai-infrastructure), the company that manufactures the glass fibers, on three new plants in North Carolina and Texas that will grow Corning’s US optical connectivity capacity tenfold.

Since March, Nvidia has put around $6.5 billion into the optical supply chain, with warrants that could push the total past $9 billion.

| Company | Amount | Price per share | Announced | Role in the chain |
|---|---|---|---|---|
| Lumentum | $2B convertible preferred | $695.31 | Mar 2026 | High-power external lasers; SemiAnalysis expects Lumentum to be the sole supplier for Nvidia's initial CPO switch shipments |
| Coherent | $2B common stock | $256.80 | Mar 2026 | High-power external lasers; SemiAnalysis expects Coherent to enter as a second supplier in late 2026 |
| Ayar Labs | Participated in a [$500M Series E](https://ayarlabs.com/news/ayar-labs-closes-500m-series-e-accelerates-volume-production-of-co-packaged-optics) | $3.75B post-money valuation | Mar 2026 | Optical I/O chiplet startup |
| Marvell | $2B convertible preferred | $91.84 conversion price | Mar 2026 | Silicon photonics and networking silicon, bundled with NVLink Fusion |
| Corning | $500M for warrants, <br> rising to $3.2B if the traditional warrant is exercised in full | $180.00 traditional warrant strike | May 2026 | The fiber itself, alongside a partnership funding three new US plants |

The market is not waiting for the handoff. Analysts now treat CPO-based scale-up as a question of when rather than if, and prices reflect it. Nvidia paid $695.31 per share for its Lumentum stake, about 84 times this year’s expected adjusted earnings. As of writing, the stock has traded well above that level, with the public paying more than 100 times earnings, a valuation that would need multiple Super Bowls to justify. It is worth doing the arithmetic out loud ...

---
<i>Paywalled Content</i>

Start with Nvidia’s entry price, the conservative case, which values Lumentum at $67 billion on a fully diluted basis. A price is a claim on profits the company has not earned yet, and the later those profits arrive, the less they count. Run the discounted cash flow backward at an ordinary cost of capital of about 10%, grant a generous 32% operating margin throughout, and the price requires Lumentum to reach roughly $19.9 billion in revenue by FY2031 and $37.7 billion by FY2036.

In isolation those numbers sound impossible. Against the market they are merely aggressive. LightCounting sizes the market for optical interconnects inside AI clusters at $26 billion in 2026, up 60% from the previous year, and thinks there is a reasonable chance it reaches $100 billion by 2030 if enough goes right. Lumentum’s roughly $3 billion in revenue, most of it now from cloud and AI customers, puts its share around 12%, and the true figure is lower because telecom and industrial are still inside that total. The $67 billion mark requires $20 billion in revenue by FY2031, about 18% of the market’s size by then. A bet on the market, with a second bet on share stacked on top of it.

![What Nvidia's Price Asks For](/assets/demystifying-semivc-four/implied-valuation-ramp-lumentum.svg)

The market growing is the safest assumption baked into that price, though a safe bet can still pay late. Share and margins are really one question, which is whether Lumentum will ever hold pricing power over its one dominant customer, and Nvidia answered it before anyone thought to ask. Two billion dollars went into Lumentum and two billion into Coherent on the same morning, both relationships explicitly non-exclusive, with other partners promised down the line. The purchase commitments that came with the money point to real volume, and that visibility is worth something in the early years, which are the years that count most. Margins are another story. A buyer who arranges his supply this carefully does not intend to hand over the surplus. The Chiefs eventually paid Mahomes $450 million because he was irreplaceable. Nvidia spent its $4 billion making sure no laser supplier ever gets to be.

The strongest counter is that capacity itself is the moat. Laser fabs take years to build, scarcity supports today’s margins, and hyperscalers designing their own silicon will still need lasers. Fair enough. But capacity is not free, and Lumentum is turning its profits into fabs rather than cash. That is the right move. It is also the reason those earnings keep getting spent, and this industry’s history of earning back its capital is not encouraging.

Then there is the calendar. Mahomes cost Kansas City a rookie contract and delivered the first ring while still on it. Optics is being paid at the top of the market, with delivery due afterward. SemiAnalysis puts the real scale-up handoff past Rubin Ultra, out toward Feynman. A GPU generation runs roughly two years, and at a ten percent discount rate, a dollar that arrives two years late is worth 83 cents. Every dollar riding on the handoff takes that haircut, and none of the physics has to be wrong for it to happen.

Nobody knew in 2017 whether Mahomes’s talent would translate to the NFL. The Chiefs paid a steep price on draft night because they were paying for uncertainty, and the bet ended a 50-year title drought and produced three Super Bowls in five seasons. That kind of uncertainty is not for sale here. Everyone already knows optics takes over once copper runs out of physics, and the certainty is exactly what makes the stock expensive. What is left to argue about is who captures the economics and when. Nvidia wins in most futures so long as the lasers ship on time. Its $2 billion bought supply security, reserved capacity, and a domestic laser ecosystem, all through a preferred security that stays invisible to 13F trackers until it converts. A retail investor buying the common gets no such protection, just the equity math, which happens to be the one part of the deal Nvidia does not need to work out. Lumentum can be a very good company, the technology can arrive on schedule, and the shares can still be a poor investment. The stock has stopped asking whether there will be a dynasty. It assumes one, and the only argument left is what year it starts.

## Coherent
Nvidia ran the same playbook on Coherent that morning and paid a very different price. $256.80 per share values the company at roughly $52 billion fully diluted, about 7 times revenue against the 22 times it paid on Lumentum’s much smaller base. Some of the discount is positioning. SemiAnalysis expects Lumentum to be the sole supplier of high-power lasers for Nvidia’s first CPO switch shipments, with Coherent following as a second source in late 2026, and the first mover commands the premium. Some of it is mix, since a quarter of Coherent’s revenue is industrial equipment that no one confuses with an AI story. Run the discounted cash flow backward and the price implies Coherent needs about $32 billion in revenue by FY2036, roughly 4.5 times its current base, with operating margins nearly doubling along the way. Demanding by any normal standard. Still a fraction of the thirteenfold ramp embedded in Lumentum’s price.

At Nvidia’s price, Coherent is the simpler bet. It already holds roughly 15% of AI-cluster optics as the number two transceiver supplier, and Nvidia’s entry valuation implies roughly that same share of LightCounting’s $100 billion bull case. If the market shows up, Coherent mostly has to keep its seat. Lumentum needs the same market growth plus share gains on top, which makes the two investments different bets wearing the same announcement. The public market has since made Coherent less forgiving too. By early August, investors were paying nearly 11 times revenue against the 7 times Nvidia paid, which pencils out to about $20 billion of optics revenue by 2030, or 20% of the bull-case market. Nvidia priced Coherent to keep its share. The public is pricing it to gain five points.
