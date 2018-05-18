import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Platform
} from 'react-native';
import {COLORS, ICONS, FONTS} from '../constants';
import NavBarDetail from '../modules/NavBarDetail';
import applyLetterSpacing from '../utils/applyLetterSpacing';

const space = Platform.select({ios: 5, android: 2});

const DetailTextInput = ({value, onChangeText, title}) => {
  return (<View>
    <Text style={styles.label}>{applyLetterSpacing(title, space)}</Text>

    <TextInput underlineColorAndroid="rgba(0,0,0,0)" keyboardType={'numeric'} returnKeyType="done" style={styles.input} value={value} onChangeText={onChangeText} />
  </View>);
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  label: {
    fontFamily: FONTS.FONT_BOLD,
    fontSize: 15,
    color: COLORS.DARK_GREY
  },
  input: {
    height: 42,
    backgroundColor: COLORS.BLUE_3,
    color: COLORS.BLUE,
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center'
  }
});

export default DetailTextInput;
// {
//    "results" : [
//       {
//          "address_components" : [
//             {
//                "long_name" : "540",
//                "short_name" : "540",
//                "types" : [ "street_number" ]
//             },
//             {
//                "long_name" : "Avenida Alda Garrido",
//                "short_name" : "Av. Alda Garrido",
//                "types" : [ "route" ]
//             },
//             {
//                "long_name" : "Barra da Tijuca",
//                "short_name" : "Barra da Tijuca",
//                "types" : [ "political", "sublocality", "sublocality_level_1" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "locality", "political" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "administrative_area_level_2", "political" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "RJ",
//                "types" : [ "administrative_area_level_1", "political" ]
//             },
//             {
//                "long_name" : "Brazil",
//                "short_name" : "BR",
//                "types" : [ "country", "political" ]
//             },
//             {
//                "long_name" : "22620",
//                "short_name" : "22620",
//                "types" : [ "postal_code", "postal_code_prefix" ]
//             }
//          ],
//          "formatted_address" : "Av. Alda Garrido, 540 - Barra da Tijuca, Rio de Janeiro - RJ, Brazil",
//          "geometry" : {
//             "location" : {
//                "lat" : -23.0077328,
//                "lng" : -43.315117
//             },
//             "location_type" : "ROOFTOP",
//             "viewport" : {
//                "northeast" : {
//                   "lat" : -23.0063838197085,
//                   "lng" : -43.3137680197085
//                },
//                "southwest" : {
//                   "lat" : -23.0090817802915,
//                   "lng" : -43.3164659802915
//                }
//             }
//          },
//          "place_id" : "ChIJfSac_7vQmwARNiQbMrnXe4E",
//          "types" : [ "street_address" ]
//       },
//       {
//          "address_components" : [
//             {
//                "long_name" : "Condomínio do Edifício ''domus Aurea''",
//                "short_name" : "Condomínio do Edifício ''domus Aurea''",
//                "types" : [ "establishment", "point_of_interest", "premise" ]
//             },
//             {
//                "long_name" : "589",
//                "short_name" : "589",
//                "types" : [ "street_number" ]
//             },
//             {
//                "long_name" : "Avenida Alda Garrido",
//                "short_name" : "Av. Alda Garrido",
//                "types" : [ "route" ]
//             },
//             {
//                "long_name" : "Barra da Tijuca",
//                "short_name" : "Barra da Tijuca",
//                "types" : [ "political", "sublocality", "sublocality_level_1" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "locality", "political" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "administrative_area_level_2", "political" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "RJ",
//                "types" : [ "administrative_area_level_1", "political" ]
//             },
//             {
//                "long_name" : "Brazil",
//                "short_name" : "BR",
//                "types" : [ "country", "political" ]
//             },
//             {
//                "long_name" : "22620",
//                "short_name" : "22620",
//                "types" : [ "postal_code", "postal_code_prefix" ]
//             }
//          ],
//          "formatted_address" : "Condomínio do Edifício ''domus Aurea'' - Av. Alda Garrido, 589 - Barra da Tijuca, Rio de Janeiro - RJ, Brazil",
//          "geometry" : {
//             "location" : {
//                "lat" : -23.0081304,
//                "lng" : -43.3147502
//             },
//             "location_type" : "ROOFTOP",
//             "viewport" : {
//                "northeast" : {
//                   "lat" : -23.0067814197085,
//                   "lng" : -43.3134012197085
//                },
//                "southwest" : {
//                   "lat" : -23.0094793802915,
//                   "lng" : -43.3160991802915
//                }
//             }
//          },
//          "place_id" : "ChIJr2eVq77QmwARA3U9jQNI5Z8",
//          "types" : [ "establishment", "point_of_interest", "premise" ]
//       },
//       {
//          "address_components" : [
//             {
//                "long_name" : "Condomínio do Edifício Ghali",
//                "short_name" : "Condomínio do Edifício Ghali",
//                "types" : [ "establishment", "point_of_interest", "premise" ]
//             },
//             {
//                "long_name" : "122",
//                "short_name" : "122",
//                "types" : [ "street_number" ]
//             },
//             {
//                "long_name" : "Rua Fernando Nogueira de Sousa",
//                "short_name" : "Rua Fernando Nogueira de Sousa",
//                "types" : [ "route" ]
//             },
//             {
//                "long_name" : "Barra da Tijuca",
//                "short_name" : "Barra da Tijuca",
//                "types" : [ "political", "sublocality", "sublocality_level_1" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "locality", "political" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "administrative_area_level_2", "political" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "RJ",
//                "types" : [ "administrative_area_level_1", "political" ]
//             },
//             {
//                "long_name" : "Brazil",
//                "short_name" : "BR",
//                "types" : [ "country", "political" ]
//             },
//             {
//                "long_name" : "22620-380",
//                "short_name" : "22620-380",
//                "types" : [ "postal_code" ]
//             }
//          ],
//          "formatted_address" : "Condomínio do Edifício Ghali - Rua Fernando Nogueira de Sousa, 122 - Barra da Tijuca, Rio de Janeiro - RJ, 22620-380, Brazil",
//          "geometry" : {
//             "location" : {
//                "lat" : -23.0091101,
//                "lng" : -43.3145555
//             },
//             "location_type" : "ROOFTOP",
//             "viewport" : {
//                "northeast" : {
//                   "lat" : -23.00776111970849,
//                   "lng" : -43.31320651970851
//                },
//                "southwest" : {
//                   "lat" : -23.0104590802915,
//                   "lng" : -43.31590448029151
//                }
//             }
//          },
//          "place_id" : "ChIJS-bkob7QmwARlxGXv2prkRs",
//          "types" : [ "establishment", "point_of_interest", "premise" ]
//       },
//       {
//          "address_components" : [
//             {
//                "long_name" : "Condomínio do Edifício de Ville Blanche",
//                "short_name" : "Condomínio do Edifício de Ville Blanche",
//                "types" : [ "establishment", "point_of_interest", "premise" ]
//             },
//             {
//                "long_name" : "110",
//                "short_name" : "110",
//                "types" : [ "street_number" ]
//             },
//             {
//                "long_name" : "Rua Fernando Nogueira de Sousa",
//                "short_name" : "Rua Fernando Nogueira de Sousa",
//                "types" : [ "route" ]
//             },
//             {
//                "long_name" : "Barra da Tijuca",
//                "short_name" : "Barra da Tijuca",
//                "types" : [ "political", "sublocality", "sublocality_level_1" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "locality", "political" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "administrative_area_level_2", "political" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "RJ",
//                "types" : [ "administrative_area_level_1", "political" ]
//             },
//             {
//                "long_name" : "Brazil",
//                "short_name" : "BR",
//                "types" : [ "country", "political" ]
//             },
//             {
//                "long_name" : "22620",
//                "short_name" : "22620",
//                "types" : [ "postal_code", "postal_code_prefix" ]
//             }
//          ],
//          "formatted_address" : "Condomínio do Edifício de Ville Blanche - Rua Fernando Nogueira de Sousa, 110 - Barra da Tijuca, Rio de Janeiro - RJ, Brazil",
//          "geometry" : {
//             "location" : {
//                "lat" : -23.0091496,
//                "lng" : -43.3144393
//             },
//             "location_type" : "ROOFTOP",
//             "viewport" : {
//                "northeast" : {
//                   "lat" : -23.0078006197085,
//                   "lng" : -43.3130903197085
//                },
//                "southwest" : {
//                   "lat" : -23.0104985802915,
//                   "lng" : -43.3157882802915
//                }
//             }
//          },
//          "place_id" : "ChIJ-2gYoL7QmwARNveZsyeAOzo",
//          "types" : [ "establishment", "point_of_interest", "premise" ]
//       },
//       {
//          "address_components" : [
//             {
//                "long_name" : "Barra da Tijuca",
//                "short_name" : "Barra da Tijuca",
//                "types" : [ "political", "sublocality", "sublocality_level_1" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "locality", "political" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "administrative_area_level_2", "political" ]
//             },
//             {
//                "long_name" : "State of Rio de Janeiro",
//                "short_name" : "RJ",
//                "types" : [ "administrative_area_level_1", "political" ]
//             },
//             {
//                "long_name" : "Brazil",
//                "short_name" : "BR",
//                "types" : [ "country", "political" ]
//             }
//          ],
//          "formatted_address" : "Barra da Tijuca, Rio de Janeiro - State of Rio de Janeiro, Brazil",
//          "geometry" : {
//             "bounds" : {
//                "northeast" : {
//                   "lat" : -22.9642374,
//                   "lng" : -43.2844897
//                },
//                "southwest" : {
//                   "lat" : -23.0228827,
//                   "lng" : -43.45027049999999
//                }
//             },
//             "location" : {
//                "lat" : -23.0003709,
//                "lng" : -43.36589499999999
//             },
//             "location_type" : "APPROXIMATE",
//             "viewport" : {
//                "northeast" : {
//                   "lat" : -22.9642374,
//                   "lng" : -43.2844897
//                },
//                "southwest" : {
//                   "lat" : -23.0228827,
//                   "lng" : -43.45027049999999
//                }
//             }
//          },
//          "place_id" : "ChIJXf62J0ramwARTg-e2NH2w2M",
//          "types" : [ "political", "sublocality", "sublocality_level_1" ]
//       },
//       {
//          "address_components" : [
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "locality", "political" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "administrative_area_level_2", "political" ]
//             },
//             {
//                "long_name" : "State of Rio de Janeiro",
//                "short_name" : "RJ",
//                "types" : [ "administrative_area_level_1", "political" ]
//             },
//             {
//                "long_name" : "Brazil",
//                "short_name" : "BR",
//                "types" : [ "country", "political" ]
//             }
//          ],
//          "formatted_address" : "Rio de Janeiro, State of Rio de Janeiro, Brazil",
//          "geometry" : {
//             "bounds" : {
//                "northeast" : {
//                   "lat" : -22.7460327,
//                   "lng" : -43.0969042
//                },
//                "southwest" : {
//                   "lat" : -23.0822288,
//                   "lng" : -43.7950599
//                }
//             },
//             "location" : {
//                "lat" : -22.9068467,
//                "lng" : -43.1728965
//             },
//             "location_type" : "APPROXIMATE",
//             "viewport" : {
//                "northeast" : {
//                   "lat" : -22.7460327,
//                   "lng" : -43.0969042
//                },
//                "southwest" : {
//                   "lat" : -23.0822288,
//                   "lng" : -43.7950599
//                }
//             }
//          },
//          "place_id" : "ChIJW6AIkVXemwARTtIvZ2xC3FA",
//          "types" : [ "locality", "political" ]
//       },
//       {
//          "address_components" : [
//             {
//                "long_name" : "22620-400",
//                "short_name" : "22620-400",
//                "types" : [ "postal_code" ]
//             },
//             {
//                "long_name" : "Barra da Tijuca",
//                "short_name" : "Barra da Tijuca",
//                "types" : [ "political", "sublocality", "sublocality_level_1" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "locality", "political" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "administrative_area_level_2", "political" ]
//             },
//             {
//                "long_name" : "State of Rio de Janeiro",
//                "short_name" : "RJ",
//                "types" : [ "administrative_area_level_1", "political" ]
//             },
//             {
//                "long_name" : "Brazil",
//                "short_name" : "BR",
//                "types" : [ "country", "political" ]
//             }
//          ],
//          "formatted_address" : "Barra da Tijuca, Rio de Janeiro - State of Rio de Janeiro, 22620-400, Brazil",
//          "geometry" : {
//             "bounds" : {
//                "northeast" : {
//                   "lat" : -23.0078347,
//                   "lng" : -43.3137711
//                },
//                "southwest" : {
//                   "lat" : -23.0118196,
//                   "lng" : -43.3149785
//                }
//             },
//             "location" : {
//                "lat" : -23.0108544,
//                "lng" : -43.3146249
//             },
//             "location_type" : "APPROXIMATE",
//             "viewport" : {
//                "northeast" : {
//                   "lat" : -23.0078347,
//                   "lng" : -43.31302581970849
//                },
//                "southwest" : {
//                   "lat" : -23.0118196,
//                   "lng" : -43.31572378029149
//                }
//             }
//          },
//          "place_id" : "ChIJxyn3hb7QmwARggN-wB930Xo",
//          "types" : [ "postal_code" ]
//       },
//       {
//          "address_components" : [
//             {
//                "long_name" : "22620-390",
//                "short_name" : "22620-390",
//                "types" : [ "postal_code" ]
//             },
//             {
//                "long_name" : "Barra da Tijuca",
//                "short_name" : "Barra da Tijuca",
//                "types" : [ "political", "sublocality", "sublocality_level_1" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "locality", "political" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "administrative_area_level_2", "political" ]
//             },
//             {
//                "long_name" : "State of Rio de Janeiro",
//                "short_name" : "RJ",
//                "types" : [ "administrative_area_level_1", "political" ]
//             },
//             {
//                "long_name" : "Brazil",
//                "short_name" : "BR",
//                "types" : [ "country", "political" ]
//             }
//          ],
//          "formatted_address" : "Barra da Tijuca, Rio de Janeiro - State of Rio de Janeiro, 22620-390, Brazil",
//          "geometry" : {
//             "bounds" : {
//                "northeast" : {
//                   "lat" : -23.0078347,
//                   "lng" : -43.3137711
//                },
//                "southwest" : {
//                   "lat" : -23.0114101,
//                   "lng" : -43.3161858
//                }
//             },
//             "location" : {
//                "lat" : -23.0108182,
//                "lng" : -43.3154656
//             },
//             "location_type" : "APPROXIMATE",
//             "viewport" : {
//                "northeast" : {
//                   "lat" : -23.0078347,
//                   "lng" : -43.31362946970849
//                },
//                "southwest" : {
//                   "lat" : -23.0114101,
//                   "lng" : -43.31632743029149
//                }
//             }
//          },
//          "place_id" : "ChIJBWK_K7zQmwARC0v1pCSxV9A",
//          "types" : [ "postal_code" ]
//       },
//       {
//          "address_components" : [
//             {
//                "long_name" : "22620-380",
//                "short_name" : "22620-380",
//                "types" : [ "postal_code" ]
//             },
//             {
//                "long_name" : "Barra da Tijuca",
//                "short_name" : "Barra da Tijuca",
//                "types" : [ "political", "sublocality", "sublocality_level_1" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "locality", "political" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "administrative_area_level_2", "political" ]
//             },
//             {
//                "long_name" : "State of Rio de Janeiro",
//                "short_name" : "RJ",
//                "types" : [ "administrative_area_level_1", "political" ]
//             },
//             {
//                "long_name" : "Brazil",
//                "short_name" : "BR",
//                "types" : [ "country", "political" ]
//             }
//          ],
//          "formatted_address" : "Barra da Tijuca, Rio de Janeiro - State of Rio de Janeiro, 22620-380, Brazil",
//          "geometry" : {
//             "bounds" : {
//                "northeast" : {
//                   "lat" : -23.0074252,
//                   "lng" : -43.3125635
//                },
//                "southwest" : {
//                   "lat" : -23.0110375,
//                   "lng" : -43.3161858
//                }
//             },
//             "location" : {
//                "lat" : -23.0090108,
//                "lng" : -43.3149295
//             },
//             "location_type" : "APPROXIMATE",
//             "viewport" : {
//                "northeast" : {
//                   "lat" : -23.0074252,
//                   "lng" : -43.3125635
//                },
//                "southwest" : {
//                   "lat" : -23.0110375,
//                   "lng" : -43.3161858
//                }
//             }
//          },
//          "place_id" : "ChIJT1n_v77QmwARAHCiC-iT17A",
//          "types" : [ "postal_code" ]
//       },
//       {
//          "address_components" : [
//             {
//                "long_name" : "22621-020",
//                "short_name" : "22621-020",
//                "types" : [ "postal_code" ]
//             },
//             {
//                "long_name" : "Barra da Tijuca",
//                "short_name" : "Barra da Tijuca",
//                "types" : [ "political", "sublocality", "sublocality_level_1" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "locality", "political" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "administrative_area_level_2", "political" ]
//             },
//             {
//                "long_name" : "State of Rio de Janeiro",
//                "short_name" : "RJ",
//                "types" : [ "administrative_area_level_1", "political" ]
//             },
//             {
//                "long_name" : "Brazil",
//                "short_name" : "BR",
//                "types" : [ "country", "political" ]
//             }
//          ],
//          "formatted_address" : "Barra da Tijuca, Rio de Janeiro - State of Rio de Janeiro, 22621-020, Brazil",
//          "geometry" : {
//             "bounds" : {
//                "northeast" : {
//                   "lat" : -23.0066429,
//                   "lng" : -43.3041101
//                },
//                "southwest" : {
//                   "lat" : -23.0115208,
//                   "lng" : -43.3149785
//                }
//             },
//             "location" : {
//                "lat" : -23.0080421,
//                "lng" : -43.3147001
//             },
//             "location_type" : "APPROXIMATE",
//             "viewport" : {
//                "northeast" : {
//                   "lat" : -23.0066429,
//                   "lng" : -43.31302581970849
//                },
//                "southwest" : {
//                   "lat" : -23.0094361,
//                   "lng" : -43.31572378029149
//                }
//             }
//          },
//          "place_id" : "ChIJIaq_U7nQmwARUvwiGIrzJus",
//          "types" : [ "postal_code" ]
//       },
//       {
//          "address_components" : [
//             {
//                "long_name" : "22621-000",
//                "short_name" : "22621-000",
//                "types" : [ "postal_code" ]
//             },
//             {
//                "long_name" : "Avenida Alda Garrido",
//                "short_name" : "Av. Alda Garrido",
//                "types" : [ "route" ]
//             },
//             {
//                "long_name" : "Barra da Tijuca",
//                "short_name" : "Barra da Tijuca",
//                "types" : [ "political", "sublocality", "sublocality_level_1" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "locality", "political" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "administrative_area_level_2", "political" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "RJ",
//                "types" : [ "administrative_area_level_1", "political" ]
//             },
//             {
//                "long_name" : "Brazil",
//                "short_name" : "BR",
//                "types" : [ "country", "political" ]
//             }
//          ],
//          "formatted_address" : "Av. Alda Garrido - Barra da Tijuca, Rio de Janeiro - RJ, 22621-000, Brazil",
//          "geometry" : {
//             "bounds" : {
//                "northeast" : {
//                   "lat" : -23.0014294,
//                   "lng" : -43.3041101
//                },
//                "southwest" : {
//                   "lat" : -23.0150967,
//                   "lng" : -43.3198082
//                }
//             },
//             "location" : {
//                "lat" : -23.0091267,
//                "lng" : -43.3128912
//             },
//             "location_type" : "APPROXIMATE",
//             "viewport" : {
//                "northeast" : {
//                   "lat" : -23.0014294,
//                   "lng" : -43.3101484
//                },
//                "southwest" : {
//                   "lat" : -23.0142405,
//                   "lng" : -43.3198082
//                }
//             }
//          },
//          "place_id" : "ChIJDRCp0L7QmwAR8usCPmNJr8A",
//          "types" : [ "postal_code" ]
//       },
//       {
//          "address_components" : [
//             {
//                "long_name" : "22620",
//                "short_name" : "22620",
//                "types" : [ "postal_code", "postal_code_prefix" ]
//             },
//             {
//                "long_name" : "Barra da Tijuca",
//                "short_name" : "Barra da Tijuca",
//                "types" : [ "political", "sublocality", "sublocality_level_1" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "locality", "political" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "administrative_area_level_2", "political" ]
//             },
//             {
//                "long_name" : "State of Rio de Janeiro",
//                "short_name" : "RJ",
//                "types" : [ "administrative_area_level_1", "political" ]
//             },
//             {
//                "long_name" : "Brazil",
//                "short_name" : "BR",
//                "types" : [ "country", "political" ]
//             }
//          ],
//          "formatted_address" : "Barra da Tijuca, Rio de Janeiro - State of Rio de Janeiro, Brazil",
//          "geometry" : {
//             "bounds" : {
//                "northeast" : {
//                   "lat" : -23.0009429,
//                   "lng" : -43.2977475
//                },
//                "southwest" : {
//                   "lat" : -23.0153102,
//                   "lng" : -43.3294084
//                }
//             },
//             "location" : {
//                "lat" : -23.0093991,
//                "lng" : -43.3173933
//             },
//             "location_type" : "APPROXIMATE",
//             "viewport" : {
//                "northeast" : {
//                   "lat" : -23.0009429,
//                   "lng" : -43.2977475
//                },
//                "southwest" : {
//                   "lat" : -23.0153102,
//                   "lng" : -43.3294084
//                }
//             }
//          },
//          "place_id" : "ChIJ2zZsIqPQmwARquMCy3yno4Q",
//          "types" : [ "postal_code", "postal_code_prefix" ]
//       },
//       {
//          "address_components" : [
//             {
//                "long_name" : "22620-171",
//                "short_name" : "22620-171",
//                "types" : [ "postal_code" ]
//             },
//             {
//                "long_name" : "Barra da Tijuca",
//                "short_name" : "Barra da Tijuca",
//                "types" : [ "political", "sublocality", "sublocality_level_1" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "administrative_area_level_2", "political" ]
//             },
//             {
//                "long_name" : "State of Rio de Janeiro",
//                "short_name" : "RJ",
//                "types" : [ "administrative_area_level_1", "political" ]
//             },
//             {
//                "long_name" : "Brazil",
//                "short_name" : "BR",
//                "types" : [ "country", "political" ]
//             }
//          ],
//          "formatted_address" : "Barra da Tijuca, Rio de Janeiro - State of Rio de Janeiro, 22620-171, Brazil",
//          "geometry" : {
//             "bounds" : {
//                "northeast" : {
//                   "lat" : -22.9886204,
//                   "lng" : -43.2908234
//                },
//                "southwest" : {
//                   "lat" : -23.0398686,
//                   "lng" : -43.4572566
//                }
//             },
//             "location" : {
//                "lat" : -23.0139906,
//                "lng" : -43.3135956
//             },
//             "location_type" : "APPROXIMATE",
//             "viewport" : {
//                "northeast" : {
//                   "lat" : -22.9886204,
//                   "lng" : -43.2908234
//                },
//                "southwest" : {
//                   "lat" : -23.0398686,
//                   "lng" : -43.3330873
//                }
//             }
//          },
//          "place_id" : "ChIJ97CS2cHQmwARzVknQQr4rE4",
//          "types" : [ "postal_code" ]
//       },
//       {
//          "address_components" : [
//             {
//                "long_name" : "22640-100",
//                "short_name" : "22640-100",
//                "types" : [ "postal_code" ]
//             },
//             {
//                "long_name" : "Guaratiba",
//                "short_name" : "Guaratiba",
//                "types" : [ "political", "sublocality", "sublocality_level_1" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "locality", "political" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "administrative_area_level_2", "political" ]
//             },
//             {
//                "long_name" : "State of Rio de Janeiro",
//                "short_name" : "RJ",
//                "types" : [ "administrative_area_level_1", "political" ]
//             },
//             {
//                "long_name" : "Brazil",
//                "short_name" : "BR",
//                "types" : [ "country", "political" ]
//             }
//          ],
//          "formatted_address" : "Guaratiba, Rio de Janeiro - State of Rio de Janeiro, 22640-100, Brazil",
//          "geometry" : {
//             "bounds" : {
//                "northeast" : {
//                   "lat" : -19.9155488,
//                   "lng" : -43.1795594
//                },
//                "southwest" : {
//                   "lat" : -23.0251353,
//                   "lng" : -43.9377179
//                }
//             },
//             "location" : {
//                "lat" : -22.9701697,
//                "lng" : -43.61630479999999
//             },
//             "location_type" : "APPROXIMATE",
//             "viewport" : {
//                "northeast" : {
//                   "lat" : -22.963041,
//                   "lng" : -43.61593329999999
//                },
//                "southwest" : {
//                   "lat" : -22.9758293,
//                   "lng" : -43.6279335
//                }
//             }
//          },
//          "place_id" : "ChIJoboN76TQmwAR9TdiXZx_6Zg",
//          "types" : [ "postal_code" ]
//       },
//       {
//          "address_components" : [
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "administrative_area_level_2", "political" ]
//             },
//             {
//                "long_name" : "Rio de Janeiro",
//                "short_name" : "Rio de Janeiro",
//                "types" : [ "locality", "political" ]
//             },
//             {
//                "long_name" : "State of Rio de Janeiro",
//                "short_name" : "RJ",
//                "types" : [ "administrative_area_level_1", "political" ]
//             },
//             {
//                "long_name" : "Brazil",
//                "short_name" : "BR",
//                "types" : [ "country", "political" ]
//             }
//          ],
//          "formatted_address" : "Rio de Janeiro - State of Rio de Janeiro, Brazil",
//          "geometry" : {
//             "bounds" : {
//                "northeast" : {
//                   "lat" : -22.7460545,
//                   "lng" : -43.0990393
//                },
//                "southwest" : {
//                   "lat" : -23.0828927,
//                   "lng" : -43.7965385
//                }
//             },
//             "location" : {
//                "lat" : -22.9083081,
//                "lng" : -43.1970258
//             },
//             "location_type" : "APPROXIMATE",
//             "viewport" : {
//                "northeast" : {
//                   "lat" : -22.7460545,
//                   "lng" : -43.0990393
//                },
//                "southwest" : {
//                   "lat" : -23.0828927,
//                   "lng" : -43.7965385
//                }
//             }
//          },
//          "place_id" : "ChIJC7UkQv5-mQAR7llshDwliPk",
//          "types" : [ "administrative_area_level_2", "political" ]
//       },
//       {
//          "address_components" : [
//             {
//                "long_name" : "State of Rio de Janeiro",
//                "short_name" : "RJ",
//                "types" : [ "administrative_area_level_1", "political" ]
//             },
//             {
//                "long_name" : "Brazil",
//                "short_name" : "BR",
//                "types" : [ "country", "political" ]
//             }
//          ],
//          "formatted_address" : "State of Rio de Janeiro, Brazil",
//          "geometry" : {
//             "bounds" : {
//                "northeast" : {
//                   "lat" : -20.7632054,
//                   "lng" : -40.9568207
//                },
//                "southwest" : {
//                   "lat" : -23.3689318,
//                   "lng" : -44.8893205
//                }
//             },
//             "location" : {
//                "lat" : -22.9098755,
//                "lng" : -43.2094971
//             },
//             "location_type" : "APPROXIMATE",
//             "viewport" : {
//                "northeast" : {
//                   "lat" : -20.7632054,
//                   "lng" : -40.9568207
//                },
//                "southwest" : {
//                   "lat" : -23.3689318,
//                   "lng" : -44.8893205
//                }
//             }
//          },
//          "place_id" : "ChIJw4riypQYmAAR0IMFwRrDSQM",
//          "types" : [ "administrative_area_level_1", "political" ]
//       },
//       {
//          "address_components" : [
//             {
//                "long_name" : "Brazil",
//                "short_name" : "BR",
//                "types" : [ "country", "political" ]
//             }
//          ],
//          "formatted_address" : "Brazil",
//          "geometry" : {
//             "bounds" : {
//                "northeast" : {
//                   "lat" : 5.2717863,
//                   "lng" : -28.650543
//                },
//                "southwest" : {
//                   "lat" : -34.0891,
//                   "lng" : -73.9828169
//                }
//             },
//             "location" : {
//                "lat" : -14.235004,
//                "lng" : -51.92528
//             },
//             "location_type" : "APPROXIMATE",
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 5.2717863,
//                   "lng" : -28.650543
//                },
//                "southwest" : {
//                   "lat" : -34.0891,
//                   "lng" : -73.9828169
//                }
//             }
//          },
//          "place_id" : "ChIJzyjM68dZnAARYz4p8gYVWik",
//          "types" : [ "country", "political" ]
//       }
//    ],
//    "status" : "OK"
// }
