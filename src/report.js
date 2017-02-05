export class Report {

  constructor(timeService) {
    this.timeService = timeService
  }

  getClientData(reports, since, until) {
    return reports.map(report => {
      let percentage = `${this.percentage(report.time / (new Date(until) - new Date(since) + 86400000))}%`
      return {
        client: report.title.client,
        time: this.timeService.millisToHoursAndMinsFormat(report.time),
        percentage: percentage 
      }
    })  
  }
  
  getSummaryData(totalGrand, since, until) {
    let totalDays = this.timeService.daysBetween(since, until)
    let grandPercentage = this.percentage(totalGrand / this.timeService.toMillis(totalDays));
    return {
      totalGrand: this.timeService.millisToHoursAndMinsFormat(totalGrand),
      totalDays: this.timeService.daysBetween(since, until),
      grandPercentage: `${grandPercentage}%`,
      grandHoursPerDay: this.timeService.millisToHoursAndMinsFormat(totalGrand / totalDays)
    }
  }

  percentage(number) {
    return (number * 100).toFixed(2)
  }
}
