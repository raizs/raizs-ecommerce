export const categories = [
  {
    label: 'VER TODOS',
    id: 'all',
    width: 100
  }, {
    label: 'NOSSA HORTA',
    id: 'nossa-horta',
    width: 117
  }, {
    label: 'MERCEARIA',
    id: 'mercearia',
    width: 101
  }, {
    label: 'OVOS E CARNES',
    id: 'ovos-e-carnes',
    width: 126
  }, {
    label: 'BEBIDAS E LATICÍNIOS',
    id: 'bebidas-e-laticinios',
    width: 162
  }, {
    label: 'CORPO E CASA',
    id: 'corpo-e-casa',
    width: 129
  }
];

export const MORE_CATEGORY_WIDTH = 80;

export const subcategories = {
  'nossa-horta': [
    {
      id: 'frutas',
      label: 'Frutas'
    }, {
      id: 'higienizados',
      label: 'Higienizados'
    }, {
      id: 'legumes',
      label: 'Legumes'
    }, {
      id: 'temperos',
      label: 'Temperos'
    }, {
      id: 'verduras',
      label: 'Verduras'
    }
  ],
  mercearia: [
    {
      id: 'acai-e-granola',
      label: 'Açaí e Granola'
    }, {
      id: 'arroz-e-feijao',
      label: 'Arroz e Feijão'
    }, {
      id: 'azeite-vinagre-e-oleo',
      label: 'Azeite, Vinagre e Óleo'
    }, {
      id: 'cafes-e-chas',
      label: 'Cafés e Chás'
    }, {
      id: 'castanhas-e-frutas-secas',
      label: 'Castanhas e Frutas Secas'
    }, {
      id: 'cereais-e-farinhas',
      label: 'Cereais e Farinhas'
    }, {
      id: 'chocolates-e-doces',
      label: 'Chocolates e Doces'
    }, {
      id: 'condimentos-molhos-e-especiarias',
      label: 'Condimentos, Molhos e Especiarias'
    }, {
      id: 'cookies-biscoitos-e-barrinhas',
      label: 'Cookies, Biscoitos e Barrinhas'
    }, {
      id: 'geleia-mel-e-acucar',
      label: 'Geléia, Mel e Açúcar'
    }, {
      id: 'graos-e-sementes',
      label: 'Grãos e Sementes'
    }, {
      id: 'paes-e-massas',
      label: 'Pães e Massas'
    }, {
      id: 'proteinas-e-leites-vegetais',
      label: 'Proteínas e Leites Vegetais'
    }
  ],
  'ovos-e-carnes': [
    {
      id: 'bovina',
      label: 'Bovina'
    }, {
      id: 'frangos',
      label: 'Frangos'
    }, {
      id: 'ovos',
      label: 'Ovos'
    }, {
      id: 'pescados',
      label: 'Pescados'
    }
  ],
  'bebidas-e-laticinios': [
    {
      id: 'cafes-e-chas',
      label: 'Cafés e Chás'
    }, {
      id: 'iogurtes-e-leites',
      label: 'Iogurtes e Leites'
    }, {
      id: 'queijos-mantei-ga-e-outros',
      label: 'Queijos, Manteiga e Outros'
    }, {
      id: 'refrigerantes',
      label: 'Refrigerantes'
    }, {
      id: 'sem-lactose',
      label: 'Sem Lactose'
    }, {
      id: 'sucos-e-outros',
      label: 'Sucos e Outros'
    }, {
      id: 'vinhos-e-alcoolicos',
      label: 'Vinhos e Alcoólicos'
    }
  ],
  'corpo-e-casa': [
    {
      id: 'cosmeticos',
      label: 'Cosméticos',
      subs: [
        {
          id: 'boca-e-pele',
          label: 'Boca e Pele'
        }, {
          id: 'oleos-e-hidratacao',
          label: 'Óleos e Hidratação'
        }, {
          id: 'shampoo-e-sabonete',
          label: 'Shampoo e Sabonete'
        }
      ]
    }, {
      id: 'para-a-casa',
      label: 'Para a Casa',
      subs: [
        {
          id: 'produtos-de-limpeza',
          label: 'Produtos de Limpeza'
        }
      ]
    }
  ]
};

export const categoryImages = {
  'nossa-horta': {
    src: 'https://pbs.twimg.com/profile_images/691691850881732608/b5xc_7Vz.png',
    alt: 'nossa horta'
  },
  'mercearia': {
    src: 'https://pbs.twimg.com/profile_images/691691850881732608/b5xc_7Vz.png',
    alt: 'mercearia'
  },
  'ovos-e-carnes': {
    src: 'https://pbs.twimg.com/profile_images/691691850881732608/b5xc_7Vz.png',
    alt: 'ovos e carnes'
  },
  'bebidas-e-laticinios': {
    src: 'https://pbs.twimg.com/profile_images/691691850881732608/b5xc_7Vz.png',
    alt: 'bebidas e laticinios'
  },
  'corpo-e-casa': {
      src: 'https://pbs.twimg.com/profile_images/691691850881732608/b5xc_7Vz.png',
      alt: 'corpo e casa'
  }
};