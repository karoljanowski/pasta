'use client'
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderWithProducts } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table"
import SelectStatus from "./SelectStatus";


const columns: ColumnDef<OrderWithProducts>[] = [
    {
        accessorKey: 'id',
        size: 100,
        header: ({ column }) => {
            return (
                <Button variant="ghost" className="px-1"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}

                >
                    Order ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="pl-4">{row.original.id}</div>
        },
        filterFn: (rows, id, filterValue) => {
            return rows.original.id == filterValue
        }
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            return <SelectStatus status={row.original.status} id={row.original.id} />
        },
        filterFn: (rows, id, filterValue) => {
            return rows.original.status === filterValue
        }
    },
    {
        accessorKey: 'customerFullname',
        size: 200,
        header: 'Customer',
        cell: ({ row }) => {
            return <>{row.original.customerFullname}<br />
                {row.original.customerStreet}, {row.original.customerCity}<br />
            </>
        }
    },
    {
        accessorKey: 'orderItems',
        header: 'Products',
        size: 200,
        cell: ({ row }) => {
            return (
                <div>
                    {row.original.orderItems.map((item, i) => {
                        return <div key={i}>{item.product.name} x {item.quantity}</div>
                    })}
                </div>
            )
        }
    },
    {
        accessorKey: 'time',
        header: ({ column }) => {
            return (
                <Button variant="ghost" className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}

                >
                    Time
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <>
                {new Date(row.original.time).toLocaleTimeString()}<br />
                {new Date(row.original.time).toLocaleDateString()}
            </>
        }
    },
    {
        accessorKey: 'total',
        header: 'Total',
        cell: ({ row }) => {
            return <>{row.original.total}$</>
        }
    }

]

export default columns;