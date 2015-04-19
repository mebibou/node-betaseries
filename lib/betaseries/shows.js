(function() {
  'use strict';

  var API = require('./api').API,
      _api = null,
      _baseUrl = 'https://api.betaseries.com/shows/';

  function Shows() {

  }

  function _getList(type, key, params, callbackSuccess, callbackError) {
    _api.GET(_baseUrl + type, params, function(data) {
      if (callbackSuccess) {
        callbackSuccess(data[key]);
      }
    }, callbackError);
  }

  Shows.prototype.characters = function(id, thetvdb_id, callbackSuccess, callbackError) {
    _getList('characters', 'characters', {
      id: id || '',
      thetvdb_id: thetvdb_id || ''
    }, callbackSuccess, callbackError);
  };

  Shows.prototype.pictures = function(id, thetvdb_id, callbackSuccess, callbackError) {
    _getList('pictures', 'pictures', {
      id: id || '',
      thetvdb_id: thetvdb_id || ''
    }, callbackSuccess, callbackError);
  };

  Shows.prototype.episodes = function(id, thetvdb_id, callbackSuccess, callbackError) {
    _getList('episodes', 'episodes', {
      id: id || '',
      thetvdb_id: thetvdb_id || ''
    }, callbackSuccess, callbackError);
  };

  Shows.prototype.all = function(order, since, callbackSuccess, callbackError) {
    _getList('list', 'shows', {
      order: order || '',
      since: since || ''
    }, callbackSuccess, callbackError);
  };

  Shows.prototype.search = function(title, summary, order, nbpp, page, callbackSuccess, callbackError) {
    _getList('search', 'shows', {
      title: title || null,
      summary: summary || false,
      order: order || 'title',
      nbpp: nbpp || 5,
      page: page || 1
    }, callbackSuccess, callbackError);
  };

  Shows.prototype.get = function(id, thetvdb_id, callbackSuccess, callbackError) {
    _api.GET(_baseUrl + 'display', {
      id: id || '',
      thetvdb_id: thetvdb_id || ''
    }, function(data) {
      if (callbackSuccess) {
        callbackSuccess(data.show);
      }
    }, callbackError);
  };

  Shows.prototype.archive = function(id, thetvdb_id) {
    _api.POST(_baseUrl + 'archive', {
      id: id || '',
      thetvdb_id: thetvdb_id || ''
    });
  };

  Shows.prototype.deleteArchive = function(id, thetvdb_id) {
    _api.DELETE(_baseUrl + 'archive', {
      id: id || '',
      thetvdb_id: thetvdb_id || ''
    });
  };

  Shows.prototype.favorite = function(userId) {
    _api.POST(_baseUrl + 'favorite', {
      id: userId || ''
    });
  };

  Shows.prototype.deleteFavorite = function(userId) {
    _api.DELETE(_baseUrl + 'favorite', {
      id: userId || ''
    });
  };

  Shows.prototype.favorites = function(userId, callbackSuccess, callbackError) {
    _getList('favorites', 'favorites', {
      id: userId || ''
    }, callbackSuccess, callbackError);
  };

  Shows.prototype.note = function(id, thetvdb_id, note) {
    if (!note) {
      throw new Error('a note must be specified');
    }

    _api.POST(_baseUrl + 'note', {
      id: id || '',
      thetvdb_id: thetvdb_id || '',
      note: note
    });
  };

  Shows.prototype.deleteNote = function(id, thetvdb_id) {
    _api.DELETE(_baseUrl + 'note', {
      id: id || '',
      thetvdb_id: thetvdb_id || ''
    });
  };

  Shows.prototype.random = function(nb, summary, callbackSuccess, callbackError) {
    _api.GET(_baseUrl + 'random', {
      nb: nb || '',
      summary: summary || false
    }, callbackSuccess, callbackError);
  };

  Shows.prototype.recommend = function(id, thetvdb_id, to, comments) {
    if (!to) {
      throw new Error('a friend user id must be specified');
    }

    _api.POST(_baseUrl + 'recommendation', {
      id: id || '',
      thetvdb_id: thetvdb_id || '',
      to: to || null,
      comments: comments || ''
    });
  };

  Shows.prototype.deleteRecommendation = function(id) {
    if (!id) {
      throw new Error('a recommendation id must be specified');
    }

    _api.DELETE(_baseUrl + 'recommendation', {
      id: id || ''
    });
  };

  Shows.prototype.recommendations = function(callbackSuccess, callbackError) {
    _getList('recommendations', 'recommendations', null, callbackSuccess, callbackError);
  };

  Shows.prototype.similars = function(id, thetvdb_id, callbackSuccess, callbackError) {
    _getList('similars', 'similars', {
      id: id || '',
      thetvdb_id: thetvdb_id || ''
    }, callbackSuccess, callbackError);
  };

  Shows.prototype.videos = function(id, thetvdb_id, callbackSuccess, callbackError) {
    _getList('videos', 'videos', {
      id: id || '',
      thetvdb_id: thetvdb_id || ''
    }, callbackSuccess, callbackError);
  };

  Shows.prototype.addShow = function(id, thetvdb_id, last_seen_episode_id) {
    _api.POST(_baseUrl + 'recommendation', {
      id: id || '',
      thetvdb_id: thetvdb_id || '',
      episode_id: last_seen_episode_id || ''
    });
  };

  Shows.prototype.deleteShow = function(d, thetvdb_id) {
    _api.DELETE(_baseUrl + 'recommendation', {
      id: id || '',
      thetvdb_id: thetvdb_id || ''
    });
  };

  exports.Shows = function(BetaSeries) {
    _api = new API(BetaSeries.apiKey());
    return new Shows();
  };

})();