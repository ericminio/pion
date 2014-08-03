var array = require('./lib/array.utils');
var extract = require('./lib/array.utils');

describe('Arrays', function() {

    it('can detect an array', function() {
        expect(Array.isArray([])).toBe(true);
    });
        
    it('can remove the last item from an array', function() {
        var table = [1, 2, 3];
        table.pop();
            
        expect(table).toEqual([1, 2]);
    });
        
    it('can remove a given item from an array', function() {
        var table = [1, 2, 3, 4, 5, 6];
        table.splice(3, 2);
            
        expect(table).toEqual([1, 2, 3, 6]);            
    });
        
    it('can identify the index of an element', function() {
        expect([1, 2, 3, 4, 5, 6].indexOf(3)).toEqual(2);
    });
    
    describe('array.foreach', function() {
        
        it('can iterate through a collection', function() {
            var sum = 0;                        
            array.forEach([1, 2, 3], function(item) {
                sum += item;
            });
            expect(sum).toEqual(6);
        });
        
        it('can extract one item from a collection', function() {
            var mouse = { price: 50 };
            var keyboard = { price: 500 };
            var ten;
            array.forEach([mouse, keyboard], function(item) {
                if (item.price === 50) {
                    ten = item;
                }
            });
            
            expect(ten).toEqual(mouse);
        });
        
        it('injects the index of the item in collection as second parameter', function() {
            var mouse = { price: 11 };
            var keyboard = { price: 111 };
            array.forEach([mouse, keyboard], function(item, index) {
                if (item.price === 11) {
                    expect(index).toEqual(0);
                }
                if (item.price === 111) {
                    expect(index).toEqual(1);
                }
            });         
        });
        
    });
    
    describe('array.first', function() {

        it('can select first matching item from a collection', function() {
            var mouse = { price: 30 };
            var keyboard = { price: 30 };
            var first = array.first([mouse, keyboard], function(item) {
                return item.price === 30;
            });
            
            expect(first).toEqual(mouse);
        });
        
    });
    
    describe('array.hasOneItemIn', function() {

        var mouse = { price: 10 };
        var keyboard = { price: 100 };          

        it('identify when an item is in a collection', function() {
            expect(array.hasOneItemIn([mouse, keyboard], function(item) { return item.price === 10; })).toBe(true);
        });
        
        it('identify when an item is not in a collection', function() {
            expect(array.hasOneItemIn([mouse, keyboard], function(item) { return item.price === 20; })).toBe(false);
        });
    });
    
    describe('array.firstItemIn', function() {
        
        var withPrice = function(price) {
            return function(item) { return item.price === price; };
        };
        
        it('is an alias for array.first', function() {
            mouse = { price: 10 };
            keyboard = { price: 10 };
            var firstMatchingItem = extract.firstItemIn([mouse, keyboard], withPrice(10));
            
            expect(firstMatchingItem).toEqual(mouse);
        });
        
    });
    
    describe('array.remove', function() {

        var items;

        beforeEach(function() {
            items = [1, 2, 3, 4];
        });

        it('can remove one item from a given array', function() {
            expect(array.remove(3, items)).toEqual([1, 2, 4]);
        });

        it('supports a non-existing object', function() {
            expect(array.remove(5, items)).toEqual([1, 2, 3, 4]);
        });

    });
});
