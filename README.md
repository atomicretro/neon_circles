# circles
## A game of shapes and shooting things

### Description
Circles (tentatively named) is a 2D, on-rails shoot-em-up (shmup) where the player is their own worst enemy (besides from all the actual enemies). Players control a ship stuck on the inside of a small circle. They cannot leave this circle, but can travel around it freely. Enemies will fly towards the player from off-screen. If an enemy touches the player, it's game over. Complicating this simple setup, players can only shoot towards the inside of the circle, forcing their bullets to pass through the circle itself to find their mark. If a player hits their own bullets -- tough luck!

### MVPs
The base game of Circles is simple, with it's guiding philosophy being "one mechanic done well". To that end, the MVPs for this project are:
- Fully functional game with player-controllable ship and AI enemies.
- Two modes:
  - "Story mode" with multiple levels of increasing difficulty.
  - "Arcade mode" where a player fights endless enemies for a high score.
- Music and sound effects to accompany both modes.

Additionally, some bonus MVPs are:
- Different rails shapes (eg a triangle instead of a circle).
- Graphical scene transitions between levels.

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
- Program in enemy AI.
