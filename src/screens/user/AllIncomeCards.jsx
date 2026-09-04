import React, { useEffect, useState } from "react";
import IncomeCards from "../../components/dashbaord/IncomeCards";
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import {
    BookmarkMinusIcon,
    Gift,
    TrendingUp,
    Users,
    Zap,
} from "lucide-react";

import { UserRoutes } from "../../constants/routes";
import { allIncomeCards } from "../../apis/user/users.api";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { formatINR } from "../../utils/helper";

const defaultCards = [
    {
        title: "Total Income",
        amount: 0,
        icon: <Zap size={18} />,
        change: 0,
        route: UserRoutes.LIVE_PRICING,
    },
    {
        title: "Referral Income",
        amount: 0,
        icon: <TrendingUp size={18} />,
        change: 0,
    },
    {
        title: "Promotion Income",
        amount: 0,
        icon: <BookmarkMinusIcon size={18} />,
        change: 0,
    },
    {
        title: "Rank Royalty Bonus",
        amount: 0,
        icon: <Gift size={18} />,
        change: 0,
    },
    {
        title: "Total Trade Income",
        amount: 0,
        icon: <TrendingUp size={18} />,
        change: 0,
    },
    {
        title: "My Direct Team",
        amount: 0,
        icon: <Users size={18} />,
        change: 0,
    },
];

const AllIncomeCards = () => {
    const [loading, setLoading] = useState(true);
    const [incomeData, setIncomeData] = useState(defaultCards);
    const { showLoader, hideLoader } = useAuth();

    const fetchIncomeCards = async () => {
        showLoader();
        try {
            setLoading(true);
            const res = await allIncomeCards();
            if (res?.success) {
                const data = res?.data || {};

                const updatedCards = [
                    {
                        title: "Total Investment",
                        amount: formatINR(data?.totalInvestment || 0),
                        icon: <Zap size={18} />,
                        change: 0,
                        route: "/dashboard/investment-history",
                    },
                    {
                        title: "Total Withdrawal",
                        amount: formatINR(data?.totalWithdrawal || 0),
                        icon: <Zap size={18} />,
                        change: 0,
                        route: "/dashboard/withdrawal-history",
                    },
                    {
                        title: "Referral Income",
                        amount: formatINR(data?.referralIncome || 0),
                        icon: <TrendingUp size={18} />,
                        change: 0,
                        route: "/dashboard/refferal-income-history",
                    },
                    {
                        title: "Level Income",
                        amount: formatINR(data?.levelIncome || 0),
                        icon: <TrendingUp size={18} />,
                        change: 0,
                        route: "/dashboard/level-income-history",
                    },
                    {
                        title: "Promotion Income",
                        amount: formatINR(data?.promotionIncome || 0),
                        icon: <BookmarkMinusIcon size={18} />,
                        change: 0,
                        route: "/dashboard/promotion-bonus-history",
                    },
                    {
                        title: "Company Turnover",
                        amount: formatINR(data?.monthlyCompanyIncome || 0),
                        icon: <AssuredWorkloadIcon fontSize="small" />,
                        change: 0,
                    },
                    {
                        title: "Rank Royalty Bonus",
                        amount: formatINR(data?.rankIncome || 0),
                        icon: <Gift size={18} />,
                        change: 0,
                        route: "/dashboard/rank-royality-bonus-history",
                    },
                    {
                        title: "Total ROI Income",
                        amount: formatINR(data?.roiIncome || 0),
                        icon: <TrendingUp size={18} />,
                        change: 0,
                        route: "/dashboard/trade-history",
                    },
                    {
                        title: "My Total Members",
                        amount: `${data?.totalMembers || 0} Members`,
                        icon: <Users size={18} />,
                        change: 0,
                        route: "/dashboard/my-teams",
                    },
                    {
                        title: "My Direct Team",
                        amount: `${data?.mydirectMembers || 0} Members`,
                        icon: <Users size={18} />,
                        change: 0,
                        route: "/dashboard/direct-team",
                    },
                    {
                        title: "Active Members",
                        amount: `${data?.activeMembers || 0} Active`,
                        icon: <Users size={18} />,
                        change: 0,
                        route: "/dashboard/direct-team",
                    },
                ];

                setIncomeData(updatedCards);
            } else {
                toast.error(res?.message || "Failed to fetch income data");
            }
        } catch (err) {
            console.error("Income Cards Error:", err);
            toast.error(err?.response?.data?.message || err?.message || "Something went wrong");
        } finally {
            setLoading(false);
            hideLoader();
        }
    };

    useEffect(() => {
        fetchIncomeCards();
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    All Financial Returns & Metrics
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                    Comprehensive overview of all yield streams and portfolio earnings in INR.
                </p>
            </div>

            <IncomeCards
                data={incomeData}
                loading={loading}
            />
        </div>
    );
};

export default AllIncomeCards;