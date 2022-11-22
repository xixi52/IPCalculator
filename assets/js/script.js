$(document).ready(function () {

  // ParseInt all values (00123 -> 128)
  for (let i=1; i<=4; i++) {
    $("#octet" + i + "-eq-dec").on("input", function () {
     $(this).val(parseInt($(this).val(), 10));
    });
  }

  const bitValues = [128, 64, 32, 16, 8, 4, 2, 1];

  // Event if change value hosts wanted arrow & key
  $("#host-register").on("input", function () {
    if (!$(this).val()) $(this).val(1);
    else if ($(this).val() <= 1) $(this).val(1);
    else if ($(this).val() >= 2147483646) $(this).val(2147483646);
    $(this).val(parseInt($(this).val(), 10));
    updateHostsWanted();
    findSmallMask();
  });

  // Event if change value mask arrow & key
  $("#masque").on("input", function () {
    if (!$(this).val()) $(this).val(1);
    else if ($(this).val() <= 1) $(this).val(1);
    else if ($(this).val() >= 31) $(this).val(31);

    $(this).val(parseInt($(this).val(), 10));

    let octNet = [0, 0, 0, 0];

    const masque = $(this).val();
    for (let i = 1; i <= 31; i++) {
      if (i == 1) octNet = [0, 0, 0, 0];
      if (i <= masque) {
        $("#bit" + i).removeClass();
        $("#bit" + i).addClass("bit-reseau");

        if (i <= 8 && parseInt($("#bit" + i + "-octet1").val()) == 1)
          octNet[0] += bitValues[i - 1];
        else if (
          i <= 16 &&
          parseInt($("#bit" + (i - 8) + "-octet2").val()) == 1
        )
          octNet[1] += bitValues[i - 1 - 8];
        else if (
          i <= 24 &&
          parseInt($("#bit" + (i - 8 * 2) + "-octet3").val()) == 1
        )
          octNet[2] += bitValues[i - 1 - 8 * 2];
        else if (parseInt($("#bit" + (i - 8 * 3) + "-octet4").val()) == 1)
          octNet[3] += bitValues[i - 1 - 8 * 3];
      } else {
        $("#bit" + i).removeClass();
        $("#bit" + i).addClass("bit-hote");
      }
    }

    for (let i = 0; i < 4; i++) {
      const currentOctet = i + 1;

      let maskNetBin = octNet[i].toString(2);
      $("#octet" + (i + 1) + "-network").html(octNet[i]);
      if (i + 1 == 4) $("#octet4-first").html(octNet[i] + 1);
      else $("#octet" + (i + 1) + "-first").html(octNet[i]);
      for (let i = parseInt(maskNetBin.length); i <= 8; i++) {
        maskNetBin = "0" + maskNetBin.toString();
      }

      for (let i = 0; i <= 8; i++) {
        const numMaskNetBin = String(maskNetBin)[i];
        $("#net-bit" + i + "-octet" + currentOctet).html(
          parseInt(numMaskNetBin)
        );
        if (currentOctet == 4 && i == 8) $("#first-bit8-octet4").html(1);
        else
          $("#first-bit" + i + "-octet" + currentOctet).html(
            parseInt(numMaskNetBin)
          );
      }
    }

    for (let i = 1; i <= 4; i++) {
      updateBinLast(i);
    }

    // Hosts
    $("#host-count").html(2 ** (32 - parseInt($("#masque").val())));
    $("#host-available").html(2 ** (32 - parseInt($("#masque").val())) - 2);

    updateHostsWanted();
  });

  // Loop for all bits
  let octet = 1,
    bit = 1;
  for (let i = 1; i <= 32; i++) {
    if (i <= 8) {
      bit = i;
      octet = 1;
    } else if (i > 8 && i <= 16) {
      bit = i - 8;
      octet = 2;
    } else if (i > 16 && i <= 24) {
      bit = i - 16;
      octet = 3;
    } else {
      bit = i - 24;
      octet = 4;
    }

    // Event if change value bit with arrow
    $("#bit" + bit + "-octet" + octet).on("input", function () {
      if (!$(this).val()) $(this).val(0);
      else if ($(this).val() <= 0) $(this).val(0);
      else $(this).val(1);
    });

    // Event if change value bit with key
    $("#bit" + bit + "-octet" + octet).on("change", function () {
      bit = parseInt($(this).attr("name").split("")[3]);
      octet = parseInt($(this).attr("name").split("")[10]);

      const valueBit = bit == 8 ? 1 : 2 ** Math.abs(bit - 8),
        octetValue = $("#octet" + octet + "-eq-dec").val(),
        octetNetworkValue = $("#octet" + octet + "-network").html(),
        bitsPos = (octet - 1) * 8 + bit;

      if ($(this).val() == 1) {
        $("#octet" + octet + "-eq-dec").val(
          parseInt(octetValue) + parseInt(valueBit)
        );
        if ($("#bit" + bitsPos).attr("class") == "bit-reseau") {
          $("#net-bit" + bit + "-octet" + octet).html("1");
          $("#octet" + octet + "-network").html(
            parseInt(octetNetworkValue) + parseInt(valueBit)
          );
          if (octet < 4)
            $("#octet" + octet + "-first").html(
              parseInt($("#octet" + octet + "-network").html())
            );
          if (octet == 4 && bit == 8) $("#first-bit8-octet4").html("1");
          else $("#first-bit" + bit + "-octet" + octet).html("1");
          $("#octet4-first").html(parseInt($("#octet4-network").html()) + 1);
          $("#first-bit8-octet4").html("1");
        }
      } else {
        $("#octet" + octet + "-eq-dec").val(
          parseInt(octetValue) - parseInt(valueBit)
        );
        if ($("#bit" + bitsPos).attr("class") == "bit-reseau") {
          $("#net-bit" + bit + "-octet" + octet).html("0");
          $("#octet" + octet + "-network").html(
            parseInt(octetNetworkValue) - parseInt(valueBit)
          );
          if (octet < 4)
            $("#octet" + octet + "-first").html(
              parseInt($("#octet" + octet + "-network").html())
            );
          if (octet == 4 && bit == 8) $("#first-bit8-octet4").html("1");
          else $("#first-bit" + bit + "-octet" + octet).html("0");
          $("#octet4-first").html(parseInt($("#octet4-network").html()) + 1);
        }
      }

      updateBinLast(octet);
    });
  }

  // Loop for decimal input
  for (let i = 1; i <= 4; i++) {
    // Event if change value decimal input
    $("#octet" + i + "-eq-dec").on("input", function () {
      if (!$(this).val()) $(this).val(0);
      else if ($(this).val() <= 0) $(this).val(0);
      else if ($(this).val() >= 255) $(this).val(255);

      let countCurrentOctet = i;

      let valueInputEqDescToBin = parseInt($(this).val()).toString(2),
        lengthValueBin = valueInputEqDescToBin.length;

      for (let i = parseInt(lengthValueBin); i <= 8; i++) {
        valueInputEqDescToBin = "0" + valueInputEqDescToBin.toString();
      }

      let valNet = 0;
      for (let i = 0; i <= 8; i++) {
        if (i == 0) valNet = 0;
        const numBin = String(valueInputEqDescToBin)[i];
        $("#bit" + i + "-octet" + countCurrentOctet).val(parseInt(numBin));
        const bitNum = (countCurrentOctet - 1) * 8 + i + 1;
        if ($("#bit" + (bitNum - 1)).attr("class") == "bit-reseau") {
          $("#net-bit" + i + "-octet" + countCurrentOctet).html(numBin);
          if (parseInt(numBin) == 1) valNet += bitValues[i - 1];
          $("#first-bit" + i + "-octet" + countCurrentOctet).html(numBin);
        }
        $("#octet" + countCurrentOctet + "-network").html(valNet);

        if (countCurrentOctet < 4) {
          $("#octet" + countCurrentOctet + "-first").html(
            parseInt($("#octet" + countCurrentOctet + "-network").html())
          );
        }
        $("#octet4-first").html(parseInt($("#octet4-network").html()) + 1);
        $("#first-bit8-octet4").html("1");

        updateBinLast(countCurrentOctet);
      }
    });
  }
});

// Search smallest mask
function findSmallMask() {
  const hostRegister = parseInt($("#host-register").val());

  if (hostRegister > 2147483646) $("#small-mask").html("Aucun masque possible");
  else if (hostRegister > 1073741822) $("#small-mask").html("/1");
  else if (hostRegister > 536870910) $("#small-mask").html("/2");
  else if (hostRegister > 268435454) $("#small-mask").html("/3");
  else if (hostRegister > 134217726) $("#small-mask").html("/4");
  else if (hostRegister > 67108862) $("#small-mask").html("/5");
  else if (hostRegister > 33554430) $("#small-mask").html("/6");
  else if (hostRegister > 16777214) $("#small-mask").html("/7");
  else if (hostRegister > 8388606) $("#small-mask").html("/8");
  else if (hostRegister > 4194302) $("#small-mask").html("/9");
  else if (hostRegister > 2097150) $("#small-mask").html("/10");
  else if (hostRegister > 1048574) $("#small-mask").html("/11");
  else if (hostRegister > 524286) $("#small-mask").html("/12");
  else if (hostRegister > 262142) $("#small-mask").html("/13");
  else if (hostRegister > 131070) $("#small-mask").html("/14");
  else if (hostRegister > 65534) $("#small-mask").html("/15");
  else if (hostRegister > 32766) $("#small-mask").html("/16");
  else if (hostRegister > 16382) $("#small-mask").html("/17");
  else if (hostRegister > 8190) $("#small-mask").html("/18");
  else if (hostRegister > 4094) $("#small-mask").html("/19");
  else if (hostRegister > 2046) $("#small-mask").html("/20");
  else if (hostRegister > 1022) $("#small-mask").html("/21");
  else if (hostRegister > 510) $("#small-mask").html("/22");
  else if (hostRegister > 254) $("#small-mask").html("/23");
  else if (hostRegister > 126) $("#small-mask").html("/24");
  else if (hostRegister > 62) $("#small-mask").html("/25");
  else if (hostRegister > 30) $("#small-mask").html("/26");
  else if (hostRegister > 14) $("#small-mask").html("/27");
  else if (hostRegister > 6) $("#small-mask").html("/28");
  else if (hostRegister > 2) $("#small-mask").html("/29");
  else $("#small-mask").html("/30");
}

function updateHostsWanted() {
  if (
    parseInt($("#host-register").val()) <=
      2 ** (32 - parseInt($("#masque").val())) - 2 &&
    parseInt($("#host-register").val()) >
      2 ** (32 - parseInt($("#masque").val()) - 1) - 2
  ) {
    $("#host-register-status").addClass("success");
    $("#host-register-status").removeClass("danger");
    $("#host-register-status").removeClass("warning");
  } else if (
    parseInt($("#host-register").val()) >
    2 ** (32 - parseInt($("#masque").val())) - 2
  ) {
    $("#host-register-status").removeClass("success");
    $("#host-register-status").addClass("danger");
    $("#host-register-status").removeClass("warning");
  } else {
    $("#host-register-status").removeClass("success");
    $("#host-register-status").removeClass("danger");
    $("#host-register-status").addClass("warning");
  }
}

function updateBinLast(countCurrentOctet) {
  const range = 32 - parseInt($("#masque").val());
  let binaryLast = [0, 0, 0, 0],
    binTemp = 0;

  if (countCurrentOctet == 4) {
    if (range <= 8) {
      $("#octet4-last").html(
        parseInt($("#octet4-network").html()) + 2 ** range - 2
      );
      binTemp = parseInt($("#octet4-last").html());
      $("#octet4-broadcast").html(binTemp + 1);
      binTemp = binTemp.toString(2);
      binaryLast[3] = binTemp;
    } else {
      $("#octet4-last").html(254);
      binTemp = 254;
      $("#octet4-broadcast").html(binTemp + 1);
      binTemp = binTemp.toString(2);
      binaryLast[3] = binTemp;
    }
    binaryLast[3] = binaryLast[3].padStart(8, "0");
  } else if (countCurrentOctet == 3) {
    if (range > 8 && range <= 16) {
      $("#octet3-last").html(
        parseInt($("#octet3-network").html()) + 2 ** (range - 8) - 1
      );
      binTemp = parseInt($("#octet3-last").html());
      $("#octet3-broadcast").html(binTemp);
      binTemp = binTemp.toString(2);
      binaryLast[2] = binTemp;
    } else if (range > 8 && range > 16) {
      $("#octet3-last").html(255);
      binTemp = 255;
      $("#octet3-broadcast").html(binTemp);
      binTemp = binTemp.toString(2);
      binaryLast[2] = binTemp;
    } else {
      $("#octet3-last").html($("#octet3-network").html());
      binTemp = parseInt($("#octet3-last").html());
      $("#octet3-broadcast").html(binTemp);
      binTemp = binTemp.toString(2);
      binaryLast[2] = binTemp;
    }
    binaryLast[2] = binaryLast[2].padStart(8, "0");
  } else if (countCurrentOctet == 2) {
    if (range > 16 && range <= 24) {
      $("#octet2-last").html(
        parseInt($("#octet2-network").html()) + 2 ** (range - 8 * 2) - 1
      );
      binTemp = parseInt($("#octet2-last").html());
      $("#octet2-broadcast").html(binTemp);
      binTemp = binTemp.toString(2);
      binaryLast[1] = binTemp;
    } else if (range > 16 && range > 24) {
      $("#octet2-last").html(255);
      binTemp = 255;
      $("#octet2-broadcast").html(binTemp);
      binTemp = binTemp.toString(2);
      binaryLast[1] = binTemp;
    } else {
      $("#octet2-last").html($("#octet2-network").html());
      binTemp = parseInt($("#octet2-last").html());
      $("#octet2-broadcast").html(binTemp);
      binTemp = binTemp.toString(2);
      binaryLast[1] = binTemp;
    }
    binaryLast[1] = binaryLast[1].padStart(8, "0");
  } else if (countCurrentOctet == 1) {
    if (range > 24 && range <= 32) {
      $("#octet1-last").html(
        parseInt($("#octet1-network").html()) + 2 ** (range - 8 * 3) - 1
      );
      binTemp = parseInt($("#octet1-last").html());
      $("#octet1-broadcast").html(binTemp);
      binTemp = binTemp.toString(2);
      binaryLast[0] = binTemp;
    } else {
      $("#octet1-last").html($("#octet1-network").html());
      binTemp = parseInt($("#octet1-last").html());
      $("#octet1-broadcast").html(binTemp);
      binTemp = binTemp.toString(2);
      binaryLast[0] = binTemp;
    }
    binaryLast[0] = binaryLast[0].padStart(8, "0");
  }

  let octetLast = 1,
    bitLast = 1;
  for (let i = 0; i < 32; i++) {
    bitLast++;
    if (i == 8) {
      octetLast = 2;
      bitLast = 1;
    } else if (i == 16) {
      octetLast = 3;
      bitLast = 1;
    } else if (i == 24) {
      octetLast = 4;
      bitLast = 1;
    }
    $("#last-bit" + bitLast + "-octet" + octetLast).html(
      String(binaryLast[octetLast - 1])[bitLast - 1]
    );
    if (i + 1 != 32)
      $("#broadcast-bit" + bitLast + "-octet" + octetLast).html(
        String(binaryLast[octetLast - 1])[bitLast - 1]
      );
    else $("#broadcast-bit" + bitLast + "-octet" + octetLast).html(1);

    if ($("#bit" + (i + 1)).attr("class") == "bit-reseau")
      $("#mask-bit" + bitLast + "-octet" + octetLast).html(1);
    else $("#mask-bit" + bitLast + "-octet" + octetLast).html(0);

    if (parseInt($("#octet3-last").html()) == 255) {
      $("#last-bit1-octet3").html(1);
      $("#broadcast-bit1-octet3").html(1);
    }
    if (parseInt($("#octet2-last").html()) == 255) {
      $("#last-bit1-octet2").html(1);
      $("#broadcast-bit1-octet2").html(1);
    }
  }

  let ipMaskBin = ["", "", "", ""],
    ipWildcardBin = ["", "", "", ""],
    octetMask = 1,
    bitMask = 1;

  for (let i = 1; i <= 32; i++) {
    if (i == 1) {
      octetMask = 1;
      bitMask = 1;
    }
    if (i == 9) {
      octetMask = 2;
      bitMask = 1;
    }
    if (i == 17) {
      octetMask = 3;
      bitMask = 1;
    }
    if (i == 25) {
      octetMask = 4;
      bitMask = 1;
    }

    ipMaskBin[octetMask - 1] =
      ipMaskBin[octetMask - 1].toString() +
      $("#mask-bit" + bitMask + "-octet" + octetMask)
        .html()
        .toString();
    bitMask++;
  }

  for (let i = 0; i < 4; i++) {
    $("#octet" + (i + 1) + "-mask").html(parseInt(ipMaskBin[i], 2));

    // Invert Mask
    ipWildcardBin[i] = ipMaskBin[i].toString();
    ipWildcardBin[i] = ipWildcardBin[i].replace(/1/g, "x");
    ipWildcardBin[i] = ipWildcardBin[i].replace(/0/g, "1");
    ipWildcardBin[i] = ipWildcardBin[i].replace(/x/g, "0");

    $("#octet" + (i + 1) + "-wildcard-mask").html(
      parseInt(ipWildcardBin[i], 2)
    );
  }

  for (let i = 1; i <= 32; i++) {
    if (i == 1) {
      octetMask = 1;
      bitMask = 1;
    }
    if (i == 9) {
      octetMask = 2;
      bitMask = 1;
    }
    if (i == 17) {
      octetMask = 3;
      bitMask = 1;
    }
    if (i == 25) {
      octetMask = 4;
      bitMask = 1;
    }

    $("#wildcard-mask-bit" + bitMask + "-octet" + octetMask).html(
      String(ipWildcardBin[octetMask - 1])[bitMask - 1]
    );
    bitMask++;
  }

  // Class address
  if (parseInt($("#octet1-eq-dec").val()) <= 126) $("#class-address").html("A");
  else if (parseInt($("#octet1-eq-dec").val()) == 127)
    $("#class-address").html("A (réservée)");
  else if (parseInt($("#octet1-eq-dec").val()) <= 191)
    $("#class-address").html("B");
  else if (parseInt($("#octet1-eq-dec").val()) <= 223)
    $("#class-address").html("C");
  else if (parseInt($("#octet1-eq-dec").val()) <= 239)
    $("#class-address").html("D");
  else $("#class-address").html("E (réservée)");

  // Type address
  if (
    parseInt($("#octet1-eq-dec").val()) == 10 ||
    (parseInt($("#octet1-eq-dec").val()) == 172 &&
      parseInt($("#octet2-eq-dec").val()) >= 16 &&
      parseInt($("#octet2-eq-dec").val()) <= 31) ||
    (parseInt($("#octet1-eq-dec").val()) == 192 &&
      parseInt($("#octet2-eq-dec").val()) == 168)
  )
    $("#type-address").html("Privée");
  else $("#type-address").html("Publique");

  // Find next network
  if (parseInt($("#octet4-broadcast").html()) < 255)
    $("#next-net").html(
      $("#octet1-broadcast").html().toString() +
        "." +
        $("#octet2-broadcast").html().toString() +
        "." +
        $("#octet3-broadcast").html().toString() +
        "." +
        (parseInt($("#octet4-broadcast").html()) + 1)
    );
  else if (parseInt($("#octet3-broadcast").html()) < 255)
    $("#next-net").html(
      $("#octet1-broadcast").html().toString() +
        "." +
        $("#octet2-broadcast").html().toString() +
        "." +
        (parseInt($("#octet3-broadcast").html()) + 1) +
        ".0"
    );
  else if (parseInt($("#octet2-broadcast").html()) < 255)
    $("#next-net").html(
      $("#octet1-broadcast").html().toString() +
        "." +
        (parseInt($("#octet2-broadcast").html()) + 1) +
        ".0.0"
    );
  else if (parseInt($("#octet1-broadcast").html()) < 255)
    $("#next-net").html(parseInt($("#octet1-broadcast").html()) + 1 + ".0.0.0");
  else $("#next-net").html("Aucun réseau suivant");
}
