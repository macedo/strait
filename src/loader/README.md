Callix-Embed-Click2Call
=======================
[![Build Status](https://magnum.travis-ci.com/Codeminer42/Callix-Web-Client.png?token=1nrbYZz8yS2A3SLcDQqF&branch=master)](https://magnum.travis-ci.com/Codeminer42/Callix-Web-Client)

Projeto para gerar um embed js que permita os clientes da Callix adicionar um botão de Click2Call
em seus sites e personalizarem seu visual;

Configuração
------------

### Configure a conexão com o servidor SIP

copie o arquivo de exemplo:

```console
$ cp src/js/confs.js.example src/js/confs.js
```

Após a cópia, edite o arquivo: `src/js/confs.js` com os paramêtros corretos para seu ambiente.

### Configure o destino das chamadas
Para utilizar a pagina de demo/test, edite o arquivo `dist/index.html`.
Altere parte `sip:fulano@callix.com` no trecho abaixo para um usuario valido.

```html
<a href="callix.com/dialer?to=sip:fulano@callix.com" class="call btn" ref="callix-dialer">Fale conosco</a>
```


Install
-------

É recomendado que o grunt e bower estejam instalados na lib global

```console
$ npm install -g grunt
$ npm install -g grunt-cli
$ npm install -g bower
```

Instale as dependencias locais npm:

```console
$ npm install
```

Então, pode rodar a task default do grunt, que instala as deps bower, compila e levanta o server
e por fim abre a pagina de teste no browser default
```console
$ grunt
```


Server
------
Para iniciar um server local

```console
$ grunt server
```
Esse comando ira trabalhar com o live reload, fazendo watch nos arquivos do projeto.


Tasks
-----

Para listar as todas as tasks disponiveis

```console
$ grunt tasks
```


Tests
-----

TODO
