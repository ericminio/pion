var fs = require('fs');

describe('Pion json', function() {

    it('can be parsed as json', function() {
        var pionJson = fs.readFileSync('./pion.json').toString();
        var pionConfig = JSON.parse(pionJson);
    });
    
    it('contains an array in ignoringLinesMatching', function() {
        var pionJson = fs.readFileSync('./pion.json').toString();
        var pionConfig = JSON.parse(pionJson);
        
        expect(Array.isArray(pionConfig.ignoringLinesMatching)).toEqual(true);
    });
});