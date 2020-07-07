const supertest = require('supertest');
const server = require('./server');


describe('server.js.. / endpoint', () => {
    //CHECKING STATUS CODE!
    it('should return 200', () => {
        return supertest(server).get('/')
        .then(res => {
            expect(res.status).toBe(200)
        })
    })

    //CHECKING THE RESPONSE
    it('should return api up', () => {
        return supertest(server).get('/')
        .then(res => {
            expect(res.body).toEqual({api: "is up lets goo"});
        })
    })
        //CHECKING TYPE OF LANGUAGE
        it('should be using JSON', () => {
            return supertest(server).get('/')
            .then(res => {
                expect(res.type).toMatch(/json/i);
            })
        })
})
