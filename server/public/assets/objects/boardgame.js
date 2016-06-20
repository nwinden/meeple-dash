function Boardgame(game) {

  this.apiID =  game._objectid;

  this.categories = [];

  if (game.boardgamecategory) {

    if (Array.isArray(game.boardgamecategory)) {

      for (var i = 0; i < game.boardgamecategory.length; i++) {

        this.categories.push(game.boardgamecategory[i].__text);

      }

    } else {

      this.categories.push(game.boardgamecategory.__text);

    }

  }

  if (game.boardgamemechanic) {

    if (Array.isArray(game.boardgamemechanic)) {

      for (var i = 0; i < game.boardgamemechanic.length; i++) {

        this.categories.push(game.boardgamemechanic[i].__text);

      }

    } else {

      this.categories.push(game.boardgamemechanic.__text);

    }

  }

  if (game.boardgamesubdomain) {

    if (Array.isArray(game.boardgamesubdomain)) {

      for (var i = 0; i < game.boardgamesubdomain.length; i++) {

        this.categories.push(game.boardgamesubdomain[i].__text);

      }

    } else {

      this.categories.push(game.boardgamesubdomain.__text);

    }

  }

  if (this.categories == []) {

    this.categories.push('Not Provided');

  }

  this.dbstored = '';

  this.description = trimHTML(game.description);

  this.designers = [];

  if (game.boardgamedesigner) {

    if (Array.isArray(game.boardgamedesigner)) {

      for (var i = 0; i < game.boardgamedesigner.length; i++) {

        this.designers.push(game.boardgamedesigner[i].__text);

      }

    } else {

      this.designers = [game.boardgamedesigner.__text];

    }

  } else {

    this.designers = ['Not Provided'];

  }

  this.publishers = [];

  if (game.boardgamepublisher) {

    if (Array.isArray(game.boardgamepublisher)) {

      for (var i = 0; i < game.boardgamepublisher.length; i++) {

        this.publishers.push(game.boardgamepublisher[i].__text);

      }

    } else {

      this.publishers = [game.boardgamepublisher.__text];

    }

  } else {

    this.publishers = ['Not Provided'];

  }

  this.image = game.image ? 'http:' + game.image : '/assets/images/img_not_available.png';

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

  this.suggestedAge = game.age != 0 ? game.age : 'Not Provided';

  this.yearPublished = game.yearpublished != 0 ? game.yearpublished : 'Not Provided';

  function trimHTML(str) {
    for (var i = 0; i < str.length; i++) {
      if (str[i] == '<') {
        str = str.substring(0, i) + ' ' + str.substring(i+10);
      }
    }
    return str;
  }

}
