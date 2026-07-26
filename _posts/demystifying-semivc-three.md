---
title: "Demystifying the Semiconductor Value Chain: Advanced Packaging"
date: "2026-07-05T20:48:14.368Z"
---
My uncle Nelson Huang ran Golden Wok for over a decade. He can skin a chicken in under a minute, and he knows which regulars want extra chili oil without asking. Until recently, he believed the hardest part of the restaurant business was promoting his food.

Then, eighteen months ago, a delivery app put Golden Wok on its front page when a food influencer filmed herself cracking open his [Beggar's chicken](https://en.wikipedia.org/wiki/Beggar%27s_chicken) — a whole bird stuffed with mushrooms and seasoned rice, wrapped in lotus leaves, sealed in clay. To prepare the dish, he has to bake the entire thing for six hours until the shell is hard enough to be broken at the table with a small mallet. "Genuinely life-altering," she told four million people. Orders quadrupled in a month, and everyone wanted the chicken.

![Influencer Streaming at Restaurant](/assets/demystifying-semivc-three/influencer-streaming-at-restaurant.png)

After going viral, my uncle did everything he could to keep up with all the eager foodies reserving a spot to try the chicken. He raised prices, he hired, he prepped more and stayed open later. And that's when he learned the real lesson of running his restaurant: **You can ramp up your own kitchen however you want. You can't ramp up your suppliers.** Over the next year and a half, that one dish failed him three times, and never once because of the chicken.

## The Lotus Leaf
The Beggar's chicken has a maximum size, and it isn't set in the kitchen. The lotus sets it. A leaf grows as big as a leaf grows, and it needs to wrap the chicken perfectly. If too big, all the aromatics escape, and the chicken bakes dry; if too small, the stuffing leaks out and the mushrooms burn in the oven. If no vendors at the farmer's market sell lotus leaves with the right size, Uncle Nelson still has to find a way to serve the dish. So at banquets, when big spending regulars request extra chicken, he wraps two chickens together in an oversized leaf, and serves them side by side as one platter. To keep the seams from tearing under the extra weight, Uncle Nelson has to enlist his Taiwanese cousins, who run a catering crew across town and know the double-fold that holds. His own line is already maxed out just keeping up with the singles; customers who just want soup dumplings are turned away.

Three thousand miles away, a man in a leather jacket has the same problem. Nvidia's lotus leaf is the reticle, which limits the largest pattern a lithography machine can print onto a wafer. So Nvidia cannot design a GPU die exceeding the 26 mm × 33 mm exposure field. To get past the limit, Blackwell ships as two maximum-size dies served in one package, linked tightly together to behave as a single chip.

![Reticle Limit](/assets/demystifying-semivc-three/reticle-limit.svg)

To manufacture Blackwell, [TSMC](https://semimarketcap.com/c/tsm)'s advanced packaging lines hit the same capacity ceiling as the lines at Golden Wok. Only so many double-die packages can be bonded through [CoWoS](https://michaelhly.substack.com/i/206253511/cowos-chip-on-wafer-on-substrate) each month, and the hyperscalers' datacenter build-out has all the assembly lines backed up. To keep all the MAG7 customers happy, TSMC keeps the high-margin chip-to-wafer bonding in-house and offloads overflow work to fellow Taiwanese assembly houses, [ASE](https://semimarketcap.com/c/asx?range=3m), PTI, and [Amkor](https://semimarketcap.com/c/amkr?range=3m) in the U.S. for specific substrate-assembly, testing, and legacy-packaging steps. Gamers who just want an RTX 50-series card for their PC are turned away, as every available advanced packaging slot gets prioritized for AI accelerators instead.

From here, the kitchen lines and the packaging lines fail in parallel, layer by layer:
![CoWoS Stack](/assets/demystifying-semivc-three/cowos-stack.svg)

## The Seasoning
Then my uncle's distributor called. The MSG in the stuffing was on allocation, rationed out like wartime butter. Some new-age diet fad had turned sodium into the enemy, and every company on earth now needed MSG to promote its sodium-free wellness branding. The MSG producers said their expansion would not complete for another two years. Without any alternatives, Uncle Nelson bought what he could and reformulated around the rest.

Ajinomoto, the company famous for creating MSG, makes the insulating film laminated between every sheet of copper wiring, seasoning the layers of the interconnect board since the Pentium III. The miniature circuit board inside every processor, also known as the substrate, is built one build-up layer at a time: copper then film, then copper again, stacked on both sides of a rigid core woven through with glass cloth. Before Intel's Pentium III, processors used messy liquid insulating inks that had to be screen-printed, dried, and polished one coat at a time. Instead of painting insulation on as a liquid, Ajinomoto provided factories with a ready-made sheet of insulation film clean enough for lasers to drill microscopic holes that connect one layer of wiring to the next. This substitution made it possible to build substrates through a stack-and-repeat process.

![From MSG to ABF](/assets/demystifying-semivc-three/abf-from-msg.svg)

Like Scotch tape, the Ajinomoto Build-Up Film (ABF) became the name for an entire category. It is the foundation of semiconductor chip packages, and today the entire AI build-out funnels through it. Blackwell, AMD's Helios, and every hyperscaler's custom ASIC all stand on the same layers of insulation film. No one has found a qualified substitute yet. Neither, for what it's worth, has my uncle Nelson. He and Jensen share the same supplier, and Ajinomoto seasons both the stuffing and the substrate.

## The Clay
Next, there was a clay shortage. The food-safe casing blend comes from exactly three regional suppliers, and every restaurant chasing the same viral dish was calling all three. So Uncle Nelson did something ten years of thin margins taught him to never do: <u>he prepaid</u>. After maxing out six credit cards and enrolling in seven buy now, pay later financing plans, he advanced his clay suppliers the money to produce more clay just to guarantee his allocation.

Jensen's clay is the substrate, a layered slab of fiberglass-reinforced resin that connects the chiplets to the circuit board. For most of the chip industry's history, the substrates were invisible plumbing: a 2015 CPU only needed a few ABF layers in a ~40mm package that cost about 50 bucks and shipped within weeks from suppliers nobody has heard of. Blackwell blew up that package. Its two huge dies and eight memory stacks are wired together on a single giant substrate, consuming three to four times as much substrate material as the ordinary CPU. To secure enough packaging capacity, [Nvidia reportedly fronted roughly half of the cost of expansion projects at Ibiden and Unimicron](https://nikhs.substack.com/i/193555356/qualification-not-capacity-is-the-real-moat). But volume is only half the challenge. Each advanced substrate must also be tailored to the electrical and mechanical demands of a specific chip module to run AI workloads at scale. Chip and substrate makers now co-design each generation of AI packages, and must coordinate their capacity and R&D roadmaps in lockstep. That up-front capital and deep coordination have [concentrated the advanced-substrate market around a handful of incumbents](https://www.datagravity.dev/p/the-abf-substrate-bottleneck).

![ABF Market Share](/assets/demystifying-semivc-three/abf-market-share-ibiden.svg)

## The Rice Straws
Uncle always said the secret to a good Beggar's chicken was a sturdy pack of straws. He followed the tradition his grandfather taught him, in which the straws bound the lotus-wrapped bird and held every seam tight while he packed mud all over to make a smooth grey egg. The hidden fiber kept the clay from cracking as it shrank in the heat. When the distributor called the second time to say the rice straws were delayed, it was, quite literally, the straw that nearly broke my uncle's back.

Nvidia's Blackwell architecture relies on the same principle. Inside the substrate beneath each chip, woven glass fiber, specifically T-glass, holds brittle laminate together through the heat of assembly and the stress of thermal cycling.

![CTE Comparison](/assets/demystifying-semivc-three/cte-comparison.svg)

The most advanced cloth comes almost exclusively from a single Japanese textile mill, Nitto Boseki. When AI demand surged, there wasn't enough fabric to go around. Thus, prices jumped, and orders backed up for over a year. [Procurement teams](https://asia.nikkei.com/business/technology/tech-asia/apple-and-qualcomm-fret-over-strained-supplies-of-japan-s-glass-cloth) from billion-dollar firms all flew to Japan to plead for allocation.

## The Bullwhip
After running the restaurant for over ten years, my uncle had to close down Golden Wok. The viral rush worked its way backward through the supply chain. Suppliers raised their bulk minimums to justify investments needed for new production, and by the time the order reached the straw weaver, a month of viral demand looked like the new normal. Uncle Nelson prepaid at the top of that curve. Then the video cycled out of everyone's feed and the delivery app's orders shrank back to what they had always been. However, the clay and straws Uncle Nelson had bought kept arriving on schedule and he wasn't able to repurpose the materials for another dish. Only then did the other half of the bullwhip show up, the half nobody warned him about.

Investors see the same risk in capital expenditures spent on AI infrastructure and do not want to be caught on the wrong side of the bullwhip. Every quarter, critics trace how many Blackwells were bought with Nvidia's own money, spreading doubts about the circular, debt-adjacent, self-referential financing behind the AI buildout. OpenAI raises billions from chip designers and places orders. Neoclouds borrow against chips and place orders. But the critics are looking in the wrong direction. Nvidia must first convince its suppliers to scale up so that there is an AI build-out in the first place. For more GPUs to exist, Ibiden, Ajinomoto, and Nitto Boseki must all expand capacity, adjusting to exogenous AI demand that they don't understand yet, without relying on the volatile signals from the front end of the bullwhip:

![Nvidia Smoothing the Bullwhip](/assets/demystifying-semivc-three/bullwhip-transformation.svg)

Nvidia's spending in prepayments, commitments, and investments is what absorbs the swings until the curve is steady enough for suppliers to build against. But unlike Golden Wok's backroom, where materials piled up as demand evaporated, Nvidia's prepayment balance has held steady around $4 to $5 billion as
- annual GPU shipments doubled over the course of three years
- data center revenue grew roughly eightfold since FY2023
- gross margins expanded from 57% into the seventies

![Nvidia's Prepayments](/assets/demystifying-semivc-three/nvda-prepaid-composition.svg)

What the flat line suggests is that Nvidia's suppliers have steadily turned those prepayments into more capacity. Here, the additional output is being consumed as fast as it was reserved, and Nvidia has not accumulated a stockpile at risk of turning into dead inventory.

Investors are right to be concerned. If AI demand fizzles out like the reservations and delivery orders for the Beggar's chicken, then every prepayment becomes the straws and clay my uncle had bought. But Uncle Nelson's mistake was not prepaying for supplies. It was betting on the viral success of his Beggar's chicken by himself. Nvidia's strategy is to introduce artificial intelligence into everyone's lives, from consumers to enterprises alike. To do that, Jensen is willing to build up all [five layers of the AI cake](https://blogs.nvidia.com/blog/ai-5-layer-cake/), and that means backstopping OpenAI and the neoclouds, courting China, and [arming open-weight enthusiasts](https://x.com/JensenHuang/status/2080643682408321103). Every prepayment and investment turns his bet into someone else's contract, from the chatbot all the way to the glass yarn. Nvidia is doing everything it can to stay ahead of the bullwhip. But if supply ultimately outruns demand, someone along the chain will still be caught by its snap and meet the same fate as Golden Wok.
