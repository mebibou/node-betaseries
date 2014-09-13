(function() {
  'use strict';

  var API = require('./api').API,
      _api = null,
      _baseUrl = 'https://api.betaseries.com/episodes/';

  function Episodes() {

  }

  function _getList(type, key, params, callbackSuccess, callbackError) {
    _api.GET(_baseUrl + type, params, function(data) {
      if (callbackSuccess) {
        callbackSuccess(data[key]);
      }
    }, callbackError);
  }

  Episodes.prototype.all = function(userId, showId, limit, subtitles, callbackSuccess, callbackError) {
    _getList('list', 'shows', {
      userId: userId || '',
      showId: showId || '',
      limit: limit || null,
      subtitles: subtitles || 'all',
    }, callbackSuccess, callbackError);
  };

  Episodes.prototype.search = function(showId, episodeNumber, subtitles, callbackSuccess, callbackError) {
    if (!showId) {
      throw new Error('a show id must be specified');
    }
    if (!episodeNumber) {
      throw new Error('an episode number must be specified');
    }

    _getList('search', 'episode', {
      show_id: showId || null,
      number: episodeNumber || 1,
      subtitles: subtitles || false
    }, callbackSuccess, callbackError);
  };

  Episodes.prototype.get = function(id, thetvdb_id, subtitles, callbackSuccess, callbackError) {
    _getList('display', 'episode', {
      id: id || '',
      thetvdb_id: thetvdb_id || '',
      subtitles: subtitles || false
    }, callbackSuccess, callbackError);
  };

  Episodes.prototype.downloaded = function(id, thetvdb_id) {
    _api.POST(_baseUrl + 'downloaded', {
      id: id || '',
      thetvdb_id: thetvdb_id || ''
    });
  };

  Episodes.prototype.notDownloaded = function(id, thetvdb_id) {
    _api.DELETE(_baseUrl + 'archive', {
      id: id || '',
      thetvdb_id: thetvdb_id || ''
    });
  };

  Episodes.prototype.note = function(id, thetvdb_id, note) {
    if (!note) {
      throw new Error('a note must be specified');
    }

    _api.POST(_baseUrl + 'note', {
      id: id || '',
      thetvdb_id: thetvdb_id || '',
      note: note
    });
  };

  Episodes.prototype.deleteNote = function(id, thetvdb_id) {
    _api.DELETE(_baseUrl + 'note', {
      id: id || '',
      thetvdb_id: thetvdb_id || ''
    });
  };

  Episodes.prototype.scraper = function(fileName, callbackSuccess, callbackError) {
    if (!fileName) {
      throw new Error('a file name must be specified');
    }

    _api.GET(_baseUrl + 'scraper', {
      file: fileName || null
    }, callbackSuccess, callbackError);
  };

  Episodes.prototype.watched = function(id, thetvdb_id, watchedBefore, deleteAfter, note) {
    _api.POST(_baseUrl + 'watched', {
      id: id || '',
      thetvdb_id: thetvdb_id || '',
      bulk: watchedBefore || true,
      delete: deleteAfter || false,
      note: note || null
    });
  };

  Episodes.prototype.unseen = function(id, thetvdb_id) {
    _api.DELETE(_baseUrl + 'watched', {
      id: id || '',
      thetvdb_id: thetvdb_id || ''
    });
  };

  exports.Episodes = function(BetaSeries) {
    _api = new API(BetaSeries.apiKey());
    return new Episodes();
  };

})();