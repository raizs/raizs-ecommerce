import { Cache } from "../../../helpers";

export const SET_CEP = 'SET_CEP';

export const setCepAction = cep => ({
  type: SET_CEP,
  data: cep
});