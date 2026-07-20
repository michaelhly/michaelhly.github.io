---
title: "The AI Hierarchy Among Hyperscalers"
subtitle: "Why profitability is the wrong metric when evaluating hyperscaler spend"
date: "2026-07-19T20:30:51.231Z"
---
Hyperscalers don't run ordinary businesses like you and me. They don't even run businesses like other public companies. Each of them has been extraordinarily profitable for the last decade, with moats so deep that the US government files antitrust suits against them. In 2017, regulators were keen to observe what quarterly earnings watchers still miss. These companies have never played for profit. They play for dominance, and the profits follow.

Many people criticize the trillions poured into AI data centers and GPUs, questioning how these massive investments can be justified. To understand the behavior of a hyperscaler, let us step outside of our frame as a public market investor, where profitability is the scoreboard, and see the AI problem from a hyperscaler's point of view. In their world, the cost of losing the race for market dominance dwarfs the backlash from a few quarters of missed earnings. In this article, we recap what their capital expenditures has bought each of the four hyperscalers in the AI race since 2023:

![Hyperscaler Race](/assets/hyperscaler-ai-race/hyperscaler-race-2023-vs-2026.svg)!

## Alphabet
Alphabet's story arc in the AI race is a strange one. Its researchers invented the [transformer](https://arxiv.org/abs/1706.03762), the architecture underneath every modern large language model, and published it openly in 2017. Then it watched OpenAI turn that invention into ChatGPT, botched [the launch of its own AI bot](https://www.bbc.com/news/business-64576225), and was written off in the AI race. In order to turn things around, Alphabet merged its labs, rebuilt around Gemini, and spent its way from laggard to leader. And since 2023, Alphabet has made major strides in both the consumer and enterprise markets:
- Gemini has surpassed [900 million monthly active users](https://blog.google/innovation-and-ai/sundar-pichai-io-2026) and growing, up from 400 million the previous year
- Gemini's share of the [LLM API market has grown to 21%](https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/?utm_source=chatgpt.com), up from 7% in 2023

Today, Alphabet is the only true full stack player in the race. None of the other hyperscalers owns every layer from chip to consumer. It designs its own silicon in the form of TPUs, runs its own data centers, trains frontier models through DeepMind, and distributes them through Google products with billions of users. On top of that, Alphabet wins even when Gemini doesn't, because its TPUs now power Anthropic and its cloud serves OpenAI. Whichever lab takes the crown, Alphabet still collects rent.

![Alphabet's Capex Ramp](/assets/alphabet-capex-ramp.svg)

Alphabet guided 2026 capital expenditure to between $175 billion and $185 billion, roughly double its 2025 spend, and the market has extended the same support it did Amazon during the e-commerce build out in the 2000s. In February, investors bought over $30 billion of Alphabet bonds, and poured another $84.75 billion in an equity raise, with Berkshire Hathaway anchoring $10 billion. With the market for intelligence still forming, investors are pricing something no DCF or amortization schedule can capture. They are betting on Alphabet owning a sizeable portion of the market when artifical intelligence matures.

## Amazon
Amazon's willingness to forgo profits for two decades to build its fulfillment and cloud infrastructure became the central case study in [Lina Khan's antitrust critique](https://yalelawjournal.org/note/amazons-antitrust-paradox). She argued that this strategy exposed a blind spot in modern antitrust law by demonstrating that firms can accumulate structural market power while keeping consumer prices low. 

![Amazon's Antitrust Paradox](/assets/hyperscaler-ai-race/amazons-antitrust-paradox.png)

In the AI race, Amazon has largely ignored the glamour contest of frontier models. Instead, it is betting that the real prize isn't building the winning model, but providing the infrastructure every winning model runs on. [Anthropic trains and deploys Claude](https://www.anthropic.com/news/anthropic-amazon-compute) on AWS and Amazon's custom Trainium chips, and [OpenAI recently signed](https://openai.com/index/aws-and-openai-partnership/) a seven-year, $38 billion agreement to expand onto AWS. Amazon's $200 billion in 2026 capex is the largest absolute outlay of any hyperscaler. Betting against Amazon's willingness to spend through skepticism has been a losing trade for twenty-five years. Its goal is to remain in the race and keep the meter running, and nearly every meter in the industry routes through its data centers.

## Microsoft
Microsoft made one of the single greatest venture investment in history and has spent the last couple of years discovering its limits. Its $13 billion investment in OpenAI made Azure the exclusive cloud provider for all of OpenAI's training, products, and APIs, making Microsoft the sole infrastructure partner behind ChatGPT's rise. It also bolted the chatbot as Copilot onto a suite of products such as Windows, Office, VSCode, and GitHub while its rivals were scrambling to find their AI strategy. However, after OpenAI's restructuring, OpenAI has since signed compute deals with Oracle, AWS, and Google. By March 2026, the former couples were [leasing data center capacity on the same tract of land in Abilene, Texas](https://fortune.com/2026/03/27/microsoft-texas-data-center-open-ai-former-partner-cloud-provider/), pursuing separate compute strategies as literal neighbors.

![Microsoft OpenAI Timeline](/assets/hyperscaler-ai-race/microsoft-openai-timeline.svg)

Microsoft's assets remain formidable. Azure continues to be one of the default enterprise clouds for AI workloads, Copilot rides on hundreds of millions of Office seats, and the OpenAI stake may pay off even as their interests diverge. Microsoft's position was once enviable among the hyperscalers, but no longer a forerunner in the race in 2026.

## Meta
Meta once positioned itself as the populist alternative to ChatGPT, but Llama 4's 2025 release failed to impress developers and users alike. Meta's share of the enterprise LLM API market has also fallen from 16% to 8% since 2023.

![Meta's enterprise share](/assets/hyperscaler-ai-race/meta-vs-alphabet-enterprise-share.svg)

Unhappy with Llama's progress, Zuckerberg [laid off about 600 people from Meta's AI division](https://www.cnbc.com/2025/10/22/meta-layoffs-ai.html) and recruited Scale AI's Alexandr Wang to lead the newly formed Meta Superintelligence Labs. The unit's first product launch, Muse Spark, marks a rebuild of Meta's AI stack from the ground up. Muse Spark 1.1 followed shortly, arriving as Meta's late entry to the AI agents and agentic coding market, offering a low-cost alternative to OpenAI and Anthropic's models. Meta spends like its hyperscaler peers, but it has no cloud business and a shrinking enterprise channel to monetize the buildout. Its $100+ billion capex in 2026 pays off only if Meta's own products win. Meta finds itself in the position Alphabet was in three years ago, written off as the laggard after sunsetting a failed model, and must attempt the same climb from the bottom. 

Meta's retreat from open weights also handed the open-source community to the Chinese labs. DeepSeek's V4 series, z.ai's GLM-5, and Moonshot's Kimi K3 are highly capable, and the developer loyalty and fine-tuning ecosystem Meta spent years cultivating around Llama now compounds for Beijing's labs instead. Distillation allows open weight models to learn from the outputs of frontier models, capturing much of their intelligence at a fraction of the training cost. But training a model cheaply is not the same as serving it. Real-time inference for millions of users demands fleets of chips, data centers, and power, exactly the infrastructure the hyperscalers are spending billions to own.

In the AI race, capex is table stakes. For a hyperscaler in 2026, cutting spend signals surrender, not prudence. None of the hyperscalers won by protecting margins. They won by outspending rivals through every platform shift until the competition couldn't keep up. Critics scrutinizing AI capex through quarterly earnings are pricing the wrong risk. It's the same mistake they made on Amazon's fulfillment buildout and Azure's early losses. Expect this spend to keep trickling down the semiconductor value chain through at least 2030. In a platform war this big, the penalty for overspending is a bad earnings call. The penalty for underspending is extinction.

Want to know exactly where those dollars land? My [Unpacked](https://michaelhly.substack.com/p/unpacked-the-nvidia-supply-chain) series breaks down the Nvidia supply chain, layer by layer.
