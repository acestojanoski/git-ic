#! /usr/bin/env node

const argsFlagify = require('args-flagify');
const {exec} = require('child_process');
const {promisify} = require('util');
const {red: errorColor, blue: infoColor, yellow: warnColor} = require('chalk');

const execAsync = promisify(exec);

const log = {
	error: (message) => console.error(errorColor(message)),
	warn: (message) => console.warn(warnColor(message)),
	info: (message) => console.info(infoColor(message)),
};

const cli = argsFlagify(
	`
Usage
  $ git ic
  $ git-ic

Options
  --message, -m  Custom message for the initial commit

Examples
  $ git ic
  $ git ic -m "first commit"
  $ git ic --message "first commit"
`,
	{
		message: {
			type: 'string',
			alias: 'm',
			default: 'initial commit',
		},
	}
);

(async (message) => {
	try {
		const commitsCount = await execAsync('git rev-list --all --count');

		if (commitsCount.stderr) {
			log.error(commitsCount.stderr);
			process.exit(1);
		}

		const firstCommit = Number.parseInt(commitsCount.stdout, 10) === 0;

		if (firstCommit) {
			const stagedFilesResult = await execAsync('git diff --name-only --cached');

			if (stagedFilesResult.stderr) {
				log.error(stagedFilesResult.stderr);
				process.exit(1);
			}

			if (!stagedFilesResult.stdout) {
				log.warn('No files added to staging! Did you forget to run git add?');
				process.exit();
			}

			const {stdout, stderr} = await execAsync(`git commit -m "${message}"`);

			if (stderr) {
				log.error(stderr);
				process.exit(1);
			}

			log.info(stdout);
		} else {
			log.warn('This repository already has commits.');
		}
	} catch (error) {
		log.error(error);
		process.exit(1);
	}
})(cli.flags.message);
