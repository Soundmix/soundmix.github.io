<?php
include_once ("./config.inc");
date_default_timezone_set ( "UTC" );

$NB_REQUESTED_ELEMENTS = 500;
$NB_ELEMENT_PER_SITEMAP = 25000;
$LAST_MODIFICATION_DATE = date ( "Y-m-d", time () );
$LANGUAGES = array (
    "mx" => "es",
    "us" => "en"
);
$RE_COUNTRIES = "(" . implode ( "|", array_keys ( $LANGUAGES ) ) . ")";
$FILENAMES = array ( "0-9" );
for($i = 0, $char = 'a'; $i < 26; $i ++, $char ++) {
    array_push ( $FILENAMES, $char );
}

$startingTime = microtime(true);

// Static URLs
$static_urls = array ();
foreach ( array_keys ( $LANGUAGES ) as $country ) {
    $prefix = "#!/" . $LANGUAGES[$country] . "/" . $country . "/";
    array_push ( $static_urls, array ( $prefix . "topTracks", "daily", "1" ) );
    array_push ( $static_urls, array ( $prefix . "topGenres", "daily", "0.8" ) );
    array_push ( $static_urls, array ( $prefix . "playlists", "daily", "0.8" ) );
    array_push ( $static_urls, array ( "#!/" . $LANGUAGES[$country] . "/countries", "daily", "0.8" ) );
}

foreach ( array_keys ( $LANGUAGES ) as $country ) {
    foreach ( $FILENAMES as $filename ) {
        file_put_contents ( "directory/" . $country . "_" . $filename . ".html", "" );
    }
}

// Get all itunes artists from a paginated backend URL
$artist_urls = array ();
foreach ( array_keys ( $LANGUAGES ) as $country ) {
    $START_ROW = 0;
    do {
      $artists_url = API_HOST . API_PATH . "sitemap/sitemap.json/" . $NB_REQUESTED_ELEMENTS . "/" . $START_ROW . "?prefix=itunes_artist-" . $country . "&properties=artistSlug,artistName";
      echo "<br>URL: " . $artists_url;
      $json_artist_response = file_get_contents_curl ( $artists_url );
      if ($json_artist_response !== false) {
        $json_artist_data = json_decode ( $json_artist_response );
        // Build URLs for each artists
        if ($json_artist_data != null) {
            foreach ( $json_artist_data->data as $artist ) {
                $language = $LANGUAGES [$country];
                if ($artist->artistSlug != null) {
                    $artist->artistSlug = strtolower($artist->artistSlug);
                    $url = "#!/" . $language . "/artist/" . $artist->artistSlug;
                    array_push ( $artist_urls, array ( $url, "monthly", "0.5" ) );
                    file_put_contents ( alphaFile ( $artist->artistSlug ), "<a href=\"" . SITEMAP_BASE_URL . "index.html" . $url . "\">" . $artist->artistName . "</a><br>" . PHP_EOL, FILE_APPEND );
                } else {
                    echo "<br>WARN: missing artistSlug for: " . $artist->id;
                }
                // Set the last element as a START_ROW for the new request on the backend
                $START_ROW = $artist->id;
            }
        }
      } else {
        die("Artists request failed.");
      }
    } while ( $json_artist_data != null && count ( $json_artist_data->data ) > 0 );
}

// Get all itunes albums from a paginated backend URL
$album_urls = array ();
foreach ( array_keys ( $LANGUAGES ) as $country ) {
    $START_ROW = 0;
    $language = $LANGUAGES [$country];
    do {
      $albums_url = API_HOST . API_PATH . "sitemap/sitemap.json/" . $NB_REQUESTED_ELEMENTS . "/" . $START_ROW . "?prefix=itunes_album-" . $country . "&properties=albumSlug,artistSlug,trackId";
      echo "<br>URL: " . $albums_url;
      $json_album_response = file_get_contents_curl ( $albums_url );
      if ($json_artist_response !== false) {
        $json_album_data = json_decode ( $json_album_response );
        // Build URLs for each albums
        if ($json_album_data != null) {
            foreach ( $json_album_data->data as $album ) {
                if ($album->trackId == null) {
	                array_push ( $album_urls, array ( "#!/" . $language . "/artist/" . $album->artistSlug . "/album/" . $album->albumSlug, "monthly", "0.5" ) );
                }
                // Set the last element as a START_ROW for the new request on the backend
                $START_ROW = $album->id;
            }
        }
      } else {
        die("Albums request failed.");
      }
    } while ( $json_album_data != null && count ( $json_album_data->data ) > 0 );
}

$all_urls = array_merge ( $static_urls, $artist_urls, $album_urls );

// Write sitemap index with the necessary number of sitemap-x.xml
$nbLoop = count ( $all_urls ) / $NB_ELEMENT_PER_SITEMAP;
// Prevent writing when api calls returned nothing for some unknown reason
if (4 <= $nbLoop) {
  for($i = 0; $i < $nbLoop; $i ++) {
      $start = $i * $NB_ELEMENT_PER_SITEMAP;
      writeUrlSet ( "sitemap-" . ($i + 1) . ".xml", array_slice ( $all_urls, $start, $NB_ELEMENT_PER_SITEMAP ), $RE_COUNTRIES );
  }
  writeIndex ( $nbLoop );
  echo "<br>Sitemap generation completed.";
} else {
  echo "<br>Sitemap NOT writen. Too few data.";
}

foreach ( array_keys ( $LANGUAGES ) as $country ) {
    foreach ( $FILENAMES as $filename ) {
        sortFileContent ( "./directory/" . $country . "_" . $filename);
    }
}
$endingTime = microtime(true);
echo "<br>Directory generation completed.";
echo "<br>Total Duration: " . sprintf("%.3f", $endingTime - $startingTime ) . " s";


function sortFileContent($fileName) {
    if (file_exists ( $fileName . ".html" )) {
        $data = file ( $fileName . ".html" );
        sort ( $data );
        file_put_contents ( $fileName . ".html", $data );
    }
}


function file_get_contents_curl($url) {
    $ch = curl_init ();
    curl_setopt ( $ch, CURLOPT_AUTOREFERER, TRUE );
    curl_setopt ( $ch, CURLOPT_HEADER, 0 );
    curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt ( $ch, CURLOPT_URL, $url );
    curl_setopt ( $ch, CURLOPT_FOLLOWLOCATION, TRUE );
    if (SET_PROXY) {
      curl_setopt ( $ch, CURLOPT_PROXY, PROXY_URL );
    }
    $data = curl_exec ( $ch );
    if ($data === false) {
      echo 'Erreur Curl : ' . curl_error($ch);
    }
    curl_close ( $ch );
    return $data;
}


function writeIndex($nbLoc) {
    global $LAST_MODIFICATION_DATE;

    $xmlWriter = new XMLWriter ();
    $xmlWriter->openMemory ();
    $xmlWriter->startDocument ( "1.0", "UTF-8" );
    $xmlWriter->setIndent ( 2 );
    $xmlWriter->startElement ( "sitemapindex" );
    $xmlWriter->writeAttribute ( "xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9" );

    for($i = 0; $i < $nbLoc; $i ++) {
        $xmlWriter->startElement ( "sitemap" );
        $xmlWriter->writeElement ( "loc", SITEMAP_BASE_URL . "sitemap-" . ($i + 1) . ".xml" );
        $xmlWriter->writeElement ( "lastmod", $LAST_MODIFICATION_DATE );
        $xmlWriter->endElement ();
    }
    $xmlWriter->endElement ();

    // Final flush
    file_put_contents ( "sitemap.xml", $xmlWriter->flush ( true ) );
}


function alphaFile($id) {
    $first = $id [0];
    preg_match ( "|^.*-([a-z]{2})-[0-9]+$|", $id, $matches );
    if (count ( $matches ) >= 2) {
        if ($first < 'a' || $first > 'z') {
            $first = "0-9";
        }
        return "directory/" . $matches [1] . "_" . $first . ".html";
    } else {
        echo $id;
        return "";
    }
}


function writeUrlSet($filename, $ids) {
    global $LAST_MODIFICATION_DATE;

    // empty file if it already exists
    file_put_contents ( $filename, "" );

    $xmlWriter = new XMLWriter ();
    $xmlWriter->openMemory ();
    // $xmlWriter->openURI("php://output");
    $xmlWriter->startDocument ( "1.0", "UTF-8" );
    $xmlWriter->setIndent ( 2 );
    $xmlWriter->startElement ( "urlset" );
    $xmlWriter->writeAttribute ( "xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9" );

    for($i = 0; $i < count ( $ids ); $i ++) {
        $xmlWriter->startElement ( "url" );
        $xmlWriter->writeElement ( "loc", SITEMAP_BASE_URL . "index.html" . $ids [$i][0] );
        $xmlWriter->writeElement ( "lastmod", $LAST_MODIFICATION_DATE );
        $xmlWriter->writeElement ( "changefreq", $ids [$i][1] );
        $xmlWriter->writeElement ( "priority", $ids [$i][2] );
        $xmlWriter->endElement ();

        // Flush XML in memory to file every 1000 iterations
        if (0 == ($i % 1000)) {
            file_put_contents ( $filename, $xmlWriter->flush ( true ), FILE_APPEND );
        }
    }
    $xmlWriter->endElement ();

    // Final flush
    file_put_contents ( $filename, $xmlWriter->flush ( true ), FILE_APPEND );
}

// error_reporting(E_ALL);
?>
