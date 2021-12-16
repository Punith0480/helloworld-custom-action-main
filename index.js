const core = require('@actions/.core-wdJd1Avc');
const github = require('@actions/.github-O1rVNLeZ');
//const fetch = require('node-fetch');
//const octokit = require('@octokit/core');
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
  var commitCountAsync=0;
  async function GetCommitCountByPR() {
  
  const responseObject = await octokitRequest.request(`GET ${urlAndRepoName}/pulls/${pr_Number}/commits`); 
    
  console.log(responseObject); 
  Object.keys(responseObject['data']).forEach(commitId => {
     
   console.log(responseObject.data[commitId].sha);
    commitCountAsync++;
  });
  console.log(commitCountAsync);  
    
 /* return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ action: `${commitCountAsync}` });
    }, 1000);
  });
    */
   
   return commitCountAsync
  }
 
  async function createLabel() {
    
   const responseOfCreateLabel = await octokitRequest.request(`POST ${urlAndRepoName}/labels`, {
                                                                headers: {
                                                                 authorization: `token ${Github_Token}`,
                                                                 },
                                                                   name:  `${labelName}`,
                                                                   
                                                                  });   
    return responseOfCreateLabel;
  }        
 
async function applyLabel() {
  
   const responseOfCreateLabel = await octokitRequest.request(`PUT ${urlAndRepoName}/issues/${pr_Number}/labels`, {
                                                                headers: {
                                                                 authorization: `token ${Github_Token}`,
                                                                 },
                                                                   labels: [`${labelName}`],
                                                                   
                                                                  });   
    return responseOfCreateLabel;
}
  
 async function applyCommentsAfterLabel() {
   
   const responseOfCreateLabel = await octokitRequest.request(`POST ${urlAndRepoName}/issues/${pr_Number}/comments`, {
                                                                headers: {
                                                                 authorization: `token ${Github_Token}`,
                                                                 },
                                                                 body: `${comments}`,
                                                                   
                                                                  });
   
    return responseOfCreateLabel;
}
  // Call start
(async() => {
  
 var commitCountByAsync = await GetCommitCountByPR().then(response => console.log(response));
  console.log(`commit count by Async ${commitCountAsync}`);
  //console.log(commitCountByAsync); 
  if(commitCountAsync >= commitCount){
  //console.log('start of Create label function');
  var Data2 = await createLabel().then(data => console.log(data));
  console.log(JSON.stringify(Data2));
 // console.log('start of apply label function');
  var Data3 = await applyLabel().then(data => console.log(data));
  console.log(JSON.stringify(Data3));
  var Data4 = await applyCommentsAfterLabel().then(data => console.log(data));
  console.log(JSON.stringify(Data4));
  }
  
  })();
  
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
 // console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
