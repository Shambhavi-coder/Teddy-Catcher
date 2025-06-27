
// Game type definitions as JavaScript objects with JSDoc comments

/**
 * @typedef {Object} Player
 * @property {string} id - Unique identifier for the player
 * @property {string} name - Player's display name
 * @property {number} score - Current score (number of teddies caught)
 * @property {Teddy[]} collectedTeddies - Array of teddies collected by this player
 */

/**
 * @typedef {Object} Teddy
 * @property {string} id - Unique identifier for the teddy
 * @property {number} x - X coordinate position
 * @property {number} y - Y coordinate position
 * @property {string} color - Color of the teddy
 * @property {number} size - Size in pixels
 * @property {number} rotation - Rotation angle in degrees
 * @property {boolean} isCaught - Whether the teddy has been caught
 */

/**
 * @typedef {Object} ClawPosition
 * @property {number} x - X coordinate of claw
 * @property {number} y - Y coordinate of claw
 * @property {boolean} isOpen - Whether claw is open
 * @property {boolean} isMoving - Whether claw is currently moving
 * @property {Teddy} [caughtTeddy] - Teddy currently held by claw
 */

/**
 * @typedef {Object} GameState
 * @property {Teddy[]} teddies - Array of all teddies in the game
 * @property {ClawPosition} claw - Current claw position and state
 * @property {boolean} isGameActive - Whether game is currently active
 * @property {number} timeRemaining - Seconds remaining in current turn
 */

export {};
