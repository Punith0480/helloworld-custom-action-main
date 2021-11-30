const core = require('@actions/.core-wdJd1Avc');
const github = require('@actions/.github-O1rVNLeZ');
const fetch = require('node-fetch');
const octokit = require('@octokit/core');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
const octokitRequest = require('@octokit/request');

try {
  // Input defined in action metadata file
  const commitCount = core.getInput('commit-count');
  console.log(`Commit Count ${commitCount}`);  
  var labelName = core.getInput('LabelName');
  console.log(`label name ${labelName}`); 
  var comments = core.getInput('Comment');
  console.log(`comments ${comments}`);
  var Github_Token = core.getInput('github_token');
  console.log(`Github_Token ${Github_Token}`);
  var pr_number = core.getInput('PR_Number');
  console.log(`pr_number ${pr_number}`);
  var gitHubRepository = core.getInput('GitHubRepository');
  console.log(`gitHubRepository ${gitHubRepository}`);
 
  //Concatenate the strings
  let url="https://api.github.com/repos/";
  let repoName= `${gitHubRepository}`;
  let urlAndRepoName=url.concat("", repoName);
 // console.log(urlAndRepoName);
  let pr_Number=`${pr_number}`;
  //console.log(pr_Number);
  
  var string = [ 'spray', 'spray', 'spray', 'elite']

  const searchString = string.filter( word => word == 'spray');
  var len = searchString.length;
  console.log(len);

  //Get the total commit count by PR
  async function GetCommitCountByPR() {
  
  const response = await octokitRequest.request(`GET ${urlAndRepoName}/pulls/${pr_Number}/commits`); 
    
  var string1 = JSON.stringify(response)
  // const parsed = JSON.parse(string1);          
   // console.log(`MyParsed ${parsed}`);
  var array= new Array();
    array.push(response);
  var arryList= Array.isArray(array);
  console.log(`arryList ${arryList}`);
    var jSONArray=JSON.parse(JSON.stringify(array));
    for(key in jSONArray){
      if(jSONArray.hasOwnProperty(key)){
      console.log("%c "+key + " = jSONArray[key]");
      }
    }
   const searchString = array.filter( word => word.data == 'parents');
   var len = searchString.length;
   console.log(`MyParsed ${len}`);
    
     console.log(`jSONArray ${searchString}`);
 
  return string1;
}
 
  async function createLabel() {
   // https://api.github.com/repos/Punith0480/helloworld-action-main
   console.log('Inside create lable function');
   const responseOfCreateLabel = await octokitRequest.request(`POST ${urlAndRepoName}/labels`, {
                                                                headers: {
                                                                 authorization: `token ${Github_Token}`,
                                                                 },
                                                                   name:  `${labelName}`,
                                                                   
                                                                  });
    data2 = JSON.stringify(responseOfCreateLabel);
    return data2;
  }        
 
async function applyLabel() {
   console.log('Inside Apply lable function');
   const responseOfCreateLabel = await octokitRequest.request(`PUT ${urlAndRepoName}/issues/${pr_Number}/labels`, {
                                                                headers: {
                                                                 authorization: `token ${Github_Token}`,
                                                                 },
                                                                   labels: [`${labelName}`],
                                                                   
                                                                  });
    data3 = JSON.stringify(responseOfCreateLabel);
    return data3;
}
  
 async function applyCommentsAfterLabel() {
   console.log('Inside Apply comments label function');
   const responseOfCreateLabel = await octokitRequest.request(`POST ${urlAndRepoName}/issues/${pr_Number}/comments`, {
                                                                headers: {
                                                                 authorization: `token ${Github_Token}`,
                                                                 },
                                                                 body: `${comments}`,
                                                                   
                                                                  });
    data3 = JSON.stringify(responseOfCreateLabel);
    return data4;
}
  // Call start
(async() => {
  console.log('start of GetCommitCountsByPR function');
  var Data = GetCommitCountByPR().then(data => console.log(data));
  console.log(JSON.stringify(Data));
  console.log('start of Create label function');
  var Data2 = createLabel().then(data => console.log(data));
  console.log(JSON.stringify(Data2));
  console.log('start of apply label function');
  var Data3 = applyLabel().then(data => console.log(data));
  console.log(JSON.stringify(Data3));
  var Data4 = applyCommentsAfterLabel().then(data => console.log(data));
  console.log(JSON.stringify(Data4));
  
  console.log('End of fuction');
})();
  
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
 // console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
