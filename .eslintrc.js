const { builtinModules } = require('module');

module.exports = {
	env: { browser: true, es2021: true },
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		// при необходимости type-aware правил
		// project: ['./tsconfig.json'],
		// tsconfigRootDir: __dirname,
	},
	plugins: ['@typescript-eslint', 'react', 'react-hooks', 'simple-import-sort', 'import'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:@conarti/feature-sliced/recommended',
		'eslint-config-prettier', // глушит конфликтующие форматтеры
	],
	settings: {
		react: { version: 'detect' },
		// если используем tsconfig-paths (aliases типа entities/*, shared/*)
		'import/resolver': {
			typescript: {
				project: ['./tsconfig.json'],
				alwaysTryTypes: true,
			},
		},
	},
	rules: {
		// базовые стили
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'object-curly-spacing': ['error', 'always'],

		// React/TS
		'react/react-in-jsx-scope': 'off',
		'react/display-name': 'off',
		'react/prop-types': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
		],
		'@typescript-eslint/no-explicit-any': 'warn',

		// импорт-правила
		'import/no-duplicates': 'error',
		'import/order': 'off', // отключаем, чтобы не конфликтовал с simple-import-sort
		'sort-imports': 'off',

		// сортировка импортов + группы FSD
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					// 1) node builtin
					['^node:', `^(${builtinModules.join('|')})(/|$)`],

					// 2) внешние пакеты
					['^react', '^@?\\w'],

					// 3) алиасы FSD
					['^app(/.*|$)'],
					['^processes(/.*|$)'],
					['^pages(/.*|$)'],
					['^widgets(/.*|$)'],
					['^features(/.*|$)'],
					['^entities(/.*|$)'],
					['^shared(/.*|$)'],

					// 4) абсолютные из src
					['^src(/.*|$)'],

					// 5) относительные (приоритет: вверх, затем текущая папка)
					['^\\.\\.(?!/?$)', '^\\.\\./', '^\\.(?!/?$)', '^\\./'],

					// 6) типы (опционально — если хочешь отдельно)
					['^.+\\.(types|d)\\.(ts|tsx)$'],

					// 7) стили/ассеты/данные
					['\\.(css|scss|sass|less|styl)$'],
					['\\.(png|jpe?g|gif|svg|webp|avif)$'],
					['^.+\\.json$'],
				],
			},
		],
		'simple-import-sort/exports': 'error',
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{
				prefer: 'type-imports',
				disallowTypeAnnotations: false,
				fixStyle: 'separate-type-imports',
			},
		],
	},
	ignorePatterns: ['dist', 'build', 'coverage'],
};
