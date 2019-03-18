export class StringMapper {
  static categoryToURL(category) {
    return {
      all: 'catalogo',
      garden: 'catalogo#nossa_horta',
      grocery: 'catalogo#mercearia',
      eggs_and_meat: 'catalogo#ovos_e_carnes',
      beverages_and_dairy: 'catalogo#bebidas_e_laticinios',
      body_and_home: 'catalogo#corpo_e_casa',
    }[category] || 'category_not_found';
  }
}