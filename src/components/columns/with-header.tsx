export type Column<T extends DT.ItemElement<{}>> = (props: T) => JSX.Element | null;

/*
 * TODO:
 * At some point -- possibly with TS 2.4, but it seems possible this should have thrown an error earlier, the previous definition
 *
 * type WithHeaderType = <T>(Column: Column<T>) => (props: T & DT.HeaderElement) => JSX.Element;
 *
 * started throwing an error with the `const withHeader:` line, below, returning "rest types may only be created from object types".
 * Changed the type of props to "any" since it didn't affect functioning of the app, only compiling it, but it'll result
 * in uncaught errors with it so loose, so this should be investigated further.
 */
export type WithHeaderType = <T>(Column: Column<T>) => (props: any) => JSX.Element | null;

export const withHeader: WithHeaderType = Column => ({ headerText, headerClass, ...props }) => Column(props);
