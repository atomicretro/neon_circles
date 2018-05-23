# circles
## A game of shapes and shooting things

### Description
Circles (tentatively named) is a 2D, on-rails shoot-em-up (shmup) where the player is their own worst enemy (besides from all the actual enemies). Players must navigate around a small circle, shooting enemies while dodging both their own and enemy bullets. Can you survive in... THE CIRCLE!?!

### Gameplay
Players control a ship stuck on the inside of a small circle. The ship cannot leave this circle, but can travel around its inner perimeter freely. Enemies will fly towards the player from off-screen. If an enemy touches the player, it's game over. Complicating this simple setup, the player's ship is always orientated *away* from the enemies and towards the center of the circle. Players can only shoot towards the center of the circle, forcing their bullets to pass through the circle itself to hit enemies. This causes bullets to directly intersect the only path the player can take. If a player hits their own bullets -- kaboom!

### MVPs
The base game of Circles is simple, with it's guiding philosophy being "one mechanic done well". To that end, the MVPs for this project are:
- Fully functional game with player-controllable ship and AI enemies.
- Intro screen explaining rules where player can choose between clockwise and counter-clockwise control schemes (and w/ bonus: where player can choose game mode)
- An "arcade mode" where a player fights endless enemies for a high score.
- Music and sound effects to accompany both modes.

Additionally, some bonus MVPs are:
- Different rails shapes (eg a triangle instead of a circle).
- Graphical scene transitions between levels.
- A "story mode" with multiple levels of increasing difficulty.

The project will also have a production README.

### Architecture and Technologies
Following with the above philosophy and the desire to keep Circles simple, the following technologies will be used in its implementation:
- Javascript
- Canvas

The scripts that I foresee being necessary are:
- field.js -- this will house the playing field itself, and will be responsible for things like the player's circle, bullets, and changing levels.
- player.js -- this will be the player character. It will be responsible for its own movement, its hitbox, and receiving input from the player.
- baddie.js -- this will be the enemies the player must fight. It will be responsible for their AI and movement patterns.

### Wireframe
![wireframes](https://github.com/atomicretro/circles/blob/master/gameplay_wireframe.png)

### Timeline
**Day 1:** Groundwork. Day 1 will be about planting the seeds to my success. I will set up all my necessary node modules and build out the skeletons of the three above scripts. I will learn Canvas and how to render fluid motion with it. I will learn the best ways to get user input from Javascript for game play. Goals:
- Render a basic field in the browser, and have some sort of player character controllable on that field.

**Day 2:** Legwork. Get the player character on its rails. Finish functionality for bullets. Learn how to implement hitboxes in Javascript. Goals:
- Finish player character functionality.
- Get enemies rendered on screen, but not actually moving yet!

**Day 3:** Finishing touches. Get enemies moving. Get them able to shoot. Program in some basic levels. Add hitboxes to enemies. Get level transitions working.
- Finish enemy functionality.
- Finish game!

**Bonus:**
- Story mode.
- Program in enemy AI.
