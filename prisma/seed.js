const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database…');

  // ── Seed demo user ──────────────────────────────────────────────────
  const demoPassword = await bcrypt.hash('cenius', 12);

  const existingUser = await prisma.user.findUnique({
    where: { email: 'cenius@cenius.ai' },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        email: 'cenius@cenius.ai',
        username: 'cenius',
        password: demoPassword,
      },
    });
    console.log('  Created demo user: cenius@cenius.ai / cenius');
  } else {
    console.log('  Demo user already exists');
  }

  // ── Seed posts ──────────────────────────────────────────────────────
  const existingCount = await prisma.post.count();
  if (existingCount > 0) {
    console.log(`  ${existingCount} posts already exist — skipping post seed`);
    return;
  }

  const posts = [
    {
      title: 'The Quiet Revolution in Edge Computing',
      tag: 'tech',
      published: true,
      body: "Edge computing is reshaping how we think about distributed systems. Instead of shipping every byte to a central cloud, we're seeing a shift toward processing data where it's generated — on factory floors, in retail stores, inside vehicles.\n\n## Why Now?\n\nThree trends are converging. First, 5G networks have made low-latency wireless communication practical at scale. Second, specialized inference chips (NPUs, TPUs) are now cheap enough to deploy outside data centers. Third, the sheer volume of sensor data from IoT devices has made centralized processing economically unviable.\n\n## The Architecture Shift\n\nTraditional cloud architecture follows a hub-and-spoke model: devices collect data, and a central service processes it. The new model inverts this — edge nodes run lightweight models locally and only forward anomalies or aggregated results upstream. This has profound implications for system design.\n\n## Practical Applications\n\nConsider a smart factory: vibration sensors on CNC machines sample at 10kHz. Sending that raw stream to the cloud would consume 80GB/day per machine. Running a compact ML model on an edge gateway reduces that to a few kilobytes of alerts — and the alert fires in under 50ms instead of 200ms.",
    },
    {
      title: 'Building Resilient Systems: A Practical Guide',
      tag: 'tech',
      published: true,
      body: "Every system fails. The question isn't whether it will break — it's how gracefully it degrades when it does. Here's what I've learned building and operating production systems at scale.\n\n## Circuit Breakers Are Your Friend\n\nA downstream service that's timing out will take your service down with it if you're not careful. Thread pools fill up, connections exhaust, and soon your healthy service is dead because it's waiting on an unhealthy dependency. Circuit breakers solve this. After a configurable number of failures, the breaker trips and subsequent requests fail fast — no waiting, no resource consumption. The key insight: failing fast is better than failing slow. A 500 in 5ms beats a 500 after 30 seconds.\n\n## Idempotency Keys\n\nNetwork retries are essential for reliability, but they create a risk: what if the first request succeeded and only the response was lost? The retry duplicates the operation. Idempotency keys solve this — the client generates a unique key per operation, the server records it, and on retry returns the stored response instead of re-executing.\n\n## Graceful Degradation\n\nWhen a non-critical feature is unavailable, your system should still function. The recommendation engine is down? Show top sellers instead. The search index is rebuilding? Fall back to basic text match. Every feature integration needs a fallback path from day one.",
    },
    {
      title: 'The Art of Mindful Productivity',
      tag: 'lifestyle',
      published: true,
      body: "We've been sold a lie about productivity: that doing more is always better. The truth is more nuanced — and more interesting.\n\n## The Busy Trap\n\nOpen your task manager. How many items are on your list? If you're like most knowledge workers, it's somewhere between 30 and 100. And yet, on a good day, you might complete 5 meaningful tasks. The rest is noise. The busy trap is the belief that a packed calendar and a long task list equal effectiveness. They don't. They equal anxiety and context-switching overhead.\n\n## Essentialism in Practice\n\nEssentialism is the disciplined pursuit of less. It's not about doing fewer things; it's about doing the right things. My workflow follows a simple rhythm: morning review (pick the 3 most important items), deep work block (90 minutes, no notifications, full attention), afternoon processing (batch email and admin tasks), and evening shutdown (review what got done and close the laptop).\n\n## The Power of Saying No\n\nEvery \"yes\" to a new commitment is a \"no\" to something else — usually your own priorities. The most productive people I know are also the most comfortable saying \"this isn't a priority right now.\" The work that actually matters — deep thinking, creative leaps, careful craft — requires space and sustained attention.",
    },
    {
      title: 'Slow Living in a Fast City',
      tag: 'lifestyle',
      published: true,
      body: "Living deliberately in an urban environment sounds like a contradiction. Cities pulse with urgency — the subway doors closing, the crosswalk timer counting down, the notifications stacking up. But slowness isn't about geography; it's about posture.\n\n## Redefining Slow\n\nSlow living doesn't mean moving at a literal crawl. It means choosing your pace consciously rather than defaulting to the city's rhythm. It's the difference between being carried by the current and swimming deliberately. I started with one rule: no phone for the first hour of the day. That single change created space I didn't know I had.\n\n## The Micro-Retreat\n\nYou don't need a cabin in the woods to reset. A micro-retreat is any deliberate pause in your daily routine: taking the long way home through the park, eating lunch away from your desk with no screen, walking a few blocks without headphones, just listening to the city's soundscape. These aren't indulgences — they're maintenance for your attention and your nervous system.\n\n## Cultivating a Slow Home\n\nYour apartment can be a sanctuary even if it's 400 square feet. The key elements are sensory: warm bulbs (2700K), natural materials wherever possible (wood, wool, cotton, stone), a quiet space, and ritual objects — a particular mug for morning coffee, a specific chair for reading. These anchor moments in the day.\n\n## The Social Dimension\n\nSlow living can feel isolating in a culture that rewards busyness. But there's a growing community of people who've opted out of the hustle. Find them. Have long dinners. Put phones away when you're together. These connections are the real antidote to urban alienation, and you can't rush them.",
    },
    {
      title: 'Hidden Gems of the Amalfi Coast',
      tag: 'travel',
      published: true,
      body: "Everyone knows Positano and Amalfi. The pastel houses cascading down cliffs, the lemon granita, the rimless views of the Tyrrhenian Sea — they're famous for good reason. But the Amalfi Coast rewards those who venture beyond the postcard.\n\n## Atrani: The Smallest Town in Southern Italy\n\nJust 700 meters from Amalfi lies Atrani, Italy's smallest municipality by area at 0.12 square kilometers. Its piazza sits at the mouth of the Dragone Valley, shaded by the Collegiate Church of Santa Maria Maddalena. In the evening, the square fills with locals playing cards and children chasing pigeons. Two restaurants, one bar, zero souvenir shops.\n\n## Ravello's Secret Gardens\n\nRavello's music festival draws international crowds, but most visitors see Villa Rufolo and Villa Cimbrone and head back down. Stay overnight. Walk the back lanes above the town at dawn — the gardens of private villas spill over stone walls with bougainvillea, jasmine, and ancient olive trees. You'll have the views of the Gulf of Salerno entirely to yourself.\n\n## Fiordo di Furore\n\nA fjord on the Mediterranean sounds impossible, but Furore's narrow inlet is exactly that. A small bridge arches over the gorge 30 meters above a tiny beach. Visit in the morning when sunlight reaches the water; it turns an impossible shade of turquoise. The beach is only 25 meters wide — go early or in the shoulder season.",
    },
    {
      title: 'Tokyo After Dark: Neon and Tradition',
      tag: 'travel',
      published: true,
      body: "Tokyo at night is two cities occupying the same space. One is the neon-drenched future of Shinjuku and Shibuya — seven-story video billboards, pachinko parlors, izakayas spilling light onto narrow alleys. The other is the quiet Tokyo of lantern-lit shrines, empty backstreets, and the distant sound of a shamisen drifting from an upper window.\n\n## Golden Gai: 276 Bars in a Single Block\n\nIn the shadow of Shinjuku's skyscrapers sits Golden Gai, a grid of six narrow alleys packed with nearly 300 tiny bars, most seating only five or six people. Each bar has a theme — jazz, cinema, fishing, 1980s J-pop — and has been run by the same owner for decades. The cover charges are modest, the drinks are simple, and the conversations with strangers are the real draw.\n\n## Omoide Yokocho\n\nA few blocks west of Shinjuku Station, Omoide Yokocho (Memory Lane) preserves the Tokyo of the 1950s. Smoke rises from yakitori grills in doorways so narrow you turn sideways to enter. The wooden stalls have barely changed in 70 years. Order grilled chicken skin skewers and a cold beer, and you'll understand why Tokyo's food culture is unmatched.\n\n## Asakusa After the Crowds\n\nSenso-ji Temple is thronged by day, but return at 10pm and the scene transforms. The main hall is closed but lit from within, casting long shadows across the empty courtyard. The Nakamise shopping arcade is shuttered, its metal doors painted with scenes from the temple's history. Walk the Sumida River embankment — the SkyTree glows through the mist, and you might have the entire waterfront to yourself.",
    },
    {
      title: 'What Open Source Taught Me About Leadership',
      tag: 'tech',
      published: false,
      body: "Maintaining an open-source project for five years taught me more about leadership than any management book or corporate training program. The dynamics are the same — you're just working with volunteers.\n\n## Authority Is Earned, Not Granted\n\nIn a company, your title gives you a baseline of authority. In open source, nobody has to listen to you. You earn influence through the quality of your contributions, the clarity of your communication, and your consistency over time. The same is true in any organization — the people who wield real influence are rarely the ones with the biggest titles.\n\n## The Best Decisions Come From Many Perspectives\n\nA contributor from a completely different domain will spot a design flaw the core team missed. A user who barely speaks your language will submit a bug report that reveals a fundamental misunderstanding in your API. Diversity of perspective isn't a nice-to-have — it's the mechanism by which software (and teams) improve.\n\n## Clear Communication Is Everything\n\nMost conflicts in open source come down to miscommunication. A terse code review comment reads as hostile. A rejected feature feels like a personal rejection. I learned to write like every comment would be read by someone having a bad day — because someone always is. Assume good intent, be generous with praise, and be specific with criticism.",
    },
    {
      title: 'A Weekend in Copenhagen',
      tag: 'travel',
      published: true,
      body: "Copenhagen isn't a city that tries to impress you. It doesn't need to. It just is — beautifully designed, effortlessly livable, and quietly confident in a way that makes other cities feel like they're trying too hard.\n\n## Friday Evening — Arrival\n\nFly in and take the metro from the airport — it's a 15-minute ride to the city center, and the trains run 24/7. Drop your bags and walk to Torvehallerne, the glass-walled food market near Nørreport Station. Start with smørrebrød — the classic Danish open-faced sandwich — at Hallernes Smørrebrød. The roast beef with remoulade, crispy onions, and horseradish is the one to order.\n\n## Saturday — Design and Water\n\nMorning: the Designmuseum Danmark reopened in 2022 after a major renovation and is worth two hours. The permanent collection traces Danish design from the 1800s through today, with the chair gallery as the highlight. Afterward, walk up Bredgade toward the Little Mermaid — the walk along the waterfront is better than the statue itself.\n\nAfternoon: rent a bike (everyone cycles here) and ride out to Refshaleøen, a former shipyard turned creative district. Lunch at Reffen street food market, then a sauna session at CopenHot — they have floating hot tubs in the harbor.\n\nEvening: dinner at Høst, which somehow makes New Nordic cuisine accessible (and affordable). The five-course tasting menu changes monthly and costs less than you'd expect. Book ahead.",
    },
  ];

  for (const post of posts) {
    await prisma.post.create({ data: post });
  }

  console.log(`  Created ${posts.length} posts`);
}

main()
  .then(() => {
    console.log('Seed complete.');
    process.exit(0);
  })
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  });
