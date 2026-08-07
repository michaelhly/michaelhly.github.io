---
title: "Demystifying the Semiconductor Value Chain: Interconnect"
date: "2026-08-05T20:48:14.368Z"
---
In April 2017, the Kansas City Chiefs traded up to draft Patrick Mahomes with the tenth overall pick. Everyone knew that Mahomes was the future of the Kansas City Chiefs. The coaches knew, the fans knew, and so did the person he was drafted to replace. 

![Alex Smith and Patrick Mahomes](/assets/demystifying-semivc-four/alex-smith-patrick-mahomes.png)

And then he sat his first season. The coach chose Alex Smith as the starting quarterback in 2017. Around the league, Smith had long been viewed as the archetypal "game manager," a label scouts often used dismissively. He didn't have an overpowering arm, preferred the safe checkdown over the risky throw, and rarely forced the ball into tight windows. For more than a decade, across three franchises, the criticism was always the same: Smith could run an efficient offense, but he couldn't carry one. Yet what he lacked in flash, he made up for with poise, discipline, and consistency. His reliability made coaches comfortable starting him every Sunday.

In 2026, copper is the Alex Smith of the AI build-out. Everyone knows optics are the future. Copper has reached its physical limits in speed and reach, while optical links promise a higher ceiling. Yet when hyperscalers assemble the 100K+ GPU clusters driving today's AI boom, copper is still the default choice. What it lacks in flash, it makes up for with the trait that matters most in production: reliability.

## The Scouting Report on the Phenom
A 2017 draft profile described watching Patrick Mahomes play quarterback "a bit like watching someone slice a banana with a playing card — you're not sure how it happened, but it looks cool as hell." In college, he threw for more than 5,000 yards while routinely attempting passes that most quarterbacks wouldn't even consider. The only knock on him was that his team didn't win. Mahomes once put up 819 yards in a single game — an FBS record that still stands — and lost 66–59. College football's most dazzling player couldn't consistently produce the one stat that mattered; saddled with a 13-16 record as a starter for Texas Tech, he was completely absent from the Heisman ballot.

For over a decade, silicon photonics demos looked like Patrick Mahomes's college highlight reel. The demos showcased trillions of bits flowing through a chip no larger than a fingernail, but commercialization never produced the wins that mattered because the prototypes sidestepped nearly every problem that stood between a lab demo and a commercial product. The tiny ring-shaped modulators that encode data were so sensitive that just a few nanometers of manufacturing variation or a single degree of temperature drift could knock them off their wavelength. Lasers posed another problem. When a laser in a pluggable module failed, you simply replaced the module. But when the laser was sealed inside a chip that cost tens of thousands of dollars, failure became far more expensive. Mass production wasn't possible anyway. Attaching fibers to wafers and testing optics at volume were still unsolved problems, and no one had a financial reason to solve them for servers doing traditional [create, read, update, and delete](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) work.

## The Game Manager's Secret
So why is copper reliable? The answer is simple. A passive copper link is just a piece of metal. There is no laser to degrade, no modulator to drift, nothing inside the cable to wear out or overheat. Its failure modes are predictable and easy for the engineer to catch while building the server rack. And like most game managers, copper comes without a premium. Moving a bit over copper costs a fraction of the power and money of moving it over optics, because the data never has to change form from electrons to photons and back. Copper gets no fanfare for making the short checkdowns that move the ball. But the short links keep the data moving, and nothing gets dropped.

![Copper vs. Optic Links](/assets/demystifying-semivc-four/copper-vs-optical-link-anatomy.svg)

An optical link is complicated. At each end of every fiber-optic cable sits a small plug-in module that uses a laser to turn data into light. But first, the signal has to cross several inches of circuit board to reach the module. The trip leaves it smeared and faint, so a chip inside rebuilds every bit before handing it to the laser. That cleanup chip alone can burn five of the module's thirteen watts. And the lasers themselves age like light bulbs, dimming and drifting until the link finally fails.

![Rebuilding Bits](/assets/demystifying-semivc-four/rebuilding-bits.svg)

Nvidia initially planned an [optical 256 GPU scale-up](https://newsletter.semianalysis.com/i/175661160/nvlink-scale-up-interconnect) for the H100 generation and [quietly shelved it](https://pytorchtoatoms.substack.com/p/why-dgx-h100-nvl256-never-shipped) due to the cost, power, and latency of running high-bandwidth scale-up over pluggable optics. A GPU's scale-up links carry roughly nine times the bandwidth of its scale-out network, and delivering that over transceivers would have been ruinously expensive in both dollars and watts, before even asking whether that many plugs could fit on the front of the server. So when AI models outgrew the 8 GPU server, Nvidia followed the old adage to *use copper where you can, optics where you must*. The GB200 packed all 72 GPUs and their switches into a single liquid-cooled rack, keeping every link inside copper's two meter reach.

Here we compare the GB200's NVLink interconnect system in rack in copper and in optics, side by side:

| | With Copper | With Optics |
|---|---|---|
| **Hardware** | 5,184 copper cables, one per differential pair (72 DPs per GPU × 72 GPUs) | 648 1.6T twin-port transceivers per NVL72 rack |
| **Power** | Passive, no meaningful added draw | ~30W per transceiver ≈ 19.4kW extra per rack |
| **Cost (BoM)** |  $3k/GPU ($216k/rack) | ~$850 per transceiver → $550,800 per rack in transceivers alone |
| **Reliability** | ~2 FIT (failures per billion device-hours) | ~1,000–2,000 FIT |
| **Reach** | ~1-3 m, enough to stay inside one rack (NVL72) | 50 m to 2 km, enough to cross racks and rows (NVL576's L1-to-L2 links) |

Nvidia's decision to go with the game manager paid dividends not just for Nvidia, but for everyone holding the wire. The clearest winner was Amphenol, the connector maker that custom-engineered the NVLink spine cartridge for the GB200 NVL72. By 2025, Amphenol's IT Datacom business accounted for more than a third of company sales, with that segment's fourth-quarter sales growing 110% year over year on the back of AI infrastructure spending. Customers were ordering faster than Amphenol could ship, placing a record $8.4 billion of orders in the quarter against $6.4 billion of sales. A connector company that spent a century selling unglamorous metal had become one of the most direct ways to invest in the AI buildout.

![Amphenol IT Datacom Growth](/assets/demystifying-semivc-four/amphenol-datacom-growth.svg)

