const core = require('@actions/.core-wdJd1Avc');
const github = require('@actions/.github-O1rVNLeZ');
const fetch = require('node-fetch');
const octokit = require('@octokit/core');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
const octokitRequest = require('@octokit/request');

try {
  // `who-to-greet` input defined in action metadata file
  const commitCount = core.getInput('commit-count');
  console.log(`Commit Count ${commitCount}`);
  var CommitsCounts = commitCount;
  //core.setOutput("CommitsCounts", CommitsCounts);
  //console.log(`Commits Count ${CommitsCounts}`)
  var labelName = core.getInput('LabelName');
  console.log(`label name ${labelName}`)
  //var labelname = labelName;
  //core.setOutput("labelname", labelname);
  console.log(`Commit Count ${CommitsCounts}`);
  var comments = core.getInput('Comments');
  //core.setOutput("comments", comments);
  console.log(`comments ${comments}`);
  var Github_Token = core.getInput('github_token');
  console.log(`Github_Token ${Github_Token}`);
  var pr_number = core.getInput('PR_Number');
  console.log(`pr_number ${pr_number}`);
  
   var gitHubRepository = core.getInput('GitHubRepository');
   console.log(`gitHubRepository ${gitHubRepository}`);
  var gitRepoOutPut = core.setOutput("gitHubRepository", gitHubRepository);
  
  async function GetCommitCountByPR() {
  let url="https://api.github.com/repos/";
  let repoName= gitRepoOutPut;
  let result=url.concat("", repoName);
  console.log(result);
  const response = await octokitRequest.request('GET https://api.github.com/repos/Punith0480/helloworld-action-main/pulls/3/commits');
 // console.log(`response ${response}`);
  data1 = JSON.stringify(response);
 // let data = await response.json();
 // console.log(`dat ${data}`);
  //console.log(`data1 ${data1}`);
  return data1;
}
 
  async function createLabel() {
   console.log('Inside create lable function');
   const responseOfCreateLabel = await octokitRequest.request('POST https://api.github.com/repos/Punith0480/helloworld-action-main/labels', {
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
   const responseOfCreateLabel = await octokitRequest.request('PUT https://api.github.com/repos/Punith0480/helloworld-action-main/issues/3/labels', {
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
   const responseOfCreateLabel = await octokitRequest.request('POST https://api.github.com/repos/Punith0480/helloworld-action-main/issues/3/comments', {
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
  console.log('start of myfunction');
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
