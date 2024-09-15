import { Skeleton } from "@/components/ui/skeleton";
const loading = () => {
    return (
        <div>
            <Skeleton className="w-full h-9 mb-1" />
            <Skeleton className="w-full h-7" />
            <div className="mt-5 flex flex-col gap-1">
                <Skeleton className="w-28 h-7" />
                <Skeleton className="w-full h-7" />
                <Skeleton className="w-full h-20" />
            </div>
        </div>
    );
}

export default loading;