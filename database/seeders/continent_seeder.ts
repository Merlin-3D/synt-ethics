import Continents from '#models/continent'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const continentsData = [
      {
        code: 'eu',
        latitude: '51',
        longitude: '10',
        name: 'Europe',
        nameEs: 'Europa',
        nameFr: 'Europe',
      },
      {
        code: 'na',
        latitude: '51.0000002',
        longitude: '-109',
        name: 'North America',
        nameEs: 'América del Norte',
        nameFr: 'Amérique du Nord',
      },
      {
        code: 'as',
        latitude: '51.2086975',
        longitude: '89.2343748',
        name: 'Asia',
        nameEs: 'Asia',
        nameFr: 'Asie',
      },
      {
        code: 'sa',
        latitude: '-21.0002179',
        longitude: '-61.0006565',
        name: 'South America',
        nameEs: 'Sudamerica',
        nameFr: 'Amérique du Sud',
      },
      {
        code: 'oc',
        latitude: '-18.3128',
        longitude: '138.5156',
        name: 'Oceania',
        nameEs: 'Oceanía',
        nameFr: 'Océanie',
      },
      {
        code: 'af',
        latitude: '11.5024338',
        longitude: '17.7578122',
        name: 'Africa',
        nameEs: 'África',
        nameFr: 'Afrique',
      },
      {
        code: 'an',
        latitude: '-79.4063075',
        longitude: '0.3149312',
        name: 'Antarctica',
        nameEs: 'Antártida',
        nameFr: 'Antarctique',
      },
    ]
    const continents = continentsData.map((name) => ({
      name: name.name,
      nameFr: name.nameFr,
    }))

    await Continents.createMany(continents)
  }
}
