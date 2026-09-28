"use client";

import StackedInputForm from "./component";

export default function Usage() {
	return (
		<div className="flex min-h-120 w-full items-center justify-center overflow-hidden p-8">
			<StackedInputForm
    fields={[
        {
            label: 'Size',
            type: 'select',
            placeholder: 'Select a size',
            options: [
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' },
            { value: 'xl', label: 'XL' }
            ]
        },
        {
            label: 'Crust',
            type: 'select',
            placeholder: 'Select a crust',
            options: [
            { value: 'thin', label: 'Thin' },
            { value: 'hand-tossed', label: 'Hand Tossed' },
            { value: 'deep-dish', label: 'Deep Dish' },
            { value: 'gluten-free', label: 'Gluten-Free' }
            ]
        },
        {
            label: 'Sauce',
            type: 'select',
            placeholder: 'Select a sauce',
            options: [
            { value: 'tomato', label: 'Tomato' },
            { value: 'bbq', label: 'BBQ' },
            { value: 'alfredo', label: 'Alfredo' },
            { value: 'pesto', label: 'Pesto' }
            ]
        },
        {
            label: 'Cheese',
            type: 'select',
            placeholder: 'Select a cheese',
            options: [
            { value: 'mozzarella', label: 'Mozzarella' },
            { value: 'cheddar', label: 'Cheddar' },
            { value: 'vegan', label: 'Vegan' },
            { value: 'no-cheese', label: 'No Cheese' }
            ]
        },
        {
            label: 'Toppings',
            type: 'multi-select',
            placeholder: 'Select toppings',
            options: [
            { value: 'pepperoni', label: 'Pepperoni' },
            { value: 'mushrooms', label: 'Mushrooms' },
            { value: 'onions', label: 'Onions' },
            { value: 'olives', label: 'Olives' },
            { value: 'bell-peppers', label: 'Bell Peppers' },
            { value: 'jalapenos', label: 'Jalapeños' },
            { value: 'pineapple', label: 'Pineapple' },
            { value: 'basil', label: 'Basil' }
            ]
        },
        {
            label: 'Special Instructions',
            type: 'textarea',
            placeholder: 'Allergies, preferences, or delivery notes.'
        },
        {
            label: 'Name',
            type: 'text',
            placeholder: 'John Doe'
        },
        {
            label: 'Phone',
            type: 'text',
            placeholder: '123-456-7890'
        },
        {
            label: 'Email',
            type: 'text',
            placeholder: 'john.doe@example.com'
        },
        {
            label: 'Address',
            type: 'text',
            placeholder: '123 Main St, Anytown, USA'
        }
    ]}
/>
		</div>
	);
}
