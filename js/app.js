(() => {

  function up() {
    _app.common.log('you when up');
  }
  function right() {
    _app.common.log('you when right');
  }
  function left() {
    _app.common.log('you when left');
  }
  function down() {
    _app.common.log('you when down');
  }
  function speak(msg) {
    _app.common.log(msg);
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg));
  }

  window._app = {
    init: () => {
      __.EVENTS.enableDelegationEvents('fnclick', 'fnenter', _app.handlers);
      window.onhashchange = e => {
        let el = __.query('[href="' + location.hash + '"]');
        if (el) {
          el.click();
        }
      };
      window.onhashchange();
      _app.game.code.value = __.cache('console');
    },
    common: {
      clearSelected: () => {
        let el = __.query('.current');
        if (el) {
          el.classList.remove('current');
        }
      },
      log: msg => {
        console.log(msg);
        _app.game.cons.value += msg + '\n';
      },
      error: msg => {
        console.error(msg);
        _app.game.cons.value += msg + '\n';
      },
      selectItem: el => {
        _app.common.clearSelected();
        el.classList.add('current');
      }
    },
    game: {
      code: __.query('#code'),
      cons: __.query('#cons'),
      hero: __.query('#hero'),
      world: __.query('#world'),
    },
    handlers: {
      select: e => _app.common.selectItem(e.target),
      clear: e => {
        _app.game.cons.value = '';
      },
      reset: e => {
        _app.game.code.value = '';
        __.cache('console', '');
        _app.handlers.clear();
      },
      run: e => {
        __.cache('console', _app.game.code.value);
        try {
          eval(_app.game.code.value);
        } catch(e) {
          _app.common.error(e);
        }
      }
    }
  };

  _app.init();

})();
