export class StringMapper {
  static categoryToURL(category) {
    return {
      all: '/catalogo',
      'nossa-horta': '/catalogo#nossa-horta',
      'mercearia': '/catalogo#mercearia',
      'ovos-e-carnes': '/catalogo#ovos-e-carnes',
      'bebidas-e-laticinios': '/catalogo#bebidas-e-laticinios',
      'corpo-e-casa': '/catalogo#corpo-e-casa',
    }[category] || 'category_not_found';
  }

  static periodicity(p) {
    return {
      weekly: 'Semanal',
      biweekly: 'Quinzenal',
      monthly: 'Mensal'
    }[p] || 'periodicity_not_found';
  }
}