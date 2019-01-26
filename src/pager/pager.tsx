import React from 'react';
import { get } from 'lodash';

/**
 * ## Constants
 */
const BASE_SHIFT  = 0;
const TITLE_SHIFT = 1;

const TITLES: Titles = {
	first: <>First</>,
	prev: <>\u00AB</>,
	prevSet: <>...</>,
	nextSet: <>...</>,
	next: <>\u00BB</>,
	last: <>Last</>,
};

export type Titles = {
    first?: JSX.Element,
	prev?: JSX.Element,
	prevSet?: JSX.Element,
	nextSet?: JSX.Element,
	next?: JSX.Element,
	last?: JSX.Element,
}

type PagerViewProps = {
	current: number,
	total: number,
	visiblePages: number,
    titles?: Titles,
    className?: string,
	onPageChanged?: (page: number ) => void,
};


export interface IPagerState {
	currentPage: number;
    itemsPerPage: number;
    visiblePages: number;
}

export function pageItems<T>(items:T[], currentPage, currentItemsPerPage) {
	return items.slice(currentPage * currentItemsPerPage, (currentPage + 1) * currentItemsPerPage);
}

/**
 * Constructor
 */
export class Pager extends React.Component<PagerViewProps> {
	constructor(props) {
		super(props);
	}

    /* ========================= HELPERS ==============================*/
	getTitles(key) {
		return get(this.props.titles, key, TITLES[key]);
	}

    /**
     * Calculates "blocks" of buttons with page numbers.
     */
	calcBlocks = () => {
		const props = this.props;
		const total = props.total;
		const blockSize = props.visiblePages;
		const current = props.current + TITLE_SHIFT;
		const blocks = Math.ceil(total / blockSize);
		const currBlock = Math.ceil(current / blockSize) - TITLE_SHIFT;

		return {
			total:    blocks,
			current:  currBlock,
			size:     blockSize,
		};
	}

	isPrevDisabled = () => {
		return this.props.current <= BASE_SHIFT;
	}

	isNextDisabled = () => {
		return this.props.current >= (this.props.total - TITLE_SHIFT);
	}

	isPrevMoreHidden = () => {
		const blocks = this.calcBlocks();
		return (blocks.total === TITLE_SHIFT) || (blocks.current === BASE_SHIFT);
	}

	isNextMoreHidden =() => {
		const blocks = this.calcBlocks();
		return (blocks.total === TITLE_SHIFT) || (blocks.current === (blocks.total - TITLE_SHIFT));
	}

	visibleRange = () => {
		const blocks = this.calcBlocks();
		const start = blocks.current * blocks.size;
		const delta = this.props.total - start;
		const end = start + ((delta > blocks.size) ? blocks.size : delta);

		return [start + TITLE_SHIFT, end + TITLE_SHIFT];
	}


    /* ========================= HANDLERS =============================*/
	handleFirstPage = () => {
		if (!this.isPrevDisabled()) {
			this.handlePageChanged(BASE_SHIFT);
		}
	}

	handlePreviousPage = () => {
		if (!this.isPrevDisabled()) {
			this.handlePageChanged(this.props.current - TITLE_SHIFT);
		}
	}

	handleNextPage = () => {
		if (!this.isNextDisabled()) {
			this.handlePageChanged(this.props.current + TITLE_SHIFT);
		}
	}

	handleLastPage = () => {
		if (!this.isNextDisabled()) {
			this.handlePageChanged(this.props.total - TITLE_SHIFT);
		}
	}

    /**
     * Chooses page, that is one before min of currently visible
     * pages.
     */
	handleMorePrevPages = () => {
		const blocks = this.calcBlocks();
		this.handlePageChanged((blocks.current * blocks.size) - TITLE_SHIFT);
	}

    /**
     * Chooses page, that is one after max of currently visible
     * pages.
     */
	handleMoreNextPages = () => {
		const blocks = this.calcBlocks();
		this.handlePageChanged((blocks.current + TITLE_SHIFT) * blocks.size);
	}

	handlePageChanged = (num) => {
		const handler = this.props.onPageChanged;
		if (handler) handler(num);
	}


    /* ========================= RENDERS ==============================*/
    /**
     * ### renderPages()
     * Renders block of pages' buttons with numbers.
     * @param {Number[]} range - pair of [start, from], `from` - not inclusive.
     * @return {React.Element[]} - array of React nodes.
     */
	renderPages = (pair) => {
		return range(pair[0], pair[1]).map((num, idx) => {
			const current = num - TITLE_SHIFT;
            const isActive = (this.props.current === current);
            const onClick = this.handlePageChanged.bind(this, current);

			return (
				<Page
					key={idx}
					isActive={isActive}
					className="btn-numbered-page"
					onClick={onClick}
				>{num}</Page>
			);
		});
	}


	render() {
		const titles = this.getTitles.bind(this);
		let className = "pagination";
		if (this.props.className) {
			className += " " + this.props.className;
		}

		return (
			<nav>
				<ul className={className}>
					<Page
						className="btn-first-page"
						key="btn-first-page"
						isDisabled={this.isPrevDisabled()}
						onClick={this.handleFirstPage}
					>{titles('first')}</Page>

					<Page
						className="btn-prev-page"
						key="btn-prev-page"
						isDisabled={this.isPrevDisabled()}
						onClick={this.handlePreviousPage}
					>{titles('prev')}</Page>

					<Page
						className="btn-prev-more"
						key="btn-prev-more"
						isHidden={this.isPrevMoreHidden()}
						onClick={this.handleMorePrevPages}
					>{titles('prevSet')}</Page>

					{this.renderPages(this.visibleRange())}

					<Page
						className="btn-next-more"
						key="btn-next-more"
						isHidden={this.isNextMoreHidden()}
						onClick={this.handleMoreNextPages}
					>{titles('nextSet')}</Page>

					<Page
						className="btn-next-page"
						key="btn-next-page"
						isDisabled={this.isNextDisabled()}
						onClick={this.handleNextPage}
					>{titles('next')}</Page>

					<Page
						className="btn-last-page"
						key="btn-last-page"
						isDisabled={this.isNextDisabled()}
						onClick={this.handleLastPage}
					>{titles('last')}</Page>
				</ul>
			</nav>
		);
	}
}

type PageProps = React.ReactNode & {
	isHidden?:   boolean;
	isActive?:   boolean;
	isDisabled?: boolean;
	className?:  string;
	onClick: () => void;
};

const Page: React.SFC<PageProps> = (props) => {
	if (props.isHidden) return null;

	const baseCss = props.className ? `${props.className} ` : '';
	const fullCss = `page-item ${baseCss}${props.isActive ? ' active' : ''}${props.isDisabled ? ' disabled' : ''}`;

	return (
		<li className={fullCss}>
			<a className="page-link" onClick={props.onClick}>{props.children}</a>
		</li>
	);
};

function range(start: number, end: number) {
	const res: number[] = [];
	for (let i: number = start; i < end; i++) {
		res.push(i);
	}

	return res;
}
