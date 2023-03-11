export type Artist = {
  id: string;
  image: string;
  name: string;
};

export type ReducerState = {
  currentStep: number;
  isLoading: boolean;
  chosenArtists: Artist[];
  chosenGenres: string[];
};

export type MultiStepFormContextState = ReducerState & {
  handleSetStep: (direction: 'prev' | 'next') => void;
  handleToggleArtist: (artist: Artist) => void;
  handleToggleGenre: (genre: string) => void;
  generatePlaylist: () => void;
};

export type FormReducerActions =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'INCREASE_STEP' }
  | { type: 'DECREASE_STEP' }
  | { type: 'TOGGLE_ARTIST'; payload: Artist }
  | { type: 'TOGGLE_GENRE'; payload: string };
