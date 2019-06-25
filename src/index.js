const Game = require('./game.js');
const View = require('./hanoi-view.js');

$(() => {
    // Your code here
    var $toh = $(".toh");
    const game = new Game();
    const view = new View(game, $toh);
});