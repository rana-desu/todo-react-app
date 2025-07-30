import { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2'
import todoService from '../services/todos'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const STATUS_COLOR_MAP = {
  completed: '#B9F8CF',
  'in-progress': '#BEDBFE',
  rejected: '#FFC9C9',
  'on-hold': '#FFD6A7',
  pending: '#FFF085',
}

const TodoStats = () => {
  const [statsData, setStatsData] = useState(null)
  
  useEffect(() => {
    const fetchStats = async () => {
      const [stats] = await todoService.getStats()
      const statusOrder = ['completed', 'in-progress', 'rejected', 'on-hold', 'pending']
      const labels = statusOrder
      const data = statusOrder.map(
        status => stats.byStatus?.find(s => s.status === status)?.percent || 0
      )
      const backgroundColor = statusOrder.map(status => STATUS_COLOR_MAP[status])

      console.log('data in todostats', stats.byStatus)
      setStatsData({
        labels,
        datasets: [
          {
            label: '% of todos by status',
            data,
            backgroundColor,
            borderWidth: 1,
          }
        ]
      })
    }

    fetchStats()
  }, [])

  if (!statsData) return <p>Loading status chart...</p>

  return (
    <div className="h-[400px] w-[400px]">
      <Pie data={statsData} />
    </div>
  )
}

export default TodoStats