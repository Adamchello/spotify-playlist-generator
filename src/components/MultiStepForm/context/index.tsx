import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import { intitialState } from './initialState';
import { formReducer } from './reducer';
import { Artist, MultiStepFormContextState } from './types';
import { getParamsFromHash } from './utils';

const multiStepFormContext = createContext({} as MultiStepFormContextState);

type MultiStepFormContextProviderProps = {
  children: ReactNode;
};

export const MultiStepFormContextProvider = ({
  children,
}: MultiStepFormContextProviderProps) => {
  const [state, dispatch] = useReducer(formReducer, intitialState);

  const handleSetStep = (direction: 'prev' | 'next') => {
    const actionType = direction === 'next' ? 'INCREASE_STEP' : 'DECREASE_STEP';
    dispatch({ type: actionType });
  };

  const handleToggleArtist = (artist: Artist) => {
    dispatch({ type: 'TOGGLE_ARTIST', payload: artist });
  };

  const handleToggleGenre = (genre: string) => {
    dispatch({ type: 'TOGGLE_GENRE', payload: genre });
  };

  const generatePlaylist = async () => {
    try {
      const cookieAccessToken = Cookies.get('spotify_access_token');
      const requestParams = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookieAccessToken}`,
        },
      };

      const preparedArtists = state.chosenArtists
        .map((artist) => artist.id)
        .join(',');
      const preparedGenres = state.chosenGenres.join(',');

      const res = await fetch(
        `https://api.spotify.com/v1/recommendations?seed_genres=${preparedGenres}&seed_artists=${preparedArtists}`,
        requestParams
      );

      const data = await res.json();

      console.log(data);
      handleSetStep('next');
    } catch (err) {
      console.log(err);
    }
  };

  const router = useRouter();

  useEffect(() => {
    const params = getParamsFromHash(router.asPath);
    if (!params.access_token || !params.expires_in) return;

    const { access_token, expires_in: expiresTimeInSeconds } = params;
    const expireDate = new Date(
      new Date().getTime() + Number(expiresTimeInSeconds) * 1000
    );

    Cookies.set('spotify_access_token', access_token, { expires: expireDate });
    dispatch({ type: 'SET_STEP', payload: 2 });
  }, [router.asPath]);

  useEffect(() => {
    const cookieAccessToken = Cookies.get('spotify_access_token');
    if (cookieAccessToken && state.currentStep === 1) {
      dispatch({ type: 'SET_STEP', payload: 2 });
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  }, [state.currentStep]);

  const values = {
    ...state,
    handleSetStep,
    handleToggleArtist,
    handleToggleGenre,
    generatePlaylist,
  };

  return (
    <multiStepFormContext.Provider value={values}>
      {children}
    </multiStepFormContext.Provider>
  );
};

export const useMultiStepFormContext = () => {
  const value = useContext(multiStepFormContext);
  if (!value) throw new Error('Context provider is not initialized');
  return value;
};
