import { useState, useEffect } from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import todoService from '../services/todos'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

const STATUS_COLOR_MAP = {
  completed: '#B9F8CF',
  'in-progress': '#BEDBFE',
  rejected: '#FFC9C9',
  'on-hold': '#FFD6A7',
  pending: '#FFF085',
}

const TodoStats = () => {
  const [statsData, setStatsData] = useState(null)
  const [requestedBy, setRequestedBy] = useState('user')

  useEffect(() => {
    const fetchStats = async () => {
      const [stats] = await todoService.getStats()
      setRequestedBy(stats.requestedBy)

      const statusOrder = ['completed', 'in-progress', 'rejected', 'on-hold', 'pending']
      const labels = statusOrder

      if (stats.requestedBy === 'user') {
        const data = statusOrder.map(
          status => stats.byStatus?.find(s => s.status === status)?.percent || 0
        )
        const backgroundColor = statusOrder.map(status => STATUS_COLOR_MAP[status])

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
      } else if (stats.requestedBy === 'admin') {
        const data = statusOrder.map(
          status => stats.byStatus?.find(s => s.status === status)?.userCount || 0
        )
        const backgroundColor = statusOrder.map(status => STATUS_COLOR_MAP[status])

        setStatsData({
          labels,
          datasets: [
            {
              label: 'no. of users with at least one todo in this status',
              data,
              backgroundColor,
              borderColor: '#333',
              borderWidth: 1,
            }
          ]
        })
      }
    }

    fetchStats()
  }, [])

  if (!statsData) return <p>Loading status chart...</p>

  return (
    <div className="h-[400px] w-[500px]">
      {requestedBy === 'user' ? (
        <Pie data={statsData} />
      ) : (
        <Bar
          data={statsData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: value => value,
                },
              },
            },
          }}
        />
      )}
    </div>
  )
}

export default TodoStats
