$(document).ready(function () {
    $("#masque").on("input", function () {
      if (!$(this).val()) $(this).val(1);
      else if ($(this).val() <= 1) $(this).val(1);
      else if ($(this).val() >= 31) $(this).val(31);
  
      const masque = $(this).val();
      for (let i = 1; i <= 31; i++) {
        if (i <= masque) {
          $("#bit" + i).removeClass();
          $("#bit" + i).addClass("bit-reseau");
        } else {
          $("#bit" + i).removeClass();
          $("#bit" + i).addClass("bit-hote");
        }
      }
    });
  
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
  
      $("#bit" + bit + "-octet" + octet).on("input", function () {
        if (!$(this).val()) $(this).val(0);
        else if ($(this).val() <= 0) $(this).val(0);
        else $(this).val(1);
      });
  
      $("#bit" + bit + "-octet" + octet).on("change", function () {
        bit = parseInt($(this).attr("name").split("")[3]);
        octet = parseInt($(this).attr("name").split("")[10]);
  
        const valueBit = bit == 8 ? 1 : 2 ** Math.abs(bit - 8),
          octetValue = $("#octet" + octet + "-eq-dec").val();
  
        if ($(this).val() == 1)
          $("#octet" + octet + "-eq-dec").val(
            parseInt(octetValue) + parseInt(valueBit)
          );
        else
          $("#octet" + octet + "-eq-dec").val(
            parseInt(octetValue) - parseInt(valueBit)
          );
      });
    }
  });
  