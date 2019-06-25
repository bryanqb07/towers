class View{
    constructor(game, $el){
        this.game = game;
        this.$el = $el;
        this.setupTowers();
        this.bindEvents();
        this.numClicks = 0;
        this.$towerIDX1;
        this.$towerIDX2;
    }

    setupTowers() {
        var $towerWrapper = $("<div></div>").addClass("tower-wrapper");
        this.game.towers.forEach((tower, index) => {
            var $tower = $("<ul>").addClass("tower").attr("id", `tower${index}`);
            var $discWrapper = $("<div></div>").addClass("disk-wrapper");
            tower.forEach((ele) => {
                var $disc = $("<li>").addClass("disk").attr("id", `disk${ele}`);
                $discWrapper.append($disc);
            });
            $tower.append($discWrapper);
            var $towerName = $(`<h1>Tower ${index}</h1>`).addClass("tower-name");
            $tower.append($towerName);
            $towerWrapper.append($tower);
        });
        this.$el.append($towerWrapper);
    }

    bindEvents(){
        var $towerWrapper = $(".tower-wrapper");
        $towerWrapper.on("click", "ul", (event) => {
     
            if (this.numClicks === 0 && $(event.currentTarget).children().children().length > 0) {
                this.$towerIDX1 = event.currentTarget;
                $(this.$towerIDX1).children().toggleClass("selected");
                this.numClicks++;
            }   
            else if (this.numClicks === 1 && event.currentTarget !== this.$towerIDX1) {
                $(this.$towerIDX1).children().toggleClass("selected");
                this.$towerIDX2 = event.currentTarget;
                this.numClicks = 0;
                this.render();
            }
        });
    }

    render(){
        var startTowerIdx = parseInt($(this.$towerIDX1).attr("id")[5]); // grab last element of id, idxnumber
        var endTowerIdx = parseInt($(this.$towerIDX2).attr("id")[5]);
        this.game.move(startTowerIdx, endTowerIdx);        
        this.$el.children().remove();
        this.setupTowers();
        this.bindEvents();
        if(this.game.isWon()) {
            this.$el.append("<h1>Congratulations! You win!</h1>");
        }
    }

};

module.exports = View;