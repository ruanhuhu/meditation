import fs from "fs";
import path from "path";
const recordsDirectory = path.join(process.cwd(), "records");

export const addRecord = (data)=>{
    const fileName = `tmp.json`;
    const fullPath = path.join(recordsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const records = JSON.parse(fileContents).records;
    records.push(data)
    fs.writeFileSync(fullPath, JSON.stringify({records}, null, 4));
}