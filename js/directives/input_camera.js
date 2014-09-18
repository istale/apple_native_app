
app.directive("photoread", function () {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {

            console.log(element);

            element.bind("change", function (changeEvent) {

                setTimeout(function () { jQuery('#my_loading').css('display', 'flex'); }, 100);
                
                console.log("changeEvent");
                console.log(changeEvent);
                setTimeout(function () {
                    jQuery('#my_loading').css('visibility', 'visible');
                }, 0);
                
                var _compressivefilesample = new Image();
                //var img = new Image();//DOM圖片元件

                //var ctx = document.getElementById('mob_camera_canvas').getContext('2d');
                var photoHolder = document.getElementById('photoHolder');
                photoHolder.src = "";
                var reader = new FileReader();
                reader.onload = function (loadEvent) {

                    //photoHolder.src = loadEvent.target.result;

                    photoHolder.onload = function () {
                        setTimeout(function () {
                            jQuery('#my_loading').css('visibility', 'hidden');
                        }, 1000);

                        _compressivefilesample = jic.compress(photoHolder);  
                        scope.$parent.compressivefilesample = _compressivefilesample;
                    };
                    photoHolder.src = loadEvent.target.result;
                   
 
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
                
                scope.$parent.filesample = changeEvent.target.files[0];
                

            });
        }
    };
});