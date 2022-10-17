<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Calculateur d'IP</title>
    <link rel="stylesheet" href="assets/css/main.css">
  </head>

  <body>
    <!-- TABLE -->
    <table style="border-collapse: collapse;border: 0px;" border="1">
      <tbody>
        <!-- Caption -->
        <tr>
          <td class="edit-area" colspan="8">Champs Modifiables</td> 
          <td class="noborder"></td>
          <td class="reseau-area" colspan="8">Bits du réseau - S/R</td> 
          <td class="noborder"></td>
          <td class="hote-area" colspan="8">Bits d'hôte</td> 
        </tr>
        <!-- Blank row -->
        <tr>
          <td class="noborder blank-cell" colspan="38"></td> 
        </tr>
        <!-- Title -->
        <tr>
          <td class="noborder" colspan="3"></td> 
          <td colspan="35" style="text-align: center;">Adresse IP (en Binaire)</td> 
        </tr>
        <!-- Bits list -->
        <tr class="bit">
          <?php 
          $countBits = 0;
            for ($i = 1; $i <= 36; $i++) {
              if ($i == 1) {
                echo "<td class=\"noborder\" colspan=\"3\"></td>\n";
                $countBits++;
              } else if ($i == 10 || $i == 19 || $i == 28) {
                echo "          <td class=\"noborder\"></td>\n";
              } else {
                if ($countBits <= 18) echo "          <td class=\"bit-reseau\" id=\"bit" . $countBits . "\">" . $countBits . "</td>\n";
                else echo "          <td class=\"bit-hote\" id=\"bit" . $countBits . "\">" . $countBits . "</td>\n";
                $countBits++;
              }
            } ?>
        </tr>
        <!-- Octets list -->
        <tr class="octet">
          <?php 
          $countOctets = 0;
          $numOct = 1;
          $valueOctet = 128 * 2;
            for ($i = 1; $i <= 36; $i++) {
              if ($i==1) {
                echo "<td class=\"noborder\" colspan=\"3\"></td>\n";
                $countOctets++;
              } else if ($i==10 || $i==19 || $i==28) {
                echo "          <td class=\"noborder\">.</td>\n";
              } else {
                $valueOctet = $valueOctet/2;
                echo "          <td id=\"bit-dec-" . $countOctets . "-octet" . $numOct . "\">" . $valueOctet . "</td>\n";
                $countBits++;
                if ($valueOctet == 1) {
                    $valueOctet = 128 * 2;
                    $numOct++;
                    $countOctets = 1;
                } else {
                    $countOctets++;
                }


              }
            } ?>
        </tr>
        <!-- Bits-Octets list -->
        <tr class="bit-octet">
          <?php 
          $leftBorderBit = "";
          $rightBorderBit = "";
          $bitNumber = 0;
          $octetNumber = 1;
          $bitInputVal = 1;
            for ($i = 1; $i <= 38; $i++) {
              if ($i == 1) {
                echo "<td class=\"desc-bit-octet\">Masque de sous réseau</td>\n";
              } else if ($i == 2) {
                echo "<td><input type=\"number\" id=\"masque\" name=\"masque\" value=\"18\" min=\"1\" max=\"31\"></td>\n";
                $bitNumber++;
              } else if ($i == 3 || $i == 12 || $i == 21 || $i == 30) {
                if ($i == 3) echo "          <td class=\"noborder\"></td>\n";
                else  echo "          <td class=\"noborder\">.</td>\n";
              } else {
                if ($bitNumber != 4 && $bitNumber != 8) $rightBorderBit = "-right";
                else $rightBorderBit = "";

                if ($bitNumber != 1 && $bitNumber != 5) $leftBorderBit = "-left";
                else $leftBorderBit = "";

                if($bitNumber == 8) {
                  echo "          <td class=\"border" . $rightBorderBit . $leftBorderBit . "\"><input type=\"number\" id=\"bit" . $bitNumber . "-octet" . $octetNumber . "\" name=\"bit" . $bitNumber . "-octet" . $octetNumber . "\" value=\"" . $bitInputVal . "\" min=\"0\" max=\"1\"></td>\n";
                  $bitNumber = 1;
                  $octetNumber++;
                } else {
                  echo "          <td class=\"border" . $rightBorderBit . $leftBorderBit . "\"><input type=\"number\" id=\"bit" . $bitNumber . "-octet" . $octetNumber . "\" name=\"bit" . $bitNumber . "-octet" . $octetNumber . "\" value=\"" . $bitInputVal . "\" min=\"0\" max=\"1\"></td>\n";
                  $bitNumber++;
                  $bitInputVal = 0;
                }
              }
            } ?>
        </tr>
        <!-- Blank row -->
        <tr>
          <td class="noborder blank-cell" colspan="38"></td> 
        </tr>
        <!-- Decimal eq -->
        <tr class="eq-dec">
          <td colspan="2">Equivalent en décimale</td> 
          <td class="noborder"></td>
          <td class="edit-area" colspan="8"><input type="number" id="octet1-eq-dec" name="octet1-eq-dec" value="128" min="0" max="255"></td> 
          <td class="noborder point">.</td>
          <td class="edit-area" colspan="8"><input type="number" id="octet2-eq-dec" name="octet2-eq-dec" value="0" min="0" max="255"></td> 
          <td class="noborder point">.</td>
          <td class="edit-area" colspan="8"><input type="number" id="octet3-eq-dec" name="octet3-eq-dec" value="0" min="0" max="255"></td> 
          <td class="noborder point">.</td>
          <td class="edit-area" colspan="8"><input type="number" id="octet4-eq-dec" name="octet4-eq-dec" value="0" min="0" max="255"></td> 
        </tr>
        <!-- Blank row -->
        <tr>
          <td class="noborder blank-cell" colspan="38"></td> 
        </tr>
        <!-- Network -->
        <tr class="eq-dec">
          <td colspan="2">Adresse Réseau</td> 
          <td class="noborder"></td>
          <td colspan="8" id="octet1-network">128</td> 
          <td class="noborder point">.</td>
          <td colspan="8" id="octet2-network">0</td> 
          <td class="noborder point">.</td>
          <td colspan="8" id="octet3-network">0</td> 
          <td class="noborder point">.</td>
          <td colspan="8" id="octet4-network">0</td> 
        </tr>
        <!-- Network bits list -->
        <tr class="bit-network">
          <?php 
          $leftBorderBit = "";
          $rightBorderBit = "";
          $bitNumber = 0;
          $octetNumber = 1;
          $bitInputVal = 1;
            for ($i = 1; $i <= 36; $i++) {
              if ($i == 1) {
                $bitNumber++;
                echo "<td class=\"noborder\" colspan=\"3\"></td>\n";
              } else if ($i == 10 || $i == 19 || $i == 28) {
                echo "          <td class=\"noborder\">.</td>\n";
              } else {
                if ($bitNumber != 4 && $bitNumber != 8) $rightBorderBit = "-right";
                else $rightBorderBit = "";

                if ($bitNumber != 1 && $bitNumber != 5) $leftBorderBit = "-left";
                else $leftBorderBit = "";

                if($bitNumber == 8) {
                  echo "          <td class=\"border" . $rightBorderBit . $leftBorderBit . "\" id=\"net-bit" . $bitNumber . "-octet" . $octetNumber . "\">" . $bitInputVal . "</td>\n";
                  $bitNumber = 1;
                  $octetNumber++;
                } else {
                  echo "          <td class=\"border" . $rightBorderBit . $leftBorderBit . "\" id=\"net-bit" . $bitNumber . "-octet" . $octetNumber . "\">" . $bitInputVal . "</td>\n";
                  $bitNumber++;
                  $bitInputVal = 0;
                }
              }
            } ?>
        </tr>
        <!-- First IP -->
        <tr class="first-dec">
          <td colspan="2">Première Adresse</td> 
          <td class="noborder"></td>
          <td colspan="8" id="octet1-first">128</td> 
          <td class="noborder point">.</td>
          <td colspan="8" id="octet2-first">0</td> 
          <td class="noborder point">.</td>
          <td colspan="8" id="octet3-first">0</td> 
          <td class="noborder point">.</td>
          <td colspan="8" id="octet4-first">1</td> 
        </tr>
        <!-- First IP list -->
        <tr class="bit-first">
          <?php 
          $leftBorderBit = "";
          $rightBorderBit = "";
          $bitNumber = 0;
          $octetNumber = 1;
          $bitInputVal = 1;
            for ($i = 1; $i <= 36; $i++) {
              if ($i == 1) {
                $bitNumber++;
                echo "<td class=\"noborder\" colspan=\"3\"></td>\n";
              } else if ($i == 10 || $i == 19 || $i == 28) {
                echo "          <td class=\"noborder\">.</td>\n";
              } else {
                if ($bitNumber != 4 && $bitNumber != 8) $rightBorderBit = "-right";
                else $rightBorderBit = "";

                if ($bitNumber != 1 && $bitNumber != 5) $leftBorderBit = "-left";
                else $leftBorderBit = "";

                if(($bitNumber >= 8 && $octetNumber == 4)) {
                  echo "          <td class=\"border" . $rightBorderBit . $leftBorderBit . "\" id=\"first-bit" . $bitNumber . "-octet" . $octetNumber . "\">1</td>\n";
                  if($bitNumber == 8) {
                    $bitNumber = 1;
                    $octetNumber++;
                  } else $bitNumber++;
                } else if($bitNumber == 8) {
                  echo "          <td class=\"border" . $rightBorderBit . $leftBorderBit . "\" id=\"first-bit" . $bitNumber . "-octet" . $octetNumber . "\">" . $bitInputVal . "</td>\n";
                  $bitNumber = 1;
                  $octetNumber++;
                } else {
                  echo "          <td class=\"border" . $rightBorderBit . $leftBorderBit . "\" id=\"first-bit" . $bitNumber . "-octet" . $octetNumber . "\">" . $bitInputVal . "</td>\n";
                  $bitNumber++;
                  $bitInputVal = 0;
                }
              }
            } ?>
        </tr>
        <!-- Last IP -->
        <tr class="last-dec">
          <td colspan="2">Dernière Adresse</td> 
          <td class="noborder"></td>
          <td colspan="8" id="octet1-last">128</td> 
          <td class="noborder point">.</td>
          <td colspan="8" id="octet2-last">0</td> 
          <td class="noborder point">.</td>
          <td colspan="8" id="octet3-last">63</td> 
          <td class="noborder point">.</td>
          <td colspan="8" id="octet4-last">254</td> 
        </tr>
        <!-- Last IP list -->
        <tr class="bit-last">
          <?php 
          $leftBorderBit = "";
          $rightBorderBit = "";
          $bitNumber = 0;
          $octetNumber = 1;
          $bitInputVal = 1;
            for ($i = 1; $i <= 36; $i++) {
              if ($i == 1) {
                $bitNumber++;
                echo "<td class=\"noborder\" colspan=\"3\"></td>\n";
              } else if ($i == 10 || $i == 19 || $i == 28) {
                echo "          <td class=\"noborder\">.</td>\n";
              } else {
                if ($bitNumber != 4 && $bitNumber != 8) $rightBorderBit = "-right";
                else $rightBorderBit = "";

                if ($bitNumber != 1 && $bitNumber != 5) $leftBorderBit = "-left";
                else $leftBorderBit = "";

                if(($bitNumber >= 3 && $octetNumber == 3) || ($bitNumber <= 7 && $octetNumber == 4)) {
                  echo "          <td class=\"border" . $rightBorderBit . $leftBorderBit . "\" id=\"last-bit" . $bitNumber . "-octet" . $octetNumber . "\">1</td>\n";
                  if($bitNumber == 8) {
                    $bitNumber = 1;
                    $octetNumber++;
                  } else $bitNumber++;
                } else if($bitNumber == 8) {
                  echo "          <td class=\"border" . $rightBorderBit . $leftBorderBit . "\" id=\"last-bit" . $bitNumber . "-octet" . $octetNumber . "\">" . $bitInputVal . "</td>\n";
                  $bitNumber = 1;
                  $octetNumber++;
                } else {
                  echo "          <td class=\"border" . $rightBorderBit . $leftBorderBit . "\" id=\"last-bit" . $bitNumber . "-octet" . $octetNumber . "\">" . $bitInputVal . "</td>\n";
                  $bitNumber++;
                  $bitInputVal = 0;
                }
              }
            } ?>
        </tr>
        <!-- Broadcast IP -->
        <tr class="broadcast-dec">
          <td colspan="2">Adresse de diffusion</td> 
          <td class="noborder"></td>
          <td colspan="8" id="octet1-broadcast">128</td> 
          <td class="noborder point">.</td>
          <td colspan="8" id="octet2-broadcast">0</td> 
          <td class="noborder point">.</td>
          <td colspan="8" id="octet3-broadcast">63</td> 
          <td class="noborder point">.</td>
          <td colspan="8" id="octet4-broadcast">255</td> 
        </tr>
        <!-- Broadcast IP list -->
        <tr class="bit-broadcast">
          <?php 
          $leftBorderBit = "";
          $rightBorderBit = "";
          $bitNumber = 0;
          $octetNumber = 1;
          $bitInputVal = 1;
            for ($i = 1; $i <= 36; $i++) {
              if ($i == 1) {
                $bitNumber++;
                echo "<td class=\"noborder\" colspan=\"3\"></td>\n";
              } else if ($i == 10 || $i == 19 || $i == 28) {
                echo "          <td class=\"noborder\">.</td>\n";
              } else {
                if ($bitNumber != 4 && $bitNumber != 8) $rightBorderBit = "-right";
                else $rightBorderBit = "";

                if ($bitNumber != 1 && $bitNumber != 5) $leftBorderBit = "-left";
                else $leftBorderBit = "";

                if(($bitNumber >= 3 && $octetNumber == 3) || ($bitNumber <= 8 && $octetNumber == 4)) {
                  echo "          <td class=\"border" . $rightBorderBit . $leftBorderBit . "\" id=\"broadcast-bit" . $bitNumber . "-octet" . $octetNumber . "\">1</td>\n";
                  if($bitNumber == 8) {
                    $bitNumber = 1;
                    $octetNumber++;
                  } else $bitNumber++;
                } else if($bitNumber == 8) {
                  echo "          <td class=\"border" . $rightBorderBit . $leftBorderBit . "\" id=\"broadcast-bit" . $bitNumber . "-octet" . $octetNumber . "\">" . $bitInputVal . "</td>\n";
                  $bitNumber = 1;
                  $octetNumber++;
                } else {
                  echo "          <td class=\"border" . $rightBorderBit . $leftBorderBit . "\" id=\"broadcast-bit" . $bitNumber . "-octet" . $octetNumber . "\">" . $bitInputVal . "</td>\n";
                  $bitNumber++;
                  $bitInputVal = 0;
                }
              }
            } ?>
        </tr>
        <!-- Blank row -->
        <tr>
          <td class="noborder blank-cell" colspan="38"></td> 
        </tr>
        <!-- Mask IP -->
        <tr class="mask-dec">
          <td colspan="2">Masque de sous-réseau</td> 
          <td class="noborder"></td>
          <td colspan="8" id="octet1-mask">255</td> 
          <td class="noborder point">.</td>
          <td colspan="8" id="octet2-mask">255</td> 
          <td class="noborder point">.</td>
          <td colspan="8" id="octet3-mask">192</td> 
          <td class="noborder point">.</td>
          <td colspan="8" id="octet4-mask">0</td> 
        </tr>
        <!-- Mask IP list -->
        <tr class="bit-mask">
          <?php 
          $leftBorderBit = "";
          $rightBorderBit = "";
          $bitNumber = 0;
          $octetNumber = 1;
            for ($i = 1; $i <= 36; $i++) {
              if ($i == 1) {
                $bitNumber++;
                echo "<td class=\"noborder\" colspan=\"3\"></td>\n";
              } else if ($i == 10 || $i == 19 || $i == 28) {
                echo "          <td class=\"noborder\">.</td>\n";
              } else {
                if ($bitNumber != 4 && $bitNumber != 8) $rightBorderBit = "-right";
                else $rightBorderBit = "";

                if ($bitNumber != 1 && $bitNumber != 5) $leftBorderBit = "-left";
                else $leftBorderBit = "";

                if(($bitNumber > 2 && $octetNumber == 3) || $octetNumber == 4) {
                  echo "          <td class=\"border" . $rightBorderBit . $leftBorderBit . "\" id=\"mask-bit" . $bitNumber . "-octet" . $octetNumber . "\">0</td>\n";
                  if($bitNumber == 8) {
                    $bitNumber = 1;
                    $octetNumber++;
                  } else $bitNumber++;
                } else if($bitNumber == 8) {
                  echo "          <td class=\"border" . $rightBorderBit . $leftBorderBit . "\" id=\"mask-bit" . $bitNumber . "-octet" . $octetNumber . "\">1</td>\n";
                  $bitNumber = 1;
                  $octetNumber++;
                } else {
                  echo "          <td class=\"border" . $rightBorderBit . $leftBorderBit . "\" id=\"mask-bit" . $bitNumber . "-octet" . $octetNumber . "\">1</td>\n";
                  $bitNumber++;
                }
              }
            } ?>
        </tr>
        <!-- Blank row -->
        <tr>
          <td class="noborder blank-cell" colspan="38"></td> 
        </tr>
        <!-- Wildcard Mask IP -->
        <tr class="wildcard-mask-dec">
          <td colspan="2">Wildcard Mask</td> 
          <td class="noborder"></td>
          <td colspan="8" id="octet1-wildcard-mask">0</td> 
          <td class="noborder point">.</td>
          <td colspan="8" id="octet2-wildcard-mask">0</td> 
          <td class="noborder point">.</td>
          <td colspan="8" id="octet3-wildcard-mask">63</td> 
          <td class="noborder point">.</td>
          <td colspan="8" id="octet4-wildcard-mask">255</td> 
        </tr>
        <!-- Wildcard Mask IP list -->
        <tr class="bit-wildcard-mask">
          <?php 
          $leftBorderBit = "";
          $rightBorderBit = "";
          $bitNumber = 0;
          $octetNumber = 1;
            for ($i = 1; $i <= 36; $i++) {
              if ($i == 1) {
                $bitNumber++;
                echo "<td class=\"noborder\" colspan=\"3\"></td>\n";
              } else if ($i == 10 || $i == 19 || $i == 28) {
                echo "          <td class=\"noborder\">.</td>\n";
              } else {
                if ($bitNumber != 4 && $bitNumber != 8) $rightBorderBit = "-right";
                else $rightBorderBit = "";

                if ($bitNumber != 1 && $bitNumber != 5) $leftBorderBit = "-left";
                else $leftBorderBit = "";

                if(($bitNumber > 2 && $octetNumber == 3) || $octetNumber == 4) {
                  echo "          <td class=\"border" . $rightBorderBit . $leftBorderBit . "\" id=\"wildcard-mask-bit" . $bitNumber . "-octet" . $octetNumber . "\">1</td>\n";
                  if($bitNumber == 8) {
                    $bitNumber = 1;
                    $octetNumber++;
                  } else $bitNumber++;
                } else if($bitNumber == 8) {
                  echo "          <td class=\"border" . $rightBorderBit . $leftBorderBit . "\" id=\"wildcard-mask-bit" . $bitNumber . "-octet" . $octetNumber . "\">0</td>\n";
                  $bitNumber = 1;
                  $octetNumber++;
                } else {
                  echo "          <td class=\"border" . $rightBorderBit . $leftBorderBit . "\" id=\"wildcard-mask-bit" . $bitNumber . "-octet" . $octetNumber . "\">0</td>\n";
                  $bitNumber++;
                }
              }
            } ?>
        </tr>
        <!-- Credit -->
        <tr>
          <td class="noborder blank-cell credit-by" colspan="38"><a href="https://github.com/xixi52">Développé par Alexis MOUREY avec <img src="assets/img/heart.svg"></a></td> 
        </tr>
        <!-- Link -->
        <tr>
          <td class="noborder blank-cell credit-excel" colspan="38"><a href="http://www.tontonfred.net/blog/?p=1978">Format Excel par Stephane Menoud</a></td> 
        </tr>
        <!-- Host count -->
        <tr>
          <td class="noborder blank-cell" colspan="21"></td> 
          <td class="border-left-bold border-top-bold" colspan="5">Nombre d'hôtes</td> 
          <td id="host-count" class="border-right-bold border-top-bold" colspan="4">16382</td> 
        </tr>
        <!-- Class address -->
        <tr>
          <td class="noborder blank-cell" colspan="21"></td> 
          <td class="border-left-bold" colspan="5">Classe de l'adresse</td> 
          <td id="class-address" class="border-right-bold" colspan="4">B</td> 
        </tr>
        <!-- Type address -->
        <tr>
          <td class="noborder blank-cell" colspan="21">Ce programme permet de trouver l'adresse du réseau </td> 
          <td class="border-left-bold border-bottom-bold" colspan="5">Type d'adresse</td> 
          <td id="type-address" class="border-right-bold border-bottom-bold" colspan="4">Publique</td> 
        </tr>
      </tbody>
    </table>
    <!-- /TABLE -->

    <!-- SCRIPTS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js" integrity="sha512-aVKKRRi/Q/YV+4mjoKBsE4x3H+BkegoM/em46NNlCqNTmUYADjBbeNefNxYV7giUp0VxICtqdrbqU7iVaeZNXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="assets/js/script.js"></script>
    <!-- /SCRIPTS -->
  </body>
</html>