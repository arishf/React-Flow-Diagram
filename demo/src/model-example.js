// @flow

import type { EntityState } from '../../src/entity/reducer';

// TODO: I could potentially have a situation where the model for a link only
// has a `target` property and the entity reducer figures out the proper values
// of `points` when SETting the diagram. In this way I'd had a mix of
// declarative in the inital model and then switch to explicit after load.

var model: EntityState = [
  {
    "id": "joe7tdmb",
    "type": "Event",
    "width": 50,
    "height": 50,
    "x": 250,
    "y": 100,
    "name": "contest",
    "custom": [
      {
        "name": "Resham"
      }
    ],
    "linksTo": [
      {
        "target": "joe7ty55",
        "edited": false,
        "points": [
          {
            "x": 275,
            "y": 125
          },
          {
            "x": 387.5,
            "y": 125
          },
          {
            "x": 387.5,
            "y": 125
          },
          {
            "x": 475,
            "y": 125
          }
        ]
      }
    ]
  },
  {
    "id": "joe7tw77",
    "type": "Task",
    "width": 125,
    "height": 75,
    "x": 225,
    "y": 250,
    "name": "contest"
  },
  {
    "id": "joe7ty55",
    "type": "Event",
    "width": 50,
    "height": 50,
    "x": 475,
    "y": 100,
    "name": "contest",
    "custom": [
      {
        "name": "Swara"
      }
    ]
  }
];

export default model;
