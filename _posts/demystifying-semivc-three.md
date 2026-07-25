---
title: "Demystifying the Semiconductor Value Chain: Advanced Packaging"
date: "2026-07-05T20:48:14.368Z"
---
My uncle Nelson Huang has run Golden Wok for over a decade. He can skin a chicken in under a minute, and he knows which regulars want extra chili oil without asking. Until recently, he believed the hardest part of the restaurant business was promoting his food.

Then, eighteen months ago, a delivery app put Golden Wok on its front page when a food influencer filmed herself cracking open his [Beggar's chicken](https://en.wikipedia.org/wiki/Beggar%27s_chicken) — a whole bird stuffed with mushrooms and seasoned rice, wrapped in lotus leaves, sealed in clay. To prepare the dish, he has to bake the entire thing for six hours until the shell is hard enough to be broken at the table with a small mallet. "Genuinely life-altering," she told four million people. Orders tripled in a month, and everyone wanted the chicken.

![Influencer Streaming at Restaurant](/assets/demystifying-semivc-three/influencer-streaming-at-restaurant.png)

After going viral, my uncle did everything he could to keep up all the eager foodies who wanted to try the chicken. He hired, he prepped more, he stayed open later. And that's when he learned the real lesson of running his restaurant: **You can ramp up your own kitchen however you want. You can't ramp up your suppliers.** Over the next year and a half, that one dish failed him five times, and never once because of the chicken.

## The Assembly
The Beggar's chicken has a maximum size, and it isn't set in the kitchen. The lotus sets it. A leaf grows as big as a leaf grows, and it needs to wrap the chicken perfectly. If too big, all the aromatics escape, and the chicken bakes dry; if too small, the stuffing leaks out and the mushrooms burn in the oven. If none of the vendors at the farmer's market sells lotus leaves with the right size, my uncle still has to find a way to serve the dish. So at MAG7 banquets, when the patrons request extra chicken, he wraps two chicken together in an oversized leaf, and serves them side by side as one platter. To keep the seams from tearing under the extra weight, Nelson has to enlist his Taiwanese cousins, who run a catering crew across town and know the double-fold that holds. His own line is already maxed out just keeping up with the singles, customers who just want soup dumplings are have to be turned away.

Three thousand miles away, a man in a leather jacket has the same problem. Nvidia's lotus leaf is the reticle, which limits the largest pattern a lithography machine can print onto a wafer. So Nvidia cannot design a GPU die exceeding the 26 mm × 33 mm exposure field. Blackwell is two maximum-size dies served as one platter, linked tightly together to behave as a single chip.

![Reticle Limit](/assets/demystifying-semivc-three/reticle-limit.svg)

[TSMC](https://semimarketcap.com/c/tsm)'s own advanced packaging lines hit the same capacity ceiling. Only so many double-die platters can be bonded on its in-house [CoWoS](https://michaelhly.substack.com/i/206253511/cowos-chip-on-wafer-on-substrate) capacity in a given month, and Blackwell's launch blew past that number immediately. Rather than turn away the order, TSMC outsources the overflow to fellow Taiwanese assembly houses, ASE, PTI, and Amkor in the U.S., which fold and bond whatever volume TSMC's own lines can't absorb.

From here, the two kitchens fail in parallel, layer by layer:
![CoWoS Stack](/assets/demystifying-semivc-three/cowos-stack.svg)

## The Seasoning
Then his distributor called. The MSG in the stuffing was on allocation, rationed out like wartime butter. Some new-age diet fad had turned sodium into the enemy, and every compoany on earth now needed MSG to promote its sodium-free welness branding. The MSG producer's said their expansion would not complete for another two years. Without any alternatives, uncle Nelson brought what he could and reformuulated around the rest.

![From MSG to ABF](/assets/demystifying-semivc-three/abf-from-msg.svg)

Ajinomoto, the company famous for creating MSG, also makes the insulationg film laminated between every sheet of copper wiring, seasoning the layers of the interconnect board that supports the chiplets. The board, also known as the substrate, is constructed one build-up at a time: film then copper, then film again. Like Scotch tape, Ajinomoto became the category for the foundation of semiconductor chip packages, and today the entire AI buildout funnels through it. Blackwell, AMD's Helios, and every hyperscaler's custom ASIC all stand on the layers of the Ajinomoto Build-up Film (ABF). No one has found a qualified substitute yet. Neither, for what it's worth, has my uncle Nelson. He and Jensen share the same supplier, and Ajinomoto seasons both the stuffing and the substrate.

## The Clay
Next, there was a clay shortage. The food-safe casing blend comes from exactly three regional suppliers, and every restaurant chasing the same viral dish was calling all three. So uncle did something ten years of thin margins taught him to never do: <u>he prepaid</u>. After maxing out six credit cards and enrolling in seven buy now, pay later financing plans, he advanced his clay suppliers the money to produce more clay just to guarantee his allocation.

Jansen's clay is the substrate, the slab of  fiberglass-reinforced resin that provides the layered foundation connecting all the chiplets to the printed circuit board. For most of the chip industry's history, the substrate was just plumbing; a 2015 CPU needed a few ABF layers in a ~40mm package that cost about 50 bucks and shipped in weeks from suppliers nobody thought about. Blackwell blew that package apart by pairing two huge dies with eight memory stacks all wired together on a signle giant substrate. That is three to four times the substrate material of an ordinary CPU in a single product. To ensure that products are delievered to customers on tome, Nvidia, along with AMD and Intel, fronted roughly half of the captial expansion projects for Ibiden, Unimicron, Shinko and AT&S. As a result, advanced substrates are no longer commodities pulled from a catalog; each is manufactured inricately according to the specific needs of a chip module to support AI workfloads at scale. As chip and substrate makers began co-designing the next generation of AI packages, their relationship evolved from one that was merely transactional to one that demands lockstep coordination on capacity and R&D roadmaps. The invested capital and intertwined partnerships have locked the advanced substrate market around a handful of incumbents, pulling the top ABF makers further away from the rest of the pack.

![ABF Market Share](/assets/demystifying-semivc-three/abf-market-share-ibiden.svg)

## The Rice Straws
My uncle always said the secret to a good beggar's chicken was a sturdy pack of straws. He followed the tradition his grandfather taught him, in which the straws bound the lotus-wrapped bird and held every seam tight while he packed mud all over to make smooth grey egg. The hidden fiber kept the clay from cracking as it shrank in the heat. When the distributor called the second time to say the rice straws were delayed, it was, quite literally, the straw that almost broke my uncle's back.

Nvidia's Blackwell architecture relies on the same principle. Inside the substrate beneath each chip, woven glass fiber, specifically T-glass, holds brittle laminate together through the heat of assembly and the stress of thermal cycling. The most advanced cloth comes almost exclusively from a single Japanese textile mill, Nitto Boseki. When AI demand surged, there wasn't enough fabric to go around. Thus, prices jumped, and orders backed up for over a year. Procurement teams from trillion-dollar firms all flew to Japan to plead for allocation.
