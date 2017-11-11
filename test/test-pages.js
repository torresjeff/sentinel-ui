var expect  = require('chai').expect;
var request = require('request');

describe('Pages Status', function() {
    describe ('Main page', function(done) {
        it('/ deberia retornar HTTP response code 200', function(){
            request('http://localhost:8080/', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe ('Lideres page', function(done) {
        it('/lideres deberia retornar HTTP response code 200', function(){
            request('http://localhost:8080/lideres', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe ('Partidos page', function(done) {
        it('/partidos deberia retornar HTTP response code 200', function(){
            request('http://localhost:8080/partidos', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe ('Instituciones page', function(done) {
        it('/instituciones deberia retornar HTTP response code 200', function(){
            request('http://localhost:8080/instituciones', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe ('Casos page', function(done) {
        it('/casos deberia retornar HTTP response code 200', function(){
            request('http://localhost:8080/casos', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe ('Medios pages', function(done) {
        it('/medios deberia retornar HTTP response code 200', function(){
            request('http://localhost:8080/medios', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('/mediostodo deberia retornar HTTP response code 200', function(){
            request('http://localhost:8080/mediostodo', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe ('Descubre page', function(done) {
        it('/descubre deberia retornar HTTP response code 200', function(){
            request('http://localhost:8080/descubre', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe ('Aviso page', function(done) {
        it('/aviso deberia retornar HTTP response code 404', function(){
            request('http://localhost:8080/aviso', function(error, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
    });

});

describe('Services', function () {
    var year = 2017;
    var month = 10;
    describe('Sesgo', function (done) {
        it('sesgo de "corrupcion" para medios deberia retornar un objeto con las propiedades "year", "month" y "entity"="corrupcion"', function(){
            var entity = 'corrupcion';
            request('http://localhost:8080/summary/sesgo/' + year + "/" + month + "/" + entity, function(error, response, body) {
                expect(response.body).to.have.all.keys('entity', 'year', 'month');
                expect(response.body.entity).to.equal(entity);
                expect(response.body.year).to.equal(year);
                expect(response.body.month).to.equal(month);
                done();
            });
        });
        it('sesgo de "casos" para medios deberia retornar un objeto con las propiedades "year", "month" y "entity"="casos"', function(){
            var entity = 'casos';
            request('http://localhost:8080/summary/sesgo/' + year + "/" + month + "/" + entity, function(error, response, body) {
                expect(response.body).to.have.all.keys('entity', 'year', 'month');
                expect(response.body.entity).to.equal(entity);
                expect(response.body.year).to.equal(year);
                expect(response.body.month).to.equal(month);
                done();
            });
        });
        it('sesgo de "instituciones" para medios deberia retornar un objeto con las propiedades "year", "month" y "entity"="instituciones"', function(){
            var entity = 'instituciones';
            request('http://localhost:8080/summary/sesgo/' + year + "/" + month + "/" + entity, function(error, response, body) {
                expect(response.body).to.have.all.keys('entity', 'year', 'month');
                expect(response.body.entity).to.equal(entity);
                expect(response.body.year).to.equal(year);
                expect(response.body.month).to.equal(month);
                done();
            });
        });
        it('sesgo de "partidos" para medios deberia retornar un objeto con las propiedades "year", "month" y "entity"="partidos"', function(){
            var entity = 'partidos';
            request('http://localhost:8080/summary/sesgo/' + year + "/" + month + "/" + entity, function(error, response, body) {
                expect(response.body).to.have.all.keys('entity', 'year', 'month');
                expect(response.body.entity).to.equal(entity);
                expect(response.body.year).to.equal(year);
                expect(response.body.month).to.equal(month);
                done();
            });
        });
        it('sesgo de "lideres" para medios deberia retornar un objeto con las propiedades "year", "month" y "entity"="lideres"', function(){
            var entity = 'lideres';
            request('http://localhost:8080/summary/sesgo/' + year + "/" + month + "/" + entity, function(error, response, body) {
                expect(response.body).to.have.all.keys('entity', 'year', 'month');
                expect(response.body.entity).to.equal(entity);
                expect(response.body.year).to.equal(year);
                expect(response.body.month).to.equal(month);
                done();
            });
        });
        it('sesgo de "corrupcion-instituciones" para medios deberia retornar un objeto con las propiedades "year", "month" y "entity"="corrupcion-instituciones"', function(){
            var entity = 'corrupcion-instituciones';
            request('http://localhost:8080/summary/sesgo/' + year + "/" + month + "/" + entity, function(error, response, body) {
                expect(response.body).to.have.all.keys('entity', 'year', 'month');
                expect(response.body.entity).to.equal(entity);
                expect(response.body.year).to.equal(year);
                expect(response.body.month).to.equal(month);
                done();
            });
        });
        it('sesgo de "corrupcion-partidos" para medios deberia retornar un objeto con las propiedades "year", "month" y "entity"="corrupcion-partidos"', function(){
            var entity = 'corrupcion-partidos';
            request('http://localhost:8080/summary/sesgo/' + year + "/" + month + "/" + entity, function(error, response, body) {
                expect(response.body).to.have.all.keys('entity', 'year', 'month');
                expect(response.body.entity).to.equal(entity);
                expect(response.body.year).to.equal(year);
                expect(response.body.month).to.equal(month);
                done();
            });
        });
        it('sesgo de "corrupcion-lideres" para medios deberia retornar un objeto con las propiedades "year", "month" y "entity"="corrupcion-lideres"', function(){
            var entity = 'corrupcion-lideres';
            request('http://localhost:8080/summary/sesgo/' + year + "/" + month + "/" + entity, function(error, response, body) {
                expect(response.body).to.have.all.keys('entity', 'year', 'month');
                expect(response.body.entity).to.equal(entity);
                expect(response.body.year).to.equal(year);
                expect(response.body.month).to.equal(month);
                done();
            });
        });
        it('sesgo de "lideres-corrupcion" para lideres de opinion deberia retornar un objeto con las propiedades "year", "month" y "entity"="lideres-corrupcion"', function(){
            var entity = 'lideres-corrupcion';
            request('http://localhost:8080/summary/sesgo/' + year + "/" + month + "/" + entity, function(error, response, body) {
                expect(response.body).to.have.all.keys('entity', 'year', 'month');
                expect(response.body.entity).to.equal(entity);
                expect(response.body.year).to.equal(year);
                expect(response.body.month).to.equal(month);
                done();
            });
        });
    });
    
    describe('Analisis de Sentimientos', function (done) {
        it('analisis de sentimiento sobre Claudia Lopez deberia retornar un objeto con las propiedades "friendly_name"="Claudia López", "lider"="claudia-lopez", "type"="comments" y "entity"="lideres"', function(){
            var entity = 'claudia-lopez';
            var entityType = "lideres";
            var friendlyName = "Claudia López";
            var type = "comments";
            request('http://localhost:8080/summary/comments/' + entityType + "/" + entity, function(error, response, body) {
                expect(response.body).to.have.all.keys('entity', 'lider', 'friendly_name', 'type');
                expect(response.body.lider).to.equal(entity);
                expect(response.body.friendly_name).to.equal(friendlyName);
                expect(response.body.entity).to.equal(entityType);
                expect(response.body.type).to.equal(type);
                done();
            });
        });
        it('analisis de sentimiento sobre SIC (Superintendencia de Industria y Comercio) deberia retornar un objeto con las propiedades "friendly_name"="SIC", "institucion"="sic", "type"="comments" y "entity"="instituciones"', function(){
            var entity = 'sic';
            var entityType = "instituciones";
            var friendlyName = "SIC";
            var type = "comments";
            request('http://localhost:8080/summary/comments/' + entityType + "/" + entity, function(error, response, body) {
                expect(response.body).to.have.all.keys('entity', 'institucion', 'friendly_name', 'type');
                expect(response.body.institucion).to.equal(entity);
                expect(response.body.friendly_name).to.equal(friendlyName);
                expect(response.body.entity).to.equal(entityType);
                expect(response.body.type).to.equal(type);
                done();
            });
        });
        it('analisis de sentimiento sobre Centro Democrático deberia retornar un objeto con las propiedades "friendly_name"="Centro Democrático", "partido"="centro-democratico", "type"="comments" y "entity"="partidos"', function(){
            var entity = 'centro-democratico';
            var entityType = "partidos";
            var friendlyName = "Centro Democrático";
            var type = "comments";
            request('http://localhost:8080/summary/comments/' + entityType + "/" + entity, function(error, response, body) {
                expect(response.body).to.have.all.keys('entity', 'partido', 'friendly_name', 'type');
                expect(response.body.partido).to.equal(entity);
                expect(response.body.friendly_name).to.equal(friendlyName);
                expect(response.body.entity).to.equal(entityType);
                expect(response.body.type).to.equal(type);
                done();
            });
        });
    });

    describe('Asociacion de palabras', function (done) {
        it('asociacion de palabras de comentarios deberia retornar un objeto con las propiedades "year", "month", "nodes", "edges" y "type"="comments"', function(){
            var type = "comments";
            request('http://localhost:8080/summary/assocs/' + year + "/" + month + "/" + type, function(error, response, body) {
                expect(response.body).to.have.all.keys('year', 'month', 'nodes', 'edges', 'type');
                expect(response.body.year).to.equal(year);
                expect(response.body.month).to.equal(month);
                expect(response.body.nodes).to.be.an.array(nodes);
                expect(response.body.edges).to.be.an.array(edges);
                expect(response.body.type).to.equal(type);
                done();
            });
        });
        it('asociacion de palabras de publicaciones deberia retornar un objeto con las propiedades "year", "month", "nodes", "edges" y "type"="posts"', function(){
            var type = "posts";
            request('http://localhost:8080/summary/assocs/' + year + "/" + month + "/" + type, function(error, response, body) {
                expect(response.body).to.have.all.keys('year', 'month', 'nodes', 'edges', 'type');
                expect(response.body.year).to.equal(year);
                expect(response.body.month).to.equal(month);
                expect(response.body.nodes).to.be.an('array');
                expect(response.body.edges).to.be.an('array');
                expect(response.body.type).to.equal(type);
                done();
            });
        });
    });

    describe('Agregadas', function (done) {
        it('actividad sobre casos de corrupcion deberia retornar un objeto con las propiedades "year", "month", "casos", "entity"="casos", "type"="activity_count"', function(){
            var type = "activity_count";
            var entity = "casos";
            request('http://localhost:8080/summary/activity/' + entity, function(error, response, body) {
                expect(response.body).to.have.all.keys('year', 'month', 'entity','type', 'casos');
                expect(response.body.year).to.equal(year);
                expect(response.body.month).to.equal(month);
                expect(response.body.entity).to.equal(entity);
                expect(response.body.casos).to.be.an('array');
                expect(response.body.type).to.equal(type);
                done();
            });
        });
        it('actividad sobre lideres de opinion deberia retornar un objeto con las propiedades "year", "month", "lideres", "entity"="lideres", "type"="activity_count"', function(){
            var type = "activity_count";
            var entity = "casos";
            request('http://localhost:8080/summary/activity/' + entity, function(error, response, body) {
                expect(response.body).to.have.all.keys('year', 'month', 'entity','type', 'casos');
                expect(response.body.year).to.equal(year);
                expect(response.body.month).to.equal(month);
                expect(response.body.entity).to.equal(entity);
                expect(response.body.lideres).to.be.an('array');
                expect(response.body.type).to.equal(type);
                done();
            });
        });
        it('actividad sobre partidos politicos deberia retornar un objeto con las propiedades "year", "month", "partidos", "entity"="partidos", "type"="activity_count"', function(){
            var type = "activity_count";
            var entity = "partidos";
            request('http://localhost:8080/summary/activity/' + entity, function(error, response, body) {
                expect(response.body).to.have.all.keys('year', 'month', 'entity','type', 'casos');
                expect(response.body.year).to.equal(year);
                expect(response.body.month).to.equal(month);
                expect(response.body.entity).to.equal(entity);
                expect(response.body.partidos).to.be.an('array');
                expect(response.body.type).to.equal(type);
                done();
            });
        });
        it('actividad sobre instituciones deberia retornar un objeto con las propiedades "year", "month", "instituciones", "entity"="instituciones", "type"="activity_count"', function(){
            var type = "activity_count";
            var entity = "instituciones";
            request('http://localhost:8080/summary/activity/' + entity, function(error, response, body) {
                expect(response.body).to.have.all.keys('year', 'month', 'entity','type', 'casos');
                expect(response.body.year).to.equal(year);
                expect(response.body.month).to.equal(month);
                expect(response.body.entity).to.equal(entity);
                expect(response.body.instituciones).to.be.an('array');
                expect(response.body.type).to.equal(type);
                done();
            });
        });

        it('cantidad de publicaciones hechas por un medio sobre casos de corrupcion deberia retornar un objeto con las propiedades "year", "month", "casos", "entity"="casos", "type"="post_count"', function(){
            var type = "post_count";
            var entity = "casos";
            var pageId = "216740968376511";
            var specific= "odebrecht";
            request('http://localhost:8080/summary/descriptive/posts/' + pageId + "/" + entity + "/" + specific, function(error, response, body) {
                expect(response.body).to.have.all.keys('year', 'month', 'entity','type', 'casos', 'page');
                expect(response.body.year).to.equal(year);
                expect(response.body.month).to.equal(month);
                expect(response.body.page).to.equal(pageId);
                expect(response.body.entity).to.equal(entity);
                expect(response.body.casos).to.be.an('array');
                expect(response.body.type).to.equal(type);
                done();
            });
        });
        it('cantidad de publicaciones hechas por un medio sobre lideres de opinion deberia retornar un objeto con las propiedades "year", "month", "lideres", "entity"="lideres", "type"="post_count"', function(){
            var type = "post_count";
            var entity = "lideres";
            var pageId = "216740968376511";
            var specific= "alvaro-uribe";
            request('http://localhost:8080/summary/descriptive/posts/' + pageId + "/" + entity + "/" + specific, function(error, response, body) {
                expect(response.body).to.have.all.keys('year', 'month', 'entity','type', 'lideres', 'page');
                expect(response.body.year).to.equal(year);
                expect(response.body.month).to.equal(month);
                expect(response.body.page).to.equal(pageId);
                expect(response.body.entity).to.equal(entity);
                expect(response.body.lideres).to.be.an('array');
                expect(response.body.type).to.equal(type);
                done();
            });
        });
        it('cantidad de publicaciones hechas por un medio sobre patidos politicos deberia retornar un objeto con las propiedades "year", "month", "partidos", "entity"="partidos", "type"="post_count"', function(){
            var type = "post_count";
            var entity = "lideres";
            var pageId = "216740968376511";
            var specific= "centro-democratico";
            request('http://localhost:8080/summary/descriptive/posts/' + pageId + "/" + entity + "/" + specific, function(error, response, body) {
                expect(response.body).to.have.all.keys('year', 'month', 'entity','type', 'partidos', 'page');
                expect(response.body.year).to.equal(year);
                expect(response.body.month).to.equal(month);
                expect(response.body.page).to.equal(pageId);
                expect(response.body.entity).to.equal(entity);
                expect(response.body.partidos).to.be.an('array');
                expect(response.body.type).to.equal(type);
                done();
            });
        });
        it('cantidad de publicaciones hechas por un medio sobre instituciones deberia retornar un objeto con las propiedades "year", "month", "instituciones", "entity"="instituciones", "type"="post_count"', function(){
            var type = "post_count";
            var entity = "instituciones";
            var pageId = "216740968376511";
            var specific= "fiscalia";
            request('http://localhost:8080/summary/descriptive/posts/' + pageId + "/" + entity + "/" + specific, function(error, response, body) {
                expect(response.body).to.have.all.keys('year', 'month', 'entity','type', 'instituciones', 'page');
                expect(response.body.year).to.equal(year);
                expect(response.body.month).to.equal(month);
                expect(response.body.page).to.equal(pageId);
                expect(response.body.entity).to.equal(entity);
                expect(response.body.instituciones).to.be.an('array');
                expect(response.body.type).to.equal(type);
                done();
            });
        });

        it('cantidad de veces que se menciona un lider de opinion en comentarios de noticias de corrupcion deberia retornar un objeto con las propiedades "year", "month", "lideres", "entity"="lideres", "type"="comment_count"', function(){
            var type = "reaction_count";
            var entity = "lideres";
            var specific = "santos";
            //app.get('/summary/descriptive/commentscorruption/:entity/:specific', function (req, res) {
            request('http://localhost:8080/summary/descriptive/commentscorruption/' + entity + "/" + specific, function(error, response, body) {
                expect(response.body).to.have.all.keys('year', 'month', 'entity','type', 'lideres');
                expect(response.body.year).to.equal(year);
                expect(response.body.month).to.equal(month);
                expect(response.body.entity).to.equal(entity);
                expect(response.body.type).to.equal(type);
                done();
            });
        });
    });

    //app.get('/summary/assocs/:year/:month/:type', function (req, res) {
});