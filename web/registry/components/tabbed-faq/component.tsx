'use client'
import React, { useState } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
} from '@/components/ui/panel-accordion'
import { LayoutGrid, ShieldCheck, Cpu, CreditCard } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Default content, inlined so this component ships standalone. */
const componentDefaults = {
    props: {
        props: {},
    },
};

// Credit:
// https://www.ui-layouts.com/blocks/faq-section

interface FAQItem {
    id: string
    question: string
    answer: string
    category: 'general' | 'technical' | 'billing' | 'account'
}

type FAQCategory = FAQItem['category']

export interface FaqTabbedExplorerProps {
    items?: FAQItem[]
}

export const FaqTabbedExplorer = (props: Partial<FaqTabbedExplorerProps> = {}) => {
    const resolved = { ...componentDefaults.props, ...props } as FaqTabbedExplorerProps
    const faqItems = (resolved.items ?? []) as FAQItem[]
    const [activeTab, setActiveTab] = useState<FAQCategory>('general')
    const categories: { id: FAQCategory; icon: typeof LayoutGrid; label: string }[] = [
        { id: 'general', icon: LayoutGrid, label: 'General' },
        { id: 'technical', icon: Cpu, label: 'Technical' },
        { id: 'billing', icon: CreditCard, label: 'Billing' },
        { id: 'account', icon: ShieldCheck, label: 'Account' },
    ]

    const filteredItems = faqItems.filter((item) => item.category === activeTab)

    return (
        <section className="w-full min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-5xl mx-auto bg-slate-50 rounded-3xl border border-slate-200 flex flex-col md:flex-row justify-center">
                <div className="w-full md:w-72 bg-slate-50 p-6 border-b md:border-b-0 md:border-r border-slate-200 pt-10 rounded-l-3xl">
                    <h3 className="text-sm font-semibold font-spaceGrotesk text-slate-400 uppercase tracking-widest mb-4 px-2">
                        Knowledge Base
                    </h3>
                    <nav className="space-y-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={cn(
                                    'w-full flex items-center font-spaceGrotesk cursor-pointer gap-3 px-2 py-3 border rounded-xl transition-all font-medium',
                                    activeTab === cat.id
                                        ? 'bg-neutral-100 text-black border-neutral-200 shadow-primary-500/30 shadow-[30px_54px_67px_0px_rgba(209,217,230,0.67),25px_27px_27px_-7px_rgba(209,217,230,0.34),-34px_-30px_65px_0px_rgba(255,255,255,0.75),-9px_-20px_29px_0px_rgba(255,255,255,0.54),-13px_-11px_22px_7px_rgba(255,255,255,0.25),-16px_-7px_21px_4px_rgba(255,255,255,0.25)]'
                                        : 'text-slate-600 hover:bg-slate-200/50  border-slate-50'
                                )}
                            >
                                <cat.icon size={18} />
                                {cat.label}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="flex-1 p-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-spaceGrotesk font-semibold text-slate-900 mb-2 capitalize">
                            {activeTab} Questions
                        </h2>
                        <p className="text-slate-500 text-sm">
                            Find answers specifically related to your {activeTab} inquiries.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <Accordion multiple={false} defaultValue={filteredItems[0]?.id}>
                            {filteredItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className="border border-neutral-200 bg-transparent mb-4"
                                >
                                    <AccordionHeader className="rounded-xl hover:bg-slate-50 bg-white py-4 px-3 font-semibold font-spaceGrotesk">
                                        <span className="text-slate-900">{item.question}</span>
                                    </AccordionHeader>
                                    <AccordionPanel className="px-0 bg-white  data-active:bg-white">
                                        <p className="pt-3">{item.answer}</p>
                                    </AccordionPanel>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}
