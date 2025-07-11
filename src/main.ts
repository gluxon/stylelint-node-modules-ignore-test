import fs from "fs";
import path from "path";
import stylelint from "stylelint"

const codeFilename = path.resolve("test/node_modules/foo/test.scss")
const code = (await fs.promises.readFile(codeFilename)).toString()

console.log("Linting through codeFilename")
const result = await stylelint.lint({
    codeFilename,
    code,
    configFile: path.resolve("./stylelint.config.js")
})
console.log(JSON.parse(result.report)[0].warnings)

console.log("Linting through files")
const result2 = await stylelint.lint({
    files: [codeFilename],
    // Uncommenting this will result in this behaving the same as the above.
    // disableDefaultIgnores: true,
    configFile: path.resolve("./stylelint.config.js")
})
console.log(JSON.parse(result2.report)[0].warnings)
