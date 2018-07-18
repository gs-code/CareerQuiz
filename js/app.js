var app = angular.module('survey', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('home', {
            url:'/home',
            controller: 'HomeCtrl',
            templateUrl:'partials/home.html',
            onEnter: function() { window.scrollTo(0, 0); }
      })

      .state('home.contact', {
            url:'/contact',
            templateUrl:'partials/contact.html',
            onEnter: function() { window.scrollTo(0, 0); }
      })

      .state('home.page1', {
            url:'/page1',
            templateUrl:'partials/page1.html',
            onEnter: function() { window.scrollTo(0, 0); }
      })

      .state('home.page2', {
            url:'/page2',
            templateUrl:'partials/page2.html',
            onEnter: function() { window.scrollTo(0, 0); }
      })

      .state('home.page3', {
            url:'/page3',
            templateUrl:'partials/page3.html',
            onEnter: function() { window.scrollTo(0, 0); }
      })

      .state('home.results', {
            url:'/results',
            templateUrl:'partials/results.html',
            onEnter: function() { window.scrollTo(0, 0); }
      });

    $urlRouterProvider.otherwise('/home/contact');
}]);

app.controller('HomeCtrl',  ['$scope', '$http', '$httpParamSerializer', '$filter', '$state', function($scope, $http, $httpParamSerializer, $filter, $state) {

  // 1 - Career Quiz
  // 2 - Program Interest Survey
  $scope.surveyType = 1;

  // Update Page Title based on $scope.surveyType
  if ($scope.surveyType == 1)
  {
    window.document.title = "South Hills School Career Quiz";
  }
  else
  {
    window.document.title = "South Hills School Program Interest Survey";
  }

  // Add all page items
  // id: must be a unique id
  // programs: CSV list of program slugs
  // page: which page the item should be displayed on
  $scope.setItems = $scope.setItems || [
        {id: "p1a", phrase: "Take care of others", programs: "AMA,DMS,HIT,MA", page:1},
        {id: "p1b", phrase: "Make informed, logical decisions", programs: "AMA,DMS,IT", page:1},
        {id: "p1c", phrase: "Work as part of a team", programs: "AMA,MA,BAMM,AP", page:1},
        {id: "p1d", phrase: "Adapt easily to changing responsibilities", programs: "AMA,AP,IT", page:1},
        {id: "p1e", phrase: "Enjoy engaging all ages & types of people", programs: "AMA,DMS,MA", page:1},
        {id: "p1f", phrase: "Analyze information and process paperwork", programs: "AMA,HIT", page:1},
        {id: "p1g", phrase: "Strictly follow guidelines with precision", programs: "AMA,HIT,MA", page:1},
        {id: "p1h", phrase: "Crunch numbers happily", programs: "BAA", page:1},
        {id: "p1i", phrase: "Follow logical, step-by step procedures", programs: "BAA,ET,HIT", page:1},
        {id: "p1j", phrase: "Maintain focus easily for a long time", programs: "BAA,IT", page:1},
        {id: "p1k", phrase: "Handle money accurately & reliably", programs: "BAA", page:1},
        {id: "p1l", phrase: "Work alone happily", programs: "BAA,HIT", page:1},
        {id: "p1m", phrase: "Lead groups of people", programs: "BAMM", page:1},
        {id: "p1n", phrase: "Choose solutions through data analysis", programs: "BAMM", page:1},
        {id: "p1o", phrase: "Create and present reports", programs: "BAMM,AP", page:1},
        {id: "p1p", phrase: "Help sick people and animals", programs: "MA", page:1},
        {id: "p1q", phrase: "Persuade others effectively", programs: "BAMM,AP", page:1},
        {id: "p1r", phrase: "Speak to groups comfortably", programs: "BAMM,AP", page:1},
        {id: "p1s", phrase: "Network professionally with ease", programs: "BAMM,AP", page:1},
        {id: "p1t", phrase: "Meet deadlines", programs: "AP", page:1},
        {id: "p1u", phrase: "Learn to use new software programs", programs: "AP,ET,HIT", page:1},
        {id: "p1v", phrase: "Organize events effectively", programs: "AP", page:1},
        {id: "p1w", phrase: "Interact with people a lot", programs: "CJ", page:1},
        {id: "p1x", phrase: "Write with clarity", programs: "AP", page:1},
        {id: "p1y", phrase: "Multi-task effectively", programs: "AP,DMS,MA", page:1},
        {id: "p1z", phrase: "Respect and follow rules & regulations", programs: "CJ", page:1},
        {id: "p1aa", phrase: "Exercise and maintain physical fitness", programs: "CJ", page:1},
        {id: "p1ab", phrase: "Have lots of face-to-face conversations", programs: "CJ", page:1},
        {id: "p1ac", phrase: "Hold positions of authority", programs: "CJ", page:1},
        {id: "p1ad", phrase: "Handle high-stress situations calmly", programs: "CJ,MA", page:1},
        {id: "p1ae", phrase: "Learn new technology easily", programs: "DMS,ET,IT", page:1},
        {id: "p1af", phrase: "Operate hand-held equipment", programs: "DMS,ET", page:1},
        {id: "p1ag", phrase: "Seek knowledge of health and science", programs: "DMS", page:1},
        {id: "p1ah", phrase: "Determine how things work", programs: "ET,IT", page:1},
        {id: "p1ai", phrase: "Perform detailed work with precision", programs: "ET", page:1},
        {id: "p1aj", phrase: "Visualize solutions to problems", programs: "ET", page:1},
        {id: "p1ak", phrase: "Enjoy solving puzzles & problems", programs: "BAA,ET", page:1},
        {id: "p1al", phrase: "Do creative and artistic work", programs: "GA", page:1},
        {id: "p1am", phrase: "Develop concepts & ideas", programs: "GA", page:1},
        {id: "p1an", phrase: "Create flyers, posters, etc.", programs: "GA", page:1},
        {id: "p1ao", phrase: "Manipulate digital images", programs: "GA", page:1},
        {id: "p1ap", phrase: "Express ideas through media", programs: "GA", page:1},
        {id: "p1aq", phrase: "Enjoy being different", programs: "GA", page:1},
        {id: "p1ar", phrase: "Work flexible hours", programs: "GA", page:1},
        {id: "p1as", phrase: "Process paperwork accurately", programs: "AP", page:1},
        {id: "p1at", phrase: "Work without close supervision", programs: "HIT", page:1},
        {id: "p1au", phrase: "Work with computers & programs", programs: "IT", page:1},
        {id: "p1av", phrase: "Read technical materials", programs: "IT", page:1},
        {id: "p1aw", phrase: "Troubleshoot computer problems", programs: "IT", page:1},

        {id: "p2a", phrase: "Detail-oriented", programs: "AMA,DMS,ET,HIT,MA", page:2},
        {id: "p2b", phrase: "Compassionate & Caring", programs: "AMA,DMS,MA", page:2},
        {id: "p2c", phrase: "Rule-Follower", programs: "AMA,HIT", page:2},
        {id: "p2d", phrase: "Good listener", programs: "AMA,MA", page:2},
        {id: "p2e", phrase: "Problem-solver", programs: "AMA,BAMM,IT", page:2},
        {id: "p2f", phrase: "Trustworthy & Ethical", programs: "AMA,CJ", page:2},
        {id: "p2g", phrase: "Analytical", programs: "BAA,IT", page:2},
        {id: "p2h", phrase: "Efficient", programs: "BAA", page:2},
        {id: "p2i", phrase: "Logical", programs: "BAA,ET,IT", page:2},
        {id: "p2j", phrase: "Methodical", programs: "BAA,HIT", page:2},
        {id: "p2k", phrase: "Trendy & Cool", programs: "BAMM", page:2},
        {id: "p2l", phrase: "Communicative", programs: "BAMM,AP", page:2},
        {id: "p2m", phrase: "Reliable & Responsible", programs: "BAMM,MA", page:2},
        {id: "p2n", phrase: "Social", programs: "BAMM", page:2},
        {id: "p2o", phrase: "Adaptable", programs: "AP", page:2},
        {id: "p2p", phrase: "Optimistic", programs: "AP", page:2},
        {id: "p2q", phrase: "Organized", programs: "AP,HIT", page:2},
        {id: "p2r", phrase: "Deadline-oriented", programs: "AP", page:2},
        {id: "p2s", phrase: "Planner", programs: "AP", page:2},
        {id: "p2t", phrase: "Adventurous", programs: "CJ", page:2},
        {id: "p2u", phrase: "Hands-on", programs: "CJ", page:2},
        {id: "p2v", phrase: "Self-disciplined", programs: "CJ,DMS,GA", page:2},
        {id: "p2w", phrase: "Patient", programs: "DMS", page:2},
        {id: "p2x", phrase: "Coordinated", programs: "DMS", page:2},
        {id: "p2y", phrase: "Critical thinker", programs: "ET", page:2},
        {id: "p2z", phrase: "Mechanically inclined", programs: "ET", page:2},
        {id: "p2aa", phrase: "Practical", programs: "ET", page:2},
        {id: "p2ab", phrase: "Creative & Imaginative", programs: "GA", page:2},
        {id: "p2ac", phrase: "Persistent", programs: "GA,IT", page:2},
        {id: "p2ad", phrase: "Curious", programs: "GA", page:2},
        {id: "p2ae", phrase: "Visionary", programs: "GA", page:2},
        {id: "p2af", phrase: "Observant", programs: "HIT", page:2},
        {id: "p2ag", phrase: "Fast learner", programs: "IT", page:2},
        {id: "p2ah", phrase: "Task-oriented", programs: "MA", page:2},

        {id: "p3a", phrase: "Medical", programs: "AMA,DMS,HIT,MA", page:3},
        {id: "p3b", phrase: "Computers", programs: "AMA,ET,HIT,IT", page:3},
        {id: "p3c", phrase: "Health", programs: "AMA,DMS,HIT,MA", page:3},
        {id: "p3d", phrase: "Psychology/Sociology", programs: "AMA,BAMM,CJ,MA", page:3},
        {id: "p3e", phrase: "Business", programs: "AMA,AP,HIT,BAMM,BAA", page:3},
        {id: "p3f", phrase: "Accounting", programs: "BAA,AP", page:3},
        {id: "p3g", phrase: "Math", programs: "BAA,ET,IT", page:3},
        {id: "p3h", phrase: "Finance", programs: "BAA", page:3},
        {id: "p3i", phrase: "Money Management", programs: "BAA", page:3},
        {id: "p3j", phrase: "Social Media", programs: "BAMM", page:3},
        {id: "p3k", phrase: "Marketing & Advertising", programs: "BAMM", page:3},
        {id: "p3l", phrase: "Management", programs: "BAMM,HIT", page:3},
        {id: "p3m", phrase: "Entrepreneurship", programs: "BAMM", page:3},
        {id: "p3n", phrase: "Writing", programs: "AP", page:3},
        {id: "p3o", phrase: "Customer Service", programs: "AP", page:3},
        {id: "p3p", phrase: "Government", programs: "CJ", page:3},
        {id: "p3q", phrase: "Law", programs: "CJ", page:3},
        {id: "p3r", phrase: "Criminal Justice", programs: "CJ", page:3},
        {id: "p3s", phrase: "Science", programs: "DMS,ET,MA", page:3},
        {id: "p3t", phrase: "Hands-on Clinical Classes", programs: "DMS,MA", page:3},
        {id: "p3u", phrase: "Advanced Math & Physics", programs: "DMS,ET,IT", page:3},
        {id: "p3v", phrase: "Drafting", programs: "ET", page:3},
        {id: "p3w", phrase: "Technology", programs: "ET,IT", page:3},
        {id: "p3x", phrase: "Art", programs: "GA", page:3},
        {id: "p3y", phrase: "Graphic Design", programs: "GA", page:3},
        {id: "p3z", phrase: "Website Design", programs: "GA,IT", page:3},
        {id: "p3aa", phrase: "Advertising", programs: "GA", page:3},
        {id: "p3ab", phrase: "Photoshop", programs: "GA", page:3},
        {id: "p3ac", phrase: "Networking Hardware", programs: "IT", page:3},
        {id: "p3ad", phrase: "Programming", programs: "IT", page:3}
  ];

  // function to randomize up a collection
  var shuffleArray = function(array) {
        var m = array.length, t, i;
        while (m) {
          i = Math.floor(Math.random() * m--);
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }
        return array;
  }

  // call shuffleArray to randomize the setItems
  shuffleArray($scope.setItems);

  $scope.selectedItems = $scope.selectedItems || 0;
  $scope.selectedPrograms = $scope.selectedPrograms || "";
  $scope.selectedProgramsCount = $scope.selectedProgramsCount || [];
  $scope.counts = $scope.counts || {};

  // when setItems is updated recalculate all program totals for rankings
  $scope.$watch('setItems', function(setItems){
    var selectedItems = 0;
    var selectedPrograms = "";
    var selectedProgramsCount = [];

    angular.forEach(setItems, function(item){
      selectedItems += item.selected ? 1 : 0;
      selectedPrograms += item.selected ? item.programs : "";
      if (item.selected)
      {
        angular.forEach(item.programs.split(","), function(program) {
          selectedProgramsCount.push(program);
        })
      }
    })
    $scope.selectedItems = selectedItems;
    $scope.selectedPrograms = selectedPrograms;
    $scope.selectedProgramsCount = selectedProgramsCount;

    var counts = [];
    for (var i = 0; i < $scope.selectedProgramsCount.length; i++) {
      counts[$scope.selectedProgramsCount[i]] = 1 + (counts[$scope.selectedProgramsCount[i]] || 0);
    }

    $scope.counts = counts;

    $scope.programs = {
      program01: {slug: 'AMA', text:'Administrative Medical Assistant', link:'http://www.southhills.edu/programs/administrative-medical-assistant/', value:$scope.counts.AMA || 0},
      program02: {slug: 'BAA', text:'Business - Accounting', link:'http://www.southhills.edu/programs/business-administration-accounting/', value:$scope.counts.BAA || 0},
      program03: {slug: 'BAMM', text:'Business - Management & Marketing', link:'http://www.southhills.edu/programs/business-administration-management-marketing/', value:$scope.counts.BAMM || 0},
      program04: {slug: 'AP', text:'Administrative Professional', link:'http://www.southhills.edu/programs/administrative-professional/', value:$scope.counts.AP || 0},
      program05: {slug: 'CJ', text:'Criminal Justice', link:'http://www.southhills.edu/programs/criminal-justice/', value:$scope.counts.CJ || 0},
      program06: {slug: 'DMS', text:'Diagnostic Medical Sonography', link:'http://www.southhills.edu/programs/diagnostic-medical-sonography/', value:$scope.counts.DMS || 0},
      program07: {slug: 'ET', text:'Engineering Technology', link:'http://www.southhills.edu/programs/engineering-technology/', value:$scope.counts.ET || 0},
      program08: {slug: 'GA', text:'Graphic Arts', link:'http://www.southhills.edu/programs/graphic-arts/', value:$scope.counts.GA || 0},
      program09: {slug: 'HIT', text:'Health Information Technology', link:'http://www.southhills.edu/programs/health-information-technology/', value:$scope.counts.HIT || 0},
      program10: {slug: 'IT', text:'Information Technology', link:'http://www.southhills.edu/programs/information-technology/', value:$scope.counts.IT || 0},
      program11: {slug: 'MA', text:'Medical Assistant', link:'http://www.southhills.edu/programs/medical-assistant/', value:$scope.counts.MA || 0}
    };

    //filter to top three programs
    $scope.filteredPrograms = $filter('orderObjectBy')($scope.programs, $scope.orderByAttribute);
    $scope.filteredPrograms = $filter('limitTo')($scope.filteredPrograms, 3);
    $scope.filteredPrograms = $filter('filter')($scope.filteredPrograms, {value:'!0'});

  }, true);

  $scope.orderByAttribute = 'value';

  $scope.formData = $scope.formData || {};

  $scope.MauticSendForm1 = false;
  $scope.MauticSendForm2 = false;

  $scope.processForm = function(isValid) {

    $scope.submitted = true;

    if (isValid)
    {
      $state.go('home.page1');
      if (!$scope.MauticSendForm1)
      {
        $scope.MauticSendForm1 = true;
        if ($scope.surveyType == 1)
        {
          $http({
              method: 'POST',
//              url: 'http://trk.southhills.edu/form/submit?formId=16',
//              url: 'http://www.southhills.edu/quiz/saveQuizData.php',
              data: $httpParamSerializer({
		'formId': 16,
                'firstname': $scope.formData.firstname,
                'lastname': $scope.formData.lastname,
                'email': $scope.formData.email,
		'return': 'http://www.southhills.edu/quiz/thankyou.php'
              }),
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          });
        }
        else if ($scope.surveyType == 2)
        {
          $http({
              method: 'POST',
//              url: 'http://trk.southhills.edu/form/submit?formId=15',
//              url: 'http://www.southhills.edu/quiz/saveQuizData.php',
              data: $httpParamSerializer({
		'formId': 15,
                'firstname': $scope.formData.firstname,
                'lastname': $scope.formData.lastname,
                'email': $scope.formData.email,
		'return': 'http://www.southhills.edu/quiz/thankyou.php'
              }),
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          });
        }
      }
    }
  }

  $scope.processForm2 = function() {

    //if no formData, redirect to contact page
    if (typeof $scope.formData.email === 'undefined' || typeof $scope.formData.firstname === 'undefined' || typeof $scope.formData.lastname === 'undefined')
    {
      $state.go('home.contact');
    }
    else
    {
      //Deal with no programs found
      console.log($scope.filteredPrograms);
      console.log($scope.filteredPrograms.length);
      if ($scope.filteredPrograms.length == 0)
      {
        $state.go('home.page1');
      }
      else
      {
        $state.go('home.results');

        var resultProgram1 = (typeof $scope.filteredPrograms[0] !== 'undefined') ? $scope.filteredPrograms[0].slug : 'NONE';
        var resultProgram2 = (typeof $scope.filteredPrograms[1] !== 'undefined') ? $scope.filteredPrograms[1].slug : 'NONE';
        var resultProgram3 = (typeof $scope.filteredPrograms[2] !== 'undefined') ? $scope.filteredPrograms[2].slug : 'NONE';

        var resultProgram1Text = (typeof $scope.filteredPrograms[0] !== 'undefined') ? $scope.filteredPrograms[0].text : 'View All Programs';
        var resultProgram2Text = (typeof $scope.filteredPrograms[1] !== 'undefined') ? $scope.filteredPrograms[1].text : 'View All Programs';
        var resultProgram3Text = (typeof $scope.filteredPrograms[2] !== 'undefined') ? $scope.filteredPrograms[2].text : 'View All Programs';

        var resultProgram1Link = (typeof $scope.filteredPrograms[0] !== 'undefined') ? $scope.filteredPrograms[0].link : 'http://www.southhills.edu/programs/';
        var resultProgram2Link = (typeof $scope.filteredPrograms[1] !== 'undefined') ? $scope.filteredPrograms[1].link : 'http://www.southhills.edu/programs/';
        var resultProgram3Link = (typeof $scope.filteredPrograms[2] !== 'undefined') ? $scope.filteredPrograms[2].link : 'http://www.southhills.edu/programs/';

        if (!$scope.MauticSendForm2)
        {
          $scope.MauticSendForm2 = true;
          if ($scope.surveyType == 1)
          {
            $http({
                method: 'POST',
  //              url: 'http://trk.southhills.edu/form/submit?formId=13',
  //              url: 'http://www.southhills.edu/quiz/saveQuizData.php',
                data: $httpParamSerializer({
  		'formId': 13,
                  'firstname': $scope.formData.firstname,
                  'lastname': $scope.formData.lastname,
                	'career_quiz_result_1': resultProgram1,
                	'career_quiz_result_2': resultProgram2,
                	'career_quiz_result_3': resultProgram3,
                	'career_quiz_result_1_text': resultProgram1Text,
                	'career_quiz_result_2_text': resultProgram2Text,
                	'career_quiz_result_3_text': resultProgram3Text,
                	'career_quiz_result_1_link': resultProgram1Link,
                	'career_quiz_result_2_link': resultProgram2Link,
                	'career_quiz_result_3_link': resultProgram3Link,
                	'email': $scope.formData.email,
  		'return': 'http://www.southhills.edu/quiz/thankyou.php'
                }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
          }
          else if ($scope.surveyType == 2)
          {
            $http({
                method: 'POST',
  //              url: 'http://trk.southhills.edu/form/submit?formId=15',
  //              url: 'http://www.southhills.edu/quiz/saveQuizData.php',
                data: $httpParamSerializer({
  		'formId': 15,
                  'firstname': $scope.formData.firstname,
                  'lastname': $scope.formData.lastname,
                	'program_survey_result_1': resultProgram1,
                	'program_survey_result_2': resultProgram2,
                	'program_survey_result_3': resultProgram3,
                	'program_survey_result_1_text': resultProgram1Text,
                	'program_survey_result_2_text': resultProgram2Text,
                	'program_survey_result_3_text': resultProgram3Text,
                	'program_survey_result_1_link': resultProgram1Link,
                	'program_survey_result_2_link': resultProgram2Link,
                	'program_survey_result_3_link': resultProgram3Link,
                	'email': $scope.formData.email,
  		'return': 'http://www.southhills.edu/quiz/thankyou.php'
                }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
          }
        }
      }
    }
  }

}]);


// angular filter for ordering by highest ranked programs
app.filter('orderObjectBy', function(){
 return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
        array.push(input[objectKey]);
    }

    array.sort(function(a, b){
        a = parseInt(a[attribute]);
        b = parseInt(b[attribute]);
        return b - a;
    });
    return array;
 }
});
