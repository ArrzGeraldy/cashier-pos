import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { cn } from "@/lib/utils";

const Bread = ({ breadItem, breadHref, page, className = "" }) => {
    return (
        <Breadcrumb className={cn("shadow-md w-fit", className)}>
            <BreadcrumbList className="bg-white w-fit px-4 py-1.5 rounded-md">
                <BreadcrumbItem>
                    <BreadcrumbLink href={"/dashboard"}>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href={breadHref}>
                        {breadItem}
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{page}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default Bread;
