import { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest', // Use ts-jest to transform TypeScript files
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        // Handle CSS imports (e.g., CSS Modules)   
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
        // Handle static assets
        '^.+\\.(jpg|jpeg|png|gif|webp|svg|eot|otf|ttf|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
        // Handle absolute imports and aliases
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Extend Jest functionality
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'], // Ignore unnecessary paths
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files
        '^.+\\.(js|jsx)$': 'babel-jest', // Use Babel for JavaScript files
    },
    transformIgnorePatterns: ['/node_modules/'],
};

export default config;
