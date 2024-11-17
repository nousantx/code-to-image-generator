import { property } from './properties'
import { values } from './values'
import { classes } from './classes'
import { standardAttributes, reactAttributes } from '@nousantx/list-attribute'

export const tenoxuiConfig = {
  property,
  values,
  classes,
  attributify: true,
  attributify: [...standardAttributes, ...reactAttributes]
}
