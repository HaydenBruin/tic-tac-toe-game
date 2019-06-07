(function () {

    let settings = {
        isXTurn: true
    }
    let blocks = [
        { value: "", rules: [[0, 1, 2], [0, 3, 6], [0, 4, 8]] },
        { value: "", rules: [[1, 4, 7]] },
        { value: "", rules: [[0, 1, 2], [2, 4, 6], [2, 5, 8]] },
        { value: "", rules: [[0, 3, 6], [3, 4, 5]] },
        { value: "", rules: [[0, 4, 8], [1, 4, 7], [3, 4, 8], [2, 4, 6]] },
        { value: "", rules: [[2, 5, 8], [3, 4, 5]] },
        { value: "", rules: [[0, 3, 6], [2, 4, 6], [6, 7, 8]] },
        { value: "", rules: [[1, 4, 7], [6, 7, 8]] },
        { value: "", rules: [[2, 5, 8], [6, 7, 8]] }
    ]


    const hasPlayerWonRound = function (block) {
        const playerIcon = settings.isXTurn ? "X" : "O";
        let winner = false;
        block.rules.forEach(rule => {
            if (
                blocks[rule[0]].value === playerIcon &&
                blocks[rule[1]].value === playerIcon &&
                blocks[rule[2]].value === playerIcon) {
                winner = true;
            }
        })
        return winner;
    }

    const render = function () {

        // Update Game Status
        document.querySelector('#game-turn').innerHTML = `It's ${settings.isXTurn ? "X's turn" : "O's turn"}`;

        // Render Blocks
        let renderBlocks = `<div class="blocks">`;
        blocks.forEach((block, index) => {
            renderBlocks = renderBlocks + `<div class="block" data-block-id=${index}>${block.value}</div>`;
        })
        renderBlocks = renderBlocks + "</div>";
        document.querySelector('#game-board').innerHTML = renderBlocks;

        // Add click event

        document.querySelectorAll('.block').forEach(input => input.addEventListener('click', function () {
            const block = blocks[this.getAttribute('data-block-id')];
            if (block.value) return null;

            // Update block value and check if won
            block.value = settings.isXTurn ? "X" : "O";
            if (hasPlayerWonRound(block)) {
                document.querySelector('#game-won').innerHTML = `<h2>${settings.isXTurn ? "X" : "O"} has won the game!</h2>`;
                document.querySelector('#game-turn').style.display = "none";
            }

            // ReRender game board
            settings.isXTurn = !settings.isXTurn;
            render();
        }))
    }

    // Render Game
    render();


})();