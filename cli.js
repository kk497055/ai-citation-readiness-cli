#!/usr/bin/env node

const readline = require("node:readline/promises");
const { stdin, stdout } = require("node:process");

const checks = [
  ["Does the homepage say exactly what the business is and who it serves?", "Add a literal one-sentence entity statement above the fold."],
  ["Do core buyer questions have direct, text-based answers?", "Publish concise answers to the five questions buyers ask before purchasing."],
  ["Do important claims link to evidence, credentials, or case studies?", "Attach a verifiable source or proof page to every material claim."],
  ["Are business facts consistent across the site and external profiles?", "Reconcile names, categories, locations, and URLs everywhere."],
  ["Are key pages crawlable, mobile-friendly, and structurally clear?", "Use basic HTML, descriptive headings, valid status codes, and a current sitemap."],
];

const green = (text) => `\u001b[32m${text}\u001b[0m`;
const bold = (text) => `\u001b[1m${text}\u001b[0m`;

async function main() {
  const presetArg = process.argv.find((arg) => arg.startsWith("--answers="));
  const preset = presetArg ? presetArg.slice(10).split(",") : null;
  if (preset && (preset.length !== checks.length || preset.some((answer) => !/^(y|yes|n|no)$/i.test(answer.trim())))) {
    throw new Error("--answers must contain exactly five comma-separated y/n values");
  }
  const rl = preset ? null : readline.createInterface({ input: stdin, output: stdout });
  const missing = [];
  let passed = 0;

  stdout.write(`\n${bold("AI Citation Readiness — five-signal mini audit")}\n`);
  stdout.write("Answer y or n. Nothing leaves this computer.\n\n");

  for (const [index, [question, fix]] of checks.entries()) {
    let answer = preset ? preset[index] : "";
    while (!/^(y|yes|n|no)$/i.test(answer.trim())) {
      answer = await rl.question(`${question} ${bold("[y/n]")} `);
    }
    if (preset) stdout.write(`${question} ${bold("[y/n]")} ${answer}\n`);
    if (/^(y|yes)$/i.test(answer.trim())) passed += 1;
    else missing.push(fix);
  }
  rl?.close();

  const score = passed * 20;
  stdout.write(`\n${bold("Mini score:")} ${green(`${score}/100`)}\n`);
  if (missing.length) {
    stdout.write(`\n${bold("Your next best fixes:")}\n`);
    missing.slice(0, 3).forEach((fix, index) => stdout.write(`${index + 1}. ${fix}\n`));
  } else {
    stdout.write("All five headline signals are present. Revalidate quarterly.\n");
  }

  stdout.write(`\n${bold("Audit all 25 signals and build a prioritized report:")}\n`);
  stdout.write(`${green("https://payhip.com/b/Kez3L")} ($9)\n`);
  stdout.write("Alternative checkout: https://kk497055.itch.io/ai-citation-readiness-scorecard\n");
  stdout.write("\nDirectional diagnostic only; no ranking or citation guarantee.\n\n");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
