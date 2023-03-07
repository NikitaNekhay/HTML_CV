import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';



export default {
    input: 'src/script_comic.ts',
    output: { file: 'bundle.js' },
    plugins: [
        typescript(),
        nodeResolve(),
        terser(),
        /* Other plugins */],
};