import { Cache } from "../../../helpers";

export const SET_CEP = 'SET_CEP';

export const setCepAction = (cep, shipping) => ({
  type: SET_CEP,
  data: { cep, shipping }
});
