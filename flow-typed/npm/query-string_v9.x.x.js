// flow-typed signature: ec1d99909d639f153164cf55049d63b2
// flow-typed version: <<STUB>>/query-string_v^9.1.1/flow_v0.132.0

/**
 * This is an autogenerated libdef stub for:
 *
 *   'query-string'
 *
 * Fill this stub out by replacing all the `any` types.
 *
 * Once filled out, we encourage you to share your work with the
 * community by sending a pull request to:
 * https://github.com/flowtype/flow-typed
 */

declare module 'query-string' {
    declare type QueryParameters = { [string]: string | Array<string | number> | null, ... }

    declare module.exports: {
        parse(str: string, opts?: any): QueryParameters,
        ...
    }
}