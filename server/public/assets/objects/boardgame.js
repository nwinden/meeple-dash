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


  this.maxPlayers = Number(game.maxplayers);

  this.maxPlaytime = Number(game.maxplaytime);

  this.minPlayers = Number(game.minplayers);

  this.minPlaytime = Number(game.minplaytime);

  if (Array.isArray(game.name)) {
    for (var i = 0; i < game.name.length ; i++) {
      if (game.name[i]._primary) {
        this.name = game.name[i].__text;
      }
    }
  } else {
    this.name = game.name.__text;
  }

  this.thumbnail = game.thumbnail ? game.thumbnail : '/assets/images/img_not_available.png';

  if (game.age != 0) {
    this.suggestedAge = game.age;
  } else {
    this.suggestedAge = 'Not Provided';
  }

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
