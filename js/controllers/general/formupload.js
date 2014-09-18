app.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);

app.controller('GeneralFormUploadCtrl', ['$scope', '$ionicLoading', '$ionicScrollDelegate', '$http', '$ionicModal', function ($scope, $ionicLoading, $ionicScrollDelegate, $http, $ionicModal) {
    
    $scope.myIonicLoading = $ionicLoading;

    $scope.uploading = false;

    $scope.theUrl = document.getElementById('theUrl').innerHTML;

    var formSend = function () {

        $scope.closeModal();

        $scope.uploading = true;

        console.log($scope.filesample);
        var formData = new FormData();        
        formData.append('theUrl', $scope.theUrl);
        formData.append('file', $scope.filesample);
        formData.append('name', $scope.vm.name);
        formData.append('message', $scope.vm.message);
        debugger;
        //formData.append('fileIndex', 1);


        var tests = {
            progress: "upload" in new XMLHttpRequest
        };

        var xhr = new XMLHttpRequest();
        //debugger;
        xhr.open('POST', '/api/apiPostImageAnnoymous', true);

        xhr.onload = function () {
            $scope.$apply(function () {
                $scope.vm.progress = 100;
            });            
        };
        if (tests.progress) {
            xhr.upload.onprogress = function (event) {
                if (event.lengthComputable) {
                    var complete = (event.loaded / event.total * 100 | 0);
                    //$scope.vm.progress = complete;
                    $scope.$apply(function () {
                        $scope.vm.progress = complete;                        
                    });
                    
                    //debugger;
                    console.log(complete);
                    if (complete == 100) {
                        setTimeout(function () {
                            $scope.$apply(function () {
                                $scope.uploading = false;
                            });
                        }, 1000);
                    }
                }
            }
        }

        xhr.send(formData);

        //$scope.closeModal();
        //alert(" 謝謝您的留言 *\(^_^)/* ");
    }

    var imgCompress = function () {
        var source_image = document.getElementById('photoHolder');
        var img_compressed = document.getElementById('photoCompress');
        //An Integer from 0 to 100
        var quality = 80,
        // output file format (jpg || png)
        output_format = 'jpg';
        //This function returns an Image Object 
        //img_compressed = document.createElement('img');
                
        img_compressed.src = jic.compress(source_image, quality, output_format).src;

        img_compressed.onload = function () {
            //var image_width = $(img_compressed).width(),
            //image_height = $(img_compressed).height();

            //if (image_width > image_height) {
            //    img_compressed.style.width = "320px";
            //} else {
            //    img_compressed.style.height = "300px";
            //}
            
            source_image.style.display = "none";
            img_compressed.style.display = "block";
        }
        console.log("process finished...");


        //
        var callback = function (response) {
            console.log("image uploaded successfully! :)");
            console.log(response);
        }
        jic.upload(img_compressed, '/api/apiPostImageAnnoymous', 'file', $scope.filesample.name, imgUploadCompress);
    }    


    $scope.vm = {
        name: "",
        message: "",
        progress: 0,
        formSend: formSend,
        imgCompress: imgCompress
    };


    // Upload Modal
    $ionicModal.fromTemplateUrl('upload.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function () {
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
        // Execute action
    });


    $ionicLoading.hide();
}]);