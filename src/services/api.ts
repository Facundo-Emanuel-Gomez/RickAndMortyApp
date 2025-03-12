import axios from 'axios';
import type { AxiosError } from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/character';

export const fetchCharacters = async (page = 1, name = '') => {
  try {
    const { data } = await axios.get(API_URL, {
      params: { page, name: name.trim() } 
    });
    return data;
  } catch (error) {
    //Se convierte error a tipo AxiosError
    const axiosError = error as AxiosError<{ error: string }>;

    //Se extrae  el mensaje de error de la respuesta, solo si existe
    const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Ocurrió un error al obtener los personajes.';

    console.error('Error al obtener personajes:', errorMessage);
    throw new Error(errorMessage);
  }
};
