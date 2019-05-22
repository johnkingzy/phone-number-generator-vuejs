const expect = require('expect');
const fs = require('fs');
const path = require('path');
const { agent } = require('supertest');
const app = require('../../src/app');



const server = agent(app);

describe('API /numbers', function() {
    it('should return generated number with a message', function(done) {
        server.get('/api/numbers')
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err, res) {
            expect(res.status).toBe(200);
            expect(res.body.message).toBe('10 numbers was generated successfully');
            expect(res.body.numbers.length).toBeGreaterThan(9);
        });
        done();
    });
});