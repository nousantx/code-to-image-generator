import { property } from './lib/properties'
import { values } from './lib/values'
import { classes } from './lib/classes'
import { aliases } from './lib/aliases'

const config = {
  property,
  values,
  classes,
  aliases,
  attributify: true
}

export { config, property, values, classes, aliases }
export default { config, property, values, classes, aliases }
