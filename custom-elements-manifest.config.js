import { readmePlugin } from 'cem-plugin-readme';

export default {
  globs: ['*.ts'],
  exclude: ['**/*.spec.ts', '**/*.test.ts', '**/*.stories.ts'],
  litelement: true,
  plugins: [
    readmePlugin({
      header: 'README.head.md',
      footer: 'README.foot.md',
    }),
  ]
}
