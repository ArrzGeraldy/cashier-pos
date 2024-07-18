import { SaleBarChart } from "@/Components/chart/SaleBarChart";
import { SalePieChart } from "@/Components/chart/SalePieChart";
import StatisticsCards from "@/Components/shared/StatisticsCards";
import PosLayout from "@/Layouts/PosLayout";

const index = (props) => {
    const { data } = props;
    const { chartData } = data;

    return (
        <PosLayout title={props.title}>
            {props.data && (
                <StatisticsCards
                    expense={data.expense}
                    profit={data.profit}
                    revenue={data.revenue}
                    totalSale={data.totalSale}
                />
            )}

            <div className="grid lg:grid-cols-2 gap-4 mt-4">
                {props.data && <SaleBarChart chartData={chartData} />}
                {props.data && (
                    <SalePieChart profit={data.profit} expense={data.expense} />
                )}
            </div>
        </PosLayout>
    );
};

export default index;
