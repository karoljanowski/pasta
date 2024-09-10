'use client'
import { useState } from 'react';
import { OrderStatus } from "@prisma/client";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel,
    getPaginationRowModel,
    ColumnFiltersState,
    getFilteredRowModel
} from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDownIcon } from 'lucide-react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const statusArray = Object.values(OrderStatus);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        state: {
            sorting,
            columnFilters
        },
    })
    return (
        <div>
            <div className="flex flex-wrap items-center gap-3 mt-2 w-full">
                <Input
                    placeholder='Filter by ID'
                    id='id'
                    value={(table.getColumn("id")?.getFilterValue() as number) ?? ""}
                    onChange={(event) =>
                        table.getColumn("id")?.setFilterValue(event.target.value)
                    }
                    className='w-max min-w-24 flex-1 max-w-52'
                />
                <Input
                    placeholder='Filter by customer fullname'
                    id='customerFullname'
                    value={(table.getColumn("customerFullname")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("customerFullname")?.setFilterValue(event.target.value)
                    }
                    className='w-max min-w-52 flex-1 max-w-96'
                />
                <DropdownMenu>
                    <DropdownMenuTrigger className='flex-1 lg:flex-none' asChild>
                        <Button variant="outline">
                            Filter by status <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {statusArray.map(statusValue => {
                            return (
                                <DropdownMenuItem
                                    key={statusValue}
                                    onClick={() => table.getColumn("status")?.setFilterValue(statusValue)}
                                >
                                    {statusValue}
                                </DropdownMenuItem>
                            )
                        }
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => table.getColumn("status")?.setFilterValue(undefined)}
                        >
                            Show all
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild className='flex-1 lg:flex-none lg:ml-auto'>
                        <Button variant="outline">
                            Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        <>
                                            {typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id}
                                        </>
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>


            <div className='overflow-scroll'>
                <div className="rounded-md border mt-4 min-w-[800px]">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead style={{ width: header.getSize() }} className='px-5' key={header.id}>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell className='px-5' key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}