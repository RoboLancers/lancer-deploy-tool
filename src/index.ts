import {Probot} from "probot";
import {stringify} from "yaml";

export = (app: Probot) => {
    app.on("pull_request.closed", async (context) => {

        const path = "./src/main/deploy/versioning.yml"

        const params = context.payload.repository



        // @ts-ignore
        const fileSHA = (await context.octokit.repos.getContent({
            owner: params.owner.name!!,
            repo: params.name!!,
            path
            // @ts-ignore
        })).data.sha


        const {merged_by, merged_at, title, user, updated_at} = context.payload.pull_request

        const versionData = {
            title,
            merged_by,
            user: user.name,
            updated_at,
            comp: merged_at === "main"
        }

        const versionYAML = stringify(versionData)

        context.log.info(path, params, versionData, versionYAML)

        await context.octokit.rest.repos.createOrUpdateFileContents({
            owner: params.owner.name!!,
            repo: params.name!!,
            branch: merged_at!!,
            path,
            message: `chore(versioning): Versioned (${title}, by ${merged_by}, at ${updated_at}`,
            content: btoa(versionYAML),
            sha: fileSHA
        })
    });

};
