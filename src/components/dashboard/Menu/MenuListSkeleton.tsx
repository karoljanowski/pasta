import { Skeleton } from "@/components/ui/skeleton";

const MenuListSkeleton = () => {
    return (
        <div className="mt-6">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
                {Array.from({ length: 4 }).map((_, index) => {
                    return (
                        <Skeleton key={index} className="w-full rounded-xl h-80" />
                    )
                })}
            </div>
        </div>
    );
}

export default MenuListSkeleton;