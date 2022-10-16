$(document).ready(function () {
  const bitValues = [128, 64, 32, 16, 8, 4, 2, 1];

  // Event if change value mask arrow & key
  $("#masque").on("input", function () {
    if (!$(this).val()) $(this).val(1);
    else if ($(this).val() <= 1) $(this).val(1);
    else if ($(this).val() >= 31) $(this).val(31);

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
      binTemp = binTemp.toString(2);
      binaryLast[3] = binTemp;
    } else {
      $("#octet4-last").html(254);
      binTemp = 254;
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
      binTemp = binTemp.toString(2);
      binaryLast[2] = binTemp;
    } else if (range > 8 && range > 16) {
      $("#octet3-last").html(255);
      binTemp = 255;
      binTemp = binTemp.toString(2);
      binaryLast[2] = binTemp;
    } else {
      $("#octet3-last").html($("#octet3-network").html());
      binTemp = parseInt($("#octet3-last").html());
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
      binTemp = binTemp.toString(2);
      binaryLast[1] = binTemp;
    } else if (range > 16 && range > 24) {
      $("#octet2-last").html(255);
      binTemp = 255;
      binTemp = binTemp.toString(2);
      binaryLast[1] = binTemp;
    } else {
      $("#octet2-last").html($("#octet2-network").html());
      binTemp = parseInt($("#octet2-last").html());
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
      binTemp = binTemp.toString(2);
      binaryLast[0] = binTemp;
    } else {
      $("#octet1-last").html($("#octet1-network").html());
      binTemp = parseInt($("#octet1-last").html());
      binTemp = binTemp.toString(2);
      binaryLast[0] = binTemp;
    }
    binaryLast[0] = binaryLast[0].padStart(8, "0");
  }

  let octetLast = 1;
  let bitLast = 1;
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
  }
}
