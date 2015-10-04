function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#image').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function readURLm(input) {
    if (input.files.length > 0) {
       var reader = new FileReader();
      $.each(input.files, function(key, val) {
        {
       
        reader.onload = function (e) {
            $('<img>').attr('src', e.target.result).appendTo('#imgList');
        }
        reader.readAsDataURL(val);
      }
     });
   }
}


$("#imgInp").change(function(){
    readURL(this);
});

