## Repro

Open `test/node_modules/foo/test.scss` and observe that it's linted by the Stylelint VS Code extension, but produces no results through the CLI.

```
❯ pnpm exec stylelint test/node_modules/foo/test.scss 
NoFilesFoundError: No files matching the pattern "test/node_modules/foo/test.scss" were found.
    at standalone (file:///Volumes/git/stylelint-test/node_modules/.pnpm/stylelint@16.21.1_typescript@5.8.3/node_modules/stylelint/lib/standalone.mjs:292:43)
```

## `codeFilename` vs `files`

The Stylelint VS Code extension uses `codeFilename` rather than the `files` option when calling `stylelint.lint(...)`.

Let's test to see if `stylelint` behaves differently when using `codeFilename` versus `files`.

### Testing

```
❯ node ./src/main.ts
Linting through codeFilename
[
  {
    line: 1,
    column: 14,
    endLine: 1,
    endColumn: 16,
    rule: 'block-no-empty',
    severity: 'error',
    text: 'Unexpected empty block (block-no-empty)'
  }
]
```

```
Linting through files
file:///Volumes/git/stylelint-test/node_modules/.pnpm/stylelint@16.21.1_typescript@5.8.3/node_modules/stylelint/lib/standalone.mjs:292
                stylelintResults = await Promise.reject(new NoFilesFoundError(fileList));
                                                        ^

NoFilesFoundError: No files matching the pattern "/Volumes/git/stylelint-test/test/node_modules/foo/test.scss" were found.
    at postcssPlugin.standalone [as lint] (file:///Volumes/git/stylelint-test/node_modules/.pnpm/stylelint@16.21.1_typescript@5.8.3/node_modules/stylelint/lib/standalone.mjs:292:43)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async file:///Volumes/git/stylelint-test/src/main.ts:21:17

Node.js v24.4.0
```

### Results

Looks like `node_modules` are only ignored when `files` is used.
