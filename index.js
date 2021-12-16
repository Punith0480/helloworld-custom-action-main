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
  
  //Get the total commit count by PR
  var promiseValue;
  async function GetCommitCountByPR() {
  
  const response = await octokitRequest.request(`GET ${urlAndRepoName}/pulls/${pr_Number}/commits`); 
    
  //var string1 = JSON.stringify(response); 
    
  let string = response['data'];
  let parentCommitCountsByPR=Object.getOwnPropertyNames(string[0]).filter(word => word == 'parents').length;
    promiseValue=parentCommitCountsByPR;
  console.log(promiseValue);
    Object.keys(string).foreach(dataList => {
      
      console.log("copying datalist " + dataList + "...");
      
    });
    
  return parentCommitCountsByPR;
  
   // return response;
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
   // data2 = JSON.stringify(responseOfCreateLabel);
    return responseOfCreateLabel;
  }        
 
async function applyLabel() {
   console.log('Inside Apply lable function');
   const responseOfCreateLabel = await octokitRequest.request(`PUT ${urlAndRepoName}/issues/${pr_Number}/labels`, {
                                                                headers: {
                                                                 authorization: `token ${Github_Token}`,
                                                                 },
                                                                   labels: [`${labelName}`],
                                                                   
                                                                  });
    //data3 = JSON.stringify(responseOfCreateLabel);
    return responseOfCreateLabel;
}
  
 async function applyCommentsAfterLabel() {
   console.log('Inside Apply comments label function');
   const responseOfCreateLabel = await octokitRequest.request(`POST ${urlAndRepoName}/issues/${pr_Number}/comments`, {
                                                                headers: {
                                                                 authorization: `token ${Github_Token}`,
                                                                 },
                                                                 body: `${comments}`,
                                                                   
                                                                  });
    //data4 = JSON.stringify(responseOfCreateLabel);
    return responseOfCreateLabel;
}
  // Call start
(async() => {
  console.log('start of GetCommitCountsByPR function');
 var commitCountByAsync = GetCommitCountByPR().then(data => console.log(data));
  console.log(`commit count by Async ${promiseValue}`);
  let commitdata = commitCountByAsync['data'];
  let parentCommitCountsByPR=Object.getOwnPropertyNames(commitdata[0]).filter(word => word == 'parents').length;
  var commitCountAsyncValue=parentCommitCountsByPR;
  console.log(commitCountAsyncValue);
  //console.log(Boolean([JSON.stringify(commitCountByAsync) >= commitCount]));
  //console.log(`Commit AsyncCount JSON.stringify(${commitCountAsyncValue})`);
  //if(JSON.stringify(commitCountByAsync) >= commitCount){
  if(1 >= commitCount){
  console.log('start of Create label function');
  var Data2 = createLabel().then(data => console.log(data));
  console.log(JSON.stringify(Data2));
  console.log('start of apply label function');
  var Data3 = applyLabel().then(data => console.log(data));
  console.log(JSON.stringify(Data3));
  var Data4 = applyCommentsAfterLabel().then(data => console.log(data));
  console.log(JSON.stringify(Data4));
  }
  else
  {
    console.log("commit count should be greater thn 5 thn label will apply");
  }
  })();
  
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
 // console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
