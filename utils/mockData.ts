import { PropertyType } from './types';

// Mock data for properties
export const properties: PropertyType[] = [
  {
    id: '1',
    title: 'Apartamento de lujo con vistas al mar',
    description: 'Moderno apartamento con espectaculares vistas al mar. Cuenta con amplios espacios, acabados de lujo y todas las comodidades para una vida sofisticada. Ubicado en una zona privilegiada con acceso a playa, restaurantes y comercios.',
    price: '€450,000',
    location: 'Malecón, Barcelona',
    beds: 3,
    baths: 2,
    area: '150m²',
    type: 'Apartamento',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: true,
    date: '2024-06-01',
    tourPreview: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tourRooms: {
      living: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      kitchen: 'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bedroom1: 'https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bathroom: 'https://images.pexels.com/photos/1910472/pexels-photo-1910472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    hotspots: {
      living: [
        {
          pitch: 0,
          yaw: 110,
          type: 'scene',
          text: 'Cocina',
          sceneId: 'kitchen'
        },
        {
          pitch: 0,
          yaw: -60,
          type: 'scene',
          text: 'Dormitorio',
          sceneId: 'bedroom1'
        }
      ],
      kitchen: [
        {
          pitch: 0,
          yaw: -70,
          type: 'scene',
          text: 'Sala de Estar',
          sceneId: 'living'
        }
      ],
      bedroom1: [
        {
          pitch: 0,
          yaw: 120,
          type: 'scene',
          text: 'Sala de Estar',
          sceneId: 'living'
        },
        {
          pitch: 0,
          yaw: -120,
          type: 'scene',
          text: 'Baño',
          sceneId: 'bathroom'
        }
      ],
      bathroom: [
        {
          pitch: 0,
          yaw: 60,
          type: 'scene',
          text: 'Dormitorio',
          sceneId: 'bedroom1'
        }
      ]
    }
  },
  {
    id: '2',
    title: 'Casa de campo con jardín privado',
    description: 'Encantadora casa de campo con amplio jardín y piscina. Perfecta para familias que buscan tranquilidad y contacto con la naturaleza sin renunciar a las comodidades modernas. A solo 20 minutos del centro de la ciudad.',
    price: '€680,000',
    location: 'Sierra Norte, Madrid',
    beds: 4,
    baths: 3,
    area: '280m²',
    type: 'Casa',
    image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: true,
    date: '2024-05-28',
    tourPreview: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tourRooms: {
      living: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      kitchen: 'https://images.pexels.com/photos/3935350/pexels-photo-3935350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bedroom1: 'https://images.pexels.com/photos/3773575/pexels-photo-3773575.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      backyard: 'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    hotspots: {
      living: [
        {
          pitch: 0,
          yaw: 110,
          type: 'scene',
          text: 'Cocina',
          sceneId: 'kitchen'
        },
        {
          pitch: 0,
          yaw: -60,
          type: 'scene',
          text: 'Dormitorio',
          sceneId: 'bedroom1'
        }
      ],
      kitchen: [
        {
          pitch: 0,
          yaw: -70,
          type: 'scene',
          text: 'Sala de Estar',
          sceneId: 'living'
        },
        {
          pitch: 0,
          yaw: 70,
          type: 'scene',
          text: 'Patio',
          sceneId: 'backyard'
        }
      ],
      bedroom1: [
        {
          pitch: 0,
          yaw: 120,
          type: 'scene',
          text: 'Sala de Estar',
          sceneId: 'living'
        }
      ],
      backyard: [
        {
          pitch: 0,
          yaw: -110,
          type: 'scene',
          text: 'Cocina',
          sceneId: 'kitchen'
        }
      ]
    }
  },
  {
    id: '3',
    title: 'Ático moderno en el centro',
    description: 'Exclusivo ático en pleno centro con terraza y vistas panorámicas. Diseño vanguardista, domótica completa y materiales de primera calidad. Incluye plaza de garaje y trastero. Edificio con servicios de conserjería y gimnasio.',
    price: '€550,000',
    location: 'Gran Vía, Madrid',
    beds: 2,
    baths: 2,
    area: '120m²',
    type: 'Ático',
    image: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: false,
    date: '2024-06-02',
    tourPreview: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tourRooms: {
      living: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      kitchen: 'https://images.pexels.com/photos/3214064/pexels-photo-3214064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bedroom1: 'https://images.pexels.com/photos/3144580/pexels-photo-3144580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    hotspots: {
      living: [
        {
          pitch: 0,
          yaw: 110,
          type: 'scene',
          text: 'Cocina',
          sceneId: 'kitchen'
        },
        {
          pitch: 0,
          yaw: -60,
          type: 'scene',
          text: 'Dormitorio',
          sceneId: 'bedroom1'
        }
      ],
      kitchen: [
        {
          pitch: 0,
          yaw: -70,
          type: 'scene',
          text: 'Sala de Estar',
          sceneId: 'living'
        }
      ],
      bedroom1: [
        {
          pitch: 0,
          yaw: 120,
          type: 'scene',
          text: 'Sala de Estar',
          sceneId: 'living'
        }
      ]
    }
  },
  {
    id: '4',
    title: 'Dúplex con terraza privada',
    description: 'Espacioso dúplex de diseño contemporáneo con amplia terraza privada. La propiedad cuenta con una distribución muy funcional, excelente luminosidad y acabados de alta calidad. Zona residencial tranquila con todos los servicios.',
    price: '€390,000',
    location: 'El Born, Barcelona',
    beds: 3,
    baths: 2,
    area: '145m²',
    type: 'Dúplex',
    image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: false,
    date: '2024-05-25',
    tourPreview: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tourRooms: {
      living: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      kitchen: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bedroom1: 'https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    hotspots: {
      living: [
        {
          pitch: 0,
          yaw: 110,
          type: 'scene',
          text: 'Cocina',
          sceneId: 'kitchen'
        },
        {
          pitch: 0,
          yaw: -60,
          type: 'scene',
          text: 'Dormitorio',
          sceneId: 'bedroom1'
        }
      ],
      kitchen: [
        {
          pitch: 0,
          yaw: -70,
          type: 'scene',
          text: 'Sala de Estar',
          sceneId: 'living'
        }
      ],
      bedroom1: [
        {
          pitch: 0,
          yaw: 120,
          type: 'scene',
          text: 'Sala de Estar',
          sceneId: 'living'
        }
      ]
    }
  },
  {
    id: '5',
    title: 'Chalet de lujo con piscina',
    description: 'Impresionante chalet de lujo con piscina, jardín y garaje para 3 coches. Espacios amplios y luminosos, zonas de entretenimiento y relax. Ubicado en una de las mejores urbanizaciones de la costa con seguridad 24h.',
    price: '€1,200,000',
    location: 'Marbella, Málaga',
    beds: 5,
    baths: 4,
    area: '420m²',
    type: 'Chalet',
    image: 'https://images.pexels.com/photos/32870/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: true,
    date: '2024-05-30',
    tourPreview: 'https://images.pexels.com/photos/32870/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tourRooms: {
      living: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      kitchen: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bedroom1: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      backyard: 'https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    hotspots: {
      living: [
        {
          pitch: 0,
          yaw: 110,
          type: 'scene',
          text: 'Cocina',
          sceneId: 'kitchen'
        },
        {
          pitch: 0,
          yaw: -60,
          type: 'scene',
          text: 'Dormitorio',
          sceneId: 'bedroom1'
        }
      ],
      kitchen: [
        {
          pitch: 0,
          yaw: -70,
          type: 'scene',
          text: 'Sala de Estar',
          sceneId: 'living'
        }
      ],
      bedroom1: [
        {
          pitch: 0,
          yaw: 120,
          type: 'scene',
          text: 'Sala de Estar',
          sceneId: 'living'
        }
      ],
      backyard: [
        {
          pitch: 0,
          yaw: 0,
          type: 'scene',
          text: 'Sala de Estar',
          sceneId: 'living'
        }
      ]
    }
  },
  {
    id: '6',
    title: 'Loft industrial renovado',
    description: 'Exclusivo loft en antigua fábrica textil totalmente renovado. Conserva elementos originales como techos altos, columnas de hierro y ventanales industriales combinados con acabados modernos y equipamiento de última generación.',
    price: '€320,000',
    location: 'Poblenou, Barcelona',
    beds: 1,
    baths: 1,
    area: '95m²',
    type: 'Loft',
    image: 'https://images.pexels.com/photos/1082355/pexels-photo-1082355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: false,
    date: '2024-05-20',
    tourPreview: 'https://images.pexels.com/photos/1082355/pexels-photo-1082355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tourRooms: {
      living: 'https://images.pexels.com/photos/1082355/pexels-photo-1082355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      kitchen: 'https://images.pexels.com/photos/1082355/pexels-photo-1082355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    hotspots: {
      living: [
        {
          pitch: 0,
          yaw: 110,
          type: 'scene',
          text: 'Cocina',
          sceneId: 'kitchen'
        }
      ],
      kitchen: [
        {
          pitch: 0,
          yaw: -70,
          type: 'scene',
          text: 'Sala de Estar',
          sceneId: 'living'
        }
      ]
    }
  }
];