interface WheelEvent {
  deltaY: number;
}

interface KeyboardEvent {
  keyCode: number;
}

interface TouchEvent {
  changedTouches: Object;
  preventDefault(): any;
}

export type { KeyboardEvent, TouchEvent, WheelEvent };
