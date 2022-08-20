import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
    transform: {
        "^.+\\.(t|j)sx?$": "ts-jest"
    },
    testRegex: "(/src/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testPathIgnorePatterns: ["/node_modules/", "/lib/"],
    testTimeout: 50000,
    verbose: true,
    maxConcurrency: 1
};
export default config;

//const config: Config.InitialOptions = {
//     transform: {
//         "^.+\\.(t|j)sx?$": "ts-jest"
//     },
//     testRegex: "(/src/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
//     moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
//     modulePathIgnorePatterns: ["/specs/1models/*"],
//     testPathIgnorePatterns: ["/node_modules/", "/lib/"],
//
//     testTimeout: 50000,
//     verbose: true,
// };
// export default config;