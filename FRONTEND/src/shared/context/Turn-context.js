import { createContext } from 'react';

export const TurnContext = createContext({
  whoseTurn: "X",
  TurnChange: () => { }
})