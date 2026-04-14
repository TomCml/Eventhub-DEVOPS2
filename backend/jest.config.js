/** @type {import('jest').Config} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    testMatch: ['**/*.test.ts'],
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': [
            'ts-jest',
            {
                tsconfig: {
                    allowJs: true,
                    esModuleInterop: true,
                    target: 'ES2021',
                },
            },
        ],
    },
    transformIgnorePatterns: [
        'node_modules[\\\\/](?!(otplib|@otplib|@scure|@noble)[\\\\/])',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
