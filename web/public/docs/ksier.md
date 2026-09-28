# Ksier

- Categories: Grids & Layouts
- Import: `@/components/ui/ksier`
- Inspiration: GitHub (adaptation) — https://github.com/nurulid/ui-component-collections/blob/main/src/components/ksier/Total.tsx

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/ksier.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `lucide-react`

## Usage

```tsx
import { Resto } from "./component";

export default function Usage() {
	return <Resto />;
}
```

## Source

### `components/ui/ksier.tsx`

```tsx
// Credit:
// https://github.com/nurulid/ui-component-collections/blob/main/src/components/ksier/Total.tsx

import React, { useState } from "react";

import {
	Banknote,
	CheckCircle2,
	QrCode,
	ReceiptText,
	Utensils,
} from "lucide-react";

import { cn } from "@/lib/utils";

export interface MenuItem {
	name: string;
	price: string;
	type: string;
}

export const Total = ({
	total,
	onOrder,
	onPaymentMethodChange,
	paymentMethod,
	foodLength,
	drinkLength,
	onCancel,
}: {
	total: number;
	onOrder: () => void;
	onPaymentMethodChange: (method: string) => void;
	paymentMethod: string;
	foodLength: number;
	drinkLength: number;
	onCancel?: () => void;
}) => {
	const [selectedPaymentMethod, setSelectedPaymentMethod] =
		useState<string>("");

	const handlePaymentMethodSelect = (method: string) => {
		setSelectedPaymentMethod(method);
		onPaymentMethodChange(method); // Notify parent component of the change
	};

	return (
		<>
			<div
				className={[
					"p-5 space-y-4",
					total > 0
						? "bg-green-50/50 border border-green-300"
						: "bg-gray-50/50 border border-gray-300",
				].join(" ")}
			>
				<div className="space-y-2">
					<div>
						<div className="flex items-center justify-between">
							<span className="text-lg">Total:</span>
							<span className="text-xs opacity-50">Order ID: 0001</span>
						</div>
						<p className="text-4xl font-semibold flex items-start gap-2">
							<span className="text-2xl">Rp.</span>{" "}
							{formatThousandSeparator(total)}
						</p>
					</div>
					<p className="opacity-50 text-sm">
						{foodLength} foods, {drinkLength} drinks
					</p>
				</div>
				<hr className="border-gray-200" />
				<div className="space-y-4">
					<p className="opacity-50 text-sm">
						Payment method:{" "}
						<span className="font-semibold">{paymentMethod}</span>
					</p>
					<div className="flex gap-4 justify-end">
						<button
							className={`py-1 px-2 border ${paymentMethod === "Cash"
									? "bg-white border-black"
									: "border-white"
								} bg-gray-200`}
							onClick={() => handlePaymentMethodSelect("Cash")}
						>
							<Banknote className="inline-block mr-1" />
							<span className="text-xs font-semibold">Cash</span>
						</button>
						<button
							className={`py-1 px-2 border ${paymentMethod === "QRIS"
									? "bg-white border-black"
									: "border-white"
								} bg-gray-200`}
							onClick={() => handlePaymentMethodSelect("QRIS")}
						>
							<QrCode className="inline-block mr-1" />
							<span className="text-xs font-semibold">QRIS</span>
						</button>
					</div>
				</div>
			</div>
			<button
				onClick={onOrder}
				disabled={!total || !paymentMethod} // Disable if no total or no payment method selected}
				className={[
					"w-full border border-green-500 shadow-md bg-green-300 btn",
				].join(" ")}
			>
				Order
			</button>
			{/* <button
        onClick={onCancel}
        className="w-full border border-black bg-black text-white mt-auto btn"
      >
        New order
      </button> */}
		</>
	);
};

export function formatThousandSeparator(amount: number | string) {
	return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const SelectedMenu = ({
	selectedFoods,
	selectedDrinks,
	onCancel,
}: {
	selectedFoods: MenuItem[];
	selectedDrinks: MenuItem[];
	onCancel: () => void;
}) => {
	return (
		<>
			<KsierSection
				title="Selected menu"
				icon={CheckCircle2}
				className="min-w-[270px] px-0"
			>
				<div className="flex flex-col gap-4">
					<div className="h-[35dvh] overflow-auto space-y-4">
						<div>
							<h3 className="font-semibold">Foods</h3>
							{selectedFoods.length > 0 ? (
								<ul>
									{selectedFoods.map((food, index) => (
										<li
											key={index}
											className="py-2 not-last:border-b border-gray-100"
										>
											{food.name}
											<div className="flex items-center justify-between text-xs opacity-50">
												<span>1x</span>
												<span>
													Rp. {formatThousandSeparator(food.price)}
												</span>
											</div>
										</li>
									))}
								</ul>
							) : (
								<p className="opacity-50">No foods selected</p>
							)}
						</div>
						<div>
							<h3 className="font-semibold">Drinks</h3>
							{selectedDrinks.length > 0 ? (
								<ul>
									{selectedDrinks.map((drink, index) => (
										<li
											key={index}
											className="py-2 not-last:border-b border-gray-100"
										>
											{drink.name}
											<div className="flex items-center justify-between text-xs opacity-50">
												<span>1x</span>
												<span>
													Rp.{" "}
													{formatThousandSeparator(drink.price)}
												</span>
											</div>
										</li>
									))}
								</ul>
							) : (
								<p className="opacity-50">No drinks selected</p>
							)}
						</div>
					</div>
					{selectedFoods.length > 0 || selectedDrinks.length > 0 ? (
						<button
							onClick={onCancel}
							className="w-full border border-black bg-black text-white mt-auto btn"
						>
							Cancel
						</button>
					) : null}
				</div>
			</KsierSection>
		</>
	);
};

const KsierSection = ({
	icon: Icon,
	title,
	children,
	className,
}: {
	icon: React.ElementType;
	title: string;
	children: React.ReactNode;
}) => {
	return (
		<div className={cn("p-5 space-y-2", className)}>
			<h2 className="p-2 text-lg flex items-center gap-2 border-b border-green-200 font-semibold">
				<Icon className="text-green-500" /> {title}
			</h2>
			<div className="p-2">{children}</div>
		</div>
	);
};

export const Resto = () => {
	const [selectedFoodItems, setSelectedFoodItems] = useState<MenuItem[]>([]);
	const [selectedDrinkItems, setSelectedDrinkItems] = useState<MenuItem[]>([]);
	const [orderedItems, setOrderedItems] = useState<MenuItem[]>([]);
	const [paymentMethod, setPaymentMethod] = useState<string>("");

	const handleSelectFoodItem = (item: MenuItem) => {
		if (selectedFoodItems.some((selected) => selected.name === item.name)) {
			setSelectedFoodItems(
				selectedFoodItems.filter((i) => i.name !== item.name)
			);
		} else {
			setSelectedFoodItems([...selectedFoodItems, item]);
		}
	};

	const handleSelectDrinkItem = (item: MenuItem) => {
		if (selectedDrinkItems.some((selected) => selected.name === item.name)) {
			setSelectedDrinkItems(
				selectedDrinkItems.filter((i) => i.name !== item.name)
			);
		} else {
			setSelectedDrinkItems([...selectedDrinkItems, item]);
		}
	};

	const handleCancel = () => {
		setSelectedFoodItems([]);
		setSelectedDrinkItems([]);
		setOrderedItems([]);
		setPaymentMethod("");
	};

	const handleOrder = () => {
		setOrderedItems([...selectedFoodItems, ...selectedDrinkItems]);
		// handleCancel(); // Optionally clear selections after ordering
	};

	const handlePaymentMethodChange = (method: string) => {
		setPaymentMethod(method);
	};

	// Function to calculate the total price
	const calculateTotalPrice = (items: MenuItem[]) => {
		return items.reduce((total, item) => total + parseFloat(item.price), 0);
	};

	// Calculate totals for food and drinks
	const totalFoodPrice = calculateTotalPrice(selectedFoodItems);
	const totalDrinkPrice = calculateTotalPrice(selectedDrinkItems);

	// Calculate the grand total
	const grandTotal = totalFoodPrice + totalDrinkPrice;
	const foodLength = selectedFoodItems.length;
	const drinkLength = selectedDrinkItems.length;

	return (
		<div className="flex gap-3 w-full">
			<Receipt
				orderedMenu={orderedItems}
				total={grandTotal}
				paymentMethod={paymentMethod}
				foodLength={foodLength}
				drinkLength={drinkLength}
			/>
			<Menus
				onFoodItemSelect={handleSelectFoodItem}
				onDrinkItemSelect={handleSelectDrinkItem}
				selectedFoods={selectedFoodItems}
				selectedDrinks={selectedDrinkItems}
			/>
			<div className="space-y-4">
				<Total
					total={grandTotal ?? 0}
					onOrder={handleOrder}
					onPaymentMethodChange={handlePaymentMethodChange}
					paymentMethod={paymentMethod}
					foodLength={foodLength}
					drinkLength={drinkLength}
					onCancel={handleCancel}
				/>
				<SelectedMenu
					selectedFoods={selectedFoodItems}
					selectedDrinks={selectedDrinkItems}
					onCancel={handleCancel}
				/>
			</div>
		</div>
	);
};

export const Receipt = ({
	orderedMenu,
	total,
	paymentMethod,
	foodLength,
	drinkLength,
}: {
	orderedMenu: MenuItem[];
	total: number | string;
	paymentMethod?: string;
	foodLength: number;
	drinkLength: number;
}) => {
	return (
		<KsierSection
			title="Receipt"
			icon={ReceiptText}
			className="min-w-[280px] p-0"
		>
			<div className="line border h-3 rounded-full bg-gray-200 p-1">
				<div className="receipt font-inconsolata">
					{orderedMenu.length > 0 ? (
						<>
							<div className="receipt-content bg-white w-full min-h-[80px] shadow-2xs border-[0.5px] border-gray-200 border-t-0 relative">
								<div className="p-4 pb-6 space-y-2 border-t-2 border-gray-200 border-dashed">
									<div className="text-sm opacity-50">
										<h3>Order ID: 0001</h3>
										<p>Date: {new Date().toLocaleDateString()}</p>
									</div>
									<ul>
										{orderedMenu.map((menu, index) => (
											<li
												key={index}
												className="py-2 not-last:border-b border-gray-100"
											>
												{menu.name}
												<div className="flex items-center justify-between text-xs opacity-50">
													<span>1x</span>
													<span>
														Rp.{" "}
														{formatThousandSeparator(menu.price)}
													</span>
												</div>
											</li>
										))}
									</ul>
									<div className="pt-4 border-t border-dashed border-gray-300">
										<p className="opacity-50 text-sm">
											{foodLength} foods, {drinkLength} drinks
										</p>
										<p className="text-xl font-semibold">
											Total:{" "}
											<span>
												Rp. {formatThousandSeparator(total)}
											</span>
										</p>
										<p className="opacity-50 text-sm">
											Payment menthod:{" "}
											<span className="font-semibold">
												{paymentMethod}
											</span>
										</p>
									</div>
								</div>
								<div className="z-10 absolute -bottom-[6px] left-0 right-0 space-x-1 px-1 w-auto flex  justify-center">
									{Array.from({ length: 17 }).map((i, index) => {
										return (
											<span
												key={index.toString()}
												className="inline-block size-3 rounded-full bg-white shadow-inner tutup relative"
											></span>
										);
									})}
								</div>
							</div>
						</>
					) : (
						<div className="receipt-content-s bg-white w-full h-[80px] shadow-2xs border-[0.5px] border-gray-200 border-t-0 relative">
							<div className="flex items-center justify-center h-full border-t-2 border-gray-200 border-dashed">
								<span className="opacity-50">
									Waiting for a new order
								</span>
							</div>
							<div className="z-10 absolute -bottom-[6px] left-0 right-0 space-x-1 px-1 w-auto flex  justify-center">
								{Array.from({ length: 17 }).map((i, index) => {
									return (
										<span
											key={index.toString()}
											className="inline-block size-3 rounded-full bg-white shadow-inner tutup relative"
										></span>
									);
								})}
							</div>
						</div>
					)}
				</div>
			</div>
		</KsierSection>
	);
};

export const Menus = ({
	onFoodItemSelect,
	onDrinkItemSelect,
	selectedFoods,
	selectedDrinks,
}: {
	onFoodItemSelect: (item: MenuItem) => void;
	onDrinkItemSelect: (item: MenuItem) => void;
	selectedFoods: MenuItem[];
	selectedDrinks: MenuItem[];
}) => {
	const menus = [
		{
			name: "Soto",
			price: "15000",
			type: "food",
		},
		{
			name: "Mie ayam pangsit",
			price: "13000",
			type: "food",
		},
		{
			name: "Miso",
			price: "17000",
			type: "food",
		},
		{
			name: "Ketoprak",
			price: "13000",
			type: "food",
		},
		{
			name: "Nasi pecel + ayam goreng",
			price: "25000",
			type: "food",
		},
		{
			name: "Pecel ayam",
			price: "22000",
			type: "food",
		},
		{
			name: "Pecel lele",
			price: "20000",
			type: "food",
		},
		{
			name: "Orange",
			price: "5000",
			type: "drink",
		},
		{
			name: "Mineral water",
			price: "3500",
			type: "drink",
		},
		{
			name: "Ice tea",
			price: "7000",
			type: "drink",
		},
		{
			name: "Ice lemon tea",
			price: "8000",
			type: "drink",
		},
		{
			name: "Kelapa muda",
			price: "10000",
			type: "drink",
		},
	];

	return (
		<KsierSection
			title="Menus"
			icon={Utensils}
			className="flex-1 min-w-[450px] py-0"
		>
			<div className="space-y-4">
				<h3 className="font-semibold">Foods</h3>
				<ul className="grid grid-cols-2 gap-3">
					{menus
						.filter((menu) => menu.type === "food")
						.map((food, i) => {
							return (
								<li
									key={i}
									className={[
										"p-2 border cursor-pointer flex flex-col justify-between gap-2",
										selectedFoods.some(
											(selected) => selected.name === food.name
										)
											? "border-yellow-200 bg-yellow-50/20"
											: "border-dashed",
									].join(" ")}
									onClick={() => onFoodItemSelect(food)}
								>
									<span className="flex justify-between">
										<span className="flex-1 leading-[1.2]">
											{food.name}
										</span>
										{selectedFoods.some(
											(selected) => selected.name === food.name
										) ? (
											<CheckCircle2
												size={18}
												className="text-yellow-500"
											/>
										) : (
											""
										)}
									</span>
									<span className="opacity-50 text-xs">
										Rp. {formatThousandSeparator(food.price)}
									</span>
								</li>
							);
						})}
				</ul>
			</div>
			<div className="h-8" />
			<div className="space-y-4">
				<h3 className="font-semibold">Drinks</h3>
				<ul className="grid grid-cols-2 gap-3">
					{menus
						.filter((menu) => menu.type === "drink")
						.map((drink, i) => {
							return (
								<li
									key={i}
									className={[
										"p-2 border cursor-pointer flex flex-col justify-between gap-2",
										selectedDrinks.some(
											(selected) => selected.name === drink.name
										)
											? "border-yellow-200 bg-yellow-50/20"
											: "border-dashed",
									].join(" ")}
									onClick={() => onDrinkItemSelect(drink)}
								>
									<span className="flex justify-between">
										<span className="flex-1 leading-[1.2]">
											{drink.name}
										</span>
										{selectedDrinks.some(
											(selected) => selected.name === drink.name
										) ? (
											<CheckCircle2
												size={18}
												className="text-yellow-500"
											/>
										) : (
											""
										)}
									</span>
									<span className="opacity-50 text-xs">
										Rp. {formatThousandSeparator(drink.price)}
									</span>
								</li>
							);
						})}
				</ul>
			</div>
			<div className="h-8" />
		</KsierSection>
	);
};
```

## Attribution

Source: GitHub · Author: nurulid · Original: https://github.com/nurulid/ui-component-collections/blob/main/src/components/ksier/Total.tsx

Adapted from the original. Credit the original author when you ship this.
