export const categories = [
  {
    label: 'VER TODOS',
    id: 'all',
    width: 100
  }, {
    label: 'NOSSA HORTA',
    id: 'garden',
    width: 117
  }, {
    label: 'MERCEARIA',
    id: 'grocery',
    width: 101
  }, {
    label: 'OVOS E CARNES',
    id: 'eggs_and_meat',
    width: 126
  }, {
    label: 'BEBIDAS E LATICÍNIOS',
    id: 'beverages_and_dairy',
    width: 162
  }, {
    label: 'CORPO E CASA',
    id: 'body_and_home',
    width: 129
  }
];

export const MORE_CATEGORY_WIDTH = 80;

export const subcategories = {
  garden: [
    {
      id: 'fruits',
      label: 'Frutas'
    }, {
      id: 'sanitized',
      label: 'Higienizados'
    }, {
      id: 'vegetables',
      label: 'Legumes'
    }, {
      id: 'seasonings',
      label: 'Temperos'
    }, {
      id: 'greens',
      label: 'Verduras'
    }
  ],
  grocery: [
    {
      id: 'acai_and_granola',
      label: 'Açaí e Granola'
    }, {
      id: 'rice_and_beans',
      label: 'Arroz e Feijão'
    }, {
      id: 'olive_oils_vinagers_and_oils',
      label: 'Azeite, Vinagre e Óleo'
    }, {
      id: 'coffees_and_teas',
      label: 'Cafés e Chás'
    }, {
      id: 'nuts_and_dry_fruits',
      label: 'Castanhas e Frutas Secas'
    }, {
      id: 'cereals_and_flours',
      label: 'Cereais e Farinhas'
    }, {
      id: 'chocolates_and_candies',
      label: 'Chocolates e Doces'
    }, {
      id: 'condiment_sauces_and_spices',
      label: 'Condimentos, Molhos e Especiarias'
    }, {
      id: 'cookies_biscuits_and_cereal_bars',
      label: 'Cookies, Biscoitos e Barrinhas'
    }, {
      id: 'jam_honey_and_sugar',
      label: 'Geléia, Mel e Açúcar'
    }, {
      id: 'grains_and_seeds',
      label: 'Grãos e Sementes'
    }, {
      id: 'breads_and_pasta',
      label: 'Pães e Massas'
    }, {
      id: 'vegetable_proteins_and_mil',
      label: 'Proteínas e Leites Vegetais'
    }
  ],
  eggs_and_meat: [
    {
      id: 'bovine',
      label: 'Bovina'
    }, {
      id: 'chicken',
      label: 'Frangos'
    }, {
      id: 'eggs',
      label: 'Ovos'
    }, {
      id: 'fish',
      label: 'Pescados'
    }
  ],
  beverages_and_dairy: [
    {
      id: 'coffees_and_teas',
      label: 'Cafés e Chás'
    }, {
      id: 'iogurt_and_milk',
      label: 'Iogurtes e Leites'
    }, {
      id: 'cheese_butter_and_others',
      label: 'Queijos, Manteiga e Outros'
    }, {
      id: 'sodas',
      label: 'Refrigerantes'
    }, {
      id: 'lactose_free',
      label: 'Sem Lactose'
    }, {
      id: 'juices_and_others',
      label: 'Sucos e Outros'
    }, {
      id: 'alcoholics',
      label: 'Vinhos e Alcoólicos'
    }
  ],
  body_and_home: [
    {
      id: 'cosmetics',
      label: 'Cosméticos',
      subs: [
        {
          id: 'mouth_and_skin',
          label: 'Boca e Pele'
        }, {
          id: 'oils_and_hydration',
          label: 'Óleos e Hidratação'
        }, {
          id: 'shampoo_and_soap',
          label: 'Shampoo e Sabonete'
        }
      ]
    }, {
      id: 'for_the_house',
      label: 'Para a Casa',
      subs: [
        {
          id: 'cleaning_products',
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