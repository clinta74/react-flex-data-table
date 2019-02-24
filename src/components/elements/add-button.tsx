import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

type AnchorClickEvent = React.MouseEvent<HTMLAnchorElement>;
type AnchorClickEventHandler = (e: AnchorClickEvent) => void;
type AddButtonProps = React.HTMLProps<HTMLAnchorElement>;

const handler = (f: AnchorClickEventHandler | undefined) => (e: AnchorClickEvent) => {
    e.preventDefault();
    f && f(e);
};

export const AddButton = ({ onClick, className, children, ...attrs }: AddButtonProps) => (
    <div className="bg-light">
        <a className={classNames('btn', 'btn-outline-secondary', 'btn-block', className)} onClick={handler(onClick)} { ...attrs }>
            <FontAwesomeIcon icon={faPlus} />
        </a>
    </div>
);

