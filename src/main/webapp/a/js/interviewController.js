//var relativePath = MAIN_BACKEND_LOCATION+'/api/v1' ;
//var intervireReplyAndUserResourceApi = relativePath + '/interviewreply/interviewreplyanduser/';
//var userResourceApi = relativePath + '/user/javacoursecandidate/';
//var interviewResourceApi = relativePath + '/interview/';
//var interviewRepliesResourceApi = relativePath + '/interviewreply/';
//
//app.controller('interviewController', function(notice, $scope, $http,
//		$location, $route, $interval) {
//	
////	 $scope.currentPageActive=1;
////	 $scope.totalPagesActive = 1;
//	 $scope.reloadBool = true;
//	$scope.reloadInterviewReply = 0;
//	 
//	
//		$http({
//			method : 'GET',
//			url : intervireReplyAndUserResourceApi
//		}).then(function(response) {
//			
//			var interviewreplies = response.data;
//			var interviewrepliesActive = new Array();
//			var interviewrepliesExpired = new Array()
//			var i;
//			for(i = 0; i < interviewreplies.length; i++){
//				
//				if(interviewreplies[i].registrationTime == null){
//					
//					 interviewrepliesActive.push(interviewreplies[i]);
//				}
//				
//				else{
//					
//					interviewrepliesExpired.push(interviewreplies[i])
//				}
//			}
//			$scope.interviewrepliesactive = interviewrepliesActive;
//			$scope.interviewrepliesexpired = interviewrepliesExpired;
//			
//		});
//		
//		$http({
//			method : 'GET',
//			url : userResourceApi
//		}).then(function(response) {
//			$scope.users = response.data;
//		});
//		
//		$http({
//			method : 'GET',
//			url : interviewResourceApi
//		}).then(function(response) {
//			$scope.interviews = response.data;
//		});
//		
//		$scope.resetForm = function() {
//			$scope.user = null;
//			$scope.interview = null;
//			
//		};
//		
//		
////		$scope.getItemsActive = function() {
////			 $scope.currentPageActive=1;
////			 $scope.pageSizeActive=$scope.dataActive.selectedOption.size;
////			 console.log("pageSize active "+ $scope.pageSizeActive);
////			 listUSToken(false);
////		 }
////		 
////		
////		 
////		 $scope.nextPageActive = function(){
////		    $scope.currentPageActive+=1;
////		    listInterviewReply(false);
////		 };
////		 $scope.prevPageActive = function(){
////		    $scope.currentPageActive-=1;
////		    listInterviewReply(false);
////		 };
////		    
////		 $scope.nextPageExpired = function(){
////		    $scope.currentPageExpired+=1;
////		    listInterviewReply(true);
////		 };
////		 $scope.prevPageExpired = function(){
////		    $scope.currentPageExpired-=1;
////		    listInterviewReply(true);
////		 };
//		
//		$scope.submitInterviewForm = function() {
//			console.log("user id: " + $scope.user);
//			console.log("interview id: " + $scope.interview);
//			
//
//			var data = {
//				"userId" : $scope.user,
//				"interviewId" : $scope.interview,
//				
//			};
//			console.log(data);
//			$http({
//				method : 'POST',
//				url : interviewRepliesResourceApi,
//				data : data,
//
//			}).then(function(response) {
//				sendEmail(data.userId);
//				$location.path("/list-all-interviewreplies");
//				console.log(data);
//				$route.reload();
//				notice.success();
//			}, function(errResponse) {
//	            if(errResponse.status==500)
//	            	notice.database();
//	            else
//	            	notice.error(errResponse.data.errorMessage);
//			});
//		}
//		
//		$scope.deleteInterviewReply = function (id){
//		
//			$http({
//				
//				method : 'DELETE',
//				url : interviewRepliesResourceApi + id
//			}).then(function(response){
//				
//				$location.path("/list-all-interviewreplies");
//				reload();
//				notice.success();
//			},
//	        function (response) {
//			
//	            $scope.uploadResult = response.data;
//	            console.log(response);
//	            if(response.status==500)
//	            	notice.database();
//	            else
//	            	notice.error(response.data.errorMessage);
//
//			});
//		}
//		
//		function sendEmail(id) {
//			$http({
//				method : 'GET',
//				url : interviewRepliesResourceApi + 'sendEmail/' + id
//			}).then(function(response) {
//				$location.path("/list-all-interviewreplies");
//				
//				notice.success();
//	        },
//	        function (response) {
//	            $scope.uploadResult = response.data;
//	            console.log(response);
//	            if(response.status==500)
//	            	notice.database();
//	            else
//	            	notice.error(response.data.errorMessage);
//
//			});
//		}
//		
//		$scope.listInterviewReply = function() {
//			reload();
//		}
//		
//		
//		function incrSec() {
//			if ($scope.reloadBool) {
//
//				$scope.reloadInterviewReply += 10;
//				if ($scope.reloadInterviewReply > 100) {
//					$scope.reloadInterviewReply = 0;
//					reload();
//				}
//			}
//		}
//		timer = $interval(incrSec, 1000);
//		
//		function reload() {
//			Pace.restart();
//			$scope.reloadInterviewReply = 0;
//			listInterviewReplyActive();
//			listInterviewReplyExpired();
//		}
//		
//		 function listInterviewReplyActive(){
//				console.log("list InterviewReply active invoked");
//				
//				$http({
//					method : 'GET',
//					url : intervireReplyAndUserResourceApi
//				}).then(function(response) {
//					
//					var interviewreplies = response.data;
//					var interviewrepliesActive = new Array();
//					
//					var i;
//					for(i = 0; i < interviewreplies.length; i++){
//						
//						if(interviewreplies[i].registrationTime == null){
//							
//							 interviewrepliesActive.push(interviewreplies[i]);
//						}
//				
//					}
//					$scope.interviewrepliesactive = interviewrepliesActive;
//					
//					
//				});
//			}
//		 
//		 function listInterviewReplyExpired(){
//				console.log("list InterviewReply expired invoked");
//				
//				$http({
//					method : 'GET',
//					url : intervireReplyAndUserResourceApi
//				}).then(function(response) {
//					
//					var interviewreplies = response.data;
//					
//					var interviewrepliesExpired = new Array()
//					var i;
//					for(i = 0; i < interviewreplies.length; i++){
//						
//						
//						if(interviewreplies[i].registrationTime != null){
//							
//							interviewrepliesExpired.push(interviewreplies[i])
//						}
//					}
//					
//					$scope.interviewrepliesexpired = interviewrepliesExpired;
//					
//				});
//			}
//		 
//		 reload();
//		 $scope.autoReload = function autoReload() {
//				if ($scope.reloadBool) {
//					$scope.reloadBool = false;
//					$(document).ready(function() {
//						$('#interviewreplybar').addClass('progress-bar-reload-disabled');
//
//					});
//				} else {
//					$scope.reloadBool = true;
//					$(document).ready(function() {
//						$('#interviewreplybar').removeClass('progress-bar-reload-disabled');
//
//					});
//				}
//				console.log("autoReload: " + $scope.reloadBool);
//			}
//			$scope.$on("$destroy", function() {
//		      
//				
//				console.log("stopped InterviewReply autoReload: " + $interval.cancel(timer));
//		    });
//		
//		
//	});
