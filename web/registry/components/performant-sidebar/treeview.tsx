// I put this entire source and data for this component
// into one file for ease of use. If you want to understand this
// code I would check out: https://www.joshuawootonn.com/react-treeview-component

import {
	ComponentPropsWithoutRef,
	createContext,
	Dispatch,
	ElementType,
	KeyboardEvent,
	MutableRefObject,
	ReactNode,
	useContext,
	useReducer,
	useRef,
	useState,
} from "react";

import clsx from "clsx";
import isHotkey from "is-hotkey";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { v4 as uuid } from "uuid";

/*********************************************
 * ROVING TABINDEX
 *********************************************/

export type RovingTabindexItem = {
	id: string;
	element: HTMLElement;
};

type RovingTabindexContext = {
	focusableId: string | null;
	setFocusableId: (id: string) => void;
	onShiftTab: () => void;
	getOrderedItems: () => RovingTabindexItem[];
	elements: MutableRefObject<Map<string, HTMLElement>>;
};

const RovingTabindexContext = createContext<RovingTabindexContext>({
	focusableId: null,
	setFocusableId: () => {},
	onShiftTab: () => {},
	getOrderedItems: () => [],
	elements: { current: new Map<string, HTMLElement>() },
});

export function useRovingTabindex(id: string) {
	const {
		elements,
		getOrderedItems,
		setFocusableId,
		focusableId,
		onShiftTab,
	} = useContext(RovingTabindexContext);

	return {
		getOrderedItems,
		isFocusable: focusableId === id,
		getRovingProps: <T extends ElementType>(
			props: ComponentPropsWithoutRef<T>
		) => ({
			...props,
			ref: (element: HTMLElement | null) => {
				if (element) {
					elements.current.set(id, element);
				} else {
					elements.current.delete(id);
				}
			},
			onMouseDown: (e: MouseEvent) => {
				props?.onMouseDown?.(e);
				if (e.target !== e.currentTarget) return;
				setFocusableId(id);
			},
			onKeyDown: (e: KeyboardEvent) => {
				props?.onKeyDown?.(e);
				if (e.target !== e.currentTarget) return;
				if (isHotkey("shift+tab", e)) {
					onShiftTab();
					return;
				}
			},
			onFocus: (e: FocusEvent) => {
				props?.onFocus?.(e);
				if (e.target !== e.currentTarget) return;
				setFocusableId(id);
			},
			["data-item"]: true,
			tabIndex: focusableId === id ? 0 : -1,
		}),
	};
}

type RovingTabindexRootBaseProps<T> = {
	children: ReactNode | ReactNode[];
	as?: T;
	valueId?: string;
};

type RovingTabindexRootProps<T extends ElementType> =
	RovingTabindexRootBaseProps<T> &
		Omit<ComponentPropsWithoutRef<T>, keyof RovingTabindexRootBaseProps<T>>;

export function RovingTabindexRoot<T extends ElementType>({
	children,
	valueId,
	as,
	...props
}: RovingTabindexRootProps<T>) {
	const Component = as ?? "div";
	const [focusableId, setFocusableId] = useState<string | null>(null);
	const [isShiftTabbing, setIsShiftTabbing] = useState(false);
	const elements = useRef(new Map<string, HTMLElement>());
	const ref = useRef<HTMLDivElement | null>(null);

	function getOrderedItems() {
		if (!ref.current) return [];
		const elementsFromDOM = Array.from(
			ref.current.querySelectorAll<HTMLElement>(
				":where([data-item=true]):not(:where([aria-expanded=false] *))"
			)
		);

		return Array.from(elements.current)
			.filter((a) => elementsFromDOM.indexOf(a[1]) > -1)
			.sort(
				(a, b) =>
					elementsFromDOM.indexOf(a[1]) - elementsFromDOM.indexOf(b[1])
			)
			.map(([id, element]) => ({ id, element }));
	}

	return (
		<RovingTabindexContext.Provider
			value={{
				elements,
				getOrderedItems,
				setFocusableId,
				focusableId,
				onShiftTab: function () {
					setIsShiftTabbing(true);
				},
			}}
		>
			<Component
				{...props}
				ref={ref}
				tabIndex={isShiftTabbing ? -1 : 0}
				data-root
				onFocus={(e) => {
					props?.onFocus?.(e);
					if (e.target !== e.currentTarget || isShiftTabbing) return;
					const orderedItems = getOrderedItems();
					if (orderedItems.length === 0) return;

					if (focusableId != null) {
						elements.current.get(focusableId)?.focus();
					} else if (valueId != null) {
						elements.current.get(valueId)?.focus();
					} else {
						orderedItems.at(0)?.element.focus();
					}
				}}
				onBlur={(e) => {
					props?.onBlur?.(e);
					setIsShiftTabbing(false);
				}}
			>
				{children}
			</Component>
		</RovingTabindexContext.Provider>
	);
}

export function getNextFocusableId(
	orderedItems: RovingTabindexItem[],
	id: string
): RovingTabindexItem | undefined {
	const currIndex = orderedItems.findIndex((item) => item.id === id);
	return orderedItems.at(
		currIndex === orderedItems.length - 1 ? 0 : currIndex + 1
	);
}

export function getPrevFocusableId(
	orderedItems: RovingTabindexItem[],
	id: string
): RovingTabindexItem | undefined {
	const currIndex = orderedItems.findIndex((item) => item.id === id);
	return orderedItems.at(currIndex === 0 ? -1 : currIndex - 1);
}

export function getParentFocusableId(
	orderedItems: RovingTabindexItem[],
	id: string
): RovingTabindexItem | undefined {
	const currentElement = orderedItems.find((item) => item.id === id)?.element;

	if (currentElement == null) return;

	let possibleParent = currentElement.parentElement;

	while (
		possibleParent !== null &&
		possibleParent.getAttribute("data-item") === null &&
		possibleParent.getAttribute("data-root") === null
	) {
		possibleParent = possibleParent?.parentElement ?? null;
	}

	return orderedItems.find((item) => item.element === possibleParent);
}

export function getFirstFocusableId(
	orderedItems: RovingTabindexItem[]
): RovingTabindexItem | undefined {
	return orderedItems.at(0);
}
export function getLastFocusableId(
	orderedItems: RovingTabindexItem[]
): RovingTabindexItem | undefined {
	return orderedItems.at(-1);
}

// wrapArray([1,2,3],2) -> [3,1,2]
function wrapArray<T>(array: T[], startIndex: number) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}

export function getNextFocusableIdByTypeahead(
	items: RovingTabindexItem[],
	id: string,
	keyPressed: string
) {
	const currentIndex = items.findIndex((item) => item.id === id);
	const wrappedItems = wrapArray(items, currentIndex);
	let index = 0,
		typeaheadMatchItem: RovingTabindexItem | undefined;

	while (index < wrappedItems.length - 1 && typeaheadMatchItem == null) {
		const nextItem = wrappedItems.at(index + 1);

		if (
			nextItem?.element?.textContent?.charAt(0).toLowerCase() ===
			keyPressed.charAt(0).toLowerCase()
		) {
			typeaheadMatchItem = nextItem;
		}

		index++;
	}

	return typeaheadMatchItem;
}

/*********************************************
 * TREEVIEW
 *********************************************/

export type TreeViewState = Map<string, boolean>;

export enum TreeViewActionTypes {
	OPEN = "OPEN",
	CLOSE = "CLOSE",
}

export type TreeViewActions =
	| {
			type: TreeViewActionTypes.OPEN;
			id: string;
	  }
	| {
			type: TreeViewActionTypes.CLOSE;
			id: string;
	  };

export function treeviewReducer(
	state: TreeViewState,
	action: TreeViewActions
): TreeViewState {
	switch (action.type) {
		case TreeViewActionTypes.OPEN:
			return new Map(state).set(action.id, true);

		case TreeViewActionTypes.CLOSE:
			return new Map(state).set(action.id, false);

		default:
			throw new Error("Tree Reducer received an unknown action");
	}
}

export type TreeViewContextType = {
	open: TreeViewState;
	dispatch: Dispatch<TreeViewActions>;
	selectedId: string | null;
	selectId: (id: string) => void;
};

export const TreeViewContext = createContext<TreeViewContextType>({
	open: new Map<string, boolean>(),
	dispatch: () => {},
	selectedId: null,
	selectId: () => {},
});

type RootProps = {
	children: ReactNode | ReactNode[];
	className?: string;
	value: string | null;
	onChange: (id: string) => void;
	label: string;
};

export function Root({
	children,
	className,
	value,
	onChange,
	label,
}: RootProps) {
	const [open, dispatch] = useReducer(
		treeviewReducer,
		new Map<string, boolean>()
	);

	return (
		<TreeViewContext.Provider
			value={{
				open,
				dispatch,
				selectedId: value,
				selectId: onChange,
			}}
		>
			<RovingTabindexRoot
				as="ul"
				className={clsx("flex flex-col overflow-auto", className)}
				aria-label={label}
				aria-multiselectable="false"
				role="tree"
			>
				{children}
			</RovingTabindexRoot>
		</TreeViewContext.Provider>
	);
}

export type TreeNodeType = {
	id: string;
	name: string;
	children?: TreeNodeType[];
	icon?: ReactNode;
};

type IconProps = { open?: boolean; className?: string };

export function Arrow({ open, className }: IconProps) {
	return (
		<motion.svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={2}
			stroke="currentColor"
			className={clsx("origin-center", className)}
			animate={{ rotate: open ? 90 : 0 }}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M8.25 4.5l7.5 7.5-7.5 7.5"
			/>
		</motion.svg>
	);
}

type NodeProps = {
	node: TreeNodeType;
};

export const Node = function TreeNode({
	node: { id, children, name },
}: NodeProps) {
	const { open, dispatch, selectId, selectedId } = useContext(TreeViewContext);
	const { isFocusable, getRovingProps, getOrderedItems } =
		useRovingTabindex(id);
	const isOpen = open.get(id);
	return (
		<li
			{...getRovingProps<"li">({
				className:
					"flex flex-col cursor-pointer select-none focus:outline-hidden group",
				onKeyDown: function (e: KeyboardEvent) {
					e.stopPropagation();

					const items = getOrderedItems();
					let nextItemToFocus: RovingTabindexItem | undefined;

					if (isHotkey("up", e)) {
						e.preventDefault();
						nextItemToFocus = getPrevFocusableId(items, id);
					} else if (isHotkey("down", e)) {
						e.preventDefault();
						nextItemToFocus = getNextFocusableId(items, id);
					} else if (isHotkey("left", e)) {
						if (isOpen && children?.length) {
							dispatch({
								type: TreeViewActionTypes.CLOSE,
								id,
							});
						} else {
							nextItemToFocus = getParentFocusableId(items, id);
						}
					} else if (isHotkey("right", e)) {
						if (isOpen && children?.length) {
							nextItemToFocus = getNextFocusableId(items, id);
						} else {
							dispatch({ type: TreeViewActionTypes.OPEN, id });
						}
					} else if (isHotkey("home", e)) {
						e.preventDefault();
						nextItemToFocus = getFirstFocusableId(items);
					} else if (isHotkey("end", e)) {
						e.preventDefault();
						nextItemToFocus = getLastFocusableId(items);
					} else if (/^[a-z]$/i.test(e.key)) {
						nextItemToFocus = getNextFocusableIdByTypeahead(
							items,
							id,
							e.key
						);
					} else if (isHotkey("space", e)) {
						e.preventDefault();
						selectId(id);
					}
					nextItemToFocus?.element.focus();
				},
				["aria-expanded"]: children?.length ? Boolean(isOpen) : undefined,
				["aria-selected"]: selectedId === id,
				role: "treeitem",
			})}
		>
			<MotionConfig
				transition={{
					ease: [0.164, 0.84, 0.43, 1],
					duration: 0.25,
				}}
			>
				<div
					className={clsx(
						"flex items-center space-x-2 font-mono font-medium px-1 border-[1.5px] border-transparent",
						isFocusable && "group-focus:border-slate-500",
						selectedId === id ? "bg-slate-200" : "bg-transparent"
					)}
					onClick={() => {
						isOpen
							? dispatch({
									id: id,
									type: TreeViewActionTypes.CLOSE,
								})
							: dispatch({
									id: id,
									type: TreeViewActionTypes.OPEN,
								});
						selectId(id);
					}}
				>
					{children?.length ? (
						<Arrow className="h-4 w-4 shrink-0" open={isOpen} />
					) : (
						<span className="h-4 w-4" />
					)}
					<span className="text-ellipsis whitespace-nowrap overflow-hidden">
						{name}
					</span>
				</div>
				<AnimatePresence initial={false}>
					{children?.length && isOpen && (
						<motion.ul
							initial={{
								height: 0,
								opacity: 0,
							}}
							animate={{
								height: "auto",
								opacity: 1,
								transition: {
									height: {
										duration: 0.25,
									},
									opacity: {
										duration: 0.2,
										delay: 0.05,
									},
								},
							}}
							exit={{
								height: 0,
								opacity: 0,
								transition: {
									height: {
										duration: 0.25,
									},
									opacity: {
										duration: 0.2,
									},
								},
							}}
							key={"ul"}
							role="group"
							className="pl-4 relative"
						>
							{children.map((node) => (
								<Node node={node} key={node.id} />
							))}
						</motion.ul>
					)}
				</AnimatePresence>
			</MotionConfig>
		</li>
	);
};

const Treeview = { Root, Node };

export const data: TreeNodeType[] = [
	{
		id: uuid(),
		name: "A - 1",
		children: [
			{
				id: uuid(),
				name: "A - 2",
				children: [
					{
						id: uuid(),
						name: "Child - 3 This Node will overflow and cause an ellipse",
						children: [
							{
								id: uuid(),
								name: "Child - 4",
								children: [
									{
										id: uuid(),
										name: "Child - 5",
									},
									{
										id: uuid(),
										name: "Child - 6",
									},
								],
							},
							{
								id: uuid(),
								name: "Child - 7",
							},
						],
					},
					{
						id: uuid(),
						name: "Child - 8",
						children: [
							{
								id: uuid(),
								name: "Child - 9",
								children: [
									{
										id: uuid(),
										name: "Child - 10",
									},
									{
										id: uuid(),
										name: "Child - 11",
									},
								],
							},
							{
								id: uuid(),
								name: "Child - 12",
							},
						],
					},
				],
			},
			{
				id: uuid(),
				name: "B - 13",
			},
			{
				id: uuid(),
				name: "C - 14",
				children: [
					{
						id: uuid(),
						name: "Child - 15",
					},
					{
						id: uuid(),
						name: "Child - 16",
					},
				],
			},
		],
	},
	{
		id: uuid(),
		name: "B - 17",
		children: [
			{
				id: uuid(),
				name: "C - 18",
				children: [
					{
						id: uuid(),
						name: "Child - 19",
						children: [
							{
								id: uuid(),
								name: "Child - 20",
								children: [
									{
										id: uuid(),
										name: "Child - 21",
									},
									{
										id: uuid(),
										name: "Child - 22",
									},
								],
							},
							{
								id: uuid(),
								name: "Child - 23",
							},
						],
					},
					{
						id: uuid(),
						name: "Child - 24",
					},
				],
			},
			{
				id: uuid(),
				name: "A - 25",
			},
			{
				id: uuid(),
				name: "B - 26",
			},
		],
	},
	{
		id: uuid(),
		name: "C - 27",
		children: [
			{
				id: uuid(),
				name: "B - 28",
				children: [
					{
						id: uuid(),
						name: "Child - 29",
						children: [
							{
								id: uuid(),
								name: "Child - 30",
								children: [
									{
										id: uuid(),
										name: "Child - 31",
									},
									{
										id: uuid(),
										name: "Child - 32",
									},
								],
							},
							{
								id: uuid(),
								name: "Child - 33",
							},
						],
					},
					{
						id: uuid(),
						name: "Child - 34",
					},
				],
			},
			{
				id: uuid(),
				name: "C - 35",
			},
			{
				id: uuid(),
				name: "A - 36",
			},
		],
	},
];

export function TreeviewComponent() {
	const [selected, select] = useState<string | null>(null);
	return (
		<Treeview.Root value={selected} onChange={select} className="h-full">
			{data.map((node) => (
				<Treeview.Node node={node} key={node.id} />
			))}
		</Treeview.Root>
	);
}
