'use strict';

angular.module('orangeRitmicApp')
  .config(function ($translateProvider) {
    $translateProvider.translations('de', {
      'A11Y_BUY_TRACK_LINK': '{{ trackName }} von {{ artistName }} auf Itunes kaufen',
      'A11Y_BUY_ALBUM_LINK': '{{ albumName }} von {{ artistName }} auf Itunes kaufen',
      'A11Y_LISTEN_LINK': '{{ name }} anhören',
      'A11Y_APPEND_PLAYLIST_LINK': '{{ name }} der Wiedergabeliste hinzufügen',
      'A11Y_REMOVE_TRACK_LINK': '{{ trackName }} aus der Wiedergabeliste entfernen',
      'A11Y_CLEAR_PLAYSTACK': 'Wiedergabeliste leeren',
      'A11Y_GOTO_TOPTRACKS': 'Auf Liste der Top Songs zugreifen',
      'A11Y_GOTO_COUNTRIES': 'Land auswählen',
      'A11Y_GOTO_TOPGENRES': 'Top Songs und -albums nach Genre durchsuchen',
      'A11Y_GOTO_PLAYLISTS': 'Meine Wiedergabeliste durchsuchen',
      'A11Y_GOTO_TOPPLAYLISTS': 'Topwiedergabelisten nach Genre durchsuchen',
      'A11Y_GOTO_MYMUSIC': 'Meine Musik durchsuchen',
      'A11Y_TOGGLE_SHUFFLE': 'Zufallswiedergabe aktivieren / deaktivieren',
      'A11Y_ADD_PLAYSTACK_TO_PLAYLIST': 'Inhalt der Wiedergabeliste zu einer Wiedergabeliste hinzufügen',
      'A11Y_SEARCH': 'Nach Titel oder Album suchen',
      'A11Y_PLAYER_PREVIOUS': 'Vorherigen Titel abspielen',
      'A11Y_PLAYER_NEXT': 'Nächsten Titel abspielen',
      'A11Y_SHARE_FACEBOOK': '{{ title }} auf Facebook teilen',
      'A11Y_SHARE_TWITTER': '{{ title }} auf Twitter teilen',
      'A11Y_SHARE_GPLUS': '{{ title }} auf Google+ teilen',
      'A11Y_APPEND_NAMED_PLAYLIST_LINK': '{{title}} zu einer meiner Wiedergabelisten hinzufügen',

      'SOCIAL_FACEBOOK': 'https://www.facebook.com/profile.php?id=100011243535571&fref=ts',
      'SOCIAL_TWITTER': 'https://twitter.com/OrangeRitmic',
      'SOCIAL_GPLUS': 'https://plus.google.com/u/0/112460307388431786424',

      'HEADER_LINK': {
        'Orange': 'http://www.orange.com',
        'starMedia': 'http://www.starmedia.com'
      },

      'MENULEFT_TITLE': 'Orange Ritmic',
      'MENULEFT_TOPTRACKS': 'Top Songs',
      'MENULEFT_COUNTRIES': 'Länder',
      'MENULEFT_TOPGENRES': 'Topgenres',
      'MENULEFT_TOPPLAYLISTS': 'Topwiedergabelisten',
      'MENULEFT_PLACEHOLDER': 'Nach Titel oder Album suchen',
      'MENULEFT_MYPLAYLISTS': 'Meine Wiedergabelisten',
      'MENULEFT_MYFAVORITES': 'Meine Favoriten',
      'MENULEFT_LOGIN': 'Anmelden',
      'MENULEFT_LOGOUT_LINK': 'Abmelden',
      'MENULEFT_SUBSCRIBE': 'Registrieren',
      'MENULEFT_PROFILE_LINK': 'Mein Profil',
      'MENULEFT_TOGGLE_PLAYSTACK': 'Schleife',

      'OPENAM_MAIL_SIGNUP_OBJECT': 'Bitte bestätigen Sie die Erstellung Ihres Orange Ritmic Kontos',
      'OPENAM_MAIL_SIGNUP_BODY': 'Hallo,\nbitte bestätigen Sie die Erstellung Ihres Orange Ritmic Kontos durch Klicken dieses Links.\nFreundliche Grüße,\nIhr Orange Ritmic Team.',
      'OPENAM_MAIL_RESETPASSWORD_OBJECT': 'Ihr Passwort zurücksetzen Orange Ritmic',
      'OPENAM_MAIL_RESETPASSWORD_BODY': 'Hallo,\nWir haben eine Anfrage erhalten Ihr Passwort für Ihr Konto Orange Ritmic zurückzusetzen .\nKlicken Sie auf den folgenden Link:\naufrichtig\nDas Orange Team Ritmic',

      'MODAL_AUTHENTICATION_TITLE': 'Authentifizierung',
      'MODAL_AUTHENTICATION_SIGNIN_TITLE': 'Registrierung',
      'MODAL_AUTHENTICATION_LOGIN_LABEL': 'E-Mail-Adresse',
      'MODAL_AUTHENTICATION_PASSWORD': 'Passwort',
      'MODAL_AUTHENTICATION_LOGIN_BUTTON': 'Anmelden',
      'MODAL_AUTHENTICATION_SOCIAL_BUTTON': 'Anmelden',
      'MODAL_AUTHENTICATION_NO_ACCOUNT_LABEL': 'Noch kein Konto',
      'MODAL_AUTHENTICATION_NO_ACCOUNT_LINK_LABEL': 'Hier registrieren',
      'MODAL_AUTHENTICATION_WANT_SIGNIN': 'Sie haben bereits ein Konto?',
      'MODAL_AUTHENTICATION_WANT_SIGNIN_LINK_LABEL': 'Hier anmelden',
      'MODAL_AUTHENTICATION_SIGNIN_BUTTON': 'registrieren',
      'MODAL_AUTHENTICATION_MOBILE_SOCIAL_BUTTON_GOOGLE': 'Mit Google Plus verknüpfen',
      'MODAL_AUTHENTICATION_MOBILE_SOCIAL_BUTTON_FACEBOOK': 'Mit Facebook verknüpfen',
      'MODAL_AUTHENTICATION_PASSWORD_ERROR': 'falsches Passwort',
      'MODAL_AUTHENTICATION_RESET_PASSWORD_LABEL': 'Passwort vergessen?',
      'MODAL_AUTHENTICATION_RESET_PASSWORD_LINK_LABEL': 'Hier klicken',
      'MODAL_AUTHENTICATION_RESET_PASSWORD_BUTTON': 'Passwort zurücksetzen',
      'MODAL_AUTHENTICATION_RESET_PASSWORD_TITLE': 'Passwort zurücksetzen',
      'MODAL_EDIT_PLAYLIST_EDIT_PLAYLIST': 'Liste editieren',
      'MODAL_EDIT_PLAYLIST_NAME': 'Name',
      'MODAL_EDIT_PLAYLIST_DESCRIPTION': 'Beschreibung',
      'MODAL_EDIT_PLAYLIST_DELETE': 'Entfernen',
      'MODAL_EDIT_PLAYLIST_PUBLIC': 'Öffentlich',
      'MODAL_EDIT_PLAYLIST_PRIVATE': 'Privat',
      'MODAL_EDIT_PLAYLIST_CANCEL': 'Abbrechen',
      'MODAL_EDIT_PLAYLIST_SAVE': 'Speichern',
      'MODAL_CHANGE_PASSWORD_TITLE': 'Passwort ändern',
      'MODAL_CHANGE_PASSWORD_CANCEL': 'Abbrechen',
      'MODAL_CHANGE_PASSWORD_VALIDATE': 'Validieren',
      'MODAL_CHANGE_PASSWORD_TEXT': 'Eine E-Mail wird versendet, mit der Sie Ihr Passwort ändern können.',
      'MODAL_CHANGE_PASSWORD_TEXT_AFTER': 'Eine E-Mail wurde versendet, mit der Sie Ihr Passwort ändern können.',
      'MODAL_SHARE_ITEM': 'Auf sozialen Netzwerken teilen',
      'MODAL_SHARE_FACEBOOK': 'Facebook',
      'MODAL_SHARE_TWITTER': 'Twitter',
      'MODAL_SHARE_GOOGLE': 'Google Plus',
      'MODAL_ADD_TO_PLAYLIST': 'Einer Ihrer Wiedergabelisten hinzufügen',
      'MODAL_SHARE': 'Teilen',
      'MODAL_APPEND_TO_PLAYSTACK': 'Zu Wiedergabeliste hinzufügen',
      'MODAL_LINK_PLAYLIST': 'Seite der Wiedergabelisten',
      'MODAL_LINK_ALBUM': 'Seite der Alben',
      'MODAL_LINK_ARTIST': 'Seite der Interpreten',
      'MODAL_ADD_TO_PLAYLIST_TITLE': 'Einer Wiedergabeliste hinzufügen',
      'MODAL_ADD_TO_PLAYLIST_ERROR_PLAYLIST_TOO_LONG': 'Leider können wir diese Titel nicht zu deiner Playlist hinzufügen, weil die Anzahl Titel die maximal mögliche Anzahl übersteigen würde.',
      'MODAL_CREATE_PLAYLIST_TITLE': 'Wiedergabeliste erstellen',
      'MODAL_CREATE_PLAYLIST': 'Wiedergabeliste erstellen',
      'MODAL_DELETE_PLAYLIST_TEXT': 'Bist du sicher, dass du diese Playlist löschen möchtest?',
      'MODAL_GENRE_SELECTOR_TITLE': 'Genre wählen',
      'MODAL_TAG_SELECTOR_TITLE': 'Tag wählen',
      'MODAL_LANGUAGE_SELECTOR_TITLE': 'Sprache wählen',
      'MODAL_ERROR_TITLE': 'Es ist ein Fehler aufgetreten',

      'NOTIFICATION_TRACK_ADDED': '{{trackNumber}} Titel{{trackNumber > 1 ? \'s\': \'\'}} wurde der Wiedergabeliste hinzugefügt',
      'NOTIFICATION_TRACK_ADDED_TO_PLAYLIST': '{{trackNumber}} Titel{{trackNumber > 1 ? \'s\': \'\'}} wurde der Wiedergabeliste {{playlistName}}hinzugefügt',
      'NOTIFICATION_PLAYLIST_CREATED': 'Die Wiedergabeliste {{playlistName}} wurde erstellt',
      'NOTIFICATION_PLAYLIST_DELETED': 'Die Playlist wurde gelöscht',
      'NOTIFICATION_CONNECTED': 'Sie sind bei dem Dienst mit dem Namen {{displayName}} angemeldet',
      'NOTIFICATION_DISCONNECTED': 'Sie wurden von dem Dienst getrennt',

      'ADD_TO_PLAYLIST': 'Wurde der Wiedergabeliste hinzugefügt',
      'ADD_TO_NEW_PLAYLIST': 'Mit dieser Musik eine neue Wiedergabeliste erstellen',
      'ADD_CURRENT_TRACKS': 'Songs in der Schleife',

      'COUNTRY_LINK': 'Land :',
      'COUNTRY_PAGE_META_TITLE': 'Top 100 Songs nach Land sortiert',
      'COUNTRY_PAGE_META_DESCRIPTION': 'Zugriff auf die Top 100 Songs in jedem Land, nach Genre sortiert',
      'COUNTRY_PAGE_META_KEYWORDS': 'Top 100 Songs Europa, Top 100 Songs Nordamerika, Top 100 Songs Lateinamerika und Karibik, Top 100 Songs Afrika, Top 100 Songs Asien, Top 100 Songs Ozeanien',

      'BACK_TO_TOP': 'Zurück nach oben',

      'PLAYLIST_NOITEM': 'Die Wiedergabeliste ist leer',
      'PLAYLIST_PLAY_ALL': 'Schleife',
      'PLAYLIST_DESCRIPTION': 'Beschreibung',
      'PLAYLIST_NO_DESCRIPTION': 'Keine Beschreibung',
      'PLAYLIST_TRACKS': 'Titel',
      'PLAYLIST_LIST_ITEM_SUBTITLE': '{{ nbTracks }} Titel',
      'PLAYLIST_PAGE_META_TITLE': '{{ title }} | Ritmic',
      'MY_PLAYLIST_EDIT': 'Ändern',
      'MY_PLAYLIST_DELETE': 'Liste leeren',
      'MY_PLAYLIST_EDIT_NAME': 'Name',
      'MY_PLAYLIST_EDIT_DESCRIPTION': 'Beschreibung',
      'MY_PLAYLIST_EDIT_PRIVATE': 'Privat',
      'MY_PLAYLIST_EDIT_PUBLIC': 'Öffentlich',
      'MY_PLAYLIST_EDIT_CANCEL': 'Abbrechen',
      'MY_PLAYLIST_EDIT_SAVE': 'Speichern',
      'MY_PLAYLIST_NO_DESCRIPTION': 'Keine Beschreibung',
      'MY_PLAYLIST_TRACKS': 'Titel',
      'MY_PLAYLIST_OTHERS': 'Verwandte Wiedergabelisten',
      'MY_PLAYLIST_PLAY_ALL': 'Alle abspielen',

      'SEARCH_TERM': 'Ergebnisse durchsuchen nach:',
      'SEARCH_TRACKS': 'Songs',
      'SEARCH_NO_TRACK': 'Es konnte kein Song gefunden werden',
      'SEARCH_ALBUMS': 'Alben',
      'SEARCH_NO_ALBUM': 'Es konnte kein Album gefunden werden',
      'SEARCH_ARTISTS': 'Künstler',
      'SEARCH_PAGE_META_TITLE': 'Nach Titel, Album Interpret oder Band suchen',
      'SEARCH_PAGE_META_DESCRIPTION': 'Nach Titel, Album Interpret oder Band suchen',
      'SEARCH_PAGE_META_KEYWORDS': 'Nach Titel, Album Interpret oder Band suchen',

      'SHOW_MORE_TRACKS': 'Mehr Musik',
      'SHOW_MORE_ALBUMS': 'Mehr Alben',
      'SHOW_MORE_PLAYLISTS': 'Mehr Wiedergabelisten',

      'TOP_TRACKS_TITLE': 'Finden Sie die gesamte Musik auf Orange Ritmic',
      'TOP_TRACKS_BUTTON': 'Charts abspielen',
      'TOP_TRACK_COUNTRY': 'Top 100 Songs : {{country}}',
      'TOP_TRACK_PAGE_META_TITLE': 'Musik : Top 100 Songs, Weltmusik, Dance, Rock | Interpreten, Alben, Titel, Videos | Orange Ritmic',
      'TOP_TRACK_PAGE_META_DESCRIPTION': 'Hören Sie Musik direkt auf Orange Ritmic: Top 100 Songs, Rock, Weltmusik, Dance, Rock und entdecken Sie die neusten Alben, Songs und Videos ihrer Lieblingsband.',
      'TOP_TRACK_PAGE_META_KEYWORDS': 'Musik, Musikvideos, ritmic, Songs, Alben, Bands, Weltmusik, Dance, Rock, Jazz, Blues, Klassik, Electro, Pop, R&B, Dance, Hip Hop, Rap, Alternative, Top 100 Songs',
      'TOP_TRACK_COUNTRY_PER_GENRE': 'Top {{ genre }}',
      'TOP_TRACK_PAGE_PER_GENRE_META_TITLE': 'Top {{ genre }} : {{country}} | Orange Ritmic',
      'TOP_TRACK_PAGE_PER_GENRE_META_DESCRIPTION': 'Hören Sie {{ genre }} Musik direkt auf Ritmic : die Top 100 {{ genre }} Songs und entdecken Sie die neusten Alben, Songs und Videos ihrer Lieblingsband.A130',
      'TOP_TRACK_PAGE_PER_GENRE_META_KEYWORDS': '{{ genre }}, Ritmic, Musik, Songs, Alben, Bands',
      'TOP_GENRES_MUSIC_GENRE': 'Musikgenre',
      'TOP_GENRES_MUSIC_GENRE_PER_GENRE': 'Genre: {{ genre }}',
      'TOP_GENRES_TRENDING_TRACKS': 'Beliebte Songs',
      'TOP_GENRES_TRENDING_TRACKS_PER_GENRE': 'Beliebte Titel {{ genre }}',
      'TOP_GENRES_PLAY_ALL': 'ALLE ABSPIELEN',
      'TOP_GENRES_TRENDING_ALBUMS': 'Beliebte Alben',
      'TOP_GENRES_TRENDING_ALBUMS_PER_GENRE': 'Beliebte Alben {{ genre }}',
      'TOP_GENRES_TRENDING_PLAYLISTS': 'Beliebte Wiedergabelisten',
      'TOP_GENRES_TRENDING_PLAYLISTS_PER_GENRE': 'Beliebte Wiedergabelisten {{ genre }}',
      'TOP_GENRES_PAGE_META_TITLE': 'Populäre Musik nach Genre: Weltmusik, Tanz, Rock, Jazz... auf Orange Ritmic',
      'TOP_GENRES_PAGE_META_DESCRIPTION': 'Höre populäre Musik nach Genre direkt auf Orange Ritmic: Weltmusik, Tanz, Rock, Jazz... und entdecke populäre Bands, Alben, Lieder und Videos.',
      'TOP_GENRES_PAGE_META_KEYWORDS': 'Lieder, Alben, Bands, Weltmusk, Tanz, Rock, Jazz, Blues, Klassik, Elektro, Pop, R&B, Tanz, Hip-Hop, Rap, Alternativ, Orange Ritmic, Musik, Lieder, Alben, Bands',
      'TOP_GENRES_PAGE_PER_GENRE_META_TITLE': 'Genre: {{ genre }} | Musik | Ritmic',
      'TOP_GENRES_PAGE_PER_GENRE_META_DESCRIPTION': 'Hören Sie {{ genre }} Musik direkt auf Ritmic und entdecken Sie die neusten Alben, Songs und Videos ihrer Lieblingsband.',
      'TOP_GENRES_PAGE_PER_GENRE_META_KEYWORDS': '{{ genre }}, Ritmic, Musik, Songs, Alben, Bands',
      'TOP_PLAYLISTS_MUSIC_GENRE': 'Alle Wiedergabelisten',
      'TOP_PLAYLISTS_MUSIC_GENRE_PER_GENRE': 'Wiedergabelisten : {{ genre }}',
      'TOP_PLAYLISTS_TRENDING_PLAYLISTS': 'Beliebte Wiedergabelisten',
      'TOP_PLAYLISTS_TRENDING_PLAYLISTS_PER_GENRE': 'Beliebte Wiedergabelisten {{ genre }}',
      'TOP_PLAYLISTS_PAGE_META_TITLE': 'Beliebte Wiedergabelisten | Weltmusik, Dance, Rock | Titel, Videos | Ritmic',
      'TOP_PLAYLISTS_PAGE_META_DESCRIPTION': 'Hören Sie kostenlose Wiedergabelisten auf unserer Seite.',
      'TOP_PLAYLISTS_PAGE_META_KEYWORDS': 'Wiedergabelisten, {{ genre }}, Ritmic, Musik, Songs',
      'TOP_PLAYLISTS_PAGE_PER_GENRE_META_TITLE': 'Top Wiedergabelisten: {{ genre }} | Musik | Ritmic',
      'TOP_PLAYLISTS_PAGE_PER_GENRE_META_DESCRIPTION': 'Höre populäre {{ genre }}-Playlists auf Orange Ritmic',
      'TOP_PLAYLISTS_PAGE_PER_GENRE_META_KEYWORDS': 'Hören Sie kostenlose {{ genre }} Wiedergabelisten auf unserer Seite.',
      'TOP_PLAYLISTS_PAGE_PER_TAG_META_TITLE': 'Populäre {{ tag}}-Playlists auf Orange Ritmic',
      'TOP_PLAYLISTS_PAGE_PER_TAG_META_DESCRIPTION': 'Höre populäre {{ tag }}-Playlists auf Orange Ritmic',
      'TOP_PLAYLISTS_PAGE_PER_TAG_META_KEYWORDS': '{{ tag }}',

      'PAGE_FAVORITES_TITLE': 'Meine Favoriten',
      'PAGE_FAVORITES_NO_FAVORITE_BEFORE_HEART': 'Sie haben keine Favoriten ausgewählt. Klicken Sie auf',
      'PAGE_FAVORITES_NO_FAVORITE_AFTER_HEART': 'Ihre Lieblingssongs',
      'PAGE_FAVORITES_META_TITLE': 'Meine Favoriten',
      'PAGE_PLAYLISTS_TITLE': 'Meine Wiedergabelisten',
      'PAGE_PLAYLISTS_NO_PLAYLIST_BEFORE_+': 'Sie haben noch keine Wiedergabelisten erstellt. Klicken Sie auf',
      'PAGE_PLAYLISTS_NO_PLAYLIST_AFTER_+': 'Songs für Ihre Wiedergabelisten',
      'PAGE_PLAYLISTS_NOT_LOGGED_MESSAGE': 'Melden Sie sich an, um Wiedergabelisten zu erstellen und Ihre Favoriten auszuwählen.',
      'PAGE_MY_PLAYLISTS_META_TITLE': 'Meine Musik-Playlists | Orange Ritmic',

      'HEART_ADD': 'Zu Favoriten hinzufügen',
      'HEART_REMOVE': 'Favoriten löschen',

      'ALBUM_TRACKS': '{{ tracks.length }} Songs',
      'ALBUM_RELATED_ALBUMS': 'Verwandte Alben',
      'ALBUM_ARTIST': 'Von {{artist}}',
      'ALBUM_PLAY_ALL': 'ALLE ABSPIELEN',
      'ALBUM_PAGE_META_TITLE': '{{albumName}} | {{artistName}} | {{primaryGenreName}} Songs | Ritmic',
      'ALBUM_PAGE_META_DESCRIPTION': 'Hören Sie {{albumName}} kostenlos und direkt auf Ritmic, andere Alben von {{artistName}}, alle {{primaryGenreName}} Songs, Top Songs in Ihrem Land und im Rest der Welt',
      'ALBUM_PAGE_META_KEYWORDS': '{{albumName}},{{artistName}},{{primaryGenreName}}, Ritmic, Musik, Songs, Alben, Bands',

      'ARTIST_TRACKS': 'Beliebte Titel von {{ artistName }}',
      'ARTIST_DESCRIPTION': '{{primaryGenreName}} {{albums.length}} Album{{ albums.length > 1 ? \'S\' : \'\'}}',
      'ARTIST_PLAY_ALL': 'ALLE ABSPIELEN',
      'ARTIST_PAGE_META_TITLE': '{{ artistName}} | {{primaryGenreName}} Songs | Ritmic',
      'ARTIST_PAGE_META_DESCRIPTION': 'Hören Sie {{artistName}} kostenlos und direkt auf Ritmic, Top {{primaryGenreName}} Songs in Ihrem Land und im Rest der Welt',
      'ARTIST_PAGE_META_KEYWORDS': '{{artistName}},{{primaryGenreName}}, Ritmic, Musik, Songs, Alben, Bands, Songs',

      'INDEX ARTISTS': 'Künstler',

      'ITEM_COPY': 'KOPIEREN',
      'ITEM_SHARE': 'TEILEN',

      'COOKIES_ALERT': 'Wenn du weiter auf dieser Website surfst, erlaubst du alle Dienste von dritten Parteien.',
      'COOKIES_ALERT_ACCEPT_LABEL': 'Weiter.',

      'PAGE_ME_TITLE': 'Benutzerprofil',
      'PAGE_ME_DISPLAYNAME': 'Anmelden',
      'PAGE_ME_EMAIL': 'E-Mail-Adresse',
      'PAGE_ME_CHANGE_PASSWORD_BUTTON': 'das Passwort ändern',

      'TRACKLIST_NO_TRACKS': 'Keine Titel',

      'TWITTER_TRACK_SHARE_TEXT': '{{ track.title }} von {{ track.artistName }} ist auf Ritmic: {{ url }}',
      'TWITTER_ALBUM_SHARE_TEXT': '{{ album.albumName }} von {{ album.artistName }} ist auf Ritmic: {{ url }}',
      'TWITTER_ARTIST_SHARE_TEXT': '{{ artist.artistName }} ist auf Ritmic: {{ url }}',
      'TWITTER_PLAYLIST_SHARE_TEXT': 'Die Wiedergabeliste {{ playlist.title }} ist auf Ritmic: {{ url }}',

      'FOOTER_EDUCATION': 'Rincon del Vago',
      'FOOTER_EDUCATION_LINK': 'http://www.rincondelvago.com/',
      'FOOTER_RADIO': 'Orange Radio',
      'FOOTER_RADIO_LINK': 'http://webradio.orange.com',
      'FOOTER_STARMEDIA': 'Starmedia',
      'FOOTER_STARMEDIA_LINK': 'http://www.starmedia.com',
      'FOOTER_CONTACTS': 'Kontakt',
      'FOOTER_CONTACTS_LINK': 'mailto:contact.orangeritmic@orange.com',
      'FOOTER_COOKIES': 'Cookies',
      'FOOTER_COOKIES_LINK': '#!/en/cookies',
      'FOOTER_USERCONDITIONS': 'Orange Web Geschäftsbedingungen',
      'FOOTER_USERCONDITIONS_LINK': '#!/de/terms',
      'FOOTER_PRIVACY': 'Datenschutz',
      'FOOTER_PRIVACY_LINK': '#!/de/privacy',
      'FOOTER_COPYRIGHT': '© Orange 2016',

      'ERROR': {
        'ERROR_AUTH_API': 'Bei der Authentifizierung ist ein Fehler aufgetreten, bitte versuchen Sie es später erneut.',
        'ERROR_API': 'Bei unseren Servern ist ein Fehler aufgetreten, bitte versuchen Sie es später erneut',
        'ERROR_PLAYER': 'Der Titel ist aufgrund eines Copyright-Anspruches durch Dritte nicht verfügbar.',
        'ERROR_UNKNOWN_ARTIST': 'Leider sind keine Informationen für diesen Künstler vorhanden.'
      },

      'GENRE_SELECTOR_LABEL': 'Genre :',

      'GENRES': {
        '2': 'Blues',
        '5': 'Klassik',
        '7': 'Electro',
        '11': 'Jazz',
        '14': 'Pop',
        '15': 'R&B Soul',
        '17': 'Dance',
        '18': 'Hip Hop Rap',
        '19': 'World',
        '20': 'Alternative',
        '21': 'Rock',
        'all': 'Alle'
      },

      'TAGS': {
        'all': 'Stimmungen'
      },

      'all_continents': 'Alle Kontinente',

      'CONTINENT': {
        'AF': 'Afrika und Mittlerer Osten',
        'AS': 'Asien',
        'EU': 'Europa',
        'NA': 'Nordamerika',
        'SA': 'Lateinamerika und Karibik',
        'OC': 'Ozeanien'
      },

      'all_countries': 'Alle Länder',
      'ad': 'Andorra',
      'ae': 'Vereinigte Arabische Emirate',
      'af': 'Afghanistan',
      'ag': 'Antigua und Barbuda',
      'al': 'Albanien',
      'am': 'Armenien',
      'ao': 'Angola',
      'ar': 'Argentinien',
      'at': 'Österreich',
      'au': 'Australien',
      'az': 'Aserbaidschan',
      'ba': 'Bosnien und Herzegowina',
      'bb': 'Barbados',
      'bd': 'Bangladesch',
      'be': 'Belgien',
      'bf': 'Burkina Faso',
      'bg': 'Bulgarien',
      'bh': 'Bahrain',
      'bi': 'Burundi',
      'bj': 'Benin',
      'bn': 'Brunei Darussalam',
      'bo': 'Bolivien',
      'br': 'Brasilien',
      'bs': 'Bahamas',
      'bt': 'Bhutan',
      'bw': 'Botswana',
      'by': 'Weißrussland',
      'bz': 'Belize',
      'ca': 'Kanada',
      'cd': 'Kongo',
      'cf': 'Zentralafrika',
      'cg': 'Kongo',
      'ch': 'Schweiz',
      'ci': 'Elfenbeinküste',
      'cl': 'Chile',
      'cm': 'Kamerun',
      'cn': 'China',
      'co': 'Kolumbien',
      'cr': 'Costa Rica',
      'cu': 'Kuba',
      'cv': 'Kap Verde',
      'cy': 'Zypern',
      'cz': 'Tschechien',
      'de': 'Deutschland',
      'dj': 'Dschibuti',
      'dk': 'Dänemark',
      'dm': 'Dominika',
      'do': 'Dominikanische Republik',
      'dz': 'Algerien',
      'ec': 'Ecuador',
      'ee': 'Estland',
      'eg': 'Ägypten',
      'eh': 'Westsahara',
      'er': 'Eritrea',
      'es': 'Spanien',
      'et': 'Äthiopien',
      'fi': 'Finnland',
      'fj': 'Fidschi',
      'fm': 'Mikronesien',
      'fr': 'Frankreich',
      'ga': 'Gabun',
      'gb': 'Vereinigtes Königreich',
      'gd': 'Grenada',
      'ge': 'Georgien',
      'gh': 'Ghana',
      'gm': 'Gambia',
      'gn': 'Guinea',
      'gq': 'Äquatorialguinea',
      'gr': 'Griechenland',
      'gt': 'Guatemala',
      'gw': 'Guinea-Bissau',
      'gy': 'Guyana',
      'hn': 'Honduras',
      'hr': 'Kroatien',
      'ht': 'Haiti',
      'hu': 'Ungarn',
      'id': 'Indonesien',
      'ie': 'Irland',
      'il': 'Israel',
      'in': 'Indien',
      'iq': 'Irak',
      'ir': 'Iran',
      'is': 'Island',
      'it': 'Italien',
      'jm': 'Jamaika',
      'jo': 'Jordanien',
      'jp': 'Japan',
      'ke': 'Kenia',
      'kg': 'Kirgistan',
      'kh': 'Kambodscha',
      'ki': 'Kiribati',
      'km': 'Komoren',
      'kn': 'St. Kitts und Nevis',
      'kp': 'Nordkorea',
      'kr': 'Südkorea',
      'kw': 'Kuwait',
      'kz': 'Kasachstan',
      'la': 'Laos',
      'lb': 'Libanon',
      'lc': 'St. Lucia',
      'li': 'Liechtenstein',
      'lk': 'Sri Lanka',
      'lr': 'Liberia',
      'ls': 'Lesotho',
      'lt': 'Litauen',
      'lu': 'Luxemburg',
      'lv': 'Lettland',
      'ly': 'Libyen',
      'ma': 'Marokko',
      'mc': 'Monaco',
      'md': 'Moldawien',
      'me': 'Montenegro',
      'mg': 'Madagaskar',
      'mh': 'Marshallinseln',
      'mk': 'Mazedonien',
      'ml': 'Mali',
      'mm': 'Myanmar',
      'mn': 'Mongolei',
      'mr': 'Mauretanien',
      'mt': 'Malta',
      'mu': 'Mauritius',
      'mv': 'Malediven',
      'mw': 'Malawi',
      'mx': 'Mexiko',
      'my': 'Malaysia',
      'mz': 'Mosambik',
      'na': 'Namibia',
      'ne': 'Niger',
      'ng': 'Nigeria',
      'ni': 'Nicaragua',
      'nl': 'Niederlande',
      'no': 'Norwegen',
      'np': 'Nepal',
      'nr': 'Nauru',
      'nz': 'Neuseeland',
      'om': 'Oman',
      'pa': 'Panama',
      'pe': 'Peru',
      'pg': 'Papua-Neuguinea',
      'ph': 'Philippinen',
      'pk': 'Pakistan',
      'pl': 'Polen',
      'pt': 'Portugal',
      'pw': 'Palau',
      'py': 'Paraguay',
      'qa': 'Katar',
      'ro': 'Rumänien',
      'rs': 'Serbien',
      'ru': 'Russland',
      'rw': 'Ruanda',
      'sa': 'Saudi-Arabien',
      'sb': 'Salomoninseln',
      'sc': 'Seychellen',
      'sd': 'Sudan',
      'se': 'Schweden',
      'sg': 'Singapur',
      'si': 'Slowenien',
      'sk': 'Slowakei',
      'sl': 'Sierra Leone',
      'sm': 'San Marino',
      'sn': 'Senegal',
      'so': 'Somalia',
      'sr': 'Suriname',
      'st': 'São Tomé und Príncipe',
      'sv': 'El Salvador',
      'sy': 'Syrien',
      'sz': 'Swasiland',
      'td': 'Tschad',
      'tg': 'Togo',
      'th': 'Thailand',
      'tj': 'Tadschikistan',
      'tl': 'Osttimor',
      'tm': 'Turkmenistan',
      'tn': 'Tunesien',
      'to': 'Tonga',
      'tr': 'Türkei',
      'tt': 'Trinidad und Tobago',
      'tv': 'Tuvalu',
      'tw': 'Taiwan',
      'tz': 'Tansania',
      'ua': 'Ukraine',
      'ug': 'Uganda',
      'us': 'USA',
      'uy': 'Uruguay',
      'uz': 'Usbekistan',
      'va': 'Vatikan',
      'vc': 'St. Vincent',
      've': 'Venezuela',
      'vn': 'Vietnam',
      'vu': 'Vanuatu',
      'ws': 'Samoa',
      'ye': 'Jemen',
      'za': 'Südafrika',
      'zm': 'Sambia',
      'zw': 'Simbabwe'
    });
});