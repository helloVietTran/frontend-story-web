import { INCREMENT_CHAPTERS_READ, RESET_CHAPTERS_READ } from "./actionTypes";
export const incrementChaptersRead = () => ({
  type: INCREMENT_CHAPTERS_READ,
});
export const resetChaptersRead = ()=>({
  type: RESET_CHAPTERS_READ, 
})