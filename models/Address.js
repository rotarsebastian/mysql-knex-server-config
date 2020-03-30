const { Model } = require('objection');

class Address extends Model {
    // static get because you dont need to instantiate a new object to get the tableName
    static get tableName() {
        return "addresses";
    }
}

module.exports = Address;