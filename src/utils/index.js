export const statusLevels = {
    low: {
        color: "#047857",
        background: "#d1fae5",
        description: 'Tea has provided a gentle caffeine boost, offering mild alertness and a sense of calm.',
        maxLevel: 80
    },
    moderate: {
        color: "#b45309",
        background: "#fef3c7",
        description: 'A comfortable level of tea-based caffeine, providing notable mental clarity and energy without overwhelming effects.',
        maxLevel: 150
    },
    high: {
        color: "#e11d48",
        background: "#ffe4e6",
        description: 'High tea consumption has resulted in elevated caffeine levels, which may cause restlessness, increased heart rate, or disrupted sleep patterns.',
        maxLevel: 9999
    },
}

export const chaiConsumptionHistory = {
    "1746274398507": { "name": "Masala Chai", "cost": 25.50 },
    "1746360738507": { "name": "Darjeeling Tea", "cost": 45.75 },
    "1746360678507": { "name": "Kadak Chai", "cost": 30.00 },
    "1746360618507": { "name": "Lemon Tea", "cost": 20.50 },
    "1746447198507": { "name": "Adrak Chai", "cost": 35.00 },
    "1746447138507": { "name": "Kashmiri Pink Tea", "cost": 60.25 },
    "1746447078507": { "name": "Masala Chai", "cost": 25.50 },
    "1746533598507": { "name": "Irani Chai", "cost": 40.00 },
    "1746533538507": { "name": "Green Tea", "cost": 30.50 },
    "1746598398507": { "name": "Matcha Tea", "cost": 85.75 },
    "1746598338507": { "name": "Herbal Tea", "cost": 50.00 },
    "1746609198507": { "name": "Mint Tea", "cost": 25.00 },
    "1746609138507": { "name": "Elaichi Chai", "cost": 35.50 },
    "1746616398507": { "name": "Assam Tea", "cost": 40.25 },
    "1746618198507": { "name": "Tulsi Tea", "cost": 35.00 },
    "1746619398507": { "name": "Darjeeling Tea", "cost": 45.75 },
    "1746619698507": { "name": "Masala Chai", "cost": 25.50 },
    "1746619878507": { "name": "Kahwah", "cost": 55.00 },
    "1746619938507": { "name": "Kadak Chai", "cost": 30.00 },
    "1746619998507": { "name": "Lemon Tea", "cost": 20.50 }
}

export const chaiOptions = [
    { "name": "Masala Chai", "caffeine": 60 },
    { "name": "Kadak Chai", "caffeine": 70 },
    { "name": "Adrak Chai", "caffeine": 55 },
    { "name": "Elaichi Chai", "caffeine": 50 },
    { "name": "Irani Chai", "caffeine": 65 },
    { "name": "Kashmiri Pink Tea", "caffeine": 40 },
    { "name": "Sulaimani Tea", "caffeine": 45 },
    { "name": "Butter Tea", "caffeine": 35 },
    { "name": "Kahwah", "caffeine": 30 },
    { "name": "Black Tea", "caffeine": 47 },
    { "name": "Green Tea", "caffeine": 28 },
    { "name": "White Tea", "caffeine": 15 },
    { "name": "Oolong Tea", "caffeine": 37 },
    { "name": "Darjeeling Tea", "caffeine": 50 },
    { "name": "Assam Tea", "caffeine": 80 },
    { "name": "Nilgiri Tea", "caffeine": 60 },
    { "name": "Herbal Tea", "caffeine": 0 },
    { "name": "Mint Tea", "caffeine": 0 },
    { "name": "Chamomile Tea", "caffeine": 0 },
    { "name": "Tulsi Tea", "caffeine": 0 },
    { "name": "Ginger Tea", "caffeine": 0 },
    { "name": "Lemon Tea", "caffeine": 25 },
    { "name": "Matcha Tea", "caffeine": 70 },
    { "name": "Chai Latte", "caffeine": 40 },
    { "name": "Rooibos Tea", "caffeine": 0 },
    { "name": "Hibiscus Tea", "caffeine": 0 },
    { "name": "Earl Grey", "caffeine": 55 },
    { "name": "English Breakfast", "caffeine": 60 },
    { "name": "Jasmine Tea", "caffeine": 25 },
    { "name": "Bubble Tea", "caffeine": 30 },
    { "name": "Yerba Mate", "caffeine": 85 },
    { "name": "Lemongrass Tea", "caffeine": 0 },
    { "name": "Rose Tea", "caffeine": 0 },
    { "name": "Saffron Tea", "caffeine": 10 },
    { "name": "Blue Tea", "caffeine": 0 },
    { "name": "Turmeric Tea", "caffeine": 0 }
]

const halfLifeHours = 5


export function calculateCurrentCaffeineLevel(historyData) {
    const currentTime = Date.now()
    const halfLife = halfLifeHours * 60 * 60 * 1000 // 5 hours in milliseconds
    const maxAge = 48 * 60 * 60 * 1000 // 48 hours in milliseconds

    let totalCaffeine = 0

    for (const [timestamp, entry] of Object.entries(historyData)) {
        const timeElapsed = currentTime - parseInt(timestamp)

        // Ignore entries older than 48 hours
        if (timeElapsed <= maxAge) {
            const caffeineInitial = getCaffeineAmount(entry.name)
            // Calculate the remaining caffeine using the half-life formula
            const remainingCaffeine = caffeineInitial * Math.pow(0.5, timeElapsed / halfLife)
            totalCaffeine += remainingCaffeine
        }
    }

    return totalCaffeine.toFixed(2)
}

export function getCaffeineAmount(teaName) {
    const tea = chaiOptions.find(c => c.name === teaName)
    return tea ? tea.caffeine : 0
}

export function getTopThreeTeas(historyData) {
    const teaCount = {}

    // Count occurrences of each tea type
    for (const entry of Object.values(historyData)) {
        const teaName = entry.name
        if (teaCount[teaName]) {
            teaCount[teaName]++
        } else {
            teaCount[teaName] = 1
        }
    }

    // Convert teaCount object to an array of [teaName, count] and sort by count
    const sortedTeas = Object.entries(teaCount).sort((a, b) => b[1] - a[1])

    // Calculate total teas consumed
    const totalTeas = Object.values(teaCount).reduce((sum, count) => sum + count, 0)

    // Get the top 3 most popular teas
    const topThree = sortedTeas.slice(0, 3).map(([teaName, count]) => {
        const percentage = ((count / totalTeas) * 100).toFixed(2)
        return {
            teaName: teaName,
            count: count,
            percentage: percentage + '%'
        }
    })

    return topThree
}

export function timeSinceConsumption(utcMilliseconds) {
    const now = Date.now()
    const diffInMilliseconds = now - utcMilliseconds

    // Convert to seconds, minutes, hours, days, and months
    const seconds = Math.floor(diffInMilliseconds / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)

    // Get the remainder for each unit
    const remainingDays = days % 30
    const remainingHours = hours % 24
    const remainingMinutes = minutes % 60
    const remainingSeconds = seconds % 60

    // Construct the string
    let result = ''
    if (months > 0) result += `${months}M `
    if (remainingDays > 0) result += `${remainingDays}D `
    if (remainingHours > 0) result += `${remainingHours}H `
    if (remainingMinutes > 0) result += `${remainingMinutes}M `
    if (remainingSeconds > 0 || result === '') result += `${remainingSeconds}S` // Show seconds even if they're 0 if nothing else exists

    return result.trim() // Remove any trailing space
}

export function calculateChaiStats(chaiConsumptionHistory) {
    const dailyStats = {}
    let totalTeas = 0
    let totalCost = 0
    let totalCaffeine = 0
    let totalDaysWithTea = 0

    for (const [timestamp, tea] of Object.entries(chaiConsumptionHistory)) {
        const date = new Date(parseInt(timestamp)).toISOString().split('T')[0] // Extract date in YYYY-MM-DD format
        const caffeine = getCaffeineAmount(tea.name)
        const cost = parseFloat(tea.cost)

        // Initialize or update the daily stats
        if (!dailyStats[date]) {
            dailyStats[date] = { caffeine: 0, cost: 0, count: 0 }
        }

        dailyStats[date].caffeine += caffeine
        dailyStats[date].cost += cost
        dailyStats[date].count += 1

        // Update totals
        totalTeas += 1
        totalCost += cost
    }

    const days = Object.keys(dailyStats).length;
    const dailyCaffeine = {};
    for (const [date, stats] of Object.entries(dailyStats)) {
        if (stats.caffeine > 0) {
            totalCaffeine += stats.caffeine
            totalDaysWithTea += 1; // Count days when caffeine was consumed
        }
    }

    // Calculate average daily caffeine and average daily cost
    const averageDailyCaffeine = totalDaysWithTea > 0 ? (totalCaffeine / totalDaysWithTea).toFixed(2) : 0
    const averageDailyCost = totalDaysWithTea > 0 ? (totalCost / totalDaysWithTea).toFixed(2) : 0

    return {
        daily_caffeine: averageDailyCaffeine,
        daily_cost: averageDailyCost,
        average_teas: (totalTeas / days).toFixed(2),
        total_cost: totalCost.toFixed(2),
    };
}