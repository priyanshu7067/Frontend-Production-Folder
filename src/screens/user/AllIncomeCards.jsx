import React from 'react'
import IncomeCards from '../../components/dashbaord/IncomeCards'
import { ArrowDownCircle, BookmarkMinusIcon, Gift, TrendingUp, Users, Zap } from 'lucide-react'
import { UserRoutes } from '../../constants/routes';

const AllIncomeCards = () => {


    const incomeData = [
        {
            title: "Total Income",
            amount: 0,
            icon: <Zap size={16} />,
            change: 0,
            route: UserRoutes.LIVE_PRICING
        },
        {
            title: "Referral Income",
            amount: 32000,
            icon: <TrendingUp size={16} className="text-white" />,
            change: 8.2,
        },
        {
            title: "Promotion Income",
            amount: -12000,
            icon: <BookmarkMinusIcon size={16} className="text-white" />,
            change: -5.4,
        },
        {
            title: "Rank Royalty Bonus",
            amount: 5200,
            icon: <Gift size={16} className="text-white" />,
        },
        {
            title: "Total Trade Income",
            amount: 5200,
            icon: <TrendingUp size={16} className="text-white" />,
        },
        {
            title: "MY Direct Team",
            amount: 5200,
            icon: <Users size={16} className="text-white" />,
        },
    ]
    return (
        <div>
            <IncomeCards data={incomeData} loading={false} />
        </div>
    )
}

export default AllIncomeCards