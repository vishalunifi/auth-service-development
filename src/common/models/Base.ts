/**
 * @author Test Author
 */
import _ from "lodash"
import { Model } from "objection"

export default class BaseModel extends Model {
    $formatDatabaseJson(json: Object) {
        json = super.$formatDatabaseJson(json)

        return _.mapKeys(json, function (value, key) {
            return _.snakeCase(key)
        })
    }

    $parseDatabaseJson(json: Object) {
        json = _.mapKeys(json, function (value, key) {
            return _.camelCase(key)
        })

        return super.$parseDatabaseJson(json)
    }
}
