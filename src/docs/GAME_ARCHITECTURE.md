
# Teddy Catcher Game Architecture

## 🎮 Game Overview
Teddy Catcher is a multiplayer claw machine game built with React, TypeScript, and Tailwind CSS. Players take turns catching teddy bears within a time limit.

## 🏗️ Technology Stack
- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Shadcn/ui component library
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React useState and useEffect hooks

## 📁 File Structure & Components

### Core Game Components

#### `src/pages/Index.tsx`
- **Purpose**: Main game orchestrator and state manager
- **Responsibilities**: 
  - Manages game states (setup → playing → results)
  - Handles player turn transitions
  - Coordinates between all game phases

#### `src/components/GameBoard.tsx` 
- **Purpose**: Main game playing area and logic controller
- **Responsibilities**:
  - Timer management for each player
  - Claw movement and physics
  - Teddy generation and collision detection
  - Score tracking per player
  - Turn completion logic

#### `src/components/GameSetup.tsx`
- **Purpose**: Initial game configuration
- **Features**:
  - Add/remove players (1-4 players)
  - Set timer duration (10-300 seconds)
  - Input validation

#### `src/components/GameResults.tsx`
- **Purpose**: Final scores and rankings display
- **Features**:
  - Ranking with tie handling
  - Visual score representation
  - Play again functionality

### Game Elements

#### `src/components/Claw.tsx`
- **Purpose**: Interactive claw mechanism
- **Features**:
  - Visual representation of claw states
  - Animation for open/closed states
  - Position tracking

#### `src/components/TeddyBear.tsx`
- **Purpose**: Individual teddy bear rendering
- **Features**:
  - Random positioning and rotation
  - Visibility management when caught

#### `src/components/Sink.tsx`
- **Purpose**: Target drop zone
- **Features**:
  - Visual drop area indicator
  - Responsive sizing

### UI Components

#### `src/components/GameHUD.tsx`
- **Purpose**: Real-time game information display
- **Shows**: Current player, score, remaining time

#### `src/components/PlayerStatus.tsx`
- **Purpose**: Sidebar showing all players' progress
- **Features**:
  - Current player highlighting
  - Individual scores
  - Remaining teddies count
  - Player status (Playing/Finished/Waiting)

#### `src/components/CollectedTeddies.tsx`
- **Purpose**: Visual representation of caught teddies
- **Features**: Real-time collection display

#### `src/components/CelebrationPopup.tsx`
- **Purpose**: Success feedback animation

### Type Definitions

#### `src/types/game.ts`
- **Player**: Player information and scores
- **Teddy**: Teddy bear properties and state
- **ClawPosition**: Claw position and state
- **GameState**: Overall game state structure

## 🎯 Game Flow

### 1. Setup Phase
1. Players enter names (1-4 players)
2. Timer duration is set
3. Game validation and start

### 2. Playing Phase (Per Player)
1. **Turn Initialization**:
   - Fresh teddies generated
   - Timer reset
   - Score reset to 0
   - Claw repositioned

2. **Gameplay Loop**:
   - Arrow keys move claw
   - Space/Enter drops claw
   - Collision detection for teddy catching
   - Space/Enter releases teddy in sink
   - Score increments on successful drops

3. **Turn End Conditions**:
   - Timer reaches 0
   - All teddies collected (early completion)

### 3. Results Phase
- All player scores compared
- Rankings assigned (with tie handling)
- Winner(s) announced
- Option to play again

## 🎮 Game Mechanics

### Controls
- **Arrow Keys**: Move claw (left/right/up/down)
- **Space/Enter**: Drop claw or release teddy

### Scoring System
- Each teddy successfully dropped in sink = +1 point
- Individual scores per player
- Rankings based on total teddies caught

### Turn Management
- Each player gets independent turns
- Complete state reset between players
- Fresh teddies for each player
- Individual timers

### Responsive Design
- Game area adapts to screen size
- Mobile-friendly controls
- Adaptive teddy count based on screen width

## 🔄 State Management

### Player State
- Individual scores tracked per turn
- Turn-based progression
- Complete isolation between players

### Game State
- Setup → Playing → Results flow
- Player queue management
- Timer synchronization

### Component State
- Local state for immediate game interactions
- Props drilling for shared data
- Callback functions for state updates

## 🚀 Performance Considerations

### Optimizations
- `useCallback` for expensive functions
- `useEffect` dependency optimization
- Component memoization where needed
- Efficient re-rendering patterns

### Responsive Features
- Dynamic game area sizing
- Adaptive component scaling
- Mobile-first design approach

This architecture ensures a smooth, multiplayer experience with proper turn management, state isolation, and responsive design across all devices.
