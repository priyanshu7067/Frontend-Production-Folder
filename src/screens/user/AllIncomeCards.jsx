import React, { useEffect, useState } from "react";
import IncomeCards from "../../components/dashbaord/IncomeCards";
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import {
    BookmarkMinusIcon,
    Gift,
    HandCoinsIcon,
    MonitorCheck,
    TrendingUp,
    Users,
    Zap,
} from "lucide-react";

import { UserRoutes } from "../../constants/routes";
import { allIncomeCards } from "../../apis/user/users.api";

import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const defaultCards = [
    {
        title: "Total Income",
        amount: 0,
        icon: <Zap size={16} />,
        change: 0,
        route: UserRoutes.LIVE_PRICING,
    },

    {
        title: "Referral Income",
        amount: 0,
        icon: (
            <TrendingUp
                size={16}
                className="text-white"
            />
        ),
        change: 0,
    },

    {
        title: "Promotion Income",
        amount: 0,
        icon: (
            <BookmarkMinusIcon
                size={16}
                className="text-white"
            />
        ),
        change: 0,
    },

    {
        title: "Rank Royalty Bonus",
        amount: 0,
        icon: (
            <Gift
                size={16}
                className="text-white"
            />
        ),
        change: 0,
    },

    {
        title: "Total Trade Income",
        amount: 0,
        icon: (
            <TrendingUp
                size={16}
                className="text-white"
            />
        ),
        change: 0,
    },

    {
        title: "MY Direct Team",
        amount: 0,
        icon: (
            <Users
                size={16}
                className="text-white"
            />
        ),
        change: 0,
    },
];

const AllIncomeCards = () => {
    const [loading, setLoading] = useState(true);
    // ✅ UI ALWAYS SAME
    const [incomeData, setIncomeData] =
        useState(defaultCards);
    const { showLoader, hideLoader } = useAuth();
    // ✅ FETCH API
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
                        amount: `$ ${data?.totalInvestment || 0}`,
                        icon: <Zap size={16} />,
                        change: 0,
                        route: "/dashboard/investment-history",
                    },
                    {
                        title: "Total Withdrawal",
                        amount: `$ ${data?.totalWithdrawal || 0}`,
                        icon: <Zap size={16} />,
                        change: 0,
                        route: "/dashboard/withdrawal-history",
                    },

                    {
                        title: "Referral Income",
                        amount: `$ ${data?.referralIncome || 0}`,
                        icon: (<TrendingUp size={16} className="text-white" />),
                        change: 0,
                        route: "/dashboard/refferal-income-history",
                    },
                    {
                        title: "Level Income",
                        amount: `$ ${data?.levelIncome || 0}`,
                        icon: (<TrendingUp size={16} className="text-white" />),
                        change: 0,
                        route: "/dashboard/level-income-history",
                    },

                    {
                        title: "Promotion Income",
                        amount: `$ ${data?.promotionIncome || 0}`,
                        icon: (
                            <BookmarkMinusIcon
                                size={16}
                                className="text-white"
                            />
                        ),
                        change: 0,
                        route: "/dashboard/promotion-bonus-history",
                    },
                    {
                        title: "Company Turnover",
                        amount: `$ ${data?.monthlyCompanyIncome || 0}`,
                        icon: (
                            <AssuredWorkloadIcon
                                size={16}
                                className="text-white"
                            />
                        ),
                        change: 0,
                        // route: "/dashboard/company-turnover",
                    },

                    {
                        title: "Rank Royalty Bonus",
                        amount: `$ ${data?.rankIncome || 0}`,
                        icon: (<Gift size={16} className="text-white"
                        />
                        ),
                        change: 0,
                        route: "/dashboard/rank-royality-bonus-history",
                    },
                    {
                        title: "Total ROI Income",
                        amount: `$ ${data?.roiIncome}` || 0,
                        icon: (
                            <TrendingUp
                                size={16}
                                className="text-white"
                            />
                        ),
                        change: 0,
                        route: "/dashboard/trade-history",
                    },

                    {
                        title: "My Total Members",
                        amount: data?.totalMembers || 0,
                        icon: (
                            <Users
                                size={16}
                                className="text-white"
                            />
                        ),
                        change: 0,
                        route: "/dashboard/my-teams",
                        
                    },
                    {
                        title: "My Direct Team",
                        amount: `$ ${data?.mydirectMembers || 0}`,
                        icon: (
                            <Users
                                size={16}
                                className="text-white"
                            />
                        ),
                        change: 0,
                        route: "/dashboard/direct-team",
                    },
                    {
                        title: "Active Members",
                        amount: data?.activeMembers || 0,
                        icon: (
                            <Users
                                size={16}
                                className="text-white"
                            />
                        ),
                        change: 0,
                        route: "/dashboard/direct-team",
                    },
                ];

                setIncomeData(updatedCards);
            } else {
                // ❌ KEEP OLD UI
                toast.error(
                    res?.message ||
                    "Failed to fetch income data"
                );
            }
        } catch (err) {
            console.error("Income Cards Error:", err);

            // ❌ KEEP UI SAME
            toast.error(
                err?.response?.data?.message ||
                err?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
            hideLoader();
        }
    };

    useEffect(() => {
        fetchIncomeCards();
    }, []);

    return (
        <div>
            <IncomeCards
                data={incomeData}
                loading={loading}
            />
        </div>
    );
};

export default AllIncomeCards;