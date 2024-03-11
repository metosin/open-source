const github =  require('@actions/github');
//const subDays = require('date-fns/subDays');
const { subDays } = require("date-fns");

// read from secrets
const GITHUB_TOKEN = process.env.GH_PROJECT_TOKEN;

if (!GITHUB_TOKEN)
    throw new Error("no token provided");

// read from secrets
const config = {
    owner:"metosin",
    ownerType: "organization",
    projectNumber: 4,
    datesBack: 7
};

const repos = ["malli", "reitit"];

const octokit = github.getOctokit(GITHUB_TOKEN);

const syncRepoIssuesToProject = async (config, repo) => {
    const projectResult = await octokit.graphql(`
      query {
       ${config.ownerType}(login: "${config.owner}"){
          projectV2(number: ${config.projectNumber}) {
            id
          }
        }
      }`);

    const projectId = projectResult[config.ownerType].projectV2.id;

    const openIssuesAndPullRequests = await octokit.rest.issues.listForRepo(
        {
            owner: config.owner,
            repo: repo,
            state: 'open',
            since: subDays(new Date(), config.datesBack).toISOString()
        });

    for (issue of openIssuesAndPullRequests.data) {

        console.log(`Add ${repo}/#${issue.number} ${issue.title}`);

        try {
            const result = await octokit.graphql(`
              mutation {
               addProjectV2ItemById(input: {projectId: "${projectId}" contentId: "${issue.node_id}"}) {
                 item {
                   id
                 }
               }
             }`);
        } catch (error){
            console.log("Error while syncing issue");
            console.log(issue);
            console.log(error);
        }
    }
};

const syncRepos = async (config, repos) => {
    for (repo of repos) {
        await syncRepoIssuesToProject(config, repo);
    }
};

// run the sync
syncRepos(config, repos);
