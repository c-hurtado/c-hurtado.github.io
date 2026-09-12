// ─── PROJECTS DATA ──────────────────────────────────────────────────────────
// Add a project = append an entry here. No section JSX changes needed.
// Each entry's `details` is a function receiving the section accent color.
const PROJECTS = [
    {
      title: 'Unannounced Big IP VR Project', studio: 'Sanzaru Games · Meta', badge: 'In Dev',
      desc: 'Currently in development — a major VR title for a well-known IP. Technical leadership across full production lifecycle.',
      img: '/assets/img/projects/Meta-Quest-3-Dark.jpg',
      subtitle: 'AAA VR title under NDA — Technical Lead Manager at Sanzaru Games / Meta Reality Labs',
      details: (accent) => (
        <>
          <ModalP>For this project I was the technical lead manager for the gameplay systems group. I managed 5 people, working on systems, missions, architecture and infrastructure. The game was being developed in Unreal 5 and C++.</ModalP>
          <ModalH4 accent={accent}>Leadership</ModalH4>
          <ModalList items={[
            'Managed 5 engineers and collaborated with cross functional partners to align on schedule, direction and quality.',
            'Interviewed engineers and provided mentorship.',
            'Provided performance reviews, and biweekly 1:1s directed to grow skills and improve career.',
          ]} />
          <ModalH4 accent={accent}>Technical Contributions</ModalH4>
          <ModalH5>Progression and Level Building</ModalH5>
          <ModalList items={[
            'Created a new visual flow based progression system, with save interdependencies.',
            'Created a Story Graph in Unreal, allowing for shortcuts to any asset, script, and progression point in the game.',
            'Architected, with a Senior Engineer, a Level Manager to replace Level Blueprints — level independent, message based, and compatible with World Partition.',
          ]} />
          <ModalH5>Gameplay</ModalH5>
          <ModalList items={[
            'Created a visual camera system for cinematic visualization of the character.',
            'Created a Holdable spawner for placing grabbables in the world, with configurations for respawning, despawning, baked lighting, and async asset loading.',
          ]} />
          <ModalH5>Tools and Acceleration</ModalH5>
          <ModalList items={[
            'Created scriptable tools in UE5 to accelerate the narrative team and level designers, letting them create interdependent assets in one click.',
            'Created interactive Unreal tools to draw special splines for traversal purposes in the editor.',
            'Created a visual "state" HUD system to visualize state, narrative, progression, and location to debug problems fast.',
          ]} />
          <ModalH5>Optimization</ModalH5>
          <ModalList items={[
            'Worked on supporting World Partition and Level Streaming, fixing level instancing compatibility for cinematic assets.',
            'Optimized CPU cost using Unreal Insights, fixing or suggesting removal of unnecessary costs.',
          ]} />
        </>
      ),
    },
    {
      title: "Asgard's Wrath 2", studio: 'Sanzaru Games · Meta', badge: '10/10 IGN',
      desc: 'Award-winning VR RPG. Contributed as Technical Lead to flagship systems, performance, and architecture.',
      img: '/assets/img/projects/asgards-wrath-2.png',
      subtitle: 'AAA VR action RPG shipped on Meta Quest 2/3 — Lead Engineer at Sanzaru Games / Meta Reality Labs',
      videoId: '3SYJeM_LaZ0',
      details: (accent) => (
        <>
          <ModalP>For this project I was a Lead Engineer for the gameplay systems team, focusing on performance, gameplay, side missions, save, questing, milestones and many other features. This project was done in Unreal 4 and C++.</ModalP>
          <ModalP>Asgard's Wrath 2 garnered significant acclaim and numerous awards in 2024, including XR Game of the Year at the AIXR Awards, winning multiple honors at the NYX Game Awards (like Best Audio Design & Game Design), and being named Immersive Reality Game of the Year at the DICE Awards.</ModalP>
          <ModalP>
            Asgard's Wrath 2 received a score of{' '}
            <a href="https://www.ign.com/articles/asgards-wrath-2-review" target="_blank" style={{ color: accent, fontWeight: 600 }}>10/10 from IGN</a>{' '}
            and has a current{' '}
            <a href="https://www.metacritic.com/game/asgards-wrath-2/" target="_blank" style={{ color: accent, fontWeight: 600 }}>Metacritic</a>{' '}
            score of 86.
          </ModalP>
          <img src="/assets/img/projects/masterpiece.PNG" alt="IGN 10/10 score" loading="lazy" decoding="async" style={{ width: '100%', borderRadius: 8, marginBottom: 20, border: `1px solid color-mix(in oklch, ${accent} 30%, transparent)` }} />
          <ModalH4 accent={accent}>Leadership</ModalH4>
          <ModalList items={[
            'Managed 5 engineers and collaborated with cross functional partners to align on schedule, direction and quality.',
            'Provided interviews, 1:1s and mentorship.',
            'Collaborated with directors and cross functional partners to deliver high quality content.',
          ]} />
          <ModalH4 accent={accent}>Technical Contributions</ModalH4>
          <ModalH5>World Management & Optimization</ModalH5>
          <ModalList items={[
            'Implemented an optimization system based on player location that optimizes ticks and reduces draw calls, reducing tick costs to a minimum based on "rooms." Added visualization and editor tooling.',
            'Continued implementing optimized Octree-based triggers to replace Unreal Overlaps.',
            'Set up a Time of Day management system to deal with lighting scenarios.',
            'Optimized several systems, including deferred checks and load-balancing.',
          ]} />
          <ModalH5>Progression</ModalH5>
          <ModalList items={[
            'Implemented a quest system and supported others like inventory and milestones.',
            'Set up a state condition system to allow for progression-based actions.',
            'Set up a Travel Subsystem to deal with locations, teleportations, and player travel (from reloads, or from the map).',
          ]} />
          <ModalH5>Gameplay Features</ModalH5>
          <ModalList items={[
            'Implemented a Waterworks puzzle, requiring the player to place different pieces to connect water.',
            'Implemented an enemy spawner sequencer for spawning waves, with different state-driven configurations for combat.',
            'Supported a graph-based waypoint system to guide the player to the next location.',
            'Added debug systems to change and view tuning variables in-game.',
            'Worked on the onramp gameplay and new user experience.',
          ]} />
          <ModalH5>Localization and Entitlements</ModalH5>
          <ModalList items={[
            'Implemented localization scripts and automation.',
            'Implemented achievements and entitlements.',
          ]} />
        </>
      ),
    },
    {
      title: "Asgard's Wrath", studio: 'Sanzaru Games',
      desc: 'VR action-RPG — predecessor to the award-winning sequel. Systems engineering and technical leadership.',
      img: '/assets/img/projects/asgards-wrath.jpg',
      subtitle: '30+ hour VR Action RPG designed from the ground up for VR',
      videoId: 'd5a4nWtbVyY',
      details: (accent) => (
        <>
          <ModalP>I was one of the two lead engineers on this project — a 30+ hour VR Action RPG designed from the ground up for VR. Published by Oculus, this game was nominated for best VR game of the year by multiple outlets including DICE and The Game Awards. I joined late in the project, as I was leading Marvel Powers United VR at the time.</ModalP>
          <ModalList items={[
            'The Game Awards 2019: Nominated for Best VR/AR Game.',
            'DICE Awards (2020): Nominated for Immersive Reality Game of the Year & Technical Achievement.',
            'NAVGTR Awards (2020): Nominated for Control Design, VR & Sound Mixing in VR.',
            "IGN: Won People's Choice Awards for Best VR Game & PC Exclusive Game.",
            'Chosen by Forbes as Best VR game of the year.',
          ]} />
          <ModalP>It was developed in Unreal Engine and C++, and I led a team of 9 engineers as well as building some systems myself.</ModalP>
          <ModalH4 accent={accent}>Leadership</ModalH4>
          <ModalList items={[
            'Managed 5 engineers and collaborated with cross functional partners to align on schedule, direction and quality.',
            'Provided interviews, 1:1s and mentorship.',
            'Collaborated with directors and cross functional partners to deliver high quality content.',
          ]} />
          <ModalH4 accent={accent}>Technical Contributions</ModalH4>
          <ModalList items={[
            'Implemented several features including cinematic improvements, lightweight triggers, and comfort features.',
          ]} />
        </>
      ),
    },
    {
      title: 'Marvel Powers United VR', studio: 'Sanzaru Games',
      desc: 'Co-op VR brawler featuring Marvel superheroes. Multi-player systems, gameplay engineering.',
      img: '/assets/img/projects/marvelpowersunited.jpg',
      subtitle: '4-player networked co-op Arena VR game',
      videoId: 'YO_gz5l7ZB4',
      details: (accent) => (
        <>
          <ModalP>I co-led this project with the Director of Technology. Marvel Powers United is a 4-player networked co-op Arena VR game — you and your friends fight against AI enemies as Marvel heroes.</ModalP>
          <ModalH4 accent={accent}>Leadership</ModalH4>
          <ModalList items={[
            'Managed 5 engineers and collaborated with cross functional partners to align on schedule, direction and quality.',
            'Provided interviews, 1:1s and mentorship.',
            'Collaborated with directors and cross functional partners to deliver high quality content.',
          ]} />
          <ModalH4 accent={accent}>Technical Contributions</ModalH4>
          <ModalList items={[
            'Worked on several character implementations, including Crystal and Black Bolt.',
            'Set up leaping movement systems and fight mode to manage state transitions during melee combat.',
            'Set up a Marvel Buff system using actor components.',
            'Optimized net-weapon ticks so components only update when being fired.',
          ]} />
        </>
      ),
    },
    {
      title: 'VR Sports Challenge', studio: 'Sanzaru Games',
      desc: 'Multi-sport VR experience. Core gameplay and physics systems engineering.',
      img: '/assets/img/projects/vr-sports-challenge.jpg',
      subtitle: 'Multi-sport VR title for the Oculus Touch launch',
      videoId: 'xAvzIff_PCg',
      details: (accent) => (
        <ModalP>VR Sports Challenge is a sports-based VR title featuring Football, Baseball, Basketball, and Hockey. It shipped alongside the Oculus Touch controllers at launch and was published by Oculus. I became lead engineer toward the end of the project.</ModalP>
      ),
    },
    {
      title: 'Dark Manor', studio: 'Sanzaru Games · Big Fish Games',
      desc: 'Casual hidden-object mobile game. Built with a 2-person engineering team from the ground up.',
      img: '/assets/img/projects/darkmanor.jpg',
      subtitle: 'Casual hidden-object game for PC and iOS',
      details: (accent) => (
        <>
          <ModalP>I started at Sanzaru (developers of Sly Cooper 4) as part of the very small mobile group. In a team of just 2 engineers, we built a casual hidden-object game for publisher Big Fish Games.</ModalP>
          <ModalP>The project was a cross-platform PC and iOS game, built on a custom engine from Sanzaru. I also built customer service websites to track and adjust live tuning while the game was running.</ModalP>
        </>
      ),
    },
    {
      title: 'Uridium Wars', studio: 'Bigpoint',
      desc: 'Space-faring MMO built in Flash + PHP for Facebook. Took on a large-scale real-time MMO codebase.',
      img: '/assets/img/projects/uridiumwars.png',
      subtitle: 'Space-faring MMO for the Facebook platform',
      details: (accent) => (
        <ModalP>Uridium Wars was a space-faring MMO built in Flash + PHP for the Facebook platform — a take on a different game called Dark Orbit.</ModalP>
      ),
    },
    {
      title: 'Sims 3 Expansion Packs', studio: 'Electronic Arts · Maxis',
      desc: 'Shipped 3 expansion packs (Late Night, Generations, Pets) and multiple stuff packs on 6-month cycles.',
      img: '/assets/img/projects/sims.png',
      subtitle: '3 expansion packs shipped on 6-month cycles',
      details: (accent) => (
        <>
          <ModalP>At Electronic Arts, I was a gameplay engineer at Maxis Studios. As my first job out of grad school, I worked on and published 3 expansion packs and multiple stuff packs, each on a 6-month development cycle.</ModalP>
          <ModalP>I worked on Sims 3: Late Night, Sims 3: Generations, and Sims 3: Pets.</ModalP>
        </>
      ),
    },
];
