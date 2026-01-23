---
layout: projectpost
title:  "Unannounced Big IP VR project"
date:   2025-11-11
excerpt: "<b>Unannounced</b>"
developer: "Sanzaru Games"
feature: /assets/img/projects/Meta-Quest-3-Dark.jpg
tag:
- Sanzaru
- Sanzaru Games
- Game Development
- Oculus
comments: false
---

AAA VR title under NDA - Technical Lead Manager at Sanzaru Games / Meta Reality Labs
---

For this project I was the technical lead manager for the gameplay systems group. I managed 5 people, working on systems, missions, architecture and infrastructure.
The game was being developed in Unreal 5 and C++.

---

### Leadership
* Managed 5 engineers and colaborated with cross functional partners to align on schedule, direction and quality.
* Interviewed engineers and provided mentorship.
* Provided performance reviews, and biweekly 1:1s directed to grow skills and improve career.

---

### Technical Contributions

#### Progression and Level Building
* Created a new visual flow based progression system, with save interdependencies.
* Created a Story Graph in Unreal, allowing for shortcuts to any asset, script, and progression point in the game. This is the source of a shortcut system to allow users of the system to access any progression point in the game, including location, state machine state and save point.
* Architected in collaboration with a Senior Engineer a Level manager to replace Level Blueprints that was level independent, message based and compatible with World Partition.

#### Gameplay
* Created a visual camera system for cinematic visualization of the character.
* Created a Holdable spawner, using a system to place grabbables in the world with multiple configurations for respawning, despawning, baked lighting, and asynchronous asset loading.


#### Tools and acceleration
* Created Scriptable tools in UE5 to accelerate the narrative team and level designers, allowing them to create interdependent assets in 1 click via an unreal tool. 
* Created interactible unreal tools to draw special splines for traversal purposes in the editor.
* Created a visual "state" of the game HUD system to visualize state, narrative, progression, location and others in order to debug problems fast.

#### Optimization
* Worked on support World Partition and Level streaming, supporting fixes of level instancing compatibility for cinematic assets.
* Optimized CPU cost by looking at Unreal Insights and fixing or provided suggestions to remove unnecesary costs.