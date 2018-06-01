import { createConstants } from '../utils/createConstants';

const types = createConstants(
  'FETCH_DISTINATIONS_REQUEST',
  'FETCH_DISTINATIONS_SUCCESS',
  'FETCH_DISTINATIONS_FAILURE'
)

export { types };
