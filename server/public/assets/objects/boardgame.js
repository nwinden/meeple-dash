function Boardgame(game) {

  this.apiID =  game._objectid;

  this.category = [];

  if (Array.isArray(game.boardgamecategory)) {

    for (var i = 0; i < game.boardgamecategory.length; i++) {

      this.category.push(game.boardgamecategory[i].__text);

    }

  } else {

    this.category.push(game.boardgamecategory.__text);

  }

  if (game.boardgamemechanic) {

    if (Array.isArray(game.boardgamemechanic)) {

      for (var i = 0; i < game.boardgamemechanic.length; i++) {

        this.category.push(game.boardgamemechanic[i].__text);

      }

    } else {

      this.category.push(game.boardgamemechanic.__text);

    }

  }

  if (game.boardgamesubdomain) {

    if (Array.isArray(game.boardgamesubdomain)) {

      for (var i = 0; i < game.boardgamesubdomain.length; i++) {

        this.category.push(game.boardgamesubdomain[i].__text);

      }

    } else {

      this.category.push(game.boardgamesubdomain.__text);

    }

  }

  if (this.category == []) {
    this.category.push('Not Provided');
  }

  this.dbstored = '';

  this.description = trimHTML(game.description);

  this.designer = [];

  if (game.boardgamedesigner) {

    if (Array.isArray(game.boardgamedesigner)) {

      for (var i = 0; i < game.boardgamedesigner.length; i++) {

        this.designer.push(game.boardgamedesigner[i].__text);

      }

    } else {

      this.designer = [game.boardgamedesigner.__text];

    }

  } else {

    this.designer = ['Not Provided'];

  }

  if (game.image) {
    this.image = 'http:' + game.image;
  } else {
    this.image = '/assets/images/image_not_avaliable.png';
  }

  this.isLent = false;

  if (game.maxplayers != 0) {
    this.maxPlayers = game.maxplayers;
  } else {
    this.maxPlayers = 'Not Provided';
  }

  if (game.maxplaytime != 0) {
    this.maxPlaytime = game.maxplaytime
  } else {
    this.maxPlaytime = 'Not Provided';
  }

  if (game.minplayers != 0) {
    this.minPlayers = game.minplayers;
  } else {
    this.minPlayers = 'Not Provided';
  }

  if (game.minplaytime != 0) {
    this.minPlaytime = game.minplaytime;
  } else {
    this.minPlaytime = 'Not Provided';
  }

  this.name = game.gamename;

  if (game.age != 0) {
    this.suggestedAge = game.age;
  } else {
    this.suggestedAge = 'Not Provided';
  }

  this.thumbnail = game.thumbnail;

  if (game.yearpublished != 0) {
    this.yearPublished = game.yearpublished;
  } else {
    this.yearPublished = 'Not Provided';
  }

  function trimHTML(str) {
    for (var i = 0; i < str.length; i++) {
      if (str[i] == '<') {
        str = str.substring(0, i) + ' ' + str.substring(i+10);
      }
    }
    return str;
  }

}
