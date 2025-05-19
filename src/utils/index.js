export const statusLevels = {
    low: {
        color: "#047857",
        background: "#d1fae5",
        description: 'A light amount of chai has been consumed. Subtle caffeine effects may include mild alertness and a warm, calming sensation from the spices.',
        maxLevel: 80
    },
    moderate: {
        color: "#b45309",
        background: "#fef3c7",
        description: 'Moderate chai intake is providing a pleasant balance of caffeine and spice, enhancing focus, warmth, and steady energy without overstimulation.',
        maxLevel: 150
    },
    high: {
        color: "#e11d48",
        background: "#ffe4e6",
        description: 'Heavy chai consumption has significantly increased caffeine levels. You may experience jitteriness, restlessness, or difficulty sleeping, especially if consumed late in the day.',
        maxLevel: 9999
    },
}

export const chaiConsumptionHistory = {
    "1747646400000": { "name": "Masala Chai", "cost": 25.50 },
    "1747560000000": { "name": "Kadak Chai", "cost": 30.00 },
    "1747473600000": { "name": "Kashmiri Pink Tea", "cost": 60.25 },
    "1747387200000": { "name": "Adrak Chai", "cost": 35.00 },
    "1747383600000": { "name": "Lemon Tea", "cost": 20.50 }
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

//This function calculates how much caffeine (in mg) is still in your body right now, based on your tea consumption history over the past 48 hours.
export function calculateCurrentCaffeineLevel(historyData) {
    const currentTime = Date.now() // Get the current time in milliseconds
    const halfLife = halfLifeHours * 60 * 60 * 1000 // Convert 5 hours to milliseconds
    const maxAge = 48 * 60 * 60 * 1000 // Set 48-hour cutoff for caffeine tracking

    let totalCaffeine = 0 // Start with 0 caffeine

    // Loop through each tea entry in the history
    for (const [timestamp, entry] of Object.entries(historyData)) {
        const timeElapsed = currentTime - parseInt(timestamp) // Time since that tea was consumed

        // Only include teas consumed in the last 48 hours
        if (timeElapsed <= maxAge) {
            const caffeineInitial = getCaffeineAmount(entry.name) // Get caffeine amount for the tea type
            // Apply half-life decay to calculate remaining caffeine
            const remainingCaffeine = caffeineInitial * Math.pow(0.5, timeElapsed / halfLife)
            totalCaffeine += remainingCaffeine // Add to total caffeine
        }
    }

    return totalCaffeine.toFixed(2) // Return the final total, rounded to 2 decimal places
}

export function getCaffeineAmount(teaName) {
    const tea = chaiOptions.find(c => c.name === teaName)
    return tea ? tea.caffeine : 0
}

// This function finds the top 3 most frequently consumed teas from your tea history and tells you how many times each was consumed and what percentage of total teas they make up.
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

// This function tells you how much time has passed since a specific tea was consumed, using a UTC timestamp (in milliseconds).
// It gives the result in a human - readable format like: "1M 5D 3H 20M 10S"
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

/*
This function analyzes your chai drinking history and gives you stats like:
 - Average caffeine per day
 - Average cost per day
 - Average number of teas per day
 - Total cost of all teas
*/
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

    const days = Object.keys(dailyStats).length;;
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