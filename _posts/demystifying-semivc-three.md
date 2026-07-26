---
title: "Demystifying the Semiconductor Value Chain: Advanced Packaging"
date: "2026-07-05T20:48:14.368Z"
---
My uncle Nelson Huang has run Golden Wok for over a decade. He can skin a chicken in under a minute, and he knows which regulars want extra chili oil without asking. Until recently, he believed the hardest part of the restaurant business was promoting his food.

Then, eighteen months ago, a delivery app put Golden Wok on its front page when a food influencer filmed herself cracking open his [Beggar's chicken](https://en.wikipedia.org/wiki/Beggar%27s_chicken) — a whole bird stuffed with mushrooms and seasoned rice, wrapped in lotus leaves, sealed in clay. To prepare the dish, he has to bake the entire thing for six hours until the shell is hard enough to be broken at the table with a small mallet. "Genuinely life-altering," she told four million people. Orders tripled in a month, and everyone wanted the chicken.

![Influencer Streaming at Restaurant](/assets/demystifying-semivc-three/influencer-streaming-at-restaurant.png)

After going viral, my uncle did everything he could to keep up all the eager foodies who wanted to try the chicken. He raised prices, he hired, he prepped more and stayed open later. And that's when he learned the real lesson of running his restaurant: **You can ramp up your own kitchen however you want. You can't ramp up your suppliers.** Over the next year and a half, that one dish failed him five times, and never once because of the chicken.

## The Assembly
The Beggar's chicken has a maximum size, and it isn't set in the kitchen. The lotus sets it. A leaf grows as big as a leaf grows, and it needs to wrap the chicken perfectly. If too big, all the aromatics escape, and the chicken bakes dry; if too small, the stuffing leaks out and the mushrooms burn in the oven. If none of the vendors at the farmer's market sell lotus leaves with the right size, my uncle still has to find a way to serve the dish. So at MAG7 banquets, when the patrons request extra chicken, he wraps two chicken together in an oversized leaf, and serves them side by side as one platter. To keep the seams from tearing under the extra weight, Uncle Nelson has to enlist his Taiwanese cousins, who run a catering crew across town and know the double-fold that holds. His own line is already maxed out just keeping up with the singles, customers who just want soup dumplings are have to be turned away.

Three thousand miles away, a man in a leather jacket has the same problem. Nvidia's lotus leaf is the reticle, which limits the largest pattern a lithography machine can print onto a wafer. So Nvidia cannot design a GPU die exceeding the 26 mm × 33 mm exposure field. Blackwell is two maximum-size dies served as one platter, linked tightly together to behave as a single chip.

![Reticle Limit](/assets/demystifying-semivc-three/reticle-limit.svg)

[TSMC](https://semimarketcap.com/c/tsm)'s own advanced packaging lines hit the same capacity ceiling. Only so many double-die platters can be bonded on its in-house [CoWoS](https://michaelhly.substack.com/i/206253511/cowos-chip-on-wafer-on-substrate) capacity in a given month, and Blackwell's launch blew past that number immediately. Rather than turn away the order, TSMC outsources the overflow to fellow Taiwanese assembly houses, ASE, PTI, and Amkor in the U.S., which fold and bond whatever volume TSMC's own lines can't absorb.

From here, the two kitchens fail in parallel, layer by layer:
![CoWoS Stack](/assets/demystifying-semivc-three/cowos-stack.svg)

## The Seasoning
Then his distributor called. The MSG in the stuffing was on allocation, rationed out like wartime butter. Some new-age diet fad had turned sodium into the enemy, and every compoany on earth now needed MSG to promote its sodium-free welness branding. The MSG producer's said their expansion would not complete for another two years. Without any alternatives, Uncle Nelson brought what he could and reformulated around the rest.

Ajinomoto, the company famous for creating MSG, also makes the insulating film laminated between every sheet of copper wiring, seasoning the layers of the interconnect board since the Pentium III. The miniature circuit board inside every processor, also known as the substrate, is built one build-up layer at a time, copper then film, then copper again, stacked on both sides of a rigid core woven through with glass cloth. Before Intel's Pentium III, processors used messy liquid insulating inks that had to be screen-printed, dried, and polished one coat at a time. Instead of painting insulation on as a liquid and grinding it flat, Ajinomoto provided factories wth a ready-made sheet of insulation film clean enough for lasers to drill microscopic holes that connect one layer of wiring to the next. This substitution made it possible to build substrates layer by layer.

![From MSG to ABF](/assets/demystifying-semivc-three/abf-from-msg.svg)

Like Scotch tape, the Ajinomoto Build-Up Film (ABF) became the name for an entire category. It is the foundation of semiconductor chip packages, and today the entire AI buildout funnels through it. Blackwell, AMD's Helios, and every hyperscaler's custom ASIC all still stand on the same layers of insulation film. No one has found a qualified substitute yet. Neither, for what it's worth, has my uncle Nelson. He and Jensen share the same supplier, and Ajinomoto seasons both the stuffing and the substrate.

## The Clay
Next, there was a clay shortage. The food-safe casing blend comes from exactly three regional suppliers, and every restaurant chasing the same viral dish was calling all three. So uncle did something ten years of thin margins taught him to never do: <u>he prepaid</u>. After maxing out six credit cards and enrolling in seven buy now, pay later financing plans, he advanced his clay suppliers the money to produce more clay just to guarantee his allocation.

Jansen's clay is the substrate, the slab of  fiberglass-reinforced resin that provides the layered foundation connecting all the chiplets to the printed circuit board. For most of the chip industry's history, the substrate was just plumbing; a 2015 CPU needed a few ABF layers in a ~40mm package that cost about 50 bucks and shipped in weeks from suppliers nobody thought about. Blackwell blew that package apart by pairing two huge dies with eight memory stacks all wired together on a signle giant substrate. That is three to four times the substrate material of an ordinary CPU in a single product. To ensure that products are delievered to customers on tome, Nvidia, along with AMD and Intel, fronted roughly half of the captial expansion projects for Ibiden, Unimicron, Shinko and AT&S. As a result, advanced substrates are no longer commodities pulled from a catalog; each is manufactured inricately according to the specific needs of a chip module to support AI workfloads at scale. As chip and substrate makers began co-designing the next generation of AI packages, their relationship evolved from one that was merely transactional to one that demands lockstep coordination on capacity and R&D roadmaps. The invested capital and intertwined partnerships have locked the advanced substrate market around a handful of incumbents, pulling the top ABF makers further away from the rest of the pack.

![ABF Market Share](/assets/demystifying-semivc-three/abf-market-share-ibiden.svg)

## The Rice Straws
My uncle always said the secret to a good Beggar's chicken was a sturdy pack of straws. He followed the tradition his grandfather taught him, in which the straws bound the lotus-wrapped bird and held every seam tight while he packed mud all over to make smooth grey egg. The hidden fiber kept the clay from cracking as it shrank in the heat. When the distributor called the second time to say the rice straws were delayed, it was, quite literally, the straw that almost broke my uncle's back.

Nvidia's Blackwell architecture relies on the same principle. Inside the substrate beneath each chip, woven glass fiber, specifically T-glass, holds brittle laminate together through the heat of assembly and the stress of thermal cycling.

![CTE Comparison](/assets/demystifying-semivc-three/cte-comparison.svg)

The most advanced cloth comes almost exclusively from a single Japanese textile mill, Nitto Boseki. When AI demand surged, there wasn't enough fabric to go around. Thus, prices jumped, and orders backed up for over a year. [Procurement teams](https://asia.nikkei.com/business/technology/tech-asia/apple-and-qualcomm-fret-over-strained-supplies-of-japan-s-glass-cloth) from billion-dollar firms all flew to Japan to plead for allocation.

## The Bullwhip
After running the restaurant for over ten years, uncle Nelson had to close down Golden Wok. What killed it wasn't the debt. It was that virality is a temporary spike, not durable demand. When orders surged he paid his suppliers upfront, because the clay supplier wasn't going to triple his kiln runs on Nelson's word. Then the line outside vanished, and he was left holding paid-for capacity for customers who had moved on.

This is the accusation leveled at Nvidia. Every quarter, critics trace how many Blackwells were bought with Nvidia's own money, spreading doubts about the circular, debt-adjacent, self-referential financing behind the AI buildout. OpenAI raises billions and places orders. Neoclouds borrow against chips and place orders. But the critics are looking in the wrong direction. For Nvidia to support the buildout, it must first convince its suppliers to scale. For more GPUs to exist, Ibiden, Ajinomoto, and Nitto Boseki must all expand capacity, betting exogenous demand far outside their core business. The signal cannot be the volatile front end of the bullwhip: lumpy, debt-fueled, prone to spikes like the one that killed Golden Wok.

![Nvidia Smoothing the Bullwhip](/assets/demystifying-semivc-three/bullwhip-transformation.svg)

Nvidia's spending in prepayments, commitments, and investments is what absorbs the swings until the curve is steady enough for suppliers to build against. But unlike Golden Wok's backroom, where materials piled up as demand evaporated, Nvidia's prepayment balance has held steady around $4 to $5 billion even as 
- annual GPU shipments doubled over the course of three years
- data center revenue grew roughly eightfold since FY2023
- gross margins expanded from 57% into the seventies

![Nvidia's Prepayments](/assets/demystifying-semivc-three/nvda-prepaid-composition.svg)

What the flat line suggests is that Nvidia's suppliers has steadily turned its prepayments into more capacity. Here, the additional output is being consumed as fast as it was reserved and that Nvidia has not accumulated a stockpile at risk of turning into dead inventory down.

Investors are right to be concerned. If AI demand fizzles out like Golden Wok's reservations for the Beggar's chicken, then every prepayment becomes my uncle's clay. But uncle Nelson's mistake was not prepaying for supplies. It was betting alone. Nvidia's strategy is to introduce artificial intelligence into everyone's lives from consumers to enterprises alike. To do that, Jansen is willing to build up all [five layers of the AI cake](https://blogs.nvidia.com/blog/ai-5-layer-cake/), and that means backstopping OpenAI and the neoclouds, courting China, [arming open-weight enthusiasts](https://x.com/JensenHuang/status/2080643682408321103), and whoever willing to be in the arena. Every prepayment and commitment turns his bet into someone else's contract, down the entire chain, from the chatbot all the way to the glass yarn. Whether that's genius or Golden Wok with better margins is still unfolding in real time.

Subscribe as we turn to the other stakeholders in the value chain, the companies supplying the [memory](https://michaelhly.substack.com/p/unpacked-high-bandwidth-memory-hbm), power, and networking.