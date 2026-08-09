---
title: "Demystifying the Semiconductor Value Chain: Interconnect"
date: "2026-08-05T20:48:14.368Z"
---
In April 2017, the Kansas City Chiefs traded up to draft Patrick Mahomes with the tenth overall pick. Everyone knew that Mahomes was the future of the franchise. The coaches knew, the fans knew, and so did the person he was drafted to replace. 

![Alex Smith and Patrick Mahomes](/assets/demystifying-semivc-four/alex-smith-patrick-mahomes.png)

And then he sat his first season. The coach chose Alex Smith as the starting quarterback. Around the league, Smith had been viewed as the archetypal "game manager", a label scouts often used dismissively. He didn't have an overpowering arm, preferred the safe checkdown over the risky throw, and rarely forced the ball into tight windows. For more than a decade, across two franchises, critics saw Smith as a quarterback capable of running an efficient offense but not as a franchise cornerstone that could carry a team to the Super Bowl. Though not as electric as the other star quarterbacks around the league, Smith made up for it with consistency. His knack for taking what the defense gave him and keeping mistakes off the scoreboard made coaches comfortable starting him every Sunday.

The AI build-out has an Alex Smith of its own. It is a piece of copper wire. Everyone knows optics will move data faster and farther than copper's physics will ever allow, and every industry roadmap has already penciled in the handoff. Yet when hyperscalers assemble the 100K+ GPU clusters driving today's AI boom, the highest-bandwidth links in the machine still run on copper. What it lacks in flash, it makes up for what matters most in production, reliability.

## The Scouting Report on the Phenom
A [2017 draft profile](https://www.si.com/nfl/2017/03/27/patrick-mahomes-nfl-draft-scouting-report) described watching Patrick Mahomes play quarterback "a bit like watching someone slice a banana with a playing card — you're not sure how it happened, but it looks cool as hell." In college, he threw for more than 5,000 yards while routinely attempting passes that most quarterbacks wouldn't even consider. The only knock on him was that his team didn't win. Mahomes once put up 819 yards in a single game, an FBS record that still stands, and lost [66–59](https://www.espn.com/college-football/matchup?gameId=400869616). College football's most dazzling player couldn't consistently produce the one stat that mattered; saddled with a 13-16 record as a starter for Texas Tech, he was in the [Heisman conversation](https://www.ncaa.com/news/football/hand-him/2016-10-24/heisman-watch-texas-techs-patrick-mahomes-record-setting-campaign) in October and forgotten by December.

For over a decade, silicon photonics demos looked like Patrick Mahomes's college highlight reel. The demos showcased trillions of bits flowing through a chip no larger than a fingernail, but the wins that mattered never came. The prototypes skipped nearly every problem standing between a lab demo and a shipping product. Tiny ring-shaped modulators that encode data were so sensitive that just a few nanometers of manufacturing variation or a single degree of temperature drift could knock them off their wavelength. Lasers posed another problem. A failed laser in a pluggable module just meant swapping the module, but a laser sealed inside a chip that cost tens of thousands of dollars turned the same failure into an expensive loss. And even if reliability had been solved, mass production remained out of reach. Attaching fibers to wafers and testing optics at volume remained brutally difficult, and no one had a financial reason to get them right for servers running traditional [create, read, update, and delete](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) workloads.

## The Game Manager's Secret
So why is copper reliable? The answer is simple. A passive copper link is just a piece of metal. There is no laser to degrade, no modulator to drift, nothing inside the cable to wear out or overheat. Its failure modes are predictable and easy for the engineer to catch while building the server rack. And like most game managers, copper comes without a premium. Moving a bit over copper costs a fraction of the power and money of moving it over optics, because the data never has to change form from electrons to photons and back. Copper gets no fanfare for making the short checkdowns that move the ball, but the data keeps moving and nothing gets dropped.

![Copper vs. Optic Links](/assets/demystifying-semivc-four/copper-vs-optical-link-anatomy.svg)

An optical link is complicated. At each end of every fiber-optic cable sits a small plug-in module that uses a laser to turn data into light. But first, the signal has to cross several inches of circuit board to reach the module. The trip leaves it smeared and faint, so a chip inside rebuilds every bit before handing it to the laser. That cleanup chip alone can burn nearly [half the module's power](https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=10526441). And the lasers themselves wear out, drawing more and more current to hold the same brightness, until one day they cannot.

![Rebuilding Bits](/assets/demystifying-semivc-four/rebuilding-bits.svg)

Nvidia initially planned an [optical 256-GPU scale-up](https://newsletter.semianalysis.com/i/175661160/nvlink-scale-up-interconnect) back in 2022 and [quietly shelved it](https://pytorchtoatoms.substack.com/p/why-dgx-h100-nvl256-never-shipped) due to the cost, power, and latency of running high-bandwidth scale-up over pluggable optics. A GPU's scale-up links carry roughly nine times the bandwidth of its scale-out network, and delivering that over transceivers would have been prohibitively expensive in both dollars and watts. That is before even asking how many plugs could fit on the front of the server. So when AI models outgrew the 8-GPU server, Nvidia followed the old adage to *use copper where you can, optics where you must*. The GB200 packed all 72 GPUs and their switches into a single liquid-cooled rack, keeping every link inside copper's two-meter reach.

Here we compare the GB200's NVLink interconnect system in rack in copper and in optics, side by side:

| | With Copper | With Optics |
|---|---|---|
| **Hardware** | 5,184 copper cables, one per differential pair (72 DPs per GPU × 72 GPUs) | 648 1.6T twin-port transceivers per NVL72 rack |
| **Power** | Passive, no meaningful added draw | ~30W per transceiver ≈ 19.4kW extra per rack |
| **Cost (BoM)** |  $3k/GPU ($216k/rack) | ~$850 per transceiver → $550,800 per rack in transceivers alone |
| **Reliability** | ~2 FIT (failures per billion device-hours) | ~1,000–2,000 FIT |
| **Reach** | ~2 m, enough to stay inside one rack (NVL72) | 50 m to 2 km, enough to cross racks and rows (NVL576's L1-to-L2 links) |

Nvidia's decision to go with the game manager paid dividends not just for Nvidia, but for everyone holding the wire. The clearest winner was Amphenol, the connector maker that custom-engineered the NVLink spine cartridge for the GB200 NVL72. By 2025, Amphenol's IT Datacom business accounted for more than a third of company sales, with that segment's fourth-quarter sales growing 110% year over year on the back of AI infrastructure spending. Customers were ordering faster than Amphenol could ship, placing a record $8.4 billion of orders against $6.4 billion of sales. A connector company that spent a century selling unglamorous metal had become one of the most direct ways to invest in the AI buildout.

![Amphenol IT Datacom Growth](/assets/demystifying-semivc-four/amphenol-datacom-growth.svg)

## The Succession Plan 
Andy Reid built the Chiefs' offense around Alex Smith's strengths, emphasizing easy completions and yards after the catch. By scheming short, quick throws on first down, Reid shrank the field for the quarterback and let the Chiefs' playmakers generate extra yards to move the chains. Smith then became a mentor for Patrick Mahomes, who spent his rookie season learning Reid's system and absorbing Smith's methodical approach to reading defenses and managing the game. Kansas City also spent to build the roster around him, adding weapons on offense and fortifying its defense, giving Mahomes the supporting cast he did not have at Texas Tech. When Mahomes took over the following season, he immediately turned all of it into an MVP campaign.

Nvidia is now running a similar succession plan to transition from copper-based scale-up to co-packaged optics (CPO). Co-packaging moves the optics from the plug-in module at the front of the box to right beside the chip, and because the signal no longer has to cross the circuit board, the digital signal processor needed to rebuild the signal disappears with it. The laser is the exception, still pluggable because it fails more often than anything else in the link. The savings are dramatic. Where a DSP-based pluggable module burns around 16 watts to deliver 800G of bandwidth, Nvidia's co-packaged version needs 4 to 5, a [roughly 73% cut](https://newsletter.semianalysis.com/i/178153689/cpo-scale-out-power-budgets). At GTC 2025, Nvidia introduced its first CPO products, and tellingly they were scale-out switches, not scale-up systems. In the scale-out, Nvidia is rehearsing its co-packaged optics debut the way Reid redshirted Mahomes. The switches let the supply chain ramp, build a track record for reliability in the field, and teach operators to live with optics that no longer unplug, all in the network that carries a ninth of the bandwidth of scale-up. The real payoff then comes later in scale-up, where retiring copper's two-meter reach would finally let the machine grow beyond a single rack.

Along the way Nvidia has been buying its way into the optics supply chain. In March 2026, it took sizeable stakes in Lumentum and Coherent, the two companies expected to supply the [high-power lasers](https://newsletter.semianalysis.com/i/178153689/external-laser-source-els) at the heart of co-packaged optics, with SemiAnalysis expecting Lumentum to supply Nvidia's initial CPO switch shipments and Coherent to enter behind it as a second supplier in late 2026. Nvidia also [partnered with Corning](https://nvidianews.nvidia.com/news/nvidia-and-corning-announce-long-term-partnership-to-strengthen-us-manufacturing-for-ai-infrastructure), the company that draws the glass fiber itself, taking a warrant package worth up to [$3.2 billion](https://www.cnbc.com/2026/05/06/nvidia-corning-optical-factories-nc-texas-ai.html) if fully exercised and backing three new plants in North Carolina and Texas that will grow Corning's US optical connectivity capacity tenfold. The money came with multibillion-dollar purchase commitments and reserved manufacturing capacity, aimed squarely at the flaws that kept silicon photonics stuck in the lab for a decade.

In roughly five months, Nvidia put over $6.5 billion into the optical supply chain, with warrants that could push the total past $9 billion:
| Company | Amount | Price per share | Announced | Role in the chain |
|---|---|---|---|---|
| Lumentum | $2B convertible preferred | $695.31 | Mar 2026 | High-power external lasers, where SemiAnalysis expects Lumentum to be the sole supplier for Nvidia's initial CPO switch shipments |
| Coherent | $2B common stock | $256.80 | Mar 2026 | Lasers again, with SemiAnalysis expecting Coherent to enter as a second supplier in late 2026 |
| Marvell | $2B convertible preferred | $91.84 conversion price | Mar 2026 | Silicon photonics and networking silicon, bundled with NVLink Fusion |
| Corning | $500M for warrants, rising to $3.2B if the traditional warrant is exercised in full | $180.00 traditional warrant strike | May 2026 | The fiber itself, alongside a partnership funding three new US plants |
| Ayar Labs | Participated in a $500M Series E | $52.24 round price | Mar 2026 | Optical I/O chiplet startup |

The market is not waiting for the handoff. Experts describe [CPO for scale-up as not a matter of if and why, but when and how](https://newsletter.semianalysis.com/p/co-packaged-optics-cpo-book-scaling), and the prices agree. Nvidia paid $695.31 per share for its Lumentum stake in March, valuing the company at roughly $67 billion fully diluted on about $3 billion in revenue, and the stock has traded well above that level since. Investors should notice that the most informed buyer in the room is not paying for a promising rookie. The sticker price far exceeds what the Chiefs paid for Mahomes. Nvidia bought in at 84 times this year's expected earnings, and the public pays over a hundred today, prices that both warrant multiple Super Bowls. It is worth doing that arithmetic out loud ...

---
<i>Paywalled Content</i>

Nvidia's investment values Lumentum at $67 billion today. That price is a claim on profits the company has not earned yet, and the later they arrive, the less they count. Running it backward, at an ordinary cost of capital and with a generous 32% operating margin held the whole way, the price needs Lumentum at roughly $19.9 billion of revenue by FY2031 and $37.7 billion by FY2036. Lumentum did $1.36 billion in FY2024 and lost half a billion dollars doing it. So the price is not really asking whether CPO follows through. It is asking one company to become thirteen times its current size and to still be standing there when it arrives.

The fairer way to put that is in market share, because the market itself is moving. LightCounting sizes AI cluster optics at $26 billion in 2026, up 60% in a year, and thinks there is a reasonable chance it reaches $100 billion by 2030 if enough goes right. Lumentum holds about 12% of that today. Nvidia's price needs somewhere between a sixth and a quarter of a market that has itself quadrupled, which is a bet on the market and a bet on Lumentum's share of it, made at the same time and both having to land.

![What Nvidia's Price Asks For](/assets/demystifying-semivc-four/implied-valuation-ramp.svg)

And that is the discount price. The public market pays more. At the roughly $86 billion Lumentum trades for today, the same arithmetic needs $25.5 billion of revenue by fiscal 2031, $48.2 billion by fiscal 2036, and a fifth of a $100 billion market. Nvidia also did not buy common stock. It bought convertible preferred, with downside protection the public shareholder does not get. The most informed buyer in the room paid the smaller price and took the safer security, and the market filled in the optimism afterward.

Three things have to be true at once for that, and they pull against each other. The market has to get enormous, Lumentum has to keep most of it, and it has to earn a fat margin the whole way. The first is close to settled. The other two are the same question asked twice, and the answer is not up to Lumentum. Nvidia put $2 billion into Lumentum and $2 billion into Coherent on the same morning, kept both relationships explicitly non-exclusive, and has named five more laser partners besides. A buyer who arranges his supply that carefully does not intend to hand over the surplus. The Chiefs paid Mahomes $450 million because they could not go get another one. Nvidia has spent the past year making very sure that it can.

The money to get there is not free either. Lumentum is converting its profits into fabs rather than into cash, which is the right decision and also the reason the earnings being capitalized keep getting spent. Growth is only worth paying for when what you sink into it earns more than it costs, and the history of this industry is a long argument that it usually does not. The same fabs that produced a 32% operating margin last quarter produced a $546 million loss two years ago.

Then there is the calendar, which is where the analogy stops being a flourish. Mahomes cost Kansas City a rookie contract for three years, and the first ring arrived inside it. Optics is being paid at the top of the market and asked to deliver afterward. SemiAnalysis puts the real scale-up handoff past Rubin Ultra, out toward Feynman. At a ten percent discount rate, pushing a stream of cash flows out by one generation costs about a sixth of its value before a single other assumption changes, and none of the physics has to be wrong for that to happen.

In 2017, the Chiefs paid up for Patrick Mahomes. Two first-round picks and a third to climb from 27th to 10th, when the league was unsure whether his talent would translate to the NFL. He needed a franchise willing to [be patient](https://www.espn.com/nfl/draft2017/story/_/id/19259218/2017-nfl-draft-kansas-city-chiefs-trade-select-patrick-mahomes) and develop him behind a veteran starter. The sticker price looked steep on draft night, and three seasons later nobody could tell you what the trade had cost. On the other hand, the optics trade does not present the same draft night story. Everyone already knows optics will take over once copper exhausts its physical limits. The dynasty is already in the price, and the only thing left to argue about is what year it starts.

## Appendix: A Glossary

**Silicon photonics** is the underlying technology for building optical components, lasers aside, out of silicon on standard semiconductor manufacturing lines rather than assembling them from discrete parts.

**Scale-up** is the tight, high-bandwidth mesh that binds a group of GPUs into what behaves like a single machine, so that every GPU can talk to every other one at full speed. Nvidia's version is NVLink. Because the bandwidth is enormous and the latency budget is tiny, these links have always run on copper, which is why their two-meter reach caps how large that single machine can get.

**Scale-out** is the ordinary datacenter network, InfiniBand or Ethernet, that connects those machines to each other to form a cluster of thousands. It carries roughly a ninth of the per-GPU bandwidth of scale-up and has to span racks and rows, so it went optical years ago. Scale-up is the huddle, scale-out is the rest of the league.

**NVLink** is Nvidia's proprietary scale-up interconnect. The fifth generation, used in Blackwell, moves 900 GB/s per GPU in one direction.

**A pluggable transceiver** is the small module that plugs into the front of a switch or server and converts electrical signals into light and back. It is the standard way optical links are built today.

**A digital signal processor**, or DSP, is the chip that rebuilds the electrical signal after it crosses the circuit board. The majority of pluggable optical transceivers shipping today carry one. It reshapes the waveform, recovers the timing, and decides again whether each bit was a zero or a one. This process consumes nearly half the transceiver's power.

**Co-packaged optics**, or CPO, moves the optical conversion off the faceplate and onto the same package as the GPU or switch chip. Because the signal no longer crosses the board, the DSP is no longer needed, which is where most of the power savings come from. The tradeoff is that the optics can no longer be unplugged.

**A modulator** is the component that imprints data onto a beam of light by switching it on and off, or shifting its phase, billions of times a second.

**FIT**, or failures in time, counts expected failures per billion device-hours. Lower is better. A passive copper cable runs around 2 FIT, an optical transceiver around 1,000 to 2,000.

