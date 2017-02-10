'use strict';

angular.module('orangeRitmicApp')
  .config(function ($translateProvider) {
    $translateProvider.translations('ro', {
      'A11Y_BUY_TRACK_LINK': 'Cumparati {{ trackName }} de la {{ artistName }} pe Itunes',
      'A11Y_BUY_ALBUM_LINK': 'Cumparati {{ albumName }} de pe Itunes',
      'A11Y_LISTEN_LINK': 'Ascultati {{ name }}',
      'A11Y_APPEND_PLAYLIST_LINK': 'Adugati {{ name }}  in playlist',
      'A11Y_REMOVE_TRACK_LINK': 'Eliminati {{ trackName }} din playlist',
      'A11Y_CLEAR_PLAYSTACK': 'Golire playlist',
      'A11Y_GOTO_TOPTRACKS': 'Pagina top melodii',
      'A11Y_GOTO_COUNTRIES': 'Selectati tarile din Top melodii',
      'A11Y_GOTO_TOPGENRES': 'Explorati top melodii si albume in functie de gen',
      'A11Y_GOTO_PLAYLISTS': '',
      'A11Y_GOTO_TOPPLAYLISTS': '',
      'A11Y_GOTO_MYMUSIC': '',
      'A11Y_TOGGLE_SHUFFLE': '',
      'A11Y_ADD_PLAYSTACK_TO_PLAYLIST': '',
      'A11Y_SEARCH': 'Cautare melodie sau album',
      'A11Y_PLAYER_PREVIOUS': 'Reda piesa anterioara',
      'A11Y_PLAYER_NEXT': 'Reda piesa urmatoare',
      'A11Y_SHARE_FACEBOOK': 'distribuie {{ title }} pe Facebook',
      'A11Y_SHARE_TWITTER': 'distribuie {{ title }} pe Twitter',
      'A11Y_SHARE_GPLUS': 'distribuie {{ title }} pe Google+',
      'A11Y_APPEND_NAMED_PLAYLIST_LINK': '',

      'SOCIAL_FACEBOOK': 'https://www.facebook.com/profile.php?id=100011243535571&fref=ts',
      'SOCIAL_TWITTER': 'https://twitter.com/OrangeRitmic',
      'SOCIAL_GPLUS': 'https://plus.google.com/u/0/112460307388431786429',

      'HEADER_LINK': {
        'Orange': 'http://www.orange.com',
        'starMedia': 'http://www.starmedia.com'
      },

      'MENULEFT_TITLE': 'Orange Ritmic',
      'MENULEFT_TOPTRACKS': 'Top melodii',
      'MENULEFT_COUNTRIES': 'Tari',
      'MENULEFT_TOPGENRES': 'Top genuri',
      'MENULEFT_TOPPLAYLISTS': '',
      'MENULEFT_PLACEHOLDER': 'Cauta melodie sau album',
      'MENULEFT_MYPLAYLISTS': '',
      'MENULEFT_MYFAVORITES': '',
      'MENULEFT_LOGIN': '',
      'MENULEFT_LOGOUT_LINK': '',
      'MENULEFT_SUBSCRIBE': '',
      'MENULEFT_PROFILE_LINK': '',
      'MENULEFT_TOGGLE_PLAYSTACK': '',

      'OPENAM_MAIL_SIGNUP_OBJECT': '',
      'OPENAM_MAIL_SIGNUP_BODY': '',
      'OPENAM_MAIL_RESETPASSWORD_OBJECT': '',
      'OPENAM_MAIL_RESETPASSWORD_BODY': '',

      'MODAL_AUTHENTICATION_TITLE': '',
      'MODAL_AUTHENTICATION_SIGNIN_TITLE': '',
      'MODAL_AUTHENTICATION_LOGIN_LABEL': '',
      'MODAL_AUTHENTICATION_PASSWORD': '',
      'MODAL_AUTHENTICATION_LOGIN_BUTTON': '',
      'MODAL_AUTHENTICATION_SOCIAL_BUTTON': '',
      'MODAL_AUTHENTICATION_NO_ACCOUNT_LABEL': '',
      'MODAL_AUTHENTICATION_NO_ACCOUNT_LINK_LABEL': '',
      'MODAL_AUTHENTICATION_WANT_SIGNIN': '',
      'MODAL_AUTHENTICATION_WANT_SIGNIN_LINK_LABEL': '',
      'MODAL_AUTHENTICATION_SIGNIN_BUTTON': '',
      'MODAL_AUTHENTICATION_MOBILE_SOCIAL_BUTTON_GOOGLE': '',
      'MODAL_AUTHENTICATION_MOBILE_SOCIAL_BUTTON_FACEBOOK': '',
      'MODAL_AUTHENTICATION_PASSWORD_ERROR': '',
      'MODAL_AUTHENTICATION_RESET_PASSWORD_LABEL': '',
      'MODAL_AUTHENTICATION_RESET_PASSWORD_LINK_LABEL': '',
      'MODAL_AUTHENTICATION_RESET_PASSWORD_BUTTON': '',
      'MODAL_AUTHENTICATION_RESET_PASSWORD_TITLE': '',
      'MODAL_EDIT_PLAYLIST_EDIT_PLAYLIST': '',
      'MODAL_EDIT_PLAYLIST_NAME': '',
      'MODAL_EDIT_PLAYLIST_DESCRIPTION': '',
      'MODAL_EDIT_PLAYLIST_DELETE': '',
      'MODAL_EDIT_PLAYLIST_PUBLIC': '',
      'MODAL_EDIT_PLAYLIST_PRIVATE': '',
      'MODAL_EDIT_PLAYLIST_CANCEL': '',
      'MODAL_EDIT_PLAYLIST_SAVE': '',
      'MODAL_CHANGE_PASSWORD_TITLE': '',
      'MODAL_CHANGE_PASSWORD_CANCEL': '',
      'MODAL_CHANGE_PASSWORD_VALIDATE': '',
      'MODAL_CHANGE_PASSWORD_TEXT': '',
      'MODAL_CHANGE_PASSWORD_TEXT_AFTER': '',
      'MODAL_SHARE_ITEM': '',
      'MODAL_SHARE_FACEBOOK': '',
      'MODAL_SHARE_TWITTER': '',
      'MODAL_SHARE_GOOGLE': '',
      'MODAL_ADD_TO_PLAYLIST': '',
      'MODAL_SHARE': '',
      'MODAL_APPEND_TO_PLAYSTACK': '',
      'MODAL_LINK_PLAYLIST': '',
      'MODAL_LINK_ALBUM': '',
      'MODAL_LINK_ARTIST': '',
      'MODAL_ADD_TO_PLAYLIST_TITLE': '',
      'MODAL_ADD_TO_PLAYLIST_ERROR_PLAYLIST_TOO_LONG': '',
      'MODAL_CREATE_PLAYLIST_TITLE': '',
      'MODAL_CREATE_PLAYLIST': '',
      'MODAL_DELETE_PLAYLIST_TEXT': '',
      'MODAL_GENRE_SELECTOR_TITLE': '',
      'MODAL_TAG_SELECTOR_TITLE': '',
      'MODAL_LANGUAGE_SELECTOR_TITLE': '',
      'MODAL_ERROR_TITLE': '',

      'NOTIFICATION_TRACK_ADDED': '',
      'NOTIFICATION_TRACK_ADDED_TO_PLAYLIST': '',
      'NOTIFICATION_PLAYLIST_CREATED': '',
      'NOTIFICATION_PLAYLIST_DELETED': '',
      'NOTIFICATION_CONNECTED': '',
      'NOTIFICATION_DISCONNECTED': '',

      'ADD_TO_PLAYLIST': '',
      'ADD_TO_NEW_PLAYLIST': '',
      'ADD_CURRENT_TRACKS': '',

      'COUNTRY_LINK': 'Tar? :',
      'COUNTRY_PAGE_META_TITLE': 'Top 100 songs per country',
      'COUNTRY_PAGE_META_DESCRIPTION': 'Access the top 100 songs in each country, top per genre…',
      'COUNTRY_PAGE_META_KEYWORDS': 'Top 100 songs europe, top 100 songs North America, top 100 songs Latin America and the Carabbean, top 100 songs Africa, top 100 songs Asia, top 100 songs Oceania',

      'BACK_TO_TOP': 'Inapoi la inceputul paginii',

      'PLAYLIST_NOITEM': 'Playlist-ul este gol',
      'PLAYLIST_PLAY_ALL': '',
      'PLAYLIST_DESCRIPTION': '',
      'PLAYLIST_NO_DESCRIPTION': '',
      'PLAYLIST_TRACKS': '',
      'PLAYLIST_LIST_ITEM_SUBTITLE': '',
      'PLAYLIST_PAGE_META_TITLE': '{{ title }} | Ritmic',
      'MY_PLAYLIST_EDIT': '',
      'MY_PLAYLIST_DELETE': '',
      'MY_PLAYLIST_EDIT_NAME': '',
      'MY_PLAYLIST_EDIT_DESCRIPTION': '',
      'MY_PLAYLIST_EDIT_PRIVATE': '',
      'MY_PLAYLIST_EDIT_PUBLIC': '',
      'MY_PLAYLIST_EDIT_CANCEL': '',
      'MY_PLAYLIST_EDIT_SAVE': '',
      'MY_PLAYLIST_NO_DESCRIPTION': '',
      'MY_PLAYLIST_TRACKS': '',
      'MY_PLAYLIST_OTHERS': '',
      'MY_PLAYLIST_PLAY_ALL': '',

      'SEARCH_TERM': 'Rezultatele cautarii pentru:',
      'SEARCH_TRACKS': 'Melodii',
      'SEARCH_NO_TRACK': 'Melodia cautata nu a fost gasita',
      'SEARCH_ALBUMS': 'Album',
      'SEARCH_NO_ALBUM': 'Albumul cautat nu a fost gasit',
      'SEARCH_ARTISTS': 'Artisti',
      'SEARCH_PAGE_META_TITLE': 'Search for a track, an album, an artist or a band',
      'SEARCH_PAGE_META_DESCRIPTION': 'Search for a track, an album, an artist or a band',
      'SEARCH_PAGE_META_KEYWORDS': 'Search for a track, an album, an artist or a band',

      'SHOW_MORE_TRACKS': 'Mai multe melodii',
      'SHOW_MORE_ALBUMS': 'Mai multe albume',
      'SHOW_MORE_PLAYLISTS': '',

      'TOP_TRACKS_TITLE': 'Toata muzica este pe Orange Ritmic',
      'TOP_TRACKS_BUTTON': 'REDARE TOP MELODII',
      'TOP_TRACK_COUNTRY': 'Top 100 melodii : {{country}}',
      'TOP_TRACK_PAGE_META_TITLE': 'Music : top 100 songs, world music,  dance, rock…| artists, albums, tracks, videos | Orange Ritmic',
      'TOP_TRACK_PAGE_META_DESCRIPTION': 'Listen to all the music directly on Orange Ritmic : top 100 songs, rock, world music, dance, rock… and discover your favorite bands latest albums, songs and videos.',
      'TOP_TRACK_PAGE_META_KEYWORDS': 'Melodii, Artisti, Playlist, Top, Ritmic, Genuri muzicale',
      'TOP_TRACK_COUNTRY_PER_GENRE': 'Top muzica {{ genre }}',
      'TOP_TRACK_PAGE_PER_GENRE_META_TITLE': 'Top {{ genre }} : {{country}} | Orange Ritmic',
      'TOP_TRACK_PAGE_PER_GENRE_META_DESCRIPTION': 'Music : top 100 songs, world music,  dance, rock…| artists, albums, tracks, videos | Orange Ritmic',
      'TOP_TRACK_PAGE_PER_GENRE_META_KEYWORDS': 'Listen to all the music directly on Ritmic : top 100 songs, rock, world music, dance, rock… and discover your favorite bands latest albums, songs and videos.',
      'TOP_GENRES_MUSIC_GENRE': 'Genuri muzicale:',
      'TOP_GENRES_MUSIC_GENRE_PER_GENRE': '',
      'TOP_GENRES_TRENDING_TRACKS': 'Cele mai ascultate melodii',
      'TOP_GENRES_TRENDING_TRACKS_PER_GENRE': '',
      'TOP_GENRES_PLAY_ALL': '',
      'TOP_GENRES_TRENDING_ALBUMS': 'Cele mai ascultate albume',
      'TOP_GENRES_TRENDING_ALBUMS_PER_GENRE': '',
      'TOP_GENRES_TRENDING_PLAYLISTS': '',
      'TOP_GENRES_TRENDING_PLAYLISTS_PER_GENRE': '',
      'TOP_GENRES_PAGE_META_TITLE': '',
      'TOP_GENRES_PAGE_META_DESCRIPTION': '',
      'TOP_GENRES_PAGE_META_KEYWORDS': '',
      'TOP_GENRES_PAGE_PER_GENRE_META_TITLE': 'Genuri: {{ genre }} | music | Ritmic',
      'TOP_GENRES_PAGE_PER_GENRE_META_DESCRIPTION': 'Listen to {{ genre }} music directly on Ritmic and discover your favorite bands latest albums, songs and videos.',
      'TOP_GENRES_PAGE_PER_GENRE_META_KEYWORDS': '{{ genre }}, Ritmic, music, songs, albums, bands',
      'TOP_PLAYLISTS_MUSIC_GENRE': '',
      'TOP_PLAYLISTS_MUSIC_GENRE_PER_GENRE': '',
      'TOP_PLAYLISTS_TRENDING_PLAYLISTS': '',
      'TOP_PLAYLISTS_TRENDING_PLAYLISTS_PER_GENRE': '',
      'TOP_PLAYLISTS_PAGE_META_TITLE': '',
      'TOP_PLAYLISTS_PAGE_META_DESCRIPTION': '',
      'TOP_PLAYLISTS_PAGE_META_KEYWORDS': '',
      'TOP_PLAYLISTS_PAGE_PER_GENRE_META_TITLE': '',
      'TOP_PLAYLISTS_PAGE_PER_GENRE_META_DESCRIPTION': '',
      'TOP_PLAYLISTS_PAGE_PER_GENRE_META_KEYWORDS': '',
      'TOP_PLAYLISTS_PAGE_PER_TAG_META_TITLE': '',
      'TOP_PLAYLISTS_PAGE_PER_TAG_META_DESCRIPTION': '',
      'TOP_PLAYLISTS_PAGE_PER_TAG_META_KEYWORDS': '',

      'PAGE_FAVORITES_TITLE': '',
      'PAGE_FAVORITES_NO_FAVORITE_BEFORE_HEART': '',
      'PAGE_FAVORITES_NO_FAVORITE_AFTER_HEART': '',
      'PAGE_FAVORITES_META_TITLE': '',
      'PAGE_PLAYLISTS_TITLE': '',
      'PAGE_PLAYLISTS_NO_PLAYLIST_BEFORE_+': '',
      'PAGE_PLAYLISTS_NO_PLAYLIST_AFTER_+': '',
      'PAGE_PLAYLISTS_NOT_LOGGED_MESSAGE': '',
      'PAGE_MY_PLAYLISTS_META_TITLE': '',

      'HEART_ADD': '',
      'HEART_REMOVE': '',

      'ALBUM_TRACKS': '{{ tracks.length }} Melodii',
      'ALBUM_RELATED_ALBUMS': 'Albume asociate',
      'ALBUM_ARTIST': 'Be {{artist}}',
      'ALBUM_PLAY_ALL': 'REDARE TOATA',
      'ALBUM_PAGE_META_TITLE': '{{albumName}} | {{artistName}} | {{primaryGenreName}} songs | Ritmic',
      'ALBUM_PAGE_META_DESCRIPTION': 'Listen to {{albumName}} for free and directly on Ritmic, other {{artistName}} albums, all {{primaryGenreName}} songs, top songs in your country and abroad…',
      'ALBUM_PAGE_META_KEYWORDS': '{{albumName}},{{artistName}},{{primaryGenreName}}, Ritmic, music, songs, albums, bands',

      'ARTIST_TRACKS': '',
      'ARTIST_DESCRIPTION': '{{primaryGenreName}} {{albums.length}} album{{ albums.length > 1 ? \'s\' : \'\'}}',
      'ARTIST_PLAY_ALL': 'REDARE TOATA',
      'ARTIST_PAGE_META_TITLE': '{{ artistName}} |  {{primaryGenreName}} songs | Ritmic',
      'ARTIST_PAGE_META_DESCRIPTION': 'Listen to {{artistName}} for free and directly on Ritmic, top  {{primaryGenreName}} songs in your country and abroad…',
      'ARTIST_PAGE_META_KEYWORDS': '{{artistName}},{{primaryGenreName}}, Ritmic, music, songs, albums, bands, songs ',

      'INDEX ARTISTS': 'Artisti',

      'ITEM_COPY': '',
      'ITEM_SHARE': '',

      'COOKIES_ALERT': '',
      'COOKIES_ALERT_ACCEPT_LABEL': '',

      'PAGE_ME_TITLE': '',
      'PAGE_ME_DISPLAYNAME': '',
      'PAGE_ME_EMAIL': '',
      'PAGE_ME_CHANGE_PASSWORD_BUTTON': '',

      'TRACKLIST_NO_TRACKS': '',

      'TWITTER_TRACK_SHARE_TEXT': '',
      'TWITTER_ALBUM_SHARE_TEXT': '',
      'TWITTER_ARTIST_SHARE_TEXT': '',
      'TWITTER_PLAYLIST_SHARE_TEXT': '',

      'FOOTER_EDUCATION': 'Rincon del Vago',
      'FOOTER_EDUCATION_LINK': 'http://www.rincondelvago.com/',
      'FOOTER_RADIO': 'Orange Radio',
      'FOOTER_RADIO_LINK': 'http://webradio.orange.com',
      'FOOTER_STARMEDIA': 'Starmedia',
      'FOOTER_STARMEDIA_LINK': 'http://www.starmedia.com',
      'FOOTER_CONTACTS': 'Contact',
      'FOOTER_CONTACTS_LINK': 'mailto:contact.orangeritmic@orange.com',
      'FOOTER_COOKIES': 'Cookies',
      'FOOTER_COOKIES_LINK': '',
      'FOOTER_USERCONDITIONS': 'Termeni si conditii',
      'FOOTER_USERCONDITIONS_LINK': '#!/ro/terms',
      'FOOTER_PRIVACY': '',
      'FOOTER_PRIVACY_LINK': '',
      'FOOTER_COPYRIGHT': '© Orange 2016',

      'ERROR': {
        'ERROR_AUTH_API': '',
        'ERROR_API': 'O eroare interna a aparut,va rugam incercati mai tarziu.',
        'ERROR_PLAYER': 'Melodia nu este disponibila din cauza politicii de copyright',
        'ERROR_UNKNOWN_ARTIST': 'Din pacate,informatiile despre acest artist nu sunt disponibile.,'
      },

      'GENRE_SELECTOR_LABEL': '',

      'GENRES': {
        '2': 'Blues',
        '5': 'Clasica',
        '7': 'Electro',
        '11': 'Jazz',
        '14': 'Pop',
        '15': 'R&B Soul',
        '17': 'Dance',
        '18': 'Hip Hop',
        '19': 'Internationala',
        '20': 'Alternativa',
        '21': 'Rock',
        'all': 'Toate'
      },

      'TAGS': {
        'all': ''
      },

      'all_continents': 'Toate continentele',

      'CONTINENT': {
        'AF': 'Africa',
        'AS': 'Asia',
        'EU': 'Europa',
        'NA': 'America de Nord',
        'SA': 'America Latina si Caraibe',
        'OC': 'Oceania'
      },

      'all_countries': 'Toate tarile',
      'ad': 'Andorra',
      'ae': 'Emiratele Arabe Unite',
      'af': 'Afganistan',
      'ag': 'Antigua si Barbuda',
      'al': 'Albania',
      'am': 'Armenia',
      'ao': 'Angola',
      'ar': 'Argentina',
      'at': 'Austria',
      'au': 'Australia',
      'az': 'Azerbaidjan',
      'ba': 'Bosnia si Hertegovina',
      'bb': 'Barbados',
      'bd': 'Bangladesh',
      'be': 'Belgia',
      'bf': 'Burkina Faso',
      'bg': 'Bulgaria',
      'bh': 'Bahrain',
      'bi': 'Burundi',
      'bj': 'Benin',
      'bn': 'Brunei',
      'bo': 'Bolivia',
      'br': 'Brazilia',
      'bs': 'Bahamas',
      'bt': 'Buthan',
      'bw': 'Botswana',
      'by': 'Belarus',
      'bz': 'Belize',
      'ca': 'Canada',
      'cd': 'Congo',
      'cf': 'Republica Centrafricana',
      'cg': 'Congo',
      'ch': 'Elvetia',
      'ci': 'Coasta de Fildes',
      'cl': 'Chile',
      'cm': 'Camerun',
      'cn': 'China',
      'co': 'Columbia',
      'cr': 'Costa Rica',
      'cu': 'Cuba',
      'cv': 'Capul Verde',
      'cy': 'Cipru',
      'cz': 'Cehia',
      'de': 'Germania',
      'dj': 'Djibouti',
      'dk': 'Danemarca',
      'dm': 'Dominica',
      'do': 'Republica Dominicana',
      'dz': 'Algeria',
      'ec': 'Ecuador',
      'ee': 'Estonia',
      'eg': 'Egipt',
      'eh': 'Sahara Occidentala',
      'er': 'Eritrea',
      'es': 'Spania',
      'et': 'Etiopia',
      'fi': 'Finlanda',
      'fj': 'Fidji',
      'fm': 'Micronezia',
      'fr': 'Franta',
      'ga': 'Gabon',
      'gb': 'Marea Britanie',
      'gd': 'Granada',
      'ge': 'Georgia',
      'gh': 'Ghana',
      'gm': 'Gambia',
      'gn': 'Guinea',
      'gq': 'Guinea Ecuatoriala',
      'gr': 'Grecia',
      'gt': 'Guatemala',
      'gw': 'Guinea Bissau',
      'gy': 'Guyana',
      'hn': 'Honduras',
      'hr': 'Croatia',
      'ht': 'Haiti',
      'hu': 'Ungaria',
      'id': 'Indonezia',
      'ie': 'Irlanda',
      'il': 'Israel',
      'in': 'India',
      'iq': 'Iraq',
      'ir': 'Iran',
      'is': 'Islanda',
      'it': 'Italia',
      'jm': 'Jamaica',
      'jo': 'Iordania',
      'jp': 'Japonia',
      'ke': 'Kenya',
      'kg': 'Kirghizistan',
      'kh': 'Cambodgia',
      'ki': 'Kiribati',
      'km': 'Comore',
      'kn': 'Saint Kitts si  Nevis',
      'kp': 'Coreea de Nord',
      'kr': 'Coreea de Sud',
      'kw': 'Kuwait',
      'kz': 'Kazahstan',
      'la': 'Laos',
      'lb': 'Liban',
      'lc': 'Santa Lucia',
      'li': 'Liechtenstein',
      'lk': 'Sri Lanka',
      'lr': 'Liberia',
      'ls': 'Lesotho',
      'lt': 'Lituania',
      'lu': 'Luxemburg',
      'lv': 'Lituania',
      'ly': 'Libia',
      'ma': 'Maroc',
      'mc': 'Monaco',
      'md': 'Moldova',
      'me': 'Muntenegru',
      'mg': 'Madagascar',
      'mh': 'Insulele Marshall',
      'mk': 'Macedonia',
      'ml': 'Mali',
      'mm': 'Myanmar',
      'mn': 'Mongolia',
      'mr': 'Mauritania',
      'mt': 'Malta',
      'mu': 'Mauritius',
      'mv': 'Maldive',
      'mw': 'Malawi',
      'mx': 'Mexic',
      'my': 'Malaezia',
      'mz': 'Mozambic',
      'na': 'Namibia',
      'ne': 'Niger',
      'ng': 'Nigeria',
      'ni': 'Nicaragua',
      'nl': 'Olanda',
      'no': 'Norvegia',
      'np': 'Nepal',
      'nr': 'Nauru',
      'nz': 'Noua Zeelanda',
      'om': 'Oman',
      'pa': 'Panama',
      'pe': 'Peru',
      'pg': 'Papua Noua Guinee',
      'ph': 'Filipine',
      'pk': 'Pakistan',
      'pl': 'Polonia',
      'pt': 'Portugalia',
      'pw': 'Palau',
      'py': 'Paraguay',
      'qa': 'Qatar',
      'ro': 'Romania',
      'rs': 'Serbia',
      'ru': 'Rusia',
      'rw': 'Rwanda',
      'sa': 'Arabia Saudita',
      'sb': 'Insulele Solomon',
      'sc': 'Seychelles',
      'sd': 'Sudan',
      'se': 'Suedia',
      'sg': 'Singapore',
      'si': 'Slovenia',
      'sk': 'Slovacia',
      'sl': 'Sierra Leone',
      'sm': 'San Marino',
      'sn': 'Senegal',
      'so': 'Somalia',
      'sr': 'Suriname',
      'st': 'Sao Tome si Principe',
      'sv': 'El-Salvador',
      'sy': 'Siria',
      'sz': 'Swaziland',
      'td': 'Ciad',
      'tg': 'Togo',
      'th': 'Thailanda',
      'tj': 'Tadjikistan',
      'tl': 'Timor-Leste',
      'tm': 'Turkmenistan',
      'tn': 'Tunisia',
      'to': 'Tonga',
      'tr': 'Turcia',
      'tt': 'Trinidad Tobago',
      'tv': 'Tuvalu',
      'tw': 'Taiwan',
      'tz': 'Tanzania',
      'ua': 'Ucraina',
      'ug': 'Uganda',
      'us': 'Statele Unite ale Americii',
      'uy': 'Uruguay',
      'uz': 'Uzbekistan',
      'va': 'Vatican',
      'vc': 'Saint Vincent si  Grenadine',
      've': 'Venezuela',
      'vn': 'Vietnam',
      'vu': 'Vanuatu',
      'ws': 'Samoa',
      'ye': 'Yemen',
      'za': 'Africa de Sud',
      'zm': 'Zambia',
      'zw': 'Zimbabwe'
    });
});