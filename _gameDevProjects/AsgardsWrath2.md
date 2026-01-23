---
layout: projectpost
title:  "Asgard's Wrath 2"
date:   2022-11-11
excerpt: "<b>Asgard's Wrath 2</b> is a VR video game developed at Sanzaru Games"
developer: "Sanzaru Games"
feature: /assets/img/projects/asgards-wrath-2.png
tag:
- Sanzaru
- Sanzaru Games
- Game Development
- Oculus
comments: false
---
## AAA VR action RPG shipped on Meta Quest 2/3
### Lead Engineer at Sanzaru Games / Meta Reality Labs

<iframe width="560" height="315" src="//www.youtube.com/embed/3SYJeM_LaZ0"  frameborder="0"> </iframe>



---

For this project I was a Lead Engineer for the gameplay systems team, focusing on performance, gameplay, side missions, save, questing, milestones and many other features.
This project was done in Unreal 4 and C++.

Asgard's Wrath 2 garnered significant acclaim and numerous awards in 2024, including XR Game of the Year at the AIXR Awards, winning multiple honors at the NYX Game Awards (like Best Audio Design & Game Design), and being named Immersive Reality Game of the Year at the DICE Awards.

Asgard's Wrath 2 received a score of [10/10 from IGN](https://www.ign.com/articles/asgards-wrath-2-review) and has a current [Metacritic](https://www.metacritic.com/game/asgards-wrath-2/) score of 86.

![IGN Score](https://www.carloshurtado.com/assets/img/projects/masterpiece.PNG)


---

### Leadership
* Managed 5 engineers and colaborated with cross functional partners to align on schedule, direction and quality.
* Provided interviews, 1:1s and mentorship.
* Collaborated with directors and Cross functional partners to deliver high quality content.

---

### Technical Contributions

#### World Management & Optimization
* Implemented an optimization system based on player location that optimizes Ticks and reduces draw calls. This allows to reduce tick costs to a minimum based on "rooms".
* Continued implementing optimized Octree based triggers to replace Unreal Overlaps.
* Set up a Time Of Day management to deal with lighting scenarios.
* Optimize several systems, including deferred checks and load-balancing.

#### Progression
* Implemented a quest system and supported others like inventory and  milestones.
* Set up a state condition system to allow for progression based actions.
* Set up a Travel Subsystem to deal with locations, teleportations and player travel (from reloads, or from the map).

#### Gameplay Features
* Implemented a Waterworks puzzle, requiring the player to place different pieces to connect water.
* Implemented an enemy spawner sequencer to allow for spawning waves, with different state-driven configurations for combat.
* Supported a graph-based waypoint system to guide the player to the next location