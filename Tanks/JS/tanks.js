var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'gameID', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('sky', 'IMG/sky.png');
    game.load.image('ground', 'IMG/ground.png');
    game.load.image('player1', 'IMG/prototank.png');
}

var platforms; //global platform group variable

function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    /*//  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;*/
    
    //  A simple background for our game
    game.add.sprite(0, 0, 'sky'); 
    
    //game.add.sprite(0, 150, 'ground');

   //  The platforms group contains the ground
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 450, 'ground');
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    //ground.scale.setTo(2, 2);
    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;
    
    // The player and its settings
    player1 = game.add.sprite(100, game.world.height - 560, 'player1');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player1);

    //  Player physics properties. Give the little guy a slight bounce.
    player1.body.bounce.y = 0.2;
    player1.body.gravity.y = 300;
    player1.body.collideWorldBounds = true;
    

}

function update() {
    //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player1, platforms);
}