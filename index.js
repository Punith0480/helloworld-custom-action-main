// console.log('Hello, world!');
const core = require('@actions/.core-wdJd1Avc');
const github = require('@actions/.github-O1rVNLeZ');
const fetch = require('node-fetch');
const octokit = require('@octokit/core');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
const octokitRequest = require('@octokit/request');
//import fetch from 'node-fetch';
//var token = "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"

try {
  // `who-to-greet` input defined in action metadata file
  const commitCount = core.getInput('commit-count');
  console.log(`Commit Count ${commitCount}`);
  var CommitsCounts = commitCount;
  //core.setOutput("CommitsCounts", CommitsCounts);
  //console.log(`Commits Count ${CommitsCounts}`)
  const labelName = core.getInput('LabelName');
  var labelname = labelName;
  //core.setOutput("labelname", labelname);
  console.log(`Commit Count ${labelname}`);
  var comments = core.getInput('Comments');
  //core.setOutput("comments", comments);
  console.log(`comments ${comments}`);
  var Github_Token = core.getInput('github_token');
  console.log(`Github_Token ${Github_Token}`);
  var pr_number = core.getInput('PR_Number');
  console.log(`pr_number ${pr_number}`);

  async function myfunction() {
  console.log('Inside of myfunction');
  const response = await octokitRequest.request('GET https://api.github.com/repos/Punith0480/helloworld-action-main/pulls/1/commits');
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
                                                                 authorization: `token ${process.env.GITHUB_TOKEN}`,
                                                                 },
                                                                   name:  'LargePR',
                                                                  });
    data2 = JSON.stringify(responseOfCreateLabel);
    return data2;
  }                                                            
  // Call start
(async() => {
  console.log('start of myfunction');
  var Data = myfunction().then(data => console.log(data));
  console.log(JSON.stringify(Data));
  console.log('start of Create label function');
  var Data2 = createLabel().then(data => console.log(data));
  console.log(JSON.stringify(Data2));
  console.log('End of fuction');
})();
  
 //async().then(data => console.log(data))

  /*
 const url = "https://api.github.com/repos/PunithMohan/helloworld-action/pulls/1/commits";
 console.log(`url ${url}`);
 const options = {
  headers: {
    Authorization: "token ${Github_Token}"
  }
};


fetch(url, options)
  .then( res => res.json() )
  .then( data => console.log(data) );
  */
  /*
  async function postData(url = '' , data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: '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', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
  postData('https://api.github.com/repos/PunithMohan/helloworld-action/pulls/1/commits', {})
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
  });
  */
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
 // console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
