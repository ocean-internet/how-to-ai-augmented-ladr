import path from "path";
import { promises as fs } from "fs";

const DECISIONS_DIR = path.join(process.cwd(), "docs", "decisions");
const PROMPTS_DIR = path.join(process.cwd(), "prompts");

export const getPrompt = (name: string) =>
  readFile(path.join(PROMPTS_DIR, `${name}.md`));

export const getTemplate = (name: string) =>
  readFile(path.join(DECISIONS_DIR, `${name}.md`));

const readFile = async (filePath: string) => fs.readFile(filePath, "utf-8");
