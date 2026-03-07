// Block Coding for Kids - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // --- DATA DEFINITIONS ---
    const IMAGE_CACHE_VERSION = '20260301o';
    const SAFE_BLOCK_ICONS = new Set([
        'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right', 'redo', 'rotate',
        'code-branch', 'cubes', 'play', 'hand', 'gem', 'robot', 'school',
        'book-open', 'landmark', 'pizza-slice', 'utensils', 'tooth', 'shirt',
        'briefcase', 'cloud-rain', 'sun', 'cloud-sun', 'seedling', 'droplet',
        'tree', 'snowflake', 'music', 'person-running', 'car', 'traffic-light',
        'flask', 'map', 'camera', 'ticket', 'calculator', 'circle-question',
        'palette', 'house', 'rocket', 'lightbulb', 'check-circle', 'circle-xmark',
        'bolt', 'eye', 'sliders', 'egg', 'bell', 'broom', 'mountain',
        'apple-whole', 'cheese', 'bread-slice', 'backpack', 'box', 'leaf',
        'scissors', 'circle-play', 'wind', 'calendar', 'building', 'id-card',
        'receipt', 'glasses', 'fire', 'campground', 'database', 'satellite',
        'laptop-code', 'tv', 'users', 'envelope', 'birthday-cake', 'door-open',
        'circle', 'circle-dot', 'bullseye', 'carrot', 'hat-wizard', 'shovel'
    ]);
    
    // Challenges organized by category and level
    const challenges = {
        sequencing: {
            // Level 1 - Morning Routine (Very basic daily sequence for ages 5-6)
            1: {
                title: "Morning Routine",
                description: "Put your morning activities in the right order to start the day right.",
                goal: "Create a proper morning routine sequence.",
                image: "./images/morning_routine_line_clean_2row.png",
                useDirectImage: true,
                blocks: [
                    { id: 'wake-up', type: 'motion', text: 'Wake Up', icon: 'bell' },
                    { id: 'brush-teeth', type: 'motion', text: 'Brush Teeth', icon: 'tooth' },
                    { id: 'get-dressed', type: 'motion', text: 'Get Dressed', icon: 'tshirt' },
                    { id: 'eat-breakfast', type: 'motion', text: 'Eat Breakfast', icon: 'egg' },
                    { id: 'pack-bag', type: 'motion', text: 'Pack Bag', icon: 'briefcase' },
                    { id: 'go-school', type: 'motion', text: 'Go to School', icon: 'school' }
                ],
                solution: ['wake-up', 'brush-teeth', 'get-dressed', 'eat-breakfast', 'pack-bag', 'go-school']
            },
            // Level 2 - Make a Sandwich (Simple food preparation)
            2: {
                title: "Make a Sandwich",
                description: "Help make a tasty sandwich by putting the steps in the right order.",
                goal: "Create a perfect sandwich following the correct sequence of steps.",
                image: "./images/sandwich_steps_linear_2row.png",
                useDirectImage: true,
                blocks: [
                    { id: 'place-bread', type: 'motion', text: 'Place Bread', icon: 'bread-slice' },
                    { id: 'add-cheese', type: 'motion', text: 'Add Cheese', icon: 'cheese' },
                    { id: 'add-lettuce', type: 'motion', text: 'Add Lettuce', icon: 'leaf' },
                    { id: 'add-tomato', type: 'motion', text: 'Add Tomato', icon: 'apple-alt' },
                    { id: 'add-top-bread', type: 'motion', text: 'Add Top Bread', icon: 'bread-slice' },
                    { id: 'cut-sandwich', type: 'motion', text: 'Cut in Half', icon: 'cut' }
                ],
                solution: ['place-bread', 'add-cheese', 'add-lettuce', 'add-tomato', 'add-top-bread', 'cut-sandwich']
            },
            // Level 3 - Build a Snowman (Simple outdoor activity)
            3: {
                title: "Build a Snowman",
                description: "Build a friendly snowman by ordering the steps properly.",
                goal: "Create a perfect snowman with the correct sequence.",
                image: "./images/snowman_steps_linear.png",
                useDirectImage: true,
                blocks: [
                    { id: 'roll-large-ball', type: 'motion', text: 'Roll Large Ball', icon: 'circle' },
                    { id: 'roll-medium-ball', type: 'motion', text: 'Roll Medium Ball', icon: 'circle-dot' },
                    { id: 'roll-small-ball', type: 'motion', text: 'Roll Small Ball', icon: 'bullseye' },
                    { id: 'add-eyes', type: 'motion', text: 'Add Eyes', icon: 'eye' },
                    { id: 'add-nose', type: 'motion', text: 'Carrot Nose', icon: 'carrot' },
                    { id: 'add-hat', type: 'motion', text: 'Add Hat', icon: 'hat-wizard' }
                ],
                solution: ['roll-large-ball', 'roll-medium-ball', 'roll-small-ball', 'add-eyes', 'add-nose', 'add-hat']
            },
            // Level 4 - Plant a Flower (Simple nature activity)
            4: {
                title: "Plant a Flower",
                description: "Help plant a beautiful flower by putting the gardening steps in order.",
                goal: "Plant a flower by following the correct sequence of steps.",
                image: "./images/plant_steps_linear.png",
                useDirectImage: true,
                blocks: [
                    { id: 'dig-hole', type: 'motion', text: 'Dig a Hole', icon: 'shovel' },
                    { id: 'place-seed', type: 'motion', text: 'Place Seed', icon: 'seedling' },
                    { id: 'add-soil', type: 'motion', text: 'Cover with Soil', icon: 'mountain' },
                    { id: 'water-seed', type: 'motion', text: 'Water the Seed', icon: 'tint' },
                    { id: 'wait-sun', type: 'motion', text: 'Wait for Sunshine', icon: 'sun' },
                    { id: 'watch-grow', type: 'motion', text: 'Watch it Grow', icon: 'eye' }
                ],
                solution: ['dig-hole', 'place-seed', 'add-soil', 'water-seed', 'wait-sun', 'watch-grow']
            },
            // Level 5 - Pizza Time (More complex food preparation)
            5: {
                title: "Pizza Time",
                description: "Help make a delicious pizza by putting the steps in the right order.",
                goal: "Create a perfect pizza following the correct sequence.",
                image: "./images/pizza_steps_linear.png",
                useDirectImage: true,
                blocks: [
                    { id: 'prepare-dough', type: 'motion', text: 'Prepare Dough', icon: 'pizza-slice' },
                    { id: 'add-sauce', type: 'motion', text: 'Add Sauce', icon: 'mortar-pestle' },
                    { id: 'add-cheese', type: 'motion', text: 'Add Cheese', icon: 'cheese' },
                    { id: 'add-toppings', type: 'motion', text: 'Add Toppings', icon: 'pepper-hot' },
                    { id: 'bake-pizza', type: 'motion', text: 'Bake Pizza', icon: 'temperature-high' },
                    { id: 'serve-pizza', type: 'motion', text: 'Serve Pizza', icon: 'utensils' }
                ],
                solution: ['prepare-dough', 'add-sauce', 'add-cheese', 'add-toppings', 'bake-pizza', 'serve-pizza']
            },
            // Level 6 - Robo Treasure Hunt: Ice Path (Simple maze navigation)
            6: {
                title: "Robo Treasure Hunt: Ice Path",
                description: "Use North, South, East, West to move one step at a time and reach the treasure.",
                goal: "Move to the treasure tile, then use Pick Up Treasure.",
                image: "./images/robot-maze-improved.svg",
                storyBoard: {
                    cols: 8,
                    rows: 7,
                    blocked: [
                        { col: 0, row: 0 }, { col: 7, row: 0 }, { col: 0, row: 6 }, { col: 7, row: 6 },
                        { col: 1, row: 2 }, { col: 6, row: 2 }, { col: 1, row: 4 }, { col: 6, row: 4 }
                    ],
                    cracked: []
                },
                storyStartCell: { col: 3, row: 5 },
                storyStartDirection: 'up',
                storyPath: [
                    { col: 3, row: 4 },
                    { col: 3, row: 3 },
                    { col: 3, row: 3 }
                ],
                storyTargetCell: { col: 3, row: 3 },
                blocks: [
                    { id: 'move-north', type: 'motion', text: 'North', icon: 'arrow-up' },
                    { id: 'move-south', type: 'motion', text: 'South', icon: 'arrow-down' },
                    { id: 'move-east', type: 'motion', text: 'East', icon: 'arrow-right' },
                    { id: 'move-west', type: 'motion', text: 'West', icon: 'arrow-left' },
                    { id: 'pick-up', type: 'motion', text: 'Pick Up Treasure', icon: 'box' }
                ],
                solution: ['move-north', 'move-north', 'pick-up']
            },
            // Level 7 - Robo Treasure Hunt: Crystal Maze (Different maze pattern)
            7: {
                title: "Robo Treasure Hunt: Crystal Maze",
                description: "Find the treasure on a new map by moving one step at a time using directions.",
                goal: "Reach the new treasure position, then use Pick Up Treasure.",
                image: "./images/robot-maze-improved.svg",
                storyBoard: {
                    cols: 8,
                    rows: 7,
                    blocked: [
                        { col: 0, row: 0 }, { col: 7, row: 0 }, { col: 0, row: 6 }, { col: 7, row: 6 },
                        { col: 2, row: 1 }, { col: 3, row: 1 }, { col: 5, row: 2 },
                        { col: 1, row: 3 }, { col: 4, row: 3 }, { col: 6, row: 4 }, { col: 2, row: 5 }
                    ],
                    cracked: []
                },
                storyStartCell: { col: 1, row: 5 },
                storyStartDirection: 'up',
                storyPath: [
                    { col: 1, row: 4 },
                    { col: 2, row: 4 },
                    { col: 3, row: 4 },
                    { col: 3, row: 5 },
                    { col: 4, row: 5 },
                    { col: 5, row: 5 },
                    { col: 5, row: 5 }
                ],
                storyTargetCell: { col: 5, row: 5 },
                blocks: [
                    { id: 'move-north', type: 'motion', text: 'North', icon: 'arrow-up' },
                    { id: 'move-south', type: 'motion', text: 'South', icon: 'arrow-down' },
                    { id: 'move-east', type: 'motion', text: 'East', icon: 'arrow-right' },
                    { id: 'move-west', type: 'motion', text: 'West', icon: 'arrow-left' },
                    { id: 'pick-up', type: 'motion', text: 'Pick Up Treasure', icon: 'box' }
                ],
                solution: ['move-north', 'move-east', 'move-east', 'move-south', 'move-east', 'move-east', 'pick-up']
            },
            // Level 8 - Robo Treasure Hunt: Moon Dock (Different maze pattern)
            8: {
                title: "Robo Treasure Hunt: Moon Dock",
                description: "Try a third treasure map with a new robot start and gem location.",
                goal: "Guide the robot to the new gem tile, then use Pick Up Treasure.",
                image: "./images/robot-maze-improved.svg",
                storyBoard: {
                    cols: 8,
                    rows: 7,
                    blocked: [
                        { col: 0, row: 0 }, { col: 7, row: 0 }, { col: 0, row: 6 }, { col: 7, row: 6 },
                        { col: 2, row: 1 }, { col: 3, row: 1 }, { col: 4, row: 2 },
                        { col: 1, row: 3 }, { col: 2, row: 3 }, { col: 6, row: 4 },
                        { col: 5, row: 4 }, { col: 5, row: 5 }
                    ],
                    cracked: []
                },
                storyStartCell: { col: 6, row: 1 },
                storyStartDirection: 'up',
                storyPath: [
                    { col: 6, row: 2 },
                    { col: 6, row: 3 },
                    { col: 5, row: 3 },
                    { col: 4, row: 3 },
                    { col: 4, row: 4 },
                    { col: 3, row: 4 },
                    { col: 3, row: 5 },
                    { col: 2, row: 5 },
                    { col: 1, row: 5 },
                    { col: 1, row: 5 }
                ],
                storyTargetCell: { col: 1, row: 5 },
                blocks: [
                    { id: 'move-north', type: 'motion', text: 'North', icon: 'arrow-up' },
                    { id: 'move-south', type: 'motion', text: 'South', icon: 'arrow-down' },
                    { id: 'move-east', type: 'motion', text: 'East', icon: 'arrow-right' },
                    { id: 'move-west', type: 'motion', text: 'West', icon: 'arrow-left' },
                    { id: 'pick-up', type: 'motion', text: 'Pick Up Treasure', icon: 'box' }
                ],
                solution: ['move-south', 'move-south', 'move-west', 'move-west', 'move-south', 'move-west', 'move-south', 'move-west', 'move-west', 'pick-up']
            },
            // Level 9 - Robo Rescue: Star Harbor (rescue mission with a different pattern)
            9: {
                title: "Robo Rescue: Star Harbor",
                description: "Rescue the lost robo-friend by moving one step at a time on this new map.",
                goal: "Reach the rescue tile, then use Pick Up.",
                image: "./images/robot-maze-improved.svg",
                storyItemName: "rescue tile",
                storyBoard: {
                    cols: 8,
                    rows: 7,
                    blocked: [
                        { col: 0, row: 0 }, { col: 7, row: 0 }, { col: 0, row: 6 }, { col: 7, row: 6 },
                        { col: 2, row: 5 }, { col: 2, row: 4 }, { col: 2, row: 3 },
                        { col: 4, row: 1 }, { col: 4, row: 2 },
                        { col: 4, row: 4 }, { col: 5, row: 4 }, { col: 6, row: 4 },
                        { col: 1, row: 1 }
                    ],
                    cracked: []
                },
                storyStartCell: { col: 1, row: 5 },
                storyStartDirection: 'up',
                storyPath: [
                    { col: 1, row: 4 },
                    { col: 1, row: 3 },
                    { col: 1, row: 2 },
                    { col: 2, row: 2 },
                    { col: 3, row: 2 },
                    { col: 3, row: 3 },
                    { col: 4, row: 3 },
                    { col: 5, row: 3 },
                    { col: 6, row: 3 },
                    { col: 6, row: 2 },
                    { col: 6, row: 2 }
                ],
                storyTargetCell: { col: 6, row: 2 },
                blocks: [
                    { id: 'move-north', type: 'motion', text: 'North', icon: 'arrow-up' },
                    { id: 'move-south', type: 'motion', text: 'South', icon: 'arrow-down' },
                    { id: 'move-east', type: 'motion', text: 'East', icon: 'arrow-right' },
                    { id: 'move-west', type: 'motion', text: 'West', icon: 'arrow-left' },
                    { id: 'pick-up', type: 'motion', text: 'Pick Up', icon: 'box' }
                ],
                solution: ['move-north', 'move-north', 'move-north', 'move-east', 'move-east', 'move-south', 'move-east', 'move-east', 'move-east', 'move-north', 'pick-up']
            },
            // Level 10 - Space Rover Sample Run (collect 2 samples in order, then dock)
            10: {
                title: "Space Rover Sample Run",
                description: "Collect Sample 1, then Sample 2, and finally dock the rover.",
                goal: "Collect 2 samples in the correct order, then dock.",
                image: "./images/robot-maze-improved.svg",
                storyItemName: "mission point",
                storyBoard: {
                    cols: 8,
                    rows: 7,
                    blocked: [
                    { col: 0, row: 0 }, { col: 7, row: 0 }, { col: 0, row: 6 }, { col: 7, row: 6 },
                        { col: 1, row: 1 }, { col: 2, row: 4 }, { col: 3, row: 3 },
                        { col: 3, row: 5 }, { col: 4, row: 1 }, { col: 4, row: 3 },
                        { col: 6, row: 2 }
                    ],
                    cracked: []
                },
                storyStartCell: { col: 1, row: 5 },
                storyStartDirection: 'up',
                storyObjectives: [
                    { cell: { col: 2, row: 3 }, label: 'Sample 1', icon: 'flask', action: 'pick-up', actionLabel: 'Collect' },
                    { cell: { col: 5, row: 2 }, label: 'Sample 2', icon: 'flask', action: 'pick-up', actionLabel: 'Collect' },
                    { cell: { col: 6, row: 5 }, label: 'Dock', icon: 'rocket', action: 'drop-off', actionLabel: 'Dock' }
                ],
                storyPath: [
                    { col: 1, row: 4 },
                    { col: 1, row: 3 },
                    { col: 2, row: 3 },
                    { col: 2, row: 3 },
                    { col: 2, row: 2 },
                    { col: 3, row: 2 },
                    { col: 4, row: 2 },
                    { col: 5, row: 2 },
                    { col: 5, row: 2 },
                    { col: 5, row: 3 },
                    { col: 5, row: 4 },
                    { col: 6, row: 4 },
                    { col: 6, row: 5 },
                    { col: 6, row: 5 }
                ],
                blocks: [
                    { id: 'move-north', type: 'motion', text: 'North', icon: 'arrow-up' },
                    { id: 'move-south', type: 'motion', text: 'South', icon: 'arrow-down' },
                    { id: 'move-east', type: 'motion', text: 'East', icon: 'arrow-right' },
                    { id: 'move-west', type: 'motion', text: 'West', icon: 'arrow-left' },
                    { id: 'pick-up', type: 'motion', text: 'Collect Sample', icon: 'flask' },
                    { id: 'drop-off', type: 'motion', text: 'Dock Rover', icon: 'rocket' }
                ],
                solution: ['move-north', 'move-north', 'move-east', 'pick-up', 'move-north', 'move-east', 'move-east', 'move-east', 'pick-up', 'move-south', 'move-south', 'move-east', 'move-south', 'drop-off']
            },
            // Level 11 - School Bus Route Planner (pick 2 stops, then drop at school)
            11: {
                title: "School Bus Route Planner",
                description: "Plan a smarter bus route through a trickier map with turns and dead ends.",
                goal: "Pick kids from 2 stops, then drop at school in the correct sequence.",
                image: "./images/robot-maze-improved.svg",
                storyItemName: "route stop",
                storyBoard: {
                    cols: 8,
                    rows: 7,
                    blocked: [
                        { col: 0, row: 0 }, { col: 7, row: 0 }, { col: 0, row: 6 }, { col: 7, row: 6 },
                        { col: 1, row: 4 }, { col: 0, row: 5 }, { col: 0, row: 4 }, { col: 0, row: 3 },
                        { col: 2, row: 1 }, { col: 3, row: 1 }, { col: 4, row: 2 }, { col: 4, row: 4 },
                        { col: 3, row: 5 }, { col: 4, row: 5 }, { col: 6, row: 5 }, { col: 6, row: 3 }, { col: 6, row: 4 }
                    ],
                    cracked: []
                },
                storyStartCell: { col: 1, row: 5 },
                storyStartDirection: 'up',
                storyObjectives: [
                    { cell: { col: 1, row: 2 }, label: 'Stop 1', icon: 'users', action: 'pick-up' },
                    { cell: { col: 5, row: 4 }, label: 'Stop 2', icon: 'users', action: 'pick-up' },
                    { cell: { col: 6, row: 1 }, label: 'School', icon: 'school', action: 'drop-off' }
                ],
                storyPath: [
                    { col: 2, row: 5 },
                    { col: 2, row: 4 },
                    { col: 2, row: 3 },
                    { col: 1, row: 3 },
                    { col: 1, row: 2 },
                    { col: 1, row: 2 },
                    { col: 2, row: 2 },
                    { col: 3, row: 2 },
                    { col: 3, row: 3 },
                    { col: 4, row: 3 },
                    { col: 5, row: 3 },
                    { col: 5, row: 4 },
                    { col: 5, row: 4 },
                    { col: 5, row: 3 },
                    { col: 5, row: 2 },
                    { col: 6, row: 2 },
                    { col: 6, row: 1 },
                    { col: 6, row: 1 }
                ],
                blocks: [
                    { id: 'move-north', type: 'motion', text: 'North', icon: 'arrow-up' },
                    { id: 'move-south', type: 'motion', text: 'South', icon: 'arrow-down' },
                    { id: 'move-east', type: 'motion', text: 'East', icon: 'arrow-right' },
                    { id: 'move-west', type: 'motion', text: 'West', icon: 'arrow-left' },
                    { id: 'pick-up', type: 'motion', text: 'Pick Kids', icon: 'users' },
                    { id: 'drop-off', type: 'motion', text: 'Drop at School', icon: 'school' }
                ],
                solution: ['move-east', 'move-north', 'move-north', 'move-west', 'move-north', 'pick-up', 'move-east', 'move-east', 'move-south', 'move-east', 'move-east', 'move-south', 'pick-up', 'move-north', 'move-north', 'move-east', 'move-north', 'drop-off']
            }
        },
        loops: {
            1: {
                title: "Frozen Shortcut",
                description: "Learn loops on the ice map with one repeat.",
                goal: "Repeat North, then pick up treasure.",
                image: "./images/robot-maze-improved.svg",
                storyBoard: {
                    cols: 8,
                    rows: 7,
                    blocked: [
                        { col: 0, row: 0 }, { col: 7, row: 0 }, { col: 0, row: 6 }, { col: 7, row: 6 },
                        { col: 1, row: 2 }, { col: 6, row: 2 }, { col: 1, row: 4 }, { col: 6, row: 4 }
                    ],
                    cracked: []
                },
                storyStartCell: { col: 3, row: 5 },
                storyTargetCell: { col: 3, row: 3 },
                blocks: [
                    { id: 'repeat-custom', type: 'loop', text: 'Repeat', icon: 'redo', defaultRepeat: 2 },
                    { id: 'move-north', type: 'motion', text: 'North', icon: 'arrow-up' },
                    { id: 'move-south', type: 'motion', text: 'South', icon: 'arrow-down' },
                    { id: 'move-east', type: 'motion', text: 'East', icon: 'arrow-right' },
                    { id: 'move-west', type: 'motion', text: 'West', icon: 'arrow-left' },
                    { id: 'pick-up', type: 'motion', text: 'Pick Up Treasure', icon: 'gem' }
                ],
                solution: ['repeat-custom-2', 'move-north', 'pick-up']
            },
            2: {
                title: "Crystal Corridor",
                description: "Move through a corridor using repeat for faster steps.",
                goal: "Reach treasure with repeat moves and pick up.",
                image: "./images/robot-maze-improved.svg",
                storyBoard: {
                    cols: 8,
                    rows: 7,
                    blocked: [
                        { col: 0, row: 0 }, { col: 7, row: 0 }, { col: 0, row: 6 }, { col: 7, row: 6 },
                        { col: 2, row: 1 }, { col: 3, row: 1 }, { col: 5, row: 2 },
                        { col: 1, row: 3 }, { col: 4, row: 3 }, { col: 6, row: 4 }, { col: 2, row: 5 }
                    ],
                    cracked: []
                },
                storyStartCell: { col: 1, row: 5 },
                storyTargetCell: { col: 5, row: 5 },
                blocks: [
                    { id: 'repeat-custom', type: 'loop', text: 'Repeat', icon: 'redo', defaultRepeat: 2 },
                    { id: 'move-north', type: 'motion', text: 'North', icon: 'arrow-up' },
                    { id: 'move-south', type: 'motion', text: 'South', icon: 'arrow-down' },
                    { id: 'move-east', type: 'motion', text: 'East', icon: 'arrow-right' },
                    { id: 'move-west', type: 'motion', text: 'West', icon: 'arrow-left' },
                    { id: 'pick-up', type: 'motion', text: 'Pick Up Treasure', icon: 'gem' }
                ],
                solution: ['move-north', 'repeat-custom-2', 'move-east', 'move-south', 'repeat-custom-2', 'move-east', 'pick-up']
            },
            3: {
                title: "Moon Tunnel",
                description: "Longer moon route that needs multiple repeat choices.",
                goal: "Use repeat smartly and pick up at the end.",
                image: "./images/robot-maze-improved.svg",
                storyBoard: {
                    cols: 8,
                    rows: 7,
                    blocked: [
                        { col: 0, row: 0 }, { col: 7, row: 0 }, { col: 0, row: 6 }, { col: 7, row: 6 },
                        { col: 2, row: 1 }, { col: 3, row: 1 }, { col: 4, row: 2 },
                        { col: 1, row: 3 }, { col: 2, row: 3 }, { col: 6, row: 4 },
                        { col: 5, row: 4 }, { col: 5, row: 5 }
                    ],
                    cracked: []
                },
                storyStartCell: { col: 6, row: 1 },
                storyTargetCell: { col: 1, row: 5 },
                blocks: [
                    { id: 'repeat-custom', type: 'loop', text: 'Repeat', icon: 'redo', defaultRepeat: 2 },
                    { id: 'move-north', type: 'motion', text: 'North', icon: 'arrow-up' },
                    { id: 'move-south', type: 'motion', text: 'South', icon: 'arrow-down' },
                    { id: 'move-east', type: 'motion', text: 'East', icon: 'arrow-right' },
                    { id: 'move-west', type: 'motion', text: 'West', icon: 'arrow-left' },
                    { id: 'pick-up', type: 'motion', text: 'Pick Up Treasure', icon: 'gem' }
                ],
                solution: ['repeat-custom-2', 'move-south', 'repeat-custom-2', 'move-west', 'move-south', 'move-west', 'move-south', 'repeat-custom-2', 'move-west', 'pick-up']
            },
            4: {
                title: "Star Harbor Rescue",
                description: "Reach the rescue tile with shorter loop-based moves.",
                goal: "Guide robot to rescue tile, then pick up.",
                image: "./images/robot-maze-improved.svg",
                storyItemName: "rescue tile",
                storyBoard: {
                    cols: 8,
                    rows: 7,
                    blocked: [
                        { col: 0, row: 0 }, { col: 7, row: 0 }, { col: 0, row: 6 }, { col: 7, row: 6 },
                        { col: 2, row: 5 }, { col: 2, row: 4 }, { col: 2, row: 3 },
                        { col: 4, row: 1 }, { col: 4, row: 2 },
                        { col: 4, row: 4 }, { col: 5, row: 4 }, { col: 6, row: 4 },
                        { col: 1, row: 1 }
                    ],
                    cracked: []
                },
                storyStartCell: { col: 1, row: 5 },
                storyTargetCell: { col: 6, row: 2 },
                blocks: [
                    { id: 'repeat-custom', type: 'loop', text: 'Repeat', icon: 'redo', defaultRepeat: 3 },
                    { id: 'move-north', type: 'motion', text: 'North', icon: 'arrow-up' },
                    { id: 'move-south', type: 'motion', text: 'South', icon: 'arrow-down' },
                    { id: 'move-east', type: 'motion', text: 'East', icon: 'arrow-right' },
                    { id: 'move-west', type: 'motion', text: 'West', icon: 'arrow-left' },
                    { id: 'pick-up', type: 'motion', text: 'Pick Up', icon: 'gem' }
                ],
                solution: ['repeat-custom-3', 'move-north', 'repeat-custom-2', 'move-east', 'move-south', 'repeat-custom-3', 'move-east', 'move-north', 'pick-up']
            },
            5: {
                title: "Rover Sample Run",
                description: "Collect Sample 1, then Sample 2, then dock.",
                goal: "Use loops and finish all objectives in order.",
                image: "./images/robot-maze-improved.svg",
                storyItemName: "mission point",
                storyBoard: {
                    cols: 8,
                    rows: 7,
                    blocked: [
                        { col: 0, row: 0 }, { col: 7, row: 0 }, { col: 0, row: 6 }, { col: 7, row: 6 },
                        { col: 1, row: 1 }, { col: 2, row: 4 }, { col: 3, row: 3 },
                        { col: 3, row: 5 }, { col: 4, row: 1 }, { col: 4, row: 3 },
                        { col: 6, row: 2 }
                    ],
                    cracked: []
                },
                storyStartCell: { col: 1, row: 5 },
                storyObjectives: [
                    { cell: { col: 2, row: 3 }, label: 'Sample 1', icon: 'flask', action: 'pick-up', actionLabel: 'Collect' },
                    { cell: { col: 5, row: 2 }, label: 'Sample 2', icon: 'flask', action: 'pick-up', actionLabel: 'Collect' },
                    { cell: { col: 6, row: 5 }, label: 'Dock', icon: 'rocket', action: 'drop-off', actionLabel: 'Dock' }
                ],
                blocks: [
                    { id: 'repeat-custom', type: 'loop', text: 'Repeat', icon: 'redo', defaultRepeat: 2 },
                    { id: 'move-north', type: 'motion', text: 'North', icon: 'arrow-up' },
                    { id: 'move-south', type: 'motion', text: 'South', icon: 'arrow-down' },
                    { id: 'move-east', type: 'motion', text: 'East', icon: 'arrow-right' },
                    { id: 'move-west', type: 'motion', text: 'West', icon: 'arrow-left' },
                    { id: 'pick-up', type: 'motion', text: 'Collect Sample', icon: 'flask' },
                    { id: 'drop-off', type: 'motion', text: 'Dock Rover', icon: 'rocket' }
                ],
                solution: ['repeat-custom-2', 'move-north', 'move-east', 'pick-up', 'move-north', 'repeat-custom-3', 'move-east', 'pick-up', 'repeat-custom-2', 'move-south', 'move-east', 'move-south', 'drop-off']
            },
            6: {
                title: "School Bus Route",
                description: "Pick kids from two stops and drop at school in order.",
                goal: "Use loops for route segments and complete pick/drop sequence.",
                image: "./images/robot-maze-improved.svg",
                storyItemName: "route stop",
                storyBoard: {
                    cols: 8,
                    rows: 7,
                    blocked: [
                        { col: 0, row: 0 }, { col: 7, row: 0 }, { col: 0, row: 6 }, { col: 7, row: 6 },
                        { col: 1, row: 4 }, { col: 0, row: 5 }, { col: 0, row: 4 }, { col: 0, row: 3 },
                        { col: 2, row: 1 }, { col: 3, row: 1 }, { col: 4, row: 2 }, { col: 4, row: 4 },
                        { col: 3, row: 5 }, { col: 4, row: 5 }, { col: 6, row: 5 }, { col: 6, row: 3 }, { col: 6, row: 4 }
                    ],
                    cracked: []
                },
                storyStartCell: { col: 1, row: 5 },
                storyObjectives: [
                    { cell: { col: 1, row: 2 }, label: 'Stop 1', icon: 'users', action: 'pick-up' },
                    { cell: { col: 5, row: 4 }, label: 'Stop 2', icon: 'users', action: 'pick-up' },
                    { cell: { col: 6, row: 1 }, label: 'School', icon: 'school', action: 'drop-off' }
                ],
                blocks: [
                    { id: 'repeat-custom', type: 'loop', text: 'Repeat', icon: 'redo', defaultRepeat: 2 },
                    { id: 'move-north', type: 'motion', text: 'North', icon: 'arrow-up' },
                    { id: 'move-south', type: 'motion', text: 'South', icon: 'arrow-down' },
                    { id: 'move-east', type: 'motion', text: 'East', icon: 'arrow-right' },
                    { id: 'move-west', type: 'motion', text: 'West', icon: 'arrow-left' },
                    { id: 'pick-up', type: 'motion', text: 'Pick Kids', icon: 'users' },
                    { id: 'drop-off', type: 'motion', text: 'Drop at School', icon: 'school' }
                ],
                solution: ['move-east', 'repeat-custom-2', 'move-north', 'move-west', 'move-north', 'pick-up', 'repeat-custom-2', 'move-east', 'move-south', 'repeat-custom-2', 'move-east', 'move-south', 'pick-up', 'repeat-custom-2', 'move-north', 'move-east', 'move-north', 'drop-off']
            },
            7: {
                title: "Triple Stop Relay",
                description: "Collect two checkpoints and dock with loop shortcuts.",
                goal: "Collect Stop A, Stop B, then Dock.",
                image: "./images/robot-maze-improved.svg",
                storyItemName: "checkpoint",
                storyBoard: {
                    cols: 8,
                    rows: 7,
                    blocked: [
                        { col: 0, row: 0 }, { col: 7, row: 0 }, { col: 0, row: 6 }, { col: 7, row: 6 },
                        { col: 1, row: 2 }, { col: 6, row: 2 }, { col: 1, row: 4 }, { col: 6, row: 4 }
                    ],
                    cracked: []
                },
                storyStartCell: { col: 2, row: 5 },
                storyObjectives: [
                    { cell: { col: 5, row: 5 }, label: 'Stop A', icon: 'flask', action: 'pick-up', actionLabel: 'Collect' },
                    { cell: { col: 5, row: 2 }, label: 'Stop B', icon: 'flask', action: 'pick-up', actionLabel: 'Collect' },
                    { cell: { col: 2, row: 2 }, label: 'Dock', icon: 'rocket', action: 'drop-off', actionLabel: 'Dock' }
                ],
                blocks: [
                    { id: 'repeat-custom', type: 'loop', text: 'Repeat', icon: 'redo', defaultRepeat: 3 },
                    { id: 'move-north', type: 'motion', text: 'North', icon: 'arrow-up' },
                    { id: 'move-south', type: 'motion', text: 'South', icon: 'arrow-down' },
                    { id: 'move-east', type: 'motion', text: 'East', icon: 'arrow-right' },
                    { id: 'move-west', type: 'motion', text: 'West', icon: 'arrow-left' },
                    { id: 'pick-up', type: 'motion', text: 'Collect', icon: 'flask' },
                    { id: 'drop-off', type: 'motion', text: 'Dock', icon: 'rocket' }
                ],
                solution: ['repeat-custom-3', 'move-east', 'pick-up', 'repeat-custom-3', 'move-north', 'pick-up', 'repeat-custom-3', 'move-west', 'drop-off']
            },
            8: {
                title: "Final Relay",
                description: "Final mission with collect-collect-dock order and loops.",
                goal: "Collect Point 1, collect Point 2, then dock.",
                image: "./images/robot-maze-improved.svg",
                storyItemName: "checkpoint",
                storyBoard: {
                    cols: 8,
                    rows: 7,
                    blocked: [
                        { col: 0, row: 0 }, { col: 7, row: 0 }, { col: 0, row: 6 }, { col: 7, row: 6 },
                        { col: 1, row: 2 }, { col: 6, row: 2 }, { col: 1, row: 4 }, { col: 6, row: 4 }
                    ],
                    cracked: []
                },
                storyStartCell: { col: 2, row: 5 },
                storyObjectives: [
                    { cell: { col: 2, row: 3 }, label: 'Point 1', icon: 'flask', action: 'pick-up', actionLabel: 'Collect' },
                    { cell: { col: 5, row: 3 }, label: 'Point 2', icon: 'flask', action: 'pick-up', actionLabel: 'Collect' },
                    { cell: { col: 5, row: 5 }, label: 'Dock', icon: 'rocket', action: 'drop-off', actionLabel: 'Dock' }
                ],
                blocks: [
                    { id: 'repeat-custom', type: 'loop', text: 'Repeat', icon: 'redo', defaultRepeat: 2 },
                    { id: 'move-north', type: 'motion', text: 'North', icon: 'arrow-up' },
                    { id: 'move-south', type: 'motion', text: 'South', icon: 'arrow-down' },
                    { id: 'move-east', type: 'motion', text: 'East', icon: 'arrow-right' },
                    { id: 'move-west', type: 'motion', text: 'West', icon: 'arrow-left' },
                    { id: 'pick-up', type: 'motion', text: 'Collect', icon: 'flask' },
                    { id: 'drop-off', type: 'motion', text: 'Dock', icon: 'rocket' }
                ],
                solution: ['repeat-custom-2', 'move-north', 'pick-up', 'repeat-custom-3', 'move-east', 'pick-up', 'repeat-custom-2', 'move-south', 'drop-off']
            },
            9: {
                title: "Robo Loop: Zigzag Ice Run",
                description: "Zigzag through the ice path and reach the gem.",
                goal: "Use repeating North + East style moves, then pick up the gem.",
                image: "./images/robot-maze-improved.svg",
                storyItemName: "zigzag gem",
                storyBoard: {
                    cols: 8,
                    rows: 7,
                    blocked: [
                        { col: 0, row: 0 }, { col: 7, row: 0 }, { col: 0, row: 6 }, { col: 7, row: 6 },
                        { col: 2, row: 5 }, { col: 4, row: 5 }, { col: 6, row: 5 },
                        { col: 1, row: 3 }, { col: 4, row: 3 }, { col: 6, row: 3 },
                        { col: 2, row: 1 }, { col: 6, row: 1 }
                    ],
                    cracked: []
                },
                storyStartCell: { col: 1, row: 5 },
                storyTargetCell: { col: 5, row: 1 },
                blocks: [
                    { id: 'repeat-custom', type: 'loop', text: 'Repeat', icon: 'redo', defaultRepeat: 2 },
                    { id: 'move-north', type: 'motion', text: 'North', icon: 'arrow-up' },
                    { id: 'move-south', type: 'motion', text: 'South', icon: 'arrow-down' },
                    { id: 'move-east', type: 'motion', text: 'East', icon: 'arrow-right' },
                    { id: 'move-west', type: 'motion', text: 'West', icon: 'arrow-left' },
                    { id: 'pick-up', type: 'motion', text: 'Pick Up Treasure', icon: 'gem' }
                ],
                solution: ['move-north', 'repeat-custom-4', 'move-east', 'repeat-custom-3', 'move-north', 'pick-up']
            },
            10: {
                title: "Robo Loop: Broken Bridge Patrol",
                description: "Cross the broken bridge lanes and reach the patrol gem.",
                goal: "Use loop segments with one correction turn, then pick up.",
                image: "./images/robot-maze-improved.svg",
                storyItemName: "patrol gem",
                storyBoard: {
                    cols: 8,
                    rows: 7,
                    blocked: [
                        { col: 0, row: 0 }, { col: 7, row: 0 }, { col: 0, row: 6 }, { col: 7, row: 6 },
                        { col: 1, row: 1 }, { col: 2, row: 1 }, { col: 4, row: 1 },
                        { col: 1, row: 2 }, { col: 6, row: 2 },
                        { col: 2, row: 4 }, { col: 4, row: 4 }, { col: 5, row: 4 },
                        { col: 5, row: 5 }
                    ],
                    cracked: []
                },
                storyStartCell: { col: 1, row: 5 },
                storyTargetCell: { col: 6, row: 1 },
                blocks: [
                    { id: 'repeat-custom', type: 'loop', text: 'Repeat', icon: 'redo', defaultRepeat: 2 },
                    { id: 'move-north', type: 'motion', text: 'North', icon: 'arrow-up' },
                    { id: 'move-south', type: 'motion', text: 'South', icon: 'arrow-down' },
                    { id: 'move-east', type: 'motion', text: 'East', icon: 'arrow-right' },
                    { id: 'move-west', type: 'motion', text: 'West', icon: 'arrow-left' },
                    { id: 'pick-up', type: 'motion', text: 'Pick Up Treasure', icon: 'gem' }
                ],
                solution: ['repeat-custom-2', 'move-east', 'repeat-custom-3', 'move-north', 'repeat-custom-2', 'move-east', 'move-north', 'move-east', 'pick-up']
            },
            11: {
                title: "Robo Loop: Twin Crystal Pickup",
                description: "Collect Crystal 1, then Crystal 2 in order.",
                goal: "Use two loop sections and collect both crystals in sequence.",
                image: "./images/robot-maze-improved.svg",
                storyItemName: "crystal point",
                storyBoard: {
                    cols: 8,
                    rows: 7,
                    blocked: [
                        { col: 0, row: 0 }, { col: 7, row: 0 }, { col: 0, row: 6 }, { col: 7, row: 6 },
                        { col: 1, row: 1 }, { col: 2, row: 1 }, { col: 5, row: 1 },
                        { col: 4, row: 3 }
                    ],
                    cracked: []
                },
                storyStartCell: { col: 1, row: 5 },
                storyObjectives: [
                    { cell: { col: 3, row: 4 }, label: 'Crystal 1', icon: 'gem', action: 'pick-up', actionLabel: 'Pick' },
                    { cell: { col: 6, row: 2 }, label: 'Crystal 2', icon: 'gem', action: 'pick-up', actionLabel: 'Pick' }
                ],
                blocks: [
                    { id: 'repeat-custom', type: 'loop', text: 'Repeat', icon: 'redo', defaultRepeat: 2 },
                    { id: 'move-north', type: 'motion', text: 'North', icon: 'arrow-up' },
                    { id: 'move-south', type: 'motion', text: 'South', icon: 'arrow-down' },
                    { id: 'move-east', type: 'motion', text: 'East', icon: 'arrow-right' },
                    { id: 'move-west', type: 'motion', text: 'West', icon: 'arrow-left' },
                    { id: 'pick-up', type: 'motion', text: 'Pick Crystal', icon: 'gem' }
                ],
                solution: ['repeat-custom-2', 'move-east', 'move-north', 'pick-up', 'repeat-custom-3', 'move-east', 'repeat-custom-2', 'move-north', 'pick-up']
            },
            12: {
                title: "Robo Loop: Moon Crater Detour",
                description: "Avoid crater lanes and reach the moon gem.",
                goal: "Use exact repeat counts to clear the detour path and pick up.",
                image: "./images/robot-maze-improved.svg",
                storyItemName: "moon gem",
                storyBoard: {
                    cols: 8,
                    rows: 7,
                    blocked: [
                        { col: 0, row: 0 }, { col: 7, row: 0 }, { col: 0, row: 6 }, { col: 7, row: 6 },
                        { col: 3, row: 1 }, { col: 4, row: 1 }, { col: 5, row: 1 },
                        { col: 3, row: 2 }, { col: 5, row: 2 }, { col: 6, row: 2 },
                        { col: 3, row: 3 }, { col: 4, row: 3 }, { col: 6, row: 3 },
                        { col: 3, row: 4 }, { col: 6, row: 4 }
                    ],
                    cracked: []
                },
                storyStartCell: { col: 6, row: 5 },
                storyTargetCell: { col: 1, row: 1 },
                blocks: [
                    { id: 'repeat-custom', type: 'loop', text: 'Repeat', icon: 'redo', defaultRepeat: 2 },
                    { id: 'move-north', type: 'motion', text: 'North', icon: 'arrow-up' },
                    { id: 'move-south', type: 'motion', text: 'South', icon: 'arrow-down' },
                    { id: 'move-east', type: 'motion', text: 'East', icon: 'arrow-right' },
                    { id: 'move-west', type: 'motion', text: 'West', icon: 'arrow-left' },
                    { id: 'pick-up', type: 'motion', text: 'Pick Up Treasure', icon: 'gem' }
                ],
                solution: ['repeat-custom-5', 'move-west', 'repeat-custom-4', 'move-north', 'pick-up']
            },
            13: {
                title: "Robo Loop: Shuttle Stop Relay",
                description: "Reach Stop 1, Stop 2, then Dock through relay lanes.",
                goal: "Pick from both shuttle stops in order, then dock.",
                image: "./images/robot-maze-improved.svg",
                storyItemName: "shuttle point",
                storyBoard: {
                    cols: 8,
                    rows: 7,
                    blocked: [
                        { col: 0, row: 0 }, { col: 7, row: 0 }, { col: 0, row: 6 }, { col: 7, row: 6 },
                        { col: 1, row: 1 }, { col: 2, row: 1 }, { col: 4, row: 1 },
                        { col: 6, row: 1 }, { col: 1, row: 2 },
                        { col: 1, row: 3 }, { col: 6, row: 3 },
                        { col: 4, row: 4 }, { col: 5, row: 4 }
                    ],
                    cracked: []
                },
                storyStartCell: { col: 1, row: 5 },
                storyObjectives: [
                    { cell: { col: 3, row: 5 }, label: 'Stop 1', icon: 'users', action: 'pick-up', actionLabel: 'Pick' },
                    { cell: { col: 3, row: 2 }, label: 'Stop 2', icon: 'users', action: 'pick-up', actionLabel: 'Pick' },
                    { cell: { col: 6, row: 2 }, label: 'Dock', icon: 'rocket', action: 'drop-off', actionLabel: 'Dock' }
                ],
                blocks: [
                    { id: 'repeat-custom', type: 'loop', text: 'Repeat', icon: 'redo', defaultRepeat: 3 },
                    { id: 'move-north', type: 'motion', text: 'North', icon: 'arrow-up' },
                    { id: 'move-south', type: 'motion', text: 'South', icon: 'arrow-down' },
                    { id: 'move-east', type: 'motion', text: 'East', icon: 'arrow-right' },
                    { id: 'move-west', type: 'motion', text: 'West', icon: 'arrow-left' },
                    { id: 'pick-up', type: 'motion', text: 'Pick', icon: 'users' },
                    { id: 'drop-off', type: 'motion', text: 'Dock', icon: 'rocket' }
                ],
                solution: ['repeat-custom-2', 'move-east', 'pick-up', 'repeat-custom-3', 'move-north', 'pick-up', 'repeat-custom-3', 'move-east', 'drop-off']
            },
            14: {
                title: "Robo Loop: Mega Rescue Grid",
                description: "Hard map with two gems and final dock objective.",
                goal: "Collect Gem 1, collect Gem 2, then dock using smart loops.",
                image: "./images/robot-maze-improved.svg",
                storyItemName: "rescue point",
                storyBoard: {
                    cols: 8,
                    rows: 7,
                    blocked: [
                        { col: 0, row: 0 }, { col: 7, row: 0 }, { col: 0, row: 6 }, { col: 7, row: 6 },
                        { col: 1, row: 1 }, { col: 3, row: 1 }, { col: 6, row: 1 },
                        { col: 6, row: 2 },
                        { col: 3, row: 3 }, { col: 6, row: 3 },
                        { col: 3, row: 4 }, { col: 6, row: 4 },
                        { col: 4, row: 5 }
                    ],
                    cracked: []
                },
                storyStartCell: { col: 1, row: 5 },
                storyObjectives: [
                    { cell: { col: 2, row: 2 }, label: 'Gem 1', icon: 'gem', action: 'pick-up', actionLabel: 'Pick' },
                    { cell: { col: 5, row: 2 }, label: 'Gem 2', icon: 'gem', action: 'pick-up', actionLabel: 'Pick' },
                    { cell: { col: 6, row: 5 }, label: 'Dock', icon: 'rocket', action: 'drop-off', actionLabel: 'Dock' }
                ],
                blocks: [
                    { id: 'repeat-custom', type: 'loop', text: 'Repeat', icon: 'redo', defaultRepeat: 3 },
                    { id: 'move-north', type: 'motion', text: 'North', icon: 'arrow-up' },
                    { id: 'move-south', type: 'motion', text: 'South', icon: 'arrow-down' },
                    { id: 'move-east', type: 'motion', text: 'East', icon: 'arrow-right' },
                    { id: 'move-west', type: 'motion', text: 'West', icon: 'arrow-left' },
                    { id: 'pick-up', type: 'motion', text: 'Pick Gem', icon: 'gem' },
                    { id: 'drop-off', type: 'motion', text: 'Dock', icon: 'rocket' }
                ],
                solution: ['repeat-custom-3', 'move-north', 'move-east', 'pick-up', 'repeat-custom-3', 'move-east', 'pick-up', 'repeat-custom-3', 'move-south', 'move-east', 'drop-off']
            }
        },
        conditions: {
            // Level 1 - Weather Checker (Very basic condition for ages 5-6)
            1: {
                title: "Weather Checker",
                description: "Check the weather and decide what to wear.",
                goal: "Create a program that picks the right clothes based on the weather.",
                image: "./images/weather-checker.svg", // Updated to a proper image
                blocks: [
                    { id: 'if-sunny', type: 'conditions', text: 'If Sunny', icon: 'sun' },
                    { id: 'if-rainy', type: 'conditions', text: 'If Rainy', icon: 'cloud-rain' },
                    { id: 'wear-tshirt', type: 'motion', text: 'Wear T-shirt', icon: 'tshirt' },
                    { id: 'wear-raincoat', type: 'motion', text: 'Wear Raincoat', icon: 'umbrella' },
                ],
                solution: ['if-sunny', 'wear-tshirt', 'if-rainy', 'wear-raincoat'],
                isNested: true
            },
            // Level 2 - Fruit Sorter (Basic condition)
            2: {
                title: "Fruit Sorter",
                description: "Sort different fruits into their correct baskets.",
                goal: "Create a program that puts each type of fruit in the right basket.",
                image: "./images/count-apples.svg",
                blocks: [
                    { id: 'if-apple', type: 'conditions', text: 'If Apple', icon: 'apple-alt' },
                    { id: 'if-banana', type: 'conditions', text: 'If Banana', icon: 'carrot' },
                    { id: 'put-in-red-basket', type: 'motion', text: 'Put in Red Basket', icon: 'shopping-basket' },
                    { id: 'put-in-yellow-basket', type: 'motion', text: 'Put in Yellow Basket', icon: 'shopping-basket' }
                ],
                solution: ['if-apple', 'put-in-red-basket', 'if-banana', 'put-in-yellow-basket'],
                isNested: true
            },
            // Level 3 - Robot Direction (Basic condition)
            3: {
                title: "Robot Direction",
                description: "Help the robot choose which way to go based on signs.",
                goal: "Program the robot to follow the correct path signs.",
                image: "./images/robot-path.svg",
                blocks: [
                    { id: 'if-arrow-right', type: 'conditions', text: 'If Arrow Points Right', icon: 'arrow-right' },
                    { id: 'if-arrow-left', type: 'conditions', text: 'If Arrow Points Left', icon: 'arrow-left' },
                    { id: 'go-right', type: 'motion', text: 'Go Right', icon: 'arrow-right' },
                    { id: 'go-left', type: 'motion', text: 'Go Left', icon: 'arrow-left' }
                ],
                solution: ['if-arrow-right', 'go-right', 'if-arrow-left', 'go-left'],
                isNested: true
            },
            // Level 4 - Traffic Light (Basic condition)
            4: {
                title: "Traffic Light",
                description: "Program a car to respond correctly to traffic light signals.",
                goal: "Make the car stop or go depending on the traffic light color.",
                image: "./images/traffic-light.svg", // Updated to a proper image
                blocks: [
                    { id: 'if-green-light', type: 'conditions', text: 'If Green Light', icon: 'circle' },
                    { id: 'if-red-light', type: 'conditions', text: 'If Red Light', icon: 'circle' },
                    { id: 'drive-forward', type: 'motion', text: 'Drive Forward', icon: 'car-side' },
                    { id: 'stop-car', type: 'motion', text: 'Stop Car', icon: 'hand-paper' }
                ],
                solution: ['if-green-light', 'drive-forward', 'if-red-light', 'stop-car'],
                isNested: true
            },
            // Level 5 - Pet Care (Basic condition)
            5: {
                title: "Pet Care",
                description: "Take care of different pets with their specific needs.",
                goal: "Give each pet what they need based on the type of animal.",
                image: "./images/pet-care.svg", // Updated to a proper image
                blocks: [
                    { id: 'if-dog', type: 'conditions', text: 'If Dog', icon: 'dog' },
                    { id: 'if-fish', type: 'conditions', text: 'If Fish', icon: 'fish' },
                    { id: 'give-bone', type: 'motion', text: 'Give Bone', icon: 'bone' },
                    { id: 'add-water', type: 'motion', text: 'Add Water', icon: 'water' }
                ],
                solution: ['if-dog', 'give-bone', 'if-fish', 'add-water'],
                isNested: true
            },
            // Level 6 - Shape Matcher (Intermediate condition)
            6: {
                title: "Shape Matcher",
                description: "Sort different shapes into their matching containers.",
                goal: "Put each shape in its correctly shaped container.",
                image: "./images/shape-sorter.svg", // Updated to a proper image
                blocks: [
                    { id: 'if-square', type: 'conditions', text: 'If Square', icon: 'square' },
                    { id: 'if-circle', type: 'conditions', text: 'If Circle', icon: 'circle' },
                    { id: 'if-triangle', type: 'conditions', text: 'If Triangle', icon: 'play' },
                    { id: 'put-in-square-hole', type: 'motion', text: 'Put in Square Hole', icon: 'square' },
                    { id: 'put-in-circle-hole', type: 'motion', text: 'Put in Circle Hole', icon: 'circle' },
                    { id: 'put-in-triangle-hole', type: 'motion', text: 'Put in Triangle Hole', icon: 'play' }
                ],
                solution: ['if-square', 'put-in-square-hole', 'if-circle', 'put-in-circle-hole', 'if-triangle', 'put-in-triangle-hole'],
                isNested: true
            },
            // Level 7 - Number Sorter (Intermediate condition)
            7: {
                title: "Number Sorter",
                description: "Sort numbers into categories: odd, even, or zero.",
                goal: "Correctly identify and categorize each number.",
                image: "./images/number-sorter.svg", // Updated to a proper image
                blocks: [
                    { id: 'if-even', type: 'conditions', text: 'If Even Number', icon: 'hashtag' },
                    { id: 'if-odd', type: 'conditions', text: 'If Odd Number', icon: 'hashtag' },
                    { id: 'if-zero', type: 'conditions', text: 'If Zero', icon: '0' },
                    { id: 'put-in-even-group', type: 'motion', text: 'Put in Even Group', icon: 'layer-group' },
                    { id: 'put-in-odd-group', type: 'motion', text: 'Put in Odd Group', icon: 'layer-group' },
                    { id: 'put-in-special-group', type: 'motion', text: 'Put in Special Group', icon: 'star' }
                ],
                solution: ['if-even', 'put-in-even-group', 'if-odd', 'put-in-odd-group', 'if-zero', 'put-in-special-group'],
                isNested: true
            },
            // Level 8 - Temperature Advisor (Intermediate condition)
            8: {
                title: "Temperature Advisor",
                description: "Give advice based on the temperature outside.",
                goal: "Provide the right clothing recommendation for different temperatures.",
                image: "./images/temperature-advisor.svg", // Updated to a proper image
                blocks: [
                    { id: 'if-hot', type: 'conditions', text: 'If Hot (> 30°C)', icon: 'temperature-high' },
                    { id: 'if-warm', type: 'conditions', text: 'If Warm (15-30°C)', icon: 'temperature-high' },
                    { id: 'if-cold', type: 'conditions', text: 'If Cold (< 15°C)', icon: 'temperature-low' },
                    { id: 'wear-light-clothes', type: 'motion', text: 'Wear Light Clothes', icon: 'tshirt' },
                    { id: 'wear-normal-clothes', type: 'motion', text: 'Wear Regular Clothes', icon: 'tshirt' },
                    { id: 'wear-jacket', type: 'motion', text: 'Wear Jacket', icon: 'user' }
                ],
                solution: ['if-hot', 'wear-light-clothes', 'if-warm', 'wear-normal-clothes', 'if-cold', 'wear-jacket'],
                isNested: true
            },
            // Level 9 - Quiz Game (Intermediate condition)
            9: {
                title: "Quiz Game",
                description: "Create a quiz game that responds to correct and incorrect answers.",
                goal: "Give appropriate feedback based on the answer given.",
                image: "./images/quiz-game.svg", // Updated to a proper image
                blocks: [
                    { id: 'if-correct-answer', type: 'conditions', text: 'If Answer Correct', icon: 'check' },
                    { id: 'if-wrong-answer', type: 'conditions', text: 'If Answer Wrong', icon: 'times' },
                    { id: 'if-no-answer', type: 'conditions', text: 'If No Answer', icon: 'question' },
                    { id: 'show-congratulation', type: 'motion', text: 'Show Congratulation', icon: 'trophy' },
                    { id: 'show-hint', type: 'motion', text: 'Show Hint', icon: 'lightbulb' },
                    { id: 'show-reminder', type: 'motion', text: 'Show Reminder', icon: 'bell' }
                ],
                solution: ['if-correct-answer', 'show-congratulation', 'if-wrong-answer', 'show-hint', 'if-no-answer', 'show-reminder'],
                isNested: true
            },
            // Level 10 - Robot Obstacle Course (Advanced condition)
            10: {
                title: "Robot Obstacle Course",
                description: "Program a robot to navigate through different obstacles.",
                goal: "Help the robot avoid obstacles and reach the finish line.",
                image: "./images/robot-obstacle.svg",
                blocks: [
                    { id: 'if-wall-ahead', type: 'conditions', text: 'If Wall Ahead', icon: 'ban' },
                    { id: 'if-water-ahead', type: 'conditions', text: 'If Water Ahead', icon: 'water' },
                    { id: 'if-finish-line', type: 'conditions', text: 'If Finish Line', icon: 'flag-checkered' },
                    { id: 'turn-around', type: 'motion', text: 'Turn Around', icon: 'undo' },
                    { id: 'jump-over', type: 'motion', text: 'Jump Over', icon: 'running' },
                    { id: 'celebrate-finish', type: 'motion', text: 'Celebrate', icon: 'star' }
                ],
                solution: ['if-wall-ahead', 'turn-around', 'if-water-ahead', 'jump-over', 'if-finish-line', 'celebrate-finish'],
                isNested: true
            },
            // Level 11 - Color Mixer (Advanced condition)
            11: {
                title: "Color Mixer",
                description: "Create different colors by mixing primary colors based on conditions.",
                goal: "Mix the right colors based on what's needed for each painting.",
                image: "./images/color-mixer.svg",
                blocks: [
                    { id: 'if-need-orange', type: 'conditions', text: 'If Need Orange', icon: 'palette' },
                    { id: 'if-need-purple', type: 'conditions', text: 'If Need Purple', icon: 'palette' },
                    { id: 'if-need-green', type: 'conditions', text: 'If Need Green', icon: 'palette' },
                    { id: 'mix-red-yellow', type: 'motion', text: 'Mix Red & Yellow', icon: 'fill-drip' },
                    { id: 'mix-red-blue', type: 'motion', text: 'Mix Red & Blue', icon: 'fill-drip' },
                    { id: 'mix-blue-yellow', type: 'motion', text: 'Mix Blue & Yellow', icon: 'fill-drip' }
                ],
                solution: ['if-need-orange', 'mix-red-yellow', 'if-need-purple', 'mix-red-blue', 'if-need-green', 'mix-blue-yellow'],
                isNested: true
            },
            // Level 12 - Math Quiz (Advanced condition)
            12: {
                title: "Math Quiz",
                description: "Create a math quiz that checks answers to different types of problems.",
                goal: "Provide the correct response based on the type of math question.",
                image: "./images/math-quiz.svg",
                blocks: [
                    { id: 'if-addition', type: 'conditions', text: 'If Addition Question', icon: 'plus' },
                    { id: 'if-subtraction', type: 'conditions', text: 'If Subtraction Question', icon: 'minus' },
                    { id: 'if-multiplication', type: 'conditions', text: 'If Multiplication Question', icon: 'times' },
                    { id: 'use-counting', type: 'motion', text: 'Use Counting', icon: 'sort-numeric-up' },
                    { id: 'use-number-line', type: 'motion', text: 'Use Number Line', icon: 'ruler-horizontal' },
                    { id: 'use-grouping', type: 'motion', text: 'Use Grouping', icon: 'th' }
                ],
                solution: ['if-addition', 'use-counting', 'if-subtraction', 'use-number-line', 'if-multiplication', 'use-grouping'],
                isNested: true
            },
            // Level 13 - Plant Care (Advanced condition)
            13: {
                title: "Plant Care",
                description: "Take care of different plants based on their specific needs.",
                goal: "Give each plant the proper care it needs to grow healthy.",
                image: "./images/plant-care.svg",
                blocks: [
                    { id: 'if-cactus', type: 'conditions', text: 'If Cactus', icon: 'seedling' },
                    { id: 'if-flower', type: 'conditions', text: 'If Flower', icon: 'spa' },
                    { id: 'if-fern', type: 'conditions', text: 'If Fern', icon: 'leaf' },
                    { id: 'little-water', type: 'motion', text: 'Give Little Water', icon: 'tint' },
                    { id: 'plenty-water', type: 'motion', text: 'Give Plenty Water', icon: 'tint-slash' },
                    { id: 'medium-water', type: 'motion', text: 'Give Medium Water', icon: 'fill' }
                ],
                solution: ['if-cactus', 'little-water', 'if-flower', 'plenty-water', 'if-fern', 'medium-water'],
                isNested: true
            },
            // Level 14 - Weather Station (Advanced condition)
            14: {
                title: "Weather Station",
                description: "Build a weather station that responds to different weather conditions.",
                goal: "Collect appropriate data based on the current weather conditions.",
                image: "./images/weather-station.svg",
                blocks: [
                    { id: 'if-temperature-drops', type: 'conditions', text: 'If Temperature Drops', icon: 'temperature-low' },
                    { id: 'if-wind-increases', type: 'conditions', text: 'If Wind Increases', icon: 'wind' },
                    { id: 'if-humidity-rises', type: 'conditions', text: 'If Humidity Rises', icon: 'cloud-rain' },
                    { id: 'record-frost-warning', type: 'motion', text: 'Record Frost Warning', icon: 'snowflake' },
                    { id: 'record-wind-advisory', type: 'motion', text: 'Record Wind Advisory', icon: 'flag' },
                    { id: 'record-rain-forecast', type: 'motion', text: 'Record Rain Forecast', icon: 'cloud-showers-heavy' }
                ],
                solution: ['if-temperature-drops', 'record-frost-warning', 'if-wind-increases', 'record-wind-advisory', 'if-humidity-rises', 'record-rain-forecast'],
                isNested: true
            },
            // Level 15 - Recycling Sorter (Advanced condition)
            15: {
                title: "Recycling Sorter",
                description: "Sort different materials into the correct recycling bins.",
                goal: "Ensure each item goes into its proper recycling category.",
                image: "./images/recycling-sorter.svg",
                blocks: [
                    { id: 'if-paper', type: 'conditions', text: 'If Paper', icon: 'newspaper' },
                    { id: 'if-plastic', type: 'conditions', text: 'If Plastic', icon: 'bottle-water' },
                    { id: 'if-glass', type: 'conditions', text: 'If Glass', icon: 'glass-martini' },
                    { id: 'put-in-blue-bin', type: 'motion', text: 'Put in Blue Bin', icon: 'trash-alt' },
                    { id: 'put-in-green-bin', type: 'motion', text: 'Put in Green Bin', icon: 'trash-alt' },
                    { id: 'put-in-clear-bin', type: 'motion', text: 'Put in Clear Bin', icon: 'trash-alt' }
                ],
                solution: ['if-paper', 'put-in-blue-bin', 'if-plastic', 'put-in-green-bin', 'if-glass', 'put-in-clear-bin'],
                isNested: true
            },
            // Level 16 - Robot Sensing System (Complex condition)
            16: {
                title: "Robot Sensing System",
                description: "Program a robot's sensors to detect different environmental conditions.",
                goal: "Make the robot respond appropriately to its sensor readings.",
                image: "./images/robot-sensor.svg",
                blocks: [
                    { id: 'if-light-detected', type: 'conditions', text: 'If Light Detected', icon: 'lightbulb' },
                    { id: 'if-sound-detected', type: 'conditions', text: 'If Sound Detected', icon: 'volume-up' },
                    { id: 'if-motion-detected', type: 'conditions', text: 'If Motion Detected', icon: 'running' },
                    { id: 'activate-camera', type: 'motion', text: 'Activate Camera', icon: 'camera' },
                    { id: 'record-audio', type: 'motion', text: 'Record Audio', icon: 'microphone' },
                    { id: 'track-movement', type: 'motion', text: 'Track Movement', icon: 'location-arrow' }
                ],
                solution: ['if-light-detected', 'activate-camera', 'if-sound-detected', 'record-audio', 'if-motion-detected', 'track-movement'],
                isNested: true
            },
            // Level 17 - Space Mission (Complex condition)
            17: {
                title: "Space Mission",
                description: "Control a space probe to respond to different planetary conditions.",
                goal: "Program the probe to collect the right data based on its environment.",
                image: "./images/space-mission.svg", // Fixed SVG path
                blocks: [
                    { id: 'if-rocky-surface', type: 'conditions', text: 'If Rocky Surface', icon: 'mountain' },
                    { id: 'if-liquid-water', type: 'conditions', text: 'If Liquid Water', icon: 'water' },
                    { id: 'if-methane-gas', type: 'conditions', text: 'If Methane Gas', icon: 'smog' },
                    { id: 'collect-rock-sample', type: 'motion', text: 'Collect Rock Sample', icon: 'hammer' },
                    { id: 'analyze-water', type: 'motion', text: 'Analyze Water', icon: 'microscope' },
                    { id: 'measure-atmosphere', type: 'motion', text: 'Measure Atmosphere', icon: 'flask' }
                ],
                solution: ['if-rocky-surface', 'collect-rock-sample', 'if-liquid-water', 'analyze-water', 'if-methane-gas', 'measure-atmosphere'],
                isNested: true
            },
            // Level 18 - Smart Home (Complex condition)
            18: {
                title: "Smart Home",
                description: "Program a smart home system to respond to different conditions.",
                goal: "Automate the home to respond to environmental changes and time of day.",
                image: "./images/smart-home.svg",
                blocks: [
                    { id: 'if-nighttime', type: 'conditions', text: 'If Nighttime', icon: 'moon' },
                    { id: 'if-temperature-above-25', type: 'conditions', text: 'If Temp > 25°C', icon: 'temperature-high' },
                    { id: 'if-raining', type: 'conditions', text: 'If Raining', icon: 'cloud-showers-heavy' },
                    { id: 'turn-on-lights', type: 'motion', text: 'Turn On Lights', icon: 'lightbulb' },
                    { id: 'activate-ac', type: 'motion', text: 'Activate A/C', icon: 'snowflake' },
                    { id: 'close-windows', type: 'motion', text: 'Close Windows', icon: 'window-close' }
                ],
                solution: ['if-nighttime', 'turn-on-lights', 'if-temperature-above-25', 'activate-ac', 'if-raining', 'close-windows'],
                isNested: true
            },
            // Level 19 - Gardening Robot (Complex condition)
            19: {
                title: "Gardening Robot",
                description: "Program a robot to take care of different plants in a garden.",
                goal: "Make the robot perform the right gardening tasks based on conditions.",
                image: "./images/gardening-robot.svg",
                blocks: [
                    { id: 'if-soil-dry', type: 'conditions', text: 'If Soil Dry', icon: 'vial' },
                    { id: 'if-weeds-present', type: 'conditions', text: 'If Weeds Present', icon: 'seedling' },
                    { id: 'if-fruits-ripe', type: 'conditions', text: 'If Fruits Ripe', icon: 'apple-alt' },
                    { id: 'water-plants', type: 'motion', text: 'Water Plants', icon: 'shower' },
                    { id: 'remove-weeds', type: 'motion', text: 'Remove Weeds', icon: 'cut' },
                    { id: 'harvest-fruits', type: 'motion', text: 'Harvest Fruits', icon: 'shopping-basket' }
                ],
                solution: ['if-soil-dry', 'water-plants', 'if-weeds-present', 'remove-weeds', 'if-fruits-ripe', 'harvest-fruits'],
                isNested: true
            },
            // Level 20 - Autonomous Vehicle (Complex condition)
            20: {
                title: "Autonomous Vehicle",
                description: "Program a self-driving car to respond to different road conditions and signs.",
                goal: "Ensure the car follows traffic rules and drives safely.",
                image: "./images/autonomous-car.svg",
                blocks: [
                    { id: 'if-red-light', type: 'conditions', text: 'If Red Light', icon: 'traffic-light' },
                    { id: 'if-green-light', type: 'conditions', text: 'If Green Light', icon: 'traffic-light' },
                    { id: 'if-pedestrian', type: 'conditions', text: 'If Pedestrian', icon: 'walking' },
                    { id: 'if-car-ahead', type: 'conditions', text: 'If Car Ahead', icon: 'car' },
                    { id: 'if-lane-ending', type: 'conditions', text: 'If Lane Ending', icon: 'road' },
                    { id: 'if-emergency-vehicle', type: 'conditions', text: 'If Emergency Vehicle', icon: 'ambulance' },
                    { id: 'stop-car', type: 'motion', text: 'Stop Car', icon: 'hand-paper' },
                    { id: 'yield-to-pedestrian', type: 'motion', text: 'Yield to Pedestrian', icon: 'user-check' },
                    { id: 'slow-down', type: 'motion', text: 'Slow Down', icon: 'tachometer-alt' },
                    { id: 'proceed-forward', type: 'motion', text: 'Proceed Forward', icon: 'arrow-circle-right' },
                    { id: 'change-lanes', type: 'motion', text: 'Change Lanes', icon: 'exchange-alt' },
                    { id: 'pull-over', type: 'motion', text: 'Pull Over', icon: 'parking' }
                ],
                solution: ['if-red-light', 'stop-car', 'if-green-light', 'proceed-forward', 'if-pedestrian', 'yield-to-pedestrian', 'if-car-ahead', 'slow-down', 'if-lane-ending', 'change-lanes', 'if-emergency-vehicle', 'pull-over'],
                isNested: true
            },
        },
        procedures: {
            // Level 1 - Simple Dance Procedure (Very basic for ages 5-6)
            1: {
                title: "Dancing Robot",
                description: "Create a simple dance procedure using basic steps!",
                goal: "Make a robot dance by creating and using a dance procedure.",
                image: "./images/robot-dance.svg",
                hint: "First, place the 'Define: Dance Move' block in your workspace. Then add steps like 'Step Right', 'Step Left', etc. inside it. Finally, add the 'Run: Dance Move' block to use your procedure.",
                blocks: [
                    { id: 'define-dance', type: 'define', text: 'Define: Dance Move', icon: 'cube' },
                    { id: 'step-right', type: 'action', text: 'Step Right', icon: 'arrow-right' },
                    { id: 'step-left', type: 'action', text: 'Step Left', icon: 'arrow-left' },
                    { id: 'spin', type: 'action', text: 'Spin', icon: 'sync' },
                    { id: 'jump', type: 'action', text: 'Jump', icon: 'angle-double-up' },
                    { id: 'call-dance', type: 'call', text: 'Run: Dance Move', icon: 'play' }
                ],
                solution: ['define-dance', 'step-right', 'step-left', 'spin', 'jump', 'call-dance'],
                isNested: true
            },
            
            // Level 2 - Drawing Square (Basic geometric procedure)
            2: {
                title: "Draw a Square",
                description: "Create a procedure to draw a perfect square!",
                goal: "Make a procedure that draws a square with 4 equal sides.",
                image: "./images/square.svg",
                hint: "A square has 4 equal sides. First add the 'Define: Draw Square' block, then put 4 sets of 'Move Forward' followed by 'Turn Right' blocks inside to create a square.",
                blocks: [
                    { id: 'define-square', type: 'define', text: 'Define: Draw Square', icon: 'cube' },
                    { id: 'move-forward', type: 'action', text: 'Move Forward', icon: 'arrow-up' },
                    { id: 'turn-right', type: 'action', text: 'Turn Right', icon: 'redo' },
                    { id: 'call-square', type: 'call', text: 'Run: Draw Square', icon: 'play' }
                ],
                solution: ['define-square', 'move-forward', 'turn-right', 'move-forward', 'turn-right', 'move-forward', 'turn-right', 'move-forward', 'turn-right', 'call-square'],
                isNested: true
            },
            
            // Level 3 - Morning Routine (Daily routine procedure)
            3: {
                title: "Morning Routine",
                description: "Create a morning routine procedure for getting ready!",
                goal: "Make a procedure for a proper morning routine.",
                image: "./images/morning-routine.svg",
                hint: "First add the 'Define: Morning Routine' block, then add all the steps you do in the morning like brushing teeth and getting dressed. Finally, add the 'Run: Morning Routine' block.",
                blocks: [
                    { id: 'define-morning', type: 'define', text: 'Define: Morning Routine', icon: 'cube' },
                    { id: 'wake-up', type: 'action', text: 'Wake Up', icon: 'bell' },
                    { id: 'brush-teeth', type: 'action', text: 'Brush Teeth', icon: 'tooth' },
                    { id: 'get-dressed', type: 'action', text: 'Get Dressed', icon: 'tshirt' },
                    { id: 'eat-breakfast', type: 'action', text: 'Eat Breakfast', icon: 'utensils' },
                    { id: 'call-morning', type: 'call', text: 'Run: Morning Routine', icon: 'play' }
                ],
                solution: ['define-morning', 'wake-up', 'brush-teeth', 'get-dressed', 'eat-breakfast', 'call-morning'],
                isNested: true
            },
            
            // Level 4 - Making a Sandwich (Food procedure)
            4: {
                title: "Make a Sandwich",
                description: "Create a procedure for making a delicious sandwich!",
                goal: "Make a procedure with all steps needed to create a sandwich.",
                image: "./images/sandwich.svg",
                hint: "Start with 'Define: Make Sandwich' block. Then add all ingredients in order - bread first, then fillings, and finally top bread. Don't forget to add 'Run: Make Sandwich' at the end!",
                blocks: [
                    { id: 'define-sandwich', type: 'define', text: 'Define: Make Sandwich', icon: 'cube' },
                    { id: 'get-bread', type: 'action', text: 'Get Bread Slice', icon: 'bread-slice' },
                    { id: 'add-cheese', type: 'action', text: 'Add Cheese', icon: 'cheese' },
                    { id: 'add-lettuce', type: 'action', text: 'Add Lettuce', icon: 'leaf' },
                    { id: 'top-bread', type: 'action', text: 'Add Top Bread', icon: 'bread-slice' },
                    { id: 'call-sandwich', type: 'call', text: 'Run: Make Sandwich', icon: 'play' }
                ],
                solution: ['define-sandwich', 'get-bread', 'add-cheese', 'add-lettuce', 'top-bread', 'call-sandwich'],
                isNested: true
            },
            
            // Level 5 - Robot Path (Movement procedure)
            5: {
                title: "Robot Path",
                description: "Guide the robot through a simple path!",
                goal: "Create a movement procedure to guide the robot to its destination.",
                image: "./images/robot-path.svg",
                hint: "Create a 'Define: Navigate Path' procedure with the correct sequence of movements. Make sure to include forward, right turn, and left turn commands in the right order.",
                blocks: [
                    { id: 'define-path', type: 'define', text: 'Define: Navigate Path', icon: 'cube' },
                    { id: 'move-forward', type: 'action', text: 'Move Forward', icon: 'arrow-up' },
                    { id: 'turn-right', type: 'action', text: 'Turn Right', icon: 'redo' },
                    { id: 'turn-left', type: 'action', text: 'Turn Left', icon: 'undo' },
                    { id: 'call-path', type: 'call', text: 'Run: Navigate Path', icon: 'play' }
                ],
                solution: ['define-path', 'move-forward', 'turn-right', 'move-forward', 'turn-left', 'move-forward', 'call-path'],
                isNested: true
            },
            
            // Level 6 - Plant Care (Nature procedure)
            6: {
                title: "Plant Care",
                description: "Create a procedure for taking care of plants!",
                goal: "Make a procedure with all steps needed for plant care.",
                image: "./images/plant-care.svg",
                hint: "First add 'Define: Plant Care' block, then include all the steps to care for a plant like checking soil, watering, and placing in sunlight. End with 'Run: Plant Care'.",
                blocks: [
                    { id: 'define-plant', type: 'define', text: 'Define: Plant Care', icon: 'cube' },
                    { id: 'check-soil', type: 'sensor', text: 'Check Soil', icon: 'search' },
                    { id: 'add-water', type: 'action', text: 'Add Water', icon: 'tint' },
                    { id: 'place-sunlight', type: 'action', text: 'Place in Sunlight', icon: 'sun' },
                    { id: 'remove-leaves', type: 'action', text: 'Remove Dead Leaves', icon: 'cut' },
                    { id: 'call-plant', type: 'call', text: 'Run: Plant Care', icon: 'play' }
                ],
                solution: ['define-plant', 'check-soil', 'add-water', 'place-sunlight', 'remove-leaves', 'call-plant'],
                isNested: true
            },
            
            // Level 7 - Weather Report (Science procedure)
            7: {
                title: "Weather Report",
                description: "Create a procedure for reporting the weather!",
                goal: "Make a weather reporting procedure with all necessary steps.",
                image: "./images/weather-report.svg",
                hint: "Create a 'Define: Weather Report' procedure that includes checking temperature, looking outside, and reporting the forecast. Make sure to follow all steps a meteorologist would take!",
                blocks: [
                    { id: 'define-weather', type: 'define', text: 'Define: Weather Report', icon: 'cube' },
                    { id: 'check-temp', type: 'sensor', text: 'Check Temperature', icon: 'thermometer-half' },
                    { id: 'look-outside', type: 'sensor', text: 'Look Outside', icon: 'eye' },
                    { id: 'check-clouds', type: 'sensor', text: 'Check for Clouds', icon: 'cloud' },
                    { id: 'announce-forecast', type: 'action', text: 'Announce Forecast', icon: 'microphone' },
                    { id: 'call-weather', type: 'call', text: 'Run: Weather Report', icon: 'play' }
                ],
                solution: ['define-weather', 'check-temp', 'look-outside', 'check-clouds', 'announce-forecast', 'call-weather'],
                isNested: true
            },
            
            // Level 8 - Car Wash (Vehicle maintenance procedure)
            8: {
                title: "Car Wash",
                description: "Create a procedure for washing a car properly!",
                goal: "Make a detailed car washing procedure with all steps.",
                image: "./images/car-wash.svg",
                hint: "Your 'Define: Car Wash' procedure should include all steps from rinsing to drying. Make sure you get the car really clean by following all steps in the right order!",
                blocks: [
                    { id: 'define-carwash', type: 'define', text: 'Define: Car Wash', icon: 'cube' },
                    { id: 'rinse-car', type: 'action', text: 'Rinse Car', icon: 'shower' },
                    { id: 'apply-soap', type: 'action', text: 'Apply Soap', icon: 'soap' },
                    { id: 'scrub-car', type: 'action', text: 'Scrub Car', icon: 'brush' },
                    { id: 'rinse-again', type: 'action', text: 'Rinse Again', icon: 'tint' },
                    { id: 'dry-car', type: 'action', text: 'Dry Car', icon: 'wind' },
                    { id: 'call-carwash', type: 'call', text: 'Run: Car Wash', icon: 'play' }
                ],
                solution: ['define-carwash', 'rinse-car', 'apply-soap', 'scrub-car', 'rinse-again', 'dry-car', 'call-carwash'],
                isNested: true
            },
            
            // Level 9 - Drawing a Star (More advanced geometric procedure)
            9: {
                title: "Draw a Star",
                description: "Create a procedure to draw a beautiful star!",
                goal: "Make a procedure that draws a perfect five-pointed star.",
                image: "./images/star-pattern.svg",
                hint: "A star has 5 points. Create a 'Define: Draw Star' procedure with the right pattern of moves and turns. You'll need to move forward and turn at just the right angles.",
                blocks: [
                    { id: 'define-star', type: 'define', text: 'Define: Draw Star', icon: 'cube' },
                    { id: 'move-forward', type: 'action', text: 'Move Forward', icon: 'arrow-up' },
                    { id: 'turn-right', type: 'action', text: 'Turn Right', icon: 'redo' },
                    { id: 'turn-left', type: 'action', text: 'Turn Left', icon: 'undo' },
                    { id: 'call-star', type: 'call', text: 'Run: Draw Star', icon: 'play' }
                ],
                solution: ['define-star', 'move-forward', 'turn-right', 'move-forward', 'turn-right', 'move-forward', 'turn-left', 'move-forward', 'turn-left', 'move-forward', 'turn-right', 'move-forward', 'turn-right', 'move-forward', 'turn-left', 'move-forward', 'call-star'],
                isNested: true
            },
            
            // Level 10 - Science Experiment (Educational procedure)
            10: {
                title: "Science Experiment",
                description: "Create a procedure for conducting a science experiment!",
                goal: "Make a procedure with all steps for a successful experiment.",
                image: "./images/science-experiment.svg",
                hint: "Scientists follow careful procedures! Create a 'Define: Science Experiment' procedure with all the steps from hypothesis to conclusion. Make sure you follow the scientific method.",
                blocks: [
                    { id: 'define-science', type: 'define', text: 'Define: Science Experiment', icon: 'cube' },
                    { id: 'question', type: 'sensor', text: 'Ask Question', icon: 'question' },
                    { id: 'hypothesis', type: 'control', text: 'Form Hypothesis', icon: 'lightbulb' },
                    { id: 'gather-materials', type: 'action', text: 'Gather Materials', icon: 'toolbox' },
                    { id: 'test', type: 'action', text: 'Test Hypothesis', icon: 'vial' },
                    { id: 'analyze', type: 'control', text: 'Analyze Results', icon: 'chart-bar' },
                    { id: 'conclude', type: 'control', text: 'Make Conclusion', icon: 'check-circle' },
                    { id: 'call-science', type: 'call', text: 'Run: Science Experiment', icon: 'play' }
                ],
                solution: ['define-science', 'question', 'hypothesis', 'gather-materials', 'test', 'analyze', 'conclude', 'call-science'],
                isNested: true
            },
            
            // Level 11 - Music Composition (Creative procedure)
            11: {
                title: "Music Composition",
                description: "Create a procedure for composing a musical piece!",
                goal: "Make a procedure for creating and playing a melody.",
                image: "./images/music-composition.svg",
                hint: "Musicians follow procedures too! Create a 'Define: Compose Music' procedure with steps like choosing instruments, setting tempo, and writing notes. Then add the 'Run: Compose Music' block to hear your creation!",
                blocks: [
                    { id: 'define-music', type: 'define', text: 'Define: Compose Music', icon: 'cube' },
                    { id: 'choose-instrument', type: 'control', text: 'Choose Instrument', icon: 'guitar' },
                    { id: 'set-tempo', type: 'control', text: 'Set Tempo', icon: 'clock' },
                    { id: 'write-notes', type: 'action', text: 'Write Notes', icon: 'music' },
                    { id: 'add-rhythm', type: 'action', text: 'Add Rhythm', icon: 'drum' },
                    { id: 'practice', type: 'action', text: 'Practice Playing', icon: 'play' },
                    { id: 'perform', type: 'action', text: 'Perform Song', icon: 'microphone' },
                    { id: 'call-music', type: 'call', text: 'Run: Compose Music', icon: 'play' }
                ],
                solution: ['define-music', 'choose-instrument', 'set-tempo', 'write-notes', 'add-rhythm', 'practice', 'perform', 'call-music'],
                isNested: true
            },
            
            // Level 12 - Robot Treasure Hunt (Advanced logic procedure)
            12: {
                title: "Robot Treasure Hunt",
                description: "Create procedures for a robot to find treasure!",
                goal: "Make a main procedure and helper procedures for the hunt.",
                image: "./images/robot-treasure-hunt.svg",
                hint: "This is tricky! You need to create THREE procedures: 'Define: Search Area' for looking around, 'Define: Dig For Treasure' for digging, and 'Define: Treasure Hunt' that uses both of the other procedures.",
                blocks: [
                    { id: 'define-search', type: 'define', text: 'Define: Search Area', icon: 'cube' },
                    { id: 'scan-ground', type: 'sensor', text: 'Scan Ground', icon: 'search' },
                    { id: 'mark-spot', type: 'action', text: 'Mark Spot', icon: 'map-marker' },
                    { id: 'define-dig', type: 'define', text: 'Define: Dig For Treasure', icon: 'cube' },
                    { id: 'get-shovel', type: 'action', text: 'Get Shovel', icon: 'toolbox' },
                    { id: 'dig-hole', type: 'action', text: 'Dig Hole', icon: 'hands' },
                    { id: 'find-chest', type: 'action', text: 'Find Chest', icon: 'box' },
                    { id: 'define-hunt', type: 'define', text: 'Define: Treasure Hunt', icon: 'cube' },
                    { id: 'call-search', type: 'call', text: 'Run: Search Area', icon: 'play' },
                    { id: 'call-dig', type: 'call', text: 'Run: Dig For Treasure', icon: 'play' },
                    { id: 'celebrate', type: 'action', text: 'Celebrate', icon: 'trophy' },
                    { id: 'call-hunt', type: 'call', text: 'Run: Treasure Hunt', icon: 'play' }
                ],
                solution: ['define-search', 'scan-ground', 'mark-spot', 'define-dig', 'get-shovel', 'dig-hole', 'find-chest', 'define-hunt', 'call-search', 'call-dig', 'celebrate', 'call-hunt'],
                isNested: true
            },
            
            // Level 13 - Space Mission (Advanced science procedure)
            13: {
                title: "Space Mission",
                description: "Create procedures for a complete space mission!",
                goal: "Make procedures for launch, orbit, and landing a spacecraft.",
                image: "./images/space-mission.svg",
                hint: "Space missions need careful procedures! Create procedures for 'Define: Launch Rocket', 'Define: Orbit Earth', and 'Define: Land Safely'. Then make a 'Define: Mission Control' procedure that uses all three in order.",
                blocks: [
                    { id: 'define-launch', type: 'define', text: 'Define: Launch Rocket', icon: 'cube' },
                    { id: 'fuel-rocket', type: 'action', text: 'Fuel Rocket', icon: 'gas-pump' },
                    { id: 'countdown', type: 'control', text: 'Countdown', icon: 'stopwatch' },
                    { id: 'ignite', type: 'action', text: 'Ignite Engines', icon: 'fire' },
                    
                    { id: 'define-orbit', type: 'define', text: 'Define: Orbit Earth', icon: 'cube' },
                    { id: 'reach-space', type: 'action', text: 'Reach Space', icon: 'rocket' },
                    { id: 'deploy-panels', type: 'action', text: 'Deploy Solar Panels', icon: 'solar-panel' },
                    { id: 'take-photos', type: 'action', text: 'Take Photos', icon: 'camera' },
                    
                    { id: 'define-land', type: 'define', text: 'Define: Land Safely', icon: 'cube' },
                    { id: 'reentry', type: 'action', text: 'Reentry Sequence', icon: 'arrow-down' },
                    { id: 'deploy-chutes', type: 'action', text: 'Deploy Parachutes', icon: 'parachute-box' },
                    { id: 'touchdown', type: 'action', text: 'Touchdown', icon: 'check' },
                    
                    { id: 'define-mission', type: 'define', text: 'Define: Mission Control', icon: 'cube' },
                    { id: 'call-launch', type: 'call', text: 'Run: Launch Rocket', icon: 'play' },
                    { id: 'call-orbit', type: 'call', text: 'Run: Orbit Earth', icon: 'play' },
                    { id: 'call-land', type: 'call', text: 'Run: Land Safely', icon: 'play' },
                    { id: 'call-mission', type: 'call', text: 'Run: Mission Control', icon: 'play' }
                ],
                solution: ['define-launch', 'fuel-rocket', 'countdown', 'ignite', 'define-orbit', 'reach-space', 'deploy-panels', 'take-photos', 'define-land', 'reentry', 'deploy-chutes', 'touchdown', 'define-mission', 'call-launch', 'call-orbit', 'call-land', 'call-mission'],
                isNested: true
            },
            
            // Level 14 - Smart Home (Technology procedure)
            14: {
                title: "Smart Home Setup",
                description: "Create procedures to program a smart home!",
                goal: "Make procedures for morning, day, and night smart home modes.",
                image: "./images/smart-home.svg",
                hint: "Smart homes need procedures for different times of day. Create 'Define: Morning Mode', 'Define: Day Mode', and 'Define: Night Mode' procedures. Then create a 'Define: Smart Home' procedure that can call any of them.",
                blocks: [
                    { id: 'define-morning', type: 'define', text: 'Define: Morning Mode', icon: 'cube' },
                    { id: 'lights-on', type: 'action', text: 'Turn On Lights', icon: 'lightbulb' },
                    { id: 'heat-on', type: 'action', text: 'Turn On Heat', icon: 'temperature-high' },
                    { id: 'play-news', type: 'action', text: 'Play News', icon: 'newspaper' },
                    
                    { id: 'define-day', type: 'define', text: 'Define: Day Mode', icon: 'cube' },
                    { id: 'lights-off', type: 'action', text: 'Turn Off Lights', icon: 'power-off' },
                    { id: 'temp-medium', type: 'control', text: 'Set Medium Temperature', icon: 'thermometer-half' },
                    { id: 'security-on', type: 'action', text: 'Turn On Security', icon: 'shield-alt' },
                    
                    { id: 'define-night', type: 'define', text: 'Define: Night Mode', icon: 'cube' },
                    { id: 'dim-lights', type: 'action', text: 'Dim Lights', icon: 'adjust' },
                    { id: 'lock-doors', type: 'action', text: 'Lock All Doors', icon: 'lock' },
                    { id: 'night-temp', type: 'control', text: 'Set Night Temperature', icon: 'moon' },
                    
                    { id: 'define-home', type: 'define', text: 'Define: Smart Home', icon: 'cube' },
                    { id: 'call-morning', type: 'call', text: 'Run: Morning Mode', icon: 'play' },
                    { id: 'call-day', type: 'call', text: 'Run: Day Mode', icon: 'play' },
                    { id: 'call-night', type: 'call', text: 'Run: Night Mode', icon: 'play' },
                    { id: 'call-home', type: 'call', text: 'Run: Smart Home', icon: 'play' }
                ],
                solution: ['define-morning', 'lights-on', 'heat-on', 'play-news', 'define-day', 'lights-off', 'temp-medium', 'security-on', 'define-night', 'dim-lights', 'lock-doors', 'night-temp', 'define-home', 'call-morning', 'call-day', 'call-night', 'call-home'],
                isNested: true
            },
            
            // Level 15 - Game Design (Most advanced creative procedure)
            15: {
                title: "Video Game Design",
                description: "Create procedures for designing your own video game!",
                goal: "Make a complete game development process with multiple procedures.",
                image: "./images/pixel-art.svg",
                hint: "Game designers use many procedures! Create procedures for 'Define: Character Design', 'Define: Level Building', 'Define: Game Testing', and finally 'Define: Game Development' that uses all the other procedures in order.",
                blocks: [
                    { id: 'define-character', type: 'define', text: 'Define: Character Design', icon: 'cube' },
                    { id: 'sketch-hero', type: 'action', text: 'Sketch Hero', icon: 'user-astronaut' },
                    { id: 'design-abilities', type: 'control', text: 'Design Abilities', icon: 'bolt' },
                    { id: 'create-animation', type: 'action', text: 'Create Animation', icon: 'running' },
                    
                    { id: 'define-level', type: 'define', text: 'Define: Level Building', icon: 'cube' },
                    { id: 'design-map', type: 'action', text: 'Design Map', icon: 'map' },
                    { id: 'add-obstacles', type: 'action', text: 'Add Obstacles', icon: 'mountains' },
                    { id: 'place-treasure', type: 'action', text: 'Place Treasure', icon: 'gem' },
                    { id: 'add-enemies', type: 'action', text: 'Add Enemies', icon: 'ghost' },
                    
                    { id: 'define-testing', type: 'define', text: 'Define: Game Testing', icon: 'cube' },
                    { id: 'test-controls', type: 'sensor', text: 'Test Controls', icon: 'gamepad' },
                    { id: 'find-bugs', type: 'sensor', text: 'Find Bugs', icon: 'bug' },
                    { id: 'fix-issues', type: 'action', text: 'Fix Issues', icon: 'wrench' },
                    { id: 'play-game', type: 'action', text: 'Play Full Game', icon: 'play-circle' },
                    
                    { id: 'define-development', type: 'define', text: 'Define: Game Development', icon: 'cube' },
                    { id: 'call-character', type: 'call', text: 'Run: Character Design', icon: 'play' },
                    { id: 'call-level', type: 'call', text: 'Run: Level Building', icon: 'play' },
                    { id: 'call-testing', type: 'call', text: 'Run: Game Testing', icon: 'play' },
                    { id: 'release-game', type: 'action', text: 'Release Game', icon: 'rocket' },
                    { id: 'call-development', type: 'call', text: 'Run: Game Development', icon: 'play' }
                ],
                solution: ['define-character', 'sketch-hero', 'design-abilities', 'create-animation', 'define-level', 'design-map', 'add-obstacles', 'place-treasure', 'add-enemies', 'define-testing', 'test-controls', 'find-bugs', 'fix-issues', 'play-game', 'define-development', 'call-character', 'call-level', 'call-testing', 'release-game', 'call-development'],
                isNested: true
            }
        }
    };
    
    // Log challenges data to verify it's loaded
    console.log('Procedures challenges count:', Object.keys(challenges.procedures).length);
    console.log('First procedure challenge:', challenges.procedures[1]);
    
    // --- STATE VARIABLES ---
    let currentCategory = 'sequencing';
    let currentLevel = 1;
    let userBlocks = [];
    let completedChallenges = {
        sequencing: [],
        loops: [],
        conditions: [],
        procedures: []
    };
    const MAX_HINTS_PER_LEVEL = 3;
    const MAX_TRIES_PER_LEVEL = 3;
    const missionState = {
        stars: 0,
        streak: 0,
        hintsLeft: MAX_HINTS_PER_LEVEL,
        triesLeft: MAX_TRIES_PER_LEVEL
    };

    // --- DOM REFERENCES ---
    const blockPalette = document.getElementById('block-palette');
    const blocksContainer = document.getElementById('blocks-container');
    const challengeTitle = document.getElementById('challenge-title');
    const taskTitle = document.getElementById('task-title');
    const taskDescription = document.getElementById('task-description');
    const taskGoal = document.getElementById('task-goal');
    const challengeImage = document.getElementById('challenge-image');
    // currentLevelDisplay removed as it's no longer in the header
    const animationArea = document.getElementById('animation-area');
    const feedbackArea = document.getElementById('feedback');
    const progressBar = document.getElementById('challenge-progress');
    const progressText = document.getElementById('progress-text');
    const workspace = document.getElementById('workspace');
    const quickHintBtn = document.getElementById('quick-hint-btn');
    const missionCategoryEl = document.getElementById('mission-category');
    const missionLevelEl = document.getElementById('mission-level');
    const missionStarsEl = document.getElementById('mission-stars');
    const missionStreakEl = document.getElementById('mission-streak');
    const missionHintsEl = document.getElementById('mission-hints');
    const missionTriesEl = document.getElementById('mission-tries');
    const categorySelect = document.getElementById('challenge-category-select');
    const blocksToggleBtn = document.getElementById('blocks-toggle-btn');
    const trackPicker = document.getElementById('track-picker');
    const trackPickerBtn = document.getElementById('track-picker-btn');
    const trackPickerLabel = document.getElementById('track-picker-label');
    const trackOptions = Array.from(document.querySelectorAll('.track-option'));
    const levelsPanel = document.getElementById('levels-panel');
    const levelsColumnEl = document.querySelector('.levels-column');
    const levelsToggleBtn = document.getElementById('levels-toggle-btn');
    const deleteBin = document.getElementById('delete-bin');
    const codingStageEl = document.querySelector('.coding-stage');
    const imageHintStrip = document.getElementById('image-hint-strip');
    const visualOverlay = document.getElementById('visual-overlay');
    const missionStoryLayer = document.getElementById('mission-story-layer');
    const missionStoryStatus = document.getElementById('mission-story-status');
    const missionPlayfield = document.getElementById('mission-playfield');
    const missionGrid = document.getElementById('mission-grid');
    const missionStepTrack = document.getElementById('mission-step-track');
    const missionMascot = document.getElementById('mission-mascot');
    const missionTarget = document.getElementById('mission-target');
    let missionObjectivesLayer = null;
    if (missionPlayfield) {
        missionObjectivesLayer = document.createElement('div');
        missionObjectivesLayer.id = 'mission-objectives-layer';
        missionObjectivesLayer.className = 'mission-objectives-layer';
        missionPlayfield.insertBefore(missionObjectivesLayer, missionTarget || null);
    }
    const outputModalEl = document.getElementById('outputModal');
    const workspaceDropPlaceholder = document.getElementById('workspace-drop-placeholder');
    const runModalCheckBtn = document.getElementById('run-modal-check-btn');
    const runModalStatusEl = document.getElementById('run-modal-status');
    const resultModalEl = document.getElementById('resultModal');
    const resultModalLabelEl = document.getElementById('resultModalLabel');
    const resultModalMessageEl = document.getElementById('result-modal-message');
    const resultModalActionsEl = document.getElementById('result-modal-actions');
    const resultModalCelebrationEl = document.getElementById('result-modal-celebration');
    let outputModalInstance = null;
    let resultModalInstance = null;
    let runReadyForCheck = false;
    let blocksCollapsed = true;
    const MISSION_STORY_PILOT = {
        sequencing: new Set([6, 7, 8, 9, 10, 11]),
        loops: new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])
    };
    const SEQUENCING_GEM_PICKUP_LEVELS = new Set([6, 7, 8, 9]);
    const missionStoryState = {
        enabled: false,
        board: { cols: 8, rows: 7 },
        blockedSet: new Set(),
        startCell: { col: 3, row: 5 },
        start: { x: 14, y: 74 },
        startDirection: 'right',
        path: [],
        target: { x: 82, y: 23 },
        targetCell: { col: 3, row: 3 },
        objectives: [],
        objectiveMarkers: [],
        runtime: null,
        stepById: new Map(),
        stepOrder: [],
        currentIndex: -1
    };
    
    // --- INITIALIZATION ---
    function init() {
        console.log('Initializing Code Blocks Adventure...');
        
        try {
            // Generate level buttons for procedures
            generateProcedureLevels();
            
            // Set up challenge selection listeners
            document.querySelectorAll('.challenges-list .list-group-item').forEach(item => {
                console.log('Setting up click handler for category:', item.dataset.category);
                item.addEventListener('click', () => {
                    console.log('Category clicked:', item.dataset.category);
                    document.querySelectorAll('.challenges-list .list-group-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    currentCategory = item.dataset.category;
                    currentLevel = 1; // Reset level when changing categories
                    
                    // If switching to procedures, ensure levels are generated
                    if (currentCategory === 'procedures') {
                        generateProcedureLevels();
                    }
                    
                    loadChallenge();
                    updateUI();
                });
            });
    
            // Set up level selection listeners for all categories
            document.querySelectorAll('.sequencing-levels .list-group-item, .loops-levels .list-group-item, .conditions-levels .list-group-item, .procedures-levels .list-group-item').forEach(item => {
                item.addEventListener('click', () => {
                    console.log('Level clicked:', item.dataset.level);
                    // Only remove active class from levels in the current category
                    document.querySelectorAll(`.${currentCategory}-levels .list-group-item`).forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    currentLevel = parseInt(item.dataset.level);
                    loadChallenge();
                    updateUI();
                });
            });
    
            // Set up button listeners
            document.getElementById('run-btn').addEventListener('click', function() {
                console.log('Run button clicked');
                runProgram();
            });
            
            const checkBtn = document.getElementById('check-btn');
            if (checkBtn) {
                checkBtn.addEventListener('click', function() {
                    console.log('Check button clicked');
                    checkSolution();
                });
            }
            
            document.getElementById('reset-btn').addEventListener('click', function() {
                console.log('Reset button clicked');
                resetWorkspace();
            });
            
            document.getElementById('help-btn').addEventListener('click', function() {
                console.log('Help button clicked');
                showHelp();
            });

            if (quickHintBtn) {
                quickHintBtn.addEventListener('click', () => {
                    showQuickHint();
                });
            }

            if (categorySelect) {
                categorySelect.addEventListener('change', () => {
                    currentCategory = categorySelect.value;
                    currentLevel = 1;
                    loadChallenge();
                    updateUI();
                });
            }

            initTrackPicker();
            initBlocksToggle();

            if (levelsToggleBtn) {
                levelsToggleBtn.addEventListener('click', () => {
                    const currentlyCollapsed = levelsColumnEl?.classList.contains('collapsed');
                    setLevelsCollapsed(!currentlyCollapsed);
                });
            }

            if (runModalCheckBtn) {
                runModalCheckBtn.addEventListener('click', () => {
                    if (!runReadyForCheck) {
                        playSound('error');
                        setRunModalCheckState(false, 'Run your code first, then press Check Result.', 'error');
                        return;
                    }
                    checkSolution();
                });
            }
    
            // Initialize Bootstrap elements
            initBootstrap();
    
            // Initialize first challenge
            loadChallenge();
            updateUI();
            setLevelsCollapsed(false);
            
            // Set up drag-and-drop functionality
            setupDragAndDrop();
            
            console.log('Initialization complete!');
        } catch (err) {
            console.error('Error during initialization:', err);
            alert('There was a problem initializing the app. Please try refreshing the page.');
        }
    }

    // --- CHALLENGE FUNCTIONS ---
    function loadChallenge() {
        console.log(`Loading challenge for category: ${currentCategory}, level: ${currentLevel}`);
        
        // Clear existing blocks
        blockPalette.innerHTML = '';
        blocksContainer.innerHTML = '';
        userBlocks = [];
        updateWorkspacePlaceholder();
        refreshLoopVisualGroups();
        
        // Clear any existing highlighting
        document.querySelectorAll('.block').forEach(blockEl => {
            blockEl.classList.remove('block-correct', 'block-incorrect');
        });
        
        const challenge = getCurrentChallenge();
        if (!challenge) {
            console.error(`Failed to load challenge for category: ${currentCategory}, level: ${currentLevel}`);
            return;
        }
        
        // Update challenge information
        challengeTitle.textContent = getCategoryDisplayName(currentCategory);
        taskTitle.textContent = challenge.title;
        renderChallengeSummary(challenge);
        setChallengeImage(challenge);
        renderMissionStoryPanel(challenge);
        resetLevelMissionStats();
        renderMissionHud();
        renderLevelRail();
        
        // Ensure the image has modal attributes
        const imageModalEnabled = !isMissionStoryPilotActive(challenge);
        if (imageModalEnabled) {
            challengeImage.setAttribute('data-bs-toggle', 'modal');
            challengeImage.setAttribute('data-bs-target', '#imageModal');
            challengeImage.style.cursor = 'pointer';
            challengeImage.classList.remove('disable-image-modal');
        } else {
            challengeImage.removeAttribute('data-bs-toggle');
            challengeImage.removeAttribute('data-bs-target');
            challengeImage.style.cursor = 'default';
            challengeImage.classList.add('disable-image-modal');
        }
        
        // Simple preloading for better performance
        console.log('Loading challenge image:', challenge.image);
        // Level number is now shown only in the sidebar
        
        // Create a shuffled copy of blocks
        let shuffledBlocks = [...challenge.blocks];
        shuffleArray(shuffledBlocks);
        const compactDirectionPalette = isDirectionPaletteChallenge(challenge);
        blockPalette.classList.toggle('direction-palette-mode', compactDirectionPalette);
        const paletteColumns = Math.max(5, Math.min(8, (challenge.blocks || []).length || 5));
        blockPalette.style.setProperty('--direction-columns', String(paletteColumns));
        
        // Add blocks to palette in shuffled order
        shuffledBlocks.forEach(block => {
            const blockElement = createBlockElement(block, { compactPalette: compactDirectionPalette });
            blockPalette.appendChild(blockElement);
        });
        
        // Reset feedback and animation areas
        resetFeedback();
        resetAnimationArea();
        
        // Update progress
        updateProgress();
    }
    
    function getCurrentChallenge() {
        if (!challenges[currentCategory] || !challenges[currentCategory][currentLevel]) {
            console.warn(`Challenge not found for category: ${currentCategory}, level: ${currentLevel}`);
            return null;
        }
        return challenges[currentCategory][currentLevel];
    }
    
    // --- UI FUNCTIONS ---
    function updateUI() {
        // Update category and level displays
        document.querySelectorAll('.challenges-list .list-group-item').forEach(item => {
            if (item.dataset.category === currentCategory) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Hide all level groups first
        document.querySelectorAll('.sequencing-levels, .loops-levels, .conditions-levels, .procedures-levels').forEach(group => {
            group.style.display = 'none';
        });
        
        // Show the levels for the current category
        const currentLevelsGroup = document.querySelector(`.${currentCategory}-levels`);
        if (currentLevelsGroup) {
            currentLevelsGroup.style.display = 'block';
        }
        
        // Update active level within the visible category
        document.querySelectorAll(`.${currentCategory}-levels .list-group-item`).forEach(item => {
            if (parseInt(item.dataset.level) === currentLevel) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        renderMissionHud();
        renderLevelRail();
    }

    function initTrackPicker() {
        if (!trackPicker || !trackPickerBtn) return;

        const closeTrackPicker = () => {
            trackPicker.classList.remove('open');
            trackPickerBtn.setAttribute('aria-expanded', 'false');
        };

        trackPickerBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            const willOpen = !trackPicker.classList.contains('open');
            trackPicker.classList.toggle('open', willOpen);
            trackPickerBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        });

        trackOptions.forEach((option) => {
            option.addEventListener('click', () => {
                const nextCategory = option.dataset.value;
                if (!nextCategory || nextCategory === currentCategory) {
                    closeTrackPicker();
                    return;
                }
                currentCategory = nextCategory;
                currentLevel = 1;
                loadChallenge();
                updateUI();
                closeTrackPicker();
            });
        });

        document.addEventListener('click', (event) => {
            if (!trackPicker.contains(event.target)) {
                closeTrackPicker();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeTrackPicker();
            }
        });
    }

    function applyBlocksCollapsedState() {
        document.body.classList.toggle('blocks-expanded', !blocksCollapsed);
        if (!blocksToggleBtn) return;

        blocksToggleBtn.setAttribute('aria-expanded', String(!blocksCollapsed));
        blocksToggleBtn.setAttribute('aria-label', blocksCollapsed ? 'Show block text' : 'Hide block text');
        blocksToggleBtn.setAttribute('title', blocksCollapsed ? 'Show block text' : 'Hide block text');

        const icon = blocksToggleBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-chevron-right', blocksCollapsed);
            icon.classList.toggle('fa-chevron-left', !blocksCollapsed);
        }
    }

    function initBlocksToggle() {
        if (!blocksToggleBtn) return;

        try {
            const saved = localStorage.getItem('kp_blocks_collapsed');
            if (saved === '0') {
                blocksCollapsed = false;
            }
        } catch (error) {
            blocksCollapsed = true;
        }

        applyBlocksCollapsedState();

        blocksToggleBtn.addEventListener('click', () => {
            blocksCollapsed = !blocksCollapsed;
            applyBlocksCollapsedState();
            try {
                localStorage.setItem('kp_blocks_collapsed', blocksCollapsed ? '1' : '0');
            } catch (error) {
                // Ignore local storage failures.
            }
        });
    }

    function resetLevelMissionStats() {
        missionState.hintsLeft = MAX_HINTS_PER_LEVEL;
        missionState.triesLeft = MAX_TRIES_PER_LEVEL;
    }

    function renderMissionHud() {
        if (missionCategoryEl) missionCategoryEl.textContent = getCategoryDisplayName(currentCategory);
        if (missionLevelEl) missionLevelEl.textContent = String(currentLevel);
        if (missionStarsEl) missionStarsEl.textContent = String(missionState.stars);
        if (missionStreakEl) missionStreakEl.textContent = String(missionState.streak);
        if (missionHintsEl) missionHintsEl.textContent = String(missionState.hintsLeft);
        if (missionTriesEl) missionTriesEl.textContent = String(missionState.triesLeft);
        if (categorySelect) categorySelect.value = currentCategory;
        if (trackPickerLabel) trackPickerLabel.textContent = getCategoryDisplayName(currentCategory);
        trackOptions.forEach((option) => {
            option.classList.toggle('active', option.dataset.value === currentCategory);
        });
    }

    function toTwoLineText(text, maxChars = 120) {
        if (!text) return '';
        const compact = String(text).replace(/\s+/g, ' ').trim();
        if (compact.length <= maxChars) {
            return compact;
        }
        return `${compact.slice(0, maxChars - 1)}...`;
    }

    function renderChallengeSummary(challenge) {
        const missionStoryPilot = isMissionStoryPilotActive(challenge);
        const isSequencingTrack = currentCategory === 'sequencing';
        taskDescription.textContent = toTwoLineText(challenge.description, 128);
        taskGoal.textContent = `Goal: ${toTwoLineText(challenge.goal, 110)}`;
        if (visualOverlay) {
            if (missionStoryPilot || isSequencingTrack) {
                visualOverlay.textContent = '';
                visualOverlay.style.display = 'none';
            } else {
                const preview = (challenge.blocks || [])
                    .slice(0, 3)
                    .map((block) => block.text)
                    .join(' -> ');
                visualOverlay.textContent = preview ? `Mission Path: ${preview}` : '';
                visualOverlay.style.display = '';
            }
        }
        if (!imageHintStrip) return;

        if (missionStoryPilot) {
            imageHintStrip.innerHTML = '';
            imageHintStrip.classList.add('hidden');
            return;
        }

        imageHintStrip.classList.remove('hidden');
        const hintBlocks = (challenge.blocks || []).slice(0, 4);
        imageHintStrip.innerHTML = hintBlocks.map((block) => `
            <span class="hint-chip"><i class="fas fa-${resolveBlockIcon(block)}"></i> ${block.text}</span>
        `).join('');
    }

    function isMissionStoryPilotActive(challenge = getCurrentChallenge()) {
        return Boolean(challenge && MISSION_STORY_PILOT[currentCategory]?.has(currentLevel));
    }

    function isDirectionPaletteChallenge(challenge = getCurrentChallenge()) {
        return Boolean(challenge && isMissionStoryPilotActive(challenge));
    }

    function getMissionStoryFallbackPath() {
        return [
            { col: 3, row: 4 },
            { col: 3, row: 3 },
            { col: 3, row: 3 }
        ];
    }

    function getMissionStoryFallbackBoard() {
        return {
            cols: 8,
            rows: 7,
            blocked: [
                { col: 0, row: 0 }, { col: 1, row: 0 }, { col: 2, row: 0 }, { col: 3, row: 0 },
                { col: 4, row: 0 }, { col: 5, row: 0 }, { col: 6, row: 0 }, { col: 7, row: 0 },
                { col: 0, row: 6 }, { col: 1, row: 6 }, { col: 2, row: 6 }, { col: 3, row: 6 },
                { col: 4, row: 6 }, { col: 5, row: 6 }, { col: 6, row: 6 }, { col: 7, row: 6 },
                { col: 0, row: 3 }, { col: 4, row: 2 }, { col: 7, row: 1 }, { col: 7, row: 2 },
                { col: 7, row: 3 }, { col: 7, row: 4 }, { col: 7, row: 5 }
            ],
            cracked: [
                { col: 1, row: 1 }, { col: 3, row: 1 }, { col: 5, row: 1 },
                { col: 2, row: 2 }, { col: 6, row: 2 },
                { col: 2, row: 4 }, { col: 4, row: 4 }, { col: 6, row: 4 }
            ]
        };
    }

    function getMissionStoryObjectives(challenge, board, blockedSet) {
        const objectiveList = Array.isArray(challenge?.storyObjectives) && challenge.storyObjectives.length
            ? challenge.storyObjectives
            : [
                {
                    cell: challenge?.storyTarget || challenge?.storyTargetCell || { col: 3, row: 3 },
                    label: String(challenge?.storyItemName || 'Treasure'),
                    icon: 'gem',
                    action: 'pick-up'
                }
            ];

        const objectives = [];
        objectiveList.forEach((rawObjective, index) => {
            const fallbackCell = { col: 3 + (index % 2), row: 3 + (index % 2) };
            const objectiveCell = getFirstOpenMissionCell(
                board,
                blockedSet,
                [rawObjective?.cell, rawObjective?.target, fallbackCell]
            );
            const label = String(rawObjective?.label || `Target ${index + 1}`).trim();
            const icon = normalizeIconName(rawObjective?.icon || 'gem');
            objectives.push({
                cell: objectiveCell,
                label: label || `Target ${index + 1}`,
                icon: SAFE_BLOCK_ICONS.has(icon) ? icon : 'gem',
                action: String(rawObjective?.action || 'pick-up').toLowerCase() === 'drop-off' ? 'drop-off' : 'pick-up',
                actionLabel: String(rawObjective?.actionLabel || '').trim(),
                order: index + 1
            });
        });

        return objectives;
    }

    function getObjectiveActionLabel(objectiveOrAction) {
        if (objectiveOrAction && typeof objectiveOrAction === 'object') {
            const custom = String(objectiveOrAction.actionLabel || '').trim();
            if (custom) return custom;
            const action = String(objectiveOrAction.action || '').toLowerCase();
            return action === 'drop-off' ? 'Drop' : 'Pick';
        }
        return String(objectiveOrAction || '').toLowerCase() === 'drop-off' ? 'Drop' : 'Pick';
    }

    function renderMissionObjectiveMarkers(objectives, board) {
        if (!missionObjectivesLayer) return;
        missionObjectivesLayer.innerHTML = '';
        missionStoryState.objectiveMarkers = [];

        (objectives || []).forEach((objective, index) => {
            const point = toMissionStoryPercent(objective.cell, board);
            if (!point) return;

            const marker = document.createElement('div');
            marker.className = 'mission-objective-marker';
            marker.style.left = `${point.x}%`;
            marker.style.top = `${point.y}%`;
            marker.dataset.order = String(index + 1);
            marker.title = `${index + 1}. ${objective.label} (${getObjectiveActionLabel(objective)})`;
            marker.innerHTML = `
                <span class="objective-order">${index + 1}</span>
                <span class="objective-icon"><i class="fas fa-${objective.icon}"></i></span>
            `;
            missionObjectivesLayer.appendChild(marker);
            missionStoryState.objectiveMarkers.push(marker);
        });
    }

    function updateMissionObjectiveMarkers() {
        const objectiveIndex = Number(missionStoryState?.runtime?.objectiveIndex) || 0;
        missionStoryState.objectiveMarkers.forEach((marker, index) => {
            marker.classList.toggle('completed', index < objectiveIndex);
            marker.classList.toggle('active', index === objectiveIndex);
        });
    }

    function getMissionTargetPointByObjective(objective, board) {
        if (!objective) return null;
        return toMissionStoryPercent(objective.cell, board);
    }

    function setMissionTargetObjective(objective, board, instant = false) {
        if (!missionTarget || !objective) return;
        const iconName = SAFE_BLOCK_ICONS.has(String(objective.icon || '')) ? String(objective.icon) : 'gem';
        missionTarget.innerHTML = `<i class="fas fa-${iconName} mission-icon mission-icon-treasure" aria-hidden="true"></i>`;
        const targetPoint = getMissionTargetPointByObjective(objective, board);
        positionMissionMarker(missionTarget, targetPoint, instant);
        missionTarget.classList.remove('collected');
        missionStoryState.targetCell = objective.cell;
        missionStoryState.target = targetPoint || missionStoryState.target;
    }

    function buildMissionBlockedSet(board) {
        return new Set((board?.blocked || []).map((cell) => `${Number(cell.col) || 0},${Number(cell.row) || 0}`));
    }

    function isMissionBlockedCell(cell, blockedSet) {
        return Boolean(blockedSet?.has(`${Number(cell?.col) || 0},${Number(cell?.row) || 0}`));
    }

    function areMissionCellsEqual(a, b) {
        if (!a || !b) return false;
        return Number(a.col) === Number(b.col) && Number(a.row) === Number(b.row);
    }

    function setMissionStoryStatus(text) {
        if (!missionStoryStatus) return;
        missionStoryStatus.textContent = text;
    }

    function toMissionStoryPercent(point, board) {
        if (!point) return null;
        if (typeof point.x === 'number' && typeof point.y === 'number') {
            return { x: point.x, y: point.y };
        }
        const cols = Math.max(1, Number(board?.cols) || 8);
        const rows = Math.max(1, Number(board?.rows) || 7);
        const col = Math.max(0, Math.min(cols - 1, Number(point.col) || 0));
        const row = Math.max(0, Math.min(rows - 1, Number(point.row) || 0));
        return {
            x: ((col + 0.5) / cols) * 100,
            y: ((row + 0.5) / rows) * 100
        };
    }

    function sanitizeMissionDirection(value) {
        const raw = String(value || '').toLowerCase();
        return ['up', 'right', 'down', 'left'].includes(raw) ? raw : 'left';
    }

    function getMissionDirectionRotation(direction) {
        return '0deg';
    }

    function setMissionMascotDirection(direction, instant = false) {
        if (!missionMascot) return;
        if (instant) {
            missionMascot.style.transition = 'none';
        }
        missionMascot.style.setProperty('--mission-rotation', getMissionDirectionRotation(direction));
        if (instant) {
            requestAnimationFrame(() => {
                missionMascot.style.transition = 'left 500ms ease, top 500ms ease, transform 220ms ease';
            });
        }
    }

    function getFirstOpenMissionCell(board, blockedSet, preferred = []) {
        const cols = Math.max(1, Number(board?.cols) || 8);
        const rows = Math.max(1, Number(board?.rows) || 7);
        const candidates = []
            .concat(preferred || [])
            .concat(Array.from({ length: rows }, (_, row) =>
                Array.from({ length: cols }, (_, col) => ({ col, row }))
            ).flat());

        for (const point of candidates) {
            const cell = toMissionStoryCell(point, board);
            if (!cell) continue;
            if (!isMissionBlockedCell(cell, blockedSet)) {
                return cell;
            }
        }

        return { col: 0, row: 0 };
    }

    function toMissionStoryCell(point, board) {
        if (!point) return null;
        const cols = Math.max(1, Number(board?.cols) || 8);
        const rows = Math.max(1, Number(board?.rows) || 7);
        if (typeof point.col === 'number' && typeof point.row === 'number') {
            return {
                col: Math.max(0, Math.min(cols - 1, Number(point.col))),
                row: Math.max(0, Math.min(rows - 1, Number(point.row)))
            };
        }
        if (typeof point.x === 'number' && typeof point.y === 'number') {
            return {
                col: Math.max(0, Math.min(cols - 1, Math.round(((Number(point.x) / 100) * cols) - 0.5))),
                row: Math.max(0, Math.min(rows - 1, Math.round(((Number(point.y) / 100) * rows) - 0.5)))
            };
        }
        return { col: 0, row: 0 };
    }

    function turnMissionDirection(current, turn) {
        const directions = ['up', 'right', 'down', 'left'];
        const idx = directions.indexOf(sanitizeMissionDirection(current));
        const delta = turn === 'right' ? 1 : -1;
        return directions[(idx + delta + directions.length) % directions.length];
    }

    function parseMissionCommand(blockOrId) {
        const id = typeof blockOrId === 'string'
            ? blockOrId
            : String(blockOrId?.dataset?.id || '');
        const text = typeof blockOrId === 'string'
            ? ''
            : String(blockOrId?.textContent || '');
        const source = `${id} ${text}`.toLowerCase();

        if (getMissionRepeatCount(id) > 0) return 'repeat';
        if (id === 'move-north') return 'move-north';
        if (id === 'move-south') return 'move-south';
        if (id === 'move-east') return 'move-east';
        if (id === 'move-west') return 'move-west';
        if (id === 'move-forward') return 'move-north';
        if (id === 'move-right' || id === 'turn-right') return 'move-east';
        if (id === 'move-left' || id === 'turn-left') return 'move-west';
        if (id === 'pick-up') return 'pick-up';
        if (id === 'drop-off') return 'drop-off';
        if (source.includes('move north') || source.includes('north')) return 'move-north';
        if (source.includes('move south') || source.includes('south')) return 'move-south';
        if (source.includes('move east') || source.includes('east')) return 'move-east';
        if (source.includes('move west') || source.includes('west')) return 'move-west';
        if (source.includes('turn-right') || source.includes('turn right') || source.includes('move-right') || source.includes('move right')) return 'move-east';
        if (source.includes('turn-left') || source.includes('turn left') || source.includes('move-left') || source.includes('move left')) return 'move-west';
        if (source.includes('move-forward') || source.includes('move forward') || source.includes('forward')) return 'move-north';
        if (source.includes('pick-up') || source.includes('pick up') || source.includes('treasure')) return 'pick-up';
        if (source.includes('drop-off') || source.includes('drop off') || source.includes('drop')) return 'drop-off';
        if (source.includes('repeat') || source.includes('loop')) return 'repeat';
        return 'other';
    }

    function getMissionRepeatCount(blockOrId) {
        if (typeof blockOrId !== 'string') {
            const fromDataset = Number(blockOrId?.dataset?.repeatCount || 0);
            if (Number.isFinite(fromDataset) && fromDataset > 0) {
                return Math.max(1, Math.min(12, Math.floor(fromDataset)));
            }
        }

        const id = typeof blockOrId === 'string'
            ? blockOrId
            : String(blockOrId?.dataset?.id || '');
        const match = id.match(/^repeat(?:-custom)?-(\d+)$/);
        if (!match) return 0;
        const count = Number(match[1]);
        if (!Number.isFinite(count)) return 0;
        return Math.max(0, Math.min(12, Math.floor(count)));
    }

    function moveMissionCellForward(cell, direction, board, blockedSet) {
        const cols = Math.max(1, Number(board?.cols) || 8);
        const rows = Math.max(1, Number(board?.rows) || 7);
        const next = { col: Number(cell?.col) || 0, row: Number(cell?.row) || 0 };
        const dir = sanitizeMissionDirection(direction);

        if (dir === 'up') next.row -= 1;
        if (dir === 'down') next.row += 1;
        if (dir === 'left') next.col -= 1;
        if (dir === 'right') next.col += 1;

        const withinBounds = next.col >= 0 && next.col < cols && next.row >= 0 && next.row < rows;
        if (!withinBounds) {
            return { col: Number(cell?.col) || 0, row: Number(cell?.row) || 0 };
        }

        if (isMissionBlockedCell(next, blockedSet)) {
            return { col: Number(cell?.col) || 0, row: Number(cell?.row) || 0 };
        }

        return next;
    }

    function applyMissionCommand(runtime, command, board, blockedSet, targetCell) {
        if (!runtime) return;

        if (command === 'move-north') {
            const currentCell = { ...runtime.cell };
            runtime.cell = moveMissionCellForward(runtime.cell, 'up', board, blockedSet);
            if (areMissionCellsEqual(currentCell, runtime.cell)) {
                runtime.blockedMoves += 1;
            }
            return { kind: 'move' };
        }

        if (command === 'move-south') {
            const currentCell = { ...runtime.cell };
            runtime.cell = moveMissionCellForward(runtime.cell, 'down', board, blockedSet);
            if (areMissionCellsEqual(currentCell, runtime.cell)) {
                runtime.blockedMoves += 1;
            }
            return { kind: 'move' };
        }

        if (command === 'move-west') {
            const currentCell = { ...runtime.cell };
            runtime.cell = moveMissionCellForward(runtime.cell, 'left', board, blockedSet);
            if (areMissionCellsEqual(currentCell, runtime.cell)) {
                runtime.blockedMoves += 1;
            }
            return { kind: 'move' };
        }

        if (command === 'move-east') {
            const currentCell = { ...runtime.cell };
            runtime.cell = moveMissionCellForward(runtime.cell, 'right', board, blockedSet);
            if (areMissionCellsEqual(currentCell, runtime.cell)) {
                runtime.blockedMoves += 1;
            }
            return { kind: 'move' };
        }

        if (command === 'pick-up' || command === 'drop-off') {
            runtime.actionAttempts = (Number(runtime.actionAttempts) || 0) + 1;
            const objectives = (Array.isArray(runtime.objectives) && runtime.objectives.length)
                ? runtime.objectives
                : [{ cell: targetCell, label: String(runtime.storyItemName || 'Treasure'), icon: 'gem', action: 'pick-up' }];
            const objectiveIndex = Number(runtime.objectiveIndex) || 0;
            const activeObjective = objectives[objectiveIndex] || null;

            if (activeObjective && areMissionCellsEqual(runtime.cell, activeObjective.cell)) {
                const expectedAction = activeObjective.action === 'drop-off' ? 'drop-off' : 'pick-up';
                if (command === expectedAction) {
                    runtime.objectiveIndex = objectiveIndex + 1;
                    runtime.completedObjectives = runtime.objectiveIndex;
                    runtime.hasTreasure = runtime.objectiveIndex >= objectives.length;
                    return {
                        kind: 'objective-complete',
                        completedObjective: activeObjective,
                        nextObjective: objectives[runtime.objectiveIndex] || null,
                        isFinished: runtime.hasTreasure
                    };
                }

                runtime.wrongActions = (Number(runtime.wrongActions) || 0) + 1;
                return {
                    kind: 'wrong-action',
                    expectedObjective: activeObjective,
                    expectedAction
                };
            }

            runtime.wrongPickups += 1;
            return {
                kind: 'wrong-pick',
                expectedObjective: activeObjective
            };
        }

        return { kind: 'other' };
    }

    function advanceMissionRuntime(blockOrId) {
        if (!missionStoryState.runtime) {
            return missionStoryState.start;
        }
        const command = parseMissionCommand(blockOrId);
        const commandResult = applyMissionCommand(
            missionStoryState.runtime,
            command,
            missionStoryState.board,
            missionStoryState.blockedSet,
            missionStoryState.targetCell
        );
        if (command === 'pick-up' || command === 'drop-off') {
            if (commandResult?.kind === 'objective-complete') {
                missionTarget?.classList.add('collected');
                if (commandResult.nextObjective) {
                    setTimeout(() => {
                        setMissionTargetObjective(commandResult.nextObjective, missionStoryState.board, false);
                    }, 180);
                    const nextAction = getObjectiveActionLabel(commandResult.nextObjective);
                    setMissionStoryStatus(`Nice! Next: ${nextAction} at ${commandResult.nextObjective.label}`);
                } else {
                    setMissionStoryStatus('Mission complete');
                }
            } else if (commandResult?.kind === 'wrong-action') {
                const expectedAction = getObjectiveActionLabel(commandResult.expectedObjective || commandResult.expectedAction);
                const where = commandResult?.expectedObjective?.label || 'this point';
                setMissionStoryStatus(`Use ${expectedAction} at ${where}.`);
            } else if (commandResult?.kind === 'wrong-pick') {
                const expected = commandResult?.expectedObjective?.label || 'target tile';
                setMissionStoryStatus(`Not here yet. Go to ${expected}.`);
            }
        }

        updateMissionObjectiveMarkers();

        return toMissionStoryPercent(missionStoryState.runtime.cell, missionStoryState.board);
    }

    function evaluateMissionStoryProgram(programBlocks, challenge) {
        const storyItemName = String(challenge?.storyItemName || 'treasure tile').trim() || 'treasure tile';
        const board = challenge?.storyBoard || getMissionStoryFallbackBoard();
        const blockedSet = buildMissionBlockedSet(board);
        const startCell = getFirstOpenMissionCell(board, blockedSet, [challenge?.storyStart || challenge?.storyStartCell, { col: 3, row: 5 }]);
        const objectives = getMissionStoryObjectives(challenge, board, blockedSet);
        const targetCell = objectives[objectives.length - 1]?.cell
            || getFirstOpenMissionCell(board, blockedSet, [challenge?.storyTarget || challenge?.storyTargetCell, { col: 3, row: 3 }]);
        const runtime = {
            cell: { ...startCell },
            direction: sanitizeMissionDirection(challenge?.storyStartDirection || 'left'),
            hasTreasure: false,
            actionAttempts: 0,
            blockedMoves: 0,
            wrongPickups: 0,
            wrongActions: 0,
            completedObjectives: 0,
            objectiveIndex: 0,
            objectives,
            storyItemName
        };

        for (let index = 0; index < (programBlocks || []).length; index += 1) {
            const blockId = programBlocks[index];
            const repeatCount = getMissionRepeatCount(blockId);
            if (repeatCount > 0) {
                const nextBlockId = programBlocks[index + 1];
                const nextCommand = parseMissionCommand(nextBlockId);
                if (nextBlockId && nextCommand !== 'other' && nextCommand !== 'repeat') {
                    for (let repeatIndex = 0; repeatIndex < repeatCount; repeatIndex += 1) {
                        applyMissionCommand(runtime, nextCommand, board, blockedSet, targetCell);
                    }
                    index += 1;
                    continue;
                }
            }

            const command = parseMissionCommand(blockId);
            if (command === 'repeat') {
                continue;
            }
            applyMissionCommand(runtime, command, board, blockedSet, targetCell);
        }

        if (runtime.hasTreasure) {
            return {
                isCorrect: true,
                message: objectives.length > 1
                    ? `Great job! You completed all mission points in order and docked.`
                    : `Great job! You reached the ${storyItemName} and picked it up.`,
                runtime,
                targetCell
            };
        }

        if (runtime.actionAttempts === 0) {
            const actionPlan = objectives
                .map((objective) => `${getObjectiveActionLabel(objective)} ${objective.label}`)
                .join(' -> ');
            return {
                isCorrect: false,
                message: objectives.length > 1
                    ? `Use actions in order: ${actionPlan}.`
                    : `Add Pick or Drop after the robot reaches the ${storyItemName}.`,
                runtime,
                targetCell
            };
        }

        if (runtime.wrongActions > 0 && objectives.length > 1) {
            const nextObjective = objectives[runtime.objectiveIndex] || objectives[0];
            const actionLabel = getObjectiveActionLabel(nextObjective);
            return {
                isCorrect: false,
                message: `Use ${actionLabel} at ${nextObjective?.label || 'the next point'}.`,
                runtime,
                targetCell
            };
        }

        if (runtime.wrongPickups > 0 && objectives.length > 1) {
            const orderHint = objectives.map((item) => item.label).join(' -> ');
            return {
                isCorrect: false,
                message: `Wrong order. Follow: ${orderHint}.`,
                runtime,
                targetCell
            };
        }

        const nextObjective = objectives[runtime.objectiveIndex];
        if (objectives.length > 1 && nextObjective) {
            const actionLabel = getObjectiveActionLabel(nextObjective);
            return {
                isCorrect: false,
                message: `Go to ${nextObjective.label}, then use ${actionLabel}.`,
                runtime,
                targetCell
            };
        }

        if (!areMissionCellsEqual(runtime.cell, targetCell)) {
            return {
                isCorrect: false,
                message: `Pick Up works only on the ${storyItemName}. Move to it first.`,
                runtime,
                targetCell
            };
        }

        return {
            isCorrect: false,
            message: 'Try again with the correct order.',
            runtime,
            targetCell
        };
    }

    function positionMissionMarker(markerEl, point, instant = false) {
        if (!markerEl || !point) return;
        if (instant) {
            markerEl.style.transition = 'none';
        }
        markerEl.style.left = `${point.x}%`;
        markerEl.style.top = `${point.y}%`;
        if (instant) {
            requestAnimationFrame(() => {
                markerEl.style.transition = 'left 500ms ease, top 500ms ease, transform 220ms ease';
            });
        }
    }

    function resetMissionStoryVisualState() {
        if (!missionStepTrack) return;
        missionStepTrack.querySelectorAll('.mission-step-chip').forEach((chip) => {
            chip.classList.remove('active', 'done', 'wrong');
        });
    }

    function renderMissionStoryGrid(board) {
        if (!missionGrid) return;
        const cols = Math.max(1, Number(board?.cols) || 8);
        const rows = Math.max(1, Number(board?.rows) || 7);
        missionGrid.style.setProperty('--mission-cols', String(cols));
        missionGrid.style.setProperty('--mission-rows', String(rows));
        missionGrid.innerHTML = '';

        const crackedSet = new Set(
            (board?.cracked || []).map((cell) => `${Number(cell.col) || 0},${Number(cell.row) || 0}`)
        );
        const blockedSet = buildMissionBlockedSet(board);

        for (let row = 0; row < rows; row += 1) {
            for (let col = 0; col < cols; col += 1) {
                const cell = document.createElement('div');
                const key = `${col},${row}`;
                const isBlocked = blockedSet.has(key);
                const isCracked = crackedSet.has(key);
                cell.className = `mission-cell${isCracked ? ' cracked' : ''}${isBlocked ? ' blocked' : ''}`;
                missionGrid.appendChild(cell);
            }
        }
    }

    function renderMissionStoryPanel(challenge) {
        if (!missionStoryLayer || !missionStepTrack || !missionMascot || !missionTarget || !challengeImage) {
            return;
        }

        const enabled = isMissionStoryPilotActive(challenge);
        missionStoryState.enabled = enabled;
        missionStoryState.stepById = new Map();
        missionStoryState.stepOrder = [];
        missionStoryState.currentIndex = -1;
        missionStoryState.objectives = [];
        missionStoryState.objectiveMarkers = [];
        missionStoryState.runtime = null;

        if (visualOverlay) {
            visualOverlay.style.display = (enabled || currentCategory === 'sequencing') ? 'none' : '';
        }
        challengeImage.classList.toggle('mission-story-bg-hidden', enabled);

        if (!enabled) {
            missionStoryLayer.classList.remove('active');
            missionStepTrack.innerHTML = '';
            if (missionGrid) missionGrid.innerHTML = '';
            if (missionObjectivesLayer) missionObjectivesLayer.innerHTML = '';
            missionMascot.innerHTML = '<i class="fas fa-robot"></i>';
            missionTarget.innerHTML = '<i class="fas fa-gem"></i>';
            setMissionStoryStatus('Press Run to see the robot walk the path.');
            return;
        }

        missionStoryLayer.classList.add('active');

        missionStoryState.board = challenge.storyBoard || getMissionStoryFallbackBoard();
        missionStoryState.blockedSet = buildMissionBlockedSet(missionStoryState.board);
        renderMissionStoryGrid(missionStoryState.board);
        missionStoryState.objectives = getMissionStoryObjectives(challenge, missionStoryState.board, missionStoryState.blockedSet);
        renderMissionObjectiveMarkers(missionStoryState.objectives, missionStoryState.board);
        missionStoryState.path = (Array.isArray(challenge.storyPath) && challenge.storyPath.length
            ? challenge.storyPath
            : getMissionStoryFallbackPath())
            .map((point) => toMissionStoryPercent(point, missionStoryState.board));
        missionStoryState.startCell = getFirstOpenMissionCell(
            missionStoryState.board,
            missionStoryState.blockedSet,
            [challenge.storyStart || challenge.storyStartCell, { col: 3, row: 5 }]
        );
        missionStoryState.startDirection = sanitizeMissionDirection(challenge.storyStartDirection || 'left');
        missionStoryState.start = toMissionStoryPercent(missionStoryState.startCell, missionStoryState.board);
        missionStoryState.targetCell = missionStoryState.objectives[0]?.cell || getFirstOpenMissionCell(
            missionStoryState.board,
            missionStoryState.blockedSet,
            [challenge.storyTarget || challenge.storyTargetCell, { col: 3, row: 3 }]
        );
        if (areMissionCellsEqual(missionStoryState.targetCell, missionStoryState.startCell)) {
            missionStoryState.targetCell = getFirstOpenMissionCell(
                missionStoryState.board,
                missionStoryState.blockedSet,
                [{ col: 3, row: 3 }, { col: 3, row: 4 }, { col: 4, row: 3 }]
            );
        }
        missionStoryState.target = toMissionStoryPercent(missionStoryState.targetCell, missionStoryState.board);
        missionStoryState.runtime = {
            cell: { ...missionStoryState.startCell },
            direction: missionStoryState.startDirection,
            hasTreasure: false,
            actionAttempts: 0,
            blockedMoves: 0,
            wrongPickups: 0,
            wrongActions: 0,
            completedObjectives: 0,
            objectiveIndex: 0,
            objectives: missionStoryState.objectives.map((objective) => ({
                cell: { ...objective.cell },
                label: objective.label,
                icon: objective.icon,
                action: objective.action,
                actionLabel: objective.actionLabel
            })),
            storyItemName: String(challenge?.storyItemName || 'treasure tile')
        };

        missionMascot.innerHTML = '<i class="fas fa-robot mission-icon mission-icon-robot" aria-hidden="true"></i>';
        missionTarget.classList.remove('collected');

        setMissionTargetObjective(missionStoryState.objectives[0] || { cell: missionStoryState.targetCell, icon: 'gem' }, missionStoryState.board, true);
        updateMissionObjectiveMarkers();
        positionMissionMarker(missionMascot, missionStoryState.start, true);
        setMissionMascotDirection(missionStoryState.startDirection, true);
        missionMascot.classList.remove('running');

        if (missionStepTrack) {
            missionStepTrack.innerHTML = '';
        }
        const solution = challenge.solution || [];
        solution.forEach((stepId, index) => {
            missionStoryState.stepById.set(`${index}`, null);
            missionStoryState.stepOrder.push(stepId);
        });

        if (missionStoryState.objectives.length > 1) {
            const objectiveOrder = missionStoryState.objectives
                .map((objective, index) => `${index + 1}. ${objective.label}`)
                .join(' -> ');
            setMissionStoryStatus(objectiveOrder);
        } else {
            setMissionStoryStatus('');
        }
        resetMissionStoryVisualState();
    }

    function markMissionStoryStep(execIndex, blockId, challenge, displayLabel = '') {
        if (!missionStoryState.enabled || !missionStepTrack) return;
        resetMissionStoryVisualState();

        missionStepTrack.querySelectorAll('.mission-step-chip').forEach((chip) => {
            const idx = Number(chip.dataset.stepIndex || -1);
            if (idx < execIndex) {
                chip.classList.add('done');
            } else if (idx === execIndex && missionStoryState.stepOrder[idx]) {
                chip.classList.add('active');
            }
        });

        const command = parseMissionCommand(blockId);
        if (command !== 'pick-up' && command !== 'drop-off' && command !== 'repeat') {
            const chipText = displayLabel || getBlockLabelById(challenge, blockId);
            setMissionStoryStatus(chipText);
        }
    }

    function animateMissionStoryStep(execIndex, blockInput, challenge, displayLabel = '') {
        if (!missionStoryState.enabled || !missionMascot) return;
        missionStoryState.currentIndex = execIndex;
        const blockId = typeof blockInput === 'string' ? blockInput : String(blockInput?.dataset?.id || '');
        const pathPoint = advanceMissionRuntime(blockInput) || missionStoryState.start;
        positionMissionMarker(missionMascot, pathPoint, false);
        missionMascot.classList.add('running');
        setTimeout(() => missionMascot.classList.remove('running'), 260);
        markMissionStoryStep(execIndex, blockId, challenge, displayLabel);
    }

    function completeMissionStoryRun(challenge) {
        if (!missionStoryState.enabled) return;
        const missionResult = evaluateMissionStoryProgram(userBlocks, challenge);
        const isCorrect = missionResult.isCorrect;
        if (isCorrect) {
            missionStepTrack?.querySelectorAll('.mission-step-chip').forEach((chip) => {
                chip.classList.remove('active', 'wrong');
                chip.classList.add('done');
            });
            positionMissionMarker(missionMascot, missionStoryState.target, false);
            missionTarget?.classList.add('collected');
            updateMissionObjectiveMarkers();
            setMissionStoryStatus('Success');
        } else {
            setMissionStoryStatus('Try again');
        }
    }

    function escapeSvgText(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function wrapSvgText(label, maxChars = 16, maxLines = 2) {
        const words = String(label || '').trim().split(/\s+/).filter(Boolean);
        if (!words.length) return ['Step'];

        const lines = [];
        let current = '';
        let index = 0;

        while (index < words.length && lines.length < maxLines) {
            const candidate = current ? `${current} ${words[index]}` : words[index];
            if (candidate.length <= maxChars) {
                current = candidate;
                index += 1;
            } else if (!current) {
                lines.push(`${words[index].slice(0, Math.max(1, maxChars - 1))}...`);
                index += 1;
                current = '';
            } else {
                lines.push(current);
                current = '';
            }
        }

        if (lines.length < maxLines && current) {
            lines.push(current);
        }

        const hasMore = index < words.length;
        if (hasMore && lines.length) {
            const lastIndex = Math.min(lines.length - 1, maxLines - 1);
            const trimmed = lines[lastIndex].slice(0, Math.max(1, maxChars - 1)).replace(/[.…]+$/g, '');
            lines[lastIndex] = `${trimmed}...`;
        }

        return lines.slice(0, maxLines);
    }

    function truncateSvgText(label, maxChars = 90) {
        const compact = String(label || '').replace(/\s+/g, ' ').trim();
        if (!compact) return '';
        if (compact.length <= maxChars) return compact;
        return `${compact.slice(0, Math.max(1, maxChars - 3)).trim()}...`;
    }

    function resolveAssetUrlForSvg(src) {
        const raw = String(src || '').trim();
        if (!raw) return '';
        if (raw.startsWith('data:')) return raw;
        try {
            const absolute = new URL(raw, window.location.href).href;
            const joiner = absolute.includes('?') ? '&' : '?';
            return `${absolute}${joiner}v=${IMAGE_CACHE_VERSION}`;
        } catch (error) {
            return raw;
        }
    }

    function getSequencingVisualKey(stepOrText, iconName = '') {
        const explicitIcon = normalizeIconName(iconName || (typeof stepOrText === 'object' ? stepOrText?.icon : ''));
        const iconMap = {
            bell: 'alarm',
            tooth: 'tooth',
            shirt: 'shirt',
            egg: 'food',
            utensils: 'food',
            backpack: 'bag',
            briefcase: 'bag',
            school: 'school',
            'bread-slice': 'bread',
            cheese: 'cheese',
            leaf: 'leaf',
            'apple-whole': 'tomato',
            scissors: 'cut',
            circle: 'snowball',
            'circle-dot': 'snowball',
            bullseye: 'snowball',
            eye: 'eyes',
            carrot: 'carrot',
            'hat-wizard': 'hat',
            shovel: 'dig',
            seedling: 'seed',
            mountain: 'soil',
            droplet: 'water',
            sun: 'sun',
            robot: 'robot',
            'pizza-slice': 'pizza',
            car: 'car',
            'book-open': 'book',
            landmark: 'museum',
            rocket: 'rocket',
            music: 'music',
            'person-running': 'move',
            'cloud-sun': 'weather',
            'cloud-rain': 'weather',
            flask: 'science',
            'arrow-up': 'move',
            'arrow-down': 'move',
            'arrow-left': 'move',
            'arrow-right': 'move',
            redo: 'repeat',
            rotate: 'repeat',
            map: 'map',
            camera: 'camera',
            gem: 'treasure',
            box: 'treasure',
            calendar: 'calendar',
            ticket: 'museum',
            tv: 'camera',
            database: 'science',
            satellite: 'rocket',
            'laptop-code': 'science',
            'birthday-cake': 'party',
            'door-open': 'move',
            building: 'museum',
            glasses: 'eyes'
        };
        if (iconMap[explicitIcon]) {
            return iconMap[explicitIcon];
        }

        const source = `${typeof stepOrText === 'object' ? stepOrText?.id || '' : ''} ${typeof stepOrText === 'string' ? stepOrText : stepOrText?.text || ''}`.toLowerCase();
        const textMap = [
            { keys: ['wake'], key: 'alarm' },
            { keys: ['brush', 'tooth'], key: 'tooth' },
            { keys: ['dress', 'shirt', 'clothe'], key: 'shirt' },
            { keys: ['breakfast', 'eat', 'food'], key: 'food' },
            { keys: ['pack', 'bag'], key: 'bag' },
            { keys: ['school'], key: 'school' },
            { keys: ['bread', 'sandwich'], key: 'bread' },
            { keys: ['cheese'], key: 'cheese' },
            { keys: ['lettuce', 'leaf'], key: 'leaf' },
            { keys: ['tomato'], key: 'tomato' },
            { keys: ['sauce', 'topping'], key: 'food' },
            { keys: ['cut', 'knife'], key: 'cut' },
            { keys: ['roll', 'snowball'], key: 'snowball' },
            { keys: ['snow'], key: 'snowman' },
            { keys: ['eye'], key: 'eyes' },
            { keys: ['nose', 'carrot'], key: 'carrot' },
            { keys: ['hat'], key: 'hat' },
            { keys: ['dig', 'hole', 'shovel'], key: 'dig' },
            { keys: ['seed'], key: 'seed' },
            { keys: ['soil'], key: 'soil' },
            { keys: ['water'], key: 'water' },
            { keys: ['sun'], key: 'sun' },
            { keys: ['grow', 'flower'], key: 'flower' },
            { keys: ['go ', 'walk', 'forward', 'left', 'right', 'move', 'turn'], key: 'move' },
            { keys: ['repeat', 'loop'], key: 'repeat' },
            { keys: ['pizza'], key: 'pizza' },
            { keys: ['dough', 'bake', 'serve'], key: 'pizza' },
            { keys: ['car'], key: 'car' },
            { keys: ['wash', 'rinse', 'soap', 'dry'], key: 'car' },
            { keys: ['book', 'library'], key: 'book' },
            { keys: ['museum'], key: 'museum' },
            { keys: ['robot'], key: 'robot' },
            { keys: ['rocket', 'space'], key: 'rocket' },
            { keys: ['weather'], key: 'weather' },
            { keys: ['wind', 'rain', 'forecast', 'cloud'], key: 'weather' },
            { keys: ['science', 'experiment', 'lab'], key: 'science' },
            { keys: ['photo', 'camera'], key: 'camera' },
            { keys: ['map', 'maze', 'path', 'route'], key: 'map' },
            { keys: ['treasure', 'gem', 'chest'], key: 'treasure' },
            { keys: ['date', 'calendar', 'schedule'], key: 'calendar' },
            { keys: ['party', 'cake', 'gift', 'balloon'], key: 'party' }
        ];
        const found = textMap.find((entry) => entry.keys.some((key) => source.includes(key)));
        return found?.key || 'generic';
    }

    function getSequencingMissionVisualKey(challenge, steps) {
        const source = `${challenge?.title || ''} ${challenge?.goal || ''} ${(steps || []).map((step) => step.text).join(' ')}`.toLowerCase();
        const map = [
            { keys: ['treasure', 'chest', 'robot'], key: 'treasure' },
            { keys: ['sandwich', 'bread', 'cheese'], key: 'sandwich' },
            { keys: ['snowman', 'snow'], key: 'snowman' },
            { keys: ['flower', 'plant', 'garden'], key: 'flower' },
            { keys: ['pizza'], key: 'pizza' },
            { keys: ['car wash', 'car'], key: 'car' },
            { keys: ['library', 'book'], key: 'book' },
            { keys: ['science', 'experiment'], key: 'science' },
            { keys: ['museum'], key: 'museum' },
            { keys: ['weather', 'forecast'], key: 'weather' },
            { keys: ['space', 'rocket'], key: 'rocket' },
            { keys: ['party', 'birthday', 'cake'], key: 'party' }
        ];
        const found = map.find((entry) => entry.keys.some((key) => source.includes(key)));
        if (found?.key) return found.key;
        return getSequencingVisualKey(steps?.[steps.length - 1] || challenge?.goal || 'target');
    }

    function buildSequencingIconSvg(key, cx, cy, size = 34) {
        const s = size;
        const stroke = '#2b4f7a';
        const fillSoft = '#f7fbff';
        const commonWrapStart = `<g transform="translate(${cx} ${cy})">`;
        const commonWrapEnd = `</g>`;
        const iconBackdrop = `<circle r="${s * 0.46}" fill="#ffffff" stroke="#c5d8ef" stroke-width="${Math.max(1.6, s * 0.06)}"/>`;

        const icon = (() => {
            switch (key) {
                case 'alarm':
                    return `<circle r="${s * 0.34}" fill="${fillSoft}" stroke="${stroke}" stroke-width="2"/>
                        <line x1="0" y1="0" x2="0" y2="${-s * 0.14}" stroke="${stroke}" stroke-width="2"/>
                        <line x1="0" y1="0" x2="${s * 0.11}" y2="${s * 0.06}" stroke="${stroke}" stroke-width="2"/>
                        <circle cx="${-s * 0.22}" cy="${-s * 0.29}" r="${s * 0.08}" fill="#ffe082" stroke="${stroke}" stroke-width="1.8"/>
                        <circle cx="${s * 0.22}" cy="${-s * 0.29}" r="${s * 0.08}" fill="#ffe082" stroke="${stroke}" stroke-width="1.8"/>`;
                case 'tooth':
                    return `<path d="M${-s * 0.22} ${-s * 0.1} Q${-s * 0.18} ${-s * 0.34} 0 ${-s * 0.3} Q${s * 0.18} ${-s * 0.34} ${s * 0.22} ${-s * 0.1} Q${s * 0.18} ${s * 0.12} ${s * 0.08} ${s * 0.22} Q0 ${s * 0.12} ${-s * 0.08} ${s * 0.22} Q${-s * 0.18} ${s * 0.12} ${-s * 0.22} ${-s * 0.1} Z" fill="${fillSoft}" stroke="${stroke}" stroke-width="2"/>`;
                case 'shirt':
                    return `<path d="M${-s * 0.26} ${-s * 0.2} L${-s * 0.36} 0 L${-s * 0.24} ${s * 0.1} L${-s * 0.17} ${-s * 0.02} L${-s * 0.17} ${s * 0.28} L${s * 0.17} ${s * 0.28} L${s * 0.17} ${-s * 0.02} L${s * 0.24} ${s * 0.1} L${s * 0.36} 0 L${s * 0.26} ${-s * 0.2} L${s * 0.1} ${-s * 0.13} L0 ${-s * 0.23} L${-s * 0.1} ${-s * 0.13} Z" fill="#d5e8ff" stroke="${stroke}" stroke-width="2"/>`;
                case 'food':
                    return `<ellipse cx="0" cy="${s * 0.12}" rx="${s * 0.3}" ry="${s * 0.14}" fill="${fillSoft}" stroke="${stroke}" stroke-width="2"/>
                        <circle cx="${-s * 0.08}" cy="${s * 0.08}" r="${s * 0.05}" fill="#ffd866"/>
                        <circle cx="${s * 0.04}" cy="${s * 0.09}" r="${s * 0.05}" fill="#ffd866"/>`;
                case 'bag':
                    return `<rect x="${-s * 0.24}" y="${-s * 0.08}" width="${s * 0.48}" height="${s * 0.36}" rx="${s * 0.06}" fill="#ffd8d8" stroke="${stroke}" stroke-width="2"/>
                        <path d="M${-s * 0.12} ${-s * 0.08} Q0 ${-s * 0.23} ${s * 0.12} ${-s * 0.08}" fill="none" stroke="${stroke}" stroke-width="2"/>`;
                case 'school':
                    return `<rect x="${-s * 0.26}" y="${-s * 0.02}" width="${s * 0.52}" height="${s * 0.3}" fill="#e6f0ff" stroke="${stroke}" stroke-width="2"/>
                        <polygon points="${-s * 0.32},${-s * 0.02} 0,${-s * 0.26} ${s * 0.32},${-s * 0.02}" fill="#9ec2ff" stroke="${stroke}" stroke-width="2"/>
                        <rect x="${-s * 0.06}" y="${s * 0.08}" width="${s * 0.12}" height="${s * 0.2}" fill="#fff" stroke="${stroke}" stroke-width="1.5"/>`;
                case 'bread':
                    return `<rect x="${-s * 0.28}" y="${-s * 0.04}" width="${s * 0.56}" height="${s * 0.3}" rx="${s * 0.1}" fill="#efc987" stroke="${stroke}" stroke-width="2"/>
                        <path d="M${-s * 0.2} ${-s * 0.04} Q0 ${-s * 0.2} ${s * 0.2} ${-s * 0.04}" fill="none" stroke="#b18148" stroke-width="2"/>`;
                case 'cheese':
                    return `<polygon points="${-s * 0.24},${s * 0.2} ${s * 0.26},${s * 0.2} ${s * 0.15},${-s * 0.15}" fill="#ffd95d" stroke="${stroke}" stroke-width="2"/>
                        <circle cx="${-s * 0.03}" cy="${s * 0.07}" r="${s * 0.035}" fill="#f0c244"/>
                        <circle cx="${s * 0.1}" cy="${s * 0.1}" r="${s * 0.028}" fill="#f0c244"/>`;
                case 'leaf':
                    return `<path d="M${-s * 0.2} ${s * 0.08} Q${-s * 0.02} ${-s * 0.3} ${s * 0.24} ${-s * 0.05} Q${s * 0.05} ${s * 0.28} ${-s * 0.2} ${s * 0.08} Z" fill="#95d364" stroke="${stroke}" stroke-width="2"/>`;
                case 'tomato':
                    return `<circle r="${s * 0.22}" fill="#f05151" stroke="${stroke}" stroke-width="2"/>
                        <path d="M${-s * 0.08} ${-s * 0.24} L0 ${-s * 0.14} L${s * 0.08} ${-s * 0.24}" fill="#66a95a" stroke="#3f7d38" stroke-width="1.5"/>`;
                case 'cut':
                    return `<circle cx="${-s * 0.08}" cy="${-s * 0.06}" r="${s * 0.075}" fill="#f5f9ff" stroke="${stroke}" stroke-width="2"/>
                        <circle cx="${s * 0.08}" cy="${s * 0.08}" r="${s * 0.075}" fill="#f5f9ff" stroke="${stroke}" stroke-width="2"/>
                        <line x1="${-s * 0.03}" y1="${-s * 0.01}" x2="${s * 0.22}" y2="${-s * 0.24}" stroke="${stroke}" stroke-width="2"/>
                        <line x1="${-s * 0.03}" y1="${s * 0.06}" x2="${s * 0.22}" y2="${s * 0.27}" stroke="${stroke}" stroke-width="2"/>`;
                case 'snowball':
                    return `<circle r="${s * 0.21}" fill="#ffffff" stroke="#9cb3c8" stroke-width="2"/>
                        <circle r="${s * 0.1}" fill="none" stroke="#c8d6e5" stroke-width="1.5"/>`;
                case 'snowman':
                    return `<circle cx="0" cy="${s * 0.16}" r="${s * 0.2}" fill="#fff" stroke="#9cb3c8" stroke-width="2"/>
                        <circle cx="0" cy="${-s * 0.06}" r="${s * 0.14}" fill="#fff" stroke="#9cb3c8" stroke-width="2"/>
                        <circle cx="0" cy="${-s * 0.24}" r="${s * 0.1}" fill="#fff" stroke="#9cb3c8" stroke-width="2"/>`;
                case 'eyes':
                    return `<circle cx="${-s * 0.1}" cy="0" r="${s * 0.07}" fill="#2a3340"/><circle cx="${s * 0.1}" cy="0" r="${s * 0.07}" fill="#2a3340"/>`;
                case 'carrot':
                    return `<polygon points="${-s * 0.18},${s * 0.08} ${s * 0.2},0 ${-s * 0.18},${-s * 0.1}" fill="#ff9f39" stroke="#c56f18" stroke-width="2"/>`;
                case 'hat':
                    return `<rect x="${-s * 0.24}" y="${-s * 0.03}" width="${s * 0.48}" height="${s * 0.08}" fill="#2f3744"/>
                        <rect x="${-s * 0.14}" y="${-s * 0.22}" width="${s * 0.28}" height="${s * 0.19}" fill="#2f3744"/>`;
                case 'dig':
                    return `<rect x="${s * 0.02}" y="${-s * 0.25}" width="${s * 0.06}" height="${s * 0.5}" rx="${s * 0.03}" fill="#9f7f54"/>
                        <path d="M${-s * 0.22} ${s * 0.04} L${s * 0.02} ${-s * 0.1} L${s * 0.1} ${s * 0.02} L${-s * 0.14} ${s * 0.16} Z" fill="#8d6e63" stroke="#5d4037" stroke-width="2"/>`;
                case 'seed':
                    return `<ellipse cx="0" cy="${s * 0.02}" rx="${s * 0.12}" ry="${s * 0.08}" fill="#7f5f3f" stroke="#5d4037" stroke-width="2"/>`;
                case 'soil':
                    return `<ellipse cx="0" cy="${s * 0.08}" rx="${s * 0.24}" ry="${s * 0.11}" fill="#8d6e63" stroke="#5d4037" stroke-width="2"/>`;
                case 'water':
                    return `<path d="M0 ${-s * 0.26} Q${s * 0.18} ${-s * 0.04} 0 ${s * 0.22} Q${-s * 0.18} ${-s * 0.04} 0 ${-s * 0.26} Z" fill="#6ec7ef" stroke="#3788b4" stroke-width="2"/>`;
                case 'sun':
                    return `<circle r="${s * 0.18}" fill="#ffe277" stroke="#efb83d" stroke-width="2"/>
                        <line x1="0" y1="${-s * 0.34}" x2="0" y2="${-s * 0.24}" stroke="#efb83d" stroke-width="2"/>
                        <line x1="${s * 0.34}" y1="0" x2="${s * 0.24}" y2="0" stroke="#efb83d" stroke-width="2"/>
                        <line x1="0" y1="${s * 0.34}" x2="0" y2="${s * 0.24}" stroke="#efb83d" stroke-width="2"/>
                        <line x1="${-s * 0.34}" y1="0" x2="${-s * 0.24}" y2="0" stroke="#efb83d" stroke-width="2"/>`;
                case 'flower':
                    return `<circle r="${s * 0.08}" fill="#ffd75a" stroke="#c8942f" stroke-width="1.6"/>
                        <circle cx="0" cy="${-s * 0.18}" r="${s * 0.09}" fill="#ff6fa3"/><circle cx="${s * 0.16}" cy="${-s * 0.05}" r="${s * 0.09}" fill="#ff6fa3"/>
                        <circle cx="${s * 0.1}" cy="${s * 0.14}" r="${s * 0.09}" fill="#ff6fa3"/><circle cx="${-s * 0.1}" cy="${s * 0.14}" r="${s * 0.09}" fill="#ff6fa3"/>
                        <circle cx="${-s * 0.16}" cy="${-s * 0.05}" r="${s * 0.09}" fill="#ff6fa3"/>`;
                case 'sandwich':
                    return `<rect x="${-s * 0.26}" y="${-s * 0.1}" width="${s * 0.52}" height="${s * 0.1}" rx="${s * 0.04}" fill="#efc987" stroke="#9f7d4e" stroke-width="1.8"/>
                        <rect x="${-s * 0.24}" y="0" width="${s * 0.48}" height="${s * 0.06}" rx="${s * 0.03}" fill="#ffd95d"/>
                        <rect x="${-s * 0.24}" y="${s * 0.06}" width="${s * 0.48}" height="${s * 0.05}" rx="${s * 0.02}" fill="#95d364"/>
                        <rect x="${-s * 0.24}" y="${s * 0.11}" width="${s * 0.48}" height="${s * 0.06}" rx="${s * 0.03}" fill="#f05151"/>
                        <rect x="${-s * 0.26}" y="${s * 0.17}" width="${s * 0.52}" height="${s * 0.1}" rx="${s * 0.04}" fill="#efc987" stroke="#9f7d4e" stroke-width="1.8"/>`;
                case 'pizza':
                    return `<path d="M${-s * 0.24} ${s * 0.2} L0 ${-s * 0.24} L${s * 0.24} ${s * 0.2} Z" fill="#ffd95d" stroke="#c78b39" stroke-width="2"/>
                        <path d="M${-s * 0.24} ${s * 0.2} Q0 ${s * 0.3} ${s * 0.24} ${s * 0.2}" fill="none" stroke="#d67b1f" stroke-width="3"/>
                        <circle cx="${-s * 0.06}" cy="${s * 0.02}" r="${s * 0.04}" fill="#f05151"/>
                        <circle cx="${s * 0.07}" cy="${s * 0.08}" r="${s * 0.04}" fill="#f05151"/>`;
                case 'car':
                    return `<rect x="${-s * 0.26}" y="${-s * 0.02}" width="${s * 0.52}" height="${s * 0.18}" rx="${s * 0.06}" fill="#7db8ff" stroke="${stroke}" stroke-width="2"/>
                        <rect x="${-s * 0.14}" y="${-s * 0.14}" width="${s * 0.28}" height="${s * 0.12}" rx="${s * 0.04}" fill="#dff0ff" stroke="${stroke}" stroke-width="1.6"/>
                        <circle cx="${-s * 0.14}" cy="${s * 0.2}" r="${s * 0.06}" fill="#2f3744"/><circle cx="${s * 0.14}" cy="${s * 0.2}" r="${s * 0.06}" fill="#2f3744"/>`;
                case 'book':
                    return `<path d="M${-s * 0.24} ${-s * 0.2} L${-s * 0.02} ${-s * 0.14} L${-s * 0.02} ${s * 0.2} L${-s * 0.24} ${s * 0.14} Z" fill="#dce9ff" stroke="${stroke}" stroke-width="2"/>
                        <path d="M${s * 0.24} ${-s * 0.2} L${s * 0.02} ${-s * 0.14} L${s * 0.02} ${s * 0.2} L${s * 0.24} ${s * 0.14} Z" fill="#dce9ff" stroke="${stroke}" stroke-width="2"/>`;
                case 'museum':
                    return `<polygon points="${-s * 0.28},${-s * 0.08} 0,${-s * 0.28} ${s * 0.28},${-s * 0.08}" fill="#dbe6f4" stroke="${stroke}" stroke-width="2"/>
                        <rect x="${-s * 0.24}" y="${-s * 0.08}" width="${s * 0.48}" height="${s * 0.3}" fill="#eef4ff" stroke="${stroke}" stroke-width="2"/>
                        <rect x="${-s * 0.16}" y="0" width="${s * 0.06}" height="${s * 0.22}" fill="#fff" stroke="${stroke}" stroke-width="1.5"/>
                        <rect x="${s * 0.1}" y="0" width="${s * 0.06}" height="${s * 0.22}" fill="#fff" stroke="${stroke}" stroke-width="1.5"/>`;
                case 'robot':
                    return `<rect x="${-s * 0.2}" y="${-s * 0.18}" width="${s * 0.4}" height="${s * 0.32}" rx="${s * 0.06}" fill="#dfe9f6" stroke="${stroke}" stroke-width="2"/>
                        <circle cx="${-s * 0.08}" cy="${-s * 0.05}" r="${s * 0.04}" fill="#4f95ff"/><circle cx="${s * 0.08}" cy="${-s * 0.05}" r="${s * 0.04}" fill="#4f95ff"/>
                        <line x1="0" y1="${-s * 0.18}" x2="0" y2="${-s * 0.28}" stroke="${stroke}" stroke-width="2"/><circle cx="0" cy="${-s * 0.3}" r="${s * 0.03}" fill="#ff8a65"/>`;
                case 'rocket':
                    return `<path d="M0 ${-s * 0.28} Q${s * 0.18} ${-s * 0.08} 0 ${s * 0.22} Q${-s * 0.18} ${-s * 0.08} 0 ${-s * 0.28} Z" fill="#a8c7ff" stroke="${stroke}" stroke-width="2"/>
                        <circle cx="0" cy="${-s * 0.08}" r="${s * 0.05}" fill="#fff" stroke="${stroke}" stroke-width="1.5"/>
                        <path d="M${-s * 0.08} ${s * 0.18} L0 ${s * 0.32} L${s * 0.08} ${s * 0.18}" fill="#ff8a65"/>`;
                case 'weather':
                    return `<circle cx="${-s * 0.07}" cy="${-s * 0.08}" r="${s * 0.12}" fill="#ffe277" stroke="#efb83d" stroke-width="2"/>
                        <ellipse cx="${s * 0.05}" cy="${s * 0.02}" rx="${s * 0.2}" ry="${s * 0.11}" fill="#eef4ff" stroke="${stroke}" stroke-width="2"/>`;
                case 'party':
                    return `<path d="M${-s * 0.14} ${s * 0.22} L0 ${-s * 0.24} L${s * 0.14} ${s * 0.22} Z" fill="#ff9ac0" stroke="${stroke}" stroke-width="2"/>
                        <circle cx="${-s * 0.22}" cy="${-s * 0.1}" r="${s * 0.03}" fill="#ffd95d"/><circle cx="${s * 0.22}" cy="${-s * 0.03}" r="${s * 0.03}" fill="#7dd67a"/>`;
                case 'camp':
                    return `<polygon points="${-s * 0.24},${s * 0.2} 0,${-s * 0.22} ${s * 0.24},${s * 0.2}" fill="#7db8ff" stroke="${stroke}" stroke-width="2"/>
                        <line x1="0" y1="${-s * 0.22}" x2="0" y2="${s * 0.2}" stroke="${stroke}" stroke-width="1.8"/>`;
                case 'science':
                    return `<path d="M${-s * 0.1} ${-s * 0.2} L${s * 0.1} ${-s * 0.2} L${s * 0.04} ${s * 0.02} Q${s * 0.2} ${s * 0.18} 0 ${s * 0.24} Q${-s * 0.2} ${s * 0.18} ${-s * 0.04} ${s * 0.02} Z" fill="#b8e2ff" stroke="${stroke}" stroke-width="2"/>`;
                case 'morning':
                    return `<circle cx="${-s * 0.04}" cy="${-s * 0.02}" r="${s * 0.16}" fill="#ffe277" stroke="#efb83d" stroke-width="2"/>
                        <path d="M${-s * 0.26} ${s * 0.2} Q0 ${s * 0.05} ${s * 0.26} ${s * 0.2}" fill="none" stroke="${stroke}" stroke-width="2"/>`;
                case 'move':
                    return `<path d="M${-s * 0.12} ${-s * 0.1} L${s * 0.1} ${-s * 0.1} L${s * 0.1} ${-s * 0.18} L${s * 0.24} 0 L${s * 0.1} ${s * 0.18} L${s * 0.1} ${s * 0.1} L${-s * 0.12} ${s * 0.1} Z" fill="#9fc2ff" stroke="${stroke}" stroke-width="2"/>`;
                case 'repeat':
                    return `<path d="M${-s * 0.2} ${-s * 0.05} A${s * 0.19} ${s * 0.19} 0 1 1 ${s * 0.08} ${-s * 0.22}" fill="none" stroke="#5b7ed0" stroke-width="3"/>
                        <polygon points="${s * 0.05},${-s * 0.26} ${s * 0.21},${-s * 0.22} ${s * 0.08},${-s * 0.11}" fill="#5b7ed0"/>`;
                case 'map':
                    return `<path d="M${-s * 0.24} ${-s * 0.2} L${-s * 0.06} ${-s * 0.24} L${s * 0.06} ${-s * 0.12} L${s * 0.24} ${-s * 0.16} L${s * 0.24} ${s * 0.22} L${s * 0.06} ${s * 0.26} L${-s * 0.06} ${s * 0.14} L${-s * 0.24} ${s * 0.18} Z" fill="#dcf2df" stroke="${stroke}" stroke-width="2"/>
                        <circle cx="${s * 0.02}" cy="${s * 0.02}" r="${s * 0.045}" fill="#ff6f61"/>`;
                case 'camera':
                    return `<rect x="${-s * 0.24}" y="${-s * 0.1}" width="${s * 0.48}" height="${s * 0.32}" rx="${s * 0.06}" fill="#dce9ff" stroke="${stroke}" stroke-width="2"/>
                        <circle cx="0" cy="${s * 0.06}" r="${s * 0.09}" fill="#ffffff" stroke="${stroke}" stroke-width="2"/>
                        <rect x="${-s * 0.14}" y="${-s * 0.17}" width="${s * 0.12}" height="${s * 0.08}" rx="${s * 0.02}" fill="#8fb3f0"/>`;
                case 'treasure':
                    return `<rect x="${-s * 0.22}" y="${-s * 0.02}" width="${s * 0.44}" height="${s * 0.24}" rx="${s * 0.05}" fill="#f6b24c" stroke="#9a6421" stroke-width="2"/>
                        <path d="M${-s * 0.22} ${-s * 0.02} Q0 ${-s * 0.22} ${s * 0.22} ${-s * 0.02}" fill="#ffd67a" stroke="#9a6421" stroke-width="2"/>
                        <rect x="${-s * 0.03}" y="${s * 0.03}" width="${s * 0.06}" height="${s * 0.12}" fill="#8a5f24"/>`;
                case 'calendar':
                    return `<rect x="${-s * 0.2}" y="${-s * 0.18}" width="${s * 0.4}" height="${s * 0.4}" rx="${s * 0.06}" fill="#ffffff" stroke="${stroke}" stroke-width="2"/>
                        <rect x="${-s * 0.2}" y="${-s * 0.18}" width="${s * 0.4}" height="${s * 0.11}" fill="#ff9ab5" stroke="${stroke}" stroke-width="2"/>
                        <circle cx="${-s * 0.1}" cy="${s * 0.03}" r="${s * 0.03}" fill="#5b7ed0"/><circle cx="0" cy="${s * 0.03}" r="${s * 0.03}" fill="#5b7ed0"/>
                        <circle cx="${s * 0.1}" cy="${s * 0.03}" r="${s * 0.03}" fill="#5b7ed0"/>`;
                default:
                    return `<circle r="${s * 0.24}" fill="#f2f7ff" stroke="${stroke}" stroke-width="2"/>
                        <circle r="${s * 0.07}" fill="#9db9e3"/>`;
            }
        })();

        return `${commonWrapStart}${iconBackdrop}${icon}${commonWrapEnd}`;
    }

    function buildSequencingSteps(challenge) {
        const blocksById = new Map((challenge?.blocks || []).map((block) => [block.id, block]));
        const fromSolution = Array.isArray(challenge?.solution) && challenge.solution.length
            ? challenge.solution.map((id, index) => {
                const block = blocksById.get(id) || {};
                const text = block.text || id.split('-').map(capitalizeFirstLetter).join(' ');
                return {
                    stepNo: index + 1,
                    text,
                    icon: block.icon || resolveBlockIcon(block),
                    id
                };
            })
            : [];

        if (fromSolution.length) {
            return fromSolution;
        }

        return (challenge?.blocks || []).map((block, index) => ({
            stepNo: index + 1,
            text: block.text || `Step ${index + 1}`,
            icon: block.icon || resolveBlockIcon(block),
            id: block.id
        }));
    }

    function buildSequencingGuideDataUrl(challenge) {
        const steps = buildSequencingSteps(challenge);
        const total = steps.length || 1;
        const orderSlots = Array.from({ length: total }, (_, i) => i);
        shuffleArray(orderSlots);
        const useLargeSequenceLayout = total <= 6;
        const startVisualKey = getSequencingVisualKey(steps[0] || 'start');
        const missionVisualKey = getSequencingMissionVisualKey(challenge, steps);
        const missionText = escapeSvgText(truncateSvgText(challenge?.goal || 'Put the steps in correct order to finish the mission.', 88));
        const missionPreviewHref = escapeSvgText(resolveAssetUrlForSvg(challenge?.previewImage || challenge?.image));

        const stepsPanel = { x: 34, y: 126, w: 520, h: 438 };
        const previewPanel = { x: 566, y: 126, w: 200, h: 438 };

        const cols = useLargeSequenceLayout ? 2 : (total <= 9 ? 3 : 4);
        const rows = Math.ceil(total / cols);
        const gapX = 14;
        const gapY = useLargeSequenceLayout ? 10 : 12;
        const cardAreaX = stepsPanel.x + 16;
        const cardAreaY = stepsPanel.y + 72;
        const cardAreaW = stepsPanel.w - 32;
        const cardAreaH = stepsPanel.h - 88;
        const cardW = Math.floor((cardAreaW - ((cols - 1) * gapX)) / cols);
        const cardH = Math.max(useLargeSequenceLayout ? 126 : 104, Math.floor((cardAreaH - ((rows - 1) * gapY)) / rows));
        const palette = [
            { bg: '#eaf3ff', stroke: '#a8c4ea', badge: '#4f95ff', text: '#2f5d95' },
            { bg: '#f2ffec', stroke: '#b5dba2', badge: '#58b668', text: '#2f7b42' },
            { bg: '#fff7ea', stroke: '#e2c48a', badge: '#f0a54a', text: '#8a5f24' },
            { bg: '#f2f4ff', stroke: '#bec3ee', badge: '#7b7fe6', text: '#4f56a7' },
            { bg: '#fff0f0', stroke: '#e0a1a1', badge: '#f45e5e', text: '#8a3030' },
            { bg: '#fffce8', stroke: '#e0d29e', badge: '#f4c84f', text: '#8a7127' }
        ];

        let clipDefs = `<clipPath id="mission-preview-clip"><rect x="${previewPanel.x + 12}" y="${previewPanel.y + 74}" width="${previewPanel.w - 24}" height="${previewPanel.h - 102}" rx="14"/></clipPath>`;
        let cardsSvg = '';
        steps.forEach((step, idx) => {
            const slot = orderSlots[idx];
            const row = Math.floor(slot / cols);
            const col = slot % cols;
            const x = cardAreaX + (col * (cardW + gapX));
            const y = cardAreaY + (row * (cardH + gapY));
            const theme = palette[idx % palette.length];
            const visualKey = getSequencingVisualKey(step, step.icon);
            const iconCenterX = x + (useLargeSequenceLayout ? 78 : 56);
            const iconSize = useLargeSequenceLayout ? 66 : 40;
            const textAreaX = x + (useLargeSequenceLayout ? 156 : 94);
            const textAreaW = Math.max(useLargeSequenceLayout ? 120 : 86, cardW - (useLargeSequenceLayout ? 170 : 106));
            const textStartX = textAreaX + 2;
            const textMaxChars = Math.max(9, Math.floor(textAreaW / 7.6));
            const lines = wrapSvgText(step.text, textMaxChars, useLargeSequenceLayout ? 2 : 3).map(escapeSvgText);
            const textFont = useLargeSequenceLayout ? 17 : (cardW < 190 ? 12 : 13);
            const lineHeight = textFont + 4;
            const textBlockHeight = lineHeight * lines.length;
            const textY = y + Math.floor((cardH - textBlockHeight) / 2) + textFont;
            const clipId = `mix-card-clip-${idx}`;

            const tspans = lines.map((line, lineIdx) => (
                `<tspan x="${textStartX}" dy="${lineIdx === 0 ? 0 : lineHeight}">${line}</tspan>`
            )).join('');

            clipDefs += `<clipPath id="${clipId}"><rect x="${textAreaX}" y="${y + 10}" width="${textAreaW}" height="${cardH - 20}" rx="6"/></clipPath>`;

            cardsSvg += `
                <g>
                    <rect x="${x}" y="${y}" width="${cardW}" height="${cardH}" rx="14" fill="${theme.bg}" stroke="${theme.stroke}" stroke-width="2"/>
                    <circle cx="${x + 24}" cy="${y + 24}" r="15" fill="${theme.badge}"/>
                    <text x="${x + 24}" y="${y + 30}" font-size="18" font-weight="900" text-anchor="middle" fill="#ffffff">${step.stepNo}</text>
                    ${buildSequencingIconSvg(visualKey, iconCenterX, y + Math.floor(cardH / 2), iconSize)}
                    <text x="${textStartX}" y="${textY}" font-size="${textFont}" font-weight="900" text-anchor="start" fill="${theme.text}" clip-path="url(#${clipId})">${tspans}</text>
                </g>
            `;
        });

        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
                <defs>${clipDefs}</defs>
                <rect width="800" height="600" fill="#eef8ff"/>
                <rect x="28" y="24" width="744" height="84" rx="20" fill="#4f8bff"/>
                <text x="400" y="73" font-size="40" font-weight="900" text-anchor="middle" fill="#ffffff">${escapeSvgText(challenge?.title || 'Sequence Puzzle')}</text>
                <line x1="195" y1="83" x2="605" y2="83" stroke="#d3e5ff" stroke-width="3" stroke-linecap="round"/>
                <polygon points="605,83 593,78 593,88" fill="#d3e5ff"/>
                ${buildSequencingIconSvg(startVisualKey, 172, 83, 22)}
                ${buildSequencingIconSvg(missionVisualKey, 628, 83, 22)}
                <text x="172" y="106" font-size="11" font-weight="800" text-anchor="middle" fill="#eaf4ff">Start</text>
                <text x="628" y="106" font-size="11" font-weight="800" text-anchor="middle" fill="#eaf4ff">Target</text>
                <text x="400" y="96" font-size="16" font-weight="700" text-anchor="middle" fill="#eaf4ff">Goal: ${missionText}</text>
                <rect x="${stepsPanel.x}" y="${stepsPanel.y}" width="${stepsPanel.w}" height="${stepsPanel.h}" rx="18" fill="#ffffff" stroke="#2f5d95" stroke-width="4"/>
                <rect x="${stepsPanel.x}" y="${stepsPanel.y}" width="${stepsPanel.w}" height="56" rx="16" fill="#eaf3ff"/>
                <text x="${stepsPanel.x + (stepsPanel.w / 2)}" y="${stepsPanel.y + 37}" font-size="24" font-weight="900" text-anchor="middle" fill="#2d578d">Mixed Steps</text>
                ${cardsSvg}
                <rect x="${previewPanel.x}" y="${previewPanel.y}" width="${previewPanel.w}" height="${previewPanel.h}" rx="18" fill="#ffffff" stroke="#2f5d95" stroke-width="4"/>
                <rect x="${previewPanel.x}" y="${previewPanel.y}" width="${previewPanel.w}" height="56" rx="16" fill="#ecfff4"/>
                <text x="${previewPanel.x + (previewPanel.w / 2)}" y="${previewPanel.y + 37}" font-size="20" font-weight="900" text-anchor="middle" fill="#2f7d53">Mission Preview</text>
                <rect x="${previewPanel.x + 12}" y="${previewPanel.y + 74}" width="${previewPanel.w - 24}" height="${previewPanel.h - 102}" rx="14" fill="#f7fbff" stroke="#b9d0ef" stroke-width="2"/>
                ${missionPreviewHref
                    ? `<image href="${missionPreviewHref}" x="${previewPanel.x + 12}" y="${previewPanel.y + 74}" width="${previewPanel.w - 24}" height="${previewPanel.h - 102}" preserveAspectRatio="xMidYMid meet" clip-path="url(#mission-preview-clip)"/>`
                    : buildSequencingIconSvg(missionVisualKey, previewPanel.x + (previewPanel.w / 2), previewPanel.y + 246, 92)}
                <text x="${previewPanel.x + (previewPanel.w / 2)}" y="${previewPanel.y + previewPanel.h - 10}" font-size="13" font-weight="800" text-anchor="middle" fill="#4f6f94">Build this final picture</text>
            </svg>
        `;

        return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    }

    function setChallengeImage(challenge) {
        challengeImage.alt = challenge.title;
        const baseName = `${currentCategory}-${currentLevel}`;
        const useMissionStoryPilot = isMissionStoryPilotActive(challenge);
        const useDirectSequencingImage = currentCategory === 'sequencing' && Boolean(challenge?.useDirectImage);
        const transparentPixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
        const candidates = currentCategory === 'sequencing'
            ? (useMissionStoryPilot
                ? [
                    transparentPixel
                ]
                : (useDirectSequencingImage
                    ? [
                        challenge.previewImage || challenge.image,
                        './images/image-error.svg'
                    ]
                    : [
                    buildSequencingGuideDataUrl(challenge),
                    challenge.previewImage || challenge.image,
                    './images/image-error.svg'
                    ]))
            : [
                `./images-real/${baseName}.png`,
                `./images-real/${baseName}.jpg`,
                `./images-real/${baseName}.jpeg`,
                `./images-real/${baseName}.webp`,
                `./images-real/${baseName}.svg`,
                challenge.previewImage || challenge.image,
                './images/image-error.svg'
            ];

        const withCacheVersion = (src) => {
            if (!src) return src;
            if (src.startsWith('data:')) return src;
            const joiner = src.includes('?') ? '&' : '?';
            return `${src}${joiner}v=${IMAGE_CACHE_VERSION}`;
        };

        const tryNext = (index) => {
            if (index >= candidates.length) return;
            challengeImage.onerror = () => tryNext(index + 1);
            challengeImage.src = withCacheVersion(candidates[index]);
        };

        tryNext(0);
    }

    function setLevelsCollapsed(collapsed) {
        if (!levelsColumnEl || !levelsToggleBtn) {
            return;
        }

        levelsColumnEl.classList.toggle('collapsed', collapsed);
        if (codingStageEl) {
            codingStageEl.classList.toggle('levels-collapsed', collapsed);
        }

        levelsToggleBtn.setAttribute('aria-expanded', String(!collapsed));
        levelsToggleBtn.setAttribute('aria-label', collapsed ? 'Show levels panel' : 'Hide levels panel');
        const icon = levelsToggleBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-chevron-right', !collapsed);
            icon.classList.toggle('fa-chevron-left', collapsed);
        }
    }

    function addBlockToDustbin(blockElement) {
        if (!deleteBin) {
            return;
        }

        deleteBin.classList.add('active', 'drop-success');
        setTimeout(() => {
            deleteBin.classList.remove('drop-success');
        }, 420);
        setTimeout(() => {
            deleteBin.classList.remove('active');
        }, 700);
    }

    function renderLevelRail() {
        if (!levelsPanel || !challenges[currentCategory]) {
            return;
        }

        const levelNumbers = Object.keys(challenges[currentCategory])
            .map((value) => Number(value))
            .filter((value) => Number.isFinite(value))
            .sort((a, b) => a - b);

        levelsPanel.innerHTML = '';
        levelNumbers.forEach((levelNo) => {
            const levelChallenge = challenges[currentCategory][levelNo];
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `level-rail-btn${levelNo === currentLevel ? ' active' : ''}`;
            button.textContent = levelChallenge.title;
            button.title = levelChallenge.title;
            button.addEventListener('click', () => {
                currentLevel = levelNo;
                loadChallenge();
                updateUI();
            });
            levelsPanel.appendChild(button);
        });
    }

    function getBlockPalette(type) {
        const palettes = {
            motion: { top: '#58b8ff', bottom: '#3f82ff', border: '#2f61cc' },
            loop: { top: '#ff89c9', bottom: '#ff5ea4', border: '#d43f7f' },
            conditions: { top: '#ffc96b', bottom: '#ff9f43', border: '#d67b1f' },
            procedures: { top: '#ad8cff', bottom: '#7d64ff', border: '#5a46d2' },
            procedure: { top: '#ad8cff', bottom: '#7d64ff', border: '#5a46d2' },
            define: { top: '#8e9bff', bottom: '#6878ff', border: '#4554cf' },
            action: { top: '#58d5d2', bottom: '#29b8b4', border: '#1d8a86' },
            call: { top: '#ff9ab5', bottom: '#ff6f99', border: '#d24e78' },
            sensor: { top: '#64d6a5', bottom: '#3bbf86', border: '#279767' },
            control: { top: '#ffe07a', bottom: '#f9c74f', border: '#cf9e2b' }
        };

        return palettes[type] || { top: '#66c2ff', bottom: '#4aa3ff', border: '#2c7fd3' };
    }

    function normalizeIconName(iconName) {
        const raw = String(iconName || '').trim().toLowerCase();
        if (!raw) return '';
        const aliases = {
            tshirt: 'shirt',
            'hand-paper': 'hand',
            tint: 'droplet',
            running: 'person-running',
            'ticket-alt': 'ticket',
            'question-circle': 'circle-question',
            'times-circle': 'circle-xmark',
            home: 'house',
            'sliders-h': 'sliders',
            'apple-alt': 'apple-whole',
            'play-circle': 'circle-play',
            mountains: 'mountain',
            fill: 'droplet',
            sparkles: 'wand-magic-sparkles',
            'eye-dropper': 'droplet',
            cut: 'scissors',
            'dot-circle': 'circle-dot',
            building: 'building',
            school: 'school',
            bag: 'briefcase'
        };
        return aliases[raw] || raw;
    }

    function pickSupportedIcon(iconName) {
        const normalized = normalizeIconName(iconName);
        if (SAFE_BLOCK_ICONS.has(normalized)) {
            return normalized;
        }
        return '';
    }

    function resolveBlockIcon(block) {
        if (
            block?.id === 'pick-up' &&
            currentCategory === 'sequencing' &&
            SEQUENCING_GEM_PICKUP_LEVELS.has(currentLevel)
        ) {
            return 'gem';
        }

        const explicitIcon = pickSupportedIcon(block?.icon);
        if (explicitIcon) {
            return explicitIcon;
        }

        const source = `${block.id || ''} ${block.text || ''}`.toLowerCase();
        const keywordIcons = [
            { keys: ['forward', 'move'], icon: 'arrow-up' },
            { keys: ['left'], icon: 'arrow-left' },
            { keys: ['right'], icon: 'arrow-right' },
            { keys: ['turn'], icon: 'redo' },
            { keys: ['repeat', 'loop'], icon: 'redo' },
            { keys: ['if', 'condition'], icon: 'code-branch' },
            { keys: ['define', 'procedure'], icon: 'cubes' },
            { keys: ['run', 'call'], icon: 'play' },
            { keys: ['pick', 'collect', 'grab'], icon: 'hand' },
            { keys: ['treasure', 'gem'], icon: 'gem' },
            { keys: ['robot'], icon: 'robot' },
            { keys: ['school'], icon: 'school' },
            { keys: ['book', 'library'], icon: 'book-open' },
            { keys: ['museum'], icon: 'landmark' },
            { keys: ['pizza'], icon: 'pizza-slice' },
            { keys: ['bread'], icon: 'bread-slice' },
            { keys: ['cheese'], icon: 'cheese' },
            { keys: ['lettuce', 'leaf'], icon: 'leaf' },
            { keys: ['tomato'], icon: 'apple-whole' },
            { keys: ['cut', 'knife'], icon: 'scissors' },
            { keys: ['sandwich', 'breakfast', 'eat', 'food', 'cook'], icon: 'utensils' },
            { keys: ['brush', 'tooth'], icon: 'tooth' },
            { keys: ['dress', 'shirt', 'clothes'], icon: 'shirt' },
            { keys: ['bag', 'pack', 'backpack'], icon: 'backpack' },
            { keys: ['rain', 'rainy'], icon: 'cloud-rain' },
            { keys: ['sun', 'sunny'], icon: 'sun' },
            { keys: ['weather', 'forecast'], icon: 'cloud-sun' },
            { keys: ['plant', 'seed', 'flower', 'garden'], icon: 'seedling' },
            { keys: ['dig', 'hole', 'shovel'], icon: 'shovel' },
            { keys: ['soil'], icon: 'mountain' },
            { keys: ['grow'], icon: 'seedling' },
            { keys: ['water'], icon: 'droplet' },
            { keys: ['tree'], icon: 'tree' },
            { keys: ['snow'], icon: 'snowflake' },
            { keys: ['dance', 'music', 'beat'], icon: 'music' },
            { keys: ['jump'], icon: 'person-running' },
            { keys: ['car', 'vehicle'], icon: 'car' },
            { keys: ['traffic'], icon: 'traffic-light' },
            { keys: ['science', 'experiment'], icon: 'flask' },
            { keys: ['map', 'path', 'maze'], icon: 'map' },
            { keys: ['photo', 'camera'], icon: 'camera' },
            { keys: ['ticket'], icon: 'ticket' },
            { keys: ['count', 'number', 'math'], icon: 'calculator' },
            { keys: ['quiz'], icon: 'circle-question' },
            { keys: ['color', 'paint'], icon: 'palette' },
            { keys: ['home', 'smart'], icon: 'house' },
            { keys: ['space', 'rocket', 'orbit', 'launch'], icon: 'rocket' },
            { keys: ['light'], icon: 'lightbulb' },
            { keys: ['check'], icon: 'check-circle' },
            { keys: ['error', 'wrong'], icon: 'circle-xmark' }
        ];

        for (const rule of keywordIcons) {
            if (rule.keys.some((key) => source.includes(key))) {
                return rule.icon;
            }
        }

        const typeFallback = {
            motion: 'arrow-right',
            loop: 'rotate',
            conditions: 'code-branch',
            procedures: 'cubes',
            procedure: 'cubes',
            define: 'cubes',
            action: 'bolt',
            call: 'play',
            sensor: 'eye',
            control: 'sliders'
        };
        return typeFallback[block.type] || 'puzzle-piece';
    }

    function isRepeatBlockIdentifier(blockId) {
        const id = String(blockId || '');
        return id === 'repeat-custom' || /^repeat(?:-custom)?-\d+$/.test(id);
    }

    function getRepeatCountFromId(blockId) {
        const id = String(blockId || '');
        const match = id.match(/^repeat(?:-custom)?-(\d+)$/);
        if (!match) return 0;
        const count = Number(match[1]);
        if (!Number.isFinite(count)) return 0;
        return Math.max(1, Math.min(12, Math.floor(count)));
    }

    function buildRepeatExecutionId(count) {
        const safeCount = Math.max(1, Math.min(12, Math.floor(Number(count) || 2)));
        return `repeat-custom-${safeCount}`;
    }

    function setRepeatBlockCount(blockElement, repeatCount, updateLabel = true) {
        if (!blockElement || !isRepeatBlockIdentifier(blockElement.dataset.baseId || blockElement.dataset.id)) {
            return;
        }

        const safeCount = Math.max(1, Math.min(12, Math.floor(Number(repeatCount) || 2)));
        blockElement.dataset.repeatCount = String(safeCount);
        blockElement.dataset.id = buildRepeatExecutionId(safeCount);

        if (updateLabel) {
            const labelEl = blockElement.querySelector('.block-label');
            if (labelEl) {
                labelEl.textContent = `Repeat ${safeCount}`;
            }
        }
    }

    function ensureRepeatCountControl(blockElement) {
        if (!blockElement || !isRepeatBlockIdentifier(blockElement.dataset.baseId || blockElement.dataset.id)) {
            return;
        }

        const startingCount = Number(blockElement.dataset.repeatCount || getRepeatCountFromId(blockElement.dataset.id) || 2);
        setRepeatBlockCount(blockElement, startingCount, true);

        if (blockElement.querySelector('.repeat-count-select')) {
            return;
        }

        const controlWrap = document.createElement('span');
        controlWrap.className = 'repeat-count-wrap';

        const countSelect = document.createElement('select');
        countSelect.className = 'repeat-count-select';
        countSelect.setAttribute('aria-label', 'Repeat count');

        for (let count = 1; count <= 12; count += 1) {
            const option = document.createElement('option');
            option.value = String(count);
            option.textContent = String(count);
            countSelect.appendChild(option);
        }

        countSelect.value = String(Math.max(1, Math.min(12, startingCount)));

        const swallow = (event) => {
            event.stopPropagation();
        };
        countSelect.addEventListener('pointerdown', swallow);
        countSelect.addEventListener('mousedown', swallow);
        countSelect.addEventListener('touchstart', swallow, { passive: true });
        countSelect.addEventListener('click', swallow);

        countSelect.addEventListener('change', () => {
            setRepeatBlockCount(blockElement, Number(countSelect.value), true);
            userBlocks = Array.from(blocksContainer.querySelectorAll('.block')).map(getExecutionBlockIdFromElement);
            resetFeedback();
        });

        controlWrap.appendChild(countSelect);
        blockElement.appendChild(controlWrap);
    }

    function getExecutionBlockIdFromElement(blockElement) {
        if (!blockElement) return '';
        const baseId = String(blockElement.dataset.baseId || blockElement.dataset.id || '');
        if (isRepeatBlockIdentifier(baseId)) {
            const repeatCount = Number(blockElement.dataset.repeatCount || getRepeatCountFromId(blockElement.dataset.id) || 2);
            return buildRepeatExecutionId(repeatCount);
        }
        return String(blockElement.dataset.id || baseId);
    }

    function enhanceWorkspaceBlock(blockElement) {
        if (!blockElement) return;
        if (isRepeatBlockIdentifier(blockElement.dataset.baseId || blockElement.dataset.id)) {
            const defaultRepeat = Number(blockElement.dataset.defaultRepeat || 2);
            if (!blockElement.dataset.repeatCount) {
                blockElement.dataset.repeatCount = String(Math.max(1, Math.min(12, Math.floor(defaultRepeat))));
            }
            ensureRepeatCountControl(blockElement);
            setRepeatBlockCount(blockElement, Number(blockElement.dataset.repeatCount || 2), true);
        }
    }

    function refreshLoopVisualGroups() {
        if (!blocksContainer) return;
        const workspaceBlocks = Array.from(blocksContainer.querySelectorAll('.block'));

        workspaceBlocks.forEach((blockEl) => {
            blockEl.classList.remove('loop-visual-start', 'loop-visual-body');
            const endPill = blockEl.querySelector('.loop-end-pill');
            if (endPill) {
                endPill.remove();
            }
        });

        if (currentCategory !== 'loops') {
            return;
        }

        workspaceBlocks.forEach((blockEl, index) => {
            const executionId = getExecutionBlockIdFromElement(blockEl);
            const repeatCount = getMissionRepeatCount(executionId);
            if (repeatCount <= 0) return;

            blockEl.classList.add('loop-visual-start');
            const nextBlock = workspaceBlocks[index + 1];
            if (!nextBlock) return;

            nextBlock.classList.add('loop-visual-body');
            const endPill = document.createElement('span');
            endPill.className = 'loop-end-pill';
            endPill.textContent = 'End Loop';
            nextBlock.appendChild(endPill);
        });
    }

    function createBlockElement(block, options = {}) {
        const { compactPalette = false, workspaceMode = false } = options;
        const blockElement = document.createElement('div');
        blockElement.className = `block block-${block.type} block-kid`;
        blockElement.dataset.id = block.id;
        blockElement.dataset.baseId = block.id;
        blockElement.draggable = true;
        blockElement.setAttribute('title', block.text);
        blockElement.setAttribute('aria-label', block.text);
        if (compactPalette) {
            blockElement.classList.add('compact-palette-block');
        }
        const palette = getBlockPalette(block.type);
        blockElement.style.setProperty('--block-top', palette.top);
        blockElement.style.setProperty('--block-bottom', palette.bottom);
        blockElement.style.setProperty('--block-border', palette.border);

        const icon = document.createElement('span');
        icon.className = `icon fas fa-${resolveBlockIcon(block)}`;
        blockElement.appendChild(icon);

        const label = document.createElement('span');
        label.className = 'block-label';
        label.textContent = block.text;
        blockElement.appendChild(label);

        if (isRepeatBlockIdentifier(block.id)) {
            const defaultCount = Number(block.defaultRepeat || getRepeatCountFromId(block.id) || 2);
            blockElement.dataset.defaultRepeat = String(Math.max(1, Math.min(12, Math.floor(defaultCount))));
            if (workspaceMode) {
                setRepeatBlockCount(blockElement, defaultCount, true);
                ensureRepeatCountControl(blockElement);
            } else {
                blockElement.dataset.id = 'repeat-custom';
                label.textContent = 'Repeat';
            }
        }
        
        // Add click handler for easier mobile use
        blockElement.addEventListener('click', () => {
            // Only allow clicking blocks in the palette, not ones already in the workspace
            if (blockElement.parentElement === blockPalette) {
                addBlockToWorkspace(block);
            }
        });
        
        return blockElement;
    }
    
    function addBlockToWorkspace(block) {
        const blockElement = createBlockElement(block, { workspaceMode: true });
        blocksContainer.appendChild(blockElement);
        userBlocks.push(getExecutionBlockIdFromElement(blockElement));
        
        // If this is a nested block (like a loop), add a container for nested blocks
        if (block.type === 'conditions' || block.type === 'procedure') {
            const containerElement = document.createElement('div');
            containerElement.className = 'block-container';
            containerElement.dataset.parentId = block.id;
            blocksContainer.appendChild(containerElement);
        }
        
        playSound('click');
        resetFeedback();
        updateWorkspacePlaceholder();
        refreshLoopVisualGroups();
        // Keep the latest added block visible when workspace gets long.
        const scroller = blocksContainer || workspace;
        scroller.scrollTop = scroller.scrollHeight;
    }
    
    function setupDragAndDrop() {
        const keepLatestBlockVisible = () => {
            const scroller = blocksContainer || workspace;
            scroller.scrollTop = scroller.scrollHeight;
        };

        const triggerDropReplaceEffect = () => {
            blocksContainer.classList.remove('drop-replaced');
            void blocksContainer.offsetWidth;
            blocksContainer.classList.add('drop-replaced');
        };

        const syncWorkspaceBlocks = (playDropSound = false) => {
            const workspaceBlocks = Array.from(blocksContainer.querySelectorAll('.block'));
            workspaceBlocks.forEach((blockEl) => {
                enhanceWorkspaceBlock(blockEl);
            });
            userBlocks = workspaceBlocks.map(getExecutionBlockIdFromElement);
            resetFeedback();
            updateWorkspacePlaceholder();
            refreshLoopVisualGroups();
            triggerDropReplaceEffect();
            if (playDropSound) {
                playSound('click');
            }
            keepLatestBlockVisible();
        };

        new Sortable(blockPalette, {
            group: {
                name: 'workspace',
                pull: 'clone',
                put: false
            },
            animation: 150,
            sort: false,
            ghostClass: 'block-placeholder',
            onStart: () => {
                blocksContainer.classList.add('drop-active');
            },
            onEnd: () => {
                blocksContainer.classList.remove('drop-active');
            }
        });

        new Sortable(blocksContainer, {
            group: {
                name: 'workspace',
                pull: true,
                put: true
            },
            animation: 150,
            scroll: true,
            bubbleScroll: true,
            scrollSensitivity: 64,
            scrollSpeed: 14,
            ghostClass: 'block-placeholder',
            onAdd: () => syncWorkspaceBlocks(true),
            onUpdate: () => syncWorkspaceBlocks(true),
            onSort: () => syncWorkspaceBlocks(false),
            onStart: () => {
                blocksContainer.classList.add('drop-active');
            },
            onEnd: () => {
                blocksContainer.classList.remove('drop-active');
            }
        });

        if (deleteBin) {
            new Sortable(deleteBin, {
                group: {
                    name: 'workspace',
                    pull: false,
                    put: true
                },
                animation: 120,
                onAdd: (event) => {
                    const removedBlock = event.item;
                    addBlockToDustbin(removedBlock);
                    removedBlock.remove();
                    userBlocks = Array.from(blocksContainer.querySelectorAll('.block')).map(getExecutionBlockIdFromElement);
                    resetFeedback();
                    updateWorkspacePlaceholder();
                    refreshLoopVisualGroups();
                    playSound('click');
                },
                onMove: () => {
                    deleteBin.classList.add('active');
                    return true;
                },
                onEnd: () => {
                    deleteBin.classList.remove('active');
                }
            });
        }
    }

    function openOutputModal() {
        if (!outputModalEl) {
            return;
        }

        try {
            if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
                if (!outputModalInstance) {
                    outputModalInstance = new bootstrap.Modal(outputModalEl);
                }
                outputModalInstance.show();
            } else {
                outputModalEl.style.display = 'block';
                outputModalEl.classList.add('show');
                outputModalEl.removeAttribute('aria-hidden');
            }
        } catch (error) {
            console.warn('Could not open output modal:', error);
        }
    }

    function hideOutputModal() {
        if (!outputModalEl) {
            return;
        }

        try {
            if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
                if (!outputModalInstance) {
                    outputModalInstance = new bootstrap.Modal(outputModalEl);
                }
                outputModalInstance.hide();
            } else {
                outputModalEl.style.display = 'none';
                outputModalEl.classList.remove('show');
                outputModalEl.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('modal-open');
                document.querySelector('.modal-backdrop')?.remove();
            }
        } catch (error) {
            console.warn('Could not hide output modal:', error);
        }
    }

    function setRunModalCheckState(isReady, message, tone = 'ready') {
        runReadyForCheck = Boolean(isReady);
        if (runModalCheckBtn) {
            runModalCheckBtn.disabled = !runReadyForCheck;
        }
        if (!runModalStatusEl) {
            return;
        }

        runModalStatusEl.classList.remove('status-ready', 'status-error', 'status-running');
        const toneClass = tone === 'error' ? 'status-error' : tone === 'running' ? 'status-running' : 'status-ready';
        runModalStatusEl.classList.add(toneClass);
        runModalStatusEl.innerHTML = message;
    }

    function triggerGlobalCelebration() {
        const existing = document.querySelector('.global-celebration-layer');
        if (existing) {
            existing.remove();
        }

        const layer = document.createElement('div');
        layer.className = 'global-celebration-layer';
        const colors = ['#ff6f91', '#ffd54f', '#6ce5ff', '#7be495', '#a78bfa', '#ff9e64'];

        for (let i = 0; i < 90; i++) {
            const piece = document.createElement('span');
            piece.className = 'global-confetti';
            piece.style.left = `${Math.random() * 100}%`;
            piece.style.backgroundColor = colors[i % colors.length];
            piece.style.animationDelay = `${Math.random() * 0.5}s`;
            piece.style.animationDuration = `${2.2 + Math.random() * 1.8}s`;
            layer.appendChild(piece);
        }

        document.body.appendChild(layer);
        setTimeout(() => layer.remove(), 3200);
    }

    function hideResultModal() {
        if (!resultModalEl) {
            return;
        }

        try {
            if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
                if (!resultModalInstance) {
                    resultModalInstance = new bootstrap.Modal(resultModalEl);
                }
                resultModalInstance.hide();
            } else {
                resultModalEl.style.display = 'none';
                resultModalEl.classList.remove('show');
                resultModalEl.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('modal-open');
                document.querySelector('.result-modal-backdrop')?.remove();
            }
        } catch (error) {
            console.warn('Could not hide result modal:', error);
        }
    }

    function showResultModal({ title, message, type = 'info', celebrate = false, actions = [] }) {
        if (!resultModalEl || !resultModalLabelEl || !resultModalMessageEl || !resultModalActionsEl || !resultModalCelebrationEl) {
            return;
        }

        resultModalLabelEl.textContent = title || 'Result';
        resultModalMessageEl.innerHTML = message || '';

        const modalContent = resultModalEl.querySelector('.result-modal-content');
        if (modalContent) {
            modalContent.classList.remove('result-success', 'result-error', 'result-info');
            modalContent.classList.add(`result-${type}`);
            modalContent.classList.remove('result-pop', 'result-wobble');
            void modalContent.offsetWidth;
            if (type === 'success') {
                modalContent.classList.add('result-pop');
            } else if (type === 'error') {
                modalContent.classList.add('result-wobble');
            }
        }

        resultModalCelebrationEl.innerHTML = '';
        resultModalCelebrationEl.classList.remove('active');
        if (celebrate) {
            resultModalCelebrationEl.classList.add('active');
            const balloonColors = ['#ff6fa3', '#ffd84d', '#66d7ff', '#7ae582', '#a786ff', '#ff9f5a'];
            for (let i = 0; i < 16; i++) {
                const balloon = document.createElement('span');
                balloon.className = 'celebration-balloon';
                balloon.style.left = `${6 + Math.random() * 88}%`;
                balloon.style.backgroundColor = balloonColors[i % balloonColors.length];
                balloon.style.animationDelay = `${Math.random() * 0.9}s`;
                balloon.style.animationDuration = `${2.6 + Math.random() * 1.5}s`;
                resultModalCelebrationEl.appendChild(balloon);
            }
        }

        resultModalActionsEl.innerHTML = '';
        const finalActions = actions.length ? actions : [{ label: 'OK', className: 'btn btn-primary' }];
        finalActions.forEach((action) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = action.className || 'btn btn-primary';
            if (action.icon) {
                button.innerHTML = `<i class="fas fa-${action.icon}"></i> ${action.label}`;
            } else {
                button.textContent = action.label;
            }

            button.addEventListener('click', () => {
                if (typeof action.onClick === 'function') {
                    action.onClick();
                }
                if (action.closeOnClick !== false) {
                    hideResultModal();
                }
            });
            resultModalActionsEl.appendChild(button);
        });

        try {
            if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
                if (!resultModalInstance) {
                    resultModalInstance = new bootstrap.Modal(resultModalEl);
                }
                resultModalInstance.show();
            } else {
                resultModalEl.style.display = 'block';
                resultModalEl.classList.add('show');
                resultModalEl.removeAttribute('aria-hidden');
                document.body.classList.add('modal-open');
                if (!document.querySelector('.result-modal-backdrop')) {
                    const backdrop = document.createElement('div');
                    backdrop.className = 'modal-backdrop fade show result-modal-backdrop';
                    document.body.appendChild(backdrop);
                }
            }
        } catch (error) {
            console.warn('Could not open result modal:', error);
        }
    }
    
    // --- EXECUTION FUNCTIONS ---
    function runProgram() {
        const challenge = getCurrentChallenge();
        const missionStoryPilot = isMissionStoryPilotActive(challenge);
        hideOutputModal();
        if (missionStoryPilot) {
            renderMissionStoryPanel(challenge);
            setMissionStoryStatus('Running...');
        }

        resetAnimationArea();
        setRunModalCheckState(false, '<i class="fas fa-cog fa-spin"></i> Running your code adventure...', 'running');
        setFeedback('Running your code adventure...', 'running');
        
        if (userBlocks.length === 0) {
            playSound('error');
            if (missionStoryPilot) {
                setMissionStoryStatus('Add blocks first.');
            }
            setRunModalCheckState(false, '<i class="fas fa-train"></i> Add blocks first.', 'error');
            setFeedback('Add some blocks first, then run your adventure.', 'error');
            return;
        }
        
        // Animate blocks being executed
        animateExecution(() => {
            setRunModalCheckState(false, '<i class="fas fa-check-circle"></i> Run finished. Checking now...', 'ready');
            checkSolution();
        });
    }

    function buildExecutionQueue(challenge) {
        const queue = [];
        const blockIds = userBlocks.slice();

        for (let index = 0; index < blockIds.length; index += 1) {
            const blockId = blockIds[index];
            const repeatCount = getMissionRepeatCount(blockId);
            const nextBlockId = blockIds[index + 1];
            const nextCommand = parseMissionCommand(nextBlockId);

            if (repeatCount > 0 && nextBlockId && nextCommand !== 'other' && nextCommand !== 'repeat') {
                queue.push({
                    sourceIndex: index,
                    blockId,
                    label: getBlockLabelById(challenge, blockId)
                });
                for (let repeatStep = 1; repeatStep <= repeatCount; repeatStep += 1) {
                    queue.push({
                        sourceIndex: index + 1,
                        blockId: nextBlockId,
                        label: `${getBlockLabelById(challenge, nextBlockId)} (${repeatStep}/${repeatCount})`
                    });
                }
                index += 1;
                continue;
            }

            queue.push({
                sourceIndex: index,
                blockId,
                label: getBlockLabelById(challenge, blockId)
            });
        }

        return queue;
    }
    
    function animateExecution(onComplete) {
        const challenge = getCurrentChallenge();
        const blocks = Array.from(blocksContainer.querySelectorAll('.block'));
        const executionQueue = buildExecutionQueue(challenge);
        const stepDelay = currentCategory === 'loops' ? 780 : 640;
        
        // Create animation area content
        animationArea.innerHTML = '';
        const animationTitle = document.createElement('h5');
        animationTitle.textContent = 'Program Output:';
        animationArea.appendChild(animationTitle);

        if (!executionQueue.length) {
            setFeedback('Program completed! Now check your solution.', 'success');
            if (typeof onComplete === 'function') {
                onComplete();
            }
            return;
        }

        const runStep = (queueIndex) => {
            if (queueIndex >= executionQueue.length) {
                blocks.forEach((block) => block.classList.remove('block-running'));
                completeMissionStoryRun(challenge);
                setFeedback('Program completed! Now check your solution.', 'success');
                if (typeof onComplete === 'function') {
                    onComplete();
                }
                return;
            }

            const currentStep = executionQueue[queueIndex];
            const sourceBlock = blocks[currentStep.sourceIndex];

            blocks.forEach((block) => block.classList.remove('block-running'));
            if (sourceBlock) {
                sourceBlock.classList.add('block-running');
            }

            const iconClass = sourceBlock?.querySelector('.icon')?.className || 'fas fa-play';
            const iconName = iconClass.split('fa-').pop();
            const step = document.createElement('div');
            step.className = 'animation-step';
            step.innerHTML = `<i class="fas fa-${iconName}"></i> ${currentStep.label}`;
            animationArea.appendChild(step);
            animationArea.scrollTop = animationArea.scrollHeight;

            animateMissionStoryStep(currentStep.sourceIndex, currentStep.blockId, challenge, currentStep.label);
            playSound('click');

            setTimeout(() => runStep(queueIndex + 1), stepDelay);
        };

        runStep(0);
    }

    function celebrateWorkspace() {
        if (!workspace) return;
        workspace.classList.remove('workspace-celebrate');
        void workspace.offsetWidth;
        workspace.classList.add('workspace-celebrate');
    }

    function getBlockLabelById(challenge, blockId) {
        const id = String(blockId || '');
        const repeatCount = getRepeatCountFromId(id);
        if (repeatCount > 0) {
            return `Repeat ${repeatCount}`;
        }

        const match = challenge?.blocks?.find((block) => block.id === id);
        if (match?.text) {
            return match.text;
        }

        const baseId = id.replace(/^repeat-custom-\d+$/, 'repeat-custom');
        const fallback = challenge?.blocks?.find((block) => block.id === baseId);
        return fallback?.text || blockId;
    }

    function showQuickHint() {
        const challenge = getCurrentChallenge();
        if (!challenge) return;

        if (missionState.hintsLeft <= 0) {
            setFeedback('No hints left for this level. Try moving blocks and check again.', 'error');
            playSound('error');
            return;
        }

        const solution = challenge.solution || [];
        let hintMessage = '';

        if (userBlocks.length === 0) {
            const firstStep = getBlockLabelById(challenge, solution[0]);
            hintMessage = `Coach Hint: Start with <strong>${firstStep}</strong>.`;
        } else {
            let mismatchIndex = userBlocks.findIndex((blockId, index) => solution[index] !== blockId);
            if (mismatchIndex === -1) {
                mismatchIndex = Math.min(userBlocks.length, Math.max(0, solution.length - 1));
            }
            const nextCorrect = getBlockLabelById(challenge, solution[mismatchIndex]);
            hintMessage = `Coach Hint: Check step <strong>${mismatchIndex + 1}</strong>. Try <strong>${nextCorrect}</strong>.`;
        }

        missionState.hintsLeft = Math.max(0, missionState.hintsLeft - 1);
        renderMissionHud();
        setFeedback(`<p>${hintMessage}</p><span class="coach-tip">You can do it. Build and test again.</span>`, 'running');
        playSound('click');
    }
    
    function checkSolution() {
        const challenge = getCurrentChallenge();
        if (!challenge) return;
        hideOutputModal();

        if (userBlocks.length === 0) {
            missionState.triesLeft = Math.max(0, missionState.triesLeft - 1);
            missionState.streak = 0;
            renderMissionHud();
            playSound('error');
            showResultModal({
                title: "Let's Build First",
                message: `
                    <p class="mb-2">Your program is empty right now. Add a few blocks and try again.</p>
                    <p class="mb-0"><strong>Tries left:</strong> ${missionState.triesLeft}. You can do this.</p>
                `,
                type: 'error',
                actions: [{ label: 'Try Again', className: 'btn btn-warning', icon: 'rotate-left' }]
            });
            return;
        }
        
        const solution = challenge.solution || [];
        const missionStoryPilot = isMissionStoryPilotActive(challenge);
        const missionResult = missionStoryPilot
            ? evaluateMissionStoryProgram(userBlocks, challenge)
            : null;
        let isCorrect = false;

        if (missionStoryPilot) {
            isCorrect = Boolean(missionResult?.isCorrect);
        } else if (currentCategory === 'procedures') {
            // For procedure challenges, we need special handling
            isCorrect = checkProcedureSolution(challenge, userBlocks);
        } else if (challenge.isNested && currentCategory === 'loops') {
            // For loop challenges, we need special handling to check nested blocks
            isCorrect = checkLoopSolution(solution, userBlocks);
        } else {
            // For non-nested challenges, simple array comparison works
            isCorrect = arraysEqual(userBlocks, solution);
        }
        
        // First, clear any existing highlighting
        document.querySelectorAll('#blocks-container .block').forEach(blockEl => {
            blockEl.classList.remove('block-correct', 'block-incorrect');
        });
        
        if (isCorrect) {
            const starsEarned = Math.max(
                1,
                1 + (missionState.triesLeft === MAX_TRIES_PER_LEVEL ? 1 : 0) + (missionState.hintsLeft >= 2 ? 1 : 0)
            );
            missionState.stars += starsEarned;
            missionState.streak += 1;
            renderMissionHud();
            playSound('success');
            celebrateWorkspace();
            triggerGlobalCelebration();
            if (missionStoryPilot) {
                setMissionStoryStatus('Success');
                missionStepTrack?.querySelectorAll('.mission-step-chip').forEach((chip) => {
                    chip.classList.remove('active', 'wrong');
                    chip.classList.add('done');
                });
                positionMissionMarker(missionMascot, missionStoryState.target, false);
                missionTarget?.classList.add('collected');
            }
            
            // Mark challenge as completed
            if (!completedChallenges[currentCategory].includes(currentLevel)) {
                completedChallenges[currentCategory].push(currentLevel);
                updateProgress();
            }
            
            const actions = [{ label: 'Keep Playing', className: 'btn btn-primary', icon: 'heart' }];
            if (challenges[currentCategory][currentLevel + 1]) {
                actions.push({
                    label: 'Next Level',
                    className: 'btn btn-success',
                    icon: 'arrow-right',
                    onClick: () => {
                        currentLevel++;
                        loadChallenge();
                        updateUI();
                    }
                });
            }

            showResultModal({
                title: 'Boom! Super Coder Win',
                message: `
                    <p class="mb-2">Perfect sequence. You earned <strong>${starsEarned}</strong> star${starsEarned > 1 ? 's' : ''}.</p>
                    <p class="mb-1"><strong>Streak:</strong> ${missionState.streak}</p>
                    <p class="mb-0">You are thinking like a real game creator.</p>
                `,
                type: 'success',
                celebrate: true,
                actions
            });
        } else {
            missionState.triesLeft = Math.max(0, missionState.triesLeft - 1);
            missionState.streak = 0;
            renderMissionHud();
            if (missionStoryPilot) {
                setMissionStoryStatus('Try again');
            }

            let feedbackMessage = '';
            if (missionStoryPilot) {
                feedbackMessage = `
                    <p class="mb-2">${missionResult?.message || 'Try again.'}</p>
                    <p class="mb-0"><strong>Tries left:</strong> ${missionState.triesLeft}</p>
                `;
            } else {
                // Provide more detailed feedback with hints
                const blockElements = document.querySelectorAll('#blocks-container .block');
                let misplacedBlocks = [];

                blockElements.forEach((blockEl, index) => {
                    const blockId = blockEl.dataset.id;
                    if (index < solution.length) {
                        if (blockId === solution[index]) {
                            // Block is in the correct position
                            blockEl.classList.add('block-correct');
                        } else {
                            // Block is in the wrong position
                            blockEl.classList.add('block-incorrect');

                            // Get the text content for the hint
                            const blockText = blockEl.textContent.trim();
                            misplacedBlocks.push(blockText);
                        }
                    } else {
                        // Extra blocks that shouldn't be there
                        blockEl.classList.add('block-incorrect');
                    }
                });

                const correctCount = document.querySelectorAll('.block-correct').length;
                const incorrectCount = document.querySelectorAll('.block-incorrect').length;
                feedbackMessage = `
                    <p class="mb-2">So close, Code Explorer. Try one more smart fix.</p>
                    <p class="mb-2"><strong>Correct spots:</strong> ${correctCount} | <strong>Need fixes:</strong> ${incorrectCount}</p>
                    <p class="mb-0"><strong>Tries left:</strong> ${missionState.triesLeft}</p>
                `;
                if (misplacedBlocks.length > 0 && missionState.triesLeft > 0) {
                    feedbackMessage = `
                        ${feedbackMessage}
                        <p class="mb-0 mt-2">Tip: keep green blocks where they are and move only red ones.</p>
                    `;
                }
            }

            const actions = [{ label: 'Try Again', className: 'btn btn-warning', icon: 'rotate-left' }];
            if (missionState.triesLeft === 0) {
                actions.push({
                    label: 'Show Steps',
                    className: 'btn btn-outline-primary',
                    icon: 'eye',
                    closeOnClick: false,
                    onClick: () => {
                        const steps = solution
                            .map((blockId, index) => `<li><strong>Step ${index + 1}:</strong> ${getBlockLabelById(challenge, blockId)}</li>`)
                            .join('');

                        showResultModal({
                            title: 'Solution Coach',
                            message: `
                                <p class="mb-2">Here is one correct order. Copy it step by step.</p>
                                <ol class="text-start mb-2">${steps}</ol>
                                <p class="mb-0"><strong>Why this works:</strong> the sequence follows the exact mission goal in order.</p>
                            `,
                            type: 'info',
                            actions: [
                                {
                                    label: 'Reset & Retry',
                                    className: 'btn btn-primary',
                                    icon: 'redo',
                                    onClick: () => {
                                        resetWorkspace();
                                    }
                                }
                            ]
                        });
                    }
                });
            }

            playSound('error');
            showResultModal({
                title: 'Nice Try, Keep Going',
                message: feedbackMessage,
                type: 'error',
                actions
            });
        }
    }
    
    // Special function to check loop-based solutions
    function checkLoopSolution(solution, userBlocks) {
        // For loop challenges, we still use direct array comparison for now
        // but this function can be expanded for more complex loop validation
        return arraysEqual(userBlocks, solution);
    }
    
    // Special function to check procedure-based solutions
    function checkProcedureSolution(challenge, userBlocks) {
        // For procedures, we simply compare the array of block IDs with the solution
        return arraysEqual(userBlocks, challenge.solution);
    }
    
    // --- HELPER FUNCTIONS ---
    function resetWorkspace() {
        // Clear all blocks in the workspace
        blocksContainer.innerHTML = '';
        userBlocks = [];
        missionState.hintsLeft = MAX_HINTS_PER_LEVEL;
        missionState.triesLeft = MAX_TRIES_PER_LEVEL;
        renderMissionHud();
        
        // Remove any highlighting from blocks (in case there are any blocks left)
        document.querySelectorAll('.block').forEach(blockEl => {
            blockEl.classList.remove('block-correct', 'block-incorrect');
        });
        
        resetFeedback();
        resetAnimationArea();
        updateWorkspacePlaceholder();
        refreshLoopVisualGroups();
        renderMissionStoryPanel(getCurrentChallenge());
        playSound('click');
    }

    function updateWorkspacePlaceholder() {
        if (!workspaceDropPlaceholder || !blocksContainer) return;
        const hasBlocks = blocksContainer.querySelectorAll('.block').length > 0;
        workspaceDropPlaceholder.classList.toggle('hidden', hasBlocks);
    }
    
    function resetFeedback() {
        if (!feedbackArea) return;
        feedbackArea.className = 'feedback mt-3 p-3 rounded';
        feedbackArea.innerHTML = '';
        setRunModalCheckState(false, '<i class="fas fa-gamepad"></i> Run your code, then check your answer.', 'ready');
    }
    
    function setFeedback(message, type) {
        if (!feedbackArea) return;
        feedbackArea.className = `feedback mt-3 p-3 rounded feedback-${type}`;
        const hasHtml = /<\/?[a-z][\s\S]*>/i.test(message);
        feedbackArea.innerHTML = hasHtml ? message : `<p>${message}</p>`;
    }
    
    function resetAnimationArea() {
        animationArea.innerHTML = `
            <div class="text-center text-muted">
                <i class="fas fa-film fa-3x mb-2"></i>
                <p>Your program's output will be shown here when you run it.</p>
            </div>
        `;
    }
    
    function showHelp() {
        // Get the current challenge to show its specific hint
        const challenge = getCurrentChallenge();
        
        // Create and show modal for better help display
        const helpModal = document.createElement('div');
        helpModal.className = 'custom-modal';
        helpModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header bg-info text-white">
                    <h3>How to Solve This Challenge</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="challenge-hint mb-4 p-3 bg-light border rounded">
                        <h4><i class="fas fa-lightbulb text-warning"></i> Challenge Hint:</h4>
                        <p>${challenge?.hint || 'No specific hint available for this challenge.'}</p>
                    </div>
                
                    <h4>Basic Steps:</h4>
                    <ol>
                        <li>Select blocks from the left panel</li>
                        <li>Drag them to your workspace or click to add them</li>
                        <li>Arrange them in the correct order</li>
                        <li>Click "Run Program" to see what happens</li>
                        <li>Click "Check Solution" to verify your answer</li>
                        <li>Use "Reset" to start over</li>
                    </ol>
                    
                    <h4>Working with Blocks:</h4>
                    <ul>
                        <li>Blocks can be dragged around to change their order</li>
                        <li>Select a block and click the remove button to delete it</li>
                        <li>When you check your solution, blocks will be highlighted:</li>
                        <ul>
                            <li><span style="color: #28a745; font-weight: bold;">Green pulsing</span> indicates blocks in the correct position</li>
                            <li><span style="color: #dc3545; font-weight: bold;">Red pulsing</span> indicates blocks that need to be moved</li>
                        </ul>
                    </ul>
                    
                    <h4>Level-specific Help:</h4>
                    <div id="level-specific-help">
                        ${getLevelSpecificHelp()}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary close-modal-btn">Got it!</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(helpModal);
        
        // Show the modal
        setTimeout(() => {
            helpModal.classList.add('show');
        }, 10);
        
        // Handle close button
        const closeBtn = helpModal.querySelector('.close-btn');
        const closeModalBtn = helpModal.querySelector('.close-modal-btn');
        
        function closeModal() {
            helpModal.classList.remove('show');
            setTimeout(() => {
                helpModal.remove();
            }, 300);
        }
        
        closeBtn.addEventListener('click', closeModal);
        closeModalBtn.addEventListener('click', closeModal);
        
        // Close when clicking outside the modal content
        helpModal.addEventListener('click', (e) => {
            if (e.target === helpModal) {
                closeModal();
            }
        });
    }
    
    // Function to generate procedure level buttons
    function generateProcedureLevels() {
        const procedureLevelsContainer = document.querySelector('.procedures-levels');
        if (!procedureLevelsContainer) return;
        
        // Clear any existing levels
        procedureLevelsContainer.innerHTML = '';
        
        // Count how many procedure levels we have
        const procedureLevels = Object.keys(challenges.procedures).length;
        console.log(`Generating ${procedureLevels} procedure level buttons`);
        
        // Create a button for each level
        for (let i = 1; i <= procedureLevels; i++) {
            const challenge = challenges.procedures[i];
            if (!challenge) continue;
            
            const levelButton = document.createElement('button');
            levelButton.className = 'list-group-item list-group-item-action';
            levelButton.dataset.level = i;
            levelButton.textContent = `Level ${i}: ${challenge.title}`;
            
            // Add click event listener
            levelButton.addEventListener('click', () => {
                console.log('Procedure level clicked:', i);
                // Only remove active class from levels in the current category
                document.querySelectorAll('.procedures-levels .list-group-item').forEach(btn => btn.classList.remove('active'));
                levelButton.classList.add('active');
                currentCategory = 'procedures';
                currentLevel = i;
                loadChallenge();
                updateUI();
            });
            
            procedureLevelsContainer.appendChild(levelButton);
        }
    }
    
    // Function to get level-specific help
    function getLevelSpecificHelp() {
        const challenge = getCurrentChallenge();
        if (!challenge) return '';
        
        // General category help
        if (currentCategory === 'conditions') {
            let generalLogicHelp = `
                <h5>Understanding Conditions:</h5>
                <p>Conditions allow your program to make decisions based on different situations!</p>
                <ul>
                    <li>A condition block (like "If Sunny") checks if something is true</li>
                    <li>The blocks that come after a condition are only executed if the condition is true</li>
                    <li>Conditions help your program respond differently based on inputs</li>
                </ul>
            `;
            
            // Add level-specific help for logic challenges
            const logicHelpTexts = {
                1: `
                    <h5>Weather Checker Help:</h5>
                    <p>In this challenge, you need to choose what to wear based on the weather.</p>
                    <ol>
                        <li>Use "If Sunny" condition followed by "Wear T-shirt" action</li>
                        <li>Then use "If Rainy" condition followed by "Wear Raincoat" action</li>
                        <li>This way, the program will make the right clothing choice for each type of weather!</li>
                    </ol>
                `,
                2: `
                    <h5>Fruit Sorter Help:</h5>
                    <p>In this challenge, you need to sort fruits into the correct baskets.</p>
                    <ol>
                        <li>Use "If Apple" condition followed by "Put in Red Basket" action</li>
                        <li>Then use "If Banana" condition followed by "Put in Yellow Basket" action</li>
                        <li>This ensures each fruit gets sorted into the right colored basket!</li>
                    </ol>
                `,
                6: `
                    <h5>Shape Matcher Help:</h5>
                    <p>For this challenge, you need to match shapes to their correct containers.</p>
                    <ol>
                        <li>Start with "If Square" condition followed by "Put in Square Hole" action</li>
                        <li>Then add "If Circle" condition followed by "Put in Circle Hole" action</li>
                        <li>Finally, add "If Triangle" condition followed by "Put in Triangle Hole" action</li>
                        <li>This ensures each shape goes into its matching hole!</li>
                    </ol>
                `,
                10: `
                    <h5>Robot Obstacle Course Help:</h5>
                    <p>In this challenge, you need to program the robot to respond to different obstacles.</p>
                    <ol>
                        <li>Use "If Wall Ahead" condition followed by "Turn Around" action</li>
                        <li>Then use "If Gap in Path" condition followed by "Jump Over" action</li>
                        <li>Finally, use "If Finish Line" condition followed by "Celebrate" action</li>
                        <li>This helps the robot successfully navigate through all obstacles!</li>
                    </ol>
                `,
                20: `
                    <h5>Autonomous Vehicle Help:</h5>
                    <p>For this advanced challenge, you need to program a self-driving car to respond to different road situations.</p>
                    <ol>
                        <li>Program responses for traffic lights: "If Red Light" → "Stop Car", "If Green Light" → "Proceed Forward"</li>
                        <li>Handle pedestrians: "If Pedestrian Crossing" → "Yield to Pedestrian"</li>
                        <li>Respond to other vehicles: "If Car Ahead Slowing" → "Slow Down"</li>
                        <li>Navigate road conditions: "If Lane Ending" → "Change Lanes"</li>
                        <li>Respond to emergencies: "If Emergency Vehicle" → "Pull Over"</li>
                        <li>Remember to place conditions in a logical order for safe driving!</li>
                    </ol>
                `
            };
            
            return generalLogicHelp + (logicHelpTexts[currentLevel] || '');
        }
        else if (currentCategory === 'loops') {
            let generalLoopsHelp = `
                <h5>Understanding Loops:</h5>
                <p>Loops let you repeat the next block so you can write shorter code.</p>
                <ul>
                    <li><strong>Repeat 2 / 3 / 4</strong> repeats the next block that many times</li>
                    <li>Use North, South, East, West to move one tile each step</li>
                    <li>Use Pick/Drop only when robot is on the correct objective tile</li>
                </ul>
            `;
            
            // Add level-specific help
            const loopsHelpTexts = {
                1: `
                    <h5>Frozen Shortcut Help:</h5>
                    <p>Start with the repeat block, then North.</p>
                    <ol>
                        <li>Use <strong>Repeat 2</strong> then <strong>North</strong></li>
                        <li>After moving, use <strong>Pick Up Treasure</strong></li>
                    </ol>
                `,
                4: `
                    <h5>Star Harbor Rescue Help:</h5>
                    <p>Try grouping same-direction moves with one repeat.</p>
                    <ol>
                        <li>Use repeat for longer North or East runs</li>
                        <li>Avoid blocked tiles and finish with Pick Up</li>
                    </ol>
                `,
                5: `
                    <h5>Rover Sample Run Help:</h5>
                    <p>Collect objectives in order, then dock.</p>
                    <ol>
                        <li>Reach <strong>Sample 1</strong>, then use Collect</li>
                        <li>Then collect <strong>Sample 2</strong></li>
                        <li>Finish at <strong>Dock</strong> and use Dock action</li>
                    </ol>
                `,
                6: `
                    <h5>School Bus Route Help:</h5>
                    <p>Pick in order, then drop at school.</p>
                    <ol>
                        <li>Pick at <strong>Stop 1</strong></li>
                        <li>Pick at <strong>Stop 2</strong></li>
                        <li>Drop at <strong>School</strong></li>
                    </ol>
                `,
                8: `
                    <h5>Final Relay Help:</h5>
                    <p>This level has ordered objectives with loop shortcuts.</p>
                    <ol>
                        <li>Collect <strong>Point 1</strong>, then <strong>Point 2</strong></li>
                        <li>Finally dock at <strong>Dock</strong> with Drop action</li>
                    </ol>
                `,
                9: `
                    <h5>Zigzag Ice Run Help:</h5>
                    <p>Use repeat blocks for long move runs.</p>
                    <ol>
                        <li>Group up-moves with one repeat</li>
                        <li>Group right-moves with one repeat</li>
                        <li>Finish on gem tile, then Pick Up</li>
                    </ol>
                `,
                10: `
                    <h5>Broken Bridge Patrol Help:</h5>
                    <p>This map needs loop segments plus one correction step.</p>
                    <ol>
                        <li>Cross first with repeated East</li>
                        <li>Climb with repeated North</li>
                        <li>Use Pick Up only on patrol gem</li>
                    </ol>
                `,
                11: `
                    <h5>Twin Crystal Pickup Help:</h5>
                    <p>Order matters: Crystal 1 first, then Crystal 2.</p>
                    <ol>
                        <li>Reach Crystal 1 and Pick</li>
                        <li>Then move to Crystal 2 and Pick</li>
                        <li>Use repeats for long East/North runs</li>
                    </ol>
                `,
                12: `
                    <h5>Moon Crater Detour Help:</h5>
                    <p>Exact repeat count is important here.</p>
                    <ol>
                        <li>Use one long West repeat</li>
                        <li>Then one long North repeat</li>
                        <li>Pick Up only at moon gem</li>
                    </ol>
                `,
                13: `
                    <h5>Shuttle Stop Relay Help:</h5>
                    <p>Complete all stops in order.</p>
                    <ol>
                        <li>Pick at Stop 1</li>
                        <li>Pick at Stop 2</li>
                        <li>Dock at final point with Dock action</li>
                    </ol>
                `,
                14: `
                    <h5>Mega Rescue Grid Help:</h5>
                    <p>Hard mission with three ordered objectives.</p>
                    <ol>
                        <li>Pick <strong>Gem 1</strong></li>
                        <li>Pick <strong>Gem 2</strong></li>
                        <li>Reach <strong>Dock</strong> and use Drop action</li>
                    </ol>
                `
            };
            
            return generalLoopsHelp + (loopsHelpTexts[currentLevel] || '');
        }
        
        // Original sequencing help text
        const sequencingHelpTexts = {
            2: `
                <h5>Make a Sandwich Help:</h5>
                <p>Think about how you would make a sandwich in real life:</p>
                <ol>
                    <li>Start with a piece of bread as the base</li>
                    <li>Add ingredients in a logical order (cheese, lettuce, tomato)</li>
                    <li>Add the top bread to complete the sandwich</li>
                    <li>Finally, cut the sandwich in half</li>
                </ol>
            `,
            6: `
                <h5>Robo Treasure Hunt: Ice Path</h5>
                <p>Use simple one-step directions:</p>
                <ol>
                    <li><strong>North</strong> = one tile up</li>
                    <li><strong>South</strong> = one tile down</li>
                    <li><strong>East</strong> = one tile right</li>
                    <li><strong>West</strong> = one tile left</li>
                    <li>Robot cannot enter blocked cracked tiles</li>
                    <li>Use <strong>Pick Up Treasure</strong> only on the treasure tile</li>
                </ol>
            `,
            7: `
                <h5>Robo Treasure Hunt: Crystal Maze</h5>
                <p>Use simple one-step directions:</p>
                <ol>
                    <li><strong>North</strong> = one tile up</li>
                    <li><strong>South</strong> = one tile down</li>
                    <li><strong>East</strong> = one tile right</li>
                    <li><strong>West</strong> = one tile left</li>
                    <li>Robot cannot enter blocked cracked tiles</li>
                    <li>Use <strong>Pick Up Treasure</strong> only on the treasure tile</li>
                </ol>
            `,
            8: `
                <h5>Robo Treasure Hunt: Moon Dock</h5>
                <p>Use simple one-step directions:</p>
                <ol>
                    <li><strong>North</strong> = one tile up</li>
                    <li><strong>South</strong> = one tile down</li>
                    <li><strong>East</strong> = one tile right</li>
                    <li><strong>West</strong> = one tile left</li>
                    <li>Robot cannot enter blocked cracked tiles</li>
                    <li>Use <strong>Pick Up Treasure</strong> only on the treasure tile</li>
                </ol>
            `,
            9: `
                <h5>Robo Rescue: Star Harbor</h5>
                <p>Use simple one-step directions:</p>
                <ol>
                    <li><strong>North</strong> = one tile up</li>
                    <li><strong>South</strong> = one tile down</li>
                    <li><strong>East</strong> = one tile right</li>
                    <li><strong>West</strong> = one tile left</li>
                    <li>Robot cannot enter blocked cracked tiles</li>
                    <li>Use <strong>Pick Up</strong> only on the rescue tile</li>
                </ol>
            `,
            10: `
                <h5>Space Rover Sample Run</h5>
                <p>Mission order matters in this level:</p>
                <ol>
                    <li>Go to <strong>Sample 1</strong> and use <strong>Collect Sample</strong></li>
                    <li>Then go to <strong>Sample 2</strong> and use <strong>Collect Sample</strong></li>
                    <li>Finally go to <strong>Dock</strong> and use <strong>Dock Rover</strong></li>
                    <li>Do not collect in the wrong order</li>
                </ol>
            `,
            11: `
                <h5>School Bus Route Planner</h5>
                <p>Follow the bus route in order:</p>
                <ol>
                    <li>Reach <strong>Stop 1</strong> and use <strong>Pick Kids</strong></li>
                    <li>Then reach <strong>Stop 2</strong> and use <strong>Pick Kids</strong></li>
                    <li>Finally reach <strong>School</strong> and use <strong>Drop at School</strong></li>
                    <li>This map has extra blockers, so plan turns carefully</li>
                    <li>If order is wrong, the mission will not pass</li>
                </ol>
            `
        };
        
        if (currentCategory === 'sequencing') {
            return sequencingHelpTexts[currentLevel] || '<p>Arrange the blocks in the correct logical order to complete this challenge.</p>';
        }
        
        // Default help
        return '<p>Arrange the blocks in the correct logical order to complete this challenge.</p>';
    }
    
    function updateProgress() {
        const total = Object.keys(challenges[currentCategory]).length;
        const completed = completedChallenges[currentCategory].length;
        const percentage = Math.floor((completed / total) * 100);
        
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${completed} / ${total} completed`;
    }
    
    // --- UTILITY FUNCTIONS ---
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function getCategoryDisplayName(category) {
        const names = {
            sequencing: 'Sequence',
            loops: 'Loops',
            conditions: 'Conditions',
            procedures: 'Procedures'
        };
        return names[category] || capitalizeFirstLetter(category);
    }
    
    function arraysEqual(a, b) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }
    
    // Fisher-Yates shuffle algorithm to randomize blocks
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }
    
    function playSound(type) {
        try {
            // Use the globally available playSound function from sounds.js
            if (window.playSound) {
                window.playSound(type);
            } else {
                console.log(`Would play sound: ${type}`);
            }
            
            // Also use Grid Explorer sounds if available
            if (SoundEffects) {
                if (type === 'success') {
                    SoundEffects.playSuccessSound();
                } else if (type === 'error') {
                    SoundEffects.playErrorSound();
                } else if (type === 'click') {
                    SoundEffects.playClickSound();
                }
            }
        } catch (err) {
            console.warn('Error playing sound, continuing anyway:', err);
        }
    }
    
    // --- EVENT LISTENERS ---
    function initEventListeners() {
        console.log('Setting up event listeners...');
        
        // Category selection
        document.querySelectorAll('.challenges-list .list-group-item').forEach(item => {
            item.addEventListener('click', function() {
                console.log('Category clicked:', this.dataset.category);
                // Remove active class from all items
                document.querySelectorAll('.challenges-list .list-group-item').forEach(el => {
                    el.classList.remove('active');
                });
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Update current category and reset level
                currentCategory = this.dataset.category;
                currentLevel = 1; // Reset to first level when changing categories
                
                // Show the corresponding level group and hide others
                document.querySelectorAll('.sequencing-levels, .loops-levels, .conditions-levels, .procedures-levels').forEach(group => {
                    group.style.display = 'none';
                });
                document.querySelector(`.${currentCategory}-levels`).style.display = 'block';
                
                // Update active level
                document.querySelectorAll(`.${currentCategory}-levels .list-group-item`).forEach(el => {
                    el.classList.remove('active');
                });
                document.querySelector(`.${currentCategory}-levels [data-level="1"]`)?.classList.add('active');
                
                // Load the challenge
                loadChallenge();
                updateUI();
            });
        });
    }

    // Initialize everything
    init();
});

// Initialize Bootstrap elements
function initBootstrap() {
        console.log('Setting up Bootstrap components...');
        
        // Check if Bootstrap is available
        if (typeof bootstrap === 'undefined') {
            console.log('WARNING: Bootstrap library not detected!');
            // Add a fallback implementation for modal functionality
            window.bootstrap = {
                Modal: class FallbackModal {
                    constructor(element) {
                        this.element = element;
                    }
                    
                    show() {
                        console.log('Using fallback modal implementation');
                        this.element.style.display = 'block';
                        this.element.classList.add('show');
                        document.body.classList.add('modal-open');
                        
                        // Add a semi-transparent backdrop
                        const backdrop = document.createElement('div');
                        backdrop.className = 'modal-backdrop fade show';
                        document.body.appendChild(backdrop);
                        
                        // Add close functionality
                        const closeButtons = this.element.querySelectorAll('[data-bs-dismiss="modal"]');
                        closeButtons.forEach(btn => {
                            btn.addEventListener('click', () => this.hide());
                        });
                    }
                    
                    hide() {
                        this.element.style.display = 'none';
                        this.element.classList.remove('show');
                        document.body.classList.remove('modal-open');
                        document.querySelector('.modal-backdrop')?.remove();
                    }
                }
            };
        }
        
        // Make sure modal close button works properly
        const modalCloseButton = document.querySelector('#imageModal .btn-close');
        if (modalCloseButton) {
            modalCloseButton.addEventListener('click', function() {
                const modal = document.getElementById('imageModal');
                const backdrop = document.querySelector('.modal-backdrop');
                
                // Hide modal
                modal.style.display = 'none';
                modal.classList.remove('show');
                document.body.classList.remove('modal-open');
                
                // Remove backdrop if it exists
                if (backdrop) backdrop.remove();
            });
        }
        
        // Initialize modal functionality
        const imageModal = document.getElementById('imageModal');
        if (imageModal) {
            const challengeImg = document.getElementById('challenge-image');
            const modalImg = document.getElementById('modal-challenge-image');
            const modalTitle = document.getElementById('imageModalLabel');
            
            // Save reference to the modal
            window.imageModalInstance = new bootstrap.Modal(imageModal);
            
            // Ensure the challenge image has the click handler
            challengeImg.addEventListener('click', function(e) {
                if (challengeImg.classList.contains('disable-image-modal')) {
                    return;
                }
                console.log('Challenge image clicked');
                e.preventDefault(); // Prevent default behavior
                modalImg.src = this.src;
                modalTitle.textContent = taskTitle.textContent;
                
                try {
                    // Use the saved instance
                    window.imageModalInstance.show();
                    console.log('Modal shown via Bootstrap API');
                } catch (err) {
                    console.log('Error showing modal: ' + err.message);
                    // Direct fallback
                    imageModal.style.display = 'block';
                    imageModal.classList.add('show');
                }
            });
            
            console.log('Image modal setup complete');
        } else {
            console.log('ERROR: Image modal element not found');
        }
    }
