module.exports = {
    description: 'Generates new React icon component',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: "What's the name of the icon?",
            validate: function (value) {
                let message = true
                if (!/.+/.test(value)) {
                    message = console.error('Missing', 'you must define an icon name')
                } else if (value.length < 3) {
                    message = console.error(
                        'Too Short',
                        `"${value}" is not descriptive enough`,
                    )
                }
                return message
            },
        },
    ],
    actions: function () {
        return [
            {
                type: 'add',
                path: 'src/icons/{{pascalCase name}}.tsx',
                templateFile: './generate/icon/templates/icon.hbs',
            },
            {
                type: 'modify',
                path: 'src/icons/index.ts',
                pattern: /(\/\* -- icon: insert above here -- \*\/)/gi,
                template: `export { {{pascalCase name}}Icon } from './{{pascalCase name}}'\n$1`,
            },
            {
                type: 'modify',
                path: 'src/components/IconPicker/IconPicker.docs.mdx',
                pattern: /(## Icon list:\n)/gi,
                template: '$1\n- `{{camelCase name}}`',
            },
            {
                type: 'modify',
                path: 'src/components/IconPicker/IconPicker.tsx',
                pattern: /(\} from '..\/..\/icons')/gi,
                template: `  {{pascalCase name}}Icon,\n$1`,
            },
            {
                type: 'modify',
                path: 'src/components/IconPicker/IconPicker.tsx',
                pattern: /(export enum Icons {)/gi,
                template: `$1\n  {{camelCase name}} = '{{camelCase name}}',`,
            },
            {
                type: 'modify',
                path: 'src/components/IconPicker/IconPicker.tsx',
                pattern: /(const IconsMap: Map<string, VFC> = new Map\(\[)/gi,
                template: `$1\n  [Icons.{{camelCase name}}, {{pascalCase name}}Icon],`,
            },
            {
                type: 'modify',
                path: 'src/components/IconPicker/IconPicker.stories.tsx',
                pattern: /( {4}{\/\* -- insert below here -- \*\/})/gi,
                template: `$1\n    <IconWrapper icon="{{camelCase name}}" />`,
            },
            {
                type: 'modify',
                path: 'src/components/IconPicker/IconPicker.stories.tsx',
                pattern: /(\/\* -- insert stories below here -- \*\/)/gi,
                template: `$1\n\nexport const {{pascalCase name}} = Template.bind({})\n{{pascalCase name}}.args = {\n  icon: '{{camelCase name}}',\n}`,
            },
            // uncomment below if you want to export icons directly from the package
            // {
            //   type: 'modify',
            //   path: 'src/index.ts',
            //   pattern: /(\/\/ icons\nexport \{)/gi,
            //   template: `$1\n  {{pascalCase name}}Icon,`,
            // },
        ]
    },
}