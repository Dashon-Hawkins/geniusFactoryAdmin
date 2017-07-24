angular.module('SignupModule').controller('SignupController', ['$scope', '$http', 'toastr', 'mgcrea.ngStrap', 'mgcrea.ngStrap.modal', 'mgcrea.ngStrap.aside', 'mgcrea.ngStrap.tooltip' function($scope, $http, toastr, mgcrea.ngStrap, mgcrea.ngStrap.modal, mgcrea.ngStrap.aside, mgcrea.ngStrap.tooltip) {

	// set-up loading state
	$scope.signupForm = {
		loading: false
	}

	$scope.submitSignupForm = function(){

		// Set the loading state (i.e. show loading spinner)
		$scope.signupForm.loading = false;

		// console.log("I heard ya!");

		// Submit request to Sails.
		$http.post('/signup', {
			firstName: $scope.signupForm.firstName,
			lastName: $scope.signupForm.lastName,
			title: $scope.signupForm.title,
			email: $scope.signupForm.email,
			password: $scope.signupForm.password
		})
		.then(function onSuccess(sailsResponse){
			window.location = '/dashboard/';
		})
		.catch(function onError(sailsResponse){

		// Handle known error type(s).
		// If using sails-disk adpater -- Handle Duplicate Key
		var emailAddressAlreadyInUse = sailsResponse.status == 409;

		if (emailAddressAlreadyInUse) {
			toastr.error('That email address has already been taken, please try again.', 'Error');
			return;
		}

		})
		.finally(function eitherWay(){
			$scope.signupForm.loading = false;
		})
	}

	$scope.submitLoginForm = function (){

    // Set the loading state (i.e. show loading spinner)
    $scope.loginForm.loading = true;

    // Submit request to Sails.
    $http.put('/login', {
      email: $scope.loginForm.email,
      password: $scope.loginForm.password
    })
    .then(function onSuccess (){
      // Refresh the page now that we've been logged in.
      window.location = '/';
    })
    .catch(function onError(sailsResponse) {

      // Handle known error type(s).
      // Invalid username / password combination.
      if (sailsResponse.status === 400 || 404) {
        // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
        //
        toastr.error('Invalid email/password combination.', 'Error', {
          closeButton: true
        });
        return;
      }

				toastr.error('An unexpected error occurred, please try again.', 'Error', {
					closeButton: true
				});
				return;

    })
    .finally(function eitherWay(){
      $scope.loginForm.loading = false;
    });
  };

}]);
