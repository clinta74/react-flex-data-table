import { FlexTable } from "../..";

export type Column<T> = (props: T) => JSX.Element | null;

export type WithHeaderType = <T>(Column: Column<T>) => (props: any) => JSX.Element | null;

export const withHeader: WithHeaderType = Column => ({ headerText, headerClass, ...props }) => Column(props);
