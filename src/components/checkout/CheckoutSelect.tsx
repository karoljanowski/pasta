'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from "@/components/ui/select"

export default function CheckoutSelect({ error }: { error?: string }) {
    const [selectedValue, setSelectedValue] = useState('')

    return (
        <div className="flex flex-col">
            <label htmlFor="paymentType" className="text-xl uppercase">
                Payment Type
            </label>
            <Select onValueChange={setSelectedValue}>
                <SelectTrigger className="text-left shadow-none border-0 focus:ring-0 rounded-none border-b border-b-red-700 px-3 py-1 outline-none">
                    <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent className="">
                    <SelectItem value="Card">Card</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                </SelectContent>
            </Select>
            <input
                type="hidden"
                name="paymentType"
                value={selectedValue}
            />
            {error && (
                <span className="text-white px-3 w-max rounded-md bg-red-700 mt-2">
                    {error}
                </span>
            )}
        </div>
    )
}