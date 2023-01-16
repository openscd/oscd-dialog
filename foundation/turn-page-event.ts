export type TurnPageDetail = {
  increment: number;
};

export type TurnPageEvent = CustomEvent<TurnPageDetail>;

export function newTurnPageEvent(increment: number): TurnPageEvent {
  return new CustomEvent<TurnPageDetail>('turn-page', {
    bubbles: true,
    composed: true,
    detail: { increment },
  });
}

declare global {
  interface ElementEventMap {
    ['turn-page']: TurnPageEvent;
  }
}
