casper.on('page.error', function(message) {
    console.log('Remote error: '+message);
});


casper.test.begin('happy path', 15, function suite(test){
  var url = 'http://localhost:8000/';

  casper.start(url, function(){
    test.assertExists('a[ref=callix-dialer]', 'embed click to call show in the page');
    this.click('a[ref=callix-dialer]');
    test.pass('click embed button opens status bar');

    this.waitForSelector('#callix-main-container', function(){
      test.pass('status is shown');
    });

  });

  // checkup shows up
  casper.then(function(){

    this.waitForSelector('.callix-dialer-status-checkup', function() {
      test.assertExists('.callix-dialer-status-checkup .ok', 'checkup panel appears');
      this.click('.callix-dialer-status-checkup');
      test.pass('clicked ok in checkup')
    });
  });

  // connecting
  casper.then(function(){
    this.waitForSelector('.callix-dialer-status-listen', function(){
      test.assertExists('.callix-dialer-status-listen .ok', 'connecting panel appears');
      this.click('.callix-dialer-status-listen .ok');
      test.pass('clicked ok, listen on connecting panel');
    });
  });

  // on call
  casper.then(function(){
    this.waitForSelector('.callix-dialer-status-current', function(){
      test.assertExists('.callix-dialer-status-current .close', 'on call appears');
      this.click('.callix-dialer-status-current .close');
      test.pass('clicked end call');
    });
  });

  // end call
  casper.then(function(){
    this.waitForSelector('.callix-dialer-status-end', function(){
      test.assertExists('.callix-dialer-status-end .end', 'end call confirmation panel appears');
      this.click('.callix-dialer-status-end .end');
      test.pass('clicked confirm end call');
    });
  });

// end support
  casper.then(function(){
    this.waitForSelector('.callix-dialer-status-close', function(){
      test.assertExists('.callix-dialer-status-close .confirm', 'end support panel appears');
      this.click('.callix-dialer-status-close .confirm');
      test.pass('clicked end support');
    });
  });

  casper.then(function(){
    this.waitWhileVisible('#callix-main-container', function(){
      test.pass('status bar disappears');
    })
  });

  casper.then(function(){
    test.assertEval(function() {
      return !$('a[ref=callix-dialer]').hasClass('disabled');
    }, 'embed button is enabled again');
  });


  casper.run(function() {
      test.done();
  });

});

// - eu abro a pagina
// - clico em fale conosco
// - aparece o checkup
//   - clico em ok [checkup deu certo]
// - aparece discagem
//   - clico em ok [ouvi a musica]
// - aparece falando com atendimento
//   - clico em encerrar ligação
// - aparece confirmação para encerrar ligação
//   - clico SIm, encerrar ligação
// - ligação encerrada
//   - clico em Encerrar atendimento
// - status fecha
// - botao fale conosco habilitado novamente
