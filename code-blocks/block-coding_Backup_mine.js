// Block Coding for Kids - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // --- DATA DEFINITIONS ---
    
    // Challenges organized by category and level
    const challenges = {
        sequencing: {
            // Level 1 - Morning Routine (Very basic daily sequence for ages 5-6)
            1: {
                title: "Morning Routine",
                description: "Put your morning activities in the right order to start the day right.",
                goal: "Create a proper morning routine sequence.",
                image: "./images/morning-routine.svg",
                blocks: [
                    { id: 'wake-up', type: 'motion', text: 'Wake Up', icon: 'bell' },
                    { id: 'brush-teeth', type: 'motion', text: 'Brush Teeth', icon: 'tooth' },
                    { id: 'get-dressed', type: 'motion', text: 'Get Dressed', icon: 'tshirt' },
                    { id: 'eat-breakfast', type: 'motion', text: 'Eat Breakfast', icon: 'egg' },
                    { id: 'pack-bag', type: 'motion', text: 'Pack Bag', icon: 'backpack' },
                    { id: 'go-school', type: 'motion', text: 'Go to School', icon: 'school' }
                ],
                solution: ['wake-up', 'brush-teeth', 'get-dressed', 'eat-breakfast', 'pack-bag', 'go-school']
            },
            // Level 2 - Make a Sandwich (Simple food preparation)
            2: {
                title: "Make a Sandwich",
                description: "Help make a tasty sandwich by putting the steps in the right order.",
                goal: "Create a perfect sandwich following the correct sequence of steps.",
                image: "./images/sandwich.svg",
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
                image: "./images/snowman.svg",
                blocks: [
                    { id: 'roll-large-ball', type: 'motion', text: 'Roll Large Ball', icon: 'circle' },
                    { id: 'roll-medium-ball', type: 'motion', text: 'Roll Medium Ball', icon: 'dot-circle' },
                    { id: 'roll-small-ball', type: 'motion', text: 'Roll Small Ball', icon: 'bullseye' },
                    { id: 'add-eyes', type: 'motion', text: 'Add Eyes', icon: 'eye' },
                    { id: 'add-nose', type: 'motion', text: 'Add Carrot Nose', icon: 'carrot' },
                    { id: 'add-hat', type: 'motion', text: 'Add Hat', icon: 'hat-wizard' }
                ],
                solution: ['roll-large-ball', 'roll-medium-ball', 'roll-small-ball', 'add-eyes', 'add-nose', 'add-hat']
            },
            // Level 4 - Plant a Flower (Simple nature activity)
            4: {
                title: "Plant a Flower",
                description: "Help plant a beautiful flower by putting the gardening steps in order.",
                goal: "Plant a flower by following the correct sequence of steps.",
                image: "./images/flower.svg",
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
            // Level 5 - Help the Robot Find Treasure (Simple maze navigation)
            5: {
                title: "Help the Robot Find Treasure",
                description: "Guide the robot through the maze to find the treasure by putting the right steps in order.",
                goal: "Get the robot to the treasure chest using the right sequence of steps.",
                image: "./images/robot-maze-improved.svg",
                blocks: [
                    { id: 'move-forward', type: 'motion', text: 'Move Forward', icon: 'arrow-up' },
                    { id: 'turn-right', type: 'motion', text: 'Turn Right', icon: 'arrow-right' },
                    { id: 'turn-left', type: 'motion', text: 'Turn Left', icon: 'arrow-left' },
                    { id: 'pick-up', type: 'motion', text: 'Pick Up Treasure', icon: 'box' }
                ],
                solution: ['move-forward', 'turn-right', 'move-forward', 'turn-left', 'move-forward', 'pick-up']
            },
            // Level 6 - Pizza Time (More complex food preparation)
            6: {
                title: "Pizza Time",
                description: "Help make a delicious pizza by putting the steps in the right order.",
                goal: "Create a perfect pizza following the correct sequence.",
                image: "./images/pizza-time.svg",
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
            // Level 7 - Car Wash Sequence (Practical sequence)
            7: {
                title: "Car Wash Sequence",
                description: "Run a successful car wash by putting the steps in the correct order.",
                goal: "Clean a car following the proper sequence of steps.",
                image: "./images/car-wash.svg",
                blocks: [
                    { id: 'rinse-car', type: 'motion', text: 'Rinse Car', icon: 'shower' },
                    { id: 'apply-soap', type: 'motion', text: 'Apply Soap', icon: 'soap' },
                    { id: 'scrub-car', type: 'motion', text: 'Scrub Car', icon: 'brush' },
                    { id: 'rinse-again', type: 'motion', text: 'Rinse Again', icon: 'tint' },
                    { id: 'dry-car', type: 'motion', text: 'Dry Car', icon: 'wind' },
                    { id: 'polish-car', type: 'motion', text: 'Polish Car', icon: 'sparkles' }
                ],
                solution: ['rinse-car', 'apply-soap', 'scrub-car', 'rinse-again', 'dry-car', 'polish-car']
            },
            // Level 8 - Library Book Return (Common experience with more steps)
            8: {
                title: "Library Book Return",
                description: "Return a library book by following the correct sequence of steps.",
                goal: "Successfully return a book to the library following proper procedures.",
                image: "./images/library-return.svg",
                blocks: [
                    { id: 'find-book', type: 'motion', text: 'Find Book', icon: 'search' },
                    { id: 'check-due-date', type: 'motion', text: 'Check Due Date', icon: 'calendar' },
                    { id: 'go-to-library', type: 'motion', text: 'Go to Library', icon: 'building' },
                    { id: 'scan-card', type: 'motion', text: 'Scan Library Card', icon: 'id-card' },
                    { id: 'return-book', type: 'motion', text: 'Return Book', icon: 'book' },
                    { id: 'get-receipt', type: 'motion', text: 'Get Receipt', icon: 'receipt' }
                ],
                solution: ['find-book', 'check-due-date', 'go-to-library', 'scan-card', 'return-book', 'get-receipt']
            },
            // Level 9 - Science Experiment (More detailed process)
            9: {
                title: "Science Experiment",
                description: "Conduct a baking soda and vinegar experiment by ordering the steps correctly.",
                goal: "Create a chemical reaction with the right sequence of steps.",
                image: "./images/science-experiment.svg",
                blocks: [
                    { id: 'get-supplies', type: 'motion', text: 'Get Supplies', icon: 'flask' },
                    { id: 'add-baking-soda', type: 'motion', text: 'Add Baking Soda', icon: 'vial' },
                    { id: 'add-food-coloring', type: 'motion', text: 'Add Food Coloring', icon: 'eye-dropper' },
                    { id: 'add-vinegar', type: 'motion', text: 'Add Vinegar', icon: 'fill' },
                    { id: 'observe-reaction', type: 'motion', text: 'Observe Reaction', icon: 'glasses' },
                    { id: 'clean-up', type: 'motion', text: 'Clean Up', icon: 'broom' }
                ],
                solution: ['get-supplies', 'add-baking-soda', 'add-food-coloring', 'add-vinegar', 'observe-reaction', 'clean-up']
            },
            // Level 10 - Museum Adventure (More planning involved)
            10: {
                title: "Museum Adventure",
                description: "Plan a museum visit by organizing the activities in the correct order.",
                goal: "Have a successful museum trip with properly sequenced activities.",
                image: "./images/museum-adventure.svg",
                blocks: [
                    { id: 'buy-tickets', type: 'motion', text: 'Buy Tickets', icon: 'ticket-alt' },
                    { id: 'check-map', type: 'motion', text: 'Check Map', icon: 'map' },
                    { id: 'visit-exhibits', type: 'motion', text: 'Visit Exhibits', icon: 'landmark' },
                    { id: 'take-photos', type: 'motion', text: 'Take Photos', icon: 'camera' },
                    { id: 'eat-lunch', type: 'motion', text: 'Eat Lunch', icon: 'utensils' },
                    { id: 'visit-gift-shop', type: 'motion', text: 'Visit Gift Shop', icon: 'shopping-bag' }
                ],
                solution: ['buy-tickets', 'check-map', 'visit-exhibits', 'take-photos', 'eat-lunch', 'visit-gift-shop']
            },
            // Level 11 - Birthday Party Planning (Complex planning)
            11: {
                title: "Birthday Party Planning",
                description: "Plan a birthday party by organizing the tasks in the correct order.",
                goal: "Create a successful birthday party with properly sequenced preparation steps.",
                image: "./images/birthday-party.svg",
                blocks: [
                    { id: 'create-guest-list', type: 'motion', text: 'Create Guest List', icon: 'users' },
                    { id: 'send-invitations', type: 'motion', text: 'Send Invitations', icon: 'envelope' },
                    { id: 'buy-decorations', type: 'motion', text: 'Buy Decorations', icon: 'birthday-cake' },
                    { id: 'decorate-room', type: 'motion', text: 'Decorate Room', icon: 'paint-roller' },
                    { id: 'prepare-food', type: 'motion', text: 'Prepare Food', icon: 'pizza-slice' },
                    { id: 'welcome-guests', type: 'motion', text: 'Welcome Guests', icon: 'door-open' }
                ],
                solution: ['create-guest-list', 'send-invitations', 'buy-decorations', 'decorate-room', 'prepare-food', 'welcome-guests']
            },
            // Level 12 - Robot Treasure Hunt (Complex navigation)
            12: {
                title: "Robot Treasure Hunt",
                description: "Help the advanced robot find hidden treasure through more complex movements.",
                goal: "Guide the robot through a more challenging maze to reach the treasure.",
                image: "./images/robot-treasure-hunt.svg",
                blocks: [
                    { id: 'move-forward', type: 'motion', text: 'Move Forward', icon: 'arrow-up' },
                    { id: 'turn-right', type: 'motion', text: 'Turn Right', icon: 'arrow-right' },
                    { id: 'turn-left', type: 'motion', text: 'Turn Left', icon: 'arrow-left' },
                    { id: 'move-twice', type: 'motion', text: 'Move Twice', icon: 'forward' },
                    { id: 'check-path', type: 'motion', text: 'Check Path', icon: 'search' },
                    { id: 'pick-up', type: 'motion', text: 'Pick Up Treasure', icon: 'box' }
                ],
                solution: ['move-forward', 'check-path', 'turn-right', 'move-twice', 'turn-left', 'pick-up']
            },
            // Level 13 - Camping Adventure (Outdoor sequence with safety)
            13: {
                title: "Camping Adventure",
                description: "Set up a campsite by ordering the necessary steps correctly.",
                goal: "Create a proper campsite setup following the correct sequence of activities.",
                image: "./images/camping-adventure.svg",
                blocks: [
                    { id: 'find-spot', type: 'motion', text: 'Find Camping Spot', icon: 'map-marker-alt' },
                    { id: 'clear-area', type: 'motion', text: 'Clear Area', icon: 'broom' },
                    { id: 'set-up-tent', type: 'motion', text: 'Set Up Tent', icon: 'campground' },
                    { id: 'collect-wood', type: 'motion', text: 'Collect Firewood', icon: 'tree' },
                    { id: 'build-fire', type: 'motion', text: 'Build Fire', icon: 'fire' },
                    { id: 'cook-dinner', type: 'motion', text: 'Cook Dinner', icon: 'utensils' }
                ],
                solution: ['find-spot', 'clear-area', 'set-up-tent', 'collect-wood', 'build-fire', 'cook-dinner']
            },
            // Level 14 - Space Launch (Advanced technical sequence)
            14: {
                title: "Space Launch",
                description: "Prepare and launch a rocket by putting the steps in the correct order.",
                goal: "Successfully launch a rocket into space with the right sequence of operations.",
                image: "./images/space-launch.svg",
                blocks: [
                    { id: 'systems-check', type: 'motion', text: 'Systems Check', icon: 'clipboard-check' },
                    { id: 'fuel-rocket', type: 'motion', text: 'Fuel Rocket', icon: 'gas-pump' },
                    { id: 'crew-boarding', type: 'motion', text: 'Crew Boarding', icon: 'users' },
                    { id: 'countdown', type: 'motion', text: 'Countdown', icon: 'clock' },
                    { id: 'ignition', type: 'motion', text: 'Ignition', icon: 'fire' },
                    { id: 'liftoff', type: 'motion', text: 'Liftoff', icon: 'rocket' }
                ],
                solution: ['systems-check', 'fuel-rocket', 'crew-boarding', 'countdown', 'ignition', 'liftoff']
            },
            // Level 15 - Weather Report (Most abstract sequence)
            15: {
                title: "Weather Report",
                description: "Create a weather report by organizing the meteorological steps correctly.",
                goal: "Produce an accurate weather forecast with properly sequenced steps.",
                image: "./images/weather-report.svg",
                blocks: [
                    { id: 'collect-data', type: 'motion', text: 'Collect Data', icon: 'database' },
                    { id: 'analyze-patterns', type: 'motion', text: 'Analyze Patterns', icon: 'chart-line' },
                    { id: 'check-satellites', type: 'motion', text: 'Check Satellites', icon: 'satellite' },
                    { id: 'run-models', type: 'motion', text: 'Run Computer Models', icon: 'laptop-code' },
                    { id: 'create-forecast', type: 'motion', text: 'Create Forecast', icon: 'cloud-sun' },
                    { id: 'broadcast-report', type: 'motion', text: 'Broadcast Report', icon: 'tv' }
                ],
                solution: ['collect-data', 'check-satellites', 'analyze-patterns', 'run-models', 'create-forecast', 'broadcast-report']
            }
        },
        loops: {
            // Level 1 - Paint a Fence (Very basic loop for ages 5-6)
            1: {
                title: "Paint a Fence",
                description: "Use a loop to paint all 5 fence posts without repeating the same command.",
                goal: "Paint all 5 fence posts using the fewest blocks possible.",
                image: "./images/fence.svg",
                blocks: [
                    { id: 'repeat-5', type: 'loop', text: 'Repeat 5 times', icon: 'redo' },
                    { id: 'paint-post', type: 'motion', text: 'Paint Post', icon: 'paint-brush' }
                ],
                solution: ['repeat-5', 'paint-post'],
                isNested: true
            },
            // Level 2 - Dance Routine (Simple repeated actions)
            2: {
                title: "Dance Routine",
                description: "Create a dance routine with 3 spins and 2 jumps using loops.",
                goal: "Make the dancer perform 3 spins followed by 2 jumps using loops.",
                image: "./images/dance.svg",
                blocks: [
                    { id: 'repeat-3', type: 'loop', text: 'Repeat 3 times', icon: 'redo' },
                    { id: 'repeat-2', type: 'loop', text: 'Repeat 2 times', icon: 'redo' },
                    { id: 'spin', type: 'motion', text: 'Spin', icon: 'sync' },
                    { id: 'jump', type: 'motion', text: 'Jump', icon: 'arrow-up' }
                ],
                solution: ['repeat-3', 'spin', 'repeat-2', 'jump'],
                isNested: true
            },
            // Level 3 - Draw a Square (Simple geometric pattern)
            3: {
                title: "Draw a Square",
                description: "Use loops to draw a square without repeating commands.",
                goal: "Draw a perfect square using a loop to repeat the sides.",
                image: "./images/square.svg",
                blocks: [
                    { id: 'repeat-4', type: 'loop', text: 'Repeat 4 times', icon: 'redo' },
                    { id: 'draw-line', type: 'motion', text: 'Draw Line', icon: 'pen' },
                    { id: 'turn-right-90', type: 'motion', text: 'Turn Right 90°', icon: 'arrow-right' }
                ],
                solution: ['repeat-4', 'draw-line', 'turn-right-90'],
                isNested: true
            },
            // Level 4 - Water the Garden (Simple natural sequence)
            4: {
                title: "Water the Garden",
                description: "Help water 6 plants in the garden using a loop.",
                goal: "Water all 6 plants efficiently using a loop.",
                image: "./images/flower.svg",
                blocks: [
                    { id: 'repeat-6', type: 'loop', text: 'Repeat 6 times', icon: 'redo' },
                    { id: 'water-plant', type: 'motion', text: 'Water Plant', icon: 'tint' },
                    { id: 'move-next', type: 'motion', text: 'Move to Next Plant', icon: 'arrow-right' }
                ],
                solution: ['repeat-6', 'water-plant', 'move-next'],
                isNested: true
            },
            // Level 5 - Stack the Blocks (Building activity)
            5: {
                title: "Stack the Blocks",
                description: "Stack 8 blocks to build a tower using a loop.",
                goal: "Build a tower by stacking 8 blocks with an efficient loop.",
                image: "./images/stack-blocks.svg",
                blocks: [
                    { id: 'repeat-8', type: 'loop', text: 'Repeat 8 times', icon: 'redo' },
                    { id: 'pick-block', type: 'motion', text: 'Pick Up Block', icon: 'cube' },
                    { id: 'stack-block', type: 'motion', text: 'Stack Block', icon: 'arrow-up' }
                ],
                solution: ['repeat-8', 'pick-block', 'stack-block'],
                isNested: true
            },
            // Level 6 - Robot Path (Simple maze navigation with loops)
            6: {
                title: "Robot Path",
                description: "Help the robot navigate the zigzag path by using loops for repeated movements.",
                goal: "Guide the robot to the finish point using loops to make the code more efficient.",
                image: "./images/robot-path.svg",
                blocks: [
                    { id: 'repeat-3', type: 'loop', text: 'Repeat 3 times', icon: 'redo' },
                    { id: 'move-forward', type: 'motion', text: 'Move Forward', icon: 'arrow-up' },
                    { id: 'turn-right', type: 'motion', text: 'Turn Right', icon: 'arrow-right' },
                    { id: 'move-forward', type: 'motion', text: 'Move Forward', icon: 'arrow-up' },
                    { id: 'turn-left', type: 'motion', text: 'Turn Left', icon: 'arrow-left' }
                ],
                solution: ['repeat-3', 'move-forward', 'turn-right', 'move-forward', 'turn-left'],
                isNested: true
            },
            // Level 7 - Count Apples (Counting with loops)
            7: {
                title: "Count Apples",
                description: "Count 10 apples in the basket using a loop.",
                goal: "Count all 10 apples efficiently using a loop structure.",
                image: "./images/count-apples.svg",
                blocks: [
                    { id: 'repeat-10', type: 'loop', text: 'Repeat 10 times', icon: 'redo' },
                    { id: 'pick-apple', type: 'motion', text: 'Pick Apple', icon: 'apple-alt' },
                    { id: 'count-apple', type: 'motion', text: 'Count Apple', icon: 'plus' }
                ],
                solution: ['repeat-10', 'pick-apple', 'count-apple'],
                isNested: true
            },
            // Level 8 - Star Pattern (Geometric pattern)
            8: {
                title: "Star Pattern",
                description: "Draw a 5-pointed star using loops for repeated lines and turns.",
                goal: "Create a perfect star with loops for efficiency.",
                image: "./images/star-pattern.svg",
                blocks: [
                    { id: 'repeat-5', type: 'loop', text: 'Repeat 5 times', icon: 'redo' },
                    { id: 'draw-line', type: 'motion', text: 'Draw Line', icon: 'pen' },
                    { id: 'turn-right-144', type: 'motion', text: 'Turn Right 144°', icon: 'arrow-right' }
                ],
                solution: ['repeat-5', 'draw-line', 'turn-right-144'],
                isNested: true
            },
            // Level 9 - Jumping Jacks (Exercise routine)
            9: {
                title: "Jumping Jacks",
                description: "Program a fitness routine with jumping jacks using loops.",
                goal: "Complete 12 jumping jacks using an efficient loop.",
                image: "./images/jumping-jacks.svg",
                blocks: [
                    { id: 'repeat-12', type: 'loop', text: 'Repeat 12 times', icon: 'redo' },
                    { id: 'jump-out', type: 'motion', text: 'Jump Out', icon: 'arrows-alt-h' },
                    { id: 'jump-in', type: 'motion', text: 'Jump In', icon: 'compress' },
                    { id: 'count', type: 'motion', text: 'Count', icon: 'plus' }
                ],
                solution: ['repeat-12', 'jump-out', 'jump-in', 'count'],
                isNested: true
            },
            // Level 10 - Music Beats (Audio pattern)
            10: {
                title: "Music Beats",
                description: "Create a drum beat pattern using loops for musical repetition.",
                goal: "Program a rhythmic drum pattern with loops for efficiency.",
                image: "./images/music-beats.svg",
                blocks: [
                    { id: 'repeat-4', type: 'loop', text: 'Repeat 4 times', icon: 'redo' },
                    { id: 'drum-loud', type: 'motion', text: 'Loud Beat', icon: 'drum' },
                    { id: 'repeat-2', type: 'loop', text: 'Repeat 2 times', icon: 'redo' },
                    { id: 'drum-soft', type: 'motion', text: 'Soft Beat', icon: 'music' }
                ],
                solution: ['repeat-4', 'drum-loud', 'repeat-2', 'drum-soft'],
                isNested: true
            },
            // Level 11 - Rainbow Colors (Art sequence)
            11: {
                title: "Rainbow Colors",
                description: "Draw a rainbow by repeating the color painting process with a loop.",
                goal: "Paint all 7 colors of the rainbow using an efficient loop.",
                image: "./images/rainbow-colors.svg",
                blocks: [
                    { id: 'repeat-7', type: 'loop', text: 'Repeat 7 times', icon: 'redo' },
                    { id: 'choose-color', type: 'motion', text: 'Choose Next Color', icon: 'palette' },
                    { id: 'paint-arc', type: 'motion', text: 'Paint Arc', icon: 'paint-brush' }
                ],
                solution: ['repeat-7', 'choose-color', 'paint-arc'],
                isNested: true
            },
            // Level 12 - Pizza Toppings (Food preparation)
            12: {
                title: "Pizza Toppings",
                description: "Place toppings on a pizza using loops to place multiple of each type.",
                goal: "Prepare a pizza with properly arranged toppings using loops.",
                image: "./images/pizza-time.svg",
                blocks: [
                    { id: 'repeat-8', type: 'loop', text: 'Repeat 8 times', icon: 'redo' },
                    { id: 'add-pepperoni', type: 'motion', text: 'Add Pepperoni', icon: 'circle' },
                    { id: 'repeat-6', type: 'loop', text: 'Repeat 6 times', icon: 'redo' },
                    { id: 'add-olive', type: 'motion', text: 'Add Olive', icon: 'dot-circle' }
                ],
                solution: ['repeat-8', 'add-pepperoni', 'repeat-6', 'add-olive'],
                isNested: true
            },
            // Level 13 - Robot Dance (Complex dance routine)
            13: {
                title: "Robot Dance",
                description: "Program a robot dance with multiple repeated moves using nested loops.",
                goal: "Create a complex dance routine using nested loops for efficiency.",
                image: "./images/robot-dance.svg",
                blocks: [
                    { id: 'repeat-3', type: 'loop', text: 'Repeat 3 times', icon: 'redo' },
                    { id: 'spin', type: 'motion', text: 'Spin', icon: 'sync' },
                    { id: 'repeat-2', type: 'loop', text: 'Repeat 2 times', icon: 'redo' },
                    { id: 'jump', type: 'motion', text: 'Jump', icon: 'arrow-up' },
                    { id: 'wave', type: 'motion', text: 'Wave Arms', icon: 'hands' }
                ],
                solution: ['repeat-3', 'spin', 'repeat-2', 'jump', 'wave'],
                isNested: true
            },
            // Level 14 - Spiral Drawing (Complex geometric pattern)
            14: {
                title: "Spiral Drawing",
                description: "Draw a spiral using loops with increasing line lengths.",
                goal: "Create a perfect spiral using loops and varying line lengths.",
                image: "./images/spiral.svg",
                blocks: [
                    { id: 'repeat-10', type: 'loop', text: 'Repeat 10 times', icon: 'redo' },
                    { id: 'draw-line', type: 'motion', text: 'Draw Line', icon: 'pen' },
                    { id: 'turn-right-90', type: 'motion', text: 'Turn Right 90°', icon: 'arrow-right' },
                    { id: 'increase-length', type: 'motion', text: 'Increase Length', icon: 'arrow-up' }
                ],
                solution: ['repeat-10', 'draw-line', 'turn-right-90', 'increase-length'],
                isNested: true
            },
            // Level 15 - Obstacle Course (Advanced navigation)
            15: {
                title: "Obstacle Course",
                description: "Guide the robot through an obstacle course using nested loops for efficient navigation.",
                goal: "Complete the obstacle course with the most efficient nested loops possible.",
                image: "./images/robot-treasure-hunt.svg",
                blocks: [
                    { id: 'repeat-3', type: 'loop', text: 'Repeat 3 times', icon: 'redo' },
                    { id: 'move-forward', type: 'motion', text: 'Move Forward', icon: 'arrow-up' },
                    { id: 'repeat-2', type: 'loop', text: 'Repeat 2 times', icon: 'redo' },
                    { id: 'jump-obstacle', type: 'motion', text: 'Jump Obstacle', icon: 'running' },
                    { id: 'turn-right', type: 'motion', text: 'Turn Right', icon: 'arrow-right' },
                    { id: 'turn-left', type: 'motion', text: 'Turn Left', icon: 'arrow-left' }
                ],
                solution: ['repeat-3', 'move-forward', 'repeat-2', 'jump-obstacle', 'turn-right', 'turn-left'],
                isNested: true
            },
            // Level 16 - Music Composition (Advanced audio pattern)
            16: {
                title: "Music Composition",
                description: "Create a complex music pattern with nested loops for different instruments.",
                goal: "Compose a musical sequence using efficient nested loops.",
                image: "./images/music-composition.svg",
                blocks: [
                    { id: 'repeat-4', type: 'loop', text: 'Repeat 4 times', icon: 'redo' },
                    { id: 'play-drum', type: 'motion', text: 'Play Drum', icon: 'drum' },
                    { id: 'repeat-2', type: 'loop', text: 'Repeat 2 times', icon: 'redo' },
                    { id: 'play-piano', type: 'motion', text: 'Play Piano', icon: 'music' },
                    { id: 'repeat-3', type: 'loop', text: 'Repeat 3 times', icon: 'redo' },
                    { id: 'play-guitar', type: 'motion', text: 'Play Guitar', icon: 'guitar' }
                ],
                solution: ['repeat-4', 'play-drum', 'repeat-2', 'play-piano', 'repeat-3', 'play-guitar'],
                isNested: true
            },
            // Level 17 - Space Mission (Advanced technical sequence)
            17: {
                title: "Space Mission",
                description: "Program a complex space mission with multiple repeated operations using nested loops.",
                goal: "Complete the space mission with the most efficient loop structure.",
                image: "./images/space-launch.svg",
                blocks: [
                    { id: 'repeat-5', type: 'loop', text: 'Repeat 5 times', icon: 'redo' },
                    { id: 'scan-planet', type: 'motion', text: 'Scan Planet', icon: 'search' },
                    { id: 'repeat-3', type: 'loop', text: 'Repeat 3 times', icon: 'redo' },
                    { id: 'collect-sample', type: 'motion', text: 'Collect Sample', icon: 'vial' },
                    { id: 'analyze-data', type: 'motion', text: 'Analyze Data', icon: 'microscope' }
                ],
                solution: ['repeat-5', 'scan-planet', 'repeat-3', 'collect-sample', 'analyze-data'],
                isNested: true
            },
            // Level 18 - Flower Garden (Advanced pattern)
            18: {
                title: "Flower Garden",
                description: "Plant a garden with different types of flowers using nested loops for pattern creation.",
                goal: "Create a beautiful garden pattern with efficient nested loops.",
                image: "./images/flower.svg",
                blocks: [
                    { id: 'repeat-4', type: 'loop', text: 'Repeat 4 times', icon: 'redo' },
                    { id: 'plant-rose', type: 'motion', text: 'Plant Rose', icon: 'seedling' },
                    { id: 'repeat-3', type: 'loop', text: 'Repeat 3 times', icon: 'redo' },
                    { id: 'plant-tulip', type: 'motion', text: 'Plant Tulip', icon: 'leaf' },
                    { id: 'move-position', type: 'motion', text: 'Move Position', icon: 'arrows-alt' }
                ],
                solution: ['repeat-4', 'plant-rose', 'repeat-3', 'plant-tulip', 'move-position'],
                isNested: true
            },
            // Level 19 - Robot Maze Challenge (Advanced navigation with multiple nested loops)
            19: {
                title: "Robot Maze Challenge",
                description: "Navigate a complex maze using multiple nested loops for efficient movement.",
                goal: "Guide the robot through the maze with the most efficient loop structures.",
                image: "./images/robot-treasure-hunt.svg",
                blocks: [
                    { id: 'repeat-3', type: 'loop', text: 'Repeat 3 times', icon: 'redo' },
                    { id: 'move-forward', type: 'motion', text: 'Move Forward', icon: 'arrow-up' },
                    { id: 'turn-right', type: 'motion', text: 'Turn Right', icon: 'arrow-right' },
                    { id: 'repeat-2', type: 'loop', text: 'Repeat 2 times', icon: 'redo' },
                    { id: 'turn-left', type: 'motion', text: 'Turn Left', icon: 'arrow-left' },
                    { id: 'move-twice', type: 'motion', text: 'Move Twice', icon: 'forward' },
                    { id: 'pick-up', type: 'motion', text: 'Pick Up Treasure', icon: 'box' }
                ],
                solution: ['repeat-3', 'move-forward', 'turn-right', 'repeat-2', 'turn-left', 'move-twice', 'pick-up'],
                isNested: true
            },
            // Level 20 - Pixel Art (Most advanced pattern)
            20: {
                title: "Pixel Art",
                description: "Create a pixel art masterpiece using complex nested loops for color patterns.",
                goal: "Draw a complete pixel image with the most efficient loop structures.",
                image: "./images/pixel-art.svg",
                blocks: [
                    { id: 'repeat-8', type: 'loop', text: 'Repeat 8 times', icon: 'redo' },
                    { id: 'change-row', type: 'motion', text: 'Change Row', icon: 'arrow-down' },
                    { id: 'repeat-8', type: 'loop', text: 'Repeat 8 times', icon: 'redo' },
                    { id: 'set-pixel', type: 'motion', text: 'Set Pixel', icon: 'square' },
                    { id: 'change-column', type: 'motion', text: 'Change Column', icon: 'arrow-right' },
                    { id: 'change-color', type: 'motion', text: 'Change Color', icon: 'palette' }
                ],
                solution: ['repeat-8', 'change-row', 'repeat-8', 'set-pixel', 'change-column', 'change-color'],
                isNested: true
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
                    { id: 'define-dance', type: 'procedure', text: 'Define: Dance Move', icon: 'cube' },
                    { id: 'step-right', type: 'motion', text: 'Step Right', icon: 'arrow-right' },
                    { id: 'step-left', type: 'motion', text: 'Step Left', icon: 'arrow-left' },
                    { id: 'spin', type: 'motion', text: 'Spin', icon: 'sync' },
                    { id: 'jump', type: 'motion', text: 'Jump', icon: 'angle-double-up' },
                    { id: 'call-dance', type: 'procedure', text: 'Run: Dance Move', icon: 'play' }
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
                    { id: 'define-square', type: 'procedure', text: 'Define: Draw Square', icon: 'cube' },
                    { id: 'move-forward', type: 'motion', text: 'Move Forward', icon: 'arrow-up' },
                    { id: 'turn-right', type: 'motion', text: 'Turn Right', icon: 'redo' },
                    { id: 'call-square', type: 'procedure', text: 'Run: Draw Square', icon: 'play' }
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
                    { id: 'define-morning', type: 'procedure', text: 'Define: Morning Routine', icon: 'cube' },
                    { id: 'wake-up', type: 'motion', text: 'Wake Up', icon: 'bell' },
                    { id: 'brush-teeth', type: 'motion', text: 'Brush Teeth', icon: 'tooth' },
                    { id: 'get-dressed', type: 'motion', text: 'Get Dressed', icon: 'tshirt' },
                    { id: 'eat-breakfast', type: 'motion', text: 'Eat Breakfast', icon: 'utensils' },
                    { id: 'call-morning', type: 'procedure', text: 'Run: Morning Routine', icon: 'play' }
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
                    { id: 'define-sandwich', type: 'procedure', text: 'Define: Make Sandwich', icon: 'cube' },
                    { id: 'get-bread', type: 'motion', text: 'Get Bread Slice', icon: 'bread-slice' },
                    { id: 'add-cheese', type: 'motion', text: 'Add Cheese', icon: 'cheese' },
                    { id: 'add-lettuce', type: 'motion', text: 'Add Lettuce', icon: 'leaf' },
                    { id: 'top-bread', type: 'motion', text: 'Add Top Bread', icon: 'bread-slice' },
                    { id: 'call-sandwich', type: 'procedure', text: 'Run: Make Sandwich', icon: 'play' }
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
                    { id: 'define-path', type: 'procedure', text: 'Define: Navigate Path', icon: 'cube' },
                    { id: 'move-forward', type: 'motion', text: 'Move Forward', icon: 'arrow-up' },
                    { id: 'turn-right', type: 'motion', text: 'Turn Right', icon: 'redo' },
                    { id: 'turn-left', type: 'motion', text: 'Turn Left', icon: 'undo' },
                    { id: 'call-path', type: 'procedure', text: 'Run: Navigate Path', icon: 'play' }
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
                    { id: 'define-plant', type: 'procedure', text: 'Define: Plant Care', icon: 'cube' },
                    { id: 'check-soil', type: 'motion', text: 'Check Soil', icon: 'search' },
                    { id: 'add-water', type: 'motion', text: 'Add Water', icon: 'tint' },
                    { id: 'place-sunlight', type: 'motion', text: 'Place in Sunlight', icon: 'sun' },
                    { id: 'remove-leaves', type: 'motion', text: 'Remove Dead Leaves', icon: 'cut' },
                    { id: 'call-plant', type: 'procedure', text: 'Run: Plant Care', icon: 'play' }
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
                    { id: 'define-weather', type: 'procedure', text: 'Define: Weather Report', icon: 'cube' },
                    { id: 'check-temp', type: 'motion', text: 'Check Temperature', icon: 'thermometer-half' },
                    { id: 'look-outside', type: 'motion', text: 'Look Outside', icon: 'eye' },
                    { id: 'check-clouds', type: 'motion', text: 'Check for Clouds', icon: 'cloud' },
                    { id: 'announce-forecast', type: 'motion', text: 'Announce Forecast', icon: 'microphone' },
                    { id: 'call-weather', type: 'procedure', text: 'Run: Weather Report', icon: 'play' }
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
                    { id: 'define-carwash', type: 'procedure', text: 'Define: Car Wash', icon: 'cube' },
                    { id: 'rinse-car', type: 'motion', text: 'Rinse Car', icon: 'shower' },
                    { id: 'apply-soap', type: 'motion', text: 'Apply Soap', icon: 'soap' },
                    { id: 'scrub-car', type: 'motion', text: 'Scrub Car', icon: 'brush' },
                    { id: 'rinse-again', type: 'motion', text: 'Rinse Again', icon: 'tint' },
                    { id: 'dry-car', type: 'motion', text: 'Dry Car', icon: 'wind' },
                    { id: 'call-carwash', type: 'procedure', text: 'Run: Car Wash', icon: 'play' }
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
                    { id: 'define-star', type: 'procedure', text: 'Define: Draw Star', icon: 'cube' },
                    { id: 'move-forward', type: 'motion', text: 'Move Forward', icon: 'arrow-up' },
                    { id: 'turn-right', type: 'motion', text: 'Turn Right', icon: 'redo' },
                    { id: 'turn-left', type: 'motion', text: 'Turn Left', icon: 'undo' },
                    { id: 'call-star', type: 'procedure', text: 'Run: Draw Star', icon: 'play' }
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
                    { id: 'define-science', type: 'procedure', text: 'Define: Science Experiment', icon: 'cube' },
                    { id: 'question', type: 'motion', text: 'Ask Question', icon: 'question' },
                    { id: 'hypothesis', type: 'motion', text: 'Form Hypothesis', icon: 'lightbulb' },
                    { id: 'gather-materials', type: 'motion', text: 'Gather Materials', icon: 'toolbox' },
                    { id: 'test', type: 'motion', text: 'Test Hypothesis', icon: 'vial' },
                    { id: 'analyze', type: 'motion', text: 'Analyze Results', icon: 'chart-bar' },
                    { id: 'conclude', type: 'motion', text: 'Make Conclusion', icon: 'check-circle' },
                    { id: 'call-science', type: 'procedure', text: 'Run: Science Experiment', icon: 'play' }
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
                    { id: 'define-music', type: 'procedure', text: 'Define: Compose Music', icon: 'cube' },
                    { id: 'choose-instrument', type: 'motion', text: 'Choose Instrument', icon: 'guitar' },
                    { id: 'set-tempo', type: 'motion', text: 'Set Tempo', icon: 'clock' },
                    { id: 'write-notes', type: 'motion', text: 'Write Notes', icon: 'music' },
                    { id: 'add-rhythm', type: 'motion', text: 'Add Rhythm', icon: 'drum' },
                    { id: 'practice', type: 'motion', text: 'Practice Playing', icon: 'play' },
                    { id: 'perform', type: 'motion', text: 'Perform Song', icon: 'microphone' },
                    { id: 'call-music', type: 'procedure', text: 'Run: Compose Music', icon: 'play' }
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
                    { id: 'define-search', type: 'procedure', text: 'Define: Search Area', icon: 'cube' },
                    { id: 'scan-ground', type: 'motion', text: 'Scan Ground', icon: 'search' },
                    { id: 'mark-spot', type: 'motion', text: 'Mark Spot', icon: 'map-marker' },
                    { id: 'define-dig', type: 'procedure', text: 'Define: Dig For Treasure', icon: 'cube' },
                    { id: 'get-shovel', type: 'motion', text: 'Get Shovel', icon: 'toolbox' },
                    { id: 'dig-hole', type: 'motion', text: 'Dig Hole', icon: 'hands' },
                    { id: 'find-chest', type: 'motion', text: 'Find Chest', icon: 'box' },
                    { id: 'define-hunt', type: 'procedure', text: 'Define: Treasure Hunt', icon: 'cube' },
                    { id: 'call-search', type: 'procedure', text: 'Run: Search Area', icon: 'play' },
                    { id: 'call-dig', type: 'procedure', text: 'Run: Dig For Treasure', icon: 'play' },
                    { id: 'celebrate', type: 'motion', text: 'Celebrate', icon: 'trophy' },
                    { id: 'call-hunt', type: 'procedure', text: 'Run: Treasure Hunt', icon: 'play' }
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
                    { id: 'define-launch', type: 'procedure', text: 'Define: Launch Rocket', icon: 'cube' },
                    { id: 'fuel-rocket', type: 'motion', text: 'Fuel Rocket', icon: 'gas-pump' },
                    { id: 'countdown', type: 'motion', text: 'Countdown', icon: 'stopwatch' },
                    { id: 'ignite', type: 'motion', text: 'Ignite Engines', icon: 'fire' },
                    
                    { id: 'define-orbit', type: 'procedure', text: 'Define: Orbit Earth', icon: 'cube' },
                    { id: 'reach-space', type: 'motion', text: 'Reach Space', icon: 'rocket' },
                    { id: 'deploy-panels', type: 'motion', text: 'Deploy Solar Panels', icon: 'solar-panel' },
                    { id: 'take-photos', type: 'motion', text: 'Take Photos', icon: 'camera' },
                    
                    { id: 'define-land', type: 'procedure', text: 'Define: Land Safely', icon: 'cube' },
                    { id: 'reentry', type: 'motion', text: 'Reentry Sequence', icon: 'arrow-down' },
                    { id: 'deploy-chutes', type: 'motion', text: 'Deploy Parachutes', icon: 'parachute-box' },
                    { id: 'touchdown', type: 'motion', text: 'Touchdown', icon: 'check' },
                    
                    { id: 'define-mission', type: 'procedure', text: 'Define: Mission Control', icon: 'cube' },
                    { id: 'call-launch', type: 'procedure', text: 'Run: Launch Rocket', icon: 'play' },
                    { id: 'call-orbit', type: 'procedure', text: 'Run: Orbit Earth', icon: 'play' },
                    { id: 'call-land', type: 'procedure', text: 'Run: Land Safely', icon: 'play' },
                    { id: 'call-mission', type: 'procedure', text: 'Run: Mission Control', icon: 'play' }
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
                    { id: 'define-morning', type: 'procedure', text: 'Define: Morning Mode', icon: 'cube' },
                    { id: 'lights-on', type: 'motion', text: 'Turn On Lights', icon: 'lightbulb' },
                    { id: 'heat-on', type: 'motion', text: 'Turn On Heat', icon: 'temperature-high' },
                    { id: 'play-news', type: 'motion', text: 'Play News', icon: 'newspaper' },
                    
                    { id: 'define-day', type: 'procedure', text: 'Define: Day Mode', icon: 'cube' },
                    { id: 'lights-off', type: 'motion', text: 'Turn Off Lights', icon: 'power-off' },
                    { id: 'temp-medium', type: 'motion', text: 'Set Medium Temperature', icon: 'thermometer-half' },
                    { id: 'security-on', type: 'motion', text: 'Turn On Security', icon: 'shield-alt' },
                    
                    { id: 'define-night', type: 'procedure', text: 'Define: Night Mode', icon: 'cube' },
                    { id: 'dim-lights', type: 'motion', text: 'Dim Lights', icon: 'adjust' },
                    { id: 'lock-doors', type: 'motion', text: 'Lock All Doors', icon: 'lock' },
                    { id: 'night-temp', type: 'motion', text: 'Set Night Temperature', icon: 'moon' },
                    
                    { id: 'define-home', type: 'procedure', text: 'Define: Smart Home', icon: 'cube' },
                    { id: 'call-morning', type: 'procedure', text: 'Run: Morning Mode', icon: 'play' },
                    { id: 'call-day', type: 'procedure', text: 'Run: Day Mode', icon: 'play' },
                    { id: 'call-night', type: 'procedure', text: 'Run: Night Mode', icon: 'play' },
                    { id: 'call-home', type: 'procedure', text: 'Run: Smart Home', icon: 'play' }
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
                    { id: 'define-character', type: 'procedure', text: 'Define: Character Design', icon: 'cube' },
                    { id: 'sketch-hero', type: 'motion', text: 'Sketch Hero', icon: 'user-astronaut' },
                    { id: 'design-abilities', type: 'motion', text: 'Design Abilities', icon: 'bolt' },
                    { id: 'create-animation', type: 'motion', text: 'Create Animation', icon: 'running' },
                    
                    { id: 'define-level', type: 'procedure', text: 'Define: Level Building', icon: 'cube' },
                    { id: 'design-map', type: 'motion', text: 'Design Map', icon: 'map' },
                    { id: 'add-obstacles', type: 'motion', text: 'Add Obstacles', icon: 'mountains' },
                    { id: 'place-treasure', type: 'motion', text: 'Place Treasure', icon: 'gem' },
                    { id: 'add-enemies', type: 'motion', text: 'Add Enemies', icon: 'ghost' },
                    
                    { id: 'define-testing', type: 'procedure', text: 'Define: Game Testing', icon: 'cube' },
                    { id: 'test-controls', type: 'motion', text: 'Test Controls', icon: 'gamepad' },
                    { id: 'find-bugs', type: 'motion', text: 'Find Bugs', icon: 'bug' },
                    { id: 'fix-issues', type: 'motion', text: 'Fix Issues', icon: 'wrench' },
                    { id: 'play-game', type: 'motion', text: 'Play Full Game', icon: 'play-circle' },
                    
                    { id: 'define-development', type: 'procedure', text: 'Define: Game Development', icon: 'cube' },
                    { id: 'call-character', type: 'procedure', text: 'Run: Character Design', icon: 'play' },
                    { id: 'call-level', type: 'procedure', text: 'Run: Level Building', icon: 'play' },
                    { id: 'call-testing', type: 'procedure', text: 'Run: Game Testing', icon: 'play' },
                    { id: 'release-game', type: 'motion', text: 'Release Game', icon: 'rocket' },
                    { id: 'call-development', type: 'procedure', text: 'Run: Game Development', icon: 'play' }
                ],
                solution: ['define-character', 'sketch-hero', 'design-abilities', 'create-animation', 'define-level', 'design-map', 'add-obstacles', 'place-treasure', 'add-enemies', 'define-testing', 'test-controls', 'find-bugs', 'fix-issues', 'play-game', 'define-development', 'call-character', 'call-level', 'call-testing', 'release-game', 'call-development'],
                isNested: true
            }
        }
    };

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
    
    // --- INITIALIZATION ---
    function init() {
        console.log('Initializing Code Blocks Adventure...');
        
        try {
            // Set up challenge selection listeners
            document.querySelectorAll('.challenges-list .list-group-item').forEach(item => {
                console.log('Setting up click handler for category:', item.dataset.category);
                item.addEventListener('click', () => {
                    console.log('Category clicked:', item.dataset.category);
                    document.querySelectorAll('.challenges-list .list-group-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    currentCategory = item.dataset.category;
                    currentLevel = 1; // Reset level when changing categories
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
            
            document.getElementById('check-btn').addEventListener('click', function() {
                console.log('Check button clicked');
                checkSolution();
            });
            
            document.getElementById('reset-btn').addEventListener('click', function() {
                console.log('Reset button clicked');
                resetWorkspace();
            });
            
            document.getElementById('help-btn').addEventListener('click', function() {
                console.log('Help button clicked');
                showHelp();
            });
    
            // Initialize Bootstrap elements
            initBootstrap();
    
            // Initialize first challenge
            loadChallenge();
            updateUI();
            
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
        // Clear existing blocks
        blockPalette.innerHTML = '';
        blocksContainer.innerHTML = '';
        userBlocks = [];
        
        // Clear any existing highlighting
        document.querySelectorAll('.block').forEach(blockEl => {
            blockEl.classList.remove('block-correct', 'block-incorrect');
        });
        
        const challenge = getCurrentChallenge();
        if (!challenge) return;
        
        // Update challenge information
        challengeTitle.textContent = `${capitalizeFirstLetter(currentCategory)} Challenge`;
        taskTitle.textContent = challenge.title;
        taskDescription.textContent = challenge.description;
        taskGoal.textContent = challenge.goal;
        challengeImage.src = challenge.image;
        challengeImage.alt = challenge.title;
        
        // Ensure the image has modal attributes
        challengeImage.setAttribute('data-bs-toggle', 'modal');
        challengeImage.setAttribute('data-bs-target', '#imageModal');
        challengeImage.style.cursor = 'pointer';
        
        // Simple preloading for better performance
        console.log('Loading challenge image:', challenge.image);;
        // Level number is now shown only in the sidebar
        
        // Create a shuffled copy of blocks
        let shuffledBlocks = [...challenge.blocks];
        shuffleArray(shuffledBlocks);
        
        // Add blocks to palette in shuffled order
        shuffledBlocks.forEach(block => {
            const blockElement = createBlockElement(block);
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
    }
    
    function createBlockElement(block) {
        const blockElement = document.createElement('div');
        blockElement.className = `block block-${block.type}`;
        blockElement.dataset.id = block.id;
        blockElement.draggable = true;
        
        const icon = document.createElement('span');
        icon.className = `icon fas fa-${block.icon}`;
        blockElement.appendChild(icon);
        
        const text = document.createTextNode(block.text);
        blockElement.appendChild(text);
        
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
        const blockElement = createBlockElement(block);
        blocksContainer.appendChild(blockElement);
        userBlocks.push(block.id);
        
        // If this is a nested block (like a loop), add a container for nested blocks
        if (block.type === 'loop' || block.type === 'conditions' || block.type === 'procedure') {
            const containerElement = document.createElement('div');
            containerElement.className = 'block-container';
            containerElement.dataset.parentId = block.id;
            blocksContainer.appendChild(containerElement);
        }
        
        playSound('click');
        resetFeedback();
    }
    
    function setupDragAndDrop() {
        // Make the block palette sortable
        new Sortable(blockPalette, {
            group: {
                name: 'shared',
                pull: 'clone',
                put: false
            },
            animation: 150,
            sort: false,
            ghostClass: 'block-placeholder'
        });
        
        // Make the workspace sortable
        new Sortable(blocksContainer, {
            group: {
                name: 'shared',
                pull: false
            },
            animation: 150,
            ghostClass: 'block-placeholder',
            onSort: function() {
                // Update userBlocks array based on the current DOM order
                userBlocks = Array.from(blocksContainer.querySelectorAll('.block')).map(el => el.dataset.id);
                resetFeedback();
            }
        });
        
        // Set up block selection and removal
        const removeBlockBtn = document.getElementById('remove-block-btn');
        let selectedBlock = null;
        
        // Initially disable the remove button
        removeBlockBtn.disabled = true;
        
        // Function to handle block selection
        blocksContainer.addEventListener('click', function(e) {
            const blockEl = e.target.closest('.block');
            if (!blockEl) return;
            
            // Clear previous selection
            document.querySelectorAll('.block-selected').forEach(el => {
                el.classList.remove('block-selected');
            });
            
            // Select new block
            blockEl.classList.add('block-selected');
            selectedBlock = blockEl;
            
            // Enable remove button
            removeBlockBtn.disabled = false;
            removeBlockBtn.classList.add('active');
            
            // Play sound
            playSound('click');
        });
        
        // Remove selected block when button is clicked
        removeBlockBtn.addEventListener('click', function() {
            if (selectedBlock) {
                // Get block name for feedback
                const blockName = selectedBlock.textContent.trim();
                
                // Remove the block
                selectedBlock.remove();
                selectedBlock = null;
                
                // Update user blocks array
                userBlocks = Array.from(blocksContainer.querySelectorAll('.block')).map(el => el.dataset.id);
                
                // Play sound and show feedback
                playSound('error');
                setFeedback(`Removed "${blockName}" block`, 'running');
                
                // Disable remove button
                removeBlockBtn.disabled = true;
                removeBlockBtn.classList.remove('active');
            }
        });
        
        // Clear selection when clicking outside blocks
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.block') && !e.target.closest('#remove-block-btn')) {
                document.querySelectorAll('.block-selected').forEach(el => {
                    el.classList.remove('block-selected');
                });
                selectedBlock = null;
                removeBlockBtn.disabled = true;
                removeBlockBtn.classList.remove('active');
            }
        });
    }
    
    // --- EXECUTION FUNCTIONS ---
    function runProgram() {
        resetAnimationArea();
        setFeedback('Running your program...', 'running');
        
        if (userBlocks.length === 0) {
            setFeedback('Add some blocks to your program first!', 'error');
            return;
        }
        
        // Animate blocks being executed
        animateExecution();
    }
    
    function animateExecution() {
        const blocks = blocksContainer.querySelectorAll('.block');
        const animationSteps = [];
        
        // Create animation area content
        animationArea.innerHTML = '';
        const animationTitle = document.createElement('h5');
        animationTitle.textContent = 'Program Output:';
        animationArea.appendChild(animationTitle);
        
        // Run through each block and create animation steps
        blocks.forEach((block, index) => {
            setTimeout(() => {
                // Highlight current block
                blocks.forEach(b => b.classList.remove('block-running'));
                block.classList.add('block-running');
                
                // Add step to animation area
                const step = document.createElement('div');
                step.className = 'animation-step';
                step.innerHTML = `<i class="fas fa-${block.querySelector('.icon').className.split('fa-')[1]}"></i> ${block.textContent.trim()}`;
                animationArea.appendChild(step);
                animationArea.scrollTop = animationArea.scrollHeight;
                
                // Play sound
                playSound('click');
                
                // Last step - show completion
                if (index === blocks.length - 1) {
                    setTimeout(() => {
                        blocks.forEach(b => b.classList.remove('block-running'));
                        setFeedback('Program completed! Now check your solution.', 'success');
                    }, 1000);
                }
            }, index * 1000);
        });
    }
    
    function checkSolution() {
        const challenge = getCurrentChallenge();
        if (!challenge) return;
        
        const solution = challenge.solution;
        let isCorrect = false;
        
        if (currentCategory === 'procedures') {
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
            setFeedback('🎉 Perfect! Your solution is correct!', 'success');
            playSound('success');
            
            // Mark challenge as completed
            if (!completedChallenges[currentCategory].includes(currentLevel)) {
                completedChallenges[currentCategory].push(currentLevel);
                updateProgress();
            }
            
            // Show next level button if available
            if (challenges[currentCategory][currentLevel + 1]) {
                const nextButton = document.createElement('button');
                nextButton.className = 'btn btn-primary mt-3';
                nextButton.innerHTML = '<i class="fas fa-forward"></i> Next Level';
                nextButton.addEventListener('click', () => {
                    currentLevel++;
                    loadChallenge();
                    updateUI();
                });
                feedbackArea.appendChild(nextButton);
            }
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
            
            let feedbackMessage = 'Not quite right. Try again!';
            if (misplacedBlocks.length > 0) {
                // Count correct and incorrect blocks
                const correctCount = document.querySelectorAll('.block-correct').length;
                const incorrectCount = document.querySelectorAll('.block-incorrect').length;
                
                feedbackMessage += `<br><span class="hint-text">
                    <i class="fas fa-lightbulb"></i> Hint: You have ${correctCount} block${correctCount !== 1 ? 's' : ''} in the correct position 
                    (green outline) and ${incorrectCount} block${incorrectCount !== 1 ? 's' : ''} that need attention (red outline).
                </span>`;
            }
            
            setFeedback(feedbackMessage, 'error');
            playSound('error');
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
        
        // Remove any highlighting from blocks (in case there are any blocks left)
        document.querySelectorAll('.block').forEach(blockEl => {
            blockEl.classList.remove('block-correct', 'block-incorrect');
        });
        
        resetFeedback();
        resetAnimationArea();
        playSound('click');
    }
    
    function resetFeedback() {
        feedbackArea.className = 'feedback mt-3 p-3 rounded';
        feedbackArea.innerHTML = '<p>Drag blocks from the left panel and drop them here to build your program!</p>';
    }
    
    function setFeedback(message, type) {
        feedbackArea.className = `feedback mt-3 p-3 rounded feedback-${type}`;
        feedbackArea.innerHTML = `<p>${message}</p>`;
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
                <p>Loops are special blocks that let you repeat actions without writing them over and over again!</p>
                <ul>
                    <li>A loop block (pink color) tells the computer to repeat something multiple times</li>
                    <li>The blocks that come after the loop are the actions that will be repeated</li>
                    <li>Loops help make your code shorter and more efficient</li>
                </ul>
            `;
            
            // Add level-specific help
            const loopsHelpTexts = {
                1: `
                    <h5>Paint a Fence Help:</h5>
                    <p>In this challenge, you need to paint 5 fence posts.</p>
                    <ol>
                        <li>Use the "Repeat 5 times" block to create a loop</li>
                        <li>Add the "Paint Post" action after it</li>
                        <li>This tells the computer: "Paint a post, then do it again 4 more times!"</li>
                    </ol>
                `,
                3: `
                    <h5>Draw a Square Help:</h5>
                    <p>A square has 4 equal sides and 4 right angles.</p>
                    <ol>
                        <li>Add the "Repeat 4 times" loop block first</li>
                        <li>Then add the "Draw Line" action</li>
                        <li>Finally add "Turn Right 90°" to make a corner</li>
                        <li>When repeated 4 times, this creates all four sides of a square!</li>
                    </ol>
                `,
                6: `
                    <h5>Robot Path Help:</h5>
                    <p>The robot needs to navigate a zigzag path with repeated movements.</p>
                    <ol>
                        <li>Use "Repeat 3 times" to create a loop for the zigzag pattern</li>
                        <li>Inside this loop, add these actions in order:</li>
                        <ul>
                            <li>Move Forward (moves horizontally)</li>
                            <li>Turn Right (changes direction downward)</li>
                            <li>Move Forward (moves downward)</li>
                            <li>Turn Left (changes direction horizontally again)</li>
                        </ul>
                    </ol>
                    <p>This creates a perfect zigzag pattern to reach the finish!</p>
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
            5: `
                <h5>Help the Robot Find Treasure:</h5>
                <p>Look closely at the maze image and follow these steps:</p>
                <ol>
                    <li>The robot starts at the beginning of the maze</li>
                    <li>First move forward to enter the maze</li>
                    <li>Turn right at the first intersection</li>
                    <li>Move forward along the path</li>
                    <li>Turn left when you reach the wall</li>
                    <li>Move forward to reach the treasure</li>
                    <li>Pick up the treasure once you reach it</li>
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